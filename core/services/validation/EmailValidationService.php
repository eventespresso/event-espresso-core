<?php

namespace EventEspresso\core\services\validation;

use EE_Registration_Config;
use EventEspresso\core\domain\services\validation\EmailValidationException;
use EventEspresso\core\domain\services\validation\EmailValidatorInterface;
use EventEspresso\core\services\loaders\Loader;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');



/**
 * Class EmailValidator
 * Loads the appropriate Email Validator as set in the Config
 * and then validates the supplied email address
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          $VID:$
 */
class EmailValidationService implements EmailValidatorInterface
{

    /**
     * @var EE_Registration_Config $registration_config
     */
    protected $registration_config;

    /**
     * @var Loader $loader
     */
    protected $loader;



    /**
     * EmailValidationService constructor.
     * Accepts an \EE_Config as an argument.
     *
     * @param EE_Registration_Config $config
     * @param Loader    $loader
     */
    public function __construct(EE_Registration_Config $config, Loader $loader)
    {
        $this->registration_config = $config;
        $this->loader = $loader;
    }



    /**
     * Validates the email address. If it's invalid, an EmailValidationException
     * is thrown that describes why its invalid.
     *
     * @param string $email_address
     * @return boolean
     * @throws EmailValidationException
     */
    public function validate($email_address)
    {
        //pick the correct validator according to the config
        switch ($this->registration_config->email_validation_level) {
            case 'basic':
                $validator = $this->loader->getShared(
                    'EventEspresso\core\services\validation\strategies\Basic'
                );
                break;
            case 'i18n':
                $validator = $this->loader->getShared(
                    'EventEspresso\core\services\validation\strategies\International'
                ) ;
                break;
            case 'i18n_dns':
                $validator = $this->loader->getShared(
                    'EventEspresso\core\services\validation\strategies\InternationalDNS'
                ) ;
                break;
            case 'wp_default':
            default:
                $validator = $this->loader->getShared(
                    'EventEspresso\core\services\validation\strategies\WordPress'
                ) ;
                break;
        }
        return $validator->validate($email_address);
    }


}
// End of file EmailValidator.php
// Location: core\services\validation/EmailValidator.php
