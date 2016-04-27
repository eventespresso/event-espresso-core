<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE Factory Class for EE_Message
 *
 * @since        4.9.0
 * @package       Event Espresso
 * @subpackage    tests
 * @author       Darren Ethier
 *
 */
class EE_UnitTest_Factory_For_Message extends WP_UnitTest_Factory_For_Thing {

	public function __construct( $factory = null ) {
		parent::__construct( $factory );
		//need to get the default setup Message_Template_Group so we have its id.
		$grp = EEM_Message_Template_Group::instance()->get_one( array( array( 'MTP_messenger' => 'email', 'MTP_message_type' => 'registration', 'MTP_is_global' => true ) ) );
		//default args for creating messages.
		$this->default_generation_definitions = array(
			'GRP_ID' => $grp instanceof EE_Message_Template_Group ? $grp->ID() : 0,
			'MSG_messenger'  => 'email',
			'MSG_message_type' => 'registration',
			'MSG_context' => 'admin',
			'MSG_to' => 'dude@example.com',
			'MSG_from' => 'admin@example.com',
			'MSG_subject' => new WP_UnitTest_Generator_Sequence( 'Message subject %s' ),
			'MSG_content' => new WP_UnitTest_Generator_Sequence( 'Message content excerpt %s' ),
			'STS_ID' => EEM_Message::status_incomplete
		);
	}



	/**
	 * used by factory to create message object
	 *
	 * @since 4.9.0
	 *
	 * @param array $args Incoming field values to set on the new object
	 *
	 * @return EE_Message|false
	 */
	public function create_object( $args ) {
		//allow callers to override the default persistence of the object to the db.
		if ( isset( $args['nosave'] ) ) {
			$save = false;
			unset( $args['nosave'] );
		} else {
			$save = true;
		}
		$message = EE_Message_Factory::create( $args );

		$msgID = $save ? $message->save() : 1;

		//if $save then let's attach the preview message handler so it can actually be generated
		if ( $save && $msgID ) {
			$message->set_field_or_extra_meta( 'data_handler_class_name', 'EE_Messages_Preview_incoming_data' );
		}

		return $msgID ? $message : false;
	}



	/**
	 * Update message object for given message
	 *
	 * @since 4.9.0
	 *
	 * @param int $MSG_ID Message ID for the message to update
	 * @param array $cols_n_data columns and values to change/update
	 *
	 * @return EE_Message|false
	 */
	public function update_object( $MSG_ID, $cols_n_data ) {
		//all the stuff for updating an message.
		$message = EEM_Message::instance()->get_one_by_ID( $MSG_ID );
		if ( ! $message instanceof EE_Message ) {
			return null;
		}
		foreach ( $cols_n_data as $key => $val ) {
			$message->set( $key, $val );
		}
		$success = $message->save();
		return $success ? $message : false;
	}



	/**
	 * return the message object for a given message ID
	 *
	 * @since 4.9.0
	 *
	 * @param int $MSG_ID the message id for the message to attempt to retrieve
	 *
	 * @return null|EE_Message
	 */
	public function get_object_by_id( $MSG_ID ) {
		return EEM_Message::instance()->get_one_by_ID( $MSG_ID );
	}



}
// End of file EE_UnitTest_Factory_For_Message.class.php
// Location: /EE_UnitTest_Factory_For_Message.class.php