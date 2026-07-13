import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Node extends d3.SimulationNodeDatum {
    id: number;
    generation?: number; // Track which "era" this node belongs to
    beat?: boolean; // the one-in-several "live" specimen node (SDS Forge Glyph Specimens: Living Graph)
}

interface Link extends d3.SimulationLinkDatum<Node> {
    source: Node;
    target: Node;
}

export interface MemoryGraphProps {
    maxNodes?: number;
    addInterval?: number;
    /** Ink-toned node fill (SDS Forge tokens: --ink). */
    nodeColor?: string;
    /** Ink-toned edge stroke (SDS Forge tokens: --ink, low alpha). */
    linkColor?: string;
    /** Magma beat-node fill (SDS Forge tokens: --forge-magma #ff9900). */
    beatColor?: string;
    /** Fraction of nodes that render as a pulsing magma "beat" — per the
     *  Living Graph specimen (~28% in the reference sheet). */
    beatRatio?: number;
    opacity?: number;
    collapseDuration?: number; // ms for collapse animation
}

export function MemoryGraph({
    maxNodes = 35,
    addInterval = 3000,
    nodeColor = 'rgba(20, 20, 20, 0.55)',
    linkColor = 'rgba(20, 20, 20, 0.16)',
    beatColor = '#ff9900',
    beatRatio = 0.28,
    opacity = 0.85,
    collapseDuration = 1500,
}: MemoryGraphProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stateRef = useRef({
        nodes: [] as Node[],
        links: [] as Link[],
        scale: 1,
        collapsing: false,
        collapseStart: 0,
        generation: 0,
        nextId: 0,
        paused: false,
        rotation: 0, // radians
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const state = stateRef.current;
        const nodes = state.nodes;
        const links = state.links;

        // Graph center - bottom portion of screen to avoid hero text
        const graphCenterY = height * 0.72;

        // Initialize with some nodes
        function initializeGraph() {
            const numInitialNodes = 4;
            state.nextId = 0;
            for (let i = 0; i < numInitialNodes; i++) {
                nodes.push({
                    id: state.nextId++,
                    generation: state.generation,
                    beat: Math.random() < beatRatio,
                    x: width / 2 + (Math.random() - 0.5) * 200,
                    y: graphCenterY + (Math.random() - 0.5) * 200,
                });
            }

            for (let i = 1; i < numInitialNodes; i++) {
                const targetIdx = Math.floor(Math.random() * i);
                links.push({ source: nodes[i], target: nodes[targetIdx] });
            }
        }

        initializeGraph();

        // Create simulation
        const simulation = d3.forceSimulation<Node>(nodes)
            .force('link', d3.forceLink<Node, Link>(links).id(d => d.id).distance(70).strength(0.1))
            .force('charge', d3.forceManyBody().strength(-50))
            .force('x', d3.forceX(width / 2).strength(0.02))
            .force('y', d3.forceY(graphCenterY).strength(0.02))
            .on('tick', tick);

        function tick() {
            if (!context) return;
            context.clearRect(0, 0, width, height);

            // Increment rotation (~1.5 degrees per second at 60fps)
            state.rotation += 0.00044;

            // Calculate center of mass for scaling/rotation origin
            let cx = width / 2;
            let cy = height / 2;
            if (nodes.length > 0) {
                cx = nodes.reduce((sum, n) => sum + (n.x || 0), 0) / nodes.length;
                cy = nodes.reduce((sum, n) => sum + (n.y || 0), 0) / nodes.length;
            }

            const scale = state.scale;
            const cos = Math.cos(state.rotation);
            const sin = Math.sin(state.rotation);

            // Helper to apply scale and rotation around center
            function transform(x: number, y: number): [number, number] {
                // Scale from center
                const sx = (x - cx) * scale;
                const sy = (y - cy) * scale;
                // Rotate around center
                const rx = sx * cos - sy * sin;
                const ry = sx * sin + sy * cos;
                return [cx + rx, cy + ry];
            }

            // Draw links
            context.beginPath();
            context.strokeStyle = linkColor;
            context.lineWidth = 1;
            for (const link of links) {
                if (link.source.x != null && link.source.y != null &&
                    link.target.x != null && link.target.y != null) {
                    const [sx, sy] = transform(link.source.x, link.source.y);
                    const [tx, ty] = transform(link.target.x, link.target.y);
                    context.moveTo(sx, sy);
                    context.lineTo(tx, ty);
                }
            }
            context.stroke();

            // Draw nodes — ink specimens, with the occasional magma "beat"
            // (SDS Forge Glyph Specimens: Living Graph — "the one live specimen").
            const baseRadius = 2.5 * Math.max(scale, 0.3);
            const now = Date.now();
            for (const node of nodes) {
                if (node.x == null || node.y == null) continue;
                const [nx, ny] = transform(node.x, node.y);

                if (node.beat) {
                    // Pulsing ring around the beat, ~1 pulse per 2.2s.
                    const pulse = (Math.sin(now / 350 + node.id) + 1) / 2; // 0..1
                    const ringRadius = baseRadius * (1.8 + pulse * 1.4);

                    context.beginPath();
                    context.strokeStyle = beatColor;
                    context.globalAlpha = 0.25 + pulse * 0.35;
                    context.lineWidth = 1;
                    context.arc(nx, ny, ringRadius, 0, 2 * Math.PI);
                    context.stroke();
                    context.globalAlpha = 1;

                    context.beginPath();
                    context.fillStyle = beatColor;
                    context.arc(nx, ny, baseRadius * 1.15, 0, 2 * Math.PI);
                    context.fill();
                } else {
                    context.beginPath();
                    context.fillStyle = nodeColor;
                    context.arc(nx, ny, baseRadius, 0, 2 * Math.PI);
                    context.fill();
                }
            }
        }

        // Collapse animation loop
        let animationId: number;
        function animateCollapse() {
            if (!state.collapsing) return;

            const elapsed = Date.now() - state.collapseStart;
            const progress = Math.min(elapsed / collapseDuration, 1);

            // Ease out cubic for smooth deceleration
            state.scale = 1 - (progress * progress * progress);

            if (progress >= 1) {
                // Collapse complete - reset to single node
                state.collapsing = false;
                state.scale = 1;
                state.generation++;

                // Clear everything
                nodes.length = 0;
                links.length = 0;

                // Create single "hypergraph" node representing collapsed structure
                const singularityNode: Node = {
                    id: state.nextId++,
                    generation: state.generation,
                    beat: true, // the reborn node is always the live one
                    x: width / 2,
                    y: graphCenterY,
                };
                nodes.push(singularityNode);

                // Update simulation
                simulation.nodes(nodes);
                (simulation.force('link') as d3.ForceLink<Node, Link>).links(links);
                simulation.alpha(0.3).restart();

                state.paused = false;
                return;
            }

            simulation.alpha(0.5).restart(); // Keep simulation active during collapse
            animationId = requestAnimationFrame(animateCollapse);
        }

        // Helper functions
        function getNodeDegree(nodeId: number): number {
            return links.filter(l => l.source.id === nodeId || l.target.id === nodeId).length;
        }

        function findLeafNodes(): Node[] {
            return nodes.filter(n => getNodeDegree(n.id) === 1);
        }

        function triggerCollapse() {
            state.collapsing = true;
            state.collapseStart = Date.now();
            state.paused = true;
            animateCollapse();
        }

        // Add new nodes or connect leaves periodically
        const intervalId = setInterval(() => {
            if (state.paused || state.collapsing) return;

            // Check if we've hit max - trigger collapse
            if (nodes.length >= maxNodes) {
                triggerCollapse();
                return;
            }

            const leaves = findLeafNodes();

            // 20% chance to connect two leaves if we have at least 2
            if (leaves.length >= 2 && Math.random() < 0.2) {
                const idx1 = Math.floor(Math.random() * leaves.length);
                let idx2 = Math.floor(Math.random() * (leaves.length - 1));
                if (idx2 >= idx1) idx2++;

                const leaf1 = leaves[idx1];
                const leaf2 = leaves[idx2];

                const alreadyConnected = links.some(
                    l => (l.source.id === leaf1.id && l.target.id === leaf2.id) ||
                         (l.source.id === leaf2.id && l.target.id === leaf1.id)
                );

                if (!alreadyConnected) {
                    links.push({ source: leaf1, target: leaf2 });
                    (simulation.force('link') as d3.ForceLink<Node, Link>).links(links);
                    simulation.alpha(0.3).restart();
                    return;
                }
            }

            // Add a new node
            const newNode: Node = {
                id: state.nextId++,
                generation: state.generation,
                beat: Math.random() < beatRatio,
                x: width / 2 + (Math.random() - 0.5) * 100,
                y: graphCenterY + (Math.random() - 0.5) * 100,
            };
            nodes.push(newNode);

            if (nodes.length > 1) {
                const targetIdx = Math.floor(Math.random() * (nodes.length - 1));
                links.push({ source: newNode, target: nodes[targetIdx] });
            }

            simulation.nodes(nodes);
            (simulation.force('link') as d3.ForceLink<Node, Link>).links(links);
            simulation.alpha(0.3).restart();
        }, addInterval);

        // Handle resize
        function handleResize() {
            if (!canvas) return;
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            const newGraphCenterY = height * 0.72;

            simulation
                .force('x', d3.forceX(width / 2).strength(0.02))
                .force('y', d3.forceY(newGraphCenterY).strength(0.02))
                .alpha(0.3)
                .restart();
        }

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(intervalId);
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
            simulation.stop();
            stateRef.current.nodes = [];
            stateRef.current.links = [];
            stateRef.current.scale = 1;
            stateRef.current.collapsing = false;
            stateRef.current.rotation = 0;
        };
    }, [maxNodes, addInterval, nodeColor, linkColor, beatColor, beatRatio, collapseDuration]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                opacity,
                zIndex: 1,
            }}
        />
    );
}
