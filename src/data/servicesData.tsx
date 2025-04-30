import { 
  BarChart2, 
  TrendingUp, 
  LineChart, 
  Database, 
  PieChart, 
  MapPin
} from 'lucide-react';
import { Service } from '../types/Service';

export const services: Service[] = [
  {
    id: 'data-science',
    title: 'Data Science & Analytics',
    description: 'We transform raw data into actionable intelligence using statistical modeling, machine learning, and advanced analytics.',
    fullDescription: [
      'At Cosgit Analytics, we harness the power of cutting-edge data science techniques to extract meaningful patterns and predictions from your data. Our team of expert data scientists combines domain knowledge with sophisticated analytical methods to deliver insights that drive strategic decision-making.',
      'We build custom predictive models tailored to your specific business challenges, from forecasting sales and optimizing supply chains to detecting fraud and anticipating customer behavior. Our solutions are designed to integrate seamlessly with your existing systems and provide clear, actionable recommendations.'
    ],
    icon: BarChart2,
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    features: [
      'Predictive Modeling and Forecasting',
      'Machine Learning and AI Solutions',
      'Big Data Analytics',
      'Econometric and Statistical Analysis',
      'Data Mining and Pattern Recognition',
      'Sentiment Analysis and Text Mining',
      'Customer and Behavioral Analytics',
      'Risk Modeling and Scenario Analysis'
    ]
  },
  {
    id: 'business-intelligence',
    title: 'Business Intelligence & Data Visualization',
    description: 'We create intuitive, interactive dashboards and visualizations that make complex data easily understandable for decision-makers.',
    fullDescription: [
      'Our Business Intelligence and Data Visualization services transform complex data into clear, compelling visual stories that enable faster, more effective decision-making across your organization. We design intuitive dashboards and reports that put critical information at your fingertips.',
      'Our team is proficient with leading visualization tools including Power BI, Tableau, and custom solutions using D3.js and other frameworks. We focus on creating visualizations that are not only beautiful but also functional, allowing users to explore data interactively and derive insights independently.'
    ],
    icon: PieChart,
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    features: [
      'Executive Dashboards and Scorecards',
      'Interactive Data Storytelling',
      'Real-time Monitoring Systems',
      'Performance Metric Visualization',
      'Power BI, Tableau, and Looker Dashboard Development',
      'Custom Visualization Solutions',
      'Geographic Information Systems (GIS) Mapping',
      'Data Portal Development'
    ]
  },
  {
    id: 'monitoring-evaluation',
    title: 'Monitoring, Evaluation, Research & Learning',
    description: 'Cosgit Analytics offers holistic M&E solutions aligned with global best practices and emerging trends in evidence-based decision-making.',
    fullDescription: [
      'Our Monitoring, Evaluation, Research, and Learning (MERL) services help organizations measure their impact, improve performance, and demonstrate value to stakeholders. We design comprehensive M&E frameworks and systems that align with international standards and best practices.',
      'From baseline studies and impact evaluations to real-time monitoring systems and learning frameworks, our MERL solutions provide the evidence base needed for adaptive management and strategic decision-making. We emphasize participatory approaches that engage stakeholders throughout the evaluation process.'
    ],
    icon: LineChart,
    image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    features: [
      'M&E System Design and Implementation',
      'Impact Evaluations',
      'Baseline, Midline, and Endline Surveys',
      'Theory of Change Development',
      'Results-Based Management (RBM)',
      'Performance Monitoring Plans (PMPs)',
      'Data Quality Assessments',
      'Learning and Adaptive Management Frameworks'
    ]
  },
  {
    id: 'market-research',
    title: 'Market and Impact Research',
    description: 'We apply sophisticated research methodologies to generate actionable market, social, and economic insights.',
    fullDescription: [
      'Our Market and Impact Research services provide the insights you need to understand your market, assess your impact, and make informed strategic decisions. We combine rigorous research methodologies with deep sector expertise to deliver findings that drive action.',
      'From consumer behavior studies and market assessments to social impact research and stakeholder analyses, our research team designs and implements projects that answer your most critical questions. We employ both quantitative and qualitative approaches, selecting the methods best suited to your research objectives.'
    ],
    icon: TrendingUp,
    image: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    features: [
      'Market Assessments and Feasibility Studies',
      'Consumer Behavior Research',
      'Customer Satisfaction and Experience Surveys',
      'Employee Engagement Studies',
      'Social Impact Research',
      'Stakeholder Mapping and Analysis',
      'Perception and Opinion Surveys',
      'Competitive Intelligence'
    ]
  },
  {
    id: 'data-management',
    title: 'Data Management & Integration',
    description: 'We help organizations establish robust data management practices and integrate disparate data sources for holistic analysis.',
    fullDescription: [
      'Our Data Management and Integration services help organizations overcome the challenges of data silos, quality issues, and inconsistent formats. We design and implement comprehensive data management strategies that ensure your data is accessible, reliable, and secure.',
      'From data governance frameworks and quality control systems to database design and ETL processes, our solutions create a solid foundation for all your data initiatives. We specialize in integrating multiple data sources into unified systems that enable comprehensive analysis and reporting.'
    ],
    icon: Database,
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    features: [
      'Data Governance and Strategy',
      'Database Design and Management',
      'ETL (Extract, Transform, Load) Processes',
      'Data Quality Control Systems',
      'Data Warehousing Solutions',
      'Master Data Management',
      'API Development and Integration',
      'Data Security and Compliance'
    ]
  },
  {
    id: 'geospatial-analysis',
    title: 'Geospatial Analysis & Mapping',
    description: 'We leverage location-based data to uncover spatial patterns, relationships, and trends for informed decision-making.',
    fullDescription: [
      'Our Geospatial Analysis and Mapping services transform location-based data into powerful visual insights that reveal spatial patterns and relationships. We help organizations leverage geographic information to optimize operations, target resources, and make more informed strategic decisions.',
      'From interactive web maps and spatial databases to complex GIS analysis and remote sensing, our geospatial solutions provide a unique perspective on your data. We specialize in integrating spatial and non-spatial data to create comprehensive analytical frameworks.'
    ],
    icon: MapPin,
    image: 'https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    features: [
      'Interactive Web Mapping',
      'Spatial Database Design',
      'Geographic Information System (GIS) Analysis',
      'Remote Sensing and Satellite Imagery Analysis',
      'Location Intelligence for Business',
      'Spatial Statistical Analysis',
      'Cartographic Design and Production',
      'Mobile GIS and Field Data Collection'
    ]
  }
];