<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package        Event Espresso
 * @ author        Event Espresso
 * @ copyright    (c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license        {@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link                {@link http://www.eventespresso.com}
 * @ since            4.0
 *
 */





/**
 * EE_Message class
 *
 * @package 			Event Espresso
 * @subpackage 	includes/classes/EE_Message.class.php
 * @author 				Mike Nelson
 */
class EE_Message extends EE_Base_Class {


	/**
	 *
	 * @param array $props_n_values
	 * @param string $timezone
	 * @return EE_Message
	 */
	public static function new_instance( $props_n_values = array(), $timezone = '' ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__ );
		return $has_object ? $has_object : new self( $props_n_values, FALSE, $timezone );
	}



	/**
	 *
	 * @param array $props_n_values
	 * @param string $timezone
	 * @return EE_Message
	 */
	public static function new_instance_from_db( $props_n_values = array(), $timezone = '' ) {
		return new self( $props_n_values, TRUE, $timezone );
	}



	/**
	 * Gets messenger
	 * @return string
	 */
	function messenger() {
		return $this->get( 'MSG_messenger' );
	}



	/**
	 * Sets messenger
	 * @param string $messenger
	 * @return boolean
	 */
	function set_messenger( $messenger) {
		return $this->set( 'MSG_messenger', $messenger);
	}
	/**
	 * Gets message_type
	 * @return string
	 */
	function message_type() {
		return $this->get( 'MSG_message_type' );
	}



	/**
	 * Sets message_type
	 * @param string $message_type
	 * @return boolean
	 */
	function set_message_type( $message_type) {
		return $this->set( 'MSG_message_type', $message_type);
	}
	/**
	 * Gets context
	 * @return string
	 */
	function context() {
		return $this->get( 'MSG_context' );
	}



	/**
	 * Sets context
	 * @param string $context
	 * @return boolean
	 */
	function set_context( $context) {
		return $this->set( 'MSG_context', $context);
	}
	/**
	 * Gets recipient_ID
	 * @return string
	 */
	function recipient_ID() {
		return $this->get( 'MSG_recipient_ID' );
	}



	/**
	 * Sets recipient_ID
	 * @param string $recipient_ID
	 * @return boolean
	 */
	function set_recipient_ID( $recipient_ID) {
		return $this->set( 'MSG_recipient_ID', $recipient_ID);
	}
	/**
	 * Gets recipient_type
	 * @return string
	 */
	function recipient_type() {
		return $this->get( 'MSG_recipient_type' );
	}



	/**
	 * Sets recipient_type
	 * @param string $recipient_type
	 * @return boolean
	 */
	function set_recipient_type( $recipient_type) {
		return $this->set( 'MSG_recipient_type', $recipient_type);
	}
	/**
	 * Gets content
	 * @return string
	 */
	function content() {
		return $this->get( 'MSG_content' );
	}



	/**
	 * Sets content
	 * @param string $content
	 * @return boolean
	 */
	function set_content( $content) {
		return $this->set( 'MSG_content', $content);
	}
	/**
	 * Gets address_to
	 * @return string
	 */
	function address_to() {
		return $this->get( 'MSG_address_to' );
	}



	/**
	 * Sets address_to
	 * @param string $address_to
	 * @return boolean
	 */
	function set_address_to( $address_to) {
		return $this->set( 'MSG_address_to', $address_to);
	}
	/**
	 * Gets address_from
	 * @return string
	 */
	function address_from() {
		return $this->get( 'MSG_address_from' );
	}



	/**
	 * Sets address_from
	 * @param string $address_from
	 * @return boolean
	 */
	function set_address_from( $address_from) {
		return $this->set( 'MSG_address_from', $address_from);
	}
	/**
	 * Gets priority
	 * @return int
	 */
	function priority() {
		return $this->get( 'MSG_priority' );
	}



	/**
	 * Sets priority
	 * @param int $priority
	 * @return boolean
	 */
	function set_priority( $priority) {
		return $this->set( 'MSG_priority', $priority);
	}
	/**
	 * Gets STS_ID
	 * @return string
	 */
	function STS_ID() {
		return $this->get( 'STS_ID' );
	}



	/**
	 * Sets STS_ID
	 * @param string $STS_ID
	 * @return boolean
	 */
	function set_STS_ID( $STS_ID) {
		return $this->set( 'STS_ID', $STS_ID);
	}
	/**
	 * Gets created
	 * @return string
	 */
	function created() {
		return $this->get( 'MSG_created' );
	}



	/**
	 * Sets created
	 * @param string $created
	 * @return boolean
	 */
	function set_created( $created) {
		return $this->set( 'MSG_created', $created);
	}
	/**
	 * Gets modified
	 * @return string
	 */
	function modified() {
		return $this->get( 'MSG_modified' );
	}



	/**
	 * Sets modified
	 * @param string $modified
	 * @return boolean
	 */
	function set_modified( $modified) {
		return $this->set( 'MSG_modified', $modified);
	}




}/* End of file EE_Message.class.php */
/* Location: includes/classes/EE_Message.class.php */
