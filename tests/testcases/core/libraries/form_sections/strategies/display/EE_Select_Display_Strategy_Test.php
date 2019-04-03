<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_Select_Display_Strategy_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Select_Display_Strategy_Test extends EE_UnitTestCase{

	/**
	 * @group html
	 */
	public function test_display_flat_array(){
		$form = new EE_Form_Section_Proper( array(
			'name' => 'form',
			'subsections' => array(
				'input1' => new EE_Select_Input( array( 'foo' => 'Foo', 'bar' => 'Bar', "baz'em" => 'Baz' ) )
			)
		));
		$input = $form->get_input( 'input1' );
		$expected_output = '
<select name="form[input1]" id="form-input1" >
	<option value="foo">Foo</option>
	<option value="bar">Bar</option>
	<option value="baz&#039;em">Baz</option>
</select>';
		$this->assertHTMLEquals( $expected_output, $input->get_html_for_input() );
		//now if we set the default, does it get selected?
		$form->populate_defaults( array(
			'input1' => "baz'em"
		));
		$this->assertEquals( "baz'em", $input->normalized_value() );
		$this->assertEquals( "baz'em", $input->raw_value() );
		$expected_output2 = '
<select name="form[input1]" id="form-input1" >
	<option value="foo">Foo</option>
	<option value="bar">Bar</option>
	<option value="baz&#039;em" selected="selected">Baz</option>
</select>';
		$this->assertHTMLEquals( $expected_output2, $input->get_html_for_input() );

	}
	
	/**
	 * @group html
	 */
	public function test_display_flat_multidimensional_array(){
		$input = new EE_Select_Input( array(
					'code_var_names' => array(
						'foo' => 'Foo',
						'bar' => 'Bar',
						'baz' => 'Baz' ),
					'primates' => array(
						'chimp' => 'Chimp',
						'orangutan' => 'Orangutan',
						'baboon' => 'Baboon'
					)));
		$expected_output = '
<select id="" >
	<optgroup label="code_var_names">
		<option value="foo">Foo</option>
		<option value="bar">Bar</option>
		<option value="baz">Baz</option>
	</optgroup>
	<optgroup label="primates">
		<option value="chimp">Chimp</option>
		<option value="orangutan">Orangutan</option>
		<option value="baboon">Baboon</option>
	</optgroup>
</select>';
		$this->assertHTMLEquals( $expected_output, $input->get_html_for_input() );


	}
}

// End of file EE_Select_Display_Strategy_Test.php