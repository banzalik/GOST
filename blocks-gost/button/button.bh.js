module.exports = function (bh) {

    bh.match('button', function (ctx, json) {
        return [
            {
                elem: 'html',
                content: '123'
            }
        ];
    });

};
