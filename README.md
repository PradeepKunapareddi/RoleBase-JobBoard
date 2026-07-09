# Rolebase – AI-Powered Job Board

Rolebase is a modern AI-assisted job board application built to help job seekers discover, explore, and apply for relevant job opportunities through a clean, intuitive, and responsive interface.

The platform provides advanced job search, filtering, job details, bookmarking, AI-inspired job matching, salary insights, and quick application features.

This project was developed using AI-assisted development tools with a strong focus on:

- User Experience (UX)
- Responsive Design
- Clean UI Architecture
- Scalable Frontend Development
- Modern Development Practices


## Live Application

**Vercel Demo:**  
https://rolebase-job-board.vercel.app/

**GitHub Repository:**  
https://github.com/PradeepKunapareddi/RoleBase-JobBoard


---

# Features


## Job Search

Users can search jobs based on:

- Job title
- Company name
- Skills

The search experience provides instant filtering and helps users quickly discover suitable opportunities.


## Advanced Job Filters

Users can refine job results using multiple filters:

### Work Mode
- Remote
- Hybrid
- On-site

### Employment Type
- Full-time
- Part-time
- Contract

### Experience Level
- Entry Level
- Mid Level
- Senior Level

### Additional Filters

- Industry
- Company Size
- Salary Range
- Posted Date


## Job Details

Each job has a dedicated details page containing:

- Complete job description
- Required skills
- Salary information
- Company details
- Employment information
- Apply options


## Company Profiles

Users can explore company information including:

- Company name
- Industry
- Company size
- Verification badges
- Premium company indicators


## AI Match Score

The application provides an AI-inspired job compatibility score for each opportunity.

This helps users:

- Identify relevant jobs faster
- Compare opportunities easily
- Improve job discovery experience


## Quick Apply

Users can apply quickly from:

- Job listing cards
- Job details page

The simplified workflow reduces unnecessary steps during application.


## Bookmark Jobs

Users can save jobs they are interested in.

Features:

- Add jobs to bookmarks
- Remove bookmarked jobs
- View saved jobs
- Persistent storage using browser Local Storage


## Salary Insights

The application provides salary comparison information to help users understand compensation trends and make better career decisions.


## Responsive Design

The application is optimized for:

- Mobile devices
- Tablets
- Desktop screens

The interface automatically adapts according to screen size.


## Modern UI Experience

The application includes:

- Clean and professional interface
- Smooth animations
- Interactive components
- Dark mode support
- User-friendly layouts


---

# Technology Stack


## Frontend

- React
- TypeScript
- Vite


## Routing

- TanStack Router


## Styling

- Tailwind CSS
- shadcn/ui


## Animations

- Framer Motion


## Icons

- Lucide React


## Validation

- Zod


## State Management

- React Hooks


## Storage

- Browser Local Storage


## Development & Deployment

- Git
- GitHub
- GitHub Actions
- Vercel


---

# 📂 Project Structure
RoleBaseJobBoard/glow-careers

│
├── src/
│ ├── components/
│ ├── routes/
│ ├── data/
│ ├── hooks/
│ ├── lib/
│ ├── styles/
│ └── main.tsx
│
├── public/
│
├── .github/
│ └── workflows/
│ └── deploy.yml
│
├── package.json
├── README.md
└── vite.config.ts



---

# ⚙️ Installation and Setup


# Install Dependencies
npm install

# Start Development Server
npm run dev

# CI/CD Pipeline

The project uses GitHub Actions for Continuous Integration and Continuous Deployment.

Workflow Process :

- Developer pushes code to GitHub repository
- GitHub Actions automatically triggers the workflow
- Required dependencies are installed
- Application build process is executed
- Build errors are identified before deployment
- Successful builds are deployed to Vercel

Workflow File Location :

- .github/workflows/deploy.yml

# Benefits
- Automated deployment
- Faster development workflow
- Reduced manual deployment process
- Reliable production updates

# Deployment

The application is deployed using Vercel.

Deployment Flow:

Developer Code
        |
        |
GitHub Repository
        |
        |
GitHub Actions CI/CD
        |
        |
Build Verification
        |
        |
Vercel Deployment
        |
        |
Live Application

# Future Enhancements

Planned improvements:

- User Authentication
- Employer Dashboard
- Resume Upload
- AI Resume Analysis
- Personalized Job Recommendations
- Email Notifications
- Application Tracking
- Company Reviews
- Backend API Integration
- Database Support
- Cloud Storage Integration

# Author

Pradeep Kunapareddi

AI & Software Developer

# License

This project was developed for technical assessment and educational purposes.

