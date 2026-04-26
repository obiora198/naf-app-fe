# NAF Lodge Booking Platform - Claude Instructions

## Project Overview
Nigerian Air Force (NAF) Lodge Booking System - a fullstack Next.js 15 application for booking military accommodation across NAF bases nationwide. This is a professional, production-grade platform serving military personnel, families, and authorized guests.

## Tech Stack
- **Framework:** Next.js 15 (App Router) with React 19
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 3.4 with custom NAF brand tokens
- **Database:** MongoDB via Mongoose ODM
- **Auth:** NextAuth v5 (Auth.js) with JWT strategy + credentials provider
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Utilities:** clsx, tailwind-merge

## Architecture
- `app/` - Next.js App Router pages and API routes
- `components/` - Shared React components
- `lib/` - Database connection and utilities
- `models/` - Mongoose schemas (User, Lodge, Booking)
- `auth.ts` - NextAuth configuration
- `middleware.ts` - Route protection middleware

## Design System & Brand
Use the **frontend-design** skill for all UI work. This is a military-grade booking platform that must look premium, authoritative, and trustworthy.

### Brand Colors (defined in tailwind.config.ts)
- `naf-navy`: #0F172A (Primary slate-navy - headers, backgrounds)
- `naf-sky`: #0EA5E9 (Secondary sky blue - tactical highlights)
- `naf-gold`: #A88B4D (Muted brass gold - accents, prestige elements)
- `naf-slate`: #F1F5F9 (Light background)

### Design Principles
- **Refined & Professional**: Think luxury hotel booking meets executive military precision.
- **Compact Excellence**: Conservative padding, smaller typography, and refined whitespace.
- **Typography**: Capped at 60px/text-6xl for massive headlines; text-base for body; text-[10px] for tactical labels.
- **Rounding**: Standardized "premium" rounding: 12px (rounded-xl) to 20px (rounded-3xl). Avoid oversized rounding.
- **Cards**: White backgrounds, very subtle borders, and shallow shadow-premium for depth.
- **Buttons**: Rounded-xl, bold uppercase text, gold primary CTAs with subtle hover scale effects.
- **Dark sections**: Use naf-navy with gold accents for commanding header areas.

## Development Rules

### Code Quality
- Write production-grade TypeScript - no `any` types except where Mongoose lean() requires it
- Use server components by default; add "use client" only when needed (interactivity, hooks)
- Use Next.js Image component for all images (optimization)
- Fetch data in server components with direct DB access (no unnecessary API calls)
- Use `export const dynamic = "force-dynamic"` for pages with live data

### API Routes
- All API routes follow RESTful conventions in `app/api/`
- Protected routes must check auth session via `auth()` from `@/auth`
- Admin routes check role === "admin" || "superadmin"
- Always use `connectDB()` before database operations
- Return proper HTTP status codes with JSON responses

### Database Patterns
- Use cached MongoDB connection from `lib/mongodb.ts`
- Models use `mongoose.models.X || mongoose.model()` pattern to prevent re-registration
- Use `.lean()` for read-only queries (returns plain objects, better performance)
- Always `.populate()` references when needed for display

### Auth & Security
- NextAuth v5 with JWT strategy
- Three roles: guest, admin, superadmin
- Middleware protects /dashboard/* and /admin/* routes
- Never expose passwords - always `.select("-password")` when returning user data
- Credentials are hashed with bcryptjs (10 rounds)

### Component Patterns
- Server components for data fetching pages
- Client components for interactive elements (forms, modals, carousels)
- Use Suspense boundaries with LoadingSpinner for async client content
- Use `useSession()` in client components, `auth()` in server components

### Testing
- Run E2E tests before marking features complete
- Test auth flows (login, register, protected routes)
- Test CRUD operations (lodges, bookings)
- Test responsive layouts on mobile/tablet/desktop

## Common Commands
```bash
npm run dev     # Start development server
npm run build   # Production build
npm run start   # Start production server
npm run lint    # ESLint check
```

## File Naming
- Pages: `page.tsx` (Next.js convention)
- Components: PascalCase (`NavBar.tsx`, `LodgeCard.tsx`)
- Utilities: camelCase (`mongodb.ts`)
- API routes: `route.ts`
