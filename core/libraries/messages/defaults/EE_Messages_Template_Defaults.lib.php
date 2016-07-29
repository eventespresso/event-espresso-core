<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'NO direct script access allowed' );
}

/**
 * This class is used for setting up and generating the default Message Template Group and Message Templates
 * for the given messenger and message type.
 *
 * @package		Event Espresso
 * @subpackage	includes/core/messages/defaults
 * @author		Darren Ethier
 * @since       4.9.0
 *
 * ------------------------------------------------------------------------
 */
class EE_Messages_Template_Defaults extends EE_Base {


	/**
	 * Used for holding the EE_Message_Template GRP_ID field value.
	 * @var [type]
	 */
	protected $_GRP_ID;

	/**
	 * holds the messenger object
	 *
	 * @var EE_messenger
	 */
	protected $_messenger;

	/**
	 * holds the message type object
	 *
	 * @var EE_message_type
	 */
	protected $_message_type;

	/**
	 * holds the fields used (this is retrieved from the messenger)
	 *
	 * @var array
	 */
	protected $_fields;

	/**
	 * holds the assembled template (with defaults) for creation in the database
	 *
	 * @var array
	 */
	protected $_templates;

	/**
	 * holds the contexts used (this is retrieved from the message type)
	 *
	 * @var array
	 */
	protected $_contexts;


	/**
	 *  @var EEM_Message_Template_Group
	 */
	protected $_message_template_group_model;


	/**
	 * @var EEM_Message_Template
	 */
	protected $_message_template_model;


	/**
	 * EE_Messages_Template_Defaults constructor.
	 *
	 * @param EE_messenger               $messenger
	 * @param EE_message_type            $message_type
	 * @param int                        $GRP_ID                      Optional.  If included then we're just regenerating
	 *                                                                the template fields for the given group not the
	 *                                                                message template group itself
	 * @param EEM_Message_Template_Group $message_template_group_model
	 * @param EEM_Message_Template       $message_template_model
	 * @throws EE_Error
	 */
	public function __construct(
		EE_messenger $messenger,
		EE_message_type $message_type,
		$GRP_ID = 0,
		EEM_Message_Template_Group $message_template_group_model,
		EEM_Message_Template $message_template_model
	) {
		$this->_messenger = $messenger;
		$this->_message_type = $message_type;
		$this->_GRP_ID = $GRP_ID;
		//set the model object
		$this->_message_template_group_model = $message_template_group_model;
		$this->_message_template_model = $message_template_model;
		$this->_fields = $this->_messenger->get_template_fields();
		$this->_contexts = $this->_message_type->get_contexts();
	}


	/**
	 * Setup the _template_data property.
	 * This method sets the _templates property array before templates are created.
	 *
	 * @param string $template_pack This corresponds to a template pack class reference which will contain information
	 *                              about where to obtain the templates.
	 *
	 */
	final private function _set_templates( $template_pack ) {

		//get the corresponding template pack object (if present.  If not then we just load the default and add a
		//notice).  The class name should be something like 'EE_Messages_Template_Pack_Default' where "default' would be
		//the incoming template pack reference.
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


	/**
	 * Return the contexts for the message type as cached on this instance.
	 * @return array
	 */
	public function get_contexts() {
		return $this->_contexts;
	}





	/**
	 * public facing create new templates method
	 *
	 * @return mixed (array|bool)            success array or false.
	 */
	public function create_new_templates() {
		$template_pack = 'default';
		//if we have the GRP_ID then let's use that to see if there is a set template pack and use that for the new templates.
		if ( ! empty( $this->_GRP_ID ) ) {
			$message_template_group = $this->_message_template_group_model->get_one_by_ID( $this->_GRP_ID );
			$template_pack = $message_template_group instanceof EE_Message_Template_Group
				? $message_template_group->get_template_pack_name()
				: 'default';
			//we also need to reset the template variation to default
			$message_template_group->set_template_pack_variation( 'default' );
		}
		return $this->_create_new_templates( $template_pack );
	}





	/**
	 *  Handles creating new default templates.
	 *
	 * @param string $template_pack This corresponds to a template pack class reference
	 *                              which will contain information about where to obtain the templates.
	 * @return mixed (array|bool) 	success array or false.
	 */
	protected function _create_new_templates( $template_pack ) {

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
					$template_data['MTP_content'] = $this->_templates[ $context ][ $field ];

					$MTP = $this->_message_template_model->insert( $template_data );
					if ( ! $MTP ) {
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

