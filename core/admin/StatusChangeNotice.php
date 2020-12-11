<?php

namespace EventEspresso\core\admin;

use EventEspresso\core\services\database\WordPressOption;
use RuntimeException;
use WP_User;

/**
 * Class StatusChangeNotice
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\admin
 * @since   $VID:$
 */
class StatusChangeNotice extends WordPressOption
{
    public function __construct()
    {
        parent::__construct('ee_hide_status_change_notices_for_users', [], false);
    }


    /**
     * @return int
     * @throws RuntimeException
     */
    public function dismiss(): int
    {
        $user      = $this->getCurrentUser();
        $dismissed = (array) $this->loadOption();
        if (! in_array($user, $dismissed)) {
            $dismissed[] = $user;
        }
        return $this->updateOption($dismissed);
    }


    /**
     * @return bool
     * @throws RuntimeException
     */
    public function isDismissed(): bool
    {
        $user      = $this->getCurrentUser();
        $dismissed = (array) $this->loadOption();
        return in_array($user, $dismissed);
    }


    /**
     * @return string
     * @throws RuntimeException
     */
    private function getCurrentUser(): string
    {
        $user = wp_get_current_user();
        if (! $user instanceof WP_User) {
            throw new RuntimeException(
                esc_html__('A valid WP User could not be retrieved.', 'event_espresso')
            );
        }
        return $user->user_login;
    }
}
