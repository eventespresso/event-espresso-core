<?php
// read our style dir and build an array of files
// themeroller style directory
if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "/themeroller/index.php") ){
	$dhandle = opendir(EVENT_ESPRESSO_UPLOAD_DIR . '/themeroller/');
}else{
	$dhandle = opendir(EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/css/themeroller/');
}

$files_themeroller = array();

if ($dhandle) { //if we managed to open the directory
	// loop through all of the files
	while (false !== ($fname_themeroller = readdir($dhandle))) {
		// if the file is not this file, and does not start with a '.', '..', etc., then store it for later display.
		if ( $fname_themeroller != '.' ){
			if ( $fname_themeroller != '..' ){
				if ( $fname_themeroller != '.svn' ){
					if ( $fname_themeroller != basename($_SERVER['PHP_SELF']) ){
						if ( $fname_themeroller != 'index.php' ){
							if ( $fname_themeroller != '.DS_Store' ){
								if ( $fname_themeroller != 'themeroller-base.css' ){
									// store the filename
									$files_themeroller[] = $fname_themeroller;
								}
							}
						}
					}
				}
			}
		}
	}
	// close the directory
	closedir($dhandle);
}
		
function espresso_style_is_selected($name) {
	global $org_options;
	$input_item = $name;
	$option_selections = array( $org_options['themeroller']['themeroller_style'] );
	if(!in_array( $input_item, $option_selections )){
		return false;
	}else{
		echo 'selected="selected"';
		return;
	}
}
$values = array(
	array('id' => 'N', 'text' => __('No', 'event_espresso')),
	array('id' => 'Y', 'text' => __('Yes', 'event_espresso'))
);
?>

<p class="section-heading" <?php echo $styled ?>>
	<?php _e('Style Settings ', 'event_espresso'); ?>
	<a class="thickbox"  href="#TB_inline?height=400&amp;width=500&amp;inlineId=alternative_styles_info" target="_blank"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/question-frame.png" width="16" height="16" alt="" /></a> </p>
<select id="style-themeroller" class="wide" <?php echo $disabled ?> name="themeroller_style">
	<option <?php espresso_style_is_selected($fname_themeroller) ?> value=""> -
	<?php _e('None', 'event_espresso'); ?>
	</option>
	<?php foreach( $files_themeroller as $fname_themeroller ) { ?>
	<option <?php espresso_style_is_selected($fname_themeroller) ?> value="<?php echo $fname_themeroller ?>"><?php echo $fname_themeroller; ?></option>
	<?php } ?>
</select>
</p>
