import React, { FormEvent, useState } from 'react';
import { MdSend } from 'react-icons/md';

const fieldClassName =
  'w-full h-14 rounded-xl border border-gray-200 bg-white text-text-dark px-4 transition-all duration-200 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 focus:outline-none';

type InquiryFormData = {
  companyName: string;
  contactPerson: string;
  phoneNumber: string;
  emailAddress: string;
  city: string;
  state: string;
  pinCode: string;
  message: string;
};

const initialFormData: InquiryFormData = {
  companyName: '',
  contactPerson: '',
  phoneNumber: '',
  emailAddress: '',
  city: '',
  state: '',
  pinCode: '',
  message: '',
};

const B2BInquiryForm = () => {
  const [formData, setFormData] = useState<InquiryFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setSubmitStatus('idle');
      setSubmitMessage('');

      const response = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit inquiry');
      }

      setSubmitStatus('success');
      setSubmitMessage('Inquiry submitted successfully. Our team will contact you soon.');
      setFormData(initialFormData);
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Failed to send inquiry. Please try again in a moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lg:col-span-7 h-full">
      <div className="group bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/80 p-8 sm:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full">
        <div className="mb-8">
          <span className="inline-flex items-center rounded-full bg-accent-green/15 text-accent-green px-3 py-1 text-xs font-bold tracking-[0.12em] uppercase mb-4">
            Fast Response
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-2">B2B Bulk Order Inquiry</h2>
          <p className="text-gray-600 leading-relaxed">Fill out the form and our team will respond within 24 hours.</p>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-semibold text-text-dark">Company Name</label>
            <input className={fieldClassName} placeholder="e.g. Reliance Retail" type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} required />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-text-dark">Contact Person</label>
            <input className={fieldClassName} placeholder="Your Full Name" type="text" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} required />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-text-dark">Phone Number</label>
            <input className={fieldClassName} placeholder="+91 00000 00000" type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-text-dark">Email Address</label>
            <input className={fieldClassName} placeholder="work@company.com" type="email" name="emailAddress" value={formData.emailAddress} onChange={handleInputChange} required />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-text-dark">City</label>
            <input className={fieldClassName} placeholder="e.g. Mumbai" type="text" name="city" value={formData.city} onChange={handleInputChange} required />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-text-dark">State</label>
            <input className={fieldClassName} placeholder="e.g. Maharashtra" type="text" name="state" value={formData.state} onChange={handleInputChange} required />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-text-dark">Pin Code</label>
            <input className={fieldClassName} placeholder="e.g. 425003" type="text" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} name="pinCode" value={formData.pinCode} onChange={handleInputChange} required />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-semibold text-text-dark">Message / Custom Requirements</label>
            <textarea className="w-full rounded-xl border border-gray-200 bg-white text-text-dark p-4 transition-all duration-200 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder="Tell us more about your specific needs..." rows={4} name="message" value={formData.message} onChange={handleInputChange} required></textarea>
          </div>
          <div className="md:col-span-2 pt-4">
            <button className="w-full bg-primary text-white h-14 rounded-xl text-lg font-bold transition-all duration-300 shadow-lg hover:-translate-y-0.5 hover:brightness-110 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed" type="submit" disabled={isSubmitting}>
              <span>{isSubmitting ? 'Sending...' : 'Submit Inquiry'}</span>
              <MdSend size={18} />
            </button>
            {submitStatus !== 'idle' && (
              <p className={`text-center text-sm mt-3 ${submitStatus === 'success' ? 'text-accent-green' : 'text-primary'}`}>{submitMessage}</p>
            )}
            <p className="text-center text-xs text-gray-500 mt-4">By submitting, you agree to our Terms of Service and Privacy Policy.</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default B2BInquiryForm;
