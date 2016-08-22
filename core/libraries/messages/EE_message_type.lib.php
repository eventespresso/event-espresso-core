<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'NO direct script access allowed' );
}



/**
 * EE_message_type class
 * Abstract class for message types.
 * Different types can be setup by extending this class and adding them to the /includes/core/messages/types'
 * directory. View examples there.
 *
 * @package            Event Espresso
 * @subpackage         includes/core/messages
 * @author             Darren Ethier, Brent Christensen
 */
abstract class EE_message_type extends EE_Messages_Base {



	/**
	 * message type child classes will set what contexts are associated with the message type via this array.
	 * format:
	 * array(
	 * 'context' => array(
	 *        'label' => __('Context Label', 'event_espresso'),
	 *        'description' => __('Context description (for help popups)', 'event_espresso')
	 *    ));
	 *
	 * @var array
	 */
	protected $_contexts = array();



	/**
	 * This property is used to define what the display label will be for contexts (eg. "Recipients", "Themes" etc.)
	 * Format:
	 * array( 'label' => 'something', 'plural' => 'somethings', 'description' => 'something' );
	 *
	 * @var array
	 */
	protected $_context_label;


	/** MESSAGE ASSEMBLING PROPERTIES **/
	/**
	 * This parameter simply holds all the message objects for retrieval by the controller and sending to the messenger.
	 *
	 * @var array of message objects.
	 */
	public $messages = array();

	/**
	 * The following holds the templates that will be used to assemble the message object for the messenger.
	 *
	 * @var array
	 */
	protected $_templates;



	/**
	 * If a specific template is being parsed, this will hold the message template group GRP_ID for that template.
	 *
	 * @var int.
	 */
	protected $_GRP_ID;


	/** OTHER INFO PROPERTIES **/
	/**
	 * This will hold the count of the message objects in the messages array. This could be used for determining if
	 * batching/queueing is needed.
	 *
	 * @var int
	 */
	public $count = 0;



	/**
	 * This is set via the `do_messenger_hooks` method and contains the messenger being used to send the message of
	 * this message type at time of sending.
	 *
	 * @var EE_messenger
	 */
	protected $_active_messenger;



	/**
	 * This will hold the shortcode_replace instance for handling replacement of shortcodes in the various templates
	 *
	 * @var object
	 */
	protected $_shortcode_replace;



	/**
	 * The purpose for this property is to simply allow message types to indicate if the message generated is intended
	 * for only single context.  Child message types should redefine this variable (if necessary) in the
	 * _set_data_Handler() method.
	 *
	 * @var boolean
	 */
	protected $_single_message = false;


	/**
	 * This will hold an array of specific reg_ids that are receiving messages.
	 *
	 * @since 4.7.x
	 * @var array
	 */
	protected $_regs_for_sending = array();



	/**
	 * This holds the data passed to this class from the controller and also the final processed data.
	 *
	 * @var object
	 */
	protected $_data;



	/**
	 * this is just a flag indicating whether we're in preview mode or not.
	 *
	 * @var bool
	 */
	protected $_preview = false;



	/**
	 * This just holds defaults for addressee data that children merge with their data array setup
	 *
	 * @var array
	 */
	protected $_default_addressee_data;



	/**
	 * Child classes declare through this property what handler they want to use for the incoming data and this string
	 * is used to instantiate the EE_Messages_incoming_data child class for that handler.
	 *
	 * @var string
	 */
	protected $_data_handler;



	/**
	 * This holds any specific fields for holding any settings related to a message type (if any needed)
	 *
	 * @var array
	 */
	protected $_admin_settings_fields = array();

	/**
	 * this property will hold any existing setting that may have been set in the admin.
	 *
	 * @var array
	 */
	protected $_existing_admin_settings = array();



