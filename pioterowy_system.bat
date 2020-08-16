echo off
title Instalator Dodatkowych Narzedzi
color 3B
echo Instalator Dodatkowych narzedzi do bota

echo 1- {zainstaluj discord.js}
echo 2- {wyjdz z menu}
echo 3- {zainstaluj fs}
echo 4- {uruchom bota}

:menu
set /p wybieram:=wybieram
if %wybieram:%==1 goto graj
if %wybieram:%==2 goto exit
if %wybieram:%==3 goto fs
if %wybieram:%==4 goto uruchombota



:graj
cls
@echo off
color 0a
npm install discord.js
color 

:uruchombota
cls
@echo off
color 0a
npm install fs
color 

:uruchombota
cls@echo off
mode 999
title Szybkie uruchamianie bota
IF EXIST commands (
title Trwa uruchamianie bota...
) ELSE (
title Znaleziono blad, commands
echo.Sprawdz czy folder commands istnieje
set /p potwierdzenie:=
pause
exit
)

IF EXIST index.js (
title Trwa uruchamianie bota...
) ELSE (
title znaleziono błąd, index.js
echo.Nie widze pliku głównego
set /p potwierdzenie:=
pause
exit
)



echo.Trwa uruchamianie bota...
node index.js
pause



echo 1- zainstaluj discord.js
echo 2- wyjdz z gry
echo 3- zainstaluj fs
echo 4- uruchom bota

:menu
set /p wybieram:=wybieram
if %wybieram:%==1 goto graj
if %wybieram:%==2 goto exit
if %wybieram:%==3 goto fs
if %wybieram:%==4 goto uruchombota
