### 全局变量和函数

```javascript
wotools.language; //VS Code的当前语言, 值 'en' or 'zh-CN'
wotools.gotoPage('path'); // 页面跳转, path为相对路径
```

### 插件目录下的 plugin.json 文件

```javascript
{
    "main": "index.html", // 入口文件
    "logo": "logo.png", // 插件图标
    "id": "keyboard-shortcut", // 插件唯一ID
    "displayName": "插件名称", // 插件名称
    "description": "插件描述", // 插件描述
    "version": "0.0.1", // 版本
    "author": "unknown", // 作者
    "homepage": "http://unknown", // 作者或插件的主页
    "categoryId": "normal-tool", // 插件类型ID
    "disable": false // 是否禁用, 禁用后不会显示在插件列表中
    // 使用children后, 上面main入口文件将不会使用
    "children": [
        {
            "main": "index.html", // 子入口文件
            "displayName": "子插件名称1"
        },
        {
            "main": "index2.html", // 子入口文件
            "displayName": "子插件名称2"
        }
    ]
}
```

### 插件类型列表

```javascript
[
    {
        id: 'text',
        displayName: {
            en: 'Text',
            'zh-cn': '文本',
        },
        order: 1,
    },
    {
        id: 'data-format',
        displayName: {
            en: 'Data Formatting',
            'zh-cn': '数据格式化',
        },
        order: 2,
    },
    {
        id: 'encrypt-decrypt',
        displayName: {
            en: 'Encrypt / Decrypt',
            'zh-cn': '加密 / 解密',
        },
        order: 3,
    },
    {
        id: 'other',
        displayName: {
            en: 'Othen',
            'zh-cn': '其它',
        },
        order: 4,
    },
];
```
