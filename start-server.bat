@echo off
echo Iniciando servidor Spring Boot...
cd /d "c:\IDEV-TCC\backend\java"
set JAVA_HOME=C:\Program Files\Java\jdk-17
set PATH=%JAVA_HOME%\bin;%PATH%
call mvnw.cmd clean spring-boot:run
pause