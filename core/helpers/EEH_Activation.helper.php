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
	 * constant used to indicate a cron task is no longer in use
	 */
	const cron_task_no_longer_in_use = null;

	private static $_default_creator_id = null;

	/**
	 * indicates whether or not we've already verified core's default data during this request,
	 * because after migrations are done, any addons activated while in maintenance mode
	 * will want to setup their own default data, and they might hook into core's default data
	 * and trigger core to setup its default data. In which case they might all ask for core to init its default data.
	 * This prevents doing that for EVERY single addon.
	 * @var boolean
	 */
	protected static $_initialized_db_content_already_in_this_request = false;


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
	 * @return boolean success, whether the database and folders are setup properly
	 */
	public static function initialize_db_and_folders(){
		$good_filesystem = EEH_Activation::create_upload_directories();
		$good_db = EEH_Activation::create_database_tables();
		return $good_filesystem && $good_db;
	}



	/**
	 * assuming we have an up-to-date database schema, this will populate it
	 * with default and initial data. This should be called
	 * upon activation of a new plugin, reactivation, and at the end
	 * of running migration scripts
	 */
	public static function initialize_db_content(){
		//let's avoid doing all this logic repeatedly, especially when addons are requesting it
		if( EEH_Activation::$_initialized_db_content_already_in_this_request ) {
			return;
		}
		EEH_Activation::$_initialized_db_content_already_in_this_request = true;

		EEH_Activation::initialize_system_questions();
		EEH_Activation::insert_default_status_codes();
		EEH_Activation::generate_default_message_templates();
		EEH_Activation::create_no_ticket_prices_array();
		EE_Registry::instance()->CAP->init_caps();

		EEH_Activation::validate_messages_system();
		EEH_Activation::insert_default_payment_methods();
		//in case we've
		EEH_Activation::remove_cron_tasks();
		EEH_Activation::create_cron_tasks();
		//also, check for CAF default db content
		do_action( 'AHEE__EEH_Activation__initialize_db_content' );
		//also: EEM_Gateways::load_all_gateways() outputs a lot of success messages
		//which users really won't care about on initial activation
		EE_Error::overwrite_success();
	}



	/**
	 * Returns an array of cron tasks. Array values are the actions fired by the cron tasks (the "hooks"),
	 * values are the frequency (the "recurrence"). See http://codex.wordpress.org/Function_Reference/wp_schedule_event
	 * If the cron task should NO longer be used, it should have a value of EEH_Activation::cron_task_no_longer_in_use (null)
	 *
	 * @param string $which_to_include can be 'current' (ones that are currently in use),
	 *                          'old' (only returns ones that should no longer be used),or 'all',
	 * @return array
	 * @throws \EE_Error
	 */
	public static function get_cron_tasks( $which_to_include ) {
		$cron_tasks = apply_filters(
			'FHEE__EEH_Activation__get_cron_tasks',
			array(
				'AHEE__EE_Cron_Tasks__clean_up_junk_transactions' => 'hourly',
//				'AHEE__EE_Cron_Tasks__finalize_abandoned_transactions' => EEH_Activation::cron_task_no_longer_in_use, actually this is still in use
			)
		);
		if( $which_to_include === 'all' ) {
			//leave as-is
		}elseif( $which_to_include === 'old' ) {
			$cron_tasks = array_filter( $cron_tasks, function ( $value ) {
				return $value === EEH_Activation::cron_task_no_longer_in_use;
			});
		}elseif( $which_to_include === 'current' ) {
			$cron_tasks = array_filter( $cron_tasks );
		}elseif( WP_DEBUG ) {
			throw new EE_Error( sprintf( __( 'Invalidate argument of "%1$s" passed to EEH_Activation::get_cron_tasks. Valid values are "all", "old" and "current".', 'event_espresso' ), $which_to_include ) );
		}else{
			//leave as-is
		}
		return $cron_tasks;
	}

	/**
	 * Ensure cron tasks are setup (the removal of crons should be done by remove_crons())
	 */
	public static function create_cron_tasks() {

		foreach( EEH_Activation::get_cron_tasks( 'current' ) as $hook_name => $frequency ) {
			if( ! wp_next_scheduled( $hook_name ) ) {
				wp_schedule_event( time(), $frequency, $hook_name );
			}
		}

	}

	/**
	 * Remove the currently-existing and now-removed cron tasks.
	 * @param boolean $remove_all whether to only remove the old ones, or remove absolutely ALL the EE ones
	 */
	public static function remove_cron_tasks( $remove_all = true ) {
		$cron_tasks_to_remove = $remove_all ? 'all' : 'old';
		foreach( EEH_Activation::get_cron_tasks( $cron_tasks_to_remove ) as $hook_name => $frequency ) {
			while( $scheduled_time = wp_next_scheduled( $hook_name ) ) {
				wp_unschedule_event( $scheduled_time, $hook_name );
			}
		}
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
		// check permissions
		if ( current_user_can( 'activate_plugins' )) {
			deactivate_plugins( EE_PLUGIN_BASENAME, TRUE );
		}
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
				$critical_page['post'] = self::get_page_by_ee_shortcode( $critical_page['code'] );
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
			EE_Error::add_persistent_admin_notice( 'critical_page_problem', $msg );
		}

		if ( EE_Error::has_notices() ) {
			EE_Error::get_notices( FALSE, TRUE, TRUE );
		}

	}

	/**
	 * Returns the first post which uses the specified shortcode
	 * @param string $ee_shortcode usually one of the critical pages shortcodes, eg
	 * ESPRESSO_THANK_YOU. So we will search fora post with the content "[ESPRESSO_THANK_YOU"
	 * (we don't search for the closing shortcode bracket because they might have added
	 * parameter to the shortcode
	 * @return WP_Post or NULl
	 */
	public static function get_page_by_ee_shortcode($ee_shortcode){
		global $wpdb;
		$shortcode_and_opening_bracket = '['.$ee_shortcode;
		$post_id = $wpdb->get_var("SELECT ID FROM {$wpdb->posts} WHERE post_content LIKE '%$shortcode_and_opening_bracket%' LIMIT 1");
		if($post_id){
			return get_post($post_id);
		}else{
			return NULL;
		}

//		return $post_id;
	}



	/**
	 *    This function generates a post for critical espresso pages
	 *
	 * @access public
	 * @static
	 * @param array $critical_page
	 * @return array
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
				__( 'The Event Espresso critical page entitled "%s" could not be retrieved.', 'event_espresso' ),
				$critical_page['name']
			);
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
		}

		return $critical_page;

	}





	/**
	 *    This function adds a critical page's shortcode to the post_shortcodes array
	 *
	 * @access private
	 * @static
	 * @param array $critical_page
	 * @return void
	 */
	private static function _track_critical_page_post_shortcodes( $critical_page = array() ) {
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
		// and make sure it's NOT added to the WP "Posts Page"
		// name of the WP Posts Page
		$posts_page = EE_Registry::instance()->CFG->get_page_for_posts();
		if ( isset( EE_Registry::instance()->CFG->core->post_shortcodes[ $posts_page ] )) {
			unset( EE_Registry::instance()->CFG->core->post_shortcodes[ $posts_page ][ $critical_page['code'] ] );
		}
		if ( $posts_page != 'posts' && isset( EE_Registry::instance()->CFG->core->post_shortcodes['posts'] )) {
			unset( EE_Registry::instance()->CFG->core->post_shortcodes['posts'][ $critical_page['code'] ] );
		}
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
	 * Tries to find the oldest admin for this site.  If there are no admins for this site then return NULL.
	 * The role being used to check is filterable.
	 *
	 * @since  4.6.0
	 * @global WPDB $wpdb
	 *
	 * @return mixed null|int WP_user ID or NULL
	 */
	public static function get_default_creator_id() {
		global $wpdb;

		if ( ! empty( self::$_default_creator_id ) ) {
			return self::$_default_creator_id;
		}/**/

		$role_to_check = apply_filters( 'FHEE__EEH_Activation__get_default_creator_id__role_to_check', 'administrator' );

		//let's allow pre_filtering for early exits by altenative methods for getting id.  We check for truthy result and if so then exit early.
		$pre_filtered_id = apply_filters( 'FHEE__EEH_Activation__get_default_creator_id__pre_filtered_id', false, $role_to_check );
		if ( $pre_filtered_id !== false ) {
			return (int) $pre_filtered_id;
		}

		$capabilities_key = $wpdb->prefix . 'capabilities';
		$query = $wpdb->prepare( "SELECT user_id FROM $wpdb->usermeta WHERE meta_key = '$capabilities_key' AND meta_value LIKE %s ORDER BY user_id ASC LIMIT 0,1", '%' . $role_to_check . '%' );
		$user_id = $wpdb->get_var( $query );
		 $user_id = apply_filters( 'FHEE__EEH_Activation_Helper__get_default_creator_id__user_id', $user_id );
		 if ( $user_id && intval( $user_id ) ) {
		 	self::$_default_creator_id =  intval( $user_id );
		 	return self::$_default_creator_id;
		 } else {
		 	return NULL;
		 }
	}





	/**
	 * 	used by EE and EE addons during plugin activation
	 *
	 * 	@access public
	 * 	@static
	 * @param string $table_name without the $wpdb->prefix
	 * @param string $sql SQL for creating the table (contents between brackets in an SQL create table query)
	 * @param string $engine like 'ENGINE=MyISAM' or 'ENGINE=InnoDB'
	 * @param boolean $drop_table_if_pre_existed set to TRUE when you want to make SURE the table is completely empty
	 * and new once this function is done (ie, you really do want to CREATE a table, and
	 * expect it to be empty once you're done)
	 * leave as FALSE when you just want to verify the table exists and matches this definition (and if it
	 * HAS data in it you want to leave it be)
	 * 	@return void
	 * @throws EE_Error if there are database errors
	 */
	public static function create_table( $table_name, $sql, $engine = 'ENGINE=MyISAM ',$drop_table_if_pre_existed = false ) {
//		echo "create table $table_name ". ($drop_table_if_pre_existed? 'but first nuke preexisting one' : 'or update it if it exists') . "<br>";//die;
		if( apply_filters( 'FHEE__EEH_Activation__create_table__short_circuit', FALSE, $table_name, $sql ) ){
			return;
		}
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		if ( ! function_exists( 'dbDelta' )) {
			require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
		}
		global $wpdb;
		$wp_table_name = $wpdb->prefix . $table_name;
		//		if(in_array(EE_System::instance()->detect_req_type(),array(EE_System::req_type_new_activation,  EE_System::req_t) )
		if($drop_table_if_pre_existed && EEH_Activation::table_exists( $wp_table_name ) ){
			if( defined( 'EE_DROP_BAD_TABLES' ) && EE_DROP_BAD_TABLES ){
				$wpdb->query("DROP TABLE IF EXISTS $wp_table_name ");
			}else{
				//so we should be more cautious rather than just dropping tables so easily
				EE_Error::add_persistent_admin_notice(
						'bad_table_' . $wp_table_name . '_detected',
						sprintf( __( 'Database table %1$s existed when it shouldn\'t, and probably contained erroneous data. You probably restored to a backup that didn\'t remove old tables didn\'t you? We recommend adding %2$s to your %3$s file then restore to that backup again. This will clear out the invalid data from %1$s. Afterwards you should undo that change from your %3$s file. %4$sIf you cannot edit %3$s, you should remove the data from %1$s manually then restore to the backup again.', 'event_espresso' ),
								$wp_table_name,
								"<pre>define( 'EE_DROP_BAD_TABLES', TRUE );</pre>",
								'<b>wp-config.php</b>',
								'<br/>'),
								TRUE );
			}
		}
		$SQL = "CREATE TABLE $wp_table_name ( $sql ) $engine DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;";
		//get $wpdb to echo errors, but buffer them. This way at least WE know an error
		//happened. And then we can choose to tell the end user
		$old_show_errors_policy = $wpdb->show_errors( TRUE );
		$old_error_supression_policy = $wpdb->suppress_errors( FALSE );
		ob_start();
		dbDelta( $SQL );
		$output = ob_get_contents();
		ob_end_clean();
		$wpdb->show_errors( $old_show_errors_policy );
		$wpdb->suppress_errors( $old_error_supression_policy );
		if( ! empty( $output ) ){
			throw new EE_Error( $output	);
		}
	}



	/**
	 *    add_column_if_it_doesn't_exist
	 *    Checks if this column already exists on the specified table. Handy for addons which want to add a column
	 *
	 * @access public
	 * @static
	 * @param string $table_name  (without "wp_", eg "esp_attendee"
	 * @param string $column_name
	 * @param string $column_info if your SQL were 'ALTER TABLE table_name ADD price VARCHAR(10)', this would be 'VARCHAR(10)'
	 * @return bool|int
	 */
	public static function add_column_if_it_doesnt_exist($table_name,$column_name,$column_info='INT UNSIGNED NOT NULL'){
		if( apply_filters( 'FHEE__EEH_Activation__add_column_if_it_doesnt_exist__short_circuit', FALSE ) ){
			return FALSE;
		}
		global $wpdb;
		$full_table_name=$wpdb->prefix.$table_name;
		$fields = self::get_fields_on_table($table_name);
		if (!in_array($column_name, $fields)){
			$alter_query="ALTER TABLE $full_table_name ADD $column_name $column_info";
			//echo "alter query:$alter_query";
			return $wpdb->query($alter_query);
		}
		return TRUE;
	}




	/**
	 * get_fields_on_table
	 * Gets all the fields on the database table.
	 *
	 * 	@access public
	 * 	@static
	 * 	@param string $table_name, without prefixed $wpdb->prefix
	 * 	@return array of database column names
	 */
	public static function get_fields_on_table( $table_name = NULL ) {
		global $wpdb;
		$table_name=$wpdb->prefix.$table_name;
		if ( ! empty( $table_name )) {
			$columns = $wpdb->get_results("SHOW COLUMNS FROM $table_name ");
			if ($columns !== FALSE) {
				$field_array = array();
				foreach($columns as $column ){
					$field_array[] = $column->Field;;
				}
				return $field_array;
			}
		}
		return FALSE;
	}



	/**
	 * delete_unused_db_table
	 *
	 * @access public
	 * @static
	 * @param string $table_name
	 * @return bool | int
	 */
	public static function delete_unused_db_table( $table_name ) {
		global $wpdb;
		$table_name = strpos( $table_name, $wpdb->prefix ) === FALSE ? $wpdb->prefix . $table_name : $table_name;
		return $wpdb->query( "DROP TABLE IF EXISTS $table_name" );
	}



	/**
	 * drop_index
	 *
	 * @access public
	 * @static
	 * @param string $table_name
	 * @param string $index_name
	 * @return bool | int
	 */
	public static function drop_index( $table_name, $index_name ) {
		if( apply_filters( 'FHEE__EEH_Activation__drop_index__short_circuit', FALSE ) ){
			return FALSE;
		}
		global $wpdb;
		$table_name_with_prefix = $wpdb->prefix . $table_name ;
		$index_exists_query = "SHOW INDEX FROM $table_name_with_prefix WHERE Key_name = '$index_name'";
		if (
			$wpdb->get_var( "SHOW TABLES LIKE '$table_name_with_prefix'" ) == $wpdb->prefix . $table_name
			&& $wpdb->get_var( $index_exists_query ) == $table_name_with_prefix //using get_var with the $index_exists_query returns the table's name
		) {
			return $wpdb->query( "ALTER TABLE $table_name_with_prefix DROP INDEX $index_name" );
		}
		return TRUE;
	}



	/**
	 * create_database_tables
	 *
	 * @access public
	 * @static
	 * @throws EE_Error
	 * @return boolean success (whether database is setup properly or not)
	 */
	public static function create_database_tables() {
		EE_Registry::instance()->load_core( 'Data_Migration_Manager' );
		//find the migration script that sets the database to be compatible with the code
		$dms_name = EE_Data_Migration_Manager::instance()->get_most_up_to_date_dms();
		if( $dms_name ){
			$current_data_migration_script = EE_Registry::instance()->load_dms( $dms_name );
			$current_data_migration_script->set_migrating( FALSE );
			$current_data_migration_script->schema_changes_before_migration();
			$current_data_migration_script->schema_changes_after_migration();
			if( $current_data_migration_script->get_errors() ){
				if( WP_DEBUG ){
					foreach( $current_data_migration_script->get_errors() as $error ){
						EE_Error::add_error($error, __FILE__, __FUNCTION__, __LINE__ );
					}
				}else{
					EE_Error::add_error( __( 'There were errors creating the Event Espresso database tables and Event Espresso has been deactivated. To view the errors, please enable WP_DEBUG in your wp-config.php file.', 'event_espresso' ) );
				}
				return FALSE;
			}
			EE_Data_Migration_Manager::instance()->update_current_database_state_to();
		}else{
			EE_Error::add_error( __( 'Could not determine most up-to-date data migration script from which to pull database schema structure. So database is probably not setup properly', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__);
			return FALSE;
		}
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
		// check the response
		$question_groups = is_array( $question_groups ) ? $question_groups : array();
		// what we should have
		$QSG_systems = array( 1, 2 );
		// loop thru what we should have and compare to what we have
		foreach ( $QSG_systems as $QSG_system ) {
			// reset values array
			$QSG_values = array();
			// if we don't have what we should have (but use $QST_system as as string because that's what we got from the db)
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
				// make sure we have some values before inserting them
				if ( ! empty( $QSG_values )) {
					// insert system question
					$wpdb->insert(
						$wpdb->prefix . 'esp_question_group',
						$QSG_values,
						array('%s', '%s', '%s', '%d', '%d', '%d', '%d', '%d' )
					);
					$QSG_IDs[ $QSG_system ] = $wpdb->insert_id;
				}
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
		$order_for_group_1 = 1;
		$order_for_group_2 = 1;
		// loop thru what we should have and compare to what we have
		foreach ( $QST_systems as $QST_system ) {
			// reset values array
			$QST_values = array();
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
									'QST_wp_user' => self::get_default_creator_id(),
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
									'QST_wp_user' => self::get_default_creator_id(),
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
									'QST_wp_user' => self::get_default_creator_id(),
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
									'QST_wp_user' => self::get_default_creator_id(),
									'QST_deleted' => 0
								);
						break;

					case 'address2':
							$QST_values = array(
									'QST_display_text' => __( 'Address2', 'event_espresso' ),
									'QST_admin_label' => __( 'Address2 - System Question', 'event_espresso' ),
									'QST_system' => 'address2',
									'QST_type' => 'TEXT',
									'QST_required' => 0,
									'QST_required_text' => __( 'This field is required', 'event_espresso' ),
									'QST_order' => 5,
									'QST_admin_only' => 0,
									'QST_wp_user' => self::get_default_creator_id(),
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
									'QST_wp_user' => self::get_default_creator_id(),
									'QST_deleted' => 0
								);
						break;

					case 'state':
							$QST_values = array(
									'QST_display_text' => __( 'State/Province', 'event_espresso' ),
									'QST_admin_label' => __( 'State/Province - System Question', 'event_espresso' ),
									'QST_system' => 'state',
									'QST_type' => 'STATE',
									'QST_required' => 0,
									'QST_required_text' => __( 'This field is required', 'event_espresso' ),
									'QST_order' => 7,
									'QST_admin_only' => 0,
									'QST_wp_user' => self::get_default_creator_id(),
									'QST_deleted' => 0
								);
						break;

					case 'country' :
							$QST_values = array(
									'QST_display_text' => __( 'Country', 'event_espresso' ),
									'QST_admin_label' => __( 'Country - System Question', 'event_espresso' ),
									'QST_system' => 'country',
									'QST_type' => 'COUNTRY',
									'QST_required' => 0,
									'QST_required_text' => __( 'This field is required', 'event_espresso' ),
									'QST_order' => 8,
									'QST_admin_only' => 0,
									'QST_wp_user' => self::get_default_creator_id(),
									'QST_deleted' => 0
								);
						break;

					case 'zip':
							$QST_values = array(
									'QST_display_text' => __( 'Zip/Postal Code', 'event_espresso' ),
									'QST_admin_label' => __( 'Zip/Postal Code - System Question', 'event_espresso' ),
									'QST_system' => 'zip',
									'QST_type' => 'TEXT',
									'QST_required' => 0,
									'QST_required_text' => __( 'This field is required', 'event_espresso' ),
									'QST_order' => 9,
									'QST_admin_only' => 0,
									'QST_wp_user' => self::get_default_creator_id(),
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
									'QST_wp_user' => self::get_default_creator_id(),
									'QST_deleted' => 0
								);
						break;

				}
				if ( ! empty( $QST_values )) {
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
						array( 'QSG_ID' => $QSG_ID , 'QST_ID' => $QST_ID, 'QGQ_order'=>($QSG_ID==1)? $order_for_group_1++ : $order_for_group_2++ ),
						array( '%d', '%d','%d' )
					);
				}
			}
		}

	}

	/**
	 * Makes sure the default payment method (Invoice) is active.
	 * This used to be done automatically as part of constructing the old gateways config
	 */
	public static function insert_default_payment_methods(){
		if( ! EEM_Payment_Method::instance()->count_active( EEM_Payment_Method::scope_cart ) ){
			EE_Registry::instance()->load_lib( 'Payment_Method_Manager' );
			EE_Payment_Method_Manager::instance()->activate_a_payment_method_of_type( 'Invoice' );
		}else{
			EEM_Payment_Method::instance()->verify_button_urls();
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

		if ( EEH_Activation::table_exists( EEM_Status::instance()->table() ) ) {

			$SQL = "DELETE FROM " . EEM_Status::instance()->table() . " WHERE STS_ID IN ( 'ACT', 'NAC', 'NOP', 'OPN', 'CLS', 'PND', 'ONG', 'SEC', 'DRF', 'DEL', 'DEN', 'EXP', 'RPP', 'RCN', 'RDC', 'RAP', 'RNA', 'TAB', 'TIN', 'TFL', 'TCM', 'TOP', 'PAP', 'PCN', 'PFL', 'PDC', 'EDR', 'ESN', 'PPN', 'RIC' );";
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
					('RIC', 'INCOMPLETE', 'registration', 0, NULL, 1),
					('TFL', 'FAILED', 'transaction', 0, NULL, 0),
					('TAB', 'ABANDONED', 'transaction', 0, NULL, 0),
					('TIN', 'INCOMPLETE', 'transaction', 0, NULL, 1),
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
	 * 	@return boolean success of verifying upload directories exist
	 */
	public static function create_upload_directories() {
		EE_Registry::instance()->load_helper( 'File' );
		// Create the required folders
		$folders = array(
				EVENT_ESPRESSO_UPLOAD_DIR,
				EVENT_ESPRESSO_TEMPLATE_DIR,
				EVENT_ESPRESSO_GATEWAY_DIR,
				EVENT_ESPRESSO_UPLOAD_DIR . '/logs/',
				EVENT_ESPRESSO_UPLOAD_DIR . '/css/',
				EVENT_ESPRESSO_UPLOAD_DIR . '/tickets/'
		);
		foreach ( $folders as $folder ) {
			try {
				EEH_File::ensure_folder_exists_and_is_writable( $folder );
				@ chmod( $folder, 0755 );
			} catch( EE_Error $e ){
				EE_Error::add_error(
					sprintf(
						__(  'Could not create the folder at "%1$s" because: %2$s', 'event_espresso' ),
						$folder,
						'<br />' . $e->getMessage()
					),
					__FILE__, __FUNCTION__, __LINE__
				);
				return FALSE;
			}
		}
		return TRUE;
	}




	/**
	 * generate_default_message_templates
	 *
	 * 	@access public
	 * 	@static
	 * 	@return bool | array
	 */
	public static function generate_default_message_templates() {

		$success = FALSE;
		$settings = $installed_messengers = $default_messengers = array();

		//include our helper
		EE_Registry::instance()->load_helper( 'MSG_Template' );

		//get all installed messenger objects
		$installed = EEH_MSG_Template::get_installed_message_objects();

		//let's setup the $installed messengers in an array AND the messengers that are set to be activated on install.
		foreach ( $installed['messengers'] as $msgr ) {
			if ( $msgr instanceof EE_messenger ) {
				$installed_messengers[$msgr->name] = $msgr;
				if ( $msgr->activate_on_install ) {
					$default_messengers[] = $msgr->name;
				}
			}
		}

		//let's determine if we've already got an active messengers option
		$active_messengers = EEH_MSG_Template::get_active_messengers_in_db();

		//things that have already been activated before
		$has_activated = get_option( 'ee_has_activated_messenger' );

		//do an initial loop to determine if we need to continue
		$def_ms = array();
		foreach ( $default_messengers as $msgr ) {
			if ( isset($active_messengers[$msgr] ) || isset( $has_activated[$msgr] ) ) continue;
			$def_ms[] = $msgr;
		}

		//setup the $installed_mts in an array
		foreach ( $installed['message_types'] as $imt ) {
			if ( $imt instanceof EE_message_type ) {
				$installed_mts[$imt->name] = $imt;
			}
		}

		//loop through default array for default messengers (if present)
		if ( ! empty( $def_ms ) ) {
			foreach ( $def_ms as $messenger ) {
				//all is good so let's setup the default stuff. We need to use the given messenger object (if exists) to get the default message type for the messenger.
				if ( ! isset( $installed_messengers[$messenger] )) {
					continue;
				}
				/** @var EE_messenger[] $installed_messengers  */
				$default_mts = $installed_messengers[$messenger]->get_default_message_types();
				$active_messengers[$messenger]['obj'] = $installed_messengers[$messenger];
				foreach ( $default_mts as $index => $mt ) {
					//is there an installed_mt matching the default string?  If not then nothing to do here.
					if ( ! isset( $installed_mts[$mt] ) ) {
						unset( $default_mts[$index] );
						continue;
					}


					//we need to setup any initial settings for message types
					/** @var EE_message_type[] $installed_mts */
					$settings_fields = $installed_mts[$mt]->get_admin_settings_fields();
					$settings = array();
					if ( is_array( $settings_fields ) ) {
						foreach ( $settings_fields as $field => $values ) {
							if ( isset( $values['default'] ) ) {
								$settings[$field] = $values['default'];
							}
						}
					}

					$active_messengers[$messenger]['settings'][$messenger . '-message_types'][$mt]['settings'] = $settings;
					$has_activated[$messenger][] = $mt;
				}

				//setup any initial settings for the messenger
				$msgr_settings = $installed_messengers[$messenger]->get_admin_settings_fields();

				if ( !empty( $msgr_settings ) ) {
					foreach ( $msgr_settings as $field => $value ) {
						$active_messengers[$messenger]['settings'][$field] = $value;
					}
				}

				//now let's save the settings for this messenger! Must do now because the validator checks the db for active messengers to validate.
				EEH_MSG_Template::update_active_messengers_in_db( $active_messengers );

				//let's generate all the templates but only if the messenger has default_mts (otherwise its just activated).
				if ( !empty( $default_mts ) ) {
					$success = EEH_MSG_Template::generate_new_templates( $messenger, $default_mts, '', TRUE );
				}
			}
		} //end check for empty( $def_ms )

		//still need to see if there are any message types to activate for active messengers
		foreach ( $active_messengers as $messenger => $settings ) {
			$msg_obj = $settings['obj'];
			if ( ! $msg_obj instanceof EE_messenger ) {
				continue;
			}

			$all_default_mts = $msg_obj->get_default_message_types();
			$new_default_mts = array();

			//loop through each default mt reported by the messenger and make sure its set in its active db entry.
			foreach( $all_default_mts as $index => $mt ) {
				//already active? already has generated templates? || has already been activated before (we dont' want to reactivate things users intentionally deactivated).
				if ( ( isset( $has_activated[$messenger] ) && in_array($mt, $has_activated[$messenger]) ) || isset( $active_messengers[$messenger]['settings'][$messenger . '-message_types'][$mt] ) ||  EEH_MSG_Template::already_generated( $messenger, $mt, 0, FALSE ) ) {
					continue;
				}

				//is there an installed_mt matching the default string?  If not then nothing to do here.
				if ( ! isset( $installed_mts[$mt] ) ) {
					unset( $all_default_mts[$mt] );
					continue;
				}

				$settings_fields = $installed_mts[$mt]->get_admin_settings_fields();
				$settings = array();
				if ( is_array( $settings_fields ) ) {
					foreach ( $settings_fields as $field => $values ) {
						if ( isset( $values['default'] ) ) {
							$settings[$field] = $values['default'];
						}
					}
				}

				$active_messengers[$messenger]['settings'][$messenger . '-message_types'][$mt]['settings'] = $settings;
				$new_default_mts[] = $mt;
				$has_activated[$messenger][] = $mt;
			}


			if ( ! empty( $new_default_mts ) ) {
				$success = EEH_MSG_Template::generate_new_templates( $messenger, $new_default_mts, '', TRUE );
			}

		}

		//now let's save the settings for this messenger!
		EEH_MSG_Template::update_active_messengers_in_db( $active_messengers );

		//update $has_activated record
		update_option( 'ee_has_activated_messenger', $has_activated );

		//that's it!
		return $success;
	}






	/**
	 * This simply validates active messengers and message types to ensure they actually match installed messengers and message types.  If there's a mismatch then we deactivate the messenger/message type and ensure all related db rows are set inactive.
	 *
	 * @since 4.3.1
	 *
	 * @return void
	 */
	public static function validate_messages_system() {
		//include our helper
		EE_Registry::instance()->load_helper( 'MSG_Template' );

		//get active and installed  messengers/message types.
		$active_messengers = EEH_MSG_Template::get_active_messengers_in_db();
		$installed = EEH_MSG_Template::get_installed_message_objects();
		$installed_messengers = $installed_mts = array();
		//set up the arrays so they can be handled easier.
		foreach( $installed['messengers'] as $im ) {
			if ( $im instanceof EE_messenger ) {
				$installed_messengers[$im->name] = $im;
			}
		}
		foreach( $installed['message_types'] as $imt ) {
			if ( $imt instanceof EE_message_type ) {
				$installed_mts[$imt->name] = $imt;
			}
		}

		//now let's loop through the active array and validate
		foreach( $active_messengers as $messenger => $active_details ) {
			//first let's see if this messenger is installed.
			if ( ! isset( $installed_messengers[$messenger] ) ) {
				//not set so let's just remove from actives and make sure templates are inactive.
				unset( $active_messengers[$messenger] );
				EEH_MSG_Template::update_to_inactive( $messenger );
				continue;
			}

			//messenger is active, so let's just make sure that any active message types not installed are deactivated.
			$mts = ! empty( $active_details['settings'][$messenger . '-message_types'] ) ? $active_details['settings'][$messenger . '-message_types'] : array();
			foreach ( $mts as $mt_name => $mt ) {
				if ( ! isset( $installed_mts[$mt_name] )  ) {
					unset( $active_messengers[$messenger]['settings'][$messenger . '-message_types'][$mt_name] );
					EEH_MSG_Template::update_to_inactive( $messenger, $mt_name );
				}
			}
		}

		//all done! let's update the active_messengers.
		EEH_MSG_Template::update_active_messengers_in_db( $active_messengers );
		do_action( 'AHEE__EEH_Activation__validate_messages_system' );
		return;
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
		$espresso_no_ticket_prices = get_option( 'ee_no_ticket_prices', FALSE );
		if ( ! $espresso_no_ticket_prices ) {
			add_option( 'ee_no_ticket_prices', array(), '', FALSE );
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
	 * Finds all our EE4 custom post types, and deletes them and their associated data (like post meta or term relations)/
	 * @global wpdb $wpdb
	 */
	public static function delete_all_espresso_cpt_data(){
		global $wpdb;
		//get all the CPT post_types
		$ee_post_types = array();
		foreach(EE_Registry::instance()->non_abstract_db_models as $model_name){
			if ( method_exists( $model_name, 'instance' )) {
				$model_obj = call_user_func( array( $model_name, 'instance' ));
				if ( $model_obj instanceof EEM_CPT_Base ) {
					$ee_post_types[] = $wpdb->prepare("%s",$model_obj->post_type());
				}
			}
		}
		//get all our CPTs
		$query = "SELECT ID FROM {$wpdb->posts} WHERE post_type IN (".implode(",",$ee_post_types).")";
		$cpt_ids = $wpdb->get_col($query);
		//delete each post meta and term relations too
		foreach($cpt_ids as $post_id){
			wp_delete_post($post_id,true);
		}
	}



	/**
	 * plugin_uninstall
	 *
	 * @access public
	 * @static
	 * @param bool $remove_all
	 * @return void
	 */
	public static function delete_all_espresso_tables_and_data( $remove_all = true ) {
		global $wpdb;
		$undeleted_tables = array();

		// load registry
		foreach( EE_Registry::instance()->non_abstract_db_models as $model_name ){
			if ( method_exists( $model_name, 'instance' )) {
				$model_obj = call_user_func( array( $model_name, 'instance' ));
				if ( $model_obj instanceof EEM_Base ) {
					foreach ( $model_obj->get_tables() as $table ) {
						if ( strpos( $table->get_table_name(), 'esp_' )) {
							switch ( EEH_Activation::delete_unused_db_table( $table->get_table_name() )) {
								case false :
									$undeleted_tables[] = $table->get_table_name();
								break;
								case 0 :
									// echo '<h4 style="color:red;">the table : ' . $table->get_table_name() . ' was not deleted  <br /></h4>';
								break;
								default:
									// echo '<h4>the table : ' . $table->get_table_name() . ' was deleted successfully <br /></h4>';
							}
						}
					}
				}
			}
		}

		//there are some tables whose models were removed.
		//they should be removed when removing all EE core's data
		$tables_without_models = array(
			'wp_esp_promotion',
			'wp_esp_promotion_applied',
			'wp_esp_promotion_object',
			'wp_esp_promotion_rule',
			'wp_esp_rule'
		);
		foreach( $tables_without_models as $table ){
			EEH_Activation::delete_unused_db_table( $table );
		}


		$wp_options_to_delete = array(
			'ee_no_ticket_prices' => true,
			'ee_active_messengers' => true,
			'ee_has_activated_messenger' => true,
			'ee_flush_rewrite_rules' => true,
			'ee_config' => true,
			'ee_data_migration_current_db_state' => true,
			'ee_data_migration_mapping_' => false,
			'ee_data_migration_script_' => false,
			'ee_data_migrations' => true,
			'ee_dms_map' => false,
			'ee_notices' => true,
			'lang_file_check_' => false,
			'ee_maintenance_mode' => true,
			'ee_ueip_optin' => true,
			'ee_ueip_has_notified' => true,
			'ee_plugin_activation_errors' => true,
			'ee_id_mapping_from' => false,
			'espresso_persistent_admin_notices' => true,
			'ee_encryption_key' => true,
			'pue_force_upgrade_' => false,
			'pue_json_error_' => false,
			'pue_install_key_' => false,
			'pue_verification_error_' => false,
			'pu_dismissed_upgrade_' => false,
			'external_updates-' => false,
			'ee_extra_data' => true,
			'ee_ssn_' => false,
			'ee_rss_' => false,
			'ee_rte_n_tx_' => false,
			'ee_pers_admin_notices' => true,
		);

		$undeleted_options = array();
		foreach ( $wp_options_to_delete as $option_name => $no_wildcard ) {

			if( $no_wildcard ){
				if( ! delete_option( $option_name ) ){
					$undeleted_options[] = $option_name;
				}
			}else{
				$option_names_to_delete_from_wildcard = $wpdb->get_col( "SELECT option_name FROM $wpdb->options WHERE option_name LIKE '%$option_name%'" );
				foreach($option_names_to_delete_from_wildcard as $option_name_from_wildcard ){
					if( ! delete_option( $option_name_from_wildcard ) ){
						$undeleted_options[] = $option_name_from_wildcard;
					}
				}
			}
		}

		if ( $remove_all && $espresso_db_update = get_option( 'espresso_db_update' )) {
			$db_update_sans_ee4 = array();
			foreach($espresso_db_update as $version => $times_activated){
				if( $version[0] =='3'){//if its NON EE4
					$db_update_sans_ee4[$version] = $times_activated;
				}
			}
			update_option( 'espresso_db_update', $db_update_sans_ee4 );
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
		if ( $errors != '' ) {
			EE_Error::add_attention( $errors, __FILE__, __FUNCTION__, __LINE__ );
		}
	}

	/**
	 * Checks that the database table exists. Also works on temporary tables (for unit tests mostly).
	 * @global wpdb $wpdb
	 * @param string $table_name with or without $wpdb->prefix
	 * @return boolean
	 */
	public static function table_exists( $table_name ){
		global $wpdb, $EZSQL_ERROR;
		if(strpos($table_name, $wpdb->prefix) !== 0){
			$table_name = $wpdb->prefix.$table_name;
		}
		//ignore if this causes an sql error
		$old_error = $wpdb->last_error;
		$old_suppress_errors = $wpdb->suppress_errors();
		$old_show_errors_value = $wpdb->show_errors( FALSE );
		$ezsql_error_cache = $EZSQL_ERROR;
		$wpdb->get_results( "SELECT * from $table_name LIMIT 1");
		$wpdb->show_errors( $old_show_errors_value );
		$wpdb->suppress_errors( $old_suppress_errors );
		$new_error = $wpdb->last_error;
		$wpdb->last_error = $old_error;
		$EZSQL_ERROR = $ezsql_error_cache;
		if( empty( $new_error ) ){
			return TRUE;
		}else{
			return FALSE;
		}
	}

	/**
	 * Resets the cache on EEH_Activation
	 */
	public static function reset(){
		self::$_default_creator_id = NULL;
		self::$_initialized_db_content_already_in_this_request = false;
	}
}
// End of file EEH_Activation.helper.php
// Location: /helpers/EEH_Activation.core.php
