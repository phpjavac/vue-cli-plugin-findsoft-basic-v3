takeown  /f generator\template\src /r

rmdir /s /q generator\template\src

xcopy /e /c /y /h /r example\src generator\template\src\
