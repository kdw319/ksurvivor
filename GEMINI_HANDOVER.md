# Lastgirl Survivor: Project Handover & Core Directives (2026-05-21)

## 1. 프로젝트 현재 상태 (Current State)
- **버전**: Steam/Mobile/Web 통합 최종 빌드 (Build 23339866)
- **주요 업데이트**: 
  - 21개 에피소드 스토리 시스템 구현 완료
  - 캐릭터 강화(Meta-Progression) 상한 Lv.100 확장 (계수: 0.0125 / 0.005)
  - 심판 시스템 밸런스 조정 (노란색 구슬: 공격 속도 보너스)
  - 글로벌 I18N(현지화) 아키텍처 수립 (`window.I18N`, `window.STORY_DATA` 전역 노출)

## 2. 핵심 브랜치 전략 (CRITICAL)
- **steam**: PC Master (Steamworks 통합용)
- **sandbox**: PC QA (Sandbox 환경 배포용)
- **main**: Live Web (GitHub Pages 배포용)
- **aos-live**: Mobile AOS Live (Android 배포용)
- **규칙**: 모든 브랜치는 `steam` 브랜치의 최신 `www/index.html`을 기준으로 동기화되어야 함.

## 3. 코드 아키텍처 지침 (Directives)
- **I18N 아키텍처**: 스크립트 블록 간의 스코프 문제를 방지하기 위해 `I18N` 객체와 `STORY_DATA`는 반드시 `window` 객체에 바인딩하여 공유한다.
- **수술적 수정 (Surgical Edit)**: `index.html`이 매우 크므로(3600라인 이상), 전체를 다시 쓰지 말고 `replace` 도구를 사용하여 필요한 부분만 정확히 수정한다.
- **애니메이션 원칙**: 
  - Idle: `character_idle.webp` (정면)
  - 4방향 이동: Down(정면), Up(후면), Right(우측), Left(우측 반전 `scaleX=-1`)
- **UI/SFX**: 오디오 로직은 `initAudio()`를 통해 초기화하며, UI 텍스트 업데이트는 `toggleLanguage()` 함수 내에 모든 UI 요소가 포함되도록 유지한다.

## 4. 빌드 및 배포 절차
- **Steam**: `steamcmd`를 통한 AppID 4353510 빌드. 실행 파일은 반드시 `Lastgirl.exe`로 이름을 변경한 뒤 업로드한다.
- **Android**: `capacitor sync` 후 Gradle로 AAB 생성. 서명 키는 바탕화면의 `LASTGIRL_KEY.jks`를 사용한다.

## 5. 기술적 부채 및 주의사항
- **index.html 거대화**: 현재 3,600라인이 넘는 단일 파일 구조이므로, 수정 시 문법 오류(`SyntaxError`) 방지를 위해 반드시 `check_syntax.js`를 실행하여 검증해야 함.
- **Asset 경로**: 모든 에셋은 `www/assets/` 경로 내에 존재해야 하며, 특히 스토리 씬(`scene_N.png`)은 21번까지 누락 없이 관리되어야 함.
