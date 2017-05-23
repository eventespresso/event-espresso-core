<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 *
 * Event Espresso
 *
 * Event Registration and Ticketing Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	$VID:$
 *
 * ------------------------------------------------------------------------
 *
 * EE_Maintenance_Mode Class
 *
 * Super Duper Class Description
 *
 * @package			Event Espresso
 * @subpackage		core
 * @author				Michael Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Maintenance_Mode {

	/**
	 * constants available to client code for interpreting the values of EE_Maintenance_Mode::level().
	 * level_0_not_in_maintenance means the site is NOT in maintenance mode (so everything's normal)
	 */
	const level_0_not_in_maintenance = 0;
	/**
	 * level_1_frontend_only_maintenance means that the site's frontend EE code should be completely disabled
	 * but the admin backend should be running as normal. Maybe an admin can view the frontend though
	 */
	const level_1_frontend_only_maintenance = 1;
	/**
	 * level_2_complete_maintenance means the frontend AND EE backend code are disabled. The only system running
	 * is the maintenance mode stuff, which will require users to update all addons, and then finish running all
	 * migration scripts before taking the site out of maintenance mode
	 */
	const level_2_complete_maintenance = 2;

	/**
	 * the name of the option which stores the current level of maintenance mode
	 */
	const option_name_maintenance_mode = 'ee_maintenance_mode';
   /**
     * 	EE_Maintenance_Mode Object
     * 	@var EE_Maintenance_Mode $_instance
	 * 	@access 	private
     */
	private static $_instance = NULL;

	/**
	 * 	EE_Registry Object
	 *	@var 	EE_Registry	$EE
	 * 	@access 	protected
	 */
	protected $EE = NULL;






	/**
	 *@singleton method used to instantiate class object
	 *@access public
	 *@return EE_Maintenance_Mode
	 */
	public static function instance() {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! ( self::$_instance instanceof EE_Maintenance_Mode )) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	/**
	 * Resets maintenance mode (mostly just re-checks whether or not we should be in maintenance mode)
	 * @return EE_Maintenance_Mode
	 */
	public static function reset(){
		self::instance()->set_maintenance_mode_if_db_old();
		return self::instance();
	}



	/**
	 *private constructor to prevent direct creation
	 *@Constructor
	 *@access private
	 *@return EE_Maintenance_Mode
	 */
	private function __construct() {
		// if M-Mode level 2 is engaged, we still need basic assets loaded
		add_action( 'wp_enqueue_scripts', array( $this, 'load_assets_required_for_m_mode' ));
		// shut 'er down down for maintenance ?
		add_filter( 'the_content', array( $this, 'the_content' ), 2 );
		// add powered by EE msg
		add_action( 'shutdown', array( $this, 'display_maintenance_mode_notice' ), 10 );
	}




	/**
	 * retrieves the maintenance mode option value from the db
	 * @return int
	 */
	public function real_level(){
		return get_option( self::option_name_maintenance_mode, EE_Maintenance_Mode::level_0_not_in_maintenance );
	}

	/**
	 * Returns whether or not the models reportedly are able to run queries or not (ie, if the system
	 * thinks their tables are present and up-to-date).
	 * @return boolean
	 */
	public function models_can_query(){
		return $this->real_level() != EE_Maintenance_Mode::level_2_complete_maintenance;
	}

	/**
	 * Determines whether or not we're in maintenance mode and what level. However, while the site
	 * is in level 1 maintenance, and an admin visits the frontend, this function makes it appear
	 * to them as if teh site isn't in maintenance mode.
	 * EE_Maintenance_Mode::level_0_not_in_maintenance => not in maintenance mode (in normal mode)
	 * EE_Maintenance_Mode::level_1_frontend_only_maintenance=> frontend-only maintenance mode
	 * EE_Maintenance_Mode::level_2_complete_maintenance => frontend and backend maintenance mode
	 * @return int
	 */
	public function level(){
		$real_maintenance_mode_level = $this->real_level();
		//if this is an admin request, we'll be honest... except if it's ajax, because that might be from the frontend
		if( ( ! is_admin() || (defined('DOING_AJAX') && DOING_AJAX)) && //only on frontend or ajax requests
			current_user_can('administrator') && //when the user is an admin
			$real_maintenance_mode_level == EE_Maintenance_Mode::level_1_frontend_only_maintenance){//and we're in level 1
			$maintenance_mode_level = EE_Maintenance_Mode::level_0_not_in_maintenance;
		}else{
			$maintenance_mode_level = $real_maintenance_mode_level;
		}
		return $maintenance_mode_level;
	}

	/**
	 * Determines if we need to put EE in maintenance mode because the database needs updating
	 * @return boolean true if DB is old and maintenance mode was triggered; false otherwise
	 */
	public function set_maintenance_mode_if_db_old(){
		EE_Registry::instance()->load_core( 'Data_Migration_Manager' );
		if( EE_Data_Migration_Manager::instance()->check_for_applicable_data_migration_scripts()){
			update_option(self::option_name_maintenance_mode, self::level_2_complete_maintenance);
			return true;
		}elseif( $this->level() == self::level_2_complete_maintenance ){
			//we also want to handle the opposite: if the site is mm2, but there aren't any migrations to run
			//then we shouldn't be in mm2. (Maybe an addon got deactivated?)
			update_option( self::option_name_maintenance_mode, self::level_0_not_in_maintenance );
			return false;
		}else{
			return false;
		}
	}

	/**
	 * Updates the maintenance level on the site
	 * @param int $level
	 * @return void
	 */
	public function set_maintenance_level($level){
		do_action( 'AHEE__EE_Maintenance_Mode__set_maintenance_level', $level );
		update_option(self::option_name_maintenance_mode, intval($level));
	}



	/**
	 *    disable_frontend_for_maintenance
	 *
	 *   returns TRUE if M-Mode is engaged and the current request is not for the admin
	 *
	 * @access    public
	 * @return    string
	 */
	public static function disable_frontend_for_maintenance() {
		return ! is_admin() && EE_Maintenance_Mode::instance()->level() ? TRUE : FALSE;
	}



	/**
	 * 	load_assets_required_for_m_mode
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function load_assets_required_for_m_mode() {
		if ( $this->real_level() == EE_Maintenance_Mode::level_2_complete_maintenance && ! wp_script_is( 'espresso_core', 'enqueued' )) {
			wp_register_style( 'espresso_default', EE_GLOBAL_ASSETS_URL . 'css/espresso_default.css', array( 'dashicons' ), EVENT_ESPRESSO_VERSION );
			wp_enqueue_style('espresso_default');
			wp_register_script( 'espresso_core', EE_GLOBAL_ASSETS_URL . 'scripts/espresso_core.js', array('jquery'), EVENT_ESPRESSO_VERSION, TRUE );
			wp_enqueue_script( 'espresso_core' );
		}
	}



	/**
	 * template_include
	 *
	 * replacement EE CPT template that displays message notifying site visitors
	 * that EE has been temporarily placed into maintenance mode
	 * does NOT get called on non-EE-CPT requests
	 *
	 * @access    public
	 * @return    string
	 */
	public static function template_include() {
		// shut 'er down down for maintenance ? then don't use any of our templates for our endpoints
		return get_template_directory() . '/index.php';
	}



	/**
	 *    the_content
	 *
	 *    displays message notifying site visitors that EE has been temporarily placed into maintenance mode when post_type != EE CPT
	 *
	 * @access    public
	 * @param    string $the_content
	 * @return    string
	 */
	public function the_content( $the_content ) {
		// check if M-mode is engaged and for EE shortcode
		if ( $this->level() && strpos( $the_content, '[ESPRESSO_' ) !== false ) {
			// this can eventually be moved to a template, or edited via admin. But for now...
			$the_content = sprintf(
				__( '%sMaintenance Mode%sEvent Registration has been temporarily closed while system maintenance is being performed. We\'re sorry for any inconveniences this may have caused. Please try back again later.%s', 'event_espresso' ),
				'<h3>',
				'</h3><p>',
				'</p>'
			);
		}
		return $the_content;
	}




	/**
	 * 	display_maintenance_mode_notice
	 *
	 * 	displays message on frontend of site notifying admin that EE has been temporarily placed into maintenance mode
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function display_maintenance_mode_notice() {
		// check if M-mode is engaged and for EE shortcode
		if (
			$this->real_level() &&
			current_user_can( 'administrator' ) &&
			! is_admin() &&
			! ( defined( 'DOING_AJAX' ) && DOING_AJAX )
			&& EE_Registry::instance()->REQ->is_espresso_page()
		) {
			printf(
				__( '%sclose%sEvent Registration is currently disabled because Event Espresso has been placed into Maintenance Mode. To change Maintenance Mode settings, click here %sEE Maintenance Mode Admin Page%s', 'event_espresso' ),
				'<div id="ee-m-mode-admin-notice-dv" class="ee-really-important-notice-dv"><a class="close-espresso-notice" title="',
				'"><span class="dashicons dashicons-no"></span></a><p>',
				' &raquo; <a href="' . add_query_arg( array( 'page' => 'espresso_maintenance_settings' ), admin_url( 'admin.php' )) . '">',
				'</a></p></div>'
			);
		}
	}
// espresso-notices important-notice ee-attention







	/**
	 *		@ override magic methods
	 *		@ return void
	 */
	final function __destruct() {}
	final function __call($a,$b) {}
	final function __get($a) {}
	final function __set($a,$b) {}
	final function __isset($a) {}
	final function __unset($a) {}
	final function __sleep() {
		return array();
	}
	final function __wakeup() {}
//	final function __toString() {}
	final function __invoke() {}
	final static function __set_state() {}
	final function __clone() {}
	final static function __callStatic($a,$b) {}

}
// End of file EE_Maintenance_Mode.core.php
// Location: ./core/EE_Maintenance_Mode.core.php
