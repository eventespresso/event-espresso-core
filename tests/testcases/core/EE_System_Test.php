<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_System_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
/**
 * @group core
 */
class EE_System_Test extends EE_UnitTestCase{
	protected $_mock_addon_name = 'New_Addon';
	/**
	 * holds the wp option espresso_db_update's value so
	 * it can be restored after these tests are run
	 * @var array
	 */
	protected $_original_espresso_db_update;
	/**
	 * remember teh espresso_db_update's option before these tests
	 */
	function setUp() {
		$this->_original_espresso_db_update = get_option('espresso_db_update');
		EE_System::reset();
		parent::setUp();
	}
	public function test_detect_request_type(){

		$this->_pretend_espresso_db_update_is(array(
			espresso_version() => array(current_time('mysql'))
		));
		$request_type = EE_System::instance()->detect_req_type();
		$this->assertEquals(EE_System::req_type_normal,$request_type);
		//check that it detects an upgrade
		EE_System::reset();
		$this->_pretend_espresso_db_update_is(array(
			$this->_add_to_version(espresso_version(), '0.0.-1.0.0') => array(current_time('mysql'))
		));
		$request_type = EE_System::instance()->detect_req_type();
		$this->assertEquals(EE_System::req_type_upgrade,$request_type);
		//check that it detects activation
		EE_System::reset();
		$this->_pretend_espresso_db_update_is(NULL);
		$request_type = EE_System::instance()->detect_req_type();
		$this->assertEquals(EE_System::req_type_new_activation,$request_type);
		//check that it detects downgrade, even though we don't really care atm
//		EE_System::reset();
//		$this->_pretend_espresso_db_upgrade_is(array(
//			$this->_add_to_version(espresso_version(), '0.1.0.0.0') => array(current_time('mysql'))
//		));
//		$request_type = EE_System::instance()->detect_req_type();
//		$this->assertEquals(EE_System::req_type_downgrade,$request_type);
		//lastly, check that we detect reactivations
		EE_System::reset();
		update_option('ee_espresso_activation',true);
		$this->_pretend_espresso_db_update_is(array(
				espresso_version() => array(current_time('mysql'))
				));
		$request_type = EE_System::instance()->detect_req_type();
		$this->assertEquals(EE_System::req_type_reactivation,$request_type);
	}
	/**
	 * just tests the EE_System_Test::_add_to_version private method to make sure it's working
	 * (because other tests depend on it)
	 */
	function test_add_to_version(){
		$version = '4.3.2.alpha.1';
		$version_to_add = '1.0.-1.1.1';
		$new_version = $this->_add_to_version($version, $version_to_add);
		$this->assertEquals('5.3.1.alpha.2',$new_version);
	}
	/**
	 * check things turn out as expected for NORMAL REQUEST
	 */
	function test_detect_activation_or_upgrade__normal(){
		delete_option( 'ee_espresso_activation' );
		$pretend_activation_history = array(
			espresso_version() => array(current_time('mysql'))
		);
		$this->_pretend_espresso_db_update_is($pretend_activation_history);
		$current_activation_history_before = get_option('espresso_db_update');
		$this->assertEquals(1,count($current_activation_history_before[espresso_version()]));
		EE_System::instance()->detect_if_activation_or_upgrade();
		$current_activation_history_after = get_option('espresso_db_update');
		//this should have just added to the number of times this same verison was activated
		$this->assertEquals(EE_System::req_type_normal,EE_System::instance()->detect_req_type());
		$this->assertEquals($pretend_activation_history,$current_activation_history_after);

	}
	/**
	 * new activation
	 */
	function test_detect_activation_or_upgrade__new_install(){
		$this->_pretend_espresso_db_update_is(NULL);
		//pretend the activation indicator option was set (because it's really unusual
		//for a plugin to be activated without having WP call its activation hook)
		update_option('ee_espresso_activation',TRUE);
		remove_action('AHEE__EE_System__perform_activations_upgrades_and_migrations',array(EE_System::instance(),'initialize_db_if_no_migrations_required'));
		$this->assertWPOptionDoesNotExist('espresso_db_update');
		EE_System::instance()->detect_if_activation_or_upgrade();
		$current_activation_history = get_option('espresso_db_update');
		//check we've added this to the version history
		//and that the hook for adding tables n stuff was added
		$this->assertEquals(array(espresso_version()=>array(current_time('mysql'))),$current_activation_history);
		has_action('AHEE__EE_System__perform_activations_upgrades_and_migrations',array(EE_System::instance(),'initialize_db_if_no_migrations_required'));
		//and the activation indicator option shoudl have been removed
		$this->assertWPOptionDoesNotExist('ee_espresso_activation');
	}
	/**
	 * tests we can detect an upgrade when the plugin is deactivated, then a new version of the plugin
	 * is uploaded, and then activated (ie, the plugin's activation hook was fired)
	 */
	function test_detect_activation_or_upgrade__upgrade_upon_activation(){
		$pretend_previous_version = $this->_add_to_version(espresso_version(),'0.-1.0.0.0');
		$this->_pretend_espresso_db_update_is(array(
				 $pretend_previous_version => array(current_time('mysql'))
				));
		//pretend the activation indicator option was set (because it's really unusual
		//for a plugin to be activated without having WP call its activation hook)
		update_option('ee_espresso_activation',TRUE);

		EE_System::instance()->detect_if_activation_or_upgrade();
		$current_activation_history = get_option('espresso_db_update');
		$this->assertEquals(EE_System::req_type_upgrade,EE_System::instance()->detect_req_type());
		$this->assertEquals(
				array(
					$pretend_previous_version=>array(current_time('mysql')),
					espresso_version()=>array(current_time('mysql'))),
				$current_activation_history);
		$this->assertWPOptionDoesNotExist('ee_espresso_activation');
	}
	/**
	 * tests we can detect an upgrade when the plugin files were automatically
	 * updated (ie, the plugins' activation hook wasn't called)
	 */
	function test_detect_activation_or_upgrade__upgrade_upon_normal_request(){
		$pretend_previous_version = $this->_add_to_version(espresso_version(),'0.-1.0.0.0');
		$this->_pretend_espresso_db_update_is(array(
				 $pretend_previous_version => array(current_time('mysql'))
				));
		EE_System::instance()->detect_if_activation_or_upgrade();
		$current_activation_history = get_option('espresso_db_update');
		$this->assertEquals(EE_System::req_type_upgrade,EE_System::instance()->detect_req_type());
		$this->assertEquals(
				array(
					$pretend_previous_version=>array(current_time('mysql')),
					espresso_version()=>array(current_time('mysql'))),
				$current_activation_history);
		$this->assertWPOptionDoesNotExist('ee_espresso_activation');
	}
	function test_detect_activation_or_upgrade__reactivation(){
		$this->_pretend_espresso_db_update_is(array(
				espresso_version() => array(current_time('mysql'))
				));
		update_option('ee_espresso_activation',true);
		EE_System::instance()->detect_if_activation_or_upgrade();
		$current_activation_history = get_option('espresso_db_update');
		$this->assertEquals(EE_System::req_type_reactivation,EE_System::instance()->detect_req_type());
		$this->assertEquals(array(espresso_version() =>array(current_time('mysql'),current_time('mysql'))),$current_activation_history);
		$this->assertWPOptionDoesNotExist('ee_espresso_activation');
	}


