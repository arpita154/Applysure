import React, { useState } from 'react';
import Header from './components/Header';
import Stepper from './components/Stepper';
import Step1ChooseCompany from './components/steps/Step1ChooseCompany';
import Step2FetchRequirements from './components/steps/Step2FetchRequirements';
import Step3ShowSummary from './components/steps/Step3ShowSummary';
import Step4UploadDocuments from './components/steps/Step4UploadDocuments';
import Step5CheckReformat from './components/steps/Step5CheckReformat';
import Step6AnswerQuestions from './components/steps/Step6AnswerQuestions';
import Step7VerifyReview from './components/steps/Step7VerifyReview';
import Step8SubmitApplication from './components/steps/Step8SubmitApplication';
import Step9PrivacyVault from './components/steps/Step9PrivacyVault';
import Step10DataSecure from './components/steps/Step10DataSecure';
import { MOCK_COMPANIES } from './data/mockCompanies';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCompany, setSelectedCompany] = useState(MOCK_COMPANIES[0]);
  const [userDocs, setUserDocs] = useState([]);
  const [questionAnswers, setQuestionAnswers] = useState([]);

  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
    // Pre-populate suggested answers
    if (company.questions) {
      setQuestionAnswers(company.questions.map(q => q.suggestedAnswer || ''));
    }
    setCurrentStep(2);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setUserDocs([]);
    setQuestionAnswers([]);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Global Header */}
      <Header currentStep={currentStep} onReset={handleReset} />

      {/* 10-Step Workflow Stepper */}
      <Stepper currentStep={currentStep} onStepClick={(stepId) => setCurrentStep(stepId)} />

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '0 1.5rem 3rem 1.5rem', maxWidth: '1300px', margin: '0 auto', width: '100%' }}>
        {currentStep === 1 && (
          <Step1ChooseCompany onSelectCompany={handleSelectCompany} />
        )}

        {currentStep === 2 && (
          <Step2FetchRequirements 
            selectedCompany={selectedCompany} 
            onFetchComplete={() => setCurrentStep(3)} 
          />
        )}

        {currentStep === 3 && (
          <Step3ShowSummary 
            selectedCompany={selectedCompany} 
            onNextStep={() => setCurrentStep(4)} 
          />
        )}

        {currentStep === 4 && (
          <Step4UploadDocuments 
            selectedCompany={selectedCompany} 
            userDocs={userDocs}
            setUserDocs={setUserDocs}
            onNextStep={() => setCurrentStep(5)} 
          />
        )}

        {currentStep === 5 && (
          <Step5CheckReformat 
            selectedCompany={selectedCompany} 
            userDocs={userDocs}
            setUserDocs={setUserDocs}
            onNextStep={() => setCurrentStep(6)} 
          />
        )}

        {currentStep === 6 && (
          <Step6AnswerQuestions 
            selectedCompany={selectedCompany} 
            questionAnswers={questionAnswers}
            setQuestionAnswers={setQuestionAnswers}
            onNextStep={() => setCurrentStep(7)} 
          />
        )}

        {currentStep === 7 && (
          <Step7VerifyReview 
            selectedCompany={selectedCompany} 
            userDocs={userDocs}
            questionAnswers={questionAnswers}
            onNextStep={() => setCurrentStep(8)} 
          />
        )}

        {currentStep === 8 && (
          <Step8SubmitApplication 
            selectedCompany={selectedCompany} 
            onConfirmSubmission={() => setCurrentStep(9)} 
          />
        )}

        {currentStep === 9 && (
          <Step9PrivacyVault 
            userDocs={userDocs}
            setUserDocs={setUserDocs}
            onPurgeComplete={() => setCurrentStep(10)} 
          />
        )}

        {currentStep === 10 && (
          <Step10DataSecure 
            selectedCompany={selectedCompany} 
            onReset={handleReset} 
          />
        )}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '1.25rem 2rem', textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)', background: 'rgba(9, 13, 22, 0.8)' }}>
        ApplySure AI &copy; 2026 — Eliminating paperwork friction for skilled candidates worldwide.
      </footer>

    </div>
  );
}
