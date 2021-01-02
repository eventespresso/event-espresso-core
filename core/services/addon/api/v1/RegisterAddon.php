<?php

namespace EventEspresso\core\services\addon\api\v1;

use EE_Error;
use EE_Register_Addon;
use EventEspresso\core\services\addon\api\v1\AddonApi as AddonApiV1;
use ReflectionException;

class RegisterAddon
{
    /**
     * @param AddonApiV1 $addon
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function register(AddonApiV1 $addon)
    {
        EE_Register_Addon::register(
            $addon->fqcn(),
            [
                'version'               => $addon->version(),
                'plugin_slug'           => $addon->slug(),
                'min_core_version'      => $addon->minCoreVersion(),
                'min_wp_version'        => $addon->minWpVersion(),
                'main_file_path'        => $addon->mainFile(),
                'dms_paths'             => [$addon->dataMigrationScripts()],
                'class_paths'           => [$addon->entityClasses()],
                'model_paths'           => [$addon->entityModels()],
                'class_extension_paths' => [$addon->entityClassExtensions()],
                'model_extension_paths' => [$addon->entityModelExtensions()],
            ]
        );
    }

}