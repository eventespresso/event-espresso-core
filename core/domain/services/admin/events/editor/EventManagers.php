<?php

namespace EventEspresso\core\domain\services\admin\events\editor;

use EventEspresso\core\domain\services\graphql\Utilities;
use stdClass;
use WP_Role;

/**
 * Class EventManagers
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\services\admin\events\editor
 * @since   $VID:$
 */
class EventManagers implements EventEditorDataInterface
{

    /**
     * @var array
     */
    private $event_managers = [];

    /**
     * @var Utilities
     */
    private $utilities;


    /**
     * EventManagers constructor.
     *
     * @param Utilities $utilities
     */
    public function __construct(Utilities $utilities)
    {
        $this->utilities = $utilities;
    }


    /**
     * @param int $eventId
     * @return array
     */
    public function getData(int $eventId)
    {
        if (empty($this->event_managers)) {
            [$roles, $capabilities] = $this->getRoleAndCapabilities();
            // first get a list of WP_Roles that have "event manager" capabilities
            $event_manager_roles = $this->getEventManagerRoles($roles, $capabilities);
            // then get a list of WP Users that have any of those roles
            $event_manager_users = $this->getEventManagerUsers($event_manager_roles, $capabilities);
            // now convert to a format that's usable by GQL
            foreach ($event_manager_users as $user) {
                $GUID             = $this->utilities->convertToGlobalId('user', $user->ID);
                $this->event_managers[] = [
                    'id'   => $GUID,
                    'name' => $user->display_name,
                ];
            }
        }
        return $this->event_managers;
    }


    private function getRoleAndCapabilities()
    {
        global $wp_roles;
        // first let's grab all of the WP_Role objects
        $roles = $wp_roles->role_objects;
        // then filter a list of capabilities we want to use to define an event manager
        $capabilities = (array) apply_filters(
            'FHEE__EventEspresso_core_domain_services_admin_events_editor_EventManagers__getRoleAndCapabilities__capabilities',
            ['ee_edit_events', 'ee_edit_event'],
            $roles
        );
        $capabilities = array_map('sanitize_text_field', $capabilities);
        return [$roles, $capabilities];
    }


    /**
     * Returns a list of WP_Role that have "event manager" capabilities
     * The list of "event manager" capabilities is filtered but defaults to:
     *      - 'ee_edit_events'
     *      - 'ee_edit_event'
     *
     * @param WP_Role[] $roles
     * @param string[]  $capabilities
     * @return WP_Role[]
     */
    private function getEventManagerRoles(array $roles, array $capabilities = [])
    {
        // we'll use this array to capture all of the WP_Role objects that have any of the caps we are targeting
        $event_manager_roles = [];
        foreach ($roles as $role) {
            if ($role instanceof WP_Role) {
                foreach ($capabilities as $capability) {
                    // we're using the role name as the array index to prevent duplicates
                    if (! isset($event_manager_roles[ $role->name ]) && $role->has_cap($capability)) {
                        $event_manager_roles[ $role->name ] = $role;
                    }
                }
            }
        }
        return $event_manager_roles;
    }


    /**
     * Returns a list of users that have any of the supplied roles
     *
     * @param WP_Role[] $event_manager_roles
     * @param string[]  $capabilities
     * @return stdClass[]
     */
    private function getEventManagerUsers(array $event_manager_roles, array $capabilities)
    {
        global $wpdb;
        // no roles ?!!? then nothing to query for
        if (empty($event_manager_roles)) {
            return [];
        }
        // begin to build our query
        $SQL = "SELECT u1.ID, u1.display_name FROM {$wpdb->users} AS u1 "
             . "INNER JOIN {$wpdb->usermeta} AS u2 ON u1.ID = u2.user_id "
             . "AND u2.meta_key='{$wpdb->prefix}capabilities' "
             . 'WHERE';
        $operator = '';
        foreach ($event_manager_roles as $role) {
            // for each role, add a WHERE clause
            if ($role instanceof WP_Role) {
                $SQL     .= $operator . ' u2.meta_value LIKE \'%"' . $role->name . '"%\' ';
                // subsequent clauses will use OR so that any role is accepted
                $operator = 'OR';
            }
        }
        foreach ($capabilities as $capability) {
            // for each capability, add a WHERE clause
            $SQL     .= $operator . ' u2.meta_value LIKE \'%"' . $capability . '";b:1;%\' ';
            // subsequent clauses will use OR so that any role is accepted
            $operator = 'OR';
        }
        $SQL  .= "ORDER BY user_id ASC";
        $users = $wpdb->get_results($SQL);
        return ! empty($users) ? $users : [];
    }
}
