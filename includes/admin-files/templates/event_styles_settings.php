<?php
// read our style dir and build an array of files

//Base style directory
$dhandle = opendir(EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/css/');
$files = array();

if ($dhandle) { //if we managed to open the directory
	// loop through all of the files
	while (false !== ($fname = readdir($dhandle))) {
		// if the file is not this file, and does not start with a '.', '..', etc., then store it for later display.
		if ( $fname != '.' ){
			if ( $fname != '..' ){
				if ( $fname != '.svn' ){
					if ( $fname != basename($_SERVER['PHP_SELF']) ){
						if ( $fname != 'index.html' ){
							if ( $fname != '.DS_Store' ){
								if ( $fname != 'themeroller' ){
									if ( $fname != 'colors' ){
										// store the filename
										$files[] = $fname;
									}
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
	
// Secondary style directory  - colors
$dhandle = opendir(EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/css/colors/');
$files_color = array();

if ($dhandle) { //if we managed to open the directory
	// loop through all of the files
	while (false !== ($fname_color = readdir($dhandle))) {
		// if the file is not this file, and does not start with a '.', '..', etc., then store it for later display.
		if ( $fname_color != '.' ){
			if ( $fname_color != '..' ){
				if ( $fname_color != '.svn' ){
					if ( $fname_color != basename($_SERVER['PHP_SELF']) ){
						if ( $fname_color != 'index.html' ){
							if ( $fname_color != '.DS_Store' ){
								// store the filename
								$files_color[] = $fname_color;
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

// themeroller style directory
if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "templates/css/themeroller/index.html") ){
	$dhandle = opendir(EVENT_ESPRESSO_UPLOAD_DIR . 'templates/css/themeroller/');
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
						if ( $fname_themeroller != 'index.html' ){
							if ( $fname_themeroller != '.DS_Store' ){
								// store the filename
								$files_themeroller[] = $fname_themeroller;
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
	$option_selections = array($org_options['style_settings']['selected_style'], $org_options['style_settings']['style_color'], $org_options['themeroller']['themeroller_style']  );
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
	
$disabled = ( $org_options['style_settings']['enable_default_style'] == 'N' || file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "templates/event_espresso_style.css") ) ? 'disabled="disabled"' : '';
$styled = ( !empty($disabled) ) ? 'style="color: #ccc;"' : '';
?>
<?php // var_dump($org_options['style_settings']['selected_style']); ?>

<p class="section-heading" <?php echo $styled ?>>
	<?php _e('Default Event Espresso Style Settings ', 'event_espresso'); ?>
	<a class="thickbox"  href="#TB_inline?height=400&amp;width=500&amp;inlineId=alternative_styles_info" target="_blank"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/question-frame.png" width="16" height="16" alt="" /></a> </p>

<?php
if ( $org_options['themeroller']['use_themeroller'] == 'Y' ){
	$disabled = 'disabled="disabled"';
	$styled = 'style="color: #ccc;"';
}
?>
<p>
	<label for="base-style-select" <?php echo $styled ?>>
		<?php _e('Select Base stylesheet', 'event_espresso');  ?>
	</label>
	<select id="base-style-select" class="wide" <?php echo $disabled ?> name="selected_style">
		<option <?php espresso_style_is_selected($fname) ?> value="event_espresso_style.css">
		<?php _e('Default style - generic', 'event_espresso'); ?>
		</option>
		<?php foreach( $files as $fname ) { ?>
		<option <?php espresso_style_is_selected($fname) ?> value="<?php echo $fname ?>"><?php echo $fname; ?></option>
		<?php } ?>
	</select>
</p>
<p>
	<label for="style-color" <?php echo $styled ?>>
		<?php _e('Select optional colors', 'event_espresso');  ?>
	</label>
	<select id="style-color" class="wide" <?php echo $disabled ?> name="style_color">
		<option <?php espresso_style_is_selected($fname_color) ?> value=""> -
		<?php _e('None', 'event_espresso'); ?>
		</option>
		<?php foreach( $files_color as $fname_color ) { ?>
		<option <?php espresso_style_is_selected($fname_color) ?> value="<?php echo $fname_color ?>"><?php echo $fname_color; ?></option>
		<?php } ?>
	</select>
</p>

<?php
if ( $org_options['themeroller']['use_themeroller'] == 'Y' && $org_options['style_settings']['enable_default_style'] == 'Y' ){
	$disabled = '';
	$styled = '';
}
?>
<p class="section-heading" <?php echo $styled ?>>
	<?php _e('Themeroller Style Settings ', 'event_espresso'); ?>
	<a class="thickbox"  href="#TB_inline?height=400&amp;width=500&amp;inlineId=themeroller_info" target="_blank"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/question-frame.png" width="16" height="16" alt="" /></a> </p>
<p>
	<label for="use_themeroller" <?php echo $styled ?>>
		<?php _e('Apply Themeroller style settings?','event_espresso'); ?>
	</label>
	<?php echo select_input('use_themeroller', $values, $org_options['themeroller']['use_themeroller'], 'id="use_themeroller"' . $disabled);?> </p>
<p>
<?php
if ( $org_options['themeroller']['use_themeroller'] == 'Y' && $org_options['style_settings']['enable_default_style'] == 'Y'){
	$disabled = '';
	$styled = '';
}else{
	$disabled = 'disabled="disabled"';
	$styled = 'style="color: #ccc;"';
}
?>

	<label for="style-themeroller" <?php echo $styled ?>>
		<?php _e('Select your Themeroller styles', 'event_espresso');  ?>
	</label>
	<select id="style-themeroller" class="wide" <?php echo $disabled ?> name="themeroller_style">
		<option <?php espresso_style_is_selected($fname_themeroller) ?> value=""> -
		<?php _e('None', 'event_espresso'); ?>
		</option>
		<?php foreach( $files_themeroller as $fname_themeroller ) { ?>
		<option <?php espresso_style_is_selected($fname_themeroller) ?> value="<?php echo $fname_themeroller ?>"><?php echo $fname_themeroller; ?></option>
		<?php } ?>
	</select>
</p>