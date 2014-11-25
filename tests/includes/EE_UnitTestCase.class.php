<?php
/**
 * EE's extension of WP_UnitTestCase for writing all EE_Tests
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */

require_once EE_TESTS_DIR . 'includes/factory.php';


/**
 * This is used to override any existing WP_UnitTestCase methods that need specific handling in EE.  We
 * can also add additional methods in here for EE tests (that are used frequently)
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */
class EE_UnitTestCase extends WP_UnitTestCase {
	/**
	 * Should be used to store the global $wp_actions during a test
	 * so that it can be restored afterwards to keep tests from interfere with each other
	 * @var array
	 */
	protected $wp_filters_saved = NULL;
	const error_code_undefined_property = 8;
	protected $_cached_SERVER_NAME = NULL;
	/**
	 *
	 * @var WP_User
	 */
	protected $_orig_current_user;

	/**
	 * Boolean indicating we've already noted an accidental txn commit and we don't need to
	 * keep checking or warning the test runner about it
	 * @var boolean
	 */
	static $accidental_txn_commit_noted = FALSE;

	public function setUp() {
		//save the hooks state before WP_UnitTestCase actually gets its hands on it...
		//as it immediately adds a few hooks we might not want to backup
		global $auto_made_thing_seed, $wp_filter, $wp_actions, $merged_filters, $wp_current_filter, $wpdb, $current_user;
		$this->wp_filters_saved = array(
			'wp_filter'=>$wp_filter,
			'wp_actions'=>$wp_actions,
			'merged_filters'=>$merged_filters,
			'wp_current_filter'=>$wp_current_filter
		);
		$this->_orig_current_user = clone $current_user;
		parent::setUp();
		EE_Registry::reset( TRUE );
		$auto_made_thing_seed = 1;
		//reset wpdb's list of queries executed so it only stores those from the current test
		$wpdb->queries = array();
		//the accidental txn commit indicator option shouldn't be set from the previous test
		update_option( 'accidental_txn_commit_indicator', TRUE );

//		$this->wp_actions_saved = $wp_actions;
		// Fake WP mail globals, to avoid errors
		add_filter( 'wp_mail', array( $this, 'setUp_wp_mail' ) );
		add_filter( 'wp_mail_from', array( $this, 'tearDown_wp_mail' ) );
		add_filter( 'FHEE__EEH_Activation__create_table__short_circuit', '__return_true' );
		add_filter( 'FHEE__EEH_Activation__add_column_if_it_doesnt_exist__short_circuit', '__return_true' );
		add_filter( 'FHEE__EEH_Activation__drop_index__short_circuit', '__return_true' );

		//factor
		$this->factory = new EE_UnitTest_Factory;

	}



	/**
	 * @param bool $short_circuit
	 * @param string $table_name
	 * @param string $sql
	 * @return bool
	 */
	public function _short_circuit_db_implicit_commits( $short_circuit = FALSE, $table_name, $sql ){
		$whitelisted_tables = apply_filters('FHEE__EE_UnitTestCase__short_circuit_db_implicit_commits__whitelisted_tables', array() );
		if( in_array( $table_name, $whitelisted_tables ) ){
			//it's not altering. it's ok
			return FALSE;
		}else{
			return TRUE;
		}
	}

	public function tearDown(){
		parent::tearDown();
		global $wp_filter, $wp_actions, $merged_filters, $wp_current_filter, $current_user;
		$wp_filter = $this->wp_filters_saved[ 'wp_filter' ];
		$wp_actions = $this->wp_filters_saved[ 'wp_actions' ];
		$merged_filters = $this->wp_filters_saved[ 'merged_filters' ];
		$wp_current_filter = $this->wp_filters_saved[ 'wp_current_filter' ];
		$current_user = $this->_orig_current_user;
		$this->_detect_accidental_txn_commit();
	}

