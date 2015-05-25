<?php
/**
 * Contains definition for EEM_Event_Message_Template model
 * @package 		Event Espresso
 * @subpackage 	models
 * @since 			4.3.0
 */
 if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
 /**
 *	EEM_Event_Message_Template
 *	Model for relation table between EEM_Message_Template_Group and EEM_Event
 *
 * @package		Event Espresso
 * @subpackage 	models
 * @since 			4.3.0
 * @author			 Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
require_once( EE_MODELS . 'EEM_Base.model.php' );

class EEM_Event_Message_Template extends EEM_Base {

	// private instance of the EEM_Event_Message_Template object
	protected static $_instance = NULL;

	/**
	 * private constructor to prevent direct creation
	 * @Constructor
	 * @access private
	 * @return void
	 */
	protected function __construct( $timezone = NULL ) {
		$this->singlular_item = __('Event Message Template','event_espresso');
		$this->plural_item = __('Event Message Templates','event_espresso');

		$this->_tables = array(
			'Event_Message_Template'=> new EE_Primary_Table('esp_event_message_template', 'EMT_ID')
		);
		$this->_fields = array(
			'Event_Message_Template'=>array(
				'EMT_ID'=>new EE_Primary_Key_Int_Field('EMT_ID', __('Event Message Template ID','event_espresso')),
				'EVT_ID'=>new EE_Foreign_Key_Int_Field('EVT_ID', __('The ID to the Event','event_espresso'), false, 0, 'Event' ),
				'GRP_ID'=>new EE_Foreign_Key_Int_Field('GRP_ID', __('The ID to the Message Template Group','event_espresso'), false, 0, 'Message_Template_Group' )
			));
		$this->_model_relations = array(
			'Event'=>new EE_Belongs_To_Relation(),
			'Message_Template_Group'=>new EE_Belongs_To_Relation()
		);
		$this->_cap_restriction_generators[ EEM_Base::caps_read ] = new EE_Restriction_Generator_Event_Related_Public( 'Event' );
		$this->_cap_restriction_generators[ EEM_Base::caps_read_admin ] = new EE_Restriction_Generator_Event_Related_Protected( 'Event' );
		$this->_cap_restriction_generators[ EEM_Base::caps_edit ] = new EE_Restriction_Generator_Event_Related_Protected( 'Event' );
		$this->_cap_restriction_generators[ EEM_Base::caps_delete ] = new EE_Restriction_Generator_Event_Related_Protected( 'Event', EEM_Base::caps_edit );

		parent::__construct( $timezone );
	}



	/**
	 * helper method to simply return an array of event ids for events attached to the given
	 * message template group.
	 *
	 * @since 4.3.0
	 *
	 * @param  int    $GRP_ID The MTP group we want attached events for.
	 * @return  array               An array of event ids.
	 */
	public function get_attached_event_ids( $GRP_ID ) {
		$event_ids = $this->_get_all_wpdb_results( array( array( 'GRP_ID' => $GRP_ID ) ), ARRAY_N, 'EVT_ID' );
		$event_ids = call_user_func_array( 'array_merge', $event_ids );
		return $event_ids;
	}



	/**
	 * helper method for clearing event/group relations for the given event ids and grp ids.
	 * @param  array $GRP_IDs  An array of GRP_IDs. Optional. If empty then there must be EVTIDs.
	 * @param  array $EVT_IDs  An array of EVT_IDs.  Optional. If empty then there must be
	 *                         	       GRPIDs.
	 * @return int 		       How many rows were deleted.
	 */
	public function delete_event_group_relations( $GRP_IDs = array(), $EVT_IDs = array() ) {
		if ( empty( $GRP_IDs ) && empty( $EVT_IDs ) )
			throw new EE_Error( sprintf( __('%s requires either an array of GRP_IDs or EVT_IDs or both, but both cannot be empty.', 'event_espresso' ), __METHOD__ ) );

		if ( !empty( $GRP_IDs ) )
			$where['GRP_ID'] = array( 'IN', (array) $GRP_IDs );

		if ( !empty( $EVT_IDs ) )
			$where['EVT_ID'] = array( 'IN', (array) $EVT_IDs );

		return $this->delete( array( $where ), FALSE );
	}

} //end class EEM_Event_Message_Template
