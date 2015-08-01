<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');


/**
 * Serves as a repository for EE_Message objects
 * @package    Event Espresso
 * @subpackage repository
 * @author     Darren Ethier
 * @since      4.9.0
 */
class EE_Message_Repository extends EE_Base_Class_Repository {



	public function __construct() {
		$this->interface = 'EE_Message';
	}


	/**
	 * Add the EE_Message to the repository.
	 * This also ensures that the MSG_token is saves as a part of the info for retrieval.
	 *
	 * @param EE_Message $message
	 * @param mixed $info Any included data is saved in the attached object info array indexed by 'data'
	 *
	 * @return bool
	 */
	public function add( $message, $info = null ) {
		$attached = parent::add( $message );
		//ensure $info is an array if not already
		$info = $info === null ? $info = array() : (array) $info;
		if ( isset( $info['preview'] ) ) {
			$data['preview'] = $info['preview'];
			unset( $info['preview'] );
		} else {
			$data['preview'] = false;
		}
		if ( $attached ) {
			if ( $message->STS_ID() === EEM_Message::status_incomplete ) {
				$generation_data = isset( $info['MSG_generation_data'] ) ? $info['MSG_generation_data'] : array();
				//if data isn't in $info...let's see if its available via the message object
				$generation_data = ! $generation_data ? $message->get_generation_data() : $generation_data;
				//still empty then let's just use info
				$generation_data = ! $generation_data ? $info : $generation_data;
				$data['data']['MSG_generation_data'] = $generation_data;
			} else {
				$data['data']['MSG_generation_data'] = array();
			}
			$this->set_info( $message, $data );
		}
		return $attached;
	}





	/**
	 * Save all EE_Message objects to the db.
	 * @return array  array(
	 *                  'updated' => 0, //count of how many messages updated
	 *                  'notupdated' => 0, //count of how many messages not updated.
	 *                  'errors' => array( $token ), //array of message object tokens that had errors in saving
	 *                )
	 */
	public function saveAll() {
		$this->rewind();
		$save_tracking = array( 'updated' => 0, 'notupdated' => 0, 'errors' => array() );

		//exit early if there is nothing to save.
		if ( ! $this->count() > 0 ) {
			return $save_tracking;
		}

		while( $this->valid() ) {

			$saved = $this->current()->save();
			if ( $saved === false ) {
				$save_tracking['errors'][] = $this->current()->MSG_token();
			} elseif ( $saved ) {
				$save_tracking['updated']++;
			} else {
				$save_tracking['notupdated']++;
			}
			//maybe persist generation data if this is an incomplete EE_Message.
			$this->_maybe_persist_generation_data();

			$this->next();
		}
		return $save_tracking;
	}






	/**
	 * Retrieves a EE_Message from the repository that matches the given token.
	 *
	 * @param string   $token   Token.
	 * @return EE_Message | null
	 */
	public function getMessageByToken( $token ) {
		$this->rewind();
		while( $this->valid() ) {
			$data = $this->getInfo();
			if ( $this->current()->MSG_token() === $token ) {
				$message = $this->current();
				$this->rewind();
				return $message;
			}
			$this->next();
		}
		return null;
	}





	/**
	 * This retrieves any data required for generation that may be saved with the current EE_Message in storage.
	 *
	 * @return array();
	 */
	public function get_generation_data() {
		//first verify we're at a valid iterator point.
		if ( ! $this->valid() ) {
			return array();
		}
		$info = $this->getInfo();

		return isset( $info['data'] ) && isset( $info['data']['MSG_generation_data'] ) ? $info['data']['MSG_generation_data'] : array();
	}





	/**
	 *  Returns whether this EE_Message is for a preview or not.
	 */
	public function is_preview() {
		if ( ! $this->valid() ) {
			return;
		}
		$info = $this->getInfo();
		return $info['preview'];
	}







	/**
	 *  This checks if the current EE_Message in the iterator is incomplete. If it is, then
	 *  data is attached for later retrieval (batch generation).
	 */
	protected function _maybe_persist_generation_data() {
		if ( ! $this->valid() ) {
			return;
		}

		$info = $this->getInfo();
		$data = isset( $info['data'] ) && isset( $info['data']['MSG_generation_data'] ) ? $info['data']['MSG_generation_data'] : array();
		if ( $data && $this->current()->STS_ID() === EEM_Message::status_incomplete ) {
			$this->current()->set_generation_data( $data );
		}
	}




	/**
	 * This method returns a count of messages in the repository that have a given priority.
	 * @param int $priority the priority that is being filtered for the count.
	 * @param bool|string $status the optional status that will also be filtered by when priority matches.
	 * @return int  count of messages in the queue matching the conditions.
	 */
	public function count_by_priority_and_status( $priority, $status = false ) {
		$count = 0;
		$this->rewind();
		while( $this->valid() ) {
			if ( $this->current()->priority() == $priority && ( $status && $status == $this->current->STS_ID() ) ) {
				$count++;
			}
			$this->next();
		}
		return $count;
	}

}