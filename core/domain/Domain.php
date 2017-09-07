<?php

namespace EventEspresso\core\domain;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * DomainBase Class
 * A container for all domain data related to Event Espresso Core
 *
 * @package EventEspresso\core\domain
 * @author  Brent Christensen
 * @since   4.9.44
 */
class Domain extends DomainBase
{
    /**
     * Slug used for the context where a registration status is changed from a manual trigger in the Registration Admin
     * Page ui.
     */
    const MANUAL_STATUS_CHANGE_FROM_REGISTRATION_ADMIN_UI_CONTEXT
        = 'manual_registration_status_change_from_registration_admin';

    const MANUAL_STATUS_CHANGE_FROM_REGISTRATION_ADMIN_UI_AND_NOTIFY_CONTEXT
        = 'manual_registration_status_change_from_registration_admin_and_notify';
}
