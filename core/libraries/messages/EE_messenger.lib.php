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
 * EE_messenger class
 *
 * Abstract class for setting up messengers.
 * Different messengers (i.e. email, sms) can be setup by extending this class and adding them to the /includes/core/messages/messengers' directory. View examples there.
 *
 * @package			Event Espresso
 * @subpackage		includes/core/messages
 * @author			Darren Ethier, Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
abstract class EE_messenger extends EE_Messages_Base {



	/**
	 * This property holds the default message types associated with this messenger when it is activated. The values of the array must match a valid message type.
	 * This property gets set by the _set_default_message_types() method.
	 *
	 * @var array
	 */
	protected $_default_message_types = array();



	/**
	 * Holds the configuration for the EE_Messages_Validator class to know how to validated the different fields. Note that the Validator will match each field here with the allowed shortcodes set in the "valid_shortcodes" array for the matched message type context.  So message types don't need to set a $_validator_config property.
	 *
	 * Remember, ALL fields must be declared in this array.  However, an empty value for the field means that the field will accept all valid shortcodes set for the given context in the message type (by default).
	 *
	 * Array should be in this format:
	 *
	 * array(
	 * 	'field_name(i.e.to)' => array(
	 * 		'shortcodes' => array('email'), //an array of shortcode groups (correspond to EE_Shortcodes library class) that are allowed in the field. Typically you can just include $this->_valid_shortcodes['field_name'] as the value here (because they will match).
	 * 		'specific_shortcodes' => array( array('[EVENT_AUTHOR_EMAIL]' => __('Admin Email', 'event_espresso')), //if this index is present you can further restrict the field to ONLY specific shortcodes if an entire group isn't sufficient. Specific shortcodes need to be listed as an array with the index the shortcode and the value = the label.
	 * 		'type' => 'email' //this is the field type and should match one of the validator types (see EE_Messages_Validator::validator() for all the possible types).  If not required you can just leave empty.,
	 * 		'required' => array'[SHORTCODE]') //this is used to indicate the shortcodes that MUST be in the assembled array of shortcodes by the validator in order for this field to be included in validation.  Otherwise the validator will always assign shortcodes for this field (regardless of whether the field settings for the given messenger/message_type/context use the field or not.).. please note, this does NOT mean that the shortcodes listed here MUST be in the given field.
	 * 	)
	 * )
	 *
	 * @var array
	 */
	protected $_validator_config = array();



	/**
	 * This will hold the EEM_message_templates model for interacting with the database and retrieving active templates for the messenger
	 * @var object
	 */
	protected $_EEM_data;



	/**
	 * this property just holds an array of the various template refs.
	 * @var array
	 */
	protected $_template_fields = array();




	/**
	 * This holds an array of the arguments used in parsing a template for the sender.
	 * @var array
	 */
	protected $_template_args = array();






	/**
	 * This property will hold the configuration for any test settings fields that are required for the "test" button that is used to trigger an actual test of this messenger
	 *
	 * @protected
	 * @var array
	 */
	protected $_test_settings_fields = array();







	public function __construct() {
		$this->_EEM_data = EEM_Message_Template_Group::instance();
		$this->_messages_item_type = 'messenger';

		parent::__construct();

		$this->_set_test_settings_fields();
		$this->_set_template_fields();
		$this->_set_default_message_types();
		$this->_set_validator_config();
	}





	/**
	 * _set_template_fields
	 * This sets up the fields that a messenger requires for the message to go out.
	 *
	 * @abstract
	 * @access  protected
	 * @return void
	 */
	abstract protected function _set_template_fields();









	/**
	 * This method sets the _default_message_type property (see definition in docs attached to property)
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _set_default_message_types();











	/**
	 * Child classes must declare the $_validator_config property using this method.
	 * See comments for $_validator_config for details on what it is used for.
	 *
	 * NOTE:  messengers should set an array of valid shortcodes for ALL scenarios.  The corresponding validator class (validators/{messenger}) can be used to restrict only certain shortcodes per template so users cannot add certain shortcodes.
	 *
	 * @access protected
	 * @return void
	 */
	abstract protected function _set_validator_config();




	/**
	 * messengers must define the location of the inline css template to use in final assembled templates.
	 *
	 * This method is also used in the admin backend to set the css for the tinymce editor.
	 *
	 * @access public
	 * @param bool $url if true we return the url to the css, if false, we return the path.
	 * @return string the location of the css file to use for inline css.
	 */
	abstract public function get_inline_css_template( $url = FALSE );






