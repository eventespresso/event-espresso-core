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
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Messages_Base class
 *
 * Abstract class for setting up messengers and message types parents.
 *
 * @package			Event Espresso
 * @subpackage		includes/core/messages/EE_Messages_Base.core.php
 * @author			Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
abstract class EE_Messages_Base extends EE_Base {

	/** DETAILS PROPERTIES **/
	/**
	 * The following are used to hold details on the type for reference (i.e. on admin screens) and also used by the EE_message_type object to figure out where to get template data.
	 */
	public $name;
	public $description;
	protected $_messages_item_type; //messenger OR message_type?


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
	public $admin_registered_pages = array();




	/**
	 * there are certain template fields that are global across all messengers.  This will hold the default content for those global template fields that will be added
	 * @var array
	 */
	protected $_default_field_content = array();






	/**
	 * this property holds any specific fields for holding any settings related to a messenger (if any needed)
	 * @var array
	 */
	protected $_admin_settings_fields = array();





	/**
	 * this property will hold any existing settings that may have been set in the admin.
	 * @var array
	 */
	protected $_existing_admin_settings = array();





	/**
	 * this property will hold an array of valid shortcodes for this message type and messengers.
	 * #For Message Types:
	 * This is an array of strings that correspond to defined EE_Shortcode libraries and per context.  For example:
	 * array( 'admin' => array('transaction', 'event', 'attendee') )corresponds to 'EE_Transaction_Shortcodes.lib.php, EE_Event_Shortcodes.lib.php, EE_Attendee_Shortcodes.lib.php' fo the admin context;
	 *
	 *
	 * #For Messengers:
	 * For example:
	 * array('subject' => array('transaction', 'event', 'attendee')) corresponds to 'EE_Transaction_Shortcodes.lib.php, EE_Event_Shortcodes.lib.php, EE_Attendee_Shortcodes.lib.php' for the 'subject' field;
	 * NOTE:  by default, with messengers, if the valid shortcodes for a field is left blank,  that field will inherit whatever are set as valid shortcodes by message_type.  This is so messenger can set specific valid codes for fields and leave other valid shortcodes up to the message type matched with the messenger.
	 *
	 * @access protected
	 * @var array
	 */
	protected $_valid_shortcodes = array();





	public function __construct() {
		$this->_set_admin_settings_fields();
		$this->_set_existing_admin_settings();
		$this->_set_valid_shortcodes();
		$this->_set_admin_pages();
		$this->_set_default_field_content();

		//load helper
		EE_Registry::instance()->load_helper('MSG_Template');
	}





	/**
	 * sets the _admin_settings_fields property which needs to be defined by child classes.
	 * You will want to set the _admin_settings_fields properties as a multi-dimensional array with the following format
	 * array(
	 * 		{field_name - also used for setting index} => array(
	 * 			'field_type' => {type of field: 'text', 'textarea', 'checkbox'},
	 * 			'value_type' => {type of value: 'string', 'int', 'array', 'bool'},
	 * 			'required' => {bool, required or not},
	 * 			'validation' => {bool, true if we want validation, false if not},
	 * 			'format' => {%d, or %s},
	 * 			'label' => {label for the field, make sure it's localized},
	 * 			'default' => {default value for the setting}
	 * 		),
	 * );
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _set_admin_settings_fields();





	/**
	 * sets any properties on whether a message type or messenger interface shows up on a ee administration page.  Child classes have to define this method but don't necessarily have to set the flags as they will be set to false by default.
	 *
	 * Child classes use this method to set the `_admin_registered_page` property.  That property is to indicate what EE admin pages we have a corresponding callback for in the child class so Message Type/messenger fields/content is included on that admin page.
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
	 * This sets the _default_field_content property which needs to be defined by child classes.
	 *
	 * @abstract
	 * @access  protected
	 * @return void
	 */
	abstract protected function _set_default_field_content();







	/**
	 * sets the _existing_admin_settings property can be overridden by child classes.  We do this so we only do database calls if needed.
	 *
	 * @access protected
	 * @return void
	 */
	protected function _set_existing_admin_settings( $messenger = NULL ) {
		$active_messengers = EEH_MSG_Template::get_active_messengers_in_db();
		$active_message_types = !empty( $messenger ) ? $active_messengers[$messenger]['settings'][$messenger . '-message_types'] : array();


		$actives = $this->_messages_item_type == 'messenger' ? $active_messengers : $active_message_types;

		$this->_existing_admin_settings = isset($actives[$this->name]['settings'] ) ? $actives[$this->name]['settings'] : null;
	}






	/**
	 * get_existing_admin_settings
	 * (if needed) sets and returns the _existing_admin_settings property.
	 *
	 * @access public
	 * @return array          settings
	 */
	public function get_existing_admin_settings( $messenger = NULL ) {
		// if admin_settings property empty lets try setting it.
		if ( method_exists($this, '_set_existing_admin_settings') && empty( $this->_existing_admin_settings ) )
			$this->_set_existing_admin_settings( $messenger );

		return EEH_Class_Tools::has_property($this, '_existing_admin_settings') ? $this->_existing_admin_settings : null;
	}






	/**
	 * This returns the array of valid shortcodes for a message type or messenger as set by the child in the $_valid_shortcode property.
	 * @return array   an array of valid shortcodes.
	 */
	public function get_valid_shortcodes() {
		$valid_shortcodes = apply_filters( 'FHEE__' . get_class($this) . '__get_valid_shortcodes', $this->_valid_shortcodes, $this );

		//The below filter applies to ALL messengers and message types so use with care!
		$valid_shortcodes = apply_filters( 'FHEE__EE_Messages_Base__get_valid_shortcodes', $valid_shortcodes, $this );
		return $valid_shortcodes;
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
	 * return the default_field_content property
	 *
	 * @access public
	 * @return array
	 */
	public function get_default_field_content() {
		$default = apply_filters( 'FHEE__' . get_class($this) . '__get_default_field_content', $this->_default_field_content, $this );
		//note the below filter will apply to all messengers AND message types.  Use with care.
		$default = apply_filters( 'FHEE__EE_Messages_Base__get_default_field_content', $default, $this );

		return $default;
	}





	/**
	 * this public method accepts a page slug (for an EE_admin page) and will return the response from the child class callback function if that page is registered via the `_admin_registered_page` property set by the child class.
	 *
	 * @param string $page the slug of the EE admin page
	 * @param array $actives an array of active message type (or messenger) objects.
	 * @param string $action the page action (to allow for more specific handling - i.e. edit vs. add pages)
	 * @param array $extra  This is just an extra argument that can be used to pass additional data for setting up page content.
	 * @access protected
	 * @return string $content for page.
	 */
	protected function _get_admin_page_content( $page, $action, $extra, $actives ) {
		//we can also further refine the context by action (if present).
		if ( !empty($action) ) {
			$page = $page . '_' . $action;
		}

		if ( !isset( $this->admin_registered_pages[$page]) )
			return false; //todo: a place to throw an exception?  We need to indicate there is no registered page so this function is not being called correctly.

		//k made it here so let's call the method
		if ( FALSE === ( $content = call_user_func_array( array( $this, '_get_admin_content_' . $page), array($actives, $extra) ) ) ) {
			return false; //todo this needs to be an exception once we've got exceptions in place.
		}
		return $content;
	}

}
