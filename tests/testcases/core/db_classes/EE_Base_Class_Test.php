<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_Base_Class_Test
 *
 * Cannot be used until models and model objects are allowed to be located elsewhere besides
 * just in the core directories core/db_models and core/db_classes, respectively
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
/**
 * @group core/db_classes
 */
class EE_Base_Class_Test extends EE_UnitTestCase{
	static function setUpBeforeClass() {
//		EE_Registry::instance()->load_helper('Activation');
//		EEH_Activation::create_table('esp_mock',
//				"MCK_ID int(11) NOT NULL,
//				PRIMARY KEY  (MCK_ID)");
//		require_once(EE_TESTS_DIR.'mocks/core/db_models/EEM_Mock.model.php');
//		require_once(EE_TESTS_DIR.'mocks/core/db_classes/EE_Mock.class.php');
		parent::setUpBeforeClass();
	}
	function test_new_instance(){
		$a = EE_Attendee::new_instance();
		$this->assertNotNUll($a);
		$this->assertInstanceOf('EE_Attendee', $a);
		return $a;
	}
	function test_set_and_get(){
		$a = EE_Attendee::new_instance();
		$a->set('ATT_fname','value1');
		$this->assertEquals($a->get('ATT_fname'),'value1');
		//verify that we can change it
		$a->set('ATT_fname','value2');
		$this->assertEquals($a->get('ATT_fname'),'value2');
	}
	function test_set_and_get_with_caching(){
		$t = EE_Transaction::new_instance();
		$t->set('TXN_total',10.53);
		$this->assertEquals($t->get('TXN_total'),10.53);
		$this->assertEquals($t->get_pretty('TXN_total'),'$10.53 <span class="currency-code">(USD)</span>');
		//make sure the caching of pretty and normal fields doesn't mess us up
		$this->assertEquals($t->get('TXN_total'),10.53);
		$t->set('TXN_total',0.00);
		$this->assertEquals($t->get('TXN_total'),0);
		$this->assertEquals($t->get_pretty('TXN_total'),'$0.00 <span class="currency-code">(USD)</span>');
		$this->assertEquals($t->get('TXN_total'),0);
	}
	function test_save_string_pk(){
		//test saving something with an auto-increment PK
		$c = EE_Country::new_instance(array('CNT_ISO'=>'12'));
		$results = $c->save();
		$this->assertEquals($results,$c->ID());
		$c->set('CNT_cur_code','FOO');
		$results2 = $c->save();
		$this->assertEquals(true,$results2);
	}
	function test_save_autoincrement_pk(){
		//test saving something with an auto-increment PK
		$t = EE_Transaction::new_instance();
		$id = $t->save();
		$this->assertNotNull($id);
		$this->assertEquals($t->ID(),$id);
		$t2 = EEM_Transaction::instance()->get_one_by_ID($id);
		$this->assertEquals($id,$t2->ID());

		//and check that its correctly saved to the model's entity map
		$existing_t_in_entity_map = EEM_Transaction::instance()->get_from_entity_map( $id );
		$this->assertInstanceOf( 'EE_Transaction', $existing_t_in_entity_map );
	}

//	function test_save_no_pk(){
		//@todo: make this test work
		//the following is known to not work for the time-being (the models
		//system should be improved to allow this, when we get time)
//		$term_taxonomy = $this->new_model_obj_with_dependencies('Term_Taxonomy', array('taxonomy'=>'monkeys'));
//		$e = $this->new_model_obj_with_dependencies('Event');
//		$tr = EE_Term_Relationship::new_instance(array('object_id'=>$e->ID()));
//		$results = $tr->save();
//		$this->assertNotNull($results);
//	}
	function test_add_relation_to(){
		$t = EE_Transaction::new_instance();
		$t->save();
		$r = EE_Registration::new_instance();
		$r->save();
		$t->_add_relation_to($r, 'Registration');
		$this->assertEquals($r->get('TXN_ID'),$t->ID());
	}
	/**
	 * @group 7084
	 */
	function test_set_defaults_on_unspecified_fields(){
		$r = EE_Registration::new_instance( array( 'TXN_ID' => 99 ) );
		$this->assertEquals( 99, $r->transaction_ID() );
		//the STS_ID should have been set to the default, not left NULL
		$this->assertEquals( EEM_Registration::instance()->field_settings_for( 'STS_ID' )->get_default_value(), $r->status_ID() );
	}
	function test_get_first_related(){
		$t = EE_Transaction::new_instance();
		$t->save();
		$r = EE_Registration::new_instance();
		$r->save();
		$t->_add_relation_to($r, 'Registration');
		$r_from_t = $t->get_first_related('Registration');
		$this->assertEquals($r->ID(),$r_from_t->ID());
		$t_from_r = $r->get_first_related('Transaction');
		$this->assertEquals($t->ID(),$t_from_r->ID());
	}
	function test_get_many_related(){
		$t = EE_Transaction::new_instance();
		$t->save();
		$r = EE_Registration::new_instance();
		$r->save();
		$r2 = EE_Registration::new_instance();
		$r2->save();
		$t->_add_relation_to($r, 'Registration');
		$t->_add_relation_to($r2, 'Registration');
		$rs_from_t = $t->get_many_related('Registration');
		$this->assertCount(2, $rs_from_t);
		foreach($rs_from_t as $r_from_t){
			$this->assertInstanceOf('EE_Registration', $r_from_t);
		}
	}

