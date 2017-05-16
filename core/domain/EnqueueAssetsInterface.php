<?php
namespace EventEspresso\core\domain;

defined('EVENT_ESPRESSO_VERSION') || exit;



interface EnqueueAssetsInterface
{

    /**
     * a place to register scripts and stylesheets with WordPress core
     * IMPORTANT !!!
     * ALL JavaScript files need to be registered for loading in the footer
     * by setting the 5th parameter of wp_register_script() to ` true `
     *
     * @return void
     */
    public function registerScriptsAndStylesheets();

    /**
     * a place to enqueue previously registered stylesheets
     * this will be called during the wp_enqueue_scripts hook for frontend requests
     *
     * @return void
     */
    public function enqueueStylesheets();

    /**
     * a place to enqueue previously registered stylesheets
     * this will be called during the admin_enqueue_scripts hook for admin requests
     *
     * @return void
     */
    public function enqueueAdminStylesheets();

    /**
     * a place to enqueue previously registered scripts for frontend requests
     *
     * @return void
     */
    public function enqueueScripts();

    /**
     * a place to enqueue previously registered scripts for admin requests
     *
     * @return void
     */
    public function enqueueAdminScripts();

}
// End of file EnqueueAssetsInterface.php
// Location: EventEspresso\core\domain/EnqueueAssetsInterface.php