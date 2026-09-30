import React, { useState, useEffect } from 'react';
import { Trash2, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';

export default function Step9PrivacyVault({ userDocs, setUserDocs, onPurgeComplete }) {
  const [progress, setProgress] = useState(10);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUserDocs([]); // Purge all temporary documents from app state!
          setDone(true);
          setTimeout(() => {
            onPurgeComplete();
          }, 1800);
          return 100;
        }
        return prev + 22;
      });
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fade-in" style={{ maxWidth: '720px', margin: '3rem auto', textAlign: 'center' }}>
      
      <div className="glass-panel" style={{ padding: '3.5rem 2rem', background: 'rgba(17, 24, 39, 0.95)' }}>
        
        {/* Animated Trash / Purge Icon */}
        <div style={{
          width: '84px',
          height: '84px',
          borderRadius: '50%',
          background: done ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto',
          color: done ? '#34d399' : '#f43f5e',
          border: done ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(244, 63, 94, 0.4)',
          boxShadow: done ? '0 0 30px rgba(16, 185, 129, 0.3)' : '0 0 30px rgba(244, 63, 94, 0.3)'
        }}>
          {done ? <CheckCircle2 size={46} /> : <Trash2 size={42} className="animate-pulse-glow" />}
        </div>

        <h2 className="gradient-title" style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.4rem' }}>
          {done ? 'Done! Data Securely Removed' : 'Cleaning up...'}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2.25rem' }}>
          {done 
            ? 'All temporary uploaded documents have been permanently wiped from memory.' 
            : 'All uploaded documents are being permanently deleted from our servers to protect your privacy.'
          }
        </p>

        {/* Live Progress Bar */}
        <div style={{ maxWidth: '480px', margin: '0 auto 2rem auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: '600' }}>
            <span>Privacy Vault Purge Cycle</span>
            <span style={{ color: done ? '#34d399' : '#f43f5e' }}>{progress}%</span>
          </div>
          <div style={{ width: '100%', height: '10px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{ 
              width: `${progress}%`, 
              height: '100%', 
              background: done ? 'linear-gradient(90deg, #10b981 0%, #34d399 100%)' : 'linear-gradient(90deg, #f43f5e 0%, #fb7185 100%)',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>

        {/* Done Callout Box */}
        {done && (
          <div className="fade-in" style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#34d399', fontSize: '0.92rem', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} /> Zero footprint remaining. Your data stays yours!
          </div>
        )}

      </div>

    </div>
  );
}
