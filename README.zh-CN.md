# ➊ woTools VSCode 扩展

woTools 是一个 web 工具管理平台，它自带了一些常用的 web 小工具，比如 JSON 格式化、正则表达式验证等等。

在 VSCode 扩展中搜索`woTools`安装它。

# ➋ 其它功能

woTools 插件还可以集中管理您本地的一些 web 小工具，比如您编写了一些网页小工具，可以将它们全部放到 woTools 插件中，就可以直接在 VSCode 的 woTools 插件中打开和使用它们了。

# ➌ Web 工具指的是什么?

这里所说的 web 工具，也就是一个网页，可以在本地离线使用的 html 文件，比如一个用于格式化 JSON 的 html 页面，或代码压缩和解压缩的 html 文件。

一个 web 小工具可以是一个单独的 html 文件，js 代码或 css 样式都在 html 文件中。

一个 web 小工具也可以由.html、.js、.css、.png 多个文件组成，html 中的外链文件只能使用相对路径，即相对于 html 文件的路径。

web 工具里，不支持 NodeJS。

![image](screenshots/main.png)

# ➍ 快速开始

> 将本地已经开发好的网页小工具放到 woTools VSCode 插件中，集中管理和使用。

1. 先安装 woTools VSCode 插件，在 VSCode 扩展管理中搜索`woTools`即可安装。

2. 在任意地方创建一个存放 web 网页小工具的文件夹，比如`my-web-tools`。

3. 在`my-web-tools`里面新建一个 web 工具文件夹，比如`json-format`，再在`json-format`中创建两个文件，`index.html`和`plugin.json`。

4. `index.html`里可随便输入一些测试内容。(html 文件中引用的外部文件，比如.png/.css/.js 只能使用相对路径)

5. `plugin.json`的内容请继续往下看，有具体说明。

6. 打开`woTools`插件的设置界面，设置本地 web 小工具所在目录，比如`/home/my-web-tools`。

7. 最后点击`woTools`插件右上角的刷新按钮，将会重新加载 web 工具列表，新加的`json-format`将会显示在列表中。

## ✿ 插件目录下的 plugin.json 文件说明

```javascript
{
    "main": "index.html", // 主入口文件 (必填)
    "displayName": "代码压缩", // 插件名称 (必填)
    "logo": "logo.png", // 插件图标
    "id": "keyboard-shortcut", // 插件唯一ID
    "description": "插件描述", // 插件描述
    "version": "0.0.1", // 版本
    "author": "unknown", // 作者
    "homepage": "http://unknown", // 作者或插件的主页
    "categoryId": "normal-tool", // 插件类型ID, 继续往下看, 可以找到类型ID的更多说明
    "disable": false // 是否禁用, 禁用后不会显示在插件列表中
    // 使用children后, 上面main主入口文件将失效
    "children": [
        {
            "main": "jsCompress.html", // 子入口文件
            "displayName": "压缩JavaScript"
        },
        {
            "main": "cssCompress.html", // 子入口文件
            "displayName": "压缩CSS"
        }
    ]
}
```

# ➎ web 小工具的开发

woTools 开放了一些小功能给 web 小工具使用。

## ♬ 全局变量或函数

所有全局变量或函数放在`wotools`变量下，可使用`console.log(wotools)`打印查看。

1. `wotools.language`

    获取 VSCode 的当前语言，在 javascript 中使用，它返回'en' 或 'zh-cn'。

2. `wotools.gotoPage('文件相对路径')`

    在 VSCode 的插件中，html 文件是禁止使用`<a href="subPage.html">goto</a>`来跳转的，如果有多个页面要相互跳转，使用例子如下：

```javascript
// html
<a onClick="goto()">跳转到subPage.html</a>;

// javascript
function goto() {
    wotools.gotoPage('subPage.html');
}
```

## ☀ woTools 自带的示例插件

在 VSCode 的扩展安装目录下，找到 `woTools` 扩展，里面有个`plugins`文件夹，里面有一些 woTools 的示例插件，可参考。

# ➏ VSCode 的扩展安装在哪里?

VSCode 扩展安装在每个用户的扩展文件夹中。根据不同系统，位置在以下文件夹::

> Windows `%USERPROFILE%\.vscode\extensions`

> macOS `~/.vscode/extensions`

> Linux `~/.vscode/extensions`

# ➐ 贡献

如果可以，我们非常欢迎和希望您将您使用的 web 网页小工具分享到 woTools 中，供大家使用。

克隆下面的 Github 项目，将您使用的 web 网页小工具添加到项目中后，向 Github 提交 Pull Request 即可。

> https://github.com/ahbool/wotools-plugin-list

感觉你的分享~

# ➑ License

[MIT](LICENSE)
