<?php
namespace EventEspresso\core\domain;

defined('EVENT_ESPRESSO_VERSION') || exit;



interface SetHooksInterface
{

    /**
     * a place to add action and filter hooks for regular frontend requests
     *
     * @return void
     */
    public function setHooks();

    /**
     * a place to add action and filter hooks for regular WP admin requests
     *
     * @return void
     */
    public function setAdminHooks();

    /**
     * a place to add action and filter hooks for AJAX requests
     *
     * @return void
     */
    public function setAjaxHooks();

    /**
     * a place to add action and filter hooks for REST API requests
     *
     * @return void
     */
    public function setApiHooks();

}
// End of file SetHooksInterface.php
// Location: EventEspresso\core\domain/SetHooksInterface.php