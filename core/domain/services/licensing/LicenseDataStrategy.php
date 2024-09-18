<?php

namespace EventEspresso\core\domain\services\licensing;

interface LicenseDataStrategy
{
    public function loadLicenseData();


    public function getLicenseStatus(): string;


    public function getLicenseExpiry(): string;
}
