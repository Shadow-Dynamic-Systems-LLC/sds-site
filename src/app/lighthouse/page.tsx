import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Lighthouse | Shadow Dynamic Systems",
  description:
    "Guiding intelligent agents toward a common goal through AI Orchestration.",
};

const LighthousePage = () => {
  return (
    <main className="container mx-auto p-8">
      <h1 className="font-heading text-molten-orange text-4xl mb-4">
        The Lighthouse: AI Orchestration
      </h1>
      <p className="font-sans text-brand-white mb-8 leading-relaxed">
        The Lighthouse project is our flagship initiative in AI Orchestration.
        It serves as a guiding light, coordinating the actions of multiple
        intelligent agents to achieve a common goal. By establishing clear
        communication protocols and dynamic incentive structures, we can
        harness the collective intelligence of a swarm of agents.
      </p>

      <div className="my-12">
        <h2 className="font-heading text-molten-orange text-2xl mb-4">
          Key Features
        </h2>
        <ul className="list-disc list-inside font-sans text-brand-white space-y-2">
          <li>
            <span className="font-bold">Decentralized Consensus:</span> Agents
            autonomously agree on a shared state.
          </li>
          <li>
            <span className="font-bold">Dynamic Task Allocation:</span> Tasks
            are assigned and reassigned based on agent capabilities.
          </li>
          <li>
            <span className="font-bold">Emergent Strategy:</span> Complex
            strategies arise from the interactions of individual agents.
          </li>
        </ul>
      </div>

      <div className="my-12">
        <Image
          src="https://via.placeholder.com/800x400.png/1E1E1E/FFD700?text=AI+Swarm+Diagram"
          alt="AI Swarm Diagram"
          width={800}
          height={400}
          className="rounded-md border-2 border-molten-gold"
        />
      </div>

      <pre className="font-mono bg-steel-gray/20 p-4 rounded-md my-12">
        <code className="text-brand-white">
          {`
// Example of a simple agent communication protocol
interface Message {
  senderId: string;
  recipientId: string;
  payload: any;
}

function broadcast(agents, message) {
  agents.forEach(agent => {
    agent.receive(message);
  });
}
          `}
        </code>
      </pre>
    </main>
  );
};

export default LighthousePage;
