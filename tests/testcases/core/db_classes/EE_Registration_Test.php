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
		/** @type EE_Registration_Processor $registration_processor */
		$registration_processor = EE_Registry::instance()->load_class( 'Registration_Processor' );
		$REG_url_link = new EventEspresso\core\domain\entities\RegUrlLink(
		    1,
            EE_Line_Item::new_instance(
                array(
                    'LIN_name'       => $tkt->name(),
                    'LIN_desc'       => $tkt->description(),
                    'LIN_unit_price' => $tkt->price(),
                    'LIN_quantity'   => 1,
                    'LIN_is_taxable' => $tkt->taxable(),
                    'LIN_order'      => 0,
                    'LIN_total'      => $tkt->price(),
                    'LIN_type'       => EEM_Line_Item::type_line_item,
                    'OBJ_ID'         => $tkt->ID(),
                    'OBJ_type'       => 'Ticket'
                )
            )
        );
		$r = EE_Registration::new_instance(
			array(
				'EVT_ID'			=> $e->ID(),
				'TXN_ID'			=> $t->ID(),
				'TKT_ID'			=> $tkt->ID(),
				'STS_ID'			=> EEM_Registration::status_id_pending_payment,
				'REG_url_link' 	    => $REG_url_link
			)
		);

		$r->set_reg_code(
            new EventEspresso\core\domain\entities\RegCode(
                $REG_url_link,
                $r->transaction(),
                $r->ticket()
            )
        );
		$registration_processor->update_registration_after_checkout_or_payment( $r );
		$this->assertNotNull($r->reg_code());
		$this->assertEquals(EEM_Registration::status_id_approved,$r->status_ID());
	}

	function test_answer_value_to_question() {
        /** @var EE_Registration $r */
        $r = $this->new_model_obj_with_dependencies( 'Registration' );
		$q1 = $this->new_model_obj_with_dependencies( 'Question' );
		//also grab the default first name question
		$q2 = EEM_Question::instance()->get_Question_ID_from_system_string(EEM_Attendee::system_question_fname);
		$this->assertNotNull($q2);
        /** @var EE_Answer $a1 */
        $a1 = $this->new_model_obj_with_dependencies( 'Answer', array('REG_ID' =>$r->ID(), 'QST_ID' =>$q1->ID()));
		$this->assertEquals( $a1->value(), $r->answer_value_to_question( $q1, false ) );
		$this->assertEquals($r->attendee()->fname(),$r->answer_value_to_question($q2,false));
	}



	/**
	 * This verifies the can_checkin() method in EE_registration
	 *
	 * @since 4.5.0
	 *
	 * @return void
	 */
	function test_can_checkin() {
		//setup a registration
		$r = $this->new_model_obj_with_dependencies( 'Registration' );

		$t = $this->new_ticket();

		//let's assign the above ticket to our registration
		$r->_add_relation_to( $t, 'Ticket' );
		$r->save();

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

		//test four: valid DTT and incomplete reg
		$r->set_status( EEM_Registration::status_id_incomplete );
		$this->assertFalse( $r->can_checkin( $valid_DTT_ID ) );

		//test five: invalid DTT and incomplete reg
		$this->assertFalse( $r->can_checkin( $invalid_DTT_ID ) );
	}

    /**
     * @since $VID:$
     * @throws EE_Error
     */
	public function testQuestionGroupsPrimaryReg()
    {
        $r = $this->new_model_obj_with_dependencies(
            'Registration',
            [
                'REG_count' => 1,
            ]
        );
        // Associate both question groups for primary registrants, but only personal for additional registrants
        $r->event_obj()->add_question_group(EEM_Question_Group::system_personal, true);
        $r->event_obj()->add_question_group(EEM_Question_Group::system_personal, false);
        $r->event_obj()->add_question_group(EEM_Question_Group::system_address, true);
        $qgs = $r->question_groups();
        $this->assertEquals(2, count($qgs));
    }

    /**
     * @since $VID:$
     * @throws EE_Error
     */
    public function testQuestionGroupsAdditionalReg()
    {
        $r = $this->new_model_obj_with_dependencies(
            'Registration',
            [
                'REG_count' => 2,
                'REG_group_size' => 2,
            ]
        );
        // Associate both question groups for primary registrants, but only personal for additional registrants
        $r->event_obj()->add_question_group(EEM_Question_Group::system_personal, true);
        $r->event_obj()->add_question_group(EEM_Question_Group::system_personal, false);
        $r->event_obj()->add_question_group(EEM_Question_Group::system_address, true);
        $qgs = $r->question_groups();
        $this->assertEquals(1, count($qgs));
        $qg = reset($qgs);
        $this->assertEquals(1, $qg->ID());
    }

    /**
     * @since $VID:$
     * @throws EE_Error
     */
    public function testCountQuestionGroups()
    {
        $r = $this->new_model_obj_with_dependencies(
            'Registration',
            [
                'REG_count' => 2,
                'REG_group_size' => 2,
            ]
        );
        // Associate both question groups for primary registrants, but only personal for additional registrants
        $r->event_obj()->add_question_group(EEM_Question_Group::system_personal, true);
        $r->event_obj()->add_question_group(EEM_Question_Group::system_personal, false);
        $r->event_obj()->add_question_group(EEM_Question_Group::system_address, true);
        $this->assertEquals(1, $r->count_question_groups());
    }
}

// End of file EE_Registration_Test.php
// Location: /tests/testcases/core/db_classes/EE_Registration_Test.php
