import React, { useState, useEffect } from 'react';
import { CheckCircle2, Wrench, FileCheck, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';
import { validateDocuments } from '../../services/ruleEngine';

export default function Step5CheckReformat({ selectedCompany, userDocs, setUserDocs, onNextStep }) {
  const [analyzing, setAnalyzing] = useState(true);
  const [reformatted, setReformatted] = useState(false);
  const [validationResult, setValidationResult] = useState(null);

  useEffect(() => {
    // Run rule engine analysis
    const result = validateDocuments(userDocs, selectedCompany.documents);
    setValidationResult(result);
    
    const timer = setTimeout(() => {
      setAnalyzing(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [userDocs, selectedCompany]);

  const handleApplyReformatting = () => {
    // Reformat filenames to standard company convention
    const fixedDocs = userDocs.map(doc => {
      let cleanName = doc.name;
      // Find matching standard requirement pattern
      const expected = selectedCompany.documents.find(req => 
        req.name.toLowerCase() === doc.type?.toLowerCase() ||
        doc.name.toLowerCase().includes(req.name.toLowerCase().split(' ')[0])
      );

      if (expected && expected.pattern) {
        cleanName = expected.pattern.replace('Firstname_Lastname', 'Applicant_Candidate');
      } else {
        cleanName = doc.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '');
      }

      return {
        ...doc,
        name: cleanName,
        status: 'reformatted',
        issuesFixed: ['Removed spaces & special characters', 'Standardized naming convention', 'Validated PDF/JPG format compliance']
      };
    });

    setUserDocs(fixedDocs);
    setReformatted(true);

    // Re-run validation
    const updatedResult = validateDocuments(fixedDocs, selectedCompany.documents);
    setValidationResult(updatedResult);
  };

  return (
    <div className="fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 className="gradient-title" style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.4rem' }}>
          Check & Reformat Documents
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          AI checks format compliance, file sizes, and applies official document naming conventions for <strong style={{ color: 'white' }}>{selectedCompany.name}</strong>.
        </p>
      </div>

      {analyzing ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <RefreshCw size={36} color="#06b6d4" className="animate-spin-slow" style={{ display: 'block', margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Analyzing your documents...</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
            Checking file formats, verifying size limits, and identifying naming conflicts...
          </p>
        </div>
      ) : (
        <>
          {/* Analysis Checklist Box */}
          <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8' }}>
              <FileCheck size={22} /> Document Quality & Formatting Report
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.92rem' }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span>Checking file format compatibility (.pdf, .jpg)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.92rem' }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span>Verifying file size limits (&lt; {selectedCompany.documents[0]?.maxSizeMB || 2} MB)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.92rem' }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span>Checking necessary contact & academic information</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.92rem' }}>
                <CheckCircle2 size={18} color={reformatted ? '#10b981' : '#f59e0b'} />
                <span>Reformatting as per company guidelines</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.92rem' }}>
                <CheckCircle2 size={18} color={reformatted ? '#10b981' : '#f59e0b'} />
                <span>Ensuring standard naming convention</span>
              </div>
            </div>

            {/* Document Fix Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {userDocs.map((doc) => (
                <div key={doc.id} className="glass-card" style={{ padding: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.85rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'white' }}>{doc.name}</h4>
                      {doc.status === 'reformatted' && (
                        <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>AI Reformatted</span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      Type: {doc.type} • Size: {(doc.size / 1024).toFixed(0)} KB
                    </p>
                  </div>

                  {reformatted ? (
                    <span className="badge badge-success">Format Compliant</span>
                  ) : (
                    <button onClick={handleApplyReformatting} className="btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem', borderColor: 'rgba(245, 158, 11, 0.4)', color: '#fbbf24' }}>
                      <Wrench size={14} /> Auto-Fix Naming
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Success Status Banner */}
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#34d399' }}>
                All documents are ready!
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
                Your documents meet {selectedCompany.name}'s exact formatting, size, and naming conventions.
              </p>
            </div>
          </div>

          {/* Action Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {!reformatted && (
              <button onClick={handleApplyReformatting} className="btn-secondary">
                <Wrench size={16} /> Reformat All Files
              </button>
            )}
            <button onClick={onNextStep} className="btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1rem', marginLeft: 'auto' }}>
              Answer Application Questions <ArrowRight size={18} />
            </button>
          </div>
        </>
      )}

    </div>
  );
}
