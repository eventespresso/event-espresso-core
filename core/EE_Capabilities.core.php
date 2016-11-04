<?php

/**
 * This file contains the code related to the capabilities system in Event Espresso.
 *
 * @since      4.5.0
 * @package    Event Espresso
 * @subpackage core, capabilities
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}


/**
 * This class contains all the code related to Event Espresso capabilities.
 * Assigned to the EE_Registry::instance()->CAP property.
 *
 * @link       https://github.com/eventespresso/event-espresso-core/tree/master/docs/K--Capability-System
 *
 * @since      4.5.0
 * @package    Event Espresso
 * @subpackage core, capabilities
 * @author     Darren Ethier
 */
final class EE_Capabilities extends EE_Base
{
    
    
    /**
     * instance of EE_Capabilities object
     *
     * @var EE_Capabilities
     */
    private static $_instance = null;
    
    
    /**
     * This is a map of caps that correspond to a default WP_Role.
     * Array is indexed by Role and values are ee capabilities.
     *
     * @since 4.5.0
     *
     * @var array
     */
    private $_caps_map = array();
    
    
    /**
     * This used to hold an array of EE_Meta_Capability_Map objects that define the granular capabilities mapped to for
     * a user depending on context.
     *
     * @var EE_Meta_Capability_Map[]
     */
    private $_meta_caps = array();
    
