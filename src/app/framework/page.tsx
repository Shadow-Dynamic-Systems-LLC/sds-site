import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Framework | Shadow Dynamic Systems",
  description:
    "Exploring the core principles of communication and negotiation as the basis for all systems.",
};

const FrameworkPage = () => {
  return (
    <main className="container mx-auto p-8">
      <h1 className="font-heading text-molten-orange text-4xl mb-4">
        The Framework: Systems Theory
      </h1>
      <p className="font-sans text-brand-white mb-8 leading-relaxed">
        At the heart of Shadow Dynamic Systems is a robust framework built upon
        the principles of Systems Theory. We believe that all phenomena, from
        the most microscopic interactions to the grandest cosmic structures,
        can be understood as interconnected systems. This perspective allows
        us to model, predict, and influence complex behaviors in novel ways.
      </p>

      <div className="my-12">
        <h2 className="font-heading text-molten-orange text-2xl mb-4">
          Core Tenets
        </h2>
        <ul className="list-disc list-inside font-sans text-brand-white space-y-2">
          <li>
            <span className="font-bold">Emergence:</span> Complex patterns
            arise from simple interactions.
          </li>
          <li>
            <span className="font-bold">Feedback Loops:</span> Systems are
            regulated and transformed by feedback mechanisms.
          </li>
          <li>
            <span className="font-bold">Interconnectedness:</span> All
            components within a system are interdependent.
          </li>
        </ul>
      </div>

      <div className="my-12">
        <Image
          src="https://via.placeholder.com/800x400.png/1E1E1E/FF4500?text=System+Diagram"
          alt="System Diagram"
          width={800}
          height={400}
          className="rounded-md border-2 border-molten-orange"
        />
      </div>

      <pre className="font-mono bg-steel-gray/20 p-4 rounded-md my-12">
        <code className="text-brand-white">
          {`
// Example of a simple feedback loop in pseudocode
function regulateSystem(system) {
  let state = system.getState();
  if (state > system.threshold) {
    system.reduceActivity();
  } else {
    system.increaseActivity();
  }
  return system.getState();
}
          `}
        </code>
      </pre>
    </main>
  );
};

export default FrameworkPage;