	/**
	 * Detects whether or not a MYSQL query was issued which caused an implicit commit
	 * (or an explicit one). Basically, we can't do a commit mid-test because it messes
	 * up the test's state (which means the database state at the time of the commit will
	 * become the new starting state for all future tests, which will likely cause hard-to-find
	 * bugs, and makes test results dependent on order of execution)
	 * @global WPDB $wpdb
	 * @throws EE_Error
	 */
	protected function _detect_accidental_txn_commit(){
		//for some reason WP waits until the start of the next test to do this. but
		//we prefer to do it now so that we can check for implicit commits
		$this->clean_up_global_scope();
		//now we can check if there was an accidental implicit commit
		if( ! self::$accidental_txn_commit_noted && get_option( 'accidental_txn_commit_indicator', FALSE ) ){
			global $wpdb;
			self::$accidental_txn_commit_noted = TRUE;
			throw new EE_Error(sprintf( __( "Accidental MySQL Commit was issued sometime during the previous test. This means we couldn't properly restore database to its pre-test state. If this doesnt create problems now it probably will later! Read up on MySQL commits, especially Implicit Commits. Queries executed were: \r\n%s. \r\nThis accidental commit happened during %s", 'event_espresso' ),print_r( $wpdb->queries, TRUE), $this->getName() ) );
		}
	}


	/**
	 *  Use this to clean up any global scope singletons etc that we may have being used by EE so
	 *  that they are fresh between tests.
	 *
	 * @todo this of course means we need an easy way to reset our singletons...
	 * @see parent::cleanup_global_scope();
	 */
	function clean_up_global_scope() {
		parent::clean_up_global_scope();
	}


	/**
	 * Set up globals necessary to avoid errors when using wp_mail()
	 */
	public function setUp_wp_mail( $args ) {
		if ( isset( $_SERVER['SERVER_NAME'] ) ) {
			$this->_cached_SERVER_NAME = $_SERVER['SERVER_NAME'];
		}

		$_SERVER['SERVER_NAME'] = 'example.com';

		// passthrough
		return $args;
	}



	/**
	 * Tear down globals set up in setUp_wp_mail()
	 */
	public function tearDown_wp_mail( $args ) {
		if ( ! empty( $this->_cached_SERVER_NAME ) ) {
			$_SERVER['SERVER_NAME'] = $this->_cached_SERVER_NAME;
			unset( $this->_cached_SERVER_NAME );
		} else {
			unset( $_SERVER['SERVER_NAME'] );
		}

		// passthrough
		return $args;
	}



	/**
	 * Helper method for setting the maintenance mode of EE to given maintenance mode
	 *
	 * @param int $level use to indicate which maintenance mode to set.
	 * @since 4.3.0
	 */
	public function setMaintenanceMode( $level = 0 ) {
		EE_Registry::instance()->load_core('Maintenance_Mode');
		switch ( $level ) {
			case EE_Maintenance_Mode::level_0_not_in_maintenance :
				$level = EE_Maintenance_Mode::level_0_not_in_maintenance;
				break;
			case EE_Maintenance_Mode::level_1_frontend_only_maintenance :
				$level = EE_Maintenance_Mode::level_1_frontend_only_maintenance;
				break;
			case EE_Maintenance_Mode::level_2_complete_maintenance :
				$level = EE_Maintenance_Mode::level_2_complete_maintenance;
				break;
			default :
				$level = EE_Maintenance_Mode::level_0_not_in_maintenance;
				break;
		}
		update_option( EE_Maintenance_Mode::option_name_maintenance_mode, $level );
	}



	/**
	 * Helper method for just setting the core config and net config on EE_Registry, so
	 * configuration tests can be run.
	 *
	 * @since 4.3.0
	 */
	public function setCoreConfig() {
		EE_Registry::instance()->load_core('Config');
		EE_Registry::instance()->load_core('Network_Config');
	}



	/**
	 * Helper method for resetting EE_Registry->CFG and EE_Registry->NET_CFG
	 *
	 * @since 4.3.0
	 */
	public function resetCoreConfig() {
		EE_Registry::instance()->CFG = NULL;
		EE_Registry::instance()->NET_CFG = NULL;
	}



