<?php

namespace EventEspresso\core\domain\services\licensing;

use EventEspresso\core\domain\Domain;
use EventEspresso\core\services\loaders\LoaderFactory;

class LicenseData
{
    private Domain $domain;

    private LicenseDataStrategy $license_data;


    /**
     * @param Domain       $domain
     */
    public function __construct(Domain $domain)
    {
        $this->domain       = $domain;
        $this->license_data = LoaderFactory::getShared(LicenseDataEDD::class);
        $this->license_data->loadLicenseData();
    }


    /**
     * @return bool
     * @since 5.0.22.p
     */
    protected function isDecaf(): bool
    {
        return ! $this->domain->isDecaf();
    }


    public function licenseKey(): string
    {
        return $this->license_data->getLicenseKey();
    }


    public function licenseStatus(): string
    {
        return ! $this->domain->isDecaf() ? $this->license_data->getLicenseStatus() : LicenseStatus::DECAF;
    }


    public function licenseExpiry(): string
    {
        return ! $this->isDecaf() ? $this->license_data->getLicenseExpiry() : '';
    }
}
