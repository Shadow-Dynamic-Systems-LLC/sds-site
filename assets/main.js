document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Intersection Observer for scroll animations ---
    const sections = document.querySelectorAll('.page-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(section => observer.observe(section));

    // --- 2. Modal Open/Close Functions ---
    const openModal = (modal) => {
        if (modal == null) {
            console.error('openModal called with null');
            return;
        }
        console.log('Opening modal:', modal);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = (modal) => {
        if (modal == null) return;
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    // --- 3. Glitch Effect ---
    const glitchOverlay = document.getElementById('glitch-overlay');
    const glitchText = document.getElementById('glitch-text');
    let glitchInterval;
    const glitchChars = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ0123456789_+-*/=[]{}|';
    const mathSnippets = [
        '∇J(θ) = Σ(hθ(x)-y)x', 'L = -Σ y log(p) + (1-y)log(1-p)', '∂L/∂w_j = (ŷ - y) * x_j',
        '∇f(x,y) = [∂f/∂x, ∂f/∂y]', '∫[a,b] f(x) dx = F(b) - F(a)', 'H(X) = -Σ p(x) log p(x)',
        'p(A|B) = p(B|A)p(A) / p(B)', '// Grad Descent:', 'x_new = x_old - η * ∇f(x_old)', 'det(A - λI) = 0'
    ];

    function generateGlitchText() {
        if (!glitchText) return;
        const cols = Math.floor(window.innerWidth / 10);
        const rows = Math.floor(window.innerHeight / 24);
        let text = '';
        for (let i = 0; i < rows; i++) {
            if (Math.random() < 0.2) {
                const snippet = mathSnippets[Math.floor(Math.random() * mathSnippets.length)];
                const padding = ' '.repeat(Math.floor(Math.random() * (cols - snippet.length > 0 ? cols - snippet.length : 1)));
                text += padding + snippet + '\n';
            } else {
                let line = '';
                for (let j = 0; j < cols; j++) {
                    line += Math.random() < 0.2 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : ' ';
                }
                text += line + '\n';
            }
        }
        glitchText.textContent = text;
    }

    // --- 4. Dynamic Content & Modal Loading ---
    const createModal = (item) => {
        const modalId = `modal-${item.file.replace(/[^a-zA-Z0-9]/g, '-')}`;
        const modal = document.createElement('div');
        modal.id = modalId;
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>${item.title}</h2>
                ${item.content}
            </div>`;
        document.body.appendChild(modal);
    };

    const createCard = (item, type) => {
        const card = document.createElement('div');
        card.classList.add('blog-card');
        const imageUrl = item.image ? item.image : 'https://placehold.co/600x400/1a1a1a/333333?text=...';
        const linkText = type === 'blog' ? 'Read More &rarr;' : 'Learn More &rarr;';
        const summary = type === 'blog' ? item.summary : (item.description || '');
        const modalId = `modal-${item.file.replace(/[^a-zA-Z0-9]/g, '-')}`;
        const directLink = type === 'blog' ? `#post=${item.file}` : `#project=${item.file}`;
        card.innerHTML = `
            <img src="${imageUrl}" alt="${item.title}" class="blog-card-image">
            <div class="blog-card-content">
                <h3>${item.title}</h3>
                <p>${summary}</p>
                <a href="${directLink}" class="read-more-link" data-modal-target="#${modalId}">${linkText}</a>
            </div>`;
        return card;
    };
    
    // --- 5. Direct Linking Handler ---
    function openModalWithContent(filePath) {
        const modalId = `modal-${filePath.replace(/[^a-zA-Z0-9]/g, '-')}`;
        const modal = document.getElementById(modalId);
        if (modal) {
            openModal(modal);
        } else {
            console.error('Modal not found for path:', filePath);
        }
    }

    function handleDirectLink() {
        if (window.location.hash && window.location.hash.length > 1) {
            const hash = window.location.hash.substring(1);
            if (hash.startsWith('post=') || hash.startsWith('project=')) {
                const filePath = decodeURIComponent(hash.split('=')[1]);
                if (filePath) {
                    // Use a short timeout to ensure modal elements from the fetch have been created
                    setTimeout(() => openModalWithContent(filePath), 200);
                }
            }
        }
    }

    // --- 6. Fetch Content and Initialize ---
    const blogPromise = fetch('blog_posts.json').then(res => res.ok ? res.json() : Promise.resolve([]));
    const projectPromise = fetch('projects.json').then(res => res.ok ? res.json() : Promise.resolve([]));

    Promise.all([blogPromise, projectPromise])
        .then(([blogData, projectData]) => {
            const blogContainer = document.getElementById('blog-posts-container');
            if (blogContainer) {
                blogData.forEach(item => {
                    blogContainer.appendChild(createCard(item, 'blog'));
                    createModal(item);
                });
            }

            const projectContainer = document.getElementById('projects-grid');
            if (projectContainer) {
                projectData.forEach(item => {
                    projectContainer.appendChild(createCard(item, 'project'));
                    createModal(item);
                });
            }

            // Call direct link handler after content is loaded
            handleDirectLink();
        })
        .catch(error => console.error("Error loading content:", error));

    // --- 7. Global Event Listener ---
    document.body.addEventListener('click', e => {
        // Open modal
        const openTrigger = e.target.closest('[data-modal-target]');
        if (openTrigger) {
            e.preventDefault();
            const modalId = openTrigger.dataset.modalTarget;
            console.log(`Modal trigger clicked. Target ID: ${modalId}`);
            // Ensure we have a valid selector
            if (modalId && modalId !== '#') {
                const modal = document.querySelector(modalId);
                if (modal) {
                    openModal(modal);
                } else {
                    console.error(`Modal element not found for selector: ${modalId}`);
                }
            }
        }

        // Close with button
        if (e.target.matches('.close-modal')) {
            const modal = e.target.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        }
        
        // Close with backdrop click
        if (e.target.matches('.modal')) {
            closeModal(e.target);
        }
    });

    // Add glitch effect listener only to main nav links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Ensure we have a valid selector
            if (href && href.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    // Trigger glitch effect
                    if(glitchOverlay) {
                        glitchOverlay.style.display = 'block';
                        glitchInterval = setInterval(generateGlitchText, 100);
                        setTimeout(() => {
                            clearInterval(glitchInterval);
                            glitchOverlay.style.display = 'none';
                        }, 1000);
                    }
                }
            }
        });
    });
}); // This closes the DOMContentLoaded listener

