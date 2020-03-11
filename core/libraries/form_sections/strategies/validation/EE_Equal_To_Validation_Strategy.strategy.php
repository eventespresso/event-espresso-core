<?php
use EventEspresso\core\domain\services\factories\EmailAddressFactory;
use EventEspresso\core\domain\services\validation\email\EmailValidationException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

/**
 * Class EE_Equal_To_Validation_Strategy
 *
 * @package               Event Espresso
 * @subpackage            core
 * @since                 $VID:$
 * @author                Rafael Goulart
 */
class EE_Equal_To_Validation_Strategy extends EE_Text_Validation_Strategy
{

    protected $_compare_to = null;


    /**
     * @param string               $validation_error_message
     */
    public function __construct($validation_error_message = '', $compare_to)
    {
        if (! $validation_error_message) {
            $validation_error_message = esc_html__('Fields do not match.', 'event_espresso');
        }
        parent::__construct($validation_error_message);
        $this->_compare_to = $compare_to;
    }



    /**
     * just checks the field isn't blank
     *
     * @param $normalized_value
     * @return bool
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Validation_Error
     */
    public function validate($normalized_value)
    {
        // No need to be validated
        return true;
    }



    /**
     * @return array
     */
    public function get_jquery_validation_rule_array()
    {
        return array('equalTo' => $this->_compare_to, 'messages' => array('equalTo' => $this->get_validation_error_message()));
    }
}
