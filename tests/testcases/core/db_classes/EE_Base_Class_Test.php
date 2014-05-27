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


	function test_clear_cache(){
		$t = EE_Transaction::new_instance();

		//test that clear cache for an item that ISN'T cached doesn't produce an error.
		$response = $t->clear_cache('Registration');
		$this->assertNull( $response );
		//test that after we've cached something, we can remove it specifically
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
	}
}

// End of file EE_Base_Class_Test.php
