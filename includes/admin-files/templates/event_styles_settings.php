<?php
// read our style dir and build an array of files
$dhandle = opendir(EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/css/');
$files = array();

if ($dhandle) { //if we managed to open the directory
	// loop through all of the files
	while (false !== ($fname = readdir($dhandle))) {
		// if the file is not this file, and does not start with a '.' or '..',
		// then store it for later display
		if ( ($fname != '.') && ($fname != '..') && ($fname != '.svn') && ($fname != 'colors') && ($fname != basename($_SERVER['PHP_SELF'])) ) {
			// store the filename
			$files[] = $fname;
		}
	}
	// close the directory
	closedir($dhandle);
}

$dhandle = opendir(EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/css/colors/');
$files_color = array();

if ($dhandle) { //if we managed to open the directory
	// loop through all of the files
	while (false !== ($fname_color = readdir($dhandle))) {
		// if the file is not this file, and does not start with a '.' or '..',
		// then store it for later display
		if ( ($fname_color != '.') && ($fname_color != '..') && ($fname_color != '.svn') && ($fname != basename($_SERVER['PHP_SELF'])) ) {
			// store the filename
			$files_color[] = $fname_color;
		}
	}
	// close the directory
	closedir($dhandle);
}
		
function espresso_style_is_selected($name) {
	global $org_options;
	$input_item = $name;
	$option_selections = array($org_options['selected_style'], $org_options['style_color']  );
	if (!in_array( $input_item, $option_selections )  ){
		return false;
	}else{
		echo  'selected="selected"';
		return;
	}
}
$disabled = ( $org_options['enable_default_style'] == 'N' || file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "templates/event_espresso_style.css") ) ? 'disabled="disabled"' : '';
$styled = ( !empty($disabled) ) ? 'style="color: #ccc;"' : '';
?>
<?php // var_dump($org_options['selected_style']); ?>

<p class="section-heading" <?php echo $styled ?>>
  <?php _e('Select Alternative Espresso Styles ', 'event_espresso'); ?>
  <a class="thickbox"  href="#TB_inline?height=400&amp;width=500&amp;inlineId=alternative_styles_info" target="_blank"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/question-frame.png" width="16" height="16" alt="" /></a> </p>
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
    - </option>
    <?php foreach( $files_color as $fname_color ) { ?>
    <option <?php espresso_style_is_selected($fname_color) ?> value="<?php echo $fname_color ?>"><?php echo $fname_color; ?></option>
    <?php } ?>
  </select>
</p>
