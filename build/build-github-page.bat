takeown  /f dist /r

rmdir /s /q dist

xcopy /e /c /y /h /r example\dist dist\
