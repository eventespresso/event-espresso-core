<?php if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 *
 * Event Espresso
 *
 * Event Registration and Ticketing Management Plugin for WordPress
 *
 * @ package 		Event Espresso
 * @ author 		Event Espresso
 * @ copyright 	(c) 2008-2014 Event Espresso  All Rights Reserved.
 * @ license 		http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link 				http://www.eventespresso.com
 * @ since 			4.3
 *
 */



/**
 * Class EE_Addon
 *
 * Abstract Parent class for all classes that want to function as EE Addons
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Michael Nelson, Brent Christensen
 */
abstract class EE_Addon extends EE_Configurable {


	/**
	 * prefix to be added onto an addon's plugin slug to make a wp option name
	 * which will be used to store the plugin's activation history
	 */
	const ee_addon_version_history_option_prefix = 'ee_version_history_';

	/**
	 * @var $_version
	 * @type string
	 */
	protected $_version;

	/**
	 * @var $_min_core_version
	 * @type string
	 */
	protected $_min_core_version;

	/**
	 * A non-internationalized name to identify this addon. Eg 'Calendar','MailChimp',etc/
	 * @type string _addon_name
	 */
	protected $_addon_name;

	/**
	 * one of the EE_System::req_type_* constants
	 * @type int $_req_type
	 */
	protected $_req_type = NULL;



	/**
	 *    class constructor
	 */
	public function __construct() {
		//we need to set a wordpress option to indicate that this addon has been activated
		//this is mostly only used by core to detect a reactivation
		$reflector = new ReflectionClass( get_class( $this ) );
		register_activation_hook( $reflector->getFileName(), array( $this, 'set_activation_indicator_option' ) );
	}



	/**
	 * @param mixed $version
	 */
	public function set_version( $version = NULL ) {
		$this->_version = $version;
	}


	/**
	 * get__version
	 * @return string
	 */
	public function version() {
		return $this->_version;
	}



	/**
	 * @param mixed $min_core_version
	 */
	public function set_min_core_version( $min_core_version = NULL ) {
		$this->_min_core_version = $min_core_version;
	}



	/**
	 * get__min_core_version
	 * @return string
	 */
	public function min_core_version() {
		return $this->_min_core_version;
	}



	/**
	 * Sets addon_name
	 * @param string $addon_name
	 * @return boolean
	 */
	function set_name( $addon_name ) {
		return $this->_addon_name = $addon_name;
	}


	/**
	 * Gets addon_name
	 * @return string
	 */
	function name() {
		return $this->_addon_name;
	}



	/**
	 * Used by EE_System to set the request type of this addon. Should not be used by addon developers
	 * @param int $req_type
	 */
	function set_req_type( $req_type ) {
		$this->_req_type = $req_type;
	}



	/**
	 * Returns the request type of this addon (ie, EE_System::req_type_normal, EE_System::req_type_new_activation, EE_System::req_type_reactivation, EE_System::req_type_upgrade, or EE_System::req_type_downgrade). This is set by EE_System when it is checking for new install or upgrades
	 * of addons
	 * @return int
	 */
	function detect_req_type() {
		return $this->_req_type;
	}



	/**
	 * Called when EE core detects this addon has been activated for the first time.
	 * If the site isn't in maintenance mode, should setup the addon's database
	 * @return mixed
	 */
	public function new_install() {
		$classname = get_class($this);
		do_action("AHEE__{$classname}__new_install");
		EE_Maintenance_Mode::instance()->set_maintenance_mode_if_db_old();
		add_action( 'AHEE__EE_System__perform_activations_upgrades_and_migrations', array( $this, 'initialize_db_if_no_migrations_required' ) );
	}



	/**
	 * Called when EE core detects this addon has been reactivated. When this happens,
	 * it's good to just check that your data is still intact
	 * @return void
	 */
	public function reactivation() {
		$classname = get_class($this);
		do_action("AHEE__{$classname}__reactivation");
		add_action( 'AHEE__EE_System__perform_activations_upgrades_and_migrations', array( $this, 'initialize_db_if_no_migrations_required' ) );
	}



	/**
	 * Takes care of double-checking that we're not in maintenance mode, and then
	 * initializing this addon's necessary initial data. This is called by default on new activations
	 * and reactivations
	 * @return void
	 */
	public function initialize_db_if_no_migrations_required() {
		if ( EE_Maintenance_Mode::instance()->level() != EE_Maintenance_Mode::level_2_complete_maintenance ) {
			$this->initialize_db();
			$this->initialize_default_data();
		}
	}



