import React from 'react';
import { ExternalLink, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Step8SubmitApplication({ selectedCompany, onConfirmSubmission }) {
  
  const handleSubmission = () => {
    // Trigger celebratory confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      onConfirmSubmission();
    }, 1200);
  };

  return (
    <div className="fade-in" style={{ maxWidth: '750px', margin: '2rem auto', textAlign: 'center' }}>
      
      <div className="glass-panel" style={{ padding: '3rem 2rem', background: 'rgba(17, 24, 39, 0.95)' }}>
        
        {/* Company Logo Badge */}
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '20px',
          background: selectedCompany.logoBg || '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto',
          padding: '10px',
          border: '1px solid var(--border-color)',
          boxShadow: '0 0 25px rgba(99, 102, 241, 0.3)'
        }}>
          <img 
            src={selectedCompany.logo} 
            alt={selectedCompany.name} 
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentNode.innerHTML = `<span style="font-size:1.6rem; font-weight:800; color:${selectedCompany.color}">${selectedCompany.name[0]}</span>`;
            }}
          />
        </div>

        <h2 className="gradient-title" style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
          You're almost there!
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', maxWidth: '560px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
          You will now be redirected to <strong style={{ color: 'white' }}>{selectedCompany.name}</strong>'s official application website to submit your verified application.
        </p>

        {/* External Portal Button */}
        <div style={{ marginBottom: '2.25rem' }}>
          <a
            href={selectedCompany.url}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            style={{ 
              padding: '0.95rem 2.5rem', 
              fontSize: '1.1rem',
              background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)'
            }}
          >
            Go to Official Website <ExternalLink size={18} />
          </a>
        </div>

        {/* Privacy Note */}
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', maxWidth: '480px', margin: '0 auto 2.25rem auto' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            ApplySure AI will guide you, but <strong style={{ color: '#34d399' }}>you remain in control</strong>.
          </span>
        </div>

        {/* Final Trigger Button to Purge Privacy Vault */}
        <button
          onClick={handleSubmission}
          className="btn-secondary"
          style={{ 
            padding: '0.75rem 1.75rem', 
            fontSize: '0.92rem', 
            borderColor: 'rgba(244, 63, 94, 0.4)', 
            color: '#f43f5e',
            background: 'rgba(244, 63, 94, 0.08)' 
          }}
        >
          Confirm Submission & Purge Privacy Vault <ArrowRight size={16} />
        </button>

      </div>

    </div>
  );
}
