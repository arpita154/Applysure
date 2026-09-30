import React, { useState } from 'react';
import { ShieldCheck, Cpu, Key, CheckCircle, RefreshCw } from 'lucide-react';
import { getLLMConfig, setLLMConfig } from '../services/llmService';

export default function Header({ currentStep, onReset }) {
  const [showSettings, setShowSettings] = useState(false);
  const [llmConfig, setConfigState] = useState(getLLMConfig());
  const [providerInput, setProviderInput] = useState(llmConfig.provider || 'gemini');
  const [keyInput, setKeyInput] = useState(localStorage.getItem('APPLYSURE_LLM_KEY') || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setLLMConfig(providerInput, keyInput);
    setConfigState(getLLMConfig());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setShowSettings(false);
    }, 1200);
  };

  return (
    <>
      <header className="glass-panel" style={{ borderBottom: '1px solid var(--border-color)', borderRadius: 0, padding: '1rem 2rem' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          
          {/* Logo & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ 
              width: '42px', 
              height: '42px', 
              borderRadius: '12px', 
              background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(79, 70, 229, 0.4)'
            }}>
              <ShieldCheck size={26} color="white" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h1 style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.03em' }}>
                  ApplySure <span className="gradient-text">AI</span>
                </h1>
                <span className="badge badge-purple" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>
                  LLM Powered
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                From Confusion to Confirmation — AI-powered application support for every opportunity
              </p>
            </div>
          </div>

          {/* Controls & LLM Config Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* LLM Status Pill */}
            <button 
              onClick={() => setShowSettings(true)}
              className="glass-card" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                padding: '0.45rem 0.85rem', 
                cursor: 'pointer',
                fontSize: '0.82rem',
                color: 'var(--text-main)'
              }}
              title="Configure LLM API Settings"
            >
              <Cpu size={16} color="#06b6d4" />
              <span>Provider: <strong style={{ textTransform: 'capitalize' }}>{llmConfig.provider}</strong></span>
              <span className={`badge ${llmConfig.hasKey ? 'badge-success' : 'badge-info'}`} style={{ fontSize: '0.65rem' }}>
                {llmConfig.hasKey ? 'API Key Active' : 'Built-in AI Fallback'}
              </span>
            </button>

            {/* Reset Button if step > 1 */}
            {currentStep > 1 && (
              <button onClick={onReset} className="btn-secondary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}>
                <RefreshCw size={14} /> Start Over
              </button>
            )}

            {/* Privacy Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#34d399', background: 'rgba(16, 185, 129, 0.08)', padding: '0.45rem 0.75rem', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <ShieldCheck size={14} />
              <span>Zero-Retention Storage</span>
            </div>
          </div>
        </div>
      </header>

      {/* LLM Settings Modal */}
      {showSettings && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
          zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '480px', padding: '1.75rem', background: '#111827' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Key size={20} color="#6366f1" /> LLM Configuration Engine
              </h3>
              <button onClick={() => setShowSettings(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <form onSubmit={handleSaveSettings}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Select LLM Provider
                </label>
                <select 
                  value={providerInput} 
                  onChange={(e) => setProviderInput(e.target.value)}
                  className="input-field"
                  style={{ background: '#1f293d', color: 'white' }}
                >
                  <option value="gemini">Google Gemini API (Recommended)</option>
                  <option value="openai">OpenAI GPT-4o API</option>
                  <option value="claude">Anthropic Claude 3.5 API</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  API Key (Optional — Built-in AI fallback works if blank)
                </label>
                <input 
                  type="password"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder="AIzaSy... or sk-..."
                  className="input-field"
                />
              </div>

              {savedSuccess && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  <CheckCircle size={16} /> Saved configuration successfully!
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setShowSettings(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save Settings</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
