<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link		http://www.eventespresso.com
 * @version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Admin_Hooks
 * This is the abstract parent class used by children to contains any hooks that run on different EE Admin pages.
 *
 *
 * @abstract
 * @package		EE_Admin_Hooks
 * @subpackage	includes/core/admin/EE_Admin_Hooks.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
abstract class EE_Admin_Hooks extends EE_Base {


	/**
	 * we're just going to use this to hold the name of the caller class (child class name)
	 * @var string
	 */
	public $caller;



	/**
	 * this is just a flag set automatically to indicate whether we've got an extended hook class running (i.e. espresso_events_Registration_Form_Hooks_Extend extends espresso_events_Registration_Form_Hooks).  This flag is used later to make sure we require the needed files.
	 * @var bool
	 */
	protected $_extend;




	/**
	 * child classes MUST set this property so that the page object can be loaded correctly
	 * @var string
	 */
	protected $_name;




	/**
	 * This is set by child classes and is an associative array of ajax hooks in the format:
	 * array(
	 * 	'ajax_action_ref' => 'executing_method'; //must be public
	 * )
	 * @var array
	 */
	protected $_ajax_func;


	/**
	 * This is an array of methods that get executed on a page routes admin_init hook. Use the following format:
	 * array(
	 * 	'page_route' => 'executing_method' //must be public
	 * )
	 * @var array
	 */
	protected $_init_func;



	/**
	 * This is an array of methods that output metabox content for the given page route.  Use the following format:
	 * array(
	 * 	0 => array(
	 * 		'page_route' => 'string_for_page_route', //must correspond to a page route in the class being connected with (i.e. "edit_event") If this is in an array then the same params below will be used but the metabox will be added to each route.
	 * 		'func' =>  'executing_method',  //must be public (i.e. public function executing_method($post, $callback_args){} ).  Note if you include callback args in the array then you need to declare them in the method arguments.
	 * 		'id' => 'identifier_for_metabox', //so it can be removed by addons (optional, class will set it automatically)
	 * 		'priority' => 'default', //default 'default' (optional)
	 * 		'label' => __('Localized Title', 'event_espresso'),
	 * 		'context' => 'advanced' //advanced is default (optional),
	 *   	'callback_args' => array() //any callback args to include (optional)
	 * )
	 *
	 * Why are we indexing numerically?  Because it's possible there may be more than one metabox per page_route.
	 *
	 * @var array
	 */
	protected $_metaboxes;




	/**
	 * This is an array of values that indicate any metaboxes we want removed from a given page route.  Usually this is used when caffeinated functionality is replacing decaffeinated functionality.  Use the following format for the array:
	 * array(
	 * 	0 => array(
	 * 		'page_route' => 'string_for_page_route' //can be string or array of strings that match a page_route(s) that are in the class being connected with (i.e. 'edit', or 'create_new').
	 * 		'id' => 'identifier_for_metabox', //what the id is of the metabox being removed
	 * 		'context' => 'normal', //the context for the metabox being removed (has to match)
	 * 		'screen' => 'screen_id', //(optional), if not included then this class will attempt to remove the metabox using the currently loaded screen object->id  however, there may be cases where you have to specify the id for the screen the metabox is on.
	 * 	)
	 * )
	 * @var array
	 */
	protected $_remove_metaboxes;




	/**
	 * This parent class takes care of loading the scripts and styles if the child class has set the properties for them in the following format.  Note, the first array index ('register') is for defining all the registers.  The second array index is for indicating what routes each script/style loads on.
	 * array(
	 * 'registers' => array(
	 * 		'script_ref' => array( // if more than one script is to be loaded its best to use the 'dependency' argument to link scripts together.
	 * 			'type' => 'js' // 'js' or 'css' (defaults to js).  This tells us what type of wp_function to use
	 * 			'url' => 'http://urltoscript.css.js',
	 * 		 	'depends' => array('jquery'), //an array of dependencies for the scripts. REMEMBER, if a script has already been registered elsewhere in the system.  You can just use the depends array to make sure it gets loaded before the one you are setting here.
	 * 		 	'footer' => TRUE //defaults to true (styles don't use this parameter)
	 * 	 	),
	 * 	'enqueues' => array( //this time each key corresponds to the script ref followed by an array of page routes the script gets enqueued on.
	 * 		'script_ref' => array('route_one', 'route_two')
	 * 	),
	 * 	'localize' => array( //this allows you to set a localize object.  Indicate which script the object is being attached to and then include an array indexed by the name of the object and the array of key/value pairs for the object.
	 * 		'scrip_ref' => array(
	 * 			'NAME_OF_JS_OBJECT' => array(
	 * 				'translate_ref' => __('localized_string', 'event_espresso'),
	 * 				'some_data' => 5
	 * 			)
	 * 		)
	 * 	)
	 * )
	 * @var array
	 */
	protected $_scripts_styles;


