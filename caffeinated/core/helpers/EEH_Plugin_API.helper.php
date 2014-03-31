<?php
/**
 * This file contains the EEH_Plugin_API helper class.
 * @package      Event Espresso
 * @subpackage helpers
 * @since           4.4.0
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

/**
 * A helper class containing methods for easily registering COMPLETE components in the EE system.
 *
 * Used internally by EE for registering some caffeinated components, and provided as an easy
 * method for plugins to register entire components.  To be clear, there are certain systems in EE
 * where implementing them for a plugin requires multiple actions and filters being hooked into.
 * Within this class are wrappers for "registering" with a few parameters and then the registry
 * method
 * will take care of setting up all the required filters and hooks for that system to be successfully
 * hooked into.
 *
 * @package        Event Espresso
 * @subpackage  helpers
 * @since            4.4.0
 * @author          Darren Ethier
 */
class EEH_Plugin_API {

    /**
     * Holds registered EE_Admin_Pages
     * @var array
     */
    protected static $_ee_admin_page_registry = array();


    /**
     * Holds values for registered message types
     * @var array
     */
    protected static $_ee_message_type_registry = array();



    /**
     * The purpose of this method is to provide an easy way for addons to register their admin pages (
     * using the EE Admin Page loader system).
     *
     * @since 4.4.0
     *
     * @param  string $page_basename    This string represents the basename of the Admin Page
     *                                                        init.  The init file must use this basename in its name and
     *                                                        class (i.e. {page_basename}_Admin_Page_Init.core.php).
     * @param  string $page_path             This is the path where the registered admin pages reside (
     *                                                         used to setup autoloaders).
     * @param  array  $config                   An array of extra configuration options (optional) that will
     *                                                        be used in different circumstances (@todo this is currently
     *                                                        in flux, hence why we have an array so people can use
     *                                                        implemented options and at a later date we can add
     *                                                        additional ones without messing up existing usage)
     * @return void
     */
    public static function register_ee_admin_page( $page_basename, $page_path, $config = array() ) {

        if ( ! did_action( 'AHEE__EE_Admin__loaded' ) || did_action( 'AHEE__EE_System__initialize_last' )) {
            EE_Error::doing_it_wrong('EEH_Plugin_API::register_ee_admin_page', __('Should be only called on the "AHEE__EE_Admin__loaded" hook.','event_espresso'), '4.1' );
        }

        //add incoming stuff to our registry property
        self::$_ee_admin_page_registry[$page_basename] = array(
            'page_path' => $page_path,
            'config' => $config
            );

        //add filters but only if they haven't already been added otherwise we'll get duplicate filters added - not good.
        if ( ! has_filter( 'FHEE__EE_Admin_Page_Loader___get_installed_pages__installed_refs', array( 'EEH_Plugin_API', 'set_page_basename') ) ) {

            add_filter('FHEE__EE_Admin_Page_Loader___get_installed_pages__installed_refs', array( 'EEH_Plugin_API', 'set_page_basename' ), 10 );
            add_filter('FHEE__EEH_Autoloader__load_admin_core', array( 'EEH_Plugin_API', 'set_page_path' ), 10 );
        }

    }


    public static function set_page_basename( $installed_refs ) {
        foreach ( self::$_ee_admin_page_registry as $basename => $args ) {
            $installed_refs[] = $basename;
        }
        return $installed_refs;
    }



    public static function set_page_path( $paths ) {
        foreach ( self::$_ee_admin_page_registry as $basename => $args ) {
            $paths[] = $args['page_path'];
        }
        return $paths;
    }



