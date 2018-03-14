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
	public function test_add_subsection__before(){
		$input1 = new EE_Text_Input();
		$input2 = new EE_Text_Input();
		$input3 = new EE_Text_Input();
		$input4 = new EE_Text_Input();
		$input5 = new EE_Text_Input();
		$parent_form = new EE_Form_Section_Proper( array(
			'name' => 'form',
			'subsections' => array(
				'input1' => $input1,
				'input2' => $input2,
			)
		));
		$inputs = $parent_form->inputs();
		$this->assertEquals( $input1, reset($inputs) );
		$this->assertEquals( $input2, next( $inputs ) );

		//ok now add a subsection before the first one
		$parent_form->add_subsections( array( 'input3' => $input3 ), 'input1' );
		$inputs = $parent_form->inputs();
		$this->assertEquals( $input3, reset($inputs) );
		$this->assertEquals( $input1, next( $inputs ) );
		$this->assertEquals( $input2, next( $inputs ) );

		//now add a subsection in the middle
		$parent_form->add_subsections( array( 'input4' => $input4 ), 'input1' );
		$inputs = $parent_form->inputs();
		$this->assertEquals( $input3, reset($inputs) );
		$this->assertEquals( $input4, next($inputs) );
		$this->assertEquals( $input1, next( $inputs ) );
		$this->assertEquals( $input2, next( $inputs ) );

		//lastly add a subsection onto the very end
		$parent_form->add_subsections( array( 'input5' => $input5 ), null, false );
		$inputs = $parent_form->inputs();
		$this->assertEquals( $input3, reset($inputs) );
		$this->assertEquals( $input4, next($inputs) );
		$this->assertEquals( $input1, next( $inputs ) );
		$this->assertEquals( $input2, next( $inputs ) );
		$this->assertEquals( $input5, next( $inputs ) );
	}
	public function test_add_subsection__after(){
		$input1 = new EE_Text_Input();
		$input2 = new EE_Text_Input();
		$input3 = new EE_Text_Input();
		$input4 = new EE_Text_Input();
		$input5 = new EE_Text_Input();
		$parent_form = new EE_Form_Section_Proper( array(
			'name' => 'form',
			'subsections' => array(
				'input1' => $input1,
				'input2' => $input2,
			)
		));
		$inputs = $parent_form->inputs();
		$this->assertEquals( $input1, reset($inputs) );
		$this->assertEquals( $input2, next( $inputs ) );

		//ok now add a subsection after the last one
		$parent_form->add_subsections( array( 'input3' => $input3 ), 'input2', false );
		$inputs = $parent_form->inputs();
		$this->assertEquals( $input1, reset($inputs) );
		$this->assertEquals( $input2, next( $inputs ) );
		$this->assertEquals( $input3, next( $inputs ) );

		//now add a subsection in the middle
		$parent_form->add_subsections( array( 'input4' => $input4 ), 'input2', false );
		$inputs = $parent_form->inputs();
		$this->assertEquals( $input1, reset($inputs) );
		$this->assertEquals( $input2, next($inputs) );
		$this->assertEquals( $input4, next( $inputs ) );
		$this->assertEquals( $input3, next( $inputs ) );

		//lastly add a subsection onto the very beginning
		$parent_form->add_subsections( array( 'input5' => $input5 ) );
		$inputs = $parent_form->inputs();
		$this->assertEquals( $input5, reset($inputs) );
		$this->assertEquals( $input1, next($inputs) );
		$this->assertEquals( $input2, next($inputs) );
		$this->assertEquals( $input4, next( $inputs ) );
		$this->assertEquals( $input3, next( $inputs ) );
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
		$post_data = array(
			'Form' => array(
				'radio1' => 'four-invalid',
				'input2' => '',
				'subsubsection' => array(
					'input3' => 'non-number',
					'input4' => 'whatever-ok'
				))
		);
		$form->receive_form_submission( $post_data );
		//submit twice, which should be fine; it shoudl jsut reset before
		//2nd submission
		$form->receive_form_submission( $post_data );
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

	/**
	 * Tests the form was submitted functionality.
	 *
	 * @group 7431
	 */
	public function test_form_was_submitted() {
		$form = new EE_Form_Section_Proper( array(
				'name' => 'test_form',
				'html_id' => 'test_form',
				'subsections' => array(
					'yes_no' => new EE_Yes_No_Input(
						array(
							'html_label_text' => 'testing',
							'default' => false
							)
						)
					)
			)
			);
		$post_data = array(
			'test_form' => array(
				'yes_no' => '0'
				)
			);
		$this->assertTrue( $form->was_submitted( $post_data ) );
	}
	/**
	 * @group 9784
	 * Verify EE_FOrm_SEction_proper::submitted_values() generates an array
	 * exactly like the submitted data
	 */
	public function test_submitted_values() {
		$form = new EE_Form_Section_Proper(
			array(
				'name' => 'top',
				'subsections' => array(
					'middle' => new EE_Form_Section_Proper(
						array(
							'subsections' => array(
								'bottom_input1' => new EE_Phone_Input(),
								'bottom_checkbox' => new EE_Checkbox_Multi_Input(
									array(
										'op1' => 'option1',
										'op2' => 'option2',
										'op3' => 'option3'
									)
								)
							)
						)
					),
					'middle_checkbox' => new EE_Checkbox_Multi_Input(
						array(
							'op1' => 'option1',
							'op2' => 'option2',
							'op3' => 'option3'
						)
					),
                    'middle_radio' => new EE_Radio_Button_Input(
                        array(
                            'op1' => 'option1',
                            'op2' => 'option2'
                        )
                    )
				)
			)
		);
		$form->_construct_finalize(null, null );
		$submitted_data = array(
			'top' => array(
				'middle' => array(
					'bottom_input1' => 'not-a-phone-number',
					'bottom_checkbox' => array(
						'op2',
						'not-existent-op'
					)
				),
				'middle_checkbox' => array(
					'op2',
					'not-existent-op'
				),
                'middle_radio' => 'op1'
			)
		);
		$form->receive_form_submission( 
			$submitted_data
		);
		$this->assertEquals(
			$submitted_data,
			$form->submitted_values( true )
		);
	}
	
	/**
	 * @group 9784
	 * Verify EE_FOrm_section_Proper::submitted_values generates the post-like submission
	 * array when there are custom names on inputs
	 */
	public function test_submitted_values__custom_html_name_on_input(){
		$form = new EE_Form_Section_Proper(
			array(
				'name' => 'top',
				'subsections' => array(
					'middle' => new EE_Form_Section_Proper(
						array(
							'subsections' => array(
								'bottom' => new EE_Text_Input(
									array(
										'html_name' => 'custom_html_name'
									)
								)
							)
						)
					)
				)
			)
		);
		$form->_construct_finalize(null, null);
		$submitted_data = array(
			'custom_html_name' => 'value'
		);
		$form->receive_form_submission( $submitted_data );
		$this->assertEquals(
			$submitted_data,
			$form->submitted_values( true )
		);
	}



    /**
     * validate the form (which caches the result) then re-submit it and verify the cache got cleared
     * @group 11381
     */
	public function testIsValidCached()
    {
        $f = new EE_Form_Section_Proper(
            array(
                'name' => 'form',
                'subsections'=> array(
                    'int' => new EE_Integer_Input(
                        array(
                            'required' => true
                        )
                    )
                )
            )
        );
        $f->receive_form_submission(
            array(
                'form' => array(
                    'int' => '4'
                )
            )
        );
        $this->assertTrue($f->is_valid());
        //and double-check calling it again works fine too
        $this->assertTrue($f->is_valid());
        //now change the form's input
        $f->receive_form_submission(
            array(
                'form' => array(
                    'int' => 'saskquatch'
                )
            )
        );
        $this->assertFalse($f->is_valid());

    }
}

// End of file EE_Form_Section_Proper_Test.php
