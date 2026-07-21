import { LegalDocumentPage } from '../components/LegalDocumentPage';

export function TermsPage() {
  return (
    <LegalDocumentPage title="Terms of Service" effectiveDate="July 6, 2025">
      <p>
        Welcome to shadowdynamicsystems.com, a website designed for humans, by humans who occasionally write
        like machines. These Terms of Service (&ldquo;Terms&rdquo;) govern your use of this site, operated by
        Shadow Dynamic Systems LLC (&ldquo;we,&rdquo; &ldquo;our,&rdquo; &ldquo;us&rdquo;).
      </p>
      <p>
        By using the site, you agree to these Terms. If that sounds ominous, it&rsquo;s not&mdash;we just want
        to be clear and avoid infinite loops later.
      </p>

      <h2>1. Use of the Site</h2>
      <p>
        This site is informational and static in nature. No logins. No commerce.
        No &ldquo;forgot your password?&rdquo; pages to trigger an existential crisis.
      </p>
      <p>You are permitted to:</p>
      <ul>
        <li>View and read the content.</li>
        <li>Link to it or share it (with attribution).</li>
        <li>Cache it responsibly like a polite browser.</li>
      </ul>
      <p>You are <strong>not</strong> permitted to:</p>
      <ul>
        <li>Reverse-engineer, scrape, or repurpose the content for generative model training without permission.</li>
        <li>Attempt to overload the site with requests or recursive bots.</li>
        <li>Claim the code, ideas, or voice as your own.</li>
      </ul>

      <h2>2. Intellectual Property</h2>
      <p>
        Unless otherwise specified, all content on the site belongs to Shadow Dynamic Systems LLC. That
        includes text, layout, and any diagrams or data visualizations we may add&mdash;recursive or otherwise.
      </p>
      <p>
        You&rsquo;re welcome to quote, refer, and cite. You&rsquo;re not welcome to copy-paste and call it
        open source (unless we say it is).
      </p>

      <h2>3. No Warranties</h2>
      <p>
        This site is provided &ldquo;as is,&rdquo; with no guarantees of correctness, uptime, or philosophical
        coherence. We try to keep things factual, functional, and readable. But errors may exist.
        Especially off-by-one.
      </p>
      <p>
        Use the content at your own discretion. It is not legal advice, professional guidance, or an embedded
        AI agent (yet).
      </p>

      <h2>4. Limitation of Liability</h2>
      <p>
        To the fullest extent allowed by law, Shadow Dynamic Systems LLC disclaims all liability for any
        direct, indirect, incidental, or recursive damages that arise from your use of the site.
      </p>
      <p>This includes, but is not limited to:</p>
      <ul>
        <li>Misuse of our content in presentations to investors.</li>
        <li>Philosophical distress caused by nested hypotheticals.</li>
        <li>Unexpected feelings of inspiration or dread.</li>
      </ul>

      <h2>5. Governing Law</h2>
      <p>These Terms are governed by the laws of the State of Illinois, with venue in Chicago.</p>

      <h2>6. Changes to These Terms</h2>
      <p>
        We reserve the right to update these Terms as the site evolves. Major updates will be posted here,
        not hidden in a changelog beneath 30 <code>div</code>s.
      </p>

      <h2>7. Contact</h2>
      <p>Questions? Clarifications? Recursive paradoxes? Contact us at:</p>
      <p className="legal-contact-block">
        <strong>Shadow Dynamic Systems LLC</strong><br />
        <a href="mailto:hello@shadowdynamicsystems.com">hello@shadowdynamicsystems.com</a><br />
        Chicago, IL
      </p>
    </LegalDocumentPage>
  );
}
