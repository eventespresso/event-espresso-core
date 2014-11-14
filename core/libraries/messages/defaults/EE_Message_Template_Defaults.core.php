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
 * This class is the parent class for default message template contents.  Children classes follow a certain naming format (i.e. /email/EE_Messages_Email_Payment_Defaults.class.php) and they simply serve the function of defining defaults for that messenger/message_type combination when global templates are generated.  Child classes should follow the naming schema for their templates:  EE_Message_Template_Defaults_{template_pack_slug}
 *
 * @package		Event Espresso
 * @subpackage	includes/core/messages/defaults
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Message_Template_Defaults extends EE_Base {


	/**
	 * These properties just hold the name for the Messenger and Message Type (defined by child classes).  These are used for retrieving objects etc.
	 * @var [type]
	 */
	protected $_m_name;
	protected $_mt_name;
	protected $_GRP_ID;




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
	 * @param $messenger_name	should be the name of a valid active messenger
	 * @param $message_type_name  should be the name of a valid active message type
	 * @param int $GRP_ID Optional.  If included then we're just regenerating the template
	 *                    		 fields for the given group not the message template group itself
	 *
	 * @access public
	 * @return void
	 */
	public function __construct( EE_Messages $messages, $messenger_name, $message_type_name, $GRP_ID = 0 ) {
		$this->_EE_MSG = $messages;

		//set the model object
		$this->_EEM_data = EEM_Message_Template_Group::instance();

		$this->_GRP_ID = $GRP_ID;

		$this->_m_name = $messenger_name;
		$this->_mt_name = $message_type_name;

		//make sure required props have been set
		if ( empty( $this->_m_name) || empty( $this->_mt_name ) ) {
			$msg[] = __('Message Templates cannot be generated because the Messenger and Message Types haven\'t been defined for the generator.', 'event_espresso');
			$msg[] = __('You need to set the "$m_name" and "$mt_name" properties', 'event_espresso');
			throw new EE_Error( implode( '||', $msg ) );
		}

		$this->_init();
	}




	/**
	 * Setup the _template_data property.
	 * This method sets the _templates property array before templates are created.
	 *
	 * @param string $template_pack This corresponds to a template pack class reference which will contain information about where to obtain the templates.
	 * @return void
	 */
	final private function _set_templates( $template_pack ) {

		//get the corresponding template pack object (if present.  If not then we just load the default and add a notice).  The class name should be something like 'EE_Messages_Template_Pack_Default' where "default' would be the incoming template pack reference.
		$class_name = 'EE_Messages_Template_Pack_' . str_replace( ' ', '_', ucwords( str_replace( '_', ' ', $template_pack ) ) );

		if ( ! class_exists( $class_name ) ) {
			EE_Error::add_error( sprintf( __('The template pack represented by a class corresponding to "%s" does not exist.  Likely the autoloader for this class has the wrong path or the incoming reference is mispelled.  The default template pack  been used to generate the templates instead.', 'event_espresso'), $class_name ), __FILE__, __FUNCTION__, __LINE__ );
			$class_name = 'EE_Messages_Template_Pack_Default';
		}

		$template_pack = new $class_name;

		//get all the templates from the template pack.
		$this->_templates = $template_pack->get_templates( $this->_messenger, $this->_message_type );
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
			$msg[] = sprintf( __('The "$_m_name" property has "%s" as its value.  Check the spelling and make sure it matches an available messenger', 'event_espresso'), $this->_m_name );
			throw new EE_Error( implode( '||', $msg ) );
		}

		//check if message type is installed
		if ( !isset($active_messengers[$this->_m_name] ) ) {
			$msg[] = __('Message Templates cannot be generated because the given message type is not installed', 'event_espresso');
			$msg[] = sprintf( __('The "$_mt_name" property has "%s" as its value.  Check the spelling and make sure it matches an available message type', 'event_espresso'), $this->_mt_name );
			throw new EE_Error( implode( '||', $msg ) );
		}

		$this->_messenger = $active_messengers[$this->_m_name];
		$this->_message_type = $active_message_types[$this->_mt_name];

		//verify we have the messenger and message type objects
		if ( ! $this->_messenger instanceof EE_messenger ) {
			throw new EE_Error( sprintf( __('The _messenger property must be an instance of EE_messenger by this point.  It isn\'t. Something has gone wrong. Here is the value it holds:<br /> %s', 'event_espresso' ), print_r( $this->_messenger, TRUE ) ) );
		}

		if ( ! $this->_message_type instanceof EE_message_type ) {
			throw new EE_Error( sprintf( __('The _message_type property must be an instance of EE_message_type by this point.  It isn\'t. Something has gone wrong. Here is the value it holds:<br /> %s', 'event_espresso' ), print_r( $this->_message_type, TRUE ) ) );
		}


		$this->_fields = $this->_messenger->get_template_fields();
		$this->_contexts = $this->_message_type->get_contexts();
	}




	public function get_contexts() {
		return $this->_contexts;
	}





	/**
	 * public facing create new templates method
	 * @access public
	 *
	 * @return mixed (array|bool)            success array or false.
	 */
	public function create_new_templates() {
		$template_pack = 'default';
		//if we have the GRP_ID then let's use that to see if there is a set template pack and use that for the new templates.
		if ( !empty( $this->_GRP_ID ) ) {
			$mtpg = EEM_Message_Template_Group::instance()->get_one_by_ID( $this->_GRP_ID );
			$template_pack = $mtpg instanceof EE_Message_Template_Group ? $mtpg->get_template_pack_name() : 'default';
			//we also need to reset the template variation to default
			$mtpg->set_template_pack_variation( 'default' );
		}
		return $this->_create_new_templates( $template_pack );
	}





	/**
	 * private method that handles creating new default templates
	 *
	 * @param string $template_pack This corresponds to a template pack class reference which will contain information about where to obtain the templates.
	 * @return mixed (array|bool)            success array or false.
	 */
	private function _create_new_templates( $template_pack ) {

		$this->_set_templates( $template_pack );

		//necessary properties are set, let's save the default templates

		if ( empty( $this->_GRP_ID ) ) {

			$main_template_data =  array(
				'MTP_messenger' => $this->_messenger->name,
				'MTP_message_type' => $this->_message_type->name,
				'MTP_is_override' => 0,
				'MTP_deleted' => 0,
				'MTP_is_global' => 1,
				'MTP_user_id' => EEH_Activation::get_default_creator_id(),
				'MTP_is_active' => 1,
				);


			//let's insert the above and get our GRP_ID, then reset the template data array to just include the GRP_ID
			$grp_id = $this->_EEM_data->insert( $main_template_data );

			if ( empty( $grp_id ) ) return $grp_id;
			$this->_GRP_ID = $grp_id;
		}

		$template_data = array( 'GRP_ID' => $this->_GRP_ID );

		foreach ( $this->_contexts as $context => $details ) {
			foreach ( $this->_fields as $field => $field_type ) {
				if ( $field != 'extra' ) {
					$template_data['MTP_context'] = $context;
					$template_data['MTP_template_field'] = $field;
					$template_data['MTP_content'] = $this->_templates[$context][$field];

					$MTP = EEM_Message_Template::instance()->insert($template_data);
					if ( !$MTP ) {
						EE_Error::add_error( sprintf(__('There was an error in saving new template data for %s messenger, %s message type, %s context and %s template field.', 'event_espresso'), $this->_messenger->name, $this->_message_type->name, $context, $field), __FILE__, __FUNCTION__, __LINE__  );
						return false;
					}
				}
			}
		}

		$success_array = array(
			'GRP_ID' => $this->_GRP_ID,
			'MTP_context' => key($this->_contexts)
		);

		return $success_array;
	}


} //end EE_Message_Template_Defaults class

