<?php

namespace EventEspresso\core\services\addon\api;

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidFilePathException;
use EventEspresso\core\services\addon\AddonCollection;
use EventEspresso\core\services\addon\api\v1\AddonApi;
use EventEspresso\core\services\loaders\LoaderFactory;
use RuntimeException;

/**
 * Class AddonApiFactory
 * encapsulates the complex creation of AddonApi objects
 *
 * @package EventEspresso\core\services\addon\api
 * @since 5.0.30.p
 */
class AddonApiFactory
{
    public static function addonApiV1(
        int $ID,
        string $main_file,
        string $name,
        string $display_name,
        string $namespace,
        string $min_core_version
    ): AddonApi {
        $addon_collection = AddonApiFactory::getAddonCollection();
        $slug = AddonApiFactory::getSlugFromMainfile($main_file);
        if ($addon_collection->hasAddon($slug)) {
            return $addon_collection->getAddon($slug);
        }
        $addon = AddonApiFactory::createAddon();
        $addon->setID($ID);
        $addon->setSlug($slug);
        $addon->setName($name);
        $addon->setDisplayName($display_name);
        $addon->setMainFile($main_file);
        $addon->setVersion(AddonApiFactory::getVersionFromMainfile($main_file));
        $addon->setMinCoreVersion($min_core_version);
        $addon->setNamespace($namespace);
        $addon_collection->addAddon($addon);
        return $addon;
    }

    private static function createAddon(): AddonApi
    {
        return LoaderFactory::getNew(AddonApi::class);
    }

    private static function getSlugFromMainfile(string $main_file): string
    {
        $plugin_basename = plugin_basename($main_file);
        return substr($plugin_basename, 0, strpos($plugin_basename, '/'));
    }

    private static function getVersionFromMainfile(string $main_file): string
    {
        $version_file = dirname($main_file) . '/.VERSION';
        if (! is_readable($version_file)) {
            throw new InvalidFilePathException($version_file);
        }
        $file_handle = fopen($version_file, 'r');
        if ($file_handle === false) {
            throw new InvalidDataTypeException(
                '$file_handle',
                false,
                esc_html__('file pointer resource', 'event_espresso')
            );
        }
        $version = fgets($file_handle);
        if ($version === false) {
            throw new InvalidDataTypeException(
                '$version',
                false,
                esc_html__('add-on version', 'event_espresso')
            );
        }
        if (! fclose($file_handle)) {
            throw new RuntimeException(
                esc_html__('Failed to close file handle', 'event_espresso')
            );
        }
        return $version;
    }


    public static function getAddonCollection(): AddonCollection
    {
        return LoaderFactory::getShared(AddonCollection::class);
    }
}
