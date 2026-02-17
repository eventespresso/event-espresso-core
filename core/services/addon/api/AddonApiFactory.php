<?php

namespace EventEspresso\core\services\addon\api;

use EventEspresso\core\services\addon\AddonCollection;
use EventEspresso\core\services\addon\api\v1\AddonApi;
use EventEspresso\core\services\loaders\LoaderFactory;

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
        $addon->setVersion(VersionParser::getAddonVersion($main_file));
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
        // remove mainfile name from "folder/mainfile" string
        $folder_name = substr($plugin_basename, 0, strpos($plugin_basename, '/'));
        // remove version strings from end of folder name in case it was appended (by GitHub)
        $slug = preg_replace('/-+[\d.]+$/', '', $folder_name);
        return $slug ?? $folder_name;
    }


    public static function getAddonCollection(): AddonCollection
    {
        return LoaderFactory::getShared(AddonCollection::class);
    }
}