	function test_cache_related(){
		$t = EE_Transaction::new_instance();
		//note that we did NOT save it
		$r = EE_Registration::new_instance();

		$t->_add_relation_to($r, 'Registration');
		$this->assertEquals($t->ID(),0);
		$this->assertEquals($r->ID(),0);
		//get the registration cached on the transaction
		$r_from_t = $t->get_first_related('Registration');
		$this->assertEquals($r,$r_from_t);
	}

	function test_remove_relation_to(){
		$t = EE_Transaction::new_instance();
		$t->save();
		$r = EE_Registration::new_instance(array('TXN_ID'=>$t->ID()));
		$r->save();
		$t_from_r = $r->get_first_related('Transaction');
		$this->assertEquals($t,$t_from_r);
		//remove the relation
		$t_removed = $r->_remove_relation_to($t, 'Transaction');
		$this->assertEquals($t,$t_removed);
		$t_from_r = $r->get_first_related('Transaction');
		$this->assertNull($t_from_r);
	}
	function test_remove_relations(){
		$t = EE_Transaction::new_instance();
		$t->save();
		$r = EE_Registration::new_instance(array('TXN_ID'=>$t->ID()));
		$r->save();
		$t_from_r = $r->get_first_related('Transaction');
		$this->assertEquals($t,$t_from_r);
		$r->_remove_relations('Transaction');
		$t_from_r = $r->get_first_related('Transaction');
		$this->assertNull($t_from_r);
	}
	function test_count_related(){
		$e1 = EE_Event::new_instance(array('EVT_name'=>'1'));
		$e1->save();
		$this->assertNotEquals($e1->ID(),0);
		$e2 = EE_Event::new_instance(array('EVT_name'=>'2'));
		$e2->save();
		$this->assertNotEquals($e2->ID(),0);
		$e3 = EE_Event::new_instance(array('EVT_name'=>'3'));
		$e3->save();
		$v = EE_Venue::new_instance(array('VNU_name'=>'v1'));
		$v->save();
		$v->_add_relation_to($e1, 'Event');
		$v->_add_relation_to($e2, 'Event');
		$this->assertEquals($v->count_related('Event'),2);
	}

	function test_sum_related(){
		$t = EE_Transaction::new_instance();
		$t->save();
		$p1 = EE_Payment::new_instance(array('PAY_amount'=>1,'TXN_ID'=>$t->ID()));
		$p1->save();
		$p2 = EE_Payment::new_instance(array('PAY_amount'=>2,'TXN_ID'=>$t->ID()));
		$p2->save();
		$p1 = EE_Payment::new_instance(array('PAY_amount'=>1000,'TXN_ID'=>0));
		$p1->save();
		$this->assertEquals($t->sum_related('Payment',array(),'PAY_amount'),3);
		$t->_remove_relation_to($p2, 'Payment');
		$this->assertEquals($t->sum_related('Payment',array(),'PAY_amount'),1);
	}

