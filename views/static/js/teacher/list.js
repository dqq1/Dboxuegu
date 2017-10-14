


define(["jquery","template","bootstrap"],function($,template){

    //注册过滤器
    //语法： template.defaults.imports.自定义的过滤器名称 = function(value){
            //value接收到的就是 | 前面的要被过滤的数据
            //这个函数需要有个返回值，返回值就是最终过滤之后的内容
    // }

    //使用过滤器
    //语法 {{数据 | 过滤器名称}}

    //最终在页面上使用这个过滤器的时候
    //{{v.tc_birthday | getage}}
    template.defaults.imports.getage = function(value){
        return new Date().getFullYear() - new Date(value).getFullYear();
    };



//教师列表显示，发送ajax请求
    $.ajax({
        url:"/api/teacher",
        success:function(data){
            console.log(data)

            var html = template("teacher-list-tpl",data);
            $("#teacher-list").html(html);
        }
    })

//教师信息查看功能  模态框bootstrap
$("#teacher-list").on("click",".btn-check-info",function(){


    var id = $(this).parent().data("id");
    
    //构建模版,发送ajax请求
    $.ajax({
        url:"/api/teacher/view",
        type:"get",
        data:{tc_id:id},
        success:function(data){
            console.log(data);

            var html = template("teacher-info-tpl",data.result);
            $("#teacher-info").html(html)
            $("#teacherModal").modal("show");

        }
    })

})



//教师启用注销功能
$("#teacher-list").on("click",".btn-enable",function(){

    var id = $(this).parent().data("id");
    var status = $(this).data("status");

    // 发送请求
    $.ajax({
        url:"/api/teacher/handle",
        type:"post",
        data:{
            tc_id:id,
            tc_status:status
        },
        success:function(data){
            
            var status = data.result.tc_status;
            console.log(status);
            //默认只能刷新才能更改，需要手动更改
            //更改内容     更新status
            if(status==1){
                $(this).text("启用");
                $(this).removeClass("btn-warning").addClass("btn-success");
                $(this).data("status",1);
            }else if(status==0){
                $(this).text("注消");
                $(this).removeClass("btn-success").addClass("btn-warning");
                $(this).data("status",0);
            }
        }.bind(this)
    })
})
    

    
 //编辑和创建教师功能，因为页面格式一样，用同一个页面，创建模版，内容根据不同功能显示不同
 //根据tc_id判断是新建，还是编辑
    
    
    
  
    
    
    
    
    
    
})