<?php
//Custom includes support
if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "custom_includes.php")){
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