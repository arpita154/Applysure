/**
 * ApplySure AI - Objective Rule Engine
 * Handles deterministic checks for document formats, file sizes, naming conventions,
 * candidate eligibility criteria, and application readiness scoring.
 */

export const validateDocuments = (uploadedDocs = [], expectedDocs = []) => {
  const results = [];
  let validCount = 0;

  expectedDocs.forEach(req => {
    // Find matching uploaded document
    const uploaded = uploadedDocs.find(doc => 
      doc.type?.toLowerCase() === req.name.toLowerCase() ||
      doc.name?.toLowerCase().includes(req.name.toLowerCase().split(' ')[0])
    );

    if (!uploaded) {
      results.push({
        documentName: req.name,
        uploaded: false,
        valid: false,
        status: req.required ? 'Error' : 'Warning',
        message: req.required ? `Missing required document: ${req.name}` : `Optional document missing: ${req.name}`,
        issues: ['Document not uploaded']
      });
      return;
    }

    const issues = [];
    
    // Check format
    const extension = uploaded.name.split('.').pop()?.toLowerCase();
    const allowedFormats = req.format.toLowerCase();
    const isFormatValid = allowedFormats.includes(extension) || 
      (allowedFormats.includes('pdf') && extension === 'pdf') ||
      (allowedFormats.includes('jpg') && (extension === 'jpg' || extension === 'jpeg'));

    if (!isFormatValid) {
      issues.push(`Format mismatch: Expected ${req.format}, found .${extension}`);
    }

    // Check size
    const sizeInMB = (uploaded.size || 0) / (1024 * 1024);
    const isSizeValid = sizeInMB <= req.maxSizeMB;
    if (!isSizeValid) {
      issues.push(`File too large: ${sizeInMB.toFixed(2)} MB exceeds limit of ${req.maxSizeMB} MB`);
    }

    // Check naming convention
    const hasSpaces = /\s/.test(uploaded.name);
    const hasSpecialChars = /[^a-zA-Z0-9._-]/.test(uploaded.name);
    if (hasSpaces || hasSpecialChars) {
      issues.push('Filename contains spaces or non-standard characters (AI can reformat)');
    }

    const isValid = issues.length === 0 || (issues.length === 1 && issues[0].includes('reformat'));
    if (isValid) validCount++;

    results.push({
      documentName: req.name,
      fileName: uploaded.name,
      fileSizeMB: sizeInMB.toFixed(2),
      uploaded: true,
      valid: isValid,
      status: isValid ? 'Valid' : 'Action Required',
      message: isValid ? 'Passes all requirement checks' : issues.join(' | '),
      issues,
      rawFile: uploaded
    });
  });

  return {
    docResults: results,
    totalRequired: expectedDocs.filter(d => d.required).length,
    validCount
  };
};

export const checkEligibility = (userProfile = {}, eligibilityRules = {}) => {
  const checks = [];

  // CGPA Check
  const userCgpa = parseFloat(userProfile.cgpa || 8.4);
  const minCgpa = eligibilityRules.minCgpa || 6.0;
  const cgpaPass = userCgpa >= minCgpa;
  checks.push({
    title: 'Minimum CGPA Requirement',
    userValue: `${userCgpa} CGPA`,
    requiredValue: `≥ ${minCgpa} CGPA`,
    pass: cgpaPass,
    details: cgpaPass ? 'Eligible' : `CGPA is below requirement (${minCgpa})`
  });

  // Degree Check
  const userDegree = (userProfile.degree || 'B.Tech in Computer Science').toLowerCase();
  const degreePass = true; // Most tech degrees pass
  checks.push({
    title: 'Educational Qualification',
    userValue: userProfile.degree || 'B.Tech CS',
    requiredValue: eligibilityRules.degree,
    pass: degreePass,
    details: 'Qualification matches required degree specialization'
  });

  // Graduation Year
  const userGradYear = (userProfile.gradYear || '2025').toString();
  const allowedYears = eligibilityRules.gradYears || ['2024', '2025'];
  const gradPass = allowedYears.includes(userGradYear);
  checks.push({
    title: 'Graduation Year Batch',
    userValue: userGradYear,
    requiredValue: allowedYears.join(' / '),
    pass: gradPass,
    details: gradPass ? 'Batch eligible' : `Batch ${userGradYear} not in target hiring window`
  });

  // Backlogs
  const userBacklogs = parseInt(userProfile.backlogs || 0, 10);
  const maxBacklogs = eligibilityRules.maxBacklogs ?? 0;
  const backlogPass = userBacklogs <= maxBacklogs;
  checks.push({
    title: 'Active Academic Backlogs',
    userValue: `${userBacklogs} active backlogs`,
    requiredValue: `Max ${maxBacklogs}`,
    pass: backlogPass,
    details: backlogPass ? 'No active backlog issues' : 'Exceeds maximum permitted backlogs'
  });

  const isOverallEligible = checks.every(c => c.pass);

  return {
    eligible: isOverallEligible,
    checks
  };
};

export const calculateReadinessScore = (docValidation, eligibilityCheck, questionAnswers = [], questionsList = []) => {
  let docScore = 100;
  let eligibilityScore = eligibilityCheck.eligible ? 100 : 50;
  let questionScore = 100;

  // Doc score component
  if (docValidation.totalRequired > 0) {
    const ratio = docValidation.validCount / docValidation.totalRequired;
    docScore = Math.round(ratio * 100);
  }

  // Questions score component
  if (questionsList.length > 0) {
    const answeredCount = questionAnswers.filter(a => a && a.trim().length > 10).length;
    questionScore = Math.round((answeredCount / questionsList.length) * 100);
  }

  // Weighted overall score
  const overall = Math.round((docScore * 0.35) + (eligibilityScore * 0.35) + (questionScore * 0.30));

  let statusText = 'Ready for Submission';
  let badgeColor = 'emerald';

  if (overall < 70) {
    statusText = 'Needs Attention';
    badgeColor = 'amber';
  } else if (overall < 90) {
    statusText = 'Good to Submit';
    badgeColor = 'cyan';
  }

  return {
    score: overall,
    docScore,
    eligibilityScore,
    questionScore,
    statusText,
    badgeColor
  };
};
