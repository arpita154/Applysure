import React from 'react';
import { Check } from 'lucide-react';

const STEPS = [
  { id: 1, name: 'Choose Company', icon: '1' },
  { id: 2, name: 'Fetch Requirements', icon: '2' },
  { id: 3, name: 'Show Summary', icon: '3' },
  { id: 4, name: 'Upload Documents', icon: '4' },
  { id: 5, name: 'Check & Reformat', icon: '5' },
  { id: 6, name: 'Answer Questions', icon: '6' },
  { id: 7, name: 'Verify & Review', icon: '7' },
  { id: 8, name: 'Submit Application', icon: '8' },
  { id: 9, name: 'Privacy Vault', icon: '9' },
  { id: 10, name: 'Data Secure', icon: '10' }
];

export default function Stepper({ currentStep, onStepClick }) {
  return (
    <div style={{ width: '100%', overflowX: 'auto', padding: '1.25rem 0', marginBottom: '1.5rem' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        minWidth: '950px',
        maxWidth: '1280px', 
        margin: '0 auto',
        padding: '0 1rem',
        position: 'relative'
      }}>
        {/* Background Connecting Line */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '3rem',
          right: '3rem',
          height: '2px',
          background: 'rgba(255, 255, 255, 0.1)',
          zIndex: 0
        }} />

        {/* Active Line Progress */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '3rem',
          width: `${Math.min(100, Math.max(0, ((currentStep - 1) / (STEPS.length - 1)) * 100))}%`,
          height: '2px',
          background: 'linear-gradient(90deg, #4f46e5 0%, #06b6d4 100%)',
          transition: 'width 0.4s ease-in-out',
          zIndex: 0
        }} />

        {STEPS.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          const isClickable = step.id < currentStep;

          return (
            <div 
              key={step.id}
              onClick={() => isClickable && onStepClick(step.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.4rem',
                zIndex: 1,
                cursor: isClickable ? 'pointer' : 'default',
                opacity: (isActive || isCompleted || step.id <= currentStep + 1) ? 1 : 0.4
              }}
            >
              {/* Step Circle */}
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                fontWeight: '700',
                transition: 'all 0.3s ease',
                background: isCompleted ? '#10b981' : isActive ? 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)' : '#1f293d',
                color: isCompleted || isActive ? 'white' : 'var(--text-muted)',
                border: isActive ? '2px solid rgba(99, 102, 241, 0.6)' : isCompleted ? '2px solid #059669' : '1px solid var(--border-color)',
                boxShadow: isActive ? '0 0 16px rgba(79, 70, 229, 0.5)' : 'none'
              }}>
                {isCompleted ? <Check size={18} strokeWidth={3} /> : step.id}
              </div>

              {/* Step Label */}
              <span style={{
                fontSize: '0.72rem',
                fontWeight: isActive ? '700' : '500',
                color: isActive ? 'white' : isCompleted ? '#34d399' : 'var(--text-muted)',
                textAlign: 'center',
                maxWidth: '85px',
                lineHeight: '1.2'
              }}>
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
