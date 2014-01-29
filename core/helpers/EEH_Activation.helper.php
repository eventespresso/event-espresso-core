<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * EEH_Activation Helper
 *
 * @package			Event Espresso
 * @subpackage	/helpers/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EEH_Activation {


	/**
	 * 	system_initialization
	 * 	ensures the EE configuration settings are loaded with at least default options set
	 * 	and that all critical EE pages have been generated with the appropriate shortcodes in place
	 *
	 * 	@access public
	 * 	@static
	 * 	@return void
	 */
	public static function system_initialization() {
//		EEH_Activation::CPT_initialization();//dont register taxonomies on activation because they need to happen on INIT hook anyways
		//which is fired BEFORE activation of plugin anyways
		EEH_Activation::verify_default_pages_exist();
	}
	
	/**
	 * Sets the database schema and creates folders. This should
	 * be called on plugin activation and reactivation
	 */
	public static function initialize_db_and_folders(){
		EEH_Activation::create_upload_directories();
		EEH_Activation::create_database_tables();
	}
	
	/**
	 * assuming we have an up-to-date database schema, this will populate it
	 * with default and initial data. This should be called
	 * upon activation of a new plugin, reactivation, and at the end
	 * of running migration scripts
	 */
	public static function initialize_db_content(){
//		echo"init reg content";
		EEH_Activation::initialize_system_questions();
//		EEH_Activation::insert_default_prices();
//		EEH_Activation::insert_defaulinsert_default_pricest_price_types();
//		EEH_Activation::insert_default_tickets();
		EEH_Activation::insert_default_status_codes();
//		default countries and states actually takes place during data migration scripts
//		because converting state and coutnry names to foreign keys must occur for venues, attendees, etc
//		EEH_Activation::insert_default_countries();
//		EEH_Activation::insert_default_states();
		EEH_Activation::generate_default_message_templates();
		EEH_Activation::create_no_ticket_prices_array();
		//also initialize payment settings, which is a side-effect of calling
		//EEM_Gateway::load_all_gateways()
		EEM_Gateways::instance(true)->load_all_gateways();
		//also, check for CAF default db content
		do_action( 'AHEE__EEH_Activation__initialize_db_content' );		
		//also: EEM_Gateways::load_all_gateways() outputs a lot of success messages
		//which users really won't care about on initial activation
		EE_Error::overwrite_success();
	}



	/**
	 * 	CPT_initialization
	 *	registers all EE CPTs ( Custom Post Types ) then flushes rewrite rules so that all endpoints exist
	 *
	 * 	@access public
	 * 	@static
	 * 	@return void
	 */
	public static function CPT_initialization() {
		// register Custom Post Types
		EE_Registry::instance()->load_core( 'Register_CPTs' );
		flush_rewrite_rules();
	}




	/**
	 * deactivate_event_espresso
	 *
	 * 	@access public
	 * 	@static
	 * 	@return void
	 */
	public static function deactivate_event_espresso() {
		$active_plugins = array_flip( get_option( 'active_plugins' ));
		unset( $active_plugins[ EVENT_ESPRESSO_MAIN_FILE ] );
		update_option( 'active_plugins', array_flip( $active_plugins ));	
	}





	/**
	 * verify_default_pages_exist
	 *
	 * 	@access public
	 * 	@static
	 * 	@return void
	 */
	public static function verify_default_pages_exist() {

		$critical_page_problem = FALSE;
		
		$critical_pages = array(
			array( 
				'id' =>'reg_page_id',
				'name' => __( 'Registration Checkout', 'event_espresso' ),
				'post' => NULL,
				'code' => 'ESPRESSO_CHECKOUT'
			),
			array( 
				'id' => 'txn_page_id',
				'name' => __( 'Transactions', 'event_espresso' ),
				'post' => NULL,
				'code' => 'ESPRESSO_TXN_PAGE'
			),
			array( 
				'id' => 'thank_you_page_id',
				'name' => __( 'Thank You', 'event_espresso' ),
				'post' => NULL,
				'code' => 'ESPRESSO_THANK_YOU'
			),
			array( 
				'id' => 'cancel_page_id',
				'name' => __( 'Registration Cancelled', 'event_espresso' ),
				'post' => NULL,
				'code' => 'ESPRESSO_CANCELLED'
			),
		);

		foreach ( $critical_pages as $critical_page ) {
			// is critical page ID set in config ?
			if ( EE_Registry::instance()->CFG->core->$critical_page['id'] !== FALSE ) {
				// attempt to find post by ID
				$critical_page['post'] = get_post( EE_Registry::instance()->CFG->core->$critical_page['id'] );
			}
			// no dice?
			if ( $critical_page['post'] == NULL ) {
				// attempt to find post by title
				$critical_page['post'] = get_page_by_title( $critical_page['name'] );
				// still nothing?
				if ( $critical_page['post'] == NULL ) {
					$critical_page = EEH_Activation::create_critical_page( $critical_page );
					// REALLY? Still nothing ??!?!?
					if ( $critical_page['post'] == NULL ) {
						$msg = __( 'The Event Espresso critical page configuration settings could not be updated.', 'event_espresso' );
						EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
						break;				
					}
				}
			}
			// track post_shortcodes
			if ( $critical_page['post'] ) {
				EEH_Activation::_track_critical_page_post_shortcodes( $critical_page );
			}	
			// check that Post ID matches critical page ID in config
			if ( isset( $critical_page['post']->ID ) && $critical_page['post']->ID != EE_Registry::instance()->CFG->core->$critical_page['id'] ) {
				//update Config with post ID
				EE_Registry::instance()->CFG->core->$critical_page['id'] = $critical_page['post']->ID;
				if ( ! EE_Config::instance()->update_espresso_config( FALSE, FALSE ) ) {
					$msg = __( 'The Event Espresso critical page configuration settings could not be updated.', 'event_espresso' );
					EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
				}					
			}
			
			$critical_page_problem =  ! isset( $critical_page['post']->post_status ) || $critical_page['post']->post_status != 'publish' || strpos( $critical_page['post']->post_content, $critical_page['code'] ) === FALSE ? TRUE : $critical_page_problem;

		}
						
		if ( $critical_page_problem ) {
			$msg = sprintf(
				__('A potential issue has been detected with one or more of your Event Espresso pages. Go to %s to view your Event Espresso pages.', 'event_espresso' ),
				'<a href="' . admin_url('admin.php?page=espresso_general_settings&action=critical_pages') . '">' . __('Event Espresso Critical Pages Settings', 'event_espresso') . '</a>'
			);
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
		}

	}






	/**
	 * 	This function generates a post for critical espresso pages
	 *
	 * 	@access public
	 * 	@static
	 * 	@return void
	 */
	public static function create_critical_page( $critical_page ) {
		
		$post_args = array(
			'post_title' => $critical_page['name'],
			'post_status' => 'publish',
			'post_type' => 'page',
			'comment_status' => 'closed',
			'post_content' => '[' . $critical_page['code'] . ']'
		);
		
		$post_id = wp_insert_post( $post_args );
		if ( ! $post_id ) {
			$msg = sprintf(
				__( 'The Event Espresso  critical page entitled "%s" could not be created.', 'event_espresso' ),
				$critical_page['name']
			);
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );			
			return $critical_page;
		}
		// get newly created post's details
		if ( ! $critical_page['post'] = get_post( $post_id )) {			
			$msg = sprintf(
				__( 'The Event Espresso critical page entitled "%s" could not be retreived.', 'event_espresso' ),
				$critical_page['name']
			);
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );			
		}
		
		return $critical_page;				

	}





	/**
	 * 	This function adds a critical page's shortcode to the post_shortcodes array
	 *
	 * 	@access private
	 * 	@static
	 * 	@return void
	 */
	private static function _track_critical_page_post_shortcodes( $critical_page ) {
		// check the goods
		if ( ! $critical_page['post'] instanceof WP_Post ) {
			$msg = sprintf(
				__( 'The Event Espresso critical page shortcode for the page %s can not be tracked because it is not a WP_Post object.', 'event_espresso' ),
				$critical_page['name']
			);
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return;
		}
		// map shortcode to post
		EE_Registry::instance()->CFG->core->post_shortcodes[ $critical_page['post']->post_name ][ $critical_page['code'] ] = $critical_page['post']->ID;
		// and to frontpage in case it's displaying latest posts
		$show_on_front = get_option('show_on_front');
		EE_Registry::instance()->CFG->core->post_shortcodes[ $show_on_front ][ $critical_page['code'] ] = $critical_page['post']->ID;
		// update post_shortcode CFG
		if ( ! EE_Config::instance()->update_espresso_config( FALSE, FALSE )) {
			$msg = sprintf(
				__( 'The Event Espresso critical page shortcode for the %s page could not be configured properly.', 'event_espresso' ),
				$critical_page['name']
			);
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
		}		
	}





	/**
	 * 	used by EE and EE addons during plugin activation
	 *
	 * 	@access public
	 * 	@static
	 * @param string $table_name withou the $wpdb->prefix
	 * @param string $sql SQL for creating the table (contents between brackets in an SQL create table query)
	 * @param string engine like 'ENGINE=MyISAM' or 'ENGINE=InnoDB'
	 * @param boolean $drop_table_if_pre_existed set to TRUE when you want to make SURE the table is completely empty
	 * and new once this function is done (ie, you really do want to CREATE a table, and
	 * expect it to be empty once you're done)
	 * leave as FALSE when you just want to verify the table exists and matches this definition (and if it 
	 * HAS data in it you want to leave it be)
	 * 	@return void
	 */
	public static function create_table( $table_name, $sql, $engine = 'ENGINE=MyISAM ',$drop_table_if_pre_existed = false ) {
//		echo "create table $table_name ". ($drop_table_if_pre_existed? 'but first nuke preexisting one' : 'or update it if it exstsi') . "<br>";//die;
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		if ( ! function_exists( 'dbDelta' )) {
			require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
		}
		global $wpdb;		
		$wp_table_name = $wpdb->prefix . $table_name;
		//		if(in_array(EE_System::instance()->detect_req_type(),array(EE_System::req_type_new_activation,  EE_System::req_t) )
		if($drop_table_if_pre_existed){
			$wpdb->query("DROP TABLE IF EXISTS $wp_table_name ");
		}
		$SQL = "CREATE TABLE $wp_table_name ( $sql ) $engine DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;";
		dbDelta( $SQL );
		// clear any of these out
		delete_option( $table_name . '_tbl_version' );
		delete_option( $table_name . '_tbl' );
	}






	/**
	 * 	add_column_if_it_doesnt_exist
	 * 	Checks if this column already exists on the specified table. Handy for addons which want to add a column
	 *
	 * 	@access public
	 * 	@static
	 * 	@param string $table_name (wihtout "wp_", eg "esp_attendee"
	 * 	@param string $column_name
	 * 	@param string $column_info if your SQL were 'ALTER TABLE table_name ADD price VARCHAR(10)', this would be 'VARCHAR(10)'
	 */
	public static function add_column_if_it_doesnt_exist($table_name,$column_name,$column_info='INT UNSIGNED NOT NULL'){
		global $wpdb;
		$full_table_name=$wpdb->prefix.$table_name;
		$fields = self::get_fields_on_table($table_name);
		if (!in_array($column_name, $fields)){
			$alter_query="ALTER TABLE $full_table_name ADD $column_name $column_info";
			//echo "alter query:$alter_query";
			return mysql_query($alter_query);
		}
		return true;
	}




	/**
	 * get_fields_on_table
	 * Gets all the fields on the database table. 
	 *
	 * 	@access public
	 * 	@static
	 * 	@param string $table_name, wihtout prefixed $wpdb->prefix
	 * 	@return array of database column names
	 */
	public static function get_fields_on_table( $table_name = NULL ) {	
		global $wpdb;
		$table_name=$wpdb->prefix.$table_name;
		if ( ! empty( $table_name )) {
			if (($tablefields = mysql_list_fields(DB_NAME, $table_name, $wpdb -> dbh)) !== FALSE) { 
				$columns = mysql_num_fields($tablefields);
				$field_array = array();
				for ($i = 0; $i < $columns; $i++) {
					$fieldname = mysql_field_name($tablefields, $i);
					$field_array[] = $fieldname;
				}
				return $field_array;
			}
		}
		return FALSE;
	}



	/**
	 * delete_unused_db_table
	 *
	 * 	@access public
	 * 	@static
	 * 	@return void
	 */
	public static function delete_unused_db_table( $table_name ) {
		global $wpdb;
		$table_name = strpos( $table_name, $wpdb->prefix ) === FALSE ? $wpdb->prefix . $table_name : $table_name;
		return $wpdb->query( 'DROP TABLE IF EXISTS '. $table_name );
	}


	/**
	 * drop_index
	 *
	 * 	@access public
	 * 	@static
	 * 	@return void
	 */
	public static function drop_index( $table_name, $index_name ) {
		global $wpdb;
		if ( $wpdb->get_var( "SHOW TABLES LIKE '" . $wpdb->prefix . $table_name . "'" ) == $wpdb->prefix . $table_name ) {
			return $wpdb->query( 'ALTER TABLE '.$wpdb->prefix . $table_name . ' DROP INDEX ' . $index_name );
		}
	}






	/**
	 * create_database_tables
	 *
	 * 	@access public
	 * 	@static
	 * 	@return void
	 */
	public static function create_database_tables() {
		//simply use teh data migration script's schema code
		//in order to avoid duplicate. When a new version is released (eg 4.2), use that version's data migration code.
		//if 4.2 doesn't need to migrate anything, and only needs to add a column, you should still create a migration script for it,
		//but just define the schema changes methods
		EE_Registry::instance()->load_file(EE_CORE . 'data_migration_scripts','EE_DMS_4_1_0','dms');
		$current_data_migration_script = new EE_DMS_4_1_0();
		//decide what to do when tables already exist. Do we nuke them and start fresh? or do we simply modify them?
		//if this is a new activation, (or if it were run from a data migration script), nuke old tables
		$drop_pre_existing_tables = EE_System::instance()->detect_req_type() == EE_System::req_type_new_activation ? true : false;
		$current_data_migration_script->schema_changes_before_migration($drop_pre_existing_tables);
		$current_data_migration_script->schema_changes_after_migration($drop_pre_existing_tables);
	}





	/**
	 * initialize_system_questions
	 *
	 * 	@access public
	 * 	@static
	 * 	@return void
	 */
	public static function initialize_system_questions() {
		// QUESTION GROUPS
		global $wpdb;
		$SQL = 'SELECT QSG_system FROM ' . $wpdb->prefix . 'esp_question_group WHERE QSG_system != 0';
		// what we have
		$question_groups = $wpdb->get_col( $SQL );
		// check the reponse
		$question_groups = is_array( $question_groups ) ? $question_groups : array();
		// what we should have
		$QSG_systems = array( 1, 2 );
		// loop thru what we should have and compare to what we have
		foreach ( $QSG_systems as $QSG_system ) {
			
			// if we don't have what we should have (but use $QST_system as as string because thats what we got fromteh db)
			if ( ! in_array( "$QSG_system", $question_groups )) {
				// add it
				switch ( $QSG_system ) {
					
					case 1:
							$QSG_values = array( 
									'QSG_name' => __( 'Personal Information', 'event_espresso' ),
									'QSG_identifier' => 'personal-information-' . time(),
									'QSG_desc' => '',
									'QSG_order' => 1,
									'QSG_show_group_name' => 1,
									'QSG_show_group_desc' => 1,
									'QSG_system' => 1,
									'QSG_deleted' => 0
								);
						break;
						
					case 2:
							$QSG_values = array( 
									'QSG_name' => __( 'Address Information','event_espresso' ),
									'QSG_identifier' => 'address-information-' . time(),
									'QSG_desc' => '',
									'QSG_order' => 2,
									'QSG_show_group_name' => 1,
									'QSG_show_group_desc' => 1,
									'QSG_system' => 2,
									'QSG_deleted' => 0
								);
						break;
						
				}
				// insert system question
				$wpdb->insert(
					$wpdb->prefix . 'esp_question_group', 
					$QSG_values, 
					array('%s', '%s', '%s', '%d', '%d', '%d', '%d', '%d' )
				);
				$QSG_IDs[ $QSG_system ] = $wpdb->insert_id;		
			}
		}


		
		// QUESTIONS
		global $wpdb;
		$SQL = 'SELECT QST_system FROM ' . $wpdb->prefix . "esp_question WHERE QST_system != ''";
		// what we have
		$questions = $wpdb->get_col( $SQL );
		// what we should have
		$QST_systems = array( 
			'fname', 
			'lname', 
			'email', 
			'address', 
			'address2', 
			'city', 
			'state', 
			'country', 
			'zip', 
			'phone' 
		);
		
		// loop thru what we should have and compare to what we have
		foreach ( $QST_systems as $QST_system ) {
			// if we don't have what we should have
			if ( ! in_array( $QST_system, $questions )) {
				// add it
				switch ( $QST_system ) {
					
					case 'fname':
							$QST_values = array( 
									'QST_display_text' => __( 'First Name', 'event_espresso' ),
									'QST_admin_label' => __( 'First Name - System Question', 'event_espresso' ),
									'QST_system' => 'fname',
									'QST_type' => 'TEXT',
									'QST_required' => 1,
									'QST_required_text' => __( 'This field is required', 'event_espresso' ),
									'QST_order' => 1,
									'QST_admin_only' => 0,
									'QST_wp_user' => 1,
									'QST_deleted' => 0
								);
						break;
						
					case 'lname':
							$QST_values = array( 
									'QST_display_text' => __( 'Last Name', 'event_espresso' ),
									'QST_admin_label' => __( 'Last Name - System Question', 'event_espresso' ),
									'QST_system' => 'lname',
									'QST_type' => 'TEXT',
									'QST_required' => 1,
									'QST_required_text' => __( 'This field is required', 'event_espresso' ),
									'QST_order' => 2,
									'QST_admin_only' => 0,
									'QST_wp_user' => 1,
									'QST_deleted' => 0
								);
						break;
						
					case 'email':
							$QST_values = array( 
									'QST_display_text' => __( 'Email Address', 'event_espresso' ),
									'QST_admin_label' => __( 'Email Address - System Question', 'event_espresso' ),
									'QST_system' => 'email',
									'QST_type' => 'TEXT',
									'QST_required' => 1,
									'QST_required_text' => __( 'This field is required', 'event_espresso' ),
									'QST_order' => 3,
									'QST_admin_only' => 0,
									'QST_wp_user' => 1,
									'QST_deleted' => 0
								);
						break;
						
					case 'address':
							$QST_values = array( 
									'QST_display_text' => __( 'Address', 'event_espresso' ),
									'QST_admin_label' => __( 'Address - System Question', 'event_espresso' ),
									'QST_system' => 'address',
									'QST_type' => 'TEXT',
									'QST_required' => 0,
									'QST_required_text' => __( 'This field is required', 'event_espresso' ),
									'QST_order' => 4,
									'QST_admin_only' => 0,
									'QST_wp_user' => 1,
									'QST_deleted' => 0
								);
						break;
						
					case 'address2':
							$QST_values = array( 
									'QST_display_text' => __( 'Address2', 'event_espresso' ),
									'QST_admin_label' => __( 'FirAddress2 - System Question', 'event_espresso' ),
									'QST_system' => 'address2',
									'QST_type' => 'TEXT',
									'QST_required' => 0,
									'QST_required_text' => __( 'This field is required', 'event_espresso' ),
									'QST_order' => 5,
									'QST_admin_only' => 0,
									'QST_wp_user' => 1,
									'QST_deleted' => 0
								);
						break;
						
					case 'city':
							$QST_values = array( 
									'QST_display_text' => __( 'City', 'event_espresso' ),
									'QST_admin_label' => __( 'City - System Question', 'event_espresso' ),
									'QST_system' => 'city',
									'QST_type' => 'TEXT',
									'QST_required' => 0,
									'QST_required_text' => __( 'This field is required', 'event_espresso' ),
									'QST_order' => 6,
									'QST_admin_only' => 0,
									'QST_wp_user' => 1,
									'QST_deleted' => 0
								);
						break;
						
					case 'state':
							$QST_values = array( 
									'QST_display_text' => __( 'State / Province', 'event_espresso' ),
									'QST_admin_label' => __( 'State / Province - System Question', 'event_espresso' ),
									'QST_system' => 'state',
									'QST_type' => 'TEXT',
									'QST_required' => 0,
									'QST_required_text' => __( 'This field is required', 'event_espresso' ),
									'QST_order' => 7,
									'QST_admin_only' => 0,
									'QST_wp_user' => 1,
									'QST_deleted' => 0
								);
						break;
						
					case 'country' : 
							$QST_values = array( 
									'QST_display_text' => __( 'Country', 'event_espresso' ),
									'QST_admin_label' => __( 'Country - System Question', 'event_espresso' ),
									'QST_system' => 'country',
									'QST_type' => 'TEXT',
									'QST_required' => 0,
									'QST_required_text' => __( 'This field is required', 'event_espresso' ),
									'QST_order' => 8,
									'QST_admin_only' => 0,
									'QST_wp_user' => 1,
									'QST_deleted' => 0
								);
						break;
						
					case 'zip':
							$QST_values = array( 
									'QST_display_text' => __( 'Zip / Postal Code', 'event_espresso' ),
									'QST_admin_label' => __( 'Zip / Postal Code - System Question', 'event_espresso' ),
									'QST_system' => 'zip',
									'QST_type' => 'TEXT',
									'QST_required' => 0,
									'QST_required_text' => __( 'This field is required', 'event_espresso' ),
									'QST_order' => 9,
									'QST_admin_only' => 0,
									'QST_wp_user' => 1,
									'QST_deleted' => 0
								);
						break;
						
					case 'phone':
							$QST_values = array( 
									'QST_display_text' => __( 'Phone Number', 'event_espresso' ),
									'QST_admin_label' => __( 'Phone Number - System Question', 'event_espresso' ),
									'QST_system' => 'phone',
									'QST_type' => 'TEXT',
									'QST_required' => 0,
									'QST_required_text' => __( 'This field is required', 'event_espresso' ),
									'QST_order' => 10,
									'QST_admin_only' => 0,
									'QST_wp_user' => 1,
									'QST_deleted' => 0
								);
						break;
						
				}
				// insert system question
				$wpdb->insert(
					$wpdb->prefix . 'esp_question', 
					$QST_values, 
					array( '%s', '%s', '%s', '%s', '%d', '%s', '%d', '%d', '%d', '%d' )
				);
				$QST_ID = $wpdb->insert_id;	
				
				// QUESTION GROUP QUESTIONS 
				
				$QSG_ID = in_array( $QST_system, array('fname','lname','email')) ? 1 : 2;			
				// add system questions to groups
				$wpdb->insert(
					$wpdb->prefix . 'esp_question_group_question', 
					array( 'QSG_ID' => $QSG_ID , 'QST_ID' => $QST_ID ), 
					array( '%d', '%d' )
				);			
				
			}
		}

	}









	



	/**
	 * insert_default_status_codes
	 *
	 * 	@access public
	 * 	@static
	 * 	@return void
	 */
	public static function insert_default_status_codes() {

		global $wpdb;
		$table = $wpdb->get_var("SHOW TABLES LIKE '" . EEM_Status::instance()->table() . "'");

		if ( $table == EEM_Status::instance()->table()) {

			$SQL = "DELETE FROM " . EEM_Status::instance()->table() . " WHERE STS_ID IN ( 'ACT', 'NAC', 'NOP', 'OPN', 'CLS', 'PND', 'ONG', 'SEC', 'DRF', 'DEL', 'DEN', 'EXP', 'RPP', 'RCN', 'RDC', 'RAP', 'RNA', 'TIN', 'TPN', 'TCM', 'TOP', 'PAP', 'PCN', 'PFL', 'PDC', 'EDR', 'ESN', 'PPN' );";
			$wpdb->query($SQL);

			$SQL = "INSERT INTO " . EEM_Status::instance()->table() . " 
					(STS_ID, STS_code, STS_type, STS_can_edit, STS_desc, STS_open) VALUES
					('ACT', 'ACTIVE', 'event', 0, NULL, 1),
					('NAC', 'NOT_ACTIVE', 'event', 0, NULL, 0),
					('NOP', 'REGISTRATION_NOT_OPEN', 'event', 0, NULL, 1),
					('OPN', 'REGISTRATION_OPEN', 'event', 0, NULL, 1),
					('CLS', 'REGISTRATION_CLOSED', 'event', 0, NULL, 0),
					('PND', 'PENDING', 'event', 0, NULL, 1),
					('ONG', 'ONGOING', 'event', 0, NULL, 1),
					('SEC', 'SECONDARY', 'event', 0, NULL, 1),
					('DRF', 'DRAFT', 'event', 0, NULL, 0),
					('DEL', 'DELETED', 'event', 0, NULL, 0),
					('DEN', 'DENIED', 'event', 0, NULL, 0),
					('EXP', 'EXPIRED', 'event', 0, NULL, 0),
					('RPP', 'PENDING_PAYMENT', 'registration', 0, NULL, 1),
					('RAP', 'APPROVED', 'registration', 0, NULL, 1),
					('RCN', 'CANCELLED', 'registration', 0, NULL, 0),
					('RDC', 'DECLINED', 'registration', 0, NULL, 0),
					('RNA', 'NOT_APPROVED', 'registration', 0, NULL, 1),
					('TIN', 'INCOMPLETE', 'transaction', 0, NULL, 0),
					('TPN', 'OPEN', 'transaction', 0, NULL, 1),
					('TCM', 'COMPLETE', 'transaction', 0, NULL, 1),
					('TOP',	'OVERPAID', 'transaction', 0, NULL, 1),
					('PAP', 'APPROVED', 'payment', 0, NULL, 1),
					('PPN', 'PENDING', 'payment', 0, NULL, 1),
					('PCN', 'CANCELLED', 'payment', 0, NULL, 0),
					('PFL', 'FAILED', 'payment', 0, NULL, 0),
					('PDC', 'DECLINED', 'payment', 0, NULL, 0),
					('EDR', 'DRAFT', 'email', 0, NULL, 0),
					('ESN', 'SENT', 'email', 0, NULL, 1);";
			$wpdb->query($SQL);	
			
		}
		
	}



	



	





	/**
	 * create_upload_directories
	 * Creates folders in the uploads directory to facilitate addons and templates
	 *
	 * 	@access public
	 * 	@static
	 * 	@return void
	 */
	public static function create_upload_directories() {
		// Create the required folders
		$folders = array(
				EVENT_ESPRESSO_UPLOAD_DIR,
				EVENT_ESPRESSO_TEMPLATE_DIR,
				EVENT_ESPRESSO_GATEWAY_DIR,
				EVENT_ESPRESSO_UPLOAD_DIR . '/logs/',
				EVENT_ESPRESSO_UPLOAD_DIR . '/css/',
				EVENT_ESPRESSO_UPLOAD_DIR . '/tickets/',
				EVENT_ESPRESSO_UPLOAD_DIR . '/themeroller/',
		);
		foreach ($folders as $folder) {
			wp_mkdir_p($folder);
			@ chmod($folder, 0755);
		}
	}




	/**
	 * generate_default_message_templates
	 *
	 * 	@access public
	 * 	@static
	 * 	@return void
	 */
	public static function generate_default_message_templates() {
		
		$templates = FALSE;
		$settings = $installed_messengers = array();

		//let's first setup an array of what we consider to be the default messengers.
		$default_messengers = array( 'email' );

		//let's determine if we've already got an active messengers option
		$active_messengers = get_option('ee_active_messengers');

		//do an initial loop to determine if we need to continue
		$def_ms = array();
		foreach ( $default_messengers as $msgr ) {
			if ( isset($active_messengers[$msgr] ) ) continue;
			$def_ms[] = $msgr;
		}

		//continue?
		if ( empty( $def_ms ) ) return false;

		//include our helper
		EE_Registry::instance()->load_helper( 'MSG_Template' );

		//get all installed messenger objects
		$installed = EEH_MSG_Template::get_installed_message_objects();

		$inst_msgrs = $installed['messengers'];
		$inst_mts = $installed['message_types'];

		//let's setup the $installed messengers in an array
		foreach ( $inst_msgrs as $msgr ) {
			$installed_messengers[$msgr->name] = $msgr;
		}

		//setup the $installed_mts in an array
		foreach ( $inst_mts as $imt ) {
			$installed_mts[$imt->name] = $imt;
		}

		//loop through default array
		foreach ( $def_ms as $messenger ) {
			//all is good so let's setup the default stuff. We need to use the given messenger object (if exists) to get the default message type for the messenger.
			if ( !isset( $installed_messengers[$messenger] ) ) continue;

			$default_mts = $installed_messengers[$messenger]->get_default_message_types();

			$active_messengers[$messenger]['obj'] = $installed_messengers[$messenger];
			foreach ( $default_mts as $mt ) {
				//we need to setup any initial settings for message types
				$settings_fields = $installed_mts[$mt]->get_admin_settings_fields();
				if ( !empty( $settings_fields ) ) {
					foreach ( $settings_fields as $field => $values ) {
						$settings[$field] = $values['default'];
					}
				} else {
					$settings = array();
				}

				$active_messengers[$messenger]['settings'][$messenger . '-message_types'][$mt]['settings'] = $settings;
			}

			//setup any initial settings for the messenger
			$msgr_settings = $installed_messengers[$messenger]->get_admin_settings_fields();

			if ( !empty( $msgr_settings ) ) {
				foreach ( $msgr_settings as $field => $value ) {
					$active_messengers[$messenger]['settings'][$field] = $value;
				}
			}

			//now let's save the settings for this messenger!
			update_option( 'ee_active_messengers', $active_messengers );


			//let's generate all the templates
			$templates = EEH_MSG_Template::generate_new_templates( $messenger, $default_mts, '', TRUE );

		}

		//that's it!  //maybe we'll return $templates for possible display of error or help message later?
		return $templates;
	}




	/**
	 * create_no_ticket_prices_array
	 *
	 * 	@access public
	 * 	@static
	 * 	@return void
	 */
	public static function create_no_ticket_prices_array(){
		// this creates an array for tracking events that have no active ticket prices created
		// this allows us to warn admins of the situation so that it can be corrected
		$espresso_no_ticket_prices = get_option( 'espresso_no_ticket_prices', FALSE );
		if ( ! $espresso_no_ticket_prices ) {
			add_option( 'espresso_no_ticket_prices', array(), '', FALSE );
		}	
	}



	/**
	 * plugin_deactivation
	 *
	 * 	@access public
	 * 	@static
	 * 	@return void
	 */
	public static function plugin_deactivation() {
	}



	/**
	 * plugin_uninstall
	 *
	 * 	@access public
	 * 	@static
	 * 	@return void
	 */
	public static function plugin_uninstall() {
		global $wpdb;
		$no_tables = array(
			'EEM_Base' => TRUE,
			'EEM_CPT_Base' => TRUE,
			'EEM_Gateways' => TRUE,
			'EEM_Soft_Delete_Base' => TRUE,
			'EEM_System_Status' => TRUE
		);
		$undeleted_tables = array();
		foreach ( EE_Registry::instance()->models as $model ) {
			if ( ! isset( $no_tables[ $model ] )) {
				if ( method_exists( $model, 'instance' ) && $model::instance() instanceof EEM_Base ) {
					foreach ( $model::instance()->get_tables() as $table ) {
						if ( strpos( $table->get_table_name(), 'esp_' )) {
							switch ( EEH_Activation::delete_unused_db_table( $table->get_table_name() )) {
								case FALSE :
									$undeleted_tables[] = $table->get_table_name();
								break;
								case 0 :
	//								echo '<h4 style="color:red;">the table : ' . $table->get_table_name() . ' was not deleted  <br /></h4>';
								break;
								default:
	//								echo '<h4>the table : ' . $table->get_table_name() . ' was deleted successully <br /></h4>';
							}
						}
					}
				}
			}
		}
		
		$wp_options_to_delete = array(
			'espresso_no_ticket_prices' => TRUE,
			'ee_active_messengers' => TRUE,
			'espresso_flush_rewrite_rules' => TRUE,
			'espresso_config' => TRUE,
			'espresso_data_migration_current_db_state' => TRUE,
			'espresso_data_migrations' => TRUE,
			'espresso_notices' => TRUE,
			'lang_file_check_' => FALSE,
			'maintenance_mode' => TRUE,
			'ee_ueip_optin' => TRUE,
			'ee_ueip_has_notified' => TRUE,
			'espresso_plugin_activation_errors' => TRUE,
			'espresso_id_mapping_from' => FALSE,
			'espresso_persistent_admin_notices' => TRUE,
			'espresso_encryption_key' => TRUE,
			'pue_force_upgrade_' => FALSE,
			'pue_json_error_' => FALSE,
			'pue_install_key_' => FALSE,
			'pue_verification_error_' => FALSE,
			'pu_dismissed_upgrade_' => FALSE,
			'external_updates-' => FALSE,
			'ee_extra_data' => TRUE,
			'EE_SSN_' => FALSE,
			'esp_rss_' => FALSE,
			'rte_n_tx_' => FALSE
		);
		
		$undeleted_options = array();
		foreach ( $wp_options_to_delete as $option_name => $no_wildcard ) {
			if ( $no_wildcard ) {
				$SQL = "DELETE FROM $wpdb->options WHERE option_name = '$option_name'";
			} else {
				$SQL = "DELETE FROM $wpdb->options WHERE option_name LIKE '%$option_name%'";
			}
			switch ( $wpdb->query( $SQL )) {
				case FALSE :
					$undeleted_options[] = $option_name;
				break;
				case 0 :
//					echo '<h4 style="color:red;">the option : ' . $option_name . ' was not deleted  <br /></h4>';
				break;
				default:
//					echo '<h4>the option : ' . $option_name . ' was deleted successully <br /></h4>';
			}
		}
		
		$errors = '';
		if ( ! empty( $undeleted_tables )) {
			$errors .= sprintf( 
				__( 'The following tables could not be deleted: %s%s', 'event_espresso' ),
				'<br/>',
				implode( ',<br/>', $undeleted_tables )
			);
		}
		if ( ! empty( $undeleted_options )) {
			$errors .= ! empty( $undeleted_tables ) ? '<br/>' : '';
			$errors .= sprintf( 
				__( 'The following wp-options could not be deleted: %s%s', 'event_espresso' ),
				'<br/>',
				implode( ',<br/>', $undeleted_options )
			);
			
		}
		if ( $espresso_db_update = get_option( 'espresso_db_update' )) {
			unset( $espresso_db_update[ espresso_version() ] );
			update_option( 'espresso_db_update', $espresso_db_update );
		}
		if ( $errors != '' ) {
			echo $errors;
		}
	}




}
// End of file EEH_Activation.helper.php
// Location: /helpers/EEH_Activation.core.php