	/**
	 * We just deliver the messages don't kill us!!  This method will need to be modified by child classes for whatever action is taken to actually send a message.
	 * @return void
	 * @todo  at some point we may want to return success or fail so we know whether a message has gone off okay and we can assemble reporting.
	 */
	abstract protected function _send_message();




	/**
	 * We give you pretty previews of the messages!
	 * @return string html body for message content.
	 */
	abstract protected function _preview();









	/**
	 * This just returns the default message types associated with this messenger when it is first activated.
	 *
	 * @access public
	 * @return array
	 */
	public function get_default_message_types() {
		$class = get_class( $this );

		//messenger specific filter
		$default_types = apply_filters( 'FHEE__' . $class . '__get_default_message_types__default_types', $this->_default_message_types, $this );

		//all messengers filter
		$default_types = apply_filters( 'FHEE__EE_messenger__get_default_message_types__default_types', $default_types, $this );
		return $default_types;
	}





	/**
	 * this is just used by the custom validators (EE_Messages_Validator classes) to modify the _validator_config for certain message_type/messenger combos where a context may only use certain shortcodes etc.
	 *
	 * @access public
	 * @param array $new_config Whatever is put in here will reset the _validator_config property
	 */
	public function set_validator_config( $new_config ) {
		$this->_validator_config = $new_config;
	}




	/**
	 * This returns the _validator_config property
	 *
	 * @access public
	 * @return array
	 */
	public function get_validator_config() {
		$class = get_class($this);

		$config = apply_filters( 'FHEE__' . $class . '__get_validator_config', $this->_validator_config, $this );
		$config = apply_filters( 'FHEE__EE_messenger__get_validator_config', $config, $this );
		return $config;
	}




	/**
	 * this public method accepts a page slug (for an EE_admin page) and will return the response from the child class callback function if that page is registered via the `_admin_registered_page` property set by the child class.
	 *
	 * @param string $page the slug of the EE admin page
	 * @param array $message_types an array of active message type objects
	 * @param string $action the page action (to allow for more specific handling - i.e. edit vs. add pages)
	 * @param array $extra  This is just an extra argument that can be used to pass additional data for setting up page content.
	 * @access public
	 * @return string content for page
	 */
	public function get_messenger_admin_page_content( $page, $action = null, $extra = array(), $message_types = array() ) {
		return $this->_get_admin_page_content( $page, $action, $extra, $message_types );
	}







