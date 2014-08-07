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

	public function test_display_flat_array(){
		$input = new EE_Select_Input( array( 'foo' => 'Foo', 'bar' => 'Bar', 'baz' => 'Baz' ) );
		$output = $input->get_html_for_input();
		$expected_output =
'
<select id="" name="" class="" style=""/>
	<option value="foo">Foo</option>
	<option value="bar">Bar</option>
	<option value="baz">Baz</option>
</select>';
		$this->assertEquals( $expected_output, $output );


	}
	public function test_display_flat_multidimensional_array(){
		$input = new EE_Select_Input( array(
					'code_var_names' => array(
						'foo' => 'Foo',
						'bar' => 'Bar',
						'baz' => 'Baz' ),
					'monkey_types' => array(
						'chimp' => 'Chimp',
						'orang' => 'Orangutang',
						'baboob' => 'Baboon'
					)));
		$output = $input->get_html_for_input();
		$expected_output =
'
<select id="" name="" class="" style=""/>
	<optgroup label="code_var_names">
		<option value="foo">Foo</option>
		<option value="bar">Bar</option>
		<option value="baz">Baz</option>
	</optgroup>
	<optgroup label="monkey_types">
		<option value="chimp">Chimp</option>
		<option value="orang">Orangutang</option>
		<option value="baboob">Baboon</option>
	</optgroup>
</select>';
		$this->assertEquals( $expected_output, $output );


	}
}

// End of file EE_Select_Display_Strategy_Test.php