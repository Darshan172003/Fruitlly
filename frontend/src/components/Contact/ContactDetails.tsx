import React from 'react';
import { MdCorporateFare } from 'react-icons/md';

const infoItems = [
  { label: 'Company Name', value: 'Tulsi Foods' },
  { label: 'GSTIN', value: '27AANFT0134D1ZF' },
  {
    label: 'Phone',
    value: (
      <div className="flex flex-col gap-1">
        <a href="tel:+919422283890" className="hover:text-primary break-all">+91 94222 83890</a>
        <a href="tel:+919422292828" className="hover:text-primary break-all">+91 94222 92828</a>
      </div>
    ),
  },
  {
    label: 'Email',
    value: (
      <div className="flex flex-col gap-1">
        <a href="mailto:contact.fruitlly@gmail.com" className="hover:text-primary break-all">contact.fruitlly@gmail.com</a>
        <a href="mailto:tulsifoods@yahoo.com" className="hover:text-primary break-all">tulsifoods@yahoo.com</a>
      </div>
    ),
  },
  {
    label: 'Office Address',
    value: (
      <a href="https://maps.app.goo.gl/ycWrZgHxGRroWHCa8?g_st=aw" target="_blank" rel="noopener noreferrer" className="hover:text-primary break-all">
        Tulsi Foods, D-45/1/1, MIDC Area, <br /> Jalgaon – 425003, Maharashtra, India
      </a>
    ),
  },
] as const;

const ContactDetails = () => {
  return (
    <div className="lg:col-span-5 space-y-8 lg:h-full flex flex-col">
      <div className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-white/80 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        <h2 className="text-lg sm:text-xl font-bold mb-5 sm:mb-6 flex items-center gap-3">
          <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <MdCorporateFare size={21} />
          </span>
          Corporate Information
        </h2>
        <div className="space-y-5 sm:space-y-6">
          {infoItems.map((item, index) => (
            <div
              key={item.label}
              className={index < infoItems.length - 1 ? 'border-b border-gray-100 pb-4' : ''}
            >
              <p className="text-gray-500 text-[11px] sm:text-xs font-bold uppercase tracking-[0.12em] mb-1.5">{item.label}</p>
              <div className="text-text-dark text-base sm:text-lg font-medium leading-relaxed">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden shadow-md border border-white/80 relative group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl min-h-105 lg:flex-1">
        <iframe
          title="Tulsi Jelly Sweets location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.150064634477!2d75.57957619999999!3d20.9866209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd90f005baf650d%3A0x762756da0b83af70!2sTulsi%20Foods!5e0!3m2!1sen!2sin!4v1772261626308!5m2!1sen!2sin"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full min-h-105"
        />
      </div>
    </div>
  );
};

export default ContactDetails;
