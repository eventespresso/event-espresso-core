<?php if ( ! defined('ABSPATH')) {
    exit('No direct script access allowed');
}
/*
  Plugin Name:		Event Espresso
  Plugin URI:  		http://eventespresso.com/pricing/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=wordpress_plugins_page&utm_content=support_link
  Description: 		Manage your events from your WordPress dashboard. Reduce your admin, reduce your costs make your life easier! | <a href="admin.php?page=espresso_support&action=contact_support">Support</a>
  Version:			4.9.44.rc.020
  Author:			Event Espresso
  Author URI: 		http://eventespresso.com/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=wordpress_plugins_page&utm_content=support_link
  License: 		     GPLv2
  Text Domain: 		 event_espresso
  GitHub Plugin URI: https://github.com/eventespresso/event-espresso-core
  Copyright 		(c) 2008-2017 Event Espresso  All Rights Reserved.

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
 * @package          Event Espresso
 * @author           Seth Shoultes
 * @copyright    (c) 2008-2017 Event Espresso  All Rights Reserved.
 * @license          {@link http://eventespresso.com/support/terms-conditions/}
 * @see              Plugin Licensing
 * @link             {@link http://www.eventespresso.com}
 * @since            4.0
 */
if (function_exists('espresso_version')) {
    /**
     *    espresso_duplicate_plugin_error
     *    displays if more than one version of EE is activated at the same time
     */
    function espresso_duplicate_plugin_error()
    {
        ?>
        <div class="error">
            <p>
                <?php echo esc_html__(
                        'Can not run multiple versions of Event Espresso! One version has been automatically deactivated. Please verify that you have the correct version you want still active.',
                        'event_espresso'
                ); ?>
            </p>
        </div>
        <?php
        espresso_deactivate_plugin(plugin_basename(__FILE__));
    }

    add_action('admin_notices', 'espresso_duplicate_plugin_error', 1);
} else {
    define('EE_MIN_PHP_VER_REQUIRED', '5.3.9');
    if ( ! version_compare(PHP_VERSION, EE_MIN_PHP_VER_REQUIRED, '>=')) {
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
        /**
         * espresso_version
         * Returns the plugin version
         *
         * @return string
         */
        function espresso_version()
        {
            return apply_filters('FHEE__espresso__espresso_version', '4.9.44.rc.020');
        }

        // define versions
        define('EVENT_ESPRESSO_VERSION', espresso_version());
        define('EE_MIN_WP_VER_REQUIRED', '4.1');
        define('EE_MIN_WP_VER_RECOMMENDED', '4.4.2');
        define('EE_MIN_PHP_VER_RECOMMENDED', '5.4.44');
        define('EVENT_ESPRESSO_MAIN_FILE', __FILE__);
        //used to be DIRECTORY_SEPARATOR, but that caused issues on windows
        if ( ! defined('DS')) {
            define('DS', '/');
        }
        if ( ! defined('PS')) {
            define('PS', PATH_SEPARATOR);
        }
        if ( ! defined('SP')) {
            define('SP', ' ');
        }
        if ( ! defined('EENL')) {
            define('EENL', "\n");
        }
        define('EE_SUPPORT_EMAIL', 'support@eventespresso.com');
        // define the plugin directory and URL
        define('EE_PLUGIN_BASENAME', plugin_basename(EVENT_ESPRESSO_MAIN_FILE));
        define('EE_PLUGIN_DIR_PATH', plugin_dir_path(EVENT_ESPRESSO_MAIN_FILE));
        define('EE_PLUGIN_DIR_URL', plugin_dir_url(EVENT_ESPRESSO_MAIN_FILE));
        // main root folder paths
        define('EE_ADMIN_PAGES', EE_PLUGIN_DIR_PATH . 'admin_pages' . DS);
        define('EE_CORE', EE_PLUGIN_DIR_PATH . 'core' . DS);
        define('EE_MODULES', EE_PLUGIN_DIR_PATH . 'modules' . DS);
        define('EE_PUBLIC', EE_PLUGIN_DIR_PATH . 'public' . DS);
        define('EE_SHORTCODES', EE_PLUGIN_DIR_PATH . 'shortcodes' . DS);
        define('EE_WIDGETS', EE_PLUGIN_DIR_PATH . 'widgets' . DS);
        define('EE_PAYMENT_METHODS', EE_PLUGIN_DIR_PATH . 'payment_methods' . DS);
        define('EE_CAFF_PATH', EE_PLUGIN_DIR_PATH . 'caffeinated' . DS);
        // core system paths
        define('EE_ADMIN', EE_CORE . 'admin' . DS);
        define('EE_CPTS', EE_CORE . 'CPTs' . DS);
        define('EE_CLASSES', EE_CORE . 'db_classes' . DS);
        define('EE_INTERFACES', EE_CORE . 'interfaces' . DS);
        define('EE_BUSINESS', EE_CORE . 'business' . DS);
        define('EE_MODELS', EE_CORE . 'db_models' . DS);
        define('EE_HELPERS', EE_CORE . 'helpers' . DS);
        define('EE_LIBRARIES', EE_CORE . 'libraries' . DS);
        define('EE_TEMPLATES', EE_CORE . 'templates' . DS);
        define('EE_THIRD_PARTY', EE_CORE . 'third_party_libs' . DS);
        define('EE_GLOBAL_ASSETS', EE_TEMPLATES . 'global_assets' . DS);
        define('EE_FORM_SECTIONS', EE_LIBRARIES . 'form_sections' . DS);
        // gateways
        define('EE_GATEWAYS', EE_MODULES . 'gateways' . DS);
        define('EE_GATEWAYS_URL', EE_PLUGIN_DIR_URL . 'modules' . DS . 'gateways' . DS);
        // asset URL paths
        define('EE_TEMPLATES_URL', EE_PLUGIN_DIR_URL . 'core' . DS . 'templates' . DS);
        define('EE_GLOBAL_ASSETS_URL', EE_TEMPLATES_URL . 'global_assets' . DS);
        define('EE_IMAGES_URL', EE_GLOBAL_ASSETS_URL . 'images' . DS);
        define('EE_THIRD_PARTY_URL', EE_PLUGIN_DIR_URL . 'core' . DS . 'third_party_libs' . DS);
        define('EE_HELPERS_ASSETS', EE_PLUGIN_DIR_URL . 'core/helpers/assets/');
        define('EE_LIBRARIES_URL', EE_PLUGIN_DIR_URL . 'core/libraries/');
        // define upload paths
        $uploads = wp_upload_dir();
        // define the uploads directory and URL
        define('EVENT_ESPRESSO_UPLOAD_DIR', $uploads['basedir'] . DS . 'espresso' . DS);
        define('EVENT_ESPRESSO_UPLOAD_URL', $uploads['baseurl'] . DS . 'espresso' . DS);
        // define the templates directory and URL
        define('EVENT_ESPRESSO_TEMPLATE_DIR', $uploads['basedir'] . DS . 'espresso' . DS . 'templates' . DS);
        define('EVENT_ESPRESSO_TEMPLATE_URL', $uploads['baseurl'] . DS . 'espresso' . DS . 'templates' . DS);
        // define the gateway directory and URL
        define('EVENT_ESPRESSO_GATEWAY_DIR', $uploads['basedir'] . DS . 'espresso' . DS . 'gateways' . DS);
        define('EVENT_ESPRESSO_GATEWAY_URL', $uploads['baseurl'] . DS . 'espresso' . DS . 'gateways' . DS);
        // languages folder/path
        define('EE_LANGUAGES_SAFE_LOC', '..' . DS . 'uploads' . DS . 'espresso' . DS . 'languages' . DS);
        define('EE_LANGUAGES_SAFE_DIR', EVENT_ESPRESSO_UPLOAD_DIR . 'languages' . DS);
        //check for dompdf fonts in uploads
        if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . 'fonts' . DS)) {
            define('DOMPDF_FONT_DIR', EVENT_ESPRESSO_UPLOAD_DIR . 'fonts' . DS);
        }
        //ajax constants
        define(
                'EE_FRONT_AJAX',
                isset($_REQUEST['ee_front_ajax']) || isset($_REQUEST['data']['ee_front_ajax']) ? true : false
        );
        define(
                'EE_ADMIN_AJAX',
                isset($_REQUEST['ee_admin_ajax']) || isset($_REQUEST['data']['ee_admin_ajax']) ? true : false
        );
        //just a handy constant occasionally needed for finding values representing infinity in the DB
        //you're better to use this than its straight value (currently -1) in case you ever
        //want to change its default value! or find when -1 means infinity
        define('EE_INF_IN_DB', -1);
        define('EE_INF', INF > (float)PHP_INT_MAX ? INF : PHP_INT_MAX);
        define('EE_DEBUG', false);
        // for older WP versions
        if ( ! defined('MONTH_IN_SECONDS')) {
            define('MONTH_IN_SECONDS', DAY_IN_SECONDS * 30);
        }
        /**
         *    espresso_plugin_activation
         *    adds a wp-option to indicate that EE has been activated via the WP admin plugins page
         */
        function espresso_plugin_activation()
        {
            update_option('ee_espresso_activation', true);
        }

        register_activation_hook(EVENT_ESPRESSO_MAIN_FILE, 'espresso_plugin_activation');
        /**
         *    espresso_load_error_handling
         *    this function loads EE's class for handling exceptions and errors
         */
        function espresso_load_error_handling()
        {
            // load debugging tools
            if (WP_DEBUG === true && is_readable(EE_HELPERS . 'EEH_Debug_Tools.helper.php')) {
                require_once(EE_HELPERS . 'EEH_Debug_Tools.helper.php');
                EEH_Debug_Tools::instance();
            }
            // load error handling
            if (is_readable(EE_CORE . 'EE_Error.core.php')) {
                require_once(EE_CORE . 'EE_Error.core.php');
            } else {
                wp_die(esc_html__('The EE_Error core class could not be loaded.', 'event_espresso'));
            }
        }

        /**
         *    espresso_load_required
         *    given a class name and path, this function will load that file or throw an exception
         *
         * @param    string $classname
         * @param    string $full_path_to_file
         * @throws    EE_Error
         */
        function espresso_load_required($classname, $full_path_to_file)
        {
            static $error_handling_loaded = false;
            if ( ! $error_handling_loaded) {
                espresso_load_error_handling();
                $error_handling_loaded = true;
            }
            if (is_readable($full_path_to_file)) {
                require_once($full_path_to_file);
            } else {
                throw new EE_Error (
                        sprintf(
                                esc_html__(
                                        'The %s class file could not be located or is not readable due to file permissions.',
                                        'event_espresso'
                                ),
                                $classname
                        )
                );
            }
        }

        espresso_load_required('EEH_Base', EE_CORE . 'helpers' . DS . 'EEH_Base.helper.php');
        espresso_load_required('EEH_File', EE_CORE . 'helpers' . DS . 'EEH_File.helper.php');
        espresso_load_required('EE_Bootstrap', EE_CORE . 'EE_Bootstrap.core.php');
        new EE_Bootstrap();
    }
}
if ( ! function_exists('espresso_deactivate_plugin')) {
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
        if ( ! function_exists('deactivate_plugins')) {
            require_once(ABSPATH . 'wp-admin/includes/plugin.php');
        }
        unset($_GET['activate'], $_REQUEST['activate']);
        deactivate_plugins($plugin_basename);
    }
}