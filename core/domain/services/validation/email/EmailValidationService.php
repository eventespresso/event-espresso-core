<?php

namespace EventEspresso\core\domain\services\validation\email;

use EE_Registration_Config;
use EventEspresso\core\services\loaders\Loader;

/**
 * Class EmailValidator
 * Loads the appropriate Email Validator as set in the Config
 * and then validates the supplied email address
 *
 * @package        Event Espresso
 * @author         Mike Nelson
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
     * @param Loader                 $loader
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
        // pick the correct validator according to the config
        switch ($this->registration_config->email_validation_level) {
            case 'basic':
                $validator = $this->loader->getShared(
                    'EventEspresso\core\domain\services\validation\email\strategies\Basic'
                );
                break;
            case 'i18n':
                $validator = $this->loader->getShared(
                    'EventEspresso\core\domain\services\validation\email\strategies\International'
                );
                break;
            case 'i18n_dns':
                $validator = $this->loader->getShared(
                    'EventEspresso\core\domain\services\validation\email\strategies\InternationalDNS'
                );
                break;
            case 'wp_default':
            default:
                $validator = $this->loader->getShared(
                    'EventEspresso\core\domain\services\validation\email\strategies\WordPress'
                );
                break;
        }
        return $validator->validate($email_address);
    }
}