    /**
     * the name of the wp option used to store caps previously initialized
     */
    const option_name = 'ee_caps_initialized';
    
    
    /**
     * singleton method used to instantiate class object
     *
     * @since 4.5.0
     *
     * @return EE_Capabilities
     */
    public static function instance()
    {
        //check if instantiated, and if not do so.
        if ( ! self::$_instance instanceof EE_Capabilities) {
            self::$_instance = new self();
        }
        
        return self::$_instance;
    }
    
    
    /**
     * private constructor
     *
     * @since 4.5.0
     *
     * @return \EE_Capabilities
     */
    private function __construct()
    {
    }
    
    
    /**
     * This delays the initialization of the capabilities class until EE_System core is loaded and ready.
     *
     * @param bool $reset allows for resetting the default capabilities saved on roles.  Note that this doesn't
     *                    actually REMOVE any capabilities from existing roles, it just resaves defaults roles and
     *                    ensures that they are up to date.
     *
     *
     * @since 4.5.0
     * @return void
     */
    public function init_caps($reset = false)
    {
        if (EE_Maintenance_Mode::instance()->models_can_query()) {
            $this->_caps_map = $this->_init_caps_map();
            $this->init_role_caps($reset);
            $this->_set_meta_caps();
        }
    }
    
    
    /**
     * This sets the meta caps property.
     * @since 4.5.0
     *
     * @return void
     */
    private function _set_meta_caps()
    {
        //make sure we're only ever initializing the default _meta_caps array once if it's empty.
        $this->_meta_caps = $this->_get_default_meta_caps_array();
        
        $this->_meta_caps = apply_filters('FHEE__EE_Capabilities___set_meta_caps__meta_caps', $this->_meta_caps);
        
        //add filter for map_meta_caps but only if models can query.
        if (EE_Maintenance_Mode::instance()->models_can_query() && ! has_filter('map_meta_cap',
                array($this, 'map_meta_caps'))
        ) {
            add_filter('map_meta_cap', array($this, 'map_meta_caps'), 10, 4);
        }
    }
    
    
    /**
     * This builds and returns the default meta_caps array only once.
     *
     * @since  4.8.28.rc.012
     * @return array
     */
    private function _get_default_meta_caps_array()
    {
        static $default_meta_caps = array();
        if (empty($default_meta_caps)) {
            $default_meta_caps = array(
                //edits
                new EE_Meta_Capability_Map_Edit('ee_edit_event',
                    array('Event', 'ee_edit_published_events', 'ee_edit_others_events', 'ee_edit_private_events')),
                new EE_Meta_Capability_Map_Edit('ee_edit_venue',
                    array('Venue', 'ee_edit_published_venues', 'ee_edit_others_venues', 'ee_edit_private_venues')),
                new EE_Meta_Capability_Map_Edit('ee_edit_registration',
                    array('Registration', '', 'ee_edit_others_registrations', '')),
                new EE_Meta_Capability_Map_Edit('ee_edit_checkin',
                    array('Registration', '', 'ee_edit_others_checkins', '')),
                new EE_Meta_Capability_Map_Messages_Cap('ee_edit_message',
                    array('Message_Template_Group', '', 'ee_edit_others_messages', 'ee_edit_global_messages')),
                new EE_Meta_Capability_Map_Edit('ee_edit_default_ticket',
                    array('Ticket', '', 'ee_edit_others_default_tickets', '')),
                new EE_Meta_Capability_Map_Registration_Form_Cap('ee_edit_question',
                    array('Question', '', '', 'ee_edit_system_questions')),
                new EE_Meta_Capability_Map_Registration_Form_Cap('ee_edit_question_group',
                    array('Question_Group', '', '', 'ee_edit_system_question_groups')),
                new EE_Meta_Capability_Map_Edit('ee_edit_payment_method',
                    array('Payment_Method', '', 'ee_edit_others_payment_methods', '')),
                //reads
                new EE_Meta_Capability_Map_Read('ee_read_event',
                    array('Event', '', 'ee_read_others_events', 'ee_read_private_events')),
                new EE_Meta_Capability_Map_Read('ee_read_venue',
                    array('Venue', '', 'ee_read_others_venues', 'ee_read_private_venues')),
                new EE_Meta_Capability_Map_Read('ee_read_registration',
                    array('Registration', '', '', 'ee_edit_others_registrations')),
                new EE_Meta_Capability_Map_Read('ee_read_checkin',
                    array('Registration', '', '', 'ee_read_others_checkins')),
                new EE_Meta_Capability_Map_Messages_Cap('ee_read_message',
                    array('Message_Template_Group', '', 'ee_read_others_messages', 'ee_read_global_messages')),
                new EE_Meta_Capability_Map_Read('ee_read_default_ticket',
                    array('Ticket', '', '', 'ee_read_others_default_tickets')),
                new EE_Meta_Capability_Map_Read('ee_read_payment_method',
                    array('Payment_Method', '', '', 'ee_read_others_payment_methods')),
                
                //deletes
                new EE_Meta_Capability_Map_Delete('ee_delete_event', array(
                    'Event',
                    'ee_delete_published_events',
                    'ee_delete_others_events',
                    'ee_delete_private_events'
                )),
                new EE_Meta_Capability_Map_Delete('ee_delete_venue', array(
                    'Venue',
                    'ee_delete_published_venues',
                    'ee_delete_others_venues',
                    'ee_delete_private_venues'
                )),
                new EE_Meta_Capability_Map_Delete('ee_delete_registration',
                    array('Registration', '', 'ee_delete_others_registrations', '')),
                new EE_Meta_Capability_Map_Delete('ee_delete_checkin',
                    array('Registration', '', 'ee_delete_others_checkins', '')),
                new EE_Meta_Capability_Map_Messages_Cap('ee_delete_message',
                    array('Message_Template_Group', '', 'ee_delete_others_messages', 'ee_delete_global_messages')),
                new EE_Meta_Capability_Map_Delete('ee_delete_default_ticket',
                    array('Ticket', '', 'ee_delete_others_default_tickets', '')),
                new EE_Meta_Capability_Map_Registration_Form_Cap('ee_delete_question',
                    array('Question', '', '', 'delete_system_questions')),
                new EE_Meta_Capability_Map_Registration_Form_Cap('ee_delete_question_group',
                    array('Question_Group', '', '', 'delete_system_question_groups')),
                new EE_Meta_Capability_Map_Delete('ee_delete_payment_method',
                    array('Payment_Method', '', 'ee_delete_others_payment_methods', '')),
            );
        }
        
        return $default_meta_caps;
    }
    
    
    /**
     * This is the callback for the wp map_meta_caps() function which allows for ensuring certain caps that act as a
     * "meta" for other caps ( i.e. ee_edit_event is a meta for ee_edit_others_events ) work as expected.
     *
     * The actual logic is carried out by implementer classes in their definition of _map_meta_caps.
     *
     * @since 4.5.0
     * @see   wp-includes/capabilities.php
     *
     * @param array  $caps    actual users capabilities
     * @param string $cap     initial capability name that is being checked (the "map" key)
     * @param int    $user_id The user id
     * @param array  $args    Adds context to the cap. Typically the object ID.
     *
     * @return array   actual users capabilities
     */
    public function map_meta_caps($caps, $cap, $user_id, $args)
    {
        if (did_action('AHEE__EE_System__load_espresso_addons__complete')) {
            //loop through our _meta_caps array
            foreach ($this->_meta_caps as $meta_map) {
                if (! $meta_map instanceof EE_Meta_Capability_Map) {
                    continue;
                }
                $meta_map->ensure_is_model();
                
                $caps = $meta_map->map_meta_caps($caps, $cap, $user_id, $args);
            }
        }
        
        return $caps;
    }
    
    
    /**
     * This sets up and returns the initial capabilities map for Event Espresso
     *
     * @since 4.5.0
     *
     * @return array
     */
    private function _init_caps_map()
    {
        $caps = array(
            'administrator'           => array(
                //basic access
                'ee_read_ee',
                //gateways
                /**
                 * note that with payment method capabilities, although we've implemented
                 * capability mapping which will be used for accessing payment methods owned by
                 * other users.  This is not fully implemented yet in the payment method ui.
                 * Currently only the "plural" caps are in active use. (Specific payment method caps are in use as well).
                 **/
                'ee_manage_gateways',
                'ee_read_payment_method',
                'ee_read_payment_methods',
                'ee_read_others_payment_methods',
                'ee_edit_payment_method',
                'ee_edit_payment_methods',
                'ee_edit_others_payment_methods',
                'ee_delete_payment_method',
                'ee_delete_payment_methods',
                //events
                'ee_publish_events',
                'ee_read_private_events',
                'ee_read_others_events',
                'ee_read_event',
                'ee_read_events',
                'ee_edit_event',
                'ee_edit_events',
                'ee_edit_published_events',
                'ee_edit_others_events',
                'ee_edit_private_events',
                'ee_delete_published_events',
                'ee_delete_private_events',
                'ee_delete_event',
                'ee_delete_events',
                'ee_delete_others_events',
                //event categories
                'ee_manage_event_categories',
                'ee_edit_event_category',
                'ee_delete_event_category',
                'ee_assign_event_category',
                //venues
                'ee_publish_venues',
                'ee_read_venue',
                'ee_read_venues',
                'ee_read_others_venues',
                'ee_read_private_venues',
                'ee_edit_venue',
                'ee_edit_venues',
                'ee_edit_others_venues',
                'ee_edit_published_venues',
                'ee_edit_private_venues',
                'ee_delete_venue',
                'ee_delete_venues',
                'ee_delete_others_venues',
                'ee_delete_private_venues',
                'ee_delete_published_venues',
                //venue categories
                'ee_manage_venue_categories',
                'ee_edit_venue_category',
                'ee_delete_venue_category',
                'ee_assign_venue_category',
                //contacts
                'ee_read_contact',
                'ee_read_contacts',
                'ee_edit_contact',
                'ee_edit_contacts',
                'ee_delete_contact',
                'ee_delete_contacts',
                //registrations
                'ee_read_registration',
                'ee_read_registrations',
                'ee_read_others_registrations',
                'ee_edit_registration',
                'ee_edit_registrations',
                'ee_edit_others_registrations',
                'ee_delete_registration',
                'ee_delete_registrations',
                //checkins
                'ee_read_checkin',
                'ee_read_others_checkins',
                'ee_read_checkins',
                'ee_edit_checkin',
                'ee_edit_checkins',
                'ee_edit_others_checkins',
                'ee_delete_checkin',
                'ee_delete_checkins',
                'ee_delete_others_checkins',
                //transactions && payments
                'ee_read_transaction',
                'ee_read_transactions',
                'ee_edit_payments',
                'ee_delete_payments',
                //messages
                'ee_read_message',
                'ee_read_messages',
                'ee_read_others_messages',
                'ee_read_global_messages',
                'ee_edit_global_messages',
                'ee_edit_message',
                'ee_edit_messages',
                'ee_edit_others_messages',
                'ee_delete_message',
                'ee_delete_messages',
                'ee_delete_others_messages',
                'ee_delete_global_messages',
                'ee_send_message',
                //tickets
                'ee_read_default_ticket',
                'ee_read_default_tickets',
                'ee_read_others_default_tickets',
                'ee_edit_default_ticket',
                'ee_edit_default_tickets',
                'ee_edit_others_default_tickets',
                'ee_delete_default_ticket',
                'ee_delete_default_tickets',
                'ee_delete_others_default_tickets',
                //prices
                'ee_edit_default_price',
                'ee_edit_default_prices',
                'ee_delete_default_price',
                'ee_delete_default_prices',
                'ee_edit_default_price_type',
                'ee_edit_default_price_types',
                'ee_delete_default_price_type',
                'ee_delete_default_price_types',
                'ee_read_default_prices',
                'ee_read_default_price_types',
                //registration form
                'ee_edit_question',
                'ee_edit_questions',
                'ee_edit_system_questions',
                'ee_read_questions',
                'ee_delete_question',
                'ee_delete_questions',
                'ee_edit_question_group',
                'ee_edit_question_groups',
                'ee_read_question_groups',
                'ee_edit_system_question_groups',
                'ee_delete_question_group',
                'ee_delete_question_groups',
                //event_type taxonomy
                'ee_assign_event_type',
                'ee_manage_event_types',
                'ee_edit_event_type',
                'ee_delete_event_type',
            ),
            'ee_events_administrator' => array(
                //core wp caps
                'read',
                'read_private_pages',
                'read_private_posts',
                'edit_users',
                'edit_posts',
                'edit_pages',
                'edit_published_posts',
                'edit_published_pages',
                'edit_private_pages',
                'edit_private_posts',
                'edit_others_posts',
                'edit_others_pages',
                'publish_posts',
                'publish_pages',
                'delete_posts',
                'delete_pages',
                'delete_private_pages',
                'delete_private_posts',
                'delete_published_pages',
                'delete_published_posts',
                'delete_others_posts',
                'delete_others_pages',
                'manage_categories',
                'manage_links',
                'moderate_comments',
                'unfiltered_html',
                'upload_files',
                'export',
                'import',
                'list_users',
                'level_1', //required if user with this role shows up in author dropdowns
                //basic ee access
                'ee_read_ee',
                //events
                'ee_publish_events',
                'ee_read_private_events',
                'ee_read_others_events',
                'ee_read_event',
                'ee_read_events',
                'ee_edit_event',
                'ee_edit_events',
                'ee_edit_published_events',
                'ee_edit_others_events',
                'ee_edit_private_events',
                'ee_delete_published_events',
                'ee_delete_private_events',
                'ee_delete_event',
                'ee_delete_events',
                'ee_delete_others_events',
                //event categories
                'ee_manage_event_categories',
                'ee_edit_event_category',
                'ee_delete_event_category',
                'ee_assign_event_category',
                //venues
                'ee_publish_venues',
                'ee_read_venue',
                'ee_read_venues',
                'ee_read_others_venues',
                'ee_read_private_venues',
                'ee_edit_venue',
                'ee_edit_venues',
                'ee_edit_others_venues',
                'ee_edit_published_venues',
                'ee_edit_private_venues',
                'ee_delete_venue',
                'ee_delete_venues',
                'ee_delete_others_venues',
                'ee_delete_private_venues',
                'ee_delete_published_venues',
                //venue categories
                'ee_manage_venue_categories',
                'ee_edit_venue_category',
                'ee_delete_venue_category',
                'ee_assign_venue_category',
                //contacts
                'ee_read_contact',
                'ee_read_contacts',
                'ee_edit_contact',
                'ee_edit_contacts',
                'ee_delete_contact',
                'ee_delete_contacts',
                //registrations
                'ee_read_registration',
                'ee_read_registrations',
                'ee_read_others_registrations',
                'ee_edit_registration',
                'ee_edit_registrations',
                'ee_edit_others_registrations',
                'ee_delete_registration',
                'ee_delete_registrations',
                //checkins
                'ee_read_checkin',
                'ee_read_others_checkins',
                'ee_read_checkins',
                'ee_edit_checkin',
                'ee_edit_checkins',
                'ee_edit_others_checkins',
                'ee_delete_checkin',
                'ee_delete_checkins',
                'ee_delete_others_checkins',
                //transactions && payments
                'ee_read_transaction',
                'ee_read_transactions',
                'ee_edit_payments',
                'ee_delete_payments',
                //messages
                'ee_read_message',
                'ee_read_messages',
                'ee_read_others_messages',
                'ee_read_global_messages',
                'ee_edit_global_messages',
                'ee_edit_message',
                'ee_edit_messages',
                'ee_edit_others_messages',
                'ee_delete_message',
                'ee_delete_messages',
                'ee_delete_others_messages',
                'ee_delete_global_messages',
                'ee_send_message',
                //tickets
                'ee_read_default_ticket',
                'ee_read_default_tickets',
                'ee_read_others_default_tickets',
                'ee_edit_default_ticket',
                'ee_edit_default_tickets',
                'ee_edit_others_default_tickets',
                'ee_delete_default_ticket',
                'ee_delete_default_tickets',
                'ee_delete_others_default_tickets',
                //prices
                'ee_edit_default_price',
                'ee_edit_default_prices',
                'ee_delete_default_price',
                'ee_delete_default_prices',
                'ee_edit_default_price_type',
                'ee_edit_default_price_types',
                'ee_delete_default_price_type',
                'ee_delete_default_price_types',
                'ee_read_default_prices',
                'ee_read_default_price_types',
                //registration form
                'ee_edit_question',
                'ee_edit_questions',
                'ee_edit_system_questions',
                'ee_read_questions',
                'ee_delete_question',
                'ee_delete_questions',
                'ee_edit_question_group',
                'ee_edit_question_groups',
                'ee_read_question_groups',
                'ee_edit_system_question_groups',
                'ee_delete_question_group',
                'ee_delete_question_groups',
                //event_type taxonomy
                'ee_assign_event_type',
                'ee_manage_event_types',
                'ee_edit_event_type',
                'ee_delete_event_type',
            )
        );
        
        $caps = apply_filters('FHEE__EE_Capabilities__init_caps_map__caps', $caps);
        
        return $caps;
    }
    
    
    /**
     * This adds all the default caps to roles as registered in the _caps_map property.
     *
     * @since 4.5.0
     *
     * @param bool  $reset      allows for resetting the default capabilities saved on roles.  Note that this doesn't
     *                          actually REMOVE any capabilities from existing roles, it just resaves defaults roles
     *                          and ensures that they are up to date.
     * @param array $custom_map Optional.  Can be used to send a custom map of roles and capabilities for setting them
     *                          up.  Note that this should ONLY be called on activation hook or some other one-time
     *                          task otherwise the caps will be added on every request.
     *
     * @return void
     */
    public function init_role_caps($reset = false, $custom_map = array())
    {
        
        $caps_map = empty($custom_map) ? $this->_caps_map : $custom_map;
        
        //first let's determine if these caps have already been set.
        $caps_set_before = get_option(self::option_name, array());
        //if not reset, see what caps are new for each role. if they're new, add them.
        foreach ($caps_map as $role => $caps_for_role) {
            foreach ($caps_for_role as $cap) {
                //first check we haven't already added this cap before, or it's a reset
                if ($reset || ! isset($caps_set_before[$role]) || ! in_array($cap, $caps_set_before[$role])) {
                    if ($this->add_cap_to_role($role, $cap)) {
                        $caps_set_before[$role][] = $cap;
                    }
                }
            }
        }
        
        //now let's just save the cap that has been set.
        update_option(self::option_name, $caps_set_before);
        do_action('AHEE__EE_Capabilities__init_role_caps__complete', $caps_set_before);
    }
    
    
    /**
     * This method sets a capability on a role.  Note this should only be done on activation, or if you have something
     * specific to prevent the cap from being added on every page load (adding caps are persistent to the db). Note.
     * this is a wrapper for $wp_role->add_cap()
     *
     * @see   wp-includes/capabilities.php
     *
     * @since 4.5.0
     *
     * @param string $role  A WordPress role the capability is being added to
     * @param string $cap   The capability being added to the role
     * @param bool   $grant Whether to grant access to this cap on this role.
     *
     * @return bool
     */
    public function add_cap_to_role($role, $cap, $grant = true)
    {
        $role_object = get_role($role);
        //if the role isn't available then we create it.
        if ( ! $role_object instanceof WP_Role) {
            //if a plugin wants to create a specific role name then they should create the role before
            //EE_Capabilities does.  Otherwise this function will create the role name from the slug:
            // - removes any `ee_` namespacing from the start of the slug.
            // - replaces `_` with ` ` (empty space).
            // - sentence case on the resulting string.
            $role_label  = ucwords(str_replace('_', ' ', str_replace('ee_', '', $role)));
            $role_object = add_role($role, $role_label);
        }
        if ($role_object instanceof WP_Role) {
            $role_object->add_cap($cap, $grant);
            
            return true;
        }
        
        return false;
    }
    
    
    /**
     * Functions similarly to add_cap_to_role except removes cap from given role.
     * Wrapper for $wp_role->remove_cap()
     *
     * @see   wp-includes/capabilities.php
     * @since 4.5.0
     *
     * @param string $role A WordPress role the capability is being removed from.
     * @param string $cap  The capability being removed
     *
     * @return void
     */
    public function remove_cap_from_role($role, $cap)
    {
        $role = get_role($role);
        if ($role instanceof WP_Role) {
            $role->remove_cap($cap);
        }
    }
    
    
    /**
     * Wrapper for the native WP current_user_can() method.
     * This is provided as a handy method for a couple things:
     * 1. Using the context string it allows for targeted filtering by addons for a specific check (without having to
     * write those filters wherever current_user_can is called).
     * 2. Explicit passing of $id from a given context ( useful in the cases of map_meta_cap filters )
     *
     * @since 4.5.0
     *
     * @param string $cap     The cap being checked.
     * @param string $context The context where the current_user_can is being called from.
     * @param int    $id      Optional. Id for item where current_user_can is being called from (used in map_meta_cap()
     *                        filters.
     *
     * @return bool  Whether user can or not.
     */
    public function current_user_can($cap, $context, $id = 0)
    {
        //apply filters (both a global on just the cap, and context specific.  Global overrides context specific)
        $filtered_cap = apply_filters('FHEE__EE_Capabilities__current_user_can__cap__' . $context, $cap, $id);
        $filtered_cap = apply_filters('FHEE__EE_Capabilities__current_user_can__cap', $filtered_cap, $context, $cap,
            $id);
        
        return ! empty($id) ? current_user_can($filtered_cap, $id) : current_user_can($filtered_cap);
    }
    
    
    /**
     * This is a wrapper for the WP user_can() function and follows the same style as the other wrappers in this class.
     *
     * @param int|WP_User $user    Either the user_id or a WP_User object
     * @param string      $cap     The capability string being checked
     * @param string      $context The context where the user_can is being called from (used in filters).
     * @param int         $id      Optional. Id for item where user_can is being called from ( used in map_meta_cap()
     *                             filters)
     *
     * @return bool Whether user can or not.
     */
    public function user_can($user, $cap, $context, $id = 0)
    {
        //apply filters (both a global on just the cap, and context specific.  Global overrides context specific)
        $filtered_cap = apply_filters('FHEE__EE_Capabilities__user_can__cap__' . $context, $cap, $user, $id);
        $filtered_cap = apply_filters('FHEE__EE_Capabilities__user_can__cap', $filtered_cap, $context, $cap, $user,
            $id);
        
        return ! empty($id) ? user_can($user, $filtered_cap, $id) : user_can($user, $filtered_cap);
    }
    
    
    /**
     * Wrapper for the native WP current_user_can_for_blog() method.
     * This is provided as a handy method for a couple things:
     * 1. Using the context string it allows for targeted filtering by addons for a specific check (without having to
     * write those filters wherever current_user_can is called).
     * 2. Explicit passing of $id from a given context ( useful in the cases of map_meta_cap filters )
     *
     * @since 4.5.0
     *
     * @param int    $blog_id The blog id that is being checked for.
     * @param string $cap     The cap being checked.
     * @param string $context The context where the current_user_can is being called from.
     * @param int    $id      Optional. Id for item where current_user_can is being called from (used in map_meta_cap()
     *                        filters.
     *
     * @return bool  Whether user can or not.
     */
    public function current_user_can_for_blog($blog_id, $cap, $context, $id = 0)
    {
        $user_can = ! empty($id) ? current_user_can_for_blog($blog_id, $cap, $id) : current_user_can($blog_id, $cap);
        
        //apply filters (both a global on just the cap, and context specific.  Global overrides context specific)
        $user_can = apply_filters('FHEE__EE_Capabilities__current_user_can_for_blog__user_can__' . $context, $user_can,
            $blog_id, $cap, $id);
        $user_can = apply_filters('FHEE__EE_Capabilities__current_user_can_for_blog__user_can', $user_can, $context,
            $blog_id, $cap, $id);
        
        return $user_can;
    }
    
    
    /**
     * This helper method just returns an array of registered EE capabilities.
     * Note this array is filtered.  It is assumed that all available EE capabilities are assigned to the administrator
     * role.
     *
     * @since 4.5.0
     *
     * @param string $role If empty then the entire role/capability map is returned.  Otherwise just the capabilities
     *                     for the given role are returned.
     *
     * @return array
     */
    public function get_ee_capabilities($role = 'administrator')
    {
        $capabilities = $this->_init_caps_map();
        if (empty($role)) {
            return $capabilities;
        }
        
        return isset($capabilities[$role]) ? $capabilities[$role] : array();
    }
}


