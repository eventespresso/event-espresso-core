<?php

use EventEspresso\caffeinated\core\domain\services\pue\RegisterAddonPUE;
use EventEspresso\core\domain\DomainInterface;
use EventEspresso\core\domain\RequiresDomainInterface;
use EventEspresso\core\exceptions\ExceptionLogger;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\RequestInterface;

/**
 * Class EE_Register_Addon
 * EEI_Plugin_API class for registering addons for use with EE core.
 * Receives an array of addon details and takes care of adding all of the necessary hooks and filters
 * to setup things such as autoloaders, configuration settings,
 * data migration scripts, admin pages, modules, shortcodes, and even widgets
 *
 * @package               Event Espresso
 * @subpackage            plugin api, addons
 * @since                 4.3.0
 * @author                Brent Christensen
 */
class EE_Register_Addon implements EEI_Plugin_API
{
    /**
     * possibly truncated version of the EE core version string
     *
     * @var string
     */
    protected static $_core_version = '';

    /**
     * Holds values for registered addons
     *
     * @var array
     */
    protected static $_settings = [];

    /**
     * @var  array $_incompatible_addons keys are addon SLUGS
     *                                   (first argument passed to EE_Register_Addon::register()), keys are
     *                                   their MINIMUM VERSION (with all 5 parts. Eg 1.2.3.rc.004).
     *                                   Generally this should be used sparingly, as we don't want to muddle up
     *                                   EE core with knowledge of ALL the addons out there.
     *                                   If you want NO versions of an addon to run with a certain version of core,
     *                                   it's usually best to define the addon's "min_core_version" as part of its call
     *                                   to EE_Register_Addon::register(), rather than using this array with a super
     *                                   high value for its minimum plugin version.
     * @access    protected
     */
    protected static $_incompatible_addons = [
        'Multi_Event_Registration' => '2.0.11.rc.002',
        'Promotions'               => '1.0.0.rc.084',
    ];


    /**
     * We should always be comparing core to a version like '4.3.0.rc.000',
     * not just '4.3.0'.
     * So if the addon developer doesn't provide that full version string,
     * fill in the blanks for them
     *
     * @param string $min_core_version
     * @return string always like '4.3.0.rc.000'
     */
    protected static function _effective_version(string $min_core_version): string
    {
        // versions: 4 . 3 . 1 . p . 123
        // offsets:    0 . 1 . 2 . 3 . 4
        $version_parts = explode('.', $min_core_version);
        // check they specified the micro version (after 2nd period)
        if (! isset($version_parts[2])) {
            $version_parts[2] = '0';
        }
        // if they didn't specify the 'p', or 'rc' part. Just assume the lowest possible
        // soon we can assume that's 'rc', but this current version is 'alpha'
        if (! isset($version_parts[3])) {
            $version_parts[3] = 'dev';
        }
        if (! isset($version_parts[4])) {
            $version_parts[4] = '000';
        }
        return implode('.', $version_parts);
    }


    /**
     * Returns whether or not the min core version requirement of the addon is met
     *
     * @param string $min_core_version    the minimum core version required by the addon
     * @param string $actual_core_version the actual core version, optional
     * @return bool
     */
    public static function _meets_min_core_version_requirement(
        string $min_core_version,
        string $actual_core_version = EVENT_ESPRESSO_VERSION
    ): bool {
        return version_compare(
            self::_effective_version($actual_core_version),
            self::_effective_version($min_core_version),
            '>='
        );
    }


