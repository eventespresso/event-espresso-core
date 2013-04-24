<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

function espresso_system_check() {
	global $caffeinated;
	$caffeinated = defined('EE_CAFFEINATED') ? EE_CAFFEINATED : TRUE;
	return $caffeinated;
}

//make sure EVENT_ESPRESSO_UPLOAD_DIR is defined

if ( !defined('EVENT_ESPRESSO_UPLOAD_DIR' ) ) {
	$uploads = wp_upload_dir();
	$upload_dir = $uploads['basedir'] . DIRECTORY_SEPARATOR . 'espresso' . DIRECTORY_SEPARATOR;
} else {
	$upload_dir = EVENT_ESPRESSO_UPLOAD_DIR;
}

//Custom includes support
if (file_exists( $upload_dir . "custom_includes.php")){
	require_once($upload_dir . "custom_includes.php");
}

//Custom functions support
if (file_exists($upload_dir . "custom_functions.php")){
	require_once($upload_dir . "custom_functions.php");
}

//Custom shortcode support
if (file_exists($upload_dir . "custom_shortcodes.php")){
	require_once($upload_dir . "custom_shortcodes.php");
}