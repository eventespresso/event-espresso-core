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
 * @version		4.1
 *
 * ------------------------------------------------------------------------
 *
 * EEM_Message_Template
 *
 *
 *
 * @package		Event Espresso
 * @subpackage	includes/models/EEM_Message_Template.model.php
 * @author		Darren Ethier
 *
 *
 * ------------------------------------------------------------------------
 */
class EEM_Message_Template extends EEM_Base {
	//private instance of the EEM_Message_Template object
	protected static $_instance = NULL;



	/**
	 * private constructor to prevent direct creation
	 *
	 * @Constructor
	 * @access protected
	 * @param string $timezone
	 * @throws \EE_Error
	 */
	protected function __construct( $timezone = NULL ) {
		$this->singular_item = __('Message Template','event_espresso');
		$this->plural_item = __('Message Templates','event_espresso');

		$this->_tables = array(
			'Message_Template' => new EE_Primary_Table('esp_message_template', 'MTP_ID' )
		);
		$this->_fields = array(
			'Message_Template'=> array(
				'MTP_ID'=> new EE_Primary_Key_Int_Field('MTP_ID', __('Message Template ID', 'event_espresso')),
				'GRP_ID' => new EE_Foreign_Key_Int_Field('GRP_ID', __('Message Template Group ID', 'event_espresso'), FALSE, 0, 'Message_Template_Group' ),
				'MTP_template_field'=>new EE_Plain_Text_Field('MTP_template_field', __('Field Name for this Template', 'event_espresso'), false, 'default' ),
				'MTP_context'=>new EE_Plain_Text_Field('MTP_context', __('Message Type Context for this field', 'event_espresso'),false,'admin' ),
				'MTP_content'=>new EE_Serialized_Text_Field('MTP_content', __('The field content for the template', 'event_espresso'), false, ''),
			)
		);

		$this->_model_relations = array(
			'Message_Template_Group' => new EE_Belongs_To_Relation()
			);
		$this->_model_chain_to_wp_user = 'Message_Template_Group';
		foreach( $this->_cap_contexts_to_cap_action_map as $context => $action ){
			$this->_cap_restriction_generators[ $context ] = new EE_Restriction_Generator_Global( 'Message_Template_Group.MTP_is_global');
		}
		$this->_caps_slug = 'messages';
		parent::__construct( $timezone );
	}


} //end class EEM_Message_Template.model
