/**
 * portfolio.js — Single source of truth for all portfolio data.
 * Used by sections, components, and the AI chatbot.
 */

export const profile = {
  name: 'Shahzaib Ur Rehman',
  brand: 'KHUSHWAQT',
  brandDomain: 'KHUSHWAQT.com',
  title: 'Computer Science Student at University of Chitral',
  taglines: [
    'Web Developer',
    'Aspiring Web Architect',
    'Digital Marketer',
    'AI Prompt Engineer',
  ],
  location: 'Chitral, Pakistan',
  hometown: 'Khuzh, Upper Chitral',
  degree: 'BSCS 2025–2029',
  cgpa: '3.80',
  about: `Passionate about technology, web development, and modern web architecture. Enjoys learning new technologies, exploring innovative ideas, and developing technical skills. Goal: to become a skilled web developer and architect, creating modern, efficient, and user-friendly digital solutions through continuous learning, creativity, and dedication.`,
  aboutShort: `Passionate about technology, web development, and modern web architecture. Enjoys learning new technologies and exploring innovative ideas.`,
  skillChips: [
    'Digital Marketing & AI Marketing',
    'Frontend Development',
    'MERN Stack (Learning)',
    'AI Prompt Engineering',
    'C++ & OOP',
  ],
};

export const contact = {
  linkedin: 'https://www.linkedin.com/in/shahzaib-ur-rehman-9aab02355/',
  email: 'shahzaib.700007@gmail.com',
  facebook: 'https://www.facebook.com/ishahzaibkhushwaqt/',
  x: 'https://x.com/ishahzaibk01',
  whatsapp: 'https://wa.me/923379242287',
  whatsappDisplay: '0337 9242287',
};

export const education = [
  {
    id: 'bscs',
    degree: 'Bachelor of Science in Computer Science (BSCS)',
    institute: 'University of Chitral',
    years: '2025–2029 (Expected)',
    status: 'Currently Enrolled',
    icon: '🎓',
    summary: 'BSCS · University of Chitral · 2025–2029',
    board: null,
    marks: null,
    cgpa: '3.80',
    description:
      'Strong focus on technical knowledge, analytical thinking, and problem-solving; interested in software development, web technologies, and modern web architecture.',
  },
  {
    id: 'ics',
    degree: 'Intermediate in Computer Science (ICS)',
    institute: 'Government Degree College Chitral',
    years: '2023–2025',
    status: 'Completed',
    icon: '📘',
    summary: 'ICS · GDC Chitral · 2023–2025',
    board: 'BISE Peshawar',
    marks: '70%',
    cgpa: null,
    description:
      'Focus on Computer Science and Mathematics, building a foundation in computing concepts, logical reasoning, and mathematical problem-solving.',
  },
  {
    id: 'matric',
    degree: 'Matriculation in Science',
    institute: 'Government High School Chuinj, Mastuj, Upper Chitral',
    years: '2021–2023',
    status: 'Completed',
    icon: '📗',
    summary: 'Matric (Science) · GHS Chuinj · 2021–2023',
    board: 'BISE Peshawar',
    marks: '71%',
    cgpa: null,
    description:
      'Science group with Mathematics as a key subject; foundation in scientific principles, mathematical reasoning, and analytical thinking.',
  },
];