	/**
	 * Method that accepts an array of filter refs to clear all filters from.
	 *
	 * @since 4.3.0
	 * @param  array  $filters array of filter refs to clear. (be careful about core wp filters).
	 */
	public function clearAllFilters( $filters = array() ) {
		foreach( $filters as $filter ) {
			remove_all_filters($filter);
		}
	}



	/**
	 * Method that accepts an array of action refs to clear all actions from.
	 *
	 * @since 4.3.0
	 * @param  array  $actions array of action refs to clear. (be careful about core wp actions).
	 */
	public function clearAllActions( $actions = array() ) {
		foreach( $actions as $action ) {
			remove_all_actions($action);
		}
	}



	/**
	 * This defines EE_Admin_Constants to point to the admin mocks * folder instead of the default admin folder.  Note, you will need
	 * to be careful of using this.
	 *
	 * @since 4.3.0
	 */
	public function defineAdminConstants() {
		if ( !defined( 'EE_ADMIN_PAGES' ) )
			define( 'EE_ADMIN_PAGES', EE_TESTS_DIR . 'mocks/admin' );
	}



	/**
	 * This loads the various admin mock files required for tests.
	 *
	 * @since  4.3.0
	 */
	public function loadAdminMocks() {
		require_once EE_TESTS_DIR . 'mocks/admin/EE_Admin_Mocks.php';
		require_once EE_TESTS_DIR . 'mocks/admin/admin_mock_valid/Admin_Mock_Valid_Admin_Page.core.php';
	}



	/**
	 * IT would be better to add a constraint and do this properly at some point
	 * @param mixed $item
	 * @param       $haystack
	 */
	public function assertArrayContains($item,$haystack){
		$in_there = in_array($item, $haystack);
		if($in_there){
			$this->assertTrue(true);
		}else{
			$this->assertTrue($in_there,  sprintf(__('Array %1$s does not contain %2$s', "event_espresso"), print_r($haystack,true), print_r($item,true) ));
		}
	}



	/**
	 * @param $item
	 * @param $haystack
	 */
	public function assertArrayDoesNotContain($item,$haystack){
		$not_in_there = ! in_array($item,$haystack);
		if($not_in_there){
			$this->assertTrue($not_in_there);
		}else{
			$this->assertTrue($not_in_there,  sprintf(__('Array %1$s DOES contain %2$s when it shouldn\'t', 'event_espresso' ), print_r($haystack,true), print_r($item,true) ));
		}
	}
	/**
	 *
	 * @param string $option_name
	 */
	public function assertWPOptionExists($option_name){
		$option = get_option($option_name,NULL);
		if($option){
			$this->assertTrue(true);
		}else{
			$this->assertNotNull($option,  sprintf(__('The WP Option "%s" does not exist but should', "event_espresso" ),$option_name));
		}
	}



	/**
	 * @param $option_name
	 */
	public function assertWPOptionDoesNotExist($option_name){
		$option = get_option($option_name,NULL);
		if( $option){
			$this->assertNull( $option, sprintf( __('The WP Option "%s" exists but shouldn\'t', "event_espresso"), $option_name ) );
		}else{
			$this->assertTrue(true);
		}
	}

