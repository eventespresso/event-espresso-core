<?php
/**
 * Contains test class for /core/db_models/EEM_Datetime.model.php
 *
 * @since  		4.5.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */

/**
 * All tests for the EEM_Datetime class.
 *
 * @since 		4.5.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */
class EEM_Datetime_Test extends EE_UnitTestCase {

    public function setUp() {
        parent::setUp();
        //set timezone string.  NOTE, this is purposely a high positive timezone string because it works better for testing expiry times.
        update_option( 'timezone_string', 'Australia/Sydney' );
    }


	public function tearDown(){
		//restore the timezone string to the default
		update_option( 'timezone_string', '' );
		parent::tearDown();
	}




	/**
	 * Tests the get_datetimes_for_event_ordered_by_DTT_order method.
	 * @see https://events.codebasehq.com/projects/event-espresso/tickets/6744 for bug being tested below.
	 * @see https://events.codebasehq.com/projects/event-espresso/tickets/6909 for bug related to non expired
	 *      	  events being considered expired.
	 * @since 4.5.0
	 * @group 6744
	 * @group 6909
	 */
	public function test_get_datetimes_for_event_ordered_by_DTT_order__different_timezone() {

		//create an event and datetime
		$event = $this->factory->event->create( array( 'EVT_timezone_string' =>  'Australia/Sydney' ) );

		//for test we want a datetime begining one hour before now and ending now (-1min), and a datetime starting now and ending one hour from now.
		$dtt1_start = time() - 60*60*24;
		$dtt1_end = time() - 60*60;
		$dtt2_start = $dtt1_start + 60*60;
		$dtt2_end = $dtt1_end + 60*60*24;


		$dtt1 = $this->factory->datetime->create( array( 'DTT_EVT_start' => $dtt1_start, 'DTT_EVT_end' => $dtt1_end ) );
		$dtt2 = $this->factory->datetime->create( array( 'DTT_EVT_start' => $dtt2_start, 'DTT_EVT_end' => $dtt2_end ) );

		//verify
		$this->assertInstanceOf( 'EE_Event', $event );
		$this->assertInstanceOf( 'EE_Datetime', $dtt1 );
		$this->assertInstanceOf( 'EE_Datetime', $dtt2 );

		//attach dtt to event and save
		$event->_add_relation_to( $dtt1, 'Datetime' );
		$event->_add_relation_to( $dtt2, 'Datetime' );
		$event->save();

		//now let's run the method we're checking.
		//first NO expiry flag.
		$datetimes_on_event = EEM_Datetime::instance()->get_datetimes_for_event_ordered_by_DTT_order( $event->ID() );

		//we should have all the datetimes returned
		$dtt_checked = reset( $datetimes_on_event );

		$this->assertEquals( 2, count( $datetimes_on_event ) );
		$this->assertInstanceOf( 'EE_Datetime', $dtt_checked );
		$this->assertEquals( $dtt_checked->ID(), $dtt1->ID() );

		//now let's run the method excluding expired dtts
		$datetimes_on_event = EEM_Datetime::instance()->get_datetimes_for_event_ordered_by_DTT_order( $event->ID(), false );
		$second_dtt_chk = reset( $datetimes_on_event );

		//only one datetime should be returned
		$this->assertEquals( 1, count( $datetimes_on_event ) );

		//we should have the SECOND datetime returned because its the non-expired one.
		$this->assertInstanceOf( 'EE_Datetime', $second_dtt_chk );
		$this->assertEquals( $second_dtt_chk->ID(), $dtt2->ID() );
	}




