<?php
namespace EventEspresso\core\libraries\rest_api;
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * Model_Version_Info_Test
 * 
 * Mostly these tests should be skipped until they have something to do again
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 * @group rest_api
 *
 */
class Model_Version_Info_Test extends \EE_UnitTestCase{
	
	public function setUp() {
		parent::setUp();
		if ( ! class_exists( 'WP_Rest_Request' ) ) {
			$this->markTestSkipped(
				'Test being run on a version of WP that does not have the REST framework installed'
			);
		}
	}
	
	/**
	 * pretend currently we're on 4.9, but they send in a request for 4.8. So this
	 * shoudl return all the changes from 4.9
	 */
	function test_get_all_model_changes_between_requested_version_and_current__req_46_cur_49() {
		$this->_pretend_current_version_49();
		$model_info = new ModelVersionInfo( '4.8.29' );
		$changes = $model_info->modelChangesBetweenRequestedVersionAndCurrent();
		$this->assertArrayNotHasKey( '4.8.29', $changes );
	}

	/**
	 * @group ignore 
	 * needs to be updated once there is a new field added
	 */
	function test_fields_on_model_in_this_version__no_reg_paid_in_46() {
		$this->_pretend_added_field_onto_registration_model();
		$this->_pretend_current_version_49();
		$model_info = new ModelVersionInfo( '4.6' );
		$fields_on_reg = $model_info->fieldsOnModelInThisVersion( \EEM_Registration::instance() );
		$this->assertArrayNotHasKey( 'REG_paid', $fields_on_reg );
	}

	/**
	 * @group ignore 
	 * needs to be updated once there is a new field added
	 */
	function test_fields_on_model_in_this_version__has_reg_paid_in_47() {
		$this->_pretend_added_field_onto_registration_model();
		$this->_pretend_current_version_49();
		$model_info = new ModelVersionInfo( '4.7' );
		$fields_on_reg = $model_info->fieldsOnModelInThisVersion( \EEM_Registration::instance() );
		$this->assertArrayHasKey( 'REG_paid', $fields_on_reg );
	}
	
	protected function _pretend_current_version_49(){
		add_filter( 'FHEE__EED_Core_REST_API__core_version', array( $this, '_tell_EED_Core_REST_API_current_version_is_49' ) );
	}

	/**
	 * Used on a filter to make the API think core's version is 4.8
	 * @param type $current_version
	 * @return string
	 */
	public function _tell_EED_Core_REST_API_current_version_is_49( $current_version ) {
		return '4.9.2';
	}

	protected function _pretend_added_field_onto_registration_model(){
		add_filter( 'FHEE__EEM_Registration__construct__fields', array( $this, '_add_reg_paid_field' ) );
		\EEM_Registration::reset();
	}

	public function _add_reg_paid_field( $reg_fields ) {
		if( ! isset( $reg_fields[ 'Registration'][ 'REG_paid' ] ) ) {
			$reg_fields[ 'Registration'][ 'REG_paid' ] = new \EE_Money_Field( 'REG_paid', esc_html__( 'Amount paid for registration', 'event_espresso' ), true );
		}
		return $reg_fields;
	}
}

// End of file EE_REST_API_Model_Version_Info_Test.php