<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * Extra Meta Model
 *
 * This is meta info which can be potentially attached to any model with a integer primary key.
 * (If they have a string primary key, some further development will be needed in the code).
 * Querying on this meta data is cumbersome and difficult, but this can be used
 * to attach any arbitrary information onto any model desired.
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Michael Nelson
 *
 * ------------------------------------------------------------------------
 */
require_once ( EE_MODELS . 'EEM_Base.model.php' );

class EEM_Post_Meta extends EEM_Base {

  	// private instance of the Attendee object
	protected static $_instance = NULL;

	protected function __construct( $timezone = NULL ) {
		$this->singular_item = __('Extra Meta','event_espresso');
		$this->plural_item = __('Extra Metas','event_espresso');
		$this->_tables = array(
			'Post_Meta'=> new EE_Primary_Table('postmeta', 'meta_id')
		);
		$models_this_can_attach_to = array_keys( EE_Registry::instance()->cpt_models() );
		$this->_fields = array(
			'Post_Meta'=>array(
				'meta_id'=>new EE_Primary_Key_Int_Field('meta_id', __("Meta ID", "event_espresso")),
				'post_id'=>new EE_Foreign_Key_Int_Field('post_id', __("Primary Key of Post", "event_espresso"), false, 0, $models_this_can_attach_to),
				'meta_key'=>new EE_Plain_Text_Field('meta_key', __("Meta Key", "event_espresso"), false, ''),
				'meta_value'=>new EE_Maybe_Serialized_Text_Field('meta_value', __("Meta Value", "event_espresso"), true)
			));
		$this->_model_relations = array();
		foreach($models_this_can_attach_to as $model){
			$this->_model_relations[$model] = new EE_Belongs_To_Relation();
		}
		parent::__construct( $timezone );
	}


}
// End of file EEM_Post_Meta.model.php
// Location: /includes/models/EEM_Post_Meta.model.php
