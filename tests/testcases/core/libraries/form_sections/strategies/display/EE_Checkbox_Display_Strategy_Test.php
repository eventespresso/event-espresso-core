<?php

/**
 * EE_Checkbox_Display_Strategy_Test
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 */
class EE_Checkbox_Display_Strategy_Test extends EE_UnitTestCase
{

    /**
     * @since 4.9.62.p
     * @throws EE_Error
     */
    public function test_display_flat_array()
    {
        $form = new EE_Form_Section_Proper(array(
            'name'        => 'form',
            'subsections' => array(
                'input1' => new EE_Checkbox_Multi_Input(array('foo' => 'Foo', 'bar' => 'Bar', "baz'em" => 'Baz')),
            ),
        ));
        $input = $form->get_input('input1');
        // data-question_label="ee_reg_qstn-6-11-lbl"
        $expected_output = '
<label for="form-input1-foo" id="form-input1-foo-lbl" class="ee-checkbox-label-after micro-lbl">
	<input type="checkbox" name="form[input1][]" id="form-input1-foo" class="" style="" value="foo" data-question_label="form-input1-lbl">&nbsp;Foo
</label>
<label for="form-input1-bar" id="form-input1-bar-lbl" class="ee-checkbox-label-after micro-lbl">
	<input type="checkbox" name="form[input1][]" id="form-input1-bar" class="" style="" value="bar" data-question_label="form-input1-lbl">&nbsp;Bar
</label>
<label for="form-input1-bazem" id="form-input1-bazem-lbl" class="ee-checkbox-label-after micro-lbl">
	<input type="checkbox" name="form[input1][]" id="form-input1-bazem" class="" style="" value="baz&#039;em" data-question_label="form-input1-lbl">&nbsp;Baz
</label>';
        $this->assertHTMLEquals($expected_output, $input->get_html_for_input());
        //now if we set the default, does it get selected?
        $form->populate_defaults(array(
            'input1' => array("baz'em", 'bar'),
        ));
        $this->assertEquals(array("baz'em", 'bar'), $input->normalized_value());
        $this->assertEquals(array("baz'em", 'bar'), $input->raw_value());
        $expected_output2 = '
<label for="form-input1-foo" id="form-input1-foo-lbl" class="ee-checkbox-label-after micro-lbl">
	<input type="checkbox" name="form[input1][]" id="form-input1-foo" class="" style="" value="foo" data-question_label="form-input1-lbl">&nbsp;Foo
</label>
<label for="form-input1-bar" id="form-input1-bar-lbl" class="ee-checkbox-label-after micro-lbl">
	<input type="checkbox" name="form[input1][]" id="form-input1-bar" class="" style="" value="bar" checked="checked" data-question_label="form-input1-lbl">&nbsp;Bar
</label>
<label for="form-input1-bazem" id="form-input1-bazem-lbl" class="ee-checkbox-label-after micro-lbl">
	<input type="checkbox" name="form[input1][]" id="form-input1-bazem" class="" style="" value="baz&#039;em" checked="checked" data-question_label="form-input1-lbl">&nbsp;Baz
</label>';
        $this->assertHTMLEquals($expected_output2, $input->get_html_for_input());
    }
}

// End of file tests/testcases/core/libraries/form_sections/strategies/display/EE_Checkbox_Display_Strategy_Test.php