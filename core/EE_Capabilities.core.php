<?php

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
     * the name of the wp option used to store caps previously initialized
     */
    const option_name = 'ee_caps_initialized';

    /**
     * instance of EE_Capabilities object
     *
     * @var EE_Capabilities
     */
    private static $_instance;


    /**
     * This is a map of caps that correspond to a default WP_Role.
     * Array is indexed by Role and values are ee capabilities.
     *
     * @since 4.5.0
     *
     * @var array
     */
    private $capabilities_map = array();

    /**
     * This used to hold an array of EE_Meta_Capability_Map objects
     * that define the granular capabilities mapped to for a user depending on context.
     *
     * @var EE_Meta_Capability_Map[]
     */
    private $_meta_caps = array();

    /**
     * The internal $capabilities_map needs to be initialized before it can be used.
     * This flag tracks whether that has happened or not.
     * But for this to work, we need three states to indicate:
     *      initialization has not occurred at all
     *      initialization has started but is not complete
     *      initialization is complete
     * The reason this is needed is because the addCaps() method
     * normally requires the $capabilities_map to be initialized,
     * but is also used during the initialization process.
     * So:
     *      If initialized === null, init_caps() will be called before any other methods will run.
     *      If initialized === false, then init_caps() is in the process of running it's logic.
     *      If initialized === true, then init_caps() has completed the initialization process.
     *
     * @var boolean|null $initialized
     */
    private $initialized;

    /**
     * @var boolean $reset
     */
    private $reset = false;


    /**
     * singleton method used to instantiate class object
     *
     * @since 4.5.0
     *
     * @return EE_Capabilities
     */
    public static function instance()
    {
        // check if instantiated, and if not do so.
        if (! self::$_instance instanceof EE_Capabilities) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }


    /**
     * private constructor
     *
     * @since 4.5.0
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
     * @since 4.5.0
     * @return bool
     * @throws EE_Error
     */
    public function init_caps($reset = false)
    {
        if (! EE_Maintenance_Mode::instance()->models_can_query()) {
            return false;
        }
        $this->reset = filter_var($reset, FILTER_VALIDATE_BOOLEAN);
        // if reset, then completely delete the cache option and clear the $capabilities_map property.
        if ($this->reset) {
            $this->initialized = null;
            $this->capabilities_map = array();
            delete_option(self::option_name);
        }
        if ($this->initialized === null) {
            $this->initialized = false;
            do_action(
                'AHEE__EE_Capabilities__init_caps__before_initialization',
                $this->reset
            );
            $this->addCaps($this->_init_caps_map());
            $this->_set_meta_caps();
            do_action(
                'AHEE__EE_Capabilities__init_caps__after_initialization',
                $this->capabilities_map
            );
            $this->initialized = true;
        }
        // reset $this->reset so that it's not stuck on true if init_caps() gets called again
        $this->reset = false;
        return true;
    }


    /**
     * This sets the meta caps property.
     *
     * @since 4.5.0
     * @return void
     * @throws EE_Error
     */
    private function _set_meta_caps()
    {
        // get default meta caps and filter the returned array
        $this->_meta_caps = apply_filters(
            'FHEE__EE_Capabilities___set_meta_caps__meta_caps',
            $this->_get_default_meta_caps_array()
        );
        // add filter for map_meta_caps but only if models can query.
        if (! has_filter('map_meta_cap', array($this, 'map_meta_caps'))) {
            add_filter('map_meta_cap', array($this, 'map_meta_caps'), 10, 4);
        }
    }


    /**
     * This builds and returns the default meta_caps array only once.
     *
     * @since  4.8.28.rc.012
     * @return array
     * @throws EE_Error
     */
    private function _get_default_meta_caps_array()
    {
        static $default_meta_caps = array();
        // make sure we're only ever initializing the default _meta_caps array once if it's empty.
        if (empty($default_meta_caps)) {
            $default_meta_caps = array(
                // edits
                new EE_Meta_Capability_Map_Edit(
                    'ee_edit_event',
                    array('Event', 'ee_edit_published_events', 'ee_edit_others_events', 'ee_edit_private_events')
                ),
                new EE_Meta_Capability_Map_Edit(
                    'ee_edit_venue',
                    array('Venue', 'ee_edit_published_venues', 'ee_edit_others_venues', 'ee_edit_private_venues')
                ),
                new EE_Meta_Capability_Map_Edit(
                    'ee_edit_registration',
                    array('Registration', '', 'ee_edit_others_registrations', '')
                ),
                new EE_Meta_Capability_Map_Edit(
                    'ee_edit_checkin',
                    array('Registration', '', 'ee_edit_others_checkins', '')
                ),
                new EE_Meta_Capability_Map_Messages_Cap(
                    'ee_edit_message',
                    array('Message_Template_Group', '', 'ee_edit_others_messages', 'ee_edit_global_messages')
                ),
                new EE_Meta_Capability_Map_Edit(
                    'ee_edit_default_ticket',
                    array('Ticket', '', 'ee_edit_others_default_tickets', '')
                ),
                new EE_Meta_Capability_Map_Registration_Form_Cap(
                    'ee_edit_question',
                    array('Question', '', '', 'ee_edit_system_questions')
                ),
                new EE_Meta_Capability_Map_Registration_Form_Cap(
                    'ee_edit_question_group',
                    array('Question_Group', '', '', 'ee_edit_system_question_groups')
                ),
                new EE_Meta_Capability_Map_Edit(
                    'ee_edit_payment_method',
                    array('Payment_Method', '', 'ee_edit_others_payment_methods', '')
                ),
                // reads
                new EE_Meta_Capability_Map_Read(
                    'ee_read_event',
                    array('Event', '', 'ee_read_others_events', 'ee_read_private_events')
                ),
                new EE_Meta_Capability_Map_Read(
                    'ee_read_venue',
                    array('Venue', '', 'ee_read_others_venues', 'ee_read_private_venues')
                ),
                new EE_Meta_Capability_Map_Read(
                    'ee_read_registration',
                    array('Registration', '', 'ee_read_others_registrations', '')
                ),
                new EE_Meta_Capability_Map_Read(
                    'ee_read_checkin',
                    array('Registration', '', 'ee_read_others_checkins', '')
                ),
                new EE_Meta_Capability_Map_Messages_Cap(
                    'ee_read_message',
                    array('Message_Template_Group', '', 'ee_read_others_messages', 'ee_read_global_messages')
                ),
                new EE_Meta_Capability_Map_Read(
                    'ee_read_default_ticket',
                    array('Ticket', '', 'ee_read_others_default_tickets', '')
                ),
                new EE_Meta_Capability_Map_Read(
                    'ee_read_payment_method',
                    array('Payment_Method', '', 'ee_read_others_payment_methods', '')
                ),
                // deletes
                new EE_Meta_Capability_Map_Delete(
                    'ee_delete_event',
                    array(
                        'Event',
                        'ee_delete_published_events',
                        'ee_delete_others_events',
                        'ee_delete_private_events',
                    )
                ),
                new EE_Meta_Capability_Map_Delete(
                    'ee_delete_venue',
                    array(
                        'Venue',
                        'ee_delete_published_venues',
                        'ee_delete_others_venues',
                        'ee_delete_private_venues',
                    )
                ),
                new EE_Meta_Capability_Map_Delete(
                    'ee_delete_registration',
                    array('Registration', '', 'ee_delete_others_registrations', '')
                ),
                new EE_Meta_Capability_Map_Delete(
                    'ee_delete_checkin',
                    array('Registration', '', 'ee_delete_others_checkins', '')
                ),
                new EE_Meta_Capability_Map_Messages_Cap(
                    'ee_delete_message',
                    array('Message_Template_Group', '', 'ee_delete_others_messages', 'ee_delete_global_messages')
                ),
                new EE_Meta_Capability_Map_Delete(
                    'ee_delete_default_ticket',
                    array('Ticket', '', 'ee_delete_others_default_tickets', '')
                ),
                new EE_Meta_Capability_Map_Registration_Form_Cap(
                    'ee_delete_question',
                    array('Question', '', '', 'delete_system_questions')
                ),
                new EE_Meta_Capability_Map_Registration_Form_Cap(
                    'ee_delete_question_group',
                    array('Question_Group', '', '', 'delete_system_question_groups')
                ),
                new EE_Meta_Capability_Map_Delete(
                    'ee_delete_payment_method',
                    array('Payment_Method', '', 'ee_delete_others_payment_methods', '')
                ),
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
     * @return array actual users capabilities
     * @throws EE_Error
     */
    public function map_meta_caps($caps, $cap, $user_id, $args)
    {
        if (did_action('AHEE__EE_System__load_espresso_addons__complete')) {
            // loop through our _meta_caps array
            foreach ($this->_meta_caps as $meta_map) {
                if (! $meta_map instanceof EE_Meta_Capability_Map) {
                    continue;
                }
                // don't load models if there is no object ID in the args
                if (! empty($args[0])) {
                    $meta_map->ensure_is_model();
                }
                $caps = $meta_map->map_meta_caps($caps, $cap, $user_id, $args);
            }
        }
        return $caps;
    }


    /**
     * This sets up and returns the initial capabilities map for Event Espresso
     * Note this array is filtered.
     * It is assumed that all available EE capabilities are assigned to the administrator role.
     *
     * @since 4.5.0
     *
     * @return array
     */
    private function _init_caps_map()
    {
        return apply_filters(
            'FHEE__EE_Capabilities__init_caps_map__caps',
            array(
                'administrator'           => array(
                    // basic access
                    'ee_read_ee',
                    // gateways
                    /**
                     * note that with payment method capabilities, although we've implemented
                     * capability mapping which will be used for accessing payment methods owned by
                     * other users.  This is not fully implemented yet in the payment method ui.
                     * Currently only the "plural" caps are in active use.
                     * (Specific payment method caps are in use as well).
                     **/
                    'ee_manage_gateways',
                    'ee_read_payment_methods',
                    'ee_read_others_payment_methods',
                    'ee_edit_payment_methods',
                    'ee_edit_others_payment_methods',
                    'ee_delete_payment_methods',
                    // events
                    'ee_publish_events',
                    'ee_read_private_events',
                    'ee_read_others_events',
                    'ee_read_events',
                    'ee_edit_events',
                    'ee_edit_published_events',
                    'ee_edit_others_events',
                    'ee_edit_private_events',
                    'ee_delete_published_events',
                    'ee_delete_private_events',
                    'ee_delete_events',
                    'ee_delete_others_events',
                    // event categories
                    'ee_manage_event_categories',
                    'ee_edit_event_category',
                    'ee_delete_event_category',
                    'ee_assign_event_category',
                    // venues
                    'ee_publish_venues',
                    'ee_read_venues',
                    'ee_read_others_venues',
                    'ee_read_private_venues',
                    'ee_edit_venues',
                    'ee_edit_others_venues',
                    'ee_edit_published_venues',
                    'ee_edit_private_venues',
                    'ee_delete_venues',
                    'ee_delete_others_venues',
                    'ee_delete_private_venues',
                    'ee_delete_published_venues',
                    // venue categories
                    'ee_manage_venue_categories',
                    'ee_edit_venue_category',
                    'ee_delete_venue_category',
                    'ee_assign_venue_category',
                    // contacts
                    'ee_read_contacts',
                    'ee_edit_contacts',
                    'ee_delete_contacts',
                    // registrations
                    'ee_read_registrations',
                    'ee_read_others_registrations',
                    'ee_edit_registrations',
                    'ee_edit_others_registrations',
                    'ee_delete_registrations',
                    // checkins
                    'ee_read_others_checkins',
                    'ee_read_checkins',
                    'ee_edit_checkins',
                    'ee_edit_others_checkins',
                    'ee_delete_checkins',
                    'ee_delete_others_checkins',
                    // transactions && payments
                    'ee_read_transaction',
                    'ee_read_transactions',
                    'ee_edit_payments',
                    'ee_delete_payments',
                    // messages
                    'ee_read_messages',
                    'ee_read_others_messages',
                    'ee_read_global_messages',
                    'ee_edit_global_messages',
                    'ee_edit_messages',
                    'ee_edit_others_messages',
                    'ee_delete_messages',
                    'ee_delete_others_messages',
                    'ee_delete_global_messages',
                    'ee_send_message',
                    // tickets
                    'ee_read_default_tickets',
                    'ee_read_others_default_tickets',
                    'ee_edit_default_tickets',
                    'ee_edit_others_default_tickets',
                    'ee_delete_default_tickets',
                    'ee_delete_others_default_tickets',
                    // prices
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
                    // registration form
                    'ee_edit_questions',
                    'ee_edit_system_questions',
                    'ee_read_questions',
                    'ee_delete_questions',
                    'ee_edit_question_groups',
                    'ee_read_question_groups',
                    'ee_edit_system_question_groups',
                    'ee_delete_question_groups',
                    // event_type taxonomy
                    'ee_assign_event_type',
                    'ee_manage_event_types',
                    'ee_edit_event_type',
                    'ee_delete_event_type',
                ),
                'ee_events_administrator' => array(
                    // core wp caps
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
                    'level_1', // required if user with this role shows up in author dropdowns
                    // basic ee access
                    'ee_read_ee',
                    // events
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
                    // event categories
                    'ee_manage_event_categories',
                    'ee_edit_event_category',
                    'ee_delete_event_category',
                    'ee_assign_event_category',
                    // venues
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
                    // venue categories
                    'ee_manage_venue_categories',
                    'ee_edit_venue_category',
                    'ee_delete_venue_category',
                    'ee_assign_venue_category',
                    // contacts
                    'ee_read_contacts',
                    'ee_edit_contacts',
                    'ee_delete_contacts',
                    // registrations
                    'ee_read_registrations',
                    'ee_read_others_registrations',
                    'ee_edit_registration',
                    'ee_edit_registrations',
                    'ee_edit_others_registrations',
                    'ee_delete_registration',
                    'ee_delete_registrations',
                    // checkins
                    'ee_read_others_checkins',
                    'ee_read_checkins',
                    'ee_edit_checkins',
                    'ee_edit_others_checkins',
                    'ee_delete_checkins',
                    'ee_delete_others_checkins',
                    // transactions && payments
                    'ee_read_transaction',
                    'ee_read_transactions',
                    'ee_edit_payments',
                    'ee_delete_payments',
                    // messages
                    'ee_read_messages',
                    'ee_read_others_messages',
                    'ee_read_global_messages',
                    'ee_edit_global_messages',
                    'ee_edit_messages',
                    'ee_edit_others_messages',
                    'ee_delete_messages',
                    'ee_delete_others_messages',
                    'ee_delete_global_messages',
                    'ee_send_message',
                    // tickets
                    'ee_read_default_tickets',
                    'ee_read_others_default_tickets',
                    'ee_edit_default_tickets',
                    'ee_edit_others_default_tickets',
                    'ee_delete_default_tickets',
                    'ee_delete_others_default_tickets',
                    // prices
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
                    // registration form
                    'ee_edit_questions',
                    'ee_edit_system_questions',
                    'ee_read_questions',
                    'ee_delete_questions',
                    'ee_edit_question_groups',
                    'ee_read_question_groups',
                    'ee_edit_system_question_groups',
                    'ee_delete_question_groups',
                    // event_type taxonomy
                    'ee_assign_event_type',
                    'ee_manage_event_types',
                    'ee_edit_event_type',
                    'ee_delete_event_type',
                ),
            )
        );
    }


    /**
     * @return bool
     * @throws EE_Error
     */
    private function setupCapabilitiesMap()
    {
        // if the initialization process hasn't even started, then we need to call init_caps()
        if ($this->initialized === null) {
            return $this->init_caps();
        }
        // unless resetting, get caps from db if we haven't already
        $this->capabilities_map = $this->reset || ! empty($this->capabilities_map)
            ? $this->capabilities_map
            : get_option(self::option_name, array());
        return true;
    }


    /**
     * @param bool $update
     * @return bool
     */
    private function updateCapabilitiesMap($update = true)
    {
        return $update ? update_option(self::option_name, $this->capabilities_map) : false;
    }


    /**
     * Adds capabilities to roles.
     *
     * @since 4.9.42
     * @param array $capabilities_to_add array of capabilities to add, indexed by roles.
     *                                   Note that this should ONLY be called on activation hook
     *                                   otherwise the caps will be added on every request.
     * @return bool
     * @throws \EE_Error
     */
    public function addCaps(array $capabilities_to_add)
    {
        // don't do anything if the capabilities map can not be initialized
        if (! $this->setupCapabilitiesMap()) {
            return false;
        }
        // and filter the array so others can get in on the fun during resets
        $capabilities_to_add = apply_filters(
            'FHEE__EE_Capabilities__addCaps__capabilities_to_add',
            $capabilities_to_add,
            $this->reset,
            $this->capabilities_map
        );
        $update_capabilities_map = false;
        // if not reset, see what caps are new for each role. if they're new, add them.
        foreach ($capabilities_to_add as $role => $caps_for_role) {
            if (is_array($caps_for_role)) {
                foreach ($caps_for_role as $cap) {
                    if (! $this->capHasBeenAddedToRole($role, $cap)
                        && $this->add_cap_to_role($role, $cap, true, false)
                    ) {
                        $update_capabilities_map = true;
                    }
                }
            }
        }
        // now let's just save the cap that has been set but only if there's been a change.
        $updated = $this->updateCapabilitiesMap($update_capabilities_map);
        $this->flushWpUser($updated);
        do_action('AHEE__EE_Capabilities__addCaps__complete', $this->capabilities_map, $updated);
        return $updated;
    }


    /**
     * Loops through the capabilities map and removes the role caps specified by the incoming array
     *
     * @param array $caps_map map of capabilities to be removed (indexed by roles)
     * @return bool
     * @throws \EE_Error
     */
    public function removeCaps($caps_map)
    {
        // don't do anything if the capabilities map can not be initialized
        if (! $this->setupCapabilitiesMap()) {
            return false;
        }
        $update_capabilities_map = false;
        foreach ($caps_map as $role => $caps_for_role) {
            if (is_array($caps_for_role)) {
                foreach ($caps_for_role as $cap) {
                    if ($this->capHasBeenAddedToRole($role, $cap)
                        && $this->remove_cap_from_role($role, $cap, false)
                    ) {
                        $update_capabilities_map = true;
                    }
                }
            }
        }
        // maybe resave the caps
        $updated = $this->updateCapabilitiesMap($update_capabilities_map);
        $this->flushWpUser($updated);
        return $updated;
    }


    /**
     * This ensures that the WP User object cached on the $current_user global in WP has the latest capabilities from
     * the roles on that user.
     *
     * @param bool $flush Default is to flush the WP_User object.  If false, then this method effectively does nothing.
     */
    private function flushWpUser($flush = true)
    {
        if ($flush) {
            $user = wp_get_current_user();
            if ($user instanceof WP_User) {
                $user->get_role_caps();
            }
        }
    }


    /**
     * This method sets a capability on a role.  Note this should only be done on activation, or if you have something
     * specific to prevent the cap from being added on every page load (adding caps are persistent to the db). Note.
     * this is a wrapper for $wp_role->add_cap()
     *
     * @see   wp-includes/capabilities.php
     * @since 4.5.0
     * @param string|WP_Role $role  A WordPress role the capability is being added to
     * @param string         $cap   The capability being added to the role
     * @param bool           $grant Whether to grant access to this cap on this role.
     * @param bool           $update_capabilities_map
     * @return bool
     * @throws \EE_Error
     */
    public function add_cap_to_role($role, $cap, $grant = true, $update_capabilities_map = true)
    {
        // capture incoming value for $role because we may need it to create a new WP_Role
        $orig_role = $role;
        $role = $role instanceof WP_Role ? $role : get_role($role);
        // if the role isn't available then we create it.
        if (! $role instanceof WP_Role) {
            // if a plugin wants to create a specific role name then they should create the role before
            // EE_Capabilities does.  Otherwise this function will create the role name from the slug:
            // - removes any `ee_` namespacing from the start of the slug.
            // - replaces `_` with ` ` (empty space).
            // - sentence case on the resulting string.
            $role_label = ucwords(str_replace(array('ee_', '_'), array('', ' '), $orig_role));
            $role = add_role($orig_role, $role_label);
        }
        if ($role instanceof WP_Role) {
            // don't do anything if the capabilities map can not be initialized
            if (! $this->setupCapabilitiesMap()) {
                return false;
            }
            if (! $this->capHasBeenAddedToRole($role->name, $cap)) {
                $role->add_cap($cap, $grant);
                $this->capabilities_map[ $role->name ][] = $cap;
                $this->updateCapabilitiesMap($update_capabilities_map);
                return true;
            }
        }
        return false;
    }


    /**
     * Functions similarly to add_cap_to_role except removes cap from given role.
     * Wrapper for $wp_role->remove_cap()
     *
     * @see   wp-includes/capabilities.php
     * @since 4.5.0
     * @param string|WP_Role $role A WordPress role the capability is being removed from.
     * @param string         $cap  The capability being removed
     * @param bool           $update_capabilities_map
     * @return bool
     * @throws \EE_Error
     */
    public function remove_cap_from_role($role, $cap, $update_capabilities_map = true)
    {
        // don't do anything if the capabilities map can not be initialized
        if (! $this->setupCapabilitiesMap()) {
            return false;
        }

        $role = $role instanceof WP_Role ? $role : get_role($role);
        if ($role instanceof WP_Role && $index = $this->capHasBeenAddedToRole($role->name, $cap, true)) {
            $role->remove_cap($cap);
            unset($this->capabilities_map[ $role->name ][ $index ]);
            $this->updateCapabilitiesMap($update_capabilities_map);
            return true;
        }
        return false;
    }


    /**
     * @param string $role_name
     * @param string $cap
     * @param bool   $get_index
     * @return bool|mixed
     */
    private function capHasBeenAddedToRole($role_name = '', $cap = '', $get_index = false)
    {
        if (isset($this->capabilities_map[ $role_name ])
            && ($index = array_search($cap, $this->capabilities_map[ $role_name ], true)) !== false
        ) {
            return $get_index ? $index : true;
        }
        return false;
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
        // apply filters (both a global on just the cap, and context specific.  Global overrides context specific)
        $filtered_cap = apply_filters('FHEE__EE_Capabilities__current_user_can__cap__' . $context, $cap, $id);
        $filtered_cap = apply_filters(
            'FHEE__EE_Capabilities__current_user_can__cap',
            $filtered_cap,
            $context,
            $cap,
            $id
        );
        return ! empty($id)
            ? current_user_can($filtered_cap, $id)
            : current_user_can($filtered_cap);
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
        // apply filters (both a global on just the cap, and context specific.  Global overrides context specific)
        $filtered_cap = apply_filters('FHEE__EE_Capabilities__user_can__cap__' . $context, $cap, $user, $id);
        $filtered_cap = apply_filters(
            'FHEE__EE_Capabilities__user_can__cap',
            $filtered_cap,
            $context,
            $cap,
            $user,
            $id
        );
        return ! empty($id)
            ? user_can($user, $filtered_cap, $id)
            : user_can($user, $filtered_cap);
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
        $user_can = ! empty($id)
            ? current_user_can_for_blog($blog_id, $cap, $id)
            : current_user_can($blog_id, $cap);
        // apply filters (both a global on just the cap, and context specific.  Global overrides context specific)
        $user_can = apply_filters(
            'FHEE__EE_Capabilities__current_user_can_for_blog__user_can__' . $context,
            $user_can,
            $blog_id,
            $cap,
            $id
        );
        $user_can = apply_filters(
            'FHEE__EE_Capabilities__current_user_can_for_blog__user_can',
            $user_can,
            $context,
            $blog_id,
            $cap,
            $id
        );
        return $user_can;
    }


    /**
     * This helper method just returns an array of registered EE capabilities.
     *
     * @since 4.5.0
     * @param string $role If empty then the entire role/capability map is returned.
     *                     Otherwise just the capabilities for the given role are returned.
     * @return array
     * @throws EE_Error
     */
    public function get_ee_capabilities($role = 'administrator')
    {
        if (! $this->initialized) {
            $this->init_caps();
        }
        if (empty($role)) {
            return $this->capabilities_map;
        }
        return isset($this->capabilities_map[ $role ])
            ? $this->capabilities_map[ $role ]
            : array();
    }


    /**
     * @deprecated 4.9.42
     * @param bool  $reset      If you need to reset Event Espresso's capabilities,
     *                          then please use the init_caps() method with the "$reset" parameter set to "true"
     * @param array $caps_map   Optional.
     *                          Can be used to send a custom map of roles and capabilities for setting them up.
     *                          Note that this should ONLY be called on activation hook or some other one-time
     *                          task otherwise the caps will be added on every request.
     * @return void
     * @throws EE_Error
     */
    public function init_role_caps($reset = false, $caps_map = array())
    {
        // If this method is called directly and reset is set as 'true',
        // then display a doing it wrong notice, because we want resets to go through init_caps()
        // to guarantee that everything is set up correctly.
        // This prevents the capabilities map getting reset incorrectly by direct calls to this method.
        if ($reset) {
            EE_Error::doing_it_wrong(
                __METHOD__,
                sprintf(
                    esc_html__(
                        'The "%1$s" parameter for the "%2$s" method is deprecated. If you need to reset Event Espresso\'s capabilities, then please use the "%3$s" method with the "%1$s" parameter set to "%4$s".',
                        'event_espresso'
                    ),
                    '$reset',
                    __METHOD__ . '()',
                    'EE_Capabilities::init_caps()',
                    'true'
                ),
                '4.9.42',
                '5.0.0'
            );
        }
        $this->addCaps($caps_map);
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
        // verify there are four args in the $map_values array;
        if (count($map_values) !== 4) {
            throw new EE_Error(
                sprintf(
                    __(
                        'Incoming $map_values array should have a count of four values in it.  This is what was given: %s',
                        'event_espresso'
                    ),
                    '<br>' . print_r($map_values, true)
                )
            );
        }
        // set properties
        $this->_model = null;
        $this->_model_name = $map_values[0];
        $this->published_cap = (string) $map_values[1];
        $this->others_cap = (string) $map_values[2];
        $this->private_cap = (string) $map_values[3];
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
        // is it already instantiated?
        if ($this->_model instanceof EEM_Base) {
            return;
        }
        // ensure model name is string
        $this->_model_name = (string) $this->_model_name;
        // error proof if the name has EEM in it
        $this->_model_name = str_replace('EEM', '', $this->_model_name);
        $this->_model = EE_Registry::instance()->load_model($this->_model_name);
        if (! $this->_model instanceof EEM_Base) {
            throw new EE_Error(
                sprintf(
                    __(
                        'This string passed in to %s to represent a EEM_Base model class was not able to be used to instantiate the class.   Please ensure that the string is a match for the EEM_Base model name (not including the EEM_ part). This was given: %s',
                        'event_espresso'
                    ),
                    get_class($this),
                    $this->_model
                )
            );
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
        // only process if we're checking our mapped_cap
        if ($cap !== $this->meta_cap) {
            return $caps;
        }

        // okay it is a meta cap so let's first remove that cap from the $caps array.
        if (($key = array_search($cap, $caps)) !== false) {
            unset($caps[ $key ]);
        }

        // cast $user_id to int for later explicit comparisons
        $user_id = (int) $user_id;

        /** @var EE_Base_Class $obj */
        $obj = ! empty($args[0]) ? $this->_model->get_one_by_ID($args[0]) : null;
        // if no obj then let's just do cap
        if (! $obj instanceof EE_Base_Class) {
            $caps[] = 'do_not_allow';
            return $caps;
        }
        $caps[] = $cap . 's';
        if ($obj instanceof EE_CPT_Base) {
            // if the item author is set and the user is the author...
            if ($obj->wp_user() && $user_id === $obj->wp_user()) {
                // if obj is published...
                if ($obj->status() === 'publish') {
                    $caps[] = $this->published_cap;
                }
            } else {
                // the user is trying to edit someone else's obj
                if (! empty($this->others_cap)) {
                    $caps[] = $this->others_cap;
                }
                if (! empty($this->published_cap) && $obj->status() === 'publish') {
                    $caps[] = $this->published_cap;
                } elseif (! empty($this->private_cap) && $obj->status() === 'private') {
                    $caps[] = $this->private_cap;
                }
            }
        } else {
            // not a cpt object so handled differently
            $has_cap = false;
            try {
                $has_cap = method_exists($obj, 'wp_user')
                           && $obj->wp_user()
                           && $obj->wp_user() === $user_id;
            } catch (Exception $e) {
                if (WP_DEBUG) {
                    EE_Error::add_error($e->getMessage(), __FILE__, __FUNCTION__, __LINE__);
                }
            }
            if (! $has_cap) {
                if (! empty($this->others_cap)) {
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
        // only process if we're checking our mapped cap;
        if ($cap !== $this->meta_cap) {
            return $caps;
        }

        // okay it is a meta cap so let's first remove that cap from the $caps array.
        if (($key = array_search($cap, $caps)) !== false) {
            unset($caps[ $key ]);
        }

        // cast $user_id to int for later explicit comparisons
        $user_id = (int) $user_id;

        $obj = ! empty($args[0]) ? $this->_model->get_one_by_ID($args[0]) : null;
        // if no obj then let's just do cap
        if (! $obj instanceof EE_Base_Class) {
            $caps[] = 'do_not_allow';
            return $caps;
        }

        $caps[] = $cap . 's';
        if ($obj instanceof EE_CPT_Base) {
            $status_obj = get_post_status_object($obj->status());
            if ($status_obj->public) {
                return $caps;
            }
            // if the item author is set and the user is not the author...
            if ($obj->wp_user() && $obj->wp_user() !== $user_id) {
                if (! empty($this->others_cap)) {
                    $caps[] = $this->others_cap;
                }
            }
            // yes this means that if users created the private post, they are able to see it regardless of private cap.
            if ($status_obj->private
                && ! empty($this->private_cap)
                && $obj->wp_user() !== $user_id
            ) {
                // the user is trying to view a private object for an object they don't own.
                $caps[] = $this->private_cap;
            }
        } else {
            // not a cpt object so handled differently
            $has_cap = false;
            try {
                $has_cap = method_exists($obj, 'wp_user')
                           && $obj->wp_user()
                           && $obj->wp_user() === $user_id;
            } catch (Exception $e) {
                if (WP_DEBUG) {
                    EE_Error::add_error($e->getMessage(), __FILE__, __FUNCTION__, __LINE__);
                }
            }
            if (! $has_cap) {
                if (! empty($this->private_cap)) {
                    $caps[] = $this->private_cap;
                }
                if (! empty($this->others_cap)) {
                    $caps[] = $this->others_cap;
                }
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
        // only process if we're checking our mapped_cap
        if ($cap !== $this->meta_cap) {
            return $caps;
        }

        // okay it is a meta cap so let's first remove that cap from the $caps array.
        if (($key = array_search($cap, $caps)) !== false) {
            unset($caps[ $key ]);
        }

        // cast $user_id to int for later explicit comparisons
        $user_id = (int) $user_id;

        $obj = ! empty($args[0]) ? $this->_model->get_one_by_ID($args[0]) : null;
        // if no obj then let's just do cap
        if (! $obj instanceof EE_Message_Template_Group) {
            $caps[] = 'do_not_allow';
            return $caps;
        }
        $caps[] = $cap . 's';
        $is_global = $obj->is_global();
        if ($obj->wp_user() && $obj->wp_user() === $user_id) {
            if ($is_global) {
                $caps[] = $this->private_cap;
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
     * @param array  $caps    actual users capabilities
     * @param string $cap     initial capability name that is being checked (the "map" key)
     * @param int    $user_id The user id
     * @param array  $args    Adds context to the cap. Typically the object ID.
     * @return array   actual users capabilities
     */
    protected function _map_meta_caps($caps, $cap, $user_id, $args)
    {
        // only process if we're checking our mapped_cap
        if ($cap !== $this->meta_cap) {
            return $caps;
        }
        // okay it is a meta cap so let's first remove that cap from the $caps array.
        if (($key = array_search($cap, $caps)) !== false) {
            unset($caps[ $key ]);
        }
        $obj = ! empty($args[0]) ? $this->_model->get_one_by_ID($args[0]) : null;
        // if no obj then let's just do cap
        if (! $obj instanceof EE_Base_Class) {
            $caps[] = 'do_not_allow';
            return $caps;
        }
        $caps[] = $cap . 's';
        $is_system = $obj instanceof EE_Question_Group ? $obj->system_group() : false;
        $is_system = $obj instanceof EE_Question ? $obj->is_system_question() : $is_system;
        if ($is_system) {
            $caps[] = $this->private_cap;
        }
        return $caps;
    }
}
