import type { QuestionConfig } from '../types/funnel';

export const QUALIFICATION_QUESTIONS: QuestionConfig[] = [
  {
    id: 'age_bracket',
    title: 'What is your current age bracket?',
    description: 'Qualification guidelines and approval rates vary depending on your age group.',
    type: 'single_choice',
    autoAdvance: true,
    required: true,
    options: [
      {
        value: 'under_50',
        label: 'Under 50 years old',
        sublabel: 'Ages 18 – 49',
      },
      {
        value: '50_to_54',
        label: '50 – 54 years old',
        sublabel: 'Favorable eligibility guidelines apply',
      },
      {
        value: '55_to_61',
        label: '55 – 61 years old',
        sublabel: 'Higher qualification eligibility rates',
      },
      {
        value: '62_and_over',
        label: '62 years or older',
        sublabel: 'Approaching or at standard retirement age',
      },
    ],
  },
  {
    id: 'currently_working',
    title: 'Are you currently employed or working?',
    description: 'To qualify for benefits, there are specific guidelines regarding current substantial earnings.',
    type: 'yes_no',
    autoAdvance: true,
    required: true,
    options: [
      {
        value: 'no',
        label: 'No, I am not working',
        sublabel: 'Unemployed or unable to maintain employment',
      },
      {
        value: 'part_time',
        label: 'Yes, working part-time (earning under $1,550/mo)',
        sublabel: 'Limited hours or earning below substantial gainful limits',
      },
      {
        value: 'yes_full_time',
        label: 'Yes, working full-time',
        sublabel: 'Currently working standard full-time hours',
      },
    ],
  },
  {
    id: 'condition_duration',
    title: 'Has your medical condition lasted, or is it expected to last, at least 12 months?',
    description: 'Benefits generally require a condition that prevents substantial work for a continuous 12-month period.',
    type: 'yes_no',
    autoAdvance: true,
    required: true,
    options: [
      {
        value: 'yes_12_months',
        label: 'Yes, 12 months or longer',
        sublabel: 'Has persisted or is expected to persist for at least a year',
      },
      {
        value: 'no_less_than_12',
        label: 'No, less than 12 months',
        sublabel: 'Short-term temporary condition',
      },
      {
        value: 'unsure',
        label: 'Not sure / Permanently disabling',
        sublabel: 'Condition is ongoing and long-term',
      },
    ],
  },
  {
    id: 'receiving_benefits',
    title: 'What is your current Social Security Disability status?',
    description: 'Select the option that best reflects where you are in the benefits process.',
    type: 'single_choice',
    autoAdvance: true,
    required: true,
    options: [
      {
        value: 'never_applied',
        label: 'I have never applied',
        sublabel: 'Looking to find out if I qualify and start a new claim',
      },
      {
        value: 'recently_denied',
        label: 'I was recently denied',
        sublabel: 'Need assistance appealing a denied claim',
      },
      {
        value: 'application_pending',
        label: 'My application is currently pending',
        sublabel: 'Waiting for an initial decision from SSA',
      },
      {
        value: 'already_receiving',
        label: 'I am already receiving SSDI / SSI benefits',
        sublabel: 'Currently receiving monthly benefit payments',
      },
    ],
  },
  {
    id: 'doctor_care',
    title: 'Are you currently under regular care of a doctor or medical specialist?',
    description: 'Medical documentation from licensed healthcare providers is essential for claim approval.',
    type: 'yes_no',
    autoAdvance: true,
    required: true,
    options: [
      {
        value: 'yes_active_care',
        label: 'Yes, seeing a doctor regularly',
        sublabel: 'Currently being treated and have medical records',
      },
      {
        value: 'yes_past_care',
        label: 'Seen a doctor in the past 12 months',
        sublabel: 'Have previous diagnosis and treatment history',
      },
      {
        value: 'no_care',
        label: 'No, not currently seeing a doctor',
        sublabel: 'Have not visited a healthcare provider recently',
      },
    ],
  },
  {
    id: 'primary_condition',
    title: 'What is your primary medical condition or injury?',
    description: 'Select the category that most significantly impacts your daily ability to work.',
    type: 'single_choice',
    autoAdvance: true,
    required: true,
    options: [
      {
        value: 'musculoskeletal',
        label: 'Back, Spine, Bone, or Joint Disorders',
        sublabel: 'Degenerative disc, arthritis, chronic back pain, fibromyalgia',
      },
      {
        value: 'mental_health',
        label: 'Mental Health & Cognitive Conditions',
        sublabel: 'Severe depression, PTSD, bipolar, anxiety, memory disorders',
      },
      {
        value: 'cardiovascular',
        label: 'Heart & Circulatory Conditions',
        sublabel: 'Heart failure, coronary artery disease, high blood pressure',
      },
      {
        value: 'neurological',
        label: 'Neurological & Brain Disorders',
        sublabel: 'Stroke, neuropathy, multiple sclerosis, epilepsy, Parkinson’s',
      },
      {
        value: 'respiratory',
        label: 'Respiratory & Lung Diseases',
        sublabel: 'COPD, asthma, pulmonary fibrosis, emphysema',
      },
      {
        value: 'other_condition',
        label: 'Other Medical Illness or Multi-Condition',
        sublabel: 'Cancer, kidney disease, diabetes complications, autoimmune',
      },
    ],
  },
];

export const TOTAL_QUALIFICATION_QUESTIONS = QUALIFICATION_QUESTIONS.length;
