<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }



/**
 * EE Factory Class for Transaction.
 *
 * When this is called as a chained object - the following relations will be also generated and attached:
 * - Registration (note this also sets all the relations on a registration up)
 * - Status.
 *
 * Chained does NOT setup (currently):
 * - Payment
 * - Line_Item
 *
 * Also with the chained flag active, the transaction object does not get its TXN_session_data() value set (@todo)
 *
 * @since        4.3.0
 * @package        Event Espresso
 * @subpackage    tests
 *
 */
class EE_UnitTest_Factory_For_Transaction extends WP_UnitTest_Factory_For_Thing {

	/**
	 * If chained, the registration will be added to this property.
	 *
	 * @since  4.3.0
	 * @var EE_Registration
	 */
	protected $_registration;

	/**
	 * If chained, the EE_Status object.
	 *
	 * @since  4.3.0
	 * @var EE_Status
	 */
	protected $_status;

	/**
	 * For transactions, this simply indicates whether a registration and status will automatically be setup and attached to the transaction or not.
	 * Note.  When create_many() method is called for the transaction factory, NEW registrations will be created for each transaction (instead of reusing any existing created ones).  However the EXISTING status is reused.
	 *
	 * @var bool
	 */
	protected $_chained;



	/**
	 * constructor
	 *
	 * @param EE_UnitTest_Factory $factory
	 * @param bool $chained
	 */
	public function __construct( $factory = null, $chained = false ) {
		parent::__construct( $factory );
		$this->_chained = $chained;
		//default args for creating transactions
		$this->default_generation_definitions = array();
	}



	/**
	 * This generates the dummy relation objects for use in a new transaction if the $_chained flag is set.  Note this is called on EVERY new transaction created when create_many() is called.
	 *
	 * @since 4.3.0
	 *
	 * @param array $args arguments that are sent to the factory that *may contain registration id.
	 * @param int $TXN_ID required to make sure that when registration_chained is called, it does not create a new transaction object but uses THIS transaction and sets the relation.
	 */
	private function _set_new_relations( $args, $TXN_ID ) {
		//registration
		$this->_registration = empty( $args[ 'REG_ID' ] ) ? $this->factory->registration_chained->create( array( 'TXN_ID' => $TXN_ID ) ) : EEM_Registration::instance()->get_one_by_ID( $args[ 'REG_ID' ] );
		$this->_registration = empty( $this->_registration ) ? $this->factory->registration_chained->create( array( 'TXN_ID' => $TXN_ID ) ) : $this->_registration;
	}



	/**
	 * This generates the dummy relation objects for use in a new transaction if the $_chained flag is true.  Note this is called just once when create_many() method is used.
	 *
	 * @since 4.3.0
	 *
	 * @param array $args arguments that are sent to the factory that *may contain registration id.
	 * @param int $TXN_ID required to make sure that when registration_chained is called, it does not create a new transaction object but uses THIS transaction and sets the relation.
	 */
	private function _set_repeated_relation( $args, $TXN_ID ) {
		//status
		$this->_status = empty( $args[ 'STS_ID' ] ) ? $this->factory->status->create( array( 'STS_ID'   => EEM_Transaction::incomplete_status_code,
																							 'STS_type' => 'transaction',
																							 'STS_code' => 'INCOMPLETE'
		) ) : EEM_Status::instance()->get_one_by_ID( $args[ 'STS_ID' ] );
		$this->_status = empty( $this->_status ) ? $this->factory->status->create( array( 'STS_ID'   => EEM_Transaction::incomplete_status_code,
																						  'STS_type' => 'transaction',
																						  'STS_code' => 'INCOMPLETE'
		) ) : $this->_status;
	}



	/**
	 * This handles connecting a transaction to related items when the chained flag is true.
	 *
	 * @since 4.3.0
	 *
	 * @param EE_Transaction $transaction
	 * @param array $args incoming arguments from caller for specifying overrides.
	 *
	 * @return EE_Transaction
	 */
	private function _maybe_chained( EE_Transaction $transaction, $args ) {
		if ( $this->_chained ) {
			if ( empty( $this->_status ) ) {
				$this->_set_repeated_relation( $args, $transaction->ID() );
			}
			//YES we DO want to set brand new relation objects because multiple transactions do not share the same related objects (for the purpose of tests at least)
			$this->_set_new_relations( $args, $transaction->ID() );
			//note relation to registration should already be set via the factory->registration_chained->create() method.
			//add relation to status
			$transaction->_add_relation_to( $this->_status, 'Status' );
			$transaction->save();
			return $transaction;
		}
		return $transaction;
	}



	/**
	 * used by factory to create transaction object.
	 *
	 * @since 4.3.0
	 *
	 * @param array $args Incoming field values to set on the new object
	 *
	 * @return EE_Transaction|false
	 */
	public function create_object( $args ) {
		//timezone?
		if ( isset( $args[ 'timezone' ] ) ) {
			$timezone = $args[ 'timezone' ];
			unset( $args[ 'timezone' ] );
		} else {
			$timezone = '';
		}
		//date_formats?
		if ( isset( $args[ 'formats' ] ) && is_array( $args[ 'formats' ] ) ) {
			$formats = $args[ 'formats' ];
			unset( $args[ 'formats' ] );
		} else {
			$formats = array();
		}
		$transaction = EE_Transaction::new_instance( $args, $timezone, $formats );
		$transactionID = $transaction->save();
		$transaction = $this->_maybe_chained( $transaction, $args );
		$transaction->save();
		return $transactionID ? $transaction : false;
	}



	/**
	 * Update transaction object for given transaction.
	 *
	 * @since 4.3.0
	 *
	 * @param int $TXN_ID Transaction ID for the transaction to update
	 * @param array $cols_n_data columns and values to change/update
	 *
	 * @return EE_Transaction|false.
	 */
	public function update_object( $TXN_ID, $cols_n_data ) {
		//all the stuff for updating an transaction.
		$transaction = EEM_Transaction::instance()->get_one_by_ID( $TXN_ID );
		if ( ! $transaction instanceof EE_Transaction ) {
			return null;
		}
		foreach ( $cols_n_data as $key => $val ) {
			$transaction->set( $key, $val );
		}
		$success = $transaction->save();
		return $success ? $transaction : false;
	}



	/**
	 * return the transaction object for a given transaction ID.
	 *
	 * @since 4.3.0
	 *
	 * @param int $TXN_ID the transaction id for the transaction to attempt to retrieve
	 *
	 * @return mixed null|EE_Transaction
	 */
	public function get_object_by_id( $TXN_ID ) {
		return EEM_Transaction::instance()->get_one_by_ID( $TXN_ID );
	}




}
// End of file EE_UnitTest_Factory_For_Transaction.class.php
// Location: /EE_UnitTest_Factory_For_Transaction.class.php