	/**
	 * Used to setup this addon's database tables, but not necessarily any default
	 * data in them. The default is to actually use the most up-to-date data migration script
	 * for this addon, and just use its schema_changes_before_migration() and schema_changes_after_migration()
	 * methods to setup the db.
	 */
	public function initialize_db() {
		//find the migration script that sets the database to be compatible with the code
		$current_data_migration_script = EE_Registry::instance()->load_dms( EE_Data_Migration_Manager::instance()->get_most_up_to_date_dms( $this->name() ) );
		$current_data_migration_script->schema_changes_before_migration();
		$current_data_migration_script->schema_changes_after_migration();
		if ( $current_data_migration_script->get_errors() ) {
			echo "errors occurred while initializing db:";
			var_dump( $current_data_migration_script->get_errors() );
		}
		EE_Data_Migration_Manager::instance()->update_current_database_state_to( array( $this->name(), $this->version() ) );
	}



	/**
	 * If you want to setup default data for the addon, and only add it when NOT migrating
	 * data from a previous version, override this method. This is normally called
	 * from EE_Addon::initialize_db_if_no_migrations_required(), just after EE_Addon::initialize_db()
	 */
	public function initialize_default_data() {
		//override to insert default data. It is safe to use the models here
		//because the site should not be in maintenance mode
	}



	/**
	 * EE Core detected that this addon has been upgraded. We should check if there
	 * are any new migration scripts, and if so put the site into maintenance mode until
	 * they're ran
	 * @return mixed
	 */
	public function upgrade() {
		$classname = get_class($this);
		do_action("AHEE__{$classname}__upgrade");
		EE_Maintenance_Mode::instance()->set_maintenance_mode_if_db_old();
	}



	/**
	 * If Core detects this addon has been downgraded, you may want to invoke some special logic here.
	 */
	public function downgrade() {
		$classname = get_class($this);
		do_action("AHEE__{$classname}__downgrade");
	}



	/**
	 * set_db_update_option_name
	 * Until we do something better, we'll just check for migration scripts upon
	 * plugin activation only. In the future, we'll want to do it on plugin updates too
	 * @return bool
	 */
	public function set_db_update_option_name(){
		EE_Error::doing_it_wrong(__FUNCTION__, __('EE_Addon::set_db_update_option_name was renamed to EE_Addon::set_activation_indicator_option', 'event_espresso'), '4.3.0.alpha.016');
		//let's just handle this on the next request, ok? right now we're just not really ready
		return $this->set_activation_indicator_option();
	}


	/**
	 *
	 * Returns the name of the activation indicator option
	 * (an option which is set temporarily to indicate that this addon was just activated)
	 * @deprecated since version 4.3.0.alpha.016
	 * @return string
	 */
	public function get_db_update_option_name() {
		EE_Error::doing_it_wrong(__FUNCTION__, __('EE_Addon::get_db_update_option was renamed to EE_Addon::get_activation_indicator_option_name', 'event_espresso'), '4.3.0.alpha.016');
		return $this->get_activation_indicator_option_name();
	}



	/**
	 * When the addon is activated, this should be called to set a wordpress option that
	 * indicates it was activated. This is especially useful for detecting reactivations.
	 */
	public function set_activation_indicator_option() {
		// let's just handle this on the next request, ok? right now we're just not really ready
		update_option( $this->get_activation_indicator_option_name(), TRUE );
	}


	/**
	 * Gets the name of the wp option which is used to temporarily indicate that this addon was activated
	 * @return string
	 */
	public function get_activation_indicator_option_name(){
		return 'ee_activation_' . $this->name();
	}




	/**
	 * Gets the name of the wp option that stores the activation history
	 * of this addon
	 * @return string
	 */
	function get_activation_history_option_name(){
		return self::ee_addon_version_history_option_prefix . $this->name();
	}



	/**
	 * Gets the wp option which stores the activation history for this addon
	 * @return array
	 */
	function get_activation_history(){
		return get_option($this->get_activation_history_option_name(), NULL);
	}



	/**
	 * @param string $config_section
	 */
	public function set_config_section( $config_section = '' ) {
		$this->_config_section = ! empty( $config_section ) ? $config_section : 'addons';
	}





}
// End of file EE_Addon.core.php
// Location: /core/EE_Addon.core.php