export const skills = [
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & AI-Powered Marketing',
    icon: '📣',
    percentage: 90,
    summary: 'Online brand growth, AI-powered strategies & campaign management.',
    description:
      'Strong understanding of digital marketing strategies, AI-powered marketing techniques, and online brand growth; learning through Coursera and other platforms.',
    keySkills: [
      {
        id: 'meta-ads',
        name: 'Meta Ads',
        description:
          'Campaign creation, audience targeting, ad creatives, and performance optimization.',
      },
      {
        id: 'google-ads',
        name: 'Google Ads',
        description:
          'Search advertising fundamentals, keyword research, campaign structure, and conversion tracking concepts.',
      },
      {
        id: 'content-writing',
        name: 'Content Writing',
        description:
          'Marketing copy, website content, captions, and promotional content.',
      },
      {
        id: 'social-media-mgmt',
        name: 'Social Media Management',
        description:
          'Content planning, scheduling, audience engagement, and brand consistency.',
      },
      {
        id: 'seo',
        name: 'SEO Fundamentals',
        description:
          'Keyword research, on-page SEO, and improving search visibility.',
      },
      {
        id: 'ai-marketing',
        name: 'AI-Powered Marketing',
        description:
          'AI tools for content generation, campaign ideas, research, and workflows.',
      },
      {
        id: 'marketing-analytics',
        name: 'Marketing Analytics',
        description:
          'Campaign metrics, engagement, reach, and performance indicators.',
      },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: '💻',
    percentage: 80,
    summary: 'Responsive, visually appealing & user-friendly web interfaces.',
    description:
      'Building responsive, visually appealing, user-friendly web interfaces using modern web technologies.',
    keySkills: [
      {
        id: 'html5',
        name: 'HTML5',
        description:
          'Semantic markup, page structure, forms, and accessibility fundamentals.',
      },
      {
        id: 'css3',
        name: 'CSS3',
        description:
          'Selectors, layouts, Flexbox, Grid, animations, transitions, and responsive styling.',
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        description:
          'Variables, functions, arrays, objects, DOM manipulation, events, and async fundamentals.',
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        description:
          'Utility-first styling, responsive layouts, and reusable patterns.',
      },
      {
        id: 'responsive',
        name: 'Responsive Web Design',
        description: 'Mobile, tablet, and desktop adaptive layouts.',
      },
      {
        id: 'ui-impl',
        name: 'UI Implementation',
        description:
          'Turning design concepts into clean, functional web pages.',
      },
      {
        id: 'best-practices',
        name: 'Frontend Best Practices',
        description:
          'Code organization, maintainability, usability, and cross-device compatibility.',
      },
    ],
  },
  {
    id: 'mern',
    title: 'MERN Stack Development',
    icon: '🚀',
    percentage: 20,
    learning: true,
    summary: 'Expanding toward full-stack — currently actively learning.',
    description:
      'Expanding toward full-stack development to understand how frontends connect with server-side applications and databases. Current focus: strengthening foundations and gradually building practical full-stack skills.',
    keySkills: [
      {
        id: 'mongodb',
        name: 'MongoDB',
        description:
          'NoSQL databases, document structures, and data management.',
      },
      {
        id: 'express',
        name: 'Express.js',
        description: 'Routing, middleware, and API fundamentals.',
      },
      {
        id: 'react',
        name: 'React.js',
        description: 'Components, props, state, and reusable UI.',
      },
      {
        id: 'nodejs',
        name: 'Node.js',
        description:
          'JavaScript runtime, server-side programming, and backend fundamentals.',
      },
    ],
  },
  {
    id: 'ai-prompt',
    title: 'AI Prompt Engineering',
    icon: '🤖',
    percentage: 68,
    summary: 'Effective AI tool use for productivity, research & creative work.',
    description:
      'Interested in prompt engineering and effective use of AI tools for productivity, problem-solving, and creative/technical work.',
    keySkills: [
      {
        id: 'structured-prompts',
        name: 'Structured Prompting',
        description:
          'Writing clear, structured, goal-oriented prompts for optimal AI outputs.',
      },
      {
        id: 'ai-research',
        name: 'AI for Research & Brainstorming',
        description:
          'Using AI for research, brainstorming, and content creation.',
      },
      {
        id: 'ai-marketing-prompts',
        name: 'Marketing & Dev Prompts',
        description:
          'Generating and refining ideas for digital marketing and web development.',
      },
      {
        id: 'iterative-refinement',
        name: 'Iterative Refinement',
        description:
          'Improving outputs through context, examples, and iterative refinement.',
      },
      {
        id: 'ai-coding',
        name: 'AI-Assisted Coding',
        description:
          'Exploring AI-assisted coding, debugging, and workflow optimization.',
      },
    ],
  },
  {
    id: 'cpp',
    title: 'C++ Fundamentals & OOP',
    icon: '⚙️',
    percentage: 85,
    summary: 'Strong foundation in C++ and core object-oriented programming.',
    description:
      'Strong foundation in C++ and core programming concepts, with emphasis on clean, readable, and maintainable code.',
    keySkills: [
      {
        id: 'cpp-fundamentals',
        name: 'C++ Fundamentals',
        description:
          'Variables, data types, operators, conditions, loops, functions, arrays, and pointers.',
      },
      {
        id: 'oop',
        name: 'Object-Oriented Programming',
        description:
          'Classes, objects, encapsulation, inheritance, polymorphism, and abstraction.',
      },
      {
        id: 'problem-solving',
        name: 'Problem-Solving',
        description:
          'Logical solutions and breaking complex problems into manageable steps.',
      },
      {
        id: 'data-handling',
        name: 'Data Handling',
        description: 'Arrays, strings, functions, and basic data structures.',
      },
      {
        id: 'code-quality',
        name: 'Code Quality',
        description: 'Structured, readable, and maintainable programs.',
      },
    ],
  },
];