	protected function _get_admin_content_events_edit( $message_types, $extra ) {
		//defaults
		$template_args = array();
		$custom_templates = array();
		$selector_rows = '';

		//we don't need message types here so we're just going to ignore. we do, however, expect the event id here. The event id is needed to provide a link to setup a custom template for this event.
		$event_id = isset( $extra['event'] ) ? $extra['event'] : NULL;

		$template_wrapper_path = EE_LIBRARIES . 'messages/messenger/admin_templates/event_switcher_wrapper.template.php';
		$template_row_path = EE_LIBRARIES . 'messages/messenger/admin_templates/event_switcher_row.template.php';

		//array of template objects for global and custom (non-trashed) (but remember just for this messenger!)
		$global_templates = EEM_Message_Template_Group::instance()->get_all( array( array('MTP_messenger' => $this->name, 'MTP_is_global' => TRUE, 'MTP_is_active' => TRUE ) ) );
		$templates_for_event = EEM_Message_Template_Group::instance()->get_all_custom_templates_by_event( $event_id, array( 'MTP_messenger' => $this->name, 'MTP_is_active' => TRUE ) );
		$templates_for_event = !empty( $templates_for_event ) ? $templates_for_event : array();

		//so we need to setup the rows for the selectors and we use the global mtpgs (cause those will the active message template groups)
		foreach ( $global_templates as $mtpgID => $mtpg ) {
			//verify this message type is supposed to show on this page
			$mtp_obj = $mtpg->message_type_obj();
			$mtp_obj->admin_registered_pages = (array) $mtp_obj->admin_registered_pages;
			if ( ! in_array( 'events_edit', $mtp_obj->admin_registered_pages ) )
				continue;
			$stargs = array();
			$default_value = '';
			$select_values = array();
			$select_values[$mtpgID] = __('Global', 'event_espresso');
			$default_value = array_key_exists( $mtpgID, $templates_for_event ) && ! $mtpg->get('MTP_is_override' ) ? $mtpgID : NULL;

			//if the override has been set for the global template, then that means even if there are custom templates already created we ignore them because of the set override.

			if ( ! $mtpg->get('MTP_is_override' ) ) {
				//any custom templates for this message type?
				$custom_templates = EEM_Message_Template_Group::instance()->get_custom_message_template_by_m_and_mt( $this->name, $mtpg->message_type() );

				foreach( $custom_templates as $cmtpgID => $cmtpg ) {
					$select_values[$cmtpgID] = $cmtpg->name();
					$default_value = array_key_exists( $cmtpgID, $templates_for_event ) ? $cmtpgID : $default_value;
				}
			}

			//if there is no $default_value then we set it as the global
			$default_value = empty( $default_value ) ? $mtpgID : $default_value;

			$edit_url = EEH_URL::add_query_args_and_nonce( array('page' => 'espresso_messages', 'action' => 'edit_message_template', 'id' => $default_value), admin_url('admin.php') );
			$create_url = EEH_URL::add_query_args_and_nonce( array('page' => 'espresso_messages', 'action' => 'add_new_message_template', 'GRP_ID' => $default_value ) );

			$st_args['mt_name'] = ucwords( $mtp_obj->label['singular'] );
			$st_args['mt_slug'] = $mtpg->message_type();
			$st_args['messenger_slug'] = $this->name;
			$st_args['selector'] = EEH_Form_Fields::select_input( 'event_message_templates_relation[' . $mtpgID . ']', $select_values, $default_value, 'data-messenger="' . $this->name . '" data-messagetype="' . $mtpg->message_type() . '"', 'message-template-selector' );

			//note that  message template group that has override_all_custom set will remove the ability to set a custom message template based off of the global (and that also in turn overrides any other custom templates).
			$st_args['create_button'] =  $mtpg->get('MTP_is_override') ? '' : '<a data-messenger="' . $this->name . '" data-messagetype="' . $mtpg->message_type() . '" data-grpid="' . $default_value . '" target="_blank" href="' . $create_url . '" class="button button-small create-mtpg-button">' . __('Create New Custom', 'event_espresso') . '</a>';
			$st_args['edit_button'] = '<a data-messagetype="' . $mtpg->message_type() . '" data-grpid="' . $default_value . '" target="_blank" href="' . $edit_url . '" class="button button-small edit-mtpg-button">' . __('Edit', 'event_espresso') . '</a>';
			$selector_rows .= EEH_Template::display_template( $template_row_path, $st_args, TRUE );
		}

		$template_args['selector_rows'] = $selector_rows;
		return EEH_Template::display_template( $template_wrapper_path, $template_args, TRUE );
	}






	/**
	 * get_template_fields
	 *
	 * @access public
	 * @return array $this->_template_fields
	 */
	public function get_template_fields() {
		$template_fields = apply_filters( 'FHEE__' . get_class($this) . '__get_template_fields', $this->_template_fields, $this );
		$template_fields = apply_filters( 'FHEE__EE_messenger__get_template_fields', $template_fields, $this );
		return $template_fields;
	}




	/** SETUP METHODS **/

	/**
	 * The following method doesn't NEED to be used by child classes but might be modified by the specific messenger
	 */
	protected function _set_template_value($item, $value) {
		if ( array_key_exists($item, $this->_template_fields) ) {
			$prop = '_' . $item;
			$this->$prop= $value;
		}
	}

	/**
	 * Sets up the message for sending.
	 * @param  EE_message_type $message the message object that contains details about the message.
	 */
	public function send_message( $message ) {
		$this->_validate_and_setup( $message );
		$this->_send_message();
	}



	/**
	 * Sets up and returns message preview
	 * @param  object $message incoming message object
	 * @param  bool   $send    true we will actually use the _send method (for test sends). FALSE we just return preview
	 * @return string          return the message html content
	 */
	public function get_preview( $message, $send = FALSE ) {
		$this->_validate_and_setup( $message );

		if ( $send ) {
			//are we overriding any existing template fields?
			$settings = $this->get_existing_test_settings();
			if ( !empty( $settings ) ) {
				foreach( $settings as $field => $value ) {
					$this->_set_template_value( $field, $value );
				}
			}
		}

		return $send ? $this->_send_message() : $this->_preview();
	}




