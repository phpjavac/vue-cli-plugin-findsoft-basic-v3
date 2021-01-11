module.exports = [
    
    {
        name: `productName`,
        type: 'input',
        validate: input => !!input,
        message: '请输入项目名称（英文名）',
        default: ''
    },
    {
        name: `serverPath`,
        type: 'input',
        message: '请输入服务器地址（不用包含项目名）',
        validate: input => !!input,
        default: ''
    }

]