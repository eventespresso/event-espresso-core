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
	function test_saving(){
		$t = EE_Transaction::new_instance();
		$id = $t->save();
		$this->assertNotNull($id);
		$this->assertEquals($t->ID(),$id);
		$t2 = EEM_Transaction::instance()->get_one_by_ID($id);
		$this->assertEquals($id,$t2->ID());
	}
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
		$r_from_t = $t->get_first_related('Registration');
		$this->assertEquals($r,$r_from_t);
		
	}
	
}

// End of file EE_Base_Class_Test.php