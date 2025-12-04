# Health-O Project - Folder Structure Documentation

## Overview

**Health-O** is an enhanced, modernized version of the Svastha healthcare management platform. This project mirrors the **Svastha folder structure** but is built with **Next.js 15 App Router** and modern technologies. Currently, the project focuses on **UI implementation** with core functionality being developed incrementally.

**Key Principle**: This structure follows Svastha's organizational patterns but adapted for Next.js 15 App Router conventions.

## Project Technology Stack

- **Framework**: Next.js 15.5.6 (App Router)
- **Language**: TypeScript 5 (Strict Mode Enabled)
- **UI Library**: React 19.1.0
- **State Management**: Redux Toolkit 2.11.0 (Modern Redux - replaces Redux Saga)
- **Styling**: Tailwind CSS 4 (replaces SCSS Modules)
- **UI Components**: shadcn/ui (New York style) - replaces Theme components
- **Icons**: Lucide React (replaces FontAwesome)
- **Build Tool**: Turbopack (Next.js 15)
- **Package Manager**: npm

---

## Root Directory Structure

```
health-o/
├── app/                  # Next.js 15 App Router (replaces pages/)
├── src/                  # Source code (mirrors svastha/src/)
│   ├── component/        # React components (mirrors svastha/src/component/)
│   ├── redux/            # Redux state management (mirrors svastha/src/redux/)
│   └── libs/             # Utility libraries (mirrors svastha/src/libs/)
├── components/           # Shared components (temporary - will move to src/)
├── lib/                  # Utilities (temporary - will move to src/libs/)
├── store/                # Redux store (temporary - will move to src/redux/)
├── public/               # Static assets
├── .git/                 # Git repository
├── .next/                # Next.js build output (generated)
├── node_modules/         # Dependencies
├── components.json       # shadcn/ui configuration
├── eslint.config.mjs     # ESLint configuration
├── next.config.ts        # Next.js configuration
├── next-env.d.ts         # Next.js TypeScript definitions
├── package.json          # Project dependencies and scripts
├── package-lock.json     # npm lock file
├── postcss.config.mjs    # PostCSS configuration
├── README.md             # Project readme
├── tsconfig.json         # TypeScript configuration
└── .gitignore            # Git ignore rules
```

**Note**: Currently, some files are in root-level directories (`components/`, `lib/`, `store/`). The target structure mirrors Svastha with everything under `src/`. This documentation reflects the **target structure** based on Svastha's organization.

---

## Detailed Directory Breakdown

### 📁 `app/` (Next.js 15 App Router)
**Maps from**: `svastha/pages/` (Pages Router)

Next.js 15 App Router directory - file-based routing with layouts and pages. This replaces Svastha's `pages/` directory.

#### Root Layout & Pages:
- `layout.tsx` - Root layout (wraps all pages, includes ReduxProvider)
  - **Maps from**: `svastha/pages/_app.tsx`
- `page.tsx` - Root page (redirects to dashboard)
  - **Maps from**: `svastha/pages/index.tsx`
- `globals.css` - Global Tailwind CSS styles
  - **Maps from**: `svastha/styles/globals.scss`
- `favicon.ico` - Application favicon

#### Authentication Pages:
- `login/`
  - `page.tsx` - Login page component (imports from `components/Containers/Login/LoginContainer`)
  - `layout.tsx` - Login layout wrapper
  - **Maps from**: `svastha/pages/login.tsx` + `svastha/src/component/Containers/Login/`
- `forgot-password/`
  - `page.tsx` - Forgot password page (imports from `components/Containers/ForgotPassword/ForgotPasswordContainer`)
  - **Maps from**: `svastha/pages/forgot-password.tsx` + `svastha/src/component/Containers/ForgotPassword/`
- `set-password/`
  - `page.tsx` - Set password page (imports from `components/Containers/ResetPassword/ResetPasswordContainer`)
  - **Maps from**: `svastha/pages/resetpassword.tsx` + `svastha/src/component/Containers/ResetPassword/`
- `otp/`
  - `page.tsx` - OTP verification page (imports from `components/Containers/Otp/OtpContainer`)
  - **Maps from**: `svastha/src/component/Containers/Login/` (OTP handled within Login in svastha)
- `logout/`
  - `page.tsx` - Logout page (imports from `components/Containers/Logout/LogoutContainer`)
  - **Maps from**: `svastha/src/context/LayoutContext.tsx` (doLogout function)

