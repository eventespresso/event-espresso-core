<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_Datetime_Field_Test
 *
 * @package		Event Espresso
 * @subpackage	tests
 * @author		Darren Ethier
 * @since 4.6
 * @group core/db_fields
 */
class EE_Datetime_Field_Test extends EE_UnitTestCase {


	/**
	 * This will hold the _datetime_field object for all tests.
	 *
	 * @var EE_Datetime_Field
	 */
	protected $_datetime_field;

	/**
	 * Expected values.
	 * Set in the _get_timestrings_for_testing method.
	 *
	 * @var string
	 */
	protected $_expected_unixtimestamp;
	protected $_expected_mysqltimestamp;


	/**
	 * Default PHP DateTime object in the timezone being tested.
	 * Set in the _get_timestrings_for_testing method.
	 *
	 * @var DateTime
	 */
	protected $_defaultDTT;


	public function setUp() {
		parent::setUp();
		$this->loadModelsMocks();
	}




	/**
	 * Used to set the _datetime_field property for tests with the provided params and set with defaults
	 * if none provided.
	 *
	 * @see EE_Datetime_Field for docs on params
	 */
	protected function _set_dtt_field_object( $table_column = 'DTT_EVT_start', $nice_name = 'Start Date', $nullable = false, $default_value = '', $timezone = NULL, $date_format = NULL, $time_format = NULL, $pretty_date_format = NULL, $pretty_time_format = NULL ) {
		$this->_datetime_field = new EE_Datetime_Field_Mock( $table_column, $nice_name, $nullable, $default_value, $timezone, $date_format, $time_format, $pretty_date_format, $pretty_time_format );
	}



	/**
	 * This returns a common set of time strings for testing indexed by format.
	 *  @param string $date_offset_test This is the offset used in offset tests. It should be included as
	 *                                  	          an accepted DateInterval interval_spec value (@see http://
	 *                                  	          php.net/manual/en/dateinterval.construct.php)
	 *  @param string $time_offset_test This works the same as the $date_offset_test except will be
	 *                                  	          applied for time offsets.
	 *  @since
	 */
	protected function _get_timestrings_for_testing() {
		//set our expected properties
		//setup some baselines to get expected values (the date/time strings match what is returned from _get_timestrings_for_testing );
		$datetimeZoneVC = new DateTimeZone( 'America/Vancouver' );
		$datetimeZoneUTC = new DateTimeZone( 'UTC' );
		$this->_defaultDTT = new DateTime( '2015-02-20 11:38', $datetimeZoneVC );

		//formats we want to test
		$date_formats = array(
			'date' => array(
				'F j, Y',
				'Y-m-d',
				'm/d/Y',
				'd/m/Y',
				'j F, Y'
				),
			'time' => array(
				'g:i a',
				'g:i A',
				'H: i'
				)
			);

		//set the timezone to be America/Vancouver (UTC-8h Daylight UTC-7h)
		$this->_datetime_field->set_timezone( 'America/Vancouver' );

		//set the expected unixtimestamp
		$expectedDTT = clone $this->_defaultDTT;
		$expectedDTT->setTimezone( $datetimeZoneUTC );
		$this->_expected_unixtimestamp = $expectedDTT->format( 'U' );
		$this->_expected_mysqltimestamp = $expectedDTT->format( 'Y-m-d H:i:s' );
		return $date_formats;
	}



	/**
	 * This ensures that when constructed the datetime field object is setup correctly
	 * @since 4.6
	 */
	public function test_construct() {
		//instantiate a _datetime_field object for tests.
		$this->_set_dtt_field_object();

		//verify date_format
		$this->assertEquals( $this->_datetime_field->get_property( '_date_format' ), 'F j, Y' );
		$this->assertEquals( $this->_datetime_field->get_property( '_time_format'), 'g:i a'  );
		$this->assertEquals( $this->_datetime_field->get_property( '_pretty_date_format' ), 'F j, Y' );
		$this->assertEquals( $this->_datetime_field->get_property( '_pretty_time_format' ), 'g:i a' );

		//verify timezone
		$this->assertEquals( $this->_datetime_field->get_timezone(), 'Africa/Abidjan' );
	}



	/**
	 * Test getting a DateTimeZone object that has the UTC timezone set.
	 * @since 4.6
	 */
	public function test_get_UTC_DateTimeZone() {
		$utcTz = EE_Datetime_Field_Mock::get_UTC_DateTimeZone();
		$this->assertInstanceOf( 'DateTimeZone',$utcTz );

		//should be in utc!
		$this->assertEquals( 'UTC', $utcTz->getName() );
	}



	/**
	 * Test prepare_for_set method.
	 * @since 4.6
	 */
	public function test_prepare_for_set() {
		//instantiate a _datetime_field object.  Set timezone
		$this->_set_dtt_field_object();

		//grab our time strings
		$timestrings = $this->_get_timestrings_for_testing();

		//loop through timestrings and run tests
		foreach ( $timestrings['date'] as $format  ) {
			$dtt = $this->_defaultDTT->format( $format );
			$this->_datetime_field->set_date_format( $format );
			foreach( $timestrings['time'] as $time_format ) {
				$dtt .= ' ' . $this->_defaultDTT->format( $time_format );
				$this->_datetime_field->set_time_format( $time_format );
				$timestamp = $this->_datetime_field->prepare_for_set( $dtt );
				//test expected value
				$this->assertEquals( $this->_expected_unixtimestamp, $timestamp );
			}
		}
	}




