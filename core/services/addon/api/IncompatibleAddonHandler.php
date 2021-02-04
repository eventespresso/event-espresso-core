<?php

namespace EventEspresso\core\services\addon\api;

use EE_Error;

class IncompatibleAddonHandler
{
    /**
     * @return void
     */
    public function deactivateIncompatibleAddons()
    {
        $this->deactivateIncompatibleAddon(
            'Wait Lists',
            'EE_WAIT_LISTS_VERSION',
            '1.0.0.beta.074',
            'load_espresso_wait_lists',
            'EE_WAIT_LISTS_PLUGIN_FILE'
        );
        $this->deactivateIncompatibleAddon(
            'Automated Upcoming Event Notifications',
            'EE_AUTOMATED_UPCOMING_EVENT_NOTIFICATION_VERSION',
            '1.0.0.beta.091',
            'load_espresso_automated_upcoming_event_notification',
            'EE_AUTOMATED_UPCOMING_EVENT_NOTIFICATION_PLUGIN_FILE'
        );
        $this->deactivateIncompatibleAddon(
            'WP Users Integration',
            'EE_WPUSERS_VERSION',
            '2.1.1.rc.001',
            'load_ee_core_wpusers',
            'EE_WPUSERS_PLUGIN_FILE'
        );
    }


    /**
     * @param string $addon_name
     * @param string $version_constant
     * @param string $min_version_required
     * @param string $load_callback
     * @param string $plugin_file_constant
     * @return void
     */
    private function deactivateIncompatibleAddon(
        string $addon_name,
        string $version_constant,
        string $min_version_required,
        string $load_callback,
        string $plugin_file_constant
    ) {
        if (! defined($version_constant)) {
            return;
        }
        $addon_version = constant($version_constant);
        if ($addon_version && version_compare($addon_version, $min_version_required, '<')) {
            remove_action('AHEE__EE_System__load_espresso_addons', $load_callback);
            if (! function_exists('deactivate_plugins')) {
                require_once ABSPATH . 'wp-admin/includes/plugin.php';
            }
            deactivate_plugins(plugin_basename(constant($plugin_file_constant)));
            unset($_GET['activate'], $_REQUEST['activate'], $_GET['activate-multi'], $_REQUEST['activate-multi']);
            EE_Error::add_error(
                sprintf(
                    esc_html__(
                        'We\'re sorry, but the Event Espresso %1$s addon was deactivated because version %2$s or higher is required with this version of Event Espresso core.',
                        'event_espresso'
                    ),
                    $addon_name,
                    $min_version_required
                ),
                __FILE__,
                __FUNCTION__ . "({$addon_name})",
                __LINE__
            );
            EE_Error::get_notices(false, true);
        }
    }
}