	/**
	 * Test for get_datetimes_for_event_ordered_by_start_time method
	 *
	 * @since 4.5.0
	 *
	 */
	public function test_get_datetimes_for_event_ordered_by_start_time() {
		//create an event we'll use
		$event = $this->factory->event->create();

		//let's create three datetimes ( one that started one hour ago and ended now(-1min), one that starts now and ends one hour from now, and one that starts one hour from now and ends two hours from now)
		$dtt1start = time() - 60*60;
		$dtt1end = time() - 60;

		$dtt2start = $dtt1start + 60*60;
		$dtt2end = $dtt1end + 60*60;
		$dtt3start = $dtt2start + 60*60;
		$dtt3end = $dtt2end + 60*60;

		$dtt1 = $this->factory->datetime->create( array( 'DTT_EVT_start' => $dtt1start, 'DTT_EVT_end' => $dtt1end ) );
		$dtt2 = $this->factory->datetime->create( array( 'DTT_EVT_start' => $dtt2start, 'DTT_EVT_end' => $dtt2end ) );
		$dtt3 = $this->factory->datetime->create( array( 'DTT_EVT_start' => $dtt3start, 'DTT_EVT_end' => $dtt3end ) );

		//verify
		$this->assertInstanceOf( 'EE_Event', $event );
		$this->assertInstanceOf( 'EE_Datetime', $dtt1 );
		$this->assertInstanceOf( 'EE_Datetime', $dtt2 );
		$this->assertInstanceOf( 'EE_Datetime', $dtt3 );

		//add dtts to event
		$event->_add_relation_to( $dtt1, 'Datetime' );
		$event->_add_relation_to( $dtt2, 'Datetime' );
		$event->_add_relation_to( $dtt3, 'Datetime' );
		$event->save();

		//run the method we are checking with NO expiry flag set (so means we are including expired dtts).
		$datetimes_on_event = EEM_Datetime::instance()->get_datetimes_for_event_ordered_by_start_time( $event->ID() );

		//now let's verify that there are two datetimes returned
		$this->assertEquals( 3, count( $datetimes_on_event) );

		//verify the first datetime = dtt1 (because orderby is supposed to be DTT_EVT_start => ASC );
		$first_dtt = reset( $datetimes_on_event );
		$this->assertInstanceOf( 'EE_Datetime', $first_dtt );
		$this->assertEquals( $first_dtt->ID(), $dtt1->ID() );

		//k now let's do the same thing as above but this time we DONT' return expired dtts.
		//run the method we are checking with NO expiry flag set (so means we are including expired dtts).
		$datetimes_on_event = EEM_Datetime::instance()->get_datetimes_for_event_ordered_by_start_time( $event->ID(), false );

		//now let's verify that there are two datetimes returned (because the dtts should NOT have expired!)
		$this->assertEquals( 2, count( $datetimes_on_event) );

		//verify the first datetime = dtt2 (because orderby is supposed to be DTT_EVT_start => ASC ) AND the datetimes have NOT expired.;
		$first_dtt = reset( $datetimes_on_event );
		$this->assertInstanceOf( 'EE_Datetime', $first_dtt );
		$this->assertEquals( $first_dtt->ID(), $dtt2->ID() );
	}