/**
 * Meta Capability Map class.
 * This children of this class are used to define capability mappings for capabilities that have further filtering
 * depending on context.
 *
 * @since      4.5.0
 * @package    Event Espresso
 * @subpackage core, capabilities
 * @author     Darren Ethier
 */
abstract class EE_Meta_Capability_Map
{
    public $meta_cap;
    /**
     * @var EEM_Base
     */
    protected $_model;
    protected $_model_name;
    public $published_cap = '';
    public $others_cap = '';
    public $private_cap = '';
    
    
    /**
     * constructor.
     * Receives the setup arguments for the map.
     *
     * @since                        4.5.0
     *
     * @param string $meta_cap   What meta capability is this mapping.
     * @param array  $map_values array {
     *                           //array of values that MUST match a count of 4.  It's okay to send an empty string for
     *                           capabilities that don't get mapped to.
     *
     * @type         $map_values [0] string A string representing the model name. Required.  String's
     *                               should always be used when Menu Maps are registered via the
     *                               plugin API as models are not allowed to be instantiated when
     *                               in maintenance mode 2 (migrations).
     * @type         $map_values [1] string represents the capability used for published. Optional.
     * @type         $map_values [2] string represents the capability used for "others". Optional.
     * @type         $map_values [3] string represents the capability used for private. Optional.
     *                               }
     * @throws EE_Error
     */
    public function __construct($meta_cap, $map_values)
    {
        $this->meta_cap = $meta_cap;
        //verify there are four args in the $map_values array;
        if (count($map_values) !== 4) {
            throw new EE_Error(sprintf(__('Incoming $map_values array should have a count of four values in it.  This is what was given: %s',
                'event_espresso'), '<br>' . print_r($map_values, true)));
        }
        
        //set properties
        $this->_model        = null;
        $this->_model_name   = $map_values[0];
        $this->published_cap = (string)$map_values[1];
        $this->others_cap    = (string)$map_values[2];
        $this->private_cap   = (string)$map_values[3];
    }
    
