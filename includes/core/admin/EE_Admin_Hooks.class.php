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
 * @version		3.2.P
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
	 * 	[0] => array(
	 * 		'page_route' => 'string_for_page_route', //must correspond to a page route in the class being connected with (i.e. "edit_event");
	 * 		'func' =>  'executing_method',  //must be public (i.e. public function executing_method($post, $callback_args){} ).  Note if you include callback args in the array then you need to declare them in the method arguments.
	 * 		'id' => 'identifier_for_metabox', //so it can be removed by addons (optional, class will set it automatically)
	 * 		'priority' => 'default', //default 'default' (optional)
	 * 		'label' => __('Localized Title', 'event_espresso'),
	 * 		'context' => 'advanced' //advanced is default (optional),
	 *   	'callback_args' => array() //any callback args to include (optional)
	 * )
	 * @var array
	 */
	protected $_metaboxes;




	/**
	 * This parent class takes care of loading the scripts and styles if the child class has set the properties for them in the following format.  It's important that the child classes have already registered the scripts using the "wp_register_[style|script]" wp function:
	 * array(
	 * 'page_route' => 'script_ref' // if more than one script is to be loaded its best to use the 'dependency' argument when registering the scripts/styles to make sure more all that are needed are loaded.
	 * )
	 * @var array
	 */
	protected $_scripts;
	protected $_styles;


	/**
	 * This is a property that will contain the current route.
	 * @var string;
	 */
	protected $_current_route;





	/**
	 * This just holds a merged array of the $_POST and $_GET vars in favor of $_POST
	 * @var array
	 */
	protected $_req_data;





	/**
	 * This just holds an instance of the page object for this hook
	 * @var object
	 */
	protected $_page_object;






	public function __construct() {
		$this->_set_defaults();
		$this->_set_hooks_properties();
		$this->_set_page_object();
		$this->_ajax_hooks();
		$this->_init_hooks();

		add_action( 'admin_enqueue_scripts', array($this, 'enqueue_scripts_styles' ) );
		add_action( 'admin_head', array($this, 'add_metaboxes') );
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
		//scripts first
		if ( !empty( $this->_scripts ) ) {
			foreach ( $this->_scripts as $route => $ref ) {
				if ( $this->_current_route != $route )
					continue;
				wp_enqueue_script($ref);
			}
		}

		//styles
		if ( !empty( $this->_styles ) ) {
			foreach ( $this->_styles as $route => $ref ) {
				if ( $this->_current_route != $route ) 
					continue;
				wp_enqueue_style($ref);
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
		$this->_ajax_func = $this->_init_func = $this->_metaboxes = $this->_scripts = $this->_styles = array();
		$this->_current_route = isset( $_REQUEST['action'] ) ? $_REQUEST['action'] : 'default';
		$this->_req_data = array_merge($_GET, $_POST);
		$this->caller = get_class($this);
	}



	/**
	 * this sets the _page_object property
	 *
	 * @access private
	 * @return void
	 */
	private function _set_page_object() {
		//first make sure $this->_name is set
		if ( empty( $this->_name ) ) {
			$msg[] = __('We can\'t load the page object', 'event_espresso');
			$msg[] = sprintf( __("This is because the %s child class has not set the 
				'_name' property", 'event_espresso'), $this->_caller );
			throw new EE_Error( implode( '||', $msg ) );
		}

		$ref = str_replace('_' , ' ', $this->_name); //take the_message -> the message
		$ref = str_replace(' ', '_', ucwords($ref) ) . '_Admin_Page'; //take the message -> The_Message

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
	 * Loop throught the $_ajax_func array and add_actions for the array.
	 * @return void
	 */
	private function _ajax_hooks() {
		if ( empty( $_ajax_func) )
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
	private function _init_hooks() {
		if ( empty( $_init_func) )
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

		foreach ( $this->_metaboxes as $box ) {
			if ( !isset($box['page_route']) || ( isset($box['page_route']) && $box['page_route'] != $this->_current_route ) )
				continue; //we only add metaboxes for the set route
			$this->_add_metabox($box);
		}			

	}


	/**
	 * This just handles adding a metabox
	 *
	 * @access private
	 * @param array $args an array of args that have been set for this metabox by the child class
	 */
	private function _add_metabox( $args ) {
		$current_screen = get_current_screen();

		//set defaults
		$defaults = array(
			'func' => 'some_breaking_link',
			'id' => $this->_current_route . '_' . $this->caller . '_metabox',
			'priority' => 'default',
			'label' => $this->caller,
			'context' => 'advanced',
			'callback_args' => array()
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
		add_meta_box( $id, $label, array( $this, $func), $current_screen->id, $context, $priority, $callback_args);
	}
}
