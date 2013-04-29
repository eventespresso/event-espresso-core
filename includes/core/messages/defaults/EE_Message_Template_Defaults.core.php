<?php

if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license		http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link			http://www.eventespresso.com
 * @ version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Message_Template_Defaults class
 *
 * This class is the parent class for default message template contents.  Children classes follow a certain naming format (i.e. /email/EE_Messages_Email_Payment_Defaults.class.php) and they simply serve the function of defining defaults for that messenger/message_type combination when global templates are generated.
 *
 * @abstract
 * @package		Event Espresso
 * @subpackage	includes/core/messages/defaults
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
abstract class EE_Message_Template_Defaults extends EE_Base {


	/**
	 * These properties just hold the name for the Messenger and Message Type (defined by child classes).  These are used for retrieving objects etc.
	 * @var [type]
	 */
	protected $_m_name;
	protected $_mt_name;




	/**
	 * holds the messenger object
	 *
	 * @access protected
	 * @var object
	 */
	protected $_messenger;



	/**
	 * holds the message type object
	 *
	 * @access protected
	 * @var object
	 */
	protected $_message_type;


	
	/**
	 * holds the fields used (this is retrieved from the messenger)
	 *
	 * @access protected
	 * @var array
	 */
	protected $_fields;




	/**
	 * holds the assembled template (with defaults) for creation in the database
	 *
	 * @access protected
	 * @var array
	 */
	protected $_templates;




	/**
	 * holds the contexts used (this is retrieved from the message type)
	 *
	 * @access protected
	 * @var array
	 */
	protected $_contexts;





	/**
	 * This will be an array of defaults in the format:
	 *
	 * array(
	 * 		'm' => array(), //array of messenger defaults
	 * 		'mt' => array(), //array of messagetype defaults.
	 * )
	 * @var array
	 */
	protected $_defaults;





	/**
	 * This holds the EE_Messages object
	 * @var object
	 */
	protected $_EE_MSG;




	/**
	 * This holds the Messages Model
	 * @var object
	 */
	protected $_EEM_data;



	/**
	 * constructor
	 * @param EE_Messages $messages the EE_Messages object.
	 *
	 * @access public
	 * @return void
	 */
	public function __construct( EE_Messages $messages ) {
		$this->_EE_MSG = $messages;

		//set the model object
		$this->_EEM_data = EEM_Message_Template::instance();
		
		$this->_set_props();

		//make sure required props have been set
		if ( empty( $this->_m_name) || empty( $this->_mt_name ) ) {
			$msg[] = __('Message Templates cannot be generated because the Messenger and Message Types haven\'t been defined for the generator.', 'event_espresso');
			$msg[] = __('You need to set the "$m_name" and "$mt_name" properties', 'event_espresso');
			throw new EE_Error( implode( '||', $msg ) );
		}

		$this->_init();
	}


	/**
	 * Child classes define the following properties:
	 * $m_name: messenger name
	 * $mt_name: message type name
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _set_props();



	/**
	 * Child classes can make modifications to the _templates property using this method.  If no changes are necessary then child classes can just set an empty method.
	 *
	 * @access protected
	 * @return void 
	 */
	abstract protected function _change_templates( $evt_id, $is_global );




	/**
	 *	Setup the _template_data property.
	 * 
	 * This method sets the _templates property array before templates are created.
	 *
	 * @access protected
	 * @param int $evt_id will hold the event id if this is for an event
	 * @param bool $is_global indicate if this is a global template (true) or not (false)
	 * @return void 
	 */
	final function _set_templates( $evt_id, $is_global ) {

		//first are we setting up templates after messenger activation? If so then we need to get defaults from the messenger
		if ( empty($evt_id) && $is_global ) {
			//setup templates array
			foreach ( $this->_contexts as $context => $details ) {
				foreach ( $this->_fields as $field => $field_type ) {
					if ( $field !== 'extra' )
						$this->_templates[$context][$field] = ( isset($this->_defaults['mt'][$field][$context]) ? maybe_serialize($this->_defaults['mt'][$field][$context]) : maybe_serialize($this->_defaults['m'][$field]) );
				}
			}

		} else if ( !empty($evt_id) ) {
			//k we're setting up a custom event template so let's just copy what's currently in the active global template for this messenger and message_type
			//first let's get all templates for this messenger
			$all_templates = $this->_EEM_data->get_all_message_templates_by_messenger($this->_messenger->name);
			/*global $wpdb;
			print_r($wpdb->last_query);
			var_dump($all_templates);/**/
			foreach ( $all_templates as $template_object ) {
				$mt = $template_object->message_type();
				$e_id = $template_object->event();
				if ( $this->_message_type->name == $mt && empty($e_id) ) {
					$context_templates = $template_object->context_templates();
					foreach ( $this->_contexts as $context => $details ) {
						foreach ( $this->_fields as $field => $field_type ) {
							if ( $field !== 'extra' ) {
								$this->_templates[$context][$field] = ( isset($context_templates[$context][$field] ) ) ? $context_templates[$context][$field]['content'] : '';
								$this->_templates[$context][$field] = (!is_serialized($this->_templates[$context][$field]) ) ? maybe_serialize($this->_templates[$context][$field]) : $this->_templates[$context][$field];
							}
						}
					}
				}
			}
			
		}
	}




