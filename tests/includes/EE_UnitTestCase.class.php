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
	const error_code_undefined_property = 8;
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
	 * @param int $level use to indicate which maintenance mode to set.
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
	 * @param       $haystack
	 */
	public function assertArrayContains($item,$haystack){
		$in_there = in_array($item, $haystack);
		if($in_there){
			$this->assertTrue(true);
		}else{
			$this->assertTrue($in_there,  sprintf(__("Array %s does not contain %s", "event_espresso"),print_r($haystack,true),print_r($item,true)));
		}
	}



	/**
	 * @param $item
	 * @param $haystack
	 */
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



	/**
	 * @param $option_name
	 */
	public function assertWPOptionDoesNotExist($option_name){
		$option = get_option($option_name,NULL);
		if( $option){
			$this->assertNull($option,sprintf(__("The WP Option '%s' exists but shouldN'T", "event_espresso"),$option_name));
		}else{
			$this->assertTrue(true);
		}
	}



	/**
	 *Creates a model object and its required dependencies
	 * @param string  $model_name
	 * @param array   $args array of arguments to supply when constructing the model obejct
	 * @param boolean $save
	 * @throws EE_Error
	 * @global int    $auto_made_thing_seed
	 * @return EE_Base_Class
	 */
	function new_model_obj_with_dependencies( $model_name, $args = array(), $save = true ) {
		global $auto_made_thing_seed;
		if($auto_made_thing_seed === NULL){
			$auto_made_thing_seed = 1;
		}
		$model = EE_Registry::instance()->load_model($model_name);

		//set the related model foreign keys
		foreach($model->relation_settings() as $related_model_name => $relation){
			if($relation instanceof EE_Belongs_To_Any_Relation){
				continue;
			}elseif($relation instanceof EE_Belongs_To_Relation) {
				$obj = $this->new_model_obj_with_dependencies($related_model_name);
				$fk = $model->get_foreign_key_to($related_model_name);
				if( ! isset( $args[ $fk->get_name() ] )){
					$args[$fk->get_name()] = $obj->ID();
				}

			}
		}

		//set any other fields which haven't yet been set
		foreach($model->field_settings() as $field_name => $field){
			$value = NULL;
			if($field_name == 'EVT_timezone_string'){
				$value = NULL;
			}elseif($field instanceof EE_Enum_Integer_Field ||
					$field instanceof EE_Enum_Text_Field ||
					$field instanceof EE_Boolean_Field){
				$value = $field->get_default_value();
			}elseif( $field instanceof EE_Integer_Field ||
					$field instanceof EE_Float_Field ||
					$field instanceof EE_Foreign_Key_Field_Base ||
					$field instanceof EE_Primary_Key_String_Field){
				$value = $auto_made_thing_seed;
			}elseif( $field instanceof EE_Text_Field_Base ){
				$value = $auto_made_thing_seed."_".$field->get_name();
			}
			if( ! isset( $args[ $field_name ] ) && $value !== NULL){
				$args[$field->get_name()] = $value;
			}
		}
		//and finally make the model obj
		$classname = 'EE_'.$model_name;
		$model_obj = $classname::new_instance($args);
		if($save){
			$success = $model_obj->save();
			if( ! $success ){
				global $wpdb;
				throw new EE_Error(sprintf("Coudl not save %s using %s. Error was %s",$model_name,json_encode($args),$wpdb->last_error));
			}
		}
		$auto_made_thing_seed++;
		return $model_obj;

	}



	/**
	 * We really should implement this function in the proper PHPunit style
	 * @see http://php-and-symfony.matthiasnoback.nl/2012/02/phpunit-writing-a-custom-assertion/
	 * @global WPDB $wpdb
	 * @param string $table_name with or without $wpdb->prefix
	 * @param string $model_name the model's name (only used for error reporting)
	 */
	function assertTableExists($table_name,$model_name = 'Unknown'){
		global $wpdb;
		if(strpos($table_name, $wpdb->prefix) !== 0){
			$table_name = $wpdb->prefix.$table_name;
		}
		$exists =  $wpdb->get_var( "SHOW TABLES LIKE '$table_name'" ) == $table_name;
		if( !$exists ){
			$this->assertTrue($exists,  sprintf(__("Table like %s does not exist as it was defined on the model %s", 'event_espresso'),$table_name,$model_name));
		}
	}

	/**
	 * Modifies the $wp_actions global to make it look like certian actions were and weren't
	 * performed, so that EE_Register_Addon is deceived into thinking it's the right
	 * time to register an addon etc
	 * @global array $wp_actions
	 */
	protected function _pretend_addon_hook_time(){
		global $wp_actions;
		unset($wp_actions['AHEE__EE_System___detect_if_activation_or_upgrade__begin']);
		$wp_actions['AHEE__EE_System__load_espresso_addons'] = 1;
	}
	/**
	 * Restores the $wp_actions global to how ti should have been before we
	 * started pretending we hooked in at the right time etc
	 * @global array $wp_actions
	 */
	protected function _stop_pretending_addon_hook_time(){
		global $wp_actions;
		$wp_actions['AHEE__EE_System___detect_if_activation_or_upgrade__begin'] = 1;
		unset($wp_actions['AHEE__EE_System__load_espresso_addons']);
	}



}
