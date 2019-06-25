<?php
/**
 * Class EE_Credit_Card_Validation_Strategy
 *
 * Description
 *
 * @package             Event Espresso
 * @subpackage  core
 * @author              Mike Nelson
 * @since               4.6
 *
 */
class EE_Credit_Card_Validation_Strategy extends EE_Text_Validation_Strategy
{

    /**
     * @param null $validation_error_message
     */
    public function __construct($validation_error_message = null)
    {
        if (! $validation_error_message) {
            $validation_error_message = __("Please enter a valid credit card number", "event_espresso");
        }
        parent::__construct(
            $validation_error_message,
            // @codingStandardsIgnoreStart
            '~^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|2[2-7][0-9]{14}|6011[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}|3[47][0-9]{13})$~'
            // @codingStandardsIgnoreEnd
        );
    }
}