	/**
	 * This is used to designate the generating and alternative sending messengers for a message type.  It is set via
	 * set_with_messengers() on construct. Note, generating messenger also acts as a sending messenger for this message
	 * type.  However ONLY the generating messengers are used for creating templates for this message type. Should be
	 * in this format:
	 * {
	 *      @type string $generating_messenger  the name of the generating messenger.  Generating
	 *                                          messengers are used for generating templates,
	 *                                          doing validation and defining valid shortcodes.
	 *      {
	 *          @type string $sending_messenger     values are the name(s) for the sending
	 *                                              messengers.  sending messengers are
	 *                                              just valid delivery vehicles that will utilize
	 *                                              the templates (and generated EE_message
	 *                                              objects from the generating messengers).
	 *      }
	 * }
	 * @since                             4.5.0
	 * @var array
	 */
	protected $_with_messengers = array();



	/**
	 * This holds the addressees in an array indexed by context for later retrieval when assembling the message objects.
	 *
	 * @access protected
	 * @var array
	 */
	protected $_addressees = array();



	/**
	 * This allows each message type to set what alternate messenger&message type combination can be used for fallback
	 * default templates if there are no specific ones defined for this messenger and message type.  Should be in the
	 * format:
	 * array(
	 *      'messenger' => 'message_type',
	 *      'another_messenger' => another_message_type
	 * );
	 * This is set in the message type constructor.
	 *
	 * @var array
	 */
	protected $_master_templates = array();



	/**
	 * This holds whatever the set template pack is for a message template group when generating messages.
	 *
	 * @since 4.5.0
	 * @var EE_Messages_Template_Pack
	 */
	protected $_template_pack;



	/**
	 * This holds whatever the set variation is for a message template group when generating messages.
	 *
	 * @since 4.5.0
	 * @var string
	 */
	protected $_variation;



	/**
	 * EE_message_type constructor.
	 */
	public function __construct() {
		$this->_messages_item_type = 'message_type';
		$this->_set_contexts();
		$this->_set_with_messengers();
		parent::__construct();
	}



	/**
	 * This sets the data handler for the message type.  It must be used to define the _data_handler property.  It is
	 * called when messages are setup.
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _set_data_handler();



	/**
	 * This method should return a EE_Base_Class object (or array of EE_Base_Class objects) for the given context and
	 * ID (which should be the primary key id for the base class).  Client code doesn't have to know what a message
	 * type's data handler is.
	 *
	 * @since 4.5.0
	 * @param string          $context      This should be a string matching a valid context for the message type.
	 * @param EE_Registration $registration Need a registration to ensure that the data is valid (prevents people
	 *                                      guessing a url).
	 * @param int             $id           Optional. Integer corresponding to the value for the primary key of a
	 *                                      EE_Base_Class_Object
	 * @return mixed ( EE_Base_Class||EE_Base_Class[] )
	 */
	abstract protected function _get_data_for_context( $context, EE_Registration $registration, $id );



	/**
	 * _set_contexts
	 * This sets up the contexts associated with the message_type
	 *
	 * @abstract
	 * @access  protected
	 * @return  void
	 */
	abstract protected function _set_contexts();



	/**
	 * This is used to get the "id" value fo the msg_trigger_url generated by get_url_trigger().
	 * In most cases, child classes don't need anything, (hence the default of 0), however if there is a specific
	 * EE_Base_Class that is required in generating a message for a message type recipient then the message
	 * type should override this method and use the given params to generate the correct ID.
	 *
	 * @param string          $context      The message type context.
	 * @param EE_Registration $registration Registration object
	 * @deprecated 4.9.0
	 * @return int
	 */
	protected function _get_id_for_msg_url( $context, EE_Registration $registration ) {
		return 0;
	}



	/**
	 * This sets up any action/filter hooks this message type puts in place for a specific messenger.  Note that by
	 * default this does nothing.  Child classes will need to override if they want to add specific hooks for a
	 * messenger.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	protected function _do_messenger_hooks() {
		return;
	}



	/**
	 * This is a public wrapper for the protected _do_messenger_hooks() method.
	 * For backward compat reasons, this was done rather than making the protected method public.
	 *
	 * @param   EE_messenger $messenger This is used to set the $_active_messenger property, so message types are able
	 *                                  to know what messenger is being used to send the message at the time of
	 *                                  sending.
	 * @since 4.9.0
	 */
	public function do_messenger_hooks( $messenger = null ) {
		$this->_active_messenger = $messenger;
		$this->_do_messenger_hooks();
	}



