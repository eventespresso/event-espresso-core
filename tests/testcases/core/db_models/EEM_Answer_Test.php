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

    /**
     * @var EEM_Answer
     */
    protected $model;

    /**
     * @since 4.9.74.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    public function setUp()
    {
        parent::setUp();
        $this->model = EEM_Answer::instance();
    }

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
		$this->assertEquals( $r->attendee()->fname(), EEM_Answer::instance()->get_attendee_property_answer_value( $r,  EEM_Attendee::system_question_fname ) );
	}
	public function test_get_answer_value_to_question(){
		$r = $this->new_model_obj_with_dependencies('Registration');
		$a = $this->new_model_obj_with_dependencies('Answer',array('REG_ID'=>$r->ID()));
		$this->assertEquals($a->value(),EEM_Answer::instance()->get_answer_value_to_question($r,$a->question_ID(),false));
		$this->assertEquals($r->attendee()->fname(),EEM_Answer::instance()->get_answer_value_to_question($r,  EEM_Question::instance()->get_Question_ID_from_system_string( EEM_Attendee::system_question_fname ) ) );
	}
	/**
	 * @group 8237
	 */
	public function test_set_ANS_value__with_unsafe_html(){
		$a = $this->new_model_obj_with_dependencies( 'Answer', array( 'ANS_value' => '<img src=x onerror=prompt(document.cookie)><img src=x onerror=prompt(/XSS/)><img src=x onerror=prompt(1)>') );
		$this->assertEquals( '', $a->get_raw( 'ANS_value' ) );
	}

	/**
	 * @group 8237
	 */
	public function test_get_ANS_value__with_unsafe_html_in_db() {
		$a = $this->new_model_obj_with_dependencies( 'Answer' );
		global $wpdb;
		//manually insert bad stuff into the answer
		$success = $wpdb->update(
				EEM_Answer::instance()->table(),
				array(
					'ANS_value' => '<img src=x onerror=prompt(document.cookie)><img src=x onerror=prompt(/XSS/)><img src=x onerror=prompt(1)>'
				),
				array(
					'ANS_ID' => $a->ID()
				),
				array(
					'%s',//ANS_value
				),
				array(
					'%s',//ANS_ID
				)
				);
		$this->assertEquals( 1, $success );
		$this->assertEquals(
				'<img src=x onerror=prompt(document.cookie)><img src=x onerror=prompt(/XSS/)><img src=x onerror=prompt(1)>',
				EEM_Answer::instance()->get_var(
					array(
						array(
							'ANS_ID' => $a->ID()
						)
					),
					'ANS_value' ));
		//ok so it's definetely got dangerous stuff in the db, but when we fetch it using the models it should be safe again
		$a->refresh_from_db();
		$this->assertEquals( '', $a->get_raw( 'ANS_value' ) );
	}

    /**
     * @since 4.9.74.p
     * @group private-1
     */
    public function testRestrictedbyRelatedModelPassword()
    {
        $this->assertFalse($this->model->restrictedByRelatedModelPassword());
    }
}

// End of file EEM_Answer_Test.php