<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 *
 * Payment Method Model
 *
 * For storing all payment methods (things that interact between EE and gateways).
 * As of 4.3, payment methods are NOT singletons so there can be multiple instances of payment methods
 * of the same type, with different details. Eg, multiple paypal standard gateways so different
 * events can have their proceeds going to different paypal accounts
 *
 * @package 			Event Espresso
 * @subpackage 	includes/models/EEM_Checkin.model.php
 * @author             Mike Nelson
 *
 */
class EEM_Payment_Method extends EEM_Base {

	const scope_cart = 'CART';

	const scope_admin = 'ADMIN';

	const scope_api = 'API';

	/**
	 *
	 * @type EEM_Payment_Method
	 */
	private static $_instance = NULL;



	/**
	 *        This function is a singleton method used to instantiate the EEM_Payment_Method object
	 *
	 * @access public
	 * @return EEM_Payment_Method
	 */
	public static function instance() {
		// check if instance of EEM_Checkin already exists
		if ( self::$_instance === NULL ) {
			// instantiate Price_model
			self::$_instance = new self();
		}
		// EEM_Checkin object
		return self::$_instance;
	}



	/**
	 * Resets the instance
	 * @return EEM_Payment_Method
	 */
	public static function reset() {
		self::$_instance = NULL;
		return self::instance();
	}



	/**
	 * private constructor to prevent direct creation
	 * @Constructor
	 * @access   protected
	 * @return EEM_Payment_Method
	 */
	protected function __construct() {
		$this->singlular_item = __( 'Payment Method', 'event_espresso' );
		$this->plural_item = __( 'Payment Methods', 'event_espresso' );
		$this->_tables = array( 'Payment_Method' => new EE_Primary_Table( 'esp_payment_method', 'PMD_ID' ) );
		$this->_fields = array(
			'Payment_Method' => array(
				'PMD_ID' => new EE_Primary_Key_Int_Field( 'PMD_ID', __( "ID", 'event_espresso' ) ),
				'PMD_type' => new EE_Plain_Text_Field( 'PMD_type', __( "Payment Method Type", 'event_espresso' ), FALSE, 'Admin_Only' ),
				'PMD_name' => new EE_Plain_Text_Field( 'PMD_name', __( "Name", 'event_espresso' ), FALSE ),
				'PMD_desc' => new EE_Simple_HTML_Field( 'PMD_desc', __( "Description", 'event_espresso' ), FALSE, '' ),
				'PMD_admin_name' => new EE_Plain_Text_Field( 'PMD_admin_name', __( "Admin-Only Name", 'event_espresso' ), TRUE ),
				'PMD_admin_desc' => new EE_Simple_HTML_Field( 'PMD_admin_desc', __( "Admin-Only Description", 'event_espresso' ), TRUE ),
				'PMD_slug' => new EE_Slug_Field( 'PMD_slug', __( "Slug", 'event_espresso' ), FALSE ), 'PMD_order' => new EE_Integer_Field( 'PMD_order', __( "Order", 'event_espresso' ), FALSE, 0 ),
				'PMD_debug_mode' => new EE_Boolean_Field( 'PMD_debug_mode', __( "Debug Mode On?", 'event_espresso' ), FALSE, FALSE ),
				'PMD_wp_user_id' => new EE_Integer_Field( 'PMD_wp_user_Id', __( "User ID", 'event_espresso' ), FALSE, 1 ),
				'PMD_open_by_default' => new EE_Boolean_Field( 'PMD_open_by_default', __( "Open by Default?", 'event_espresso' ), FALSE, FALSE ), 'PMD_button_url' => new EE_Plain_Text_Field( 'PMD_button_url', __( "Button URL", 'event_espresso' ), TRUE, '' ),
				'PMD_scope' => new EE_Serialized_Text_Field( 'PMD_scope', __( "Usable From?", 'event_espresso' ), FALSE, array() ), //possible values currently are 'CART','ADMIN','API'
		) );
		$this->_model_relations = array(
 //			'Event'=>new EE_HABTM_Relation('Event_Payment_Method'),
			'Payment' => new EE_Has_Many_Relation(),
			'Currency' => new EE_HABTM_Relation( 'Currency_Payment_Method' ),
			'Transaction' => new EE_Has_Many_Relation(),);
		parent::__construct();
	}



