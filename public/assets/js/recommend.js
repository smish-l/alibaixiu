$.ajax({
    type: 'get',
    url: '/posts/recommend',
    success: function (res) {
        // console.log(res);
        var recommendTpl = `
        {{each data}}
        <li>
            <a href="detail.html?id={{$value._id}}" >
              <img src="{{$value.thumbnail}}">
              <span>{{$value.title}}</span>
            </a>
        </li>
        {{/each}}
        `;
        var html = template.render(recommendTpl,{data:res});
        // console.log(html);
        
        $('#recommendBox').html(html);
    }
})