	/**
	 * Compares two EE model objects by just looking at their field's values. If you want strict comparison just use ordinary '==='.
	 * If you pass it two arrays of EE objects, that works too
	 * @param EE_Base_Class|EE_Base_Class[] $expected_object
	 * @param EE_Base_Class|EE_Base_Class[] $actual_object
	 */
	public function assertEEModelObjectsEquals( $expected_object, $actual_object){
		if( is_array( $expected_object ) ){
			$this->assertTrue( is_array( $actual_object ) );
			foreach( $expected_object as $single_expected_object ){
				$this->assertEEModelObjectsEquals( $single_expected_object, array_shift( $actual_object ) );
			}
		}else{
			$this->assertInstanceOf( 'EE_Base_Class', $expected_object);
			$this->assertInstanceOf( 'EE_Base_Class', $actual_object);
			$this->assertEquals( get_class( $expected_object ), get_class( $actual_object ) );
			foreach( $expected_object->model_field_array() as $field_name => $expected_value ){
				$actual_value = $actual_object->get( $field_name );
				if( $expected_value != $actual_value ){
					$this->fail(
						sprintf(
							__( 'EE objects of class "%1$s" did not match. They were: %2$s and %3$s', 'event_espresso' ),
							get_class( $expected_object),
							PHP_EOL . json_encode( $expected_object->model_field_array() ),
							PHP_EOL . json_encode( $actual_object->model_field_array() )
						)
					);
				}
			}
		}
	}


	/**
	 *Creates a model object and its required dependencies
	 * @param string  $model_name
	 * @param array   $args array of arguments to supply when constructing the model object
	 * @param boolean $save
	 * @throws EE_Error
	 * @global int    $auto_made_thing_seed
	 * @return EE_Base_Class
	 */
	function new_model_obj_with_dependencies( $model_name, $args = array(), $save = true ) {
		global $auto_made_thing_seed;
		if($auto_made_thing_seed === NULL){
			$auto_made_thing_seed = 1;
		}
		$model = EE_Registry::instance()->load_model($model_name);

		//set the related model foreign keys
		foreach($model->relation_settings() as $related_model_name => $relation){
			if($relation instanceof EE_Belongs_To_Any_Relation){
				continue;
			}elseif($relation instanceof EE_Belongs_To_Relation) {
				$obj = $this->new_model_obj_with_dependencies($related_model_name);
				$fk = $model->get_foreign_key_to($related_model_name);
				if( ! isset( $args[ $fk->get_name() ] )){
					$args[$fk->get_name()] = $obj->ID();
				}

			}
		}

		//set any other fields which haven't yet been set
		foreach($model->field_settings() as $field_name => $field){
			$value = NULL;
			if($field_name == 'EVT_timezone_string'){
				$value = NULL;
			}elseif($field instanceof EE_Enum_Integer_Field ||
					$field instanceof EE_Enum_Text_Field ||
					$field instanceof EE_Boolean_Field ||
					$field->get_name() == 'CNT_cur_dec_mrk' ||
					$field->get_name() == 'CNT_cur_thsnds' ||
					$field->get_name() == 'CNT_tel_code'){
				$value = $field->get_default_value();
			}elseif( $field instanceof EE_Integer_Field ||
					$field instanceof EE_Float_Field ||
					$field instanceof EE_Foreign_Key_Field_Base ||
					$field instanceof EE_Primary_Key_String_Field ||
					$field->get_name() == 'STA_abbrev' ||
					$field->get_name() == 'CNT_ISO3' ||
					$field->get_name() == 'CNT_cur_code'){
				$value = $auto_made_thing_seed;
			}elseif( $field instanceof EE_Text_Field_Base ){
				$value = $auto_made_thing_seed."_".$field->get_name();
			}
			if( ! isset( $args[ $field_name ] ) && $value !== NULL){
				$args[$field->get_name()] = $value;
			}
		}
		//and finally make the model obj
		$classname = 'EE_'.$model_name;
		$model_obj = $classname::new_instance($args);
		if($save){
			$success = $model_obj->save();
			if( ! $success ){
				global $wpdb;
				throw new EE_Error(
					sprintf(
						__( 'Could not save %1$s using %2$s. Error was %3$s', 'event_espresso' ),
						$model_name,
						json_encode($args),
						$wpdb->last_error
					)
				);
			}
		}
		$auto_made_thing_seed++;
		return $model_obj;

	}



