<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

/**
 * EE_Base_Class_Test
 * Cannot be used until models and model objects are allowed to be located elsewhere besides
 * just in the core directories core/db_models and core/db_classes, respectively
 *
 * @group core/db_classes
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 */
class EE_Base_Class_Test extends EE_UnitTestCase
{

    /**
     * @throws EE_Error
     */
    public function setUp()
    {
        parent::setUp();
        //register it for realz
        EE_Register_Model::register(
            'Mock',
            array(
                'model_paths' => array(EE_MOCKS_DIR . 'core/db_models/'),
                'class_paths' => array(EE_MOCKS_DIR . 'core/db_classes/'),
            )
        );
    }


    public function tearDown()
    {
        EE_Register_Model::deregister('Mock');
        parent::tearDown();
    }

    static function setUpBeforeClass()
    {
        //		EEH_Activation::create_table('esp_mock',
        //				"MCK_ID int(11) NOT NULL,
        //				PRIMARY KEY  (MCK_ID)");
        //		require_once(EE_TESTS_DIR.'mocks/core/db_models/EEM_Mock.model.php');
        //		require_once(EE_TESTS_DIR.'mocks/core/db_classes/EE_Mock.class.php');
        parent::setUpBeforeClass();
    }


    /**
     * @return \EE_Attendee
     */
    function test_new_instance()
    {
        $a = EE_Attendee::new_instance();
        $this->assertNotNull($a);
        $this->assertInstanceOf('EE_Attendee', $a);
        return $a;
    }


    /**
     * @group 9273
     * @see   https://events.codebasehq.com/projects/event-espresso/tickets/9273
     */
    function test_new_instance_with_existing_object_and_incoming_date_formats()
    {
        //setup a EE_Payment object and save
        $payment_object = EE_Payment::new_instance();
        $payment_object->save();
        $payment_object_id = $payment_object->ID();
        //now let's setup a new payment object using that ID but with different formats than the defaults
        //that way we can verify the timestamp gets set correctly.
        $expected_date = '2016-24-01';
        $payment_object_to_test = EE_Payment::new_instance(
            array(
                'PAY_ID'        => $payment_object_id,
                'PAY_timestamp' => '2016-24-01 3:45 pm',
            ),
            '',
            array('Y-d-m', 'g:i a')
        );
        $this->assertEquals($expected_date, $payment_object_to_test->get_date('PAY_timestamp'));
    }


    function test_set_and_get()
    {
        $a = EE_Attendee::new_instance();
        $a->set('ATT_fname', 'value1');
        $this->assertEquals($a->get('ATT_fname'), 'value1');
        //verify that we can change it
        $a->set('ATT_fname', 'value2');
        $this->assertEquals($a->get('ATT_fname'), 'value2');
    }


    function test_set_and_get_with_caching()
    {
        $t = EE_Transaction::new_instance();
        $t->set('TXN_total', 10.53);
        $this->assertEquals($t->get('TXN_total'), 10.53);
        $this->assertEquals($t->get_pretty('TXN_total'), '$10.53 <span class="currency-code">(USD)</span>');
        //make sure the caching of pretty and normal fields doesn't mess us up
        $this->assertEquals($t->get('TXN_total'), 10.53);
        $t->set('TXN_total', 0.00);
        $this->assertEquals($t->get('TXN_total'), 0);
        $this->assertEquals($t->get_pretty('TXN_total'), '$0.00 <span class="currency-code">(USD)</span>');
        $this->assertEquals($t->get('TXN_total'), 0);
    }


    function test_save_string_pk()
    {
        //test saving something with an auto-increment PK
        $c = EE_Country::new_instance(array('CNT_ISO' => '12'));
        $results = $c->save();
        $this->assertEquals($results, $c->ID());
        $c->set('CNT_cur_code', 'FOO');
        $results2 = $c->save();
        $this->assertEquals(true, $results2);
    }


    function test_save_autoincrement_pk()
    {
        //test saving something with an auto-increment PK
        $t = EE_Transaction::new_instance();
        $id = $t->save();
        $this->assertNotNull($id);
        $this->assertEquals($t->ID(), $id);
        $t2 = EEM_Transaction::instance()->get_one_by_ID($id);
        $this->assertEquals($id, $t2->ID());
        //and check that its correctly saved to the model's entity map
        $existing_t_in_entity_map = EEM_Transaction::instance()->get_from_entity_map($id);
        $this->assertInstanceOf('EE_Transaction', $existing_t_in_entity_map);
    }


    /**
     * @group 8622
     */
    function test_save__allow_persist_changed()
    {
        $t = EE_Transaction::new_instance();
        $t->set_allow_persist(false);
        $result = $t->save();
        $this->assertEquals(0, $result);
        $t->set_allow_persist(true);
        $result2 = $t->save();
        $this->assertNotEquals(0, $result2);
    }

