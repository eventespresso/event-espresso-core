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
		$this->page_label = EE_MAINTENANCE_LABEL;
		$this->_admin_base_url = EE_MAINTENANCE_ADMIN_URL;
		$this->_admin_base_path = EE_MAINTENANCE_ADMIN;
	}



	protected function _ajax_hooks() {
		add_action('wp_ajax_migration_step',array($this,'migration_step'));
		add_action('wp_ajax_add_error_to_migrations_ran',array($this,'add_error_to_migrations_ran'));
	}



	protected function _define_page_props() {
		$this->_admin_page_title = EE_MAINTENANCE_LABEL;
	}



	protected function _set_page_routes() {
		$this->_page_routes = array(
			'default' => '_maintenance',
			'change_maintenance_level'=>array(
				'func'=>'_change_maintenance_level',
				'noheader'=>true
			),
			'system_status'=>'_system_status',
			'send_migration_crash_report'=>array(
				'func'=>'_send_migration_crash_report',
				'noheader'=>true
			),
			'confirm_migration_crash_report_sent'=>'_confirm_migration_crash_report_sent',
			'data_reset' => '_data_reset_and_delete',
			'reset_db'=>array(
				'func'=>'_reset_db',
				'noheader'=>true
			),
			'delete_db'=>array(
				'func'=>'_delete_db',
				'noheader'=>true
			)
		);
	}
	protected function _set_page_config() {
		$this->_page_config = array(
			'default' => array(
				'nav' => array(
					'label' => __('Maintenance', 'event_espresso'),
					'order' => 10
					),
				'require_nonce' => FALSE,
				//'metaboxes' => array( '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box'),
				////'help_tabs' => $this->_get_maintenance_help_tabs(),
				),
			'data_reset' => array(
				'nav' => array(
					'label' => __('Reset/Delete Data', 'event_espresso'),
					'order' => 20
					),
				'require_nonce' => FALSE,
				//'metaboxes' => array( '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box'),
				////'help_tabs' => $this->_get_maintenance_help_tabs(),
				),
			'system_status'=>array(
				'nav'=>array(
					'label'=>  __("System Status", "event_espresso"),
					'order'=>30	
				),
				'require_nonce' => FALSE,
				//'metaboxes'=>array( '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box'),
			)
		);
	}

	/**
	 * default maintenance page. If we're in maintenance mode level 2, then we need to show
	 * the migration scripts and all that UI.
	 */
	public function _maintenance(){		
//		$migration_scripts = EE_Data_Migration_Manager::instance()->check_for_applicable_data_migration_scripts();
//		$migration_script = end($migration_scripts);
//		d($migration_script);
//		$p = $migration_script->properties_as_array();
//		d($p);
//		$dm = EE_Data_Migration_Manager::instance()->_instantiate_script_from_properties_array($p);
//		dd($dm);
		//it all depends if we're in maintenance model level 1 (frontend-only) or
		//level 2 (everything except maintenance page)
		switch(EE_Maintenance_Mode::instance()->level()){
			case EE_Maintenance_Mode::level_0_not_in_maintenance:
			case EE_Maintenance_Mode::level_1_frontend_only_maintenance:
				$show_maintenance_switch = true;
				$show_backup_db_text = false;
				$show_migration_progress = false;
				$script_names = array();
				$addons_should_be_upgraded_first = false;
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
				$addons_should_be_upgraded_first = EE_Data_Migration_Manager::instance()->addons_need_updating();
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
				$most_recent_migration->is_borked()
				){
			$this->_template_path = EE_MAINTENANCE_TEMPLATE_PATH . 'ee_migration_was_borked_page.template.php';
		}elseif($addons_should_be_upgraded_first){
			$this->_template_path = EE_MAINTENANCE_TEMPLATE_PATH . 'ee_upgrade_addons_before_migrating.template.php';
		}else{
			if($most_recent_migration && 
					$most_recent_migration instanceof EE_Data_Migration_Class_Base &&
					$most_recent_migration->can_continue()){
				$show_backup_db_text = false;
				$show_continue_current_migration_script = true;
				$show_most_recent_migration = true;
			}elseif(isset($this->_req_data['continue_migration'])){
				$show_most_recent_migration = true;
				$show_continue_current_migration_script = false;
			}else{
				$show_most_recent_migration = false;
				$show_continue_current_migration_script = false;
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
			'update_migration_script_page_link' => EE_Admin_Page::add_query_args_and_nonce(array('action'=>'change_maintenance_level'),EE_MAINTENANCE_ADMIN_URL), 
			'reset_db_page_link'=>EE_Admin_Page::add_query_args_and_nonce(array('action'=>'reset_db'), EE_MAINTENANCE_ADMIN_URL),
		));
		//make sure we have the form fields helper available. It usually is, but sometimes it isn't
		EE_Registry::instance()->load_helper( 'Form_Fields' );
		//localize script stuff
		wp_localize_script('ee-maintenance', 'ee_maintenance', array(
			'migrating'=>  __("Migrating...", "event_espresso"),
			'next'=>  __("Next", "event_espresso"),
			'fatal_error'=>  __("A Fatal Error Has Occurred", "event_espresso"),
			'click_next_when_ready'=>  __("The current Migration has ended. Click 'next' when ready to proceed", "event_espresso"),
			'status_no_more_migration_scripts'=>  EE_Data_Migration_Manager::status_no_more_migration_scripts,
			'status_fatal_error'=>  EE_Data_Migration_Manager::status_fatal_error,
			'status_completed'=>  EE_Data_Migration_Manager::status_completed));
		}
		$this->_template_args['admin_page_content'] = EEH_Template::display_template($this->_template_path, $this->_template_args, TRUE);
		$this->display_admin_page_with_sidebar();
	}



	/**
	 * returns JSON and executes anotehr step of teh currently-executing data migration (called via ajax)
	 */
	public function migration_step(){
		$this->_template_args['data'] = EE_Data_Migration_Manager::instance()->response_to_migration_ajax_request();
		$this->_return_json();
	}



	/**
	 * Can be used by js when it notices a response with HTML in it in order
	 * to log the malformed response
	 */
	public function add_error_to_migrations_ran(){
		EE_Data_Migration_Manager::instance()->add_error_to_migrations_ran($this->_req_data['message']);
		$this->_template_args['data'] = array('ok'=>true);
		$this->_return_json();
	}



	/**
	 * changes teh maintenane level, provided there are still no migration scripts that shoudl run
	 */
	public function _change_maintenance_level(){
		$new_level = intval($this->_req_data['maintenance_mode_level']);
		if( ! EE_Data_Migration_Manager::instance()->check_for_applicable_data_migration_scripts()){
			EE_Maintenance_Mode::instance()->set_maintenance_level($new_level);
			$success = true;
		}else{
			EE_Maintenance_Mode::instance()->set_maintenance_mode_if_db_old();
			$success= false;
		}
		$this->_redirect_after_action($success, 'Maintenance Mode', __("Updated", "event_espresso"));
	}



	/**
	 * a tab with options for reseting and/or deleting EE data
	 */
	public function _data_reset_and_delete(){
		$this->_template_path = EE_MAINTENANCE_TEMPLATE_PATH . 'ee_data_reset_and_delete.template.php';
		$this->_template_args['delete_db_url'] = EE_Admin_Page::add_query_args_and_nonce(array('action'=>'delete_db'), EE_MAINTENANCE_ADMIN_URL);
		$this->_template_args['admin_page_content'] = EEH_Template::display_template($this->_template_path, $this->_template_args, TRUE);
		$this->display_admin_page_with_sidebar();
	}



	/**
	 * shows the big ol' system status page
	 */
	public function _system_status(){
		$this->_template_path = EE_MAINTENANCE_TEMPLATE_PATH . 'ee_system_stati_page.template.php';
		$this->_template_args['system_stati'] = EEM_System_Status::instance()->get_system_stati();
		EE_Registry::instance()->load_helper('Array');
		$this->_template_args['admin_page_content'] = EEH_Template::display_template($this->_template_path, $this->_template_args, TRUE);
		$this->display_admin_page_with_sidebar();
	}



	public function _send_migration_crash_report(){
		$from = $this->_req_data['from'];
		$from_name = $this->_req_data['from_name'];
		$body = $this->_req_data['body'];
		$success = wp_mail(EE_SUPPORT_EMAIL, 
				'Migration Crash Report', 
				$body."/r/n<br>".  print_r(EEM_System_Status::instance()->get_system_stati(),true),
				array(
					"from:$from_name<$from>",
//					'content-type:text/html charset=UTF-8'
					));
		$this->_redirect_after_action($success, __("Migration Crash Report", "event_espresso"), __("sent", "event_espresso"),array('success'=>$success,'action'=>'confirm_migration_crash_report_sent'));
	}



	public function _confirm_migration_crash_report_sent(){
		$success = $this->_req_data['success']=='1' ? true : false;
		$this->_template_args['success'] = $success;
		$this->_template_path = EE_MAINTENANCE_TEMPLATE_PATH . 'ee_confirm_migration_crash_report_sent.template.php';
		$this->_template_args['admin_page_content'] = EEH_Template::display_template($this->_template_path,$this->_template_args,TRUE);
		$this->display_admin_page_with_sidebar();
	}


	
	/**
	 * Resets the entire EE4 database.
	 * Currently basically only sets up ee4 database for a fresh install- doesn't
	 * actually clean out the old wp options, or cpts (although does erase old ee table data)
	 */
	public function _reset_db(){
		EE_Registry::instance()->load_helper('Activation');
		EE_Maintenance_Mode::instance()->set_maintenance_level(EE_Maintenance_Mode::level_0_not_in_maintenance);
		EEH_Activation::plugin_uninstall();
		EE_System::instance()->initialize_db_if_no_migrations_required(true);
		EE_System::instance()->redirect_to_about_ee();
	}	


	
	/**
	 * Deletes ALL EE tables, Records, and Options from the database.
	 */
	public function _delete_db(){
		EE_Registry::instance()->load_helper('Activation');
		EEH_Activation::delete_all_espresso_tables_and_data();
		wp_safe_redirect( admin_url( 'plugins.php' ));
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
		
		wp_register_style( 'espresso_maintenance', EE_MAINTENANCE_ASSETS_URL . 'ee-maintenance.css', array(), EVENT_ESPRESSO_VERSION );
		wp_enqueue_style('espresso_maintenance');
	}





	public function load_scripts_styles_default() {
		//styles
//		wp_enqueue_style('ee-text-links');
//		//scripts
//		wp_enqueue_script('ee-text-links');
	}



} //end Maintenance_Admin_Page class