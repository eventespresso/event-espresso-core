<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_Submit_Input_Display_Strategy_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Submit_Input_Display_Strategy_Test extends EE_UnitTestCase{


    /**
     * @group 11107
     */
    public function test_display__all_defaults()
    {
        $input = new EE_Submit_Input();
        $input->_construct_finalize(null, 'search');
        $output = $input->get_display_strategy()->display();
        $expected = '<input name="search" id="search-submit" class=" button button--primary" type="submit" value="Submit"/>';
        $this->assertHTMLEquals($expected,$output);
    }

    /**
     * Verifies that even if the form is submitted WITHOUT pressing the submit button,
     * when we show the form we will still show the submit input with the same value
     * @group 11107
     */
    public function test_display__dont_change_value()
    {
        $submit_input = new EE_Submit_Input(
            array(
                'default' => 'Apply',
            )
        );
        $form = new EE_Form_Section_Proper(array(
            'name' => 'myform',
            'subsections' => array(
                'discount_code' => new EE_Text_Input(),
                'apply' => $submit_input
            )
        ));
        $form->receive_form_submission(
            array(
                'myform' => array(
                    'discount_code' => '',
                    //missing 'apply' on purrpose
                )
            )
        );
        $this->assertEquals(
            '',
            $submit_input->raw_value()
        );
        $this->assertEquals(
            '',
            $submit_input->normalized_value()
        );
        $output = $submit_input->get_display_strategy()->display();
        $expected = '<input name="myform[apply]" id="myform-apply-submit" class=" button button--primary" type="submit" value="Apply"/>';
        $this->assertHTMLEquals($expected,$output);
    }
}

// End of file EE_Checkbox_Display_Strategy_Test.php