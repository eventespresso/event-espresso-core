<?php
/**
 * Base class for all models which are really custom post types,
 * as there is much funcitonality they share
 */
require_once('EE_Base_Class.class.php');
class EE_CPT_Base extends EE_Base_Class{
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
}