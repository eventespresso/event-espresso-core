<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_Form_Section_Proper_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
/**
 * @group forms
 */
class EE_Form_Section_Proper_Test extends EE_UnitTestCase{

	public function test_input_values(){
		$form = new EE_Form_Section_Proper(array(

			'subsections'=>array(
				'first_name' => new EE_Text_Input(),
				'last_name' => new EE_Text_Input(),
			)

		));
		$data = array('first_name'=>'brent','last_name'=>'possum');
		$form->receive_form_submission( $data );
		$this->assertEquals( $data, $form->input_values() );
	}
	public function test_add_subsection__weird_subsection_names(){
		$grandparent_form = new EE_Form_Section_Proper(array(
			'name'=>'grandparent',
			'subsections'=>array(
				'123-reg-money'=> new EE_Form_Section_Proper(array(
					'subsections'=>array(
						'!0!a77y-bad`string' => new EE_Text_Input()
					)
				))
			)
		));
		$grandparent_form->add_subsections(array('new_one'=>new EE_Text_Input()));
		$added_input = $grandparent_form->get_input('new_one');
		$this->assertInstanceOf('EE_Text_Input', $added_input);
		$this->assertEquals( 'new_one', $added_input->name() );
		$this->assertEquals( 'grandparent[new_one]', $added_input->html_name() );

		$grandparent_form->add_subsections(array(12=>new EE_Text_Input()));
		$other_added_input = $grandparent_form->get_input( 12 );
		$this->assertInstanceOf('EE_Text_Input', $other_added_input);

	}
	public function test_form_data_present_in__normal(){
		$granparent_form = new EE_Form_Section_Proper(array(
			'name'=>'grandparent',
			'subsections'=>array(
				'parent' => new EE_Form_Section_Proper( array(
					'subsections' => array(
						'form' => new EE_Form_Section_Proper( array(
							'subsections' => array(
								'input' => new EE_Text_Input(),
								'input2' => new EE_Text_Input()
								)
							)
						))
						)
				))
			)
		);

		$req_data_good = array('grandparent'=>array('parent' => array( 'form' =>array( 'input' => 'value', 'input2' => 'value2'))));
		$req_data_bad = array('foo'=>array('bar'=>array('monkey' => 'poop' ) ),
				'fluff' => array( 'baz' => array( 'lizard' => 'tail' )));
		$this->assertTrue( $granparent_form->form_data_present_in( $req_data_good) );
		$this->assertFalse( $granparent_form->form_data_present_in( $req_data_bad ) );
	}
	public function test_form_data_present_in__custom_html_name(){
		$granparent_form = new EE_Form_Section_Proper(array(
			'name'=>'grandparent',
			'subsections'=>array(
				'parent' => new EE_Form_Section_Proper( array(
					'subsections' => array(
						'form' => new EE_Form_Section_Proper( array(
							'subsections' => array(
								'input' => new EE_Text_Input(array(
									'html_name' => 'foo[bar][monkey]',
								)),
								'input2' => new EE_Text_Input(array(
									'html_name' => 'fluff[baz][lizard]'
								))
								)
							)
						))
						)
				))
			)
		);

		$req_data_bad = array('grandparent'=>array('parent' => array( 'form' =>array( 'input' => 'value', 'input2' => 'value2'))));
		$req_data_good = array('foo'=>array('bar'=>array('monkey' => 'poop' ) ),
				'fluff' => array( 'baz' => array( 'lizard' => 'tail' )));
		$this->assertTrue( $granparent_form->form_data_present_in( $req_data_good) );
		$this->assertFalse( $granparent_form->form_data_present_in( $req_data_bad ) );

		$parent_form = $granparent_form->get_subsection( 'parent' );
		$this->assertTrue( $parent_form->form_data_present_in( $req_data_good) );
		$this->assertFalse( $parent_form->form_data_present_in( $req_data_bad ) );

		$form = $parent_form->get_subsection( 'form' );
		$this->assertTrue( $form->form_data_present_in( $req_data_good) );
		$this->assertFalse( $form->form_data_present_in( $req_data_bad ) );

	}

	public function test_is_valid(){
		$form = new EE_Form_Section_Proper( array(
			'name'=>'form',
			'subsections' => array(
				'subform1' => new EE_Form_Section_Proper( array(
					'subsections' => array(
						'input1' => new EE_Text_Input()
					)
				))
			)
		));
		$req_data_bad = array();
		$req_data_good = array('form' => array( 'subform1' => array( 'input1' => 'value' ) ) );
		$this->assertTrue( $form->was_submitted( $req_data_good ) );
		$form->receive_form_submission( $req_data_good );
		$this->assertTrue( $form->is_valid() );

	}

	/**
	 * @group ticket_6505
	 */
	public function test_numeric_named_inputs(){
		$form = new EE_Form_Section_Proper(
			array(
				'html_id' => 'ee-available-payment-method-inputs',
				'subsections' => array(
				0 => new EE_Radio_Button_Input(
						array( 'one' => 'One','two' => 'Two', 'three' => 'Three' ),
						array(
						'html_name' => 'selected_method_of_payment',
						'html_class' => 'spco-payment-method',
						'default'    => 'three'
						)
					)
				)
			)
		);
		$this->assertEquals(1, count( $form->inputs() ) );
	}

	/**
	 * @group 6781
	 */
	public function test_get_validation_errors_accumulated(){
		$form = new EE_Form_Section_Proper(
			array(
				'name' => 'Form',
				'subsections' => array(
					'radio1' => new EE_Radio_Button_Input(
							array( 'one' => 'One','two' => 'Two', 'three' => 'Three' ),
							array(
							'html_class' => 'spco-payment-method',
							'default'    => 'three'
							)
						),
					'input2' => new EE_Text_Input( array(
						'required' => TRUE
					)),
					'subsubsection' => new EE_Form_Section_Proper( array(
						'subsections' => array(
							'input3' => new EE_Float_Input(),
							'input4' => new EE_Text_Input()
							)
					))
				)
			)
		);
		$form->receive_form_submission( array(
			'Form' => array(
				'radio1' => 'four-invalid',
				'input2' => '',
				'subsubsection' => array(
					'input3' => 'non-number',
					'input4' => 'whatever-ok'
				))
		));
		$this->assertFalse( $form->is_valid() );
		$all_errors = $form->get_validation_errors_accumulated();
		$this->assertEquals( 3, count( $all_errors ) );
		$error1 = array_shift( $all_errors );
		$error2 = array_shift( $all_errors );
		$error3 = array_shift( $all_errors );


		$this->assertInstanceOf( 'EE_Validation_Error', $error1 );
		$this->assertInstanceOf( 'EE_Radio_Button_Input', $error1->get_form_section() );
		$this->assertEquals( 'radio1', $error1->get_form_section()->name() );


		$this->assertInstanceOf( 'EE_Validation_Error', $error2 );
		$this->assertInstanceOf( 'EE_Text_Input', $error2->get_form_section() );
		$this->assertEquals( 'input2', $error2->get_form_section()->name() );
		$this->assertInstanceOf( 'EE_Validation_Error', $error3 );
		$this->assertInstanceOf( 'EE_Float_Input', $error3->get_form_section() );
		$this->assertEquals( 'input3', $error3->get_form_section()->name() );
	}
}

// End of file EE_Form_Section_Proper_Test.php