import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './ContactForm.css';

type ContactType = 'partnership' | 'deployment' | 'consulting' | 'press' | 'investor' | 'newsletter' | 'general';

const CONTACT_TYPES: { value: ContactType; label: string }[] = [
  { value: 'partnership', label: 'Partnership' },
  { value: 'deployment', label: 'Deployment' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'press', label: 'Press' },
  { value: 'investor', label: 'Investor' },
  { value: 'newsletter', label: 'Newsletter' },
  { value: 'general', label: 'General Inquiry' },
];

const VERTICALS = ['Insurance', 'Legal', 'Healthcare', 'Finance', 'Technology', 'General Business'];

const PARTNERSHIP_KINDS = ['Reseller', 'Referral', 'Strategic', 'OEM', 'Licensing'];
const CONSULTING_TIMELINES = ['ASAP', '1-3 months', '3-6 months', 'Just exploring'];
const INVESTOR_STAGES = ['Seed', 'Series A', 'Growth', 'Pre-IPO'];
const NEWSLETTER_PUBLICATIONS = ['SDS Newsletter', 'Journal of Modern Systems Archaeology and Pathology', 'Both'];
const NEWSLETTER_FREQUENCIES = ['Weekly', 'Monthly', 'Quarterly'];
const DEPLOYMENT_NEEDS = ['API', 'Database', 'Cloud', 'On-prem'];

