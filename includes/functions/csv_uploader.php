<?php

function espresso_csv_uploader ( $title, $intro, $page, $action  ) {

	$csv_uploader = '
	<div class="clear"></div>
	<br /><br />
	<h3>Import '.$title.'</h3>
	<p>'.$intro.'</p>
	
	<form action="' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page='.$page.'" method="post" enctype="multipart/form-data">
		<input type="hidden" name="csv_submitted" value="TRUE" id="' . time() . '">
		<input name="action" type="hidden" value="'.$action.'" />
		<input name="import" type="hidden" value="csv" />
		<font color="red"> * </font><input type="file" name="file[]" size="90" style="padding:3px; border:1px solid #999; outline:none; height:20px;">
		<input class="button-primary" type="submit" value="Upload File">
	</form>
		
		<p><font color="red"> * </font>Maximum file name length (minus extension) is 15 characters. Anything over that will be cut to only 15 characters. Only .csv file types.</p>
';
	return $csv_uploader;
}