    /**
     * Method for registering new EE_Addons.
     * Should be called AFTER AHEE__EE_System__load_espresso_addons but BEFORE
     * AHEE__EE_System___detect_if_activation_or_upgrade__begin in order to register all its components. However, it
     * may also be called after the 'activate_plugin' action (when an addon is activated), because an activating addon
     * won't be loaded by WP until after AHEE__EE_System__load_espresso_addons has fired. If its called after
     * 'activate_plugin', it registers the addon still, but its components are not registered
     * (they shouldn't be needed anyways, because it's just an activation request and they won't have a chance to do
     * anything anyways). Instead, it just sets the newly-activated addon's activation indicator wp option and returns
     * (so that we can detect that the addon has activated on the subsequent request)
     *
     * @param string                  $addon_name                       [Required] the EE_Addon's name.
     * @param array                   $setup_args                       {
     *                                                                  An array of arguments provided for registering
     *                                                                  the message type.
     * @type  string                  $class_name                       the addon's main file name.
     *                                                                  If left blank, generated from the addon name,
     *                                                                  changes something like "calendar" to
     *                                                                  "EE_Calendar"
     * @type string                   $min_core_version                 the minimum version of EE Core that the
     *                                                                  addon will work with. eg "4.8.1.rc.084"
     * @type string                   $version                          the "software" version for the addon. eg
     *                                                                  "1.0.0.p" for a first stable release, or
     *                                                                  "1.0.0.rc.043" for a version in progress
     * @type string                   $main_file_path                   the full server path to the main file
     *                                                                  loaded directly by WP
     * @type DomainInterface          $domain                           child class of
     *                                                                  EventEspresso\core\domain\DomainBase
     * @type string                   $domain_fqcn                      Fully Qualified Class Name
     *                                                                  for the addon's Domain class
     *                                                                  (see EventEspresso\core\domain\Domain)
     * @type string                   $admin_path                       full server path to the folder where the
     *                                                                  addon\'s admin files reside
     * @type string                   $admin_callback                   a method to be called when the EE Admin is
     *                                                                  first invoked, can be used for hooking into
     *                                                                  any admin page
     * @type string                   $config_section                   the section name for this addon's
     *                                                                  configuration settings section
     *                                                                  (defaults to "addons")
     * @type string                   $config_class                     the class name for this addon's
     *                                                                  configuration settings object
     * @type string                   $config_name                      the class name for this addon's
     *                                                                  configuration settings object
     * @type string                   $autoloader_paths                 [Required] an array of class names and the full
     *                                                                  server paths to those files.
     * @type string                   $autoloader_folders               an array of  "full server paths" for any
     *                                                                  folders containing classes that might be
     *                                                                  invoked by the addon
     * @type string                   $dms_paths                        [Required] an array of full server paths to
     *                                                                  folders that contain data migration scripts.
     *                                                                  The key should be the EE_Addon class name that
     *                                                                  this set of data migration scripts belongs to.
     *                                                                  If the EE_Addon class is namespaced, then this
     *                                                                  needs to be the Fully Qualified Class Name
     * @type string                   $module_paths                     an array of full server paths to any
     *                                                                  EED_Modules used by the addon
     * @type string                   $shortcode_paths                  an array of full server paths to folders
     *                                                                  that contain EES_Shortcodes
     * @type string                   $widget_paths                     an array of full server paths to folders
     *                                                                  that contain WP_Widgets
     * @type array                    $capabilities                     an array indexed by role name
     *                                                                  (i.e administrator,author ) and the values
     *                                                                  are an array of caps to add to the role.
     *                                                                  'administrator' => array(
     *                                                                  'read_addon',
     *                                                                  'edit_addon',
     *                                                                  etc.
     *                                                                  ).
     * @type EE_Meta_Capability_Map[] $capability_maps                  an array of EE_Meta_Capability_Map object
     *                                                                  for any addons that need to register any
     *                                                                  special meta mapped capabilities.  Should
     *                                                                  be indexed where the key is the
     *                                                                  EE_Meta_Capability_Map class name and the
     *                                                                  values are the arguments sent to the class.
     * @type array                    $model_paths                      array of folders containing DB models
     * @return void
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @since    4.3.0
     * @see      EE_Register_Model
     * @type array                    $class_paths                      array of folders containing DB classes
     * @see      EE_Register_Model
     * @type array                    $model_extension_paths            array of folders containing DB model
     *                                                                  extensions
     * @see      EE_Register_Model_Extension
     * @type array                    $class_extension_paths            array of folders containing DB class
     *                                                                  extensions
     * @see      EE_Register_Model_Extension
     * @type array message_types {
     *                                                                  An array of message types with the key as
     *                                                                  the message type name and the values as
     *                                                                  below:
     * @type string                   $mtfilename                       [Required] The filename of the message type
     *                                                                  being registered. This will be the main
     *                                                                  EE_{Message Type Name}_message_type class.
     *                                                                  for example:
     *                                                                  EE_Declined_Registration_message_type.class.php
     * @type array                    $autoloadpaths                    [Required] An array of paths to add to the
     *                                                                  messages autoloader for the new message type.
     * @type array                    $messengers_to_activate_with      An array of messengers that this message
     *                                                                  type should activate with. Each value in
     *                                                                  the
     *                                                                  array
     *                                                                  should match the name property of a
     *                                                                  EE_messenger. Optional.
     * @type array                    $messengers_to_validate_with      An array of messengers that this message
     *                                                                  type should validate with. Each value in
     *                                                                  the
     *                                                                  array
     *                                                                  should match the name property of an
     *                                                                  EE_messenger.
     *                                                                  Optional.
     *                                                                  }
     * @type array                    $custom_post_types
     * @type array                    $custom_taxonomies
     * @type array                    $payment_method_paths             each element is the folder containing the
     *                                                                  EE_PMT_Base child class
     *                                                                  (eg,
     *                                                                  '/wp-content/plugins/my_plugin/Payomatic/'
     *                                                                  which contains the files
     *                                                                  EE_PMT_Payomatic.pm.php)
     * @type array                    $default_terms
     * @type array                    $namespace                        {
     *                                                                  An array with two items for registering the
     *                                                                  addon's namespace. (If, for some reason, you
     *                                                                  require additional namespaces,
     *                                                                  use
     *                                                                  EventEspresso\core\Psr4Autoloader::addNamespace()
     *                                                                  directly)
     * @see      EventEspresso\core\Psr4Autoloader::addNamespace()
     * @type string                   $FQNS                             the namespace prefix
     * @type string                   $DIR                              a base directory for class files in the
     *                                                                  namespace.
     *                                                                  }
     *                                                                  }
     * @type string                   $privacy_policies                 FQNSs (namespaces, each of which contains only
     *                                                                  privacy policy classes) or FQCNs (specific
     *                                                                  classnames of privacy policy classes)
     * @type string                   $personal_data_exporters          FQNSs (namespaces, each of which contains only
     *                                                                  privacy policy classes) or FQCNs (specific
     *                                                                  classnames of privacy policy classes)
     * @type string                   $personal_data_erasers            FQNSs (namespaces, each of which contains only
     *                                                                  privacy policy classes) or FQCNs (specific
     *                                                                  classnames of privacy policy classes)
     */
    public static function register($addon_name = '', array $setup_args = [])
    {
        // required fields MUST be present, so let's make sure they are.
        EE_Register_Addon::_verify_parameters($addon_name, $setup_args);
        // get class name for addon
        $class_name = EE_Register_Addon::_parse_class_name($addon_name, $setup_args);
        // setup $_settings array from incoming values.
        $addon_settings = EE_Register_Addon::_get_addon_settings($class_name, $setup_args);
        // allow early addon setup or modification of addon api settings
        self::$_settings = (array) apply_filters(
            'FHEE__EE_Register_Addon__register',
            self::$_settings,
            $addon_name,
            $class_name,
            $setup_args
        );
        // does this addon work with this version of core or WordPress ?
        // does this addon work with this version of core or WordPress ?
        if (! EE_Register_Addon::_addon_is_compatible($addon_name, $addon_settings)) {
            return;
        }
        // register namespaces
        EE_Register_Addon::_setup_namespaces($addon_settings);
        // check if this is an activation request
        if (EE_Register_Addon::_addon_activation($addon_name, $addon_settings)) {
            // dont bother setting up the rest of the addon atm
            return;
        }
        // we need cars
        EE_Register_Addon::_setup_autoloaders($addon_name);
        // register new models and extensions
        EE_Register_Addon::_register_models_and_extensions($addon_name);
        // setup DMS
        EE_Register_Addon::_register_data_migration_scripts($addon_name);
        // if config_class is present let's register config.
        EE_Register_Addon::_register_config($addon_name);
        // register admin pages
        EE_Register_Addon::_register_admin_pages($addon_name);
        // add to list of modules to be registered
        EE_Register_Addon::_register_modules($addon_name);
        // add to list of shortcodes to be registered
        EE_Register_Addon::_register_shortcodes($addon_name);
        // add to list of widgets to be registered
        EE_Register_Addon::_register_widgets($addon_name);
        // register capability related stuff.
        EE_Register_Addon::_register_capabilities($addon_name);
        // any message type to register?
        EE_Register_Addon::_register_message_types($addon_name);
        // any custom post type/ custom capabilities or default terms to register
        EE_Register_Addon::_register_custom_post_types($addon_name);
        // and any payment methods
        EE_Register_Addon::_register_payment_methods($addon_name);
        // and privacy policy generators
        EE_Register_Addon::registerPrivacyPolicies($addon_name);
        // and privacy policy generators
        EE_Register_Addon::registerPersonalDataExporters($addon_name);
        // and privacy policy generators
        EE_Register_Addon::registerPersonalDataErasers($addon_name);
        // load and instantiate main addon class
        $addon = EE_Register_Addon::_load_and_init_addon_class($addon_name);
        // delay calling after_registration hook on each addon until after all add-ons have been registered.
        add_action('AHEE__EE_System__load_espresso_addons__complete', [$addon, 'after_registration'], 999);
    }