	/**
	 * Sets the wordpress option 'espresso_db_update'
	 * @param array $espresso_db_upgrade top-level-keys shoudl be version numbers,
	 * and their values should be an array of mysql datetimes when that version was activated
	 */
	private function _pretend_espresso_db_update_is($espresso_db_upgrade){
		if($espresso_db_upgrade === NULL){
			delete_option('espresso_db_update',$espresso_db_upgrade);
		}else{
			update_option( 'espresso_db_update',$espresso_db_upgrade );
		}
	}

	/**
	 *
	 * @param string $version_string eg "4.3.2.alpha.003
	 * @param string $version_amount_to_add eg "0.0.0.0.1"
	 * @return string eg if given the mentioned inputs, would be "4.3.2.alpha.4";
	 */
	private function _add_to_version($version_string,$version_amount_to_add = '0.0.1'){
		$version_parts = explode(".",$version_string);
		$version_amount_to_add_parts = explode(".",$version_amount_to_add);
		foreach($version_parts as $key => $version_part){
			if(is_numeric($version_part)){
				$version_parts[$key] = $version_parts[$key] + $version_amount_to_add_parts[$key];
			}
		}
		return implode(".",$version_parts);
	}
	/**
	 * restore the epsresso_db_update option
	 */
	function tearDown() {
		update_option('espresso_db_update',$this->_original_espresso_db_update);
		EE_System::reset()->detect_req_type();
		parent::tearDown();
	}
}

// End of file EE_System_Test.php