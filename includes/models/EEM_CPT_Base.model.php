<?php

/*
 * For shared functionality between models internally implemented
 * as Custom Post Types.
 * Note: if you add a new subclass of EEM_CPT_Base, you should add it as a relation
 * on EEM_Term_Taxonomy and EEM_Term_Relationship
 */
define('EE_Event_Category_Taxonomy','espresso_event_category');
require_once( EE_MODELS . 'EEM_Base.model.php');
class EEM_CPT_Base extends EEM_Base{
	
	/**
	 * Adds a relationship to Term_Taxonomy for each CPT_Base
	 * @param type $timezone
	 */
	protected function __construct($timezone = null){
		//adds a relationship to Term_Taxonomy for all these models. For this to work
		//Term_Relationship must have a relation to each model subclassing EE_CPT_Base explicitly
		//eg, in EEM_Term_Relationship, inside teh _model_relations array, there must be an entry
		//with key equalling the subclassing model's model name (eg 'Event' or 'Venue'), and the value
		//must also be new EE_HABTM_Relation('Term_Relationship');
		$this->_model_relations['Term_Taxonomy'] =new EE_HABTM_Relation('Term_Relationship');
		parent::__construct($timezone);
	}



	/**
	 * defines  table name as a constant
	 * @access public
	 */
	public static function define_table_name() { }

	
	/**
	 * Adds an event category with the specified name and description to the specified
	 * $cpt_model_object. Intelligently adds a term if necessary, and adds a term_taxonomy if necessary,
	 * and adds an entry in the term_relationship if necessary.
	 * @param EE_CPT_Base $cpt_model_object
	 * @param string $category_name (used to derive the term slug too)
	 * @param string $category_description
	 * @param int $parent_term_taxonomy_id
	 * @return EE_Term_Taxonomy
	 */
	function add_event_category(EE_CPT_Base $cpt_model_object, $category_name, $category_description ='',$parent_term_taxonomy_id = null){
		//create term
		require_once( EE_MODELS . 'EEM_Term.model.php');
		//first, check for a term by the same name or slug
		$category_slug = sanitize_title($category_name);
		$term = EEM_Term::instance()->get_one(array(array('OR'=>array('name'=>$category_name,'slug'=>$category_slug))));
		if( ! $term ){
			$term = EE_Term::new_instance(array(
				'name'=>$category_name,
				'slug'=>$category_slug
			));
			$term->save();
		}
		//make sure there's a term-taxonomy entry too
		require_once( EE_MODELS . 'EEM_Term_Taxonomy.model.php');
		$term_taxonomy = EEM_Term_Taxonomy::instance()->get_one(array(array('term_id'=>$term->ID(),'taxonomy'=>EE_Event_Category_Taxonomy)));
		if( ! $term_taxonomy ){
			$term_taxonomy = EE_Term_Taxonomy::new_instance(array(
				'term_id'=>$term->ID(),
				'taxonomy'=>EE_Event_Category_Taxonomy,
				'description'=>$category_description,
				'parent'=>$parent_term_taxonomy_id
			));
			$term_taxonomy->save();
		}
		return $this->add_relationship_to($cpt_model_object, $term_taxonomy, 'Term_Taxonomy');
	}
	
	/**
	 * Removed the category specified by name as having a relation to this event.
	 * Does not remove the term or term_taxonomy.
	 * @param EE_CPT_Base $cpt_model_object
	 * @param string $category_name name of the event category (term)
	 * @return void
	 */
	function remove_event_category(EE_CPT_Base $cpt_model_objectevent, $category_name){
		//find the term_taxonomy by that name
		$term_taxonomy = $this->get_first_related($cpt_model_objectevent, 'Term_Taxonomy', array(array('Term.name'=>$category_name,'taxonomy'=>EE_Event_Category_Taxonomy)));
		return $this->remove_relationship_to($cpt_model_objectevent, $term_taxonomy, 'Term_Taxonomy');
	}




	/**
	 * This is a wrapper for the WordPress get_the_post_thumbnail() function that returns the feature image for the given CPT ID.  It accepts the same params as what get_the_post_thumbnail() accepts.
	 *
	 * @link http://codex.wordpress.org/Function_Reference/get_the_post_thumbnail
	 * @access public
	 * @param int          $id the ID for the cpt we want the feature image for
	 * @param string|array $size (optional) Image size. Defaults to 'post-thumbnail' but can also be a 2-item array representing width and height in pixels (i.e. array(32,32) ).
	 * @param string|array $attr Optional. Query string or array of attributes.
	 * @return string HTML image element
	 */
	public function get_feature_image( $id, $size = 'thumbnail', $attr = '' ) {
		return get_the_post_thumbnail( $id, $size, $attr );
	}






	/**
	 * CPT overrides EEM_Base add_relationship_to to make sure that if the object being added has a post_type of 'revision' then we also add the related item to the parent item so we don't duplicate unneccesarily the related objects in the db.  This allows us to still keep specified relations between revisions but the latest revision and the parent will always have the same relation
	 *
	 * @access public
	 * @param EE_Base_Class|int $id_or_obj             $thisModelObject
	 * @param EE_Base_Class|int $other_model_id_or_obj $otherModelObject
	 * @param string            $relationName          key in EEM_Base::_relations
	 * @return EE_Base_class which was added as a relation. Object referred to by $other_model_id_or_obj
	 */
	public function add_relationship_to($id_or_obj,$other_model_id_or_obj, $relationName){

		//in the case of cpt's we're always going to get the related model_object so we can verify whether it is a revision or not.
		$thismodelobj = $this->ensure_is_obj( $id_or_obj );

		//is this a revision?  if so let's add the relation to the parent cpt
		if ( $thismodelobj->post_type() == 'revision' ) {
			parent::add_relationship_to( $thismodelobj->parent(), $other_model_id_or_obj, $relationName );
		}

		//make sure we save THIS model relation
		parent::add_relationship_to( $id_or_obj, $other_model_id_or_obj, $relationName);
	}

	/**
	 * See notes on add_relationship_to above.  This method works similarily except for the obvious difference of removing a relationship.
	 */
	public function remove_relationship_to( $id_or_obj, $other_model_id_or_obj, $relationName ) {
		$thismodelobj = $this->ensure_is_obj( $id_or_obj );

		//is this a revision?  if so let's remove the relation from the parent cpt
		if ( $thismodelobj->post_type() == 'revision' ) {
			parent::remove_relationship_to( $thismodelobj->parent(), $other_model_id_or_obj, $relationName );
		}

		//make sure we save THIS model relation
		parent::remove_relationship_to( $id_or_obj, $other_model_id_or_obj, $relationName);
	}



}