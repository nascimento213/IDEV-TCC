@echo off
echo Iniciando aplicacao Spring Boot...
cd /d "c:\IDEV-TCC\backend\java"

set CLASSPATH=target\classes
for /r "%USERPROFILE%\.m2\repository" %%i in (*.jar) do set CLASSPATH=!CLASSPATH!;%%i

java -cp "%CLASSPATH%" com.itb.inf2dm.idevplatform.IDevPlatformApplication
pause