	/**
	 * This is a property that will contain the current route.
	 * @var string;
	 */
	protected $_current_route;




	/**
	 * this optional property can be set by child classes to override the priority for the automatic action/filter hook loading in the `_load_routed_hooks()` method.  Please follow this format:
	 *
	 * array(
	 * 	'wp_hook_reference' => 1
	 * 	)
	 * )
	 * @var array
	 */
	protected $_wp_action_filters_priority;





	/**
	 * This just holds a merged array of the $_POST and $_GET vars in favor of $_POST
	 * @var array
	 */
	protected $_req_data;





	/**
	 * This just holds an instance of the page object for this hook
	 * @var EE_Admin_Page
	 */
	protected $_page_object;





	/**
	 * This holds the EE_Admin_Page object from the calling admin page that this object hooks into.
	 * @var EE_Admin_Page object
	 */
	protected $_adminpage_obj;



	/**
	 * Holds EE_Registry object
	 * @var EE_Registry
	 */
	protected $EE = NULL;





	/**
	 * constructor
	 * @param EE_Admin_Page $admin_page the calling admin_page_object
	 */
	public function __construct( EE_Admin_Page $adminpage ) {

		$this->_adminpage_obj = $adminpage;
		$this->_req_data = array_merge($_GET, $_POST);
		$this->_set_defaults();
		$this->_set_hooks_properties();

		//first let's verify we're on the right page
		if ( !isset( $this->_req_data['page'] ) || ( isset( $this->_req_data['page'] ) && $this->_adminpage_obj->page_slug != $this->_req_data['page'] ) )
			return; //get out nothing more to be done here.

		//allow for extends to modify properties
		if ( method_exists( $this, '_extend_properties' ) )
			$this->_extend_properties();

		$this->_set_page_object();
		$this->_init_hooks();
		$this->_load_custom_methods();
		$this->_load_routed_hooks();

		add_action( 'admin_enqueue_scripts', array($this, 'enqueue_scripts_styles' ) );
		add_action( 'admin_enqueue_scripts', array($this, 'add_metaboxes'), 20 );
		add_action( 'admin_enqueue_scripts', array($this, 'remove_metaboxes'), 15 );

		$this->_ajax_hooks();

	}





	/**
	 * used by child classes to set the following properties:
	 * $_ajax_func (optional)
	 * $_init_func (optional)
	 * $_metaboxes (optional)
	 * $_scripts (optional)
	 * $_styles (optional)
	 * $_name (required)
	 *
	 * Also in this method will be registered any scripts or styles loaded on the targeted page (as indicated in the _scripts/_styles properties)
	 *
	 * Also children should place in this method any filters/actions that have to happen really early on page load (just after admin_init) if they want to have them registered for handling early.
	 *
	 * @access protected
	 * @abstract
	 * @return void
	 */
	abstract protected function _set_hooks_properties();