    /**
     * Method for registering new message types in the EE_messages system.
     *
     * Note:  All message types must have the following files in order to work:
     *
     * - EE_Message_Template_Defaults extended class(es). (see /core/libraries/messages/defaults
     *     for examples).  Note, how there is a default class for each messenger/messagetype combo.
     *     This class is used for defining how the default templates get setup.
     * - Template files for default templates getting setup (or you can define it all in the above
     *      Default class).  See /core/libraries/messages/message_type/assets/defaults/ for examples.
     * - EE_Messages_Validator extended class(es).  See /core/libraries/messages/validators/email/
     *      for examples.  Note for any new message types, there will need to be a validator for each
     *      messenger combo this message type can activate with.
     * - And of course the main EE_{Message_Type_Name}_message_type class that defines the new
     *      message type and its properties.
     *
     * @since   4.4.0
     *
     * @param  array  $setup_args  {
     *        An array of arguments provided for registering the message type.
     *
     *        @type string $mtname                               Whatever is defined for the $name property of
     *                                                                          the message type you are registering (eg.
     *                                                                          declined_registration). Required.
     *        @type string $mtfilename                          The filename of the message type being
     *                                                                          registered.  This will be the main
     *                                                                          EE_{Messagetype_Name}_message_type class. (
     *                                                                          eg. EE_Declined_Registration_message_type.
     *                                                                          class.php). Required.
     *        @type array $autoloadpaths                       An array of paths to add to the messages
     *                                                                          autoloader for the new message type. Required.
     *        @type array $messengers_to_activate_with An array of messengers that this message
     *                                                                          type should activate with. Each value in the
     *                                                                          array should match the name property of a
     *                                                                          EE_messenger. Optional.
     *        @type array $template_fields {
     *              An array of arguments for any extra template fields this message type needs to
     *              register. Each key in the array corresponds to the name of the messenger the field is
     *              used with.
     *              @type array $messenger {
     *                    Each key in this array corresponds to the name of the field being added.  Note,
     *                    that it's possible this could be a nested array itself (e.g.
     *                    ['extra']['content']['some_list'])
     *                    @type array $fieldname {
     *                          @see EEH_Form_Fields::get_form_fields() for detailed descripion the keys.
     *                          @type string $input                         What type of input ('textarea', 'text' etc.)
     *                          @type string $label                         What is used for the label of the field.
     *                          @type string $type                          Data type for the field
     *                          @type bool   $required                    If required.
     *                          @type bool   $validation                  Do validation?
     *                          @type string $format                      '%s' or '%d' or '%f'
     *                          @type string $css_class                   what to use for css class
     *                          @type string $rows                         If text area then how many rows?
     *                          @type array  $shortcodes_required An array of shortcodes that must be
     *                                                                                available for this template in order for this
     *                                                                                field to show.
     *                    }
     *              }
     *        }
     * }
     * @return void
     */
    public static function register_new_message_type( $setup_args = array()  ) {
        //required fields MUST be present, so let's make sure they are.
        if ( ! is_array( $setup_args ) || empty( $setup_args['mtname'] ) || empty( $setup_args['mtfilename'] ) || empty( $setup_args['autoload_paths'] ) )
            throw new EE_Error( __( 'In order to register a message type with EEH_Plugin_API::register_new_message_type, you must include an array that contains the following keys: "mtname", "mtfilename", "autoload_paths"', 'event_espresso' ) );

        $mtname = (string) $setup_args['mtname'];
        //setup $__ee_message_type_registry array from incoming values.
        self::$_ee_message_type_registry[$mtname] = array(
            'mtfilename' => (string) $setup_args['mtfilename'],
            'autoloadpaths' => (array) $setup_args['autoloadpaths'],
            'messengers_to_activate_with' => ! empty( $setup_args['messengers_to_activate_with'] ) ? (array) $setup_args['messengers_to_activate_with'] : array(),
            'template_fields' => ! empty( $setup_args['template_fields'] ) ? (array) $setup_args['template_fields'] : array();
            );

        //add filters but only if they haven't already been added otherwise we'll get duplicate filters added - not good.
        if ( ! has_filter( 'FHEE__EE_messages__get_installed__messagetype_files', array( 'EEH_Plugin_API', 'register_messagetype_files') ) ) {
            add_filter('FHEE__EE_messages__get_installed__messagetype_files', array( 'EEH_Plugin_API', 'register_messagetype_files'), 10, 2 );
            add_filter( 'FHEE__EE_Messages_Init__autoload_messages__dir_ref', array( 'EEH_Plugin_API', 'register_mt_autoload_paths'), 10 );
            add_filter( 'FHEE__EE_messenger__get_default_message_types__default_types', array( 'EEH_Plugin_API', 'register_messengers_to_activate_mt_with'), 10, 2 );
            add_filter( 'FHEE__EE_messenger__get_template_fields', array( 'EEH_Plugin_API', 'register_messenger_template_fields'), 10, 2 );
        }
    }



