<?php

namespace EventEspresso\core\domain;

use EventEspresso\core\domain\values\FilePath;
use EventEspresso\core\domain\values\Version;

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
     * URL path component used to denote an API request
     */
    const API_NAMESPACE = 'ee/v';

    /**
     * Slug used for the context where a registration status is changed from a manual trigger in the Registration Admin
     * Page ui.
     */
    const CONTEXT_REGISTRATION_STATUS_CHANGE_REGISTRATION_ADMIN
        = 'manual_registration_status_change_from_registration_admin';

    const CONTEXT_REGISTRATION_STATUS_CHANGE_REGISTRATION_ADMIN_NOTIFY
        = 'manual_registration_status_change_from_registration_admin_and_notify';


    /**
     * Whether or not EE core is the full premium version.
     * @since $VID:$
     * @var bool
     */
    private $is_caffeinated;


    public function __construct(FilePath $plugin_file, Version $version)
    {
        parent::__construct($plugin_file, $version);
        $this->setIsCaffeinated();
    }

    /**
     * Whether or not EE core is the full premium version.
     * @since $VID:$
     * @return bool
     */
    public function isCaffeinated()
    {
        return $this->is_caffeinated;
    }


    /**
     * Setter for $is_caffeinated property.
     * @since $VID:$
     */
    private function setIsCaffeinated()
    {
        $this->is_caffeinated = file_exists($this->pluginPath() . 'caffeinated');
        $this->is_caffeinated = defined('EE_DECAF') && EE_DECAF ? false : $this->is_caffeinated;
    }
}
