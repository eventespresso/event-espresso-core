<?php

namespace EventEspresso\core\domain\entities\users;

use WP_User;

/**
 * Class CurrentUser
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\entities\users
 * @since   5.0.0.p
 */
class CurrentUser
{
    private EventManagers $event_managers;

    private ?WP_User $current_user     = null;

    private bool $is_event_manager = false;

    private bool $is_logged_in     = false;

    private bool $is_super_admin   = false;


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
            $this->current_user     = wp_get_current_user();
            $event_manager_roles    = array_keys($this->event_managers->roles());
            $current_user_roles     = $this->current_user->roles;
            $this->is_event_manager = ! empty(array_intersect($event_manager_roles, $current_user_roles));
            $this->is_super_admin   = is_super_admin($this->current_user->ID);
            $this->is_logged_in     = $this->current_user->exists();
        }
    }


    /**
     * @return WP_User
     */
    public function currentUser(): ?WP_User
    {
        return $this->current_user;
    }


    /**
     * @return bool
     */
    public function isEventManager(): bool
    {
        return $this->is_event_manager;
    }


    /**
     * @return bool
     */
    public function isLoggedIn(): bool
    {
        return $this->is_logged_in;
    }


    /**
     * @return bool
     * @since 5.0.8.p
     */
    public function isSuperAdmin(): bool
    {
        return $this->is_super_admin;
    }
}