	/**
	 * asserts that a table (even temporary one) exists
	 * We really should implement this function in the proper PHPunit style
	 * @see http://php-and-symfony.matthiasnoback.nl/2012/02/phpunit-writing-a-custom-assertion/
	 * @global WPDB $wpdb
	 * @param string $table_name with or without $wpdb->prefix
	 * @param string $model_name the model's name (only used for error reporting)
	 */
	function assertTableExists($table_name,$model_name = 'Unknown'){
		if( ! EEH_Activation::table_exists( $table_name ) ){
			global $wpdb;
			$this->fail( $wpdb->last_error);
		}
	}

	/**
	 * Asserts the table (even temporary one) does not exist
	 * We really should implement this function in the proper PHPunit style
	 * @see http://php-and-symfony.matthiasnoback.nl/2012/02/phpunit-writing-a-custom-assertion/
	 * @global WPDB $wpdb
	 * @param string $table_name with or without $wpdb->prefix
	 * @param string $model_name the model's name (only used for error reporting)
	 */
	function assertTableDoesNotExist($table_name, $model_name = 'Unknown' ){
		if( EEH_Activation::table_exists( $table_name ) ){
			$this->fail(
				sprintf(
					__( 'Table like %1$s SHOULD NOT exist. It was apparently defined on the model "%2$s"', 'event_espresso' ),
					$table_name,
					$model_name
				)
			);
		}
	}

	/**
	 * Modifies the $wp_actions global to make it look like certain actions were and weren't
	 * performed, so that EE_Register_Addon is deceived into thinking it's the right
	 * time to register an addon etc
	 * @global array $wp_actions
	 */
	protected function _pretend_addon_hook_time(){
		global $wp_actions;
		unset($wp_actions['AHEE__EE_System___detect_if_activation_or_upgrade__begin']);
		unset($wp_actions['FHEE__EE_System__parse_model_names']);
		unset($wp_actions['FHEE__EE_System__parse_implemented_model_names']);
		$wp_actions['AHEE__EE_System__load_espresso_addons'] = 1;
	}
	/**
	 * Restores the $wp_actions global to how ti should have been before we
	 * started pretending we hooked in at the right time etc
	 * @global array $wp_actions
	 */
	protected function _stop_pretending_addon_hook_time(){
		global $wp_actions;
		$wp_actions['AHEE__EE_System___detect_if_activation_or_upgrade__begin'] = 1;
		$wp_actions['FHEE__EE_System__parse_model_names'] = 1;
		$wp_actions['FHEE__EE_System__parse_implemented_model_names'] = 1;
		unset($wp_actions['AHEE__EE_System__load_espresso_addons']);
	}

	/**
	 * Makes a complete transaction record with all associated data (ie, its line items,
	 * registrations, tickets, datetimes, events, attendees, questions, answers, etc).
	 *
	 * @param array $options {
	 *	@type int $ticket_types the number of different ticket types in this transaction. Deafult 1
	 *	@type int $taxable_tickets how many of those ticket types should be taxable. Default INF
	 * @return EE_Transaction
	 */
	protected function new_typical_transaction($options = array()){
		EE_Registry::instance()->load_helper( 'Line_Item' );
		$txn = $this->new_model_obj_with_dependencies( 'Transaction' );
		$total_line_item = EEH_Line_Item::create_default_total_line_item( $txn->ID() );
		$total_line_item->save_this_and_descendants_to_txn( $txn->ID() );
		if( isset( $options[ 'ticket_types' ] ) ){
			$ticket_types = $options[ 'ticket_types' ];
		}else{
			$ticket_types = 1;
		}
		if( isset( $options[ 'taxable_tickets' ] ) ){
			$taxable_tickets = $options[ 'taxable_tickets' ];
		}else{
			$taxable_tickets = INF;
		}
		$taxes = EEM_Price::instance()->get_all_prices_that_are_taxes();
		for( $i = 1; $i <= $ticket_types; $i++ ){
			$ticket = $this->new_model_obj_with_dependencies( 'Ticket', array( 'TKT_price'=> $i * 10 , 'TKT_taxable' => $taxable_tickets-- ) );
			$this->assertInstanceOf( 'EE_Line_Item', EEH_Line_Item::add_ticket_purchase($total_line_item, $ticket) );
			$reg_final_price = $ticket->price();
			foreach($taxes as $taxes_at_priority){
				foreach($taxes_at_priority as $tax){
					$reg_final_price += $reg_final_price * $tax->amount() / 100;
				}
			}
			$this->new_model_obj_with_dependencies( 'Registration', array('TXN_ID' => $txn->ID(), 'TKT_ID' => $ticket->ID(), 'REG_count'=>1, 'REG_group_size'=>1, 'REG_final_price' => $reg_final_price ) );
		}
		$txn->set_total( $total_line_item->total() );
		$txn->save();

		return $txn;
	}

