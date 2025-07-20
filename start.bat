@echo off
echo Menjalankan Frontend dan Backend sekaligus...

REM Jalankan frontend di jendela baru
start "Frontend" cmd /k "cd /d %~dp0nesti-frontend && windsurf . && start-npm-dev.bat"

REM Jalankan backend di jendela baru
start "Backend" cmd /k "cd /d %~dp0nesti-backend &&  code . && start-laravel.bat"

echo Semua sudah dijalankan. Jendela ini akan tertutup dalam 5 detik...
timeout /t 5 /nobreak >nul
exit
