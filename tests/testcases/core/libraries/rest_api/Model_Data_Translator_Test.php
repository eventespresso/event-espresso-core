<?php

use EventEspresso\core\libraries\rest_api\Model_Data_Translator;
/**
 *
 * Class Model_Data_Translator_Test
 *
 * Description here
 *
 * @package         Event Espresso
 * @subpackage
 * @author				Mike Nelson
 * @since		 	   $VID:$
 * @group rest_api
 *
 */
if( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

class Model_Data_Translator_Test extends EE_UnitTestCase{

	public function setUp() {
		parent::setUp();
		if ( ! class_exists( 'WP_Rest_Request' ) ) {
			$this->markTestSkipped(
				'Test being run on a version of WP that does not have the REST framework installed'
			);
		}
	}

	public function test_prepare_query_params_for_rest_api() {
		$mysql_date = '2015-01-01 00:00:00';
		$statuses_in_query = array(
			EEM_Registration::status_id_cancelled,
			EEM_Registration::status_id_declined
		);
		$model_query = array(
			array(
				'STS_ID' => array(
					'IN',
					$statuses_in_query
				),
				'REG_date' => strtotime( $mysql_date ),
				'REG_deleted' => false
			),
			'limit' => 10
		);
		$rest_query = Model_Data_Translator::prepare_query_params_for_rest_api( $model_query, EEM_Registration::instance() );
		//assert the reg date matches and is in the right format
		$this->assertArrayHasKey( 'where', $rest_query );
		$this->assertArrayHasKey( 'REG_date', $rest_query[ 'where' ] );
		$this->assertEquals( strtotime( $mysql_date ), rest_parse_date( $rest_query[ 'where' ][ 'REG_date' ] ) );
		//assert statuses got translated
		$this->assertArrayHasKey( 'STS_ID', $rest_query[ 'where' ] );
		$this->assertEquals( $statuses_in_query, $rest_query[ 'where' ][ 'STS_ID' ][1]);
		//assert limit got translated
		$this->assertArrayHasKey( 'limit', $rest_query );
		$this->assertEquals( 10, (int)$rest_query[ 'limit' ] );
		//assert booleans correctly translated
		$this->assertArrayHasKey( 'REG_deleted', $rest_query[ 'where' ] );
		$this->assertEquals( false, $rest_query[ 'where' ][ 'REG_deleted' ] );
	}

	/**
	 * Verifies prepare_conditions_query_params_for_models works properly,
	 * especially with datetimes which can be in UTC or local time
	 */
	public function test_prepare_conditions_query_params_for_models__gmt_datetimes() {
        update_option('gmt_offset', '');
        $data_translator = new Model_Data_Translator();
        $gmt_offsets = array(-12, -10.5, -9, -7.5, -6, -4.5, -3, -1.5, 0, 1.5, 3, 4.5, 6, 7.5, 9, 10.5, 12);
        foreach($gmt_offsets as $gmt_offset) {
            $TZ_NAME = \EEH_DTT_Helper::get_timezone_string_from_gmt_offset($gmt_offset);
            update_option('timezone_string', $TZ_NAME);
            $now_local_time = current_time('mysql');
            $now_utc_time = current_time('mysql', true);
            $this->assertNotEquals($now_local_time, $now_utc_time);
            $model_data = $data_translator::prepare_conditions_query_params_for_models(
                array(
                    'EVT_created'      => mysql_to_rfc3339($now_local_time),
                    'EVT_modified_gmt' => mysql_to_rfc3339($now_utc_time),
                ),
                \EEM_Event::instance(),
                '4.8.36'
            );
            //verify the model data being inputted is in UTC
            $this->assertEquals($now_utc_time, date('Y-m-d H:i:s', $model_data['EVT_created']));
            //NOT in local time
            $this->assertNotEquals($now_local_time, $model_data['EVT_created']);
            //notice that there's no "_gmt" on EVT_modified. That's (currently at least)
            //not a real model field. It just indicates to treat the time already being in UTC
            $this->assertEquals($now_utc_time, date('Y-m-d H:i:s', $model_data['EVT_modified']));
        }

	}

	public function test_is_gmt_date_field_name__success() {
		$this->assertTrue( Model_Data_Translator::is_gmt_date_field_name( 'Event.EVT_created_gmt' ) );
	}
	public function test_is_gmt_date_field_name__fail() {
		$this->assertFalse( Model_Data_Translator::is_gmt_date_field_name( 'Event.EVT_created' ) );
	}
	public function test_is_gmt_date_field_name__fail_tiny_input() {
		$this->assertFalse( Model_Data_Translator::is_gmt_date_field_name( 'foo' ) );
	}

	public function test_remove_gmt_from_field_name() {
		$this->assertEquals(
			'Event.EVT_created',
			Model_Data_Translator::remove_gmt_from_field_name( 'Event.EVT_created_gmt' ) );
	}
	public function test_remove_gmt_from_field_name__no_gmt_anyways() {
		$this->assertEquals(
			'Event.EVT_created',
			Model_Data_Translator::remove_gmt_from_field_name( 'Event.EVT_created' ) );
	}
}

// Location: tests/testcases/core/libraries/rest_api/Model_Data_Translator_Test.php