	/**
	 * This method returns whether this message type should always generate a new copy
	 * when requested, or if links can be to the already generated copy.
	 * Note: this does NOT affect viewing/resending already generated messages in the EE_Message list table.
	 * Child classes should override this if different from the default of false.
	 *
	 * @return bool     false means can link to generated EE_Message.  true must regenerate.
	 */
	public function always_generate() {
		return false;
	}



	/**
	 * Returns the priority for the message type.
	 * Priorities are defined as constants on EEM_Message.  Currently there are three priorities:
	 * - EEM_Message::priority_high
	 * - EEM_Message::priority_medium
	 * - EEM_Message::priority_low
	 * Priority is used to determine the weight the message type is given when queuing for generation and/or sending.
	 *
	 * @see    EEM_Message for more phpdocs on priority.
	 *         The default priority for all message_types is EEM_Message::priority_low.  Message Types wanting to give
	 *         a higher priority must override this method. Also note, messengers are able to override priorities
	 *         queuing instructions if their "send_now" flag is set to true. An example of this is the HTML messenger
	 *         which displays things in the browser.
	 * @since  4.9.0
	 * @return int
	 */
	public function get_priority() {
		return EEM_Message::priority_low;
	}



	/**
	 * This runs the _set_data_handler() method for message types and then returns what got set.
	 *
	 * @param mixed $data This sets the data property for the message type with the incoming data used for generating.
	 * @return string (the reference for the data handler) (will be an empty string if could not be determined).
	 */
	public function get_data_handler( $data ) {
		$this->_data = $data;
		$this->_set_data_handler();
		return apply_filters( 'FHEE__EE_message_type__get_data_handler', $this->_data_handler, $this );
	}



	/**
	 * This is called externally to reset the value of the $_data property for the message type.
	 * Please note the value of the _data is highly volatile.  It was added as an interim measure ensuring
	 * EE_Message_To_Generate objects have any changes to the _data property when `_set_data_handler` method is called
	 * (and for back compat reasons). This particular method is used in
	 * EE_Messages_Generator::_reset_current_properties to ensure that the internal _data on the message type is
	 * cleaned before subsequent EE_Message generation in the same request.
	 *
	 * @todo      This needs refactored along with the whole _set_data_handler() method in EE_message_types. Need to
	 *            ensure that there is no manipulation of the _data property during run time so there's a clear
	 *            expectation of what it is.  Likely we need to ensure that _data is not persisted IN the message type
	 *            at all.
	 * @internal  Plugin authors, do not implement this method, it is subject to change.
	 * @since     4.9
	 */
	public function reset_data() {
		$this->_data = null;
	}



	/**
	 * This does some validation of incoming params gets the url trigger from the defined method in the specific child
	 * class and then filters the results.
	 *
	 * @param string          $context           The message type context
	 * @param string          $sending_messenger The sending messenger
	 * @param EE_Registration $registration      Registration object
	 * @throws EE_Error
	 * @deprecated  4.9.0  Likely 4.9.10 or 4.10.0 will remove this method completely
	 * @return string          generated url
	 */
	public function get_url_trigger( $context, $sending_messenger, EE_Registration $registration ) {
		//validate context
		//valid context?
		if ( ! isset( $this->_contexts[ $context ] ) ) {
			throw new EE_Error(
				sprintf(
					__( 'The context %s is not a valid context for %s.', 'event_espresso' ),
					$context,
					get_class( $this )
				)
			);
		}
		//valid sending_messenger?
		$not_valid_msgr = false;
		foreach ( $this->_with_messengers as $generating => $sendings ) {
			if ( empty( $sendings ) || array_search( $sending_messenger, $sendings ) === false ) {
				$not_valid_msgr = true;
			}
		}
		if ( $not_valid_msgr ) {
			throw new EE_Error(
				sprintf(
					__(
						'The given sending messenger string (%s) does not match a valid sending messenger with the %s.  If this is incorrect, make sure that the message type has defined this messenger as a sending messenger in its $_with_messengers array.',
						'event_espresso'
					),
					$sending_messenger,
					get_class( $this )
				)
			);
		}
		return EEH_MSG_Template::generate_url_trigger(
			$sending_messenger,
			$this->_active_messenger->name,
			$context,
			$this->name,
			$registration,
			$this->_GRP_ID,
			$this->_get_id_for_msg_url( $context, $registration )
		);
	}