export const projects = [
  {
    id: 'basex',
    title: 'BaseX',
    subtitle: 'Number System Toolkit',
    tags: ['Web Development', 'Educational Technology', 'AI Integration'],
    summary:
      'An all-in-one educational web toolkit for number system conversions and AI-assisted learning.',
    description:
      'An all-in-one educational web toolkit that simplifies number system conversions and calculations for CS students, Digital Logic Design learners, and tech enthusiasts, combining calculation tools with AI-assisted learning.',
    features: [
      {
        id: 'converter',
        name: 'Number System Converter',
        description:
          'Converts between Binary, Decimal, Octal, and Hexadecimal instantly.',
      },
      {
        id: 'counter-calc',
        name: 'Counter & Calculator',
        description:
          'Built-in counter and calculator for number system arithmetic.',
      },
      {
        id: 'basex-gpt',
        name: 'BaseX GPT',
        description:
          'AI assistant specifically trained to answer questions about number systems.',
      },
      {
        id: 'ux',
        name: 'User-Friendly Interface',
        description:
          'Clean, intuitive UI designed for students and tech enthusiasts.',
      },
    ],
    objective:
      'Make numerical calculations easier and support understanding of fundamental computing concepts.',
    brand: 'KHUSHWAQT.com',
    liveDemo: 'https://basex.site.je/',
    presentation: null,
    color: '#7c3aed',
  },
  {
    id: 'qashqar',
    title: 'QashQar Food Hub',
    subtitle: 'Local Food Delivery Platform',
    tags: ['Web Development', 'Food Technology', 'Local Digital Solutions'],
    summary:
      'A food delivery website concept connecting local restaurants with customers in Chitral, Pakistan.',
    description:
      'A food delivery website concept for Chitral, Pakistan, connecting local restaurants with customers through technology.',
    features: [
      {
        id: 'restaurant-discovery',
        name: 'Restaurant Discovery',
        description:
          'Easily browse and discover local restaurants and their menus.',
      },
      {
        id: 'food-ordering',
        name: 'Convenient Food Ordering',
        description:
          'Simple, streamlined ordering flow for a smooth customer experience.',
      },
      {
        id: 'local-connectivity',
        name: 'Local Business Connectivity',
        description:
          'Bridges the gap between local food businesses and their customers.',
      },
      {
        id: 'customer-experience',
        name: 'Improved Customer Experience',
        description:
          'Designed to make ordering food in Chitral fast and enjoyable.',
      },
      {
        id: 'digital-growth',
        name: 'Digital Growth for Restaurants',
        description:
          'Helps restaurants reach more customers and grow digitally.',
      },
    ],
    objective: null,
    vision:
      "Bring Chitral's local food businesses and customers closer through technology.",
    brand: null,
    liveDemo: null,
    presentation:
      'https://docs.google.com/presentation/d/1F4cIcRGcf-xZdp7oR2Kmij_tfSwZiAdZ/edit?slide=id.p1#slide=id.p1',
    color: '#a855f7',
  },
];