	/**
	 * simply validates the incoming message object and then sets up the properties for the messenger
	 * @param  object $message message object
	 * @return void
	 */
	protected function _validate_and_setup( $message ) {
		if ( !is_object( $message ) )
			throw new EE_Error( __('Incoming "$message" must be an object', 'event_espresso' ) );

		$template_fields = $this->get_template_fields();

		foreach ( $template_fields as $template => $value ) {
			if ( $template !== 'extra' )
				$this->_set_template_value($template, $message->$template);
		}
	}




	/**
	 * Utility method for child classes to get the contents of a template file and return
	 *
	 * We're assuming the child messenger class has already setup template args!
	 * @param  string  	$template url for template
	 * @param  bool 	$preview if true we use the preview wrapper otherwise we use main wrapper.
	 * @return string
	 */
	protected function _get_main_template( $preview = FALSE ) {

		//first get inline css (will be empty if the messenger doesn't use it)
		$this->_template_args['inline_style'] = file_get_contents( $this->get_inline_css_template(FALSE, $preview), TRUE );
		$base_path = EE_LIBRARIES . 'messages/messenger/assets/' . $this->name . '/';

		//figure out main template path
		$wrapper_template = !$preview ? $base_path . $this->name . '-messenger-main-wrapper.template.php' : $base_path . $this->name . '-messenger-preview-wrapper.template.php';
		//check file exists and is readable
		if ( !is_readable( $wrapper_template ) )
			throw new EE_Error( sprintf( __('Unable to access the template file for the %s messenger main content wrapper.  The location being attempted is %s.', 'event_espresso' ), ucwords($this->label['singular'])), $wrapper_template );

		//require template helper
		EE_Registry::instance()->load_helper( 'Template' );
		return EEH_Template::display_template( $wrapper_template, $this->_template_args, TRUE );
	}



	/**
	 * set the _test_settings_fields property
	 *
	 * @access protected
	 * @return void
	 */
	protected function _set_test_settings_fields() {
		$this->_test_settings_fields = array();
	}



	/**
	 * return the _test_settings_fields property
	 * @return array
	 */
	public function get_test_settings_fields() {
		return $this->_test_settings_fields;
	}




	/**
	 * This just returns any existing test settings that might be saved in the database
	 *
	 * @access public
	 * @return array
	 */
	public function get_existing_test_settings() {
		$settings = EEH_MSG_Template::get_active_messengers_in_db();
		return isset( $settings[$this->name]['test_settings'] ) ? $settings[$this->name]['test_settings'] : array();
	}



	/**
	 * All this does is set the existing test settings (in the db) for the messenger
	 *
	 * @access public
	 * @return bool 	success/fail
	 */
	public function set_existing_test_settings( $settings ) {
		$existing = EEH_MSG_Template::get_active_messengers_in_db();
		$existing[$this->name]['test_settings'] = $settings;
		return EEH_MSG_Template::update_active_messengers_in_db( $existing );
	}



	/**
	 * This just returns the field label for a given field setup in the _template_fields property.
	 *
	 * @since 	4.3.0
	 *
	 * @param string $field The field to retrieve the label for
	 * @return string        	  The label
	 */
	public function get_field_label( $field ) {
		//first let's see if the field requests is in the top level array.
		if ( isset( $this->_template_fields[$field] ) && !empty( $this->_template_fields[$field]['label'] ) )
			return $this->_template[$field]['label'];

		//nope so let's look in the extra array to see if it's there HOWEVER if the field exists as a top level index in the extra array then we know the label is in the 'main' index.
		if ( isset( $this->_template_fields['extra'] ) && !empty( $this->_template_fields['extra'][$field] ) && !empty( $this->_template_fields['extra'][$field]['main']['label'] )  )
			return $this->_template_fields['extra'][$field]['main']['label'];

		//now it's possible this field may just be existing in any of the extra array items.
		if ( !empty( $this->_template_fields['extra'] ) && is_array( $this->_template_fields['extra'] ) ) {
			foreach ( $this->_template_fields['extra'] as $main_field => $subfields ) {
				if ( !is_array( $subfields ) )
					continue;
				if ( isset( $subfields[$field] ) && !empty( $subfields[$field]['label'] ) )
					return $subfields[$field]['label'];
			}
		}

		//if we made it here then there's no label set so let's just return the $field.
		return $field;
	}




}
// end EE_messenger class