	/**
	 * Wrapper for _get_data_for_context() that handles some validation before calling the main class and also allows
	 * for filtering. This is (currently) called by the EED_Messages module.
	 *
	 * @since 4.5.0
	 * @throws EE_Error
	 * @param string          $context      This should be a string matching a valid context for the message type.
	 * @param EE_Registration $registration Need a registration to ensure that the data is valid (prevents people
	 *                                      guessing a url).
	 * @param int             $id           Optional. Integer corresponding to the value for the primary key of a
	 *                                      EE_Base_Class_Object
	 * @return mixed (EE_Base_Class||EE_Base_Class[])
	 */
	public function get_data_for_context( $context, EE_Registration $registration, $id = 0 ) {
		//valid context?
		if ( ! isset( $this->_contexts[ $context ] ) ) {
			throw new EE_Error(
				sprintf(
					__( 'The context %s is not a valid context for %s.', 'event_espresso' ),
					$context,
					get_class( $this )
				)
			);
		}
		//get data and apply global and class specific filters on it.
		$data = apply_filters(
			'FHEE__EE_message_type__get_data_for_context__data',
			$this->_get_data_for_context( $context, $registration, $id ),
			$this
		);
		$data = apply_filters( 'FHEE__' . get_class( $this ) . '__get_data_for_context__data', $data, $this );
		//if empty then something went wrong!
		if ( empty( $data ) ) {
			throw new EE_Error(
				sprintf(
					__(
						'There is no data retrieved, it is possible that the id given (%d) does not match any value in the database for the corresponding EE_Base_Class used by the data handler for the %s message type.',
						'event_espresso'
					),
					$id,
					$this->name
				)
			);
		}
		return $data;
	}



	/**
	 * This returns the contents of the _data property.
	 * Please note the value of the _data is highly volatile.  It was added as an interim measure ensuring
	 * EE_Message_To_Generate objects have any changes to the _data property when `_set_data_handler` method is called.
	 *
	 * @todo      This needs refactored along with the whole _set_data_handler() method in EE_message_types. Need to
	 *            ensure that there is no manipulation of the _data property during run time so there's a clear
	 *            expectation of what it is.
	 * @internal  Plugin authors, do not implement this method, it is subject to change.
	 * @return mixed
	 */
	public function get_data() {
		return $this->_data;
	}



	/**
	 * used to set the $_with_messengers property. (this is a default, child classes SHOULD override)
	 *
	 * @see   property definition for description of setup.
	 * @since 4.5.0
	 * @abstract
	 * @return void
	 */
	protected function _set_with_messengers() {
		$this->_with_messengers = array(
			'email' => array( 'html' ),
		);
	}



	/**
	 * Return the value of the _with_messengers property
	 *
	 * @since 4.5.0
	 * @return array
	 */
	public function with_messengers() {
		return apply_filters(
			'FHEE__EE_message_type__get_with_messengers__with_messengers__' . get_class( $this ),
			$this->_with_messengers
		);
	}