    /**
     * @param string $addon_name
     * @param array  $setup_args
     * @return void
     * @throws EE_Error
     */
    private static function _verify_parameters(string $addon_name, array $setup_args)
    {
        // required fields MUST be present, so let's make sure they are.
        if (empty($addon_name) || empty($setup_args)) {
            throw new EE_Error(
                esc_html__(
                    'In order to register an EE_Addon with EE_Register_Addon::register(), you must include the "addon_name" (the name of the addon), and an array of arguments.',
                    'event_espresso'
                )
            );
        }
        if (empty($setup_args['main_file_path'])) {
            throw new EE_Error(
                sprintf(
                    esc_html__(
                        'When registering an addon, you didn\'t provide the "main_file_path", which is the full path to the main file loaded directly by Wordpress. You only provided %s',
                        'event_espresso'
                    ),
                    implode(',', array_keys($setup_args))
                )
            );
        }
        // check that addon has not already been registered with that name
        if (isset(self::$_settings[ $addon_name ]) && ! did_action('activate_plugin')) {
            throw new EE_Error(
                sprintf(
                    esc_html__(
                        'An EE_Addon with the name "%s" has already been registered and each EE_Addon requires a unique name.',
                        'event_espresso'
                    ),
                    $addon_name
                )
            );
        }
    }


    /**
     * @param string $addon_name
     * @param array  $setup_args
     * @return string
     */
    private static function _parse_class_name(string $addon_name, array $setup_args): string
    {
        if (empty($setup_args['class_name'])) {
            // generate one by first separating name with spaces
            $class_name = str_replace(['-', '_'], ' ', trim($addon_name));
            // capitalize, then replace spaces with underscores
            $class_name = str_replace(' ', '_', ucwords($class_name));
        } else {
            $class_name = $setup_args['class_name'];
        }
        // check if classname is fully  qualified or is a legacy classname already prefixed with 'EE_'
        return strpos($class_name, '\\') || strpos($class_name, 'EE_') === 0
            ? $class_name
            : 'EE_' . $class_name;
    }


