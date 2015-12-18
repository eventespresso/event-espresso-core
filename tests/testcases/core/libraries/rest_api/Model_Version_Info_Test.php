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
 *
 */
class Model_Version_Info_Test extends \EE_UnitTestCase{
	/**
	 * pretend currently we're on 4.8, but they send in a request for 4.6. So this
	 * shoudl return all the changes from 4.7 and 4.8
	 */
	function test_get_all_model_changes_between_requested_version_and_current__req_46_cur_48() {
		$this->_pretend_current_version_48();
		$model_info = new Model_Version_Info( '4.6' );
		$changes = $model_info->model_changes_between_requested_version_and_current();
		$this->assertArrayNotHasKey( '4.8', $changes );
		$this->assertArrayHasKey( '4.8.28', $changes );
	}
	
	/**
	 * Helps us to remember to update the model version info every time we add something 
	 * that would require it to change. AT this point I know something will come up in 4.9
	 * so when that comes, we will need to update the model changes array in Model_Version_Info
	 */
	function test_model_version_info_is_up_to_date() {
		$this->assertTrue( espresso_version() < '4.9.0' );
	}

	/**
	 * pretend currently we're on 4.8, but they send in a request for 4.6. So this
	 * shoudl return all the changes from 4.7 and 4.8
	 * @group ignore
	 */
	function test_get_all_model_changes_between_requested_version_and_current__req_47_cur_48() {
		$this->_pretend_current_version_48();
		$model_info = new Model_Version_Info( '4.7' );
		$changes = $model_info->model_changes_between_requested_version_and_current();
		$this->assertArrayNotHasKey( '4.7', $changes );
		$this->assertArrayHasKey( '4.8', $changes );
	}

	/**
	 * @group ignore
	 */
	function test_get_all_models_for_requested_version__no_registration_payment_model_in_46(){
		//pretend we are at version 4.8, and have the Registration_Payment model
		if( ! isset( \EE_Registry::instance()->non_abstract_db_models[ 'Registration_Payment' ] ) ) {
			\EE_Registry::instance()->non_abstract_db_models[ 'Registration_Payment' ] = 'EE_Registration_Payment';
			$pretend_got_registration_payment = true;
		}else{
			$pretend_got_registration_payment = false;
		}
		//but the request is for 4.6, where there was no such model
		$this->_pretend_current_version_48();

		$model_info = new Model_Version_Info( '4.6' );
		$models = $model_info->models_for_requested_version();
		//cleanup before making an assertion
		if( $pretend_got_registration_payment ) {
			unset( EE_Registry::instance()->non_abstract_db_models[ 'Registration_Payment' ] );
		}
		$this->assertArrayNotHasKey( 'Registration_Payment', $models );
	}

	/**
	 * @group ignore
	 */
	function test_get_all_models_for_requested_version__has_registration_payment_model_in_47(){
		//pretend we are at version 4.8, and have the Registration_Payment model
		if( ! isset( EE_Registry::instance()->non_abstract_db_models[ 'Registration_Payment' ] ) ) {
			EE_Registry::instance()->non_abstract_db_models[ 'Registration_Payment' ] = 'EE_Registration_Payment';
			$pretend_got_registration_payment = true;
		}else{
			$pretend_got_registration_payment = false;
		}
		//but the request is for 4.6, where there was no such model
		$this->_pretend_current_version_48();

		$model_info = new EE_REST_API_Model_Version_Info( '4.7' );

		$models = $model_info->models_for_requested_version();
		//cleanup before making an assertion
		if( $pretend_got_registration_payment ) {
			unset( EE_Registry::instance()->non_abstract_db_models[ 'Registration_Payment' ] );
		}
		$this->assertArrayHasKey( 'Registration_Payment', $models );
	}

	/**
	 * @group ignore
	 */
	function test_fields_on_model_in_this_version__no_reg_paid_in_46() {
		$this->_pretend_added_field_onto_registration_model();
		$this->_pretend_current_version_48();
		$model_info = new EE_REST_API_Model_Version_Info( '4.6' );
		$fields_on_reg = $model_info->fields_on_model_in_this_version( EEM_Registration::instance() );
		$this->assertArrayNotHasKey( 'REG_paid', $fields_on_reg );
	}

	/**
	 * @group ignore
	 */
	function test_fields_on_model_in_this_version__has_reg_paid_in_47() {
		$this->_pretend_added_field_onto_registration_model();
		$this->_pretend_current_version_48();
		$model_info = new EE_REST_API_Model_Version_Info( '4.7' );
		$fields_on_reg = $model_info->fields_on_model_in_this_version( EEM_Registration::instance() );
		$this->assertArrayHasKey( 'REG_paid', $fields_on_reg );
	}
	
	protected function _pretend_current_version_48(){
		add_filter( 'FHEE__EED_Core_REST_API__core_version', array( $this, '_tell_EED_Core_REST_API_current_version_is_48' ) );
	}

	/**
	 * Used on a filter to make the API think core's version is 4.8
	 * @param type $current_version
	 * @return string
	 */
	public function _tell_EED_Core_REST_API_current_version_is_48( $current_version ) {
		return '4.8';
	}

	protected function _pretend_added_field_onto_registration_model(){
		add_filter( 'FHEE__EEM_Registration__construct__fields', array( $this, '_add_reg_paid_field' ) );
		EEM_Registration::reset();
	}

	public function _add_reg_paid_field( $reg_fields ) {
		if( ! isset( $reg_fields[ 'Registration'][ 'REG_paid' ] ) ) {
			$reg_fields[ 'Registration'][ 'REG_paid' ] = new EE_Money_Field( 'REG_paid', __( 'Amount paid for registration', 'event_espresso' ), true );
		}
		return $reg_fields;
	}
}

// End of file EE_REST_API_Model_Version_Info_Test.php