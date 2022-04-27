<?php

namespace EventEspresso\core\domain\services\admin\notices\status_change;

use EE_Registry;
use EEH_Template;
use EventEspresso\core\services\database\WordPressOption;
use RuntimeException;
use WP_User;

use function esc_html__;
use function wp_get_current_user;

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


    public static function loadAssets()
    {
        wp_enqueue_style(
            'status_change_notice',
            EE_PLUGIN_DIR_URL . 'core/domain/services/admin/notices/status_change/status_change_notice.css',
            ['espresso_menu'],
            EVENT_ESPRESSO_VERSION
        );
        wp_enqueue_script(
            'status_change_notice',
            EE_PLUGIN_DIR_URL . 'core/domain/services/admin/notices/status_change/status_change_notice.js',
            ['jquery'],
            EVENT_ESPRESSO_VERSION,
            true
        );
        wp_localize_script(
            'status_change_notice',
            'eeStatusChangeNotice',
            [
                'failed_request_msg' => wp_strip_all_tags(
                    __(
                        'Request failed. The server returned status code: ',
                        'event_espresso'
                    )
                ),
                'unknown_error_msg' => wp_strip_all_tags(
                    __(
                        'Oops... an unknown error has occurred on the server and this notice could not be dismissed.',
                        'event_espresso'
                    )
                ),
            ]
        );
    }


    public function display(string $context, string $page_slug): string
    {
        return $this->isNotDismissed()
            ? EEH_Template::display_template(
                __DIR__ . '/status_change_notice.template.php',
                [
                    'context'   => $context,
                    'page_slug' => ! empty($page_slug) ? "{$page_slug}-page" : '',
                ],
                true
            )
            : '';
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
     * @return bool
     * @throws RuntimeException
     */
    public function isNotDismissed(): bool
    {
        return ! $this->isDismissed();
    }


    /**
     * @return string
     * @throws RuntimeException
     */
    private function getCurrentUser(): string
    {
        $user = wp_get_current_user();
        if (! $user instanceof WP_User || ! $user->exists()) {
            throw new RuntimeException(
                esc_html__('A valid WP User could not be retrieved.', 'event_espresso')
            );
        }
        return $user->user_login;
    }
}
