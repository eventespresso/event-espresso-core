<?php
/**
 * All tests for the /core/db_models/EEM_Payment.model.php
 *
*@since          4.6.x
 * @package        Event Espresso
 * @subpackage     tests
 * @group          core/db_models
 */
class EEM_Payment_Test extends EE_UnitTestCase
{


    public function set_up()
    {
        parent::set_up();
        //set timezone string.  NOTE, this is purposely a high positive timezone string because it works better for testing expiry times.
        update_option('timezone_string', 'Australia/Sydney');
    }



    public function tear_down()
    {
        //restore the timezone string to the default
        update_option('timezone_string', '');
        parent::tear_down();
    }



    /**
     * This sets up some payments in the db for testing with.
     *
     * @since 4.6.0
     * @param \DateTime     $now
     * @param \DateTimeZone $timezone
     */
    public function _setup_payments(DateTime $now = null, DateTimeZone $timezone = null)
    {
        // setup DateTimeZone
        $timezone = $timezone instanceof DateTimeZone ? $timezone : new DateTimeZone('America/Toronto');
        // and base DateTime for now
        $now = $now instanceof DateTime ? $now : new DateTime('now', $timezone);
        //setup some dates we'll use for testing with.
        $two_days_ago = clone $now;
        $one_hour_from_now = clone $now;
        $two_days_from_now = clone $now;
        $two_hours_ago = clone $now;
        // no modify the clones
        $two_days_ago = $two_days_ago->sub(new DateInterval('P2D'));
        $one_hour_from_now = $one_hour_from_now->add(new DateInterval('PT1H'));
        $two_hours_ago = $two_hours_ago->sub(new DateInterval('PT2H'));
        $two_days_from_now = $two_days_from_now->add(new DateInterval('P2D'));
        // grab format settings
        $formats = array(\EE_Datetime_Field::mysql_date_format, \EE_Datetime_Field::mysql_time_format);
        // let's setup the args for our payments in an array,
        // then we can just loop through to grab them and set things up.
        $payment_args = array(
            array(
                'PAY_timestamp' => $two_days_ago->format(\EE_Datetime_Field::mysql_timestamp_format),
                'timezone'      => 'America/Toronto',
                'formats'       => $formats,
            ),
            array(
                'PAY_timestamp' => $one_hour_from_now->format(\EE_Datetime_Field::mysql_timestamp_format),
                'timezone'      => 'America/Toronto',
                'formats'       => $formats,
            ),
            array(
                'PAY_timestamp' => $two_hours_ago->format(\EE_Datetime_Field::mysql_timestamp_format),
                'timezone'      => 'America/Toronto',
                'formats'       => $formats,
            ),
            array(
                'PAY_timestamp' => $two_days_from_now->format(\EE_Datetime_Field::mysql_timestamp_format),
                'timezone'      => 'America/Toronto',
                'formats'       => $formats,
            ),
            array(
                'PAY_timestamp' => $two_days_ago->format(\EE_Datetime_Field::mysql_timestamp_format),
                'timezone'      => 'America/Toronto',
                'formats'       => $formats,
            ),
        );
        foreach ($payment_args as $payment_arg) {
            $this->factory->payment->create($payment_arg);
        }
        $this->assertEquals(5, EEM_Payment::instance()->count());
    }



    /**
     * @since 4.6.0
     */
    public function test_get_payments_between_dates()
    {
        $timezone = new DateTimeZone('America/Toronto');
        // set $test_time in the timezone being tested.
        $test_time = new DateTime('now', $timezone);
        $test_time->setTime(14, 00);
        $this->_setup_payments($test_time, $timezone);
        //test defaults
        $payments = EEM_Payment::instance()->get_payments_made_between_dates();
        $this->assertCount(2, $payments);
        //test including a date from past date for start date.
        $payments = EEM_Payment::instance()->get_payments_made_between_dates(
            $test_time->sub(new DateInterval('P2D'))->format('d/m/Y'),
            '',
            'd/m/Y',
            'America/Toronto'
        );
        $this->assertCount(4, $payments);
        //test including a date from past date for end date.
        $payments = EEM_Payment::instance()->get_payments_made_between_dates(
            '',
            $test_time->format('d/m/Y'),
            'd/m/Y',
            'America/Toronto'
        );
        $this->assertCount(4, $payments);
        //test including a date from upcoming date for start date
        $payments = EEM_Payment::instance()->get_payments_made_between_dates(
            $test_time->add(new DateInterval('P4D'))->format('d/m/Y'),
            '',
            'd/m/Y',
            'America/Toronto'
        );
        $this->assertCount(3, $payments);
        //test including a date from upcoming date for end date
        $payments = EEM_Payment::instance()->get_payments_made_between_dates(
            '',
            $test_time->format('d/m/Y'),
            'd/m/Y',
            'America/Toronto'
        );
        $this->assertCount(3, $payments);
        //test exception
        $this->setExpectedException('EE_Error');
        EEM_Payment::instance()->get_payments_made_between_dates('trigger_exception');
    }


}
//end class EEM_Payment_Test
// Location: tests/testcases/core/db_models/EEM_Payment_Test.php
