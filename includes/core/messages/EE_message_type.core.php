<?php 
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license				http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	3.2
 *
 * ------------------------------------------------------------------------
 *
 * EE_message_type class
 *
 * Abstract class for message types. 
 * Different types can be setup by extending this class and adding them to the /includes/core/messages/types' directory. View examples there.
 *
 * @package			Event Espresso
 * @subpackage	includes/core/messages
 * @author				Darren Ethier, Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
abstract class EE_message_type extends EE_Base {
	
	/** DETAILS PROPERTIES **/
	/** 
	 * The following are used to hold details on the type for reference (i.e. on admin screens)
	 */
	public $name;
	public $description;


	/**
	 * This is an array describing the ui facing labels that will be used whenever the messenger is referenced in the ui
	 *
	 * array(
	 * 	'singular' => __('something'),
	 * 	'plural' => __('somethings')
	 * )
	 * 
	 * @var array
	 */
	public $label;
	

	/**
	 * This property when set will hold the slugs of all EE admin pages that we will need to retrieve fields for (and used to determine which callback method to call from the childclass)
	 *
	 * structure should be
	 * array(
	 * 'page_action' => true
	 * )
	 * @var array
	 */
	public $_admin_registered_pages = array();

	/**
	 * there are certain template fields that are global across all messengers.  This will hold the default content for those global template fields that will be added 
	 * @var array
	 */
	protected $_default_field_content = array();

	/**
	 * message type child classes will set what contexts are associated with the message type via this array.
	 * format:
	 * array(
	 * 'context' => array(
	 * 		'label' => __('Context Label', 'event_espresso'),
	 * 		'description' => __('Context description (for help popups)', 'event_espresso')
	 * 	));
	 * @var array
	 */
	protected $_contexts = array();



	/**
	 * This property is used to define what the display label will be for contexts (eg. "Recipients", "Themes" etc.)
	 * Format:
	 * array( 'label' => 'something', 'plural' => 'somethings', 'description' => 'something' );
	 * @var array
	 */
	protected $_context_label;

	
	/** MESSAGE ASSEMBLING PROPERTIES **/	

	/**
	 * This parameter simply holds all the message objects for retrieval by the controller and sending to the messenger.
	 * @var array of message objects.
	 */
	public $messages = array();

	/**
	 * The following holds the templates that will be used to assemble the message object for the messenger.
	 * @var array
	 */
	protected $templates;
	

	/** OTHER INFO PROPERTIES **/
	/**
	 * This will hold the count of the message objects in the messages array. This could be used for determining if batching/queueing is needed.
	 * @var int
	 */
	protected $count = 0;

	/**
	 * This will hold the active messenger object that is passed to the type so the message_type knows what template files to process.  IT is possible that the active_messenger sent along actually doesn't HAVE a template (or maybe turned off) for the given message_type.
	 * @var object
	 */
	protected $active_messenger; 

	/**
	 * This will hold the shortcode_replace instance for handling replacement of shortcodes in the various templates
	 * @var object
	 */
	protected $_shortcode_replace;

	/**
	 * This will hold the EEM_message_templates model for interacting with the database and retrieving templates.
	 * @var object
	 */
	protected $EEM_data;

	/**
	 * holds the gateway object
	 * @var object
	 */
	protected $gateways;

	/**
	 * This holds the data passed to this class from the controller
	 * @var object
	 */
	protected $data;

	/**
	 * This holds any specific fields for holding any settings related to a message type (if any needed)
	 * @var array
	 */
	protected $_admin_settings_fields = array();

	/**
	 * this property will hold any existing setting that may have been set in the admin.
	 * @var array
	 */
	protected $_existing_admin_settings = array();


	/**
	 * this property will hold an array of valid shortcodes for this message type.  This is an array of strings that correspond to defined EE_Shortcode libraries.  For example:
	 * array('transaction', 'event', 'attendee') corresponds to 'EE_Transaction_Shortcodes.lib.php, EE_Event_Shortcodes.lib.php, EE_Attendee_Shortcodes.lib.php';
	 * @var array
	 */
	protected $_valid_shortcodes = array();




	/**
	 * This holds the addressees in an array indexed by context for later retrieval when assembling the message objects.
	 *
	 * @access protected
	 * @var array
	 */
	protected $_addressees = array();




