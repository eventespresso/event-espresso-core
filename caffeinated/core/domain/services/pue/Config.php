<?php

namespace EventEspresso\caffeinated\core\domain\services\pue;

use EE_Config;
use EE_Network_Config;

/**
 * Config
 * This contains the various configuration properties for PUE implementation.
 *
 * @package EventEspresso\core\domain\services\pue
 * @author  Darren Ethier
 * @since   4.9.59.p
 * @deprecated 5.0.20.p
 */
class Config
{
    /**
     * @var EE_Network_Config
     */
    private $network_config;

    /**
     * @var EE_Config
     */
    private $ee_config;


    public function __construct(EE_Network_Config $network_config, EE_Config $ee_config)
    {
        $this->network_config = $network_config;
        $this->ee_config      = $ee_config;
    }


    /**
     * Get the site license key for the site.
     */
    public function siteLicenseKey(): string
    {
        return $this->network_config->core->site_license_key;
    }


    public function i18nDomain(): string
    {
        return 'event_espresso';
    }


    public function checkPeriod(): int
    {
        return 24;
    }


    public function optionKey(): string
    {
        return 'ee_site_license_key';
    }


    public function optionsPageSlug(): string
    {
        return 'espresso_general_settings';
    }


    public function hostServerUrl(): string
    {
        return defined('PUE_UPDATES_ENDPOINT')
            ? PUE_UPDATES_ENDPOINT
            : 'https://eventespresso.com';
    }


    public function pluginSlug(): array
    {
        // Note: PUE uses a simple preg_match to determine what type is currently installed based on version number.
        //  So it's important that you use a key for the version type that is unique and not found in another key.
        // For example:
        // $plugin_slug['premium']['p'] = 'some-premium-slug';
        // $plugin_slug['prerelease']['pr'] = 'some-pre-release-slug';
        // The above would not work because "p" is found in both keys for the version type. ( i.e 1.0.p vs 1.0.pr )
        // so doing something like:
        // $plugin_slug['premium']['p'] = 'some-premium-slug';
        // $plugin_slug['prerelease']['b'] = 'some-pre-release-slug';
        // ..WOULD work!
        return [
            'free'       => ['decaf' => 'event-espresso-core-decaf'],
            'premium'    => ['p' => 'event-espresso-core-reg'],
            'prerelease' => ['beta' => 'event-espresso-core-pr'],
        ];
    }


    /**
     * Return whether the site is opted in for UXIP or not.
     *
     * @return bool
     */
    public function isOptedInForUxip(): bool
    {
        return filter_var($this->ee_config->core->ee_ueip_optin, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * Return whether the site has been notified about UXIP or not.
     *
     * @return bool
     */
    public function hasNotifiedForUxip(): bool
    {
        return filter_var($this->ee_config->core->ee_ueip_has_notified, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * Set the site opted in for UXIP.
     */
    public function setHasOptedInForUxip()
    {
        $this->ee_config->core->ee_ueip_optin = true;
        $this->ee_config->update_espresso_config(false, false);
    }


    /**
     * Set the site opted out for UXIP
     */
    public function setHasOptedOutForUxip()
    {
        $this->ee_config->core->ee_ueip_optin = false;
        $this->ee_config->update_espresso_config(false, false);
    }


    public function setHasNotifiedAboutUxip()
    {
        $this->ee_config->core->ee_ueip_has_notified = true;
        $this->ee_config->update_espresso_config(false, false);
    }
}
