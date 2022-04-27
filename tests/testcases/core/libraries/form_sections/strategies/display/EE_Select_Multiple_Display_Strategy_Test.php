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
class EE_Select_Multiple_Display_Strategy_Test extends EE_UnitTestCase{

	/**
	 * @group html
	 */
	public function test_display_flat_array(){
		$form = new EE_Form_Section_Proper( array(
			'name' => 'form',
			'subsections' => array(
				'input1' => new EE_Select_Multiple_Input( array( 'foo' => 'Foo', 'bar' => 'Bar', "baz'em" => 'Baz' ) )
			)
		));
		$input = $form->get_input( 'input1' );
		$expected_output = '
<select multiple id="form-input1" name="form[input1][]" class="" style="" >
	<option value="foo">Foo</option>
	<option value="bar">Bar</option>
	<option value="baz&#039;em">Baz</option>
</select>';
		$this->assertHTMLEquals( $expected_output, $input->get_html_for_input() );
		//now if we set the default, does it get selected?
		$form->populate_defaults( array(
			'input1' => array( "baz'em", 'bar' )
		));
		$this->assertEquals( array( "baz'em", 'bar' ), $input->normalized_value() );
		$this->assertEquals( array( "baz'em", 'bar' ), $input->raw_value() );
		$expected_output2 = '
<select multiple id="form-input1" name="form[input1][]" class="" style="" >
	<option value="foo">Foo</option>
	<option value="bar" selected>Bar</option>
	<option value="baz&#039;em" selected>Baz</option>
</select>';
		$this->assertHTMLEquals( $expected_output2, $input->get_html_for_input() );

	}
}

// End of file EE_Select_Display_Strategy_Test.php