	function test_cache_specifying_id(){
		$t = EE_Transaction::new_instance();
		$r = EE_Registration::new_instance();
		$t->cache('Registration', $r, 'r');
		$related_rs = $t->get_many_related('Registration');
		$this->assertArrayHasKey('r',$related_rs);
		$this->assertArrayNotHasKey('r2', $related_rs);
		$r_from_t = $t->get_one_from_cache('Registration');
		$this->assertEquals($r,$r_from_t);
		$r2 = EE_Registration::new_instance();
		$t->cache('Registration',$r2,'r2');
		$rs_from_t = $t->get_all_from_cache('Registration');
		$this->assertArrayContains($r,$rs_from_t);
		$this->assertArrayContains($r2,$rs_from_t);
	}

	function test_update_cache_after_save(){
		$t = EE_Transaction::new_instance();
		$r = EE_Registration::new_instance();
		$t->cache('Registration', $r, 'monkey_code');
		$related_rs = $t->get_many_related('Registration');
		$this->assertArrayHasKey('monkey_code',$related_rs);
		$r->save();
		$t->update_cache_after_object_save('Registration', $r, 'monkey_code');
		$related_rs = $t->get_many_related('Registration');
		$this->assertArrayHasKey($r->ID(),$related_rs);
		$this->assertArrayNotHasKey('monkey_code',$related_rs);
	}

	function test_is_set(){
		$t = EE_Transaction::new_instance();
		$this->assertTrue($t->is_set('TXN_ID'));
		$this->assertFalse($t->is_set('monkey_brains'));
	}

	/**
	 * tests that clearing all from a cache works as expected
	 */
	function test_clear_cache__all(){
		$t = EE_Transaction::new_instance();

		//test that clear cache for an item that ISN'T cached doesn't produce an error.
		$response = $t->clear_cache('Registration');
		$this->assertNull( $response );

		$r = EE_Registration::new_instance(array('REG_code'=>'monkey1'));
		$r2 = EE_Registration::new_instance(array('REG_code'=>'monkey2'));
		$t->cache('Registration', $r);
		$t->cache('Registration',$r2);
		$rs_cached = $t->get_all_from_cache('Registration');
		$this->assertArrayContains($r, $rs_cached);
		$this->assertArrayContains($r2,$rs_cached);
		//ok but if we call clear cache again without specifying what we want,
		//we should actually do nothing
		$r_null = $t->clear_cache('Registration');
		$this->assertNull($r_null);
		$this->assertArrayContains($r, $rs_cached);
		$this->assertArrayContains($r2,$rs_cached);
		//ok now clear everything
		$success = $t->clear_cache('Registration',NULL,TRUE);
		$this->assertTrue($success);
		$cached_regs = $t->get_all_from_cache('Registration');
		$this->assertEmpty($cached_regs);

	}

	/**
	 * test that after we've cached something, we can remove it specifically
	 * by only knowing the object
	 */
	function test_clear_cache__specific_object(){
		$t = EE_Transaction::new_instance();
		$r = EE_Registration::new_instance(array('REG_code'=>'monkey1'));
		$r2 = EE_Registration::new_instance(array('REG_code'=>'monkey2'));
		$t->cache('Registration', $r);
		$t->cache('Registration',$r2);
		$rs_cached = $t->get_all_from_cache('Registration');
		$this->assertArrayContains($r, $rs_cached);
		$this->assertArrayContains($r2,$rs_cached);
		$r_removed = $t->clear_cache('Registration',$r);
		$this->assertEquals($r,$r_removed);
		$this->assertArrayContains($r2,$t->get_all_from_cache('Registration'));
		$this->assertArrayDoesNotContain($r, $t->get_all_from_cache('Registration'));
		//now check if we clear the cache for an item that isn't in the cahce, it returns null
		$r3 = EE_Registration::new_instance(array('REG_code'=>'mystery monkey'));
		$r_null = $t->clear_cache('Registration', $r3);
		$this->assertNull($r_null);

	}

