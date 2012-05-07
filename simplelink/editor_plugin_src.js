(function (tinymce) {
    // Load plugin specific language pack
    tinymce.PluginManager.requireLangPack('simplelink');

    tinymce.create('tinymce.plugins.SimpleLinkPlugin', {
        init: function(ed, url) {
            ed.addCommand('mceSimpleLink', function() {
                ed.windowManager.open({
                        file: url + '/simplelink.htm',
                        width: 320 + parseInt(ed.getLang('simplelink.delta_width', 0)),
                        height: 200 + parseInt(ed.getLang('simplelink.delta_height', 0)),
                        inline: 1
                    }, {
                        plugin_url: url
                    });
            });

            ed.addButton('simplelink', {
                title: 'simplelink.desc',
                cmd: 'mceSimpleLink',
                image: url + '/img/simplelink.png'
            });
            // Add a node change handler, selects the button in the UI when a image is selected
            ed.onNodeChange.add(function(ed, cm, n) {
                var active = false;
                if (n.nodeName == 'IMG') {
                    try {
                        var src = n.attributes["src"].value;
                        var alt = n.attributes["alt"].value;
                        var regexRes = src.match("vi/([^&#]*)/0.jpg");
                        active = regexRes[1] === alt;
                    } catch(err) {
                    }
                }
                cm.setActive('simplelink', active);
            });
        },
        getInfo: function() {
            return {
                longname: 'SimpleLink plugin',
                author: 'Paul',
                authorurl: 'http://posthope.com',
                version: "1.0"
            };
        }
    });

    // Register plugin
    tinymce.PluginManager.add('simplelink', tinymce.plugins.SimpleLinkPlugin);
})(tinymce);