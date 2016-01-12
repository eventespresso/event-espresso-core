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
 * Post Meta Model
 *
 * Model for accessing the wp core postmeta table. Generally it's better to use the
 * built-in wp functions directly, but this is useful if you want to use the EE models
 * and need a query that factors in an EE custom post type's postmeta (eg, attendees, events or venues).
 * Currently, if applying caps to the queries, these are only accessible to site admins;
 * however we may devise some strategy for marking specified postmetas as public.
 * (Using the wp core convention of prefixing meta keys with an underscore might work,
 * see https://codex.wordpress.org/Function_Reference/add_post_meta, but when a postmeta is
 * "non-hidden" it's meant to show in the wp admin's post editing page, not necessarily on the frontend)
 *
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Michael Nelson
 *
 * ------------------------------------------------------------------------
 */
require_once ( EE_MODELS . 'EEM_Base.model.php' );

class EEM_Post_Meta extends EEM_Base {

  	// private instance of the EE_Post_Meta object
	protected static $_instance = NULL;

	protected function __construct( $timezone = NULL ) {
		$this->singular_item = __('Post Meta','event_espresso');
		$this->plural_item = __('Post Metas','event_espresso');
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
		foreach( $this->cap_contexts_to_cap_action_map() as $cap_context => $action ) {
			$this->_cap_restriction_generators[ $cap_context ] = new EE_Restriction_Generator_Meta( 'meta_key', 'meta_value' );
		}
		parent::__construct( $timezone );
	}


}
// End of file EEM_Post_Meta.model.php
// Location: /includes/models/EEM_Post_Meta.model.php
