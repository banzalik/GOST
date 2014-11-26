module.exports = function (bh) {

    bh.match('page__js', function (ctx, json) {
        ctx.bem(false);
        ctx.tag('script');
        ctx.attr('src', json.url);
    });

};