    /**
     * @since $VID:$
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
   	function test_save_no_pk(){
        $term_taxonomy = $this->new_model_obj_with_dependencies('Term_Taxonomy', array('taxonomy'=>'monkeys'));
        $e = $this->new_model_obj_with_dependencies('Event');
        $tr = EE_Term_Relationship::new_instance(array('object_id'=>$e->ID()));
        $results = $tr->save();
        $this->assertNotNull($results);
    }
    /**
     * @group 8686
     */
    function test_add_relation_to()
    {
        $t = EE_Transaction::new_instance();
        $t->save();
        $r = EE_Registration::new_instance();
        $r->save();
        //verify the relations
        try {
            $r->transaction();
        } catch (Exception $e) {
            $this->assertTrue(true);
        }
        $rs_from_t = $t->registrations();
        $this->assertTrue(empty($rs_from_t));
        //add a relation and verify it changes the model object with the PK
        $r->_add_relation_to($t, 'Transaction');
        $this->assertEquals($t->ID(), $r->get('TXN_ID'));
        //and we get expected results when fetching using it
        $t_from_r = $r->transaction();
        $this->assertEquals($t, $t_from_r);
        $rs_from_t = $t->registrations();
        $this->assertFalse(empty($rs_from_t));
    }

    /**
     * @group 8686
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    function testAddRelationToHABTM()
    {
        $q = $this->new_model_obj_with_dependencies('Question');
        $qg = $this->new_model_obj_with_dependencies('Question_Group');
        $this->assertFalse(EEM_Question_Group_Question::instance()->exists(
            array(
                array(
                    'QST_ID' => $q->ID(),
                    'QSG_ID' => $qg->ID()
                )
            )
        ));
        $first_join_row_order = 100;
        $q->_add_relation_to(
            $qg,
            'Question_Group',
            array('QGQ_order' => $first_join_row_order)
        );
        $this->assertEquals(
            1,
            EEM_Question_Group_Question::instance()->count(
                array(
                    array(
                        'QST_ID' => $q->ID(),
                        'QSG_ID' => $qg->ID()
                    )
                )
            )
        );
        // ok great. Do it again and make sure no new entries added to the DB.
        $second_join_entry_order = 200;
        $q->_add_relation_to(
            $qg,
            'Question_Group',
            array('QGQ_order' => $second_join_entry_order)
        );
        $this->markTestIncomplete(
            'This was reverted in order to fix https://github.com/eventespresso/event-espresso-core/issues/873'
        );
        $this->assertEquals(
            1,
            EEM_Question_Group_Question::instance()->count(
                array(
                    array(
                        'QST_ID' => $q->ID(),
                        'QSG_ID' => $qg->ID()
                    )
                )
            )
        );
        $join_entry = EEM_Question_Group_Question::instance()->get_one(
            array(
                array(
                    'QST_ID' => $q->ID(),
                    'QSG_ID' => $qg->ID()
                )
            )
        );
        $this->assertEquals($second_join_entry_order, $join_entry->get('QGQ_order'));
    }

    /**
     * @group 8686
     */
    function test_add_relation_to__unsaved()
    {
        $t = EE_Transaction::new_instance();
        $r = EE_Registration::new_instance();
        $t->_add_relation_to($r, 'Registration');
        $t_from_r = $r->transaction();
        $this->assertEquals($t, $t_from_r);
        $rs_from_t = $t->registrations();
        $this->assertFalse(empty($rs_from_t));
    }


    /**
     * @group 7084
     */
    function test_set_defaults_on_unspecified_fields()
    {
        $r = EE_Registration::new_instance(array('TXN_ID' => 99));
        $this->assertEquals(99, $r->transaction_ID());
        //the STS_ID should have been set to the default, not left NULL
        $this->assertEquals(EEM_Registration::instance()->field_settings_for('STS_ID')->get_default_value(),
            $r->status_ID());
    }


    function test_get_first_related()
    {
        $t = EE_Transaction::new_instance();
        $t->save();
        $r = EE_Registration::new_instance();
        $r->save();
        $t->_add_relation_to($r, 'Registration');
        $r_from_t = $t->get_first_related('Registration');
        $this->assertEquals($r->ID(), $r_from_t->ID());
        $t_from_r = $r->get_first_related('Transaction');
        $this->assertEquals($t->ID(), $t_from_r->ID());
    }


    function test_get_many_related()
    {
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
        foreach ($rs_from_t as $r_from_t) {
            $this->assertInstanceOf('EE_Registration', $r_from_t);
        }
    }


    function test_cache_related()
    {
        $t = EE_Transaction::new_instance();
        //note that we did NOT save it
        $r = EE_Registration::new_instance();
        $t->_add_relation_to($r, 'Registration');
        $this->assertEquals($t->ID(), 0);
        $this->assertEquals($r->ID(), 0);
        //get the registration cached on the transaction
        $r_from_t = $t->get_first_related('Registration');
        $this->assertEquals($r, $r_from_t);
    }


    /**
     * @group 8686
     */
    function test_remove_relation_to()
    {
        $t = EE_Transaction::new_instance();
        $t->save();
        $r = EE_Registration::new_instance(array('TXN_ID' => $t->ID()));
        $r->save();
        $t_from_r = $r->get_first_related('Transaction');
        $this->assertEquals($t, $t_from_r);
        $rs_from_t = $t->get_many_related('Registration');
        $this->assertFalse(empty($rs_from_t));
        //remove the relation
        $t_removed = $r->_remove_relation_to($t, 'Transaction');
        $this->assertEquals($t, $t_removed);
        $t_from_r = $r->get_first_related('Transaction');
        $this->assertNull($t_from_r);
        //and verify the cached reciprocal relation is updated too
        $rs_from_t = $t->get_many_related('Registration');
        $this->assertTrue(empty($rs_from_t));
    }