    /**
     * @param string $class_name
     * @param array  $setup_args
     * @return array
     */
    private static function _get_addon_settings(string $class_name, array $setup_args): array
    {
        // setup $_settings array from incoming values.
        $addon_settings = [
            // generated from the addon name, changes something like "calendar" to "EE_Calendar"
            'class_name'            => $class_name,
            // the addon slug for use in URLs, etc
            'plugin_slug'           => isset($setup_args['plugin_slug'])
                ? (string) $setup_args['plugin_slug']
                : '',
            // page slug to be used when generating the "Settings" link on the WP plugin page
            'plugin_action_slug'    => isset($setup_args['plugin_action_slug'])
                ? (string) $setup_args['plugin_action_slug']
                : '',
            // the "software" version for the addon
            'version'               => isset($setup_args['version'])
                ? (string) $setup_args['version']
                : '',
            // the minimum version of EE Core that the addon will work with
            'min_core_version'      => isset($setup_args['min_core_version'])
                ? (string) $setup_args['min_core_version']
                : '',
            // the minimum version of WordPress that the addon will work with
            'min_wp_version'        => isset($setup_args['min_wp_version'])
                ? (string) $setup_args['min_wp_version']
                : EE_MIN_WP_VER_REQUIRED,
            // full server path to main file (file loaded directly by WP)
            'main_file_path'        => isset($setup_args['main_file_path'])
                ? (string) $setup_args['main_file_path']
                : '',
            // instance of \EventEspresso\core\domain\DomainInterface
            'domain'                => isset($setup_args['domain']) && $setup_args['domain'] instanceof DomainInterface
                ? $setup_args['domain']
                : null,
            // Fully Qualified Class Name for the addon's Domain class
            'domain_fqcn'           => isset($setup_args['domain_fqcn'])
                ? (string) $setup_args['domain_fqcn']
                : '',
            // path to folder containing files for integrating with the EE core admin and/or setting up EE admin pages
            'admin_path'            => isset($setup_args['admin_path'])
                ? (string) $setup_args['admin_path'] : '',
            // a method to be called when the EE Admin is first invoked, can be used for hooking into any admin page
            'admin_callback'        => isset($setup_args['admin_callback'])
                ? (string) $setup_args['admin_callback']
                : '',
            // the section name for this addon's configuration settings section (defaults to "addons")
            'config_section'        => isset($setup_args['config_section'])
                ? (string) $setup_args['config_section']
                : 'addons',
            // the class name for this addon's configuration settings object
            'config_class'          => isset($setup_args['config_class'])
                ? (string) $setup_args['config_class'] : '',
            // the name given to the config for this addons' configuration settings object (optional)
            'config_name'           => isset($setup_args['config_name'])
                ? (string) $setup_args['config_name'] : '',
            // an array of "class names" => "full server paths" for any classes that might be invoked by the addon
            'autoloader_paths'      => isset($setup_args['autoloader_paths'])
                ? (array) $setup_args['autoloader_paths']
                : [],
            // an array of  "full server paths" for any folders containing classes that might be invoked by the addon
            'autoloader_folders'    => isset($setup_args['autoloader_folders'])
                ? (array) $setup_args['autoloader_folders']
                : [],
            // array of full server paths to any EE_DMS data migration scripts used by the addon.
            // The key should be the EE_Addon class name that this set of data migration scripts belongs to.
            // If the EE_Addon class is namespaced, then this needs to be the Fully Qualified Class Name
            'dms_paths'             => isset($setup_args['dms_paths'])
                ? (array) $setup_args['dms_paths']
                : [],
            // array of full server paths to any EED_Modules used by the addon
            'module_paths'          => isset($setup_args['module_paths'])
                ? (array) $setup_args['module_paths']
                : [],
            // array of full server paths to any EES_Shortcodes used by the addon
            'shortcode_paths'       => isset($setup_args['shortcode_paths'])
                ? (array) $setup_args['shortcode_paths']
                : [],
            'shortcode_fqcns'       => isset($setup_args['shortcode_fqcns'])
                ? (array) $setup_args['shortcode_fqcns']
                : [],
            // array of full server paths to any WP_Widgets used by the addon
            'widget_paths'          => isset($setup_args['widget_paths'])
                ? (array) $setup_args['widget_paths']
                : [],
            'message_types'         => isset($setup_args['message_types'])
                ? (array) $setup_args['message_types']
                : [],
            'capabilities'          => isset($setup_args['capabilities'])
                ? (array) $setup_args['capabilities']
                : [],
            'capability_maps'       => isset($setup_args['capability_maps'])
                ? (array) $setup_args['capability_maps']
                : [],
            'model_paths'           => isset($setup_args['model_paths'])
                ? (array) $setup_args['model_paths']
                : [],
            'class_paths'           => isset($setup_args['class_paths'])
                ? (array) $setup_args['class_paths']
                : [],
            'model_extension_paths' => isset($setup_args['model_extension_paths'])
                ? (array) $setup_args['model_extension_paths']
                : [],
            'class_extension_paths' => isset($setup_args['class_extension_paths'])
                ? (array) $setup_args['class_extension_paths']
                : [],
            'custom_post_types'     => isset($setup_args['custom_post_types'])
                ? (array) $setup_args['custom_post_types']
                : [],
            'custom_taxonomies'     => isset($setup_args['custom_taxonomies'])
                ? (array) $setup_args['custom_taxonomies']
                : [],
            'payment_method_paths'  => isset($setup_args['payment_method_paths'])
                ? (array) $setup_args['payment_method_paths']
                : [],
            'default_terms'         => isset($setup_args['default_terms'])
                ? (array) $setup_args['default_terms']
                : [],
            // if not empty, inserts a new table row after this plugin's row on the WP Plugins page
            // that can be used for adding upgrading/marketing info
            'plugins_page_row'      => $setup_args['plugins_page_row'] ?? '',
            'namespace'             => isset(
                $setup_args['namespace']['FQNS'],
                $setup_args['namespace']['DIR']
            )
                ? (array) $setup_args['namespace']
                : [],
            'privacy_policies'      => isset($setup_args['privacy_policies'])
                ? (array) $setup_args['privacy_policies']
                : '',
        ];
        // if plugin_action_slug is NOT set, but an admin page path IS set,
        // then let's just use the plugin_slug since that will be used for linking to the admin page
        $addon_settings['plugin_action_slug'] = empty($addon_settings['plugin_action_slug'])
                                                && ! empty($addon_settings['admin_path'])
            ? $addon_settings['plugin_slug']
            : $addon_settings['plugin_action_slug'];
        // full server path to main file (file loaded directly by WP)
        $addon_settings['plugin_basename'] = plugin_basename($addon_settings['main_file_path']);
        return $addon_settings;
    }


