<?php

use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\CollectionInterface;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Class EE_Register_Shortcode
 * EEI_Plugin_API class for registering shortcodes for use with EE core.
 * Receives an array of shortcode details and takes care of adding all of the necessary hooks and filters to integrate
 * with EE core
 *
 * @package               Event Espresso
 * @subpackage            plugin api
 * @since                 4.3.0
 * @author                Brent Christensen
 */
class EE_Register_Shortcode implements EEI_Plugin_API
{

    /**
     * Holds values for registered shortcodes
     *
     * @var array
     */
    protected static $_settings = [];


    /**
     *    Method for registering new EE_Shortcodes
     *
     * @param string $addon_name    a unique identifier for this set of modules Required.
     * @param array  $setup_args    an array of arguments provided for registering shortcodes Required.
     * @type array shortcode_paths  an array of full server paths to folders containing any EES_Shortcodes
     * @type array shortcode_fqcns  an array of fully qualified class names for any new shortcode classes to register.
     *                              Shortcode classes should extend EspressoShortcode
     *                              and be properly namespaced so they are autoloaded.
     * @return bool
     * @throws EE_Error
     * @since    4.3.0
     * @since    4.9.46.rc.025  for the new `shortcode_fqcns` array argument.
     */
    public static function register(string $addon_name = '', array $setup_args = []): bool
    {
        // required fields MUST be present, so let's make sure they are.
        if (empty($addon_name)
            || ! is_array($setup_args)
            || (
                empty($setup_args['shortcode_paths'])
            )
               && empty($setup_args['shortcode_fqcns'])
        ) {
            throw new EE_Error(
                esc_html__(
                    'In order to register Modules with EE_Register_Shortcode::register(), you must include a "shortcode_id" (a unique identifier for this set of shortcodes), and an array containing the following keys: "shortcode_paths" (an array of full server paths to folders that contain shortcodes, or to the shortcode files themselves)',
                    'event_espresso'
                )
            );
        }

        // make sure we don't register twice
        if (isset(self::$_settings[ $addon_name ])) {
            return true;
        }

        // make sure this was called in the right place!
        if (
            ! did_action('AHEE__EE_System__load_espresso_addons')
            || did_action('AHEE__EE_System__register_shortcodes_modules_and_widgets')
        ) {
            EE_Error::doing_it_wrong(
                __METHOD__,
                esc_html__(
                    'An attempt to register shortcodes has failed because it was not registered at the correct time.  Please use the "AHEE__EE_System__register_shortcodes_modules_and_widgets" hook to register shortcodes.',
                    'event_espresso'
                ),
                '4.3.0'
            );
        }
        // setup $_settings array from incoming values.
        self::$_settings[ $addon_name ] = [
            // array of full server paths to any EES_Shortcodes used by the shortcode
            'shortcode_paths' => isset($setup_args['shortcode_paths'])
                ? (array) $setup_args['shortcode_paths']
                : [],
            'shortcode_fqcns' => isset($setup_args['shortcode_fqcns'])
                ? (array) $setup_args['shortcode_fqcns']
                : [],
        ];
        // add to list of shortcodes to be registered
        add_filter(
            'FHEE__EE_Config__register_shortcodes__shortcodes_to_register',
            ['EE_Register_Shortcode', 'add_shortcodes']
        );

        add_filter(
            'FHEE__EventEspresso_core_services_shortcodes_ShortcodesManager__registerShortcodes__shortcode_collection',
            ['EE_Register_Shortcode', 'instantiateAndAddToShortcodeCollection']
        );
        return true;
    }


    /**
     * Filters the list of shortcodes to add ours.
     * and they're just full filepaths to FOLDERS containing a shortcode class file. Eg.
     * array('espresso_monkey'=>'/public_html/wonder-site/wp-content/plugins/ee4/shortcodes/espresso_monkey'...)
     *
     * @param array $shortcodes_to_register array of paths to all shortcodes that require registering
     * @return array
     */
    public static function add_shortcodes(array $shortcodes_to_register): array
    {
        $shortcode_paths = [];
        foreach (self::$_settings as $settings) {
            $shortcode_paths[] = $settings['shortcode_paths'];
        }
        return array_merge($shortcodes_to_register, ...$shortcode_paths);
    }


    /**
     * Hooks into
     * FHEE__EventEspresso_core_services_shortcodes_ShortcodesManager__registerShortcodes__shortcode_collection and
     * registers any provided shortcode fully qualified class names.
     *
     * @param CollectionInterface $shortcodes_collection
     * @return CollectionInterface
     * @throws InvalidArgumentException
     * @throws InvalidClassException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function instantiateAndAddToShortcodeCollection(
        CollectionInterface $shortcodes_collection
    ): CollectionInterface {
        foreach (self::$_settings as $settings) {
            if (! empty($settings['shortcode_fqcns'])) {
                foreach ($settings['shortcode_fqcns'] as $shortcode_fqcn) {
                    if (! class_exists($shortcode_fqcn)) {
                        throw new InvalidClassException(
                            sprintf(
                                esc_html__(
                                    'Are you sure %s is the right fully qualified class name for the shortcode class?',
                                    'event_espresso'
                                ),
                                $shortcode_fqcn
                            )
                        );
                    }
                    if (! EE_Dependency_Map::instance()->has_dependency_for_class($shortcode_fqcn)) {
                        // register dependencies
                        EE_Dependency_Map::register_dependencies(
                            $shortcode_fqcn,
                            [
                                'EventEspresso\core\services\cache\PostRelatedCacheManager' => EE_Dependency_Map::load_from_cache,
                            ]
                        );
                    }
                    $shortcodes_collection->add(LoaderFactory::getLoader()->getShared($shortcode_fqcn));
                }
            }
        }
        return $shortcodes_collection;
    }


    /**
     * This deregisters a shortcode that was previously registered with a specific $addon_name.
     *
     * @param string $addon_name the name for the shortcode that was previously registered
     * @return void
     * @since    4.3.0
     */
    public static function deregister(string $addon_name = '')
    {
        unset(self::$_settings[ $addon_name ]);
    }
}
