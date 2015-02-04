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
}

// End of file EE_Form_Input_Base_Test.php