<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }

/**
 * This class is the signature for an object representing prepped message for queueing.
 * This particular "Message To Generate" class receives an EE_Messages_Queue object and uses
 * that to create content for the new aggregate EE_Message object.
 *
 * @package    Event Espresso
 * @subpackage messages
 * @author     Darren Ethier
 * @since      4.9.0
 */
class EE_Message_To_Generate_From_Queue extends EE_Message_To_Generate {


	/**
	 * Will hold an EE_Messages_Queue object
	 * @type EE_Messages_Queue
	 */
	public $queue = array();

	/**
	 * @param string            $messenger  The messenger being used to send the message
	 * @param string            $message_type  The message type being used to grab variations etc.
	 * @param EE_Messages       $ee_msg
	 * @param EE_Messages_Queue $queue
	 */
	public function __construct( $messenger, $message_type, EE_Messages $ee_msg, EE_Messages_Queue $queue ) {
		parent::__construct( $messenger, $message_type, array(), $ee_msg );
		$this->queue = $queue;
	}



	/**
	 *  Returns an instantiated EE_Message object from the internal data.
	 */
	public function get_EE_Message() {
		if ( ! $this->valid() ) {
			return null;
		}
		if ( $this->_EE_Message instanceof EE_Message ) {
			return $this->_EE_Message;
		}
		$this->_EE_Message = $this->_EE_Message instanceof EE_Message
			? $this->_EE_Message
			: EE_Message_Factory::create(
				array(
					'MSG_messenger' => $this->messenger->name,
					'MSG_message_type' => $this->message_type->name,
					'MSG_context' => $this->context,
					'MSG_content' => $this->_get_content(),
					'STS_ID' => EEM_Message::status_idle,
					'MSG_priority' => $this->_get_priority_for_message_type()
				)
			);
		return $this->_EE_Message;
	}




	/**
	 * Uses the EE_Messages_Queue currently set on this object to generate the content
	 * for the single EE_Message aggregate object returned by get_EE_Message
	 * @return string;
	 */
	protected function _get_content() {
		$content = '';
		$this->queue->get_queue()->rewind();
		while ( $this->queue->get_queue()->valid() ) {
			$content .= $this->queue->get_queue()->current()->content();
			$this->queue->get_queue()->next();
		}
		return $content;
	}



} //end class EE_Message_To_Generate