    /**
     * @group 8686
     */
    function test_remove_relations()
    {
        $t = EE_Transaction::new_instance();
        $t->save();
        $r = EE_Registration::new_instance(array('TXN_ID' => $t->ID()));
        $r->save();
        $t_from_r = $r->get_first_related('Transaction');
        $this->assertEquals($t, $t_from_r);
        $rs_from_t = $t->get_many_related('Registration');
        $this->assertFalse(empty($rs_from_t));
        //ok now remove the relation between them
        $r->_remove_relations('Transaction');
        $t_from_r = $r->get_first_related('Transaction');
        $this->assertNull($t_from_r);
        //and verify the cached reciprocal relation is updated too
        $rs_from_t = $t->get_many_related('Registration');
        $this->assertTrue(empty($rs_from_t));
    }


    function test_count_related()
    {
        $e1 = EE_Event::new_instance(array('EVT_name' => '1'));
        $e1->save();
        $this->assertNotEquals($e1->ID(), 0);
        $e2 = EE_Event::new_instance(array('EVT_name' => '2'));
        $e2->save();
        $this->assertNotEquals($e2->ID(), 0);
        $e3 = EE_Event::new_instance(array('EVT_name' => '3'));
        $e3->save();
        $v = EE_Venue::new_instance(array('VNU_name' => 'v1'));
        $v->save();
        $v->_add_relation_to($e1, 'Event');
        $v->_add_relation_to($e2, 'Event');
        $this->assertEquals($v->count_related('Event'), 2);
    }


    function test_sum_related()
    {
        $t = EE_Transaction::new_instance();
        $t->save();
        $p1 = EE_Payment::new_instance(array('PAY_amount' => 1, 'TXN_ID' => $t->ID()));
        $p1->save();
        $p2 = EE_Payment::new_instance(array('PAY_amount' => 2, 'TXN_ID' => $t->ID()));
        $p2->save();
        $p1 = EE_Payment::new_instance(array('PAY_amount' => 1000, 'TXN_ID' => 0));
        $p1->save();
        $this->assertEquals($t->sum_related('Payment', array(), 'PAY_amount'), 3);
        $t->_remove_relation_to($p2, 'Payment');
        $this->assertEquals($t->sum_related('Payment', array(), 'PAY_amount'), 1);
    }


    function test_cache_specifying_id()
    {
        $t = EE_Transaction::new_instance();
        $r = EE_Registration::new_instance();
        $t->cache('Registration', $r, 'r');
        $related_rs = $t->get_many_related('Registration');
        $this->assertArrayHasKey('r', $related_rs);
        $this->assertArrayNotHasKey('r2', $related_rs);
        $r_from_t = $t->get_one_from_cache('Registration');
        $this->assertEquals($r, $r_from_t);
        $r2 = EE_Registration::new_instance();
        $t->cache('Registration', $r2, 'r2');
        $rs_from_t = $t->get_all_from_cache('Registration');
        $this->assertArrayContains($r, $rs_from_t);
        $this->assertArrayContains($r2, $rs_from_t);
    }


    function test_update_cache_after_save()
    {
        $t = EE_Transaction::new_instance();
        $r = EE_Registration::new_instance();
        $t->cache('Registration', $r, 'monkey_code');
        $related_rs = $t->get_many_related('Registration');
        $this->assertArrayHasKey('monkey_code', $related_rs);
        $r->save();
        $t->update_cache_after_object_save('Registration', $r, 'monkey_code');
        $related_rs = $t->get_many_related('Registration');
        $this->assertArrayHasKey($r->ID(), $related_rs);
        $this->assertArrayNotHasKey('monkey_code', $related_rs);
    }


    function test_is_set()
    {
        $t = EE_Transaction::new_instance();
        $this->assertTrue($t->is_set('TXN_ID'));
        $this->assertFalse($t->is_set('monkey_brains'));
    }


    /**
     * tests that clearing all from a cache works as expected
     */
    function test_clear_cache__all()
    {
        $t = EE_Transaction::new_instance();
        //test that clear cache for an item that ISN'T cached doesn't produce an error.
        $response = $t->clear_cache('Registration');
        $this->assertNull($response);
        $r = EE_Registration::new_instance(array('REG_code' => 'monkey1'));
        $r2 = EE_Registration::new_instance(array('REG_code' => 'monkey2'));
        $t->cache('Registration', $r);
        $t->cache('Registration', $r2);
        $rs_cached = $t->get_all_from_cache('Registration');
        $this->assertArrayContains($r, $rs_cached);
        $this->assertArrayContains($r2, $rs_cached);
        //ok but if we call clear cache again without specifying what we want,
        //we should actually do nothing
        $r_null = $t->clear_cache('Registration');
        $this->assertNull($r_null);
        $this->assertArrayContains($r, $rs_cached);
        $this->assertArrayContains($r2, $rs_cached);
        //ok now clear everything
        $success = $t->clear_cache('Registration', null, true);
        $this->assertTrue($success);
        $cached_regs = $t->get_all_from_cache('Registration');
        $this->assertEmpty($cached_regs);
    }


    /**
     * test that after we've cached something, we can remove it specifically
     * by only knowing the object
     */
    function test_clear_cache__specific_object()
    {
        $t = EE_Transaction::new_instance();
        $r = EE_Registration::new_instance(array('REG_code' => 'monkey1'));
        $r2 = EE_Registration::new_instance(array('REG_code' => 'monkey2'));
        $t->cache('Registration', $r);
        $t->cache('Registration', $r2);
        $rs_cached = $t->get_all_from_cache('Registration');
        $this->assertArrayContains($r, $rs_cached);
        $this->assertArrayContains($r2, $rs_cached);
        $r_removed = $t->clear_cache('Registration', $r);
        $this->assertEquals($r, $r_removed);
        $this->assertArrayContains($r2, $t->get_all_from_cache('Registration'));
        $this->assertArrayDoesNotContain($r, $t->get_all_from_cache('Registration'));
        //now check if we clear the cache for an item that isn't in the cache, it returns null
        $r3 = EE_Registration::new_instance(array('REG_code' => 'mystery monkey'));
        $r_null = $t->clear_cache('Registration', $r3);
        $this->assertNull($r_null);
    }


