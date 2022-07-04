<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_Register_Model_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
/**
 * @group core/libraries/plugin_api
 * @group agg
 * @group addons
 * @group problem
 */
class EE_Register_Model_Extensions_Test extends EE_UnitTestCase{
	private $_reg_args;
	private $_model_group;
	public function __construct($name = NULL, array $data = array(), $dataName = '') {
		$this->_reg_args = array(
			'model_extension_paths' => array( EE_MOCKS_DIR . 'core/db_model_extensions/' ),
			'class_extension_paths' => array( EE_MOCKS_DIR . 'core/db_class_extensions/' )
		);
		$this->_model_group = 'Mock';
		parent::__construct($name, $data, $dataName);
	}
	/**
	 * Determines if the attendee class has been extended by teh mock extension
	 * @return boolean
	 */
	private function _class_has_been_extended( $throw_error = FALSE){
		try{
			$a = EE_Attendee::new_instance();
			$a->foobar();
			return TRUE;
		}catch(EE_Error $e){
			if( $throw_error ){
				throw $e;
			}
			return FALSE;
		}
	}



	/**
	 * Determines if the Attendee model has been extended by the mock extension
	 *
	 * @param bool $throw_error
	 * @return bool
	 * @throws \EE_Error
	 */
	private function _model_has_been_extended( $throw_error = FALSE){
		try{
			$att = EE_Registry::instance()->load_model('Attendee');
			$att->reset()->foobar();
			if( ! $att->has_field('ATT_foobar')){
				if( $throw_error ){
					throw new EE_Error(sprintf( esc_html__( 'The field ATT_foobar is not on EEM_Attendee, but the extension should have added it. fields are: %s', 'event_espresso' ), implode(",",array_keys(EEM_Attendee::instance()->field_settings()))));
				}
				return FALSE;
			}
			if( ! $att->has_relation('Transaction')){
				if( $throw_error ){
					throw new EE_Error(sprintf( esc_html__( 'The relation of type Transaction on EEM_Attendee, but the extension should have added it. fields are: %s', 'event_espresso' ), implode(",",array_keys(EEM_Attendee::instance()->field_settings()))));
				}
				return FALSE;
			}
			return TRUE;
		}catch(EE_Error $e){
			if( $throw_error ){
				throw $e;
			}
			return FALSE;
		}
	}

	//test registering a bare minimum addon, and then deregistering it
	function test_register_mock_model_fail(){
		//we're registering the addon WAAAY after EE_System has set thing up, so
		//registering this first time should throw an E_USER_NOTICE
		$this->assertFalse( $this->_class_has_been_extended() );
		$this->assertFalse( $this->_model_has_been_extended() );
		try{
			EE_Register_Model_Extensions::register($this->_model_group, $this->_reg_args);
			$this->fail('We should have had a warning saying that we are setting up the ee addon at the wrong time');
		}catch(EE_Error $e){
			$this->assertTrue(True);
		}
		//verify they still haven't been extended
		$this->assertFalse( $this->_class_has_been_extended() );
		$this->assertFalse( $this->_model_has_been_extended() );
	}

	function test_register_mock_model_extension_fail__bad_parameters(){
		//we're registering the addon with the wrong parameters
		$this->_pretend_addon_hook_time();
		$this->assertFalse( $this->_class_has_been_extended() );
		$this->assertFalse( $this->_model_has_been_extended() );
		try{
			EE_Register_Model_Extensions::register($this->_model_group, array('foo' => 'bar'));
			$this->fail('We should have had a warning saying that we are setting up the ee addon at the wrong time');
		}catch(EE_Error $e){
			$this->assertTrue(True);
		}
		//verify they still haven't been extended
		$this->assertFalse( $this->_class_has_been_extended() );
		$this->assertFalse( $this->_model_has_been_extended() );
	}

	protected function _pretend_addon_hook_time() {
		global $wp_actions;
		unset( $wp_actions['AHEE__EEM_Attendee__construct__end'] );
		parent::_pretend_addon_hook_time();
	}

	function test_register_mock_addon_success(){

		$this->assertFalse( $this->_class_has_been_extended() );
		$this->assertFalse( $this->_model_has_been_extended() );
		$this->_pretend_addon_hook_time();

		EE_Register_Model_Extensions::register($this->_model_group, $this->_reg_args);
		EEM_Attendee::instance()->reset();
		//verify they still haven't been extended
		$this->assertTrue( $this->_class_has_been_extended( TRUE ) );
		$this->assertTrue( $this->_model_has_been_extended( TRUE ) );
		//and that we can still use EEM_Attendee
		EE_Attendee::new_instance();
		EEM_Attendee::instance()->get_all();
		EE_Registry::instance()->load_model('Attendee')->get_all();

		//now deregister it
		EE_Register_Model_Extensions::deregister($this->_model_group);
		$this->assertFalse( $this->_class_has_been_extended() );
		$this->assertFalse( $this->_model_has_been_extended() );
		EEM_Attendee::instance()->reset();
		//and EEM_Attendee still works right? both ways of instantiating it?
		EE_Attendee::new_instance();
		EEM_Attendee::instance()->get_all();
		EE_Registry::instance()->load_model('Attendee')->get_all();

	}
	public function set_up(){
		parent::set_up();
		//whitelist the table we're about to add
		add_filter( 'FHEE__EEH_Activation__create_table__short_circuit', array($this, 'dont_short_circuit_mock_table' ), 25, 3 );
		//add table from related DMS
		EEH_Activation::create_table('esp_mock_attendee_meta', '
			MATTM_ID int(10) unsigned NOT NULL AUTO_INCREMENT,
			ATT_ID int(10) unsigned NOT NULL,
			ATT_foobar int(10) unsigned NOT NULL,
			PRIMARY KEY  (MATTM_ID)'
				);
		$this->assertTableExists( 'esp_mock_attendee_meta' );

		EE_Register_Model_Extensions::deregister( $this->_model_group );
	}



	/**
	 * OK's the creation of the esp_new_addon table, because this hooks in AFTER EE_UNitTestCase's callback on this same hook
	 *
	 * @param bool   $short_circuit
	 * @param string $table_name
	 * @param string $create_sql
	 * @return array
	 */
	public function dont_short_circuit_mock_table( $short_circuit = false, $table_name = '', $create_sql = '' ){
		$table_analysis = EE_Registry::instance()->create( 'TableAnalysis', array(), true );
		if( $table_name == 'esp_mock_attendee_meta' && ! $table_analysis->tableExists( $table_name) ){
//			echo "\r\n\r\nDONT short circuit $sql";
			//it's not altering. it's ok to allow this
			return false;
		}else{
//			echo "3\r\n\r\n short circuit:$sql";
			return $short_circuit;
		}
	}
	public function tear_down(){
		//ensure the models aren't stil registered. they should have either been
		//deregistered during the test, or not been registered at all
		$this->_stop_pretending_addon_hook_time();
		parent::tear_down();
	}
}

// End of file EE_Register_Model_Test.php
// Location: \tests\testcases\core\libraries\plugin_api\EE_Register_Model_Extensions_Test.php