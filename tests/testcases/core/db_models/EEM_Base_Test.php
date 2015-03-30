<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EEM_Base_Test
 * Tests EEM_Base core functionality. And currently also does the job of making sure all existing models are setup correctly
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
/**
 * @group core/db_models
 */
class EEM_Base_Test extends EE_UnitTestCase{
	public function test_models_defined_ok(){
		foreach(EE_Registry::instance()->non_abstract_db_models as $model){
			$model_instance = EE_Registry::instance()->load_model($model);
			$this->assertInstanceOf('EEM_Base', $model_instance);
			//checks their relations
			foreach($model_instance->relation_settings() as $relation_name => $relation_obj){
				//verify that each relation is named according to an existing model
				$related_model_instance = EE_Registry::instance()->load_model($relation_name);
				$this->assertInstanceOf('EE_Model_Relation_Base', $relation_obj);
			}
			foreach($model_instance->field_settings(true) as $field_name => $field_obj){
				$this->assertInstanceOf('EE_Model_Field_Base', $field_obj);
			}
		}
	}

	/**
	 * Verifies that for each model, the tables it claims to require have been installed
	 */
	public function test_model_tables_exist(){
		foreach(EE_Registry::instance()->non_abstract_db_models as $model){
			$model_instance = EE_Registry::instance()->load_model($model);
			foreach($model_instance->get_tables() as $table_alias => $table_obj){
				$this->assertTableExists($table_obj->get_table_name(),$model);
			}
		}
	}
//	public function test_models_can_insert(){
//		foreach(EE_Registry::instance()->non_abstract_db_models as $model){
//			$model_instance = EE_Registry::instance()->load_model($model);
//			$id = $model_instance->insert(array());
//			$this->assertNotEmpty($id);
//		}
//	}

	/**
	 * checks that EEM_Base::has_field works properly
	 */
	function test_has_field(){
		$this->assertTrue(EEM_Question::instance()->has_field('QST_ID'));
		$this->assertTrue(EEM_QUestion::instance()->has_field('QST_admin_only'));
		$this->assertFalse(EEM_Question::instance()->has_field('monkey brains'));
	}

	/**
	 * checks that adding a LIKE in teh WHERE clauses works ok
	 */
	function test_where_like(){
		$attendees_before = EEM_Attendee::instance()->get_all();
		$this->assertEmpty($attendees_before);

		$a = EE_Attendee::new_instance(array('ATT_email'=>'monkey123@hotmail.com'));
		$a->save();

		$attendees_after_insert = EEM_Attendee::instance()->get_all();
		$this->assertEquals(1,count($attendees_after_insert));

		$attendee_found = EEM_Attendee::instance()->get_one(array(array('ATT_email'=>array('LIKE','%key12%'))));
		$this->assertInstanceOf('EE_Attendee', $attendee_found);
		$this->assertEquals($a->ID(),$attendee_found->ID());
	}

	public function test_delete(){
		$e1 = EE_Event::new_instance();
		$e1->save();
		$e2 = EE_Event::new_instance();
		$e2->save();
		$e3 = EE_Event::new_instance();
		$e3->save();
		//now assert things are as they should be: the items are in teh Db and the entity map
		$this->assertEquals( EEM_Event::instance()->get_one_by_ID( $e1->ID() ), $e1 );
		$this->assertEquals( EEM_Event::instance()->get_one_by_ID( $e2->ID() ), $e2 );
		$this->assertEquals( EEM_Event::instance()->get_one_by_ID( $e3->ID() ), $e3 );
		$this->assertEquals( EEM_Event::instance()->get_from_entity_map( $e1->ID() ), $e1 );
		$this->assertEquals( EEM_Event::instance()->get_from_entity_map( $e2->ID() ), $e2 );
		$this->assertEquals( EEM_Event::instance()->get_from_entity_map( $e3->ID() ), $e3 );

		//now run a delete query that should have deleted $e1 and $e2
		EEM_Event::instance()->delete_permanently( array( array( 'EVT_ID' => array( '<=', $e2->ID() ) ) ) );

		//check $e1 and $e2 don't exist in the DB anymore
		$this->assertEmpty( EEM_Event::instance()->get_one_by_ID( $e1->ID() ) );
		$this->assertEmpty( EEM_Event::instance()->get_one_by_ID( $e2->ID() ) );
		$this->assertEquals( EEM_Event::instance()->get_one_by_ID( $e3->ID() ), $e3 );
		//and now chekc $e1 and $e2 don't exist in the entity map either
		$this->assertEmpty( EEM_Event::instance()->get_from_entity_map( $e1->ID() ) );
		$this->assertEmpty( EEM_Event::instance()->get_from_entity_map( $e2->ID() ) );
		$this->assertEquals( EEM_Event::instance()->get_from_entity_map( $e3->ID() ), $e3 );
	}

