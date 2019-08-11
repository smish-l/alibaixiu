$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        // console.log(res);
        var html = template('pTpl', { list: res })
        //  console.log(html);
        $('#category').html(html);
    }
});

// 上传图片到本地 并把路径写到隐藏域

$('#feature').on('change', function () {

    var fileData = this.files[0];
    // 图片是二进制数据 ajax它本身不支持二进制数据上传
    var formData = new FormData();
    formData.append('file', fileData);

    // console.log(this.files[0]);
    // console.log(formData);

    // 发送ajax
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function (res) {
            //把路径写到隐藏域
            $('#hidden').val(res[0].file);
            // 实现图片预览
            $('#pImg').attr('src', res[0].file).show();
        }
    })
});


// 完成添加文章的功能 
// 提交保存按钮添加id 并且type属性就是submit 不用改
$('#pAdd').on('click', function () {
    // console.log($('#pForm').serialize());
    //return;
    $.ajax({
        type: 'post',
        url: '/posts',
        data: $('#pForm').serialize(),
        success: function (res) {
            // 需要跳转到展示文章的列表页
            location.href = "/admin/posts.html";
        },
        error: function (err) {
            console.log(err);
        }

    })
})


