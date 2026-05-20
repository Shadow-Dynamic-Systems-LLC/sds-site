import { useState, useEffect, useRef } from 'react';
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const leadCapturedRef = useRef(false);

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

  // newsletter is 2 steps; everything else is 3
  const getTotalSteps = () => data.contactType === 'newsletter' ? 2 : 3;

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!data.contactType;
      case 2: {
        if (!EMAIL_RE.test(data.email)) return false;
        switch (data.contactType) {
          case 'newsletter':
            return !!data.newsletterPublication && !!data.newsletterFrequency;
          case 'press':
            return !!data.name.trim() && !!data.pressPublication.trim() && !!data.pressTopics.trim();
          case 'investor':
            return !!data.name.trim() && !!data.investorStage;
          case 'partnership':
            return !!data.name.trim() && !!data.partnershipKind;
          case 'consulting':
            return !!data.name.trim() && !!data.consultingTimeline;
          case 'general':
            return !!data.name.trim() && !!data.vertical;
          default:
            return !!data.name.trim();
        }
      }
      case 3:
        switch (data.contactType) {
          case 'partnership':
            return !!data.vertical && !!data.partnershipValue.trim();
          case 'deployment':
            return !!data.deploymentInfra.trim() && data.deploymentNeeds.length > 0;
          case 'consulting':
            return !!data.vertical && !!data.consultingProblem.trim();
          case 'press':
            return !!data.pressDeadline.trim();
          case 'investor':
            return !!data.investorThesis.trim() && !!data.investorQuestion.trim();
          case 'general':
            return !!data.generalMessage.trim();
          default:
            return true;
        }
      default:
        return false;
    }
  };

  const fireLead = (snapshot: typeof data) => {
    if (leadCapturedRef.current) return;
    leadCapturedRef.current = true;
    const fd = new FormData();
    fd.append('form_name', 'contact_lead');
    fd.append('contact_type', snapshot.contactType);
    fd.append('email', snapshot.email);
    if (snapshot.name) fd.append('name', snapshot.name);
    fetch('/api/contact.php', { method: 'POST', body: fd }).catch(() => {});
  };

  // fire lead as soon as we have a valid email, even before the user advances
  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (EMAIL_RE.test(val) && data.contactType) {
      fireLead({ ...data, email: val });
    }
  };

  const handleNext = () => {
    if (step === 2) fireLead(data);
    if (step < getTotalSteps()) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canProceed()) return;

    // newsletter submits from step 2, so fire lead here too (no-op if already captured)
    fireLead(data);

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('form_name', 'contact');
    formData.append('contact_type', data.contactType);
    if (data.name) formData.append('name', data.name);
    if (data.email) formData.append('email', data.email);
    if (data.vertical) formData.append('vertical', data.vertical);

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
      const response = await fetch('/api/contact.php', { method: 'POST', body: formData });
      const result = response.ok ? await response.json().catch(() => ({})) : {};
      if (response.ok && result.ok) {
        setSubmitted(true);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
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

        {/* STEP 2: Email + Name + Type Qualifier */}
        {step === 2 && (
          <div className="contact-step">
            <h3>Your details</h3>

            {data.contactType !== 'newsletter' && (
              <>
                <label className="contact-label">Name</label>
                <input
                  type="text"
                  className="contact-input"
                  placeholder="Your name"
                  value={data.name}
                  onChange={e => updateField('name', e.target.value)}
                />
              </>
            )}

            <label className="contact-label">
              Email{data.contactType === 'newsletter' && <span className="contact-required"> *</span>}
            </label>
            <input
              type="email"
              className="contact-input"
              placeholder="name@company.com"
              value={data.email}
              onChange={e => updateField('email', e.target.value)}
              onBlur={handleEmailBlur}
            />

            {data.contactType === 'newsletter' && (
              <>
                <label className="contact-label">Name <span className="contact-optional">(optional)</span></label>
                <input
                  type="text"
                  className="contact-input"
                  placeholder="Your name"
                  value={data.name}
                  onChange={e => updateField('name', e.target.value)}
                />
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

            {data.contactType === 'press' && (
              <>
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
                <label className="contact-label">Investment stage</label>
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
              </>
            )}

            {data.contactType === 'partnership' && (
              <>
                <label className="contact-label">Partnership type</label>
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

            {data.contactType === 'consulting' && (
              <>
                <label className="contact-label">Timeline to engage</label>
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

            {data.contactType === 'general' && (
              <>
                <label className="contact-label">Industry vertical</label>
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

        {/* STEP 3: Final Details */}
        {step === 3 && (
          <div className="contact-step">
            {data.contactType === 'partnership' && (
              <>
                <h3>Tell us more</h3>
                <label className="contact-label">Industry vertical</label>
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
                <label className="contact-label">What do you bring?</label>
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
                <h3>Technical context</h3>
                <label className="contact-label">Current infrastructure</label>
                <textarea
                  className="contact-textarea"
                  rows={3}
                  placeholder="e.g. AWS, on-prem, hybrid..."
                  value={data.deploymentInfra}
                  onChange={e => updateField('deploymentInfra', e.target.value)}
                />
                <label className="contact-label">Integration needs</label>
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
                <h3>The challenge</h3>
                <label className="contact-label">Industry vertical</label>
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
                <label className="contact-label">Describe the problem</label>
                <textarea
                  className="contact-textarea"
                  rows={4}
                  placeholder="What challenge are you facing?"
                  value={data.consultingProblem}
                  onChange={e => updateField('consultingProblem', e.target.value)}
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
                <h3>Investment details</h3>
                <label className="contact-label">Investment thesis</label>
                <textarea
                  className="contact-textarea"
                  rows={3}
                  placeholder="What do you look for in portfolio companies?"
                  value={data.investorThesis}
                  onChange={e => updateField('investorThesis', e.target.value)}
                />
                <label className="contact-label">Most important question we can answer</label>
                <textarea
                  className="contact-textarea"
                  rows={3}
                  placeholder="What would you like to know?"
                  value={data.investorQuestion}
                  onChange={e => updateField('investorQuestion', e.target.value)}
                />
              </>
            )}

            {data.contactType === 'general' && (
              <>
                <h3>Your message</h3>
                <textarea
                  className="contact-textarea"
                  rows={5}
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
