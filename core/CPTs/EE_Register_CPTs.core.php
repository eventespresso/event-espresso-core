<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 *
 * EE_Register_CPTs
 *
 * @package			Event Espresso
 * @subpackage		includes/core/
 * @author				Darren Ethier
 *
 */
class EE_Register_CPTs {

	/**
	 * This property is used to hold an array of EE_default_term objects assigned to a custom post type when the post for that post type is published with no terms set for the taxonomy.
	 *
	 * @var array of EE_Default_Term objects
	 */
	protected $_default_terms = array();



	/**
	 * 	constructor
	 * instantiated at init priority 5
	 */
	function __construct(){
		// register taxonomies
		$taxonomies = self::get_taxonomies();
		foreach ( $taxonomies as $taxonomy =>  $tax ) {
			$this->register_taxonomy( $taxonomy, $tax['singular_name'], $tax['plural_name'], $tax['args'] );
		}
		// register CPTs
		$CPTs =self::get_CPTs();
		foreach ( $CPTs as $CPT_name =>  $CPT ) {
			$this->register_CPT( $CPT_name, $CPT['singular_name'], $CPT['plural_name'], $CPT['args'], $CPT['singular_slug'], $CPT['plural_slug'] );
		}
		// setup default terms in any of our taxonomies (but only if we're in admin).
		// Why not added via register_activation_hook?
		// Because it's possible that in future iterations of EE we may add new defaults for specialized taxonomies (think event_types) and register_activation_hook only reliably runs when a user manually activates the plugin.
		// Keep in mind that this will READ these terms if they are deleted by the user.  Hence MUST use terms.
		if ( is_admin() ) {
			$this->set_must_use_event_types();
		}
		//set default terms
		$this->set_default_term( 'espresso_event_type', 'single-event', array('espresso_events') );


		add_action( 'AHEE__EE_System__initialize_last', array( __CLASS__,  'maybe_flush_rewrite_rules' ), 10 );

		//hook into save_post so that we can make sure that the default terms get saved on publish of registered cpts IF they don't have a term for that taxonomy set.
		add_action('save_post', array( $this, 'save_default_term' ), 100, 2 );

		//remove no html restrictions from core wp saving of term descriptions.  Note. this will affect only registered EE taxonomies.
		$this->_allow_html_descriptions_for_ee_taxonomies();

		do_action( 'AHEE__EE_Register_CPTs__construct_end', $this );
	}



	/**
	 * This will flush rewrite rules on demand.  This actually gets called around wp init priority level 100.
	 *
	 * @since 4.5.0
	 *
	 * @return void
	 */
	public static function  maybe_flush_rewrite_rules() {
		if ( get_option( 'ee_flush_rewrite_rules', TRUE )) {
			flush_rewrite_rules();
			update_option( 'ee_flush_rewrite_rules', FALSE );
		}
	}


	/**
	 * By default, WordPress strips all html from term taxonomy description content.  The purpose of this method is to
	 * remove that restriction and ensure that we still run ee term taxonomy descriptions through some full html sanitization
	 * equivalent to the post content field.
	 *
	 * @since 4.7.8
	 */
	protected function _allow_html_descriptions_for_ee_taxonomies() {
		//first remove default filter for term description but we have to do this earlier before wp sets their own filter
		//because they just set a global filter on all term descriptions before the custom term description filter. Really sux.
		add_filter( 'pre_term_description', array( $this, 'ee_filter_ee_term_description_not_wp' ), 1, 2 );
	}


	/**
	 * Callback for pre_term_description hook.
	 * @param string $description   The description content.
	 * @param string $taxonomy      The taxonomy name for the taxonomy being filtered.
	 * @return string
	 */
	public function ee_filter_ee_term_description_not_wp( $description, $taxonomy ) {
		//get a list of EE taxonomies
		$ee_taxonomies = array_keys( self::get_taxonomies() );

		//only do our own thing if the taxonomy listed is an ee taxonomy.
		if ( in_array( $taxonomy, $ee_taxonomies ) ) {
			//remove default wp filter
			remove_filter( 'pre_term_description', 'wp_filter_kses' );
			//sanitize THIS content.
			$description = wp_kses( $description, wp_kses_allowed_html( 'post' ) );
		}
		return $description;
	}




