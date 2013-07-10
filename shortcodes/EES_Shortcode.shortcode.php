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
 * EES_Shortcode
 *
 * @package			Event Espresso
 * @subpackage	/shortcodes/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
abstract class EES_Shortcode extends EE_Base { 

	/**
	 * 	EE_Request_Handler Object
	 * 	@access 	public
	 *	@var 	EE_Request_Handler	$REQ
	 */
	public $REQ = NULL;

	/**
	 * 	rendered output to be returned to WP
	 *	@var 	string
	 * 	@access 	protected
	 */
	protected $ouput = '';

	/**
	 * 	run - initial shortcode module setup called during "wp_loaded" hook - this shortcode is going to execute during this request !
	 * 	this method is primarily used for loading resources that will be required by the shortcode when it is actually processed
	 *
	 *  @access 	public
	 *	@param 	EE_Request_Handler	$REQ
	 *  @return 	void
	 */
	public abstract function run( EE_Request_Handler $REQ = NULL );

	/**
	 * 	process_shortcode
	 * 	this method is the callback function for the actual shortcode, and is what runs when WP encounters the shortcode within the_content
	 *
	 *  @access 	public
	 *  @param		array 	$attributes
	 *  @return 	void
	 */
	public abstract function process_shortcode( $attributes );

	/**
	 * 	_add_shortcode
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	final public function _add_shortcode() {
		// get classname, remove EES_prefix, and convert to UPPERCASE
		$shortcode = strtoupper( str_replace( 'EES_', '', get_class( $this )));
		add_shortcode( $shortcode, array( $this, 'process_shortcode' ));	
	}
	
	/**
	*	instance - returns $this
	*
	*	@access public
	*	@return 	void
	*/
	final public static function instance() {
		return $this;
	}
	
	/**
	*	class constructor - can ONLY be instantiated by EE_Front_Controller
	*
	*	@access public
	*	@return 	void
	*/
	final public function __construct( ) {
		add_action( 'init', array( $this, '_add_shortcode' ));
	}
	
}
// End of file EES_Shortcode.shortcode.php
// Location: /shortcodes/EES_Shortcode.shortcode.php