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

	/**
	 * test verifies that if importing from site A to B, is the exported data from A
	 * coincidentally has the same IDs as data in site B, that it DOES NOT overwrite it
	 */
	public function test_save_data_array_to_db__from_other_site__data_with_same_ids(){
		//add some stuff to the db, but just keep references to their clones (which won't be affected by the entity mapper)
		$original_event1 = clone $this->new_model_obj_with_dependencies('Event');
		$original_datetime1 = clone $this->new_model_obj_with_dependencies( 'Datetime', array( 'EVT_ID' => $original_event1->ID() ) );
		$original_ticket1 = clone $this->new_model_obj_with_dependencies( 'Ticket' );
		$original_datetime_ticket = clone $this->new_model_obj_with_dependencies( 'Datetime_Ticket', array( 'DTT_ID' => $original_datetime1->ID(), 'TKT_ID' => $original_ticket1->ID() ) );


		//now let's make some model objects that AREN'T in this database
		//that could confuse the importer
		$other_db_event = $this->new_model_obj_with_dependencies('Event', array(), false );
		$other_db_event_props = $other_db_event->model_field_array();
		$other_db_event_props[ 'EVT_ID' ] = $original_event1->ID();

		$other_db_event2 = $this->new_model_obj_with_dependencies( 'Event', array(), false );
		$other_db_event2_props = $other_db_event2->model_field_array();
		$other_db_event2_props[ 'EVT_ID' ] = 1000;

		$other_db_datetime = $this->new_model_obj_with_dependencies( 'Datetime', array( 'EVT_ID' => $original_event1->ID() ), false );
		$other_db_datetime_props = $other_db_datetime->model_field_array();
		$other_db_datetime_props[ 'DTT_ID' ] = $original_datetime1->ID();

		$other_db_ticket = $this->new_model_obj_with_dependencies( 'Ticket', array( 'TKT_ID' => $original_ticket1->ID() ), false );
		$other_db_ticket_props = $other_db_ticket->model_field_array();
		$other_db_ticket_props[ 'TKT_ID' ] = $original_ticket1->ID();

		$other_db_datetime_ticket = EE_Datetime_Ticket::new_instance( array( 'DTT_ID' => $original_datetime1->ID(), 'TKT_ID' => $original_ticket1->ID() ), false );
		$other_db_datetime_ticket_props = $other_db_datetime_ticket->model_field_array();
		$other_db_datetime_ticket_props[ 'DTK_ID' ] = $original_datetime_ticket->ID();

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


		//we should have inserted 2 new events, 1 new datetime, 1 new ticket and 1 new relation
		$this->assertEquals( $event_count + 2, EEM_Event::instance()->count() );
		$this->assertEquals( $datetime_count + 1, EEM_Datetime::instance()->count() );
		$this->assertEquals( $ticket_count + 1, EEM_Ticket::instance()->count() );
		$this->assertEquals( $datetime_ticket_count + 1, EEM_Datetime_Ticket::instance()->count() );
		//the newly inserted datetime shoudl have bene associated to the new event for $other_db_event_props
		$inserted_datetime_from_other_db = EEM_Datetime::instance()->get_one_by_ID( $datetime1_mapping );
		$this->assertEquals( $event1_mapping, $inserted_datetime_from_other_db->get('EVT_ID') );
		//there shoudl be a newly inserted ticket
		$inserted_ticket_from_other_db = EEM_Ticket::instance()->get_one_by_ID( $ticket1_mapping );
		$this->assertNotNull( $inserted_ticket_from_other_db );
		//the newly inserted datetime-ticket should hae been associated with the newly inserted datetime and ticket
		$inserted_datetime_ticket_from_other_db = EEM_Datetime_Ticket::instance()->get_one_by_ID( $datetime_ticket_mapping );
		$this->assertEquals( $ticket1_mapping, $inserted_datetime_ticket_from_other_db->get( 'TKT_ID' ) );
		$this->assertEquals( $datetime1_mapping, $inserted_datetime_ticket_from_other_db->get( 'DTT_ID' ) );
		//the original event shouldn't be affected, nor should it have more than the original datetime on it
		$updated_event1 = EEM_Event::instance()->refresh_entity_map_from_db( $original_event1->ID() );
		$this->assertEEModelObjectsEquals( $original_event1, $updated_event1 );
		//the original datetime shoudln't be affected, nor shoudl it have more than the original ticket associagted with it
		$updated_datetime1 = EEM_Datetime::instance()->refresh_entity_map_from_db( $original_datetime1->ID() );
		$this->assertEEModelObjectsEquals( $original_datetime1, $updated_datetime1 );
	}

	//@todo: test we dont insert conflicting data (especially term-taxonomies)
	/**
	 * @group uno
	 */
	public function test_save_data_array_to_db__from_other_site__avoid_inserting_conflicting_data() {
		$term_taxonomy = $this->new_model_obj_with_dependencies( 'Term_Taxonomy', array( 'taxonomy' => 'category', 'description' => 'original term-taxonomy' ) );
		$this->assertEquals( 'original term-taxonomy', $term_taxonomy->get( 'description' ) );
		$term_taxonomy_from_other_db = $this->new_model_obj_with_dependencies( 'Term_Taxonomy',
				array(
					'term_id' => $term_taxonomy->get('term_id'),
					'taxonomy' => 'category',
					'description' => 'in other db' ), false );
		$country_usa = EEM_Country::instance()->get_one_by_ID( 'US' );
		$this->assertEquals( false, $country_usa->get( 'CNT_is_EU' ) );

		//have the contry be slightly modified in the exporting site
		$country_usa_props = $country_usa->model_field_array();
		$country_usa_props[ 'CNT_is_EU' ] = true;
		$csv_data_rows = array(
			'Term_Taxonomy' => array(
				$term_taxonomy_from_other_db->model_field_array()
			),
			'Country' => array(
				$country_usa_props
			)
		);
		$term_taxonomy_count = EEM_Term_Taxonomy::instance()->count();
		$country_count = EEM_Country::instance()->count();

		//ok give it a whirl (keep the term-taxonomy's "term_id" the same by having it map to itself, obviously super unlikely but helps testing)
		EE_Import::instance()->save_data_rows_to_db($csv_data_rows, true, array( 'Term' => array( $term_taxonomy->get( 'term_id' ) => $term_taxonomy->get( 'term_id' ) ) ) );

		$this->assertEmpty( EE_Import::instance()->get_total_update_errors() );
		$this->assertEmpty( EE_Import::instance()->get_total_inserts() );
		$this->assertEmpty( EE_Import::instance()->get_total_insert_errors() );
		$this->assertEquals( 2, EE_Import::instance()->get_total_updates() );
		//there shouldn't be any new term taxonomies or countries
		$this->assertEquals( $term_taxonomy_count, EEM_Term_Taxonomy::instance()->count() );
		$this->assertEquals( $country_count, EEM_Country::instance()->count() );
		//however, they should be updated
		$updated_term_taxonomy = EEM_Term_Taxonomy::instance()->refresh_entity_map_from_db( $term_taxonomy->ID() );
		$this->assertEquals( 'in other db', $updated_term_taxonomy->get( 'description' ) );
		$updated_country = EEM_Country::instance()->refresh_entity_map_from_db( $country_usa->ID() );
		$this->assertEquals( true, $updated_country->get( 'CNT_is_EU' ) );
	}
	/**
	 * test if an INT fk doesn't exist -> set it to NULL!
	 * if a STRING fk exists -> leave it alone
	 */
	public function test_save_data_array_to_db__from_other_site__fks_that_dont_exist() {
		//model object with foreign key that's an INT (should be set to 0 or NULL)
		$att = $this->new_model_obj_with_dependencies( 'Attendee', array( 'STA_ID' => 99999, 'CNT_ISO' => '77' ), false );
		$att_props = $att->model_field_array();
		$att_props[ 'ATT_ID' ] = 123;
		$csv_data = array(
			'Attendee' => array(
				$att_props
			)
		);
		$att_count = EEM_Attendee::instance()->count();
		$mappings = EE_Import::instance()->save_data_rows_to_db($csv_data, true, array() );
		$this->assertEquals( $att_count + 1, EEM_Attendee::instance()->count() );
		//the STA_ID should ahve been set to 0, but teh CNT_ISO should have been left as-is
		$att_id_in_db = $mappings[ 'Attendee' ][ 123 ];
		$att_in_db = EEM_Attendee::instance()->get_one_by_ID( $att_id_in_db );
		//model object with a foreign key that's a STRING (should be left as-is)
		$this->assertEquals( 0, $att_in_db->get( 'STA_ID' ) );
		$this->assertEquals( '77', $att_in_db->get( 'CNT_ISO' ) );
	}

	/**
	 * @todo: if a foreign key can point to multiple models, only use mappings
	 * that apply
	 */
	public function test_save_data_array_to_db__from_other_site__fks_that_point_to_multiple_models() {
		//multiple types of fks that point ot multiple models: ones accompanied by a model name field and ones without
		//using model name field: extra metas
		//sans-model name field: term-relationships
		$extra_meta_id = 1;
		$extra_meta_id2 = 4;
		$imaginary_txn_or_reg_id = 2;

		$an_event_id = 3;

		$csv_data = array(
			'Extra_Meta' => array(
				//two extra meta rows, attached to different model objects
				//but each coincidentally has the same ID
				array(
					'EXM_ID' => $extra_meta_id,
					'OBJ_ID' => $imaginary_txn_or_reg_id,
					'EXM_type' => 'Transaction',
					'EXM_key' => 'foo',
					'EXM_value' => 'bar'
				),
				array(
					'EXM_ID' => $extra_meta_id2,
					'OBJ_ID' => $imaginary_txn_or_reg_id,
					'EXM_type' => 'Registration',
					'EXM_key' => 'foo',
					'EXM_value' => 'bar'
				)
			),
			'Term_Relationship' => array(
				array(
					'object_id' => $an_event_id,//an "event"
					'term_taxonomy_id' => 0,
					'term_order' => 1
				)
			)
		);

		$mapped_txn_id = 4;
		$mapped_reg_id = 124;
		$mapped_event_id = 322;
		$mappings = array(
			'Transaction' => array(
				$imaginary_txn_or_reg_id => $mapped_txn_id
			),
			'Registration' => array(
				$imaginary_txn_or_reg_id => $mapped_reg_id
			),
			'Event' => array(
				$an_event_id => $mapped_event_id
			)
		);
		//start test
		$new_mappings = EE_Import::instance()->save_data_rows_to_db( $csv_data, true, $mappings );
		//ok, so we should have inserted 3 things,
		$this->assertEquals( 2, count( $new_mappings[ 'Extra_Meta' ] ) );
		$this->assertEquals( 1, count( $new_mappings[ 'Term_Relationship' ] ) );
		//check that they correctly used the mappings that previously existed
		$inserted_extra_meta_1_id = $new_mappings[ 'Extra_Meta' ][ $extra_meta_id ];
		$inserted_extra_meta_1 = EEM_Extra_Meta::instance()->get_one_by_ID( $inserted_extra_meta_1_id );
		$this->assertEquals( 'Transaction', $inserted_extra_meta_1->get( 'EXM_type' ) );
		$this->assertEquals( $mapped_txn_id, $inserted_extra_meta_1->get( 'OBJ_ID' ) );
		$inserted_extra_meta_2_id = $new_mappings[ 'Extra_Meta' ][ $extra_meta_id2 ];
		$inserted_extra_meta_2 = EEM_Extra_Meta::instance()->get_one_by_ID( $inserted_extra_meta_2_id );
		$this->assertEquals( 'Registration', $inserted_extra_meta_2->get( 'EXM_type' ) );
		$this->assertEquals( $mapped_reg_id, $inserted_extra_meta_2->get( 'OBJ_ID' ) );
		$inserted_term_r_id = $new_mappings[ 'Term_Relationship' ][ EEM_Term_Relationship::instance()->get_index_primary_key_string( $csv_data[ 'Term_Relationship' ][ 0 ])];
		$term_r = EEM_Term_Relationship::instance()->get_one_by_ID( $inserted_term_r_id );
		$this->assertInstanceOf( 'EE_Term_Relationship', $term_r);
		$this->assertEquals( $mapped_event_id, $term_r->get('object_id' ) );

	}
	//@todo: test more regarding things with NO pks

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