	public function __construct() {
		$this->_set_admin_settings_fields();
		$this->_set_existing_admin_settings();
		$this->_set_default_field_content();
		$this->_set_contexts();
		$this->_set_admin_pages();
		$this->_set_valid_shortcodes();
	}

	/** METHODS **/

	/**
	 * This method simply takes care of setting up message objects and returning them in an array.
	 * 
	 * @access public
	 * @param  array|object $data       Data to be parsed for messenger/message_type
	 * @param  string $active_messenger The active messenger being used
	 * @return void      
	 */
	public function set_messages($data, $active_messenger) {
		//todo: need to move require into registration hook but for now we'll require here.
		require_once EVENT_ESPRESSO_PLUGINFULLPATH . '/helpers/EE_Parse_Shortcodes.helper.php';
		//get shortcode_replace instance- set when _get_messages is called in child...
		$this->_shortcode_replace = EE_Parse_Shortcodes::instance();
		$this->active_messenger = $active_messenger;
		$this->data = $data;
		$this->_get_templates(); //get the templates that have been set with this type and for the given messenger that have been saved in the database.
		$this->_set_default_field_content;
		$this->_set_contexts;
		$this->_init_data();
		$this->_assemble_messages();
		$this->count = count($this->messages);
	}
	



	/**
	 * This sets the _default_field_content property which needs to be defined by child classes.
	 * 
	 * @abstract
	 * @access  protected
	 * @return void
	 */
	abstract protected function _set_default_field_content();


	/**
	 * sets any properties on whether a message type interface shows up on a ee administration page.  Child classes have to define this method but don't necessarily have to set the flags as they will be set to false by default.
	 *
	 * Child classes use this method to set the `_admin_registered_page` property.  That property is to indicate what EE admin pages we have a corresponding callback for in the child class so Message Type fields/content is included on that admin page. 
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _set_admin_pages();




	/**
	 * Child classes must declare the $_valid_shortcodes property using this method.
	 * See comments for $_valid_shortcodes property for details on what it is used for.
	 *
	 * @access protected
	 * @return void
	 */
	abstract protected function _set_valid_shortcodes();





	/**
	 * This returns the array of valid shortcodes for a message type as set by the child in the $_valid_shortcode property.
	 * @return array   an array of valid shortcodes.
	 */
	public function get_valid_shortcodes() {
		return $this->_valid_shortcodes;
	}





	/**
	 * this public method accepts a page slug (for an EE_admin page) and will return the response from the child class callback function if that page is registered via the `_admin_registered_page` property set by the child class.
	 *
	 * * 
	 * @param string $page the slug of the EE admin page
	 * @param array $messengers an array of active message type objects 
	 * @param string $action the page action (to allow for more specific handling - i.e. edit vs. add pages)
	 * @access public
	 * @return void
	 */
	public function get_message_type_admin_page_content($page, $messengers = array(), $action = null) {
		//we can also further refine the context by action (if present).
		if ( !empty($action) ) {
			$page = $page . '_' . $action;
		}

		if ( !isset( $this->_admin_registered_pages[$page]) ) return false; //todo: a place to throw an exception?  We need to indicate there is no registered page so this function is not being called correctly.

		//k made it here so let's call the method
		if ( FALSE === ( $content = call_user_func_array( array( $this, '_get_admin_content_' . $page), array($messengers) ) ) ) {
			return false; //todo this needs to be an exception once we've got exceptions in place.
		}		
		return $content;
	}

	/**
	 * sets the _existing_admin_settings property can be overridden by child classes.  We do this so we only do database calls if needed.
	 *
	 * @access protected
	 * @return void
	 */
	protected function _set_existing_admin_settings() {
		global $espresso_wp_user;
		$active_message_types = get_user_meta($espresso_wp_user, 'ee_active_message_types', true);

		//if there are no setting fields then there won't be any existing admin settings either.
		if ( !isset($active_message_types[$this->name]) && empty($this->_admin_settings_fields) )
			return $this->_existing_admin_settings = NULL;
		
		$this->_existing_admin_settings = isset($active_message_types[$this->name] ) ?  $active_message_types[$this->name]['settings'] : null;

	}

