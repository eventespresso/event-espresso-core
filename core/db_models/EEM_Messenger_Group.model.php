<?php
/**
 * Defines the Model for the Messenger Group table
 *
 * @since 4.5.0
 *
 * @package Event Espresso
 * @subpackage models
 */
 if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');
/**
 * EEM_Messenger_Group
 *
 * @since 4.5.0
 *
 * @package		Event Espresso
 * @subpackage	core/db_models/EEM_Messenger_Group.model.php
 * @author		Darren Ethier
 * ------------------------------------------------------------------------
 */
class EEM_Messenger_Group extends EEM_Base {


	/**
	 * object instance.
	 *
	 * @since 4.5.0
	 *
	 * @var EEM_Messenger_Group
	 */
	private static $_instance = NULL;



	/**
	 * Retrieve the object instance
	 *
	 * @since 4.5.0
	 *
	 * @return EEM_Messenger_Group
	 */
	public static function instance() {

		// check if instance of EEM_Messenger_Group already exists
		if (self::$_instance === NULL) {
			// instantiate Message Template Model
			self::$_instance = new self();
		}
		return self::$_instance;
	}



	protected function __construct() {
		$this->singular_item = __('Messenger Group', 'event_espresso');
		$this->plural_item = __('Messenger Groups', 'event_espresso');

		$this->_tables = array(
			'Messenger_Group' => new EE_Primary_Table( 'esp_messenger_group', 'MSGG_ID' )
			);

		$this->_fields = array(
			'Messenger_Group' => array(
				'MSSG_ID' => new EE_Primary_Key_Int_Field('MSSG_ID', __('Messenger Group ID', 'event_espresso') ),
				'GRP_ID' => new EE_Foreign_Key_Int_Field( 'GRP_ID', __('Message Template Group ID', 'event_espresso'), FALSE, 0, 'Message_Template_Group' ),
				'MSSG_messenger' => new EE_Plain_Text_Field( 'MSSG_messenger', __('Messenger used for template', 'event_espresso'), FALSE, 'email' )
				)
			);

		$this->_model_relations = array(
			'Message_Template_Group' => new EE_Belongs_To_Relation()
			);
		parent::__construct();
	}
}
