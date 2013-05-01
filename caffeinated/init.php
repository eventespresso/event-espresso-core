<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

function espresso_system_check() {
	global $caffeinated;
	$caffeinated = defined('EE_CAFFEINATED') ? EE_CAFFEINATED : TRUE;
	return $caffeinated;
}

//Custom includes support
if (file_exists( EVENT_ESPRESSO_UPLOAD_DIR . "custom_includes.php")){
	require_once(EVENT_ESPRESSO_UPLOAD_DIR . "custom_includes.php");
}

//Custom functions support
if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "custom_functions.php")){
	require_once(EVENT_ESPRESSO_UPLOAD_DIR . "custom_functions.php");
}

//Custom shortcode support
if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "custom_shortcodes.php")){
	require_once(EVENT_ESPRESSO_UPLOAD_DIR . "custom_shortcodes.php");
}

function espresso_caffeinated_activation() {
	if (  ! EE_DECAF && file_exists( EVENT_ESPRESSO_PLUGINFULLPATH . 'caffeinated/admin/activation.php' )) {
		require_once( EVENT_ESPRESSO_PLUGINFULLPATH . 'caffeinated/admin/activation.php' );
	}
}