	/**
	 * test that after we've cached something using a specific index,
	 * we can remove it using a specific index
	 *
	 */
	function test_clear_cache__specific_index(){
		$t = EE_Transaction::new_instance();
		$r = EE_Registration::new_instance(array('REG_code'=>'monkey1'));
		$r2 = EE_Registration::new_instance(array('REG_code'=>'monkey2'));
		$t->cache('Registration', $r,'monkey1');
		$t->cache('Registration',$r2,'monkey2');
		$rs_cached = $t->get_all_from_cache('Registration');
		$this->assertArrayContains($r, $rs_cached);
		$this->assertArrayContains($r2,$rs_cached);
		$r_cached = $t->clear_cache('Registration','monkey1');
		$this->assertEquals($r,$r_cached);
		$this->assertArrayDoesNotContain($r, $t->get_all_from_cache('Registration'));
		//also check that if the index isn't set, we just return null
		$r_null = $t->clear_cache('Registration','mystery monkey');
		$this->assertNull($r_null);
	}

	/**
	 * tests that clearing the cache on a belongsTo relation works
	 */
	function test_clear_cache__belongs_to(){
		$t = EE_Transaction::new_instance(array('TXN_total'=>'99'));
		$r = EE_Registration::new_instance(array('REG_code'=>'monkey1'));
		$success = $r->cache('Transaction',$t);
		$this->assertTrue($success);
		$t_cached = $r->get_one_from_cache('Transaction');
		$this->assertEquals($t,$t_cached);
		$t_removed = $r->clear_cache('Transaction');
		$this->assertEquals($t,$t_removed);
		$t_null = $r->get_one_from_cache('Transaction');
		$this->assertNull($t_null);
	}

	function test_set_and_get_extra_meta(){
		$e = EE_Event::new_instance();
		$e->save();
		$e->update_extra_meta('monkey', 'baboon');
		$this->assertEquals('baboon', $e->get_extra_meta('monkey', TRUE)  );
		$e->update_extra_meta('monkey', 'chimp');
		$this->assertEquals('chimp', $e->get_extra_meta('monkey', TRUE)  );
	}




	/**
	 * Created to attempt to reproduce a bug found when fixing https://events.codebasehq.com/projects/event-espresso/tickets/6373
	 *
	 * @since 4.5.0
	 *
	 */
	function test_set_primary_key_clear_relations() {
		$event = $this->factory->event->create();
		$datetime = $this->factory->datetime->create();
		$event->_add_relation_to( $datetime, 'Datetime' );
		$event->save();

		//now to reproduce we grab the event from the db.
		$evt_from_db = EEM_Event::instance()->get_one_by_ID( $event->ID() );

		//clone event
		$new_event = clone $evt_from_db;
		//set pk to zero so we save new event and save.
		$new_event->set( 'EVT_ID', 0 );
		$new_event->save();

		//now let's set the a clone of the dtt relation manually to the new event by cloning the dtt (which should work)
		$orig_dtts = $evt_from_db->get_many_related('Datetime');
		$this->assertEquals( 1, count( $orig_dtts ) );
		foreach ( $orig_dtts as $orig_dtt ) {
			$new_datetime = clone $orig_dtt;
			$new_datetime->set('DTT_ID', 0);
			$new_datetime->set('EVT_ID', $new_event->ID() );
			$new_datetime->save();
		}

		//k now for the tests. first $new_event should NOT have the original datetime as a relation by default.  When an object's id is set to 0 its relations should be cleared.
		//get from db
		$test_cloned_event_from_db = EEM_Event::instance()->get_one_by_ID( $new_event->ID() );
		$dtt_relation_on_clone = $test_cloned_event_from_db->first_datetime();

		$this->assertInstanceOf( 'EE_Datetime', $dtt_relation_on_clone );
		$this->assertEquals( $new_datetime->ID(), $dtt_relation_on_clone->ID() );

		//test that the original event still has its relation to original EE_Datetime
		$orig_evt = EEM_Event::instance()->get_one_by_ID( $evt_from_db->ID() );
		$dtt_relation_on_orig = $orig_evt->first_datetime();
		$this->assertInstanceOf( 'EE_Datetime', $dtt_relation_on_orig );
		$this->assertEquals( $dtt_relation_on_orig->ID(), $datetime->ID() );
	}