	/**
	 * Test the get_datetimes_for_ticket_ordered_by_start_time() method
	 * @since 4.5.0
	 */
	public function test_get_datetimes_for_ticket_ordered_by_start_time() {
		//now create a TICKET we'll use.
		$ticket = $this->factory->ticket->create();

		//let's create three datetimes ( one that started one hour ago and ended now (-1min), one that starts now and ends one hour from now, and one that starts one hour from now and ends two hours from now)
		$dtt1start = time() - 60*60;
		$dtt1end = time() - 60;

		$dtt2start = $dtt1start + 60*60;
		$dtt2end = $dtt1end + 60*60;
		$dtt3start = $dtt2start + 60*60;
		$dtt3end = $dtt2end + 60*60;

		$dtt1 = $this->factory->datetime->create( array( 'DTT_EVT_start' => $dtt1start, 'DTT_EVT_end' => $dtt1end ) );
		$dtt2 = $this->factory->datetime->create( array( 'DTT_EVT_start' => $dtt2start, 'DTT_EVT_end' => $dtt2end ) );
		$dtt3 = $this->factory->datetime->create( array( 'DTT_EVT_start' => $dtt3start, 'DTT_EVT_end' => $dtt3end ) );

		//verify
		$this->assertInstanceOf( 'EE_Datetime', $dtt1 );
		$this->assertInstanceOf( 'EE_Datetime', $dtt2 );
		$this->assertInstanceOf( 'EE_Datetime', $dtt3 );
		$this->assertInstanceOf( 'EE_Ticket', $ticket );

		//add dtts to ticket
		$ticket->_add_relation_to( $dtt1, 'Datetime' );
		$ticket->_add_relation_to( $dtt2, 'Datetime' );
		$ticket->_add_relation_to( $dtt3, 'Datetime' );
		$ticket->save();


		//run the method we are checking with NO expiry flag set (so means we are including expired dtts).
		$datetimes_on_ticket = EEM_Datetime::instance()->get_datetimes_for_ticket_ordered_by_start_time( $ticket->ID() );

		//now let's verify that there are three datetimes returned
		$this->assertEquals( 3, count( $datetimes_on_ticket) );

		//verify the first datetime = dtt1 (because orderby is supposed to be DTT_EVT_start => ASC );
		$first_dtt = reset( $datetimes_on_ticket );
		$this->assertInstanceOf( 'EE_Datetime', $first_dtt );
		$this->assertEquals( $first_dtt->ID(), $dtt1->ID() );

		//k now let's do the same thing as above but this time we DONT' return expired dtts.
		//run the method we are checking with NO expiry flag set (so means we are including expired dtts).
		$datetimes_on_ticket = EEM_Datetime::instance()->get_datetimes_for_ticket_ordered_by_start_time( $ticket->ID(), false );

		//now let's verify that there are two datetimes returned (because only 2 of the dtts should NOT have expired!)
		$this->assertEquals( 2, count( $datetimes_on_ticket) );

		//verify the first datetime = dtt2 (because orderby is supposed to be DTT_EVT_start => ASC ) AND the second datetime is the first one that has NOT expired.;
		$first_dtt = reset( $datetimes_on_ticket );
		$this->assertInstanceOf( 'EE_Datetime', $first_dtt );
		$this->assertEquals( $first_dtt->ID(), $dtt2->ID() );
	}




	/**
	 * Test the get_datetimes_for_ticket_ordered_by_DTT_order() method
	 * @since 4.5.0
	 */
	public function test_get_datetimes_for_ticket_ordered_by_DTT_order() {
		//create an event and datetime
		$ticket = $this->factory->ticket->create();

		//for test we want a datetime begining one hour before now and ending now (-1min), and a datetime starting now and ending one hour from now.
		$dtt1_start = time() - 60*60;
		$dtt1_end = time() - 60;
		$dtt2_start = $dtt1_start + 60*60;
		$dtt2_end = $dtt1_end + 60*60;


		$dtt1 = $this->factory->datetime->create( array( 'DTT_EVT_start' => $dtt1_start, 'DTT_EVT_end' => $dtt1_end ) );
		$dtt2 = $this->factory->datetime->create( array( 'DTT_EVT_start' => $dtt2_start, 'DTT_EVT_end' => $dtt2_end ) );

		//verify
		$this->assertInstanceOf( 'EE_Ticket', $ticket );
		$this->assertInstanceOf( 'EE_Datetime', $dtt1 );
		$this->assertInstanceOf( 'EE_Datetime', $dtt2 );

		//attach dtt to ticket and save
		$ticket->_add_relation_to( $dtt1, 'Datetime' );
		$ticket->_add_relation_to( $dtt2, 'Datetime' );
		$ticket->save();

		//now let's run the method we're checking.
		//first NO expiry flag.
		$datetimes_on_ticket = EEM_Datetime::instance()->get_datetimes_for_ticket_ordered_by_DTT_order( $ticket->ID() );

		//we should have the datetime returned
		$dtt_checked = reset( $datetimes_on_ticket );

		//check count, it should be two datetimes because expiry ignored.
		$this->assertEquals( 2, count( $datetimes_on_ticket ) );

		//shoudl be first datetime because expiry ignored.
		$this->assertInstanceOf( 'EE_Datetime', $dtt_checked );
		$this->assertEquals( $dtt_checked->ID(), $dtt1->ID() );

		//now let's run the method excluding expired dtts
		$datetimes_on_ticket = EEM_Datetime::instance()->get_datetimes_for_ticket_ordered_by_DTT_order( $ticket->ID(), false );
		$second_dtt_chk = reset( $datetimes_on_ticket );

		//count should be one because expiry considered.
		$this->assertEquals( 1, count( $datetimes_on_ticket ) );

		//first datetime returned should be dtt2 because dtt1 is expired.
		$this->assertInstanceOf( 'EE_Datetime', $second_dtt_chk );
		$this->assertEquals( $second_dtt_chk->ID(), $dtt2->ID() );
	}




