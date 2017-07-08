<?php

use EventEspresso\core\domain\services\validation\EmailValidationException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\loaders\LoaderInterface;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');

/**
 * Class EE_Email_Validation_Strategy
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Mike Nelson
 * @since                 4.6
 */
class EE_Email_Validation_Strategy extends EE_Text_Validation_Strategy
{

    /**
     * @var LoaderInterface $loader
     */
    private static $loader;



    /**
     * @param string               $validation_error_message
     * @param LoaderInterface|null $loader
     */
    public function __construct($validation_error_message = '', LoaderInterface $loader = null)
    {
        EE_Email_Validation_Strategy::$loader = $loader;
        if (! $validation_error_message) {
            $validation_error_message = esc_html__('Please enter a valid email address.', 'event_espresso');
        }
        parent::__construct($validation_error_message);
    }



    /**
     * @return LoaderInterface
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     */
    public function loader()
    {
        if (! EE_Email_Validation_Strategy::$loader instanceof LoaderInterface) {
            EE_Email_Validation_Strategy::$loader = LoaderFactory::getLoader();
        }
        return EE_Email_Validation_Strategy::$loader;
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
        if ($normalized_value && ! $this->_validate_email($normalized_value)) {
            throw new EE_Validation_Error($this->get_validation_error_message(), 'required');
        }
        return true;
    }



    /**
     * @return array
     */
    public function get_jquery_validation_rule_array()
    {
        return array('email' => true, 'messages' => array('email' => $this->get_validation_error_message()));
    }



    /**
     * Validate an email address.
     * Provide email address (raw input)
     *
     * @param $email
     * @return bool of whether the email is valid or not
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Validation_Error
     */
    private function _validate_email($email)
    {
        $validation_service = $this->loader()->getShared(
            'EventEspresso\core\domain\services\validation\EmailValidatorInterface'
        );
        try {
            $validation_service->validate($email);
        } catch (EmailValidationException $e) {
            throw new EE_Validation_Error(
                $e->getMessage(),
                'invalid_email',
                $this->_input,
                $e
            );
        }
        return true;
    }
}
