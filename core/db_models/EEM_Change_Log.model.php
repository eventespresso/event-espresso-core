<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.3
 *
 * ------------------------------------------------------------------------
 *
 * EEM_Change_Log
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EEM_Change_Log extends EEM_Base{

	/**
	 * the related object was created log type
	 */
	const type_create = 'create';
	/**
	 * the related object was updated (changed, or soft-deleted)
	 */
	const type_update = 'update';
	/**
	 * the related object was deleted permanently
	 */
	const type_delete = 'delete';
	/**
	 * the related item had something worth noting happen on it, but
	 * only for the purposes of debugging problems
	 */
	const type_debug = 'debug';
	/**
	 * the related item had an error occur on it
	 */
	const type_error = 'error';
	/**
	 * the related item is regarding some gateway interaction, like an IPN
	 * or request to process a payment
	 */
	const type_gateway = 'gateway';

	/**
	 * private instance of the EEM_Change_Log object
	 * @access private
	 * @var EEM_Change_Log $_instance
	 */
	private static $_instance = NULL;

	/**
	 *		This function is a singleton method used to instantiate the EEM_Attendee object
	 *
	 *		@access public
	 *		@return EEM_Change_Log
	 */
	public static function instance(){
		// check if instance of EEM_Change_Log already exists
		if ( ! self::$_instance instanceof EEM_Change_Log ) {
			// instantiate Espresso_model
			self::$_instance = new self();
		}
		return self::$_instance;
	}



	/**
	 * constructor
	 *	@access protected
	 *	@return EEM_Change_Log
	 */
	protected function __construct(){
		global $current_user;
		$this->singular_item = __('Log','event_espresso');
		$this->plural_item = __('Logs','event_espresso');
		$this->_tables = array(
			'Log'=> new EE_Primary_Table('esp_log', 'LOG_ID')
		);
		$models_this_can_attach_to = array_keys(EE_Registry::instance()->non_abstract_db_models);
		$this->_fields = array(
			'Log'=>array(
				'LOG_ID'=> new EE_Primary_Key_Int_Field('LOG_ID', __('Log ID','event_espresso')),
				'LOG_time'=>new EE_Datetime_Field('LOG_time', __("Log Time", 'event_espresso'), false, current_time('timestamp')),
				'OBJ_ID'=>new EE_Foreign_Key_String_Field('OBJ_ID', __("Object ID (int or string)", 'event_espresso'), true, NULL,$models_this_can_attach_to),
				'OBJ_type'=>new EE_Any_Foreign_Model_Name_Field('OBJ_type', __("Object Type", 'event_espresso'), true, NULL, $models_this_can_attach_to),
				'LOG_type'=>new EE_Enum_Text_Field('LOG_type', __("Type of log entry", "event_espresso"), false, self::type_debug,
						array(
							self::type_create=>  __("Create", "event_espresso"),
							self::type_update=>  __("Update", "event_espresso"),
							self::type_delete => __("Delete", "event_espresso"),
							self::type_debug=>  __("Debug", "event_espresso"),
							self::type_error=>  __("Error", "event_espresso"),
							self::type_gateway=> __("Gateway Interaction (IPN or Direct Payment)", 'event_espresso'),
							)),
				'LOG_message'=>new EE_Maybe_Serialized_Text_Field('LOG_message', __("Log Message (body)", 'event_espresso'), true),
				'LOG_wp_user' => new EE_Integer_Field('LOG_wp_user', __("WP User ID who was logged in while this occurred", 'event_espresso'), true, $current_user ? $current_user->ID : NULL),

			));
		$this->_model_relations = array();
		foreach($models_this_can_attach_to as $model){
			$this->_model_relations[$model] = new EE_Belongs_To_Any_Relation();
		}

		parent::__construct();
	}



	/**
	 * Resets the Log
	 * @return EEM_Change_Log
	 */
	public static function reset(){
		self::$_instance = NULL;
		return self::instance();
	}
	/**
	 *
	 * @param string $log_type !see the acceptable values of LOG_type in EEM__Change_Log::__construct
	 * @param mixed $message array|string of the message you want to record
	 * @param EE_Base_Class $related_model_obj
	 * @return EE_Change_Log
	 */
	public function log($log_type,$message,$related_model_obj){
		if($related_model_obj instanceof EE_Base_Class){
			$obj_id = $related_model_obj->ID();
			$obj_type = $related_model_obj->get_model()->get_this_model_name();
		}else{
			$obj_id = NULL;
			$obj_type = NULL;
		}
		$log = EE_Change_Log::new_instance(array(
				'LOG_type'=>$log_type,
				'LOG_message'=>$message,
				'OBJ_ID'=>$obj_id,
				'OBJ_type'=>$obj_type,
				));
		$log->save();
		return $log;
	}



	/**
	 * Adds a gateway log for the specified object, given its ID and type
	 * @param string  $message
	 * @param mixed $related_obj_id
	 * @param string $related_obj_type
	 * @throws EE_Error
	 * @return EE_Change_Log
	 */
	public function gateway_log( $message, $related_obj_id, $related_obj_type ){
		if( ! EE_Registry::instance()->is_model_name($related_obj_type)){
			throw new EE_Error(sprintf(__("'%s' is not a model name. A model name must be provided when making a gateway log. Eg, 'Payment', 'Payment_Method', etc", "event_espresso"),$related_obj_type));
		}
		$log = EE_Change_Log::new_instance(array(
				'LOG_type'=>EEM_Change_Log::type_gateway,
				'LOG_message'=>$message,
				'OBJ_ID'=>$related_obj_id,
				'OBJ_type'=>$related_obj_type,
				));
		$log->save();
		return $log;
	}



	/**
	 * Just gets the bare-bones wpdb results as an array in cases where efficiency is essential
	 * @param array $query_params @see EEM_Base::get_all
	 * @return array of arrays
	 */
	public function get_all_efficiently($query_params){
		return $this->_get_all_wpdb_results($query_params);
	}



}
// End of file EEM_Change_Log.model.php
