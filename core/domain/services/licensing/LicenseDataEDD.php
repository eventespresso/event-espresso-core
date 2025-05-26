<?php

namespace EventEspresso\core\domain\services\licensing;

use EventEspresso\core\domain\Domain;
use EventEspresso\core\services\licensing\LicenseKeyData;

/**
 * LicenseDataEDD
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\domain\services\licensing
 * @author      Brent Christensen
 * @since       5.0.22.p
 */
class LicenseDataEDD implements LicenseDataStrategy
{
    private LicenseKeyData $license_key_data;

    private string $license_key = '';

    private string $status = LicenseStatus::EXPIRED;

    private string $expiry = '';


    /**
     * @param LicenseKeyData $license_key_data
     */
    public function __construct(LicenseKeyData $license_key_data)
    {
        $this->license_key_data = $license_key_data;
    }


    public function loadLicenseData()
    {
        $license_data = $this->license_key_data->getLicenseDataForPlugin(Domain::pluginSlug());
        if (! isset($license_data->license) || ! isset($license_data->license_key)) {
            $this->status = LicenseStatus::EXPIRED;
            return;
        }
        $this->license_key = $license_data->license_key;
        $this->status      = $license_data->license_key && $license_data->license === LicenseStatus::VALID
            ? LicenseStatus::ACTIVE
            : LicenseStatus::EXPIRED;
        $this->expiry      = $license_data->expires ?? '';
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
        return $this->expiry;
    }
}