#### Dashboard:
- `dashboard/`
  - `layout.tsx` - Dashboard layout (includes Sidebar, Header, auth check)
    - **Maps from**: `svastha/src/component/AppShell/Layout/MainLayout/`
  - `page.tsx` - Dashboard main page (imports from `components/Containers/Dashboard/DashboardContainer`)
    - **Maps from**: `svastha/pages/dashboard.tsx` + `svastha/src/component/Containers/Dashboard/`

**App Router Differences from Pages Router**:
- Uses `layout.tsx` for shared layouts (instead of `_app.tsx`)
- File-based routing with folders
- Server Components by default
- Client Components marked with `"use client"`

---

### 📁 `src/component/` (Target Structure)
**Maps from**: `svastha/src/component/`

React components organized following Svastha's structure. Currently, components are in root `components/` but will be moved here to mirror Svastha.

#### **AppShell/** (Target)
**Maps from**: `svastha/src/component/AppShell/`

Application shell and layout components:
- `Layout/` - Layout components
  - `AuthLayout/` - Authentication layout (for login, forgot-password pages)
  - `MainLayout/` - Main application layout
    - `Header/` - Header component
      - **Currently**: `components/dashboard/components/Header.tsx`
    - `Sidebar/` - Sidebar navigation
      - **Currently**: `components/dashboard/components/Sidebar.tsx`
    - `Footer/` - Footer component (responsive shortcuts)

**Current State**: Dashboard layout is in `app/dashboard/layout.tsx`. Should be extracted to `src/component/AppShell/Layout/MainLayout/`.

#### **Containers/** (Target)
**Maps from**: `svastha/src/component/Containers/`

Page-level container components. Each container follows the pattern:
- `[Feature]Container.tsx` - Redux-connected container (or App Router page)
- `[Feature]Scene.tsx` - Presentational component
- `[Feature].module.css` or Tailwind classes - Component styles

**Currently Implemented**:
- `Login/` - Login page container
  - **Current**: `components/Containers/Login/`
  - `LoginContainer.tsx` - Container component (logic)
  - `LoginScene.tsx` - Presentational component (UI)
- `ForgotPassword/` - Password recovery container
  - **Current**: `components/Containers/ForgotPassword/`
  - `ForgotPasswordContainer.tsx` - Container component (logic)
  - `ForgotPasswordScene.tsx` - Presentational component (UI)
- `ResetPassword/` - Password reset container (used by set-password page)
  - **Current**: `components/Containers/ResetPassword/`
  - `ResetPasswordContainer.tsx` - Container component (logic)
  - `ResetPasswordScene.tsx` - Presentational component (UI)
- `Otp/` - OTP verification container
  - **Current**: `components/Containers/Otp/`
  - `OtpContainer.tsx` - Container component (logic)
  - `OtpScene.tsx` - Presentational component (UI)
- `Logout/` - Logout container
  - **Current**: `components/Containers/Logout/`
  - `LogoutContainer.tsx` - Container component (logic)
- `Dashboard/` - Dashboard with sections
  - **Current**: `components/Containers/Dashboard/`
  - `DashboardContainer.tsx` - Container component (logic)
  - `DashboardScene.tsx` - Presentational component (UI)
  - `components/` - Dashboard section components (all follow Container/Scene pattern)
    - `Overview/` - OverviewContainer + OverviewScene
    - `OrderManagement/` - OrderManagementContainer + OrderManagementScene
    - `InventoryTransfer/` - InventoryTransferContainer + InventoryTransferScene
    - `NotificationsCenter/` - NotificationsCenterContainer + NotificationsCenterScene
    - `Reports/` - ReportsContainer + ReportsScene
    - `Incidents/` - IncidentsContainer + IncidentsScene
    - `LivePouchStatus/` - LivePouchStatusContainer + LivePouchStatusScene
    - `PouchHistory/` - PouchHistoryContainer + PouchHistoryScene
    - `Header.tsx` - Dashboard header component
    - `Sidebar.tsx` - Dashboard sidebar component
  - `context/` - DashboardContext provider and hooks
  - `data/` - Data files for dashboard sections
  - `types.ts` - TypeScript type definitions for dashboard

**Future Containers** (from Svastha, to be implemented):
- `Customers/` - Customer listing
- `Patients/` - Patient management
- `Documents/` - Document management
- `OrderManagement/` - Order management
- `Tasks/` - Task management
- And more...

