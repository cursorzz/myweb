jQuery(function($){
//修正大尺寸图片大小
	$('img').each(function(){ 
		if(this.width>450){
			$(this).width(450);
	}});
//anti IE6
  $('#anti_ie6 a.close').fadeTo(0,0.6).click(function(){
    $('#anti_ie6').fadeOut(200);
    setCookie('closeAnti',true,7);
    return false;
  }).hover(function(){
    $(this).fadeTo(300,0.9);
  },function(){
    $(this).fadeTo(300,0.6);
  });
//伸缩侧边栏
$('a.switch-sidebar').attr('title','收缩侧边栏').fadeTo(0,0.4).hover(function(){
  $(this).fadeTo(300,1);
},function(){
  $(this).fadeTo(300,0.4);
}).toggle(function(){
  $('#sidebar').hide();
  $('#main .main-in').addClass('main-in-wide');
  $('#content').animate({width:'885px',marginRight:0},600);
  $('#content .entry').animate({width:'795px'},{
    duration: 800,
    complete: function(){
      $('a.switch-sidebar').addClass('switch-sidebar-back');
    }
  });
},function(){
  $('#sidebar').show();
  $('#content').animate({width:'590px',marginRight:'15px'},{
    duration: 800,
    complete: function(){
      $('#main .main-in').removeClass('main-in-wide');
    }
  });
  $('#content .entry').animate({width:'500px'},{
    duration: 600,
    complete: function(){
      $('a.switch-sidebar').removeClass('switch-sidebar-back');
    }
  });
});
//End
});