	/**
	 * The hooks for enqueue_scripts and enqueue_styles will be run in here.  Child classes need to define their scripts and styles in the relevant $_scripts and $_styles properties.  Child classes must have also already registered the scripts and styles using wp_register_script and wp_register_style functions.
	 *
	 * @access public
	 * @return void
	 */
	public function enqueue_scripts_styles() {

		if ( !empty( $this->_scripts_styles ) ) {
			//first let's do all the registrations
			if ( !isset($this->_scripts_styles['registers'] ) ) {
				$msg[] = __('There is no "registers" index in the <code>$this->_scripts_styles</code> property.', 'event_espresso');
				$msg[] = sprintf ( __('Make sure you read the phpdoc comments above the definition of the $_scripts_styles property in the <code>EE_Admin_Hooks</code> class and modify according in the %s child', 'event_espresso'), '<strong>' . $this->caller . '</strong>' );
				throw new EE_Error( implode( '||', $msg ) );
			}

			foreach( $this->_scripts_styles['registers'] as $ref => $details ) {
				$defaults = array(
					'type' => 'js',
					'url' => '',
					'depends' => array(),
					'version' => EVENT_ESPRESSO_VERSION,
					'footer' => TRUE
					);
				$details = wp_parse_args($details, $defaults);
				extract( $details );

				//let's make sure that we set the 'registers' type if it's not set! We need it later to determine whhich enqueu we do
				$this->_scripts_styles['registers'][$ref]['type'] = $type;

				//let's make sure we're not missing any REQUIRED parameters
				if ( empty($url) ) {
					$msg[] = sprintf( __('Missing the url for the requested %s', 'event_espresso'), $type == 'js' ? 'script' : 'stylesheet' );
					$msg[] = sprintf( __('Doublecheck your <code>$this->_scripts_styles</code> array in %s and make sure that there is a "url" set for the %s ref', 'event_espresso'), '<strong>' . $this->caller . '</strong>', $ref );
					throw new EE_Error( implode( '||', $msg ) );
				}
				//made it here so let's do the appropriate registration
				$type == 'js' ? wp_register_script( $ref, $url, $depends, $version, $footer ) : wp_register_style( $ref, $url, $depends, $version );
			}

			//k now lets do the enqueues
			if( !isset( $this->_scripts_styles['enqueues'] ) )
				return;  //not sure if we should throw an error here or not.
			foreach( $this->_scripts_styles['enqueues'] as $ref => $routes ) {
				//make sure $routes is an array
				$routes = (array) $routes;

				if ( in_array($this->_current_route, $routes ) ) {
					$this->_scripts_styles['registers'][$ref]['type'] == 'js' ? wp_enqueue_script($ref) : wp_enqueue_style($ref);
					//if we have a localization for the script let's do that too.
					if ( isset( $this->_scripts_styles['localize'][$ref] ) ) {
						foreach ( $this->_scripts_styles['localize'][$ref] as $object_name => $indexes ) {
							wp_localize_script($ref, $object_name , $this->_scripts_styles['localize'][$ref][$object_name] );
						}
					}
				}
			}

			//let's do the deregisters
			if ( !isset( $this->_scripts_styles['deregisters'] ) )
				return;
			foreach ( $this->_scripts_styles['deregisters'] as $ref => $details ) {
				$defaults = array(
					'type' => 'js'
					);
				$details = wp_parse_args( $details, $defaults );
				extract( $details );

				$type == 'js' ? wp_deregister_script($ref) : wp_deregister_style($ref);

			}

		}
	}



	/**
	 * just set the defaults for the hooks properties.
	 *
	 * @access private
	 * @return void
	 */
	private function _set_defaults() {
		$this->_ajax_func = $this->_init_func = $this->_metaboxes = $this->_scripts = $this->_styles = $this->_wp_action_filters_priority = array();
		$this->_current_route = isset( $_REQUEST['action'] ) ? $_REQUEST['action'] : 'default';
		$this->caller = get_class($this);
		$this->_extend = stripos($this->caller, 'Extend') ? TRUE : FALSE;
	}



	/**
	 * this sets the _page_object property
	 *
	 * @access protected
	 * @return void
	 */
	protected function _set_page_object() {
		//first make sure $this->_name is set
		if ( empty( $this->_name ) ) {
			$msg[] = __('We can\'t load the page object', 'event_espresso');
			$msg[] = sprintf( __("This is because the %s child class has not set the '_name' property", 'event_espresso'), $this->caller );
			throw new EE_Error( implode( '||', $msg ) );
		}

		$ref = str_replace('_' , ' ', $this->_name); //take the_message -> the message
		$ref = str_replace(' ', '_', ucwords($ref) ) . '_Admin_Page'; //take the message -> The_Message

		//first default file (if exists)
		$decaf_file = EE_ADMIN_PAGES . $this->_name . DS . $ref . '.core.php';
		if ( is_readable( $decaf_file ) )
		require_once( $decaf_file );

		//now we have to do require for extended file (if needed)
		if ( $this->_extend ) {
			require_once( EE_CORE_CAF_ADMIN_EXTEND . $this->_name . DS . 'Extend_' . $ref . '.core.php' );
		}


		//if we've got an extended class we use that!
		$ref = $this->_extend ? 'Extend_' . $ref : $ref;

		//let's make sure the class exists
		if ( !class_exists( $ref ) ) {
			$msg[] = __('We can\'t load the page object', 'event_espresso');
			$msg[] = sprintf( __('The class name that was given is %s. Check the spelling and make sure its correct, also there needs to be an autoloader setup for the class', 'event_espresso'), $ref );
			throw new EE_Error( implode( '||', $msg ) );
		}

		$a = new ReflectionClass($ref);
		$this->_page_object = $a->newInstance(FALSE);
	}


