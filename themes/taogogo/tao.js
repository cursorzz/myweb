<!--
function $(obj){
   return (typeof obj == "object")?obj:document.getElementById(obj);;
}
//ajax
var xmlHttp;

function getXmlHTTPRequest(){  
//开始初始化XMLHttpRequest对象  
  if(window.ActiveXObject){  
//IE浏览器  
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");  
  }else if(window.XMLHttpRequest){  
//Mozilla浏览器  
    xmlHttp = new XMLHttpRequest();  
  }  
 return xmlHttp;
}  
function ajaxSub(){
	 xmlHttp=getXmlHTTPRequest();
         if(0==xmlHttp.readyState || 4==xmlHttp.readyState){
			var cknum=$('checknum').value;
			var maths=cknum.split("+");
			var author=$('author').value;
			var email=$('email').value;
			var comment=$('comment').value;
			var checkret=$('checkret').value;
			var url=$('url').value;
			if(author==""||email==""||comment==""){
			alert("请确认您已经填写了姓名、邮箱和评论内容。");
			return false;
			}
			if(checkret==""){
			alert("请确认您已经填写了验证码。");
			$('checkret').focus();
			return false;
			}
			//检查邮箱
			var search_str = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;
			if(!search_str.test(email)){
			alert('请输入正确的邮件地址！');
			$('email').focus();
		    return false;
			}
			//记忆填写信息
			SetCookie("author",author);
			SetCookie("email",email);
			SetCookie("url",url);
			$('submit').disabled = true;
			$('submit').value="提交中...";
            var queryStr="useajax=1&author="+author+"&email="+email+"&url="+url+"&checknum="+(parseInt(maths[0])+parseInt(maths[1]))+"&checkret="+checkret+"&comment="+comment+"&key="+$('key').value;
             var url="/post_comment";
				// window.alert(queryStr);
			var browserflag=true;
			if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
				browserflag=false
			}
			xmlHttp.onreadystatechange = (browserflag)?(serverResponse):(serverResponse());				
            xmlHttp.onreadystatechange=serverResponse;
            xmlHttp.open("POST",url,browserflag);
            xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
             xmlHttp.send(queryStr);
			xmlHttp.onreadystatechange = (browserflag)?(serverResponse):(serverResponse());
				//alert(queryStr);
        }else{
                window.alert("服务器超时...");
				$('submit').disabled = false;
				$('submit').value="提交评论";
        }
}//发送数据
function serverResponse(){
//alert("afa");
	if(4==xmlHttp.readyState){
		if(200==xmlHttp.status){
		
		var resData=xmlHttp.responseText;
		var resJson = eval('(' + resData + ')');
		if(resJson[0]){
		alert("评论成功");
		InsertComment('commentAdd',resJson[1]);
		$('submit').disabled = false;
		$('submit').value="提交评论";
		$('comment').value="";
		//$(id).innerHTML=resJson[1];
		}else{
			if(resJson[1]==-102){
					alert('计算错误，请仔细算一下！');
					$('submit').disabled = false;
					$('submit').value="提交评论";
					return false;
				}else if(resJson[1]==-101){
					alert('请填写全部内容后再提交');
					$('submit').disabled = false;
					$('submit').value="提交评论";
					return false;
				}
			}
				//alert(resData);
					//return false;
					//$(id).innerHTML=httpflag.responseText;
		}
    }
}
//留言处插入节点
function InsertComment(id,info){   
    var node=document.getElementById(id);   
    var insertedNode=document.createElement("ol");  
	//var addId='addCommnet'+Math.random();
	//insertedNode.setAttribute('id',addId);
	insertedNode.innerHTML = info;

     //insertedNode.appendChild(document.createTextNode(info));   
         //获取节点的父节点,并将创建的节点插入到该节点的下一个节点之前，previousSibling往后插,nextSibling往前插.   
     node.parentNode.insertBefore(insertedNode,node.previousSibling);   
}
//js操作cookie
function SetCookie(name,value){
	var minute = 1000; //保存天数
	var exp = new Date();
	exp.setTime(exp.getTime() + minute*60*1000*60*24);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name){//取cookies函数
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr != null) return unescape(arr[2]); return null;
}
function delCookie(name)//删除cookie
{
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
//插入回复@
function backcomment(msg){
$('comment').value="@"+msg;
}
//自动根据记忆填写表单
 window.onload = function() {
	 if(getCookie("author")){
	 $('author').value=getCookie("author");
	 $('email').value=getCookie("email");
	 $('url').value=getCookie("url")?getCookie("url"):"http://www.taogogo.info";
	 }
}
//-->