    /**
     * @param string $addon_name
     * @param array  $addon_settings
     * @return bool
     */
    private static function _addon_is_compatible(string $addon_name, array $addon_settings): bool
    {
        global $wp_version;
        $incompatibility_message = '';
        // check whether this addon version is compatible with EE core
        if (
            isset(EE_Register_Addon::$_incompatible_addons[ $addon_name ])
            && ! self::_meets_min_core_version_requirement(
                EE_Register_Addon::$_incompatible_addons[ $addon_name ],
                $addon_settings['version']
            )
        ) {
            $incompatibility_message = sprintf(
                esc_html__(
                    '%4$sIMPORTANT!%5$sThe Event Espresso "%1$s" addon is not compatible with this version of Event Espresso.%2$sPlease upgrade your "%1$s" addon to version %3$s or newer to resolve this issue.',
                    'event_espresso'
                ),
                $addon_name,
                '<br />',
                EE_Register_Addon::$_incompatible_addons[ $addon_name ],
                '<span style="font-weight: bold; color: #D54E21;">',
                '</span><br />'
            );
        } elseif (
            ! self::_meets_min_core_version_requirement($addon_settings['min_core_version'], espresso_version())
        ) {
            $incompatibility_message = sprintf(
                esc_html__(
                    '%5$sIMPORTANT!%6$sThe Event Espresso "%1$s" addon requires Event Espresso Core version "%2$s" or higher in order to run.%4$sYour version of Event Espresso Core is currently at "%3$s". Please upgrade Event Espresso Core first and then re-activate "%1$s".',
                    'event_espresso'
                ),
                $addon_name,
                self::_effective_version($addon_settings['min_core_version']),
                self::_effective_version(espresso_version()),
                '<br />',
                '<span style="font-weight: bold; color: #D54E21;">',
                '</span><br />'
            );
        } elseif (version_compare($wp_version, $addon_settings['min_wp_version'], '<')) {
            $incompatibility_message = sprintf(
                esc_html__(
                    '%4$sIMPORTANT!%5$sThe Event Espresso "%1$s" addon requires WordPress version "%2$s" or greater.%3$sPlease update your version of WordPress to use the "%1$s" addon and to keep your site secure.',
                    'event_espresso'
                ),
                $addon_name,
                $addon_settings['min_wp_version'],
                '<br />',
                '<span style="font-weight: bold; color: #D54E21;">',
                '</span><br />'
            );
        }
        if (! empty($incompatibility_message)) {
            // remove 'activate' from the REQUEST
            // so WP doesn't erroneously tell the user the plugin activated fine when it didn't
            /** @var RequestInterface $request */
            $request = LoaderFactory::getLoader()->getShared(RequestInterface::class);
            $request->unSetRequestParam('activate', true);
            if (current_user_can('activate_plugins')) {
                // show an error message indicating the plugin didn't activate properly
                EE_Error::add_error($incompatibility_message, __FILE__, __FUNCTION__, __LINE__);
            }
            unset($_GET['activate'], $_REQUEST['activate']);
            if (! function_exists('deactivate_plugins')) {
                require_once ABSPATH . 'wp-admin/includes/plugin.php';
            }
            deactivate_plugins(plugin_basename($addon_settings['main_file_path']));
            // BAIL FROM THE ADDON REGISTRATION PROCESS
            return false;
        }
        // addon IS compatible
        return true;
    }


    /**
     * register namespaces right away before any other files or classes get loaded, but AFTER the version checks
     *
     * @param array $addon_settings
     * @return void
     */
    private static function _setup_namespaces(array $addon_settings)
    {
        //
        if (
            isset(
                $addon_settings['namespace']['FQNS'],
                $addon_settings['namespace']['DIR']
            )
        ) {
            EE_Psr4AutoloaderInit::psr4_loader()->addNamespace(
                $addon_settings['namespace']['FQNS'],
                $addon_settings['namespace']['DIR']
            );
        }
    }


    /**
     * @param string $addon_name
     * @param array  $addon_settings
     * @return bool
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private static function _addon_activation(string $addon_name, array $addon_settings): bool
    {
        // this is an activation request
        if (did_action('activate_plugin')) {
            // to find if THIS is the addon that was activated, just check if we have already registered it or not
            // (as the newly-activated addon wasn't around the first time addons were registered).
            // Note: the presence of pue_options in the addon registration options will initialize the $_settings
            // property for the add-on, but the add-on is only partially initialized.  Hence, the additional check.
            if (
                ! isset(self::$_settings[ $addon_name ])
                || (isset(self::$_settings[ $addon_name ])
                    && ! isset(self::$_settings[ $addon_name ]['class_name'])
                )
            ) {
                self::$_settings[ $addon_name ] = $addon_settings;
                $addon                          = self::_load_and_init_addon_class($addon_name);
                $addon->set_activation_indicator_option();
                // dont bother setting up the rest of the addon.
                // we know it was just activated and the request will end soon
            }
            return true;
        }
        // make sure this was called in the right place!
        if (
            ! did_action('AHEE__EE_System__load_espresso_addons')
            || did_action('AHEE__EE_System___detect_if_activation_or_upgrade__begin')
        ) {
            EE_Error::doing_it_wrong(
                __METHOD__,
                sprintf(
                    esc_html__(
                        'An attempt to register an EE_Addon named "%s" has failed because it was not registered at the correct time.  Please use the "AHEE__EE_System__load_espresso_addons" hook to register addons.',
                        'event_espresso'
                    ),
                    $addon_name
                ),
                '4.3.0'
            );
        }
        // make sure addon settings are set correctly without overwriting anything existing
        if (isset(self::$_settings[ $addon_name ])) {
            self::$_settings[ $addon_name ] += $addon_settings;
        } else {
            self::$_settings[ $addon_name ] = $addon_settings;
        }
        return false;
    }


    /**
     * @param string $addon_name
     * @return void
     * @throws EE_Error
     */
    private static function _setup_autoloaders(string $addon_name)
    {
        if (! empty(self::$_settings[ $addon_name ]['autoloader_paths'])) {
            // setup autoloader for single file
            EEH_Autoloader::instance()->register_autoloader(self::$_settings[ $addon_name ]['autoloader_paths']);
        }
        // setup autoloaders for folders
        if (! empty(self::$_settings[ $addon_name ]['autoloader_folders'])) {
            foreach ((array) self::$_settings[ $addon_name ]['autoloader_folders'] as $autoloader_folder) {
                EEH_Autoloader::register_autoloaders_for_each_file_in_folder($autoloader_folder);
            }
        }
    }