	/**
	 * this public method accepts a page slug (for an EE_admin page) and will return the response from the child class
	 * callback function if that page is registered via the `_admin_registered_page` property set by the child class.
	 * *
	 *
	 * @param string $page       the slug of the EE admin page
	 * @param array  $messengers an array of active messenger objects
	 * @param string $action     the page action (to allow for more specific handling - i.e. edit vs. add pages)
	 * @param array  $extra      This is just an extra argument that can be used to pass additional data for setting up
	 *                           page content.
	 * @access public
	 * @return string
	 */
	public function get_message_type_admin_page_content(
		$page,
		$action = null,
		$extra = array(),
		$messengers = array()
	) {
		//we can also further refine the context by action (if present).
		return $this->_get_admin_page_content( $page, $action, $extra, $messengers );
	}



	/**
	 * @return array
	 */
	public function get_contexts() {
		return $this->_contexts;
	}



	/**
	 * This just returns the context label for a given context (as set in $_context_label property)
	 *
	 * @access public
	 * @return string
	 */
	public function get_context_label() {
		return $this->_context_label;
	}



	/**
	 * This just returns the (filtered) _master_templates property.
	 *
	 * @see property definition for documentation.
	 * @return array
	 */
	public function get_master_templates() {
		//first class specific filter then filter that by the global filter.
		$master_templates = apply_filters(
			'FHEE__' . get_class( $this ) . '__get_master_templates',
			$this->_master_templates
		);
		return apply_filters( 'FHEE__EE_message_type__get_master_templates', $master_templates, $this );
	}



	/**
	 * Accepts an incoming data handler which contains data for processing, and returns an array of
	 * EE_Messages_Addressee objects.
	 *
	 * @param EE_Messages_incoming_data $data
	 * @param string                    $context Limit addressees to specific context.
	 * @return array   An array indexed by context where each context is an array of EE_Messages_Addressee objects for
	 *                 that context
	 */
	public function get_addressees( EE_Messages_incoming_data $data, $context = '' ) {
		//override _data
		$this->_data = $data;
		$addressees = array();
		//if incoming context then limit to that context
		if ( ! empty( $context ) ) {
			$cntxt = ! empty( $this->_contexts[ $context ] ) ? $this->_contexts[ $context ] : '';
			if ( ! empty( $cntxt ) ) {
				$this->_contexts = array();
				$this->_contexts[ $context ] = $cntxt;
			}
		}
		$this->_set_default_addressee_data();
		if ( $this->_process_data() ) {
			$addressees = $this->_addressees;
		}
		return $addressees;
	}



	/**
	 * processes the data object so we get
	 *
	 * @throws EE_Error
	 * @return bool  true means data was processed successfully, false means not.
	 */
	protected function _process_data() {
		//at a minimum, we NEED EE_Attendee objects.
		if ( empty( $this->_data->attendees ) ) {
			return false;  //there's no data to process!
		}
		// process addressees for each context.  Child classes will have to have methods for
		// each context defined to handle the processing of the data object within them
		foreach ( $this->_contexts as $context => $details ) {
			$xpctd_method = '_' . $context . '_addressees';
			if ( ! method_exists( $this, $xpctd_method ) ) {
				throw new EE_Error(
					sprintf(
						__(
							'The data for %1$s message type cannot be prepared because there is no set method for doing so.  The expected method name is "%2$s" please doublecheck the %1$s message type class and make sure that method is present',
							'event_espresso'
						),
						$this->label['singular'],
						$xpctd_method
					)
				);
			}
			$this->_addressees[ $context ] = call_user_func( array( $this, $xpctd_method ) );
		}
		return true; //data was processed successfully.
	}



