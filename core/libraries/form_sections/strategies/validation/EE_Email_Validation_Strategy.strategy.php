<?php

if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
use EventEspresso\core\domain\services\validation\EmailValidationException;
use EventEspresso\core\services\loaders\Loader;
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
     * @param null $validation_error_message
     */
    public function __construct($validation_error_message = null)
    {
        if (! $validation_error_message) {
            $validation_error_message = __("Please enter a valid email address.", "event_espresso");
        }
        parent::__construct($validation_error_message);
    }



    /**
     * just checks the field isn't blank
     *
     * @param $normalized_value
     * @return bool
     * @throws \EE_Validation_Error
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
     * @throws \EE_Validation_Error
     */
    private function _validate_email($email)
    {
        $loader = new Loader();
        $validation_service = $loader->getShared(
            'EventEspresso\core\domain\services\validation\EmailValidationServiceInterface',
            array(
                EE_Config::instance()->registration->email_validation_level
            )
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
