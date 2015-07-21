<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');


/**
 * Serves as a repository for EE_Message_Template_Group objects
 * @package    Event Espresso
 * @subpackage repository
 * @author     Darren Ethier
 * @since      4.9.0
 */
class EE_Message_Template_Group_Repository extends EE_Object_Repository {




	/**
	 * Adds the Message Template Group object to the repository.
	 *
	 * @param EE_Message_Template_Group $mtpg
	 * @param int                       $EVT_ID  Some templates are specific to EVT, so this is provided as a way of
	 *                                           indexing the template by key.
	 */
	public function add( EE_Message_Template_Group $mtpg, $EVT_ID = 0 ) {
		$data['key'] = $this->get_key( $mtpg->messenger(), $mtpg->message_type(), $EVT_ID );
		$this->addObject( $mtpg, $data );
	}




	/**
	 * This retrieves any EE_Message_Template_Group in the repo by its ID.
	 * @param $GRP_ID
	 * @return EE_Message_Template_Group | null
	 */
	public function get_by_ID( $GRP_ID ) {
		$this->rewind();
		while( $this->valid() ) {
			if ( $this->current()->ID() == $GRP_ID ) {
				$grp = $ths->current();
				$this->rewind();
				return $grp;
			}
			$this->next();
		}
		return null;
	}





	/**
	 * Generates a hash used to identify a given Message Template Group.
	 * @param string $messenger  The EE_messenger->name
	 * @param string $message_type  The EE_message_type->name
	 * @param int    $EVT_ID     Optional.  If the template is for a specific EVT then that should be included.
	 *
	 * @return string
	 */
	public function get_key( $messenger, $message_type, $EVT_ID = 0 ) {
		return md5( $messenger.$message_type.$EVT_ID );
	}


	/**
	 * This returns a saved EE_Message_Template_Group object if there is one in the repository indexed by a key matching
	 * the given string.
	 *
	 * @param string  $key  @see EE_Message_Template_Group::get_key() to setup a key formatted for searching.
	 *
	 * @return null|EE_Message_Template_Group
	 */
	public function get_by_key( $key ) {
		$this->rewind();
		while( $this->valid() ) {
			$data = $this->getInfo();
			if ( isset( $data['key'] ) && $data['key'] === $key ) {
				$handler = $this->current();
				$this->rewind();
				return $handler;
			}
			$this->next();
		}
		return null;
	}

} //end EE_Message_Template_Group_Repository