	/**
	 * sets the default_addressee_data property,
	 *
	 * @access private
	 * @return void
	 */
	private function _set_default_addressee_data() {
		$this->_default_addressee_data = array(
			'billing'                  => $this->_data->billing,
			'taxes'                    => $this->_data->taxes,
			'tax_line_items'           => $this->_data->tax_line_items,
			'additional_line_items'    => $this->_data->additional_line_items,
			'grand_total_line_item'    => $this->_data->grand_total_line_item,
			'txn'                      => $this->_data->txn,
			'payments'                 => $this->_data->payments,
			'payment'                  => isset( $this->_data->payment ) && $this->_data->payment instanceof EE_Payment
				? $this->_data->payment
				: null,
			'reg_objs'                 => $this->_data->reg_objs,
			'registrations'            => $this->_data->registrations,
			'datetimes'                => $this->_data->datetimes,
			'tickets'                  => $this->_data->tickets,
			'line_items_with_children' => $this->_data->line_items_with_children,
			'questions'                => $this->_data->questions,
			'answers'                  => $this->_data->answers,
			'txn_status'               => $this->_data->txn_status,
			'total_ticket_count'       => $this->_data->total_ticket_count,
		);
		if ( is_array( $this->_data->primary_attendee_data ) ) {
			$this->_default_addressee_data = array_merge(
				$this->_default_addressee_data,
				$this->_data->primary_attendee_data
			);
			$this->_default_addressee_data['primary_att_obj'] = $this->_data->primary_attendee_data['att_obj'];
			$this->_default_addressee_data['primary_reg_obj'] = $this->_data->primary_attendee_data['reg_obj'];
		}
	}



	/********************
	 * setup default shared addressee object/contexts
	 * These can be utilized simply by defining the context in the child message type.
	 * They can also be overridden if a specific message type needs to do something different for that context.
	 ****************/
	/**
	 * see abstract declaration in parent class for details, children message types can
	 * override these valid shortcodes if desired (we include all for all contexts by default).
	 */
	protected function _set_valid_shortcodes() {
		$all_shortcodes = array(
			'attendee_list',
			'attendee',
			'datetime_list',
			'datetime',
			'event_list',
			'event_meta',
			'event',
			'organization',
			'recipient_details',
			'recipient_list',
			'ticket_list',
			'ticket',
			'transaction',
			'venue',
			'primary_registration_details',
			'primary_registration_list',
			'event_author',
			'email',
			'messenger',
		);
		$contexts = $this->get_contexts();
		foreach ( $contexts as $context => $details ) {
			$this->_valid_shortcodes[ $context ] = $all_shortcodes;
			//make sure non admin context does not include the event_author shortcodes
			if ( $context != 'admin' ) {
				if ( ( $key = array_search( 'event_author', $this->_valid_shortcodes[ $context ] ) ) !== false ) {
					unset( $this->_valid_shortcodes[ $context ][ $key ] );
				}
			}
		}
		// make sure admin context does not include the recipient_details shortcodes
		// IF we have admin context hooked in message types might not have that context.
		if ( ! empty( $this->_valid_shortcodes['admin'] ) ) {
			if ( ( $key = array_search( 'recipient_details', $this->_valid_shortcodes['admin'] ) ) !== false ) {
				unset( $this->_valid_shortcodes['admin'][ $key ] );
			}
			//make sure admin context does not include the recipient_details shortcodes
			if ( ( $key = array_search( 'recipient_list', $this->_valid_shortcodes['admin'] ) ) !== false ) {
				unset( $this->_valid_shortcodes['admin'][ $key ] );
			}
		}
	}



	/**
	 * Used by Validators to modify the valid shortcodes.
	 *
	 * @param  array $new_config array of valid shortcodes (by context)
	 * @return void               sets valid_shortcodes property
	 */
	public function reset_valid_shortcodes_config( $new_config ) {
		foreach ( $new_config as $context => $shortcodes ) {
			$this->_valid_shortcodes[ $context ] = $shortcodes;
		}
	}



	/**
	 * returns an array of addressee objects for event_admins
	 *
	 * @access protected
	 * @return array array of EE_Messages_Addressee objects
	 */
	protected function _admin_addressees() {
		$admin_events = array();
		$addressees = array();
		// first we need to get the event admin user id for all the events
		// and setup an addressee object for each unique admin user.
		foreach ( $this->_data->events as $line_ref => $event ) {
			$admin_id = $this->_get_event_admin_id( $event['ID'] );
			//make sure we are just including the events that belong to this admin!
			$admin_events[ $admin_id ][ $line_ref ] = $event;
		}
		//k now we can loop through the event_admins and setup the addressee data.
		foreach ( $admin_events as $admin_id => $event_details ) {
			$aee = array(
				'user_id'        => $admin_id,
				'events'         => $event_details,
				'attendees'      => $this->_data->attendees,
				'recipient_id'   => $admin_id,
				'recipient_type' => 'WP_User',
			);
			$aee = array_merge( $this->_default_addressee_data, $aee );
			$addressees[] = new EE_Messages_Addressee( $aee );
		}
		return $addressees;
	}