    /**
     * test that after we've cached something using a specific index,
     * we can remove it using a specific index
     */
    function test_clear_cache__specific_index()
    {
        $t = EE_Transaction::new_instance();
        $r = EE_Registration::new_instance(array('REG_code' => 'monkey1'));
        $r2 = EE_Registration::new_instance(array('REG_code' => 'monkey2'));
        $t->cache('Registration', $r, 'monkey1');
        $t->cache('Registration', $r2, 'monkey2');
        $rs_cached = $t->get_all_from_cache('Registration');
        $this->assertArrayContains($r, $rs_cached);
        $this->assertArrayContains($r2, $rs_cached);
        $r_cached = $t->clear_cache('Registration', 'monkey1');
        $this->assertEquals($r, $r_cached);
        $this->assertArrayDoesNotContain($r, $t->get_all_from_cache('Registration'));
        //also check that if the index isn't set, we just return null
        $r_null = $t->clear_cache('Registration', 'mystery monkey');
        $this->assertNull($r_null);
    }


    /**
     * tests that clearing the cache on a belongsTo relation works
     */
    function test_clear_cache__belongs_to()
    {
        $t = EE_Transaction::new_instance(array('TXN_total' => '99'));
        $r = EE_Registration::new_instance(array('REG_code' => 'monkey1'));
        $success = $r->cache('Transaction', $t);
        $this->assertTrue($success);
        $t_cached = $r->get_one_from_cache('Transaction');
        $this->assertEquals($t, $t_cached);
        $t_removed = $r->clear_cache('Transaction');
        $this->assertEquals($t, $t_removed);
        $t_null = $r->get_one_from_cache('Transaction');
        $this->assertNull($t_null);
    }


    function test_set_and_get_extra_meta()
    {
        $e = EE_Event::new_instance();
        $e->save();
        $e->update_extra_meta('monkey', 'baboon');
        $this->assertEquals('baboon', $e->get_extra_meta('monkey', true));
        $e->update_extra_meta('monkey', 'chimp');
        $this->assertEquals('chimp', $e->get_extra_meta('monkey', true));
    }


    /**
     * Created to attempt to reproduce a bug found when fixing
     * https://events.codebasehq.com/projects/event-espresso/tickets/6373
     *
     * @since 4.5.0
     */
    function test_set_primary_key_clear_relations()
    {
        /** @type EE_Event $event */
        $event = $this->factory->event->create();
        /** @type EE_Datetime $datetime */
        $datetime = $this->factory->datetime->create();
        $event->_add_relation_to($datetime, 'Datetime');
        $event->save();
        //now to reproduce we grab the event from the db.
        $evt_from_db = EEM_Event::instance()->get_one_by_ID($event->ID());
        //clone event
        $new_event = clone $evt_from_db;
        //set pk to zero so we save new event and save.
        $new_event->set('EVT_ID', 0);
        $new_event->save();
        //now let's set the a clone of the dtt relation manually to the new event by cloning the dtt (which should work)
        $orig_datetimes = $evt_from_db->get_many_related('Datetime');
        $this->assertEquals(1, count($orig_datetimes));
        /** @type EE_Datetime $new_datetime */
        $new_datetime = null;
        foreach ($orig_datetimes as $orig_dtt) {
            $new_datetime = clone $orig_dtt;
            $new_datetime->set('DTT_ID', 0);
            $new_datetime->set('EVT_ID', $new_event->ID());
            $new_datetime->save();
        }
        $this->assertInstanceOf('EE_Datetime', $new_datetime);
        //k now for the tests. first $new_event should NOT have the original datetime as a relation by default.  When an object's id is set to 0 its relations should be cleared.
        //get from db
        /** @type EE_Event $test_cloned_event_from_db */
        $test_cloned_event_from_db = EEM_Event::instance()->get_one_by_ID($new_event->ID());
        $dtt_relation_on_clone = $test_cloned_event_from_db->first_datetime();
        $this->assertInstanceOf('EE_Datetime', $dtt_relation_on_clone);
        $this->assertEquals($new_datetime->ID(), $dtt_relation_on_clone->ID());
        //test that the original event still has its relation to original EE_Datetime
        /** @type EE_Event $orig_evt */
        $orig_evt = EEM_Event::instance()->get_one_by_ID($evt_from_db->ID());
        $dtt_relation_on_orig = $orig_evt->first_datetime();
        $this->assertInstanceOf('EE_Datetime', $dtt_relation_on_orig);
        $this->assertEquals($dtt_relation_on_orig->ID(), $datetime->ID());
    }


