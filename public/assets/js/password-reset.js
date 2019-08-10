$('#mpwd').on('click',function(){
    // 获取用户在表单中输入的内容
    var formData = $("#modifyForm").serialize();
    console.log(formData);
    // 调用接口 实现密码修改功能
    $.ajax({
        url:'/users/password',
        type:'put',
        data:formData,
        success:function(res){
            console.log(res);
            location.href = '/admin/login.html'
        }
    })
   
})
