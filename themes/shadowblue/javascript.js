jQuery(function($){
//判断浏览器
if($.browser.msie){
  var ieVer = $.browser.version;
  switch(ieVer){
    case 7:
      $('#searchreset,#searchsubmit').css({'top':'3px'});
      break;
    default:
      break;
  }
}else{
  var ieVer = 100;
}
//top-sns
if(ieVer>6){
  $('#top-sns a').fadeTo(0,0.5).hover(function(){
    $(this).fadeTo(300,1);
  },function(){
    $(this).fadeTo(300,0.5);
  });
}
//top-page
$('#top-page>ul>li:gt(8)').addClass('hidden');
$('#top-page>ul').addClass('top-level').children('li').addClass('top-level').children('ul').addClass('second-level');
$('#top-page li.page_item').hover(
  function(){
    var $self = $(this);
    $self.addClass('hover');
    $self.doTimeout('hoverNav',500,function(){
      $self.children('ul').fadeTo(0,0.8).show();    
    });
  },function(){
    var $self = $(this);
    $self.removeClass('hover');
    $self.doTimeout('hoverNav',500,function(){
      $self.children('ul').hide();    
    });
  }
);
//nav
if($('#nav>ul:first').height()>$('#nav').height()){
  var navDivHeight = $('#nav').height();
  var navUlHeight = $('#nav>ul:first').height();
  if(navUlHeight>90 && $('#nav>ul:first').hasClass('wp-tag-cloud')){navUlHeight=90}
  $('#nav a.switch').css('display','block').toggle(function(){
    $('#nav').animate({height:navUlHeight},{
      duration: 800,
      easing: 'easeInOutSine',
      complete: function(){
        $('#nav a.switch').attr('title','收起').addClass('switch-up');
      }
    });
    return false;
  },function(){
    $('#nav').animate({height:navDivHeight},{
      duration: 600,
      easing: 'easeInOutSine',
      complete: function(){
        $('#nav a.switch').attr('title','更多').removeClass('switch-up');
      }
    });
    return false;
  });
}
$('#nav>ul.wp-tag-cloud').addClass('top-level');
//.story
$('.story:last').addClass('last-story');
//.entry-text
$('.entry-text img, img.avatar').hover(function(){
    $(this).doTimeout('hoverIMG',500,function(){
      $(this).animate(
        {
        borderTopColor: '#003E7B',
        borderRightColor: '#003E7B',
        borderBottomColor: '#003E7B',
        borderLeftColor: '#003E7B'   
        },
        {
        duration: 800
        }
      ); 
    });
  }, function(){
    $(this).doTimeout('hoverIMG',500,function(){
      $(this).animate(
        {
        borderTopColor: '#ccc',
        borderRightColor: '#ccc',
        borderBottomColor: '#ccc',
        borderLeftColor: '#ccc'   
        },
        {
        duration: 800
        }
      ); 
    });
  });
$('.entry-text a').each(function(){
  $self = $(this);
  if(!$self.has('img').length && !$self.hasClass('more-link')){
    if(ieVer>7){
      $self.addClass('external-link');
    } else {
      $self.after('<a href="' + $self.attr('href') + '" class="external-link-old" target="_blank">&nbsp;</a>');
    }
  }
});
//pingslist
if($('').children().length==0){ 
  $('#pings, ol.pingslist').addClass('hidden');
}
//评论 Ctrl+Enter
$('#commentform input,#commentform textarea').keydown(function(e){
  if(e.ctrlKey && (e.keyCode==13 || e.keyCode==10)){
    $('#commentform :submit').click();
  }
});
//评论 Respond
$('.comment-reply-link').click(function(){
  // $(this).parent().next('.respond-box').empty().append($('.respond-in'));
  // $('.respond-in .cancel-comment-reply small').addClass('show');
  // return false;
});
//switch-sidebar
$('a.switch-sidebar').fadeTo(0,0.4).hover(function(){
  $(this).fadeTo(300,1);
},function(){
  $(this).fadeTo(300,0.4);
})
if($('body').hasClass('sidebar-hide')){
  $('a.switch-sidebar').attr('title','展开侧边栏').toggle(function(){
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
        $('#sidebar').show();
        $('body').removeClass('sidebar-hide');
      }
    });
    setCookie('sidebarHide',0);
  },function(){
    $('#sidebar').hide();
    $('#main .main-in').addClass('main-in-wide');
    if(ieVer == 6){
      $('#content').animate({width:'885px',marginRight:0},600);
      $('#content .entry').animate({width:'795px'},{
        duration: 800,
        complete: function(){
          $('a.switch-sidebar').addClass('switch-sidebar-back');
        }
      });
    } else {
      $('#content').animate({width:'855px',marginRight:0},600);
      $('#content .entry').animate({width:'765px'},{
        duration: 800,
        complete: function(){
          $('a.switch-sidebar').addClass('switch-sidebar-back');
          $('body').removeClass('sidebar-hide');
        }
      });
    }
    setCookie('sidebarHide',1);
  });
} else {
  $('a.switch-sidebar').attr('title','收缩侧边栏').toggle(function(){
    $('#sidebar').hide();
    $('#main .main-in').addClass('main-in-wide');
    if(ieVer == 6){
      $('#content').animate({width:'885px',marginRight:0},600);
      $('#content .entry').animate({width:'795px'},{
        duration: 800,
        complete: function(){
          $('a.switch-sidebar').addClass('switch-sidebar-back');
        }
      });
    } else {
      $('#content').animate({width:'855px',marginRight:0},600);
      $('#content .entry').animate({width:'765px'},{
        duration: 800,
        complete: function(){
          $('a.switch-sidebar').addClass('switch-sidebar-back');
        }
      });
    }
    setCookie('sidebarHide',true);
  },function(){
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
        $('#sidebar').show();
      }
    });
    setCookie('sidebarHide',false);
  });
}
//.widget
$('.sidebar>ul>li').addClass('widget');
//switch-footbar
$('a.switchFootbar').toggle(
function(){
  $('#footbar').slideToggle({
    duration  : 800,
    easing    : 'easeInOutSine'
  });
},function(){
  $('#footbar').slideToggle({
    duration  : 800,
    easing    : 'easeInOutSine'
  });
});
//welcome back
if($('#commentform #author').attr('value')!=''){
  var commentAuthor = $('#commentform #author').attr('value');
  $('.welcome-back').addClass('show').children('strong').append(commentAuthor);
  $('.welcome-new').addClass('hidden');
}
$('.welcome-back .comment-reset').click(function(){
  $('.welcome-back').removeClass('show').siblings('.welcome-new').slideDown().children('input').attr('value','');
  return false;
});
//搜索样式
$('#searchreset').click(function(){
  $(this).hide();
});
$('#searchform :text').focus(function(){
  $('#searchreset').show();
  if(ieVer<8){
    $('#searchform :text').css({'border-color':'#79a8e7'});
  }
});
$('#searchform :text').blur(function(){
  if($(this).attr('value')==''){
    $('#searchreset').hide();
  }
  if(ieVer<8){
    $('#searchform :text').css({'border-color':'#ccc'});
  }
});
//Hover Fade
$('#scroll a').fadeTo(0,0.3).hover(
  function(){
    $(this).fadeTo(300,0.9);
  },
  function(){
    $(this).fadeTo(600,0.3);
});
//返回页首
$('a.back-to-top').click(function(){
  $('html, body').animate({scrollTop: 0}, {duration:1200, easing:'easeInOutSine'});
  return false;
});
$('a.back-to-bottom').click(function(){
  $('html, body').scrollTo( '#footer', 1200, {easing:'easeInOutSine'} );
  return false;
});
//Hash
if(window.location.hash && $(window.location.hash).length>0){
  var locationHash = window.location.hash;
  $('html, body').scrollTo( locationHash, 300, {easing:'easeInOutSine', offset: -50}); 
}
//外部链接 rel="external"
$('a[rel="external"],a.url').click(function(){
	window.open(this.href);
	return false;
});
//WP-Spread-Comment
$('.comment-childs img.avatar')
  .next('p').addClass('comment-childs-meta').after('<div class="clear"></div>');
