<?php if($blogOption['ad_type']=='code' && $blogOption['ad_content']!=''){
 echo $blogOption['ad_content'];
 } else { ?>
<div class="ad-in" <?php if($blogOption['ad_type']=='pic' && $blogOption['ad_content']!=''){echo 'style="background-image:url('. $blogOption['ad_content'] .');"';}?>>
</div>
<?php } ?>

<?php //�����Ĺ�治��Ҫ�߿�ͱ�������ֱ��������ļ��е��������ݺ���ճ�������� ?>