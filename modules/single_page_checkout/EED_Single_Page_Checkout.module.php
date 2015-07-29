<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Single Page Checkout (SPCO)
 *
 * @package			Event Espresso
 * @subpackage		/modules/single_page_checkout/
 * @author				Brent Christensen
 *
 */
class EED_Single_Page_Checkout  extends EED_Module {


	/**
	 * 	$_initialized - has the SPCO controller already been initialized ?
	 * 	@access private
	 *	@var bool $_initialized
	 */
	private static $_initialized = FALSE;

	/**
	 * 	$_reg_steps_array - holds initial array of reg steps
	 * 	@access private
	 *	@var array $_reg_steps_array
	 */
	private static $_reg_steps_array = array();

	/**
	 * 	$checkout - EE_Checkout object for handling the properties of the current checkout process
	 * 	@access public
	 *	@var EE_Checkout $checkout
	 */
	public $checkout = NULL;




	/**
	 * @return EED_Single_Page_Checkout
	 */
	public static function instance() {
		return parent::get_instance( __CLASS__ );
	}



	/**
	 * @return EE_CART
	 */
	public function cart() {
		return $this->checkout->cart;
	}



	/**
	 * @return EE_Transaction
	 */
	public function transaction() {
		return $this->checkout->transaction;
	}





	/**
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
		EED_Single_Page_Checkout::set_definitions();
	}



	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
		EED_Single_Page_Checkout::set_definitions();
		if ( defined( 'DOING_AJAX' )) {
			EED_Single_Page_Checkout::load_request_handler();
			EED_Single_Page_Checkout::load_reg_steps();
		} else {
			// hook into the top of pre_get_posts to set the reg step routing, which gives other modules or plugins a chance to modify the reg steps, but just before the routes get called
			add_action( 'pre_get_posts', array( 'EED_Single_Page_Checkout', 'load_reg_steps' ), 1 );
		}
		// set ajax hooks
		add_action( 'wp_ajax_process_reg_step', array( 'EED_Single_Page_Checkout', 'process_reg_step' ));
		add_action( 'wp_ajax_nopriv_process_reg_step', array( 'EED_Single_Page_Checkout', 'process_reg_step' ));
		add_action( 'wp_ajax_display_spco_reg_step', array( 'EED_Single_Page_Checkout', 'display_reg_step' ));
		add_action( 'wp_ajax_nopriv_display_spco_reg_step', array( 'EED_Single_Page_Checkout', 'display_reg_step' ));
		add_action( 'wp_ajax_update_reg_step', array( 'EED_Single_Page_Checkout', 'update_reg_step' ));
		add_action( 'wp_ajax_nopriv_update_reg_step', array( 'EED_Single_Page_Checkout', 'update_reg_step' ));
	}



	/**
	 * 	process ajax request
	 * @param string $ajax_action
	 */
	public static function process_ajax_request( $ajax_action ) {
		EE_Registry::instance()->REQ->set( 'action', $ajax_action );
		EED_Single_Page_Checkout::instance()->_initialize();
	}



	/**
	 * 	ajax display registration step
	 */
	public static function display_reg_step() {
		EED_Single_Page_Checkout::process_ajax_request( 'display_spco_reg_step' );
	}



	/**
	 * 	ajax process registration step
	 */
	public static function process_reg_step() {
		EED_Single_Page_Checkout::process_ajax_request( 'process_reg_step' );
	}



	/**
	 * 	ajax process registration step
	 */
	public static function update_reg_step() {
		EED_Single_Page_Checkout::process_ajax_request( 'update_reg_step' );
	}



	/**
	 *    load_request_handler
	 *
	 * @access    public
	 * @return    void
	 */
	public static function load_request_handler() {
		// load core Request_Handler class
		if ( ! isset( EE_Registry::instance()->REQ )) {
			EE_Registry::instance()->load_core( 'Request_Handler' );
		}
	}



	/**
	 * 	set_definitions
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_definitions() {
		define( 'SPCO_BASE_PATH', rtrim( str_replace( array( '\\', '/' ), DS, plugin_dir_path( __FILE__ )), DS ) . DS );
		define( 'SPCO_CSS_URL', plugin_dir_url( __FILE__ ) . 'css' . DS );
		define( 'SPCO_IMG_URL', plugin_dir_url( __FILE__ ) . 'img' . DS );
		define( 'SPCO_JS_URL', plugin_dir_url( __FILE__ ) . 'js' . DS );
		define( 'SPCO_INC_PATH', SPCO_BASE_PATH . 'inc' . DS );
		define( 'SPCO_TEMPLATES_PATH', SPCO_BASE_PATH . 'templates' . DS );
		EEH_Autoloader::register_autoloaders_for_each_file_in_folder( SPCO_BASE_PATH, TRUE );
	}



	/**
	 * load_reg_steps
	 * loads and instantiates each reg step based on the EE_Registry::instance()->CFG->registration->reg_steps array
	 *
	 * @access    private
	 * @throws EE_Error
	 * @return    array
	 */
	public static function load_reg_steps() {
		static $reg_steps_loaded = FALSE;
		if ( $reg_steps_loaded ) {
			return;
		}
		// load EE_SPCO_Reg_Step base class
		EE_Registry::instance()->load_file( SPCO_INC_PATH, 'EE_SPCO_Reg_Step', 'class'  );
		// filter list of reg_steps
		$reg_steps_to_load = apply_filters( 'AHEE__SPCO__load_reg_steps__reg_steps_to_load', EED_Single_Page_Checkout::get_reg_steps() );
		// sort by key (order)
		ksort( $reg_steps_to_load );
		// loop through folders
		foreach ( $reg_steps_to_load as $order => $reg_step ) {
			// we need a
			if ( isset( $reg_step['file_path'], $reg_step['class_name'], $reg_step['slug'] )) {
				// copy over to the reg_steps_array
				EED_Single_Page_Checkout::$_reg_steps_array[ $order ] = $reg_step;
				// register custom key route for each reg step ( ie: step=>"slug" - this is the entire reason we load the reg steps array now )
				EE_Config::register_route( $reg_step['slug'], 'EED_Single_Page_Checkout', 'run', 'step' );
				// add AJAX or other hooks
				if ( isset( $reg_step['has_hooks'] ) && $reg_step['has_hooks'] ) {
					// setup autoloaders if necessary
					if ( ! class_exists( $reg_step['class_name'] )) {
						EEH_Autoloader::register_autoloaders_for_each_file_in_folder( $reg_step['file_path'], TRUE );
					}
					if ( is_callable( $reg_step['class_name'], 'set_hooks' )) {
						call_user_func( array( $reg_step['class_name'], 'set_hooks' ));
					}
				}
			}
		}

		$reg_steps_loaded = TRUE;
	}