	/**
	 * Takes care of setting up the addressee object(s) for the primary attendee.
	 *
	 * @access protected
	 * @return array of EE_Addressee objects
	 */
	protected function _primary_attendee_addressees() {
		$aee = $this->_default_addressee_data;
		$aee['events'] = $this->_data->events;
		$aee['attendees'] = $this->_data->attendees;
		$aee['recipient_id'] = $aee['primary_att_obj'] instanceof EE_Attendee ? $aee['primary_att_obj']->ID() : 0;
		$aee['recipient_type'] = 'Attendee';
		//great now we can instantiate the $addressee object and return (as an array);
		$add[] = new EE_Messages_Addressee( $aee );
		return $add;
	}



	/**
	 * Takes care of setting up the addressee object(s) for the registered attendees
	 *
	 * @access protected
	 * @return array of EE_Addressee objects
	 */
	protected function _attendee_addressees() {
		$add = array();
		//we just have to loop through the attendees.  We'll also set the attached events for each attendee.
		//use to verify unique attendee emails... we don't want to sent multiple copies to the same attendee do we?
		$already_processed = array();
		foreach ( $this->_data->attendees as $att_id => $details ) {
			//set the attendee array to blank on each loop;
			$aee = array();
			if ( isset( $this->_data->reg_obj )
			     && ( $this->_data->reg_obj->attendee_ID() != $att_id )
			     && $this->_single_message
			) {
				continue;
			}
			// is $this->_regs_for_sending present?
			// If so, let's make sure we ONLY generate addressee for registrations in that array.
			if ( ! empty( $this->_regs_for_sending ) && is_array( $this->_regs_for_sending ) ) {
				$regs_allowed = array_intersect_key( array_flip( $this->_regs_for_sending ), $details['reg_objs'] );
				if ( empty( $regs_allowed ) ) {
					continue;
				}
			}
			if (
				in_array( $details['attendee_email'], $already_processed )
				&& apply_filters(
					'FHEE__EE_message_type___attendee_addressees__prevent_duplicate_email_sends',
					true,
					$this->_data,
					$this
				)
			) {
				continue;
			}
			$already_processed[] = $details['attendee_email'];
			foreach ( $details as $item => $value ) {
				$aee[ $item ] = $value;
				if ( $item == 'line_ref' ) {
					foreach ( $value as $event_id ) {
						$aee['events'][ $event_id ] = $this->_data->events[ $event_id ];
					}
				}
				if ( $item == 'attendee_email' ) {
					$aee['attendee_email'] = $value;
				}
				/*if ( $item == 'registration_id' ) {
					$aee['attendee_registration_id'] = $value;
				}/**/
			}
			// note the FIRST reg object in this array is the one
			// we'll use for this attendee as the primary registration for this attendee.
			$aee['reg_obj'] = reset( $this->_data->attendees[ $att_id ]['reg_objs'] );
			$aee['attendees'] = $this->_data->attendees;
			$aee['recipient_id'] = $att_id;
			$aee['recipient_type'] = 'Attendee';
			//merge in the primary attendee data
			$aee = array_merge( $this->_default_addressee_data, $aee );
			$add[] = new EE_Messages_Addressee( $aee );
		}
		return $add;
	}



	/**
	 * @param $event_id
	 * @return int
	 */
	protected function _get_event_admin_id( $event_id ) {
		$event = EEM_Event::instance()->get_one_by_ID( $event_id );
		return $event instanceof EE_Event ? $event->wp_user() : 0;
	}


}
//end EE_message_type class