    /**
     * Makes it so this object stops filtering caps
     */
    public function remove_filters()
    {
        remove_filter('map_meta_cap', array($this, 'map_meta_caps'), 10);
    }
    
    
    /**
     * This method ensures that the $model property is converted from the model name string to a proper EEM_Base class
     *
     * @since 4.5.0
     * @throws EE_Error
     *
     * @return void
     */
    public function ensure_is_model()
    {
        //is it already instantiated?
        if ($this->_model instanceof EEM_Base) {
            return;
        }
        
        //ensure model name is string
        $this->_model_name = (string)$this->_model_name;
        //error proof if the name has EEM in it
        $this->_model_name = str_replace('EEM', '', $this->_model_name);
        
        $this->_model = EE_Registry::instance()->load_model($this->_model_name);
        
        if ( ! $this->_model instanceof EEM_Base) {
            throw new EE_Error(sprintf(__('This string passed in to %s to represent a EEM_Base model class was not able to be used to instantiate the class.   Please ensure that the string is a match for the EEM_Base model name (not including the EEM_ part). This was given: %s',
                'event_espresso'), get_class($this), $this->_model));
        }
    }
    
    
    /**
     *
     * @see   EE_Meta_Capability_Map::_map_meta_caps() for docs on params.
     * @since 4.6.x
     *
     * @param $caps
     * @param $cap
     * @param $user_id
     * @param $args
     *
     * @return array
     */
    public function map_meta_caps($caps, $cap, $user_id, $args)
    {
        return $this->_map_meta_caps($caps, $cap, $user_id, $args);
    }
    
    
    /**
     * This is the callback for the wp map_meta_caps() function which allows for ensuring certain caps that act as a
     * "meta" for other caps ( i.e. ee_edit_event is a meta for ee_edit_others_events ) work as expected.
     *
     * @since 4.5.0
     * @see   wp-includes/capabilities.php
     *
     * @param array  $caps    actual users capabilities
     * @param string $cap     initial capability name that is being checked (the "map" key)
     * @param int    $user_id The user id
     * @param array  $args    Adds context to the cap. Typically the object ID.
     *
     * @return array   actual users capabilities
     */
    abstract protected function _map_meta_caps($caps, $cap, $user_id, $args);
}


