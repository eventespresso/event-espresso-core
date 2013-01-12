<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link					{@link http://www.eventespresso.com}
 * @ since		 		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * EE_Answer class
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Answer.class.php
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Question_Group {
	
	/**
	 * ID of this question gruop
	 * @access private
	 * @var int
	 */
	private $_QSG_ID=FALSE;
	
	/**
	 * Name of this question group. eg, 'addrss info'
	 * @access private
	 * @var stirng
	 */
	private $_QSG_name=NULL;
	
	/**
	 * The unique identifier used for this question group within the system
	 * @access private
	 * @var string
	 */
	private $_QSG_identifier=NULL;
	
	/**
	 * Question group descripton
	 * @access private
	 * @var string
	 */
	private $_QSG_desc=NULL;
	
	/**
	 * Integer to indicate where this question group
	 * should be placed relative to other question gruops in a sequence
	 * @access private 
	 * @var int
	 */
	private $_QSG_order=NULL;
	
	/**
	 * Boolean to indicate whether the group name
	 * should be shown when displaying this question group
	 * on the frontend
	 * @access private
	 * @var boolean 
	 */
	private $_QSG_show_group_name=NULL;
	
	/**
	 * Boolean to dinicate whether the group description
	 * should be shown when displayign this question gruop
	 * on the frontend
	 * @access private
	 * @var boolean 
	 */
	private $_QSG_show_group_desc=NULL;
	
	/**
	 * Boolean to indicate whether this question gruop
	 * is a mandatory one, ie integral to the system
	 * @access private
	 * @var boolea 
	 */
	private $_QSG_system_group=NULL;
	
	/**
	 * Boolean which indicates whether thsi question group
	 * has been deleted or not
	 * @access private
	 * @var boolean 
	 */
	private $_QSG_deleted=NULL;
	
	/**
	 * 
	 * @param string $QSG_name name of question group
	 * @param string $QSG_identifier string ofr identifying the question group internally
	 * @param string $QSG_desc description
	 * @param int $QSG_order int to indicate where this question gruop should be displayed relative to others
	 * @param boolean $QSG_show_group_name whether to show the question group name on the frontend
	 * @param boolean $QSG_show_group_desc whether to show the question gruop description on teh frontend
	 * @param string $QSG_system_group boolean indicates whether this question group is integral to the system, or an extra one
	 * @param boolean $QSG_deleted indicates whether this question gruop has been 'deleted'
	 * @access public
	 */
	public function __construct(
			$QSG_name=NULL,
			$QSG_identifier=NULL,
			$QSG_desc=NULL,
			$QSG_order=NULL,
			$QSG_show_group_name=NULL,
			$QSG_show_group_desc=NULL,
			$QSG_system_group=NULL,
			$QSG_deleted=NULL) {
		$this->_QSG_name=$QSG_name;
		$this->_QSG_identifier=$QSG_identifier;
		$this->_QSG_desc=$QSG_desc;
		$this->_QSG_order=$QSG_order;
		$this->_QSG_show_group_name=$QSG_show_group_name;
		$this->_QSG_show_group_desc=$QSG_show_group_desc;
		$this->_QSG_system_group=$QSG_system_group;
		$this->_QSG_deleted=$QSG_deleted;
	}
	
	/**
	*		save object to db
	* 
	* 		@access		private
	* 		@param		array		$where_cols_n_values
	*		@return int, 1 on a successful update, the ID of
	*					the new entry on insert; 0 on failure		
	*/	
	private function _save_to_db( $where_cols_n_values = FALSE ) {
		
		 $MODEL = EEM_Question_Group::instance();
		
		$set_column_values = array(		
			'QSG_name'=>$this->_QSG_name,
			'QSG_identifier'=>$this->_QSG_identifier,
			'QSG_desc'=>$this->_QSG_desc,
			'QSG_order'=>$this->_QSG_order,
			'QSG_show_group_name'=>$this->_QSG_show_group_name,
			'QSG_show_group_desc'=>$this->_QSG_show_group_desc,
			'QSG_system_group'=>$this->_QSG_system_group,
			'QSG_deleted'=>$this->_QSG_deleted
		);

		if ( $where_cols_n_values ){
			$results = $MODEL->update ( $set_column_values, $where_cols_n_values );
		} else {
			$results = $MODEL->insert ( $set_column_values );
		}
		
		return $results;
	}
	
	/**
	*		update existing db record
	* 
	* 		@access		public
	*/	
	public function update() {
		return $this->_save_to_db( array( 'QSG_ID' => $this->_QSG_ID ));
	}
	
	/**
	 * gets teh question gruop's id
	 * @access public
	 * @return int
	 */
	public function ID(){
		return $this->_QSG_ID;
	}
	
	/**
	 * gets teh question gruop's name
	 * @access public
	 * @return string
	 */
	public function name(){
		return $this->_QSG_name;
	}
	
	/**
	 * Gets the question group's internal name
	 * @access public
	 * @return string
	 */
	public function identifier(){
		return $this->_QSG_identifier;
	}
	
	/**
	 * Gets the question group's description
	 * @access public
	 * @return string
	 */
	public function desc(){
		return $this->_QSG_desc;
	}
	
	/**
	 * Gets the question group's order number in a sequence
	 * of other quesiton groups
	 * @access public
	 * @return int
	 */
	public function order(){
		return $this->_QSG_order;
	}
	
	/**
	 * Returns whether to show the gruop's name on teh frontend
	 * @access public
	 * @return boolean
	 */
	public function show_group_name(){
		return $this->_QSG_show_group_name;
	}
	
	/**
	 * Returns wehther to show the group's descripton
	 * on the frontend
	 * @access public
	 * @return boolean
	 */
	public function show_group_desc(){
		return $this->_QSG_show_group_desc;
	}
	
	/**
	 * Returns wehther this is a 'sytem group' (meaning
	 * a question gruop integral to teh system, whose questions
	 * relate to teh attendee table)
	 * @access public
	 * @return boolean
	 */
	public function system_group(){
		return $this->_QSG_system_group;
	}
	
	/**
	 * Returns whether this question gruop has
	 * been deleted
	 * @access public
	 * @return boolean
	 */
	public function deleted(){
		return $this->_QST_deleted;
	}
}