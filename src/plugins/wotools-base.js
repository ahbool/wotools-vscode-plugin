const vscode = acquireVsCodeApi();
if (typeof wotools === 'undefined') {
    wotools = {};
}
wotools = {
    ...wotools,
    gotoPage: function (pagePath, isAbsolutePath) {
        if (!isAbsolutePath) {
            pagePath = wotools.currPluginDirPath + pagePath;
        }
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
                    this.gotoPage(filePath, true);
                },
                false
            );
        });
    },

    init: function () {
        this.resetDomForLink();
    },
};
