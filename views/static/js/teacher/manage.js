
//编辑和创建教师功能，因为页面格式一样，用同一个页面，创建模版，内容根据不同功能显示不同
//根据tc_id判断是新建，还是编辑
define(["jquery","units","template","form","datepicker","datepickerCN","validate"],function($,units,template){
  //判断是否存在id,有就取出来
  var id = units.getQuery("id");
  var data = {};
  console.log(id);
  if(id){
    //编辑页面   没有密码选项，发送ajax请求，获取当前教师的信息，按钮显示为保存
    data.title = "讲师编辑";
    data.url = "/api/teacher/update";
    data.text = "保 存";
    //由于是编辑功能，所以需要将当前编辑的用户的数据从后台获取回来
    $.ajax({
      url:"/api/teacher/edit",
      type:"get",
      data:{tc_id:id},
      success:function(msg){
        data.teacher = msg.result;
        render();
      }
    })
    
  }else{
    //新建页面，不需要发送ajax请求，直接输入内容，按钮显示为添加
    data.title = "讲师添加";
    data.url = "/api/teacher/add";
    data.text="添 加";
    data.teacher={};
    render();
    console.log(data);
  }

  

  
  //渲染页面内容
  function render(){
    var html = template("manage-tpl",data);
    $(".body.teacher").html(html);
    $('.date').datepicker({
      format:"yyyy-mm-dd",
      language:"zh-CN",
    });
    //页面渲染完后进行表单验证
    $("form").validate({
      onBlur:true,
      onChange:true,
      sendForm:false,
      conditional:{
        username:function(value){
          return value!=="前端学院";
        }
      },
      description:{
        username: {
          required: "用户名不能为空",
          conditional: "用户名不能为'前端学院'",
          valid: "用户名正确"
        },
        pass: {
          required: "请输入密码",
          pattern: "密码需要为6-15位数字或字母",
          valid: "密码格式正确"
        },
        date:{
          required: "请输入职日期",
        }
      },
      
  
      valid:function(){
        //全通过时触发，一般ajax需要在这时候发送
        $(this).ajaxSubmit({
          // data:data,
          success:function(msg){
      
            if(msg.code == 200){
              location.href = "/teacher/list";
            }
          }
        })
      },
      invalid:function(){
        console.log(2)
      },
      eachValidField:function(){
        console.log(this);
        this.parent().parent().addClass("has-success").removeClass("has-error");
        console.log("888888");
      },
      eachInvalidField:function(){
        console.log(this);
        this.parent().parent().addClass("has-error").removeClass("has-success");
        console.log("444444");
      }
    })
    
  }

  
  
  //点击按钮发送ajax把修改或新建的讲师进行保存
  // $(".teacher").on("submit","form",function(){
  //   console.log(1);
  //   $(this).ajaxSubmit({
  //     // data:data,
  //     success:function(msg){
  //
  //       if(msg.code == 200){
  //         location.href = "/teacher/list";
  //       }
  //     }
  //   })
  //
  //   return false;
  // })
  //
  
})
