<?php

namespace EventEspresso\core\services\licensing;

use EventEspresso\core\services\database\WordPressOption;
use stdClass;

class LicenseKeyData extends WordPressOption
{
    const OPTION_NAME = 'event-espresso-license-keys';


    /**
     * SessionLifespanOption constructor.
     */
    public function __construct()
    {
        parent::__construct(LicenseKeyData::OPTION_NAME, [], true);
    }


    public function getLicense(string $plugin): stdCLass
    {
        $licenses = $this->loadOption();
        $license_data = $licenses[ $plugin ] ?? ['success' => false, 'error' => true];
        return (object) $license_data;
    }



    public function getAllLicenses(): array
    {
        return $this->loadOption();
    }


    public function updateLicense(stdCLass $license_data, string $plugin, bool $force_update = false): int
    {
        $licenses = $this->loadOption();
        // convert objects to array and merge new data with old
        $licenses[ $plugin ] = (array) $license_data;
        // then sort by key and convert back to stdCLass
        ksort($licenses[ $plugin ]);
        $licenses[ $plugin ] = (object) $licenses[ $plugin ];
        return $this->updateOption($licenses, $force_update);
    }


    public function removeLicense(string $plugin): int
    {
        $licenses = $this->loadOption();
        unset($licenses[ $plugin ]);
        return $this->updateOption($licenses);
    }
}
