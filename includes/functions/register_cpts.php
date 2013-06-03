<?php
/**
 * Registers the custom post types
 */
function espresso_register_cpts(){
	new EE_Register_CPTs();
}
class	EE_Register_CPTs{
	function __construct(){
		$this->register_CPT('espresso_events', __("Event", "event_espresso"),  __("Events", "event_espresso"));
		$this->register_CPT('espresso_venues', __("Venue", "event_espresso"), __("Venues", "event_espresso"));
		$this->register_CPT('espresso_persons',  __("Person", "event_espresso"),  __("Persons", "event_espresso"));
		$this->register_CPT('espresso_attendees',  __("Attendee", "event_espresso"),  __("Attendees", "event_espresso"),
				array(
					'public'=>'false',
					'publicly_queryable'=>'false',
					'hierarchical'=>'false'));
	}
	
	/**
	 * Registers a new custom post type. Sets default settings given only the following params.
	 *
	 * @param string $post_type the actual post type name (VERY IMPORTANT: this much match what the slug is for admin pages related to this cpt.  Also any models must use this slug as well)
	 * @param string $singular_name a pret-internationalized string for the singular name of the obejcts
	 * @param string $plural_name a pre-internalized string for the plural name of the objects
	 * @param array $override_args exactly like $args as described in http://codex.wordpress.org/Function_Reference/register_post_type
	 * The default values set in this function will be overriden by whatever you set in $override_args
	 * @return void, but registers the custom post type
	 */
	function register_CPT($post_type, $singular_name,$plural_name,$override_args = array()) {
	  $labels = array(
		'name' => $plural_name,
		'singular_name' => $singular_name,
		'add_new' => sprintf(__("Add %s", "event_espresso"),$singular_name),
		'add_new_item' => sprintf(__("Add New %s", "event_espresso"),$singular_name),
		'edit_item' => sprintf(__("Edit %s", "event_espresso"),$singular_name),
		'new_item' => sprintf(__("New %s", "event_espresso"),$singular_name),
		'all_items' => sprintf(__("All %s", "event_espresso"),$plural_name),
		'view_item' => sprintf(__("View %s", "event_espresso"),$singular_name),
		'search_items' => sprintf(__("Search %s", "event_espresso"),$plural_name),
		'not_found' => sprintf(__("No %s found", "event_espresso"),$plural_name),
		'not_found_in_trash' => sprintf(__("No %s found in Trash", "event_espresso"),$plural_name),
		'parent_item_colon' => '',
		'menu_name' => sprintf(__("%s", "event_espresso"),$plural_name)
	  );

	  $args = array(
		'labels' => $labels,
		'public' => true,
		'publicly_queryable' => true,
		'show_ui' => false, 
		'show_in_menu' => false, 
		'query_var' => true,
		'rewrite' => array( 'slug' => sanitize_title($singular_name) ),
		'capability_type' => 'post',
		'has_archive' => true, 
		'hierarchical' => true,
		'menu_position' => null,
		'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'custom-fields', 'revisions', 'comments' )
	  ); 
	  
	  if($override_args){
		  if(isset($override_args['labels'])){
			  $labels = array_merge($args['labels'],$override_args['labels']);
		  }
		  $args = array_merge($args,$override_args);
		  $args['labels'] = $labels;
	  }

	  register_post_type( $post_type, $args );
	}
}