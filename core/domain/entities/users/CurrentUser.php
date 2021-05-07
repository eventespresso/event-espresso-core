<?php

namespace EventEspresso\core\domain\entities\users;

use WP_User;

/**
 * Class CurrentUser
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\entities\users
 * @since   $VID:$
 */
class CurrentUser
{

    /**
     * @var WP_User
     */
    private $current_user;

    /**
     * @var boolean
     */
    private $is_event_manager = false;

    /**
     * @var boolean
     */
    private $is_logged_in = false;


    /**
     * @var EventManagers
     */
    private $event_managers;


    /**
     * CurrentUser constructor.
     *
     * @param EventManagers $event_managers
     */
    public function __construct(EventManagers $event_managers)
    {
        $this->event_managers = $event_managers;
        $this->setCurrentUser();
    }


    public function setCurrentUser(): void
    {
        if (! $this->current_user instanceof WP_User) {
            $this->current_user = wp_get_current_user();
            $event_manager_roles    = array_keys($this->event_managers->roles());
            $current_user_roles     = $this->current_user->roles;
            $this->is_event_manager = ! empty(array_intersect($event_manager_roles, $current_user_roles));
            $this->is_logged_in     = $this->current_user->ID !== 0;
        }
    }


    /**
     * @return WP_User
     */
    public function currentUser(): ?WP_User
    {
        $this->setCurrentUser();
        return $this->current_user;
    }


    /**
     * @return bool
     */
    public function isEventManager(): bool
    {
        $this->setCurrentUser();
        return $this->is_event_manager;
    }


    /**
     * @return bool
     */
    public function isLoggedIn(): bool
    {
        $this->setCurrentUser();
        return $this->is_logged_in;
    }
}
