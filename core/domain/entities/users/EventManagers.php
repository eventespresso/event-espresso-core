<?php

namespace EventEspresso\core\domain\entities\users;

use stdClass;
use WP_Role;

/**
 * Class EventManagers
 * compiles and stores information about event manager capabilities, roles, and users
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\entities\users
 * @since   $VID:$
 */
class EventManagers
{

    /**
     * @var string[]
     */
    private $capabilities = [];

    /**
     * @var WP_Role[]
     */
    private $roles = [];

    /**
     * @var array
     */
    private $user_list = [];

    /**
     * @var WP_Role[]
     */
    private $wp_roles;


    /**
     * EventManagerRoles constructor.
     */
    public function __construct()
    {
        global $wp_roles;
        // first let's grab ALL of the WP_Role objects
        $this->wp_roles = $wp_roles->role_objects;
        $this->setCapabilities();
        $this->buildRolesArray();
        $this->buildUserList();
    }


    private function setCapabilities(): void
    {
        // filter a list of capabilities we want to use to define an event manager
        $capabilities = (array) apply_filters(
            'FHEE__EventEspresso_core_domain_services_capabilities_EventManagers__setCapabilities',
            ['ee_edit_events', 'ee_edit_event'],
            $this->wp_roles
        );
        $this->capabilities = array_map('sanitize_text_field', $capabilities);
    }


    private function buildRolesArray(): void
    {
        // we'll use this array to capture all of the WP_Role objects that have any of the caps we are targeting
        $event_manager_roles = [];
        foreach ($this->wp_roles as $role) {
            if ($role instanceof WP_Role) {
                foreach ($this->capabilities as $capability) {
                    // we're using the role name as the array index to prevent duplicates
                    if (! isset($event_manager_roles[ $role->name ]) && $role->has_cap($capability)) {
                        $event_manager_roles[ $role->name ] = $role;
                    }
                }
            }
        }
        $this->roles = $event_manager_roles;
    }


    private function buildUserList(): void
    {
        global $wpdb;
        // no roles ?!!? then nothing to query for
        if (empty($this->roles)) {
            $this->user_list = [];
        }
        // begin to build our query
        $SQL      = "SELECT u1.ID, u1.display_name FROM $wpdb->users AS u1 "
                    . "INNER JOIN $wpdb->usermeta AS u2 ON u1.ID = u2.user_id "
                    . "AND u2.meta_key='{$wpdb->prefix}capabilities' "
                    . 'WHERE';
        $operator = '';
        foreach ($this->roles as $role) {
            // for each role, add a WHERE clause
            if ($role instanceof WP_Role) {
                $SQL .= $operator . ' u2.meta_value LIKE \'%"' . $role->name . '"%\' ';
                // subsequent clauses will use OR so that any role is accepted
                $operator = 'OR';
            }
        }
        foreach ($this->capabilities as $capability) {
            // for each capability, add a WHERE clause
            $SQL .= $operator . ' u2.meta_value LIKE \'%"' . $capability . '";b:1;%\' ';
            // subsequent clauses will use OR so that any role is accepted
            $operator = 'OR';
        }
        $SQL   .= 'ORDER BY user_id ASC';
        $users = $wpdb->get_results($SQL);

        $this->user_list = ! empty($users) ? $users : [];
    }


    /**
     * @return array
     */
    public function capabilities(): array
    {
        return $this->capabilities;
    }


    /**
     * Returns a list of WP_Role objects that have "event manager" capabilities
     * The list of "event manager" capabilities is filtered but defaults to:
     *      - 'ee_edit_events'
     *      - 'ee_edit_event'
     *
     * @return WP_Role[]
     */
    public function roles(): array
    {
        return $this->roles;
    }


    /**
     * Returns a list of users that have any of the Event Manager roles
     *
     * @return stdClass[]
     */
    public function userList(): array
    {
        return $this->user_list;
    }
}
