<?php

function espresso_csv_uploader ( $import_what, $import_intro, $page  ) {

	$name = str_replace( ' ', '_', strtolower( $import_what ));

	$csv_uploader = '
	<div class="clear"></div>
	<br /><br />
	<h3>Import '.$import_what.'</h3>
	<p>'.$import_intro.'</p>
	
	<form action="' . get_bloginfo('wpurl') . '/wp-admin/admin.php?page='.$page.'&amp;import=csv" method="post" enctype="multipart/form-data">
		<input type="hidden" name="csv_submitted" value="TRUE" id="' . time() . '">
		<input name="action" type="hidden" value="csv_import_'.$name.'" />
		<font color="red"> * </font><input type="file" name="file[]">
		<input class="button-primary" type="submit" value="Upload File">
	</form>
		
		<p><font color="red"> * </font>Maximum file name length (minus extension) is 15 characters. Anything over that will be cut to only 15 characters. Only .csv file types.</p>
';
	return $csv_uploader;
}
