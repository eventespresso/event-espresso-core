<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

	function espresso_system_check() {
		global $caffeinated;
		$caffeinated = TRUE;
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