	/**
	 * This tests the prepare_for_set_with_new_time method in EE_Datetime_Field
	 * @since 4.6
	 */
	public function test_prepare_for_set_with_new_time() {
		$this->_set_dtt_field_object();
		$timestrings = $this->_get_timestrings_for_testing();

		//clone defaultDTT to setup what our expected time offset unixtimestamp will be.
		$DTToffset = clone $this->_defaultDTT;
		$DTToffset->add( new DateInterval( 'PT2H' ) );
		$expected = $DTToffset->format('U');

		//loop through timestrings and run tests
		foreach ( $timestrings['time'] as $format ) {
			$this->_datetime_field->set_time_format( $format );
			$new_time_string = $this->_datetime_field->prepare_for_set_with_new_time( $DTToffset->format( $format ), $this->_expected_unixtimestamp );
			$this->assertEquals( $expected, $new_time_string, sprintf( 'Format is %s', $format ) );
		}
	}




	/**
	 * This tests the prepare_for_set_with_new_date method in EE_Datetime_Field
	 * @since 4.6
	 */
	public function test_prepare_for_set_with_new_date() {
		$this->_set_dtt_field_object();
		$timestrings = $this->_get_timestrings_for_testing();

		//clone defaultDTT to setup what our expected time offset unixtimestamp will be.
		$DTToffset = clone $this->_defaultDTT;
		$DTToffset->add( new DateInterval( 'P2D' ) );
		$expected = $DTToffset->format('U');


		//loop through timestrings and run tests
		foreach ( $timestrings['date'] as $format ) {
			$this->_datetime_field->set_date_format( $format );
			$new_time_string = $this->_datetime_field->prepare_for_set_with_new_date( $DTToffset->format( $format ), $this->_expected_unixtimestamp );
			$this->assertEquals( $expected, $new_time_string,  sprintf( 'Format is %s', $format ) );
		}
	}





	/**
	 * This tests the prepare_for_get method in EE_Datetime_Field
	 * @since 4.6
	 */
	public function test_prepare_for_get() {
		$this->_set_dtt_field_object();
		$timestrings = $this->_get_timestrings_for_testing();

		foreach ( $timestrings['date'] as $dateformat ) {
			$this->_datetime_field->set_date_format( $dateformat );
			foreach( $timestrings['time'] as $timeformat ) {
				$this->_datetime_field->set_time_format( $timeformat );

				//test date_time_output as time.
				$this->_datetime_field->set_date_time_output( 'time' );
				$output = $this->_datetime_field->prepare_for_get( $this->_expected_unixtimestamp );
				$this->assertEquals( $output, $this->_defaultDTT->format( $timeformat ), sprintf( 'Date Format: %s', 'Time Format: %s', $dateformat, $timeformat ) );

				//test date_time_output as date.
				$this->_datetime_field->set_date_time_output( 'date' );
				$output = $this->_datetime_field->prepare_for_get( $this->_expected_unixtimestamp );
				$this->assertEquals( $output, $this->_defaultDTT->format( $dateformat ), sprintf( 'Date Format: %s', 'Time Format: %s', $dateformat, $timeformat ) );

				//test date_time_output as date and time.
				$this->_datetime_field->set_date_time_output( 'all' );
				$output = $this->_datetime_field->prepare_for_get( $this->_expected_unixtimestamp );
				$this->assertEquals( $output, $this->_defaultDTT->format( $dateformat . ' ' . $timeformat ), sprintf( 'Date Format: %s', 'Time Format: %s', $dateformat, $timeformat ) );
			}
		}
	}




	/**
	 * This tests the prepare_for_use_in_db method on EE_Datetime_Field
	 * @since 4.6
	 */
	public function test_prepare_for_use_in_db() {
		$this->_set_dtt_field_object();
		$timestrings = $this->_get_timestrings_for_testing();

		//test if not nullable and datestring is empty, then we should get back current_time in utc in mysql timestamp.
		$this->assertEquals( date( 'Y-m-d H:i:s' ), $this->_datetime_field->prepare_for_use_in_db(null) );

		//test if  nullable and datestring is empty, then we should get null.
		$this->_datetime_field->set_nullable();
		$this->assertNull( $this->_datetime_field->prepare_for_use_in_db('') );

		//test getting the correct value for the set UTC timestamp
		$this->assertEquals( $this->_expected_mysqltimestamp, $this->_datetime_field->prepare_for_use_in_db( $this->_expected_unixtimestamp ) );
	}




	/**
	 * This tests the prepare_for_set_from_db method in EE_Datetime_Field
	 * @since 4.6
	 */
	public function test_prepare_for_set_from_db() {
		$this->_set_dtt_field_object();
		$timestrings = $this->_get_timestrings_for_testing();

		//test if not nullable and datestring is empty, then we should get back unixtimestamp utc.
		$this->assertEquals( time(), $this->_datetime_field->prepare_for_set_from_db('') );

		//test if nullable and datestring is empty, then we should get null.
		$this->_datetime_field->set_nullable();
		$this->assertNull( $this->_datetime_field->prepare_for_set_from_db('') );

		//test getting the correct value for the set UTC mysql timestamp
		$this->assertEquals( $this->_expected_unixtimestamp, $this->_datetime_field->prepare_for_set_from_db( $this->_expected_mysqltimestamp ) );
	}



} // end class EE_Datetime_Field_Test
