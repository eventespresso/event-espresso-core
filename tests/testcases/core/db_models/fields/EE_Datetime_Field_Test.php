<?php

if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}

/**
 * EE_Datetime_Field_Test
 *
 * @package        Event Espresso
 * @subpackage     tests
 * @author         Darren Ethier
 * @since          4.6
 * @group          core/db_fields
 * @group          model_fields
 * @group          models
 */
class EE_Datetime_Field_Test extends EE_UnitTestCase
{


    /**
     * This will hold the _datetime_field object for all tests.
     *
     * @var EE_Datetime_Field_Mock
     */
    protected $_datetime_field;

    /**
     * Expected values.
     * Set in the _get_time_strings_for_testing method.
     *
     * @var string
     */
    protected $_expected_unixtimestamp;
    protected $_expected_mysqltimestamp;


    /**
     * Default PHP DateTime object in the timezone being tested.
     * Set in the _get_time_strings_for_testing method.
     *
     * @var DateTime
     */
    protected $_defaultDTT;


    public function set_up()
    {
        parent::set_up();
        $this->loadModelFieldMocks(array('EE_Datetime_Field'));
    }


    /**
     * Used to set the _datetime_field property for tests with the provided params and set with defaults
     * if none provided.
     *
     * @see EE_Datetime_Field for docs on params
     * @param string $table_column
     * @param string $nice_name
     * @param bool   $nullable
     * @param string $default_value
     * @param null   $timezone
     * @param null   $date_format
     * @param null   $time_format
     * @param null   $pretty_date_format
     * @param null   $pretty_time_format
     */
    protected function _set_dtt_field_object(
        $table_column = 'DTT_EVT_start',
        $nice_name = 'Start Date',
        $nullable = false,
        $default_value = '',
        $timezone = null,
        $date_format = null,
        $time_format = null,
        $pretty_date_format = null,
        $pretty_time_format = null
    ) {
        $this->_datetime_field = new EE_Datetime_Field_Mock(
            $table_column,
            $nice_name,
            $nullable,
            $default_value,
            $timezone,
            $date_format,
            $time_format,
            $pretty_date_format,
            $pretty_time_format
        );
    }


    /**
     * This returns a common set of time strings for testing indexed by format.
     *
     * @return array
     */
    protected function _get_time_strings_for_testing()
    {
        //set our expected properties
        //setup some baselines to get expected values (the date/time strings match what is returned from _get_time_strings_for_testing );
        $datetimeZoneVC    = new DateTimeZone('America/Vancouver');
        $datetimeZoneUTC   = new DateTimeZone('UTC');
        $this->_defaultDTT = new DateTime('2015-02-20 11:38', $datetimeZoneVC);

        //formats we want to test
        $date_formats = $this->date_formats_to_test();

        //set the timezone to be America/Vancouver (UTC-8h Daylight UTC-7h)
        $this->_datetime_field->set_timezone('America/Vancouver');

        //set the expected Unix timestamp
        $expectedDTT = clone $this->_defaultDTT;
        $expectedDTT->setTimezone($datetimeZoneUTC);
        $this->_expected_unixtimestamp  = $expectedDTT->format('U');
        $this->_expected_mysqltimestamp = $expectedDTT->format('Y-m-d H:i:s');
        return $date_formats;
    }


    /**
     * This ensures that when constructed the datetime field object is setup correctly
     *
     * @since 4.6
     */
    public function test_construct()
    {
        //instantiate a _datetime_field object for tests.
        $this->_set_dtt_field_object();

        //verify date_format
        $this->assertEquals($this->_datetime_field->get_property('_date_format'), 'F j, Y');
        $this->assertEquals($this->_datetime_field->get_property('_time_format'), 'g:i a');
        $this->assertEquals($this->_datetime_field->get_property('_pretty_date_format'), 'F j, Y');
        $this->assertEquals($this->_datetime_field->get_property('_pretty_time_format'), 'g:i a');

        //verify timezone. By default wp has the gmt_offset set to 0.  So this means we convert that to UTC.
        $this->assertEquals($this->_datetime_field->get_timezone(), 'UTC');
    }


