<?php
/**
 * EE's extension of WP_UnitTestCase for writing all EE_Tests
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */

require_once EE_TESTS_DIR . 'includes/factory.php';


/**
 * This is used to override any existing WP_UnitTestCase methods that need specific handling in EE.  We
 * can also add additional methods in here for EE tests (that are used frequently)
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */
class EE_UnitTestCase extends WP_UnitTestCase {
	protected $_cached_SERVER_NAME = NULL;

	public function setUp() {
		parent::setUp();

		// Fake WP mail globals, to avoid errors
		add_filter( 'wp_mail', array( $this, 'setUp_wp_mail' ) );
		add_filter( 'wp_mail_from', array( $this, 'tearDown_wp_mail' ) );

		//factor
		$this->factory = new EE_UnitTest_Factory;

	}


	/**
	 *  Use this to clean up any global scope singletons etc that we may have being used by EE so
	 *  that they are fresh between tests.
	 *
	 * @todo this of course means we need an easy way to reset our singletons...
	 * @see parent::cleanup_global_scope();
	 */
	function clean_up_global_scope() {
		parent::clean_up_global_scope();
	}


	/**
	 * Set up globals necessary to avoid errors when using wp_mail()
	 */
	public function setUp_wp_mail( $args ) {
		if ( isset( $_SERVER['SERVER_NAME'] ) ) {
			$this->_cached_SERVER_NAME = $_SERVER['SERVER_NAME'];
		}

		$_SERVER['SERVER_NAME'] = 'example.com';

		// passthrough
		return $args;
	}



	/**
	 * Tear down globals set up in setUp_wp_mail()
	 */
	public function tearDown_wp_mail( $args ) {
		if ( ! empty( $this->_cached_SERVER_NAME ) ) {
			$_SERVER['SERVER_NAME'] = $this->_cached_SERVER_NAME;
			unset( $this->_cached_SERVER_NAME );
		} else {
			unset( $_SERVER['SERVER_NAME'] );
		}

		// passthrough
		return $args;
	}



	/**
	 * Helper method for setting the maintenance mode of EE to given maintenance mode
	 *
	 * @param int use to indicate which maintenance mode to set.
	 * @since 4.3.0
	 */
	public function setMaintenanceMode( $level = 0 ) {
		EE_Registry::instance()->load_core('Maintenance_Mode');
		switch ( $level ) {
			case EE_Maintenance_Mode::level_0_not_in_maintenance :
				$level = EE_Maintenance_Mode::level_0_not_in_maintenance;
				break;
			case EE_Maintenance_Mode::level_1_frontend_only_maintenance :
				$level = EE_Maintenance_Mode::level_1_frontend_only_maintenance;
				break;
			case EE_Maintenance_Mode::level_2_complete_maintenance :
				$level = EE_Maintenance_Mode::level_2_complete_maintenance;
				break;
			default :
				$level = EE_Maintenance_Mode::level_0_not_in_maintenance;
				break;
		}
		update_option( EE_Maintenance_Mode::option_name_maintenance_mode, $level );
	}



	/**
	 * Helper method for just setting the core config and net config on EE_Registry, so
	 * configuration tests can be run.
	 *
	 * @since 4.3.0
	 */
	public function setCoreConfig() {
		EE_Registry::instance()->load_core('Config');
		EE_Registry::instance()->load_core('Network_Config');
	}



	/**
	 * Helper method for resetting EE_Registry->CFG and EE_Registry->NET_CFG
	 *
	 * @since 4.3.0
	 */
	public function resetCoreConfig() {
		EE_Registry::instance()->CFG = NULL;
		EE_Registry::instance()->NET_CFG = NULL;
	}



	/**
	 * Method that accepts an array of filter refs to clear all filters from.
	 *
	 * @since 4.3.0
	 * @param  array  $filters array of filter refs to clear. (be careful about core wp filters).
	 */
	public function clearAllFilters( $filters = array() ) {
		foreach( $filters as $filter ) {
			remove_all_filters($filter);
		}
	}



	/**
	 * Method that accepts an array of action refs to clear all actions from.
	 *
	 * @since 4.3.0
	 * @param  array  $actions array of action refs to clear. (be careful about core wp actions).
	 */
	public function clearAllActions( $actions = array() ) {
		foreach( $actions as $action ) {
			remove_all_actions($action);
		}
	}



	/**
	 * This defines EE_Admin_Constants to point to the admin mocks * folder instead of the default admin folder.  Note, you will need
	 * to be careful of using this.
	 *
	 * @since 4.3.0
	 */
	public function defineAdminConstants() {
		if ( !defined( 'EE_ADMIN_PAGES' ) )
			define( 'EE_ADMIN_PAGES', EE_TESTS_DIR . 'mocks/admin' );
	}



	/**
	 * This loads the various admin mock files required for tests.
	 *
	 * @since  4.3.0
	 */
	public function loadAdminMocks() {
		require_once EE_TESTS_DIR . 'mocks/admin/EE_Admin_Mocks.php';
		require_once EE_TESTS_DIR . 'mocks/admin/admin_mock_valid/Admin_Mock_Valid_Admin_Page.core.php';
	}
	/**
	 * IT would be better to add a constraint and do this properly at some point
	 * @param mixed $item
	 */
	public function assertArrayContains($item,$haystack){
		$in_there = in_array($item, $haystack);
		if($in_there){
			$this->assertTrue(true);
		}else{
			$this->assertTrue($in_there,  sprintf(__("Array %s does not contain %s", "event_espresso"),print_r($haystack,true),print_r($item,true)));
		}
	}
	public function assertArrayDoesNotContain($item,$haystack){
		$not_in_there = ! in_array($item,$haystack);
		if($not_in_there){
			$this->assertTrue($not_in_there);
		}else{
			$this->assertTrue($not_in_there,  sprintf(__("Array %s DOES contain %s when it shouldn't", "event_espresso"),print_r($haystack,true),print_r($item,true)));
		}
	}
	/**
	 * 
	 * @param string $option_name
	 */
	public function assertWPOptionExists($option_name){
		$option = get_option($option_name,NULL);
		if($option){
			$this->assertTrue(true);
		}else{
			$this->assertNotNull($option,  sprintf(__("The WP Option '%s' does not exist but should", "event_espresso"),$option_name));
		}
	}
	public function assertWPOptionDoesNotExist($option_name){
		$option = get_option($option_name,NULL);
		if( $option){
			$this->assertNull($option,sprintf(__("The WP Option '%s' exists but shouldN'T", "event_espresso"),$option_name));
		}else{
			$this->assertTrue(true);
		}
	}
}
