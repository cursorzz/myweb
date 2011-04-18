<?php if($blogOption['ad_type']=='code' && $blogOption['ad_content']!=''){
 echo $blogOption['ad_content'];
 } else { ?>
<div class="ad-in" <?php if($blogOption['ad_type']=='pic' && $blogOption['ad_content']!=''){echo 'style="background-image:url('. $blogOption['ad_content'] .');"';}?>>
</div>
<?php } ?>

<?php //如果你的广告不需要边框和背景，请直接清除本文件中的所有内容后，再粘贴广告代码 ?>