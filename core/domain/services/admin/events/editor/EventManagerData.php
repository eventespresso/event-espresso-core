<?php

namespace EventEspresso\core\domain\services\admin\events\editor;

use EventEspresso\core\domain\entities\users\EventManagers;
use EventEspresso\core\domain\services\graphql\Utilities;

/**
 * Class EventManagerData
 *
 * formats a list of event manager users for use with GraphQL
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\services\admin\events\editor
 * @since   $VID:$
 */
class EventManagerData implements EventEditorDataInterface
{

    /**
     * @var EventManagers
     */
    private $event_managers;

    /**
     * @var Utilities
     */
    private $utilities;


    /**
     * EventManagerRoles constructor.
     *
     * @param EventManagers $event_managers
     * @param Utilities $utilities
     */
    public function __construct(EventManagers $event_managers, Utilities $utilities)
    {
        $this->event_managers = $event_managers;
        $this->utilities = $utilities;
    }


    /**
     * @param int $eventId
     * @return array
     */
    public function getData(int $eventId): array
    {
        $event_managers = [];
        $event_manager_users = $this->event_managers->userList();
        // now convert to a format that's usable by GQL
        foreach ($event_manager_users as $user) {
            $GUID = $this->utilities->convertToGlobalId('user', $user->ID);
            $event_managers[] = [
                'id'   => $GUID,
                'name' => $user->display_name,
            ];
        }
        return $event_managers;
    }
}
