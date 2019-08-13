// 从浏览器的地址中获取id
function getUrlParams(name) {
    var par = location.search.substr(1).split('&');
    // 循环数据
    for (var i = 0; i < par.length; i++) {
        var tem = par[i].split('=');
        if (tem[0] == name) {
            return tem[1];
        } else {
            return -1;
        }
    }
};

$.ajax({
    type: 'get',
    url: '/posts/random',
    success: function (res) {
        // console.log(res);
        var randertep = `
        {{each data}}
            <li>
                <a href="/detail.html?id={{$value._id}}">
                 <p class="title">{{$value.title}}</p>
                <p class="reading">阅读({{$value.meta.views}})</p>
                 <div class="pic">
                  <img src="{{$value.thumbnail}}" alt="">
                 </div>
                </a>
            </li>

        {{/each}}
        `;
        var html = template.render(randertep, { data: res });
        $('.random').html(html);
    }

});

// 左侧导航和顶部响应式导航
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        // console.log(res);
        var navtmp = `
        {{each data}}
            <li>
                <a href="list.html?id={{@$value._id}}">
                    <i class="fa {{$value.className}}"></i>{{$value.title}}
                
                </a>
            
            </li>
        {{/each}}
        `;

        var html = template.render(navtmp, { data: res });
        $('.publicNav').html(html);
    }
});

// 搜索

$('.search form').on('submit', function () {
    var keys = $(this).find('.keys').val();

    location.href = '/search.html?key=' + keys;

    return false;
})