	/**
	 * @since 4.6.x
	 */
	public function test_create_new_blank_datetime() {
		//if timezone is empty string then the setUp didn't work correctly.  For the purpose of this test
		//we want a high positive timezone, so let's force that if necessary
		if ( get_option( 'timezone_string' ) != 'Australia/Sydney' ) {
			update_option( 'timezone_string', 'Australia/Sydney' );
			EEM_Datetime::reset();
			EEM_Datetime::instance();
		}

		//make sure now is in the timezone we want to test with.
		$now =  new DateTime( '@' . ( time() + ( DAY_IN_SECONDS * 30 ) ) );
		$now->setTimeZone( new DateTimeZone( EEH_DTT_Helper::get_timezone() ) );
		$now->setTime( '8', '0', '0' );
		$now->setTimeZone( new DateTimeZone( 'America/Toronto' ) );

		//get the default datetime
		$default_date = EEM_Datetime::instance()->create_new_blank_datetime();
		$default_date = reset( $default_date );

		//assert instance
		$this->assertInstanceOf( 'EE_Datetime', $default_date );

		//set its timezone to match our expected timezone
		$default_date->set_timezone( 'America/Toronto' );
		$actual = $default_date->get_DateTime_object( 'DTT_EVT_start');

		$this->assertInstanceOf( 'DateTime', $actual );

		//assert timezones are the same
		$this->assertEquals( $now->getTimezone(), $actual->getTimeZone() );

		//assert that we have the correct values on the date... we'll do each part separately to verify.
		$this->assertEquals( $now->format('Y'), $actual->format('Y' ) );
		$this->assertEquals( $now->format('m'), $actual->format( 'm' ) );
		$this->assertEquals( $now->format('d'), $actual->format( 'd' ) );
		$this->assertEquals( $now->format('H'), $actual->format( 'H' ) );
		$this->assertEquals( $now->format('i'), $actual->format('i' ) );
	}


    /**
     * @since 4.9.80.p
     */
	public function testCreateNewBlankDatetimeWithFilters() {
        $start_date = new DateTime('@' . strtotime('2012-10-12'));
        $end_date = new DateTime('@' . strtotime('2012-10-31'));
        add_filter(
            'FHEE__EEM_Datetime__create_new_blank_datetime__start_date',
            function () use ($start_date) {
                return $start_date->format('U');
            }
        );
        add_filter(
            'FHEE__EEM_Datetime__create_new_blank_datetime__end_date',
            function () use ($end_date) {
                return $end_date->format('U');
            }
        );
        add_filter(
            'FHEE__EEM_Datetime__create_new_blank_datetime__start_time',
            function () {
                return ['10am', 'ga'];
            }
        );
        add_filter(
            'FHEE__EEM_Datetime__create_new_blank_datetime__end_time',
            function () {
                return ['8pm', 'ga'];
            }
        );
        $blank_date = EEM_Datetime::instance()->create_new_blank_datetime()[0];
        $actual_start = $blank_date->get_DateTime_object('DTT_EVT_start');
        $actual_end = $blank_date->get_DateTime_object('DTT_EVT_end');

        $start_date->setTime('10', '0', '0');
        $end_date->setTime('20', '0', '0');
        $formats = [ 'Y', 'm', 'd', 'H', 'i' ];
        // test each format to ensure it matches expectation
        foreach( $formats as $format ) {
            $message = 'For format ' . $format;
            $this->assertEquals($actual_start->format($format), $start_date->format($format), $message);
            $this->assertEquals($actual_end->format($format), $end_date->format($format), $message );
        }
    }