	/**
	 * Child "hook" classes can declare any methods that they want executed when a specific page route is loaded.  The advantage of this is when doing things like running our own db interactions on saves etc.  Remember that $this->_req_data (all the _POST and _GET data) is available to your methods.
	 *
	 * @access private
	 * @return void
	 */
	private function _load_custom_methods() {
		/**
		 * method cannot be named 'default' (@see http://us3.php
		 * .net/manual/en/reserved.keywords.php) so need to
		 * handle routes that are "default"
		 *
		 * @since 4.3.0
		 */
		$method_callback = $this->_current_route == 'default' ? 'default_callback' : $this->_current_route;

		//these run before the Admin_Page route executes.
		if ( method_exists( $this, $method_callback ) ) {
			call_user_func( array( $this, $method_callback) );
		}


		//these run via the _redirect_after_action method in EE_Admin_Page which usually happens after non_UI methods in EE_Admin_Page classes.  There are two redirect actions, the first fires before $query_args might be manipulated by "save and close" actions and the seond fires right before the actual redirect happens.
		//first the actions
		//note that these action hooks will have the $query_args value available.
		$admin_class_name = get_class( $this->_adminpage_obj );

		if ( method_exists( $this, '_redirect_action_early_' . $this->_current_route ) ) {
			add_action( 'AHEE__' . $admin_class_name . '___redirect_after_action__before_redirect_modification_' . $this->_current_route, array( $this, '_redirect_action_early_' . $this->_current_route ), 10 );
		}

		if ( method_exists( $this, '_redirect_action_' . $this->_current_route ) ) {
			add_action( 'AHEE_redirect_' . $admin_class_name . $this->_current_route, array( $this, '_redirect_action_' . $this->_current_route ), 10 );
		}

		//let's hook into the _redirect itself and allow for changing where the user goes after redirect.  This will have $query_args and $redirect_url available.
		if ( method_exists( $this, '_redirect_filter_' . $this->_current_route ) ) {
			add_filter( 'FHEE_redirect_' . $admin_class_name . $this->_current_route, array( $this, '_redirect_filter_' . $this->_current_route ), 10, 2 );
		}

	}



	/**
	 * This method will search for a corresponding method with a name matching the route and the wp_hook to run.  This allows child hook classes to target hooking into a specific wp action or filter hook ONLY on a certain route.  just remember, methods MUST be public
	 *
	 * Future hooks should be added in here to be access by child classes.
	 *
	 * @return void
	 */
	private function _load_routed_hooks() {

		//this array provides the hook action names that will be referenced.  Key is the action. Value is an array with the type (action or filter) and the number of parameters for the hook.  We'll default all priorities for automatic hooks to 10.
		$hook_filter_array = array(
			'admin_footer' => array(
				'type' => 'action',
				'argnum' => 1,
				'priority' => 10
				),
			'FHEE_list_table_views_' . $this->_adminpage_obj->page_slug . '_' . $this->_current_route => array(
				'type' => 'filter',
				'argnum' => 1,
				'priority' => 10
				),
			'FHEE_list_table_views_' . $this->_adminpage_obj->page_slug => array(
				'type' => 'filter',
				'argnum' => 1,
				'priority' => 10
				),
			'FHEE_list_table_views' => array(
				'type' => 'filter',
				'argnum' => 1,
				'priority' => 10
				),
			'AHEE__EE_Admin_Page___display_admin_page__modify_metaboxes' => array(
				'type' => 'action',
				'argnum' => 1,
				'priority' => 10
				)
			);



		foreach ( $hook_filter_array as $hook => $args ) {
			if ( method_exists( $this, $this->_current_route . '_' . $hook ) ) {
				if ( isset( $this->_wp_action_filters_priority[$hook] ) )
					$args['priority'] = $this->_wp_action_filters_priority[$hook];
				if ( $args['type'] == 'action' )
					add_action( $hook, array( $this, $this->_current_route . '_' . $hook ), $args['priority'], $args['argnum'] );
				else
					add_filter( $hook, array( $this, $this->_current_route . '_' . $hook ), $args['priority'], $args['argnum'] );
			}
		}

	}


	/**
	 * Loop throught the $_ajax_func array and add_actions for the array.
	 * @return void
	 */
	private function _ajax_hooks() {

		if ( empty( $this->_ajax_func) )
			return; //get out there's nothing to take care of.

		foreach ( $this->_ajax_func as $action => $method ) {
			//make sure method exists
			if ( !method_exists($this, $method) ) {
				$msg[] = __('There is no corresponding method for the hook labeled in the _ajax_func array', 'event_espresso') . '<br />';
				$msg[] = sprintf( __('The method name given in the array is %s, check the spelling and make sure it exists in the %s class', 'event_espresso' ), $method, $this->caller );
				throw new EE_Error( implode('||', $msg ) );
			}

			add_action('wp_ajax_' . $action, array( $this, $method ) );
		}

	}




