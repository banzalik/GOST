module.exports = function (config) {
    config.nodes(['pages/*'], function (nodeConfig) {

        if (nodeConfig._path === 'pages/common') {
            nodeConfig.addTechs([
                new (require('enb/techs/file-provider'))({target: '?.bemjson.js'}),
                new (require('enb/techs/deps-provider'))({
                    sourceNodePath: 'pages/documentation',
                    sourceTarget: 'documentation.deps.js'
                }),
                new (require('enb/techs/levels'))({levels: getLevels(config)}),
                new (require('enb/techs/files'))(),
                new (require('enb-stylus/techs/css-stylus-with-autoprefixer'))({comments: false})
            ]);
            nodeConfig.addTargets([
                '?.css'
            ]);

        } else {
            nodeConfig.addTechs([
                new (require('enb-borschik/techs/borschik'))({
                    sourceTarget: '?.raw.js',
                    destTarget: '?.bemjson.js',
                    minify: false
                }),
                new (require('enb/techs/file-provider'))({target: '?.raw.js'}),
                new (require('enb/techs/bemdecl-from-bemjson'))(),
                new (require('enb/techs/levels'))({levels: getDevelopLevels(config)}),
                new (require('enb/techs/deps-old'))(),
                new (require('enb/techs/files'))(),
                new (require('enb-bh/techs/bh-server'))(),
                new (require('enb-bh/techs/html-from-bemjson'))(),
                new (require('enb/techs/js'))(),
                new (require('enb-stylus/techs/css-stylus-with-autoprefixer'))({comments: false})
            ]);
            nodeConfig.addTargets([
                '?.html', '?.js', '?.css'
            ]);
        }
    });

    config.nodes(['test/tests-pages/*/*'], function (nodeConfig) {
        nodeConfig.addTechs([
            new (require('enb-borschik/techs/borschik'))({
                sourceTarget: '?.raw.js',
                destTarget: '?.bemjson.js',
                minify: false
            }),
            new (require('enb/techs/file-provider'))({target: '?.raw.js'}),
            new (require('enb/techs/bemdecl-from-bemjson'))(),
            new (require('enb/techs/levels'))({levels: getLevels(config)}),
            new (require('enb/techs/deps-old'))(),
            new (require('enb/techs/files'))(),
            new (require('enb-bh/techs/bh-server'))(),
            new (require('enb/techs/html-from-bemjson'))(),
            new (require('enb-stylus/techs/css-stylus-with-autoprefixer'))()
        ]);
        nodeConfig.addTargets([
            '?.html', '?.css'
        ]);
    });

    config.mode('development', function () {
        config.nodeMask(/pages\-desktop\/.*/, function (nodeConfig) {
            if (nodeConfig._path === 'pages/common') {
                var a = 1; // fake
            } else {
                nodeConfig.addTechs([
                    new (require('enb/techs/file-copy'))({sourceTarget: '?.js', destTarget: '_?.js'}),
                    new (require('enb/techs/file-copy'))({sourceTarget: '?.css', destTarget: '_?.css'})
                ]);
            }
        });
    });

    config.mode('production', function () {
        config.nodeMask(/pages\/.*/, function (nodeConfig) {
            nodeConfig.addTechs([
                new (require('enb-borschik/techs/borschik'))({sourceTarget: '?.js', destTarget: '_?.js'}),
                new (require('enb-borschik/techs/borschik'))({sourceTarget: '?.css', destTarget: '_?.css'})
            ]);
        });
    });
};

function getLevels(config) {
    return [
        'blocks-gost'
    ].map(function (level) {
            return config.resolvePath(level);
        });
}

function getDevelopLevels(config) {
    return [
        'blocks-gost'
        //,'blocks-docs'
    ].map(function (level) {
            return config.resolvePath(level);
        });
}
