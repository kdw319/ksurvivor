@echo off
chcp 65001 > nul
setlocal

:: =====================================================
:: Lastgirl Survivor - Steam 빌드 업로드 스크립트
:: =====================================================
:: [설정] SteamCMD 경로를 본인 환경에 맞게 수정하세요.
set STEAMCMD=C:\steamcmd\steamcmd.exe

:: [설정] 이 스크립트가 있는 폴더를 기준으로 VDF 절대경로 계산
set SCRIPT_DIR=%~dp0
set VDF_MAIN=%SCRIPT_DIR%app_build_4353510.vdf
set VDF_SOUNDTRACK=%SCRIPT_DIR%app_build_4757910.vdf

:: =====================================================
:: SteamCMD 존재 여부 확인
:: =====================================================
if not exist "%STEAMCMD%" (
    echo [오류] SteamCMD를 찾을 수 없습니다: %STEAMCMD%
    echo.
    echo 아래 링크에서 steamcmd.zip 을 받아 C:\steamcmd\ 에 압축 해제 후 다시 실행하세요.
    echo https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip
    echo.
    pause
    exit /b 1
)

:: =====================================================
:: Steam 계정 정보 (환경변수 우선, 없으면 직접 입력)
:: =====================================================
if "%STEAM_USERNAME%"=="" (
    set /p STEAM_USERNAME="Steam 아이디를 입력하세요: "
)

echo.
echo [선택] 업로드할 빌드를 선택하세요:
echo   1. 메인 게임  (AppID: 4353510 - Lastgirl Survivor)
echo   2. 사운드트랙 (AppID: 4757910 - Lastgirl Survivor Soundtrack)
echo   3. 둘 다 업로드
echo.
set /p BUILD_CHOICE="번호를 입력하세요 (1/2/3): "

:: =====================================================
:: 선택에 따라 빌드 실행
:: =====================================================
if "%BUILD_CHOICE%"=="1" goto BUILD_MAIN
if "%BUILD_CHOICE%"=="2" goto BUILD_SOUNDTRACK
if "%BUILD_CHOICE%"=="3" goto BUILD_ALL

echo [오류] 잘못된 선택입니다. 1, 2, 3 중 하나를 입력하세요.
pause
exit /b 1

:BUILD_MAIN
echo.
echo [진행] 메인 게임 빌드 업로드 시작...
"%STEAMCMD%" +login %STEAM_USERNAME% +run_app_build "%VDF_MAIN%" +quit
goto DONE

:BUILD_SOUNDTRACK
echo.
echo [진행] 사운드트랙 빌드 업로드 시작...
"%STEAMCMD%" +login %STEAM_USERNAME% +run_app_build "%VDF_SOUNDTRACK%" +quit
goto DONE

:BUILD_ALL
echo.
echo [진행] 메인 게임 빌드 업로드 시작...
"%STEAMCMD%" +login %STEAM_USERNAME% +run_app_build "%VDF_MAIN%" +quit
echo.
echo [진행] 사운드트랙 빌드 업로드 시작...
"%STEAMCMD%" +login %STEAM_USERNAME% +run_app_build "%VDF_SOUNDTRACK%" +quit
goto DONE

:DONE
echo.
echo [완료] 업로드가 끝났습니다.
echo 결과 로그는 steam_build_output\ 폴더에서 확인하세요.
pause
endlocal