    /**
     * Test getting a DateTimeZone object that has the UTC timezone set.
     *
     * @since 4.6
     */
    public function test_get_UTC_DateTimeZone()
    {
        $this->_set_dtt_field_object();
        $utcTz = $this->_datetime_field->get_UTC_DateTimeZone();
        $this->assertInstanceOf('DateTimeZone', $utcTz);
        //should be in utc!
        $this->assertEquals('UTC', $utcTz->getName());
    }


    /**
     * Test prepare_for_set method.
     *
     * @since 4.6
     */
    public function test_prepare_for_set()
    {
        //instantiate a _datetime_field object.  Set timezone
        $this->_set_dtt_field_object();

        //grab our time strings
        $timestrings = $this->_get_time_strings_for_testing();

        //loop through timestrings and run tests
        foreach ($timestrings['date'] as $format) {
            $datetime = $this->_defaultDTT->format($format);
            $this->_datetime_field->set_date_format($format);
            foreach ($timestrings['time'] as $time_format) {
                $dtt = $datetime . ' ' . $this->_defaultDTT->format($time_format);
                $this->_datetime_field->set_time_format($time_format);
                $dateobject = $this->_datetime_field->prepare_for_set($dtt);
                $this->assertInstanceOf('DateTime', $dateobject);
                //test expected value
                $this->assertEquals($this->_expected_unixtimestamp, $dateobject->format('U'));
            }
        }
    }


    /**
     * This tests the prepare_for_set_with_new_time method in EE_Datetime_Field
     *
     * @since 4.6
     */
    public function test_prepare_for_set_with_new_time()
    {
        $this->_set_dtt_field_object();
        $timestrings = $this->_get_time_strings_for_testing();

        //clone defaultDTT to setup what our expected time offset unixtimestamp will be.
        $DTToffset = clone $this->_defaultDTT;
        $DTToffset->add(new DateInterval('PT2H'));
        $expected = $DTToffset->format('U');

        //loop through timestrings and run tests
        foreach ($timestrings['time'] as $format) {
            $this->_datetime_field->set_time_format($format);
            $new_time_string = $this->_datetime_field->prepare_for_set_with_new_time($DTToffset->format($format),
                $this->_defaultDTT);
            $this->assertEquals($expected, $new_time_string->format('U'),
                sprintf('Time Format is %s. Date format is %s.', $format, $this->_datetime_field->get_date_format()));
        }

        //loop again except this time just send in the DateTime object.
        foreach ($timestrings['time'] as $format) {
            $this->_datetime_field->set_time_format($format);
            $new_time_string = $this->_datetime_field->prepare_for_set_with_new_time($DTToffset, $this->_defaultDTT);
            $this->assertEquals($expected, $new_time_string->format('U'),
                sprintf('Time Format is %s. Date format is %s.', $format, $this->_datetime_field->get_date_format()));
        }
    }


    /**
     * This tests the prepare_for_set_with_new_date method in EE_Datetime_Field
     *
     * @since 4.6
     */
    public function test_prepare_for_set_with_new_date()
    {
        $this->_set_dtt_field_object();
        $timestrings = $this->_get_time_strings_for_testing();

        //clone defaultDTT to setup what our expected time offset unixtimestamp will be.
        $DTToffset = clone $this->_defaultDTT;
        $DTToffset->add(new DateInterval('P2D'));
        $expected = $DTToffset->format('U');


        //loop through timestrings and run tests
        foreach ($timestrings['date'] as $format) {
            $this->_datetime_field->set_date_format($format);
            $new_time_string = $this->_datetime_field->prepare_for_set_with_new_date($DTToffset->format($format),
                $this->_defaultDTT);
            $this->assertEquals($expected, $new_time_string->format('U'), sprintf('Format is %s', $format));
        }


        //loop again except this time just send in the DateTime object.
        foreach ($timestrings['date'] as $format) {
            $this->_datetime_field->set_date_format($format);
            $new_time_string = $this->_datetime_field->prepare_for_set_with_new_date($DTToffset, $this->_defaultDTT);
            $this->assertEquals($expected, $new_time_string->format('U'), sprintf('Format is %s.', $format));
        }
    }


