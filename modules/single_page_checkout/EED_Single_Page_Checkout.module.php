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
		add_filter( 'EED_Single_Page_Checkout__SPCO_active', '__return_true' );
		return parent::get_instance( __CLASS__ );
	}





	/**
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
		EED_Single_Page_Checkout::set_definitions();
		// hook into the top of pre_get_posts to set the reg step routing, which gives other modules or plugins a chance to modify the reg steps, but just before the routes get called
		add_action( 'pre_get_posts', array( 'EED_Single_Page_Checkout', 'load_reg_steps' ), 1 );
		// add powered by EE msg
		add_action( 'AHEE__SPCO__reg_form_footer', array( 'EED_Single_Page_Checkout', 'display_registration_footer' ));
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
		}
		// hook into the top of pre_get_posts to set the reg step routing, which gives other modules or plugins a chance to modify the reg steps, but just before the routes get called
		add_action( 'pre_get_posts', array( 'EED_Single_Page_Checkout', 'load_reg_steps' ), 1 );
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
	 *   update_checkout
	 *
	 * @access public
	 * @return void
	 */
	public static function update_checkout() {
		EED_Single_Page_Checkout::process_ajax_request( 'update_checkout' );
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
			if ( isset( $reg_step['file_path'] ) && isset( $reg_step['class_name'] ) && isset( $reg_step['slug'] )) {
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
		EED_Single_Page_Checkout::instance()->_initialize();
		$final_reg_step = end( EED_Single_Page_Checkout::instance()->checkout->reg_steps );
		if ( $final_reg_step instanceof EE_SPCO_Reg_Step_Finalize_Registration ) {
			if ( $final_reg_step->process_reg_step() ) {
				return EED_Single_Page_Checkout::instance()->checkout->transaction->ID();
			}
		}
		return FALSE;
	}




	/**
	 *    run
	 *
	 * @access    public
	 * @param WP $WP
	 * @return    void
	 */
	public function run( $WP ) {
		$this->_initialize();
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
		// get the $_GET
		$this->_get_request_vars();
		// filter continue_reg
		$this->checkout->continue_reg = apply_filters( 'FHEE__EED_Single_Page_Checkout__init___continue_reg', TRUE, $this->checkout );
		// load the reg steps array
		$this->_load_and_instantiate_reg_steps();
		// set the current step
		$this->checkout->set_current_step( $this->checkout->step );
		// and the next step
		$this->checkout->set_next_step();
		// was there already a valid transaction in the checkout from the session ?
		if ( ! $this->checkout->transaction instanceof EE_Transaction ) {
			// get transaction from db or session
			$this->checkout->transaction = $this->checkout->reg_url_link && ! is_admin() ? $this->_get_transaction_and_cart_for_previous_visit() : $this->_get_transaction_and_cart_for_current_session();
			// and the registrations for the transaction
			$this->_get_registrations( $this->checkout->transaction );
		}
		// initialize each reg step, which gives them the chance to potentially alter the process
		$this->_initialize_reg_steps();
		// get reg form
		$this->_check_form_submission();
		// checkout the action!!!
		$this->_process_form_action();
		// add some style and make it dance
		if ( $this->checkout->admin_request ) {
			add_action('admin_enqueue_scripts', array($this, 'enqueue_styles_and_scripts'), 10 );
		} else {
			add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles_and_scripts' ), 10 );
		}
		// kk... SPCO has successfully run
		EED_Single_Page_Checkout::$_initialized = TRUE;
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
		}
		// reset redirect
		$checkout->redirect = FALSE;
		$checkout->json_response = new EE_SPCO_JSON_Response();
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
		$this->checkout->step = EE_Registry::instance()->REQ->get( 'step', 'attendee_information' );
		// which step is being edited ?
		$this->checkout->edit_step = EE_Registry::instance()->REQ->get( 'edit_step', '' );
		// and what we're doing on the current step
		$this->checkout->action = EE_Registry::instance()->REQ->get( 'action', 'display_spco_reg_step' );
		$this->checkout->action = $this->checkout->admin_request && $this->checkout->action == 'process_registration_step' ? 'process_reg_step' : $this->checkout->action;
		// returning to edit ?
		$this->checkout->reg_url_link = EE_Registry::instance()->REQ->get( 'e_reg_url_link', '' );
		// or some other kind of revisit ?
		$this->checkout->revisit = EE_Registry::instance()->REQ->get( 'revisit', FALSE );
		// and whether or not to generate a reg form for this request
		$this->checkout->generate_reg_form = EE_Registry::instance()->REQ->get( 'generate_reg_form', TRUE ); 		// TRUE 	FALSE
	}



	/**
	 *    _load_and_instantiate_reg_steps
	 *  instantiates each reg step based on the loaded reg_steps array
	 *
	 * @access    private
	 * @throws EE_Error
	 * @return    array
	 */
	private function _load_and_instantiate_reg_steps() {
		// have reg_steps already been instantiated ?
		if ( empty( $this->checkout->reg_steps )) {
			// if not, then loop through raw reg steps array
			foreach ( EED_Single_Page_Checkout::$_reg_steps_array as $order => $reg_step ) {
				$this->_load_and_instantiate_reg_step( $reg_step, $order );
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
		// make reg step details available to JS
		$this->checkout->set_reg_step_JSON_info();
	}



	/**
	 * 	 _load_and_instantiate_reg_step
	 *
	 * @access    private
	 * @param array $reg_step
	 * @param int   $order
	 * @return    void
	 */
	private function _load_and_instantiate_reg_step( $reg_step= array(), $order = 0 ) {
		// we need a file_path, class_name, and slug to add a reg step
		if ( isset( $reg_step['file_path'] ) && isset( $reg_step['class_name'] ) && isset( $reg_step['slug'] )) {
			// if editing a specific step, but this is NOT that step... (and it's not the 'finalize_registration' step)
			if ( $this->checkout->reg_url_link && $this->checkout->step !== $reg_step['slug'] && $reg_step['slug'] !== 'finalize_registration' ) {
				return;
			}
			// instantiate step class using file path and class name
			$reg_step_obj = EE_Registry::instance()->load_file( $reg_step['file_path'], $reg_step['class_name'], 'class', $this->checkout, FALSE  );
			// did we gets the goods ?
			if ( $reg_step_obj instanceof EE_SPCO_Reg_Step ) {
				// set reg step order based on config
				$reg_step_obj->set_order( $order );
				// add instantiated reg step object to the master reg steps array
				$this->checkout->add_reg_step( $reg_step_obj );
			}
		}
	}



	/**
	 * 	_initialize_reg_steps
	 * simply loops thru all of the active reg steps and calls the initialize_reg_step() method
	 *
	 *  @access 	private
	 *  @return 	void
	 */
	private function _initialize_reg_steps() {
		// loop thru all steps to call their individual "initialize" methods and set i18n strings for JS
		foreach ( $this->checkout->reg_steps as $reg_step ) {
			$reg_step->initialize_reg_step();
			// i18n
			$reg_step->translate_js_strings();
		}
		if ( ! $this->checkout->revisit ) {
			/** @type EE_Transaction_Processor $transaction_processor */
			$transaction_processor = EE_Registry::instance()->load_class( 'Transaction_Processor' );
			// set the start time for this reg step
			if ( ! $transaction_processor->set_reg_step_initiated( $this->checkout->transaction, $this->checkout->current_step->slug() ) ) {
				if ( WP_DEBUG ) {
					EE_Error::add_error( sprintf(__( 'The "%1$s" registration step was not initialized properly.', 'event_espresso' ), $this->checkout->current_step->name() ), __FILE__, __FUNCTION__, __LINE__ );
				}
			};
		}
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
				if ( $this->checkout->action != 'display_spco_reg_step' && $this->checkout->current_step->reg_form->was_submitted() ) {
					// capture form data
					$this->checkout->current_step->reg_form->receive_form_submission();
					// validate form data
					if ( ! $this->checkout->current_step->reg_form->is_valid() || ! $this->checkout->continue_reg ) {
						$this->checkout->continue_reg = FALSE;
						if ( $this->checkout->current_step->reg_form->submission_error_message() != '' ) {
							// bad, bad, bad registrant
							EE_Error::add_error( $this->checkout->current_step->reg_form->submission_error_message(), __FILE__, __FUNCTION__, __LINE__ );
						}
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
				// advance to the next step! If you pass GO, collect $200
				$this->go_to_next_step();
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
							EE_Error::add_success( $this->checkout->current_step->success_message() . '<br />' . $this->checkout->next_step->_instructions() );
						}
						// did we just successfully complete the processing for this step, and this is NOT the Finalize Registration step ?
						if ( $this->checkout->action == 'process_reg_step' && ! $this->checkout->current_step->is_final_step() ) {
							// mark this reg step as completed
							$this->checkout->current_step->set_completed();
						}
						// pack it up, pack it in...
						$this->_setup_redirect();
						// store our progress so far
						$this->checkout->stash_transaction_and_checkout();
					}
					// dynamically creates hook point like: AHEE__Single_Page_Checkout__after_payment_options__process_reg_step
					do_action( "AHEE__Single_Page_Checkout__after_{$this->checkout->current_step->slug()}__{$this->checkout->action}", $this->checkout->current_step );
					// advance to the next step! If you pass GO, collect $200
					$this->go_to_next_step();

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
	 * @param bool           $from_session
	 * @return EE_Cart
	 */
	private function _get_cart_for_transaction( EE_Transaction $transaction, $from_session = FALSE ) {
		$cart = $from_session ? $transaction->get_cart_session() : EE_Cart::get_cart_from_txn( $transaction );
		// verify cart
		if ( ! $cart instanceof EE_Cart ) {
			$cart = EE_Registry::instance()->load_core( 'Cart' );
		}
		return $cart;
	}



	/**
	 * _get_transaction_and_cart_for_current_session
	 * 	generates a new EE_Transaction object and adds it to the $_transaction property.
	 *
	 * 	@access private
	 * 	@return EE_Transaction
	 */
	private function _get_transaction_and_cart_for_current_session() {
		// first check in the session
		$transaction = EE_Registry::instance()->SSN->transaction();
		// verify transaction
		if ( $transaction instanceof EE_Transaction ) {
			// and get the cart that was used for that transaction
			$this->checkout->cart = $this->_get_cart_for_transaction( $transaction, TRUE );
		} else {
			//  if there's no transaction, then this is the FIRST visit to SPCO
			// so load up the cart
			$this->checkout->cart = EE_Registry::instance()->load_core( 'Cart' );
			// and then create a new transaction
			$transaction = $this->_initialize_transaction();
			// save it so that we have an ID for other objects to use
			$transaction->save();
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
		$registrations = $transaction->registrations( $this->checkout->reg_cache_where_params, TRUE );
		// verify registrations have been set
		if ( empty( $registrations )) {
			// if no cached registrations, then check the db
			$registrations = $transaction->registrations( $this->checkout->reg_cache_where_params );
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
					$transaction->clear_cache( 'Registration', $registration->reg_url_link() );
				}
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
		$registrations = array();
		if ( $transaction instanceof EE_Transaction ) {
			/** @type EE_Registration_Processor $registration_processor */
			$registration_processor = EE_Registry::instance()->load_class( 'Registration_Processor' );
			$att_nmbr = 0;
			$this->checkout->total_ticket_count = $this->checkout->cart->all_ticket_quantity_count();
			// now let's add the cart items to the $transaction
			foreach ( $this->checkout->cart->get_tickets() as $item ) {
				// grab the related ticket object for this line_item
				$ticket = $item->ticket();
				if ( ! $ticket instanceof EE_Ticket ){
					EE_Error::add_error(sprintf(__("Line item %s did not contain a valid ticket", "event_espresso"),$item->ID()), __FILE__, __FUNCTION__, __LINE__);
					break;
				}
				$first_datetime = $ticket->get_first_related( 'Datetime' );
				if ( ! $first_datetime instanceof EE_Datetime ){
					EE_Error::add_error(sprintf(__("The ticket (%s) is not associated with any valid datetimes.", "event_espresso"),$ticket->name()), __FILE__, __FUNCTION__, __LINE__ );
					continue;
				}
				$event = $first_datetime->get_first_related( 'Event' );
				if ( ! $event instanceof EE_Event ){
					EE_Error::add_error(sprintf(__("The ticket (%s) is not associated with a valid event.", "event_espresso"),$ticket->name()),__FILE__,__FUNCTION__,__LINE__);
					continue;
				}
				//do the following for each ticket of this type they selected
				for ( $x = 1; $x <= $item->quantity(); $x++ ) {
					$att_nmbr++;
					$reg_url_link = $registration_processor->generate_reg_url_link( $att_nmbr, $item );
					// grab default reg status for the event, if set
					$event_default_registration_status = $event->default_registration_status();
					$STS_ID = ! empty( $event_default_registration_status ) ? $event_default_registration_status : EE_Registry::instance()->CFG->registration->default_STS_ID;
					// if the event default reg status is approved, then downgrade temporarily to payment pending to ensure that payments are triggered
					$STS_ID = $STS_ID === EEM_Registration::status_id_approved ? EEM_Registration::status_id_pending_payment : $STS_ID;
					// now create a new registration for the ticket
					$registration = EE_Registration::new_instance( array(
						'EVT_ID' 					=> $event->ID(),
						'TXN_ID' 					=> $transaction->ID(),
						'TKT_ID' 					=> $ticket->ID(),
						'STS_ID' 					=> $STS_ID,
						'REG_date' 				=> $transaction->datetime(),
						'REG_final_price' 	=> $ticket->price(),
						'REG_session' 			=> EE_Registry::instance()->SSN->id(),
						'REG_count' 			=> $att_nmbr,
						'REG_group_size' 	=> $this->checkout->total_ticket_count,
						'REG_url_link'			=> $reg_url_link
					));
					$registration->set_reg_code( $registration_processor->generate_reg_code( $registration ));
					$registration->_add_relation_to( $event, 'Event', array(), $event->ID() );
					$registration->_add_relation_to( $item->ticket(), 'Ticket', array(), $item->ticket()->ID() );
					$transaction->_add_relation_to( $registration, 'Registration', array(), $reg_url_link );
					$registrations[ $reg_url_link ] = $registration;
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
	 * 		translate_js_strings
	 *
	 * 		@access 		public
	 * 		@return 		void
	 */
	public function translate_js_strings() {
		EE_Registry::$i18n_js_strings['server_error'] = __('An unknown error occurred on the server while attempting to process your request. Please refresh the page and try again.', 'event_espresso');
		EE_Registry::$i18n_js_strings['reg_step_error'] = __('This registration step could not be completed. Please refresh the page and try again.', 'event_espresso');
		EE_Registry::$i18n_js_strings['invalid_coupon'] = __('We\'re sorry but that coupon code does not appear to be valid. If this is incorrect, please contact the site administrator.', 'event_espresso');
		EE_Registry::$i18n_js_strings['process_registration'] = sprintf( __( 'Please wait while we process your registration.%sDo not refresh the page or navigate away while this is happening.%sThank you for your patience.', 'event_espresso' ), '<br/>', '<br/>' );
		EE_Registry::$i18n_js_strings['language'] = get_bloginfo( 'language' );
		EE_Registry::$i18n_js_strings['EESID'] = EE_Registry::instance()->SSN->id();
		EE_Registry::$i18n_js_strings['datepicker_yearRange'] = '-150:+20';
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
		wp_enqueue_script( 'underscore' );
		wp_register_script( 'single_page_checkout', SPCO_JS_URL . 'single_page_checkout.js', array( 'espresso_core', 'underscore', 'ee_form_section_validation' ), EVENT_ESPRESSO_VERSION, TRUE );
		wp_enqueue_script( 'single_page_checkout' );
		wp_localize_script( 'single_page_checkout', 'eei18n', EE_Registry::$i18n_js_strings );
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
			$this->checkout->registration_form = new EE_Form_Section_Proper(
				array(
					'name' 	=> 'single-page-checkout',
					'html_id' 	=> 'ee-single-page-checkout-dv',
					'layout_strategy' =>
						new EE_Template_Layout(
							array(
								'layout_template_file' 			=> SPCO_TEMPLATES_PATH . 'registration_page_wrapper.template.php',
								'template_args' => array(
									'empty_cart' 		=> count( $this->checkout->transaction->registrations( $this->checkout->reg_cache_where_params, TRUE )) < 1 ? TRUE : FALSE,
									'revisit' 				=> $this->checkout->revisit,
									'reg_steps' 			=> $this->checkout->reg_steps,
									'next_step' 			=>  $this->checkout->next_step instanceof EE_SPCO_Reg_Step ? $this->checkout->next_step->slug() : '',
									'empty_msg' 		=> apply_filters(
										'FHEE__Single_Page_Checkout__display_spco_reg_form__empty_msg',
										sprintf(
											__( 'You need to %1$sReturn to Events list%2$sselect at least one event%3$s before you can proceed with the registration process.', 'event_espresso' ),
											'<a href="'. add_query_arg( array( 'post_type' => 'espresso_events' ), site_url() ) . '" title="',
											'">',
											'</a>'
										)
									)
								)
							)
						)
				)
			);
			// load template and add to output sent that gets filtered into the_content()
			EE_Registry::instance()->REQ->add_output( $this->checkout->registration_form->get_html_and_js() );
		}
		// store our progress so far
		$this->checkout->stash_transaction_and_checkout();
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
		// if this is an ajax request AND a callback function exists
		if ( EE_Registry::instance()->REQ->ajax ) {
			// just send the ajax (
			$json_response = apply_filters( 'FHEE__EE_Single_Page_Checkout__JSON_response', $this->checkout->json_response );
			echo $json_response;
			die();
		}
		// going somewhere ?
		if ( $this->checkout->redirect ) {
			// store notices in a transient
			EE_Error::get_notices( FALSE, TRUE, TRUE );
			wp_safe_redirect( $this->checkout->redirect_url );
			exit();
		}
//		d( $this->checkout );
		// hmmm... must be something wrong, so let's just display the form again !
		$this->_display_spco_reg_form();
	}



}
// End of file EED_Single_Page_Checkout.module.php
// Location: /modules/single_page_checkout/EED_Single_Page_Checkout.module.php
