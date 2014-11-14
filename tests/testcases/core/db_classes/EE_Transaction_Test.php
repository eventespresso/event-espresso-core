<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_Transaction_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Transaction_Test extends EE_UnitTestCase{

	public function test_primary_registration(){
		$t = $this->new_model_obj_with_dependencies( 'Transaction', NULL, FALSE );
		$this->assertEquals( 0, $t->ID() );
		$r = $this->new_model_obj_with_dependencies( 'Registration', array('REG_count'=>1 ), FALSE );
		$this->assertEquals( 0, $r->ID() );
		$t->_add_relation_to( $r, 'Registration' );
		$this->assertEquals( $r, $t->primary_registration() );
		$r->save();
		$this->assertNotEquals( 0, $r->ID() );
		$in_map = EE_Registry::instance()->load_model('Registration')->get_from_entity_map( $r->ID() );
		$this->assertEquals( $r, $in_map );
		$this->assertEquals( $r, $t->primary_registration() );
		$this->assertEquals( 1, $r->count() );
		$r_in_db = EE_Registry::instance()->load_model('Registration')->get_one_by_ID($r->ID() );
		$this->assertEquals( $r, $r_in_db );
		$t->save();
		$this->assertEquals( $r, $t->primary_registration() );
		//why does the above fail? because we forgot to set the registration's TXN_ID!
		//so it makes sense, but it sure would have been considerate of the trasnaction if,
		//when it was saved, it would have set the ID on all foreign keys pointing to it
		//on things it had cached on itself
	}
}

// End of file EE_Transaction_Test.php