	/**
	 * Creates an interesting ticket, with a base price, dollar surcharge, and a percent surcharge,
	 * which is for 2 different datetimes.
	 * @param array $options {
	 *	@type int $dollar_surcharge the dollar surcharge to add to this ticket
	 *	@type int $percent_surcharge teh percent surcharge to add to this ticket (value in percent, not in decimal. Eg if it's a 10% surcharge, enter 10.00, not 0.10
	 *	@type int $datetimes the number of datetimes for this ticket
	 * }
	 * @return EE_Ticket
	 */
	public function new_ticket( $options = array() ) {
		$ticket = $this->new_model_obj_with_dependencies('Ticket', array( 'TKT_price' => '16.5', 'TKT_taxable' => TRUE ) );
		$base_price_type = EEM_Price_Type::instance()->get_one( array( array('PRT_name' => 'Base Price' ) ) );
		$this->assertInstanceOf( 'EE_Price_Type', $base_price_type );
		$base_price = $this->new_model_obj_with_dependencies( 'Price', array( 'PRC_amount' => 10, 'PRT_ID' => $base_price_type->ID() ) );
		$ticket->_add_relation_to( $base_price, 'Price' );
		$this->assertArrayContains( $base_price, $ticket->prices() );
		if( isset( $options[ 'dollar_surcharge'] ) ){
			$dollar_surcharge_price_type = EEM_Price_Type::instance()->get_one( array( array( 'PRT_name' => 'Dollar Surcharge' ) ) );
			$this->assertInstanceOf( 'EE_Price_Type', $dollar_surcharge_price_type );
			$dollar_surcharge = $this->new_model_obj_with_dependencies( 'Price', array( 'PRC_amount' => $options[ 'dollar_surcharge'], 'PRT_ID' => $dollar_surcharge_price_type->ID() ) );
			$ticket->_add_relation_to( $dollar_surcharge, 'Price' );
			$this->assertArrayContains( $dollar_surcharge, $ticket->prices() );
		}
		if( isset( $options[ 'percent_surcharge' ] ) ){
			$percent_surcharge_price_type = EEM_Price_Type::instance()->get_one( array( array( 'PRT_name' => 'Percent Surcharge' ) ) );
			$this->assertInstanceOf( 'EE_Price_Type', $percent_surcharge_price_type );
			$percent_surcharge = $this->new_model_obj_with_dependencies( 'Price', array( 'PRC_amount' => $options[ 'percent_surcharge' ], 'PRT_ID' => $percent_surcharge_price_type->ID() ) );
			$ticket->_add_relation_to( $percent_surcharge, 'Price' );
			$this->assertArrayContains( $percent_surcharge, $ticket->prices() );
		}
		if( isset( $options[ 'datetimes'] ) ){
			$datetimes = $options[ 'datetimes' ];
		}else{
			$datetimes = 1;
		}

		$event = $this->new_model_obj_with_dependencies( 'Event' );
		for( $i = 0; $i <= $datetimes; $i++ ){
			$ddt = $this->new_model_obj_with_dependencies( 'Datetime', array( 'EVT_ID'=> $event->ID() ) );
			$ticket->_add_relation_to( $ddt, 'Datetime' );
			$this->assertArrayContains( $ddt, $ticket->datetimes() );
		}
		return $ticket;
	}
}
