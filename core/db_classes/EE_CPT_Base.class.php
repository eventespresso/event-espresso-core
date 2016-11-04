<?php if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package        Event Espresso
 * @ author        Event Espresso
 * @ copyright    (c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license        {@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link                {@link http://www.eventespresso.com}
 * @ since            4.0
 *
 */



/**
 * Class EE_CPT_Base
 *
 * Base class for all models which are really custom post types, as there is much functionality they share
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Michael Nelson
 * @since                 EE4
 *
 */
abstract class EE_CPT_Base extends EE_Soft_Delete_Base_Class {

	/**
	 * This is a property for holding cached feature images on CPT objects.  Cache's are set on the first "feature_image()" method call.  Each key in the array corresponds to the requested size.
	 * @var array
	 */
	protected $_feature_image = array();


	abstract public function wp_user();


	/**
	 * Adds to the specified event category. If it category doesn't exist, creates it.
	 * @param string $category_name
	 * @param string $category_description    optional
	 * @param int    $parent_term_taxonomy_id optional
	 * @return EE_Term_Taxonomy
	 */
	function add_event_category( $category_name, $category_description = NULL, $parent_term_taxonomy_id = NULL ) {
		return $this->get_model()->add_event_category( $this, $category_name, $category_description, $parent_term_taxonomy_id );
	}



	/**
	 * Removes the event category by specified name from being related ot this event
	 * @param string $category_name
	 * @return bool
	 */
	function remove_event_category( $category_name ) {
		return $this->get_model()->remove_event_category( $this, $category_name );
	}



	/**
	 * Removes the relation to the specified term taxonomy, and maintains the
	 * data integrity of the term taxonomy provided
	 * @param EE_Term_Taxonomy $term_taxonomy
	 * @return EE_Base_Class the relation was removed from
	 */
	function remove_relation_to_term_taxonomy( $term_taxonomy ) {
		if ( !$term_taxonomy ) {
			EE_Error::add_error( sprintf( __( "No Term_Taxonomy provided which to remove from model object of type %s and id %d", "event_espresso" ), get_class( $this ), $this->ID() ), __FILE__, __FUNCTION__, __LINE__ );
			return NULL;
		}
		$term_taxonomy->set_count( $term_taxonomy->count() - 1 );
		$term_taxonomy->save();
		return $this->_remove_relation_to( $term_taxonomy, 'Term_Taxonomy' );
	}



	/**
	 * The main purpose of this method is to return the post type for the model object
	 *
	 * @access public
	 * @return string
	 */
	public function post_type() {
		return $this->get_model()->post_type();
	}



	/**
	 * The main purpose of this method is to return the parent for the model object
	 *
	 * @access public
	 * @return int
	 */
	public function parent() {
		return $this->get( 'parent' );
	}



	/**
	 * return the _status property
	 * @return string
	 */
	public function status() {
		return $this->get( 'status' );
	}



	/**
	 * @param string $status
	 */
	public function set_status( $status ) {
		$this->set( 'status', $status );
	}



	/**
	 * This calls the equivalent model method for retrieving the feature image which in turn is a wrapper for WordPress' get_the_post_thumbnail() function.
	 *
	 * @link   http://codex.wordpress.org/Function_Reference/get_the_post_thumbnail
	 * @access protected
	 * @param string|array $size (optional) Image size. Defaults to 'post-thumbnail' but can also be a 2-item array representing width and height in pixels (i.e. array(32,32) ).
	 * @param string|array $attr Optional. Query string or array of attributes.
	 * @return string HTML image element
	 */
	protected function _get_feature_image( $size, $attr ) {
		//first let's see if we already have the _feature_image property set AND if it has a cached element on it FOR the given size
		$attr_key = is_array( $attr ) ? implode( '_', $attr ) : $attr;
		$cache_key = is_array( $size ) ? implode( '_', $size ) . $attr_key : $size . $attr_key;
		$this->_feature_image[ $cache_key ] = isset( $this->_feature_image[ $cache_key ] ) ? $this->_feature_image[ $cache_key ] : $this->get_model()->get_feature_image( $this->ID(), $size, $attr );
		return $this->_feature_image[ $cache_key ];
	}



	/**
	 * See _get_feature_image. Returns the HTML to display a featured image
	 * @param string       $size
	 * @param string|array $attr
	 * @return string of html
	 */
	public function feature_image( $size = 'thumbnail', $attr = '' ) {
		return $this->_get_feature_image( $size, $attr );
	}



	/**
	 * This uses the wp "wp_get_attachment_image_src()" function to return the feature image for the current class using the given size params.
	 * @param  string|array $size can either be a string: 'thumbnail', 'medium', 'large', 'full' OR 2-item array representing width and height in pixels eg. array(32,32).
	 * @return string|boolean          the url of the image or false if not found
	 */
	public function feature_image_url( $size = 'thumbnail' ) {
		$attachment = wp_get_attachment_image_src( get_post_thumbnail_id( $this->ID() ), $size );
		return !empty( $attachment ) ? $attachment[ 0 ] : FALSE;
	}



	/**
	 * This is a method for restoring this_obj using details from the given $revision_id
	 *
	 * @param int $revision_id 		ID of the revision we're getting data from
	 * @param array $related_obj_names if included this will be used to restore for related obj
	 *                                 if not included then we just do restore on the meta.
	 *                                 We will accept an array of related_obj_names for restoration here.
	 * @param array $where_query       You can optionally include an array of key=>value pairs
	 *                                 that allow you to further constrict the relation to being added.
	 *                                 However, keep in mind that the columns (keys) given
	 *                                 must match a column on the JOIN table and currently
	 *                                 only the HABTM models accept these additional conditions.
	 *                                 Also remember that if an exact match isn't found for these extra cols/val pairs,
	 *                                 then a NEW row is created in the join table.
	 *                                 This array is INDEXED by RELATED OBJ NAME (so it corresponds with the obj_names sent);
	 * @return void
	 */
	public function restore_revision( $revision_id, $related_obj_names = array(), $where_query = array() ) {
		//get revision object
		$revision_obj = $this->get_model()->get_one_by_ID( $revision_id );
		if ( $revision_obj instanceof EE_CPT_Base ) {
			//no related_obj_name so we assume we're saving a revision on this object.
			if ( empty( $related_obj_names ) ) {
				$fields = $this->get_model()->get_meta_table_fields();
				foreach ( $fields as $field ) {
					$this->set( $field, $revision_obj->get( $field ) );
				}
				$this->save();
			}
			$related_obj_names = (array)$related_obj_names;
			foreach ( $related_obj_names as $related_name ) {
				//related_obj_name so we're saving a revision on an object related to this object
				//do we have $where_query params for this related object?  If we do then we include that.
				$cols_n_values = isset( $where_query[ $related_name ] ) ? $where_query[ $related_name ] : array();
				$where_params = !empty( $cols_n_values ) ? array( $cols_n_values ) : array();
				$related_objs = $this->get_many_related( $related_name, $where_params );
				$revision_related_objs = $revision_obj->get_many_related( $related_name, $where_params );
				//load helper
				//remove related objs from this object that are not in revision
				//array_diff *should* work cause I think objects are indexed by ID?
				$related_to_remove = EEH_Array::object_array_diff( $related_objs, $revision_related_objs );
				foreach ( $related_to_remove as $rr ) {
					$this->_remove_relation_to( $rr, $related_name, $cols_n_values );
				}
				//add all related objs attached to revision to this object
				foreach ( $revision_related_objs as $r_obj ) {
					$this->_add_relation_to( $r_obj, $related_name, $cols_n_values );
				}
			}
		}
	}



	/**
	 * Wrapper for get_post_meta, http://codex.wordpress.org/Function_Reference/get_post_meta
	 * @param string  $meta_key
	 * @param boolean $single
	 * @return mixed <ul><li>If only $id is set it will return all meta values in an associative array.</li>
	 * <li>If $single is set to false, or left blank, the function returns an array containing all values of the specified key.</li>
	 * <li>If $single is set to true, the function returns the first value of the specified key (not in an array</li></ul>
	 */
	public function get_post_meta( $meta_key = NULL, $single = FALSE ) {
		return get_post_meta( $this->ID(), $meta_key, $single );
	}



	/**
	 * Wrapper for update_post_meta, http://codex.wordpress.org/Function_Reference/update_post_meta
	 * @param string $meta_key
	 * @param mixed  $meta_value
	 * @param mixed  $prev_value
	 * @return mixed Returns meta_id if the meta doesn't exist, otherwise returns true on success and false on failure. NOTE: If the meta_value passed to this function is the same as the value that is already in the database, this function returns false.
	 */
	public function update_post_meta( $meta_key, $meta_value, $prev_value = NULL ) {
		if ( ! $this->ID() ) {
			$this->save();
		}
		return update_post_meta( $this->ID(), $meta_key, $meta_value, $prev_value );
	}



	/**
	 * Wrapper for add_post_meta, http://codex.wordpress.org/Function_Reference/add_post_meta
	 * @param mixed $meta_key
	 * @param mixed $meta_value
	 * @param bool  $unique . If postmeta for this $meta_key already exists, whether to add an additional item or not
	 * @return boolean Boolean true, except if the $unique argument was set to true and a custom field with the given key already exists, in which case false is returned.
	 */
	public function add_post_meta( $meta_key, $meta_value, $unique = FALSE ) {
		if ( $this->ID() ) {
			$this->save();
		}
		return add_post_meta( $this->ID(), $meta_key, $meta_value, $unique );
	}



	/**
	 * Wrapper for delete_post_meta, http://codex.wordpress.org/Function_Reference/delete_post_meta
	 *
	 * @param mixed $meta_key
	 * @param mixed $meta_value
	 * @return boolean False for failure. True for success.
	 */
	public function delete_post_meta( $meta_key, $meta_value = '' ) {
		if ( ! $this->ID() ) {
			//there are obviously no postmetas for this if it's not saved
			//so let's just report this as a success
			return true;
		}
		return delete_post_meta( $this->ID(), $meta_key, $meta_value );
	}



	/**
	 * Gets the URL for viewing this event on the front-end
	 * @return string
	 */
	public function get_permalink() {
		return get_permalink( $this->ID() );
	}



	/**
	 * Gets all the term-taxonomies for this CPT
	 * @param array $query_params
	 * @return EE_Term_Taxonomy
	 */
	public function term_taxonomies( $query_params = array() ) {
		return $this->get_many_related( 'Term_Taxonomy', $query_params );
	}



	/**
	 * @return mixed
	 */
	public function get_custom_post_statuses() {
		return $this->get_model()->get_custom_post_statuses();
	}



	/**
	 * @return mixed
	 */
	public function get_all_post_statuses() {
		return $this->get_model()->get_status_array();
	}
}
