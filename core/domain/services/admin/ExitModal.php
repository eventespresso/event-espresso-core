<?php
namespace EventEspresso\core\domain\services\admin;

/**
 * ExitModal
 * Sets up server side logic etc for the exit modal survey triggered when deactivating EE core.
 *
 * DEVELOPERS: this is a in progress api, do not use this class or rely on its api to remain consistent.
 *
 * @package EventEspresso\core\domain\services\admin
 * @author  Darren Ethier
 * @since   $VID:$
 */
class ExitModal
{
    /**
     * ExitModal constructor.
     */
    public function __construct()
    {
        add_action('in_admin_footer', array($this, 'modalContainer'));
        add_action('admin_enqueue_scripts', array($this, 'enqueues'));
    }


    /**
     * Callback on in_admin_footer that is used to output the exit modal container.
     */
    public function modalContainer()
    {
        echo '<div id="ee-exit-survey-modal"></div>';
    }


    /**
     * Callback for `admin_enqueue_scripts` to take care of enqueueing scripts and styles specific to the modal.
     */
    public function enqueues()
    {
        wp_enqueue_script('ee-exit-modal-survey');
        wp_enqueue_style('ee-exit-modal-survey');
    }
}