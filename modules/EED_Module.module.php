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
 * EED_Module
 *
 * @package			Event Espresso
 * @subpackage	/modules/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
//add_action( 'plugins_loaded', array( 'EED_Module', 'register_module' ));
//add_filter( 'AHEE__EE_Front_Controller__register_module', array( 'EED_Module', 'register_module' ));

abstract class EED_Module extends EE_Base { 

	/**
	 * 	instance of the EED_Module object
	 * 	@access 	private
	 *	@var 	EED_Module $_instance
	 */
	protected static $_instance = NULL;

	/**
	 * 	EE_Registry Object
	 *	@var 	EE_Registry	
	 * 	@access 	protected
	 */
	protected $EE = NULL;

	/**
	 * 	rendered output to be returned to WP
	 *	@var 	string
	 * 	@access 	protected
	 */
	protected $ouput = '';

	/**
	 * 	run - initial module setup
	 * 	this method is primarily used for activating resources in the EE_Front_Controller thru the use of filters
	 *
	 *  @access 	public
	 *  @var 			WP $WP
	 *  @return 	void
	 */
	public abstract function run( $WP );

	
	/**
	*	class constructor - can ONLY be instantiated by EE_Front_Controller
	*
	*	@override default exception handling
	*	@access public
	*	@return 	void
	*/
	final public function __construct() {
		$this->EE = EE_Registry::instance();
	}
	

	
	/**
	*	scan_template_directory - glob directory for template files
	*
	*	@access public
	*	@return 	array
	*/
	public static function scan_template_directory( $folder_path = NULL, $template_patterns = '*', $ignore_patterns = array() ) {
		// make sure patterns are arrays
		$template_patterns =  is_array( $template_patterns ) ? $template_patterns : array( $template_patterns );
		$ignore_patterns =  is_array( $ignore_patterns ) ? $ignore_patterns : array( $ignore_patterns );
		// add braces and pad each pattern with wildcards
		$pattern = '{*' . implode( '*,*', $template_patterns ) . '*}';
		// grab any files that match the pattern
		$templates = glob( $folder_path . $pattern . '.php', GLOB_BRACE );
		// cycle thru files
		foreach ( $templates as $key => $template ) {
			// cycle thru patterns to ignore
			foreach( $ignore_patterns as $ignore_pattern ) {
				// and if we find one, then unset that template
				if ( strpos( $template, $ignore_pattern )) {
					unset( $templates[ $key ] );
				}
			}
		}
		return $templates;
	}
	
}
// End of file EED_Module.module.php
// Location: /modules/EED_Module.module.php