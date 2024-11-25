<?php

namespace EventEspresso\core\services\addon\api\v1;

use EE_Addon;
use EE_Error;
use EE_Register_Addon;
use EventEspresso\core\services\addon\api\v1\AddonApi as AddonApiV1;

class RegisterAddon extends EE_Addon
{
    /**
     * @param AddonApiV1 $addon
     * @throws EE_Error
     */
    public function register(AddonApiV1 $addon): void
    {
        EE_Register_Addon::register(
            $addon->fqcn(),
            [
                'class_name'            => $addon->fqcn(),
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
                'license' => [
                    'beta'             => false,
                    'main_file_path'   => $addon->mainFile(),
                    'min_core_version' => $addon->minCoreVersion(),
                    'plugin_id'        => $addon->ID(),
                    'plugin_name'      => $addon->displayName(),
                    'plugin_slug'      => $addon->slug(),
                    'version'          => $addon->version(),
                    'wp_override'      => false,
                ],
                // if plugin update engine is being used for auto-updates. not needed if PUE is not being used.
                'pue_options'      => [
                    'pue_plugin_slug' => $addon->slug(),
                    'plugin_basename' => $addon->domain()->pluginBasename(),
                    'checkPeriod'     => '24',
                    'use_wp_update'   => false,
                ]
            ]
        );
    }
}
