import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from './Modal';

export function Footer() {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTosModal, setShowTosModal] = useState(false);
  const buildDate = new Date().toISOString().split('T')[0].replace(/-/g, '·');

  return (
    <>
      <footer>
        <div className="container">
          <ul className="footer-links">
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); setShowPrivacyModal(true); }}>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); setShowTosModal(true); }}>
                Terms of Service
              </a>
            </li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          <p>&copy; 2025–2026 Shadow Dynamic Systems. All Rights Reserved.</p>
          <div className="footer-metadata">
            <span>NODE: SDS-PUBLIC-0x01</span>
            <span>BUILD: {buildDate}</span>
            <span>PROTOCOL: v0.3-draft</span>
          </div>
        </div>
      </footer>

      <Modal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} title="Privacy Policy">
        <p><em>Effective Date: July 6, 2025</em></p>
        <p>Welcome to shadowdynamicsystems.com, a proudly static site operated by Shadow Dynamic Systems LLC ("we," "our," "us").</p>
        <p>This Privacy Policy is intentionally simple, because our website is intentionally simple. We don't track you. We don't collect your data. We don't even remember you were here. It's not personal. We just never implemented state.</p>
        <h4>1. What We Collect</h4>
        <p>We don't collect personal data. Period.</p>
        <ul>
          <li>No forms.</li>
          <li>No cookies.</li>
          <li>No JavaScript tracking libraries silently watching you like a poorly scoped observer in a recursive function.</li>
        </ul>
        <p>Some basic server metadata (IP, user agent, timestamp) may be logged briefly to keep things secure and operating, but we don't attach that to any identity or use it for profiling, marketing, or behavioral analytics.</p>
        <h4>2. Third-Party Dependencies</h4>
        <p>This site contains no third-party trackers, analytics beacons, or embedded social media code. You won't find any <code>iframe</code>-based mysteries here.</p>
        <p>External links may direct you to other sites. Those sites may play by different rules. We advise reviewing their privacy policies—if only to enjoy the contrast.</p>
        <h4>3. Data Security</h4>
        <p>Since we don't store personal data, there's not much to secure. But we do take standard precautions against unauthorized access, malicious recursion, and bots attempting to solve us as a CAPTCHA.</p>
        <h4>4. Changes to This Policy</h4>
        <p>If we ever change how we handle data—say, if the site evolves beyond "static monolith"—we'll update this page and note the change clearly.</p>
        <p>No hidden diffs. No patch notes buried six levels deep.</p>
        <h4>5. Contact</h4>
        <p>If you have questions or you spotted a privacy paradox worthy of the Halting Problem, email us at:</p>
        <p>
          <strong>Shadow Dynamic Systems LLC</strong><br />
          <a href="mailto:hello@shadowdynamicsystems.com">hello@shadowdynamicsystems.com</a><br />
          Chicago, IL
        </p>
      </Modal>

      <Modal isOpen={showTosModal} onClose={() => setShowTosModal(false)} title="Terms of Service">
        <p><em>Effective Date: July 6, 2025</em></p>
        <p>Welcome to shadowdynamicsystems.com, a website designed for humans, by humans who occasionally write like machines. These Terms of Service ("Terms") govern your use of this site, operated by Shadow Dynamic Systems LLC ("we," "our," "us").</p>
        <p>By using the site, you agree to these Terms. If that sounds ominous, it's not—we just want to be clear and avoid infinite loops later.</p>
        <h4>1. Use of the Site</h4>
        <p>This site is informational and static in nature. No logins. No commerce. No "forgot your password?" pages to trigger an existential crisis.</p>
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
        <h4>2. Intellectual Property</h4>
        <p>Unless otherwise specified, all content on the site belongs to Shadow Dynamic Systems LLC. That includes text, layout, and any diagrams or data visualizations we may add—recursive or otherwise.</p>
        <p>You're welcome to quote, refer, and cite. You're not welcome to copy-paste and call it open source (unless we say it is).</p>
        <h4>3. No Warranties</h4>
        <p>This site is provided "as is," with no guarantees of correctness, uptime, or philosophical coherence. We try to keep things factual, functional, and readable. But errors may exist. Especially off-by-one.</p>
        <p>Use the content at your own discretion. It is not legal advice, professional guidance, or an embedded AI agent (yet).</p>
        <h4>4. Limitation of Liability</h4>
        <p>To the fullest extent allowed by law, Shadow Dynamic Systems LLC disclaims all liability for any direct, indirect, incidental, or recursive damages that arise from your use of the site.</p>
        <p>This includes, but is not limited to:</p>
        <ul>
          <li>Misuse of our content in presentations to investors.</li>
          <li>Philosophical distress caused by nested hypotheticals.</li>
          <li>Unexpected feelings of inspiration or dread.</li>
        </ul>
        <h4>5. Governing Law</h4>
        <p>These Terms are governed by the laws of the State of Illinois, with venue in Chicago.</p>
        <h4>6. Changes to These Terms</h4>
        <p>We reserve the right to update these Terms as the site evolves. Major updates will be posted here, not hidden in a changelog beneath 30 <code>div</code>s.</p>
        <h4>7. Contact</h4>
        <p>Questions? Clarifications? Recursive paradoxes? Contact us at:</p>
        <p>
          <strong>Shadow Dynamic Systems LLC</strong><br />
          <a href="mailto:hello@shadowdynamicsystems.com">hello@shadowdynamicsystems.com</a><br />
          Chicago, IL
        </p>
      </Modal>
    </>
  );
}