	/**
	 * Loop throught the $_init_func array and add_actions for the array.
	 * @return void
	 */
	protected function _init_hooks() {
		if ( empty( $this->_init_func) )
			return; //get out there's nothing to take care of.

		//We need to determine what page_route we are on!
		$current_route = isset ( $_REQUEST['action'] ) ? $_REQUEST['action'] : 'default';

		foreach ( $this->_init_func as $route => $method ) {
			//make sure method exists
			if ( !method_exists($this, $method) ) {
				$msg[] = __('There is no corresponding method for the hook labeled in the _init_func array', 'event_espresso') . '<br />';
				$msg[] = sprintf( __('The method name given in the array is %s, check the spelling and make sure it exists in the %s class', 'event_espresso' ), $method, $this->caller );
				throw new EE_Error( implode('||', $msg ) );
			}
			if ( $route == $this->_current_route )
				add_action('admin_init', array( $this, $method ) );
		}

	}



	/**
	 * Loop through the _metaboxes property and add_metaboxes accordingly
	 * //todo we could eventually make this a config component class (i.e. new EE_Metabox);
	 *
	 * @access public
	 * @return void
	 */
	public function add_metaboxes() {
		if ( empty( $this->_metaboxes ) )
			return; //get out we don't have any metaboxes to set for this connection

		$this->_handle_metabox_array( $this->_metaboxes );

	}



	private function _handle_metabox_array( $boxes, $add = TRUE ) {

		foreach ( $boxes as $box ) {
			if ( !isset($box['page_route']) )
				continue; //we dont' have a valid array

			//let's make sure $box['page_route'] is an array so the "foreach" will work.
			$box['page_route'] = (array) $box['page_route'];

			foreach ( $box['page_route'] as $route ) {
				if ( $route != $this->_current_route )
					continue; //get out we only add metaboxes for set route.
				if ( $add )
					$this->_add_metabox($box);
				else
					$this->_remove_metabox($box);
			}
		}
	}



	/**
	 * Loop through the _remove_metaboxes property and remove metaboxes accordingly.
	 *
	 * @access public
	 * @return void
	 */
	public function remove_metaboxes() {

		if ( empty( $this->_remove_metaboxes ) )
			return; //get out there are no metaboxes to remove

		$this->_handle_metabox_array( $this->_remove_metaboxes, FALSE );
	}


	/**
	 * This just handles adding a metabox
	 *
	 * @access private
	 * @param array $args an array of args that have been set for this metabox by the child class
	 */
	private function _add_metabox( $args ) {
		$current_screen = get_current_screen();
		$screen_id = is_object( $current_screen ) ? $current_screen->id : NULL;
		$func = isset( $args['func'] ) ? $args['func'] : 'some_invalid_callback';

		//set defaults
		$defaults = array(
			'func' => $func,
			'id' => $this->caller . '_' . $func . '_metabox',
			'priority' => 'default',
			'label' => $this->caller,
			'context' => 'advanced',
			'callback_args' => array(),
			'page' => isset( $args['page'] ) ? $args['page'] : $screen_id
			);

		$args = wp_parse_args( $args, $defaults );
		extract($args);


		//make sure method exists
		if ( !method_exists($this, $func) ) {
			$msg[] = __('There is no corresponding method to display the metabox content', 'event_espresso') . '<br />';
			$msg[] = sprintf( __('The method name given in the array is %s, check the spelling and make sure it exists in the %s class', 'event_espresso' ), $func, $this->caller );
			throw new EE_Error( implode('||', $msg ) );
		}

		//everything checks out so lets add the metabox
		add_meta_box( $id, $label, array( $this, $func ), $page, $context, $priority, $callback_args);
	}



	private function _remove_metabox( $args ) {
		$current_screen = get_current_screen();
		$screen_id = is_object( $current_screen ) ? $current_screen->id : NULL;
		$func = isset( $args['func'] ) ? $args['func'] : 'some_invalid_callback';

		//set defaults
		$defaults = array(
			'id' => isset( $args['id'] ) ? $args['id'] : $this->_current_route . '_' . $this->caller . '_' . $func . '_metabox',
			'context' => 'default',
			'screen' => isset( $args['screen'] ) ? $args['screen'] : $screen_id
		);

		$args = wp_parse_args( $args, $defaults );
		extract( $args );

		//everything checks out so lets remove the box!
		remove_meta_box($id, $screen, $context);
	}
}