    /**
     * register new models and extensions
     *
     * @param string $addon_name
     * @return void
     * @throws EE_Error
     */
    private static function _register_models_and_extensions(string $addon_name)
    {
        // register new models
        if (
            ! empty(self::$_settings[ $addon_name ]['model_paths'])
            || ! empty(self::$_settings[ $addon_name ]['class_paths'])
        ) {
            EE_Register_Model::register(
                $addon_name,
                [
                    'model_paths' => self::$_settings[ $addon_name ]['model_paths'],
                    'class_paths' => self::$_settings[ $addon_name ]['class_paths'],
                ]
            );
        }
        // register model extensions
        if (
            ! empty(self::$_settings[ $addon_name ]['model_extension_paths'])
            || ! empty(self::$_settings[ $addon_name ]['class_extension_paths'])
        ) {
            EE_Register_Model_Extensions::register(
                $addon_name,
                [
                    'model_extension_paths' => self::$_settings[ $addon_name ]['model_extension_paths'],
                    'class_extension_paths' => self::$_settings[ $addon_name ]['class_extension_paths'],
                ]
            );
        }
    }


    /**
     * @param string $addon_name
     * @return void
     * @throws EE_Error
     */
    private static function _register_data_migration_scripts(string $addon_name)
    {
        // setup DMS
        if (! empty(self::$_settings[ $addon_name ]['dms_paths'])) {
            EE_Register_Data_Migration_Scripts::register(
                $addon_name,
                ['dms_paths' => self::$_settings[ $addon_name ]['dms_paths']]
            );
        }
    }


    /**
     * @param string $addon_name
     * @return void
     * @throws EE_Error
     */
    private static function _register_config(string $addon_name)
    {
        // if config_class is present let's register config.
        if (! empty(self::$_settings[ $addon_name ]['config_class'])) {
            EE_Register_Config::register(
                self::$_settings[ $addon_name ]['config_class'],
                [
                    'config_section' => self::$_settings[ $addon_name ]['config_section'],
                    'config_name'    => self::$_settings[ $addon_name ]['config_name'],
                ]
            );
        }
    }


    /**
     * @param string $addon_name
     * @return void
     * @throws EE_Error
     */
    private static function _register_admin_pages(string $addon_name)
    {
        if (! empty(self::$_settings[ $addon_name ]['admin_path'])) {
            EE_Register_Admin_Page::register(
                $addon_name,
                ['page_path' => self::$_settings[ $addon_name ]['admin_path']]
            );
        }
    }


    /**
     * @param string $addon_name
     * @return void
     * @throws EE_Error
     */
    private static function _register_modules(string $addon_name)
    {
        if (! empty(self::$_settings[ $addon_name ]['module_paths'])) {
            EE_Register_Module::register(
                $addon_name,
                ['module_paths' => self::$_settings[ $addon_name ]['module_paths']]
            );
        }
    }


    /**
     * @param string $addon_name
     * @return void
     * @throws EE_Error
     */
    private static function _register_shortcodes(string $addon_name)
    {
        if (
            ! empty(self::$_settings[ $addon_name ]['shortcode_paths'])
            || ! empty(self::$_settings[ $addon_name ]['shortcode_fqcns'])
        ) {
            EE_Register_Shortcode::register(
                $addon_name,
                [
                    'shortcode_paths' => self::$_settings[ $addon_name ]['shortcode_paths'] ?? [],
                    'shortcode_fqcns' => self::$_settings[ $addon_name ]['shortcode_fqcns'] ?? [],
                ]
            );
        }
    }


    /**
     * @param string $addon_name
     * @return void
     * @throws EE_Error
     */
    private static function _register_widgets(string $addon_name)
    {
        if (! empty(self::$_settings[ $addon_name ]['widget_paths'])) {
            EE_Register_Widget::register(
                $addon_name,
                ['widget_paths' => self::$_settings[ $addon_name ]['widget_paths']]
            );
        }
    }


    /**
     * @param string $addon_name
     * @return void
     * @throws EE_Error
     */
    private static function _register_capabilities(string $addon_name)
    {
        if (! empty(self::$_settings[ $addon_name ]['capabilities'])) {
            EE_Register_Capabilities::register(
                $addon_name,
                [
                    'capabilities'    => self::$_settings[ $addon_name ]['capabilities'],
                    'capability_maps' => self::$_settings[ $addon_name ]['capability_maps'],
                ]
            );
        }
    }


    /**
     * @param string $addon_name
     * @return void
     */
    private static function _register_message_types(string $addon_name)
    {
        if (! empty(self::$_settings[ $addon_name ]['message_types'])) {
            add_action(
                'EE_Brewing_Regular___messages_caf',
                ['EE_Register_Addon', 'register_message_types']
            );
        }
    }


