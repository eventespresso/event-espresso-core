<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EEM_Answer_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
/**
 * @group core/db_models
 */
class EEM_Answer_Test extends EE_UnitTestCase{
	function test_get_registration_question_answer_object(){
		$r = $this->new_model_obj_with_dependencies('Registration');
		$a = $this->new_model_obj_with_dependencies('Answer',array('REG_ID'=>$r->ID()));
		$q = EEM_Question::instance()->get_one_by_ID($a->question_ID());
		$this->assertNotNull($q);
		$this->assertEquals( $a, EEM_Answer::instance()->get_registration_question_answer_object( $r, $a->question_ID() ) );
	}
	function test_get_attendee_property_answer_value(){
		$r = $this->new_model_obj_with_dependencies( 'Registration' );
		global $wpdb;
		$att = EEM_Attendee::reset()->get_one_by_ID( $r->attendee_ID() );
		$this->assertEquals( $r->attendee()->fname(), EEM_Answer::instance()->get_attendee_property_answer_value( $r,  EEM_Attendee::fname_question_id ) );
	}
	public function test_get_answer_value_to_question(){
		$r = $this->new_model_obj_with_dependencies('Registration');
		$a = $this->new_model_obj_with_dependencies('Answer',array('REG_ID'=>$r->ID()));
		$this->assertEquals($a->value(),EEM_Answer::instance()->get_answer_value_to_question($r,$a->question_ID(),false));
		$this->assertEquals($r->attendee()->fname(),EEM_Answer::instance()->get_answer_value_to_question($r,  EEM_Attendee::fname_question_id));
	}
}

// End of file EEM_Answer_Test.php