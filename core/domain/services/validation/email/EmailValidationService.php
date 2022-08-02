<?php

namespace EventEspresso\core\domain\services\validation\email;

use EE_Registration_Config;
use EventEspresso\core\domain\services\validation\email\strategies\Basic;
use EventEspresso\core\domain\services\validation\email\strategies\International;
use EventEspresso\core\domain\services\validation\email\strategies\InternationalDNS;
use EventEspresso\core\domain\services\validation\email\strategies\WordPress;
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
    public const VALIDATION_LEVEL_BASIC      = 'basic';

    public const VALIDATION_LEVEL_I18N       = 'i18n';

    public const VALIDATION_LEVEL_I18N_DNS   = 'i18n_dns';

    public const VALIDATION_LEVEL_WP_DEFAULT = 'wp_default';


    /**
     * @var EE_Registration_Config
     */
    protected $registration_config;

    /**
     * @var Loader
     */
    protected $loader;

    /**
     * @var Basic
     */
    private $validator_basic;

    /**
     * @var International
     */
    private $validator_i18n;

    /**
     * @var InternationalDNS
     */
    private $validator_i18n_dns;

    /**
     * @var WordPress
     */
    private $validator_wordpress;



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
     * @param string|null $email_address
     * @return boolean
     */
    public function validate(?string $email_address): bool
    {
        // pick the correct validator according to the config
        switch ($this->registration_config->email_validation_level) {
            case EmailValidationService::VALIDATION_LEVEL_BASIC:
                return $this->basicValidator()->validate($email_address);
            case EmailValidationService::VALIDATION_LEVEL_I18N:
                return $this->i18nValidator()->validate($email_address);
            case EmailValidationService::VALIDATION_LEVEL_I18N_DNS:
                return $this->i18nDnsValidator()->validate($email_address);
            case EmailValidationService::VALIDATION_LEVEL_WP_DEFAULT:
            default:
                return $this->wordpressValidator()->validate($email_address);
        }
    }


    /**
     * @return Basic
     */
    public function basicValidator(): Basic
    {
        if (! $this->validator_basic instanceof Basic) {
            $this->validator_basic = $this->loader->getShared(
                'EventEspresso\core\domain\services\validation\email\strategies\Basic'
            );
        }
        return $this->validator_basic;
    }


    /**
     * @return International
     */
    public function i18nValidator(): International
    {
        if (! $this->validator_i18n instanceof Basic) {
            $this->validator_i18n = $this->loader->getShared(
                'EventEspresso\core\domain\services\validation\email\strategies\International'
            );
        }
        return $this->validator_i18n;
    }


    /**
     * @return InternationalDNS
     */
    public function i18nDnsValidator(): InternationalDNS
    {
        if (! $this->validator_i18n_dns instanceof Basic) {
            $this->validator_i18n_dns = $this->loader->getShared(
                'EventEspresso\core\domain\services\validation\email\strategies\InternationalDNS'
            );
        }
        return $this->validator_i18n_dns;
    }


    /**
     * @return WordPress
     */
    public function wordpressValidator(): WordPress
    {
        if (! $this->validator_wordpress instanceof Basic) {
            $this->validator_wordpress = $this->loader->getShared(
                'EventEspresso\core\domain\services\validation\email\strategies\WordPress'
            );
        }
        return $this->validator_wordpress;
    }
}
