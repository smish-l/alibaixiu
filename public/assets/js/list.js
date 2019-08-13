
// 获取id
var id = getUrlParams('id');
// alert(id);
if (id != -1) {
    $.ajax({
        url: '/posts/category/' + id,
        type: 'get',
        success: function (res) {
            // console.log(res);
            var html = template('listTpl', { list: res });

            $('#listAt').append(html);
        }
    })
}