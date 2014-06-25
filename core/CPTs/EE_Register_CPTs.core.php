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
	 * $_CPTs
	  *
	 * @var array $_CPTs
	 */
	private $_CPTs = array();

	/**
	 * $_taxonomies
	 *
	 * @var array $_taxonomies
	 */
	private $_taxonomies = array();

	/**
	 * This property is used to hold an array of EE_default_term objects assigned to a custom post type when the post for that post type is published with no terms set for the taxonomy.
	 *
	 * @var array of EE_Default_Term objects
	 */
	protected $_default_terms = array();


	function __construct(){
		// register taxonomies
		$taxonomies = apply_filters( 'FHEE__EE_Register_CPTs__construct__taxonomies', self::get_taxonomies() );
		foreach ( $taxonomies as $taxonomy =>  $tax ) {
			$this->register_taxonomy( $taxonomy, $tax['singular_name'], $tax['plural_name'], $tax['args'] );
		}
		// register CPTs
		$CPTs = apply_filters( 'FHEE__EE_Register_CPTs__construct__CPTs', self::get_CPTs() );
		foreach ( $CPTs as $CPT_name =>  $CPT ) {
			$this->register_CPT( $CPT_name, $CPT['singular_name'], $CPT['plural_name'], $CPT['args'] );
		}
		// setup default terms in any of our taxonomies (but only if we're in admin).
		// Why not added via register_actvation_hook?
		// Because it's possible that in future iterations of EE we may add new defaults for specialized taxonomies (think event_types) and regsiter_activation_hook only reliably runs when a user manually activates the plugin.
		if ( is_admin() ) {
			$this->set_initial_event_categories();
			$this->set_initial_venue_categories();
			$this->set_initial_event_types();
		}
		//set default terms
		$this->set_default_term( 'espresso_event_categories', 'uncategorized', array('espresso_events') );
		$this->set_default_term( 'espresso_event_type', 'single-event', array('espresso_events') );
		$this->set_default_term( 'espresso_venue_categories', 'uncategorized', array('espresso_venues') );
		// flush_rewrite_rules ?
		if ( get_option( 'ee_flush_rewrite_rules', TRUE )) {
			flush_rewrite_rules();
			update_option( 'ee_flush_rewrite_rules', FALSE );
		}
		//hook into save_post so that we can make sure that the default terms get saved on publish of registered cpts IF they don't have a term for that taxonomy set.
		add_action('save_post', array( $this, 'save_default_term' ), 100, 2 );

	}





	/**
	 * 	get_taxonomies
	 *
	 *  @access 	public
	 *  @return 	array
	 */
	public static function get_taxonomies(){
		// define taxonomies
		return array(
			'espresso_event_categories' => array(
				'singular_name' => __("Event Category", "event_espresso"),
				'plural_name' => __("Event Categories", "event_espresso"),
				'args' => array(
					'public'=>true,
					'show_in_nav_menus' => true,
					'capabilities' => array(
						'manage_terms' => 'manage_event_categories',
						'edit_terms' => 'edit_event_category',
						'delete_terms' => 'delete_event_category',
						'assign_terms' => 'assign_event_category'
						),
					'rewrite' => array( 'slug' => __( 'event-category', 'event_espresso' ))
				)),
			'espresso_venue_categories' => array(
				'singular_name' => __("Venue Category", "event_espresso"),
				'plural_name' => __("Venue Categories", "event_espresso"),
				'args' => array(
					'public'=>true,
					'show_in_nav_menus' => false, //by default this doesn't show for decaf
					'capabilities' => array(
						'manage_terms' => 'manage_venue_categories',
						'edit_terms' => 'edit_venue_category',
						'delete_terms' => 'delete_venue_category',
						'assign_terms' => 'assign_venue_category'
						),
					'rewrite' => array( 'slug' => __( 'venue-category', 'event_espresso' ))
				)),
			'espresso_event_type' => array(
				'singular_name' => __("Event Type", "event_espresso"),
				'plural_name' => __("Event Types", "event_espresso"),
				'args' => array(
					'public'=>true,
					'show_ui'=>false,
					'capabilities' => array(
						'manage_terms' => 'read_event_type',
						'edit_terms' => 'edit_event_type',
						'delete_terms' => 'delete_event_type',
						'assign_terms' => 'assign_event_type'
						),
					'rewrite' => array( 'slug' => __( 'event-type', 'event_espresso' )),
					'hierarchical'=>true
				))
			);
	}





	/**
	 * 	get_CPTs
	 *
	 *  @access 	public
	 *  @return 	array
	 */
	public static function get_CPTs(){
		// define CPTs
		return array(
			'espresso_events' => array(
				'singular_name' => __("Event", "event_espresso"),
				'plural_name' => __("Events", "event_espresso"),
				'singular_slug' => __("event", "event_espresso"),
				'plural_slug' => __("events", "event_espresso"),
				'class_name' => 'EE_Event',
				'args' => array(
					'public'=> TRUE,
					'show_in_nav_menus' => TRUE,
					'capability_type' => 'event',
					'capabilities' => array(
						'edit_post' => 'edit_event',
						'read_post' => 'read_event',
						'delete_post' => 'delete_event',
						'edit_posts' => 'edit_events',
						'edit_others_posts' => 'edit_others_events',
						'publish_posts' => 'publish_events',
						'read_private_posts' => 'read_private_events',
						'delete_posts' => 'delete_events',
						'delete_private_posts' => 'delete_private_events',
						'delete_published_posts' => 'delete_published_events',
						'delete_others_posts' => 'delete_others_events',
						'edit_private_posts' => 'edit_private_events',
						'edit_published_posts' => 'edit_published_events'
						),
					'taxonomies'=> array(
						'espresso_event_categories',
						'espresso_event_type',
						'post_tag'
					)
				)),
			'espresso_venues' => array(
				'singular_name' => __("Venue", "event_espresso"),
				'plural_name' => __("Venues", "event_espresso"),
				'singular_slug' => __("venue", "event_espresso"),
				'plural_slug' => __("venues", "event_espresso"),
				'class_name' => 'EE_Venue',
				'args' => array(
					'public'=> TRUE,
					'show_in_nav_menus' => FALSE, //by default this doesn't show for decaf,
					'capability_type' => 'venue',
					'capabilities' => array(
						'edit_post' => 'edit_venue',
						'read_post' => 'read_venue',
						'delete_post' => 'delete_venue',
						'edit_posts' => 'edit_venues',
						'edit_others_posts' => 'edit_others_venues',
						'publish_posts' => 'publish_venues',
						'read_private_posts' => 'read_private_venues',
						'delete_posts' => 'delete_venues',
						'delete_private_posts' => 'delete_private_venues',
						'delete_published_posts' => 'delete_published_venues',
						'delete_others_posts' => 'edit_others_venues',
						'edit_private_posts' => 'edit_private_venues',
						'edit_published_posts' => 'edit_published_venues'
						),
					'taxonomies'=> array(
						'espresso_venue_categories',
						'post_tag'
					)
				)),
			/*'espresso_persons' => array(
				'singular_name' => __("Person", "event_espresso"),
				'plural_name' => __("People", "event_espresso"),
				'singular_slug' => __("person", "event_espresso"),
				'plural_slug' => __("people", "event_espresso"),
				'args' => array()
				),/**/ //temporarily disable personsCPT because not in use.
			'espresso_attendees' => array(
				'singular_name' => __("Contact", "event_espresso"),
				'plural_name' => __("Contacts", "event_espresso"),
				'singular_slug' => __("contact", "event_espresso"),
				'plural_slug' => __("contacts", "event_espresso"),
				'class_name' => 'EE_Attendee',
				'args' => array(
					'public'=> FALSE,
					'publicly_queryable'=> FALSE,
					'hierarchical'=> FALSE,
					'has_archive' => FALSE,
					'taxonomies' => array( 'post_tag' ),
					'capability_type' => 'contact',
					'capabilities' => array(
						'edit_post' => 'edit_contact',
						'read_post' => 'read_contact',
						'delete_post' => 'delete_contact',
						'edit_posts' => 'edit_contacts',
						'edit_others_posts' => 'edit_contacts',
						'publish_posts' => 'edit_contacts',
						'read_private_posts' => 'edit_contacts',
						'delete_posts' => 'delete_contacts',
						'delete_private_posts' => 'delete_contacts',
						'delete_published_posts' => 'delete_contacts',
						'delete_others_posts' => 'delete_contacts',
						'edit_private_posts' => 'delete_contacts',
						'edit_published_posts' => 'edit_contacts'
						),
					'supports' => array( 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'comments' ),
				))
			);
	}




	/**
	 * This basically goes through the CPT array and returns only CPT's that have the ['args']['public'] option set as false
	 * @return array
	 */
	public static function get_private_CPTs() {
		$cpts = self::get_CPTs();
		$pcpts = array();
		foreach ( $cpts as $cpt => $details ) {
			if ( empty( $details['args']['public'] ) )
				$pcpts[$cpt] = $details;
		}
		return $pcpts;
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
		'show_in_nav_menus' => false,
		'map_meta_cap' => true
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
		'show_in_nav_menus' => false,
		'query_var' => true,
		'rewrite' => apply_filters( 'FHEE__EE_Register_CPTs__register_CPT__rewrite', array( 'slug' => sanitize_title($plural_name) ), $post_type ),
		'capability_type' => 'post',
		'map_meta_cap' => true,
		'has_archive' => true,
		'hierarchical' => true,
		'menu_position' => null,
		'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'custom-fields', 'comments' )
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
			'uncategorized' => array( __('Uncategorized', 'event_espresso'), __('All uncategorized events', 'event_espresso') )
			);
		$this->set_initial_terms( 'espresso_event_categories', $term_details );
	}



	function set_initial_venue_categories() {
		$term_details = array(
			'uncategorized' => array( __('Uncategorized', 'event_espresso'), __('All uncategorized venues', 'event_espresso') )
			);
		$this->set_initial_terms( 'espresso_venue_categories', $term_details );
	}




	function set_initial_event_types() {
		$term_details = array(
			'single-event' => array( __('Single Event', 'event_espresso'), __('A single event that spans one or more consecutive days. Attendee\'s register for the first date-time only', 'event_espresso') ), //example: a party or two-day long workshop

			'multi-event' => array( __('Multi Event', 'event_espresso'), __('Multiple, separate, but related events that occur on consecutive days. Attendee\'s can register for any of the date-times', 'event_espresso') ), //example: a three day music festival or week long conference

			'event-series' => array( __('Event Series', 'event_espresso'), __(' Multiple events that occur over multiple non-consecutive days. Attendee\'s register for the first date-time only', 'event_espresso') ), //example: an 8 week introduction to basket weaving course

			'recurring-event' => array( __('Recurring Event', 'event_espresso'), __('Multiple events that occur over multiple non-consecutive days. Attendee\'s can register for any of the date-times.', 'event_espresso') ), //example: a yoga class

			'ongoing' => array( __('Ongoing Event', 'event_espresso'), __('An "event" that people can purchase tickets to gain access for anytime for this event regardless of date times on the event', 'event_espresso') ) //example: access to a museum

			//'walk-in' => array( __('Walk In', 'event_espresso'), __('Single datetime and single entry recurring events. Attendees register for one or multiple datetimes individually.', 'event_espresso') ),
			//'reservation' => array( __('Reservation', 'event_espresso'), __('Reservations are created by specifying available datetimes and quantities. Attendees choose from the available datetimes and specify the quantity available (if the maximum is greater than 1)') ), //@TODO to avoid confusion we'll implement this in a later iteration > EE4.1
			// 'multiple-session' => array( __('Multiple Session', 'event_espresso'), __('Multiple event, multiple datetime, hierarchically organized, custom entry events. Attendees may be required to register for a parent event before being allowed to register for child events. Attendees can register for any combination of child events as long as the datetimes do not conflict. Parent and child events may have additional fees or registration questions.') ), //@TODO to avoid confusion we'll implement this in a later iteration > EE4.1
			//'appointment' => array( __('Appointments', 'event_espresso'), __('Time slotted events where datetimes are generally in hours or minutes. For example, attendees can register for a single 15 minute or 1 hour time slot and this type of availability frequently reoccurs.', 'event_espresso') )

			);
		$this->set_initial_terms( 'espresso_event_type', $term_details );
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
		$this->_default_terms[][$term_slug] = new EE_Default_Term( $taxonomy, $term_slug, $cpt_slugs );
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

		foreach ( $this->_default_terms as $defaults ) {
			foreach ( $defaults as $term_slug => $default_obj ) {
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