	/**
	 *    get_reg_steps
	 *
	 * @access 	public
	 * @return 	array
	 */
	public static function get_reg_steps() {
		$reg_steps = EE_Registry::instance()->CFG->registration->reg_steps;
		if ( empty( $reg_steps )) {
			$reg_steps = array(
				10 => array(
					'file_path' => SPCO_INC_PATH,
					'class_name' => 'EE_SPCO_Reg_Step_Attendee_Information',
					'slug' => 'attendee_information',
					'has_hooks' => FALSE
				),
				20 => array(
					'file_path' => SPCO_INC_PATH,
					'class_name' => 'EE_SPCO_Reg_Step_Registration_Confirmation',
					'slug' => 'registration_confirmation',
					'has_hooks' => FALSE
				),
				30 => array(
					'file_path' => SPCO_INC_PATH,
					'class_name' => 'EE_SPCO_Reg_Step_Payment_Options',
					'slug' => 'payment_options',
					'has_hooks' => TRUE
				),
				999 => array(
					'file_path' => SPCO_INC_PATH,
					'class_name' => 'EE_SPCO_Reg_Step_Finalize_Registration',
					'slug' => 'finalize_registration',
					'has_hooks' => FALSE
				)
			);
		}
		return $reg_steps;
	}



	/**
	 *    registration_checkout_for_admin
	 *
	 * @access    public
	 * @return    string
	 */
	public static function registration_checkout_for_admin() {
		EED_Single_Page_Checkout::load_reg_steps();
		EE_Registry::instance()->REQ->set( 'step', 'attendee_information' );
		EE_Registry::instance()->REQ->set( 'action', 'display_spco_reg_step' );
		EE_Registry::instance()->REQ->set( 'process_form_submission', false );
		EED_Single_Page_Checkout::instance()->_initialize();
		EED_Single_Page_Checkout::instance()->_display_spco_reg_form();
		return EE_Registry::instance()->REQ->get_output();
	}



	/**
	 *    process_registration_from_admin
	 *
	 * @access    public
	 * @return    int
	 */
	public static function process_registration_from_admin() {
		EED_Single_Page_Checkout::load_reg_steps();
		EE_Registry::instance()->REQ->set( 'step', 'attendee_information' );
		EE_Registry::instance()->REQ->set( 'action', 'process_reg_step' );
		EE_Registry::instance()->REQ->set( 'process_form_submission', true );
		EED_Single_Page_Checkout::instance()->_initialize();
		if ( EED_Single_Page_Checkout::instance()->checkout->current_step->completed() ) {
			$final_reg_step = end( EED_Single_Page_Checkout::instance()->checkout->reg_steps );
			if ( $final_reg_step instanceof EE_SPCO_Reg_Step_Finalize_Registration ) {
				if ( $final_reg_step->process_reg_step() ) {
					return EED_Single_Page_Checkout::instance()->checkout->transaction;
				}
			}
		}
		return FALSE;
	}



	/**
	 *    run
	 *
	 * @access    public
	 * @param WP_Query $WP_Query
	 * @return    void
	 */
	public function run( $WP_Query ) {
		if ( $WP_Query instanceof WP_Query && $WP_Query->is_main_query() && apply_filters( 'FHEE__EED_Single_Page_Checkout__run', true )) {
			$this->_initialize();
		}
	}




	/**
	 *    run
	 *
	 * @access    public
	 * @param WP_Query $WP_Query
	 * @return    void
	 */
	public static function init( $WP_Query ) {
		EED_Single_Page_Checkout::instance()->run( $WP_Query );
	}



