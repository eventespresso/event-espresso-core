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
 * @group activation
 */
class EE_System_Test extends EE_UnitTestCase{
	protected $_mock_addon_name = 'New_Addon';
	/**
	 * holds the wp option espresso_db_update's value so
	 * it can be restored after these tests are run
	 * @var array
	 */
	protected $_original_espresso_db_update;

	protected $_original_db_state;
	/**
	 * remember teh espresso_db_update's option before these tests
	 */
	function set_up() {
		parent::set_up();
		$this->_original_espresso_db_update = get_option('espresso_db_update');
		$this->_original_db_state = get_option( EE_Data_Migration_Manager::current_database_state );
		EE_System::reset();
	}
	public function test_detect_request_type(){

		$this->_pretend_espresso_db_update_is(array(
			espresso_version() => array(current_time('mysql'))
		));
		$request_type = EE_System::reset()->detect_req_type();
		$this->assertEquals(EE_System::req_type_normal,$request_type);
		//check that it detects an upgrade
		$this->_pretend_espresso_db_update_is(array(
			$this->_add_to_version(espresso_version(), '0.-1.0.0.0') => array(current_time('mysql'))
		));
		$request_type = EE_System::reset()->detect_req_type();
		$this->assertEquals(EE_System::req_type_upgrade,$request_type);
		//check that it detects activation
		$this->_pretend_espresso_db_update_is(NULL);
		$request_type = EE_System::reset()->detect_req_type();
		$this->assertEquals(EE_System::req_type_new_activation,$request_type);
		//check that it detects downgrade, even though we don't really care atm
//		EE_System::reset();
//		$this->_pretend_espresso_db_upgrade_is(array(
//			$this->_add_to_version(espresso_version(), '0.1.0.0.0') => array(current_time('mysql'))
//		));
//		$request_type = EE_System::instance()->detect_req_type();
//		$this->assertEquals(EE_System::req_type_downgrade,$request_type);
		//lastly, check that we detect reactivations
		update_option('ee_espresso_activation',true);
		$this->_pretend_espresso_db_update_is(array(
				espresso_version() => array(current_time('mysql'))
				));
		$request_type = EE_System::reset()->detect_req_type();
		$this->assertEquals(EE_System::req_type_reactivation,$request_type);
	}
	/**
	 * just tests the EE_System_Test::_add_to_version private method to make sure it's working
	 * (because other tests depend on it)
	 */
	function test_add_to_version(){
		$version = '4.3.2.alpha.001';
		$version_to_add = '1.0.-1.1.1';
		$new_version = $this->_add_to_version($version, $version_to_add);
		$this->assertEquals('5.3.1.alpha.002',$new_version);
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
		$this->assertArrayHasKey( espresso_version(), $current_activation_history_after );
		$this->assertTimeIsAbout(current_time( 'timestamp' ), $current_activation_history_after[ espresso_version() ][ 0 ] );

	}
	/**
	 * new activation
	 */
	function test_detect_activation_or_upgrade__new_install() {
		$this->_pretend_espresso_db_update_is(NULL);
		//pretend the activation indicator option was set (because it's really unusual
		//for a plugin to be activated without having WP call its activation hook)
		update_option('ee_espresso_activation',TRUE);
		remove_action('AHEE__EE_System__perform_activations_upgrades_and_migrations',array(EE_System::instance(),'initialize_db_if_no_migrations_required'));
		$this->assertWPOptionDoesNotExist('espresso_db_update');
		EE_System::reset()->detect_if_activation_or_upgrade();
		$current_activation_history = get_option('espresso_db_update');
		//check we've added this to the version history
		//and that the hook for adding tables n stuff was added
		$this->assertArrayHasKey( espresso_version(), $current_activation_history );
		$this->assertTimeIsAbout(current_time( 'timestamp' ), $current_activation_history[ espresso_version() ][ 0 ] );
		has_action('AHEE__EE_System__perform_activations_upgrades_and_migrations',array(EE_System::instance(),'initialize_db_if_no_migrations_required'));
		//and the activation indicator option shoudl have been removed
		$this->assertWPOptionDoesNotExist('ee_espresso_activation');
	}

