import React, { useState } from 'react';
import { HelpCircle, Sparkles, RefreshCw, Scissors, Briefcase, Check, ArrowRight, Lightbulb, Keyboard } from 'lucide-react';
import { refineAnswerTone } from '../../services/llmService';

export default function Step6AnswerQuestions({ selectedCompany, questionAnswers, setQuestionAnswers, onNextStep }) {
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [focusedFieldIdx, setFocusedFieldIdx] = useState(null);
  const [loadingTone, setLoadingTone] = useState(false);

  const questions = selectedCompany.questions || [];
  const currentQuestion = questions[activeQuestionIdx] || questions[0];

  const handleAnswerChange = (idx, text) => {
    const updated = [...questionAnswers];
    updated[idx] = text;
    setQuestionAnswers(updated);
  };

  const handleKeyDown = (e, idx, suggestion) => {
    // If TAB key is pressed inside answer field, auto-accept ghost text suggestion!
    if (e.key === 'Tab' && suggestion) {
      e.preventDefault();
      handleAnswerChange(idx, suggestion);
    }
  };

  const applyToneModifier = async (mode) => {
    setLoadingTone(true);
    const currentAns = questionAnswers[activeQuestionIdx] || currentQuestion.suggestedAnswer;
    const newText = await refineAnswerTone(currentAns, mode);
    handleAnswerChange(activeQuestionIdx, newText);
    setLoadingTone(false);
  };

  return (
    <div className="fade-in" style={{ maxWidth: '1100px', margin: '0 auto' }}>
      
      {/* Title Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 className="gradient-title" style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.4rem' }}>
          Answer Application Questions
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          AI generates personalized, impact-driven responses. Focus the answer box and press <kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border-color)', color: '#38bdf8' }}>Tab</kbd> to accept AI suggestions!
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'start' }}>
        
        {/* Left Column: Main Question & Autocomplete Answer Workspace */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          
          {/* Question Selector Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setActiveQuestionIdx(idx)}
                className={`tab-pill ${activeQuestionIdx === idx ? 'active' : ''}`}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}
              >
                <span>Question {idx + 1}</span>
                {questionAnswers[idx] && <Check size={14} color="#34d399" />}
              </button>
            ))}
          </div>

          {/* Active Question Box */}
          {currentQuestion && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className="badge badge-purple">
                  {currentQuestion.type === 'unexpected' ? 'Tricky / Behavioral Question' : 'Technical / Standard Question'}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Question {activeQuestionIdx + 1} of {questions.length}
                </span>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'white', marginBottom: '1.25rem', lineHeight: '1.5' }}>
                {currentQuestion.question}
              </h3>

              {/* AI Suggested Answer Header Pill */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#818cf8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sparkles size={16} /> AI Suggested Answer
                </span>
                
                {/* Keyboard Tab Hint Pill */}
                <span style={{ fontSize: '0.75rem', color: '#38bdf8', background: 'rgba(6, 182, 212, 0.1)', padding: '2px 8px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Keyboard size={13} /> Focus & Press TAB to Autocomplete
                </span>
              </div>

              {/* Interactive Textarea with Ghost Text Suggestion */}
              <div className="autocomplete-container" style={{ marginBottom: '1rem' }}>
                
                {/* Ghost Text Overlay */}
                {(!questionAnswers[activeQuestionIdx] || focusedFieldIdx === activeQuestionIdx) && (
                  <div className="ghost-text-overlay">
                    <span style={{ visibility: 'hidden' }}>{questionAnswers[activeQuestionIdx] || ''}</span>
                    {(!questionAnswers[activeQuestionIdx] || questionAnswers[activeQuestionIdx].length < currentQuestion.suggestedAnswer.length) && (
                      <span className="ghost-suggestion-text">
                        {currentQuestion.suggestedAnswer.slice(questionAnswers[activeQuestionIdx]?.length || 0)}
                      </span>
                    )}
                  </div>
                )}

                <textarea
                  value={questionAnswers[activeQuestionIdx] || ''}
                  onChange={(e) => handleAnswerChange(activeQuestionIdx, e.target.value)}
                  onFocus={() => setFocusedFieldIdx(activeQuestionIdx)}
                  onBlur={() => setFocusedFieldIdx(null)}
                  onKeyDown={(e) => handleKeyDown(e, activeQuestionIdx, currentQuestion.suggestedAnswer)}
                  placeholder="Click here to place cursor — AI suggestion will appear. Press TAB key to autocomplete!"
                  className="autocomplete-textarea"
                  style={{ height: '150px' }}
                />
              </div>

              {/* Autocomplete Action Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <button
                  onClick={() => handleAnswerChange(activeQuestionIdx, currentQuestion.suggestedAnswer)}
                  className="btn-secondary"
                  style={{ fontSize: '0.82rem', padding: '0.4rem 0.85rem', color: '#38bdf8', borderColor: 'rgba(6, 182, 212, 0.3)' }}
                >
                  <Keyboard size={14} /> Insert Full AI Answer
                </button>

                {/* Tone Adjusters */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  <button 
                    disabled={loadingTone}
                    onClick={() => applyToneModifier('regenerate')} 
                    className="btn-secondary" 
                    style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
                  >
                    <RefreshCw size={12} /> Regenerate
                  </button>
                  <button 
                    disabled={loadingTone}
                    onClick={() => applyToneModifier('shorter')} 
                    className="btn-secondary" 
                    style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
                  >
                    <Scissors size={12} /> Make shorter
                  </button>
                  <button 
                    disabled={loadingTone}
                    onClick={() => applyToneModifier('formal')} 
                    className="btn-secondary" 
                    style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
                  >
                    <Briefcase size={12} /> Make formal
                  </button>
                </div>
              </div>

              {/* Next/Prev Question Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <button
                  onClick={() => setActiveQuestionIdx(prev => Math.max(0, prev - 1))}
                  disabled={activeQuestionIdx === 0}
                  className="btn-secondary"
                  style={{ fontSize: '0.85rem' }}
                >
                  Previous Question
                </button>

                {activeQuestionIdx < questions.length - 1 ? (
                  <button
                    onClick={() => setActiveQuestionIdx(prev => Math.min(questions.length - 1, prev + 1))}
                    className="btn-primary"
                    style={{ fontSize: '0.85rem' }}
                  >
                    Next Question <ArrowRight size={16} />
                  </button>
                ) : (
                  <span style={{ fontSize: '0.85rem', color: '#34d399', fontWeight: '600', alignSelf: 'center' }}>
                    All questions reviewed!
                  </span>
                )}
              </div>

            </div>
          )}

        </div>

        {/* Right Column: AI "Why this question is asked" explanation widget matching prompt diagram */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Unexpected Question Insights Box */}
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%)', border: '1px solid rgba(147, 51, 234, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <Lightbulb size={18} />
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'white' }}>
                Even for unexpected questions!
              </h4>
            </div>

            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
              Question Evaluated:
            </span>
            <p style={{ fontSize: '0.85rem', fontWeight: '600', color: '#c084fc', marginBottom: '0.85rem' }}>
              "{currentQuestion.question}"
            </p>

            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
              AI Hiring Explanation:
            </span>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: '1.6', background: 'rgba(0, 0, 0, 0.3)', padding: '0.85rem', borderRadius: '8px' }}>
              {currentQuestion.weirdExplanation}
            </p>
          </div>

          {/* Application Control Summary */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: '700', marginBottom: '0.75rem', color: '#38bdf8' }}>
              You Remain in Control
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              ApplySure AI provides drafts. You can edit any character or regenerate anytime. Nothing is submitted without your final confirmation.
            </p>
          </div>

        </div>

      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
        <button onClick={onNextStep} className="btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
          Verify & Review Readiness <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
}