	/**
	 *
	 * @throws EE_Error
	 */
	public function test_distanced_HABTM_join(){
		try{
			EEM_Line_Item::instance()->get_all(array(array('Ticket.Datetime.EVT_ID'=>1,'TXN_ID'=>1)));
			$this->assertTrue( TRUE );
		}catch( EE_Error $e){
			throw $e;
		}
	}
	public function test_get_col(){
		$att1 = EEM_Attendee::instance()->insert( array( 'ATT_fname' => 'one' ) );
		$att2 = EEM_Attendee::instance()->insert( array( 'ATT_fname' => 'two' ) );
		$att3 = EEM_Attendee::instance()->insert( array( 'ATT_fname' => 'three' ) );
		$att4 = EEM_Attendee::instance()->insert( array( 'ATT_fname' => 'four' ) );

		$all = EEM_Attendee::instance()->get_col();
		$this->assertArrayContains( $att1, $all );
		$this->assertArrayContains( $att2, $all );
		$this->assertArrayContains( $att3, $all );
		$this->assertArrayContains( $att4, $all );

		$just_two_and_threes_names = EEM_Attendee::instance()->get_col( array( array( 'ATT_fname' => array( 'IN', array( 'two', 'three' ) ) ) ), 'ATT_fname' );
		$this->assertArrayDoesNotContain( 'one', $just_two_and_threes_names );
		$this->assertArrayContains('two', $just_two_and_threes_names );
		$this->assertArrayContains( 'three', $just_two_and_threes_names );
		$this->assertArrayDoesNotContain( 'four', $just_two_and_threes_names );
	}

	/**
	 *
	 */
	public function test_update__keeps_model_objs_in_sync(){
		$att1 = EE_Attendee::new_instance( array( 'ATT_fname' => 'one' ) );
		$att2 = EE_Attendee::new_instance( array( 'ATT_fname' => 'two' ) );
		$att3 = EE_Attendee::new_instance( array( 'ATT_fname' => 'three' ) );
		$att1->save();
		$att2->save();
		$att3->save();

		//test taht when do perform an update, the model objects are updated also
		$attm = EE_Registry::instance()->load_model( 'EEM_Attendee' );
		$attm->update( array( 'ATT_fname' => 'win' ), array( array( 'ATT_fname' => 'two' ) ) );
		$this->assertEquals( 'one', $att1->fname() );
		$this->assertEquals( 'win', $att2->fname() );
		$this->assertEquals( 'three', $att3->fname() );

		//now test doing an update that should be more efficient wehre we DON'T update
		//model objects
		$attm->update( array( 'ATT_fname' => 'win_again'), array( array( 'ATT_fname' => 'one' ) ), FALSE );
		$this->assertEquals( 'one', $att1->fname() );
		$this->assertEquals( 'win', $att2->fname() );
		$this->assertEquals( 'three', $att3->fname() );
		global $wpdb;
		$name_in_db = $wpdb->get_var( "select ATT_fname FROM " . $wpdb->prefix . "esp_attendee_meta WHERE ATT_ID = " . $att1->ID() );
		$this->assertEquals( 'win_again', $name_in_db );

		//also test to make sure there are no errors when there was nothing to update in the entity map
		$att4 = EEM_Attendee::instance()->insert( array( 'ATT_fname' => 'four' ) );
		$wpdb->last_error = NULL;
		EEM_Attendee::instance()->update( array( 'ATT_fname' => 'lose' ), array( array( 'ATT_fname' => 'four' ) ) );
		$this->assertEmpty( $wpdb->last_error );

		//and that there are no errors when nothing at all is updated
		EEM_Attendee::instance()->update( array( 'ATT_fname' => 'lose_again'), array( array( 'ATT_fname' => 'nonexistent' ) ) );
		$this->assertEmpty( $wpdb->last_error );
	}

