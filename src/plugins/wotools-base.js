const vscode = acquireVsCodeApi();
const wotools = {
    gotoPage: function (pagePath) {
        vscode.postMessage({
            type: 'redirect',
            data: pagePath,
        });
    },

    resetDomForLink: function () {
        document.querySelectorAll('a').forEach((link) => {
            let filePath = link.href || '';
            let pluginReg = /https:\/\/file\+\.vscode-resource\.vscode-webview\.net/;
            if (!pluginReg.test(filePath)) {
                return;
            }

            filePath = filePath.replace(pluginReg, '');

            link.href = '#';
            link.addEventListener(
                'click',
                () => {
                    this.gotoPage(filePath);
                },
                false
            );
        });
    },

    init: function () {
        this.resetDomForLink();
    },
};