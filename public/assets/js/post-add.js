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


    formData.append('file', this.files[0]);

    // 图片是二进制数据 ajax它本身不支持二进制数据上传
    var formData = new FormData();

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
        success:function(res){
            //把路径写到隐藏域
            $('#hidden').val(res[0].file);
            // 实现图片预览
            $('#pImg').attr('src',res[0].file).show();
        }
    })
});