	/**
	 * @group 6767
	 */
	function test_two_joins(){
		EEM_Attendee::instance()->get_all( array( array( 'Registration.Event.EVT_name' => 'bob' ) ) );
		$this->assertTrue(TRUE, 'No exception thrown' );
	}

	/**
	 *
	 * @group 7151
	 */
	function test_refresh_entity_map_from_db(){
		//get an object purposefully out-of-sync with the DB
		//call this and make sure it's wiped clean and
		$p = $this->new_model_obj_with_dependencies( 'Payment', array ( 'PAY_amount' => 25 ) );
		$p->save();
		$this->assertEquals( $p,  EEM_Payment::instance()->get_from_entity_map( $p->ID() ) );

		//now manually update it in teh DB, but not the model object
		global $wpdb;
		$affected = $wpdb->query( $wpdb->prepare( "update {$wpdb->prefix}esp_payment SET PAY_amount = 100, TXN_ID = 0 WHERE PAY_ID = %d", $p->ID() ) );
		$this->assertEquals( 1, $affected );

		//and when it's refreshed, its PAY_amount should be updated too and it should no longer have any transaction cached or evenfindable
		EEM_Payment::instance()->refresh_entity_map_from_db( $p->ID() );
		$this->assertEquals( 100, $p->get( 'PAY_amount' ) );
		$this->assertEquals( 0, $p->get ('TXN_ID' ) );
		$this->assertEquals( array(), $p->get_all_from_cache( 'Transaction' ) );
		$this->assertEquals( NULL, $p->transaction() );
	}

	/**
	 * @group 7151
	 */
	function test_fresh_entity_map_with(){
		$p = $this->new_model_obj_with_dependencies( 'Payment', array ( 'PAY_amount' => 25 ) );
		$p->save();
		$this->assertEquals( $p,  EEM_Payment::instance()->get_from_entity_map( $p->ID() ) );
		//now purposefully make a naughty payment which isn't in the entity map
		$p2 = clone $p;
		$this->assertFalse( $p2->in_entity_map() );
		//make the two EE_Payments diverge
		$p2->set( 'PAY_amount', 99 );
		$t = EE_Transaction::new_instance();
		$p2->cache( 'Transaction', $t );
		$this->assertEquals( 25, $p->get( 'PAY_amount' ) );
		$this->assertEquals( 99, $p2->get( 'PAY_amount' ) );
		$this->assertNotEquals( $p->get_all_from_cache( 'Transaction' ), $p2->get_all_from_cache( 'Transaction' ) );
		//now update the payment in the entity map with the other
		EEM_Payment::instance()->refresh_entity_map_with( $p->ID(), $p2 );
		$this->assertEquals( 99, $p->get ('PAY_amount' ) );
		//make sure p hasn't changed into p2. that's not what we wanted to do...
		$this->assertFalse( $p2 === $p );
		//We wanted to just UPDATE p with p2's values
		$this->assertEquals( $p, EEM_Payment::instance()->get_from_entity_map( $p->ID() ) );
		//and make sure p's cache was updated to be the same as p2's
		$this->assertEquals( $p2->get_all_from_cache( 'Transaction' ), $p->get_all_from_cache( 'Transaction' ) );
	}




