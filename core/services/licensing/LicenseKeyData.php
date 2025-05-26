<?php

namespace EventEspresso\core\services\licensing;

use EventEspresso\core\services\database\WordPressOption;
use stdClass;

/**
 * LicenseKeyData
 * Handles the storage and retrieval of license data for EE core and add-ons.
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\services\licensing
 * @author      Brent Christensen
 * @since       5.0.22.p
 */
class LicenseKeyData extends WordPressOption
{
    /**
     * The name of the WordPress option where license data is stored.
     */
    const OPTION_NAME = 'event-espresso-license-keys';

    private static array $no_license = [
        'item_id'     => false,
        'item_name'   => '',
        'license'     => 'none',
        'license_key' => '',
        'success'     => false,
    ];


    public function __construct()
    {
        parent::__construct(LicenseKeyData::OPTION_NAME, [], true);
    }


    /**
     * Retrieves all stored license data for all plugins.
     *
     * @return array An associative array of all license data, keyed by plugin identifier.
     */
    public function getAllLicenses(): array
    {
        return $this->loadOption();
    }


    /**
     * Retrieves the license data for a specific plugin.
     *
     * @param string $plugin The plugin identifier.
     * @return stdClass An object containing the license data for the specified plugin.
     *                       Returns a default structure if no data exists.
     */
    public function getLicenseDataForPlugin(string $plugin): stdCLass
    {
        $licenses     = $this->loadOption();
        $license_data = $licenses[ $plugin ] ?? LicenseKeyData::$no_license;
        return (object) $license_data;
    }


    /**
     * Updates or adds the license data for a specific plugin.
     *
     * @param stdClass $license_data The new license data to store.
     * @param string   $plugin       The plugin identifier.
     * @param bool     $force_update Whether to force the update operation.
     * @return int The result of the update operation.
     */
    public function updateLicenseDataForPlugin(stdCLass $license_data, string $plugin, bool $force_update = false): int
    {
        if (! isset($license_data->success) || (bool) $license_data->success !== true) {
            return WordPressOption::UPDATE_NONE;
        }
        $licenses = $this->loadOption();
        // convert objects to array and merge new data with old
        $licenses[ $plugin ] = (array) $license_data;
        // then sort by key and convert back to stdCLass
        ksort($licenses[ $plugin ]);
        $licenses[ $plugin ] = (object) $licenses[ $plugin ];
        return $this->updateOption($licenses, $force_update);
    }


    /**
     * Removes the license data for a specific plugin.
     *
     * @param string $plugin The plugin identifier.
     * @return int The result of the remove operation.
     */
    public function removeLicenseDataForPlugin(string $plugin): int
    {
        $licenses = $this->loadOption();
        unset($licenses[ $plugin ]);
        return $this->updateOption($licenses);
    }
}