#### **Modals/** (Target)
**Maps from**: `svastha/src/component/Modals/`

Modal components for various actions. Currently not implemented, but structure should mirror Svastha:

**Future Modals** (from Svastha, to be implemented):
- `ConfirmationModal.tsx` - Generic confirmation dialog
- `AddCustomerModal/` - Add customer form
- `AddPatientModal/` - Add patient form
- `AddOrderModal/` - Add order form
- `UpdateOrderModal/` - Edit order
- And many more...

**Note**: Modals will use shadcn/ui Dialog component as base instead of custom modal.

#### **Theme/** (Target - Partially Replaced by shadcn/ui)
**Maps from**: `svastha/src/component/Theme/`

Reusable UI components and design system. In Health-O, this is partially replaced by shadcn/ui components, but custom theme components can be added here.

**Current State**: 
- shadcn/ui components in `components/ui/` (button, card, checkbox, input, label)
- **Target**: Move to `src/component/Theme/` or keep shadcn/ui in `components/ui/` and add custom theme components here

**Future Theme Components** (from Svastha, to be implemented):
- `Button/` - Custom button variants (if needed beyond shadcn/ui)
- `Filter/` - Filter component
- `Pagination/` - Pagination component
- `SearchInput/` - Search input field
- `Table/` - Table components
- `Modal/` - Base modal (using shadcn/ui Dialog)
- `Skeletons/` - Loading skeletons
- And more...

#### **Other Component Directories** (Target)
**Maps from**: `svastha/src/component/`

- `Error/` - Error component
  - **Maps from**: `svastha/src/component/Error/`
- `DefaultSkeleton/` - Loading skeleton
  - **Maps from**: `svastha/src/component/DefaultSkeleton/`
- `FormFields/` - Form field components
  - **Maps from**: `svastha/src/component/FormFields/`
- `Skeletons/` - Loading skeletons
  - **Maps from**: `svastha/src/component/Skeletons/`

**Currently**: Not implemented. Will be added as needed.

---

### 📁 `src/redux/` (Target Structure)
**Maps from**: `svastha/src/redux/`

Redux state management. Uses Redux Toolkit instead of Redux + Redux Saga.

**Current State**: Redux store is in `store/` directory. Should be moved to `src/redux/` to mirror Svastha.

#### Store Configuration:
- `store.ts` - Redux store setup
  - **Current**: `store/index.ts`
  - **Maps from**: `svastha/src/redux/store.ts`
- `reducer.ts` - Root reducer combining all feature reducers
  - **Maps from**: `svastha/src/redux/reducer.ts`
- `hooks.ts` - Typed Redux hooks
  - **Current**: `store/hooks.ts`

