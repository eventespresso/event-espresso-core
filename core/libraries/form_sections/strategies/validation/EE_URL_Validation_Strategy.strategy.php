<?php

use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\validators\URLValidator;
use EventEspresso\PaymentMethods\Manager;

/**
 * Class EE_URL_Validation_Strategy
 *
 * @package     Event Espresso
 * @subpackage  core
 * @author      Mike Nelson
 * @since       4.6
 */
class EE_URL_Validation_Strategy extends EE_Validation_Strategy_Base
{
    /**
     * @var bool whether we should check if the file exists or not
     */
    protected bool $check_file_exists;

    protected URLValidator $url_validator;


    /**
     * @param string|null       $validation_error_message
     * @param bool              $check_file_exists
     * @param URLValidator|null $url_validator
     */
    public function __construct(
        ?string $validation_error_message = '',
        bool $check_file_exists = false,
        ?URLValidator $url_validator = null
    ) {
        $this->check_file_exists = $check_file_exists;
        if (! $url_validator instanceof URLValidator) {
            $url_validator = LoaderFactory::getLoader()->getShared(URLValidator::class);
        }
        $this->url_validator = $url_validator;
        if (! $validation_error_message) {
            $validation_error_message = esc_html__(
                'Please enter a valid URL. Eg https://eventespresso.com',
                'event_espresso'
            );
        }
        parent::__construct($validation_error_message);
    }


    /**
     * just checks the field isn't blank
     *
     * @param $normalized_value
     * @return void
     * @throws EE_Validation_Error
     */
    public function validate($normalized_value)
    {
        if ($normalized_value) {
            if (! $this->url_validator->isValid($normalized_value)) {
                throw new EE_Validation_Error($this->get_validation_error_message(), 'invalid_url');
            }
            if (
                apply_filters(
                    'FHEE__EE_URL_Validation_Strategy__validate__check_remote_file_exists',
                    $this->check_file_exists,
                    $this->_input
                )
            ) {
                if (
                    ! EEH_URL::remote_file_exists(
                        $normalized_value,
                        [
                            'sslverify'           => Manager::verifySSL(),
                            'limit_response_size' => 4095,
                            // we don't really care for a full response, but we do want headers at least.
                            // Let's just ask for a one block
                        ]
                    )
                ) {
                    throw new EE_Validation_Error(
                        esc_html__("That URL seems to be broken. Please enter a valid URL", "event_espresso")
                    );
                }
            }
        }
    }


    public function get_jquery_validation_rule_array(): array
    {
        return ['validUrl' => true, 'messages' => ['validUrl' => $this->get_validation_error_message()]];
    }
}
