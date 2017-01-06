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
	protected $_version = '';

	/**
	 * @var $_min_core_version
	 * @type string
	 */
	protected $_min_core_version = '';

	/**
	 * derived from plugin 'main_file_path using plugin_basename()
	 *
	 * @type string $_plugin_basename
	 */
	protected $_plugin_basename = '';

	/**
	 * A non-internationalized name to identify this addon for use in URLs, etc
	 *
	 * @type string $_plugin_slug
	 */
	protected $_plugin_slug = '';

	/**
	 * A non-internationalized name to identify this addon. Eg 'Calendar','MailChimp',etc/
	 * @type string _addon_name
	 */
	protected $_addon_name = '';

	/**
	 * one of the EE_System::req_type_* constants
	 * @type int $_req_type
	 */
	protected $_req_type;

	/**
	 * page slug to be used when generating the "Settings" link on the WP plugin page
	 *
	 * @type string $_plugin_action_slug
	 */
	protected $_plugin_action_slug = '';

	/**
	 * if not empty, inserts a new table row after this plugin's row on the WP Plugins page
	 * that can be used for adding upgrading/marketing info
	 *
	 * @type array $_plugins_page_row
	 */
	protected $_plugins_page_row = array();



	/**
	 *    class constructor
	 */
	public function __construct() {
		add_action( 'AHEE__EE_System__load_controllers__load_admin_controllers', array( $this, 'admin_init' ) );
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
	public function set_name( $addon_name ) {
		return $this->_addon_name = $addon_name;
	}


	/**
	 * Gets addon_name
	 * @return string
	 */
	public function name() {
		return $this->_addon_name;
	}



	/**
	 * @return string
	 */
	public function plugin_basename() {

		return $this->_plugin_basename;
	}



	/**
	 * @param string $plugin_basename
	 */
	public function set_plugin_basename( $plugin_basename ) {

		$this->_plugin_basename = $plugin_basename;
	}



	/**
	 * @return string
	 */
	public function plugin_slug() {

		return $this->_plugin_slug;
	}



	/**
	 * @param string $plugin_slug
	 */
	public function set_plugin_slug( $plugin_slug ) {

		$this->_plugin_slug = $plugin_slug;
	}



	/**
	 * @return string
	 */
	public function plugin_action_slug() {

		return $this->_plugin_action_slug;
	}



	/**
	 * @param string $plugin_action_slug
	 */
	public function set_plugin_action_slug( $plugin_action_slug ) {

		$this->_plugin_action_slug = $plugin_action_slug;
	}



	/**
	 * @return array
	 */
	public function get_plugins_page_row() {

		return $this->_plugins_page_row;
	}



	/**
	 * @param array $plugins_page_row
	 */
	public function set_plugins_page_row( $plugins_page_row = array() ) {
		// sigh.... check for example content that I stupidly merged to master and remove it if found
		if ( ! is_array( $plugins_page_row ) && strpos( $plugins_page_row, '<h3>Promotions Addon Upsell Info</h3>' ) !== false ) {
			$plugins_page_row = '';
		}
		$this->_plugins_page_row = $plugins_page_row;
	}



	/**
	 * Called when EE core detects this addon has been activated for the first time.
	 * If the site isn't in maintenance mode, should setup the addon's database
	 * @return void
	 */
	public function new_install() {
		$classname = get_class($this);
		do_action("AHEE__{$classname}__new_install");
		do_action('AHEE__EE_Addon__new_install', $this);
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
		do_action('AHEE__EE_Addon__reactivation', $this);
		EE_Maintenance_Mode::instance()->set_maintenance_mode_if_db_old();
		add_action( 'AHEE__EE_System__perform_activations_upgrades_and_migrations', array( $this, 'initialize_db_if_no_migrations_required' ) );
	}



	public function deactivation(){
		$classname = get_class($this);
//		echo "Deactivating $classname";die;
		do_action("AHEE__{$classname}__deactivation");
		do_action('AHEE__EE_Addon__deactivation', $this);
		//check if the site no longer needs to be in maintenance mode
		EE_Register_Addon::deregister( $this->name() );
		EE_Maintenance_Mode::instance()->set_maintenance_mode_if_db_old();
	}



    /**
     * Takes care of double-checking that we're not in maintenance mode, and then
     * initializing this addon's necessary initial data. This is called by default on new activations
     * and reactivations
     *
     * @param boolean $verify_schema whether to verify the database's schema for this addon, or just its data.
     *                               This is a resource-intensive job so we prefer to only do it when necessary
     * @return void
     * @throws \EE_Error
     */
	public function initialize_db_if_no_migrations_required( $verify_schema = true ) {
		if( $verify_schema === '' ) {
			//wp core bug imo: if no args are passed to `do_action('some_hook_name')` besides the hook's name
			//(ie, no 2nd or 3rd arguments), instead of calling the registered callbacks with no arguments, it
			//calls them with an argument of an empty string (ie ""), which evaluates to false
			//so we need to treat the empty string as if nothing had been passed, and should instead use the default
			$verify_schema = true;
		}
		if ( EE_Maintenance_Mode::instance()->level() !== EE_Maintenance_Mode::level_2_complete_maintenance ) {
			if( $verify_schema ) {
				$this->initialize_db();
			}
			$this->initialize_default_data();
			//@todo: this will probably need to be adjusted in 4.4 as the array changed formats I believe
			EE_Data_Migration_Manager::instance()->update_current_database_state_to(
			    array(
			        'slug' => $this->name(),
                    'version' => $this->version()
                )
            );
			/* make sure core's data is a-ok
			 * (at the time of writing, we especially want to verify all the caps are present
			 * because payment method type capabilities are added dynamically, and it's
			 * possible this addon added a payment method. But it's also possible
			 * other data needs to be verified)
			 */
			EEH_Activation::initialize_db_content();
			update_option( 'ee_flush_rewrite_rules', TRUE );
			//in case there are lots of addons being activated at once, let's force garbage collection
			//to help avoid memory limit errors
			//EEH_Debug_Tools::instance()->measure_memory( 'db content initialized for ' . get_class( $this), true );
			gc_collect_cycles();
		}else{
			//ask the data migration manager to init this addon's data
			//when migrations are finished because we can't do it now
			EE_Data_Migration_Manager::instance()->enqueue_db_initialization_for( $this->name() );
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
		$current_dms_name = EE_Data_Migration_Manager::instance()->get_most_up_to_date_dms( $this->name() );
		if( $current_dms_name ){
			$current_data_migration_script = EE_Registry::instance()->load_dms( $current_dms_name );
			$current_data_migration_script->set_migrating( FALSE );
			$current_data_migration_script->schema_changes_before_migration();
			$current_data_migration_script->schema_changes_after_migration();
			if ( $current_data_migration_script->get_errors() ) {
				foreach( $current_data_migration_script->get_errors() as $error ) {
					EE_Error::add_error( $error, __FILE__, __FUNCTION__, __LINE__ );
				}
			}
		}
		//if not DMS was found that should be ok. This addon just doesn't require any database changes
		EE_Data_Migration_Manager::instance()->update_current_database_state_to(
		    array(
		        'slug' => $this->name(),
                'version' => $this->version()
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
	public function initialize_default_data() {
		/**
		 * Called when an addon is ensuring its default data is set (possibly called
		 * on a reactivation, so first check for the absence of other data before setting
		 * default data)
		 * @param EE_Addon $addon the addon that called this
		 */
		do_action( 'AHEE__EE_Addon__initialize_default_data__begin', $this );
		//override to insert default data. It is safe to use the models here
		//because the site should not be in maintenance mode
	}



	/**
	 * EE Core detected that this addon has been upgraded. We should check if there
	 * are any new migration scripts, and if so put the site into maintenance mode until
	 * they're ran
	 * @return void
	 */
	public function upgrade() {
		$classname = get_class($this);
		do_action("AHEE__{$classname}__upgrade");
		do_action('AHEE__EE_Addon__upgrade', $this);
		EE_Maintenance_Mode::instance()->set_maintenance_mode_if_db_old();
		//also it's possible there is new default data that needs to be added
		add_action(
		    'AHEE__EE_System__perform_activations_upgrades_and_migrations', array( $this, 'initialize_db_if_no_migrations_required' )
        );
	}



	/**
	 * If Core detects this addon has been downgraded, you may want to invoke some special logic here.
	 */
	public function downgrade() {
		$classname = get_class($this);
		do_action("AHEE__{$classname}__downgrade");
		do_action('AHEE__EE_Addon__downgrade', $this);
		//it's possible there's old default data that needs to be double-checked
		add_action( 'AHEE__EE_System__perform_activations_upgrades_and_migrations', array( $this, 'initialize_db_if_no_migrations_required' ) );
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
	 * @return bool
	 */
	public function set_activation_indicator_option() {
		// let's just handle this on the next request, ok? right now we're just not really ready
		return update_option( $this->get_activation_indicator_option_name(), TRUE );
	}


	/**
	 * Gets the name of the wp option which is used to temporarily indicate that this addon was activated
	 * @return string
	 */
	public function get_activation_indicator_option_name(){
		return 'ee_activation_' . $this->name();
	}




	/**
	 * Used by EE_System to set the request type of this addon. Should not be used by addon developers
	 * @param int $req_type
	 */
	public function set_req_type( $req_type ) {
		$this->_req_type = $req_type;
	}



	/**
	 * Returns the request type of this addon (ie, EE_System::req_type_normal, EE_System::req_type_new_activation, EE_System::req_type_reactivation, EE_System::req_type_upgrade, or EE_System::req_type_downgrade). This is set by EE_System when it is checking for new install or upgrades
	 * of addons
	 */
	public function detect_req_type() {
		if( ! $this->_req_type ){
			$this->detect_activation_or_upgrade();
		}
		return $this->_req_type;
	}



	/**
	 * Detects the request type for this addon (whether it was just activated, upgrades, a normal request, etc.)
	 * Should only be called once per request
	 * @return void
	 */
	public function detect_activation_or_upgrade(){
		$activation_history_for_addon = $this->get_activation_history();
//		d($activation_history_for_addon);
		$request_type = EE_System::detect_req_type_given_activation_history($activation_history_for_addon, $this->get_activation_indicator_option_name(), $this->version());
		$this->set_req_type($request_type);
		$classname = get_class($this);
		switch($request_type){
			case EE_System::req_type_new_activation:
				do_action( "AHEE__{$classname}__detect_activations_or_upgrades__new_activation" );
				do_action( 'AHEE__EE_Addon__detect_activations_or_upgrades__new_activation', $this );
				$this->new_install();
				$this->update_list_of_installed_versions( $activation_history_for_addon );
				break;
			case EE_System::req_type_reactivation:
				do_action( "AHEE__{$classname}__detect_activations_or_upgrades__reactivation" );
				do_action( 'AHEE__EE_Addon__detect_activations_or_upgrades__reactivation', $this );
				$this->reactivation();
				$this->update_list_of_installed_versions( $activation_history_for_addon );
				break;
			case EE_System::req_type_upgrade:
				do_action( "AHEE__{$classname}__detect_activations_or_upgrades__upgrade" );
				do_action( 'AHEE__EE_Addon__detect_activations_or_upgrades__upgrade', $this );
				$this->upgrade();
				$this->update_list_of_installed_versions($activation_history_for_addon );
				break;
			case EE_System::req_type_downgrade:
				do_action( "AHEE__{$classname}__detect_activations_or_upgrades__downgrade" );
				do_action( 'AHEE__EE_Addon__detect_activations_or_upgrades__downgrade', $this );
				$this->downgrade();
				$this->update_list_of_installed_versions($activation_history_for_addon );
				break;
			case EE_System::req_type_normal:
			default:
//				$this->_maybe_redirect_to_ee_about();
				break;
		}

		do_action( "AHEE__{$classname}__detect_if_activation_or_upgrade__complete" );
	}

	/**
	 * Updates the version history for this addon
	 * @param array $version_history
	 * @param string $current_version_to_add
	 * @return boolean success
	 */
	public function update_list_of_installed_versions($version_history = NULL,$current_version_to_add = NULL) {
		if( ! $version_history ) {
			$version_history = $this->get_activation_history();
		}
		if( $current_version_to_add === NULL){
			$current_version_to_add = $this->version();
		}
		$version_history[ $current_version_to_add ][] = date( 'Y-m-d H:i:s',time() );
		// resave
//		echo "updating list of installed versions:".$this->get_activation_history_option_name();d($version_history);
		return update_option( $this->get_activation_history_option_name(), $version_history );
	}

	/**
	 * Gets the name of the wp option that stores the activation history
	 * of this addon
	 * @return string
	 */
	public function get_activation_history_option_name(){
		return self::ee_addon_version_history_option_prefix . $this->name();
	}



	/**
	 * Gets the wp option which stores the activation history for this addon
	 * @return array
	 */
	public function get_activation_history(){
		return get_option($this->get_activation_history_option_name(), NULL);
	}



	/**
	 * @param string $config_section
	 */
	public function set_config_section( $config_section = '' ) {
		$this->_config_section = ! empty( $config_section ) ? $config_section : 'addons';
	}
	/**
	 *	filepath to the main file, which can be used for register_activation_hook, register_deactivation_hook, etc.
	 * @type string
	 */
	protected $_main_plugin_file;

	/**
	 *
	 * Sets the filepath to the main plugin file
	 * @param string $filepath
	 */
	public function set_main_plugin_file( $filepath ) {
		$this->_main_plugin_file = $filepath;
	}
	/**
	 * gets the filepath to teh main file
	 * @return string
	 */
	public function get_main_plugin_file(){
		return $this->_main_plugin_file;
	}

	/**
	 * Gets the filename (no path) of the main file (the main file loaded
	 * by WP)
	 * @return string
	 */
	public function get_main_plugin_file_basename() {
		return plugin_basename( $this->get_main_plugin_file() );
	}

	/**
	 * Gets the folder name which contains the main plugin file
	 * @return string
	 */
	public function get_main_plugin_file_dirname(){
		return dirname( $this->get_main_plugin_file() );
	}


	/**
     * sets hooks used in the admin
     *
     * @return void
	 */
	public function admin_init(){
		// is admin and not in M-Mode ?
		if ( is_admin() && ! EE_Maintenance_Mode::instance()->level() ) {
			add_filter( 'plugin_action_links', array( $this, 'plugin_action_links' ), 10, 2 );
			add_filter( 'after_plugin_row_' . $this->_plugin_basename, array( $this, 'after_plugin_row' ), 10, 3 );
		}
	}



	/**
	 * plugin_actions
	 *
	 * Add a settings link to the Plugins page, so people can go straight from the plugin page to the settings page.
	 *
	 * @param $links
	 * @param $file
	 * @return array
	 */
	public function plugin_action_links( $links, $file ) {
		if ( $file === $this->plugin_basename() && $this->plugin_action_slug() !== '' ) {
			// before other links
			array_unshift( $links, '<a href="admin.php?page=' . $this->plugin_action_slug() . '">' . __( 'Settings' ) . '</a>' );
		}
		return $links;
	}



	/**
	 * after_plugin_row
	 *
	 * Add additional content to the plugins page plugin row
	 * Inserts another row
	 *
	 * @param $plugin_file
	 * @param $plugin_data
	 * @param $status
	 * @return void
	 */
	public function after_plugin_row( $plugin_file, $plugin_data, $status ) {

		$after_plugin_row = '';
		if ( $plugin_file === $this->plugin_basename() && $this->get_plugins_page_row() !== '' ) {
			$class = $status ? 'active' : 'inactive';
			$plugins_page_row = $this->get_plugins_page_row();
			$link_text = isset( $plugins_page_row[ 'link_text' ] ) ? $plugins_page_row[ 'link_text' ] : '';
			$link_url = isset( $plugins_page_row[ 'link_url' ] ) ? $plugins_page_row[ 'link_url' ] : '';
			$description = isset( $plugins_page_row[ 'description' ] ) ? $plugins_page_row[ 'description' ] : $plugins_page_row;
			if ( ! empty( $link_text ) && ! empty( $link_url ) && ! empty( $description )) {
				$after_plugin_row .= '<tr id="' . sanitize_title( $plugin_file ) . '-ee-addon" class="' . $class . '">';
				$after_plugin_row .= '<th class="check-column" scope="row"></th>';
				$after_plugin_row .= '<td class="ee-addon-upsell-info-title-td plugin-title column-primary">';
				$after_plugin_row .= '<style>
.ee-button,
.ee-button:active,
.ee-button:visited {
	box-sizing: border-box;
	display: inline-block;
	position: relative;
	top: -1px;
	padding:.5em 1em;
	margin: 0;
	background: #00B1CA -webkit-linear-gradient( #4EBFDE, #00B1CA ); /* For Safari 5.1 to 6.0 */
	background: #00B1CA -o-linear-gradient( #4EBFDE, #00B1CA ); /* For Opera 11.1 to 12.0 */
	background: #00B1CA -moz-linear-gradient( #4EBFDE, #00B1CA ); /* For Firefox 3.6 to 15 */
	background: #00B1CA linear-gradient( #4EBFDE, #00B1CA ); /* Standard syntax */
	border: 1px solid rgba(0,0,0,0.1) !important;
	border-top: 1px solid rgba(255,255,255,0.5) !important;
	border-bottom: 2px solid rgba(0,0,0,0.25) !important;
	font-weight: normal;
	cursor: pointer;
	color: #fff !important;
	text-decoration: none !important;
	text-align: center;
	line-height: 1em;
/*	line-height: 1;*/
	-moz-border-radius: 3px;
	-webkit-border-radius: 3px;
	border-radius: 3px;
	-moz-box-shadow: none;
	-webkit-box-shadow: none;
	box-shadow: none;
}
.ee-button:hover {
	color: #fff !important;
	background: #4EBFDE;
}
.ee-button:active { top:0; }
</style>';
				$after_plugin_row .= '
<p class="ee-addon-upsell-info-dv">
	<a class="ee-button" href="' . $link_url . '">' . $link_text . ' &nbsp;<span class="dashicons dashicons-arrow-right-alt2" style="margin:0;"></span></a>
</p>';
				$after_plugin_row .= '</td>';
				$after_plugin_row .= '<td class="ee-addon-upsell-info-desc-td column-description desc">';
				$after_plugin_row .= $description;
				$after_plugin_row .= '</td>';
				$after_plugin_row .= '</tr>';
			} else {
				$after_plugin_row .= $description;
			}
		}

		echo $after_plugin_row;
	}



    /**
     * a safe space for addons to add additional logic like setting hooks
     * that will run immediately after addon registration
     * making this a great place for code that needs to be "omnipresent"
     *
     * @since 4.9.26
     */
	public function after_registration()
    {
        // cricket chirp... cricket chirp...
	}


}
// End of file EE_Addon.core.php
// Location: /core/EE_Addon.core.php
