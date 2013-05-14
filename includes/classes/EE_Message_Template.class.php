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
 * @version		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * EE_Message_Template class
 *
 *
 * @package		Event Espresso
 * @subpackage	includes/classes/EE_Message_Template.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Message_Template {

	/**
	 * Template ID
	 * primary key
	 * 
	 * @access private
	 * @var int
	 */
	private $_MTP_ID = FALSE;
	
	/**
	 * Group ID
	 * 
	 * @access private
	 * @var int
	 */
	private $_GRP_ID = FALSE;

	/**
	 * Event ID
	 * 
	 * @access private
	 * @var int
	 */
	private $_EVT_ID = FALSE;

	/**
	 * User ID (user who created template)
	 * 
	 * @access private
	 * @var int
	 */
	private $_MTP_user_id = FALSE;

	/**
	 * Messenger reference 
	 * 
	 * @access private
	 * @var string
	 */
	private $_MTP_messenger = NULL;

	/**
	 * Message Type
	 * 
	 * @access private
	 * @var string
	 */
	private $_MTP_message_type = NULL;

	/**
	 * Each context in group
	 * This will hold an array of templates indexed by context. 
	 * 
	 * @access private
	 * @var array
	 */
	private $_contexts = array();


	/**
	 * Template context
	 * 
	 * @access private
	 * @var string
	 */
	private $_MTP_context = NULL;

	/**
	 * Template field
	 * 
	 * @access private
	 * @var string
	 */
	private $_MTP_template_field = NULL;

	/**
	 * template content
	 * 
	 * @access private
	 * @var string
	 */
	private $_MTP_content = NULL;

	/**
	 * holds count of active contexts.
	 * 
	 * @access private
	 * @var boolean
	 */
	private $_is_active_count = FALSE;

	/**
	 * is template global?
	 * 
	 * @access private
	 * @var boolean
	 */
	private $_MTP_is_global = FALSE;



	/**
	 * is template active?
	 *
	 * @access private
	 * @var boolean
	 */
	private $_MTP_is_active = TRUE;

	/**
	 * count of contexts that override (per group).
	 * 
	 * @access private
	 * @var boolean
	 */
	private $_is_override_count = FALSE;

	/**
	 * count of trashed contexts (per group)
	 * 
	 * @access private
	 * @var boolean
	 */
	private $_is_trashed_count = FALSE;

	/**
	 * Message Template constructor
	 * 
	 * @access public
	 * @param array $template_group This is an array of the grouped template object that get's processed and verified.
	 * @return void
	 */
	public function __construct($template_group) {
		
		if ( isset($template_group['new_template']) && $template_group['new_template'] ) {
			//let's loop through the included keys first
		 	foreach ( $template_group as $key => $value ) {
		 		if ( $key == 'new_template' )
		 			continue;
		 		$_key = '_' . $key;
		 		$this->$_key = $value;
		 	}
		}

		$this->_GRP_ID = absint($template_group['GRP_ID']);
		$this->_MTP_user_id = absint($template_group['MTP_user_id']);
		$this->_MTP_messenger = wp_kses_post(strtolower($template_group['MTP_messenger']));
		$this->_MTP_message_type = wp_kses_post(strtolower($template_group['MTP_message_type']));
		$this->_EVT_ID = absint($template_group['EVT_ID']);
		$this->_contexts = (array) $template_group['templates'];
		$this->_MTP_is_global = (bool) $template_group['MTP_is_global'];
		$this->_MTP_is_active = (bool) $template_group['MTP_is_active'];

		//initialize group counts
		$this->_is_active_count = 0;
		$this->_is_override_count = 0;
		$this->_is_trashed_count = 0;
		$group_counts = array_fill_keys( array('total_count', 'MTP_is_override', 'MTP_deleted'), 0);

		foreach ( $this->_contexts as $context => $template_fields ) {
			$context = wp_strip_all_tags(strtolower($context) );
			foreach ( $template_fields as $key => $value ) {
				$group_counts['total_count']++;
				$bool_array = array('MTP_is_global');
				$bool_null_array = array('MTP_is_override', 'MTP_deleted');

				
				if ( in_array( $key, $bool_array) ) {
					$template_fields[$key] = absint( $value ) ? TRUE : FALSE;
					if ( $template_fields[$key] && isset($group_counts[$key]) ) {
						$group_counts[$key]++;
					}
				} else if ( in_array( $key, $bool_null_array ) ) {
					$template_fields[$key] = $value != NULL ? absint($value ) : FALSE;
					if ( $template_fields[$key] && isset($group_counts[$key]) ) {
						$group_counts[$key]++;
					}
				} else if ( is_array($value) ) {
					$value['MTP_ID'] = absint($value['MTP_ID']);
					$value['content'] = is_array($value['content']) ? array_map('wp_kses_post', $value['content'] ) : wp_kses_post($value['content']);
					$template_fields[$key] = $value;
				} else {
					continue;
				}
			}
			
			$this->_contexts[$context] = $template_fields;
			$this->_is_active_count = $group_counts['total_count'] - $group_counts['MTP_deleted'];
			$this->_is_override_count = $group_counts['MTP_is_override'];
			$this->_is_trashed_count = $group_counts['MTP_deleted'];
		}

		//load Message Template Model file
		//todo: why is this getting loaded here?
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Message_Template.model.php');
	}

	public function set_message_type( $message_type = FALSE ) {
		if ( !$message_type ) {
			throw new EE_Error( __('Missing required value for the message_type parameter', 'event_espresso') );
		}

		$this->_MTP_message_type = wp_strip_all_tags( strtolower($message_type) );
		return true;
	}

	public function set_messenger ( $messenger = FALSE ) {
		if ( !$messenger ) {
			throw new EE_Error(  __('Missing required value for the messenger parameter', 'event_espresso') );
		}

		$this->_MTP_messenger = wp_strip_all_tags( str_to_lower($messenger) );
		return true;
	}

	public function set_group_template_id ( $GRP_ID = FALSE ) {
		if ( !$GRP_ID ) {
			throw new EE_Error( __('Missing required value for the message template group id', 'event_espresso') );
		}

		$this->_GRP_ID = absint($GRP_ID);
		return true;
	}

	/**
	 * sets up an array of contexts that we're working with
	 * @param array $context 
	 */
	public function set_context ( $context = array() ) {
		if ( empty($context) ) {
			throw new EE_Error( __('Missing required values for the message template context', 'event_espresso') );
		}

		//make sure given $context is in an array (even if there is only one context sent along).
		$context = (array) $context;

		$this->_MTP_context = array_map(array(&$this, '_clean_context'), $context);
		return true;
	}

	//todo: add more setters as needed.  Not sure we'll need them all right now.
	
	/**
	 * save to db (one template field = 1 row)
	 * 
	 * @access private
	 * @param  array $where_cols_n_values  
	 * @return bool true on success false on fail
	 */
	private function _save_to_db( $where_cols_n_values = array() ) {
		$MODEL = EEM_Message_Template::instance();

		$i = 0;
		foreach ( $this->_contexts as $context => $template_types ) {
			if ( isset($where_cols_n_values['MTP_context'] ) && in_array($context, $where_cols_n_values['MTP_context'] ) )
				continue;
			//we have to loop through the template_types too!
			foreach ( $template_types as $template_type => $data ) {
				//first data that is the same for all items within the contexts in the template group.
				$set_column_values[$i] = array(
					'GRP_ID' => $this->_GRP_ID,
					'MTP_messenger' => $this->_MTP_messenger,
					'MTP_message_type' => $this->_MTP_message_type,
					'MTP_user_id' => $this->_MTP_user_id,
					'EVT_ID' => $this->_EVT_ID,
					'MTP_context' => $context,
					'MTP_is_active' => $this->_MTP_is_active
				);

				//next data for this template type
				$non_template_types = array( 'MTP_is_global', 'MTP_is_override', 'MTP_deleted');
				if ( !in_array($template_type, $non_template_types) ) {
					$set_column_values[$i]['MTP_template_type'] = $template_type;
					$set_column_values[$i]['MTP_ID'] = $data['MTP_ID'];
					$set_column_values[$i]['MTP_content'] = $data['content'];
				} else {
					$set_column_values[$i][$template_type] = $data;
				}
				$i++;
			}
		}

		foreach ( $set_column_values as $set_columns ) {
			$new_where_cols_n_values = array('MTP_ID' => $set_columns['MTP_ID']);
			if ( !empty($new_where_cols_n_values['MTP_ID']) ){
				$results[$set_columns['MTP_template_type']] = $MODEL->update ( $set_columns, $new_where_cols_n_values );
			} else {
				$results[$set_columns['MTP_template_type']] = $MODEL->insert ( $set_columns );
			}
		}

		return $results;
	}

	/**
	*	update existing db record
	*
	* 	@access	public
	* 	@todo this may not work as is.  I have to see how the method gets used first (i.e. how is the object setup).
	*/
	public function update() {
		return $this->_save_to_db( array( 'MTP_context' => $this->_MTP_context ) );
	}

	/**
	* insert new db record
	*
	* @access		public
	* @todo this may not work as is.  I have to see how the method get's used first (i.e. how is the object setup).
	*/
	public function insert() {
		return $this->_save_to_db();
	}

	/**
	 * _clean_context
	 * used with php array_map when context names are in an array to make sure they are formatted correctly
	 * 
	 * @access private
	 * @param  string $context 
	 * @return string          formatted value
	 */
	private function _clean_context($context) {
		$context = wp_strip_all_tags( str_to_lower( $context ) );
		return $context;
	}

	/**
	 * get Group ID
	 * @access public
	 * @return int
	 */
	public function GRP_ID() {
		return $this->_GRP_ID;
	}

	/**
	 * get Event ID
	 * @access public
	 * @return int 
	 */
	public function event() {
		return $this->_EVT_ID;
	}


	/**
	 * this returns the event_name for the event attached to the group
	 *
	 * @access public
	 * @return string
	 */
	public function event_name() {
		if ( empty($this->_EVT_ID) ) return;

		global $wpdb;
		$evt_id = absint($this->_EVT_ID);
		$tablename = $wpdb->prefix . 'events_detail';
		$query = "SELECT event_name FROM {$tablename} WHERE id = %d";
		$event_name = $wpdb->get_var( $wpdb->prepare($query, $evt_id) );
		return $event_name;
	}

	/**
	 * get User ID
	 * @access public
	 * @return int
	 */
	public function user() {
		return $this->_MTP_user_id;
	}

	/**
	 * get Message Messenger
	 * @access public
	 * @return string
	 */
	public function messenger() {
		return $this->_MTP_messenger;
	}


	/**
	 * get Message Messenger OBJECT
	 *
	 * @access public
	 * @return object Messenger Object for the given messenger
	 */
	public function messenger_obj() {
		$ref = ucwords( str_replace( '_', ' ', $this->_MTP_messenger ) );
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
		return $this->_MTP_message_type;
	}



	/**
	 * get Message type OBJECT
	 *
	 * @access public
	 * @return object  Message Type object for the given message type
	 */
	public function message_type_obj() {
		$ref = ucwords( str_replace( '_', ' ', $this->_MTP_message_type ) );
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


	/**
	 * get context templates
	 * This is an array of templates within each context. The array also contains the individual template ids, boolean values etc.
	 * 
	 * @access public
	 * @return array
	 */
	public function context_templates() {
		return $this->_contexts;
	}

	/**
	 * get current contexts
	 * This is an array of contexts (just the context names) that have been saved (or to save/update) - i.e. currently active.
	 * 
	 * @access public
	 * @return array
	 */
	public function contexts() {
		return $this->_MTP_context;
	}


	/**
	 * This returns the set context array configured in the message type object
	 *
	 * @access public
	 * @return array array of contexts and their configuration.
	 */
	public function contexts_config() {
		$obj = $this->message_type_obj();
		return $obj->get_contexts();
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
	 * get number of trashed contexts
	 * 
	 * @access  public
	 * @return int count of trashed context templates in this template group
	 */
	public function is_trashed_count() {
		return $this->_is_trashed_count;
	}

	/**
	 * get number of override contexts
	 * @return int count of context templates in template group that are marked override (i.e. they will override any custom event templates setup)
	 */
	public function is_override_count() {
		return $this->_is_override_count;
	}

	/**
	 * get number of active contexts
	 * @return int count of context templates in template group that are active.
	 */
	public function is_active_count() {
		return $this->_is_active_count;
	}

	/**
	 * this returns if the template group is global
	 * @return boolean true if it is, false if it isn't
	 */
	public function is_global() {
		return $this->_MTP_is_global;
	}



	/**
	 * this returns if the template group is active (i.e. turned "on" or not)
	 * @return boolean true if it is, false if it isn't
	 */
	public function is_active() {
		return $this->_MTP_is_active;
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


	/**
	 *		@ override magic methods
	 *		@ return void
	 */
	public function __get($a) { return FALSE; }
	public function __set($a,$b) { return FALSE; }
	public function __unset($a) { return FALSE; }
	public function __clone() { return FALSE; }
	public function __wakeup() { return FALSE; }

}