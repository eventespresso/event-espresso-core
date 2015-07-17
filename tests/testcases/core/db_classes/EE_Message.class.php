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

		//if object doesn't exist, let's generate a unique token on instantiation so that its available even before saving to db.
		if ( ! $has_object ) {
			EE_Registry::instance()->load_helper( 'URL' );
			$props_n_values['MSG_token'] = EEH_URL::generate_unique_token();
		}
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
	 * Gets MSG_token
	 *
	 * @return int
	 */
	public function MSG_token() {
		return $this->get( 'MSG_token' );
	}



	/**
	 * Sets MSG_token
	 *
	 * @param int $MSG_token
	 */
	public function set_MSG_token( $MSG_token) {
		$this->set( 'MSG_token', $MSG_token );
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
	 * Gets TXN_ID
	 *
	 * @return int
	 */
	public function TXN_ID() {
		return $this->get( 'TXN_ID' );
	}



	/**
	 * Sets TXN_ID
	 *
	 * @param int $TXN_ID
	 */
	public function set_TXN_ID( $TXN_ID) {
		$this->set( 'TXN_ID', $TXN_ID );
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
	 * Gets to
	 *
	 * @return string
	 */
	public function to() {
		return $this->get( 'MSG_to' );
	}



	/**
	 * Sets to
	 *
	 * @param string $to
	 */
	public function set_to( $to ) {
		$this->set( 'MSG_to', $to );
	}



	/**
	 * Gets from
	 *
	 * @return string
	 */
	public function from() {
		return $this->get( 'MSG_from' );
	}



	/**
	 * Sets from
	 *
	 * @param string $from
	 */
	public function set_from( $from ) {
		$this->set( 'MSG_from', $from );
	}



	/**
	 * This retrieves the value of the db column set on this class or if that's not present
	 * it will attempt to retrieve from extra_meta if found.
	 *
	 * Due to the dynamic nature of the EE_messages system, EE_messengers will always have a "to",
	 * "from", "subject", and "content" field (as represented in the EE_Message schema), however they may
	 * also have additional main fields specific to the messenger.  The system accomodates those extra
	 * fields through the EE_Extra_Meta table.  This method allows for EE_messengers to retrieve the
	 * value for those extra fields dynamically via the EE_message object.
	 *
	 * @param string $column_name  expecting the column name without the 'MSG_' prefix.
	 * @return mixed|null  value for the column if found.  null if not found.
	 */
	public function get_column_value( $column_name ) {
		$model_fields = $this->get_model()->field_settings( false );
		$column_value = null;
		//add prefix to column name
		$column_name = 'MSG_' . $column_name;
		if ( isset( $model_fields[$column_name] ) ) {
			$column_value = $this->get( $column_name );
		} else {
			//This isn't a column in the main table, let's see if it is in the extra meta.
			$column_value = $this->get_extra_meta( $column_name, true, null );
		}
		return $column_value;
	}




	/**
	 * This sets the column value on the db column if it exists for the given $column_name or
	 * saves it to EE_Extra_Meta if the given $column_name does not match a db column.
	 *
	 * @see EE_message::get_column_value for related documentation on the necessity of this method.
	 *
	 * @param string $column_name
	 * @param mixed  $column_value
	 * @return int|bool @see EE_Base_Class::update_extra_meta() for return docs.
	 */
	public function set_column_value( $column_name, $column_value ) {
		$model_fields = $this->get_model()->field_settings( false );
		//add prefix to column name
		$column_name = 'MSG_' . $column_name;
		if ( isset( $model_fields[$column_name] ) ) {
			$this->set( $column_name, $column_value );
			return $this->save();
		} else {
			//ensure this object is saved first so that extra meta can be properly related.
			$this->save();
			return $this->update_extra_meta( $column_name, $column_value );
		}
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