# MES Mock Exam - Architecture Documentation

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Base UI components (Button, Card, etc.)
│   ├── shared/         # Shared components (Sidebar, TopBar, etc.)
│   ├── dashboard/      # Dashboard-specific components
│   ├── history/        # History-specific components
│   └── info/           # Information-specific components
├── layouts/            # Layout components (AppLayout, ExamLayout)
├── pages/              # Page components (route-level)
│   ├── dashboard/      # Dashboard pages
│   ├── exam/           # Exam pages
│   ├── history/        # History pages
│   ├── info/           # Information pages
│   └── error/          # Error pages
├── hooks/              # Custom React hooks
├── lib/                # Library functions (theme, i18n, utilities)
├── services/           # Data service layer
├── config/             # Application configuration
├── data/               # Static data definitions
├── locales/            # Translation files (JSON)
├── styles/             # Global styles (CSS)
└── App.tsx             # Main application component
```

## Architecture Principles

### 1. Component Hierarchy
- **UI Components** (`components/ui/`): Base, reusable building blocks
- **Shared Components** (`components/shared/`): Layout-agnostic shared components
- **Feature Components** (`components/dashboard/`, etc.): Feature-specific components
- **Layout Components** (`layouts/`): Page-level layout wrappers
- **Page Components** (`pages/`): Route-level components

### 2. Data Flow
```
Data Service (services/data.service.ts)
    ↓
Custom Hooks (hooks/use-data.ts)
    ↓
Components (pages, features)
```

### 3. Configuration Management
All application configuration is centralized in `src/config/index.ts`:
- `APP_CONFIG`: Application metadata
- `THEME_CONFIG`: Theme-related settings
- `LANGUAGE_CONFIG`: Internationalization settings
- `NAVIGATION_CONFIG`: Navigation configuration
- `EXAM_CONFIG`: Exam-specific settings
- `UI_CONFIG`: UI component configurations

### 4. State Management
- **Theme**: `useTheme()` hook in `src/lib/theme.ts`
- **Language**: `useLanguage()` hook in `src/lib/i18n.tsx`
- **Data**: `dataService` singleton in `src/services/data.service.ts`

## Key Improvements Made

### Phase 1: Component Architecture
- ✅ Enhanced `Card` component with variants and composable sub-components
- ✅ Enhanced `Button` component with loading states and icon support
- ✅ Added `CardHeader`, `CardTitle`, `CardContent`, `CardFooter` sub-components
- ✅ Improved TypeScript typing for all components

### Phase 2: Data Management
- ✅ Created `DataService` class with typed methods for data access
- ✅ Created custom hooks (`useData`, `useInstitution`, `useSubjectsByInstitution`, etc.)
- ✅ Centralized search and filter operations
- ✅ Added validation methods for data integrity
- ✅ Reduced data duplication across components

### Phase 3: Configuration & Setup
- ✅ Created comprehensive `src/config/index.ts` with all configuration values
- ✅ Added `ErrorBoundary` component for graceful error handling
- ✅ Improved `ErrorPage` with configurable props
- ✅ Updated `theme.ts` to use centralized configuration
- ✅ Updated `i18n.tsx` to use centralized configuration

### Phase 4: Build & Tooling
- ✅ Enhanced `tsconfig.json` with improved path mappings and strict settings
- ✅ Improved `build.ts` with better build reporting and structure
- ✅ Updated `lib/utils.ts` with comprehensive utility functions
- ✅ Added proper module exports and TypeScript paths

## Usage Patterns

### Using Data Service
```typescript
import { dataService } from "@/services/data.service";

// Get all institutions
const institutions = dataService.getAllInstitutions();

// Get subjects by institution
const { institution, groups } = dataService.getSubjectsByInstitution("itc");

// Find a specific subject
const { subject, group } = dataService.findSubject("itc", "math");
```

### Using Custom Hooks
```typescript
import { useInstitution, useSubjectsByInstitution } from "@/hooks/use-data";

function MyComponent() {
  const institution = useInstitution("itc");
  const { groups } = useSubjectsByInstitution("itc");
  // ...
}
```

### Using Configuration
```typescript
import { EXAM_CONFIG, APP_CONFIG } from "@/config";

console.log(APP_CONFIG.name);
console.log(EXAM_CONFIG.defaultDurationSeconds);
```

### Using UI Components
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function MyComponent() {
  return (
    <Card variant="default" padding="md">
      <CardHeader>
        <CardTitle>My Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button loading={false} icon={<Icon />}>
          Click me
        </Button>
      </CardContent>
    </Card>
  );
}
```

## Best Practices Followed

1. **Single Source of Truth**: All configuration centralized in `src/config/`
2. **Type Safety**: Full TypeScript support with strict mode enabled
3. **DRY Principle**: Reusable components and hooks prevent duplication
4. **Separation of Concerns**: Clear boundaries between UI, logic, and data layers
5. **Error Handling**: Graceful error boundaries prevent cascading failures
6. **Performance**: Memoized hooks and optimized build configurations
7. **Accessibility**: Proper ARIA labels and keyboard navigation support
8. **Modularity**: Clean component decomposition with clear responsibilities