/**
 * Meta Capability Map class for Edit type capabilities.
 * Any capability that is an edit type of capability utilizes this map.
 *
 * @since      4.5.0
 * @package    Event Espresso
 * @subpackage core, capabilities
 * @author     Darren Ethier
 */
class EE_Meta_Capability_Map_Edit extends EE_Meta_Capability_Map
{
    
    /**
     * This is the callback for the wp map_meta_caps() function which allows for ensuring certain caps that act as a
     * "meta" for other caps ( i.e. ee_edit_event is a meta for ee_edit_others_events ) work as expected.
     *
     * @since 4.5.0
     * @see   wp-includes/capabilities.php
     *
     * @param array  $caps    actual users capabilities
     * @param string $cap     initial capability name that is being checked (the "map" key)
     * @param int    $user_id The user id
     * @param array  $args    Adds context to the cap. Typically the object ID.
     *
     * @return array   actual users capabilities
     */
    protected function _map_meta_caps($caps, $cap, $user_id, $args)
    {
        //only process if we're checking our mapped_cap
        if ($cap !== $this->meta_cap) {
            return $caps;
        }
        
        $obj = ! empty($args[0]) ? $this->_model->get_one_by_ID($args[0]) : null;
        
        //if no obj then let's just do cap
        if ( ! $obj instanceof EE_Base_Class) {
            $caps[] = $cap;
            
            return $caps;
        }
        
        if ($obj instanceof EE_CPT_Base) {
            //if the item author is set and the user is the author...
            if ($obj->wp_user() && $user_id == $obj->wp_user()) {
                if (empty($this->published_cap)) {
                    $caps[] = $cap;
                } else {
                    //if obj is published...
                    if ($obj->status() == 'publish') {
                        $caps[] = $this->published_cap;
                    } else {
                        $caps[] = $cap;
                    }
                }
            } else {
                //the user is trying to edit someone else's obj
                if ( ! empty($this->others_cap)) {
                    $caps[] = $this->others_cap;
                }
                if ( ! empty($this->published_cap) && $obj->status() == 'publish') {
                    $caps[] = $this->published_cap;
                } elseif ( ! empty($this->private_cap) && $obj->status() == 'private') {
                    $caps[] = $this->private_cap;
                }
            }
        } else {
            //not a cpt object so handled differently
            $has_cap = false;
            try {
                $has_cap = method_exists($obj, 'wp_user') && $obj->wp_user() && $user_id == $obj->wp_user();
            } catch (Exception $e) {
                if (WP_DEBUG) {
                    EE_Error::add_error($e->getMessage(), __FILE__, __FUNCTION__, __LINE__);
                }
            }
            if ($has_cap) {
                $caps[] = $cap;
            } else {
                if ( ! empty($this->others_cap)) {
                    $caps[] = $this->others_cap;
                }
            }
        }
        
        return $caps;
    }
}


