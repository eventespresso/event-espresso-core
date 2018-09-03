<?php

use EventEspresso\core\services\loaders\CoreLoader;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\validators\URLValidator;

/**
 * Class EE_URL_Validation_Strategy
 *
 * @package             Event Espresso
 * @subpackage  core
 * @author              Mike Nelson
 * @since               4.6
 *
 */
class EE_URL_Validation_Strategy extends EE_Validation_Strategy_Base
{

    /**
     * @var @boolean whether we should check if the file exists or not
     */
    protected $check_file_exists;

    /**
     * @var URLValidator
     */
    protected $url_validator;

    /**
     * @param null $validation_error_message
     * @param boolean $check_file_exists
     * @param URLValidator $url_validator
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    public function __construct(
        $validation_error_message = null,
        $check_file_exists = false,
        URLValidator $url_validator = null
    ) {
        if (! $url_validator instanceof URLValidator) {
            $url_validator = LoaderFactory::getLoader()->getShared('EventEspresso\core\services\validators\URLValidator');
        }
        $this->url_validator = $url_validator;
        if (! $validation_error_message) {
            $validation_error_message = __("Please enter a valid URL. Eg https://eventespresso.com", "event_espresso");
        }
        $this->check_file_exists = $check_file_exists;
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
        if ($normalized_value) {
            if (! $this->url_validator->isValid($normalized_value)) {
                throw new EE_Validation_Error($this->get_validation_error_message(), 'invalid_url');
            } elseif (apply_filters('FHEE__EE_URL_Validation_Strategy__validate__check_remote_file_exists', $this->check_file_exists, $this->_input)) {
                if (! EEH_URL::remote_file_exists(
                    $normalized_value,
                    array(
                            'sslverify' => false,
                            'limit_response_size' => 4095,// we don't really care for a full response, but we do want headers at least. Lets just ask for a one block
                        )
                )) {
                    throw new EE_Validation_Error(sprintf(__("That URL seems to be broken. Please enter a valid URL", "event_espresso")));
                }
            }
        }
    }



    /**
     * @return array
     */
    public function get_jquery_validation_rule_array()
    {
        return array( 'validUrl'=>true, 'messages' => array( 'validUrl' => $this->get_validation_error_message() ) );
    }
}
