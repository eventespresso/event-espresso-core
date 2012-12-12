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
		$this->_MTP_messenger = wp_strip_all_tags(strtolower($template_group['MTP_messenger']));
		$this->_MTP_message_type = wp_strip_all_tags(strtolower($template_group['MTP_message_type']));
		$this->_EVT_ID = absint($template_group['EVT_ID']);
		$this->_contexts = (array) $template_group['templates'];
		$this->_MTP_is_global = (bool) $template_group['MTP_is_global'];

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
					$value['content'] = is_array($value['content']) ? array_map('wp_strip_all_tags', $value['content'] ) : wp_strip_all_tags($value['content']);
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
			new WP_Error(__('missing_parameter_value', 'event_espresso'), __('Missing required value for the message_type parameter', 'event_espresso') . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__) );
		}

		$this->_MTP_message_type = wp_strip_all_tags( strtolower($message_type) );
		return true;
	}

	public function set_messenger ( $messenger = FALSE ) {
		if ( !$messenger ) {
			new WP_Error(__('missing_parameter_value', 'event_espresso'), __('Missing required value for the messenger parameter') . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__) );
		}

		$this->_MTP_messenger = wp_strip_all_tags( str_to_lower($messenger) );
		return true;
	}

	public function set_group_template_id ( $GRP_ID = FALSE ) {
		if ( !$GRP_ID ) {
			new WP_Error(__('missing_parameter_value', 'event_espresso'), __('Missing required value for the message template group id') . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__) );
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
			new WP_Error(__('missing_parameter_value', 'event_espresso'), __('Missing required values for the message template context') . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__) );
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
					'MTP_context' => $context
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
	* 	@todo this may not work as is.  I have to see how the method get's used first (i.e. how is the object setup).
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
	 * get Message Type
	 * 
	 * @access public
	 * @return string
	 */
	public function message_type() {
		return $this->_MTP_message_type;
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
	 *		@ override magic methods
	 *		@ return void
	 */
	public function __get($a) { return FALSE; }
	public function __set($a,$b) { return FALSE; }
	public function __unset($a) { return FALSE; }
	public function __clone() { return FALSE; }
	public function __wakeup() { return FALSE; }

}