	/**
	 *    _initialize - initial module setup
	 *
	 * @access    private
	 * @throws EE_Error
	 * @return    void
	 */
	private function _initialize() {
		// ensure SPCO doesn't run twice
		if ( EED_Single_Page_Checkout::$_initialized ) {
			return;
		}
		// setup the EE_Checkout object
		$this->checkout = $this->_initialize_checkout();
		// filter checkout
		$this->checkout = apply_filters( 'FHEE__EED_Single_Page_Checkout___initialize__checkout', $this->checkout );
		// get the $_GET
		$this->_get_request_vars();
		// filter continue_reg
		$this->checkout->continue_reg = apply_filters( 'FHEE__EED_Single_Page_Checkout__init___continue_reg', TRUE, $this->checkout );
		// load the reg steps array
		if ( ! $this->_load_and_instantiate_reg_steps() ) {
			EED_Single_Page_Checkout::$_initialized = true;
			return;
		}
		// set the current step
		$this->checkout->set_current_step( $this->checkout->step );
		// and the next step
		$this->checkout->set_next_step();
		// was there already a valid transaction in the checkout from the session ?
		if ( ! $this->checkout->transaction instanceof EE_Transaction ) {
			// get transaction from db or session
			$this->checkout->transaction = $this->checkout->reg_url_link && ! is_admin() ? $this->_get_transaction_and_cart_for_previous_visit() : $this->_get_cart_for_current_session_and_setup_new_transaction();
			if ( ! $this->checkout->transaction instanceof EE_Transaction ) {
				EE_Error::add_error( __( 'Your Registration and Transaction information could not be retrieved from the db.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__);
				// add some style and make it dance
				$this->checkout->transaction = EE_Transaction::new_instance();
				$this->add_styles_and_scripts();
				EED_Single_Page_Checkout::$_initialized = true;
				return;
			}
			// and the registrations for the transaction
			$this->_get_registrations( $this->checkout->transaction );
		}
		// verify that everything has been setup correctly
		if ( ! $this->_final_verifications() ) {
			EED_Single_Page_Checkout::$_initialized = true;
			return;
		}
		// lock the transaction
		$this->checkout->transaction->lock();
		// make sure all of our cached objects are added to their respective model entity mappers
		$this->checkout->refresh_all_entities();
		// set amount owing
		$this->checkout->amount_owing = $this->checkout->transaction->remaining();
		// initialize each reg step, which gives them the chance to potentially alter the process
		$this->_initialize_reg_steps();
		// DEBUG LOG
		//$this->checkout->log( __CLASS__, __FUNCTION__, __LINE__ );
		// get reg form
		$this->_check_form_submission();
		// checkout the action!!!
		$this->_process_form_action();
		// add some style and make it dance
		$this->add_styles_and_scripts();
		// kk... SPCO has successfully run
		EED_Single_Page_Checkout::$_initialized = TRUE;
		// set no cache headers and constants
		EE_System::do_not_cache();
		// remove transaction lock
		add_action( 'shutdown', array( $this, 'unlock_transaction' ), 1 );
	}



	/**
	 *    _initialize_checkout
	 * loads and instantiates EE_Checkout
	 *
	 * @access    private
	 * @throws EE_Error
	 * @return EE_Checkout
	 */
	private function _initialize_checkout() {
		// look in session for existing checkout
		$checkout = EE_Registry::instance()->SSN->checkout();
		// verify
		if ( ! $checkout instanceof EE_Checkout ) {
			// instantiate EE_Checkout object for handling the properties of the current checkout process
			$checkout = EE_Registry::instance()->load_file( SPCO_INC_PATH, 'EE_Checkout', 'class', array(), FALSE  );
			// verify again
			if ( ! $checkout instanceof EE_Checkout ) {
				throw new EE_Error( __( 'The EE_Checkout class could not be loaded.', 'event_espresso' ) );
			}
		} else {
			if ( $checkout->current_step->is_final_step() && $checkout->exit_spco() === true )  {
				wp_safe_redirect( $checkout->redirect_url );
				exit();
			}
		}
		$checkout = apply_filters( 'FHEE__EED_Single_Page_Checkout___initialize_checkout__checkout', $checkout );
		// reset anything that needs a clean slate for each request
		$checkout->reset_for_current_request();
		return $checkout;
	}



	/**
	 *    _get_request_vars
	 *
	 * @access 	private
	 * @return 	void
	 */
	private function _get_request_vars() {
		// load classes
		EED_Single_Page_Checkout::load_request_handler();
		//make sure this request is marked as belonging to EE
		EE_Registry::instance()->REQ->set_espresso_page( TRUE );
		// which step is being requested ?
		$this->checkout->step = EE_Registry::instance()->REQ->get( 'step', $this->_get_first_step() );
		// which step is being edited ?
		$this->checkout->edit_step = EE_Registry::instance()->REQ->get( 'edit_step', '' );
		// and what we're doing on the current step
		$this->checkout->action = EE_Registry::instance()->REQ->get( 'action', 'display_spco_reg_step' );
		// returning to edit ?
		$this->checkout->reg_url_link = EE_Registry::instance()->REQ->get( 'e_reg_url_link', '' );
		// or some other kind of revisit ?
		$this->checkout->revisit = EE_Registry::instance()->REQ->get( 'revisit', FALSE );
		// and whether or not to generate a reg form for this request
		$this->checkout->generate_reg_form = EE_Registry::instance()->REQ->get( 'generate_reg_form', TRUE ); 		// TRUE 	FALSE
		// and whether or not to process a reg form submission for this request
		$this->checkout->process_form_submission = EE_Registry::instance()->REQ->get( 'process_form_submission', FALSE ); 		// TRUE 	FALSE
		$this->checkout->process_form_submission = $this->checkout->action !== 'display_spco_reg_step' ? $this->checkout->process_form_submission : FALSE; 		// TRUE 	FALSE
		//$this->_display_request_vars();
	}



	/**
	 *    _get_first_step
	 *  gets slug for first step in $_reg_steps_array
	 *
	 * @access    private
	 * @throws EE_Error
	 * @return    array
	 */
	protected function _display_request_vars() {
		EEH_Debug_Tools::printr( $_REQUEST, '$_REQUEST', __FILE__, __LINE__ );
		EEH_Debug_Tools::printr( $this->checkout->step, '$this->checkout->step', __FILE__, __LINE__ );
		EEH_Debug_Tools::printr( $this->checkout->edit_step, '$this->checkout->edit_step', __FILE__, __LINE__ );
		EEH_Debug_Tools::printr( $this->checkout->action, '$this->checkout->action', __FILE__, __LINE__ );
		EEH_Debug_Tools::printr( $this->checkout->reg_url_link, '$this->checkout->reg_url_link', __FILE__, __LINE__ );
		EEH_Debug_Tools::printr( $this->checkout->revisit, '$this->checkout->revisit', __FILE__, __LINE__ );
		EEH_Debug_Tools::printr( $this->checkout->generate_reg_form, '$this->checkout->generate_reg_form', __FILE__, __LINE__ );
		EEH_Debug_Tools::printr( $this->checkout->process_form_submission, '$this->checkout->process_form_submission', __FILE__, __LINE__ );
	}



	/**
	 *    _get_first_step
	 *  gets slug for first step in $_reg_steps_array
	 *
	 * @access    private
	 * @throws EE_Error
	 * @return    array
	 */
	private function _get_first_step() {
		$first_step = reset( EED_Single_Page_Checkout::$_reg_steps_array );
		return isset( $first_step['slug'] ) ? $first_step['slug'] : 'attendee_information';
	}



	/**
	 *    _load_and_instantiate_reg_steps
	 *  instantiates each reg step based on the loaded reg_steps array
	 *
	 * @access    private
	 * @throws EE_Error
	 * @return    bool
	 */
	private function _load_and_instantiate_reg_steps() {
		// have reg_steps already been instantiated ?
		if (
			empty( $this->checkout->reg_steps ) ||
			apply_filters( 'FHEE__Single_Page_Checkout__load_reg_steps__reload_reg_steps', false, $this->checkout )
		) {
			// if not, then loop through raw reg steps array
			foreach ( EED_Single_Page_Checkout::$_reg_steps_array as $order => $reg_step ) {
				if ( ! $this->_load_and_instantiate_reg_step( $reg_step, $order )) {
					return false;
				}
			}
			EE_Registry::instance()->CFG->registration->skip_reg_confirmation = TRUE;
			EE_Registry::instance()->CFG->registration->reg_confirmation_last = TRUE;
			// skip the registration_confirmation page ?
			if ( EE_Registry::instance()->CFG->registration->skip_reg_confirmation ) {
				// just remove it from the reg steps array
				$this->checkout->remove_reg_step( 'registration_confirmation' );
			} else if ( EE_Registry::instance()->CFG->registration->reg_confirmation_last && isset( 	$this->checkout->reg_steps['registration_confirmation'] )) {
				// set the order to something big like 100
				$this->checkout->set_reg_step_order( 'registration_confirmation', 100 );
			}
			// filter the array for good luck
			$this->checkout->reg_steps = apply_filters( 'FHEE__Single_Page_Checkout__load_reg_steps__reg_steps', $this->checkout->reg_steps );
			// finally re-sort based on the reg step class order properties
			$this->checkout->sort_reg_steps();
		} else {
			foreach ( $this->checkout->reg_steps as $reg_step ) {
				// set all current step stati to FALSE
				$reg_step->set_is_current_step( FALSE );
			}
		}
		if ( empty( $this->checkout->reg_steps )) {
			EE_Error::add_error( __( 'No Reg Steps were loaded..', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__);
			return false;
		}
			// make reg step details available to JS
		$this->checkout->set_reg_step_JSON_info();
		return true;
	}



	/**
	 *     _load_and_instantiate_reg_step
	 *
	 * @access    private
	 * @param array $reg_step
	 * @param int   $order
	 * @return bool
	 */
	private function _load_and_instantiate_reg_step( $reg_step = array(), $order = 0 ) {

		// we need a file_path, class_name, and slug to add a reg step
		if ( isset( $reg_step['file_path'], $reg_step['class_name'], $reg_step['slug'] )) {
			// if editing a specific step, but this is NOT that step... (and it's not the 'finalize_registration' step)
			if ( $this->checkout->reg_url_link && $this->checkout->step !== $reg_step['slug'] && $reg_step['slug'] !== 'finalize_registration' ) {
				return true;
			}
			// instantiate step class using file path and class name
			$reg_step_obj = EE_Registry::instance()->load_file( $reg_step['file_path'], $reg_step['class_name'], 'class', $this->checkout, FALSE  );
			// did we gets the goods ?
			if ( $reg_step_obj instanceof EE_SPCO_Reg_Step ) {
				// set reg step order based on config
				$reg_step_obj->set_order( $order );
				// add instantiated reg step object to the master reg steps array
				$this->checkout->add_reg_step( $reg_step_obj );
			} else {
				EE_Error::add_error( __( 'The current step could not be set.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
				return false;
			}
		} else {
			if ( WP_DEBUG ) {
				EE_Error::add_error(
					sprintf(
						__( 'A registration step could not be loaded. One or more of the following data points is invalid:%4$s%5$sFile Path: %1$s%6$s%5$sClass Name: %2$s%6$s%5$sSlug: %3$s%6$s%7$s', 'event_espresso' ),
						isset( $reg_step['file_path'] ) ? $reg_step['file_path'] : '',
						isset( $reg_step['class_name'] ) ? $reg_step['class_name'] : '',
						isset( $reg_step['slug'] ) ? $reg_step['slug'] : '',
						'<ul>',
						'<li>',
						'</li>',
						'</ul>'
					),
					__FILE__, __FUNCTION__, __LINE__
				);
			}
			return false;
		}
		return true;
	}



	/**
	 * _get_transaction_and_cart_for_previous_visit
	 *
	 * @access private
	 * 	@return mixed EE_Transaction|NULL
	 */
	private function _get_transaction_and_cart_for_previous_visit() {
		/** @var $TXN_model EEM_Transaction */
		$TXN_model = EE_Registry::instance()->load_model( 'Transaction' );
		// because the reg_url_link is present in the request, this is a return visit to SPCO, so we'll get the transaction data from the db
		$transaction = $TXN_model->get_transaction_from_reg_url_link( $this->checkout->reg_url_link );
		// verify transaction
		if ( $transaction instanceof EE_Transaction ) {
			// and get the cart that was used for that transaction
			$this->checkout->cart = $this->_get_cart_for_transaction( $transaction );
			return $transaction;
		} else {
			EE_Error::add_error( __( 'Your Registration and Transaction information could not be retrieved from the db.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__);
			return NULL;
		}
	}



	/**
	 * _get_cart_for_transaction
	 *
	 * @access private
	 * @param EE_Transaction $transaction
	 * @return EE_Cart
	 */
	private function _get_cart_for_transaction( $transaction ) {
		$cart = $transaction instanceof EE_Transaction ? EE_Cart::get_cart_from_txn( $transaction ) : NULL;
		// verify cart
		if ( ! $cart instanceof EE_Cart ) {
			$cart = EE_Registry::instance()->load_core( 'Cart' );
		}
		return $cart;
	}



	/**
	 * _get_cart_for_current_session_and_setup_new_transaction
	 * 	generates a new EE_Transaction object and adds it to the $_transaction property.
	 *
	 * 	@access private
	 * 	@return EE_Transaction
	 */
	private function _get_cart_for_current_session_and_setup_new_transaction() {
		//  if there's no transaction, then this is the FIRST visit to SPCO
		// so load up the cart ( passing nothing for the TXN because it doesn't exist yet )
		$this->checkout->cart = $this->_get_cart_for_transaction( NULL );
		// and then create a new transaction
		$transaction = $this->_initialize_transaction();
		// verify transaction
		if ( $transaction instanceof EE_Transaction ) {
			// save it so that we have an ID for other objects to use
			$transaction->save();
			// and save TXN data to the cart
			$this->checkout->cart->get_grand_total()->save_this_and_descendants_to_txn( $transaction->ID() );
		} else {
			EE_Error::add_error( __( 'A Valid Transaction could not be initialized.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
		}
		return $transaction;
	}



	/**
	 * 	generates a new EE_Transaction object and adds it to the $_transaction property.
	 *
	 * 	@access private
	 * 	@return mixed EE_Transaction|NULL
	 */
	private function _initialize_transaction() {
		try {
			// create new TXN
			return EE_Transaction::new_instance( array(
				'TXN_timestamp' 	=> current_time( 'timestamp' ),
				'TXN_reg_steps' 		=> $this->checkout->initialize_txn_reg_steps_array(),
				'TXN_total' 				=> $this->checkout->cart->get_cart_grand_total(),
				'TXN_paid' 				=> 0,
				'STS_ID' 					=> EEM_Transaction::failed_status_code,
			));
		} catch( Exception $e ) {
			EE_Error::add_error( $e->getMessage(), __FILE__, __FUNCTION__, __LINE__);
		}
		return NULL;
	}



	/**
	 * _get_registrations
	 *
	 * @access private
	 * @param EE_Transaction $transaction
	 * @return EE_Cart
	 */
	private function _get_registrations( EE_Transaction $transaction ) {
		// first step: grab the registrants  { : o
		$registrations = $transaction->registrations( $this->checkout->reg_cache_where_params, true );
		// verify registrations have been set
		if ( empty( $registrations )) {
			// if no cached registrations, then check the db
			$registrations = $transaction->registrations( $this->checkout->reg_cache_where_params, false );
			// still nothing ? well as long as this isn't a revisit
			if ( empty( $registrations ) && ! $this->checkout->revisit ) {
				// generate new registrations from scratch
				$registrations = $this->_initialize_registrations( $transaction );
			}
		}
		// sort by their original registration order
		usort( $registrations, array( 'EED_Single_Page_Checkout', 'sort_registrations_by_REG_count' ));
		// then loop thru the array
		foreach ( $registrations as $registration ) {
			// verify each registration
			if ( $registration instanceof EE_Registration ) {
				// we display all attendee info for the primary registrant
				if ( $this->checkout->reg_url_link == $registration->reg_url_link() && $registration->is_primary_registrant() ) {
					$this->checkout->primary_revisit = TRUE;
					break;
				} else if ( $this->checkout->revisit && $this->checkout->reg_url_link != $registration->reg_url_link() ) {
					// but hide info if it doesn't belong to you
					$transaction->clear_cache( 'Registration', $registration->ID() );
				}
				$this->checkout->set_reg_status_updated( $registration->ID(), false );
			}
		}
	}



	/**
	 *    adds related EE_Registration objects for each ticket in the cart to the current EE_Transaction object
	 *
	 * @access private
	 * @param EE_Transaction $transaction
	 * @return    array
	 */
	private function _initialize_registrations( EE_Transaction $transaction ) {
		$att_nmbr = 0;
		$registrations = array();
		if ( $transaction instanceof EE_Transaction ) {
			/** @type EE_Registration_Processor $registration_processor */
			$registration_processor = EE_Registry::instance()->load_class( 'Registration_Processor' );
			$this->checkout->total_ticket_count = $this->checkout->cart->all_ticket_quantity_count();
			// now let's add the cart items to the $transaction
			foreach ( $this->checkout->cart->get_tickets() as $line_item ) {
				//do the following for each ticket of this type they selected
				for ( $x = 1; $x <= $line_item->quantity(); $x++ ) {
					$att_nmbr++;
					$registration = $registration_processor->generate_ONE_registration_from_line_item(
						$line_item,
						$transaction,
						$att_nmbr,
						$this->checkout->total_ticket_count
					);
					if ( $registration instanceof EE_Registration ) {
						$registrations[ $registration->ID() ] = $registration;
					}
				}
			}
		}
		return $registrations;
	}



	/**
	 * sorts registrations by REG_count
	 *
	 * @access public
	 * @param EE_Registration $reg_A
	 * @param EE_Registration $reg_B
	 * @return array()
	 */
	public static function sort_registrations_by_REG_count( EE_Registration $reg_A, EE_Registration $reg_B ) {
		// this shouldn't ever happen within the same TXN, but oh well
		if ( $reg_A->count() == $reg_B->count() ) {
			return 0;
		}
		return ( $reg_A->count() > $reg_B->count() ) ? 1 : -1;
	}



	/**
	 * 	_final_verifications
	 *
	 * just makes sure that everything is set up correctly before proceeding
	 *
	 *  @access 	private
	 *  @return 	bool
	 */
	private function _final_verifications() {
		// filter checkout
		$this->checkout = apply_filters( 'FHEE__EED_Single_Page_Checkout___final_verifications__checkout', $this->checkout );
		//verify that current step is still set correctly
		if ( ! $this->checkout->current_step instanceof EE_SPCO_Reg_Step ) {
			EE_Error::add_error( __( 'We\'re sorry but the registration process can not proceed because one or more registration steps were not setup correctly. Please refresh the page and try again or contact support.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			return false;
		}
		// if returning to SPCO, then verify that primary registrant is set
		if ( ! empty( $this->checkout->reg_url_link )) {
			$valid_registrant = $this->checkout->transaction->primary_registration();
			if ( ! $valid_registrant instanceof EE_Registration ) {
				EE_Error::add_error( __( 'We\'re sorry but there appears to be an error with the "reg_url_link" or the primary registrant for this transaction. Please refresh the page and try again or contact support.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
				return false;
			}
			$valid_registrant = null;
			foreach ( $this->checkout->transaction->registrations( $this->checkout->reg_cache_where_params ) as $registration ) {
				if ( $registration instanceof EE_Registration ) {
					if ( $registration->reg_url_link() == $this->checkout->reg_url_link ) {
						$valid_registrant = $registration;
					}
				}
			}
			if ( ! $valid_registrant instanceof EE_Registration ) {
				EE_Error::add_error( __( 'We\'re sorry but there appears to be an error with the "reg_url_link" or the transaction itself. Please refresh the page and try again or contact support.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
				return false;
			}
		}
		return true;
	}



	/**
	 * 	_initialize_reg_steps
	 *
	 * first makes sure that EE_Transaction_Processor::set_reg_step_initiated() is called as required
	 * then loops thru all of the active reg steps and calls the initialize_reg_step() method
	 *
	 *  @access 	private
	 *  @return 	void
	 */
	private function _initialize_reg_steps() {
		/** @type EE_Transaction_Processor $transaction_processor */
		$transaction_processor = EE_Registry::instance()->load_class( 'Transaction_Processor' );
		// call set_reg_step_initiated ???
		if (
			// first time visiting SPCO ?
			! $this->checkout->revisit
			// and displaying the reg step form for the first time ?
			&& $this->checkout->action === 'display_spco_reg_step'
		) {
			// set the start time for this reg step
			if ( ! $transaction_processor->set_reg_step_initiated( $this->checkout->transaction, $this->checkout->current_step->slug() ) ) {
				if ( WP_DEBUG ) {
					EE_Error::add_error( sprintf(__( 'The "%1$s" registration step was not initialized properly.', 'event_espresso' ), $this->checkout->current_step->name() ), __FILE__, __FUNCTION__, __LINE__ );
				}
			};
		}
		// loop thru all steps to call their individual "initialize" methods and set i18n strings for JS
		foreach ( $this->checkout->reg_steps as $reg_step ) {
			$reg_step->initialize_reg_step();
			// i18n
			$reg_step->translate_js_strings();
			if ( $reg_step->is_current_step() ) {
				// the text that appears on the reg step form submit button
				$reg_step->set_submit_button_text();
			}
		}
		// dynamically creates hook point like: AHEE__Single_Page_Checkout___initialize_reg_step__attendee_information
		do_action( "AHEE__Single_Page_Checkout___initialize_reg_step__{$this->checkout->current_step->slug()}", $this->checkout->current_step );
	}



	/**
	 * _check_form_submission
	 *
	 * @access private
	 * 	@return void
	 */
	private function _check_form_submission() {
		//does this request require the reg form to be generated ?
		if ( $this->checkout->generate_reg_form ) {
			// ever heard that song by Blue Rodeo ?
			try {
				$this->checkout->current_step->reg_form = $this->checkout->current_step->generate_reg_form();
				// if not displaying a form, then check for form submission
				if ( $this->checkout->process_form_submission && $this->checkout->current_step->reg_form->was_submitted() ) {
					// clear out any old data in case this step is being run again
					$this->checkout->current_step->set_valid_data( array() );
					// capture submitted form data
					$this->checkout->current_step->reg_form->receive_form_submission(
						apply_filters( 'FHEE__Single_Page_Checkout___check_form_submission__request_params', EE_Registry::instance()->REQ->params(), $this->checkout )
					);
					// validate submitted form data
					if ( ! $this->checkout->current_step->reg_form->is_valid() || ! $this->checkout->continue_reg ) {
						// thou shall not pass !!!
						$this->checkout->continue_reg = FALSE;
						// any form validation errors?
						if ( $this->checkout->current_step->reg_form->submission_error_message() != '' ) {
							$submission_error_messages = array();
							// bad, bad, bad registrant
							foreach( $this->checkout->current_step->reg_form->get_validation_errors_accumulated() as $validation_error ){
								if ( $validation_error instanceof EE_Validation_Error ) {
									$submission_error_messages[] = sprintf( __( '%s : %s', 'event_espresso' ), $validation_error->get_form_section()->html_label_text(), $validation_error->getMessage() );
								}
							}
							EE_Error::add_error( join( '<br />', $submission_error_messages ), __FILE__, __FUNCTION__, __LINE__ );
						}
						// well not really... what will happen is we'll just get redirected back to redo the current step
						$this->go_to_next_step();
					}
				}
			} catch( EE_Error $e ) {
				$e->get_error();
			}
		}
	}



	/**
	 * _process_action
	 *
	 * @access private
	 * 	@return void
	 */
	private function _process_form_action() {
		// what cha wanna do?
		switch( $this->checkout->action ) {
			// AJAX next step reg form
			case 'display_spco_reg_step' :
				$this->checkout->redirect = FALSE;
				if ( EE_Registry::instance()->REQ->ajax ) {
					$this->checkout->json_response->set_reg_step_html( $this->checkout->current_step->display_reg_form() );
				}
				break;

			default :
				// meh... do one of those other steps first
				if ( ! empty( $this->checkout->action ) && is_callable( array( $this->checkout->current_step, $this->checkout->action ))) {
					// dynamically creates hook point like: AHEE__Single_Page_Checkout__before_attendee_information__process_reg_step
					do_action( "AHEE__Single_Page_Checkout__before_{$this->checkout->current_step->slug()}__{$this->checkout->action}", $this->checkout->current_step );
					// call action on current step
					if ( call_user_func( array( $this->checkout->current_step, $this->checkout->action )) ) {
						// good registrant, you get to proceed
						if ( $this->checkout->current_step->success_message() != '' ) {
							if ( apply_filters( 'FHEE__Single_Page_Checkout___process_form_action__display_success', false ) ) {
								EE_Error::add_success( $this->checkout->current_step->success_message() . '<br />' . $this->checkout->next_step->_instructions() );
							}
						}
						// pack it up, pack it in...
						$this->_setup_redirect();
					}
					// dynamically creates hook point like: AHEE__Single_Page_Checkout__after_payment_options__process_reg_step
					do_action( "AHEE__Single_Page_Checkout__after_{$this->checkout->current_step->slug()}__{$this->checkout->action}", $this->checkout->current_step );

				} else {
					EE_Error::add_error(
						sprintf(
							__( 'The requested form action "%s" does not exist for the current "%s" registration step.', 'event_espresso' ),
							$this->checkout->action,
							$this->checkout->current_step->name()
						),
						__FILE__, __FUNCTION__, __LINE__
					);
				}
			// end default
		}
		// store our progress so far
		$this->checkout->stash_transaction_and_checkout();
		// advance to the next step! If you pass GO, collect $200
		$this->go_to_next_step();
	}



	/**
	 * 		add_styles_and_scripts
	 *
	 * 		@access 		public
	 * 		@return 		void
	 */
	public function add_styles_and_scripts() {
		if ( $this->checkout->admin_request ) {
			add_action('admin_enqueue_scripts', array($this, 'enqueue_styles_and_scripts'), 10 );
		} else {
			add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles_and_scripts' ), 10 );
		}
	}



	/**
	 * 		translate_js_strings
	 *
	 * 		@access 		public
	 * 		@return 		void
	 */
	public function translate_js_strings() {
		EE_Registry::$i18n_js_strings['revisit'] = $this->checkout->revisit;
		EE_Registry::$i18n_js_strings['e_reg_url_link'] = $this->checkout->reg_url_link;
		EE_Registry::$i18n_js_strings['server_error'] = __('An unknown error occurred on the server while attempting to process your request. Please refresh the page and try again or contact support.', 'event_espresso');
		EE_Registry::$i18n_js_strings['invalid_json_response'] = __( 'An invalid response was returned from the server while attempting to process your request. Please refresh the page and try again or contact support.', 'event_espresso' );
		EE_Registry::$i18n_js_strings['validation_error'] = __( 'There appears to be a problem with the form validation configuration! Please check the admin settings or contact support.', 'event_espresso' );
		EE_Registry::$i18n_js_strings['invalid_payment_method'] = __( 'There appears to be a problem with the payment method configuration! Please refresh the page and try again or contact support.', 'event_espresso' );
		EE_Registry::$i18n_js_strings['reg_step_error'] = __('This registration step could not be completed. Please refresh the page and try again.', 'event_espresso');
		EE_Registry::$i18n_js_strings['invalid_coupon'] = __('We\'re sorry but that coupon code does not appear to be valid. If this is incorrect, please contact the site administrator.', 'event_espresso');
		EE_Registry::$i18n_js_strings['process_registration'] = sprintf( __( 'Please wait while we process your registration.%sDo not refresh the page or navigate away while this is happening.%sThank you for your patience.', 'event_espresso' ), '<br/>', '<br/>' );
		EE_Registry::$i18n_js_strings['language'] = get_bloginfo( 'language' );
		EE_Registry::$i18n_js_strings['EESID'] = EE_Registry::instance()->SSN->id();
		EE_Registry::$i18n_js_strings['datepicker_yearRange'] = '-150:+20';
		EE_Registry::$i18n_js_strings['timer_years'] = __( 'years', 'event_espresso' );
		EE_Registry::$i18n_js_strings['timer_months'] = __( 'months', 'event_espresso' );
		EE_Registry::$i18n_js_strings['timer_weeks'] = __( 'weeks', 'event_espresso' );
		EE_Registry::$i18n_js_strings['timer_days'] = __( 'days', 'event_espresso' );
		EE_Registry::$i18n_js_strings['timer_hours'] = __( 'hours', 'event_espresso' );
		EE_Registry::$i18n_js_strings['timer_minutes'] = __( 'minutes', 'event_espresso' );
		EE_Registry::$i18n_js_strings['timer_seconds'] = __( 'seconds', 'event_espresso' );
		EE_Registry::$i18n_js_strings['timer_year'] = __( 'year', 'event_espresso' );
		EE_Registry::$i18n_js_strings['timer_month'] = __( 'month', 'event_espresso' );
		EE_Registry::$i18n_js_strings['timer_week'] = __( 'week', 'event_espresso' );
		EE_Registry::$i18n_js_strings['timer_day'] = __( 'day', 'event_espresso' );
		EE_Registry::$i18n_js_strings['timer_hour'] = __( 'hour', 'event_espresso' );
		EE_Registry::$i18n_js_strings['timer_minute'] = __( 'minute', 'event_espresso' );
		EE_Registry::$i18n_js_strings['timer_second'] = __( 'second', 'event_espresso' );
		EE_Registry::$i18n_js_strings['registration_expiration_notice'] = sprintf(
			__( '%1$sWe\'re sorry, but you\'re registration time has expired
			.%2$s%3$s%4$sIf you still wish to complete your registration, please
			return to the %5$sEvent List%6$sEvent List%7$s and reselect your
			tickets if available. Please except our apologies for any inconvenience this
			may have caused.%8$s', 'event_espresso' ),
			'<h4 class="important-notice">',
			'</h4>',
			'<br />',
			'<p>',
			'<a href="'. get_post_type_archive_link( 'espresso_events' ) . '" title="',
			'">',
			'</a>',
			'</p>'
		);
		EE_Registry::$i18n_js_strings[ 'ajax_submit' ] = apply_filters( 'FHEE__Single_Page_Checkout__translate_js_strings__ajax_submit', true );
	}



	/**
	 * 	enqueue_styles_and_scripts
	 *
	 * 	@access 		public
	 * 	@return 		void
	 */
	public function enqueue_styles_and_scripts() {
		// load css
		wp_register_style( 'single_page_checkout', SPCO_CSS_URL . 'single_page_checkout.css', array(), EVENT_ESPRESSO_VERSION );
		wp_enqueue_style( 'single_page_checkout' );
		// i18n
		$this->translate_js_strings();
		// load JS
		wp_register_script( 'jquery_plugin', EE_THIRD_PARTY_URL . 'jquery	.plugin.min.js', array( 'jquery' ), '1.0.1', TRUE );
		wp_register_script( 'jquery_countdown', EE_THIRD_PARTY_URL . 'jquery	.countdown.min.js', array( 'jquery_plugin' ), '2.0.2', TRUE );
		wp_register_script( 'single_page_checkout', SPCO_JS_URL . 'single_page_checkout.js', array( 'espresso_core', 'underscore', 'ee_form_section_validation', 'jquery_countdown' ), EVENT_ESPRESSO_VERSION, TRUE );
		wp_enqueue_script( 'single_page_checkout' );
		wp_localize_script( 'single_page_checkout', 'eei18n', EE_Registry::$i18n_js_strings );

		/**
		 * global action hook for enqueueing styles and scripts with
		 * spco calls.
		 */
		do_action( 'AHEE__EED_Single_Page_Checkout__enqueue_styles_and_scripts', $this );

		/**
		 * dynamic action hook for enqueueing styles and scripts with spco calls.
		 * The hook will end up being something like AHEE__EED_Single_Page_Checkout__enqueue_styles_and_scripts__attendee_information
		 */
		do_action( 'AHEE__EED_Single_Page_Checkout__enqueue_styles_and_scripts__' . $this->checkout->current_step->slug(), $this );

		// add css and JS for current step
		$this->checkout->current_step->enqueue_styles_and_scripts();
	}



	/**
	 * 	display the Registration Single Page Checkout Form
	 *
	 * @access 	private
	 * @return 	void
	 */
	private function _display_spco_reg_form() {
		// if registering via the admin, just display the reg form for the current step
		if ( $this->checkout->admin_request ) {
			EE_Registry::instance()->REQ->add_output( $this->checkout->current_step->display_reg_form() );
		} else {
			// add powered by EE msg
			add_action( 'AHEE__SPCO__reg_form_footer', array( 'EED_Single_Page_Checkout', 'display_registration_footer' ));

			$empty_cart = count( $this->checkout->transaction->registrations( $this->checkout->reg_cache_where_params ) ) < 1 ? true : false;
			$cookies_not_set_msg = '';
			if ( $empty_cart ) {
				if ( ! isset( $_COOKIE[ 'ee_cookie_test' ] ) ) {
					$cookies_not_set_msg = apply_filters(
						'FHEE__Single_Page_Checkout__display_spco_reg_form__cookies_not_set_msg',
						sprintf(
							__( '%1$s%3$sIt appears your browser is not currently set to accept Cookies%4$s%5$sIn order to register for events, you need to enable cookies.%7$sIf you require assistance, then click the following link to learn how to %8$senable cookies%9$s%6$s%2$s', 'event_espresso' ),
							'<div class="ee-attention">',
							'</div>',
							'<h6 class="important-notice">',
							'</h6>',
							'<p>',
							'</p>',
							'<br />',
							'<a href="http://www.whatarecookies.com/enable.asp" target="_blank">',
							'</a>'
						)
					);
				}
			}
			$this->checkout->registration_form = new EE_Form_Section_Proper(
				array(
					'name' 	=> 'single-page-checkout',
					'html_id' 	=> 'ee-single-page-checkout-dv',
					'layout_strategy' =>
						new EE_Template_Layout(
							array(
								'layout_template_file' 			=> SPCO_TEMPLATES_PATH . 'registration_page_wrapper.template.php',
								'template_args' => array(
									'empty_cart' 		=> $empty_cart,
									'revisit' 				=> $this->checkout->revisit,
									'reg_steps' 			=> $this->checkout->reg_steps,
									'next_step' 			=>  $this->checkout->next_step instanceof EE_SPCO_Reg_Step ? $this->checkout->next_step->slug() : '',
									'empty_msg' 		=> apply_filters(
										'FHEE__Single_Page_Checkout__display_spco_reg_form__empty_msg',
										sprintf(
											__( 'You need to %1$sReturn to Events list%2$sselect at least one event%3$s before you can proceed with the registration process.', 'event_espresso' ),
											'<a href="' . get_post_type_archive_link( 'espresso_events' ) . '" title="',
											'">',
											'</a>'
										)
									),
									'cookies_not_set_msg' 		=> $cookies_not_set_msg,
									'registration_time_limit' 	=> $this->checkout->get_registration_time_limit(),
									'session_expiration' 			=>
										gmdate( 'M d, Y H:i:s', EE_Registry::instance()->SSN->expiration() + ( get_option( 'gmt_offset' ) * HOUR_IN_SECONDS ) )
								)
							)
						)
				)
			);
			// load template and add to output sent that gets filtered into the_content()
			EE_Registry::instance()->REQ->add_output( $this->checkout->registration_form->get_html_and_js() );
		}
	}



	/**
	 *    add_extra_finalize_registration_inputs
	 *
	 * @access    public
	 * @param $next_step
	 * @internal  param string $label
	 * @return        string
	 */
	public function add_extra_finalize_registration_inputs( $next_step ) {
		if ( $next_step == 'finalize_registration' ) {
			echo '<div id="spco-extra-finalize_registration-inputs-dv"></div>';
		}
	}



	/**
	 * 	display_registration_footer
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public static function display_registration_footer() {
		if ( apply_filters( 'FHEE__EE_Front__Controller__show_reg_footer', EE_Registry::instance()->CFG->admin->show_reg_footer ) ) {
			EE_Registry::instance()->CFG->admin->affiliate_id = ! empty( EE_Registry::instance()->CFG->admin->affiliate_id ) ? EE_Registry::instance()->CFG->admin->affiliate_id : 'default';
			$url = add_query_arg( array( 'ap_id' => EE_Registry::instance()->CFG->admin->affiliate_id ), 'http://eventespresso.com/' );
			$url = apply_filters( 'FHEE__EE_Front_Controller__registration_footer__url', $url );
			echo apply_filters(
				'FHEE__EE_Front_Controller__display_registration_footer',
				sprintf(
					__( '%1$sEvent Registration Powered by Event Espresso%2$sEvent Registration and Ticketing%3$s Powered by %4$sEvent Espresso - Event Registration and Management System for WordPress%5$sEvent Espresso%6$s', 'event_espresso' ),
					'<div id="espresso-registration-footer-dv"><a href="' . $url . '" title="',
					'" target="_blank">',
					'</a>',
					'<a href="' . $url . '" title="',
					'" target="_blank">',
					'</a></div>'
				)
			);
		}
	}




	/**
	 * 	unlock_transaction
	 *
	 * @access 	public
	 * @return 	void
	 */
	public function unlock_transaction() {
		$this->checkout->transaction->unlock();
	}




	/**
	 *        _setup_redirect
	 *
	 * @access 	private
	 * @return 	array
	 */
	private function _setup_redirect() {
		if ( $this->checkout->continue_reg && $this->checkout->next_step instanceof EE_SPCO_Reg_Step ) {
			$this->checkout->redirect = TRUE;
			if ( empty( $this->checkout->redirect_url )) {
				$this->checkout->redirect_url = $this->checkout->next_step->reg_step_url();
			}
			$this->checkout->redirect_url = apply_filters( 'FHEE__EED_Single_Page_Checkout___setup_redirect__checkout_redirect_url', $this->checkout->redirect_url, $this->checkout );
		}
	}



	/**
	 *   handle ajax message responses and redirects
	 *
	 * @access public
	 * @return void
	 */
	public function go_to_next_step() {
		if ( $this->checkout->admin_request || $this->checkout->action == 'redirect_form' ) {
			return;
		}
		// AJAX response
		$this->_handle_json_response();
		// redirect to next step or the Thank You page
		$this->_handle_html_redirects();
		// hmmm... must be something wrong, so let's just display the form again !
		$this->_display_spco_reg_form();
	}



	/**
	 *   _handle_json_response
	 *
	 * @access protected
	 * @return void
	 */
	protected function _handle_json_response() {
		// if this is an ajax request
		if ( EE_Registry::instance()->REQ->ajax ) {
			// DEBUG LOG
			//$this->checkout->log(
			//	__CLASS__, __FUNCTION__, __LINE__,
			//	array(
			//		'json_response_redirect_url' => $this->checkout->json_response->redirect_url(),
			//		'redirect'                   => $this->checkout->redirect,
			//		'continue_reg'               => $this->checkout->continue_reg,
			//	)
			//);
			$this->checkout->json_response->set_registration_time_limit( $this->checkout->get_registration_time_limit() );
			// just send the ajax (
			$json_response = apply_filters( 'FHEE__EE_Single_Page_Checkout__JSON_response', $this->checkout->json_response );
			$this->unlock_transaction();
			echo $json_response;
			exit();
		}
	}



	/**
	 *   _handle_redirects
	 *
	 * @access protected
	 * @return void
	 */
	protected function _handle_html_redirects() {
		// going somewhere ?
		if ( $this->checkout->redirect && ! empty( $this->checkout->redirect_url ) ) {
			// store notices in a transient
			EE_Error::get_notices( false, true, true );
			$this->unlock_transaction();
			// DEBUG LOG
			//$this->checkout->log(
			//	__CLASS__, __FUNCTION__, __LINE__,
			//	array(
			//		'headers_sent' => headers_sent(),
			//		'redirect_url'     => $this->checkout->redirect_url,
			//		'headers_list'    => headers_list(),
			//	)
			//);
			wp_safe_redirect( $this->checkout->redirect_url );
			exit();
		}
	}

}
// End of file EED_Single_Page_Checkout.module.php
// Location: /modules/single_page_checkout/EED_Single_Page_Checkout.module.php