	/**
	 * This tests the get_formats_for method with exception
	 *
	 * @since 4.6.x
	 */
	function test_get_formats_for_with_exception() {
		//test expected exception for invalid field
		$this->setExpectedException( 'EE_Error' );
		$formats = EEM_Datetime::instance()->get_formats_for( 'Bogus_Field' );
	}



	/**
	 * This tests the get_formats_for method with valid field
	 *
	 * @since 4.6.x
	 */
	function test_get_formats_for_with_valid_field() {
		//first test default field setup
		$formats = EEM_Datetime::instance()->get_formats_for( 'DTT_EVT_start' );
		$this->assertContains('F j, Y', $formats);
		$this->assertContains('g:i a', $formats );

		//test values on EE_Datetime_Field after EE_Datetime instantiation.
		$this->factory->datetime->create( array( 'formats' => array( 'Y-m-d', 'H:i:s' ) ) );
		$test_formats = EEM_Datetime::instance()->get_formats_for( 'DTT_EVT_start' );
		$this->assertContains( 'Y-m-d', $test_formats );
		$this->assertContains( 'H:i:s', $test_formats );
	}




	/**
	 * @since 4.6.x
	 */
	function test_current_time_for_query() {
		//baseline DateTime object for testing
		$now = new DateTime( "now" );
		$DateTimeZone = new DateTimeZone( 'America/Vancouver' );
		$timezoneTest = new DateTime( "now", new DateTimeZone( 'America/Vancouver' ) );

		//test getting default formatted string and default formatted unix timestamp.
		$formatted_string = EEM_Datetime::instance()->current_time_for_query( 'DTT_EVT_start' );
		$this->assertEquals( $now->format( 'F j, Y g:i a' ), $formatted_string );
		$timestamp_with_offset = EEM_Datetime::instance()->current_time_for_query( 'DTT_EVT_start', true );
		$this->assertEquals( $now->format('U'), $timestamp_with_offset );

		//test values when timezone and formats modified on EE_Datetime instantiation
		$this->factory->datetime->create( array( 'formats' => array( 'Y-m-d', 'H:i:s' ), 'timezone' => 'America/Vancouver' ) );
		$formatted_string = EEM_Datetime::instance()->current_time_for_query( 'DTT_EVT_start' );
		$this->assertEquals( $timezoneTest->format( 'Y-m-d H:i:s' ), $formatted_string );
		$unix_timestamp = EEM_Datetime::instance()->current_time_for_query( 'DTT_EVT_start', true );
		$this->assertEquals( $timezoneTest->format('U'), $unix_timestamp );
	}



