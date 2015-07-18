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
class EE_Message_Repository extends EE_Object_Repository {




	/**
	 * Add the EE_Message to the repository.
	 * This also ensures that the MSG_token is saves as a part of the info for retrieval.
	 *
	 * @param EE_Message $message
	 * @param mixed      $info     Any included data is saved in the attached object info array indexed by 'data'
	 * @return bool
	 */
	public function add( EE_Message $message, $info = null ) {
		$data['token'] = $message->MSG_token();
		if ( $info ) {
			$data['data'] = $info;
		}
		return $this->addObject( $message, $data );
	}




	/**
	 * Remove given EE_Message from repository.
	 * @param EE_Message $message
	 * @param bool       $persist   If true then attempt to delete from db as well.
	 * @return void
	 */
	public function remove( EE_Message $message, $persist = false ) {
		if ( $persist ) {
			$this->persistObject( $message, 'delete' );
		}
		$this->removeObject( $message );
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
		while( $this->valid() ) {
			$saved = $this->current()->save();
			if ( $saved === false ) {
				$save_tracking['errors'][] = $this->current()->MSG_token();
			} elseif ( $saved ) {
				$save_tracking['updated']++;
			} else {
				$save_tracking['notupdated']++;
			}
			$this->next();
		}

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
			if ( isset( $data['token'] ) && $data['token'] === $token ) {
				$message = $this->current();
				$this->rewind();
				return $message;
			}
			$this->next();
		}
		return null;
	}



}