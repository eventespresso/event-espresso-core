<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_Number_Input_Display_Strategy_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Number_Input_Display_Strategy_Test extends EE_UnitTestCase{

    /**
     * @group 10586
     */
    public function test_display__no_min_or_max()
    {
        $input = new EE_Integer_Input(array());
        $input->_construct_finalize(null, 'age');
        $output = $input->get_display_strategy()->display();
        $expected = '<input name="age" id="age" type="number"/>';
        $this->assertHTMLEquals($expected,$output);
    }

    /**
     * @group 10586
     */
    public function test_display__with_min_max_required()
    {
        $input = new EE_Integer_Input(
            array(
                'min_value' => 2,
                'max_value' => 5,
                'html_class' => 'funky',
                'required' => true
            ));
        $input->_construct_finalize(null, 'age');
        $output = $input->get_display_strategy()->display();
        $expected = '<input name="age" id="age" class="ee-required funky" required type="number" min="2" max="5"/>';
        $this->assertHTMLEquals($expected,$output);
    }

    /**
     * @group 10586
     */
    public function test_display__for_float()
    {
        $input = new EE_Float_Input(
            array(
                'html_class' => 'funky',
                'required' => true,
                'html_other_attributes' => 'step="any"'
            ));
        $input->_construct_finalize(null, 'age');
        $output = $input->get_display_strategy()->display();
        $expected = '<input name="age" id="age" class="ee-required funky" required step="any" type="number"/>';
        $this->assertHTMLEquals($expected,$output);
    }
}

// End of file EE_Checkbox_Display_Strategy_Test.php