    /**
     * callback for FHEE__EE_messages__get_installed__messagetype_files filter.
     *
     * @since   4.4.0
     *
     * @param  array  $messagetype_files The current array of message type file names
     * @param  array  $type                      This is a string that indicates what type is requested.  It
     *                                                        could be either 'messengers', 'message_types', or 'all'.
     * @return  array                                 Array of message type file names
     */
    public static function register_messagetype_files( $messagetype_files, $type ) {
        if ( empty( self::$_ee_message_type_registry ) )
            return $messagetype_files;

        foreach ( self::$_ee_message_type_registry as $mt_reg ) {
            if ( empty( $mt_reg['mtfilenames' ] ) )
                continue;
            $messagetype_files[] = $mt_reg['mtfilename'];
        }

        return $messagetype_files;
    }





    /**
     * callback for FHEE__EE_Messages_Init__autoload_messages__dir_ref filter.
     *
     * @since    4.4.0
     *
     * @param array $paths array of paths to be checked by EE_messages autoloader.
     * @return array
     */
    public static function register_mt_autoload_paths( $paths ) {
        if ( empty( self::$_ee_message_type_registry ) )
            return $paths;

        foreach ( self::$_ee_message_type_registry as $mt_reg ) {
            if ( empty( $mt_reg['autoloadpaths'] ) )
                continue;
            $paths = array_merge( $paths, $mt_reg['autoloadpaths'] );
        }

        return $paths;
    }





    /**
     * callback for FHEE__EE_messenger__get_default_message_types__default_types filter.
     *
     * @since   4.4.0
     *
     *
     * @param  array                $default_types array of message types activated with messenger (
     *                                                               corresponds to the $name property of message type)
     * @param  EE_messenger $messenger      The EE_messenger the filter is called from.
     * @return  array
     */
    public static function register_messengers_to_activate_mt_with( $default_types, EE_messenger $messenger ) {
        if ( empty( self::$_ee_message_type_registry ) )
            return $default_types;

        foreach ( self::$_ee_message_type_registry as $mtname => $mt_reg ) {
            if ( empty( $mt_reg['messengers_to_activate_with'] ) || empty( $mt_reg['mtfilenames'] ) )
                continue;

            //loop through each of the messengers and if it matches the loaded class then we add this message type to the
            foreach ( $mt_reg['messengers_to_activate_with'] as $msgr ) {
                if ( $messenger->name == $msgr ) {
                    $default_types[] = $mtname;
                }
            }
        }

        return $default_types;
    }



    /**
     * callback for FHEE__EE_messenger__get_template_fields filter.
     *
     * This is used to add any additional template fields to the messenger for template generation.
     *
     * @since    4.4.0
     *
     * @param  array               $template_fields the original array of template fields.
     * @param  EE_messenger $messenger        EE_messenger object.
     * @return  array                                          new array of template fields.
     */
    public static function register_messenger_template_fields( $template_fields, EE_messenger $messenger ) {
        if ( empty( self::$_ee_message_type_registry ) )
            return $template_fields;

        //loop through each registry item and if there is a template_field array matching this messenger then we add fields.
        foreach ( self::$_ee_message_type_registry as $mtname => $mtreg ) {
            if ( empty( $mtreg['template_fields'] ) )
                continue;
            foreach ( $mtreg['template_fields'] as $msgr_name => $new_fields ) {
                if ($msgr_name == $messenger->name )
                    $template_fields = array_merge( $template_fields, $new_fields );
            }
        }
        return $template_fields;
    }


}
