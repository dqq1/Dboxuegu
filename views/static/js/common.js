
define(["jquery","template","form","cookie"],function($,template){

	$(function(){

			//如果不是在登录页面，才需要从cookie中获取用户数据然后展示在页面
			if(location.pathname != "/dashboard/login"){
				//如果没有登陆过，所有的页面都跳到登陆页面，根据后台返回的PHPSESSID令牌进行判断
				if(!$.cookie("PHPSESSID")){
					//跳转到登陆页面
					window.location.href = "/dashboard/login";
					};
		
				//从cookie中获取userinfo的信息
				var userinfo = $.cookie("userinfo");
				userinfo = JSON.parse(userinfo);
		
				//使用模板引擎将获取到的信息展示到侧边栏
				var html = template("profile-tpl", userinfo);
				$("#user-info").html(html);

			}
		

			//退出功能
			$("#laout").click(function(){

				//发送请求，后台进行cookie的清除
				$(this).ajaxSubmit({
					url:"api/logout",
					type:"post",
					success:function(data){
						//删除cookie以及令牌
						location.href = "/dashboard/login";
					}
				})
			})

			//实现侧边栏子菜单显示效果 ,先找到需要显示的ul，让其父元素注册点击事件
			$(".navs>ul>li>ul").parent().click(function(){
				$(".navs>ul>li>ul").slideToggle();
			})

			var activeA = $(".navs a[href='"+location.pathname+"']");
			//显示高亮功能，点击不同的选项，进入不同的页面，需要找到相应的功能选项进行高亮，
			//通过请求的 地址 文件路径进行匹配  ，加active类
			activeA.addClass("active")
			

			//当是子菜单高亮显示时，让其不隐藏，判断高亮的是不是子元素
			if(activeA.parent().parent().hasClass("second-level")){
				activeA.parent().parent().show();
			}
			
			
		})
});

