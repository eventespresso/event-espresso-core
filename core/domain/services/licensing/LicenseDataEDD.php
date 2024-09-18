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

    private string $status;

    private string $expiry;


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
        if (! isset($license_data->license)) {
            $this->status = LicenseData::LICENSE_EXPIRED;
            $this->expiry = '';
            return;
        }
        $this->status = $license_data->license_key && $license_data->license === LicenseData::LICENSE_VALID
            ? LicenseData::LICENSE_ACTIVE
            : LicenseData::LICENSE_EXPIRED;
        $this->expiry = $license_data->expires ?? '';
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
