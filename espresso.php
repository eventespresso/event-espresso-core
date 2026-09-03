<?php
/*
  Plugin Name: Event Espresso
  Plugin URI: https://eventespresso.com/pricing/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=wordpress_plugins_page&utm_content=support_link
  Description: Manage events, sell tickets, and receive payments from your WordPress website. Reduce event administration time, cut-out ticketing fees, and own your customer data. | <a href="https://eventespresso.com/add-ons/?utm_source=plugin_activation_screen&utm_medium=link&utm_campaign=plugin_description">Extensions</a> | <a href="https://eventespresso.com/pricing/?utm_source=plugin_activation_screen&utm_medium=link&utm_campaign=plugin_description">Sales</a> | <a href="admin.php?page=espresso_support">Support</a>
  Version: 5.0.60
  Requires PHP: 7.4
  Author: Event Espresso
  Author URI: https://eventespresso.com/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=wordpress_plugins_page&utm_content=support_link
  Update URI: https://eventespresso.com/event-espresso-core-reg/
  License: GPLv3
  Text Domain: event_espresso
  GitHub Plugin URI: https://github.com/eventespresso/event-espresso-core
  Copyright (c) 2008-2019 Event Espresso  All Rights Reserved.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */


defined('ABSPATH') || exit('No direct script access allowed');


if (! function_exists('espresso_deactivate_plugin')) {
    /**
     * deactivates plugin
     * usage:  espresso_deactivate_plugin( plugin_basename( __FILE__ ));
     *
     * @access public
     * @param string $plugin_basename - the results of plugin_basename( __FILE__ ) for the plugin's main file
     * @return    void
     */
    function espresso_deactivate_plugin(string $plugin_basename = ''): void
    {
        if (empty($plugin_basename)) {
            return;
        }
        if (! function_exists('deactivate_plugins')) {
            require_once ABSPATH . 'wp-admin/includes/plugin.php';
        }
        unset($_GET['activate'], $_REQUEST['activate'], $_GET['activate-multi'], $_REQUEST['activate-multi']);
        deactivate_plugins($plugin_basename);
    }
}


if (! function_exists('espressoDisplayAdminErrorNotice')) {
    /**
     * @param string $error_message
     * @return void
     */
    function espressoDisplayAdminErrorNotice(string $error_message): void
    {
        add_action(
            'admin_notices',
            function() use ($error_message) {
                if (is_admin() && current_user_can('update_plugins')) {
                    echo '
                <div class="notice error">
                    <p style="font-size: .9375rem; padding: .0625rem .75rem;">
                        ' . wp_kses_post($error_message) . '
                    </p>
                </div>';
                }
            }
        );
    }
}


/**
 * Event Espresso
 * Event Registration and Management Plugin for WordPress
 *
 * @package     Event Espresso
 * @author      Event Espresso
 * @see         Plugin Licensing
 * @since       4.0
 * @copyright   (c) 2008-2018 Event Espresso  All Rights Reserved.
 * @link        {@link https://www.eventespresso.com}
 * @license     {@link https://eventespresso.com/support/terms-conditions/}
 */
if (function_exists('espresso_version')) {
    /**
     * espresso duplicate plugin error
     * displays if more than one version of EE is activated at the same time.
     */
    espressoDisplayAdminErrorNotice(
        esc_html__(
            'Can not run multiple versions of Event Espresso! One version has been automatically deactivated. Please verify that you have the correct version you want still active.',
            'event_espresso'
        )
    );
    espresso_deactivate_plugin(plugin_basename(__FILE__));
} else {
    define('EVENT_ESPRESSO_MAIN_FILE', __FILE__);
    define('EVENT_ESPRESSO_VERSION', '5.0.60');
    define('EE_MIN_PHP_VERSION_REQUIRED', '7.4.0');

    /**
     * Returns the plugin version
     *
     * @return string
     */
    function espresso_version(): string
    {
        return apply_filters('FHEE__espresso__espresso_version', EVENT_ESPRESSO_VERSION);
    }


    if (version_compare(PHP_VERSION, EE_MIN_PHP_VERSION_REQUIRED, '<')) {
        espressoDisplayAdminErrorNotice(
            sprintf(
                esc_html__(
                    'We\'re sorry, but Event Espresso requires PHP version %1$s or greater in order to operate. Your server is currently running version %2$s.%3$sIn order to update your version of PHP, you may need to contact your current hosting provider.%3$sClick the following links for more information on %4$sSupported Versions%6$s or %5$sDownloads & Installation Instructions%6$s.',
                    'event_espresso'
                ),
                EE_MIN_PHP_VERSION_REQUIRED,
                PHP_VERSION,
                '<br/>',
                '<a href="https://www.php.net/supported-versions.php" target="_blank" rel="noopener noreferrer">',
                '<a href="https://www.php.net/downloads.php" target="_blank" rel="noopener noreferrer">',
                '</a>'
            )
        );
        espresso_deactivate_plugin(plugin_basename(__FILE__));
        return;
    }

    /*
     * PLEASE NOTE:
     * espresso_plugin_activation() and espresso_plugin_deactivation()
     * have been moved into ./core/bootstrap_espresso.php
     * in order to keep this file as lean as possible
     */

    try {
        require_once __DIR__ . '/vendor/autoload.php';
        require_once __DIR__ . '/core/bootstrap_espresso.php';
        bootstrap_espresso();
    } catch (Throwable $error) {
        espressoDisplayAdminErrorNotice($error->getMessage());
    }
}