#### Feature Slices (Redux Toolkit):
Each feature slice follows Redux Toolkit pattern (simpler than Svastha's actions/reducer/saga pattern):

**Currently Implemented**:
- `auth/` - Authentication slice
  - `auth-slice.ts` - Auth slice with actions
  - **Current**: `store/auth-slice.ts`
  - **Maps from**: `svastha/src/redux/auth/` (but uses Redux Toolkit instead of Saga)

**Future Slices** (from Svastha, to be implemented):
- `customer/` - Customer state
- `patient/` - Patient state
- `order/` - Order state
- `document/` - Document state
- `task/` - Task state
- `checklist/` - Checklist state
- `product/` - Product state
- `notification/` - Notification state
- And 40+ more modules from Svastha...

**Redux Toolkit vs Redux Saga**:
- Svastha: `actions.ts` + `reducer.ts` + `saga.ts` + `api.tsx`
- Health-O: `[feature]-slice.ts` (combines actions + reducer) + API calls in components or separate API layer

---

### 📁 `src/libs/` (Target Structure)
**Maps from**: `svastha/src/libs/`

Utility libraries and helper functions.

**Current State**: Utilities are in `lib/` directory. Should be moved to `src/libs/` to mirror Svastha.

**Currently Implemented**:
- `utils.ts` - General utilities (cn function for className merging)
  - **Current**: `lib/utils.ts`
- `auth.ts` - Authentication utilities
  - **Current**: `lib/auth.ts`
  - `readAuthCookie()` - Read auth cookie
  - `writeAuthCookie()` - Write auth cookie
  - `clearAuthCookie()` - Clear auth cookie
  - `AuthCookiePayload` type
  - **Maps from**: `svastha/src/libs/userHelper.tsx` + cookie handling

**Future Utilities** (from Svastha, to be implemented):
- `helpers.tsx` - Helper functions
  - **Maps from**: `svastha/src/libs/helpers.tsx`
- `constants.tsx` - Application constants
  - **Maps from**: `svastha/src/libs/constants.tsx`
- `validators.tsx` - Form validation functions
  - **Maps from**: `svastha/src/libs/validators.tsx`
- `permissionHelper.tsx` - Permission checking utilities
  - **Maps from**: `svastha/src/libs/permissionHelper.tsx`
- `cache.tsx` - Caching utilities
  - **Maps from**: `svastha/src/libs/cache.tsx`
- `socket.tsx` - Socket.io client setup
  - **Maps from**: `svastha/src/libs/socket.tsx`
- Custom hooks:
  - `useLoginStatus.tsx` - Login status hook
  - `useDocumentSelection.tsx` - Document selection hook
  - `useOuterClickNotifier.tsx` - Outer click detection hook
  - And more...

---

### 📁 `src/context/` (Target Structure)
**Maps from**: `svastha/src/context/`

React Context providers.

**Currently Implemented**:
- `DashboardContext.tsx` - Dashboard context for managing active section, sidebar state
  - **Current**: `components/dashboard/context/DashboardContext.tsx`
  - **Target**: `src/context/DashboardContext.tsx` or keep in component directory

**Future Contexts** (from Svastha):
- `LayoutContext.tsx` - Layout context for managing layout state
  - **Maps from**: `svastha/src/context/LayoutContext.tsx`

---

### 📁 `public/`
**Maps from**: `svastha/public/`

Static assets served at the root URL.

**Currently**:
- `file.svg` - File icon
- `globe.svg` - Globe icon
- `next.svg` - Next.js logo
- `vercel.svg` - Vercel logo
- `window.svg` - Window icon

**Future** (from Svastha):
- Favicons and app icons
- `images/` - UI icons and illustrations (129 files in Svastha)
- `file/` - Sample files
- Service worker files (if PWA support added)

---

## Structure Mapping: Svastha → Health-O

### Component Organization

| Svastha Structure | Health-O Structure (Target) | Current State | Status |
|-------------------|------------------------------|---------------|--------|
| `src/component/AppShell/Layout/` | `src/component/AppShell/Layout/` | `app/dashboard/layout.tsx` | ⚠️ Needs reorganization |
| `src/component/Containers/Dashboard/` | `src/component/Containers/Dashboard/` | `components/dashboard/` | ⚠️ Needs reorganization |
| `src/component/Containers/Login/` | `src/component/Containers/Login/` | `app/login/` | ⚠️ Needs reorganization |
| `src/component/Modals/` | `src/component/Modals/` | Not implemented | 📋 Planned |
| `src/component/Theme/` | `src/component/Theme/` + `components/ui/` | `components/ui/` (shadcn/ui) | ✅ Partial |
| `src/component/Error/` | `src/component/Error/` | Not implemented | 📋 Planned |
| `src/component/Skeletons/` | `src/component/Skeletons/` | Not implemented | 📋 Planned |

### Redux Organization

| Svastha Structure | Health-O Structure (Target) | Current State | Status |
|-------------------|------------------------------|---------------|--------|
| `src/redux/store.ts` | `src/redux/store.ts` | `store/index.ts` | ⚠️ Needs move |
| `src/redux/reducer.ts` | `src/redux/reducer.ts` | Not implemented | 📋 Planned |
| `src/redux/auth/` | `src/redux/auth/auth-slice.ts` | `store/auth-slice.ts` | ⚠️ Needs move |
| `src/redux/[feature]/` | `src/redux/[feature]/[feature]-slice.ts` | Not implemented | 📋 Planned |

### Utilities Organization

| Svastha Structure | Health-O Structure (Target) | Current State | Status |
|-------------------|------------------------------|---------------|--------|
| `src/libs/utils.tsx` | `src/libs/utils.ts` | `lib/utils.ts` | ⚠️ Needs move |
| `src/libs/helpers.tsx` | `src/libs/helpers.tsx` | Not implemented | 📋 Planned |
| `src/libs/constants.tsx` | `src/libs/constants.tsx` | Not implemented | 📋 Planned |
| `src/libs/auth.ts` | `src/libs/auth.ts` | `lib/auth.ts` | ⚠️ Needs move |
| `src/libs/validators.tsx` | `src/libs/validators.tsx` | Not implemented | 📋 Planned |

### Pages/Routes Organization

| Svastha Structure | Health-O Structure | Current State | Status |
|-------------------|-------------------|---------------|--------|
| `pages/login.tsx` | `app/login/page.tsx` | ✅ Implemented | ✅ Complete |
| `pages/dashboard.tsx` | `app/dashboard/page.tsx` | ✅ Implemented | ✅ Complete |
| `pages/forgot-password.tsx` | `app/forgot-password/page.tsx` | ✅ Implemented | ✅ Complete |
| `pages/resetpassword.tsx` | `app/set-password/page.tsx` | ✅ Implemented | ✅ Complete |
| `pages/_app.tsx` | `app/layout.tsx` | ✅ Implemented | ✅ Complete |

---

## Key Architectural Patterns (Mirroring Svastha)

### 1. **Container/Scene Pattern** (Adapted for App Router)
**From Svastha**: Container handles Redux logic, Scene handles presentation.

**In Health-O**:
- **Container**: App Router page component (`page.tsx`) or separate container component
- **Scene**: Presentational component (can be Server or Client Component)
- Separation of concerns maintained

### 2. **Feature-Based Redux Modules**
**From Svastha**: Each feature has its own Redux module with consistent structure.

**In Health-O**:
- Uses Redux Toolkit slices instead of separate action/reducer/saga files
- Each feature: `[feature]-slice.ts` (combines actions + reducer)
- API calls in components or separate API service layer

### 3. **Component Organization**
**From Svastha**: Components grouped by type (Containers, Modals, Theme, etc.)

**In Health-O**:
- Same organization structure
- `Containers/` for page-level components
- `Modals/` for modal dialogs
- `Theme/` for reusable UI (partially replaced by shadcn/ui)
- `AppShell/` for layout components

### 4. **File-Based Routing**
**From Svastha**: Next.js pages directory for routing.

**In Health-O**:
- Next.js 15 App Router with `app/` directory
- File-based routing with layouts
- Dynamic routes using `[param]` syntax
- Server Components by default

### 5. **Styling Approach**
**From Svastha**: SCSS Modules for component-scoped styles.

**In Health-O**:
- Tailwind CSS for utility-first styling
- No CSS modules needed
- Component-scoped styles using Tailwind classes
- Global styles in `app/globals.css`

---

## Current Implementation Status

### ✅ Implemented (UI Focus):
1. **Authentication Flow**
   - Login page with demo users
   - Forgot password page
   - Set password page
   - Cookie-based auth persistence
   - **Location**: `app/login/`, `app/forgot-password/`, `app/set-password/`

2. **Dashboard**
   - Layout with Sidebar and Header
   - Section-based navigation
   - 8 dashboard sections (UI only):
     - Overview
     - Inventory Transfer
     - Order Management
     - Notifications Center
     - Reports
     - Incidents
     - Live Pouch Status
     - Pouch History
   - **Location**: `app/dashboard/` + `components/dashboard/`

3. **UI Components**
   - shadcn/ui base components (button, card, checkbox, input, label)
   - Responsive design
   - Modern UI/UX
   - **Location**: `components/ui/`

4. **State Management**
   - Redux Toolkit setup
   - Auth slice with demo users
   - Typed hooks
   - **Location**: `store/`

### 🚧 Needs Reorganization:
- Move `store/` → `src/redux/`
- Move `lib/` → `src/libs/`
- Move `components/` → `src/component/` (or keep shadcn/ui in `components/ui/`)
- Extract dashboard layout to `src/component/AppShell/Layout/MainLayout/`
- Reorganize `components/dashboard/` → `src/component/Containers/Dashboard/`

### 📋 Planned (From Svastha):
- More Containers (Customers, Patients, Documents, Orders, Tasks, etc.)
- Modals for various actions
- Theme components (Filter, Pagination, Table, etc.)
- Error components
- Loading skeletons
- More Redux slices
- Utility functions (helpers, constants, validators, etc.)
- Permission system
- Socket.io integration
- API service layer

---

## Migration Path: Current → Target Structure

### Phase 1: Reorganize Core Directories
1. Create `src/` directory structure
2. Move `store/` → `src/redux/`
3. Move `lib/` → `src/libs/`
4. Update imports across codebase

### Phase 2: Reorganize Components
1. Create `src/component/` structure
2. Move `components/ui/` → keep as is (shadcn/ui convention) OR move to `src/component/Theme/`
3. Extract dashboard layout → `src/component/AppShell/Layout/MainLayout/`
4. Reorganize `components/dashboard/` → `src/component/Containers/Dashboard/`

### Phase 3: Add Missing Structure
1. Create `src/component/Modals/` directory
2. Create `src/component/Error/` directory
3. Create `src/component/Skeletons/` directory
4. Create `src/component/Theme/` for custom components

### Phase 4: Implement Features
1. Add more Containers from Svastha
2. Add Modals
3. Add Redux slices
4. Add utility functions

---

## Configuration Files

### `next.config.ts`
Next.js configuration:
- Basic configuration (can be extended)
- TypeScript configuration file
- **Future**: Add PWA support, environment variables (like Svastha)

### `tsconfig.json`
TypeScript configuration:
- **Strict mode**: Enabled (Svastha has it disabled)
- Target: ES2017
- Module: ESNext
- Module resolution: Bundler
- Path aliases: `@/*` → `./*`
- Includes Next.js plugin

### `package.json`
Key dependencies:
- **Next.js 15.5.6** - React framework with App Router
- **React 19.1.0** - Latest React version
- **Redux Toolkit 2.11.0** - Modern Redux (replaces Redux Saga)
- **Tailwind CSS 4** - Utility-first CSS framework (replaces SCSS)
- **shadcn/ui** - High-quality component library (replaces custom Theme components)
- **Lucide React** - Icon library (replaces FontAwesome)
- **TypeScript 5** - Type safety

### `components.json`
shadcn/ui configuration:
- Style: New York
- RSC: Enabled (React Server Components)
- Tailwind CSS variables enabled
- Icon library: Lucide
- Path aliases configured

---

## Development Workflow

### Scripts (from package.json):
- `dev` - Start development server with Turbopack
- `build` - Build for production with Turbopack
- `start` - Start production server
- `lint` - Run ESLint

### Development Features:
- **Turbopack**: Fast bundler (faster than Webpack in Svastha)
- **Hot Reload**: Instant updates during development
- **TypeScript**: Full type checking with strict mode
- **ESLint**: Code quality checks

---

## Path Aliases

Configured in `tsconfig.json`:
- `@/*` → `./*` (root directory)

Used in imports:
```typescript
import { Button } from "@/components/ui/button"
import { useDashboard } from "@/components/Containers/Dashboard/context/DashboardContext"
import { useAppSelector } from "@/store/hooks"
```

**Future** (after reorganization):
```typescript
import { Button } from "@/src/component/Theme/Button/ButtonComponent"
import { DashboardContainer } from "@/src/component/Containers/Dashboard/DashboardContainer"
import { useAppSelector } from "@/src/redux/hooks"
```

---

## Notes

- **Structure Mirroring**: This project mirrors Svastha's folder structure but adapted for Next.js 15
- **Modern Stack**: Uses latest versions of Next.js, React, Redux Toolkit
- **Type Safety**: Full TypeScript with strict mode (Svastha has strict mode disabled)
- **UI-First Development**: Currently focused on UI implementation
- **Demo Data**: Uses mock data (will be replaced with API calls)
- **Reorganization Needed**: Some directories need to be moved to match target structure
- **Incremental Migration**: Features from Svastha will be added incrementally

---

## File Count Summary

### Current Implementation:
- **Pages**: 5 pages (login, forgot-password, set-password, dashboard, root)
- **Components**: ~15+ components
- **Features**: 1 feature module (dashboard)
- **Redux Slices**: 1 slice (auth)
- **UI Components**: 5 shadcn/ui components (expandable)

### Target (Based on Svastha):
- **Containers**: 40+ containers (to be implemented)
- **Modals**: 80+ modal components (to be implemented)
- **Theme Components**: 250+ reusable UI components (partially replaced by shadcn/ui)
- **Redux Slices**: 50+ feature slices (to be implemented)
- **Pages**: 40+ pages (to be implemented)

---

*Last Updated: Generated from project structure analysis*
*Status: UI Implementation Phase - Structure mirroring Svastha, adapted for Next.js 15*
*Target Structure: Mirrors Svastha's organization with Next.js 15 App Router conventions*
