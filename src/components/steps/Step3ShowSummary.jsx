import React, { useState } from 'react';
import { ExternalLink, CheckCircle2, FileText, HelpCircle, AlertCircle, ArrowRight, Award, GraduationCap } from 'lucide-react';

export default function Step3ShowSummary({ selectedCompany, onNextStep }) {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = ['Overview', 'Eligibility', 'Documents', 'Questions', 'Instructions'];

  return (
    <div className="fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Company Header Banner */}
      <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ 
            width: '56px', 
            height: '56px', 
            borderRadius: '16px', 
            background: selectedCompany.logoBg || '#ffffff', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '8px',
            border: '1px solid var(--border-color)'
          }}>
            <img 
              src={selectedCompany.logo} 
              alt={selectedCompany.name} 
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = `<span style="font-size:1.3rem; font-weight:800; color:${selectedCompany.color}">${selectedCompany.name[0]}</span>`;
              }}
            />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>{selectedCompany.role}</h2>
              <span className="badge badge-success">Extracted via AI</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              at <strong style={{ color: 'white' }}>{selectedCompany.name}</strong> • {selectedCompany.category}
            </p>
          </div>
        </div>

        <a 
          href={selectedCompany.url} 
          target="_blank" 
          rel="noreferrer" 
          className="btn-secondary" 
          style={{ fontSize: '0.85rem' }}
        >
          View Original Page <ExternalLink size={14} />
        </a>
      </div>

      {/* Structured Requirements Card */}
      <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
        
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab-pill ${activeTab === tab ? 'active' : ''}`}
              style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content 1: Overview */}
        {activeTab === 'Overview' && (
          <div className="fade-in">
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', color: '#a5b4fc' }}>
              Role & Job Description
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              {selectedCompany.overview}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div className="glass-card" style={{ padding: '1.2rem' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Experience Needed</span>
                <p style={{ fontSize: '1.1rem', fontWeight: '700', color: '#38bdf8', marginTop: '0.2rem' }}>
                  {selectedCompany.eligibility.requiredExperience}
                </p>
              </div>
              <div className="glass-card" style={{ padding: '1.2rem' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Target Batches</span>
                <p style={{ fontSize: '1.1rem', fontWeight: '700', color: '#34d399', marginTop: '0.2rem' }}>
                  {selectedCompany.eligibility.gradYears.join(' & ')}
                </p>
              </div>
              <div className="glass-card" style={{ padding: '1.2rem' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Application Questions</span>
                <p style={{ fontSize: '1.1rem', fontWeight: '700', color: '#c084fc', marginTop: '0.2rem' }}>
                  {selectedCompany.questions.length} screening questions
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Eligibility */}
        {activeTab === 'Eligibility' && (
          <div className="fade-in">
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <GraduationCap size={20} /> Academic & Degree Criteria
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="glass-card" style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', justifyBetween: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>Educational Degree</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{selectedCompany.eligibility.degree}</p>
                </div>
                <span className="badge badge-info">Mandatory</span>
              </div>

              <div className="glass-card" style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', justifyBetween: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>Minimum CGPA Cutoff</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Minimum CGPA of <strong>{selectedCompany.eligibility.minCgpa}</strong> or equivalent percentage
                  </p>
                </div>
                <span className="badge badge-purple">≥ {selectedCompany.eligibility.minCgpa} CGPA</span>
              </div>

              <div className="glass-card" style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', justifyBetween: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>Maximum Active Backlogs</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {selectedCompany.eligibility.maxBacklogs === 0 ? 'No active backlogs allowed at time of application' : `Up to ${selectedCompany.eligibility.maxBacklogs} active backlog permitted`}
                  </p>
                </div>
                <span className={`badge ${selectedCompany.eligibility.maxBacklogs === 0 ? 'badge-success' : 'badge-warning'}`}>
                  Max {selectedCompany.eligibility.maxBacklogs}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 3: Documents */}
        {activeTab === 'Documents' && (
          <div className="fade-in">
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={20} /> Required Document Standards
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {selectedCompany.documents.map((doc, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: '700' }}>{doc.name}</h4>
                    <span className={`badge ${doc.required ? 'badge-purple' : 'badge-info'}`}>
                      {doc.required ? 'Required' : 'Optional'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <span>• Format: <strong style={{ color: 'white' }}>{doc.format}</strong></span>
                    <span>• Size Limit: <strong style={{ color: 'white' }}>&lt; {doc.maxSizeMB} MB</strong></span>
                    <span>• Standard Pattern: <code style={{ color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>{doc.pattern}</code></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content 4: Questions */}
        {activeTab === 'Questions' && (
          <div className="fade-in">
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: '#c084fc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <HelpCircle size={20} /> Application Questions & AI Guidance
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {selectedCompany.questions.map((q, idx) => (
                <div key={q.id} className="glass-card" style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <span style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: '700', flexShrink: 0 }}>
                      {idx + 1}
                    </span>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: 'white' }}>{q.question}</h4>
                      {q.type === 'unexpected' && (
                        <span className="badge badge-warning" style={{ fontSize: '0.68rem', marginTop: '0.3rem' }}>
                          Tricky / Unexpected Question
                        </span>
                      )}
                    </div>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginLeft: '2rem', fontStyle: 'italic' }}>
                    AI Insight: {q.weirdExplanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content 5: Instructions */}
        {activeTab === 'Instructions' && (
          <div className="fade-in">
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={20} /> Official Submission Guidelines
            </h3>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {selectedCompany.instructions.map((inst, idx) => (
                <li key={idx} className="glass-card" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={18} color="#34d399" style={{ flexShrink: 0 }} />
                  <span>{inst}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={onNextStep} className="btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
          Proceed to Upload Documents <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
}
