var key = getUrlParams('key');

$.ajax({
    type: 'get',
    url: '/posts/search/' + key,
    success: function (res) {
        // console.log(res);

        var html = template('searchTpl', { list: res });

        $('#searchPosts').html(html);
    }
})
