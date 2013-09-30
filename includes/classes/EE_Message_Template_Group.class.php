<?php if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		@link http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing * *
 * @link		http://www.eventespresso.com
 * @version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Message_Template_Group class
 *
 *
 * @package		Event Espresso
 * @subpackage	includes/classes/EE_Message_Template_Group.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Message_Template_Group extends EE_Base_Class {

	/**
	 * Message Template Group id
	 * @var integer
	 */
	protected $_GRP_ID = 0;


	/**
	 * Event ID that the template is for (optional)
	 * @var integer
	 */
	protected $_EVT_ID = 0;



	/**
	 * user who created the message template
	 * @var integer
	 */
	protected $_MTP_user_id = 1;



	/**
	 * What messenger this group is for
	 * @var string
	 */
	protected $_MTP_messenger = '';



	/**
	 * What message type this group is for.
	 * @var string
	 */
	protected $_MTP_message_type = '';




	/**
	 * Flag for indicating if group is global or not.
	 * @var boolean
	 */
	protected $_MTP_is_global = true;




	/**
	 * Flag for indicating if this overrides any event specific settings for the given group
	 * @var boolean
	 */
	protected $_MTP_is_override = false;





	/**
	 * Flag for indicating if this group is deleted or not
	 * @var boolean
	 */
	protected $_MTP_deleted = false;





	/**
	 * Flag for indicating if this template is active or not (in the case where a messenger OR message type is deactivated via message settings)
	 * @var boolean
	 */
	protected $_MTP_is_active = true;



	/**
	 * Related Message Template objects go here
	 * @var EE_Message_Template[]
	 */
	protected $_Message_Template = NULL;




	/**
	 * If this is message tempalte is a non-global template but rather event specific, then this property is for holding the related Event object for the group.
	 * @var EE_Event
	 */
	protected $_Event = NULL;




	public static function new_instance( $props_n_values = array(), $timezone = NULL ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname, $timezone );
		return $has_object ? $has_object : new self( $props_n_values, FALSE, $timezone );
	}


	public static function new_instance_from_db ( $props_n_values = array(), $timezone = NULL ) {
		return new self( $props_n_values, TRUE, $timezone );
	}



	public function set_message_type( $message_type = FALSE ) {
		if ( !$message_type ) {
			throw new EE_Error( __('Missing required value for the message_type parameter', 'event_espresso') );
		}

		$this->set('MTP_message_type', $message_type);
	}



	public function set_messenger ( $messenger = FALSE ) {
		if ( !$messenger ) {
			throw new EE_Error(  __('Missing required value for the messenger parameter', 'event_espresso') );
		}
		$this->set('MTP_messenger', $messenger );
	}




	public function set_group_template_id ( $GRP_ID = FALSE ) {
		if ( !$GRP_ID ) {
			throw new EE_Error( __('Missing required value for the message template group id', 'event_espresso') );
		}

		$this->set('GRP_ID', $GRP_ID );
	}



	/**
	 * get Group ID
	 * @access public
	 * @return int
	 */
	public function GRP_ID() {
		return $this->get('GRP_ID');
	}




	/**
	 * get Event ID
	 * @access public
	 * @return int 
	 */
	public function event() {
		return $this->get('EVT_ID');
	}
	



	/**
	 * this returns the event_name for the event attached to the group
	 *
	 * @access public
	 * @return string
	 */
	public function event_name() {
		if ( empty( $this->_EVT_ID ) ) return '';
		return $this->get_first_related('Event')->get('EVT_name');
	}



	/**
	 * get User ID
	 * @access public
	 * @return int
	 */
	public function user() {
		return $this->get('MTP_user_id');
	}



	/**
	 * get Message Messenger
	 * @access public
	 * @return string
	 */
	public function messenger() {
		return $this->get('MTP_messenger');
	}




	/**
	 * get Message Messenger OBJECT
	 *
	 * @access public
	 * @return object Messenger Object for the given messenger
	 */
	public function messenger_obj() {
		$messenger = $this->messenger();
		$ref = ucwords( str_replace( '_', ' ', $messenger ) );
		$ref = str_replace( ' ', '_', $ref );
		$classname = 'EE_' . $ref . '_messenger';

		if ( !class_exists($classname) ) {
			$msg[] = __('Messenger class loading fail.', 'event_espresso');
			$msg[] = sprintf( __('The class name checked was "%s". Please check the spelling and case of this reference and make sure it matches the appropriate messenger file name (minus the extension) in the "/core/messages/messenger/" directory', 'event_espresso'), $classname );
			throw new EE_Error( implode( '||', $msg ) );
		}

		//made it here so let's instantiate the object and return it.
		$a = new ReflectionClass($classname);
		return $a->newInstance();
	}



	/**
	 * get Message Type
	 * 
	 * @access public
	 * @return string
	 */
	public function message_type() {
		return $this->get('MTP_message_type');
	}




	/**
	 * get Message type OBJECT
	 *
	 * @access public
	 * @return object  Message Type object for the given message type
	 */
	public function message_type_obj() {
		$message_type = $this->message_type();
		$ref = ucwords( str_replace( '_', ' ', $message_type ) );
		$ref = str_replace( ' ', '_', $ref );
		$classname = 'EE_' . $ref . '_message_type';

		if ( !class_exists($classname) ) {
			$msg[] = __('Message Type class loading fail.', 'event_espresso');
			$msg[] = sprintf( __('The class name checked was "%s". Please check the spelling and case of this reference and make sure it matches the appropriate message type file name (minus the extension) in the "/core/messages/message_type/" directory', 'event_espresso'), $classname );
			throw new EE_Error( implode( '||', $msg ) );
		}

		//made it here so let's instantiate the object and return it.
		$a = new ReflectionClass($classname);
		return $a->newInstance();
	}



	public function contexts_config() {
		return $this->message_type_obj()->get_context();
	}



	/**
	 * This returns the context_label for contexts as set in the message type object
	 *
	 * @access public
	 * @return string label for "context"
	 */
	public function context_label() {
		$obj = $this->message_type_obj();
		return $obj->get_context_label();
	}





	/**
	 * this returns if the template group this template belongs to is global
	 * @return boolean true if it is, false if it isn't
	 */
	public function is_global() {
		return $this->get('MTP_is_global');
	}



	/**
	 * this returns if the template group this template belongs to is active (i.e. turned "on" or not)
	 * @return boolean true if it is, false if it isn't
	 */
	public function is_active() {
		return $this->get('MTP_is_active');
	}





	/**
	 * This will return an array of shortcodes => labels from the messenger and message_type objecst associated with this template.
	 * 
	 * @access public
	 * @param string $context what context we're going to return shortcodes for
	 * @param array $fields what fields we're returning valid shortcodes for.  If empty then we assume all fields are to be merged and returned.
	 * @return mixed (array|bool) an array of shortcodes in the format array( '[shortcode] => 'label') OR FALSE if no shortcodes found.
	 */
	public function get_shortcodes( $context, $fields = array() ) {
		$shortcodes = array();

		$messenger = $this->messenger_obj();
		$message_type = $this->message_type_obj();

		$m_shortcodes = $messenger->get_valid_shortcodes();
		$mt_shortcodes = $message_type->get_valid_shortcodes();

		//let's make sure only the valid shortcodes for the given context are returned.  We will merge that with all shortcodes for the given fields.  If $field is empty then we'll just return the shortcodes for all fields
		$valid_shortcodes = isset($mt_shortcodes[$context]) ? $mt_shortcodes[$context] : array();

		if ( empty( $fields ) ) {
			foreach ( $m_shortcodes as $ms ) {
				$valid_shortcodes = array_merge( $valid_shortcodes, $ms );
			}
		} else {
			foreach ( $fields as $field ) {
				$valid_shortcodes = isset( $m_shortcodes[$field] ) ? array_merge( $valid_shortcodes, $m_shortcodes[$field] ) : $valid_shortcodes;
			}
		}


		//let's merge shortcodes and make sure we've got unique refs
		$all_scs = array_unique( $valid_shortcodes );

		//now we can use the assembled array to instantiate the relevant shortcode objects
		$sc_objs = $this->_get_shortcode_objects( $all_scs );

		//great! check to see if sc_objs is empty.  If it is return FALSE. Otherwise we'll go ahead and merge the array of shortcodes and send back.
		if ( empty( $sc_objs ) ) return FALSE;

		foreach ( $sc_objs as $obj ) {
			$shortcodes = array_merge( $shortcodes, $obj->get_shortcodes() );
		}

		return $shortcodes;
	}





	/**
	 * this just returns and array of instantiated shortcode objects given an array of object refs
	 *
	 * @access private
	 * @return array 	an array of EE_Shortcode objects
	 */
	private function _get_shortcode_objects( $sc_refs ) {
		
		$sc_objs = array();

		EE_messages_init::set_autoloaders();

		foreach ( $sc_refs as $shortcode_ref ) {
			$ref = ucwords( str_replace('_', ' ', $shortcode_ref ) );
			$ref = str_replace( ' ', '_', $ref );
			$classname = 'EE_' . $ref . '_Shortcodes';

			if ( !class_exists( $classname ) ) {
				$msg[] = __('Shortcode library loading fail.', 'event_espresso');
				$msg[] = sprintf( __('The class name checked was "%s". Please check the spelling and case of this reference and make sure it matches the appropriate shortcode library file name (minus the extension) in the "/library/shortcodes/" directory', 'event_espresso'), $classname );
				throw new EE_Error( implode( '||', $msg ) );
			}

			$a = new ReflectionClass( $classname );
			$sc_objs[] = $a->newInstance();
		}

		return $sc_objs;
	}


} //end EE_Message_Template_Group class