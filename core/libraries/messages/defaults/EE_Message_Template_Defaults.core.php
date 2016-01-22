<?php

if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
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
	 * @var EE_Messenger
	 */
	protected $_messenger;

	/**
	 * holds the message type object
	 *
	 * @access protected
	 * @var EE_Message_Type
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
	 *  @type EEM_Message_Template_Group
	 */
	protected $_message_template_group_model;



	/**
	 * constructor
	 *
	 * @param null            $deprecated
	 * @param string          $messenger_name 		should be the name of a valid active messenger
	 * @param string          $message_type_name 	should be the name of a valid active message type
	 * @param int             $GRP_ID 				Optional.  If included then we're just regenerating the template
	 *  											fields for the given group not the message template group itself
	 * @param EE_Messenger    $messenger
	 * @param EE_message_type $message_type
	 * @throws \EE_Error
	 */
	public function __construct(
		$deprecated = null,
		$messenger_name,
		$message_type_name,
		$GRP_ID = 0,
		EE_Messenger $messenger = null,
		EE_message_type $message_type = null
	) {
		if ( $deprecated !== null ) {
			EE_Error::doing_it_wrong(
				__FUNCTION__,
				sprintf(
					__(
						'The first parameter for the "%1$s" method is deprecated and no longer required. Please update any addons or custom code accordingly.',
						'event_espresso'
					),
					__METHOD__ . '()'
				),
				'4.9.0'
			);
		}

		$this->_m_name = $messenger_name;
		$this->_mt_name = $message_type_name;
		$this->_GRP_ID = $GRP_ID;
		$this->_messenger = $messenger;
		$this->_message_type = $message_type;
		$this->_validate_messenger_and_message_type();
		//set the model object
		$this->_message_template_group_model = EEM_Message_Template_Group::instance();
		$this->_fields = $this->_messenger->get_template_fields();
		$this->_contexts = $this->_message_type->get_contexts();
	}



	/**
	 * _validate_messenger_and_message_type
	 *
	 * @throws \EE_Error
	 */
	protected function _validate_messenger_and_message_type() {
		if ( ! $this->_messenger instanceof EE_Messenger ) {
			if ( empty( $this->_m_name ) ) {
				$msg[] = __(
					'Message Templates cannot be generated because a messenger was not supplied.',
					'event_espresso'
				);
				$msg[] = sprintf(
					__(
						'Check the spelling of the "%1$s" messenger name passed to "%2$s" and make sure it matches an available messenger.%4$sThis is what was actually received:%4$s %3$s',
						'event_espresso'
					),
					$this->_m_name,
					'EEH_MSG_Template::create_new_templates()',
					print_r( $this->_messenger, true ),
					'<br />'
				);
				throw new EE_Error( implode( '||', $msg ) );
			}
			/** @type EE_Message_Resource_Manager $Message_Resource_Manager */
			$Message_Resource_Manager = EE_Registry::instance()->load_lib( 'Message_Resource_Manager' );
			$this->_messenger = $Message_Resource_Manager->valid_messenger( $this->_m_name );
		}
		if ( ! $this->_message_type instanceof EE_message_type ) {
			if ( empty( $this->_mt_name ) ) {
				$msg[] = __(
					'Message Templates cannot be generated because a message type was not supplied.',
					'event_espresso'
				);
				$msg[] = sprintf(
					__(
						'Check the spelling of the "%1$s" message type name passed to "%2$s" and make sure it matches an available message type.%4$sThis is what was actually received:%4$s %3$s',
						'event_espresso'
					),
					$this->_mt_name,
					'EEH_MSG_Template::create_new_templates()',
					print_r( $this->_message_type, true ),
					'<br />'
				);
				throw new EE_Error( implode( '||', $msg ) );
			}
			/** @type EE_Message_Resource_Manager $Message_Resource_Manager */
			$Message_Resource_Manager = EE_Registry::instance()->load_lib( 'Message_Resource_Manager' );
			$this->_message_type = $Message_Resource_Manager->valid_message_type( $this->_mt_name );
		}
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
			EE_Error::add_error(
				sprintf(
					__(
						'The template pack represented by a class corresponding to "%1$s" does not exist. Likely the autoloader for this class has the wrong path or the incoming reference is misspelled. The default template pack has been used to generate the templates instead.',
						'event_espresso'
					),
					$class_name
				),
				__FILE__,
				__FUNCTION__,
				__LINE__
			);
			$class_name = 'EE_Messages_Template_Pack_Default';
		}
		/** @type EE_Messages_Template_Pack $template_pack */
		$template_pack = new $class_name;

		//get all the templates from the template pack.
		$this->_templates = $template_pack->get_templates( $this->_messenger, $this->_message_type );
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
			$message_template_group = EEM_Message_Template_Group::instance()->get_one_by_ID( $this->_GRP_ID );
			$template_pack = $message_template_group instanceof EE_Message_Template_Group ? $message_template_group->get_template_pack_name() : 'default';
			//we also need to reset the template variation to default
			$message_template_group->set_template_pack_variation( 'default' );
		}
		return $this->_create_new_templates( $template_pack );
	}





	/**
	 * private method that handles creating new default templates
	 *
	 * @param string $template_pack This corresponds to a template pack class reference
	 *                              which will contain information about where to obtain the templates.
	 * @return mixed (array|bool) 	success array or false.
	 */
	private function _create_new_templates( $template_pack ) {

		$this->_set_templates( $template_pack );

		//necessary properties are set, let's save the default templates
		if ( empty( $this->_GRP_ID ) ) {
			$main_template_data = array(
				'MTP_messenger'    => $this->_messenger->name,
				'MTP_message_type' => $this->_message_type->name,
				'MTP_is_override'  => 0,
				'MTP_deleted'      => 0,
				'MTP_is_global'    => 1,
				'MTP_user_id'      => EEH_Activation::get_default_creator_id(),
				'MTP_is_active'    => 1,
			);
			//let's insert the above and get our GRP_ID, then reset the template data array to just include the GRP_ID
			$grp_id = $this->_message_template_group_model->insert( $main_template_data );
			if ( empty( $grp_id ) ) {
				return $grp_id;
			}
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
						EE_Error::add_error(
							sprintf(
								__(
									'There was an error in saving new template data for %1$s messenger, %2$s message type, %3$s context and %4$s template field.',
									'event_espresso'
								),
								$this->_messenger->name,
								$this->_message_type->name,
								$context,
								$field
							),
							__FILE__,
							__FUNCTION__,
							__LINE__
						);
						return false;
					}
				}
			}
		}

		return array(
			'GRP_ID'      => $this->_GRP_ID,
			'MTP_context' => key( $this->_contexts )
		);
	}


} //end EE_Message_Template_Defaults class

