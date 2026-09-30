import React, { useEffect, useState } from 'react';
import { Globe, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { parseCompanyRequirements } from '../../services/llmService';

export default function Step2FetchRequirements({ selectedCompany, onFetchComplete }) {
  const [progress, setProgress] = useState(15);
  const [completedItems, setCompletedItems] = useState([]);

  const extractionSteps = [
    { id: 1, label: 'Reading job description & role expectations', progress: 30 },
    { id: 2, label: 'Extracting eligibility criteria (CGPA, Degree, Batch)', progress: 48 },
    { id: 3, label: 'Finding application instructions & deadlines', progress: 65 },
    { id: 4, label: 'Collecting screening & behavioral questions', progress: 80 },
    { id: 5, label: 'Checking required documents & format rules', progress: 92 },
    { id: 6, label: 'Identifying document naming & size limits', progress: 100 }
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < extractionSteps.length) {
        const item = extractionSteps[index];
        setCompletedItems(prev => [...prev, item.id]);
        setProgress(item.progress);
        index++;
      } else {
        clearInterval(interval);
        // Call service and proceed
        parseCompanyRequirements(selectedCompany.name, selectedCompany.url).then(() => {
          setTimeout(() => {
            onFetchComplete();
          }, 600);
        });
      }
    }, 550);

    return () => clearInterval(interval);
  }, [selectedCompany]);

  return (
    <div className="fade-in" style={{ maxWidth: '750px', margin: '3rem auto', textAlign: 'center' }}>
      
      {/* Glass card wrapper */}
      <div className="glass-panel" style={{ padding: '3rem 2rem', background: 'rgba(17, 24, 39, 0.9)' }}>
        
        {/* Globe icon with spinning glow */}
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            border: '1px solid rgba(99, 102, 241, 0.4)'
          }}>
            <Globe size={42} color="#06b6d4" className="animate-spin-slow" />
          </div>
          <div style={{ position: 'absolute', top: -5, right: -5 }}>
            <Sparkles size={20} color="#a5b4fc" />
          </div>
        </div>

        <h2 className="gradient-title" style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.4rem' }}>
          Fetching requirements...
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '2rem' }}>
          Visiting official careers page for <strong style={{ color: 'white' }}>{selectedCompany.name}</strong> ({selectedCompany.role})
        </p>

        {/* Step List */}
        <div style={{ textAlign: 'left', maxWidth: '520px', margin: '0 auto 2.25rem auto', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {extractionSteps.map((step) => {
            const isDone = completedItems.includes(step.id);
            const isCurrent = completedItems.length + 1 === step.id;

            return (
              <div 
                key={step.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  fontSize: '0.92rem',
                  color: isDone ? '#34d399' : isCurrent ? 'white' : 'var(--text-dim)',
                  fontWeight: isCurrent ? '600' : '400',
                  transition: 'all 0.3s ease'
                }}
              >
                {isDone ? (
                  <CheckCircle2 size={20} color="#10b981" />
                ) : isCurrent ? (
                  <Loader2 size={20} color="#06b6d4" className="animate-spin-slow" />
                ) : (
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid rgba(255, 255, 255, 0.15)' }} />
                )}
                <span>{step.label}</span>
              </div>
            );
          })}
        </div>

        {/* Animated Progress Bar */}
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
            <span>LLM Extraction Engine</span>
            <span>{progress}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ 
              width: `${progress}%`, 
              height: '100%', 
              background: 'linear-gradient(90deg, #4f46e5 0%, #06b6d4 100%)',
              transition: 'width 0.4s ease',
              borderRadius: '4px'
            }} />
          </div>
        </div>

      </div>

    </div>
  );
}