    /**
     * @group 7151
     */
    public function test_in_entity_map()
    {
        $att = EE_Attendee::new_instance(array('ATT_fname' => 'mike'));
        $this->assertFalse($att->in_entity_map());
        $att->save();
        $this->assertTrue($att->in_entity_map());
        EEM_Attendee::instance()->reset();
        //when we serialized it, it forgot if it was in the entity map or not
        $this->assertFalse($att->in_entity_map());
        try {
            //should throw an exception because we hate saving
            //a model object that's not in the entity mapper
            $att->save();
        } catch (EE_Error $e) {
            $this->assertTrue(true);
        }
        EEM_Attendee::instance()->add_to_entity_map($att);
        //we should all acknowledge it's in the entity map now
        $this->assertTrue($att->in_entity_map());
        //we shouldn't complain at saving it now, it's in the entity map and so we're allowed
        $att->save();
        //also, when we clone an item in the entity map, it shouldn't be considered in the entity map
        $att2 = clone $att;
        $this->assertFalse($att2->in_entity_map());
    }


    /**
     * @group 7151
     */
    public function test_refresh_from_db()
    {
        $att = EE_Attendee::new_instance(array('ATT_fname' => 'bob'));
        try {
            $att->refresh_from_db();
        } catch (EE_Error $e) {
            $this->assertTrue(true);
        }
        $att->save();
        $att->refresh_from_db();
        EEM_Attendee::instance()->reset();
        try {
            $att->refresh_from_db();
        } catch (EE_Error $e) {
            $this->assertTrue(true);
        }
    }


    public function test_delete_permanently_with_extra_meta()
    {
        $attendee = EE_Attendee::new_instance(array(
            'ATT_fname' => 'bob',
            'ATT_lname' => 'deleteme',
            'ATT_email' => 'ef@ew.dw',
        ));
        $attendee->save();
        $attendee->add_extra_meta('shouldnt_prevent_deletion', 'no_sirry');
        $this->assertEquals('no_sirry', $attendee->get_extra_meta('shouldnt_prevent_deletion', true));
        $attendee->delete_permanently();
        //if that didn't throw an error, we're good
    }


    /**
     * @group 7358
     */
    public function test_get_raw()
    {
        $l2 = EE_Line_Item::new_instance(array());
        $this->assertTrue(1 == $l2->get_raw('LIN_quantity'));
        $l2->save();
        $l2_from_db = EEM_Line_Item::reset()->get_one_by_ID($l2->ID());
        //double check its NULL in the DB
        $qty_col_with_one_result = EEM_Line_Item::instance()->get_col(array(array('LIN_ID' => $l2->ID())),
            'LIN_quantity');
        $qty_col_in_db = reset($qty_col_with_one_result);
        $this->assertTrue(1 == $qty_col_in_db);
        //and now verify get_raw is returning that same value
        $this->assertTrue(1 == $l2_from_db->get_raw('LIN_quantity'));
    }


    /**
     * Tests when we set a field to INFINITY, it stays that way even after we re-fetch it from the db
     *
     * @group 7358
     */
    public function test_infinite_fields_stay_that_way()
    {
        /** @type EE_Datetime $datetime */
        $datetime = $this->new_model_obj_with_dependencies('Datetime');
        $datetime->set_reg_limit(EE_INF);
        $datetime->save();
        /** @type EE_Datetime $datetime_from_db */
        $datetime_from_db = EEM_Datetime::reset()->get_one_by_ID($datetime->ID());
        $this->assertEquals($datetime->reg_limit(), $datetime_from_db->reg_limit());
    }


    /**
     * @since 4.6.12+
     */
    public function test_get_i18n_datetime()
    {
        //setup a datetime object with some known values for testing with.
        $original_timezone = get_option('timezone_string');
        update_option('timezone_string', 'America/Toronto');
        $dateTimeZone = new DateTimeZone('America/Toronto');
        $currentTime = new DateTime("now", $dateTimeZone);
        $futureTime = clone $currentTime;
        $futureTime->add(new DateInterval('P2D'));
        /** @type EE_Datetime $datetime */
        $datetime = $this->factory->datetime->create(array(
            'DTT_EVT_start' => $currentTime->format('Y-m-d H:i:s'),
            'DTT_EVT_end'   => $futureTime->format('Y-m-d H:i:s'),
            'formats'       => array('Y-m-d', 'H:i:s'),
        ));
        $this->assertInstanceOf('EE_Datetime', $datetime);
        //test get_i18n_datetime
        $this->assertEquals($currentTime->format('Y-m-d H:i:s'), $datetime->get_i18n_datetime('DTT_EVT_start'));
        $this->assertEquals($futureTime->format('Y-m-d H:i:s'), $datetime->get_i18n_datetime('DTT_EVT_end'));
        $id = $datetime->ID();
        //test when retrieved from the database.
        EEM_Datetime::reset();
        $dbDatetime = EEM_Datetime::instance()->get_one_by_ID($id);
        //set formats to match expected
        $dbDatetime->set_date_format('Y-m-d');
        $dbDatetime->set_time_format('H:i:s');
        $this->assertEquals($currentTime->format('Y-m-d H:i:s'), $dbDatetime->get_i18n_datetime('DTT_EVT_start'));
        $this->assertEquals($futureTime->format('Y-m-d H:i:s'), $dbDatetime->get_i18n_datetime('DTT_EVT_end'));
        //restore timezone
        update_option('timezone_string', $original_timezone);
    }


