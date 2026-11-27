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


    public function loadOption(): array
    {
        return (array) get_option($this->getOptionName(), []);
    }


    /**
     * Retrieves the license data for a specific plugin.
     *
     * @param string $plugin The plugin identifier.
     * @return stdClass An object containing the license data for the specified plugin.
     *                       Returns a default structure if no data exists.
     */
    public function getLicenseDataForPlugin(string $plugin): stdClass
    {
        $licenses     = $this->loadOption();
        $license_data = $licenses[ $plugin ] ?? LicenseKeyData::$no_license;
        return (object) $license_data;
    }


    /**
     * Retrieves the license data the main site of a multisite network stores, keyed by plugin identifier.
     *
     * @since 5.0.62
     */
    public function mainSiteLicenses(): array
    {
        return (array) get_blog_option(get_main_site_id(), LicenseKeyData::OPTION_NAME, []);
    }


    /**
     * Updates or adds the license data for a specific plugin.
     *
     * @param stdClass $license_data The new license data to store.
     * @param string   $plugin       The plugin identifier.
     * @param bool     $force_update Whether to force the update operation.
     * @return int The result of the update operation.
     */
    public function updateLicenseDataForPlugin(stdClass $license_data, string $plugin, bool $force_update = false): int
    {
        // don't save failed update attempts unless we're FORCING it
        if (
            ! $force_update
            && ! (
                isset($license_data->success)
                && (bool) $license_data->success === true
            )
        ) {
            return WordPressOption::UPDATE_NONE;
        }
        $licenses = $this->loadOption();
        // convert objects to array and merge new data with old
        $licenses[ $plugin ] = (array) $license_data;
        // then sort by key and convert back to stdClass
        ksort($licenses[ $plugin ]);
        $licenses[ $plugin ] = (object) $licenses[ $plugin ];
        return $this->saveLicenses($licenses);
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
        if (! isset($licenses[ $plugin ])) {
            return WordPressOption::UPDATE_NONE;
        }
        unset($licenses[ $plugin ]);
        return $this->saveLicenses($licenses);
    }


    private function saveLicenses(array $licenses): int
    {
        if (update_option($this->getOptionName(), $licenses, true)) {
            return WordPressOption::UPDATE_SUCCESS;
        }
        // WordPress returns false for both unchanged data and a failed write.
        return maybe_serialize($this->loadOption()) === maybe_serialize($licenses)
            ? WordPressOption::UPDATE_NONE
            : WordPressOption::UPDATE_ERROR;
    }
}
