<?php if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package 		Event Espresso
 * @ author 		Event Espresso
 * @ copyright 	(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license 		{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link 				{@link http://www.eventespresso.com}
 * @ since 			4.0
 *
 */



/**
 * EE_Soft_Delete_Base_Class
 *
 * Class for handling soft-delete logic (ie, use a column in the DB to indicate deletion of the model, instead of actually deleting it) EE_{classes}.
 *
 * @package 			Event Espresso
 * @subpackage 	includes/classes/EE_Answer.class.php
 * @author 				Mike Nelson
 */
abstract class EE_Soft_Delete_Base_Class extends EE_Base_Class {

	/**
	 * Performs a soft delete (archive) fo this object
	 * @return boolean success
	 */
	public function delete() {
		return $this->delete_or_restore( TRUE );
	}



	/**
	 * Permanently deletes this object (not just archive)
	 * @return boolean success
	 */
	public function delete_permanently() {
		return $this->get_model()->delete_permanently_by_ID( $this->ID() );
	}



	/**
	 * Deletes or restores this object.
	 * @param bool $delete true=>delete, false=>restore
	 * @return bool
	 */
	public function delete_or_restore( $delete = TRUE ) {
		$model = $this->get_model();
		return $model->delete_or_restore_by_ID( $delete, $this->ID() );
	}



	/**
	 * Performs a restoration (un-deletes) this object
	 * @return boolean
	 */
	public function restore() {
		return $this->delete_or_restore( FALSE );
	}
}