	/**
	 * tests EE_SYstem_Test::assertTimeIsAbout
	 */
	public function test_assertTimeIsAbout(){
		//these tests should fail
		try{
			$this->assertTimeIsAbout(current_time( 'timestamp' ), current_time( 'timestamp' ) + 6, 5 );
		}catch( PHPUnit_Framework_ExpectationFailedException $e ){
			$this->assertTrue( TRUE );
		}
		try{
			$this->assertTimeIsAbout(current_time( 'timestamp' ), current_time( 'timestamp' ) - 6, 5 );
		}catch( PHPUnit_Framework_ExpectationFailedException $e ){
			$this->assertTrue( TRUE );
		}
		$this->assertTimeIsAbout( current_time( 'timestamp' ), current_time( 'timestamp' ) + 4, 5 );
		$this->assertTimeIsAbout( current_time( 'timestamp' ), current_time( 'timestamp' ) - 3, 5 );
	}

	/**
	 * Asserts that there is at most $precision time difference between $expected_time and
	 * $actual_time, in either direction
	 * @param string|int $expected_time mysql or unix timestamp
	 * @param string|int $actual_time mysql or unix timestamp
	 * @param int $precision allowed number of seconds of time idfference without failing
	 */
	protected function assertTimeIsAbout($expected_time, $actual_time, $precision = 5) {
		if( ! is_int( $expected_time ) ){
			$expected_time = strtotime( $expected_time );
		}
		if( ! is_int( $actual_time ) ){
			$actual_time = strtotime( $actual_time );
		}
		$this->assertLessThanOrEqual($precision, abs( $actual_time - $expected_time ) );
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

		EE_System::reset()->detect_if_activation_or_upgrade();
		$current_activation_history = get_option('espresso_db_update');
		$this->assertEquals(EE_System::req_type_upgrade,EE_System::instance()->detect_req_type());
		$this->assertArrayHasKey( $pretend_previous_version, $current_activation_history );
		$this->assertTimeIsAbout(current_time( 'timestamp' ), $current_activation_history[ $pretend_previous_version ][ 0 ] );
		$this->assertArrayHasKey( espresso_version(), $current_activation_history );
		$this->assertTimeIsAbout(current_time( 'timestamp' ), $current_activation_history[ espresso_version() ][ 0 ] );

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

		$this->assertEquals(EE_System::req_type_upgrade,EE_System::reset()->detect_req_type());
		$current_activation_history = get_option('espresso_db_update');
		$this->assertArrayHasKey( $pretend_previous_version, $current_activation_history );
		$this->assertTimeIsAbout(current_time( 'timestamp' ), $current_activation_history[ $pretend_previous_version ][ 0 ] );
		$this->assertArrayHasKey( espresso_version(), $current_activation_history );
		$this->assertTimeIsAbout(current_time( 'timestamp' ), $current_activation_history[ espresso_version() ][ 0 ] );
		$this->assertWPOptionDoesNotExist('ee_espresso_activation');
	}
	function test_detect_activation_or_upgrade__reactivation(){
		$this->_pretend_espresso_db_update_is(array(
				espresso_version() => array(current_time('mysql'))
				));
		update_option('ee_espresso_activation',true);

		$this->assertEquals(EE_System::req_type_reactivation,EE_System::reset()->detect_req_type());
		$current_activation_history = get_option('espresso_db_update');
//		$this->assertEquals(array(espresso_version() =>array(current_time('mysql'),current_time('mysql'))),$current_activation_history);
		$this->assertArrayHasKey( espresso_version(), $current_activation_history );
		$this->assertTimeIsAbout(current_time( 'timestamp' ), $current_activation_history[ espresso_version() ][ 0 ] );
		$this->assertTimeIsAbout(current_time( 'timestamp' ), $current_activation_history[ espresso_version() ][ 1 ] );
		$this->assertWPOptionDoesNotExist('ee_espresso_activation');
	}
	function test_detect_activation_or_upgrade__downgrade_upon_normal_request(){
		$pretend_previous_version = $this->_add_to_version(espresso_version(),'0.1.0.0.0');
		$this->_pretend_espresso_db_update_is(array(
				 $pretend_previous_version => array(current_time('mysql'))
				));
		$this->assertEquals(EE_System::req_type_downgrade,EE_System::reset()->detect_req_type());
		$current_activation_history = get_option('espresso_db_update');
		$this->assertArrayHasKey( $pretend_previous_version, $current_activation_history );
		$this->assertTimeIsAbout(current_time( 'timestamp' ), $current_activation_history[ $pretend_previous_version ][ 0 ] );
		$this->assertArrayHasKey( espresso_version(), $current_activation_history );
		$this->assertTimeIsAbout(current_time( 'timestamp' ), $current_activation_history[ espresso_version() ][ 0 ] );
		$this->assertWPOptionDoesNotExist('ee_espresso_activation');
	}
	/**
	 * tests that we're detecting request types correctly on normal requests (ie, NOT an activation request)
	 * A new install would only occur on a non-activation request because the site was previously in maintenance mode
	 *
	 */
	function test_detect_req_type_given_activation_history__on_normal_requests(){
		$activation_history = array();

		//detect brand new activation BUT we're in maintenance mode, so it will be basically ignored
		EE_Maintenance_Mode::instance()->set_maintenance_level( EE_Maintenance_Mode::level_2_complete_maintenance );
		$this->assertEquals( EE_System::req_type_new_activation, EE_System::detect_req_type_given_activation_history($activation_history, '', '1.0.0.dev.000' ) );
		EE_Maintenance_Mode::instance()->set_maintenance_level( EE_Maintenance_Mode::level_0_not_in_maintenance );

		//detect brand new activation
		$this->assertEquals( EE_System::req_type_new_activation, EE_System::detect_req_type_given_activation_history($activation_history, '', '1.0.0.dev.000' ) );
		$activation_history[ '1.0.0.dev.000'] = array( date( 'Y-m-d H:i:s' ) );

		//detect upgrade to NEW version
		$this->assertEquals( EE_System::req_type_upgrade, EE_System::detect_req_type_given_activation_history($activation_history, '', '1.2.0.dev.000' ) );
		$activation_history[ '1.2.0.dev.000' ] = array( date( 'Y-m-d H:i:s', time() + 1 ) );

		//detect normal request
		$this->assertEquals( EE_System::req_type_normal, EE_System::detect_req_type_given_activation_history($activation_history, '', '1.2.0.dev.000' ) );

		//detect downgrade to NEW version
		$this->assertEquals( EE_System::req_type_downgrade, EE_System::detect_req_type_given_activation_history($activation_history, '', '1.1.0.dev.000' ) );
		$activation_history[ '1.1.0.dev.000' ] = array( date( 'Y-m-d H:i:s', time() + 2 ) );

		//detect downgrade to KNOWN version
		$this->assertEquals( EE_System::req_type_downgrade, EE_System::detect_req_type_given_activation_history($activation_history, '', '1.0.0.dev.000' ) );
		$activation_history[ '1.0.0.dev.000' ][] =  date( 'Y-m-d H:i:s', time() + 3 ) ;

		//detect upgrade to KNOWN version
		$this->assertEquals( EE_System::req_type_upgrade, EE_System::detect_req_type_given_activation_history($activation_history, '', '1.1.0.dev.000' ) );
		$activation_history[ '1.1.0.dev.000' ][] =  date( 'Y-m-d H:i:s', time() + 4 ) ;
	}