	public function test_get_dtt_months_and_years() {
		//setup some dates we'll use for testing with.
		$timezone = new DateTimeZone( 'America/Toronto' );
		$upcoming_start_date = new DateTime( "now +2hours", $timezone );
		$past_start_date = new DateTime( "now -2days", $timezone );
		$current_end_date = new DateTime( "now +2days", $timezone );
		$current = new DateTime( "now", $timezone );
		$formats = array( 'Y-d-m',  'h:i a' );
		$full_format = implode( ' ', $formats );

		//setup some datetimes to attach to events.
		$datetimes = array(
			'expired_datetime' => $this->factory->datetime->create( array( 'DTT_EVT_start' => $past_start_date->format( $full_format ), 'DTT_EVT_end' => $past_start_date->format( $full_format), 'timezone' => 'America/Toronto', 'formats' =>  $formats ) ),
			'upcoming_datetime' => $this->factory->datetime->create( array( 'DTT_EVT_start' => $upcoming_start_date->format( $full_format ), 'DTT_EVT_end' => $upcoming_start_date->format( $full_format), 'timezone' => 'America/Toronto', 'formats' => $formats ) ),
			'active_datetime' => $this->factory->datetime->create( array( 'DTT_EVT_start' => $current->sub( new DateInterval( "PT2H") )->format( $full_format ), 'DTT_EVT_end' => $current_end_date->add( new DateInterval( "PT2H" ) )->format( $full_format), 'timezone' => 'America/Toronto', 'formats' =>  $formats ) ),
			'sold_out_datetime' => $this->factory->datetime->create( array( 'DTT_EVT_start' => $upcoming_start_date->format( $full_format ), 'DTT_EVT_end' => $upcoming_start_date->format( $full_format), 'DTT_reg_limit' => 10, 'DTT_sold' => 10,  'timezone' => 'America/Toronto', 'formats' =>  $formats ) ),
			'inactive_datetime' => $this->factory->datetime->create( array( 'DTT_EVT_start' => $current->format( $full_format ), 'DTT_EVT_end' => $current_end_date->format( $full_format), 'timezone' => 'America/Toronto', 'formats' =>  $formats ) )
		);


		$events = $this->factory->event->create_many(5);

		//add datetimes to the events.
		$events[0]->_add_relation_to( $datetimes['expired_datetime'], 'Datetime' );
		$events[0]->save();
		$events[1]->_add_relation_to( $datetimes['upcoming_datetime'], 'Datetime' );
		$events[1]->save();
		$events[2]->_add_relation_to( $datetimes['active_datetime'], 'Datetime' );
		$events[2]->save();
		$events[3]->_add_relation_to( $datetimes['sold_out_datetime'], 'Datetime' );
		$events[3]->save();
		$events[4]->_add_relation_to( $datetimes['inactive_datetime'], 'Datetime' );
		$events[4]->save();

		foreach ( $events as $index => $event ) {
			if ( $index !== 4 ) {
				$event->set('status', 'publish' );
				$event->save();
			}
		}

		//run tests for various scenarios.
		foreach ( $datetimes as $type => $datetime ) {
			switch ( $type ) {
				case 'expired_datetime' :
					$dtts = EEM_Datetime::instance()->get_dtt_months_and_years( array(), 'expired' );
					$dtt = reset( $dtts );
					$this->assertEquals( 1, count( $dtts ) );
					$this->assertEquals( $past_start_date->format('Y'), $dtt->dtt_year );
					$this->assertEquals( $past_start_date->format('F'), $dtt->dtt_month );
					break;
				case 'upcoming_datetime' :
					$dtts = EEM_Datetime::instance()->get_dtt_months_and_years( array(), 'upcoming' );
					$dtt = reset( $dtts );
					$this->assertEquals( 1, count( $dtts ) );
					$this->assertEquals( $upcoming_start_date->format('Y'), $dtt->dtt_year );
					$this->assertEquals( $upcoming_start_date->format('F'), $dtt->dtt_month );
					break;
				case 'active_datetime' :
					$dtts = EEM_Datetime::instance()->get_dtt_months_and_years( array(), 'active' );
					$dtt = reset( $dtts );
					$this->assertEquals( 1, count( $dtts ) );
					$this->assertEquals( $current->format('Y'), $dtt->dtt_year );
					$this->assertEquals( $current->format('F'), $dtt->dtt_month );
					break;
				case 'sold_out_datetime' :
					$dtts = EEM_Datetime::instance()->get_dtt_months_and_years( array(), 'upcoming' );
					$dtt = reset( $dtts );
					$this->assertEquals( 1, count( $dtts ) );
					$this->assertEquals( $upcoming_start_date->format('Y'), $dtt->dtt_year );
					$this->assertEquals( $upcoming_start_date->format('F'), $dtt->dtt_month );
					break;
				case 'inactive_datetime' :
					$dtts = EEM_Datetime::instance()->get_dtt_months_and_years( array(), 'inactive' );
					$dtt = reset( $dtts );
					$this->assertEquals( 1, count( $dtts ) );
					$this->assertEquals( $current->format('Y'), $dtt->dtt_year );
					$this->assertEquals( $current->format('F'), $dtt->dtt_month );
					break;
			}
		}
	}