	/**
	 * Gets one by the slug provided
	 * @param string $slug
	 * @return EE_Payment_Method
	 */
	public function get_one_by_slug( $slug ) {
		return $this->get_one( array( array( 'PMD_slug' => $slug ) ) );
	}



	/**
	 * Gets all the acceptable scopes for payment methods.
	 * Keys are their names as store din the DB, and values are nice names for displaying them
	 * @return array
	 */
	public function scopes() {
		return apply_filters(
			'FHEE__EEM_Payment_Method__scopes',
			array(
				self::scope_cart 		=> __( "Front-end Registration Page", 'event_espresso' ),
				self::scope_admin 	=> __( "Admin Registration Page", 'event_espresso' )
			)
		);
	}



	/**
	 * Determines if this is an valid scope
	 * @param string $scope like one of EEM_Payment_Method::instance()->scopes()
	 * @return boolean
	 */
	public function is_valid_scope( $scope ) {
		$scopes = $this->scopes();
		if ( isset( $scopes[ $scope ] ) ) {
			return TRUE;
		} else {
			return FALSE;
		}
	}



	/**
	 * Gets all active payment methods
	 * @param string $scope one of
	 * @param array  $query_params
	 * @throws EE_Error
	 * @return EE_Payment_Method[]
	 */
	public function get_all_active( $scope = NULL, $query_params = array() ) {
		if ( $scope ) {
			if ( $this->is_valid_scope( $scope ) ) {
				return $this->get_all( array_replace_recursive( array( array( 'PMD_scope' => array( 'LIKE', "%$scope%" ) ) ), $query_params ) );
			} else {
				throw new EE_Error( sprintf( __( "'%s' is not a valid scope for a payment method", "event_espresso" ), $scope ) );
			}
		} else {
			$acceptable_scopes = array();
			$count = 0;
			foreach ( $this->scopes() as $scope_name => $desc ) {
				$count++;
				$acceptable_scopes[ 'PMD_scope*' . $count ] = array( 'LIKE', '%' . $scope_name . '%' );
			}
			$query_params = array_replace_recursive( array( array( 'OR*active_scope' => $acceptable_scopes ) ), $query_params );
			return $this->get_all( $query_params );
		}
	}



	/**
	 * Gets one active payment method. see @get_all_active for documentation
	 * @param string $scope
	 * @param array  $query_params
	 * @return EE_Payment_Method
	 */
	public function get_one_active( $scope = NULL, $query_params = array() ) {
		$results = $this->get_all_active( $scope, $query_params );
		if ( $results ) {
			return array_shift( $results );
		} else {
			return NULL;
		}
	}



	/**
	 * Gets one payment method of that type, regardless of whether its active or not
	 * @param string $type
	 * @return EE_Payment_Method
	 */
	public function get_one_of_type( $type ) {
		return $this->get_one( array( array( 'PMD_type' => $type ) ) );
	}



	/**
	 * Overrides parent ot also check by the slug
	 * @see EEM_Base::ensure_is_obj()
	 * @param string|int|EE_Payment_Method $base_class_obj_or_id
	 * @param boolean                      $ensure_is_in_db
	 * @return EE_Payment_Method
	 * @throws EE_Error
	 */
	public function ensure_is_obj( $base_class_obj_or_id, $ensure_is_in_db = FALSE ) {
		try {
			return parent::ensure_is_obj( $base_class_obj_or_id, $ensure_is_in_db );
		}
		catch ( EE_Error $e ) {
			//last ditch-try to find one by the slug
			$obj = $this->get_one_by_slug( $base_class_obj_or_id );
			if ( $obj ) {
				return $obj;
			} else {
				throw new EE_Error( sprintf( __( "'%s' is neither a Payment Method ID, slug, nor object.", "event_espresso" ), $base_class_obj_or_id ) );
			}
		}
	}



