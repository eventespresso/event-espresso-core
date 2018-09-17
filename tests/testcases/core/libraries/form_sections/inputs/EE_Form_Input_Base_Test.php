<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_Form_Input_Base_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
/**
 * @group forms
 */
class EE_Form_Input_Base_Test extends EE_UnitTestCase{

	public function test_set_default_html_name(){
		$granparent_form = new EE_Form_Section_Proper(array(
			'name'=>'grandparent',
			'subsections'=>array(
				'parent' => new EE_Form_Section_Proper( array(
					'subsections' => array(
						'form' => new EE_Form_Section_Proper( array(
							'subsections' => array(
								'input' => new EE_Text_Input()
								)
							)
						))
						)
				))
			)
		);

		$input = $granparent_form->get_subsection( 'parent' )->get_subsection( 'form' )->get_subsection( 'input' );
		$this->assertInstanceOf('EE_Form_Input_Base', $input);
		$this->assertEquals('grandparent[parent][form][input]', $input->html_name());
	}

	public function test_find_form_data_for_this_section__custom_html_name(){
		$granparent_form = new EE_Form_Section_Proper(array(
			'name'=>'grandparent',
			'subsections'=>array(
				'parent' => new EE_Form_Section_Proper( array(
					'subsections' => array(
						'form' => new EE_Form_Section_Proper( array(
							'subsections' => array(
								'input' => new EE_Text_Input(array(
									'html_name' => 'foo[bar][monkey]'
								))
								)
							)
						))
						)
				))
			)
		);
		$input = $granparent_form->get_subsection( 'parent' )->get_subsection( 'form' )->get_subsection( 'input' );
		$req_data_bad = array('grandparent'=>array('parent' => array( 'form' =>array( 'input' => 'value'))));
		$req_data_good = array('foo'=>array('bar'=>array('monkey' => 'value')));
		$this->assertNull($input->find_form_data_for_this_section( $req_data_bad ) );
		$this->assertEquals( 'value', $input->find_form_data_for_this_section( $req_data_good ) );
	}

	public function test_find_form_data_for_this_section__normal(){
		$granparent_form = new EE_Form_Section_Proper(array(
			'name'=>'grandparent',
			'subsections'=>array(
				'parent' => new EE_Form_Section_Proper( array(
					'subsections' => array(
						'form' => new EE_Form_Section_Proper( array(
							'subsections' => array(
								'input' => new EE_Text_Input()
								)
							)
						))
						)
				))
			)
		);
		$input = $granparent_form->get_subsection( 'parent' )->get_subsection( 'form' )->get_subsection( 'input' );
		$req_data_good = array('grandparent'=>array('parent' => array( 'form' =>array( 'input' => 'value'))));
		$req_data_bad = array('foo'=>array('bar'=>array('monkey' => 'value')));
		$this->assertNull($input->find_form_data_for_this_section( $req_data_bad ) );
		$this->assertEquals( 'value', $input->find_form_data_for_this_section( $req_data_good ) );
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
		$input = $granparent_form->get_subsection( 'parent' )->get_subsection( 'form' )->get_subsection( 'input' );
		$this->assertTrue( $input->form_data_present_in( $req_data_good) );
		$this->assertFalse( $input->form_data_present_in( $req_data_bad ) );
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
		$input = $granparent_form->get_subsection( 'parent' )->get_subsection( 'form' )->get_subsection( 'input' );
		$this->assertTrue( $input->form_data_present_in( $req_data_good) );
		$this->assertFalse( $input->form_data_present_in( $req_data_bad ) );


	}
	
	/**
	 * Verifies that the inputs default HTML names reflect the actual form structure.
	 * @group 10110
	 */
	public function test_input_names_should_be_consistent_regardless_of_when_input_was_added() {
		$input1 = new EE_Text_Input();
		$form = new EE_Form_Section_Proper(
			array(
				'subsections' => array(
					'input1' => $input1,
				)
			)
		);
		$form->_construct_finalize( null, null );
		//ok so subform is complete right? Well let's now make it a subform.
		//what could possibly go wrong when you do that?
		$top_form = new EE_Form_Section_Proper(
			array(
				'subsections' => array(
					'subform' => $form
				)
			)
		);
		$top_form->_construct_finalize(null, 'topform' );
		//ok great. Now let's add something to the form. It shouldn't
		//matter if the input was added when the form was constructed,
		//or after it was all done being constructed. It should still work.
		$input2 = new EE_Text_Input();
		$form->add_subsections(
			array(
				'input2' => $input2
			)
		);
		//both inputs, regardless of when they were added, should have pretty well the
		//same html name.
		$this->assertEquals( 'topform[subform][input1]', $input1->html_name() );
		$this->assertEquals( 'topform[subform][input2]', $input2->html_name() );
	}



    /**
     * Tests that if `ignore_input` is provided, we get the null normalization and no validation strategies
     * @group 11380
     */
	public function testIgnoreInput() {
        $f = new EE_Form_Section_Proper(
            array(
                'name' => 'form',
                'subsections' => array(
                    'text' => new EE_Text_Input(
                        array(
                            'ignore_input' => true
                        )
                    ),
                    'email' => new EE_Email_Input(
                        array(
                            'ignore_input' => true
                        )
                    ),
                    'checkbox' => new EE_Checkbox_Multi_Input(
                        array('a','b'),
                        array(
                            'ignore_input' => true
                        )
                    ),
                    'radio' => new EE_Radio_Button_Input(
                        array('a','b'),
                        array(
                            'ignore_input' => true
                        )
                    ),
                    'ok' => new EE_Text_Input()
                )
            )
        );
        $f->receive_form_submission(
            array(
                'form' => array(
                    'text' => 'hackerz',
                    'email' => 'virus!',
                    'checkbox' => array( 2, 3),
                    'radio' => 3,
                    'ok' => 'yep'
                )
            )
        );
        $this->assertNull($f->get_input_value('text'));
        $this->assertNull($f->get_input_value('email'));
        $this->assertNull($f->get_input_value('checkbox'));
        $this->assertNull($f->get_input_value('radio'));
        //verify we still get normal inputs
        $this->assertEquals('yep', $f->get_input_value('ok'));
        //verify the form is still valid, even though the inputs had null normalization
        $this->assertTrue($f->is_valid());
    }
}

// End of file EE_Form_Input_Base_Test.php