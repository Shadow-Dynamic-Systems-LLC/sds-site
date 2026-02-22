import { useState } from 'react';
import { Modal } from './Modal';

interface BlogPost {
  title: string;
  date: string;
  author: string;
  summary: string;
  image: string;
  content: string;
}

export function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const blogPosts: BlogPost[] = [
    {
      title: "The Next Frontier Isn't Better Text. It's Better Problems.",
      date: '2025-12-27',
      author: 'Jason Crittenden',
      summary: "Celebrating Asankhaya Sharma's 1B token challenge—and why governed problem-solving is the real next step beyond perfecting dataset mixes.",
      image: '/assets/assembly-hall.webp',
      content: `Asankhaya Sharma just pulled off something that deserves celebration—using a 70M-parameter GPT-2 variant and only 1 billion tokens, he ran more than fifty controlled experiments to isolate the actual effects of dataset composition.

The result? A deceptively simple static mixture: 50% finePDFs (high-quality textbook PDFs), 30% DCLM-baseline (filtered web text), 20% FineWeb-Edu (curated educational sources).

That mix trained a small model to within a rounding error of GPT-2 while using dramatically less data and compute. It's one of the few recent results that's both accessible and substantial.

But it also brings a deeper truth into sharp focus: Understanding prose ≠ governed problem-solving.

Perfecting dataset mixes is essential for building prose-understanding models. But understanding prose is not the same as operating reliably on complex, structured tasks under governance.

A textbook can teach terminology. A web crawl can teach token patterns. But governed problem-solving requires structured task decomposition, constraint specification, memory systems that preserve context, failure detection, explicit capability boundaries, and human authority over goals.

None of these governance structures come from text alone.`
    },
    {
      title: 'The End of the Prompt Era',
      date: '2025-12-20',
      author: 'Jason Crittenden',
      summary: "Why the next generation of AI systems won't be prompt-driven—and what replaces them. The future is protocol-driven, not prompt-driven.",
      image: '/assets/monolith-terminal.webp',
      content: `The entire industry has been hypnotized by prompts. Better prompts. Safer prompts. Longer prompts. Prompt libraries, prompt marketplaces, prompt engineering interviews.

It made sense in the beginning. We were all trying to communicate with an alien intelligence through a text channel meant for humans. It was clumsy, fragile, and fundamentally backwards—but it worked well enough to generate momentum.

But prompts were never the future. They were a temporary crutch.

The prompt era ends when systems gain: memory, structure, authority boundaries, persistent goals, long-running context, and the ability to act instead of predict.

The next wave of AI will not be prompt-driven. It will be protocol-driven.

Not "what magic words do I type?" but: What is the task? What are the constraints? What is the authority envelope? What are the dependencies? What memory must persist between steps? What tools are allowed, and under what conditions? What signatures are required before something real happens?

Prompting is the short-term hack. Protocols are the long-term foundation.`
    },
    {
      title: 'The Coming Age of Goal-Driven Agents',
      date: '2025-12-15',
      author: 'Jason Crittenden',
      summary: "We're hitting diminishing returns on raw model scale. The next major leap is goal-driven systems—and memory is the real bottleneck.",
      image: '/assets/goal-directed-agents.webp',
      content: `We're hitting diminishing returns on raw model scale. Sure, bigger models get slightly better benchmarks, slightly better scores, slightly fancier marketing decks. But raw scale doesn't generate capability; it just generates more fluent guesses.

The next major leap in AI isn't bigger models. It's goal-driven systems—agents that operate over time under operator governance, maintain commitments to defined objectives, reason across extended tasks, and measure progress toward operator-specified outcomes.

And none of that works without memory.

Most current AI stacks have memory systems that resemble goldfish trying to hold a doctoral thesis. Session-level hacks, lossy summarization, RAG that drowns in irrelevant context—these are not "memories." They're prosthetics.

True goal-driven agents need: durable semantic recall of operator-defined objectives, temporal coherence across task execution, structured relationships between events, the ability to track commitments, and the ability to recover context even after failure.

Model scale reached its useful ceiling. Now we climb the next mountain: intelligence that persists.`
    },
    {
      title: 'Guardrails Are Not Safety. Structure Is Safety.',
      date: '2025-12-10',
      author: 'Jason Crittenden',
      summary: 'Most AI safety today is theater. If you wrap a fragile system in a polite voice and a few regex filters, you haven\'t made it safer—you\'ve made it decorative.',
      image: '/assets/industrial-integrity.webp',
      content: `Most AI safety today is theater.

If you wrap a fragile system in a polite voice and a few regex filters, you haven't made it safer—you've made it decorative.

Real safety has nothing to do with tone. Real safety has nothing to do with censored phrases. Real safety has nothing to do with anthropomorphic bedtime stories about a model's "intentions."

Safety is structure.

An aligned system is one where: context is consistent, memory is verifiable, authority is constrained, dangerous actions require signatures, behavior is predictable even under stress, hallucination has nowhere to hide, uncertainty triggers slowdown not escalation, and external actions are mediated not improvised.

This doesn't happen by slapping a "responsible AI" label on your model card. It happens when the system architecture forces the right behavior even when the model doesn't know it's supposed to behave.

Guardrails are the lifeboats people paint on the side of a ship. Structure is the steel hull under the waterline. Only one of those keeps you afloat.`
    },
    {
      title: 'Why Neutral Orchestration Wins',
      date: '2025-12-05',
      author: 'Jason Crittenden',
      summary: 'How vendor independence becomes a competitive edge in the age of agentic systems. Neutrality is the only strategy that scales.',
      image: '/assets/neutral-orchestration.webp',
      content: `Every AI company claims to be "future-proof." Most of them aren't future-proof so much as future-fragile—one API outage away from existential crisis.

The next decade won't be decided by model families or "GPT-6-but-shinier." It will be decided by orchestration layers: the systems that route tasks, memory, context, and authority across a world of rapidly multiplying model ecosystems.

And neutrality is the only strategy that scales.

A neutral orchestrator doesn't care whose GPU ran the inference, whose embedding model built the context, whose cloud hosts the workload, or whose clever frontier model is trending this quarter.

A neutral orchestrator only cares whether the work gets done—safely, predictably, and verifiably. Everything else is noise.

Neutrality lets you avoid lock-in, bypass hype cycles, survive model churn, and scale across heterogeneous environments. It means you don't bet your entire strategy on a single provider's roadmap.

SDS was built on that assumption: Orchestration is destiny. Neutrality is power.`
    },
    {
      title: 'Fine Tuning - Afterburners on a Paper Airplane',
      date: '2025-07-19',
      author: 'Jason Crittenden',
      summary: 'Fine-tuning feels like the messiah of AI: pour in domain data, and your model mirrors your world flawlessly—until it forgets everything else and collapses under its own overfit weight.',
      image: '/assets/spellbook.webp',
      content: `Fine-tuning feels magical—you can provide instant domain expertise, you don't need to train your own model on the intricacies of language and there is an illusion of deep-control. After all, you are tweaking weights, not prompts, and it doesn't feel as ancillary as strapping RAG to an unrelated and untrained model.

But, it is still a mask. Yes, the mask is made of gold. But gold makes for terrible masks, it's heavy, it's soft, and it's gaudy as hell.

Similarly, fine-tuning a model increases brittleness of the original model. Your fine-tuning data acts as a straight-jacket. Your model won't generalize as well as it used to. Not so great when you expect "problem-solving" to be in the job description. Need to add new data? Time for another expensive, time-consuming training run.

Most insidiously, it gives a false sense of having fixed the model to behave the way you want. But the straight-jacket has only created a facade of fixed behavior. The dysfunction is still there, it's just been hidden behind the new weights.

Self-refactoring agents are the next frontier: code-writing AIs that spot their own flaws and seamlessly inject new sub-modules or rewire their architectures without human intervention.`
    },
    {
      title: 'Prompt Engineering - The Puppet Speaks',
      date: '2025-07-15',
      author: 'Jason Crittenden',
      summary: 'Prompt engineering never actually had a heartbeat—it was always just the puppet master\'s lips moving. If we\'re serious about real AI progress, we need to stop fussing over magic words.',
      image: '/assets/spellbook.webp',
      content: `You've seen the eulogies for prompt engineering circulating on social media. Newsflash: prompt engineering never actually had a heartbeat—it was always just the puppet master's lips moving. If we're serious about real AI progress, we need to stop fussing over magic words and start constructing the brains behind the performance.

Prompt tweaks work until they snap. APIs change, models drift, token limits bite. Real systems lean on modular subsystems:
• Memory Modules: Indexed stores for facts and experiences, not just slick prompts.
• Planner Agents: Task decomposition engines that chart multi-step plans.
• Critics & Evaluators: Automated checks for bias, safety, and alignment.
• Tool Interfaces: Bridges to external services—compute, data fetch, oracles.

Turn prompts into data. Use reinforcement learning or evolutionary search so your agents generate, refine, and curate their own cues. Manual prompt factories will become curiosities in your version history.

Prompt engineering may be the tip of the iceberg—but cognitive architecture is the vessel that sails.`
    },
    {
      title: 'The Illusion of Memory: Mock Memory is Not Context',
      date: '2025-06-28',
      author: 'Jason Crittenden',
      summary: 'Stuffing a vector database with document chunks isn\'t memory—it\'s mock memory. It\'s a brute-force tactic for simulating continuity within the artificial boundaries of an LLM\'s context window.',
      image: '/assets/memory-mesh-3-4x3.webp',
      content: `The term memory is thrown around liberally in AI, but it's often used to describe a shallow concept. Stuffing a vector database with document chunks or conversation history isn't memory—it's mock memory.

Mock memory extends a model's context window, but it does not enable true recall. It offers snapshots of the past, unmoored from the meaning that gave those moments their significance. What it lacks is integration—the active, evolving synthesis of experience over time.

True memory is about contextualization. It's the capacity to answer: Who? What? Why? Where? When? How?

A system that merely retrieves text saying, "The user is working on Project X," doesn't understand that project. It doesn't know that Project X is urgent, delayed, or that the user has expressed frustration. It doesn't track the subtleties. It doesn't grow. It doesn't remember.

Memory isn't just knowing what happened. It's knowing what matters—and why.

At Shadow Dynamic Systems, we are building systems that model their world, not just index it. Systems that evolve.`
    },
    {
      title: 'Beyond the Wrapper: Why Most AI Startups Are Doomed',
      date: '2025-06-25',
      author: 'Jason Crittenden',
      summary: 'The vast majority of AI startups that emerged in the last two years are not technology companies. They are temporary wrappers around foundational models.',
      image: '/assets/filing-cabinet.webp',
      content: `Let's be honest. The vast majority of AI startups that emerged in the last two years are not technology companies. They are temporary wrappers around foundational models, built on a fleeting arbitrage opportunity.

They took a powerful API from OpenAI, Anthropic, or Google, slapped a domain-specific UI on it, and called it a product. That window has now slammed shut.

With native PDF upload, private data sandboxes, and powerful function calling now standard features, the "wrapper" business model is obsolete.

The same pattern appeared everywhere: Chatbot-as-a-Service, AI Copywriting Tools, AI Coding Assistants, AI Agents—each iteration follows the same pattern: a thin integration veneer, a trendy UI, and a pitch deck built on speculative potential.

Survival in this new era requires building defensible moats around unique intellectual property. It's about:
• Cognitive Architectures: Novel ways for agents to reason, plan, and collaborate.
• Memory Systems: Solutions that mimic human cognition for long-term learning.
• Verifiable Governance: Systems where AI actions are traceable and auditable.

The companies that thrive will be those who build genuine technology, not just clever interfaces.`
    }
  ];

  return (
    <section id="blog" className="page-section">
      <div className="container">
        <h2>From The Lab</h2>
        <div className="services-grid">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="blog-card"
              onClick={() => setSelectedPost(post)}
            >
              <img
                src={post.image}
                alt={post.title}
                className="blog-card-image"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/600x400/1a1a1a/ffd700?text=Blog';
                }}
              />
              <div className="blog-card-content">
                <h3>{post.title}</h3>
                <p className="blog-meta">{post.date} · {post.author}</p>
                <p>{post.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPost && (
        <Modal
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          title={selectedPost.title}
        >
          <p className="blog-meta" style={{ marginBottom: '1.5rem' }}>
            {selectedPost.date} · {selectedPost.author}
          </p>
          {selectedPost.content.split('\n\n').map((paragraph, i) => (
            <p key={i} style={{ marginBottom: '1rem' }}>{paragraph}</p>
          ))}
        </Modal>
      )}
    </section>
  );
}