	public function get_existing_admin_settings() {
		// if admin_settings property empty lets try setting it.
		if ( empty( $this->_existing_admin_settings ) && method_exists($this, '_set_existing_admin_settings') )
			$this->_set_existing_admin_settings();

		return property_exists($this,'_existing_admin_settings') ? $this->_existing_admin_settings : null;
	}

	/**
	 * getter that returns the protected admin_settings_fields property
	 * 
	 * @access public
	 * @return array admin settings fields
	 */
	public function get_admin_settings_fields() {
		return $this->_admin_settings_fields;
	}

	/**
	 * _set_contexts
	 * This sets up the contexts associated with the message_type
	 * 
	 * @abstract
	 * @access  protected
	 * @return  void
	 */
	abstract protected function _set_contexts();

	public function get_default_field_content() {
		return $this->_default_field_content;
	}

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
	 * The main purpose of this function is to setup the various parameters within the message_type.  $this->addressees, $this->templates, $this->count, and any extra stuff to the data object that can come from the message_type template options.
	 * Child classes might overwrite this if they aren't expecting EE_Session as the incoming data object.
	 * 
	 * @return void
	 * @access protected
	 */
	protected function _init_data() {
		//assuming the incoming data is the $EE_Session object
		if ( !is_a($this->data, 'EE_Session') ) {
			$msg = sprintf( __('Wrong incoming type for "%s" message_type. Expecting the EE_Session object', 'event_espresso'), $this->label['singular'] );
			throw new EE_Error( $msg );
		}

		$session_stuff = $this->data->get_session_data();
		$this->data = $session_stuff;
		
		if ( is_array($this->data) && empty($this->data) ) {
			$msg = sprintf( __( '"%s" message type incoming data is empty.  There is nothing to work with so why are you bugging me?', 'event_espresso'), $this->label['singular'] );
			throw new EE_Error( $msg );
		}

		$this->_process_data(); //process the data sent

	}



	/**
	 * processes the data object so we get 
	 * @return void
	 */
	protected function _process_data() {

		//setup the initial data
		$this->_setup_data();

		//process addressees for each context.  Child classes will have to have methods for each context defined to handle the processing of the data object within them
		foreach ( $this->_contexts as $context ) {
			$xpctd_method = '_' . $context . '_adressees';

			if ( !method_exists( $this, $xpctd_method ) )
				throw new EE_Error( sprintf( __('The data for $1%s message type cannot be prepared because there is no set method for doing so.  The expected method name is "$2%s" please doublecheck the $1%s message type class and make sure that method is present', 'event_espresso'), $this->label['singular'], $expctd_method) );
				$this->_addressees[$context] = call_user_func( array( $this, $xpctd_method ) ); 
		}
	}




