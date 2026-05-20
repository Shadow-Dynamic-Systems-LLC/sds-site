import { ContactForm } from '../components/ContactForm';

export function ContactPage() {
  return (
    <div className="page-section" style={{ minHeight: '100vh' }}>
      <div className="container">
        <ContactForm />
      </div>
    </div>
  );
}