/**
 * Meta Capability Map class for delete type capabilities
 * Merely extends the Edit map.  Intention is for type hinting so it's clear a capability is a "delete" type of
 * capability (in case mapping needs to change in the future)
 *
 * @since      4.5.0
 * @package    Event Espresso
 * @subpackage core, capabilities
 * @author     Darren Ethier
 */
class EE_Meta_Capability_Map_Delete extends EE_Meta_Capability_Map_Edit
{
    
    /**
     * This is the callback for the wp map_meta_caps() function which allows for ensuring certain caps that act as a
     * "meta" for other caps ( i.e. ee_edit_event is a meta for ee_edit_others_events ) work as expected.
     *
     * @since 4.5.0
     * @see   wp-includes/capabilities.php
     *
     * @param array  $caps    actual users capabilities
     * @param string $cap     initial capability name that is being checked (the "map" key)
     * @param int    $user_id The user id
     * @param array  $args    Adds context to the cap. Typically the object ID.
     *
     * @return array   actual users capabilities
     */
    protected function _map_meta_caps($caps, $cap, $user_id, $args)
    {
        return parent::_map_meta_caps($caps, $cap, $user_id, $args);
    }
}


/**
 * Meta Capability Map class for reads.
 * Maps any read meta capabilities to equivalents for context.
 *
 * @since      4.5.0
 * @package    Event Espresso
 * @subpackage core, capabilities
 * @author     Darren Ethier
 */