    /**
     * @since 4.7.0
     * Note: in this test we're using EE_Datetime methods that utilize this method on
     * EE_Base_Class
     */
    public function test_set_date_time()
    {
        //setup a datetime object with some known values for testing with.
        $original_timezone = get_option('timezone_string');
        update_option('timezone_string', 'America/Toronto');
        $dateTimeZone = new DateTimeZone('America/Toronto');
        $currentTime = new DateTime("now", $dateTimeZone);
        $futureTime = clone $currentTime;
        $futureTime->add(new DateInterval('P2D'));
        /** @type EE_Datetime $datetime */
        $datetime = $this->factory->datetime->create(
            array(
                'DTT_EVT_start' => $currentTime->format('Y-m-d H:i:s'),
                'DTT_EVT_end'   => $futureTime->format('Y-m-d H:i:s'),
                'formats'       => array('Y-m-d', 'H:i:s'),
            )
        );
        $this->assertInstanceOf('EE_Datetime', $datetime);
        //create a second datetime for polluting the formats on EE_Datetime_Field.
        // Note: the purpose of this is to test that when th EE_Datetime_Field gets the new formats from this object, that they are NOT persisting to the original datetime created that has different formats (but utilizes the same EE_Date)
        $this->factory->datetime->create(
            array(
                'DTT_EVT_start' => $currentTime->format('d/m/Y g:i a'),
                'DTT_EVT_end'   => $futureTime->format('d/m/Y g:i a'),
                'formats'       => array('d/m/Y', 'g:i a'),
            )
        );
        //test setting the time to 8am using a time string.
        $datetime->set_start_time('8:00:00');
        $this->assertEquals($currentTime->setTime(8, 0, 0)->format('Y-m-d H:i:s'), $datetime->get('DTT_EVT_start'));
        //test setting the time to 11pm using a date object
        $currentTime->setTime(23, 0, 0);
        $datetime->set_start_time($currentTime);
        $this->assertEquals($currentTime->format('Y-m-d H:i:s'), $datetime->get('DTT_EVT_start'));
        //test setting the date to 12-31-2012 on start date using a date string.
        $currentTime->setDate('2012', '12', '31');
        $datetime->set_start_date('2012-12-31');
        $this->assertEquals($currentTime->format('Y-m-d H:i:s'), $datetime->get('DTT_EVT_start'));
        //test setting the date to 12-15 using a date object.
        $currentTime->setDate('2012', '12', '15');
        $datetime->set_start_date($currentTime);
        $this->assertEquals($currentTime->format('Y-m-d H:i:s'), $datetime->get('DTT_EVT_start'));
        //reset timezone_string back to original
        update_option('timezone_string', $original_timezone);
    }


    /**
     * @since 4.6.x
     */
    public function test_next_x()
    {
        //create 5 events for testing with.
        $events = $this->factory->event->create_many(5);
        //grab the first event in the list as the reference
        $event = reset($events);
        $this->assertInstanceOf('EE_Event', $event);
        //test method retrieving object
        $next_events = $event->next_x('EVT_ID', 2);
        //verify we have two returned.
        $this->assertEquals(2, count($next_events));
        //loop through and verify the events returned are correct.
        $pointer = 1;
        foreach ($next_events as $next_event) {
            $this->assertInstanceOf('EE_Event', $next_event);
            $this->assertEquals($event->ID() + $pointer, $next_event->ID());
            $pointer++;
        }
        //test retrieving just ids
        $next_events = $event->next_x('EVT_ID', 2, array(), 'EVT_ID');
        //verify we have two returned
        $this->assertEquals(2, count($next_events));
        //loop through and verify the IDS returned are correct.
        $pointer = 1;
        foreach ($next_events as $next_event) {
            $this->assertTrue(array_key_exists('EVT_ID', $next_event));
            $this->assertEquals($event->ID() + $pointer, $next_event['EVT_ID']);
            $pointer++;
        }
    }


    /**
     * @since 4.6.x
     */
    public function test_previous_x()
    {
        //create 5 events for testing with.
        $events = $this->factory->event->create_many(5);
        //grab the last event in the list as the reference
        $event = end($events);
        $this->assertInstanceOf('EE_Event', $event);
        //test method retrieving object
        $previous_events = $event->previous_x('EVT_ID', 2);
        //verify we have two returned.
        $this->assertEquals(2, count($previous_events));
        //loop through and verify the events returned are correct.
        $pointer = 1;
        foreach ($previous_events as $next_event) {
            $this->assertInstanceOf('EE_Event', $next_event);
            $this->assertEquals($event->ID() - $pointer, $next_event->ID());
            $pointer++;
        }
        //test retrieving just ids
        $previous_events = $event->previous_x('EVT_ID', 2, array(), 'EVT_ID');
        //verify we have two returned
        $this->assertEquals(2, count($previous_events));
        //loop through and verify the IDS returned are correct.
        $pointer = 1;
        foreach ($previous_events as $next_event) {
            $this->assertTrue(array_key_exists('EVT_ID', $next_event));
            $this->assertEquals($event->ID() - $pointer, $next_event['EVT_ID']);
            $pointer++;
        }
    }


    /**
     * @since 4.6.x
     */
    public function test_next()
    {
        //create 5 events for testing with.
        $events = $this->factory->event->create_many(5);
        //grab the first event in the list as the reference
        $event = reset($events);
        $this->assertInstanceOf('EE_Event', $event);
        //test method retrieving object
        $next_event = $event->next('EVT_ID');
        //verify we have an event returned and that its the right one in sequence.
        $this->assertInstanceOf('EE_Event', $next_event);
        $this->assertEquals($event->ID() + 1, $next_event->ID());
        //test retrieving just id
        $next_event = $event->next('EVT_ID', array(), 'EVT_ID');
        //verify the returned array has the right key and value.
        $this->assertTrue(is_array($next_event));
        $this->assertTrue(array_key_exists('EVT_ID', $next_event));
        $this->assertEquals($event->ID() + 1, $next_event['EVT_ID']);
    }


