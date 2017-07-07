<?php

namespace EventEspresso\core\services\activation;

/**
 * InitializeInterface
 * defines classes that perform initialization for a system being activated
 * such as EE_System (for core) or EE_Addon (for addons)
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         4.9.40
 */
interface InitializeInterface
{

    /**
     * @param bool $verify_schema    whether to verify the database's schema during this activation, or just its data.
     *                               This is a resource-intensive job so we prefer to only do it when necessary
     * @return void
     */
    public function initialize($verify_schema = true);
}