$('.thdrpy a').attr('title','点此回复');
//Zelig-Plugin
$('.plugins-list tbody tr').each(function(){
  $(this).children('td:eq(0)').addClass('td-1');
  $(this).children('td:eq(1)').addClass('td-2');
  $(this).children('td:eq(2)').addClass('td-3');
});
//End
});
//addComment
//addComment={moveForm:function(d,f,i,c){var m=this,a,h=m.I(d),b=m.I(i),l=m.I("cancel-comment-reply-link"),j=m.I("comment_parent"),k=m.I("comment_post_ID");if(!h||!b||!l||!j){return}m.respondId=i;c=c||false;if(!m.I("wp-temp-form-div")){a=document.createElement("div");a.id="wp-temp-form-div";a.style.display="none";b.parentNode.insertBefore(a,b)}h.parentNode.insertBefore(b,h.nextSibling);if(k&&c){k.value=c}j.value=f;l.style.display="";l.onclick=function(){var n=addComment,e=n.I("wp-temp-form-div"),o=n.I(n.respondId);if(!e||!o){return}n.I("comment_parent").value="0";e.parentNode.insertBefore(o,e);e.parentNode.removeChild(e);this.style.display="none";this.onclick=null;return false};try{m.I("comment").focus()}catch(g){}return false},I:function(a){return document.getElementById(a)}};