	/**
	 * initializes all required properties
	 *
	 * @final
	 * @access private
	 * @return void
	 */
	final private function _init() {
		$active_messengers = $this->_EE_MSG->get_active_messengers();
		$active_message_types = $this->_EE_MSG->get_installed_message_types();

		//check if messenger is active
		if ( !isset($active_messengers[$this->_m_name] ) ) {
			$msg[] = __('Message Templates cannot be generated because the given messenger is not active', 'event_espresso');
			$msg[] = sprintf( __('The "$_m_name" property has "%s" as it\'s value.  Check the spelling and make sure it matches an available messenger', 'event_espresso'), $this->_m_name );
			throw new EE_Error( implode( '||', $msg ) );
		}

		//check if message type is installed
		if ( !isset($active_messengers[$this->_m_name] ) ) {
			$msg[] = __('Message Templates cannot be generated because the given message type is not installed', 'event_espresso');
			$msg[] = sprintf( __('The "$_mt_name" property has "%s" as it\'s value.  Check the spelling and make sure it matches an available message type', 'event_espresso'), $this->_mt_name );
			throw new EE_Error( implode( '||', $msg ) );
		}

		$this->_messenger = $active_messengers[$this->_m_name];
		$this->_message_type = $active_message_types[$this->_mt_name];
		$this->_fields = $this->_messenger->get_template_fields();
		$this->_contexts = $this->_message_type->get_contexts();
		$this->_valid_shortcodes = $this->_get_valid_shortcodes();
		$this->_defaults = array(
			'm' => $this->_messenger->get_default_field_content(),
			'mt' => $this->_message_type->get_default_field_content()
			);
	}




	/**
	 * This just gets the list of valid shortcodes from the messenger and message type and returns them
	 *
	 * @access private
	 * @return array an array of valid shortcodes => $labels
	 */
	private function _get_valid_shortcodes() {
		$m_shortcodes = $this->_messenger->get_valid_shortcodes();
		$mt_shortcodes = $this->_message_type->get_valid_shortcodes();

		//we don't need the actual shortcodes here.  We just need the array of valid shortcodes for each context and field.
		$valid_shortcodes = array_merge( $m_shortcodes, $mt_shortcodes );

		return $valid_shortcodes;
	}
	
	

	/**
	 * public facing create new templates method
	 * @param  int $evt_id    event_id (if event specific)
	 * @param  bool $is_global whether global template (true) or not (false)
	 * @access public
	 * @return mixed (array|bool)            success array or false.
	 */
	public function create_new_templates( $evt_id, $is_global ) {
		return $this->_create_new_templates( $evt_id, $is_global );
	}





	/**
	 * private method that handles creating new default templates
	 * @param  int $evt_id    event_id ( if event specified )
	 * @param  bool $is_global whether global template (true) or not (false)
	 * @return mixed (array|bool)            success array or false.
	 */
	private function _create_new_templates( $evt_id, $is_global ) {

		$this->_set_templates( $evt_id, $is_global );

		//allow for child classes to override.
		$this->_change_templates( $evt_id, $is_global );

		//necessary properties are set, let's save the default templates

		$main_template_data =  array(
			'MTP_messenger' => $this->_messenger->name,
			'MTP_message_type' => $this->_message_type->name,
			'EVT_ID' => $evt_id,
			'MTP_is_override' => 0,
			'MTP_deleted' => 0,
			'MTP_is_global' => $is_global,
			'MTP_user_id' => get_current_user_id(),
			'MTP_is_active' => 1,
			);

		//let's insert the above and get our GRP_ID, then reset the template data array to just include the GRP_ID
		$results = $this->_EEM_data->insert( $main_template_data );
		
		$template_data = $results ? array( 'GRP_ID' => $results ) : FALSE;

		if ( ! $template_data ) return $results;

		foreach ( $this->_contexts as $context => $details ) {
			foreach ( $this->_fields as $field => $field_type ) {
				if ( $field != 'extra' ) {
					$template_data['MTP_context'] = $context;
					$template_data['MTP_template_field'] = $field;
					$template_data['MTP_content'] = $this->_templates[$context][$field];
					$MTP = $this->_EEM_data->insert($template_data);
					if ( !$MTP ) {
						EE_Error::add_error( sprintf(__('There was an error in saving new template data for %s messenger, %s message type, %s context and %s template field.', 'event_espresso'), $this->_messenger->name, $this->_message_type->name, $context, $field), __FILE__, __FUNCTION__, __LINE__  );
						return false;
					}
				}
			}
		}

		$success_array = array(
			'GRP_ID' => $results,
			'EVT_ID' => $main_template_data['EVT_ID'],
			'MTP_context' => key($this->_contexts)
		);	

		return $success_array;
	}


} //end EE_Message_Template_Defaults class
 