	/**
	 * @group 7151
	 */
	public function test_in_entity_map(){
		$att = EE_Attendee::new_instance( array( 'ATT_fname' => 'mike' ) );
		$this->assertFalse( $att->in_entity_map() );
		$att->save();
		$this->assertTrue( $att->in_entity_map() );
		EE_Registry::instance()->reset_model( 'Attendee' );
		//when we serialized it, it forgot if it was in the entity map or not
		$this->assertFalse( $att->in_entity_map() );
		try{
			//should throw an exception because we hate saving
			//a model object that's not in the entity mapper
			$att->save();
		}catch( EE_Error $e ){
			$this->assertTrue( TRUE );
		}
		EEM_Attendee::instance()->add_to_entity_map( $att );
		//we should all acknowledge it's in the entity map now
		$this->assertTrue( $att->in_entity_map() );
		//we shouldn't complain at saving it now, it's in the entity map and so we're allowed
		$att->save();
		//also, when we clone an item in the entity map, it shouldn't be considered in the entity map
		$att2 = clone $att;
		$this->assertFalse( $att2->in_entity_map() );
	}

	/**
	 * @group 7151
	 */
	public function test_refresh_from_db(){
		$att = EE_Attendee::new_instance( array( 'ATT_fname' => 'bob' ) );
		try{
			$att->refresh_from_db();
		}catch( EE_Error $e ){
			$this->assertTrue( TRUE );
		}
		$att->save();
		$att->refresh_from_db();
		EE_Registry::instance()->reset_model( 'Attendee' );
		try{
			$att->refresh_from_db();
		}catch( EE_Error $e ){
			$this->assertTrue( TRUE );
		}
	}
	public function test_delete_permanently_with_extra_meta(){
		$attendee = EE_Attendee::new_instance( array( 'ATT_fname' => 'bob', 'ATT_lname' => 'deleteme', 'ATT_email' => 'ef@ew.dw'));
		$attendee->save();
		$attendee->add_extra_meta('shouldnt_prevent_deletion', 'no_sirry' );
		$this->assertEquals( 'no_sirry', $attendee->get_extra_meta('shouldnt_prevent_deletion', TRUE ) );
		$attendee->delete_permanently();
		//if that didn't throw an error, we're good
	}


	/**
	 * @since 4.6.x
	 */
	public function test_next_x() {
		//create 5 events for testing with.
		$events = $this->factory->event->create_many( 5 );

		//grab the first event in the list as the reference
		$event = reset( $events );

		$this->assertInstanceOf( 'EE_Event', $event );

		//test method retrieving object
		$next_events = $event->next_x( 'EVT_ID', 2 );

		//verify we have two returned.
		$this->assertEquals( 2, count( $next_events ) );

		//loop through and verify the events returned are correct.
		$pointer = 1;
		foreach( $next_events as $next_event ) {
			$this->assertInstanceOf( 'EE_Event', $next_event );
			$this->assertEquals( $event->ID()+$pointer, $next_event->ID() );
			$pointer++;
		}

		//test retrieving just ids
		$next_events = $event->next_x( 'EVT_ID', 2, array(), 'EVT_ID' );

		//verify we have two returned
		$this->assertEquals( 2, count( $next_events ) );

		//loop through and verify the IDS returned are correct.
		$pointer = 1;
		foreach( $next_events as $next_event ) {
			$this->assertTrue( array_key_exists( 'EVT_ID', $next_event ) );
			$this->assertEquals( $event->ID()+$pointer, $next_event['EVT_ID'] );
			$pointer++;
		}
	}



