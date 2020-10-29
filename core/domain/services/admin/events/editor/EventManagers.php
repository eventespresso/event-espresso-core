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
        // first get a list of WP_Role names that have "event manager" capabilities
        $event_manager_roles = $this->getEventManagerRoles();
        // then get a list of WP Users that have any of those roles
        $event_manager_users = $this->getEventManagerUsers($event_manager_roles);
        // now convert to a format that's usable by AGQL
        $event_managers = [];
        foreach ($event_manager_users as $user) {
            $event_managers[] = [
                'id' => $this->utilities->convertToGlobalId('User', $user->ID),
                'name' => $user->display_name,
            ];
        }
        return $event_managers;
    }


    /**
     * Returns a list of WP_Role names that have "event manager" capabilities
     * The list of "event manager" capabilities is filtered but defaults to:
     *      - 'ee_edit_events'
     *      - 'ee_edit_event'
     *
     * @return WP_Role[]
     */
    private function getEventManagerRoles()
    {
        global $wp_roles;
        // first let's grab all of the WP_Role objects
        $roles = $wp_roles->role_objects;
        // then filter a list of capabilities we want to use to define an event manager
        $capabilities = apply_filters(
            'FHEE__EventEspresso_core_domain_services_admin_events_editor_EventManagers__getData__capabilities',
            ['ee_edit_events', 'ee_edit_event'],
            $roles
        );
        // we'll use this array to capture all of the WP_Role objects that have any of the caps we are targeting
        $event_manager_roles = [];
        foreach ($roles as $role) {
            foreach ($capabilities as $capability) {
                // we're using the role name as the array index to prevent duplicates
                if(! isset($event_manager_roles[ $role->name ]) && $role->has_cap($capability)) {
                    $event_manager_roles[ $role->name ] = $role;
                }
            }
        }
        return $event_manager_roles;
    }


    /**
     * Returns a list of users that have any of the supplied roles
     *
     * @param array $event_manager_roles
     * @return stdClass[]
     */
    private function getEventManagerUsers(array $event_manager_roles)
    {
        global $wpdb;
        // now begin to build our
        $SQL = "SELECT u1.ID, u1.display_name FROM {$wpdb->users} AS u1 "
               . "INNER JOIN {$wpdb->usermeta} AS u2 ON u1.ID = u2.user_id "
               . "AND u2.meta_key='{$wpdb->prefix}capabilities' "
               . 'WHERE';
        $operator = '';
        foreach ($event_manager_roles as $role) {
            if ($role instanceof WP_Role) {
                $SQL .= $operator . ' u2.meta_value LIKE \'%"' . $role->name . '"%\' ';
                $operator = 'OR';
            }
        }
        $SQL .= "ORDER BY user_id ASC";
        $users = $wpdb->get_results($SQL);
        return ! empty($users) ? $users : [];
    }
}