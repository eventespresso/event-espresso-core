<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link		http://www.eventespresso.com
 * @version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * Maintenance_Admin_Page
 *
 * This contains the logic for setting up the Event Maintenance related admin pages.  Any methods without phpdoc comments have inline docs with parent class. 
 *
 *
 * @package		Maintenance_Admin_Page
 * @subpackage	includes/core/admin/Maintenance_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Maintenance_Admin_Page extends EE_Admin_Page {


	public function __construct( $routing = TRUE ) {
		parent::__construct( $routing );
	}



	protected function _init_page_props() {
		$this->page_slug = EE_MAINTENANCE_PG_SLUG;
		$this->page_label = __('Maintenance', 'event_espresso');
	}



	protected function _ajax_hooks() {
		add_action('wp_ajax_migration_step',array($this,'migration_step'));
	}



	protected function _define_page_props() {
		$this->_admin_base_url = EE_MAINTENANCE_ADMIN_URL;
		$this->_admin_page_title = $this->page_label;
	}



	protected function _set_page_routes() {
		$this->_page_routes = array(
			'default' => '_maintenance',
			'change_maintenance_level'=>array(
				'func'=>'_change_maintenance_level',
				'noheader'=>true
			));
	}

	/**
	 * default maintenance page. If we're in maintenance mode level 2, then we need to show
	 * the migration scripts and all that UI.
	 */
	public function _maintenance(){
		//it all depends if we're in maintenance model level 1 (frontend-only) or
		//level 2 (everything except maintenance page)
		switch(EE_Maintenance_Mode::instance()->level()){
			case EE_Maintenance_Mode::level_0_not_in_maintenance:
			case EE_Maintenance_Mode::level_1_frontend_only_maintenance:
				$show_maintenance_switch = true;
				$show_backup_db_text = false;
				$show_migration_progress = false;
				$script_names = array();
				break;
			case EE_Maintenance_Mode::level_2_complete_maintenance:
				$show_maintenance_switch = false;
				$show_migration_progress = true;
				if(isset($this->_req_data['continue_migration'])){
					$show_backup_db_text = false;
				}else{
					$show_backup_db_text = true;
				}
				$scripts_needing_to_run = EE_Data_Migration_Manager::instance()->check_for_applicable_data_migration_scripts();
				$script_names = array();
				foreach($scripts_needing_to_run as $script){
					if($script instanceof EE_Data_Migration_Script_Base)
					$script_names[] = $script->pretty_name();
				}
				
				break;
		}
		$most_recent_migration = EE_Data_Migration_Manager::instance()->get_last_ran_script(true);
		if($most_recent_migration && 
				$most_recent_migration instanceof EE_Data_Migration_Class_Base &&
				$most_recent_migration->can_continue()){
			$show_backup_db_text = false;
			$show_continue_current_migration_script = true;
			$show_most_recent_migration = true;
			$last_migration_was_borked = false;
		}elseif($most_recent_migration && 
				$most_recent_migration instanceof EE_Data_Migration_Class_Base &&
				$most_recent_migration->is_borked()){
			$show_most_recent_migration = true;
			$show_backup_db_text = false;
			$show_migration_progress = false;
			$last_migration_was_borked = true;
		}elseif(isset($this->_req_data['continue_migration'])){
			$show_most_recent_migration = true;
			$show_continue_current_migration_script = false;
			$last_migration_was_borked = false;
		}else{
			$show_most_recent_migration = false;
			$show_continue_current_migration_script = false;
			$last_migration_was_borked = false;
		}
		
		$this->_template_path = EE_MAINTENANCE_TEMPLATE_PATH . 'ee_migration_page.template.php';
		$this->_template_args = array_merge($this->_template_args,array(
			'show_most_recent_migration' => $show_most_recent_migration,//flag for showing the most recent migration's status and/or errors
			'most_recent_migration'=> $most_recent_migration,//the actual most recently ran migration
			'show_migration_progress' => $show_migration_progress,//flag for showing the option to run migrations and see their progress
			'show_backup_db_text' => $show_backup_db_text,//flag for showing text telling the user to backup their DB
			'show_maintenance_switch'=> $show_maintenance_switch,//flag for showing the option to change maintenance mode between levels 0 and 1
			'script_names'=>$script_names,//array of names of scripts that have run
			'show_continue_current_migration_script'=>$show_continue_current_migration_script,//flag to change wording to indicating that we're only CONTINUING a migration script (somehow it got interrupted0
			'last_migration_was_borked'=>$last_migration_was_borked,//flag indicating that the last migration had a fatal error
			'update_migration_script_page_link' => EE_Admin_Page::add_query_args_and_nonce(array('action'=>'change_maintenance_level'),EE_MAINTENANCE_ADMIN_URL), 
		));
		//make sure we have the form fields helper available. It usually is, but sometimes it isn't
		require_once(EE_HELPERS . 'EE_Form_Fields.helper.php');
		$this->_template_args['admin_page_content'] = espresso_display_template($this->_template_path, $this->_template_args, TRUE);
		//localize script stuff
		wp_localize_script('ee-maintenance', 'ee_maintenance', array(
			'migrating'=>  __("Migrating...", "event_espresso"),
			'status_no_more_migration_scripts'=>  EE_Data_Migration_Manager::status_no_more_migration_scripts,
			'status_fatal_error'=>  EE_Data_Migration_Manager::status_fatal_error,
			'status_completed'=>  EE_Data_Migration_Manager::status_completed));
		$this->display_admin_page_with_sidebar();
	}
	public function migration_step(){
		$this->_template_args['data'] = EE_Data_Migration_Manager::instance()->response_to_migration_ajax_request();
		$this->_return_json();
	}
	public function _change_maintenance_level(){
		$new_level = intval($this->_req_data['maintenance_model_level']);
		EE_Maintenance_Mode::instance()->set_maintenance_level($new_level);
		$this->_redirect_after_action(true, 'Maintenance Mode', __("Updated", "event_espresso"));
	}


	protected function _set_page_config() {
		$this->_page_config = array(
			'default' => array(
				'nav' => array(
					'label' => __('Maintenance Methods', 'event_espresso'),
					'order' => 10
					),
				'metaboxes' => array( '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box'),
				////'help_tabs' => $this->_get_maintenance_help_tabs(),
				)
			);
	}
	
	



	//none of the below group are currently used for Gateway Settings
	protected function _add_screen_options() {}
	protected function _add_feature_pointers() {}
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}
	




	public function load_scripts_styles() {
		wp_enqueue_script('ee_admin_js');
//		wp_enqueue_media();
//		wp_enqueue_script('media-upload');
		wp_enqueue_script('ee-maintenance',EE_MAINTENANCE_ASSETS_URL.'/ee-maintenance.js',array('jquery'),EVENT_ESPRESSO_VERSION,true);
	}





	public function load_scripts_styles_default() {
		//styles
		wp_register_style( 'espresso_maintenance', EE_MAINTENANCE_ASSETS_URL . 'ee-maintenance.css', array(), EVENT_ESPRESSO_VERSION );
		wp_enqueue_style('espresso_maintenance');
//		wp_enqueue_style('ee-text-links');
//		//scripts
//		wp_enqueue_script('ee-text-links');
	}



} //end Maintenance_Admin_Page class