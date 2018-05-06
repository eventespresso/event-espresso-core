<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

/**
 * Class EE_Invisible_Recaptcha_Display_Strategy
 * generates HTML for the Google Invisible reCAPTCHA challenge
 *
 * @package EventEspresso\core\libraries\form_sections\strategies\display
 * @author  Brent Christensen
 * @since   4.9.59.p
 */
class EE_Invisible_Recaptcha_Display_Strategy extends EE_Display_Strategy_Base
{

    /**
     * @return EE_Form_Input_Base|EE_Invisible_Recaptcha_Input
     */
    public function input()
    {
        return $this->_input;
    }


    /**
     * returns HTML and javascript related to the displaying of this input
     *
     * @return string
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws InvalidArgumentException
     */
    public function display()
    {
        wp_enqueue_script(EE_Invisible_Recaptcha_Input::SCRIPT_HANDLE_GOOGLE_INVISIBLE_RECAPTCHA);
        return <<<EOD
    <div id="g-recaptcha-{$this->input()->recaptchaId()}"
        class="g-recaptcha"
        data-sitekey="{$this->input()->siteKey()}"
        data-submit_button_id="{$this->input()->submitButtonId()}"
        data-callback="espressoLoadRecaptcha"
        data-size="invisible"
        data-badge="{$this->input()->badge()}" 
        >
    </div>
EOD;
    }
}
