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
	    $this->markTestSkipped('Temporarily until https://events.codebasehq.com/projects/event-espresso/tickets/10626 is released');
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



    /**
     * @return array{
     * @type mixed input
     * @type mixed expected output
     * @type EE_Model_Field_Base $field_obj
     * @type string timezone string, optional
     *              }
     */
	public function data_provider_for_prepare_field_value_for_json(){
	    $field_obj = EE_Registry::instance()->load_model('Datetime')->field_settings_for('DTT_EVT_start');
	    //datetime tests with the default timezone
        $test_data = array(
            'datetime_object_in_default_timezone' => array(
                mysql_to_rfc3339(current_time('mysql')),
                new DateTime('now'),
                $field_obj
            ),
            'unix_timestamp_in_default_timezone' => array(
                mysql_to_rfc3339(date( EE_Datetime_Field::mysql_timestamp_format, 946782245)),
                946782245,
                $field_obj
            ),
            'unix_timestamp_STRING_in_default_timezone' => array(
                mysql_to_rfc3339(date( EE_Datetime_Field::mysql_timestamp_format, 946782245)),
                '946782245',
                $field_obj
            ),
            'null' => array(
                '',
                null,
                $field_obj
            ),
            'mysql_in_default_timezone' => array(
                mysql_to_rfc3339('2000-01-02 03:04:05'),
                '2000-01-02 03:04:05',
                $field_obj
            ),
            'datetime_object_in_different_timezone' => array(
                mysql_to_rfc3339('2000-01-02 03:04:05'),
                new DateTime('2000-01-02 03:04:05', new DateTimeZone('America/Vancouver')),
                $field_obj,
                'America/Vancouver'
            ),
            //the input is a unix timestamp (in GMT)
            //the result should be a RFC3339 string also in GMT
            'unix_timestamp_in_different_timezone' => array(
                mysql_to_rfc3339('2000-01-02 03:04:05'),
                946782245,
                $field_obj,
                'America/Vancouver'
            ),
            //so the input is for 3am Vancouver time, and the output should be too
            'mysql_datetime_in_different_timezone' => array(
                mysql_to_rfc3339('2000-01-02 03:04:05'),
                '2000-01-02 3:04:05',
                $field_obj,
                'America/Vancouver'
            ),
        );
	    return $test_data;
    }



    /**
     * @dataProvider data_provider_for_prepare_field_value_for_json
     * @group 10869
     */
	public function test_prepare_field_value_for_json( $expected, $input, EE_Model_Field_Base $field_obj, $timezone = ''){
        if($field_obj instanceof EE_Datetime_Field){
            $field_obj->set_timezone($timezone);
        }
	    $this->assertEquals(
            $expected,
            Model_Data_Translator::prepare_field_value_for_json($field_obj,$input, '4.8.36')
        );
    }



    /**
     * Reproduced issue https://events.codebasehq.com/projects/event-espresso/tickets/10869
     * and https://events.codebasehq.com/projects/event-espresso/tickets/10858 by changing
     * the site date format to 'd/m/Y'
     */
    public function test_prepare_field_value_for_json__unusual_date_format(){
	    $field_obj = EE_Registry::instance()->load_model('Datetime')->field_settings_for('DTT_EVT_start');
	    if($field_obj instanceof EE_Datetime_Field){
	        //change the date format because it used to make this not work
	        $field_obj->set_date_format('d/m/Y');
	        //the default time format excludes seconds,
	        $field_obj->set_time_format('g:i a s');
        }
        $current_time_mysql = current_time('mysql');
	    $datetime = new DateTime( $current_time_mysql );
        $formats = EE_Registry::instance()->load_model('Datetime')->get_formats_for('DTT_EVT_start');
        $date_in_site_format = $datetime->format(implode(' ', $formats));
        $this->assertEquals(
            mysql_to_rfc3339($current_time_mysql),
            Model_Data_Translator::prepare_field_value_for_json(
                $field_obj,
                $date_in_site_format,
                '4.8.36'
            )
        );
    }



    /**
     * If you pass in an empty string, it's the same as using the current time in the field's timezone
     * @group 10869
     */
    public function test_prepare_field_value_for_json__passing_in_empty_string(){
        $field_obj = EE_Registry::instance()->load_model('Datetime')->field_settings_for('DTT_EVT_start');
        $field_obj->set_timezone('America/Vancouver');
        update_option('timezone_string', 'America/Vancouver');
        $this->assertEquals(
            mysql_to_rfc3339(current_time('mysql'), false),
            Model_Data_Translator::prepare_field_value_for_json(
                $field_obj,
                '',
                '4.8.36'
            )
        );
    }
}

// Location: tests/testcases/core/libraries/rest_api/Model_Data_Translator_Test.php
