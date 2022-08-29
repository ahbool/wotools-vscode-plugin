[中文说明](README.zh-CN.md)

# ➊ woTools VSCode extension

woTools is a web tool management platform that comes with some common web widgets, such as JSON formatting, regular expression validation, and more.

Search for `woTools` in the VSCode extension to install it.

# ➋ Other features

The woTools extension can also centrally manage some of your local web gadgets. For example, if you have written some web gadgets, you can put them all into the woTools extension, and you can open and use them directly in the woTools extension of VSCode.

# ➌ What does the Web tool mentioned here refer to?

The web tool mentioned here is a web page, an html file that can be used locally and offline, such as an html page for formatting JSON, or an html file for code compression and decompression.

A web widget can be a separate html file, js code or css styles are all in the html file.

A web gadget can also be composed of .html, .js, .css, and .png files. External link files in html can only use relative paths, that is, paths relative to html files.

In web tools, NodeJS is not supported.

![image](screenshots/main.png)

# ➍ Quick start

> Put the locally developed web widgets into the woTools VSCode plugin for centralized management and use.

1. Install the woTools VSCode plugin first, and search for `woTools` in the VSCode extension management to install it.

2. Create a folder anywhere to store web widgets, such as `my-web-tools`.

3. Create a new web tools folder in `my-web-tools`, such as `json-format`, and then create two files in `json-format`, `index.html` and `plugin.json`.

4. You can enter some test content in `index.html`. (External files referenced in html files, such as .png/.css/.js can only use relative paths)

5. The content of `plugin.json` is specified below.

6. Open the setting interface of the `woTools` plugin, and set the directory where the local web gadget is located, such as `/home/my-web-tools`.

7. Finally, click the refresh button in the upper right corner of the `woTools` plugin, the list of web tools will be reloaded, and the newly added `json-format` will be displayed in the list.

## ☂ About plugin.json file

```javascript
{
    "main": "index.html", // entry file name (required)
    "displayName": "HTML Format", // plugin name (required)
    "logo": "logo.png", // icon
    "id": "html-format", // plugin unique ID
    "description": "description...", // plugin description
    "version": "0.0.1", // plugin version
    "author": "unknown", // plugin author
    "homepage": "http://unknown", // home page
    "categoryId": "normal-tool", // category id
    "disable": false // after disabled, the plugin list is not displayed
    // after using children, the above main entry file will become invalid
    "children": [
        {
            "main": "index1.html", // child entry file
            "displayName": "HTML4 Format"
        },
        {
            "main": "index2.html", // child entry file
            "displayName": "HTML5 Format"
        }
    ]
}
```

# ➎ Development for web page gadget

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

## ☀ Sample plugin for woTools

In the extensions installation folder of VSCode, find `woTools` extension. There is a `plugins` folder that contains some sample plugins for reference.

# ➏ Where are VSCode extensions installed?

Extensions are installed in a per user extensions folder. Depending on your platform, the location is in the following folder:

> Windows `%USERPROFILE%\.vscode\extensions`

> macOS `~/.vscode/extensions`

> Linux `~/.vscode/extensions`

# ➐ Contribute

If you can, we really hope that you will share the web page gadget you use to woTools for everyone to use.

The web page gadget are placed in the `wotools-plugin-list` Github project, then submit a Pull Request.

Below is the `wotools-plugin-list` project address.

> https://github.com/ahbool/wotools-plugin-list

Thanks~

# ➑ License

[MIT](LICENSE)

**☺ Enjoy!**
