import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, Trash2, ArrowRight, Sparkles, AlertTriangle, Shield, Key, Lock, Check } from 'lucide-react';

export default function Step4UploadDocuments({ selectedCompany, userDocs, setUserDocs, onNextStep }) {
  const [dragOver, setDragOver] = useState(false);
  const [showDigiLocker, setShowDigiLocker] = useState(false);
  const [digiLockerStep, setDigiLockerStep] = useState('auth'); // 'auth' | 'documents'
  const [mobileNum, setMobileNum] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [selectedDigiDocs, setSelectedDigiDocs] = useState(['digi-aadhaar', 'digi-transcript', 'digi-degree']);
  const [authenticating, setAuthenticating] = useState(false);

  const digiLockerVault = [
    {
      id: 'digi-aadhaar',
      name: 'Aadhaar_Card_UIDAI_Verified.pdf',
      type: 'Government ID',
      issuer: 'UIDAI — Government of India',
      size: 420 * 1024,
      date: '2024-05-12'
    },
    {
      id: 'digi-transcript',
      name: 'Academic_Transcript_Degree_Verified.pdf',
      type: 'Academic Transcript',
      issuer: 'Central Board of Secondary & Higher Education',
      size: 850 * 1024,
      date: '2024-06-20'
    },
    {
      id: 'digi-degree',
      name: 'BTech_Degree_Certificate_Verified.pdf',
      type: 'Resume',
      issuer: 'National Academic Depository (NAD)',
      size: 1.1 * 1024 * 1024,
      date: '2024-07-15'
    }
  ];

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newDocs = files.map(file => ({
      id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: file.name,
      size: file.size,
      type: inferDocType(file.name),
      rawFile: file,
      status: 'uploaded',
      source: 'local'
    }));

    setUserDocs(prev => [...prev, ...newDocs]);
  };

  const inferDocType = (fileName) => {
    const lower = fileName.toLowerCase();
    if (lower.includes('resume') || lower.includes('cv')) return 'Resume';
    if (lower.includes('transcript') || lower.includes('marksheet')) return 'Academic Transcript';
    if (lower.includes('aadhar') || lower.includes('id') || lower.includes('govt')) return 'Government ID';
    return 'Project Portfolio Certificate';
  };

  const loadSampleDocs = () => {
    const samples = [
      {
        id: 'sample-1',
        name: 'John_Doe Resume draft v2 final.pdf',
        size: 1.2 * 1024 * 1024,
        type: 'Resume',
        status: 'uploaded',
        source: 'local'
      },
      {
        id: 'sample-2',
        name: 'Academic Transcript 2024.pdf',
        size: 900 * 1024,
        type: 'Academic Transcript',
        status: 'uploaded',
        source: 'local'
      },
      {
        id: 'sample-3',
        name: 'Aadhar Card scan.jpg',
        size: 450 * 1024,
        type: 'Government ID',
        status: 'uploaded',
        source: 'local'
      }
    ];

    setUserDocs(samples);
  };

  const handleDigiLockerAuth = (e) => {
    e.preventDefault();
    setAuthenticating(true);
    setTimeout(() => {
      setAuthenticating(false);
      setDigiLockerStep('documents');
    }, 1000);
  };

  const importFromDigiLocker = () => {
    const docsToImport = digiLockerVault
      .filter(d => selectedDigiDocs.includes(d.id))
      .map(d => ({
        id: `digi-${Date.now()}-${d.id}`,
        name: d.name,
        size: d.size,
        type: d.type,
        status: 'uploaded',
        source: 'DigiLocker',
        isDigiLockerVerified: true,
        issuer: d.issuer
      }));

    // Deduplicate and append
    setUserDocs(prev => {
      const existingNames = new Set(prev.map(p => p.name));
      const filteredNew = docsToImport.filter(d => !existingNames.has(d.name));
      return [...prev, ...filteredNew];
    });

    setShowDigiLocker(false);
    setDigiLockerStep('auth');
  };

  const removeDoc = (id) => {
    setUserDocs(prev => prev.filter(d => d.id !== id));
  };

  return (
    <div className="fade-in" style={{ maxWidth: '950px', margin: '0 auto' }}>
      
      {/* Top Banner */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 className="gradient-title" style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.4rem' }}>
          Upload Your Documents
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Upload files from your device, or connect directly with <strong style={{ color: '#06b6d4' }}>DigiLocker</strong> for instant verified document imports.
        </p>
      </div>

      {/* Action Bar with DigiLocker Integration Highlight */}
      <div className="glass-panel" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(79, 70, 229, 0.12) 100%)', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)' }}>
            <Shield size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'white' }}>
              Import Verified Docs from DigiLocker
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Fetch tamper-proof Aadhaar, Degree & Transcripts issued directly by Government of India / NAD.
            </p>
          </div>
        </div>

        <button 
          onClick={() => setShowDigiLocker(true)} 
          className="btn-primary" 
          style={{ background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)', boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)' }}
        >
          <Shield size={16} /> Connect with DigiLocker
        </button>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div 
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files) {
            handleFileUpload({ target: { files: e.dataTransfer.files } });
          }
        }}
        className="glass-panel"
        style={{ 
          padding: '2.5rem 1.5rem', 
          textAlign: 'center', 
          border: dragOver ? '2px dashed #06b6d4' : '2px dashed rgba(255, 255, 255, 0.15)',
          background: dragOver ? 'rgba(6, 182, 212, 0.05)' : 'rgba(17, 24, 39, 0.6)',
          marginBottom: '1.5rem',
          transition: 'all var(--transition-fast)'
        }}
      >
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'rgba(79, 70, 229, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem auto',
          color: '#818cf8'
        }}>
          <Upload size={30} />
        </div>

        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.4rem' }}>
          Or drag and drop local files here
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Supports PDF, JPG, PNG up to 5MB
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <label className="btn-primary" style={{ cursor: 'pointer' }}>
            <Upload size={16} /> Choose Local Files
            <input 
              type="file" 
              multiple 
              accept=".pdf,.jpg,.jpeg,.png,.docx"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </label>

          <button onClick={loadSampleDocs} className="btn-secondary" style={{ background: 'rgba(6, 182, 212, 0.12)', borderColor: 'rgba(6, 182, 212, 0.3)', color: '#38bdf8' }}>
            <Sparkles size={16} /> Auto-Load Demo Documents
          </button>
        </div>
      </div>

      {/* Uploaded Documents List */}
      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.05rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Uploaded Files ({userDocs.length})</span>
          {userDocs.length > 0 && <span className="badge badge-success">Files Ready</span>}
        </h3>

        {userDocs.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <AlertTriangle size={24} color="#f59e0b" style={{ display: 'block', margin: '0 auto 0.5rem auto' }} />
            No documents uploaded yet. Connect with DigiLocker or click "Auto-Load Demo Documents" above!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {userDocs.map((doc) => (
              <div 
                key={doc.id}
                className="glass-card"
                style={{ 
                  padding: '1rem 1.25rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  flexWrap: 'wrap', 
                  gap: '0.75rem',
                  borderLeft: doc.isDigiLockerVerified ? '4px solid #0284c7' : '4px solid rgba(255,255,255,0.1)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: doc.isDigiLockerVerified ? 'rgba(2, 132, 199, 0.15)' : 'rgba(79, 70, 229, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: doc.isDigiLockerVerified ? '#38bdf8' : '#818cf8'
                  }}>
                    {doc.isDigiLockerVerified ? <Shield size={22} /> : <FileText size={20} />}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: 'white' }}>{doc.name}</h4>
                      {doc.isDigiLockerVerified && (
                        <span className="badge badge-info" style={{ fontSize: '0.68rem', background: 'rgba(2, 132, 199, 0.2)', color: '#38bdf8' }}>
                          DigiLocker Verified ✔
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {(doc.size / 1024).toFixed(0)} KB • {doc.type} {doc.issuer ? `• ${doc.issuer}` : ''}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#34d399', fontSize: '0.85rem', fontWeight: '600' }}>
                    <CheckCircle2 size={18} /> Ready
                  </div>
                  <button 
                    onClick={() => removeDoc(doc.id)}
                    style={{ background: 'none', border: 'none', color: '#f43f5e', cursor: 'pointer', padding: '4px' }}
                    title="Remove document"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          onClick={onNextStep} 
          disabled={userDocs.length === 0}
          className="btn-primary" 
          style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}
        >
          Check & Reformat Documents <ArrowRight size={18} />
        </button>
      </div>

      {/* DigiLocker OAuth & Document Sync Modal */}
      {showDigiLocker && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
          zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '520px', padding: '2rem', background: '#0f172a', border: '1px solid rgba(6, 182, 212, 0.4)' }}>
            
            {/* DigiLocker Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <Shield size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'white' }}>DigiLocker Sync</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Government of India Digital Document Wallet</span>
                </div>
              </div>
              <button onClick={() => setShowDigiLocker(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            {digiLockerStep === 'auth' ? (
              <form onSubmit={handleDigiLockerAuth}>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  Enter your Aadhaar / Mobile number registered with DigiLocker to fetch verified educational and identity documents.
                </p>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    Aadhaar / Registered Mobile Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 98765 43210 or 12-digit Aadhaar"
                    value={mobileNum}
                    onChange={(e) => setMobileNum(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    6-Digit Security PIN
                  </label>
                  <input
                    type="password"
                    maxLength={6}
                    placeholder="******"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button type="button" onClick={() => setShowDigiLocker(false)} className="btn-secondary">Cancel</button>
                  <button type="submit" disabled={authenticating} className="btn-primary" style={{ background: '#0284c7' }}>
                    {authenticating ? 'Authenticating with DigiLocker...' : 'Sign In & Connect'}
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#38bdf8', marginBottom: '0.5rem' }}>
                  Select Issued Documents to Import:
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Verified documents fetched directly from UIDAI & National Academic Depository (NAD).
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {digiLockerVault.map((doc) => {
                    const isSelected = selectedDigiDocs.includes(doc.id);
                    return (
                      <div 
                        key={doc.id}
                        onClick={() => {
                          setSelectedDigiDocs(prev => 
                            isSelected ? prev.filter(id => id !== doc.id) : [...prev, doc.id]
                          );
                        }}
                        className="glass-card"
                        style={{ 
                          padding: '0.85rem 1rem', 
                          cursor: 'pointer', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between',
                          border: isSelected ? '1px solid #0284c7' : '1px solid var(--border-color)',
                          background: isSelected ? 'rgba(2, 132, 199, 0.12)' : 'transparent'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ width: '22px', height: '22px', borderRadius: '4px', border: '1px solid #0284c7', background: isSelected ? '#0284c7' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            {isSelected && <Check size={14} />}
                          </div>
                          <div>
                            <h5 style={{ fontSize: '0.9rem', fontWeight: '600', color: 'white' }}>{doc.name}</h5>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{doc.issuer}</span>
                          </div>
                        </div>
                        <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>UIDAI / NAD Verified</span>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button type="button" onClick={() => setDigiLockerStep('auth')} className="btn-secondary">Back</button>
                  <button onClick={importFromDigiLocker} className="btn-primary" style={{ background: '#0284c7' }}>
                    Import {selectedDigiDocs.length} Verified Docs
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
