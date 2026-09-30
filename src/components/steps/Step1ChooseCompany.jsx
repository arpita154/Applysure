import React, { useState } from 'react';
import { Search, Globe, ArrowRight, Building2, Briefcase, Sparkles } from 'lucide-react';
import { MOCK_COMPANIES } from '../../data/mockCompanies';

export default function Step1ChooseCompany({ onSelectCompany }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [customUrl, setCustomUrl] = useState('');
  const [customCompanyName, setCustomCompanyName] = useState('');

  const categories = ['All', 'IT & Software', 'Core', 'Government', 'Others'];

  const filteredCompanies = MOCK_COMPANIES.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          company.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || company.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customCompanyName.trim()) return;

    const customCompanyObj = {
      id: `custom-${Date.now()}`,
      name: customCompanyName,
      role: 'General Software Engineer',
      category: 'Custom Entry',
      logoBg: '#4f46e5',
      color: '#06b6d4',
      url: customUrl || 'https://careers.company.com/jobs',
      overview: `Extracted live requirements for ${customCompanyName} from ${customUrl || 'official job portal'}.`,
      eligibility: {
        degree: 'B.E / B.Tech / B.Sc / MCA',
        minCgpa: 6.5,
        gradYears: ['2023', '2024', '2025'],
        maxBacklogs: 0,
        requiredExperience: '0-2 Years'
      },
      documents: [
        { name: 'Resume', format: 'PDF', maxSizeMB: 2, required: true, pattern: 'Resume.pdf' },
        { name: 'Academic Transcripts', format: 'PDF', maxSizeMB: 3, required: true, pattern: 'Transcripts.pdf' },
        { name: 'Identity Proof', format: 'PDF or JPG', maxSizeMB: 2, required: true, pattern: 'ID_Proof.jpg' }
      ],
      instructions: [
        'Upload verified documentation adhering to corporate naming guidelines.',
        'Answer all mandatory screening questions accurately.'
      ],
      questions: [
        {
          id: 'cq1',
          type: 'standard',
          question: `Why do you want to join ${customCompanyName}?`,
          suggestedAnswer: `I admire ${customCompanyName}'s innovation and market leadership. My background in software development matches your technical requirements, and I am excited to contribute to high-impact projects.`,
          weirdExplanation: 'Tests company research and genuine interest in the business model.'
        },
        {
          id: 'cq2',
          type: 'unexpected',
          question: 'What is a technical mistake you made recently and how did you resolve it?',
          suggestedAnswer: 'I misconfigured a router component resulting in circular navigation state. I isolated the route tree, refactored state management, and added unit testing to guarantee route stability.',
          weirdExplanation: 'Evaluates transparency, troubleshooting approach, and continuous learning.'
        }
      ]
    };

    onSelectCompany(customCompanyObj);
  };

  return (
    <div className="fade-in" style={{ maxWidth: '1100px', margin: '0 auto' }}>
      
      {/* Top Banner */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          padding: '0.4rem 1rem', 
          borderRadius: '30px', 
          background: 'rgba(79, 70, 229, 0.12)', 
          border: '1px solid rgba(79, 70, 229, 0.3)',
          color: '#a5b4fc',
          fontSize: '0.85rem',
          fontWeight: '600',
          marginBottom: '1rem'
        }}>
          <Sparkles size={16} /> Step 1 — Select Target Employer
        </div>
        <h2 className="gradient-title" style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
          Find Your Next Opportunity
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', maxWidth: '600px', margin: '0 auto' }}>
          Pick a featured company below or enter any official job post link. ApplySure AI will parse requirements, format documents, and assist with application questions.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Search Box */}
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={20} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search company (e.g. Google, Microsoft, Amazon) or job role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field"
              style={{ paddingLeft: '2.8rem', fontSize: '1rem', height: '50px' }}
            />
          </div>

          {/* Category Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginRight: '0.4rem', fontWeight: '600' }}>
              Categories:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`tab-pill ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Company Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {filteredCompanies.map((company) => (
          <div 
            key={company.id}
            onClick={() => onSelectCompany(company)}
            className="glass-card"
            style={{ 
              padding: '1.5rem', 
              cursor: 'pointer', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div>
              {/* Header row with logo */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ 
                    width: '46px', 
                    height: '46px', 
                    borderRadius: '12px', 
                    background: company.logoBg || '#ffffff', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: '1px solid var(--border-color)',
                    padding: '6px'
                  }}>
                    <img 
                      src={company.logo} 
                      alt={company.name} 
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML = `<span style="font-weight:700; color:${company.color}">${company.name[0]}</span>`;
                      }}
                    />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '700' }}>{company.name}</h3>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{company.category}</span>
                  </div>
                </div>

                <span className="badge badge-info" style={{ fontSize: '0.68rem' }}>
                  Verified
                </span>
              </div>

              {/* Role & Requirements */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: '600', color: 'white', marginBottom: '0.4rem' }}>
                  <Briefcase size={15} color="#06b6d4" />
                  <span>{company.role}</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {company.overview}
                </p>
              </div>

              {/* Eligibility snippets */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                  CGPA ≥ {company.eligibility.minCgpa}
                </span>
                <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                  Batch {company.eligibility.gradYears.join('/')}
                </span>
              </div>
            </div>

            {/* Select Action */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              paddingTop: '0.85rem', 
              borderTop: '1px solid rgba(255, 255, 255, 0.06)' 
            }}>
              <span style={{ fontSize: '0.82rem', color: '#818cf8', fontWeight: '600' }}>
                Fetch Requirements
              </span>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: 'rgba(79, 70, 229, 0.15)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#818cf8'
              }}>
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Company / Job Link Section */}
      <div className="glass-panel" style={{ padding: '1.75rem', background: 'rgba(17, 24, 39, 0.95)' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Globe size={20} color="#06b6d4" /> Apply to any other company?
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Paste the official job description link or enter company details below. ApplySure AI will parse requirements automatically.
        </p>

        <form onSubmit={handleCustomSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '1rem', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Company Name (e.g. OpenAI)"
            value={customCompanyName}
            onChange={(e) => setCustomCompanyName(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="url"
            placeholder="https://careers.company.com/jobs/sde"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="btn-primary" style={{ height: '44px', whiteSpace: 'nowrap' }}>
            Extract Requirements <ArrowRight size={16} />
          </button>
        </form>
      </div>

    </div>
  );
}