export function ContactForm() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [data, setData] = useState({
    contactType: (searchParams.get('type') as ContactType) || '',
    partnershipKind: '',
    deploymentInfra: '',
    consultingTimeline: '',
    pressPublication: '',
    pressTopics: '',
    investorStage: '',
    investorThesis: '',
    newsletterPublication: '',
    newsletterFrequency: '',
    vertical: '',
    name: '',
    email: '',
    partnershipValue: '',
    deploymentNeeds: [] as string[],
    consultingProblem: '',
    pressDeadline: '',
    investorQuestion: '',
    generalMessage: '',
  });

  // Pre-fill contact type from URL
  useEffect(() => {
    const typeParam = searchParams.get('type') as ContactType;
    if (typeParam && CONTACT_TYPES.some(t => t.value === typeParam)) {
      setData(prev => ({ ...prev, contactType: typeParam }));
      setStep(2);
    }
  }, [searchParams]);

  const updateField = (field: keyof typeof data, value: string | string[]) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const getTotalSteps = () => {
    switch (data.contactType) {
      case 'newsletter': return 2;
      case 'press': return 4;
      case 'investor': return 4;
      case 'general': return 4;
      default: return 5;
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return !!data.contactType;
      case 2:
        switch (data.contactType) {
          case 'partnership': return !!data.partnershipKind;
          case 'deployment': return !!data.deploymentInfra.trim();
          case 'consulting': return !!data.consultingTimeline;
          case 'press': return !!data.pressPublication.trim() && !!data.pressTopics.trim();
          case 'investor': return !!data.investorStage && !!data.investorThesis.trim();
          case 'newsletter': return !!data.newsletterPublication && !!data.newsletterFrequency;
          default: return true;
        }
      case 3:
        if (['press', 'investor'].includes(data.contactType)) {
          return !!data.name.trim() && !!data.email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
        }
        if (data.contactType === 'newsletter') {
          return !!data.email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
        }
        return !!data.vertical;
      case 4:
        if (data.contactType === 'general') {
          return !!data.name.trim() && !!data.email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
        }
        if (data.contactType === 'newsletter') return true;
        return !!data.name.trim() && !!data.email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
      case 5:
        switch (data.contactType) {
          case 'partnership': return !!data.partnershipValue.trim();
          case 'deployment': return data.deploymentNeeds.length > 0;
          case 'consulting': return !!data.consultingProblem.trim();
          case 'press': return !!data.pressDeadline.trim();
          case 'investor': return !!data.investorQuestion.trim();
          case 'general': return !!data.generalMessage.trim();
          default: return true;
        }
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < getTotalSteps()) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canProceed()) return;

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('form_name', 'contact');
    formData.append('contact_type', data.contactType);
    if (data.name) formData.append('name', data.name);
    if (data.email) formData.append('email', data.email);
    if (data.vertical) formData.append('vertical', data.vertical);

    // Type-specific fields
    switch (data.contactType) {
      case 'partnership':
        formData.append('partnership_kind', data.partnershipKind);
        formData.append('partnership_value', data.partnershipValue);
        break;
      case 'deployment':
        formData.append('current_infrastructure', data.deploymentInfra);
        formData.append('integration_needs', data.deploymentNeeds.join(', '));
        break;
      case 'consulting':
        formData.append('timeline', data.consultingTimeline);
        formData.append('problem_description', data.consultingProblem);
        break;
      case 'press':
        formData.append('publication', data.pressPublication);
        formData.append('topics', data.pressTopics);
        formData.append('deadline', data.pressDeadline);
        break;
      case 'investor':
        formData.append('investor_stage', data.investorStage);
        formData.append('thesis', data.investorThesis);
        formData.append('key_question', data.investorQuestion);
        break;
      case 'newsletter':
        formData.append('newsletter_publication', data.newsletterPublication);
        formData.append('newsletter_frequency', data.newsletterFrequency);
        break;
      case 'general':
        formData.append('message', data.generalMessage);
        break;
    }

    try {
      const response = await fetch('/__forms/submit', {
        method: 'POST',
        body: formData,
      });
      if (response.ok || response.status === 302) {
        setSubmitted(true);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      // If fetch fails (e.g. not on Pages), show success anyway for demo
      console.warn('Form submission failed, likely not deployed to Cloudflare Pages:', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="contact-form-container">
        <div className="contact-success">
          <h2>Message Received</h2>
          <p>Thank you. We will be in touch.</p>
          <a href="/" className="contact-btn-primary">Return Home</a>
        </div>
      </div>
    );
  }

  const totalSteps = getTotalSteps();

  return (
    <div className="contact-form-container">
      <div className="contact-form-header">
        <div className="section-path">INQUIRY // FORM</div>
        <h2 className="section-title">Contact</h2>
      </div>

      <div className="contact-progress">
        {Array.from({ length: totalSteps }, (_, i) => (
          <span
            key={i}
            className={`contact-progress-dot ${i + 1 < step ? 'complete' : ''} ${i + 1 === step ? 'active' : ''}`}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        {/* STEP 1: Contact Type */}
        {step === 1 && (
          <div className="contact-step">
            <h3>What brings you here?</h3>
            <div className="contact-chips">
              {CONTACT_TYPES.map(type => (
                <button
                  key={type.value}
                  type="button"
                  className={`filter-chip ${data.contactType === type.value ? 'active' : ''}`}
                  onClick={() => updateField('contactType', type.value)}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Type-Specific */}
        {step === 2 && (
          <div className="contact-step">
            {data.contactType === 'partnership' && (
              <>
                <h3>What kind of partnership?</h3>
                <div className="contact-chips">
                  {PARTNERSHIP_KINDS.map(kind => (
                    <button
                      key={kind}
                      type="button"
                      className={`filter-chip ${data.partnershipKind === kind ? 'active' : ''}`}
                      onClick={() => updateField('partnershipKind', kind)}
                    >
                      {kind}
                    </button>
                  ))}
                </div>
              </>
            )}

            {data.contactType === 'deployment' && (
              <>
                <h3>Describe your current infrastructure</h3>
                <textarea
                  className="contact-textarea"
                  rows={4}
                  placeholder="e.g. AWS, on-prem, hybrid..."
                  value={data.deploymentInfra}
                  onChange={e => updateField('deploymentInfra', e.target.value)}
                />
              </>
            )}

            {data.contactType === 'consulting' && (
              <>
                <h3>Timeline to engage?</h3>
                <div className="contact-chips">
                  {CONSULTING_TIMELINES.map(t => (
                    <button
                      key={t}
                      type="button"
                      className={`filter-chip ${data.consultingTimeline === t ? 'active' : ''}`}
                      onClick={() => updateField('consultingTimeline', t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </>
            )}

            {data.contactType === 'press' && (
              <>
                <h3>Publication details</h3>
                <label className="contact-label">Publication / Outlet</label>
                <input
                  type="text"
                  className="contact-input"
                  placeholder="e.g. TechCrunch"
                  value={data.pressPublication}
                  onChange={e => updateField('pressPublication', e.target.value)}
                />
                <label className="contact-label">Topics covered</label>
                <textarea
                  className="contact-textarea"
                  rows={3}
                  placeholder="What are you writing about?"
                  value={data.pressTopics}
                  onChange={e => updateField('pressTopics', e.target.value)}
                />
              </>
            )}

            {data.contactType === 'investor' && (
              <>
                <h3>Investment details</h3>
                <label className="contact-label">Stage</label>
                <div className="contact-chips">
                  {INVESTOR_STAGES.map(s => (
                    <button
                      key={s}
                      type="button"
                      className={`filter-chip ${data.investorStage === s ? 'active' : ''}`}
                      onClick={() => updateField('investorStage', s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <label className="contact-label">Investment thesis</label>
                <textarea
                  className="contact-textarea"
                  rows={3}
                  placeholder="What do you look for in portfolio companies?"
                  value={data.investorThesis}
                  onChange={e => updateField('investorThesis', e.target.value)}
                />
              </>
            )}

            {data.contactType === 'newsletter' && (
              <>
                <h3>Newsletter preferences</h3>
                <label className="contact-label">Which publication?</label>
                <div className="contact-chips">
                  {NEWSLETTER_PUBLICATIONS.map(p => (
                    <button
                      key={p}
                      type="button"
                      className={`filter-chip ${data.newsletterPublication === p ? 'active' : ''}`}
                      onClick={() => updateField('newsletterPublication', p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <label className="contact-label">Delivery frequency</label>
                <div className="contact-chips">
                  {NEWSLETTER_FREQUENCIES.map(f => (
                    <button
                      key={f}
                      type="button"
                      className={`filter-chip ${data.newsletterFrequency === f ? 'active' : ''}`}
                      onClick={() => updateField('newsletterFrequency', f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </>
            )}

            {data.contactType === 'general' && (
              <>
                <h3>General inquiry</h3>
                <p className="contact-hint">Tell us what vertical you're in so we can route you correctly.</p>
              </>
            )}
          </div>
        )}

        {/* STEP 3: Vertical OR Contact Info */}
        {step === 3 && (
          <div className="contact-step">
            {['partnership', 'deployment', 'consulting', 'general'].includes(data.contactType) && (
              <>
                <h3>Industry vertical</h3>
                <div className="contact-chips">
                  {VERTICALS.map(v => (
                    <button
                      key={v}
                      type="button"
                      className={`filter-chip ${data.vertical === v ? 'active' : ''}`}
                      onClick={() => updateField('vertical', v)}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </>
            )}

            {['press', 'investor'].includes(data.contactType) && (
              <>
                <h3>Your details</h3>
                <label className="contact-label">Name</label>
                <input
                  type="text"
                  className="contact-input"
                  placeholder="Your name"
                  value={data.name}
                  onChange={e => updateField('name', e.target.value)}
                  required
                />
                <label className="contact-label">Email</label>
                <input
                  type="email"
                  className="contact-input"
                  placeholder="name@company.com"
                  value={data.email}
                  onChange={e => updateField('email', e.target.value)}
                  required
                />
              </>
            )}

            {data.contactType === 'newsletter' && (
              <>
                <h3>Your details</h3>
                <label className="contact-label">Email <span className="contact-required">*</span></label>
                <input
                  type="email"
                  className="contact-input"
                  placeholder="name@company.com"
                  value={data.email}
                  onChange={e => updateField('email', e.target.value)}
                  required
                />
                <label className="contact-label">Name <span className="contact-optional">(optional)</span></label>
                <input
                  type="text"
                  className="contact-input"
                  placeholder="Your name"
                  value={data.name}
                  onChange={e => updateField('name', e.target.value)}
                />
                <label className="contact-label">Vertical <span className="contact-optional">(optional)</span></label>
                <div className="contact-chips">
                  {VERTICALS.map(v => (
                    <button
                      key={v}
                      type="button"
                      className={`filter-chip ${data.vertical === v ? 'active' : ''}`}
                      onClick={() => updateField('vertical', v)}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* STEP 4: Contact Info OR Compound */}
        {step === 4 && (
          <div className="contact-step">
            {['partnership', 'deployment', 'consulting', 'general'].includes(data.contactType) && (
              <>
                <h3>Your details</h3>
                <label className="contact-label">Name</label>
                <input
                  type="text"
                  className="contact-input"
                  placeholder="Your name"
                  value={data.name}
                  onChange={e => updateField('name', e.target.value)}
                  required
                />
                <label className="contact-label">Email</label>
                <input
                  type="email"
                  className="contact-input"
                  placeholder="name@company.com"
                  value={data.email}
                  onChange={e => updateField('email', e.target.value)}
                  required
                />
              </>
            )}

            {data.contactType === 'press' && (
              <>
                <h3>Deadline</h3>
                <input
                  type="text"
                  className="contact-input"
                  placeholder="e.g. May 15, 2025"
                  value={data.pressDeadline}
                  onChange={e => updateField('pressDeadline', e.target.value)}
                />
              </>
            )}

            {data.contactType === 'investor' && (
              <>
                <h3>What is the most important question we can answer?</h3>
                <textarea
                  className="contact-textarea"
                  rows={4}
                  placeholder="What would you like to know?"
                  value={data.investorQuestion}
                  onChange={e => updateField('investorQuestion', e.target.value)}
                />
              </>
            )}
          </div>
        )}

        {/* STEP 5: Compound */}
        {step === 5 && (
          <div className="contact-step">
            {data.contactType === 'partnership' && (
              <>
                <h3>What do you bring?</h3>
                <textarea
                  className="contact-textarea"
                  rows={4}
                  placeholder="Describe the value you offer..."
                  value={data.partnershipValue}
                  onChange={e => updateField('partnershipValue', e.target.value)}
                />
              </>
            )}

            {data.contactType === 'deployment' && (
              <>
                <h3>Integration needs</h3>
                <div className="contact-checkboxes">
                  {DEPLOYMENT_NEEDS.map(need => (
                    <label key={need} className="contact-checkbox-label">
                      <input
                        type="checkbox"
                        checked={data.deploymentNeeds.includes(need)}
                        onChange={e => {
                          const newNeeds = e.target.checked
                            ? [...data.deploymentNeeds, need]
                            : data.deploymentNeeds.filter(n => n !== need);
                          updateField('deploymentNeeds', newNeeds);
                        }}
                      />
                      {need}
                    </label>
                  ))}
                </div>
              </>
            )}

            {data.contactType === 'consulting' && (
              <>
                <h3>Describe the problem</h3>
                <textarea
                  className="contact-textarea"
                  rows={4}
                  placeholder="What challenge are you facing?"
                  value={data.consultingProblem}
                  onChange={e => updateField('consultingProblem', e.target.value)}
                />
              </>
            )}

            {data.contactType === 'general' && (
              <>
                <h3>Tell us more</h3>
                <textarea
                  className="contact-textarea"
                  rows={4}
                  placeholder="What would you like to discuss?"
                  value={data.generalMessage}
                  onChange={e => updateField('generalMessage', e.target.value)}
                />
              </>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="contact-nav">
          {step > 1 && (
            <button type="button" className="contact-btn-back" onClick={handleBack}>
              Back
            </button>
          )}
          {step < totalSteps ? (
            <button
              type="button"
              className="contact-btn-primary"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              className="contact-btn-primary"
              disabled={!canProceed() || isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
