<?php

/**
 * EE_Min_Length_Validation_Strategy
 *
 * Validates that the normalized value is at least the specified length
 *
 * @package             Event Espresso
 * @subpackage          Expression package is undefined on line 19, column 19 in Templates/Scripting/PHPClass.php.
 * @author              Mike Nelson
 */
class EE_Min_Length_Validation_Strategy extends EE_Validation_Strategy_Base
{
    protected $_min_length;


    public function __construct($validation_error_message = null, $min_length = 0)
    {
        $this->_min_length = $min_length;
        if ($validation_error_message === null) {
            $validation_error_message = sprintf(
                esc_html__('Input is too short. Minimum number of characters is %1$s', 'event_espresso'),
                $min_length
            );
        }
        parent::__construct($validation_error_message);
    }


    /**
     * @param $normalized_value
     * @throws EE_Validation_Error
     */
    public function validate($normalized_value)
    {
        if (
            $this->_min_length > 0 && $normalized_value && is_string($normalized_value)
            && strlen($normalized_value)
               < $this->_min_length
        ) {
            throw new EE_Validation_Error($this->get_validation_error_message(), 'minlength');
        }
    }


    /**
     * @return array
     */
    public function get_jquery_validation_rule_array(): array
    {
        return [
            'minlength' => $this->_min_length,
            'messages'  => ['minlength' => $this->get_validation_error_message()],
        ];
    }
}
