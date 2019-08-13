$.ajax({
    type: 'get',
    url: '/posts/lasted',
    success: function (res) {
        // console.log(res);
        var html = template('newpubTpl', { data: res });
        // console.log(html);
        $('.new').append(html);
    }
})