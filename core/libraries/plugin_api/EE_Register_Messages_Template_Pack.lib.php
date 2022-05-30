<?php

/**
 * Use this to register or deregister a new message template pack for the EE messages system.
 *
 * @package          Event Espresso
 * @subpackage       plugin api, messages
 * @since            4.5.0
 * @author           Darren Ethier
 */
class EE_Register_Messages_Template_Pack implements EEI_Plugin_API
{
    /**
     * Holds values for registered template pack
     *
     * @since 4.5.0
     *
     * @var array
     */
    protected static $_registry = [];


    /**
     * Used to register a new template pack with the messages system.
     *
     * Template packs are primarily defined via class extending EE_Messages_Template_Pack and are typically used to
     * change entire layouts for a set of message templates.  This method is used to register the new template pack and
     * automatically have it loaded in the appropriate places.
     *
     * This registry also verifies that there isn't already a template pack registered with the same name and if there
     * is then it will add an EE_Error notice.
     *
     * Note that this only handles registering the your Template Pack class with the message template pack system.
     * However, there is also a naming schema you must follow for templates you are providing with your template pack.
     *
     * @param string $identifier The internal reference used to refer to this template pack.  Note, this is first come,
     *                           first serve.  If there is already a template pack registered with this name then the
     *                           registry will assign a unique reference for it so it can still be activated (but this
     *                           makes it harder to deregister as it will be unique per load - so its best to try to
     *                           make this a unique string!)
     * @param array  $setup_args array {
     *                           An array of required values for registering the template pack.
     * @type string  $path       The path for the new template pack class.
     * @type string  $classname  The name of the new Template Pack Class.
     *                           }
     *
     * @return void
     * @throws EE_Error
     *
     * @see    core/libraries/messages/defaults/default/* for all the example templates the default template pack
     *         supports.
     *
     *
     * @since  4.5.0
     * @see    EE_Messages_Template_Pack_Default for an example class
     */
    public static function register($identifier = '', array $setup_args = [])
    {

        // check for required params
        if (empty($identifier) || empty($setup_args['path']) || empty($setup_args['classname'])) {
            throw new EE_Error(
                esc_html__(
                    'In order to register a new template pack for the EE Messages system, you must include a value to reference the template pack being registered and the setup_args must have the path for the new template pack class as well as the classname for the new Template Pack Class. ',
                    'event_espresso'
                )
            );
        }

        // make sure we don't register twice
        if (isset(self::$_registry[ $identifier ])) {
            return;
        }

        // check that incoming $identifier doesn't already exist. If it does then we'll create a unique reference for this template pack.
        if (isset(self::$_registry[ $identifier ])) {
            $identifier = uniqid() . '_' . $identifier;
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
                        'A EE Messages Template Pack given the reference "%s" has been attempted to be registered with the EE Messages System.  It may or may not work because it should be only called on the "EE_Brewing_Regular__messages_caf" hook.',
                        'event_espresso'
                    ),
                    $identifier
                ),
                '4.5.0'
            );
        }

        if (self::_verify_class_not_exist($setup_args['classname'])) {
            self::$_registry[ $identifier ] = [
                'path'      => (string) $setup_args['path'],
                'classname' => (string) $setup_args['classname'],
            ];
        }

        // hook into the system
        add_filter(
            'FHEE__EED_Messages___set_messages_paths___MSG_PATHS',
            ['EE_Register_Messages_Template_Pack', 'set_template_pack_path'],
            10
        );
        add_filter(
            'FHEE__EED_Messages__get_template_packs__template_packs',
            ['EE_Register_Messages_Template_Pack', 'set_template_pack'],
            10
        );
    }


    /**
     * Callback for the FHEE__EED_Messages___set_messages_paths___MSG_PATHS filter.  This adds this template packs path
     * to the messages autoloader paths.
     *
     * @param array $paths Array of paths already registered with the messages autoloader
     *
     * @return array
     * @since  4.5.0
     *
     */
    public static function set_template_pack_path(array $paths)
    {
        foreach (self::$_registry as $args) {
            $paths[] = $args['path'];
        }
        return $paths;
    }


    /**
     * Callback for the FHEE__EED_Messages__get_template_packs__template_packs filter. This adds the instantiated,
     * registered template pack to the template packs array when requested by client code.
     *
     * @param EE_Messages_Template_Pack[] $template_packs
     * @return EE_Messages_Template_Pack[]
     * @since 4.5.0
     *
     */
    public static function set_template_pack(array $template_packs)
    {
        foreach (self::$_registry as $args) {
            // verify class_exists
            if (! class_exists($args['classname'])) {
                require_once($args['path'] . '/' . $args['classname'] . '.class.php');
            }

            // check again!
            if (class_exists($args['classname'])) {
                $template_pack                           = new $args['classname']();
                $template_packs[ $template_pack->dbref ] = $template_pack;
            }
        }

        return $template_packs;
    }


    /**
     * This verifies that the classes for each registered template pack are unique  names.
     *
     * @param string $classname The classname being checked
     *
     * @return bool
     */
    private static function _verify_class_not_exist($classname)
    {
        // loop through the existing registry and see if the classname is already present.
        foreach (self::$_registry as $args) {
            if ($args['classname'] == $classname) {
                EE_Error::add_error(
                    sprintf(
                        esc_html__(
                            'The %s template pack that you just activated cannot be registered with the messages system because there is already a template pack active using the same classname.  Contact the author of this template pack to let them know of the conflict.  To stop seeing this message you will need to deactivate this template pack.',
                            'event_espresso'
                        ),
                        $classname
                    ),
                    __FILE__,
                    __LINE__,
                    __FUNCTION__
                );
                return false;
            }
        }
        return true;
    }


    /**
     * This deregisters a variation set that was previously registered with the given slug.
     *
     * @param string $identifier The name for the variation set that was previously registered.
     *
     * @return void
     * @since 4.5.0
     *
     */
    public static function deregister($identifier = '')
    {
        unset(self::$_registry[ $identifier ]);
    }
}