	/**
	 * tests that we are detecting activations correctly even when the same version has
	 * been activated multiple times
	 */
	function test_detect_req_type_given_activation_history__multiple_activations(){
		$activation_history = array(
			'3.1.36.5.P' => array( 'unknown-date' ),
			'4.3.0.alpha.019' => array( '2014-06-09 18:10:35', ),
			'4.6.0.dev.016' => array(
				'2014-10-15 15:43:08',
				'2014-10-15 18:16:41',
				'2014-10-15 20:09:07'
			),
			'4.5.0.beta.020' => array(
				'2014-10-15 16:52:35',
			)

		);
		$this->assertEquals( EE_System::req_type_downgrade, EE_System::detect_req_type_given_activation_history($activation_history, '', '4.5.0.beta.020' ) );
	}
	/**
	 *
	 */
	function test_detect_req_type_given_activation_history__on_activation(){
		$activation_history = array();
		update_option( 'test_activation_indicator_option', TRUE );

		//detect brand new activation
		$this->assertEquals( EE_System::req_type_new_activation, EE_System::detect_req_type_given_activation_history($activation_history, 'test_activation_indicator_option', '1.0.0.dev.000' ) );
		$activation_history[ '1.0.0.dev.000'] = array( date( 'Y-m-d H:i:s' ) );
		update_option( 'test_activation_indicator_option', TRUE );

		//detect upgrade to NEW version
		$this->assertEquals( EE_System::req_type_upgrade, EE_System::detect_req_type_given_activation_history($activation_history, 'test_activation_indicator_option', '1.2.0.dev.000' ) );
		$activation_history[ '1.2.0.dev.000' ] = array( date( 'Y-m-d H:i:s', time() + 1 ) );
		update_option( 'test_activation_indicator_option', TRUE );

		//detect reactivation request; WOULD be a normal request if the activation indicator weren't set
		$this->assertEquals( EE_System::req_type_reactivation, EE_System::detect_req_type_given_activation_history($activation_history, 'test_activation_indicator_option', '1.2.0.dev.000' ) );

		//detect downgrade to NEW version
		$this->assertEquals( EE_System::req_type_downgrade, EE_System::detect_req_type_given_activation_history($activation_history, 'test_activation_indicator_option', '1.1.0.dev.000' ) );
		$activation_history[ '1.1.0.dev.000' ] = array( date( 'Y-m-d H:i:s', time() + 2 ) );
		update_option( 'test_activation_indicator_option', TRUE );

		//detect downgrade to KNOWN version
		$this->assertEquals( EE_System::req_type_downgrade, EE_System::detect_req_type_given_activation_history($activation_history, 'test_activation_indicator_option', '1.0.0.dev.000' ) );
		$activation_history[ '1.0.0.dev.000' ][] =  date( 'Y-m-d H:i:s', time() + 3 ) ;
		update_option( 'test_activation_indicator_option', TRUE );

		//detect upgrade to KNOWN version
		$this->assertEquals( EE_System::req_type_upgrade, EE_System::detect_req_type_given_activation_history($activation_history, 'test_activation_indicator_option', '1.1.0.dev.000' ) );
		$activation_history[ '1.1.0.dev.000' ][] =  date( 'Y-m-d H:i:s', time() + 4 ) ;
		update_option( 'test_activation_indicator_option', TRUE );
	}

