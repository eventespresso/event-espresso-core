<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * Event List
 *
 * @package			Event Espresso
 * @subpackage	includes/core/
 * @author				Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Register_CPTs {

	/**
	 * This property is used to hold an array of EE_default_term objects assigned to a custom post type when the post for that post type is published with no terms set for the taxonomy.
	  *
	 * @var array of EE_Default_Term objects
	 */
	protected $_default_terms = array();


	function __construct(){

		$this->register_taxonomy('espresso_event_categories', __("Event Category", "event_espresso"), __("Event Categories", "event_espresso"), 
				array(
					'public'=>true));
		$this->register_taxonomy('espresso_event_type', __("Event Type", "event_espresso"), __("Event Types", "event_espresso"), 
				array(
					'public'=>true,
					'hierarchical'=>false
					));
		$this->register_CPT('espresso_events', __("Event", "event_espresso"),  __("Events", "event_espresso"),
				array(
					'taxonomies'=>array(
						'espresso_event_categories',
						'espresso_event_type'
				)));
		$this->register_CPT('espresso_venues', __("Venue", "event_espresso"), __("Venues", "event_espresso"),
				array(
					'taxonomies'=>array(
						'espresso_event_categories'
					)
				));
		$this->register_CPT('espresso_persons',  __("Person", "event_espresso"),  __("Persons", "event_espresso"));
		$this->register_CPT('espresso_attendees',  __("Attendee", "event_espresso"),  __("Attendees", "event_espresso"),
				array(
					'public'=>'false',
					'publicly_queryable'=>'false',
					'hierarchical'=>'false'));


		//setup default terms in any of our taxonomies (but only if we're in admin).  Why not added via register_actvation_hook?  Because it's possible that in future iterations of EE we may add new defaults for specialized taxonomies (think event_types) and regsiter_activation_hook only reliably runs when a user manually activates the plugin.
		if ( is_admin() ) {
			$this->set_initial_event_categories();
		}


		//set default terms
		$this->set_default_term( 'espresso_event_categories', 'uncategorized', array('espresso_events', 'espresso_venues' ) );


		//hook into save_post so that we can make sure that the default terms get saved on publish of registered cpts IF they don't have a term for that taxonomy set.
		add_action('save_post', array( $this, 'save_default_term' ), 100, 2 );
		
	}





	/**
	 * Registers a custom taxonomy. Should be called before registering custom post types,
	 * otherwise you should link the taxonomy to the custom post type using 'register_taxonomy_for_object_type'.
	 * 
	 * @param string $taxonomy_name, eg 'books'
	 * @param string $singular_name internationalized singular name
	 * @param type $plural_name internationalized plural name
	 * @param type $override_args like $args on http://codex.wordpress.org/Function_Reference/register_taxonomy
	 */
	function register_taxonomy($taxonomy_name, $singular_name, $plural_name, $override_args = array()){
		
		$args = array(
		'hierarchical'      => true,
		'labels'            => array(
			'name'=>  $plural_name,
			'singular_name'=>$singular_name
		),
		'show_ui'           => true,
		'show_admin_column' => true,
		'query_var'         => true,
		//'rewrite'           => array( 'slug' => 'genre' ),
	);
		
	  if($override_args){
		  if(isset($override_args['labels'])){
			  $labels = array_merge($args['labels'],$override_args['labels']);
			  $args['labels'] = $labels;
		  }
		  $args = array_merge($args,$override_args);
		  
	  }
		register_taxonomy($taxonomy_name,null, $args);
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




	function set_initial_event_categories() {
		$term_details = array(
			'uncategorized' => array( __('Uncategorized', 'event_espresso'), __('All uncategorized items', 'event_espresso') )
			);
		$this->set_initial_terms( 'espresso_event_categories', $term_details );
	}



	/**
	 * wrapper method for handling the setting up of initial terms in the db (if they don't already exist)
	 * @param string $taxonomy     The name of the taxonomy
	 * @param array  $term_details An aray of term details indexed by slug and containing Name of term, and description as the elements in the array
	 *
	 * @return void
	 */
	function set_initial_terms( $taxonomy, $term_details ) {
		$term_details = (array) $term_details;

		foreach ( $term_details as $slug => $deets ) {
			if ( !term_exists( $slug, $taxonomy ) ) {
				$insert_arr = array(
					'slug' => $slug,
					'description' => $deets[1]
					);
				wp_insert_term( $deets[0], $taxonomy, $insert_arr );
			}
		}
	}




	/**
	 * Allows us to set what the default will be for terms when a cpt is PUBLISHED.
	 * @param string $taxonomy  The taxonomy we're using for the default term
	 * @param string $cpt_slug  An array of custom post types we want the default assigned to
	 * @param string $term_slug The slug of the term that will be the default.
	 */
	function set_default_term( $taxonomy, $term_slug, $cpt_slugs = array() ) {
		$this->_default_terms[$term_slug] = new EE_Default_Term( $taxonomy, $term_slug, $cpt_slugs );
	}




	/**
	 * hooked into the wp 'save_post' action hook for setting our default terms found in the $_default_terms property
	 * @param  int    $post_id ID of CPT being saved
	 * @param  object $post    Post object
	 * @return void          
	 */
	function save_default_term( $post_id, $post ) {
		if ( empty( $this->_default_terms ) )
			return; //no default terms set so lets just exit.

		foreach ( $this->_default_terms as $term_slug => $default_obj ) {
			if ( $post->post_status == 'publish' && in_array( $post->post_type, $default_obj->cpt_slugs ) ) {

				//note some error proofing going on here to save unnecessary db queries
				$taxonomies = get_object_taxonomies( $post->post_type );
				foreach ( (array) $taxonomies as $taxonomy ) {
					$terms = wp_get_post_terms( $post_id, $taxonomy);
					if ( empty( $terms ) && $taxonomy == $default_obj->taxonomy ) {
						wp_set_object_terms( $post_id, array( $default_obj->term_slug ), $taxonomy );
					}
				}
			}
		}
	}

}






/**
 * This is just a utility object for holding the settings of a default term that gets used in the wp 'save_post' hook when a particular custom post type is published.
 */
class EE_Default_Term {


	//props holding the items
	public $taxonomy = '';
	public $cpt_slugs = array();
	public $term_slug = '';

	/**
	 * constructor
	 * @param string $taxonomy  The taxonomy the default term belongs to
	 * @param string $cpt_slug  The custom post type the default term gets saved with
	 * @param string $term_slug The slug of the term that will be the default.
	 */
	public function __construct( $taxonomy, $term_slug, $cpt_slugs = array() ) {
		$this->taxonomy = $taxonomy;
		$this->cpt_slugs = (array) $cpt_slugs;
		$this->term_slug = $term_slug;
	}

}