class EE_Meta_Capability_Map_Read extends EE_Meta_Capability_Map
{
    
    /**
     * This is the callback for the wp map_meta_caps() function which allows for ensuring certain caps that act as a
     * "meta" for other caps ( i.e. ee_edit_event is a meta for ee_edit_others_events ) work as expected.
     *
     * @since 4.5.0
     * @see   wp-includes/capabilities.php
     *
     * @param array  $caps    actual users capabilities
     * @param string $cap     initial capability name that is being checked (the "map" key)
     * @param int    $user_id The user id
     * @param array  $args    Adds context to the cap. Typically the object ID.
     *
     * @return array   actual users capabilities
     */
    protected function _map_meta_caps($caps, $cap, $user_id, $args)
    {
        //only process if we're checking our mapped cap;
        if ($cap !== $this->meta_cap) {
            return $caps;
        }
        
        $obj = ! empty($args[0]) ? $this->_model->get_one_by_ID($args[0]) : null;
        
        //if no obj then let's just do cap
        if ( ! $obj instanceof EE_Base_Class) {
            $caps[] = $cap;
            
            return $caps;
        }
        
        if ($obj instanceof EE_CPT_Base) {
            $status_obj = get_post_status_object($obj->status());
            if ($status_obj->public) {
                $caps[] = $cap;
                
                return $caps;
            }
            
            //if the item author is set and the user is the author...
            if ($obj->wp_user() && $user_id == $obj->wp_user()) {
                $caps[] = $cap;
            } elseif ($status_obj->private && ! empty($this->private_cap)) {
                //the user is trying to view someone else's obj
                $caps[] = $this->private_cap;
            } elseif ( ! empty($this->others_cap)) {
                $caps[] = $this->others_cap;
            } else {
                $caps[] = $cap;
            }
        } else {
            //not a cpt object so handled differently
            $has_cap = false;
            try {
                $has_cap = method_exists($obj, 'wp_user') && $obj->wp_user() && $user_id == $obj->wp_user();
            } catch (Exception $e) {
                if (WP_DEBUG) {
                    EE_Error::add_error($e->getMessage(), __FILE__, __FUNCTION__, __LINE__);
                }
            }
            if ($has_cap) {
                $caps[] = $cap;
            } elseif ( ! empty($this->private_cap)) {
                $caps[] = $this->private_cap;
            } elseif ( ! empty($this->others_cap)) {
                $caps[] = $this->others_cap;
            } else {
                $caps[] = $cap;
            }
        }
        
        return $caps;
    }
}


