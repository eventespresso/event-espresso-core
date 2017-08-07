<?php

use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\services\collections\CollectionInterface;
use EventEspresso\core\services\loaders\LoaderFactory;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct access allowed.');

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
    protected static $_settings = array();


    /**
     *    Method for registering new EE_Shortcodes
     *
     * @since    4.3.0
     * @since    4.9.46.rc.025  for the new `shortcode_fqcns` array argument.
     * @param string $shortcode_id a unique identifier for this set of modules Required.
     * @param  array $setup_args   an array of arguments provided for registering shortcodes Required.
     *               @type array shortcode_paths        an array of full server paths to folders containing any
     *                                                  EES_Shortcodes
     *               @type array shortcode_fqcns        an array of fully qualified class names for any new shortcode
     *                                                  classes to register.  Shortcode classes should extend
     *                                                  EspressoShortcode and be properly namespaced so they are
     *                                                  autoloaded.
     * @throws EE_Error
     * @return void
     */
    public static function register($shortcode_id = null, $setup_args = array())
    {
        //required fields MUST be present, so let's make sure they are.
        if (empty($shortcode_id)
            || ! is_array($setup_args)
            || (
                empty($setup_args['shortcode_paths']))
                && empty($setup_args['shortcode_fqcns'])
            ) {
            throw new EE_Error(
                esc_html__(
                    'In order to register Modules with EE_Register_Shortcode::register(), you must include a "shortcode_id" (a unique identifier for this set of shortcodes), and an array containing the following keys: "shortcode_paths" (an array of full server paths to folders that contain shortcodes, or to the shortcode files themselves)',
                    'event_espresso'
                )
            );
        }

        //make sure we don't register twice
        if (isset(self::$_settings[$shortcode_id])) {
            return;
        }

        //make sure this was called in the right place!
        if (! did_action('AHEE__EE_System__load_espresso_addons')
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
        //setup $_settings array from incoming values.
        self::$_settings[$shortcode_id] = array(
            // array of full server paths to any EES_Shortcodes used by the shortcode
            'shortcode_paths' => isset($setup_args['shortcode_paths'])
                ? (array) $setup_args['shortcode_paths']
                : array(),
            'shortcode_fqcns' => isset($setup_args['shortcode_fqcns'])
                ? (array) $setup_args['shortcode_fqcns']
                : array()
        );
        // add to list of shortcodes to be registered
        add_filter(
            'FHEE__EE_Config__register_shortcodes__shortcodes_to_register',
            array('EE_Register_Shortcode', 'add_shortcodes')
        );

        add_filter(
            'FHEE__EventEspresso_core_services_shortcodes_ShortcodesManager__registerShortcodes__shortcode_collection',
            array('EE_Register_Shortcode', 'instantiateAndAddToShortcodeCollection')
        );
    }


    /**
     * Filters the list of shortcodes to add ours.
     * and they're just full filepaths to FOLDERS containing a shortcode class file. Eg.
     * array('espresso_monkey'=>'/public_html/wonder-site/wp-content/plugins/ee4/shortcodes/espresso_monkey',...)
     *
     * @param array $shortcodes_to_register array of paths to all shortcodes that require registering
     * @return array
     */
    public static function add_shortcodes($shortcodes_to_register)
    {
        foreach (self::$_settings as $settings) {
            $shortcodes_to_register = array_merge($shortcodes_to_register, $settings['shortcode_paths']);
        }
        return $shortcodes_to_register;
    }


    /**
     * Hooks into FHEE__EventEspresso_core_services_shortcodes_ShortcodesManager__registerShortcodes__shortcode_collection
     * and registers any provided shortcode fully qualified class names.
     * @param CollectionInterface $shortcodes_collection
     * @return CollectionInterface
     * @throws InvalidArgumentException
     * @throws InvalidClassException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    public static function instantiateAndAddToShortcodeCollection(CollectionInterface $shortcodes_collection)
    {
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
                        //register dependencies
                        EE_Dependency_Map::register_dependencies(
                            $shortcode_fqcn,
                            array(
                                'EventEspresso\core\services\cache\PostRelatedCacheManager' => EE_Dependency_Map::load_from_cache,
                            )
                        );
                    }
                    $shortcodes_collection->add(LoaderFactory::getLoader()->getShared($shortcode_fqcn));
                }
            }
        }
        return $shortcodes_collection;
    }


    /**
     * This deregisters a shortcode that was previously registered with a specific $shortcode_id.
     *
     * @since    4.3.0
     * @param string $shortcode_id the name for the shortcode that was previously registered
     * @return void
     */
    public static function deregister($shortcode_id = null)
    {
        if (isset(self::$_settings[$shortcode_id])) {
            unset(self::$_settings[$shortcode_id]);
        }
    }
}
