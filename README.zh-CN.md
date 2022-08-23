# ➊ woTools 扩展

woTools 是一个 web 工具平台，它对您的 web 工具进行分类和集中管理。

在 VSCode 扩展中搜索`woTools`安装它。

# ➋ 描述

它可以简单的分类管理您的多个 Web 工具。

您可以将常用的 Web 工具放入 woTools 插件中，woTools 插件将以树状形式分类显示您的 Web 工具列表。

# ➌ Web 工具指的是什么?

一个 web 工具，也是一个网页，指的是一个可以在本地使用的离线 html 文件。

比如一个用于格式化 JSON 的 html 页面。

![image](screenshots/main.png)

# ➍ 快速开始

> 将你的一些本地网页工具放到 woTools VSCode 插件中，集中管理和使用。

1. 创建一个 web 工具目录，比如`html-format`，目录中创建一个`index.html`和`plugin.json`文件。

2. `index.html`里可随便输入一些测试内容。html 文件中引用的外部文件，比如.png/.css/.js 只能使用相对路径。

3. `plugin.json`的内容请继续往下看，有具体说明。

4. 找到 VSCode 插件 `vscode-wotools` 的安装目录，里面有一个`plugins`目录，将刚才创建的文件夹`html-format`复制到`plugins`目录下即可。

5. 点击 woTools 插件右上角的刷新按钮，将会重新加载 web 工具列表，新加的`html-format`将会显示在列表中。

## ✿ 插件目录下的 plugin.json 文件说明

```javascript
{
    "main": "index.html", // 入口文件 (必填)
    "logo": "logo.png", // 插件图标
    "id": "keyboard-shortcut", // 插件唯一ID (必填)
    "displayName": "插件名称", // 插件名称 (必填)
    "description": "插件描述", // 插件描述
    "version": "0.0.1", // 版本
    "author": "unknown", // 作者
    "homepage": "http://unknown", // 作者或插件的主页
    "categoryId": "normal-tool", // 插件类型ID, 继续往下看, 可以找到类型ID的更多说明
    "disable": false // 是否禁用, 禁用后不会显示在插件列表中
    // 使用children后, 上面main入口文件将失效
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

# ➎ 开发

## ♬ 全局变量或函数

所有全局变量或函数都放在`wotools`变量下，可使用`console.log(wotools)`打印查看。

1. `wotools.language`

    获取 VSCode 的当前语言，在 javascript 中使用，它返回'en' 或 'zh-cn'。

2. `wotools.gotoPage('相对路径加文件名')`

    在 VSCode 的插件中，html 文件是禁止使用`<a href="index2.html">goto</a>`来跳转的，如果有多个页面要相互跳转，使用例子如下：

```javascript
// html
<a onClick="goto()">跳转到index2.html</a>;

// javascript
function goto() {
    wotools.gotoPage('index2.html');
}
```

## ☂ 类型列表管理

可以自行修改分类数据。

在 woTools VSCode 插件的安装目录下，修改`plugins/category.json`文件即可。

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

## ☀ woTools 的示例插件

在 VSCode 的扩展安装目录下，找到 woTools 扩展，里面有个`plugins`文件夹，里面有一些 woTools 的示例插件，可参考。

# ➏ VSCode 的扩展安装在哪里?

VSCode 扩展安装在每个用户的扩展文件夹中。根据不同系统，位置在以下文件夹::

> Windows `%USERPROFILE%\.vscode\extensions`

> macOS `~/.vscode/extensions`

> Linux `~/.vscode/extensions`

# ➐ 贡献

如果可以，我们非常希望您将您使用的 web 网页小工具分享到 woTools 中，供大家使用。

克隆下面的 Github 项目，将 web 网页小工具添加到项目中后，向 Github 提交 Pull Request 即可。

> https://github.com/ahbool/wotools-plugin-list

# ➑ License

[MIT](LICENSE)
