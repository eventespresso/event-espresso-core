<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Use this to register new capabilities for the EE capabilities system.
 *
 * @package          Event Espresso
 * @subpackage       plugin api, capabilities
 * @since            4.5.0
 * @author           Darren Ethier
 */
class EE_Register_Capabilities implements EEI_Plugin_API
{

    /**
     * Holds the settings for a specific registration.
     *
     * @var array
     */
    protected static $_registry = [];


    /**
     * Used to register capability items with EE core.
     *
     * @param string $identifier                                                          usually will be a class name
     *                                                                                    that references capability
     *                                                                                    related items setup for
     *                                                                                    something.
     * @param array  $setup_args                                                          {
     *                                                                                    An array of items related to
     *                                                                                    registering capabilities.
     * @type array   $capabilities                                                        An array mapping capability
     *                                                                                    strings to core WP Role.
     *                                                                                    Something like: array(
     *                                                                                    'administrator'    => array(
     *                                                                                    'read_cap', 'edit_cap',
     *                                                                                    'delete_cap'),
     *                                                                                    'author'                =>
     *                                                                                    array( 'read_cap' )
     *                                                                                    ).
     * @type array   $capability_maps                                                     EE_Meta_Capability_Map[]
     * @return void
     * @throws EE_Error
     * @since 4.5.0
     * @see   EE_Capabilities.php for php docs on these objects.
     *                                                                                    Should be indexed by the
     *                                                                                    classname for the capability
     *                                                                                    map and values representing
     *                                                                                    the arguments for the map.
     *                                                                                    }
     */
    public static function register($identifier = '', array $setup_args = [])
    {
        // required fields MUST be present, so let's make sure they are.
        if ($identifier === null || ! is_array($setup_args) || empty($setup_args['capabilities'])) {
            throw new EE_Error(
                esc_html__(
                    'In order to register capabilities with EE_Register_Capabilities::register, you must include a unique name to reference the capabilities being registered, plus an array containing the following keys: "capabilities".',
                    'event_espresso'
                )
            );
        }
        // make sure we don't register twice
        if (isset(self::$_registry[ $identifier ])) {
            return;
        }
        // make sure this is not registered too late or too early.
        if (
            ! did_action('AHEE__EE_System__load_espresso_addons')
            || did_action('AHEE__EE_System___detect_if_activation_or_upgrade__begin')
        ) {
            EE_Error::doing_it_wrong(
                __METHOD__,
                sprintf(
                    esc_html__(
                        '%s has been registered too late.  Please ensure that EE_Register_Capabilities::register has been called at some point before the "AHEE__EE_System___detect_if_activation_or_upgrade__begin" action hook has been called.',
                        'event_espresso'
                    ),
                    $identifier
                ),
                '4.5.0'
            );
        }
        // some preliminary sanitization and setting to the $_registry property
        self::$_registry[ $identifier ] = [
            'caps'     => isset($setup_args['capabilities']) && is_array($setup_args['capabilities'])
                ? $setup_args['capabilities']
                : [],
            'cap_maps' => isset($setup_args['capability_maps']) ? $setup_args['capability_maps'] : [],
        ];
        // set initial caps (note that EE_Capabilities takes care of making sure that the caps get added only once)
        add_filter(
            'FHEE__EE_Capabilities__addCaps__capabilities_to_add',
            ['EE_Register_Capabilities', 'register_capabilities']
        );
        // add filter for cap maps
        add_filter(
            'FHEE__EE_Capabilities___set_meta_caps__meta_caps',
            ['EE_Register_Capabilities', 'register_cap_maps']
        );
    }


    /**
     * callback for FHEE__EE_Capabilities__init_caps_map__caps filter.
     * Takes care of registering additional capabilities to the caps map.   Note, that this also on the initial
     * registration ensures that new capabilities are added to existing roles.
     *
     * @param array $incoming_caps The original caps map.
     * @return array merged in new caps.
     */
    public static function register_capabilities(array $incoming_caps)
    {
        foreach (self::$_registry as $caps_and_cap_map) {
            $incoming_caps = array_merge_recursive($incoming_caps, $caps_and_cap_map['caps']);
        }
        return $incoming_caps;
    }


    /**
     * Callback for the 'FHEE__EE_Capabilities___set_meta_caps__meta_caps' filter which registers an array of
     * capability maps for the WP meta_caps filter called in EE_Capabilities.
     *
     * @param EE_Meta_Capability_Map[] $cap_maps The existing cap maps array.
     * @return EE_Meta_Capability_Map[]
     * @throws EE_Error
     * @since 4.5.0
     */
    public static function register_cap_maps(array $cap_maps)
    {
        // loop through and instantiate cap maps.
        foreach (self::$_registry as $identifier => $setup) {
            if (! isset($setup['cap_maps'])) {
                continue;
            }
            foreach ($setup['cap_maps'] as $cap_class => $args) {

                /**
                 * account for cases where capability maps may be indexed
                 * numerically to allow for the same map class to be utilized
                 * In those cases, maps will be setup in an array like:
                 * array(
                 *    0 => array( 'EE_Meta_Capability' => array(
                 *        'ee_edit_cap', array( 'Object_Name',
                 *        'ee_edit_published_cap',
                 *        'ee_edit_others_cap', 'ee_edit_private_cap' )
                 *        ) )
                 *    1 => ...
                 * )
                 * instead of:
                 * array(
                 *    'EE_Meta_Capability' => array(
                 *        'ee_edit_cap', array( 'Object_Name',
                 *        'ee_edit_published_cap',
                 *        'ee_edit_others_cap', 'ee_edit_private_cap' )
                 *        ),
                 *    ...
                 * )
                 */
                if (is_numeric($cap_class)) {
                    $cap_class = key($args);
                    $args      = $args[ $cap_class ];
                }

                if (! class_exists($cap_class)) {
                    throw new EE_Error(
                        sprintf(
                            esc_html__(
                                'An addon (%s) has tried to register a capability map improperly.  Capability map arrays must be indexed by capability map classname, and an array for the class arguments',
                                'event_espresso'
                            ),
                            $identifier
                        )
                    );
                }

                if (count($args) !== 2) {
                    throw new EE_Error(
                        sprintf(
                            esc_html__(
                                'An addon (%s) has tried to register a capability map improperly.  Capability map arrays must be indexed by capability map classname, and an array for the class arguments.  The array should have two values the first being a string and the second an array.',
                                'event_espresso'
                            ),
                            $identifier
                        )
                    );
                }
                $cap_maps[] = new $cap_class($args[0], $args[1]);
            }
        }
        return $cap_maps;
    }


    /**
     * @param string $identifier
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function deregister($identifier = '')
    {
        if (! empty(self::$_registry[ $identifier ])) {
            if (! empty(self::$_registry[ $identifier ]['caps'])) {
                // if it's too early to remove capabilities, wait to do this until core is loaded and ready
                $caps_to_remove = self::$_registry[ $identifier ]['caps'];
                if (did_action('AHEE__EE_System__core_loaded_and_ready')) {
                    $capabilities = LoaderFactory::getLoader()->getShared('EE_Capabilities');
                    $capabilities->removeCaps($caps_to_remove);
                } else {
                    add_action(
                        'AHEE__EE_System__core_loaded_and_ready',
                        function () use ($caps_to_remove) {
                            $capabilities = LoaderFactory::getLoader()->getShared('EE_Capabilities');
                            $capabilities->removeCaps($caps_to_remove);
                        }
                    );
                }
            }
        }
        unset(self::$_registry[ $identifier ]);
    }
}
