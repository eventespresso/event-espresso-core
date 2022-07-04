<?php

/**
 * Use this to register or deregister a new shortcode library for the EE messages system.
 *
 * @package          Event Espresso
 * @subpackage       plugin api, messages
 * @since            4.3.0
 * @author           Darren Ethier
 */
class EE_Register_Messages_Shortcode_Library implements EEI_Plugin_API
{
    /**
     * holds values for registered messages shortcode libraries
     *
     * @var array
     */
    protected static $_ee_messages_shortcode_registry = [];


    /**
     * Helper method for registering a new shortcodes library class for the messages system.
     *
     * Note this is not used for adding shortcodes to existing libraries.  It's for registering anything
     * related to registering a new EE_{shortcode_library_name}_Shortcodes.lib.php class.
     *
     * @param string $identifier                                                    What is the name of this shortcode
     *                                                                              library
     *                                                                              (e.g. 'question_list');
     * @param array  $setup_args                                                    {
     *                                                                              An array of arguments provided for
     *                                                                              registering the new messages
     *                                                                              shortcode library.
     *
     * @type array   $autoloadpaths                                                 An array of paths to add to the
     *       messages autoloader for the new shortcode library class file.
     * @type string  $msgr_validator_callback                                       Callback for a method that will
     *       register the library with the messenger
     *                                                                              _validator_config. Optional.
     * @type string  $msgr_template_fields_callback                                 Callback for changing adding the
     *                                                                              _template_fields property for
     *                                                                              messenger. For example, the
     *                                                                              shortcode library may add a new
     *                                                                              field to the message templates.
     *                                                                              Optional.
     * @type string  $valid_shortcodes_callback                                     Callback for message types
     *                                                                              _valid_shortcodes array setup.
     *                                                                              Optional.
     * @type array   $list_type_shortcodes                                          If there are any specific
     *       shortcodes with this message shortcode library that should be considered "list type" then include them in
     *       an array.  List Type shortcodes are shortcodes that have a corresponding field that indicates how they are
     *       parsed. Optional.
     * }
     * @return void
     * @throws EE_Error
     * @throws EE_Error
     * @since    4.3.0
     *
     */
    public static function register($identifier = '', array $setup_args = [])
    {

        // required fields MUST be present, so let's make sure they are.
        if (empty($identifier) || ! is_array($setup_args) || empty($setup_args['autoloadpaths'])) {
            throw new EE_Error(
                esc_html__(
                    'In order to register a messages shortcode library with EE_Register_Messages_Shortcode_Library::register, you must include a "name" (a unique identifier for this set of message shortcodes), and an array containing the following keys: : "autoload_paths"',
                    'event_espresso'
                )
            );
        }

        // make sure we don't register twice
        if (isset(self::$_ee_messages_shortcode_registry[ $identifier ])) {
            return;
        }

        // make sure this was called in the right place!
        if (
            ! did_action('EE_Brewing_Regular___messages_caf')
            || did_action('AHEE__EE_System__perform_activations_upgrades_and_migrations')
        ) {
            EE_Error::doing_it_wrong(
                __METHOD__,
                sprintf(
                    esc_html__(
                        'Should be only called on the "EE_Brewing_Regular___messages_caf" hook (Trying to register a library named %s).',
                        'event_espresso'
                    ),
                    $identifier
                ),
                '4.3.0'
            );
        }

        self::$_ee_messages_shortcode_registry[ $identifier ] = [
            'autoloadpaths'        => (array) $setup_args['autoloadpaths'],
            'list_type_shortcodes' => ! empty($setup_args['list_type_shortcodes'])
                ? (array) $setup_args['list_type_shortcodes'] : [],
        ];

        // add filters
        add_filter(
            'FHEE__EED_Messages___set_messages_paths___MSG_PATHS',
            ['EE_Register_Messages_Shortcode_Library', 'register_msgs_autoload_paths'],
            10
        );

        // add below filters if the required callback is provided.
        if (! empty($setup_args['msgr_validator_callback'])) {
            add_filter('FHEE__EE_messenger__get_validator_config', $setup_args['msgr_validator_callback'], 10, 2);
        }

        if (! empty($setup_args['msgr_template_fields_callback'])) {
            add_filter('FHEE__EE_messenger__get_template_fields', $setup_args['msgr_template_fields_callback'], 10, 2);
        }

        if (! empty($setup_args['valid_shortcodes_callback'])) {
            add_filter('FHEE__EE_Messages_Base__get_valid_shortcodes', $setup_args['valid_shortcodes_callback'], 10, 2);
        }

        if (! empty($setup_args['list_type_shortcodes'])) {
            add_filter(
                'FHEE__EEH_Parse_Shortcodes___parse_message_template__list_type_shortcodes',
                ['EE_Register_Messages_Shortcode_Library', 'register_list_type_shortcodes'],
                10
            );
        }
    }


    /**
     * This deregisters any messages shortcode library previously registered with the given name.
     *
     * @param string $identifier name used to register the shortcode library.
     * @return  void
     * @since    4.3.0
     */
    public static function deregister($identifier = '')
    {
        unset(self::$_ee_messages_shortcode_registry[ $identifier ]);
    }


    /**
     * callback for FHEE__EED_Messages___set_messages_paths___MSG_PATHS filter.
     *
     * @param array $paths array of paths to be checked by EE_messages autoloader.
     * @return array
     * @since    4.3.0
     *
     */
    public static function register_msgs_autoload_paths(array $paths)
    {

        if (! empty(self::$_ee_messages_shortcode_registry)) {
            foreach (self::$_ee_messages_shortcode_registry as $st_reg) {
                if (empty($st_reg['autoloadpaths'])) {
                    continue;
                }
                $paths = array_merge($paths, $st_reg['autoloadpaths']);
            }
        }

        return $paths;
    }


    /**
     * This is the callback for the FHEE__EEH_Parse_Shortcodes___parse_message_template__list_type_shortcodes
     * filter which is used to add additional list type shortcodes.
     *
     * @param array $original_shortcodes
     * @return  array                                   Modifications to original shortcodes.
     * @since 4.3.0
     *
     */
    public static function register_list_type_shortcodes(array $original_shortcodes)
    {
        if (empty(self::$_ee_messages_shortcode_registry)) {
            return $original_shortcodes;
        }

        foreach (self::$_ee_messages_shortcode_registry as $sc_reg) {
            if (! empty($sc_reg['list_type_shortcodes'])) {
                $original_shortcodes = array_merge($original_shortcodes, $sc_reg['list_type_shortcodes']);
            }
        }

        return $original_shortcodes;
    }
}
