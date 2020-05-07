<?php
namespace EventEspresso\core\domain\services\admin;

use WP_User;

/**
 * ExitModal
 * Sets up server side logic etc for the exit modal survey triggered when deactivating EE core.
 *
 * DEVELOPERS: this is a in progress api, do not use this class or rely on its api to remain consistent.
 *
 * @package EventEspresso\core\domain\services\admin
 * @author  Darren Ethier
 * @since   4.9.59.p
 */
class ExitModal
{

    /**
     * ExitModal constructor.
     */
    public function __construct()
    {
    }


    /**
     * @return array
     * @since $VID:$
     */
    public function getExitSurveyInfo()
    {
        $current_user = new WP_User(get_current_user_id());
        return [
            'firstName'     => htmlspecialchars($current_user->user_firstname),
            'emailAddress'  => htmlspecialchars($current_user->user_email),
            'website'       => htmlspecialchars(site_url()),
            'isModalActive' => $this->isModalActive()
        ];
    }


    /**
     * Exposes a filter switch for turning off the enqueueing of the modal script.
     * @return bool
     */
    private function isModalActive()
    {
        return filter_var(
            apply_filters(
                'FHEE__EventEspresso_core_domain_services_admin_ExitModal__isModalActive',
                true
            ),
            FILTER_VALIDATE_BOOLEAN
        );
    }


    /**
     * @deprecated $VID:$
     */
    public function modalContainer()
    {
    }

    /**
     * @deprecated $VID:$
     */
    public function enqueues()
    {
    }
}
