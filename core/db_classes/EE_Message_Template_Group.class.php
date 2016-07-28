<?php if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * EE_Message_Template_Group class
 *
 *
 * @package         	Event Espresso
 * @subpackage 	includes/classes/EE_Message_Template_Group.class.php
 * @author 				Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Message_Template_Group extends EE_Soft_Delete_Base_Class {

	/**
	 * @param array  $props_n_values
	 * @param string $timezone
	 * @return EE_Message_Template_Group|mixed
	 */
	public static function new_instance( $props_n_values = array(), $timezone = '' ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__, $timezone );
		return $has_object ? $has_object : new self( $props_n_values, FALSE, $timezone );
	}



	/**
	 * @param array  $props_n_values
	 * @param string $timezone
	 * @return EE_Message_Template_Group
	 */
	public static function new_instance_from_db( $props_n_values = array(), $timezone = '' ) {
		return new self( $props_n_values, TRUE, $timezone );
	}



	/**
	 * @param bool $message_type
	 * @throws EE_Error
	 */
	public function set_message_type( $message_type = FALSE ) {
		if ( ! $message_type ) {
			throw new EE_Error( __( 'Missing required value for the message_type parameter', 'event_espresso' ) );
		}
		$this->set( 'MTP_message_type', $message_type );
	}



	/**
	 * @param bool $messenger
	 * @throws EE_Error
	 */
	public function set_messenger( $messenger = FALSE ) {
		if ( ! $messenger ) {
			throw new EE_Error( __( 'Missing required value for the messenger parameter', 'event_espresso' ) );
		}
		$this->set( 'MTP_messenger', $messenger );
	}



	/**
	 * @param bool $GRP_ID
	 * @throws EE_Error
	 */
	public function set_group_template_id( $GRP_ID = FALSE ) {
		if ( ! $GRP_ID ) {
			throw new EE_Error( __( 'Missing required value for the message template group id', 'event_espresso' ) );
		}
		$this->set( 'GRP_ID', $GRP_ID );
	}



	/**
	 * get Group ID
	 * @access public
	 * @return int
	 */
	public function GRP_ID() {
		return $this->get( 'GRP_ID' );
	}



	/**
	 * get User ID
	 * @access public
	 * @return int
	 */
	public function user() {
		$user_id = $this->get( 'MTP_user_id' );
		return empty( $user_id ) ? get_current_user_id() : $user_id;
	}



	/**
	 * Wrapper for the user function() (preserve backward compat)
	 *
	 * @since  4.5.0
	 *
	 * @return int
	 */
	public function wp_user() {
		return $this->user();
	}



	/**
	 * This simply returns a count of all related events to this message template group
	 * @return int
	 */
	public function count_events() {
		return $this->count_related( 'Event' );
	}



	/**
	 * returns the name saved in the db for this template
	 * @return string
	 */
	public function name() {
		return $this->get( 'MTP_name' );
	}



	/**
	 * Returns the description saved in the db for this template group
	 * @return string
	 */
	public function description() {
		return $this->get( 'MTP_description' );
	}



	/**
	 * returns all related EE_Message_Template objects
	 * @param  array $query_params like EEM_Base::get_all()
	 * @return EE_Message_Template[]
	 */
	public function message_templates( $query_params = array() ) {
		return $this->get_many_related( 'Message_Template', $query_params );
	}



	/**
	 * get Message Messenger
	 * @access public
	 * @return string
	 */
	public function messenger() {
		return $this->get( 'MTP_messenger' );
	}



	/**
	 * get Message Messenger OBJECT
	 *
	 * If an attempt to get the corresponding messenger object fails, then we set this message
	 * template group to inactive, and save to db.  Then return null so client code can handle
	 * appropriately.
	 *
	 * @return EE_messenger
	 */
	public function messenger_obj() {
		$messenger = $this->messenger();
		try {
			$messenger = EEH_MSG_Template::messenger_obj( $messenger );
		} catch( EE_Error $e ) {
			//if an exception was thrown then let's deactivate this message template group because it means there is no class for this messenger in this group.
			$this->set( 'MTP_is_active', false );
			$this->save();
			return null;
		}
		return $messenger;
	}



	/**
	 * get Message Type
	 *
	 * @access public
	 * @return string
	 */
	public function message_type() {
		return $this->get( 'MTP_message_type' );
	}



	/**
	 * get Message type OBJECT
	 *
	 * If an attempt to get the corresponding message type object fails, then we set this message
	 * template group to inactive, and save to db.  Then return null so client code can handle
	 * appropriately.
	 *
	 * @throws EE_Error
	 * @return EE_message_type|false if exception thrown.
	 */
	public function message_type_obj() {
		$message_type = $this->message_type();
		try {
			$message_type = EEH_MSG_Template::message_type_obj( $message_type );
		} catch(EE_Error $e) {
			//if an exception was thrown then let's deactivate this message template group because it means there is no class for the message type in this group.
			$this->set( 'MTP_is_active', false );
			$this->save();
			return null;
		}
		return $message_type;
	}



	/**
	 * @return array
	 */
	public function contexts_config() {
		return $this->message_type_obj()->get_contexts();
	}



	/**
	 * This returns the context_label for contexts as set in the message type object
	 *
	 * @access public
	 * @return string label for "context"
	 */
	public function context_label() {
		$obj = $this->message_type_obj();
		return $obj->get_context_label();
	}



	/**
	 * This returns an array of EE_Message_Template objects indexed by context
	 * @return EE_Message_Template[]
	 */
	public function context_templates() {
		$mtps_arr = array();
		$mtps = $this->get_many_related( 'Message_Template' );
		if ( empty( $mtps ) ) {
			return array();
		}
		//note contexts could have CHECKBOX fields per context. So we return the objects indexed by context AND field.
		foreach ( $mtps as $mtp ) {
			$mtps_arr[ $mtp->get( 'MTP_context' ) ][ $mtp->get( 'MTP_template_field' ) ] = $mtp;
		}
		return $mtps_arr;
	}



	/**
	 * this returns if the template group this template belongs to is global
	 * @return boolean true if it is, false if it isn't
	 */
	public function is_global() {
		return $this->get( 'MTP_is_global' );
	}



	/**
	 * this returns if the template group this template belongs to is active (i.e. turned "on" or not)
	 * @return boolean true if it is, false if it isn't
	 */
	public function is_active() {
		return $this->get( 'MTP_is_active' );
	}



	/**
	 * This will return an array of shortcodes => labels from the messenger and message_type objects associated with this template.
	 *
	 * @since 4.3.0
	 * @uses  EEH_MSG_Template::get_shortcodes()
	 *
	 * @param string $context what context we're going to return shortcodes for
	 * @param array  $fields  what fields we're returning valid shortcodes for.  If empty then we assume all fields are to be returned.
	 * @param bool   $merged  If TRUE then we don't return shortcodes indexed by field but instead an array of the unique shortcodes for all the given (or all) fields.
	 * @return mixed (array|bool) an array of shortcodes in the format array( '[shortcode] => 'label') OR FALSE if no shortcodes found.
	 */
	public function get_shortcodes( $context, $fields = array(), $merged = FALSE ) {
		$messenger = $this->messenger();
		$message_type = $this->message_type();
		return EEH_MSG_Template::get_shortcodes( $message_type, $messenger, $fields, $context, $merged );
	}



	/**
	 * this just returns and array of instantiated shortcode objects given an array of object refs
	 *
	 * @access private
	 * @param $sc_refs
	 * @throws EE_Error
	 * @return array    an array of EE_Shortcode objects
	 */
	//private function _get_shortcode_objects( $sc_refs ) {
	//	$sc_objs = array();
	//	EED_Messages::set_autoloaders();
	//	foreach ( $sc_refs as $shortcode_ref ) {
	//		$ref = ucwords( str_replace( '_', ' ', $shortcode_ref ) );
	//		$ref = str_replace( ' ', '_', $ref );
	//		$classname = 'EE_' . $ref . '_Shortcodes';
	//		if ( ! class_exists( $classname ) ) {
	//			$msg[ ] = __( 'Shortcode library loading fail.', 'event_espresso' );
	//			$msg[ ] = sprintf( __( 'The class name checked was "%s". Please check the spelling and case of this reference and make sure it matches the appropriate shortcode library file name (minus the extension) in the "/library/shortcodes/" directory', 'event_espresso' ), $classname );
	//			throw new EE_Error( implode( '||', $msg ) );
	//		}
	//		$a = new ReflectionClass( $classname );
	//		$sc_objs[ ] = $a->newInstance();
	//	}
	//	return $sc_objs;
	//}



	/**
	 * This just gets the template pack name assigned to this message template group.  If it's not set, then we just use the default template pack.
	 *
	 * @since 4.5.0
	 *
	 * @return string
	 */
	public function get_template_pack_name() {
		return $this->get_extra_meta( 'MTP_template_pack', true, 'default' );
	}




	/**
	 * This returns the specific template pack object referenced by the template pack name attached to this message template group.  If no template pack is assigned then the default template pack is retrieved.
	 *
	 * @since 4.5.0
	 *
	 * @return EE_Messages_Template_Pack
	 */
	public function get_template_pack() {
		$pack_name = $this->get_template_pack_name();
		EE_Registry::instance()->load_helper( 'MSG_Template' );
		return EEH_MSG_Template::get_template_pack( $pack_name );
	}



	/**
	 * This retrieves the template variation assigned to this message template group.  If it's not set, then we just use the default template variation.
	 *
	 * @since 4.5.0
	 *
	 * @return string
	 */
	public function get_template_pack_variation() {
		return $this->get_extra_meta( 'MTP_variation', TRUE, 'default' );
	}



	/**
	 * This just sets the template pack name attached to this message template group.
	 *
	 * @since 4.5.0
	 * @param string $template_pack_name What message template pack is assigned.
	 * @return int
	 */
	public function set_template_pack_name( $template_pack_name ) {
		return $this->update_extra_meta( 'MTP_template_pack', $template_pack_name );
	}



	/**
	 * This just sets the template pack variation attached to this message template group.
	 *
	 * @since 4.5.0
	 * @param string $variation What variation is being set on the message template group.
	 * @return int
	 */
	public function set_template_pack_variation( $variation ) {
		return $this->update_extra_meta( 'MTP_variation', $variation );
	}
}
//end EE_Message_Template_Group class
