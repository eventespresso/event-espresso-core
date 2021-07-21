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

	/**
	 * test we dont insert conflicting data (especially term-taxonomies)
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
		$this->markTestSkipped('addressed on ticket 7537.');
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

	/**
	 * test that term relationships are migrated ok if they would conflict with something already in the db
	 */
	function test_save_data_array_to_db__from_other_site__no_duplicate_term_relationships() {
		/**
		 * @todo: unskip this once its working again
		 */
		$this->markTestSkipped('fixed on ticket 7537, https://events.codebasehq.com/projects/event-espresso/tickets/7537');
		$event_id_from_other_db = 122;
		$term_tax_from_other_db = 32;
		$old_term_r_order = 3;
		$new_term_r_order = 123;

		$old_term_r_data = array(
			'object_id' => $event_id_from_other_db,
			'term_taxonomy_id' => $term_tax_from_other_db,
			'term_order' => $old_term_r_order
		);

		$a_real_event = $this->new_model_obj_with_dependencies( 'Event' );
		$a_real_term_taxonomy = $this->new_model_obj_with_dependencies( 'Term_Taxonomy' );
		$a_real_term_r = $this->new_model_obj_with_dependencies( 'Term_Relationship', array( 'object_id' => $a_real_event->ID(), 'term_taxonomy_id' => $a_real_term_taxonomy->ID(), 'term_order' => $new_term_r_order ) );

		$csv_data = array(
			'Term_Relationship' => array(
				$old_term_r_data
			)
		);
		$mapping_data = array(
			'Event' => array(
				$event_id_from_other_db => $a_real_event->ID()
			),
			'Term_Taxonomy' => array(
				$term_tax_from_other_db => $a_real_term_taxonomy->ID()
			)
		);
		$old_term_r_count = EEM_Term_Relationship::instance()->count();
		$new_mapping = EE_Import::instance()->save_data_rows_to_db( $csv_data, true, $mapping_data );
		$this->_assertNoImportErrors();
		//there should be NO new term relationships. it should have just been updated
		$this->assertEquals( $old_term_r_count, EEM_Term_Relationship::instance()->count() );
		$this->assertEquals( 1, count( $new_mapping[ 'Term_Relationship' ] ) );
		$old_term_r_id = EEM_Term_Relationship::instance()->get_index_primary_key_string( $old_term_r_data );
		$new_term_r_id = $new_mapping[ 'Term_Relationship' ][ $old_term_r_id ];
		$new_term_r = EEM_Term_Relationship::instance()->get_one_by_ID( $new_term_r_id );
		$this->assertInstanceOf( 'EE_Term_Relationship', $new_term_r );
		$this->assertEquals( $old_term_r_order, $new_term_r->get('term_order' ) );

	}
	/**
	 * @todo: account for wp 4.2 term splitting (https://developer.wordpress.org/plugins/taxonomy/working-with-split-terms-in-wp-4-2/)
	 */
	function test_save_data_array_to_db__from_this_site__term_split(){
		//create term and term taxonomy
		$term = $this->new_model_obj_with_dependencies( 'Term', array( 'name' => 'Jaguar', 'slug' => 'jag' ) );
		$ttcar = $this->new_model_obj_with_dependencies( 'Term_Taxonomy', array( 'term_id' => $term->ID(), 'taxonomy' => 'cars', 'description' => 'A fast car' ) );
		$ttcat = $this->new_model_obj_with_dependencies( 'Term_Taxonomy', array( 'term_id' => $term->ID(), 'taxonomy' => 'cats', 'description' => 'A large black cat that likes to swim' ) );
		//create "csv" data for it (pretend exported)
		$csv_data = array(
			'Term' => array(
				$term->model_field_array()
			),
			'Term_Taxonomy' => array(
				$ttcar->model_field_array(),
				$ttcat->model_field_array()
			)
		);
		$this->assertEquals( $ttcat->get('term_id' ), $ttcar->get( 'term_id' ) );
		//split the term in the "wp" way. Our model objet $ttcar will NOT get updated on its own
		$new_term_id_for_car = _split_shared_term( $term->ID(), $ttcar->ID() );
		$ttcar = EEM_Term_Taxonomy::instance()->refresh_entity_map_from_db( $ttcar->ID() );
//		echo "updated term taxonomy:";var_dump($ttcar->model_field_array());
		$this->assertNotEquals( $ttcat->get( 'term_id' ), $ttcar->get( 'term_id' ) );
		//import it
		$new_mapping = EE_Import::instance()->save_data_rows_to_db( $csv_data, false, array() );

		$ttcar = EEM_Term_Taxonomy::instance()->refresh_entity_map_from_db( $ttcar->ID() );

		//when it's done importing, we should have saved a term-taxonomy for the new term, not re-inserted a term-taxonomy to the old term
		//and because it used the models, the model objects we have in scope should already be up-to-date
		$this->assertEquals( $new_term_id_for_car, $ttcar->get( 'term_id' ) );

	}
	/**
	 * in wp 4.1 there was no functions for term splitting. So let's add a filter
	 * to simulate that and mostly make sure there are no fatal errors
	 */
	function test_save_data_array_to_db__from_this_site__term_split__in_wp_41(){
		add_filter( 'FHEE__EE_Import__handle_split_term_ids__function_exists', '__return_false' );
		$term = $this->new_model_obj_with_dependencies( 'Term', array( 'name' => 'Jaguar', 'slug' => 'jag' ) );
		$ttcar = $this->new_model_obj_with_dependencies( 'Term_Taxonomy', array( 'term_id' => $term->ID(), 'taxonomy' => 'cars', 'description' => 'A fast car' ) );
		$ttcat = $this->new_model_obj_with_dependencies( 'Term_Taxonomy', array( 'term_id' => $term->ID(), 'taxonomy' => 'cats', 'description' => 'A large black cat that likes to swim' ) );
		//create "csv" data for it (pretend exported)
		$csv_data = array(
			'Term' => array(
				$term->model_field_array()
			),
			'Term_Taxonomy' => array(
				$ttcar->model_field_array(),
				$ttcat->model_field_array()
			)
		);
		//now there should just not be any fatal errors when importing
		EE_Import::instance()->save_data_rows_to_db( $csv_data, false, array() );
		$this->assertTrue( true );
	}
	//@todo: test state which have int PKs, but should haev an unique index according to state abbrev and country
	//@todo: test more regarding things with NO pks
	//@todo: I suspect people will want to avoid duplicate states. This could be achieved by having the state abbrev and country ISO be a unique key
	//@todo: add unit tests for inserting and updating models with no pks

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
	protected function _assertNoImportErrors(){
		$notices = EE_Error::get_notices(false, false, true);
		$this->assertEmpty( EE_Import::instance()->get_total_update_errors(), isset( $notices['errors'] ) ? $notices['errors'] : '');
		$this->assertEmpty( EE_Import::instance()->get_total_insert_errors(), isset( $notices['errors'] ) ? $notices['errors'] : '' );
	}
}
//in case this is run on WP 4.1, we'd still like to be able to test this WP 4.2 feature
if( ! function_exists( '_split_shared_term' ) ){
	/**
	 * Create a new term for a term_taxonomy item that currently shares its term with another term_taxonomy.
	 *
	 * @since 4.2.0
	 * @access private
	 *
	 * @param int  $term_id          ID of the shared term.
	 * @param int  $term_taxonomy_id ID of the term_taxonomy item to receive a new term.
	 * @return int|WP_Error When the current term does not need to be split (or cannot be split on the current database
	 *                      schema), `$term_id` is returned. When the term is successfully split, the new term_id is
	 *                      returned. A `WP_Error` is returned for miscellaneous errors.
	 */
	function _split_shared_term( $term_id, $term_taxonomy_id ) {
		global $wpdb;
		// Don't try to split terms if database schema does not support shared slugs.
		$current_db_version = get_option( 'db_version' );
		if ( $current_db_version < 30133 ) {
			return $term_id;
		}

		// If there are no shared term_taxonomy rows, there's nothing to do here.
		$shared_tt_count = $wpdb->get_var( $wpdb->prepare( "SELECT COUNT(*) FROM $wpdb->term_taxonomy tt WHERE tt.term_id = %d AND tt.term_taxonomy_id != %d", $term_id, $term_taxonomy_id ) );
		if ( ! $shared_tt_count ) {
			return $term_id;
		}

		// Pull up data about the currently shared slug, which we'll use to populate the new one.
		$shared_term = $wpdb->get_row( $wpdb->prepare( "SELECT t.* FROM $wpdb->terms t WHERE t.term_id = %d", $term_id ) );

		$new_term_data = array(
			'name' => $shared_term->name,
			'slug' => $shared_term->slug,
			'term_group' => $shared_term->term_group,
		);

		if ( false === $wpdb->insert( $wpdb->terms, $new_term_data ) ) {
			return new WP_Error( 'db_insert_error', esc_html__( 'Could not split shared term.' ), $wpdb->last_error );
		}

		$new_term_id = (int) $wpdb->insert_id;

		// Update the existing term_taxonomy to point to the newly created term.
		$wpdb->update( $wpdb->term_taxonomy,
			array( 'term_id' => $new_term_id ),
			array( 'term_taxonomy_id' => $term_taxonomy_id )
		);

		// Reassign child terms to the new parent.
		$term_taxonomy = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $wpdb->term_taxonomy WHERE term_taxonomy_id = %d", $term_taxonomy_id ) );
		$children_tt_ids = $wpdb->get_col( $wpdb->prepare( "SELECT term_taxonomy_id FROM $wpdb->term_taxonomy WHERE taxonomy = %s AND parent = %d", $term_taxonomy->taxonomy, $term_id ) );

		if ( ! empty( $children_tt_ids ) ) {
			foreach ( $children_tt_ids as $child_tt_id ) {
				$wpdb->update( $wpdb->term_taxonomy,
					array( 'parent' => $new_term_id ),
					array( 'term_taxonomy_id' => $child_tt_id )
				);
				clean_term_cache( $term_id, $term_taxonomy->taxonomy );
			}
		} else {
			// If the term has no children, we must force its taxonomy cache to be rebuilt separately.
			clean_term_cache( $new_term_id, $term_taxonomy->taxonomy );
		}

		// Clean the cache for term taxonomies formerly shared with the current term.
		$shared_term_taxonomies = $wpdb->get_row( $wpdb->prepare( "SELECT taxonomy FROM $wpdb->term_taxonomy WHERE term_id = %d", $term_id ) );
		if ( $shared_term_taxonomies ) {
			foreach ( $shared_term_taxonomies as $shared_term_taxonomy ) {
				clean_term_cache( $term_id, $shared_term_taxonomy );
			}
		}

		// Keep a record of term_ids that have been split, keyed by old term_id. See {@see wp_get_split_term()}.
		$split_term_data = get_option( '_split_terms', array() );
		if ( ! isset( $split_term_data[ $term_id ] ) ) {
			$split_term_data[ $term_id ] = array();
		}

		$split_term_data[ $term_id ][ $term_taxonomy->taxonomy ] = $new_term_id;

		update_option( '_split_terms', $split_term_data );

		/**
		 * Fires after a previously shared taxonomy term is split into two separate terms.
		 *
		 * @since 4.2.0
		 *
		 * @param int    $term_id          ID of the formerly shared term.
		 * @param int    $new_term_id      ID of the new term created for the $term_taxonomy_id.
		 * @param int    $term_taxonomy_id ID for the term_taxonomy row affected by the split.
		 * @param string $taxonomy         Taxonomy for the split term.
		 */
		do_action( 'split_shared_term', $term_id, $new_term_id, $term_taxonomy_id, $term_taxonomy->taxonomy );

		return $new_term_id;
	}
}
if( ! function_exists( 'wp_get_split_terms' ) ) {
	/**
	 *
	 * @param type $old_term_id
	 * @return int
	 */
	function wp_get_split_terms( $old_term_id ) {
		$split_terms = get_option( '_split_terms', array() );

		$terms = array();
		if ( isset( $split_terms[ $old_term_id ] ) ) {
			$terms = $split_terms[ $old_term_id ];
		}

		return $terms;
	}
}
if( ! function_exists( 'wp_get_split_term' ) ){
	/**
	 * Get the new term ID corresponding to a previously split term.
	 *
	 * @since 4.2.0
	 *
	 * @param int    $old_term_id Term ID. This is the old, pre-split term ID.
	 * @param string $taxonomy    Taxonomy that the term belongs to.
	 * @return bool|int If a previously split term is found corresponding to the old term_id and taxonomy, the new term_id
	 *                  will be returned. If no previously split term is found matching the parameters, returns false.
	 */
	function wp_get_split_term( $old_term_id, $taxonomy ) {
		$split_terms = wp_get_split_terms( $old_term_id );

		$term_id = false;
		if ( isset( $split_terms[ $taxonomy ] ) ) {
			$term_id = (int) $split_terms[ $taxonomy ];
		}

		return $term_id;
}
}

// End of file EE_Import_Test.php