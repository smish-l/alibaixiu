// 这个数组是专用于存放 分类
var cArr = new Array();
//添加分类功能 
$('#cAdd').on('click', function () {
    $.ajax({
        type: 'post',
        url: '/categories',
        data: $('#cForm').serialize(),
        success: function (res) {
            cArr.push(res);
            render(cArr);
            clearVal();
        }
    });
});

// 展示分类
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        cArr = res;
        render(cArr);
    }
})


// 用于调用template方法 
function render(arr) {
    var str = template('cTpl', {
        list: arr
    });
    // console.log(str);
    $('tbody').html(str);
}

// 编辑功能 
var cId;
$('tbody').on('click', '.edit', function () {
    cId = $(this).parent().attr('data-id');
    $('#cForm > h2').text('修改分类');
    var title = $(this).parents('tr').children().eq(1).text();
    var className = $(this).parents('tr').children().eq(2).text();
    $('#title').val(title);
    $('#className').val(className);
    $('#cAdd').hide();
    $('#cEdit').show();
});

$('#cEdit').on('click', function () {
    $.ajax({
        type: 'put',
        url: '/categories/' + cId,
        data: $('#cForm').serialize(),
        success: function (res) {
            // console.log(res);            
            var index = cArr.findIndex(item => item._id == cId);
            // 根据这个index找到数组的这个元素 将它的数据更新 
            cArr[index] = res;           
            // 调用render方法 重新渲染页面 
            render(cArr);
            // $('#title').val('');
            // $('#className').val('');
            // $('#cAdd').show();
            // $('#cEdit').hide();
            clearVal();
        }
    })
});

function clearVal() {
    $('#title').val('');
    $('#className').val('');
    $('#cAdd').show();
    $('#cEdit').hide();

};

// 删除单个用户
$('tbody').on('click', '.del', function () {
    if (window.confirm('真的要删除吗?')) {
        var id = $(this).parent().attr('data-id');
        // 发送ajax
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function (res) {
                var index = cArr.findIndex(item => item._id == res._id)
                cArr.splice(index, 1);
                render(cArr);
            }
        })
    }
});

$('thead input').on('click', function () {
    // 先获取上面复选框全选按钮的checked属性
    let flag = $(this).prop('checked');
    // 设置下面的复选框 下面的复选框的checked属性值 就是由flag变量值来控制
    $('tbody input').prop('checked', flag);
   

})
// 给下面的复选框注册点击事件
$('tbody').on('click', 'input', function () {
    if ($('tbody input').length == $('tbody input:checked').length) {
        $('thead input').prop('checked', true);
    } else {
        $('thead input').prop('checked', false);
    }
   

});