// --- D3 Background Graph ---
const canvas = document.getElementById('background-graph');
if (canvas) {
    const context = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let nodes = [];
    let links = [];

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(70).strength(0.1))
        .force("charge", d3.forceManyBody().strength(-50))
        .force("x", d3.forceX(width / 2).strength(0.02))
        .force("y", d3.forceY(height / 2).strength(0.02))
        .on("tick", ticked);

    function initializeGraph() {
        const numInitialNodes = 20;
        for (let i = 0; i < numInitialNodes; i++) {
            nodes.push({ id: i });
        }
        for (let i = 1; i < numInitialNodes; i++) {
            const target = nodes[Math.floor(Math.random() * i)];
            links.push({ source: nodes[i], target: target });
        }
        simulation.nodes(nodes);
        simulation.force("link").links(links);
    }

    function ticked() {
        if (!context) return;
        context.clearRect(0, 0, width, height);

        context.beginPath();
        links.forEach(d => {
            context.moveTo(d.source.x, d.source.y);
            context.lineTo(d.target.x, d.target.y);
        });
        context.strokeStyle = "rgba(255, 215, 0, 0.6)";
        context.stroke();

        context.beginPath();
        nodes.forEach(d => {
            context.moveTo(d.x + 2.5, d.y);
            context.arc(d.x, d.y, 2.5, 0, 2 * Math.PI);
        });
        context.fillStyle = "rgba(255, 215, 0, 0.9)";
        context.fill();
    }

    function addNodeAndLink() {
        const newNodeId = nodes.length > 0 ? nodes[nodes.length - 1].id + 1 : 0;
        const newNode = { id: newNodeId, x: width / 2, y: height / 2 };
        nodes.push(newNode);

        if (nodes.length > 1) {
            const targetNode = nodes[Math.floor(Math.random() * (nodes.length - 1))];
            links.push({ source: newNode, target: targetNode });
        }

        simulation.nodes(nodes);
        simulation.force("link").links(links);
        simulation.alpha(1).restart();
        
        if (nodes.length > 120) { // Increased max nodes slightly
            const oldNode = nodes.shift();
            links = links.filter(l => l.source.id !== oldNode.id && l.target.id !== oldNode.id);
        }
    }

    initializeGraph();
    setInterval(addNodeAndLink, 1500); // Slowed down the addition of new nodes
    
    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        simulation.force("x", d3.forceX(width / 2).strength(0.02));
        simulation.force("y", d3.forceY(height / 2).strength(0.02));
        simulation.alpha(1).restart();
    });
}
