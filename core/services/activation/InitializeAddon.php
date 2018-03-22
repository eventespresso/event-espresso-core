<?php

namespace EventEspresso\core\services\activation;

use EE_Addon;
use EE_Data_Migration_Manager;
use EE_Error;
use EE_Maintenance_Mode;
use EE_Registry;
use ReflectionException;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * InitializeAddon
 * performs initialization for EE addons during activation
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         4.9.40
 */
class InitializeAddon implements InitializeInterface
{

    /**
     * @var EE_Addon $addon
     */
    private $addon;

    /**
     * @var EE_Data_Migration_Manager $data_migration_manager
     */
    private $data_migration_manager;

    /**
     * @var EE_Maintenance_Mode $maintenance_mode
     */
    private $maintenance_mode;

    /**
     * @var EE_Registry $registry
     */
    private $registry;



    /**
     * InitializeDatabase constructor.
     *
     * @param EE_Addon $addon
     * @param EE_Data_Migration_Manager $data_migration_manager
     * @param EE_Maintenance_Mode       $maintenance_mode
     * @param EE_Registry $registry
     */
    public function __construct(
        EE_Addon $addon,
        EE_Data_Migration_Manager $data_migration_manager,
        EE_Maintenance_Mode $maintenance_mode,
        EE_Registry $registry
    ) {
        $this->addon = $addon;
        $this->data_migration_manager = $data_migration_manager;
        $this->maintenance_mode = $maintenance_mode;
        $this->registry = $registry;
    }


    /**
     * Takes care of double-checking that we're not in maintenance mode, and then
     * initializing this addon's necessary initial data. This is called by default on new activations
     * and reactivations
     *
     * @param boolean $verify_schema whether to verify the database's schema for this addon, or just its data.
     *                               This is a resource-intensive job so we prefer to only do it when necessary
     * @return void
     * @throws ReflectionException
     * @throws EE_Error
     */
    public function initialize($verify_schema = true)
    {
        if ($this->maintenance_mode->level() !== EE_Maintenance_Mode::level_2_complete_maintenance) {
            if ($verify_schema) {
                $this->initializeDatabase();
            }
            $this->initializeDefaultData();
            //@todo: this will probably need to be adjusted in 4.4 as the array changed formats I believe
            $this->data_migration_manager->update_current_database_state_to(
                array(
                    'slug'    => $this->addon->name(),
                    'version' => $this->addon->version()
                )
            );
            //in case there are lots of addons being activated at once, let's force garbage collection
            //to help avoid memory limit errors
            //EEH_Debug_Tools::instance()->measure_memory( 'db content initialized for ' . get_class( $this), true );
            gc_collect_cycles();
        } else {
            //ask the data migration manager to init this addon's data
            //when migrations are finished because we can't do it now
            $this->data_migration_manager->enqueue_db_initialization_for($this->addon->name());
        }
    }


    /**
     * Used to setup this addon's database tables, but not necessarily any default
     * data in them. The default is to actually use the most up-to-date data migration script
     * for this addon, and just use its schema_changes_before_migration() and schema_changes_after_migration()
     * methods to setup the db.
     *
     * @throws ReflectionException
     * @throws EE_Error
     */
    public function initializeDatabase()
    {
        //find the migration script that sets the database to be compatible with the code
        $current_dms_name = $this->data_migration_manager->get_most_up_to_date_dms($this->addon->name());
        if ($current_dms_name) {
            $current_data_migration_script = $this->registry->load_dms($current_dms_name);
            $current_data_migration_script->set_migrating(false);
            $current_data_migration_script->schema_changes_before_migration();
            $current_data_migration_script->schema_changes_after_migration();
            if ($current_data_migration_script->get_errors()) {
                foreach ($current_data_migration_script->get_errors() as $error) {
                    EE_Error::add_error($error, __FILE__, __FUNCTION__, __LINE__);
                }
            }
        }
        //if not DMS was found that should be ok. This addon just doesn't require any database changes
        $this->data_migration_manager->update_current_database_state_to(
            array(
                'slug'    => $this->addon->name(),
                'version' => $this->addon->version()
            )
        );
    }



    /**
     * If you want to setup default data for the addon, override this method, and call
     * parent::initialize_default_data() from within it. This is normally called
     * from EE_Addon::initialize_db_if_no_migrations_required(), just after EE_Addon::initialize_db()
     * and should verify default data is present (but this is also called
     * on reactivations and just after migrations, so please verify you actually want
     * to ADD default data, because it may already be present).
     * However, please call this parent (currently it just fires a hook which other
     * addons may be depending on)
     */
    public function initializeDefaultData()
    {
        /**
         * Called when an addon is ensuring its default data is set (possibly called
         * on a reactivation, so first check for the absence of other data before setting
         * default data)
         *
         * @param EE_Addon $addon the addon that called this
         */
        do_action('AHEE__EE_Addon__initialize_default_data__begin', $this);
        //override to insert default data. It is safe to use the models here
        //because the site should not be in maintenance mode
    }



}
