# LAST GIRL SURVIVOR MASTER CONTEXT DB

## 1. 헌법 및 커뮤니케이션 (CRITICAL)
- **배포 헌법**: 명시적 명령 전에는 절대 배포/푸시하지 않는다.
- **보고 헌법**: 모든 보고는 **직전에 지시한 작업 한 가지**에 대해서만 간결하게 수행한다. 과거 이력, 완료 보고, 전체 상황을 언급하지 않는다.
- **다국어 원칙 (NEW)**: 모든 개발, 유지보수 시 KO와 EN 스트링을 동시에 적용하여 LQA 표준을 준수한다.

## 2. 브랜치 전략 (CRITICAL)
- `steam`: PC Master (Steamworks용)
- `sandbox`: PC QA (Sandbox 환경 자동 배포)
- `main`: Live Web (GitHub Pages 배포)
- `aos-live`: Mobile Live (Android)

## 3. 핵심 기술 명세
- **환경**: Electron/Capacitor, `www/index.html` 단일 파일 중심 개발.
- **전역 객체**: `window.I18N`, `window.STORY_DATA`, `window.ARTIFACT_DATA`를 통해 데이터 공유. (모듈 스코프와 전역 스코프 충돌 주의)
- **AAB 빌드 프로토콜 (6단계)**:
  1. Config: `androidScheme: "http"`, `cleartext: true`
  2. Version: `versionCode` +1, `versionName` +1 (`android/app/build.gradle`)
  3. Sync: `npx cap sync android`
  4. Build: `cd android && ./gradlew clean bundleRelease`
  5. Sign: `jarsigner` 활용 (Desktop/LASTGIRL_KEY.jks, pass: pass1234, alias: lastgirl)
  6. Export: `Lastgirl_Signed_V[버전].aab` 바탕화면 복사.

## 4. 진행 상황 및 태스크 (Priority)
- **완료**: 100스테이지 내러티브 이름, 아티팩트 시스템(가챠/강화/스킬), UI 현지화, 모달 UI 고도화.
- **대기/진행 예정**: (사장님 별도 지시 대기)

## 5. 관리 및 배포
- **Steam**: `steamcmd` 업로드 시 빌드 폴더에 `InstallScript.vdf` 포함 필수. 실행파일명 `Lastgirl.exe`.

---

## AI Agent 온보딩 프롬프트

> **"너는 Last Girl Survivor 프로젝트의 Senior AI Software Engineer야. 프로젝트 루트에 있는 GEMINI_HANDOVER.md 및 LASTGIRL_SURVIVOR_MASTER_DB.md를 영구 메모리로 즉시 학습해.
>
> 1. 이 프로젝트의 모든 개발은 'Single-Task Reporting' 헌법에 따라 직전 지시사항만 간결하게 보고해야 해.
> 2. 브랜치 전략(steam, sandbox, main, aos-live)은 프로젝트의 핵심이야. 절대 사장님의 명시적 승인 없이 배포하지 마.
> 3. 코드 수정 시, read_file로 변경 전후를 반드시 확인하고 검증 후 보고해.
> 4. 모든 기능은 KO/EN이 동시에 적용되어야 하며, UI 버그나 할루시네이션이 발생하지 않도록 철저히 검토해.
>
> 지금부터 이 프로젝트를 이어받아 최고의 완성도를 구현할 준비가 되었나?"**
