<?php

namespace EventEspresso\core\services\modules;

use EE_Error;
use EE_Registry;
use EventEspresso\core\services\container\RegistryContainer;

class LegacyModulesManager
{
    public RegistryContainer $modules;

    public function __construct()
    {
        $this->modules = EE_Registry::instance()->modules;
    }


    public function setHooks()
    {
        //  register shortcodes and modules
        add_action(
            'AHEE__EE_System__register_shortcodes_modules_and_widgets',
            [$this, 'registerModules'],
            999
        );
        //  initialize shortcodes and modules
        add_action('AHEE__EE_System__core_loaded_and_ready', [$this, 'initializeModules']);
    }


    public function registerModules()
    {
        // grab list of installed modules
        $modules_to_register = glob(EE_MODULES . '*', GLOB_ONLYDIR);
        // filter list of modules to register
        $modules_to_register = (array) apply_filters(
            'FHEE__EE_Config__register_modules__modules_to_register',
            $modules_to_register
        );
        if (! empty($modules_to_register)) {
            foreach ($modules_to_register as $module_path) {
                $this->registerModule($module_path);
            }
        }
        // filter list of installed modules and allow modules to set hooks for the rest of the system
        $this->modules = apply_filters(
            'FHEE__EE_Config___register_modules__installed_modules',
            $this->modules
        );
    }


    /**
     * @param string $module_path - full path up to and including module folder
     * @return bool
     */
    public function registerModule(string $module_path = ''): bool
    {
        if (empty($module_path)) {
            return false;
        }
        do_action('AHEE__EE_Config__register_module__begin', $module_path);
        $module_ext = '.module.php';
        // make all separators match
        $module_path = str_replace(['\\', '/'], '/', $module_path);
        // does the file path INCLUDE the actual file name as part of the path ?
        if (strpos($module_path, $module_ext) !== false) {
            // grab and shortcode file name from directory name and break apart at dots
            $module_file = explode('.', basename($module_path));
            // now we need to rebuild the shortcode path
            $module_path = explode('/', $module_path);
            // remove last segment
            array_pop($module_path);
            // glue it back together
            $module_path = implode('/', $module_path) . '/';
            // take first segment from file name pieces and sanitize it
            $module = preg_replace('/[^a-zA-Z0-9_\-]/', '', $module_file[0]);
            // ensure class prefix is added
            $module_class = strpos($module, 'EED_') !== 0 ? 'EED_' . $module : $module;
        } else {
            // we need to generate the filename based off of the folder name
            // grab and sanitize module name
            $module = strtolower(basename($module_path));
            $module = preg_replace('/[^a-z0-9_\-]/', '', $module);
            // like trailingslashit()
            $module_path = rtrim($module_path, '/') . '/';
            // create classname from module directory name
            $module = str_replace(' ', '_', ucwords(str_replace('_', ' ', $module)));
            // add class prefix
            $module_class = 'EED_' . $module;
        }
        // is it already added?
        if ($this->modules->has($module_class)) {
            return false;
        }
        // does the module exist ?
        if (! is_readable($module_path . '/' . $module_class . $module_ext)) {
            $msg = sprintf(
                esc_html__(
                    'The requested %s module file could not be found or is not readable due to file permissions.',
                    'event_espresso'
                ),
                $module
            );
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        // load the module class file
        require_once($module_path . $module_class . $module_ext);
        // verify that class exists
        if (! class_exists($module_class)) {
            $msg =
                sprintf(esc_html__('The requested %s module class does not exist.', 'event_espresso'), $module_class);
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        // add to array of registered modules
        $this->modules->add($module_class, $module_path . $module_class . $module_ext);
        do_action(
            'AHEE__EE_Config__register_module__complete',
            $module_class,
            $this->modules->{$module_class}
        );
        return true;
    }


    /**
     * allow modules to set hooks for the rest of the system
     *
     * @return void
     */
    public function initializeModules()
    {
        // cycle thru shortcode folders
        foreach ($this->modules as $module_class => $module_path) {
            // fire the shortcode class's set_hooks methods in case it needs to hook into other parts of the system
            // which set hooks ?
            if (is_admin() && is_callable([$module_class, 'set_hooks_admin'])) {
                // fire immediately
                call_user_func([$module_class, 'set_hooks_admin']);
            } else {
                // delay until other systems are online
                add_action(
                    'AHEE__EE_System__set_hooks_for_shortcodes_modules_and_addons',
                    [$module_class, 'set_hooks']
                );
            }
        }
    }
}
