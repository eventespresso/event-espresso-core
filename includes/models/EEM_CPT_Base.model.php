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
	 * @var post_status_trashed the wp post statsu for trashed cpts
	 */
	const post_status_trashed = 'trash';



	/**
	 * keys are the statuses for posts, values are translatable strings. It's nice having an 
	 * array of ALL of the statuses, so we can know what statuses are valid, and which are not
	 * @var array 
	 */
	protected $_statuses = array();


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

		//add  the common _status field to all CPT primary tables.
		foreach ( $this->_tables as $alias => $table_obj ) {
			if ( $table_obj instanceof EE_Primary_Table )
				$primary_table_name = $alias;
		}

		//set default wp post statuses if child has not already set.
		if ( !isset( $this->_fields[$primary_table_name]['status'] ) )
			$this->_fields[$primary_table_name]['status'] = new EE_WP_Post_Status_Field('post_status', __("Event Status", "event_espresso"), false, 'draft');
		parent::__construct($timezone);
	}



	/**
	 * meta_table
	 * returns first EE_Secondary_Table table name
	 * @access public
	 * @return string
	 */
	public static function meta_table() {
		$meta_table = static::instance()->_get_other_tables();
		$meta_table = reset( $meta_table );
		return $meta_table instanceof EE_Secondary_Table ? $meta_table->get_table_name() : NULL;
	}




	/**
	 * This simply returns an array of the meta table fields (useful for when we just need to update those fields)
	 * @param  bool $all triggers whether we include DB_Only fields or JUST non DB_Only fields.  Defaults to false (no dbonly fields)
	 * @return array
	 */
	public function get_meta_table_fields( $all = FALSE ) {
		$all_fields = $fields_to_return = array();
		foreach ( $this->_tables as $alias => $table_obj ) {
			if ( $table_obj instanceof EE_Secondary_Table )
				$all_fields = array_merge( $this->_get_fields_for_table($alias), $all_fields );
		}

		if ( !$all ) {
			foreach ( $all_fields as $name => $obj ) {
				if ( $obj instanceof EE_DB_Only_Field_Base ) 
					continue;
				$fields_to_return[] = $name;
			}
		} else {
			$fields_to_return = array_keys($all_fields);
		}

		return $fields_to_return;
	}

	
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
	 * Just a handy way to get the list of post statuses currently registered with WP.
	 * @global array $wp_post_statuses set in wp core for storing all the post stati
	 * @return array
	 */
	public static function get_post_statuses(){
		global $wp_post_statuses;
		$statuses = array();
		foreach($wp_post_statuses as $post_status => $args_object){
			$statuses[$post_status] = $args_object->label;
		}
		return $statuses;
	}


	/**
	 * public method that can be used to retrieve the protected status array on the instantiated cpt model
	 * @return array array of statuses.
	 */
	public function get_status_array() {
		$statuses = self::get_post_statuses();
		//first the global filter
		$statuses = apply_filters( 'FHEE_EEM_CPT_Base__get_status_array', $statuses );
		//now the class specific filter
		$statuses = apply_filters( 'FHEE_EEM_' . get_class($this) . '__get_status_array', $statuses );
		return $statuses;
	}


	/**
	 * this returns the post statuses that are NOT the default wordpress status
	 * @return array
	 */
	public static function get_custom_post_statuses() {
		$new_stati = array();
		$statuses = self::get_post_statuses();
		$defaults = array(
			'publish',
			'future',
			'private',
			'pending',
			'auto-draft',
			'draft',
			'trash',
			'inherit'
			);
		foreach ( $statuses as $status => $label ) {
			if ( !in_array( $status, $defaults ) )
				$new_stati[$status] = $label;
		}
		return $new_stati;
	}
	
	/**
	 * Gets all the trashed CTPs
	 * @param array $query_params like EEM_Base::get_all
	 * @return int
	 */
	public function count_deleted($query_params = array()){
		return $this->count(array(array('status'=>array('=','trash'))));
	}

	/**
	 * Creates a child of EE_CPT_Base given a WP_Post or array of wpdb results which 
	 * are a row from teh posts table. If we're missing any fields required for the model,
	 * we just fetch the entire entry from the DB (ie, if you want to use this to save DB queries,
	 * make sure you are attaching all the model's fields onto the post)
	 * @param WP_Post|array $post
	 * @return EE_CPT_Base
	 */
	public function instantiate_class_from_post_object($post){
		$post = (array)$post;
		$has_all_necessary_fields_for_table = true;
		//check if the post has fields on the meta table already 
		foreach($this->_get_other_tables() as $table_obj){
			$fields_for_that_table = $this->_get_fields_for_table($table_obj->get_table_alias());
			foreach($fields_for_that_table as $field_name => $field_obj){
				if( ! isset($post[$field_obj->get_table_column()]) 
					&& ! isset($post[$field_obj->get_qualified_column()])){
					$has_all_necessary_fields_for_table = false;
				}
			}
		}
		//if we don't have all the fields we need, then just fetch the proper model from teh DB
		if( ! $has_all_necessary_fields_for_table){
			return $this->get_one_by_ID($post->ID);
		}else{
			return $this->instantiate_class_from_array_or_object($post);
		}
	}
	
}
