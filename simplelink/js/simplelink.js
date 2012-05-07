(function (tinyMCEPopup, exports) {
    tinyMCEPopup.requireLangPack();
    var urlInput, titleInput,
        urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim,
        listen = function (el, name, func) {
            if (el.attachEvent) //Internet Explorer
                el.attachEvent("on" + name, function () { func.call(el); });
            else if (el.addEventListener) //Firefox & company
                el.addEventListener(name, func, false); //don't need the 'call' trick because in FF everything already works in the right way          
        },
        SimpleLinkDialog = {
            init: function () {
                urlInput = document.getElementById('linkUrl'),
                titleInput = document.getElementById('linkText');
                listen(document.getElementById('insert'), 'click', SimpleLinkDialog.insert);
                listen(document.getElementById('cancel'), 'click', function () { tinyMCEPopup.close(); });
                titleInput.value = tinyMCEPopup.editor.selection.getContent({ format: 'text' });
            },

            insert: function () {
                var text = titleInput.value,
                    url = urlInput.value;
                if (url === '') {
                    tinyMCEPopup.close();
                    return;
                }
                if (!url.match(/(http[s]?)/i)) url = 'http://' + url;
                if (!url.match(urlPattern)) {
                    tinyMCEPopup.close();
                    return;
                }

                var urlMarkup = '<a href="' + url + '">' + (text || url.replace(/http(s)?:\/\//i, '')) + '</a>';
                tinyMCEPopup.editor.execCommand('mceInsertContent', false, urlMarkup);
                tinyMCEPopup.close();
            }
        };
    exports.SimpleLinkDialog = SimpleLinkDialog;
    tinyMCEPopup.onInit.add(SimpleLinkDialog.init, SimpleLinkDialog);
})(tinyMCEPopup, window);