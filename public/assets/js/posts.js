// 获取到所有的分类 
var c = $('#category').val();
var s = $('#s').val();

// 发送ajax将服务器给我们数据渲染到模板上面 
function render(c = "all", s = "all", page = 1) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page || 1, // 分页的页码
            category: c, // 分类名称
            state: s // 状态 
        },
        success: function (res) {
            // 把当前页码赋值给window对象下面的下面属性叫currentPage
            window.currentPage = res.page;
            var html = template('pTpl', res);
            $('tbody').html(html);

            var page = template('pageTpl', res);
            $('.pagination').html(page);
        }
    });
}
// 要显示所有的分类以及所有的状态 
render();

function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + '-' + date.getDate()
}

// 分页
function pageChange(page) {
    // 
    render(c, s, page);
}
// 取出所有的分类
// 向服务器端发送请求 获取文章分类数据
$.ajax({
    url: '/categories',
    type: 'get',
    success: function (response) {
        var html = template('categoryTpl', { data: response });
        $('#category').append(html);
    }
})

// 筛选 
$('#cSearch').on('click', function () {
    // 获取到分类id与状态 
    c = $('#category').val();
    s = $('#s').val();
    render(c, s);
});




// 删除功能
$('tbody').on('click', '.del', function () {
    var id = $(this).parent().attr('data-id');
    // console.log(currentPage);
    $.ajax({
        type: 'delete',
        url: '/posts/' + id,
        success: function () {
            // render(c, s, currentPage);
            // 如果tbody标签下面有标签有内容 这个时候我们就让它删完留在当前页码
            // 如果不大于 1  就回到上一页
            if (window.confirm('真的要删除吗?')) {
                if ($('tbody').children().length == 1) {

                    // 如果当前页码是第一页 就不再回到上一页
                    if (currentPage == 1) {
                        render(c, s, currentPage);
                    } else {
                        render(c, s, currentPage - 1);
                    }

                } else {
                    render(c, s, currentPage);
                }
            }
        }
    })
});