	/**
	 * 	get_taxonomies
	 *
	 *  @access 	public
	 *  @return 	array
	 */
	public static function get_taxonomies(){
		// define taxonomies
		return apply_filters( 'FHEE__EE_Register_CPTs__get_taxonomies__taxonomies', array(
			'espresso_event_categories' => array(
				'singular_name' => __("Event Category", "event_espresso"),
				'plural_name' => __("Event Categories", "event_espresso"),
				'args' => array(
					'public'=>true,
					'show_in_nav_menus' => true,
					'show_in_rest' => true,
					'capabilities' => array(
						'manage_terms' => 'ee_manage_event_categories',
						'edit_terms' => 'ee_edit_event_category',
						'delete_terms' => 'ee_delete_event_category',
						'assign_terms' => 'ee_assign_event_category'
						),
					'rewrite' => array( 'slug' => __( 'event-category', 'event_espresso' ))
				)),
			'espresso_venue_categories' => array(
				'singular_name' => __("Venue Category", "event_espresso"),
				'plural_name' => __("Venue Categories", "event_espresso"),
				'args' => array(
					'public'=>true,
					'show_in_nav_menus' => false, //by default this doesn't show for decaf
					'show_in_rest' => true,
					'capabilities' => array(
						'manage_terms' => 'ee_manage_venue_categories',
						'edit_terms' => 'ee_edit_venue_category',
						'delete_terms' => 'ee_delete_venue_category',
						'assign_terms' => 'ee_assign_venue_category'
						),
					'rewrite' => array( 'slug' => __( 'venue-category', 'event_espresso' ))
				)),
			'espresso_event_type' => array(
				'singular_name' => __("Event Type", "event_espresso"),
				'plural_name' => __("Event Types", "event_espresso"),
				'args' => array(
					'public'=>true,
					'show_ui'=>false,
					'show_in_rest' => true,
					'capabilities' => array(
						'manage_terms' => 'ee_read_event_type',
						'edit_terms' => 'ee_edit_event_type',
						'delete_terms' => 'ee_delete_event_type',
						'assign_terms' => 'ee_assign_event_type'
						),
					'rewrite' => array( 'slug' => __( 'event-type', 'event_espresso' )),
					'hierarchical'=>true
				))
			) );
	}





	/**
	 * This returns the corresponding model name for cpts registered by EE.
	 *
	 * @since 4.6.16.rc.000
	 * @param string $post_type_slug If a slug is included, then attempt to retreive the model name for the given cpt
	 *                               		        slug.  Otherwise if empty, then we'll return all cpt model names for cpts
	 *                               		        registered in EE.
	 *
	 * @return array 	       Empty array if no matching model names for the given slug or an array of model
	 *                                         names indexed by post type slug.
	 */
	public static function get_cpt_model_names( $post_type_slug = '' ) {
		$cpts = self::get_CPTs();

		//first if slug passed in...
		if ( ! empty( $post_type_slug )  ) {
			//match?
			if ( ! isset( $cpts[$post_type_slug] ) || ( isset( $cpts[$post_type_slug] ) && empty( $cpts[$post_type_slug]['class_name'] ) ) ) {
				return array();
			}

			//k let's get the model name for this cpt.
			return array( $post_type_slug => str_replace( 'EE', 'EEM', $cpts[$post_type_slug]['class_name'] ) );
		}


		//if we made it here then we're returning an array of cpt model names indexed by post_type_slug.
		$cpt_models = array();
		foreach ( $cpts as $slug => $args ) {
			if ( ! empty( $args['class_name'] ) ) {
				$cpt_models[$slug] = str_replace( 'EE', 'EEM', $args['class_name'] );
			}
		}
		return $cpt_models;
	}





	/**
	 * This instantiates cpt models related to the cpts registered via EE.
	 *
	 * @since 4.6.16.rc.000
	 *
	 * @param string $post_type_slug If valid slug is provided, then will instantiate the model only for the cpt matching
	 *                               		        the given slug.  Otherwise all cpt models will be instantiated (if possible).
	 *
	 * @return EEM_CPT_Base[]   successful instantiation will return an array of successfully instantiated EEM
	 *                                     	  models  indexed by post slug.
	 */
	public static function instantiate_cpt_models( $post_type_slug = '' ) {
		$cpt_model_names = self::get_cpt_model_names( $post_type_slug );
		$instantiated = array();
		foreach ( $cpt_model_names as $slug => $model_name ) {
			$instance = EE_Registry::instance()->load_model( str_replace( 'EEM_', '', $model_name ) );
			if ( $instance instanceof EEM_CPT_Base ) {
				$instantiated[$slug] = $instance;
			}
		}
		return $instantiated;
	}





