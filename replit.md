# Egyptian High School Exam Results Website

## Overview

This is a satirical Egyptian high school exam results website built with React frontend and Express backend. The application features a fully Arabic interface where users can look up exam results by entering their الاسم الرباعي (full name) and رقم الجلوس (seat number). The system generates random scores between 50-95% for demonstration purposes and displays results with proper Arabic grading classifications (مقبول، جيد، جيد جداً، ممتاز). The website includes integrated Google AdSense advertisements in three strategic locations and automatically displays the current year in the title.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/ui components built on top of Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React Hook Form for form handling, TanStack Query for server state
- **Routing**: Wouter for client-side routing
- **Internationalization**: Arabic language support with custom date formatting utilities

**Key Design Decisions**:
- Component-based architecture with reusable UI components
- Form validation using Zod schemas for type safety
- Responsive design with mobile-first approach
- Toast notifications for user feedback
- Custom Arabic date and grading utilities

### Backend Architecture

**Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Development Setup**: Vite integration for hot reloading in development
- **API Design**: RESTful endpoints with proper error handling
- **Data Storage**: In-memory storage implementation with interface for easy database migration

**Key Design Decisions**:
- Clean separation between storage interface and implementation
- Request/response logging middleware for debugging
- Zod validation for API input validation
- Error handling middleware with proper HTTP status codes
- Development-friendly setup with automatic reloading

### Database Schema

**Database**: PostgreSQL hosted on Supabase (with Replit fallback)
**Tables**:
- `exam_results`: Stores exam results with UUID primary keys, full name, seat number, decimal score, and timestamps

**Design Patterns**:
- UUID primary keys for better scalability
- Decimal precision for score storage (5,2)
- Automatic timestamp management
- Normalized data structure
- Hybrid storage system with database preferred, memory fallback

### Data Flow Architecture

1. **Form Submission**: User enters name and seat number through React Hook Form
2. **Validation**: Client-side Zod validation before API call
3. **API Request**: TanStack Query handles the HTTP request with proper error handling
4. **Backend Processing**: Express validates input, checks for existing results, or generates new ones
5. **Response Handling**: Frontend displays results with Arabic formatting and proper grading

## External Dependencies

### Core Technologies
- **React 18**: Frontend framework with hooks and modern patterns
- **Express.js**: Backend web framework
- **TypeScript**: Type safety across the entire stack
- **Vite**: Build tool and development server

### Database & Storage
- **Drizzle ORM**: Type-safe database operations
- **@neondatabase/serverless**: PostgreSQL client optimized for serverless environments
- **connect-pg-simple**: PostgreSQL session store for Express

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Headless UI components for accessibility
- **Shadcn/ui**: Pre-built component library
- **Lucide React**: Icon library

### Advertisement Integration
- **Google AdSense**: Real integration with publisher ID ca-pub-4994973818889629
- **Live Ad Units**: Three production-ready ad slots configured
  - Top Banner: 2979454262 (Auto format)
  - Sidebar: 5556450486 (In-article fluid)
  - Bottom Banner: 8300881944 (Fluid layout with custom key)
- **Custom AdSense Components**: Reusable React components supporting all AdSense formats

### State Management & Data Fetching
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management
- **Zod**: Schema validation

### Development Tools
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Development tooling for Replit environment

### Utilities
- **date-fns**: Date manipulation and formatting
- **clsx & class-variance-authority**: Conditional CSS class management
- **nanoid**: ID generation utility

The system is designed for dual deployment: development on Replit and production on Vercel using serverless functions. The architecture supports seamless database connectivity across platforms with Supabase as primary storage and automatic fallback mechanisms.