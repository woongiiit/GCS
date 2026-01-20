# GCS

Next.js 기반 풀스택 웹 애플리케이션

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Deployment**: Railway

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.example` 파일을 참고하여 `.env` 파일을 생성하고 데이터베이스 연결 정보를 입력하세요.

```bash
cp .env.example .env
```

`.env` 파일을 열어 `DATABASE_URL`을 설정하세요:

```
DATABASE_URL="postgresql://user:password@localhost:5432/crazy_db?schema=public"
```

### 3. 데이터베이스 설정

Prisma를 사용하여 데이터베이스를 초기화합니다:

```bash
# Prisma Client 생성
npm run db:generate

# 데이터베이스에 스키마 적용 (개발용)
npm run db:push

# 또는 마이그레이션 사용 (프로덕션 권장)
npm run db:migrate
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 프로젝트 구조

```
.
├── app/              # Next.js App Router 페이지 및 레이아웃
├── components/       # 재사용 가능한 React 컴포넌트
├── lib/              # 유틸리티 함수 및 설정
├── prisma/           # Prisma 스키마 및 마이그레이션
└── public/           # 정적 파일
```

## Prisma 명령어

- `npm run db:generate` - Prisma Client 생성
- `npm run db:push` - 스키마를 데이터베이스에 직접 적용 (개발용)
- `npm run db:migrate` - 마이그레이션 생성 및 적용
- `npm run db:studio` - Prisma Studio 실행 (데이터베이스 GUI)

## Railway 배포

### 1. GitHub에 프로젝트 푸시

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Railway에서 프로젝트 연결

1. [Railway](https://railway.app)에 로그인
2. "New Project" 클릭
3. "Deploy from GitHub repo" 선택
4. GitHub 저장소 선택
5. PostgreSQL 서비스 추가
6. 환경 변수 설정:
   - `DATABASE_URL`은 Railway가 자동으로 설정합니다
   - 필요시 다른 환경 변수 추가

### 3. 배포 확인

Railway가 자동으로 빌드 및 배포를 진행합니다. 배포가 완료되면 제공된 URL에서 애플리케이션을 확인할 수 있습니다.

## 개발 팁

- Prisma 스키마 수정 후에는 `npm run db:generate`를 실행하세요
- 데이터베이스 변경사항은 `npm run db:migrate`로 마이그레이션하세요
- Prisma Studio로 데이터베이스 내용을 시각적으로 확인할 수 있습니다: `npm run db:studio`

## 라이선스

MIT

