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
 * EE_Change_Log
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Change_Log extends EE_Base_Class{

	/**
	 *
	 * @param array $props_n_values
	 * @return EE_Change_Log
	 */
	public static function new_instance( $props_n_values = array() ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__ );
//		d( $has_object );
		return $has_object ? $has_object : new self( $props_n_values);
	}

	/**
	 *
	 * @param array $props_n_values
	 * @return EE_Change_Log
	 */
	public static function new_instance_from_db ( $props_n_values = array() ) {
//		$mapped_object = parent::_get_object_from_entity_mapper($props_n_values, $classname);
//		d( $mapped_object );
//		return $mapped_object ? $mapped_object : new self( $props_n_values, TRUE );
		return new self( $props_n_values, TRUE );
	}
	/**
	 * Gets message
	 * @return mixed
	 */
	function message() {
		return $this->get('LOG_message');
	}

	/**
	 * Sets message
	 * @param mixed $message
	 */
	function set_message($message) {
	 $this->set('LOG_message', $message);
	}
	/**
	 * Gets time
	 * @return string
	 */
	function time() {
		return $this->get('LOG_time');
	}

	/**
	 * Sets time
	 * @param string $time
	 */
	function set_time($time) {
		$this->set('LOG_time', $time);
	}
	/**
	 * Gets log_type
	 * @return string
	 */
	function log_type() {
		return $this->get('LOG_log_type');
	}

	/**
	 * Sets log_type
	 * @param string $log_type
	 */
	function set_log_type($log_type) {
		$this->set('LOG_log_type', $log_type);
	}
	/**
	 * Gets type of the model object related to this log
	 * @return string
	 */
	function OBJ_type() {
		return $this->get('OBJ_type');
	}

	/**
	 * Sets type
	 * @param string $type
	 */
	function set_OBJ_type($type) {
		$this->set('OBJ_type', $type);
	}
	/**
	 * Gets OBJ_ID (the ID of the item related to this log)
	 * @return mixed
	 */
	function OBJ_ID() {
		return $this->get('OBJ_ID');
	}

	/**
	 * Sets OBJ_ID
	 * @param mixed $OBJ_ID
	 */
	function set_OBJ_ID($OBJ_ID) {
		$this->set('OBJ_ID', $OBJ_ID);
	}
	/**
	 * Gets wp_user
	 * @return int
	 */
	function wp_user() {
		return $this->get('LOG_wp_user');
	}

	/**
	 * Sets wp_user
	 * @param int $wp_user_id
	 */
	function set_wp_user($wp_user_id) {
		$this->set('LOG_wp_user', $wp_user_id);
	}

	/**
	 * Gets the model object attached to this log
	 * @return EE_Base_Class
	 */
	function object(){
		$model_name_of_related_obj = $this->OBJ_type();
		$is_model_name = EE_Registry::instance()->is_model_name($model_name_of_related_obj);
		if( ! $is_model_name ){
			return null;
		}else{
			return $this->get_first_related($model_name_of_related_obj);
		}
	}

	/**
	 * Shorthand for setting the OBJ_ID and OBJ_type. Slightly handier than using
	 * _add_relation_to because you don't have to specify what type of model you're
	 * associating it with
	 * @param EE_Base_Class $object
	 * @param boolean $save
	 * @return boolean if $save=true, NULL is $save=false
	 */
	function set_object($object, $save = TRUE ) {
		if($object instanceof EE_Base_Class){
			$this->set_OBJ_type($object->get_model()->get_this_model_name());
			$this->set_OBJ_ID($object->ID());
		}else{
			$this->set_OBJ_type(NULL);
			$this->set_OBJ_ID(NULL);
		}
		if($save){
			return $this->save();
		}else{
			return NULL;
		}
	}
}

// End of file EE_Change_Log.class.class.php