	protected function _setup_data() {
		$this->data->billing_info = $this->data['billing_info'];
		$this->data->reg_info = $this->data['cart']['REG'];


		//first let's loop through the events and setup a referenced event_data array (indexed by event_id?)
		if ( isset( $this->data->reg_info['items'] ) && is_array($this->data->reg_info['items'] ) ) {
			foreach ( $this->data->reg_info['items'] as $line_item_id => $event ) {
				$this->data->events[$line_item_id]['ID'] = $event['id'];
				$this->data->events[$line_item_id]['line_ref'] = $line_item_id;
				$this->data->events[$line_item_id]['name'] = $event['name'];
				$this->data->events[$line_item_id]['date'] = $event['options']['date'];
				$this->data->events[$line_item_id]['time'] = date('g:i a', strtotime($event['options']['time']));
				$this->data->events[$line_item_id]['daytime_id'] = $event['options']['dtt_id'];
				$this->data->events[$line_item_id]['price'] = $event['options']['price'];
				$this->data->events[$line_item_id]['price_desc'] = $event['options']['price_desc'];
				$this->data->events[$line_item_id]['pre_approval'] = $event['options']['pre_approval'];
				$this->data->events[$line_item_id]['price_id'] = $event['options']['price_id'];
				$this->data->events[$line_item_id]['meta'] = array_combine($event['meta_keys'], $event['meta_values']);
				$this->data->events[$line_item_id]['line_total'] = $event['line_total'];
				foreach ($event['attendees'] as $att_nmbr => $attendee) {
					$a_index = $attendee['fname'] . '_' . $attendee['lname'];
					//use email to detect if the created index is DIFFERENT from an existing index.  If emails don't match then chances are this is a different person so we'll just create a new index.
					$a_index = ( isset($this->data->attendees[$a_index] ) && (!empty($this->data->attendees[$a_index]['email']) || !empty($attendee['email'] ) ) && $this->data->attendees[$a_index]['email'] != $attendee['email'] ) ? $a_index . '_' . $att_nmbr : $a_index;
					if ( !isset($this->data->attendees[$a_index] ) ) {
						$this->data->attendees[$a_index]['line_ref'] = array($line_item_id);
						foreach ( $attendee as $key => $value ) {
							$this->data->attendees[$a_index][$key] = $value;
						}
						$this->data->attendee[$a_index]['context'] = 'attendee'; //default attendee context.
					} else {
						array_push($this->data->attendees[$a_index]['line_ref'], $line_item_id);
					}
				}
			}
		}

		// load gateways
		if (!defined('ESPRESSO_GATEWAYS')) {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Gateways.model.php');
			$this->gateways = EEM_Gateways::instance();
		}


		if ($this->data->billing_info == 'no payment required') {
			$this->data->billing = null;
		} else {
			// get billing info fields
			$this->data->billing = $this->gateways->set_billing_info_for_confirmation( $this->data->billing_info );

			$total = $this->data['_cart_grand_total_amount'];
			// add taxes
			if (isset($this->data['tax_totals'])) {
				foreach ($this->data['tax_totals'] as $taxes) {
					$total = $total + $taxes;
				}
			}

			$this->data->taxes = $this->data['taxes'];
			$this->data->txn = $this->data['txn_results'];

			$this->data->billing['total_due'] = $org_options['currency_symbol'] . number_format($total, 2);
		}

	}





	/**
	 * get and set the templates for the type and messenger from the database
	 * @return void
	 * @access protected
	 */
	protected function _get_templates() {
		$current_templates = $this->active_messenger->active_templates;
		$has_event_template = false;
		$event_id = null;

		//in vanilla EE we're assuming there's only one event.  Let's get that.  TODO: we'll need to provide a way for addons (such as MER) to account for multiple events (or maybe just hardcode the posibility of multiple events?  This needs reworked regardless as it will only take the first even it finds in the registration and process the notification for that event using that event's template)
		foreach ( $this->data->events as $event ) {
			$event_id = $event['ID'];
			break;
		}

		if ( isset($current_templates) ) {
			if ( !empty($event_id) ) {
				foreach ( $current_templates as $template_object ) {
					$has_event_template = $template_object->event() == $event_id ? true : false;
				}
			}

			foreach ( $current_templates as $template_object ) {
				if ( $this->name == $template_object->message_type() ) {
					$templates = $template_object->context_templates();
					foreach ( $templates as $context => $template_fields ) {
						foreach ( $template_fields as $template_field => $value ) {
								if ( is_array($value ) ) {
									if ( ($template_object->event() != $event_id && !$template_fields['MTP_is_override'] && $has_event_template) || !$has_event_template )
										continue;
									$this->templates[$template_field][$context] = $value['content'];
								}
						}
					}
				}
			}
		}
	}

	/**
	 * This function assembles the $messages array which will contain the message objects.
	 * @return void
	 * @access protected
	 */
	protected function _assemble_messages() {
		foreach ( $this->data->addressees as $receiver ) {
			$this->messages[] = $this->_setup_message_object($receiver);
		}
	}
	
	/**
	 * This function setups up and returns the message object
	 * 
	 * @return void
	 * @access protected
	 * 
	 */
	protected function _setup_message_object($receiver) {
		$message = new stdClass();

		//get what shortcodes are supposed to be used
		$mt_shortcodes = $this->_valid_shortcodes;
		$m_shortcodes = $this->active_messenger->get_valid_shortcodes();
		$valid_shortcodes = array_merge($m_shortcodes, $mt_shortcodes);
		$valid_shortcodes = array_unique($valid_shortcodes);
		
		foreach ( $this->templates as $template_type => $context ) {
			if ( isset( $this->templates[$template_type][$receiver->context] ) ) {
				$message->$template_type = $this->_shortcode_replace->parse_message_template($this->templates[$template_type][$receiver->context], $this->data, $valid_shortcodes);
			}
		}
		return $message;
	}	
} 
//end EE_message_type class