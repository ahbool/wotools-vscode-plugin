[中文说明](README.zh-CN.md)

# ➊ woTools VSCode extension

woTools is a web tools management platform, it categorizes and centrally manages your web tools.

Search for `woTools` in the VSCode extension and install it.

# ➋ Description

It can easily manage your multiple web tools.

You can put your commonly used Web tools into the woTools, and the woTools will display your list of Web tools in a tree form.

# ➌ What does the Web tool mentioned here refer to?

A Web tool, it's also a web page, it's an offline HTML file that can be used locally.

For example an html page for formatting JSON.

![image](screenshots/main.png)

# ➍ Quick start

> Put your local web tools into woTools for centralized management.

1. Create a Web tool folder, e.g. `html-format`, Create a `index.html` and `plugin.json` file in the folder.

2. Feel free to type in some test content in the `index.html`. (External files referenced in the HTML file, such as \*.png/.css/.js, can only use relative paths.)

3. The content of `plugin.json` is specified below.

4. Find the installation folder of the VSCode extension, then go to the `vscode-wotools/plugins` folder, copy the `html-format` folder you just created into the `plugins` folder.

5. Clicking the refresh button in the top right corner of the woTools will reload the list of Web tools and the newly added `html-format` will be displayed in the list.

## ✿ About plugin.json file

```javascript
{
    "main": "index.html", // entry file name (required)
    "logo": "logo.png", // icon
    "id": "html-format", // plugin unique ID (required)
    "displayName": "HTML Format", // plugin name (required)
    "description": "description...", // plugin description
    "version": "0.0.1", // plugin version
    "author": "unknown", // plugin author
    "homepage": "http://unknown", // home page
    "categoryId": "normal-tool", // category id
    "disable": false // after disabled, the plugin list is not displayed
    // after using children, the above main entry file will become invalid
    "children": [
        {
            "main": "index.html", // child entry file
            "displayName": "HTML4 Format"
        },
        {
            "main": "index2.html", // child entry file
            "displayName": "HTML5 Format"
        }
    ]
}
```

# ➎ Development

## ♬ Global variable or function

All global variables or functions are placed under the `wotools` variable and can be printed and viewed using`console.log(wotools)`.

1. `wotools.language`

    Gets the current language of VSCode, used in javascript, which returns `en` or `zh-cn`.

2. `wotools.gotoPage('relative path and file name')`

    Page redirection.

    In VSCode extension, redirecting with `<a href="index2.html">goto</a>` is forbidden in HTML files.
    If multiple pages need to be redirected to each other, the following is an example:

```javascript
// html
<a onClick="goto()">redirect to index2.html</a>;

// javascript
function goto() {
    wotools.gotoPage('index2.html');
}
```

## ☂ Category management

You can modify the Category data by yourself.

In the woTools VSCode extension installation folder, modify the `plugins/category.json` file.

The initial content.

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

## ☀ Sample plugin for woTools

In the extensions installation folder of VSCode, find `woTools` extension. There is a `plugins` folder that contains some sample plugins for reference.

# ➏ Where are VSCode extensions installed?

Extensions are installed in a per user extensions folder. Depending on your platform, the location is in the following folder:

> Windows `%USERPROFILE%\.vscode\extensions`

> macOS `~/.vscode/extensions`

> Linux `~/.vscode/extensions`

# ➐ Contribute

If you can, we really hope that you will share the web page widgets you use to woTools for everyone to use.

The web page widgets are placed in the `wotools-plugin-list` Github project, then submit a Pull Request.

Below is the `wotools-plugin-list` project address.

> https://github.com/ahbool/wotools-plugin-list

Thanks.

# ➑ License

[MIT](LICENSE)

**☺ Enjoy!**
