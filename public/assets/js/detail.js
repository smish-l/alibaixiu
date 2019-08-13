
var id = getUrlParams('id');

if (id != -1) {
    $.ajax({
        url: '/posts/' + id,
        type: 'get',
        success: function (res) {
            // console.log(res);
            var html = template('detailTpl',{data:res});
            // console.log(html);
            $('.article').html(html);
            
        }
    })
}