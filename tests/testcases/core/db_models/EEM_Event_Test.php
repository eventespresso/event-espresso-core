<?php
/**
 * Contains test class for /core/db_models/EEM_Event.model.php
 *
 * @since  		4.6.x
 * @package 		Event Espresso
 * @subpackage 	tests
 */

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

/**
 * All tests for the EEM_Event class.
 *
 * @since 		4.6.x
 * @package 		Event Espresso
 * @subpackage 	tests
 * @group core/db_models
 */
class EEM_Event_Test extends EE_UnitTestCase {


    public function setUp() {
        parent::setUp();
        //set timezone string.  NOTE, this is purposely a high positive timezone string because it works better for testing expiry times.
        update_option( 'timezone_string', 'Australia/Sydney' );
    }


	public function tearDown() {
		//restore the timezone string to the default
		update_option( 'timezone_string', '' );
		parent::tearDown();
	}



	/**
	 * This just sets up some events in the db for running certain tests that query getting events back.
	 * @since 4.6.x
	 */
	protected function _setup_events() {
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
			'inactive_datetime' => $this->factory->datetime->create( array( 'DTT_EVT_start' => $current->sub( new DateInterval( "PT2H") )->format( $full_format ), 'DTT_EVT_end' => $current_end_date->add( new DateInterval( "PT2H" ) )->format( $full_format), 'timezone' => 'America/Toronto', 'formats' =>  $formats ) )
			);

		//setup some events
        /** @var EE_Event[] $events */
        $events = $this->factory->event->create_many( '4' );

		//add datetimes to the events.
		$events[0]->_add_relation_to( $datetimes['expired_datetime'], 'Datetime' );
		$events[0]->save();
		$events[1]->_add_relation_to( $datetimes['upcoming_datetime'], 'Datetime' );
		$events[1]->save();
		$events[2]->_add_relation_to( $datetimes['active_datetime'], 'Datetime' );
		$events[2]->save();
		$events[3]->_add_relation_to( $datetimes['sold_out_datetime'], 'Datetime' );
		$events[3]->save();

		foreach( $events as $event ) {
			$event->set('status', 'publish');
			$event->save();
		}

		//one more event that is just going to be inactive
        /** @var EE_Event $final_event */
        $final_event = $this->factory->event->create();
		$final_event->_add_relation_to( $datetimes['inactive_datetime'], 'Datetime' );
		$final_event->save();

	}



	/**
	 * This tests getting active events.
	 * @since 4.6.x
	 */
	public function test_get_active_events() {
		$this->_setup_events();
		//now do our tests
		$this->assertEquals( 1, EEM_Event::instance()->get_active_events( array(), true ) );
	}


	public function test_get_upcoming_events() {
		$this->_setup_events();
		//now do our tests
		$this->assertEquals( 2, EEM_Event::instance()->get_upcoming_events( array(), true ) );
	}


	public function test_get_expired_events() {
		$this->_setup_events();
		//now do our tests
		$this->assertEquals( 1, EEM_Event::instance()->get_expired_events( array(), true ) );
	}

	public function test_get_inactive_events() {
		$this->_setup_events();
		//now do our tests
		$this->assertEquals( 1, EEM_Event::instance()->get_inactive_events( array(), true ) );
	}

	public function test_get_active_and_upcoming_events() {
		$this->_setup_events();
		//now do our tests
		$this->assertEquals( 3, EEM_Event::instance()->get_active_and_upcoming_events( array(), true ) );
	}


	/**
	 * @see https://events.codebasehq.com/projects/event-espresso/tickets/8799
	 * @group 8799
	 * @since 4.8.8.rc.019
	 */
	public function test_default_reg_status() {
		//first verify the default reg status on config is pending payment
		$this->assertEquals( EEM_Registration::status_id_pending_payment, EE_Registry::instance()->CFG->registration->default_STS_ID );

		//verify creating default event from the model has that default reg status
		/** @type EE_Event $event */
		$event = EEM_Event::instance()->create_default_object();
		$this->assertEquals( EEM_Registration::status_id_pending_payment, $event->default_registration_status() );

		//let's update config in the db to have default reg status of approved
		EE_Registry::instance()->CFG->registration->default_STS_ID = EEM_Registration::status_id_approved;
		EE_Registry::instance()->CFG->update_espresso_config();

		//let's reset for new test
		EEM_Event::reset();
		EE_Registry::reset();

		//k NOW the default reg status in config should be approved
		$this->assertEquals( EEM_Registration::status_id_approved, EE_Registry::instance()->CFG->registration->default_STS_ID );

		//new default event should have approved as the default reg status
		$event = EEM_Event::instance()->create_default_object();
		$this->assertEquals( EEM_Registration::status_id_approved, $event->default_registration_status() );
	}

    /**
     * @since $VID:$
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
	public function testGetQuestionGroupsForEvent()
    {
        $r = $this->new_model_obj_with_dependencies(
            'Registration',
            [
                'REG_count' => 1
            ]
        );
        $r->event_obj()->add_question_group(EEM_Question_Group::system_personal, true);
        $r->event_obj()->add_question_group(EEM_Question_Group::system_address, true);
        // Just add another question group, but it will only be for additional attendees.
        $additional_qg = $this->new_model_obj_with_dependencies('Question_Group');
        $r->event_obj()->add_question_group($additional_qg, false);
        $qgs = EEM_Event::instance()->get_question_groups_for_event($r->event_ID(), $r);
        $this->assertEquals(2, count($qgs));
        $this->assertArrayContains(
            EEM_Question_Group::instance()->get_one_by_ID(EEM_Question_Group::system_personal),
            $qgs
        );
        $this->assertArrayContains(
            EEM_Question_Group::instance()->get_one_by_ID(EEM_Question_Group::system_address),
            $qgs
        );
    }

}
// Location: testcases/core/db_models/EEM_Event_Test.php