    /**
     * This tests the prepare_for_get method in EE_Datetime_Field
     *
     * @since 4.6
     */
    public function test_prepare_for_get()
    {
        $this->_set_dtt_field_object();
        $timestrings = $this->_get_time_strings_for_testing();

        foreach ($timestrings['date'] as $dateformat) {
            $this->_datetime_field->set_date_format($dateformat);
            foreach ($timestrings['time'] as $timeformat) {
                $this->_datetime_field->set_time_format($timeformat);

                //test date_time_output as time.
                $this->_datetime_field->set_date_time_output('time');
                $output = $this->_datetime_field->prepare_for_get($this->_defaultDTT);
                $this->assertEquals($output, $this->_defaultDTT->format($timeformat),
                    sprintf('Date Format: %s Time Format: %s', $dateformat, $timeformat));

                //test date_time_output as date.
                $this->_datetime_field->set_date_time_output('date');
                $output = $this->_datetime_field->prepare_for_get($this->_defaultDTT);
                $this->assertEquals($output, $this->_defaultDTT->format($dateformat),
                    sprintf('Date Format: %s Time Format: %s', $dateformat, $timeformat));

                //test date_time_output as date and time.
                $this->_datetime_field->set_date_time_output('all');
                $output = $this->_datetime_field->prepare_for_get($this->_defaultDTT);
                $this->assertEquals($output, $this->_defaultDTT->format($dateformat . ' ' . $timeformat),
                    sprintf('Date Format: %s Time Format: %s', $dateformat, $timeformat));
            }
        }
    }


    /**
     * Tests EE_Datetime_Field prepare_for_display method when it receives a
     * invalid DateTime object on a non-nullable field and WP_DEBUG is true.
     *
     * @since                       4.7.0
     *
     *
     *                              for the $DateTime argument because the Start Date field is not nullable.
     */
    public function test_prepare_for_display_with_exception()
    {
        $this->expectExceptionMessage(
            'EE_Datetime_Field::_prepare_for_display requires a DateTime class to be the value for the $DateTime argument because the Start Date field is not nullable.'
        );
        $this->expectException(EE_Error::class);
        $this->_set_dtt_field_object();
        if (defined('WP_DEBUG') && ! WP_DEBUG) {
            $this->markTestSkipped('Unable to complete test because WP_DEBUG is already defined and is set to false');
        } else {
            if (! defined('WP_DEBUG')) {
                define('WP_DEBUG', true);
            }
        }

        $this->_datetime_field->prepare_for_display(null);
    }


    /**
     * Tests EE_Datetime_Field prepare_for_display method when it receives an invalid DateTime object on a
     * non-nullable field and WP_DEBUG is false.
     *
     * @since 4.7.0
     */
    public function test_prepare_for_display_with_EE_Error()
    {
        if (defined('WP_DEBUG') && WP_DEBUG) {
            $this->markTestSkipped('Unable to complete test because WP_DEBUG is already defined and is set to true');
        }
        $this->_set_dtt_field_object();
        $this->_datetime_field->prepare_for_display(null);
        //have error notice?
        $notice   = EE_Error::get_notices(false);
        $notice   = $notice['errors'];
        $expected = 'An error has occurred:<br />EE_Datetime_Field::_prepare_for_display requires a DateTime class to be the value for the $DateTime argument because the Start Date field is not nullable.  When WP_DEBUG is false, the value is set to "now" instead of throwing an exception.';
        $this->assertEquals($expected, $notice);
        EE_Error::reset_notices();
    }

