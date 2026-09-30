import React from 'react';
import { Lock, ShieldCheck, CheckCircle2, RefreshCw, Sparkles, Heart } from 'lucide-react';

export default function Step10DataSecure({ selectedCompany, onReset }) {
  return (
    <div className="fade-in" style={{ maxWidth: '780px', margin: '2rem auto', textAlign: 'center' }}>
      
      <div className="glass-panel" style={{ padding: '3.5rem 2rem', background: 'radial-gradient(circle at 50% 30%, rgba(79, 70, 229, 0.12) 0%, rgba(17, 24, 39, 0.95) 75%)' }}>
        
        {/* Golden Lock Badge */}
        <div style={{
          width: '84px',
          height: '84px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto',
          color: 'white',
          boxShadow: '0 0 35px rgba(245, 158, 11, 0.4)'
        }}>
          <Lock size={44} />
        </div>

        <h2 className="gradient-title" style={{ fontSize: '2.4rem', fontWeight: '800', marginBottom: '0.4rem' }}>
          Data Secure
        </h2>
        <p style={{ color: '#fbbf24', fontSize: '1.05rem', fontWeight: '600', marginBottom: '2rem' }}>
          Your privacy is our highest priority
        </p>

        {/* Security Feature Checklist Card */}
        <div className="glass-card" style={{ padding: '1.75rem', textAlign: 'left', maxWidth: '480px', margin: '0 auto 2.5rem auto', background: 'rgba(0, 0, 0, 0.4)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={20} color="#34d399" /> Your Data Stays Yours
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem', color: 'white' }}>
              <CheckCircle2 size={18} color="#10b981" />
              <span>Not stored beyond immediate use session</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem', color: 'white' }}>
              <CheckCircle2 size={18} color="#10b981" />
              <span>End-to-end encrypted during LLM processing</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem', color: 'white' }}>
              <CheckCircle2 size={18} color="#10b981" />
              <span>Secure, isolated, and completely private</span>
            </div>
          </div>
        </div>

        {/* Brand Tagline */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h4 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'white' }}>
            ApplySure <span className="gradient-text">AI</span>
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Apply smarter. Apply with confidence. Skilled candidates get hired for their skills — not rejected over paperwork!
          </p>
        </div>

        {/* Start New Application */}
        <button onClick={onReset} className="btn-primary" style={{ padding: '0.9rem 2.25rem', fontSize: '1.05rem' }}>
          <RefreshCw size={18} /> Prepare Another Application
        </button>

      </div>

    </div>
  );
}
