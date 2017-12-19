<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_Button_Input_Display_Strategy_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Button_Input_Display_Strategy_Test extends EE_UnitTestCase{


    /**
     * @group 11107
     */
    public function test_display__all_defaults()
    {
        $button_content =  '<img src="hilarious-picture-of-brent-on-a-skateboard">Brent On skateboard';
        $input = new EE_Button_Input(
            array(
                'button_content' => $button_content,
                'default' => 'brent-skateboard'
            )
        );
        $input->_construct_finalize(null, 'brent-on-skateboard');
        $output = $input->get_display_strategy()->display();
        $expected = '<button name="brent-on-skateboard" id="brent-on-skateboard" value="brent-skateboard">' . $button_content . '</button>';
        $this->assertHTMLEquals($expected,$output);
    }
}

// End of file EE_Button_Input_Display_Strategy_Test.php