	/**
	 * @since 4.6.x
	 */
	public function test_previous_x() {
		//create 5 events for testing with.
		$events = $this->factory->event->create_many( 5 );

		//grab the last event in the list as the reference
		$event = end( $events );

		$this->assertInstanceOf( 'EE_Event', $event );

		//test method retrieving object
		$previous_events = $event->previous_x( 'EVT_ID', 2 );

		//verify we have two returned.
		$this->assertEquals( 2, count( $previous_events ) );

		//loop through and verify the events returned are correct.
		$pointer = 1;
		foreach( $previous_events as $next_event ) {
			$this->assertInstanceOf( 'EE_Event', $next_event );
			$this->assertEquals( $event->ID()-$pointer, $next_event->ID() );
			$pointer++;
		}

		//test retrieving just ids
		$previous_events = $event->previous_x( 'EVT_ID', 2, array(), 'EVT_ID' );

		//verify we have two returned
		$this->assertEquals( 2, count( $previous_events ) );

		//loop through and verify the IDS returned are correct.
		$pointer = 1;
		foreach( $previous_events as $next_event ) {
			$this->assertTrue( array_key_exists( 'EVT_ID', $next_event ) );
			$this->assertEquals( $event->ID()-$pointer, $next_event['EVT_ID'] );
			$pointer++;
		}
	}



	/**
	 * @since 4.6.x
	 */
	public function test_next() {
		//create 5 events for testing with.
		$events = $this->factory->event->create_many( 5 );

		//grab the first event in the list as the reference
		$event = reset( $events );

		$this->assertInstanceOf( 'EE_Event', $event );

		//test method retrieving object
		$next_event = $event->next( 'EVT_ID' );

		//verify we have an event returned and that its the right one in sequence.
		$this->assertInstanceOf( 'EE_Event', $next_event );
		$this->assertEquals( $event->ID()+1, $next_event->ID() );

		//test retrieving just id
		$next_event = $event->next( 'EVT_ID', array(), 'EVT_ID' );

		//verify the returned array has the right key and value.
		$this->assertTrue( is_array( $next_event ) );
		$this->assertTrue( array_key_exists( 'EVT_ID', $next_event ) );
		$this->assertEquals( $event->ID()+1, $next_event['EVT_ID'] );
	}



	/**
	 * @since 4.6.x
	 */
	public function test_previous() {
		//create 5 events for testing with.
		$events = $this->factory->event->create_many( 5 );

		//grab the last event in the list as the reference
		$event = end( $events );

		$this->assertInstanceOf( 'EE_Event', $event );

		//test method retrieving object
		$previous_event = $event->previous( 'EVT_ID' );

		//verify we have an event returned and that its the right one in sequence.
		$this->assertInstanceOf( 'EE_Event', $previous_event );
		$this->assertEquals( $event->ID()-1, $previous_event->ID() );

		//test retrieving just id
		$previous_event = $event->previous( 'EVT_ID', array(), 'EVT_ID' );

		//verify the returned array has the right key and value.
		$this->assertTrue( is_array( $previous_event ) );
		$this->assertTrue( array_key_exists( 'EVT_ID', $previous_event ) );
		$this->assertEquals( $event->ID()-1, $previous_event['EVT_ID'] );
	}

	/**
	 * @group github-102
	 */
	public function test_get__serialized_data() {
		$log_message = array(
						'key1' => 'value1',
						'key2' => 'value2'
					);
		$log = EE_Change_Log::new_instance();
		$log->set( 'LOG_message', $log_message );
		$log->save();

		//verify that when we get its LOG_message its still serialized
		$this->assertTrue( is_array( $log->get( 'LOG_message' ) ) );
		$this->assertEquals( $log_message, $log->get( 'LOG_message' ) );

		//now when we get it from the DB, and get its LOG_message, its still serialized
		$log_id = $log->ID();
		EEM_Change_Log::reset();
		unset( $log );
		$log_from_db = EEM_Change_Log::instance()->get_one_by_ID( $log_id );
		$this->assertTrue( is_array( $log_from_db->get( 'LOG_message' ) ) );
		$this->assertEquals( $log_message, $log_from_db->get( 'LOG_message' ) );

		//but if you set it to be a string, you'll get a string back
		$log_from_db->set( 'LOG_message', serialize( $log_message ) );
		$this->assertTrue( is_string( $log_from_db->get( 'LOG_message' ) ) );
	}

}

// End of file EE_Base_Class_Test.php
