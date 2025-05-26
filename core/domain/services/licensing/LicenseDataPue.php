<?php

namespace EventEspresso\core\domain\services\licensing;

use EE_Network_Core_Config;

/**
 * LicenseDataPue
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\domain\services\licensing
 * @author      Brent Christensen
 * @since       5.0.22.p
 */
class LicenseDataPue implements LicenseDataStrategy
{
    private string $license_key = '';

    private string $status;

    protected EE_Network_Core_Config $network_core_config;


    /**
     * @param EE_Network_Core_Config $network_core_config
     */
    public function __construct(EE_Network_Core_Config $network_core_config)
    {
        $this->network_core_config = $network_core_config;
    }


    public function loadLicenseData(): void
    {
        if (empty($this->network_core_config->site_license_key)) {
            $this->status = LicenseStatus::EXPIRED;
            return;
        }
        $this->license_key = $this->network_core_config->site_license_key;
        $verify_fail       = get_option('puvererr_' . basename(EE_PLUGIN_BASENAME), false);
        $this->status      = $verify_fail ? LicenseStatus::EXPIRED : LicenseStatus::ACTIVE;
    }


    public function getLicenseKey(): string
    {
        return $this->license_key;
    }


    public function getLicenseStatus(): string
    {
        return $this->status;
    }


    public function getLicenseExpiry(): string
    {
        return '';
    }
}