    /**
     * @since 4.6.x
     */
    public function test_previous()
    {
        //create 5 events for testing with.
        $events = $this->factory->event->create_many(5);
        //grab the last event in the list as the reference
        $event = end($events);
        $this->assertInstanceOf('EE_Event', $event);
        //test method retrieving object
        $previous_event = $event->previous('EVT_ID');
        //verify we have an event returned and that its the right one in sequence.
        $this->assertInstanceOf('EE_Event', $previous_event);
        $this->assertEquals($event->ID() - 1, $previous_event->ID());
        //test retrieving just id
        $previous_event = $event->previous('EVT_ID', array(), 'EVT_ID');
        //verify the returned array has the right key and value.
        $this->assertTrue(is_array($previous_event));
        $this->assertTrue(array_key_exists('EVT_ID', $previous_event));
        $this->assertEquals($event->ID() - 1, $previous_event['EVT_ID']);
    }


    /**
     * @group github-102
     * @group 8589
     */
    public function test_get__serialized_data__once()
    {
        $log_message = array(
            'key1' => 'value1',
            'key2' => 'value2',
        );
        $log = EE_Change_Log::new_instance();
        $log->set('LOG_message', $log_message);
        $log->save();
        //verify that when we get its LOG_message its still serialized
        $this->assertTrue(is_array($log->get('LOG_message')));
        $this->assertEquals($log_message, $log->get('LOG_message'));
        //now when we get it from the DB, and get its LOG_message, its still serialized
        $log_id = $log->ID();
        EEM_Change_Log::reset();
        unset($log);
        $log_from_db = EEM_Change_Log::instance()->get_one_by_ID($log_id);
        $this->assertTrue(is_array($log_from_db->get('LOG_message')));
        $this->assertEquals($log_message, $log_from_db->get('LOG_message'));
    }


    /**
     * @group github-102
     * @group 8589
     */
    public function test_get__serialized_data__twice()
    {
        $log_message = serialize(array(
            'key1' => 'value1',
            'key2' => 'value2',
        ));
        $log = EE_Change_Log::new_instance();
        $log->set('LOG_message', $log_message);
        $log->save();
        //verify that when we get its LOG_message its still serialized
        $this->assertTrue(is_array($log->get('LOG_message')));
        $this->assertEquals(unserialize($log_message), $log->get('LOG_message'));
        //now when we get it from the DB, and get its LOG_message, its still serialized
        $log_id = $log->ID();
        EEM_Change_Log::reset();
        unset($log);
        $log_from_db = EEM_Change_Log::instance()->get_one_by_ID($log_id);
        $this->assertTrue(is_array($log_from_db->get('LOG_message')));
        $this->assertEquals(unserialize($log_message), $log_from_db->get('LOG_message'));
    }


    /**
     * @group 8686
     */
    public function test_delete__remove_from_related_items_in_entity_mapper()
    {
        $p = $this->new_model_obj_with_dependencies('Payment');
        $r = $this->new_model_obj_with_dependencies('Registration');
        $p->_add_relation_to($r, 'Registration');
        $reg_payments = $p->registration_payments();
        $this->assertFalse(empty($reg_payments));
        //now delete the relation entry
        foreach ($p->registration_payments() as $registration_payment) {
            if ($registration_payment instanceof EE_Registration_Payment) {
                $this->assertEquals(1, $registration_payment->delete());
            }
        }
        //now there should eb no more registration payments on that payment right?
        $reg_payments = $p->registration_payments();
        $this->assertTrue(empty($reg_payments));
    }


    /**
     * @group 8686
     */
    public function test_remove_relation_to__reciprocal()
    {
        $p = $this->new_model_obj_with_dependencies('Payment');
        $r = $this->new_model_obj_with_dependencies('Registration');
        $p->_add_relation_to($r, 'Registration');
        $regs_on_p = $p->get_many_related('Registration');
        $pays_on_r = $r->get_many_related('Payment');
        $this->assertFalse(empty($regs_on_p));
        $this->assertFalse(empty($pays_on_r));
        //now remove the relations
        foreach ($p->get_many_related('Registration') as $registration) {
            if ($registration instanceof EE_Registration) {
                $this->assertEquals($registration, $p->_remove_relation_to($registration, 'Registration'));
            }
        }
        //now there shoudl eb no more relations between those two right?
        $regs_on_p = $p->get_many_related('Registration');
        $pays_on_r = $r->get_many_related('Payment');
        $this->assertTrue(empty($regs_on_p));
        $this->assertTrue(empty($pays_on_r));
    }

    /**
     * Tests that if you create a model object and immediately change its timezone, the related model
     * objects timezones should be changed too. But currently that isn't the case.
     *
     * @group 10751
     * @group 10905
     */
    public function test_automatically_set_timezone_on_related_model_obj__same_request()
    {
        //this is basically taken from https://github.com/eventespresso/event-espresso-core/blob/master/docs/F--Datetime-System/dates-times-timezones-in-models.md
        $dtt = $this->new_model_obj_with_dependencies('Datetime');
        $event = EEM_Event::instance()->get_one_by_ID($dtt->get('EVT_ID'));
        $event->set_timezone('Europe/London');
        $dtt = $event->get_first_related('Datetime');
        //first check we haven't accidentally changed the event's timezone
        $this->assertEquals('Europe/London', $event->get_timezone());
        //then verify we successfully swapped the datetime's timezone
        $this->assertEquals('Europe/London', $dtt->get_timezone());
    }


