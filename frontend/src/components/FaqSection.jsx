import { useState } from 'react';
import Reveal from './Reveal';

const faqData = [
  {
    q: 'How to add points?',
    a: 'You can add points directly using our verified in-app payment gateways. Your balance updates instantly.',
  },
  {
    q: 'How to withdraw points?',
    a: 'Withdrawals can be requested from your wallet section to your linked accounts. Most requests are processed within minutes.',
  },
  {
    q: 'Are live results updated automatically?',
    a: 'Yes, our dynamic real-time stream updates results directly to your screen the moment they are announced.',
  },
  {
    q: 'Is my data and money safe?',
    a: 'Absolutely. We use bank-grade encryption for every transaction and never share your personal data with third parties.',
  },
];

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section-container">
      <Reveal>
        <div className="section-header">
          <div>
            <span className="section-kicker">Need Help?</span>
            <h2 className="section-title">
              Frequently Asked <span className="gradient">Questions</span>
            </h2>
          </div>
        </div>
      </Reveal>

      <div className="accordion">
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <Reveal key={item.q} delay={index * 80}>
              <div className={`faq-item${isOpen ? ' active' : ''}`}>
                <button
                  className="faq-question"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  {item.q}
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer-wrapper">
                  <div className="faq-answer">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export default FaqSection;