    /**
     * @param string $addon_name
     * @return void
     * @throws EE_Error
     */
    private static function _register_custom_post_types(string $addon_name)
    {
        if (
            ! empty(self::$_settings[ $addon_name ]['custom_post_types'])
            || ! empty(self::$_settings[ $addon_name ]['custom_taxonomies'])
        ) {
            EE_Register_CPT::register(
                $addon_name,
                [
                    'cpts'          => self::$_settings[ $addon_name ]['custom_post_types'],
                    'cts'           => self::$_settings[ $addon_name ]['custom_taxonomies'],
                    'default_terms' => self::$_settings[ $addon_name ]['default_terms'],
                ]
            );
        }
    }


    /**
     * @param string $addon_name
     * @return void
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws DomainException
     * @throws EE_Error
     */
    private static function _register_payment_methods(string $addon_name)
    {
        if (! empty(self::$_settings[ $addon_name ]['payment_method_paths'])) {
            EE_Register_Payment_Method::register(
                $addon_name,
                ['payment_method_paths' => self::$_settings[ $addon_name ]['payment_method_paths']]
            );
        }
    }


    /**
     * @param string $addon_name
     * @return void
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws DomainException
     */
    private static function registerPrivacyPolicies(string $addon_name)
    {
        if (! empty(self::$_settings[ $addon_name ]['privacy_policies'])) {
            EE_Register_Privacy_Policy::register(
                $addon_name,
                self::$_settings[ $addon_name ]['privacy_policies']
            );
        }
    }


    /**
     * @param string $addon_name
     * @return void
     */
    private static function registerPersonalDataExporters(string $addon_name)
    {
        if (! empty(self::$_settings[ $addon_name ]['personal_data_exporters'])) {
            EE_Register_Personal_Data_Eraser::register(
                $addon_name,
                self::$_settings[ $addon_name ]['personal_data_exporters']
            );
        }
    }


    /**
     * @param string $addon_name
     * @return void
     */
    private static function registerPersonalDataErasers(string $addon_name)
    {
        if (! empty(self::$_settings[ $addon_name ]['personal_data_erasers'])) {
            EE_Register_Personal_Data_Eraser::register(
                $addon_name,
                self::$_settings[ $addon_name ]['personal_data_erasers']
            );
        }
    }


