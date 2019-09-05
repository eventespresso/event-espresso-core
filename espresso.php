<?php defined('ABSPATH') || exit('No direct script access allowed');
/*
  Plugin Name:Event Espresso
  Plugin URI: http://eventespresso.com/pricing/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=wordpress_plugins_page&utm_content=support_link
  Description: Manage events, sell tickets, and receive payments from your WordPress website. Reduce event administration time, cut-out ticketing fees, and own your customer data. | <a href="https://eventespresso.com/add-ons/?utm_source=plugin_activation_screen&utm_medium=link&utm_campaign=plugin_description">Extensions</a> | <a href="https://eventespresso.com/pricing/?utm_source=plugin_activation_screen&utm_medium=link&utm_campaign=plugin_description">Sales</a> | <a href="admin.php?page=espresso_support">Support</a>
  Version: 4.10.1.rc.093
  Author: Event Espresso
  Author URI: http://eventespresso.com/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=wordpress_plugins_page&utm_content=support_link
  License: GPLv2
  Text Domain: event_espresso
  GitHub Plugin URI: https://github.com/eventespresso/event-espresso-core
  Copyright (c) 2008-2017 Event Espresso  All Rights Reserved.

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation; either version 2 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
 */
/**
 * Event Espresso
 * Event Registration and Management Plugin for WordPress
 *
 * @package         Event Espresso
 * @author          Seth Shoultes
 * @copyright   (c) 2008-2018 Event Espresso  All Rights Reserved.
 * @license         {@link http://eventespresso.com/support/terms-conditions/}
 * @see             Plugin Licensing
 * @link            {@link http://www.eventespresso.com}
 * @since           4.0
 */
if (function_exists('espresso_version')) {
    if (! function_exists('espresso_duplicate_plugin_error')) {
        /**
         *    espresso_duplicate_plugin_error
         *    displays if more than one version of EE is activated at the same time
         */
        function espresso_duplicate_plugin_error()
        {
            ?>
            <div class="error">
                <p>
                    <?php
                    echo esc_html__(
                        'Can not run multiple versions of Event Espresso! One version has been automatically deactivated. Please verify that you have the correct version you want still active.',
                        'event_espresso'
                    ); ?>
                </p>
            </div>
            <?php
            espresso_deactivate_plugin(plugin_basename(__FILE__));
        }
    }
    add_action('admin_notices', 'espresso_duplicate_plugin_error', 1);
} else {
    define('EE_MIN_PHP_VER_REQUIRED', '5.4.0');
    if (! version_compare(PHP_VERSION, EE_MIN_PHP_VER_REQUIRED, '>=')) {
        /**
         * espresso_minimum_php_version_error
         *
         * @return void
         */
        function espresso_minimum_php_version_error()
        {
            ?>
            <div class="error">
                <p>
                    <?php
                    printf(
                        esc_html__(
                            'We\'re sorry, but Event Espresso requires PHP version %1$s or greater in order to operate. You are currently running version %2$s.%3$sIn order to update your version of PHP, you will need to contact your current hosting provider.%3$sFor information on stable PHP versions, please go to %4$s.',
                            'event_espresso'
                        ),
                        EE_MIN_PHP_VER_REQUIRED,
                        PHP_VERSION,
                        '<br/>',
                        '<a href="http://php.net/downloads.php">http://php.net/downloads.php</a>'
                    );
                    ?>
                </p>
            </div>
            <?php
            espresso_deactivate_plugin(plugin_basename(__FILE__));
        }

        add_action('admin_notices', 'espresso_minimum_php_version_error', 1);
    } else {
        define('EVENT_ESPRESSO_MAIN_FILE', __FILE__);
        /**
         * espresso_version
         * Returns the plugin version
         *
         * @return string
         */
        function espresso_version()
        {
            return apply_filters('FHEE__espresso__espresso_version', '4.10.1.rc.093');
        }

        /**
         * espresso_plugin_activation
         * adds a wp-option to indicate that EE has been activated via the WP admin plugins page
         */
        function espresso_plugin_activation()
        {
            update_option('ee_espresso_activation', true);
        }

        register_activation_hook(EVENT_ESPRESSO_MAIN_FILE, 'espresso_plugin_activation');

        require_once __DIR__ . '/core/bootstrap_espresso.php';
        bootstrap_espresso();
    }
}
if (! function_exists('espresso_deactivate_plugin')) {
    /**
     *    deactivate_plugin
     * usage:  espresso_deactivate_plugin( plugin_basename( __FILE__ ));
     *
     * @access public
     * @param string $plugin_basename - the results of plugin_basename( __FILE__ ) for the plugin's main file
     * @return    void
     */
    function espresso_deactivate_plugin($plugin_basename = '')
    {
        if (! function_exists('deactivate_plugins')) {
            require_once ABSPATH . 'wp-admin/includes/plugin.php';
        }
        unset($_GET['activate'], $_REQUEST['activate']);
        deactivate_plugins($plugin_basename);
    }
}
