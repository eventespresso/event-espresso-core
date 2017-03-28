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
        $data_translator = new Model_Data_Translator();
        //note the following offsets that WERE tested originally are actually _invalid_ offsets in that they do not
        //represent a valid timezone in the PHP timezone db. This means that although we coerce them to a valid timezone
        //offset in EEH_DTT_Helper.  Any comparison done with WP's current_time('mysql') will fail because wp is
        //returning the time with the _actual_ offset applied whereas our dates/times are using our coerced valid timezone string.
        // $invalid_offsets = array(-12, -10.5, -7.5, -4.5, -1.5, 1.5, 4.5, 7.5, 10.5)
        $gmt_offsets = array(-11, -9, -6, -3, 0, 3, 6, 9, 12);
        $original_gmt = get_option('gmt_offset');
        $original_timezone = get_option('timezone_string');
        update_option('timezone_string', '');
        foreach($gmt_offsets as $gmt_offset) {
            update_option('gmt_offset', $gmt_offset);
            $now_local_time = current_time('mysql');
            $now_utc_time = current_time('mysql', true);
            if ($gmt_offset === 0 ) {
                //if the offset is 0 then both these values should be equal!
                $this->assertEquals(
                    $now_local_time,
                    $now_utc_time,
                    sprintf('Offset Tested: %s', $gmt_offset)
                );
            } else {
                $this->assertNotEquals(
                    $now_local_time,
                    $now_utc_time,
                    sprintf('Offset Tested: %s', $gmt_offset)
                );
            }
            $model_data = $data_translator::prepare_conditions_query_params_for_models(
                array(
                    'EVT_created'      => mysql_to_rfc3339($now_local_time),
                    'EVT_modified_gmt' => mysql_to_rfc3339($now_utc_time),
                ),
                \EEM_Event::instance(),
                '4.8.36'
            );
            //verify the model data being inputted is in UTC
            $this->assertEquals(
                $now_utc_time,
                date('Y-m-d H:i:s', $model_data['EVT_created']),
                sprintf('Offset Tested: %s', $gmt_offset)
            );
            //NOT in local time
            $this->assertNotEquals(
                $now_local_time,
                $model_data['EVT_created'],
                sprintf('Offset Tested: %s', $gmt_offset)
            );
            //notice that there's no "_gmt" on EVT_modified. That's (currently at least)
            //not a real model field. It just indicates to treat the time already being in UTC
            $this->assertEquals(
                $now_utc_time,
                date('Y-m-d H:i:s', $model_data['EVT_modified']),
                sprintf('Offset Tested: %s', $gmt_offset)
            );
        }
        update_option('gmt_offset', $original_gmt);
        update_option('timezone_string', $original_timezone);
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
