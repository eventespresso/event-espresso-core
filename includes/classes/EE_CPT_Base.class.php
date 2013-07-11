<?php
/**
 * Base class for all models which are really custom post types,
 * as there is much funcitonality they share
 */
require_once( EE_CLASSES . 'EE_Base_Class.class.php');
class EE_CPT_Base extends EE_Base_Class{


	/**
	 * This is a property for holding cached feature images on CPT objects.  Cache's are set on the first "feature_image()" method call.  Each key in the array corresponds to the requested size.  
	 * @var array
	 */
	protected $_feature_image = array();



	/**
	 * This is a field common to ALL CPT model objects that indicates what post_type the model object is.  This is needed because there are times where the post type may equal "revision" because it is a revision of the main object.
	 * @var string
	 */
	protected $_post_type = '';



	/**
	 * This is a field common to ALL CPT model objects that simply hold what the parent id is for this model object.  If empty then this model object is the top level ancestor of all children.
	 * @var INT
	 */
	protected $_parent = 0;



	/**
	 * Common status property for all CPT Base Class children that is equivalent to the wp "post_status" column
	 * @var string
	 */
	protected $_status;



	
	/**
	 * Terms (in context of a particular taxonomy) which apply to this cpt
	 * @var EE_Term_Taxonomy[]
	 */
	protected $_Term_Taxonomy;


	/**
	 * Adds to the specified event category. If it category doesn't exist, creates it.
	 * @param string $category_name
	 * @param string $category_description optional
	 * @param int $parent_term_taxonomy_id optional
	 * @return EE_Term_Taxonomy
	 */
	function add_event_category($category_name,$category_description=null,$parent_term_taxonomy_id = null){
		return $this->get_model()->add_event_category($this,$category_name,$category_description,$parent_term_taxonomy_id);
	}
	
	/**
	 * Removes the event category by specified name from beign related ot this event
	 * @param string $category_name
	 * @return void
	 */
	function remove_event_category($category_name){
		return $this->get_model()->remove_event_category($this,$category_name);
	}




	/**
	 * The main purpose of this method is to return the post type for the model object
	 *
	 * @access public
	 * @return string
	 */
	public function post_type() {
		return $this->_post_type;
	}



	/**
	 * The main purpose of this method is to return the parent for the model object
	 *
	 * @access public
	 * @return int
	 */
	public function parent() {
		return $this->_parent;
	}



	/**
	 * return the _status property
	 * @return string
	 */
	public function status() {
		return $this->get('status');
	}




	public function set_status ( $status ) {
		$this->set( 'status', $status );
	}


	/**
	 * This calls the equivalent model method for retrieving the feature image which in turn is a wrapper for WordPress' get_the_post_thumbnail() function.
	 *
	 * @link http://codex.wordpress.org/Function_Reference/get_the_post_thumbnail
	 * @access protected
	 * @param string|array $size (optional) Image size. Defaults to 'post-thumbnail' but can also be a 2-item array representing width and height in pixels (i.e. array(32,32) ).
	 * @param string|array $attr Optional. Query string or array of attributes.
	 * @return string HTML image element
	 */
	protected function _get_feature_image( $size, $attr ) {
		//first let's see if we already have the _feature_image property set AND if it has a cached element on it FOR the given size
		$attr_key = is_array( $attr ) ? implode( '_', $attr ) : $attr;
		$cache_key = is_array( $size ) ? implode('_', $size ) . $attr_key : $size . $attr_key;
		$this->_feature_image[$cache_key] = isset( $this->_feature_image[$cache_key] ) ? $this->_feature_image[$cache_key] : $this->get_model()->get_feature_image( $this->ID(), $size, $attr );
		return $this->_feature_image[$cache_key];
	}




	public function feature_image( $size = 'thumbnail', $attr = '' ) {
		return $this->_get_feature_image( $size, $attr );
	}

	
	/**
	 * Wrapper for get_post_meta, http://codex.wordpress.org/Function_Reference/get_post_meta
	 * @param string $meta_key
	 * @param boolean $single
	 * @return mixed <ul><li>If only $id is set it will return all meta values in an associative array.</li>
<li>If $single is set to false, or left blank, the function returns an array containing all values of the specified key.</li>
<li>If $single is set to true, the function returns the first value of the specified key (not in an array</li></ul>
	 */
	public function get_post_meta($meta_key = null,$single = false){
		return get_post_meta($this->ID(), $meta_key, $single);

	}
	
	/**
	 * Wrapper for update_post_meta, http://codex.wordpress.org/Function_Reference/update_post_meta
	 * @param string $meta_key
	 * @param mixed $meta_value
	 * @param mixed $prev_value
	 * @return mixed Returns meta_id if the meta doesn't exist, otherwise returns true on success and false on failure. NOTE: If the meta_value passed to this function is the same as the value that is already in the database, this function returns false.
	 */
	public function update_post_meta($meta_key, $meta_value, $prev_value = null){
		return update_post_meta($this->ID(),$meta_key,$meta_value,$prev_value);
	}
	
	/**
	 * Wrapper for add_post_meta, http://codex.wordpress.org/Function_Reference/add_post_meta
	 * @param type $meta_key
	 * @param type $meta_value
	 * @param type $unique. If postmeta for this $meta_key already exists, whether to add an additional item or not
	 * @return boolean Boolean true, except if the $unique argument was set to true and a custom field with the given key already exists, in which case false is returned.
	 */
	public function add_post_meta($meta_key,$meta_value,$unique = false){
		return add_post_meta($this->ID(),$meta_key,$meta_value,$unique);
	}
}
