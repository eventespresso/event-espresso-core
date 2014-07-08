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
}

// End of file EE_Form_Section_Proper_Test.php