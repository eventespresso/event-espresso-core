<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 *
 * EE_Registration_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
/**
 * @group core/db_classes
 */
class EE_Registration_Test extends EE_UnitTestCase{
	function test_finalize(){
		$t = EE_Transaction::new_instance(array('STS_ID'=>  EEM_Transaction::complete_status_code));
		$t->save();
		$e = EE_Event::new_instance();
		$e->save();
		$tkt = EE_Ticket::new_instance();
		$tkt->save();
		$d = EE_Datetime::new_instance(array('EVT_ID'=>$e->ID()));
		$d->save();
		$tkt->_add_relation_to($d, 'Datetime');
		$r = EE_REgistration::new_instance(array('EVT_ID'=>$e->ID(), 'TXN_ID'=>$t->ID(),'TKT_ID'=>$tkt->ID(), 'STS_ID'=>  EEM_Registration::status_id_pending_payment));
		$r->finalize();
		$this->assertNotNull($r->reg_code());
		$this->assertEquals(EEM_Registration::status_id_approved,$r->status_ID());
	}

	function test_answer_value_to_question() {
		$r = $this->new_model_obj_with_dependencies( 'Registration' );
		$q1 = $this->new_model_obj_with_dependencies( 'Question' );
		//also grab the default firstname question
		$q2 = EEM_Question::instance()->get_one_by_ID(EEM_Attendee::fname_question_id);
		$this->assertNotNull($q2);
		$a1 = $this->new_model_obj_with_dependencies( 'Answer', array('REG_ID'=>$r->ID(), 'QST_ID'=>$q1->ID()));
		$this->assertEquals( $a1->value(), $r->answer_value_to_question( $q1, false ) );
		$this->assertEquals($r->attendee()->fname(),$r->answer_value_to_question($q2,false));
	}



	/**
	 * This verifies the can_checkin() method in EE_registrationa
	 *
	 * @since 4.5.0
	 *
	 * @return void
	 */
	function test_can_checkin() {
		//setup a registration
		$r = $this->new_model_obj_with_dependencies( 'Registration' );
		$d = EEM_Datetime_Ticket::instance()->get_one( array( array( 'TKT_ID' => $r->get('TKT_ID') ) ) );
		$this->assertInstanceOf( 'EE_Datetime_Ticket', $d );
		$valid_DTT_ID = $d->get('DTT_ID');
		$invalid_DTT_ID = 99999;

		//k let's test the possible expected responses of can_checkin;
		//IGNORING status
		//test one: valid DTT and unapproved reg
		$r->set_status( EEM_Registration::status_id_not_approved );
		$this->assertTrue( $r->can_checkin( $valid_DTT_ID, false ) );

		//test two: invalid DTT and approved reg
		$r->set_status( EEM_Registration::status_id_approved );
		$this->assertFalse( $r->can_checkin( $invalid_DTT_ID, false ) );

		//including status
		//test one: valid DTT and approved reg
		$this->assertTrue( $r->can_checkin( $valid_DTT_ID ) );

		//test two: invalid DTT and approved reg
		$this->assertFalse( $r->can_checkin( $invalid_DTT_ID ) );

		//test three: valid DTT and not approved reg
		$r->set_status( EEM_Registration::status_id_not_approved );
		$this->assertFalse( $r->can_checkin( $valid_DTT_ID ) );

		//test four: invalid DTT and not approved reg
		$this->assertFalse( $r->can_checkin( $invalid_DTT_ID ) );
	}

}

// End of file EE_Registration_Test.php
