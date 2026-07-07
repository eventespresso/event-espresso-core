<?php

namespace EventEspresso\core\domain\services\service_changes;

use EventEspresso\core\domain\Domain;
use EventEspresso\core\domain\entities\notifications\PersistentAdminNotice;
use EventEspresso\core\services\notifications\PersistentAdminNoticeManager;

/**
 * Class Version51ReleaseNotice
 *
 * Displays an admin notice warning users that Event Espresso 5.1 is an upcoming
 * major release that requires updating core and all active add-ons simultaneously
 * to prevent compatibility issues. The notice is dismissible and also disappears
 * automatically once version 5.1.0 or later is installed.
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\domain\services\service_changes
 * @author      Tony Warwick
 * @since       5.0.57
 */
class Version51ReleaseNotice
{
    private const NOTICE_NAME    = 'ee-version-5-1-release-notice';

    private const TARGET_VERSION = '5.1.0';


    /**
     * @return void
     */
    public function setHooks(): void
    {
        add_action('admin_notices', [$this, 'loadAdminNotice'], 0);
    }


    /**
     * Displays the 5.1 release warning notice, or purges it once 5.1.0+ is installed.
     * Callback for the `admin_notices` action.
     *
     * @return void
     */
    public function loadAdminNotice(): void
    {
        if (version_compare(EVENT_ESPRESSO_VERSION, self::TARGET_VERSION, '>=')) {
            PersistentAdminNoticeManager::deletePersistentAdminNotice(self::NOTICE_NAME);
            return;
        }
        new PersistentAdminNotice(
            self::NOTICE_NAME,
            $this->noticeMessage(),
            false,
            'manage_options',
            'view EE 5.1 release notice',
            false,
            PersistentAdminNotice::TYPE_WARNING
        );
    }


    /**
     * @return string
     */
    private function noticeMessage(): string
    {
        $brand = Domain::brandName();
        return sprintf(
            '<h3>%1$s</h3>%2$s',
            sprintf(
                /* translators: %1$s: plugin brand name e.g. "Event Espresso" */
                esc_html__('Important: %1$s 5.1 is Coming - Update Core and Add-ons Together', 'event_espresso'),
                $brand
            ),
            sprintf(
                /* translators: %1$s: opening <p>; %2$s: plugin brand name; %3$s: opening <strong>; %4$s: closing </strong>; %5$s: closing </p> */
                esc_html__(
                    '%1$s%2$s 5.1 is a major release. %3$sWhen the update is available, update %2$s core and any add-ons together to avoid compatibility issues.%4$s We strongly recommend taking a full site backup first. This notice will disappear once %2$s 5.1 is installed. Contact %2$s support if you have questions or need help.%5$s',
                    'event_espresso'
                ),
                '<p>',
                $brand,
                '<strong>',
                '</strong>',
                '</p>'
            )
        );
    }
}
