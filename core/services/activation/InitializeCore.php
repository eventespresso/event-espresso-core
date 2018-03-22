<?php

namespace EventEspresso\core\services\activation;

use EE_Capabilities;
use EE_Data_Migration_Manager;
use EE_Error;
use EE_Maintenance_Mode;
use EEH_Activation;
use EventEspresso\core\services\request\RequestInterface;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * InitializeCore
 * performs initialization for EE core during activation
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         4.9.40
 */
class InitializeCore implements InitializeInterface
{

    /**
     * @var EE_Capabilities $capabilities
     */
    private $capabilities;

    /**
     * @var EE_Data_Migration_Manager $data_migration_manager
     */
    private $data_migration_manager;

    /**
     * @var EE_Maintenance_Mode $maintenance_mode
     */
    private $maintenance_mode;

    /**
     * @var RequestInterface $request
     */
    private $request;

    /**
     * @var ActivationType $activation_type
     */
    private $activation_type;


    /**
     * InitializeDatabase constructor.
     *
     * @param ActivationType            $activation_type
     * @param EE_Capabilities           $capabilities
     * @param EE_Data_Migration_Manager $data_migration_manager
     * @param EE_Maintenance_Mode       $maintenance_mode
     * @param RequestInterface          $request
     */
    public function __construct(
        ActivationType $activation_type,
        EE_Capabilities $capabilities,
        EE_Data_Migration_Manager $data_migration_manager,
        EE_Maintenance_Mode $maintenance_mode,
        RequestInterface $request
    ) {
        $this->activation_type        = $activation_type;
        $this->capabilities           = $capabilities;
        $this->data_migration_manager = $data_migration_manager;
        $this->maintenance_mode       = $maintenance_mode;
        $this->request = $request;
    }




    /**
     * @param bool $verify_schema
     * @return void
     * @throws \EE_Error
     */
    public function initialize($verify_schema = true)
    {
        $activation_type = $this->activation_type->getActivationType();
        //only initialize system if we're not in maintenance mode.
        if ($this->maintenance_mode->level() !== EE_Maintenance_Mode::level_2_complete_maintenance) {
            update_option('ee_flush_rewrite_rules', true);
            if ($verify_schema) {
                // first check if we had previously attempted to setup EE's directories but failed
                if (EEH_Activation::upload_directories_incomplete()) {
                    EEH_Activation::create_upload_directories();
                }
                EEH_Activation::initialize_db_and_folders();
            }
            EEH_Activation::initialize_db_content();
            EEH_Activation::system_initialization();
        } else {
            $this->data_migration_manager->enqueue_db_initialization_for('Core');
        }
        if ($activation_type === ActivationType::NEW_ACTIVATION
            || $activation_type === ActivationType::REACTIVATION
            || (
                $activation_type === ActivationType::UPGRADE
                && $this->activation_type->isMajorVersionChange()
            )
        ) {
            add_action('init', array($this, 'redirectToAboutPage'), 1);
        }
    }




    /**
     * This redirects to the about EE page after activation
     *
     * @return void
     */
    public function redirectToAboutPage()
    {
        //if current user is an admin and it's not an ajax or rest request
        if (
            $this->request->isAdmin()
            && EE_Error::has_notices() !== 1
            && apply_filters(
                'FHEE__EE_System__redirect_to_about_ee__do_redirect',
                $this->capabilities->current_user_can('manage_options', 'espresso_about_default')
            )
        ) {
            $query_params = array('page' => 'espresso_about');
            $activation_type = $this->activation_type->getActivationType();
            if ($activation_type === ActivationType::NEW_ACTIVATION) {
                $query_params['new_activation'] = true;
            } else if ($activation_type === ActivationType::REACTIVATION) {
                $query_params['reactivation'] = true;
            }
            wp_safe_redirect(
                add_query_arg($query_params, admin_url('admin.php'))
            );
        }
    }
}