/**
 * Meta Capability Map class for the messages component
 * This is a special map due to messages having global and custom messages.  Only users with the edit_global_message
 * capability should be able to do things with the global messages.
 *
 * @since      4.5.0
 * @package    Event Espresso
 * @subpackage core, capabilities
 * @author     Darren Ethier
 */
class EE_Meta_Capability_Map_Messages_Cap extends EE_Meta_Capability_Map
{
    
    /**
     * This is the callback for the wp map_meta_caps() function which allows for ensuring certain caps that act as a
     * "meta" for other caps ( i.e. ee_edit_event is a meta for ee_edit_others_events ) work as expected.
     *
     * @since 4.5.0
     * @see   wp-includes/capabilities.php
     *
     * @param array  $caps    actual users capabilities
     * @param string $cap     initial capability name that is being checked (the "map" key)
     * @param int    $user_id The user id
     * @param array  $args    Adds context to the cap. Typically the object ID.
     *
     * @return array   actual users capabilities
     */
    protected function _map_meta_caps($caps, $cap, $user_id, $args)
    {
        //only process if we're checking our mapped_cap
        if ($cap !== $this->meta_cap) {
            return $caps;
        }
        
        $obj = ! empty($args[0]) ? $this->_model->get_one_by_ID($args[0]) : null;
        
        //if no obj then let's just do cap
        if ( ! $obj instanceof EE_Message_Template_Group) {
            $caps[] = $cap;
            
            return $caps;
        }
        
        $is_global = $obj->is_global();
        
        if ($obj->wp_user() && $user_id == $obj->wp_user()) {
            if ($is_global) {
                $caps[] = $this->private_cap;
            } else {
                $caps[] = $cap;
            }
        } else {
            if ($is_global) {
                $caps[] = $this->private_cap;
            } else {
                $caps[] = $this->others_cap;
            }
        }
        
        return $caps;
    }
}


/**
 * Meta Capability Map class for the registration form (questions and question groups) component
 * This is a special map due to questions and question groups having special "system" data.  Only users with the
 * edit_system_question or edit_system_question_group capability should be able to do things with the system data.
 *
 * @since      4.5.0
 * @package    Event Espresso
 * @subpackage core, capabilities
 * @author     Darren Ethier
 */
class EE_Meta_Capability_Map_Registration_Form_Cap extends EE_Meta_Capability_Map
{
    
    /**
     * This is the callback for the wp map_meta_caps() function which allows for ensuring certain caps that act as a
     * "meta" for other caps ( i.e. ee_edit_event is a meta for ee_edit_others_events ) work as expected.
     *
     * @since 4.5.0
     * @see   wp-includes/capabilities.php
     *
     * @param array  $caps    actual users capabilities
     * @param string $cap     initial capability name that is being checked (the "map" key)
     * @param int    $user_id The user id
     * @param array  $args    Adds context to the cap. Typically the object ID.
     *
     * @return array   actual users capabilities
     */
    protected function _map_meta_caps($caps, $cap, $user_id, $args)
    {
        //only process if we're checking our mapped_cap
        if ($cap !== $this->meta_cap) {
            return $caps;
        }
        
        $obj = ! empty($args[0]) ? $this->_model->get_one_by_ID($args[0]) : null;
        
        //if no obj then let's just do cap
        if ( ! $obj instanceof EE_Base_Class) {
            $caps[] = $cap;
            
            return $caps;
        }
        
        $is_system = $obj instanceof EE_Question_Group ? $obj->system_group() : false;
        $is_system = $obj instanceof EE_Question ? $obj->is_system_question() : $is_system;
        
        if ($is_system) {
            $caps[] = $this->private_cap;
        } else {
            $caps[] = $cap;
        }
        
        return $caps;
    }
}