export const experience = [
  {
    id: 'campus-coordinator',
    title: 'Campus Coordinator BanoQabil Chitral',
    org: 'BanoQabil KP North',
    location: 'Chitral Campus, University of Chitral',
    period: 'Current',
    icon: '🏫',
    summary:
      'Coordinates educational and digital skills training at University of Chitral.',
    responsibilities: [
      {
        id: 'ops',
        name: 'Campus Operations & Coordination',
        description:
          'Manages day-to-day campus operations and coordinates activities between teams.',
      },
      {
        id: 'registration',
        name: 'Student Registration & Enrollment',
        description:
          'Handles registration, enrollment, records, and administrative processes for students.',
      },
      {
        id: 'support',
        name: 'Student Support & Guidance',
        description:
          'Assists students with registration, program info, schedules, and inquiries.',
      },
      {
        id: 'training',
        name: 'Training Program Management',
        description:
          'Manages class schedules, attendance, sessions, and communication between students, instructors, and management.',
      },
      {
        id: 'tech-support',
        name: 'Technical & Digital Support',
        description:
          'Supports digital platforms, online registration systems, and student information management.',
      },
      {
        id: 'team-coord',
        name: 'Team Coordination',
        description:
          'Coordinates instructors, volunteers, administrative staff, and organizational teams.',
      },
    ],
    skills: [
      'Coordination',
      'Administration',
      'Student Support',
      'Digital Tools',
      'Team Management',
    ],
  },
  {
    id: 'volunteer',
    title: 'Volunteer',
    org: 'Banoqabil & Alkhidmat Foundation',
    location: 'Chitral',
    period: '2 Years',
    icon: '🤝',
    summary:
      'Contributed to educational initiatives, technical operations, and digital media.',
    responsibilities: [
      {
        id: 'reg-team',
        name: 'Head of Registration Team',
        description:
          'Led the registration team, managing student enrollment and record-keeping.',
      },
      {
        id: 'tech-team',
        name: 'Technical Team Member',
        description:
          'Managed student records via website and digital systems.',
      },
      {
        id: 'social-media-bq',
        name: 'Social Media Management',
        description:
          'Managed Banoqabil Chitral on Instagram, TikTok, and Facebook.',
      },
      {
        id: 'event-mgmt',
        name: 'Event Management',
        description:
          'Planned and executed educational events and community initiatives.',
      },
      {
        id: 'team-coord-vol',
        name: 'Team Coordination',
        description:
          'Coordinated between team members to ensure smooth operations.',
      },
    ],
    skills: [
      'Technical Coordination',
      'Data Management',
      'Social Media',
      'Communication',
      'Leadership',
      'Event Planning',
    ],
  },
  {
    id: 'ijt',
    title: 'Social Media Manager & President',
    org: 'Islami Jamiat Talaba (IJT)',
    location: 'University of Chitral',
    period: '2+ Years',
    icon: '🏛️',
    summary:
      'Managed online presence as Social Media Manager; now serving as President at University of Chitral.',
    responsibilities: [
      {
        id: 'social-media-ijt',
        name: 'Social Media Management (IJT Chitral)',
        description:
          'Managed online presence on Instagram, TikTok, X, and YouTube; digital content management including planning, publishing, and engagement.',
      },
      {
        id: 'leadership',
        name: 'Leadership & Coordination (President, IJT UoC)',
        description:
          'Leads the organization at University of Chitral, coordinating all activities and teams.',
      },
      {
        id: 'events',
        name: 'Event Organization',
        description:
          'Organizes expos, seminars, and student programs at the university.',
      },
      {
        id: 'strategic',
        name: 'Strategic Planning',
        description:
          'Develops organizational strategy, sets goals, and oversees execution.',
      },
      {
        id: 'communication',
        name: 'Communication & Engagement',
        description:
          'Manages internal and external communications, engaging students and stakeholders.',
      },
    ],
    skills: [
      'Leadership',
      'Public Communication',
      'Event Management',
      'Strategic Planning',
      'Teamwork',
      'Organizational Management',
    ],
  },
];

/**
 * Chatbot knowledge base — flattened for keyword matching.
 */
export const chatbotData = {
  profile,
  contact,
  education,
  skills,
  projects,
  experience,
};

export default {
  profile,
  contact,
  education,
  skills,
  projects,
  experience,
  chatbotData,
};
