# LTP Client (물류 무역 플랫폼)

이 프로젝트는 물류 및 무역 프로세스를 관리하기 위한 웹 애플리케이션의 클라이언트 파트입니다. 
## 주요 기능

- **사용자 인증**: 안전한 회원가입 및 로그인 기능
- **견적 관리**: 화물 운송 견적 요청, 조회, 수정 및 삭제
- **주소록 관리**: 자주 사용하는 주소 저장 및 관리 기능
- **관리자 대시보드**: 접수된 견적 현황 모니터링 및 관리

## 기술 스택

- **Core**: React, TypeScript, Vite
- **State Management**: TanStack Query, Zustand
- **Routing**: React Router
- **Styling**: Tailwind CSS, shadcn/ui, class-variance-authority
- **Form Handling**: React Hook Form, Zod
- **HTTP Client**: Ky
- **Date/Time**: Day.js
- **Error Handling**: React Error Boundary

## 프로젝트 구조

프로젝트는 Feature-Driven-Design 아키텍처 원칙을 기반으로 설계되어, 도메인별 기능 구분을 통해 유지보수성과 확장성을 극대화합니다. 각 디렉토리의 역할은 다음과 같습니다.

```
src/
├── app/
├── entities/
├── features/
├── pages/
├── shared/
└── widget/
```

- **`app`**: 애플리케이션의 진입점과 전역 설정을 담당합니다.
  - `RootRouter.tsx`: 전체 애플리케이션의 라우팅 구조를 정의합니다.
  - `RouteGuard.tsx`: 특정 라우트에 대한 접근 제어(예: 로그인 여부 확인)를 처리합니다.
  - `App.tsx`: 전역 상태 제공자(Provider), 공통 레이아웃 등을 포함하는 최상위 컴포넌트입니다.

- **`entities`**: 도메인의 핵심 데이터 모델과 타입을 정의합니다.
  - `user.ts`, `quote.ts`: `User`, `Quote`와 같이 프로젝트 전반에서 사용되는 핵심 엔티티의 TypeScript 인터페이스 또는 타입을 정의합니다. 순수한 데이터 구조이며 비즈니스 로직을 포함하지 않습니다.

- **`features`**: 특정 도메인 기능과 관련된 비즈니스 로직, API 연동, 상태 관리를 그룹화합니다.
  - `auth/`, `quote/`, `user/` 등 각 기능별로 디렉토리를 생성합니다.
  - 각 디렉토리 내부에는 `api/`(API 요청 함수), `queries/`(TanStack Query 훅), `hooks/`(커스텀 훅) 등을 두어 기능과 관련된 코드를 응집시킵니다.

- **`pages`**: 사용자가 웹 브라우저에서 특정 URL로 접근할 때 보게 되는 페이지 단위의 컴포넌트입니다.
  - `SignIn.tsx`, `AdminDashboard.tsx` 등 각 페이지는 여러 `widget`과 `shared` 컴포넌트를 조합하여 구성됩니다.
  - 페이지 컴포넌트 자체는 최소한의 로직만 가지며, 대부분의 상태와 로직은 `features`의 훅을 통해 주입받습니다.

- **`shared`**: 프로젝트 전반에 걸쳐 재사용되는 가장 작은 단위의 공통 컴포넌트, 훅, 유틸리티를 포함합니다.
  - `ui/`: `Button`, `Input`, `Card` 등 shadcn/ui 기반의 순수한 UI 컴포넌트가 위치합니다.
  - `hooks/`: `useDebounce`와 같이 특정 도메인에 종속되지 않는 공용 커스텀 훅을 관리합니다.
  - `utils/`: 날짜 포맷팅, Tailwind CSS 클래스 병합 등과 같은 유틸리티 함수를 포함합니다.

- **`widget`**: 여러 `shared` 컴포넌트나 `features`의 훅을 조합하여 만든, 특정 목적을 가진 복합 UI 컴포넌트입니다.
  - `SignInForm.tsx`, `CargoInformationSection.tsx`처럼 특정 섹션이나 기능을 담당하는 독립적인 UI 조각입니다.
  - 페이지 내에서 재사용될 수 있으며, 자체적으로 상태를 가지거나 `features`의 훅을 사용하여 비즈니스 로직을 처리할 수 있습니다.

> **참고**: `vite.config.ts`에 `@`가 `src` 디렉토리를 가리키는 경로 별칭으로 설정되어 있어, `import { Button } from '@/shared/ui'` 와 같은 형태로 편리하게 모듈을 가져올 수 있습니다.

## 시작하기

### 사전 요구 사항

- Node.js (v18.x 이상)
- Yarn

### 설치 및 실행

1. **저장소 복제**
   ```bash
   git clone https://your-repository-url.git
   cd ltp_client
   ```

2. **의존성 설치**
   ```bash
   yarn install
   ```

3. **환경 변수 설정**
   프로젝트 루트 디렉토리에 `.env.local` 파일을 생성하고 아래 내용을 추가하세요. 이 파일은 API 서버의 주소를 설정하는 데 사용됩니다.

   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

4. **개발 서버 실행**
   ```bash
   yarn dev
   ```
   서버가 시작되면 `http://localhost:5173` (또는 다른 포트)에서 애플리케이션을 확인할 수 있습니다.

## 사용 가능한 스크립트

- `yarn dev`: 개발 모드로 Vite 서버를 실행합니다.
- `yarn build`: 프로덕션을 위한 애플리케이션을 빌드합니다.
- `yarn lint`: ESLint를 사용하여 코드 스타일을 검사합니다.
- `yarn preview`: 프로덕션 빌드 결과물을 로컬에서 미리 봅니다.

## 향후 개선 방향

- **관리자 프로젝트 분리**: 현재 프로젝트에는 일반 사용자와 관리자의 기능이 함께 포함되어 있습니다. 관리자 관련 기능(`admin` features, pages 등)을 별도의 프로젝트로 분리하는 것을 추천드립니다. 