	/**
	 * @since 4.8.27.rc.005
	 */
	public function test_get_datetime_counts_by_status_and_get_datetime_count_for_status() {
		//setup some datetimes for testing with
		$upcoming_datetimes = $this->factory->datetime->create_many(5);
		//set upcoming datetimes to actually be upcoming!
		foreach( $upcoming_datetimes as $datetime ) {
			$datetime->set('DTT_EVT_start', time() + 500 );
			$datetime->save();
		}

		//setup some expired datetimes
		$expired_datetimes = $this->factory->datetime->create_many(2);
		//set expired
		foreach( $expired_datetimes as $datetime ) {
			$datetime->set( 'DTT_EVT_end', time() - 500 );
			$datetime->set( 'DTT_EVT_start', time() - 1000 );
			$datetime->save();
		}

		//active datetimes
		$active_datetime = $this->factory->datetime->create( array( 'DTT_EVT_start' => time() - 500, 'DTT_EVT_end' => time() + 500 ) );

		//now get the results from the method being tested
		$datetimes_count = EEM_Datetime::instance()->get_datetime_counts_by_status();

		$this->assertTrue( is_array( $datetimes_count ) );
		$this->assertEquals( 1, $datetimes_count[ EE_Datetime::active ] );
		$this->assertEquals( 5, $datetimes_count[ EE_Datetime::upcoming ] );
		$this->assertEquals( 2, $datetimes_count[ EE_Datetime::expired ] );

		//test just getting a specific status via get_datetime_count_for_status
		$this->assertEquals( 5, EEM_Datetime::instance()->get_datetime_count_for_status( EE_Datetime::upcoming ) );
		$this->assertEquals( 1, EEM_Datetime::instance()->get_datetime_count_for_status() );
		$this->assertEquals( 2, EEM_Datetime::instance()->get_datetime_count_for_status( EE_Datetime::expired ) );
	}

    /**
     * @since 4.9.74.p
     * @group private-1
     */
    public function testGetAllExcludeProtected()
    {
        // create two events, one is password-protected
        $e_password = $this->new_model_obj_with_dependencies(
            'Event',
            array(
                'status' => EEM_Event::post_status_publish,
                'password' => 'foobar'
            )
        );
        $e_no_password = $this->new_model_obj_with_dependencies(
            'Event',
            array(
                'status' => EEM_Event::post_status_publish,
                'password' => ''
            )
        );

        // create related data
        $d_password = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'EVT_ID' => $e_password->ID()
            )
        );
        $d_no_password = $this->new_model_obj_with_dependencies(
            'Datetime',
            array(
                'EVT_ID' => $e_no_password->ID()
            )
        );

        // fetch related data. Those for password-protected events should be excluded
        $datetime_ids = EEM_Datetime::instance()->get_col(array('exclude_protected'=>true));
        $this->assertArrayContains((string) $d_no_password->ID(),$datetime_ids);
        $this->assertArrayDoesNotContain((string) $d_password, $datetime_ids);
    }
}
