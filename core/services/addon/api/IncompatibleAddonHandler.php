<?php

namespace EventEspresso\core\services\addon\api;

use EE_Error;
use WP_Hook;

class IncompatibleAddonHandler
{
    /**
     * @return IncompatibleAddon[]
     * @since 5.0.53
     */
    private function incompatibleAddons(): array
    {
        return [
            new IncompatibleAddon(
                'Automated Upcoming Event Notifications',
                'EE_AUTOMATED_UPCOMING_EVENT_NOTIFICATION_PLUGIN_FILE',
                'EE_AUTOMATED_UPCOMING_EVENT_NOTIFICATION_VERSION',
                '1.0.0.beta.091',
                'load_espresso_automated_upcoming_event_notification'
            ),
            new IncompatibleAddon(
                'Mailchimp Integration',
                'ESPRESSO_MAILCHIMP_MAIN_FILE',
                'ESPRESSO_MAILCHIMP_VERSION',
                '2.5.1',
                'load_ee4_espresso_mailchimp_class'
            ),
            new IncompatibleAddon(
                'Wait Lists',
                'EE_WAIT_LISTS_PLUGIN_FILE',
                'EE_WAIT_LISTS_VERSION',
                '1.0.0.beta.074',
                'load_espresso_wait_lists'
            ),
            // new IncompatibleAddon(
            //     'WP Users Integration',
            //     'EE_WPUSERS_PLUGIN_FILE',
            //     'EE_WPUSERS_VERSION',
            //     '2.1.0.rc.003',
            //     'load_ee_core_wpusers'
            // ),
        ];
    }


    /**
     * grabs the list of callbacks hooked into AHEE__EE_System__load_espresso_addons
     * loops through that list and checks if callback is listed as incompatible
     * and if so, calls deactivateAddonIfIncompatible()
     *
     * @return void
     */
    public function checkForIncompatibleAddons(): void
    {
        static $done = false;
        if ($done) {
            return;
        }
        $done = true;

        global $wp_filter;
        $addon_loader_hook = $wp_filter['AHEE__EE_System__load_espresso_addons'] ?? null;
        if ($addon_loader_hook instanceof WP_Hook) {
            foreach ($addon_loader_hook->callbacks as $priority => $callbacks) {
                foreach (array_keys($callbacks) as $espresso_addon_loader) {
                    $this->deactivateAddonIfIncompatible($espresso_addon_loader, $priority);
                }
            }
        }
    }


    /**
     * @param string $addon_loader_callback name of the callback hooked into AHEE__EE_System__load_espresso_addons
     * @param int    $priority              priority the callback is hooked in at
     * @return bool
     * @since 5.0.53
     */
    public function deactivateAddonIfIncompatible(string $addon_loader_callback, int $priority = 10): bool
    {
        $incompatible_addons = array_filter(
            $this->incompatibleAddons(),
            fn(IncompatibleAddon $addon) => $addon->loaderCallback() === $addon_loader_callback,
        );
        $incompatible_addon  = reset($incompatible_addons);
        if ($incompatible_addon instanceof IncompatibleAddon && $incompatible_addon->doesNotMeetRequirements()) {
            $this->deactivateIncompatibleAddon($incompatible_addon, $priority);
            $this->displayAddonDeactivationNotice($incompatible_addon);
        }
        return false;
    }


    /**
     *  "un-hooks" its callback from the AHEE__EE_System__load_espresso_addons action
     *  to prevent loading, then calls espresso_deactivate_plugin() to deactivate
     *
     * @param IncompatibleAddon $incompatible_addon
     * @param int $priority
     * @return void
     * @since 5.0.53
     */
    private function deactivateIncompatibleAddon(IncompatibleAddon $incompatible_addon, int $priority = 10): void
    {
        remove_action(
            'AHEE__EE_System__load_espresso_addons',
            $incompatible_addon->loaderCallback(),
            $priority
        );
        espresso_deactivate_plugin(plugin_basename($incompatible_addon->mainfile()));
    }


    /**
     * @param IncompatibleAddon $incompatible_addon
     * @return void
     * @since 5.0.53
     */
    private function displayAddonDeactivationNotice(IncompatibleAddon $incompatible_addon): void
    {
        add_action(
            'init',
            function () use ($incompatible_addon) {
                EE_Error::add_error(
                    sprintf(
                        esc_html__(
                            'We\'re sorry, but the Event Espresso %1$s addon was deactivated because version %2$s or higher is required with this version of Event Espresso core.',
                            'event_espresso'
                        ),
                        $incompatible_addon->name(),
                        $incompatible_addon->minVersionRequired()
                    ),
                    __FILE__,
                    __FUNCTION__ . "({$incompatible_addon->name()})",
                    __LINE__
                );
                EE_Error::get_notices(false, true);
            }
        );
    }
}