	/**
	 * Gets the ID of this object, or if its a string finds the object's id
	 * associated with that slug
	 * @param mixed $base_obj_or_id_or_slug
	 * @return int
	 */
	function ensure_is_ID( $base_obj_or_id_or_slug ) {
		if ( is_string( $base_obj_or_id_or_slug ) ) {
			//assume it's a slug
			$base_obj_or_id_or_slug = $this->get_one_by_slug( $base_obj_or_id_or_slug );
		}
		return parent::ensure_is_ID( $base_obj_or_id_or_slug );
	}



	/**
	 * Verifies the button urls on all the payment methods that meet the criteria
	 * of $query_params have a valid button url. If not, resets them to their default.
	 * @param array $query_params payment methods you want to check
	 */
	function verify_button_urls( $query_params = array() ) {
		EE_Registry::instance()->load_helper( 'URL' );
		$payment_methods = $this->get_all( $query_params );
		/* @var $payment_methods EE_Payment_Method[] */
		foreach ( $payment_methods as $payment_method ) {
			try {
				//send an HTTP HEAD request to quickly verify the file exists
				if ( ! EEH_URL::remote_file_exists( $payment_method->button_url() ) ) {
					EE_Error::add_attention( sprintf( __( "Payment Method '%s' had a broken button url, so it was reset", "event_espresso" ), $payment_method->name() ) );
					$payment_method->save( array( 'PMD_button_url' => $payment_method->type_obj()->default_button_url() ) );
				}
			}
			catch ( EE_Error $e ) {
				$payment_method->set_active( FALSE );
			}
		}
	}



	/**
	 * Overrides parent to not only turn wpdb results into EE_Payment_Method objects,
	 * but also verifies the payment method type of each is a usable object. If not,
	 * deactivate it, sets a notification, and deactivates it
	 * @param array $rows
	 * @return EE_Payment_Method[]
	 */
	protected function _create_objects( $rows = array() ) {
		$payment_methods = parent::_create_objects( $rows );
		/* @var $payment_methods EE_Payment_Method[] */
		$usable_payment_methods = array();
		foreach ( $payment_methods as $key => $payment_method ) {
			try {
				$payment_method->type_obj();
				$usable_payment_methods[ $key ] = $payment_method;
			}
			catch ( EE_Error $e ) {
				//if it threw an exception, its because the payment type object
				//isn't defined (probably because somehow the DB got borked,
				//or an addon which defined it got deactivated
				//so deactivate it and move on
				$payment_method->deactivate();
				$payment_method->save();
				EE_Error::add_attention( sprintf( __( "There is no payment method type '%s', so the payment method '%s' was deactivated", "event_espresso" ), $payment_method->type(), $payment_method->name() ), __FILE__, __FUNCTION__, __LINE__ );
			}
		}
		return $usable_payment_methods;
	}



	/**
	 * Gets all the payment methods which can be used for transaction
	 * (according to the relations between payment methods and events, and
	 * the currencies used for the transaction and their relation to payment methods)
	 * @param EE_Transaction $transaction
	 * @param string 	$scope @see EEM_Payment_Method::get_all_for_events
	 * @return EE_Payment_Method[]
	 */
	public function get_all_for_transaction( $transaction, $scope ) {
		//@todo take relations between events and payment methods into account, once that relation exists
		if ( $transaction instanceof EE_Transaction ) {
			//@todo take the relation between transaction and currencies into account
		}
		$currencies_for_events = array( EE_Config::instance()->currency->code );
		return $this->get_all_active( $scope, array( array( 'Currency.CUR_code' => array( 'IN', $currencies_for_events ) ) ) );
	}



}