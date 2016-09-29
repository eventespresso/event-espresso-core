<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_Checkbox_Display_Strategy_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Checkbox_Display_Strategy_Test extends EE_UnitTestCase{

	public function test_display_flat_array(){
		$form = new EE_Form_Section_Proper( array(
			'name' => 'form',
			'subsections' => array(
				'input1' => new EE_Checkbox_Multi_Input( array( 'foo' => 'Foo', 'bar' => 'Bar', "baz'em" => 'Baz' ) )
			)
		));
		$input = $form->get_input( 'input1' );
		$expected_output = '
<label for="form-input1-foo" id="form-input1-foo-lbl" class="ee-checkbox-label-after micro-lbl">
	<input type="checkbox" name="form[input1][]" id="form-input1-foo" class="" style="" value="foo" >&nbsp;Foo
</label>
<label for="form-input1-bar" id="form-input1-bar-lbl" class="ee-checkbox-label-after micro-lbl">
	<input type="checkbox" name="form[input1][]" id="form-input1-bar" class="" style="" value="bar" >&nbsp;Bar
</label>
<label for="form-input1-bazem" id="form-input1-bazem-lbl" class="ee-checkbox-label-after micro-lbl">
	<input type="checkbox" name="form[input1][]" id="form-input1-bazem" class="" style="" value="baz&#039;em" >&nbsp;Baz
</label>';
		$this->assertHTMLEquals( $expected_output, $input->get_html_for_input() );
		//now if we set the default, does it get selected?
		$form->populate_defaults( array(
			'input1' => array( "baz'em", 'bar' )
		));
		$this->assertEquals( array( "baz'em", 'bar' ), $input->normalized_value() );
		$this->assertEquals( array( "baz'em", 'bar' ), $input->raw_value() );
		$expected_output2 = '
<label for="form-input1-foo" id="form-input1-foo-lbl" class="ee-checkbox-label-after micro-lbl">
	<input type="checkbox" name="form[input1][]" id="form-input1-foo" class="" style="" value="foo" >&nbsp;Foo
</label>
<label for="form-input1-bar" id="form-input1-bar-lbl" class="ee-checkbox-label-after micro-lbl">
	<input type="checkbox" name="form[input1][]" id="form-input1-bar" class="" style="" value="bar" checked="checked" >&nbsp;Bar
</label>
<label for="form-input1-bazem" id="form-input1-bazem-lbl" class="ee-checkbox-label-after micro-lbl">
	<input type="checkbox" name="form[input1][]" id="form-input1-bazem" class="" style="" value="baz&#039;em" checked="checked" >&nbsp;Baz
</label>';
		$this->assertHTMLEquals( $expected_output2, $input->get_html_for_input() );
	}
}

// End of file EE_Checkbox_Display_Strategy_Test.php