    /**
     * @since 4.7.0
     */
    public function test_prepare_for_display()
    {
        $this->_set_dtt_field_object();

        //set nullable allowed (non nullable allowed are in other tests).
        $this->_datetime_field->set_nullable();

        //test null value.
        $this->assertEmpty($this->_datetime_field->prepare_for_display(null));

        //non null values are tested by prepare_for_get_test
    }


    /**
     * This tests the prepare_for_use_in_db method on EE_Datetime_Field
     *
     * @since 4.6
     */
    public function test_prepare_for_use_in_db()
    {
        $this->_set_dtt_field_object();
        $this->_get_time_strings_for_testing();

        //test if not nullable and datestring is empty, then we should get back current_time in utc in mysql timestamp.
        $this->assertEquals(date('Y-m-d H:i:s'), $this->_datetime_field->prepare_for_use_in_db(null));

        //test if  nullable and datestring is empty, then we should get null.
        $this->_datetime_field->set_nullable();
        $this->assertNull($this->_datetime_field->prepare_for_use_in_db(''));

        //test getting the correct value for the set UTC timestamp
        $this->assertEquals($this->_expected_mysqltimestamp,
            $this->_datetime_field->prepare_for_use_in_db($this->_defaultDTT));
    }


    /**
     * This tests the prepare_for_set_from_db method in EE_Datetime_Field
     *
     * @since 4.6
     */
    public function test_prepare_for_set_from_db()
    {
        $this->_set_dtt_field_object();
        $this->_get_time_strings_for_testing();

        //test if not nullable and datestring is empty, then we should get back datetime object.
        $this->assertInstanceOf('DateTime', $this->_datetime_field->prepare_for_set_from_db(''));

        //test if nullable and datestring is empty, then we should get null.
        $this->_datetime_field->set_nullable();
        $this->assertNull($this->_datetime_field->prepare_for_set_from_db(''));

        //test getting the correct value for the set UTC mysql timestamp
        $this->assertEquals(
            $this->_expected_unixtimestamp,
            $this->_datetime_field->prepare_for_set_from_db($this->_expected_mysqltimestamp)->format('U')
        );
    }


    public function test_datetime_field_serialization()
    {
        if (version_compare(PHP_VERSION, '5.5', '<')) {
            $this->markTestSkipped();
        }
        $this->_set_dtt_field_object('LIN_timestamp', 'LIN_timestamp', false, EE_Datetime_Field::now);
        $this->_get_time_strings_for_testing();
        $datetime_field = $this->_datetime_field;
        $datetime_field = serialize($datetime_field);
        $datetime_field = unserialize($datetime_field);
        /** @var DateTime $datetime */
        $datetime = $datetime_field->get_date_object('');
        $this->assertInstanceOf('EventEspresso\core\domain\entities\DbSafeDateTime', $datetime);
        // now serialize and unserialize
        $datetime = serialize($datetime);
        // ensure that a DateTime object was not serialized
        $this->assertFalse(strpos($datetime, 'O:8:"DateTime"'));
        $datetime = unserialize($datetime);
        $this->assertInstanceOf('EventEspresso\core\domain\entities\DbSafeDateTime', $datetime);
    }


    public function test_getSchemaType()
    {
        $this->_set_dtt_field_object('LIN_timestamp', 'LIN_timestamp', false, EE_Datetime_Field::now);
        $this->assertEquals('string', $this->_datetime_field->getSchemaType());
    }


    public function test_get_wpdb_data_type()
    {
        $this->_set_dtt_field_object('LIN_timestamp', 'LIN_timestamp', false, EE_Datetime_Field::now);
        $this->assertEquals('%s', $this->_datetime_field->get_wpdb_data_type());
    }
}
// end class EE_Datetime_Field_Test
// Location: tests/testcases/core/db_models/fields/EE_Datetime_Field_Test.php