	/**
	 * @since 4.6.x
	 */
	function test_convert_datetime_for_query() {
		//baselines for testing with
		//baseline DateTime object for testing
		$now = new DateTime( "now" );
		$timezoneTest = new DateTime( "now", new DateTimeZone( 'America/Vancouver' ) );

		$timezones_to_test = array(
			'Asia/Singapore',
			'America/Denver'
			);

		$original_timezone = get_option('timezone_string');
		$original_offset = get_option( 'gmt_offset' );

		foreach ( $timezones_to_test as $timezone ) {

			//change the timezone set in wp options to something that has a positive offset

			update_option( 'timezone_string', $timezone );

			//initialize EEM_Datetime and EE_Datetime_Field settings for caches
			$this->factory->datetime->create( array( 'formats' => array( 'F j, Y', 'g:i a' ), 'timezone' => 'UTC' ) );

			//test getting correctly formatted string for matching incoming format with defaults in WP
			//options
			$converted = EEM_Datetime::instance()->convert_datetime_for_query( 'DTT_EVT_start', $now->format( 'F j, Y g:i a' ), 'F j, Y g:i a', 'UTC' );
			$this->assertEquals( $now->format( 'F j, Y g:i a' ), $converted, sprintf( 'Timezone tested: %s', $timezone ) );

			//test getting correctly formatted string for different incoming format in same timezone.
			$converted = EEM_Datetime::instance()->convert_datetime_for_query( 'DTT_EVT_start', $now->format( 'Y-m-d H:i:s' ), 'Y-m-d H:i:s', 'UTC' );
			$this->assertEquals( $now->format( 'F j, Y g:i a' ), $converted, sprintf( 'Timezone tested: %s', $timezone ) );

			//test getting correctly formatted string for different incoming format in different incoming timezone.
			$converted = EEM_Datetime::instance()->convert_datetime_for_query( 'DTT_EVT_start', $timezoneTest->format( 'Y-m-d H:i:s' ), 'Y-m-d H:i:s', 'America/Vancouver' );
			$this->assertEquals( $now->format( 'F j, Y g:i a' ), $converted, sprintf( 'Timezone tested: %s', $timezone ) );

			//test getting correctly formatted string for unix_timestamp format.
			$converted = EEM_Datetime::instance()->convert_datetime_for_query( 'DTT_EVT_start',time(), 'U' );
			$this->assertEquals( $now->format( 'F j, Y g:i a' ), $converted, sprintf( 'Timezone tested: %s', $timezone ) );

			//test getting correctly formatted string for current_time('mysql') format.
			$converted = EEM_Datetime::instance()->convert_datetime_for_query( 'DTT_EVT_start', current_time('mysql'), 'Y-m-d H:i:s' );
			$this->assertEquals( $now->format( 'F j, Y g:i a' ), $converted, sprintf( 'Timezone tested: %s', $timezone ) );

			//repeat above tests when internals on EE_Datetime_Field have been modified by new
			//datetime creation.
			$this->factory->datetime->create( array( 'formats' => array( 'd/m/Y', 'h:i a' ), 'timezone' => 'America/Vancouver' ) );
			//test getting correctly formatted string for matching incoming format with what is currently
			//set
			$converted = EEM_Datetime::instance()->convert_datetime_for_query( 'DTT_EVT_start', $timezoneTest->format( 'U' ), 'U', 'America/Vancouver' );
			$this->assertEquals( $timezoneTest->format( 'd/m/Y h:i a' ), $converted, sprintf( 'Timezone tested: %s', $timezone ) );

			//test getting correctly formatted string for different incoming format in same timezone.
			$converted = EEM_Datetime::instance()->convert_datetime_for_query( 'DTT_EVT_start', $timezoneTest->format( 'Y-m-d H:i:s' ), 'Y-m-d H:i:s', 'America/Vancouver' );
			$this->assertEquals( $timezoneTest->format( 'd/m/Y h:i a' ), $converted, sprintf( 'Timezone tested: %s', $timezone ) );

			//test getting correctly formatted string for different incoming format in different incoming timezone.
			$converted = EEM_Datetime::instance()->convert_datetime_for_query( 'DTT_EVT_start', $now->format( 'U' ), 'U', 'UTC' );
			$this->assertEquals( $timezoneTest->format( 'd/m/Y h:i a' ), $converted, sprintf( 'Timezone tested: %s', $timezone ) );

			//test getting correctly formatted string for time() format.
			$converted = EEM_Datetime::instance()->convert_datetime_for_query( 'DTT_EVT_start', time(), 'U' );
			$this->assertEquals( $timezoneTest->format( 'd/m/Y h:i a' ), $converted, sprintf( 'Timezone tested: %s', $timezone ) );

			//test getting correctly formatted string for current_time('mysql') format.
			$converted = EEM_Datetime::instance()->convert_datetime_for_query( 'DTT_EVT_start', current_time('mysql'), 'Y-m-d H:i:s' );
			$this->assertEquals( $timezoneTest->format( 'd/m/Y h:i a' ), $converted, sprintf( 'Timezone tested: %s', $timezone ) );
		}

		update_option( 'timezone_string', $original_timezone );
		update_option( 'gmt_offset', $original_offset );
	}
}

// End of file EEM_Base_Test.php
