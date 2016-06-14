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
	 * @param string            $messenger_name  The messenger being used to send the message
	 * @param string            $message_type_name  The message type being used to grab variations etc.
	 * @param EE_Messages_Queue $queue
	 * @param string            $custom_subject  Used if a custom subject is desired for the generated aggregate EE_Message object
	 */
	public function __construct( $messenger_name, $message_type_name, EE_Messages_Queue $queue, $custom_subject = '' ) {
		$this->queue = $queue;
		parent::__construct( $messenger_name, $message_type_name, array(), '', false, EEM_Message::status_idle );
		if ( $this->valid() ) {
			$this->_message->set_content( $this->_get_content() );
			$this->_message->set_subject( $this->_get_subject( $custom_subject ) );
		}
	}



	/**
	 * Uses the EE_Messages_Queue currently set on this object to generate the content
	 * for the single EE_Message aggregate object returned by get_EE_Message
	 * @return string;
	 */
	protected function _get_content() {
		$content = '';
		$this->queue->get_message_repository()->rewind();
		while ( $this->queue->get_message_repository()->valid() ) {
			$content .= $this->queue->get_message_repository()->current()->content();
			$this->queue->get_message_repository()->next();
		}
		return $content;
	}


	/**
	 * Return a subject string to use for `MSG_Subject` in the aggregate EE_Message object.
	 * @param string $custom_subject
	 *
	 * @return string
	 */
	protected function _get_subject( $custom_subject = '' ) {
		if ( ! empty( $custom_subject ) ) {
			return $custom_subject;
		}
		$this->queue->get_message_repository()->rewind();
		$count_of_items = $this->queue->get_message_repository()->count();

		//if $count of items in queue == 1, then let's just return the subject for that item.
		if ( $count_of_items === 1 ) {
			return $this->queue->get_message_repository()->current()->subject();
		}

		return sprintf(
			_n(
				'Showing Aggregate output for 1 result',
				'Showing Aggregate output for %d items',
				$count_of_items,
				'event_espresso'
			),
			$count_of_items
		);
	}



} //end class EE_Message_To_Generate