    /**
     * Loads and instantiates the EE_Addon class and adds it onto the registry
     *
     * @param string $addon_name
     * @return EE_Addon
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     */
    private static function _load_and_init_addon_class(string $addon_name): EE_Addon
    {
        $addon = LoaderFactory::getLoader()->getShared(
            self::$_settings[ $addon_name ]['class_name'],
            ['EE_Registry::create(addon)' => true]
        );
        if (! $addon instanceof EE_Addon) {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        'Failed to instantiate the %1$s class. PLease check that the class exists.',
                        'event_espresso'
                    ),
                    $addon_name
                )
            );
        }
        // setter inject dep map if required
        if ($addon->dependencyMap() === null) {
            $addon->setDependencyMap(LoaderFactory::getLoader()->getShared('EE_Dependency_Map'));
        }
        // setter inject domain if required
        EE_Register_Addon::injectAddonDomain($addon_name, $addon);

        $addon->set_name($addon_name);
        $addon->set_plugin_slug(self::$_settings[ $addon_name ]['plugin_slug']);
        $addon->set_plugin_basename(self::$_settings[ $addon_name ]['plugin_basename']);
        $addon->set_main_plugin_file(self::$_settings[ $addon_name ]['main_file_path']);
        $addon->set_plugin_action_slug(self::$_settings[ $addon_name ]['plugin_action_slug']);
        $addon->set_plugins_page_row(self::$_settings[ $addon_name ]['plugins_page_row']);
        $addon->set_version(self::$_settings[ $addon_name ]['version']);
        $addon->set_min_core_version(self::_effective_version(self::$_settings[ $addon_name ]['min_core_version']));
        $addon->set_config_section(self::$_settings[ $addon_name ]['config_section']);
        $addon->set_config_class(self::$_settings[ $addon_name ]['config_class']);
        $addon->set_config_name(self::$_settings[ $addon_name ]['config_name']);
        do_action(
            'AHEE__EE_Register_Addon___load_and_init_addon_class',
            $addon,
            $addon_name,
            self::$_settings
        );
        // unfortunately this can't be hooked in upon construction,
        // because we don't have the plugin's mainfile path upon construction.
        register_deactivation_hook($addon->get_main_plugin_file(), [$addon, 'deactivation']);
        // call any additional admin_callback functions during load_admin_controller hook
        if (! empty(self::$_settings[ $addon_name ]['admin_callback'])) {
            add_action(
                'AHEE__EE_System__load_controllers__load_admin_controllers',
                [$addon, self::$_settings[ $addon_name ]['admin_callback']]
            );
        }
        return $addon;
    }


    /**
     * @param string   $addon_name
     * @param EE_Addon $addon
     * @since   4.10.13.p
     */
    private static function injectAddonDomain(string $addon_name, EE_Addon $addon)
    {
        if ($addon instanceof RequiresDomainInterface && $addon->domain() === null) {
            // using supplied Domain object
            $domain = self::$_settings[ $addon_name ]['domain'] instanceof DomainInterface
                ? self::$_settings[ $addon_name ]['domain']
                : null;
            // or construct one using Domain FQCN
            if ($domain === null && self::$_settings[ $addon_name ]['domain_fqcn'] !== '') {
                $domain = LoaderFactory::getLoader()->getShared(
                    self::$_settings[ $addon_name ]['domain_fqcn'],
                    [
                        new EventEspresso\core\domain\values\FilePath(
                            self::$_settings[ $addon_name ]['main_file_path']
                        ),
                        EventEspresso\core\domain\values\Version::fromString(
                            self::$_settings[ $addon_name ]['version']
                        ),
                    ]
                );
            }
            if ($domain instanceof DomainInterface) {
                $addon->setDomain($domain);
            }
        }
    }


    /**
     * @return void
     */
    public static function load_pue_update()
    {
        RegisterAddonPUE::loadPueUpdate();
    }


    /**
     * Callback for EE_Brewing_Regular__messages_caf hook used to register message types.
     *
     * @return void
     * @throws EE_Error
     * @since 4.4.0
     */
    public static function register_message_types()
    {
        foreach (self::$_settings as $settings) {
            if (! empty($settings['message_types'])) {
                foreach ((array) $settings['message_types'] as $message_type => $message_type_settings) {
                    EE_Register_Message_Type::register($message_type, $message_type_settings);
                }
            }
        }
    }


    /**
     * This deregisters an addon that was previously registered with a specific addon_name.
     *
     * @param string $addon_name the name for the addon that was previously registered
     * @throws DomainException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @since    4.3.0
     */
    public static function deregister($addon_name = '')
    {
        if (isset(self::$_settings[ $addon_name ]['class_name'])) {
            try {
                do_action('AHEE__EE_Register_Addon__deregister__before', $addon_name);
                $class_name = self::$_settings[ $addon_name ]['class_name'];
                if (! empty(self::$_settings[ $addon_name ]['dms_paths'])) {
                    // setup DMS
                    EE_Register_Data_Migration_Scripts::deregister($addon_name);
                }
                if (! empty(self::$_settings[ $addon_name ]['admin_path'])) {
                    // register admin page
                    EE_Register_Admin_Page::deregister($addon_name);
                }
                if (! empty(self::$_settings[ $addon_name ]['module_paths'])) {
                    // add to list of modules to be registered
                    EE_Register_Module::deregister($addon_name);
                }
                if (
                    ! empty(self::$_settings[ $addon_name ]['shortcode_paths'])
                    || ! empty(self::$_settings[ $addon_name ]['shortcode_fqcns'])
                ) {
                    // add to list of shortcodes to be registered
                    EE_Register_Shortcode::deregister($addon_name);
                }
                if (! empty(self::$_settings[ $addon_name ]['config_class'])) {
                    // if config_class present let's register config.
                    EE_Register_Config::deregister(self::$_settings[ $addon_name ]['config_class']);
                }
                if (! empty(self::$_settings[ $addon_name ]['widget_paths'])) {
                    // add to list of widgets to be registered
                    EE_Register_Widget::deregister($addon_name);
                }
                if (
                    ! empty(self::$_settings[ $addon_name ]['model_paths'])
                    || ! empty(self::$_settings[ $addon_name ]['class_paths'])
                ) {
                    // add to list of shortcodes to be registered
                    EE_Register_Model::deregister($addon_name);
                }
                if (
                    ! empty(self::$_settings[ $addon_name ]['model_extension_paths'])
                    || ! empty(self::$_settings[ $addon_name ]['class_extension_paths'])
                ) {
                    // add to list of shortcodes to be registered
                    EE_Register_Model_Extensions::deregister($addon_name);
                }
                if (! empty(self::$_settings[ $addon_name ]['message_types'])) {
                    foreach ((array) self::$_settings[ $addon_name ]['message_types'] as $message_type => $message_type_settings) {
                        EE_Register_Message_Type::deregister($message_type);
                    }
                }
                // deregister capabilities for addon
                if (
                    ! empty(self::$_settings[ $addon_name ]['capabilities'])
                    || ! empty(self::$_settings[ $addon_name ]['capability_maps'])
                ) {
                    EE_Register_Capabilities::deregister($addon_name);
                }
                // deregister custom_post_types for addon
                if (! empty(self::$_settings[ $addon_name ]['custom_post_types'])) {
                    EE_Register_CPT::deregister($addon_name);
                }
                if (! empty(self::$_settings[ $addon_name ]['payment_method_paths'])) {
                    EE_Register_Payment_Method::deregister($addon_name);
                }
                $addon = EE_Registry::instance()->getAddon($class_name);
                if ($addon instanceof EE_Addon) {
                    remove_action(
                        'deactivate_' . $addon->get_main_plugin_file_basename(),
                        [$addon, 'deactivation']
                    );
                    remove_action(
                        'AHEE__EE_System__perform_activations_upgrades_and_migrations',
                        [$addon, 'initialize_db_if_no_migrations_required']
                    );
                    // remove `after_registration` call
                    remove_action(
                        'AHEE__EE_System__load_espresso_addons__complete',
                        [$addon, 'after_registration'],
                        999
                    );
                }
                EE_Registry::instance()->removeAddon($class_name);
                LoaderFactory::getLoader()->remove($class_name);
            } catch (OutOfBoundsException $addon_not_yet_registered_exception) {
                // the add-on was not yet registered in the registry,
                // so RegistryContainer::__get() throws this exception.
                // also no need to worry about this or log it,
                // it's ok to deregister an add-on before its registered in the registry
            } catch (Exception $e) {
                new ExceptionLogger($e);
            }
            unset(self::$_settings[ $addon_name ]);
            do_action('AHEE__EE_Register_Addon__deregister__after', $addon_name);
        }
    }
}
