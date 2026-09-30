export const MOCK_COMPANIES = [
  {
    id: 'google',
    name: 'Google',
    role: 'Software Development Engineer',
    category: 'IT & Software',
    logo: 'https://www.google.com/favicon.ico',
    logoBg: '#ffffff',
    color: '#4285F4',
    url: 'https://careers.google.com/jobs/results/sde-entry',
    overview: 'Design, develop, test, deploy, maintain, and improve software. Work on core infrastructure, large-scale systems, data storage, search algorithms, and machine learning.',
    eligibility: {
      degree: 'B.E / B.Tech / M.Tech in CS / IT / ECE or equivalent',
      minCgpa: 7.0,
      gradYears: ['2024', '2025'],
      maxBacklogs: 0,
      requiredExperience: '0-2 Years'
    },
    documents: [
      { name: 'Resume', format: 'PDF', maxSizeMB: 2, required: true, pattern: 'Firstname_Lastname_Resume.pdf' },
      { name: 'Academic Transcript', format: 'PDF', maxSizeMB: 3, required: true, pattern: 'Firstname_Lastname_Transcript.pdf' },
      { name: 'Government ID', format: 'PDF or JPG', maxSizeMB: 2, required: true, pattern: 'Govt_ID.jpg' },
      { name: 'Project Portfolio Certificate', format: 'PDF', maxSizeMB: 5, required: false, pattern: 'Portfolio_Certificate.pdf' }
    ],
    instructions: [
      'Fill in online application form without leaving required fields blank.',
      'Upload single-page or max two-page PDF resume highlighting measurable impact.',
      'Ensure standard naming convention (No special characters or spaces in filenames).',
      'Answer behavioral questions accurately with concise real-world examples.'
    ],
    questions: [
      {
        id: 'q1',
        type: 'standard',
        question: 'Tell us about a time you faced a significant technical failure. What did you learn from it?',
        suggestedAnswer: 'During my second year, a team project API broke due to concurrency issues right before demo. I diagnosed the deadlock, implemented mutex locking, and restored system stability. I learned the critical importance of early stress testing and graceful error handling under load.',
        weirdExplanation: 'Google asks this to evaluate your resilience, self-awareness, and capability to perform post-mortem debugging without placing blame on others.'
      },
      {
        id: 'q2',
        type: 'unexpected',
        question: 'If you could be any animal in a tech company, what would you be and why?',
        suggestedAnswer: 'I would be an owl, because it represents curiosity, keen observation, and the ability to stay focused during intense problem-solving sessions. These qualities are essential for navigating complex technical challenges in fast-paced software teams.',
        weirdExplanation: 'This unexpected question tests creative thinking, self-concept, and your ability to articulate personality traits in an unstructured scenario.'
      },
      {
        id: 'q3',
        type: 'standard',
        question: 'Why do you want to work at Google on scalable distributed systems?',
        suggestedAnswer: 'Google operates at unprecedented global scale, serving billions of requests daily. I am eager to contribute my skills in algorithm optimization and distributed databases to build low-latency infrastructure that impacts millions of lives.',
        weirdExplanation: 'Checks your domain alignment, enthusiasm for high-scale backend architecture, and understanding of Google\'s core mission.'
      }
    ]
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    role: 'Software Engineer II',
    category: 'IT & Software',
    logo: 'https://www.microsoft.com/favicon.ico',
    logoBg: '#ffffff',
    color: '#00a4ef',
    url: 'https://careers.microsoft.com/us/en/job/152342',
    overview: 'Empower every person and organization on the planet to achieve more. Build cloud services on Azure, AI platform capabilities, and developer tools.',
    eligibility: {
      degree: 'B.Tech / Dual Degree in Computer Science / Math',
      minCgpa: 7.5,
      gradYears: ['2023', '2024', '2025'],
      maxBacklogs: 0,
      requiredExperience: '0-3 Years'
    },
    documents: [
      { name: 'Resume', format: 'PDF', maxSizeMB: 2, required: true, pattern: 'Resume_Microsoft.pdf' },
      { name: 'Degree Marksheets', format: 'PDF', maxSizeMB: 4, required: true, pattern: 'Marksheets_All.pdf' },
      { name: 'Government ID (Aadhar/Passport)', format: 'JPG', maxSizeMB: 2, required: true, pattern: 'ID_Proof.jpg' }
    ],
    instructions: [
      'Ensure contact details match official government identity documents.',
      'Submit ATS-friendly single-column resume format.',
      'Link your active GitHub and LinkedIn profiles.'
    ],
    questions: [
      {
        id: 'mq1',
        type: 'standard',
        question: 'Describe a project where you collaborated across different skill domains.',
        suggestedAnswer: 'I partnered with UI designers and backend engineers to build a full-stack dashboard. I translated design mockups into responsive React components while establishing REST API contracts with backend engineers, delivering the project 3 days ahead of deadline.',
        weirdExplanation: 'Microsoft values growth mindset and cross-functional team collaboration across engineering, design, and product.'
      },
      {
        id: 'mq2',
        type: 'unexpected',
        question: 'How would you explain the concept of cloud computing to a 7-year-old child?',
        suggestedAnswer: 'Imagine you have a giant magic toy box at a friend\'s house that you can play with from anywhere using a walkie-talkie. Cloud computing is like storing your digital photos and games in a super-fast magic box on the internet so you can open them anytime from any computer.',
        weirdExplanation: 'Tests your ability to simplify complex technical concepts into clear, accessible language for non-technical stakeholders.'
      }
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon',
    role: 'Software Development Engineer - I',
    category: 'IT & Software',
    logo: 'https://www.amazon.com/favicon.ico',
    logoBg: '#ffffff',
    color: '#ff9900',
    url: 'https://www.amazon.jobs/en/jobs/284920',
    overview: 'Build high-volume AWS services and e-commerce platforms focused on customer obsession and operational excellence.',
    eligibility: {
      degree: 'B.E / B.Tech / M.E / M.Tech in CS/IT',
      minCgpa: 6.5,
      gradYears: ['2024', '2025'],
      maxBacklogs: 0,
      requiredExperience: 'Fresher / 0-1 Year'
    },
    documents: [
      { name: 'Resume', format: 'PDF', maxSizeMB: 2, required: true, pattern: 'Amazon_SDE_Resume.pdf' },
      { name: 'Transcript', format: 'PDF', maxSizeMB: 3, required: true, pattern: 'Transcript.pdf' }
    ],
    instructions: [
      'Frame answer responses strictly using the STAR methodology (Situation, Task, Action, Result).',
      'Demonstrate Amazon Leadership Principles (e.g., Customer Obsession, Bias for Action, Ownership).'
    ],
    questions: [
      {
        id: 'aq1',
        type: 'standard',
        question: 'Give an example of a time you showed Ownership when something went wrong.',
        suggestedAnswer: 'When a critical database indexing job failed silently over the weekend, I noticed the metric drop, took immediate ownership to write a hotfix script, restored data integrity, and added automated CloudWatch alerts to prevent recurrence.',
        weirdExplanation: 'Evaluates your alignment with Amazon Leadership Principle #2 (Ownership).'
      },
      {
        id: 'aq2',
        type: 'unexpected',
        question: 'If you had unlimited resources for 24 hours, what Amazon service feature would you build?',
        suggestedAnswer: 'I would build an AI-powered instant document compatibility sandbox for AWS Lambda that auto-detects deployment configuration mismatches before build time, cutting developer deployment friction by half.',
        weirdExplanation: 'Tests customer obsession, initiative, and high-level product vision.'
      }
    ]
  },
  {
    id: 'tcs',
    name: 'TCS',
    role: 'Systems Engineer / Digital Developer',
    category: 'IT & Software',
    logo: 'https://www.tcs.com/favicon.ico',
    logoBg: '#ffffff',
    color: '#005bb7',
    url: 'https://www.tcs.com/careers/entry-level',
    overview: 'Deliver enterprise digital transformation solutions, cloud migrations, and full-stack software development.',
    eligibility: {
      degree: 'B.E / B.Tech / M.Tech / MCA / M.Sc',
      minCgpa: 6.0,
      gradYears: ['2023', '2024', '2025'],
      maxBacklogs: 1,
      requiredExperience: 'Fresher'
    },
    documents: [
      { name: 'Resume', format: 'PDF', maxSizeMB: 2, required: true, pattern: 'Resume_TCS.pdf' },
      { name: 'All Semester Marksheets', format: 'PDF', maxSizeMB: 5, required: true, pattern: 'Semester_Marksheets.pdf' },
      { name: 'Government ID', format: 'JPG', maxSizeMB: 1, required: true, pattern: 'Government_ID.jpg' }
    ],
    instructions: [
      'No active backlogs allowed at the time of joining.',
      'Maximum gap in education must not exceed 24 months.'
    ],
    questions: [
      {
        id: 'tq1',
        type: 'standard',
        question: 'Are you willing to relocate to any TCS operational location across India?',
        suggestedAnswer: 'Yes, I am fully open to relocating to any TCS development location. I am adaptable and eager to learn in diverse project environments.',
        weirdExplanation: 'Validates candidate mobility and flexibility across client locations.'
      }
    ]
  },
  {
    id: 'infosys',
    name: 'Infosys',
    role: 'Specialist Programmer',
    category: 'IT & Software',
    logo: 'https://www.infosys.com/favicon.ico',
    logoBg: '#ffffff',
    color: '#007cc3',
    url: 'https://www.infosys.com/careers/specialist-programmer.html',
    overview: 'Architect advanced enterprise applications, microservices, and AI integrations.',
    eligibility: {
      degree: 'B.E / B.Tech / M.Tech',
      minCgpa: 6.5,
      gradYears: ['2024', '2025'],
      maxBacklogs: 0,
      requiredExperience: 'Fresher'
    },
    documents: [
      { name: 'Resume', format: 'PDF', maxSizeMB: 2, required: true, pattern: 'Resume_Infosys.pdf' },
      { name: 'College ID & Passport Photo', format: 'JPG', maxSizeMB: 2, required: true, pattern: 'Photo_ID.jpg' }
    ],
    instructions: [
      'Verify CGPA to Percentage conversion formula as per University guidelines.',
      'Ensure standard passport photo dimensions.'
    ],
    questions: [
      {
        id: 'iq1',
        type: 'standard',
        question: 'Describe your expertise in Data Structures & Algorithms.',
        suggestedAnswer: 'I have solved 350+ DSA problems focusing on Dynamic Programming, Graph Traversals, and Tree algorithms. I routinely analyze space-time complexity to produce O(N log N) optimal code.',
        weirdExplanation: 'Infosys Specialist Programmer role focuses heavily on algorithmic proficiency and coding speed.'
      }
    ]
  },
  {
    id: 'accenture',
    name: 'Accenture',
    role: 'Application Development Associate',
    category: 'IT & Software',
    logo: 'https://www.accenture.com/favicon.ico',
    logoBg: '#ffffff',
    color: '#a100ff',
    url: 'https://careers.accenture.com/jobs/ada-2025',
    overview: 'Build enterprise application solutions using cloud technologies, Java, React, and Python.',
    eligibility: {
      degree: 'B.E / B.Tech / MCA / M.Sc',
      minCgpa: 6.0,
      gradYears: ['2024', '2025'],
      maxBacklogs: 0,
      requiredExperience: 'Fresher'
    },
    documents: [
      { name: 'Resume', format: 'PDF', maxSizeMB: 2, required: true, pattern: 'Resume_Accenture.pdf' },
      { name: 'Aadhar Card Scan', format: 'PDF or JPG', maxSizeMB: 2, required: true, pattern: 'Aadhar_Scan.pdf' }
    ],
    instructions: [
      'Ensure candidate full name matches 10th grade pass certificate exactly.'
    ],
    questions: [
      {
        id: 'acq1',
        type: 'standard',
        question: 'What modern web framework are you most proficient in and why?',
        suggestedAnswer: 'I specialize in React and JavaScript/TypeScript. Its component-driven architecture and rich ecosystem allow rapid prototyping of high-performance responsive web applications.',
        weirdExplanation: 'Assesses technology stack familiarity and enthusiasm for full-stack web engineering.'
      }
    ]
  }
];
