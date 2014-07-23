<?php
/**
 * Contains test class for espresso.php
 *
 * @since  		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */


/**
 * All tests for the espresso.php file.
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */
class espresso_Tests extends EE_UnitTestCase {


	/**
	 * Tests all constants that should be defined on plugin load.
	 *
	 * @since 4.3.0
	 */
	function test_defined_constants() {
		$this->assertTrue( defined('EVENT_ESPRESSO_VERSION') );
		$this->assertTrue( defined('EE_MIN_WP_VER_REQUIRED') );
		$this->assertTrue( defined('EE_MIN_WP_VER_RECOMMENDED') );
		$this->assertTrue( defined('EE_MIN_PHP_VER_RECOMMENDED') );
		$this->assertTrue( defined('EVENT_ESPRESSO_POWERED_BY') );
		$this->assertTrue( defined('EVENT_ESPRESSO_MAIN_FILE') );
		$this->assertTrue( defined('DS') );
		$this->assertTrue( defined('PS') );
		$this->assertTrue( defined('SP') );
		$this->assertTrue( defined('EE_SUPPORT_EMAIL') );
		$this->assertTrue( defined('EE_PLUGIN_BASENAME') );
		$this->assertTrue( defined('EE_PLUGIN_DIR_PATH') );
		$this->assertTrue( defined('EE_PLUGIN_DIR_URL') );
		$this->assertTrue( defined('EE_ADMIN_PAGES') );
		$this->assertTrue( defined('EE_CORE') );
		$this->assertTrue( defined('EE_MODULES') );
		$this->assertTrue( defined('EE_SHORTCODES') );
		$this->assertTrue( defined('EE_TEMPLATES') );
		$this->assertTrue( defined('EE_WIDGETS') );
		$this->assertTrue( defined('EE_CAFF_PATH') );
		$this->assertTrue( defined('EE_ADMIN') );
		$this->assertTrue( defined('EE_CPTS') );
		$this->assertTrue( defined('EE_CLASSES') );
		$this->assertTrue( defined('EE_MODELS') );
		$this->assertTrue( defined('EE_HELPERS') );
		$this->assertTrue( defined('EE_LIBRARIES') );
		$this->assertTrue( defined('EE_THIRD_PARTY') );
		$this->assertTrue( defined('EE_GLOBAL_ASSETS') );
		$this->assertTrue( defined('EE_GATEWAYS') );
		$this->assertTrue( defined('EE_GATEWAYS_URL') );
		$this->assertTrue( defined('EE_TEMPLATES_URL') );
		$this->assertTrue( defined('EE_GLOBAL_ASSETS_URL') );
		$this->assertTrue( defined('EE_IMAGES_URL') );
		$this->assertTrue( defined('EE_THIRD_PARTY_URL') );
		$this->assertTrue( defined('EE_HELPERS_ASSETS') );
		$this->assertTrue( defined('EVENT_ESPRESSO_UPLOAD_DIR') );
		$this->assertTrue( defined('EVENT_ESPRESSO_UPLOAD_URL') );
		$this->assertTrue( defined('EVENT_ESPRESSO_TEMPLATE_DIR') );
		$this->assertTrue( defined('EVENT_ESPRESSO_TEMPLATE_URL') );
		$this->assertTrue( defined('EVENT_ESPRESSO_GATEWAY_DIR') );
		$this->assertTrue( defined('EVENT_ESPRESSO_GATEWAY_URL') );
		$this->assertTrue( defined('EE_LANGUAGES_SAFE_LOC') );
		$this->assertTrue( defined('EE_LANGUAGES_SAFE_DIR') );
		$this->assertTrue( defined('EE_FRONT_AJAX') );
		$this->assertTrue( defined('EE_ADMIN_AJAX') );
		$this->assertTrue( defined('EE_INF_IN_DB') );
	}


	/**
	 * espresso_load_required is run automatically when the plugin is loaded.
	 *
	 * That means we should have the following files already loaded:
	 *  - EE_System
	 *  - EE_Debug_Tools
	 *  - EE_Error
	 *
	 * @since 4.3.0
	 */
	function test_espresso_load_required() {
		$this->assertTrue( class_exists( 'EE_System') );

		//depends on WP_DEBUG
		if( defined('WP_DEBUG') && WP_DEBUG )
			$this->assertTrue( class_exists( 'EEH_Debug_Tools') );
		else
			$this->assertFalse( class_exists( 'EEH_Debug_Tools') );

		$this->assertTrue( class_exists( 'EE_Error' ) );
	}
}
