// 发送ajax将服务器给我们数据渲染到模板上面 
$.ajax({
    type: 'get',
    url: '/posts',
    success: function (res) {
        var html = template('pTpl', res);
        $('tbody').html(html);
    }
});

function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    // 在前面补齐 padStart(2, 0) 两个参数分别是字符串的字符数, 第二个参数是要补齐的字符
    // 在后面补齐 padEnd()
    return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + '-' + date.getDate()
};



// var userArr = new Array();

// // 删除单个用户
// $('tbody').on('click', '.del', function () {
//     if (window.confirm('真的要删除吗?')) {
//         var id = $(this).parent().attr('data-id');
//         // 发送ajax
//         $.ajax({
//             type: 'delete',
//             url: '/posts/' + id,
//             success: function (res) {
//                 var index = userArr.findIndex(item => item._id == res._id)
//                 userArr.splice(index, 1);
//                 render(userArr);
//             }
//         })
//     }
// });
