@echo off
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