    /**
     * Verifies that when we set the timezone on a model object, related objects adopt that same timezone
     *
     * @group 10905
     */
    public function setTimezone()
    {
        $t = $this->new_typical_transaction();
        $datetime = EEM_Datetime::instance()->get_one(array(array('EVT_ID' => $t->primary_registration()->event_ID())));
        //set the timezone on the datetime, which should also set it on the ticket
        $datetime->set_timezone('Europe/London');
        $ticket = $datetime->get_first_related('Ticket');
        $this->assertEquals('Europe/London', $ticket->get_timezone());

        //now verify that if we change the timezone on the datetime, the ticket will also get changed
        $datetime->set_timezone('America/New_York');
        $ticket = $datetime->get_first_related('Ticket');
        $this->assertEquals('America/New_York', $ticket->get_timezone());

    }


    /**
     * Tests that if you save some model objects, and during a subsequent request change the timezone
     * of one, its related model objects timezones will also be changed.
     * This could be considered the same as E
     * E_Base_Class_Test::test_automatically_set_timezone_on_related_model_obj__same_request
     * except this one asserts setting the event's timezone changes the datetime's timezone when done
     * across multiple requests.
     *
     * @group 10751
     */
    public function test_automatically_set_timezone_on_related_model_obj__separate_requests()
    {
        //this is basically taken from https://github.com/eventespresso/event-espresso-core/blob/master/docs/F--Datetime-System/dates-times-timezones-in-models.md
        $dtt = $this->new_model_obj_with_dependencies('Datetime');
        //simulate a new request: forgot about these model objects from the entity map
        //so we'll fetch them newly from the database after resetting their models
        EEM_Datetime::reset();
        EEM_Event::reset();
        $event = EEM_Event::instance()->get_one_by_ID($dtt->get('EVT_ID'));
        $event->set_timezone('Europe/London');
        $dtt = $event->get_first_related('Datetime');
        //first check we haven't accidentally changed the event's timezone
        $this->assertEquals('Europe/London', $event->get_timezone());
        //then verify we successfully swapped the datetime's timezone
        $this->assertEquals('Europe/London', $dtt->get_timezone());
    }


    /**
     * Tests that the f() function correctly escapes the value for display in a form input's value.
     *
     * @group 11195
     */
    public function testF()
    {
        $t = $this->new_model_obj_with_dependencies(
            'Ticket',
            array(
                'TKT_description' => '"</textarea>haha I echo this outside a form!',
            )
        );
        ob_start();
        $t->f('TKT_description');
        $output = ob_get_clean();
        $this->assertEquals(
            '&quot;&lt;/textarea&gt;haha I echo this outside a form!',
            $output
        );
    }


    /**
     * Tests if we prepare a model field with f(), then put in a form input,
     * and the browser does it usual converting of HTML entities into what they represent
     * when the form is submitted, that we end up with the same content that we started with.
     *
     * @group 11195
     */
    public function testFThenSetRoundTrip()
    {
        $original_value = '<b>my bold text "with quotes!"</b> and &quot;html entities&quot; like';
        $t = $this->new_model_obj_with_dependencies(
            'Ticket',
            array(
                'TKT_description' => $original_value,
            )
        );
        $value_in_form = $t->get_pretty('TKT_description', 'form_input');
        //when it's rendered in the browser, they decode HTML entities.
        // and the DECODED HTML entities get submitted in the form data
        $submitted_value = html_entity_decode($value_in_form);
        $t2 = EE_Ticket::new_instance(
            array(
                'TKT_description' => $submitted_value,
            )
        );
        $this->assertEquals(
            $original_value,
            $t2->get('TKT_description')
        );
    }


    /**
     * @group 11344
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws \PHPUnit\Framework\Exception
     */
    public function testGetDateTimeObject()
    {
        //use EE_Mock (which simulates EE_Datetime) for tests
        /** @var EE_Mock $ee_mock */
        $ee_mock = EE_Mock::new_instance();

        //verify we get a DateTime object when requesting one
        $this->assertInstanceOf('DateTime', $ee_mock->get_DateTime_object('MCK_datetime'));

        //verify we always get a different instance of datetime from what is stored internally when retrieving.
        $this->assertNotEquals(
            spl_object_hash($ee_mock->internalDateTimeObject('MCK_datetime')),
            spl_object_hash($ee_mock->get_DateTime_object('MCK_datetime'))
        );
    }


    /**
     * @group 11344
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function testClone()
    {
        /** @var EE_Mock $ee_mock */
        $ee_mock = EE_Mock::new_instance();
        $original_datetime = $ee_mock->internalDateTimeObject('MCK_datetime');

        //clone our EE_Datetime and verify the DateTime for the same field is also a new instance.
        $new_ee_datetime = clone $ee_mock;

        $this->assertEquals(
            spl_object_hash($ee_mock->internalDateTimeObject('MCK_datetime')),
            spl_object_hash($original_datetime)
        );
        $this->assertNotEquals(
            spl_object_hash($ee_mock->internalDateTimeObject('MCK_datetime')),
            spl_object_hash($new_ee_datetime->internalDateTimeObject('MCK_datetime'))
        );
    }
}
