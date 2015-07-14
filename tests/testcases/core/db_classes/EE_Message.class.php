<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * EE_Message class
 *
 * @package 	Event Espresso
 * @subpackage 	db classes
 * @author 		Mike Nelson
 */
class EE_Message extends EE_Base_Class {

	/**
	 *
	 * @param array  $props_n_values
	 * @param string $timezone
	 * @param array  incoming date formats in an array.  First value is the date_format, second is time format.
	 * @return EE_Message
	 */
	public static function new_instance( $props_n_values = array(), $timezone = null, $date_formats = array() ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__ );
		return $has_object ? $has_object : new self( $props_n_values, false, $timezone, $date_formats );
	}



	/**
	 *
	 * @param array  $props_n_values
	 * @param string $timezone
	 * @return EE_Message
	 */
	public static function new_instance_from_db( $props_n_values = array(), $timezone = null ) {
		return new self( $props_n_values, true, $timezone );
	}




	/**
	 * Gets GRP_ID
	 *
	 * @return int
	 */
	public function GRP_ID() {
		return $this->get( 'GRP_ID' );
	}



	/**
	 * Sets GRP_ID
	 *
	 * @param int $GRP_ID
	 */
	public function set_GRP_ID( $GRP_ID ) {
		$this->set( 'GRP_ID', $GRP_ID );
	}




	/**
	 * Gets messenger
	 *
	 * @return string
	 */
	public function messenger() {
		return $this->get( 'MSG_messenger' );
	}



	/**
	 * Sets messenger
	 *
	 * @param string $messenger
	 */
	public function set_messenger( $messenger ) {
		$this->set( 'MSG_messenger', $messenger );
	}



	/**
	 * Gets message_type
	 *
	 * @return string
	 */
	public function message_type() {
		return $this->get( 'MSG_message_type' );
	}



	/**
	 * Sets message_type
	 *
	 * @param string $message_type
	 */
	public function set_message_type( $message_type ) {
		$this->set( 'MSG_message_type', $message_type );
	}



	/**
	 * Gets context
	 *
	 * @return string
	 */
	public function context() {
		return $this->get( 'MSG_context' );
	}



	/**
	 * Sets context
	 *
	 * @param string $context
	 */
	public function set_context( $context ) {
		$this->set( 'MSG_context', $context );
	}



	/**
	 * Gets recipient_ID
	 *
	 * @return int
	 */
	public function recipient_ID() {
		return $this->get( 'MSG_recipient_ID' );
	}



	/**
	 * Sets recipient_ID
	 *
	 * @param string $recipient_ID
	 */
	public function set_recipient_ID( $recipient_ID ) {
		$this->set( 'MSG_recipient_ID', $recipient_ID );
	}



	/**
	 * Gets recipient_type
	 *
	 * @return string
	 */
	public function recipient_type() {
		return $this->get( 'MSG_recipient_type' );
	}



	/**
	 * Sets recipient_type
	 *
	 * @param string $recipient_type
	 */
	public function set_recipient_type( $recipient_type ) {
		$this->set( 'MSG_recipient_type', $recipient_type );
	}



	/**
	 * Gets content
	 *
	 * @return string
	 */
	public function content() {
		return $this->get( 'MSG_content' );
	}



	/**
	 * Sets content
	 *
	 * @param string $content
	 */
	public function set_content( $content ) {
		$this->set( 'MSG_content', $content );
	}



	/**
	 * Gets subject
	 *
	 * @return string
	 */
	public function subject() {
		return $this->get( 'MSG_subject' );
	}



	/**
	 * Sets subject
	 *
	 * @param string $subject
	 */
	public function set_subject( $subject ) {
		$this->set( 'MSG_subject', $subject );
	}



	/**
	 * Gets address_to
	 *
	 * @return string
	 */
	public function address_to() {
		return $this->get( 'MSG_address_to' );
	}



	/**
	 * Sets address_to
	 *
	 * @param string $address_to
	 */
	public function set_address_to( $address_to ) {
		$this->set( 'MSG_address_to', $address_to );
	}



	/**
	 * Gets address_from
	 *
	 * @return string
	 */
	public function address_from() {
		return $this->get( 'MSG_address_from' );
	}



	/**
	 * Sets address_from
	 *
	 * @param string $address_from
	 */
	public function set_address_from( $address_from ) {
		$this->set( 'MSG_address_from', $address_from );
	}
	



	/**
	 * Gets priority
	 *
	 * @return int
	 */
	public function priority() {
		return $this->get( 'MSG_priority' );
	}



	/**
	 * Sets priority
	 *
	 * @param int $priority
	 */
	public function set_priority( $priority ) {
		$this->set( 'MSG_priority', $priority );
	}



	/**
	 * Gets STS_ID
	 *
	 * @return string
	 */
	public function STS_ID() {
		return $this->get( 'STS_ID' );
	}



	/**
	 * Sets STS_ID
	 *
	 * @param string $STS_ID
	 */
	public function set_STS_ID( $STS_ID ) {
		$this->set( 'STS_ID', $STS_ID );
	}



	/**
	 * Gets created
	 *
	 * @return string
	 */
	public function created() {
		return $this->get( 'MSG_created' );
	}



	/**
	 * Sets created
	 *
	 * @param string $created
	 */
	public function set_created( $created ) {
		$this->set( 'MSG_created', $created );
	}



	/**
	 * Gets modified
	 *
	 * @return string
	 */
	public function modified() {
		return $this->get( 'MSG_modified' );
	}



	/**
	 * Sets modified
	 *
	 * @param string $modified
	 */
	public function set_modified( $modified ) {
		$this->set( 'MSG_modified', $modified );
	}



}
/* End of file EE_Message.class.php */
/* Location: /core/db_classes/EE_Message.class.php */