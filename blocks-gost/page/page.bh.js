module.exports = function (bh) {

    bh.match('page', function (ctx, json) {
        return [
            {elem: 'doctype', doctype: json.doctype || '<!DOCTYPE HTML>'},
            {
                elem: 'html',
                attrs: {
                    lang: json.lang ? json.lang : 'en'
                },
                content: [
                    {
                        elem: 'head',
                        content: [
                            [
                                {
                                    tag: 'meta',
                                    attrs: {charset: 'utf-8'}
                                },
                                json['x-ua-compatible'] === false
                                    ? false
                                    : {elem: 'xUACompatible', 'x-ua-compatible': json['x-ua-compatible']},
                                {
                                    tag: 'title',
                                    content: json.title
                                },
                                json.favicon ? {
                                    elem: 'favicon',
                                    url: json.favicon
                                } : '',
                                json.meta
                            ],
                            json.head
                        ]
                    },
                    json
                ]
            }
        ];
    });

    bh.match('page', function (ctx) {
        ctx.mix([{elem: 'body'}]);
        ctx.tag('body');
    });

    bh.match('page__xUACompatible', function (ctx, json) {
        return {
            tag: 'meta',
            attrs: {
                'http-equiv': 'X-UA-Compatible',
                content: json['x-ua-compatible'] || 'IE=EmulateIE7, IE=edge, chrome=1'
            }
        };
    });

    bh.match('page__html', function (ctx) {
        ctx.tag('html');
        ctx.bem(false);
        ctx.cls('i-ua_js_no i-ua_css_standard');
    });

    bh.match('page__head', function (ctx) {
        ctx.tag('head');
        ctx.bem(false);
    });

    bh.match('page__meta', function (ctx) {
        ctx.tag('meta');
        ctx.bem(false);
    });

    bh.match('page__doctype', function (ctx, json) {
        return json.doctype;
    });

    bh.match('page__favicon', function (ctx, json) {
        ctx.bem(false);
        ctx.tag('link');
        ctx.attr('rel', 'shortcut icon');
        ctx.attr('href', json.url);
    });

};
