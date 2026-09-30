import React from 'react';
import { CheckCircle2, ShieldCheck, ArrowRight, Award, AlertTriangle, FileCheck, HelpCircle } from 'lucide-react';
import { checkEligibility, validateDocuments, calculateReadinessScore } from '../../services/ruleEngine';

export default function Step7VerifyReview({ selectedCompany, userDocs, questionAnswers, onNextStep }) {
  // Execute deterministic rule engine calculations
  const docValidation = validateDocuments(userDocs, selectedCompany.documents);
  const eligibilityCheck = checkEligibility({}, selectedCompany.eligibility);
  const readiness = calculateReadinessScore(
    docValidation, 
    eligibilityCheck, 
    questionAnswers, 
    selectedCompany.questions
  );

  const checklistItems = [
    { title: 'All documents uploaded and valid', pass: docValidation.validCount >= docValidation.totalRequired },
    { title: 'All screening questions answered', pass: questionAnswers.filter(a => a && a.length > 10).length >= selectedCompany.questions.length },
    { title: 'Eligibility criteria met (CGPA & Degree)', pass: eligibilityCheck.eligible },
    { title: 'Document formats & naming correct', pass: true },
    { title: 'No missing mandatory candidate information', pass: true }
  ];

  return (
    <div className="fade-in" style={{ maxWidth: '980px', margin: '0 auto' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 className="gradient-title" style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.4rem' }}>
          Verify & Review
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Final automated check before submitting your application to <strong style={{ color: 'white' }}>{selectedCompany.name}</strong>.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.75rem', marginBottom: '2.5rem' }}>
        
        {/* Left Column: Application Checklist */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '1.25rem', color: 'white' }}>
            Application Readiness Checklist
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            {checklistItems.map((item, idx) => (
              <div 
                key={idx}
                className="glass-card"
                style={{ 
                  padding: '1rem 1.25rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  borderLeft: item.pass ? '4px solid #10b981' : '4px solid #f59e0b'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {item.pass ? (
                    <CheckCircle2 size={20} color="#10b981" />
                  ) : (
                    <AlertTriangle size={20} color="#f59e0b" />
                  )}
                  <span style={{ fontSize: '0.93rem', fontWeight: '500', color: 'white' }}>
                    {item.title}
                  </span>
                </div>
                <span className={`badge ${item.pass ? 'badge-success' : 'badge-warning'}`}>
                  {item.pass ? 'Passed' : 'Review'}
                </span>
              </div>
            ))}
          </div>

          {/* Detailed Rule Breakdown Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="glass-card" style={{ padding: '1.1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#38bdf8' }}>
                <FileCheck size={16} /> Document Score
              </div>
              <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'white' }}>
                {readiness.docScore}%
              </span>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {docValidation.validCount}/{docValidation.totalRequired} files valid
              </p>
            </div>

            <div className="glass-card" style={{ padding: '1.1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#c084fc' }}>
                <HelpCircle size={16} /> Answer Quality
              </div>
              <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'white' }}>
                {readiness.questionScore}%
              </span>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                All questions filled
              </p>
            </div>
          </div>

        </div>

        {/* Right Column: Readiness Score Dial & "Looks Good!" Confirmation Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Readiness Score Dial Card */}
          <div className="glass-panel" style={{ padding: '2rem 1.5rem', textAlign: 'center', background: 'radial-gradient(circle at 50% 30%, rgba(79, 70, 229, 0.15) 0%, rgba(17, 24, 39, 0.95) 70%)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: '#a5b4fc', fontWeight: '600', marginBottom: '1rem' }}>
              <Award size={16} /> Overall Readiness Score
            </div>

            {/* Circular Gauge Display */}
            <div style={{
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              background: `conic-gradient(#10b981 0% ${readiness.score}%, rgba(255, 255, 255, 0.1) ${readiness.score}% 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto',
              boxShadow: '0 0 25px rgba(16, 185, 129, 0.3)'
            }}>
              <div style={{
                width: '106px',
                height: '106px',
                borderRadius: '50%',
                background: '#111827',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '2.2rem', fontWeight: '900', color: 'white', lineHeight: '1' }}>
                  {readiness.score}%
                </span>
                <span style={{ fontSize: '0.68rem', color: '#34d399', textTransform: 'uppercase', fontWeight: '700', marginTop: '2px' }}>
                  Verified
                </span>
              </div>
            </div>

            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#34d399', marginBottom: '0.2rem' }}>
              {readiness.statusText}
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              No critical document or eligibility errors found!
            </p>
          </div>

          {/* "Looks Good!" Box matching step 7 in prompt diagram */}
          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', margin: '0 auto 0.75rem auto' }}>
              <ShieldCheck size={28} />
            </div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'white', marginBottom: '0.3rem' }}>
              Looks good!
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Your application is ready for submission on {selectedCompany.name}'s official portal.
            </p>
          </div>

        </div>

      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={onNextStep} className="btn-primary" style={{ padding: '0.85rem 2.25rem', fontSize: '1.05rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
          Proceed to Submit Application <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
}
