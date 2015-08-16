<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * EE_Message class
 *
 * @package 	Event Espresso
 * @subpackage 	db classes
 * @author 		Darren Ethier
 */
class EE_Message extends EE_Base_Class implements EEI_Admin_Links {

	/**
	 * @deprecated 4.9.0  Added for backward compat with add-on's
	 * @type null
	 */
	public $template_pack;



	/**
	 * @deprecated 4.9.0 Added for backward compat with add-on's
	 * @type null
	 */
	public $template_variation;




	/**
	 * @deprecated 4.9.0 Added for backward compat with add-on's
	 * @type string
	 */
	public $content = '';

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
	 * Returns corresponding messenger object for the set messenger on this message
	 *
	 * @return EE_messenger | null
	 */
	public function messenger_object() {
		EE_Registry::instance()->load_helper( 'MSG_Template' );
		return EEH_MSG_Template::messenger_obj( $this->messenger() );
	}



	/**
	 * This returns the set localized label for the messenger on this message.
	 * Note, if unable to retrieve the EE_messenger object then will just return the messenger slug saved
	 * with this message.
	 *
	 * @param   bool    $plural whether to return the plural label or not.
	 * @return string
	 */
	public function messenger_label( $plural = false ) {
		$label_type = $plural ? 'plural' : 'singular';
		$messenger = $this->messenger_object();
		return $messenger instanceof EE_messenger ? $messenger->label[ $label_type ] : $this->messenger();
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
	 * Returns the message type object for the set message type on this message
	 *
	 * @return EE_message_type | null
	 */
	public function message_type_object() {
		EE_Registry::instance()->load_helper( 'MSG_Template' );
		return EEH_MSG_Template::message_type_obj( $this->message_type() );
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
	 * This returns the set localized label for the message type on this message.
	 * Note, if unable to retrieve the EE_message_type object then will just return the message type slug saved
	 * with this message.
	 *
	 * @param   bool    $plural whether to return the plural label or not.
	 * @return string
	 */
	public function message_type_label( $plural = false ) {
		$label_type = $plural ? 'plural' : 'singular';
		$message_type = $this->message_type_object();
		return $message_type instanceof EE_message_type ? $message_type->label[ $label_type ] : $this->message_type();
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
	 * Return the related object matching the recipient type and ID.
	 *
	 * @return EE_Base_Class | null
	 */
	public function recipient_object() {
		if ( ! $this->recipient_type() || ! $this->recipient_ID() ) {
			return null;
		}

		return $this->get_first_related( $this->recipient_type() );
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
		$to = $this->get( 'MSG_to' );
		return empty( $to ) ? __( 'No recipient', 'event_espresso' ) : $to;
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




	/**
	 * Sets generation data for this message.
	 * @param mixed $data
	 */
	public function set_generation_data( $data ) {
		$this->set_field_or_extra_meta( 'MSG_generation_data', $data );
	}





	/**
	 * Returns any set generation data for this message.
	 * @return mixed|null
	 */
	public function get_generation_data() {
		return $this->get_field_or_extra_meta( 'MSG_generation_data' );
	}




	/**
	 * Gets any error message.
	 * @return mixed|null
	 */
	public function error_message() {
		return $this->get_field_or_extra_meta( 'MSG_error' );
	}


	/**
	 * Sets an error message.
	 * @param $message
	 * @return bool|int
	 */
	public function set_error_message( $message ) {
		return $this->set_field_or_extra_meta( 'MSG_error', $message );
	}




	/**
	 * This retrieves the associated template pack with this message.
	 * @return EE_Messages_Template_Pack | null
	 */
	public function get_template_pack() {
		/**
		 * This is deprecated functionality that will be removed eventually but included here now for backward compat.
		 */
		if ( ! empty( $this->template_pack ) ) {
			return $this->template_pack;
		}
		/** @type EE_Message_Template_Group $grp */
		$grp = $this->get_first_related( 'Message_Template_Group' );
		//if no group then let's try to get the first related group by internal messenger and message type (will use global grp).
		if ( ! $grp instanceof EE_Message_Template_Group ) {
			$grp = EEM_Message_Template_Group::instance()->get_one( array( array(
				'MTP_messenger' => $this->messenger(),
				'MTP_message_type' => $this->message_type(),
				'MTP_is_global' => true
			) ) );
		}

		return $grp instanceof EE_Message_Template_Group ? $grp->get_template_pack() : null;
	}




	/**
	 * Retrieves the variation used for generating this message.
	 * @return string
	 */
	public function get_template_pack_variation() {
		/**
		 * This is deprecated functionality that will be removed eventually but included here now for backward compat.
		 */
		if ( ! empty( $this->template_variation ) ) {
			return $this->template_variation;
		}

		/** @type EE_Message_Template_Group $grp */
		$grp = $this->get_first_related( 'Message_Template_Group' );

		//if no group then let's try to get the first related group by internal messenger and message type (will use global grp).
		if ( ! $grp instanceof EE_Message_Template_Group ) {
			$grp = EEM_Message_Template_Group::instance()->get_one( array( array(
				'MTP_messenger' => $this->messenger(),
				'MTP_message_type' => $this->message_type(),
				'MTP_is_global' => true
			) ) );
		}

		return $grp instanceof EE_Message_Template_Group ? $grp->get_template_pack_variation() : '';
	}

	/**
	 * Return the link to the admin details for the object.
	 * @return string
	 */
	public function get_admin_details_link() {
		EE_Registry::instance()->load_helper( 'URL' );
		EE_Registry::instance()->load_helper( 'MSG_Template' );
		switch ( $this->STS_ID() ) {
			case EEM_Message::status_failed :
				return EEH_MSG_Template::generate_error_display_trigger( $this );
				break;

			case EEM_Message::status_sent :
				return EEH_MSG_Template::generate_browser_trigger( $this );
				break;

			default :
				return '';
		}
	}

	/**
	 * Returns the link to the editor for the object.  Sometimes this is the same as the details.
	 * @return string
	 */
	public function get_admin_edit_link() {
		return '';
	}

	/**
	 * Returns the link to a settings page for the object.
	 * @return string
	 */
	public function get_admin_settings_link() {
		EE_Registry::instance()->load_helper( 'URL' );
		return EEH_URL::add_query_args_and_nonce(
			array(
				'page' => 'espresso_messages',
				'action' => 'settings',
			),
			admin_url( 'admin.php' )
		);
	}

	/**
	 * Returns the link to the "overview" for the object (typically the "list table" view).
	 * @return string
	 */
	public function get_admin_overview_link() {
		EE_Registry::instance()->load_helper( 'URL' );
		return EEH_URL::add_query_args_and_nonce(
			array(
				'page' => 'espresso_messages',
				'action' => 'default',
			),
			admin_url( 'admin.php' )
		);
	}


}
/* End of file EE_Message.class.php */
/* Location: /core/db_classes/EE_Message.class.php */