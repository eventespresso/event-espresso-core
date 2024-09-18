<?php

namespace EventEspresso\core\domain\services\licensing;

use EventEspresso\core\domain\Domain;
use EventEspresso\core\domain\services\capabilities\FeatureFlag;
use EventEspresso\core\domain\services\capabilities\FeatureFlags;
use EventEspresso\core\services\loaders\LoaderFactory;

class LicenseData
{
    public const  LICENSE_ACTIVE  = 'active';

    public const  LICENSE_DECAF   = 'decaf';

    public const  LICENSE_EXPIRED = 'expired';

    public const  LICENSE_VALID   = 'valid';


    private Domain $domain;

    private FeatureFlags $feature;
    private LicenseDataStrategy $license_data;


    /**
     * @param Domain $domain
     * @param FeatureFlags $feature
     */
    public function __construct(Domain $domain, FeatureFlags $feature)
    {
        $this->domain       = $domain;
        $this->feature      = $feature;
        $this->license_data = $this->feature->allowed(FeatureFlag::USE_EDD_PLUGIN_LICENSING)
            ? LoaderFactory::getShared(LicenseDataEDD::class)
            : LoaderFactory::getShared(LicenseDataPue::class);
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


    public function licenseStatus(): string
    {
        return ! $this->domain->isDecaf() ? $this->license_data->getLicenseStatus() :  LicenseData::LICENSE_DECAF;
    }


    public function licenseExpiry(): string
    {
        return ! $this->isDecaf() ? $this->license_data->getLicenseExpiry() : '';
    }
}
