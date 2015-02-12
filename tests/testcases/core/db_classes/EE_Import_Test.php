<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Import_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Import_Test extends EE_UnitTestCase {

	public function test_save_data_array_to_db__from_other_site_first_time(){
		$original_event1 = $this->new_model_obj_with_dependencies('Event');
		$original_datetime1 = $this->new_model_obj_with_dependencies( 'Datetime', array( 'EVT_ID' => $original_event1->ID() ) );
		$original_ticket1 = $this->new_model_obj_with_dependencies( 'Ticket' );
		$original_datetime_ticket = $this->new_model_obj_with_dependencies( 'Datetime_Ticket', array( 'DTT_ID' => $original_datetime1->ID(), 'TKT_ID' => $original_ticket1->ID() ) );


		//now let's make some model objects that AREN'T in this database
		//that could confuse the importer
		$other_db_event = $this->new_model_obj_with_dependencies('Event', array(), false );
		$other_db_event_props = $other_db_event->model_field_array();
		$other_db_event_props[ 'EVT_ID' ] = $original_event1->ID();

		$other_db_event2 = $this->new_model_obj_with_dependencies( 'Event', array(), false );
		$other_db_event2_props = $other_db_event2->model_field_array();
		$other_db_event2_props[ 'EVT_ID' ] = 1000;

		$other_db_datetime = $this->new_model_obj_with_dependencies( 'Datetime', array( 'EVT_ID' => $original_event1->ID(), 'DTT_ID' => $original_datetime1->ID() ), false );
		$other_db_datetime_props = $other_db_datetime->model_field_array();
		$other_db_datetime_props[ 'DTT_ID' ] = $original_datetime1->ID();

		$other_db_ticket = $this->new_model_obj_with_dependencies( 'Ticket', array( 'TKT_ID' => $original_ticket1->ID() ), false );
		$other_db_ticket_props = $other_db_ticket->model_field_array();
		$other_db_ticket_props[ 'TKT_ID' ] = $original_ticket1->ID();

		$other_db_datetime_ticket = EE_Datetime_Ticket::new_instance( array( 'DTT_ID' => $original_datetime1->ID(), 'TKT_ID' => $original_ticket1->ID() ), false );
		$other_db_datetime_ticket_props = $other_db_datetime_ticket->model_field_array();
		$other_db_datetime_ticket_props[ 'DTK_ID' ] = $original_datetime_ticket->ID();

		//@todo: test STRING ids are treated as real FKs, not temp ids
		//@todo: test we dont insert conflicting data
		$event_count = EEM_Event::instance()->count();
		$datetime_count = EEM_Datetime::instance()->count();
		$ticket_count = EEM_Ticket::instance()->count();
		$datetime_ticket_count = EEM_Datetime_Ticket::instance()->count();


		$csv_data_rows = array(
			'Event' => array(
				$other_db_event_props,
				$other_db_event2_props
			),
			'Datetime' => array(
				$other_db_datetime_props
			),
			'Ticket' => array(
				$other_db_ticket_props
			),
			'Datetime_Ticket' => array(
				$other_db_datetime_ticket_props
			)
		);

		//ok give it a whirl...
		$new_mappings = EE_Import::instance()->save_data_rows_to_db($csv_data_rows, true, array() );
		//what should have happened:
		//we should have a mapping for each newly-inserted
		//events...
		$this->assertNotEmpty( $new_mappings );
		$this->assertArrayHasKey( 'Event', $new_mappings );
		$event1_mapping = $new_mappings[ 'Event' ][ $original_event1->ID() ];
		$this->assertNotEmpty( $event1_mapping );
		$this->assertNotEquals( $original_event1->ID(), $event1_mapping );
		$event2_mapping = $new_mappings[ 'Event' ][ 1000 ];
		$this->assertNotEmpty( $event2_mapping );
		$this->assertNotEquals( 1000, $event1_mapping );
		//newly inerted datetime...
		$this->assertNotEmpty( $new_mappings );
		$this->assertArrayHasKey( 'Datetime', $new_mappings );
		$datetime1_mapping = $new_mappings[ 'Datetime' ][ $original_datetime1->ID() ];
		$this->assertNotEmpty( $datetime1_mapping );
		$this->assertNotEquals( $original_datetime1->ID(), $datetime1_mapping );
		//newly inserted ticket
		$this->assertNotEmpty( $new_mappings );
		$this->assertArrayHasKey( 'Ticket', $new_mappings );
		$ticket1_mapping = $new_mappings[ 'Ticket' ][ $original_ticket1->ID() ];
		$this->assertNotEmpty( $ticket1_mapping );
		$this->assertNotEquals( $original_ticket1->ID(), $ticket1_mapping );
		//and newly inserted datetime-ticke...
		$this->assertNotEmpty( $new_mappings );
		$this->assertArrayHasKey( 'Datetime_Ticket', $new_mappings );
		$datetime_ticket_mapping = $new_mappings[ 'Datetime_Ticket' ][ $original_datetime_ticket->ID() ];
		$this->assertNotEmpty( $datetime_ticket_mapping );
		$this->assertNotEquals( $original_datetime_ticket->ID(), $datetime_ticket_mapping );


		//we should have inserted 2 new events
		//the newly inserted datetime shoudl have bene associated to the new event for $other_db_event_props
		//there shoudl be a newly inserted ticket
		//the newly inserted datetime-ticket should hae been associated with the newly inserted datetime and ticket
		//the original event shouldn't be affected, nor should it have more than the original datetime on it
		//the original datetime shoudln't be affected, nor shoudl it have more than the original ticket associagted with it
	}

//	public function test_save_data_array_to_db__from_other_site_second_time(){
//		//test that things in the mapping are remembered
//	}
//
//	public function test_save_data_array_to_db__from_same_site_first_time(){
//		//check for deleted things
//		//should update old thing
//
//	}
//	public function test_save_data_array_to_db__from_same_site_second_time(){
//		//check
//	}

	public function setUp(){
		parent::setUp();
		EE_Import::reset();
	}
}

// End of file EE_Import_Test.php