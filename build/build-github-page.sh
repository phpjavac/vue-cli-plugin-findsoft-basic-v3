# rm -f `ls *|egrep -v '(build|example|dist|.gitignore|README.md)'`

rm -rf `ls |egrep -v '(build|example|dist|.gitignore|README.md)'`

cp -r dist/* ./
