import { LegalDocumentPage } from '../components/LegalDocumentPage';

export function PrivacyPage() {
  return (
    <LegalDocumentPage title="Privacy Policy" effectiveDate="July 13, 2026">
      <p>
        Welcome to shadowdynamicsystems.com, a proudly static site operated by Shadow Dynamic Systems LLC
        (&ldquo;we,&rdquo; &ldquo;our,&rdquo; &ldquo;us&rdquo;).
      </p>
      <p>
        This Privacy Policy is intentionally simple, because our website is intentionally simple.
        We don&rsquo;t track you, profile you, or sell your data. We only keep what you give us.
      </p>

      <h2>1. What We Collect</h2>
      <p>
        If you use the contact form, we collect the information you choose to submit, such as your name,
        email address, organization, inquiry type, and message. You may ask us to delete it. We will do so.
      </p>
      <p>
        Your email, should you be one of the first poor souls to provide us with one, will only be used to
        contact you about things you have asked us to contact you about.
      </p>
      <ul>
        <li>No cookies.</li>
        <li>No JavaScript tracking libraries silently watching you like a poorly scoped observer in a recursive function.</li>
        <li>No sale, rental, or behavioral advertising use of contact-form submissions.</li>
      </ul>
      <p>
        Some basic server metadata (IP, user agent, timestamp) may be logged briefly to keep things secure
        and operating, but we don&rsquo;t attach that to any identity or use it for profiling, marketing,
        or behavioral analytics.
      </p>

      <h2>2. Third-Party Dependencies</h2>
      <p>
        This site contains no third-party trackers, analytics beacons, or embedded social media code.
        You won&rsquo;t find any <code>iframe</code>-based mysteries here.
      </p>
      <p>
        External links may direct you to other sites. Those sites may play by different rules. We advise
        reviewing their privacy policies&mdash;if only to enjoy the contrast.
      </p>

      <h2>3. Data Security</h2>
      <p>
        Your connection to this site is encrypted with SSL/TLS, just like every other sane website.
        SSL/TLS will be secure for at least the next month; we promise to watch the headlines for any
        sudden breakthroughs in Quantum Decryption.
      </p>
      <p>
        We take standard precautions against unauthorized access, malicious recursion, and bots attempting
        to solve us as a CAPTCHA.
      </p>

      <h2>4. Changes to This Policy</h2>
      <p>
        If we ever change how we handle data&mdash;say, if the site evolves beyond
        &ldquo;static monolith&rdquo;&mdash;we&rsquo;ll update this page and note the change clearly.
      </p>
      <p>No hidden diffs. No patch notes buried six levels deep.</p>

      <h2>5. Contact</h2>
      <p>
        If you have questions or you spotted a privacy paradox worthy of the Halting Problem, email us at:
      </p>
      <p className="legal-contact-block">
        <strong>Shadow Dynamic Systems LLC</strong><br />
        <a href="mailto:hello@shadowdynamicsystems.com">hello@shadowdynamicsystems.com</a><br />
        Chicago, IL
      </p>
    </LegalDocumentPage>
  );
}