	/**
	 * 	get_CPTs
	 *
	 *  @access 	public
	 *  @return 	array
	 */
	public static function get_CPTs(){
		// define CPTs
		// NOTE the ['args']['page_templates'] array index is something specific to our CPTs and not part of the WP custom post type api.
		return apply_filters( 'FHEE__EE_Register_CPTs__get_CPTs__cpts', array(
			'espresso_events' => array(
				'singular_name' => __("Event", "event_espresso"),
				'plural_name' => __("Events", "event_espresso"),
				'singular_slug' => __("event", "event_espresso"),
				'plural_slug' => EE_Registry::instance()->CFG->core->event_cpt_slug,
				'class_name' => 'EE_Event',
				'args' => array(
					'public'=> TRUE,
					'show_in_nav_menus' => TRUE,
					'capability_type' => 'event',
					'capabilities' => array(
						'edit_post' => 'ee_edit_event',
						'read_post' => 'ee_read_event',
						'delete_post' => 'ee_delete_event',
						'edit_posts' => 'ee_edit_events',
						'edit_others_posts' => 'ee_edit_others_events',
						'publish_posts' => 'ee_publish_events',
						'read_private_posts' => 'ee_read_private_events',
						'delete_posts' => 'ee_delete_events',
						'delete_private_posts' => 'ee_delete_private_events',
						'delete_published_posts' => 'ee_delete_published_events',
						'delete_others_posts' => 'ee_delete_others_events',
						'edit_private_posts' => 'ee_edit_private_events',
						'edit_published_posts' => 'ee_edit_published_events'
						),
					'taxonomies'=> array(
						'espresso_event_categories',
						'espresso_event_type',
						'post_tag'
					),
					'page_templates' => TRUE
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
						'edit_post' => 'ee_edit_venue',
						'read_post' => 'ee_read_venue',
						'delete_post' => 'ee_delete_venue',
						'edit_posts' => 'ee_edit_venues',
						'edit_others_posts' => 'ee_edit_others_venues',
						'publish_posts' => 'ee_publish_venues',
						'read_private_posts' => 'ee_read_private_venues',
						'delete_posts' => 'ee_delete_venues',
						'delete_private_posts' => 'ee_delete_private_venues',
						'delete_published_posts' => 'ee_delete_published_venues',
						'delete_others_posts' => 'ee_edit_others_venues',
						'edit_private_posts' => 'ee_edit_private_venues',
						'edit_published_posts' => 'ee_edit_published_venues'
						),
					'taxonomies'=> array(
						'espresso_venue_categories',
						'post_tag'
					),
					'page_templates' => TRUE
				)),
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
						'edit_post' => 'ee_edit_contact',
						'read_post' => 'ee_read_contact',
						'delete_post' => 'ee_delete_contact',
						'edit_posts' => 'ee_edit_contacts',
						'edit_others_posts' => 'ee_edit_contacts',
						'publish_posts' => 'ee_edit_contacts',
						'read_private_posts' => 'ee_edit_contacts',
						'delete_posts' => 'ee_delete_contacts',
						'delete_private_posts' => 'ee_delete_contacts',
						'delete_published_posts' => 'ee_delete_contacts',
						'delete_others_posts' => 'ee_delete_contacts',
						'edit_private_posts' => 'ee_edit_contacts',
						'edit_published_posts' => 'ee_edit_contacts'
						),
					'supports' => array( 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'comments' ),
				))
			) );
	}




	/**
	 * This basically goes through the CPT array and returns only CPT's that have the ['args']['public'] option set as false
	 * @return array
	 */
	public static function get_private_CPTs() {
		$CPTs = self::get_CPTs();
		$private_CPTs = array();
		foreach ( $CPTs as $CPT => $details ) {
			if ( empty( $details['args']['public'] ) )
				$private_CPTs[ $CPT ] = $details;
		}
		return $private_CPTs;
	}





	/**
	 * Registers a custom taxonomy. Should be called before registering custom post types,
	 * otherwise you should link the taxonomy to the custom post type using 'register_taxonomy_for_object_type'.
	 *
	 * @param string $taxonomy_name, eg 'books'
	 * @param string $singular_name internationalized singular name
	 * @param string $plural_name internationalized plural name
	 * @param array $override_args like $args on http://codex.wordpress.org/Function_Reference/register_taxonomy
	 */
	function register_taxonomy( $taxonomy_name, $singular_name, $plural_name, $override_args = array() ){

		$args = array(
			'hierarchical'      => true,
			'labels'            => array(
				'name'=>  $plural_name,
				'singular_name'=>$singular_name
			),
			'show_ui'           => true,
			'show_ee_ui'        => true,
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
	 * @param string $singular_name a pre-internationalized string for the singular name of the objects
	 * @param string $plural_name a pre-internalized string for the plural name of the objects
	 * @param array $override_args exactly like $args as described in http://codex.wordpress.org/Function_Reference/register_post_type
	 * The default values set in this function will be overridden by whatever you set in $override_args
	 * @return void, but registers the custom post type
	 */
	function register_CPT($post_type, $singular_name,$plural_name,$override_args = array(), $singular_slug = '', $plural_slug = '' ) {

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

	  //verify plural slug and singular slug, if they aren't we'll use $singular_name and $plural_name
	  $singular_slug = ! empty( $singular_slug ) ? $singular_slug : $singular_name;
	  $plural_slug = ! empty( $plural_slug ) ? $plural_slug : $plural_name;


	  //note the page_templates arg in the supports index is something specific to EE.  WordPress doesn't actually have that in their register_post_type api.
	  $args = array(
		'labels' => $labels,
		'public' => true,
		'publicly_queryable' => true,
		'show_ui' => false,
		'show_ee_ui' => true,
		'show_in_menu' => false,
		'show_in_nav_menus' => false,
		'query_var' => true,
		'rewrite' => apply_filters( 'FHEE__EE_Register_CPTs__register_CPT__rewrite', array( 'slug' => $plural_slug ), $post_type ),
		'capability_type' => 'post',
		'map_meta_cap' => true,
		'has_archive' => true,
		'hierarchical' => false,
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




	function set_must_use_event_types() {
		$term_details = array(
		    //Attendee's register for the first date-time only
			'single-event' => array( __('Single Event', 'event_espresso'), __('A single event that spans one or more consecutive days.', 'event_espresso') ), //example: a party or two-day long workshop
            //Attendee's can register for any of the date-times
			'multi-event' => array( __('Multi Event', 'event_espresso'), __('Multiple, separate, but related events that occur on consecutive days.', 'event_espresso') ), //example: a three day music festival or week long conference
            //Attendee's register for the first date-time only
			'event-series' => array( __('Event Series', 'event_espresso'), __(' Multiple events that occur over multiple non-consecutive days.', 'event_espresso') ), //example: an 8 week introduction to basket weaving course
            //Attendee's can register for any of the date-times.
			'recurring-event' => array( __('Recurring Event', 'event_espresso'), __('Multiple events that occur over multiple non-consecutive days.', 'event_espresso') ), //example: a yoga class
            
			'ongoing' => array( __('Ongoing Event', 'event_espresso'), __('An "event" that people can purchase tickets to gain access for anytime for this event regardless of date times on the event', 'event_espresso') ) //example: access to a museum

			//'walk-in' => array( __('Walk In', 'event_espresso'), __('Single datetime and single entry recurring events. Attendees register for one or multiple datetimes individually.', 'event_espresso') ),
			//'reservation' => array( __('Reservation', 'event_espresso'), __('Reservations are created by specifying available datetimes and quantities. Attendees choose from the available datetimes and specify the quantity available (if the maximum is greater than 1)') ), //@TODO to avoid confusion we'll implement this in a later iteration > EE4.1
			// 'multiple-session' => array( __('Multiple Session', 'event_espresso'), __('Multiple event, multiple datetime, hierarchically organized, custom entry events. Attendees may be required to register for a parent event before being allowed to register for child events. Attendees can register for any combination of child events as long as the datetimes do not conflict. Parent and child events may have additional fees or registration questions.') ), //@TODO to avoid confusion we'll implement this in a later iteration > EE4.1
			//'appointment' => array( __('Appointments', 'event_espresso'), __('Time slotted events where datetimes are generally in hours or minutes. For example, attendees can register for a single 15 minute or 1 hour time slot and this type of availability frequently reoccurs.', 'event_espresso') )

			);
		$this->set_must_use_terms( 'espresso_event_type', $term_details );
	}



	/**
	 * wrapper method for handling the setting up of initial terms in the db (if they don't already exist).
	 *
	 * Note this should ONLY be used for terms that always must be present.  Be aware that if an initial term is deleted then it WILL be recreated.
	 * @param string $taxonomy     The name of the taxonomy
	 * @param array  $term_details An array of term details indexed by slug and containing Name of term, and description as the elements in the array
	 *
	 * @return void
	 */
	function set_must_use_terms( $taxonomy, $term_details ) {
		$term_details = (array) $term_details;

		foreach ( $term_details as $slug => $details ) {
			if ( !term_exists( $slug, $taxonomy ) ) {
				$insert_arr = array(
					'slug' => $slug,
					'description' => $details[1]
					);
				wp_insert_term( $details[0], $taxonomy, $insert_arr );
			}
		}
	}




	/**
	 * Allows us to set what the default will be for terms when a cpt is PUBLISHED.
	 * @param string $taxonomy  The taxonomy we're using for the default term
	 * @param string $term_slug The slug of the term that will be the default.
	 * @param array $cpt_slugs  An array of custom post types we want the default assigned to
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
			foreach ( $defaults as $default_obj ) {
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
	 * @param string $term_slug The slug of the term that will be the default.
	 * @param array $cpt_slugs  The custom post type the default term gets saved with
	 */
	public function __construct( $taxonomy, $term_slug, $cpt_slugs = array() ) {
		$this->taxonomy = $taxonomy;
		$this->cpt_slugs = (array) $cpt_slugs;
		$this->term_slug = $term_slug;
	}

}
