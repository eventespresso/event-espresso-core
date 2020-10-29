<?php

namespace EventEspresso\core\domain\services\admin\events\editor;

use EventEspresso\core\domain\services\graphql\Utilities;

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
        global $wpdb, $wp_roles;
        $roles = $wp_roles->role_objects;
        $capabilities = apply_filters(
            'FHEE__EventEspresso_core_domain_services_admin_events_editor_EventManagers__getData__capability',
            ['ee_edit_events', 'ee_edit_event'],
            $roles
        );
        $SQL = "SELECT u1.ID, u1.display_name FROM {$wpdb->users} AS u1 "
               . "INNER JOIN {$wpdb->usermeta} AS u2 ON u1.ID = u2.user_id "
               . "AND u2.meta_key='{$wpdb->prefix}capabilities' "
               . 'WHERE';
        $operator = '';
        foreach ($roles as $role) {
            foreach ($capabilities as $capability) {
                if($role->has_cap($capability)) {
                    $SQL .= $operator . ' u2.meta_value LIKE \'%"' . $role->name . '"%\' ';
                    $operator = 'OR';
                }
            }
        }
        $SQL .= "ORDER BY user_id ASC";
        $users = $wpdb->get_results($SQL);
        $event_managers = [];
        foreach ($users as $user) {
            $event_managers[] = [
                'id' => $this->utilities->convertToGlobalId('User', $user->ID),
                'name' => $user->display_name,
            ];
        }
        return $event_managers;
    }
}