	/**
	 * @group 8154
	 */
	function test__new_version_is_higher(){
		$class = new ReflectionClass("EE_System");
		$method = $class->getMethod("_new_version_is_higher");
		$method->setAccessible(true);

		$current_version = '4.7.0.rc.000';
		$activation_history = array(
			$current_version => array(
				'2015-03-12 04:53:12'
			),
			'3.1.37.1.P'      =>
        array(
            0 => 'unknown-date',
        ),
		);
		$this->assertEquals( 0, $method->invoke(EE_System::instance(), $activation_history, $current_version ) );
		$this->assertEquals( 1, $method->invoke( EE_System::instance(), $activation_history, '4.8.0.rc.000' ) );
		$this->assertEquals( -1, $method->invoke( EE_System::instance(), $activation_history, '4.4.0.rc.000' ) );
		$this->assertEquals( 1, $method->invoke( EE_System::instance(), array(), '4.8.0.rc.000' ) );
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
	private function _add_to_version($version_string,$version_amount_to_add = '0.1.0.0.0'){
		$version_parts = explode(".",$version_string);
		$version_amount_to_add_parts = explode(".",$version_amount_to_add);
		foreach($version_parts as $key => $version_part){
			if(is_numeric($version_part)){
				$characters_in_version_part = strlen( $version_part );
				$version_parts[$key] = str_pad( $version_parts[$key] + $version_amount_to_add_parts[$key], $characters_in_version_part, '0', STR_PAD_LEFT );
			}
		}
		return implode(".",$version_parts);
	}
	/**
	 * restore the epsresso_db_update option
	 */
	function tear_down() {
		update_option('espresso_db_update',$this->_original_espresso_db_update);
		EE_System::reset()->detect_req_type();
		EE_Data_Migration_Manager::reset();
		update_option( EE_Data_Migration_Manager::current_database_state, $this->_original_db_state );
		parent::tear_down();
	}
}

// End of file EE_System_Test.php