<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('NO direct script access allowed'); }

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
 * EE_Qtip_Config
 *
 * This is the parent class for the Qtip PHP library for interfacing with the qTip2 js library.
 *
 * @package		Event Espresso
 * @abstract
 * @subpackage	/core/libraries/qtips/EE_Qtip_Config.helper.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
abstract class EE_Qtip_Config extends EE_Base {

	/**
	 * This will hold the qtips setup array (setup by children)
	 * @access protected
	 * @var array
	 */
	protected $_qtipsa;


	/**
	 * This holds the constructed EE_Qtip objects
	 * @access protected
	 * @var EE_Qtip
	 */
	protected $_qtips;



	/**
	 * an array of default options for instantiated qtip js objects
	 * @access protected
	 * @var array
	 */
	protected $_default_options;



	/**
	 * constructor
	 * @access public
	 */
	public function __construct() {
		$this->_qtipsa = $this->_qtips = array();
		$this->_set_default_options();
		$this->_set_tips_array();
		$this->_construct_tips();
	}



	/**
	 * Children define this method and its purpose is to setup the $_qtipsa property.  The format of this property is:
	 *
	 * $qtipsa = array(
	 * 		0 => array(
	 * 			'content_id' => 'some_unique_id_for_referencing_content', //just the string
	 * 			'content' => 'html/text content for the qtip',
	 * 			'target' => '#target-element', //use the same schema as jQuery selectors.  This will match what the target is for the qTip in the dom (i.e. if class then '.some-class').
	 * 			'options' => array() //use this to override any of the default options for this specific qtip.
	 * 		)
	 * );
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _set_tips_array();




	/**
	 * all the default options for the qtip js are defined here.  Children class can override the defaults for all the qtips defined in their config OR just leave it and have the parent default options apply.
	 *
	 * commented out options are there for reference so you know which can be defined by the child.
	 *
	 * Note: children do NOT have to define all these options.  Just define the ones to override.
	 *
	 * @link http://qtip2.com/options
	 *
	 * @access protected
	 * @return void
	 */
	protected function _set_default_options() {
		$this->_default_options = array(
			//'id' => 'unique_id_referncing_qtip_instance',
			'prerender' => false, //increases page load if true,
			'suppress' => true, //whether default browser tooltips are suppressed.
			'content' => array(
				'button' => false, //what you want for the close button text/link.
				'title' => true, //Options: "string", true.  If TRUE then the title attribute of the target will be used (if available). If "string" then we'll use that as the title.
				'clone' => true, //Options: true|false.  if true then the text will be cloned from the content instead of removed from the dom.
				),
			'show_only_once' => false, //this is NOT a qtip2 library option, but is something added for EE specific use.  If set to true, this means that this particular tooltip will only show ONCE for the user and then a cookie will be saved so that it doesn't show again (after exit).
			'position' => array(
				'my' => 'top left', //top left || top center || top right || right top || right center || right bottom || bottom right || bottom center || bottom left || left bottom || left center || left top
				'at' => 'bottom right', //same options as above.
				'target' => 'event', //if u use jQuery::#selector, js will parse to a jQuery selector || 'mouse' (at mouse cursor position) || 'event' (position at target that triggered the tooltip), or an array containing an absolute x/y position on page.
				'container' => false, //what HTML element the tooltip is appended to (it's containing element). jquery object.  Use 'jQuery::#selector' and js will parse'
				'viewport' => true, // @link http://qtip2.com/plugins#viewport
				'adjust' => array(
					'x' => 0, //adjust position on x axis by 0 pixels.
					'y' => 0, //adjust position on y axis by 0 pixels.
					'mouse' => true, //when position['target'] is set to 'mouse', tooltip will follow mouse when hovering over the target.  False, stops following.
					'resize' => true, //adjust tooltip position when window is resized.
					'scroll' => true, //position of tooltip adjusted when window (or position.container) is scrolled.
					'method' => 'flipinvert', // @link http://qtip2.com/plugins#viewport
					)
				),
			'show' => array(
				'event' => 'mouseenter', //what event triggers tooltip to be shown.  Any jQuery standard event or custom events can be used. space separated events provide multiple triggers.
				'target' => false, //options jQuery::#selector|false.  Used to indicate which html element will trigger show event.  When false, the element the qtip() method was called upon is used.
				'delay' => 90, //time in millisecons by which to delay showing of tooltip.
				'solo' => false, //determines whether tooltip will hid all others when triggered. Options: true (hide all) || false (ignore) || string (parent selector for which qtips get hidden)
				'modal' => array(
					'on' => false, //does tooltip trigger modal?
					'blur' => true, //does clicking on the dimmed background hide the tooltip and remove the dim?
					'escape' => true, //hitting escape key hide the tooltip and cancel modal
					'stealfocus' => true, //can users focus on inputs and elelments outside of tooltip when modal on?
					),
				),
			'hide' => array(
				'event' => 'mouseleave', //similar as what you do for show.event.
				'target' => false, //Options jQuery::#selector. which html element will trigger hide event. When false, the element the .qtip() method was called upon is used.
				'delay' => 0, //set time in milliseconds for delaying the hide of the tooltip
				'inactive' => false,  //if integer, time in millisecons in which the tooltip should be hidden if remains inactive (not interacted with)
				'fixed' => false, //when set to true, the tooltip will not hide if moused over.
				'leave' => 'window', //specify whether the tooltip will hide when leaving the window it's conained within.
				'distance' => false, //if integer, distance in pixels that the tooltip hides when the mouse is moved from the point it triggered the tooltip.
				),
			'style' => array(
				'classes' => 'qtip-tipsy', //Options "string", false.  A space separated string containing all class names which should be added ot the main qTip element. See options for styles in comment block at end of this class.
				'def' => true, //set to false and the default qtip class does not get applied
				'widget' => false, //whether ui-widget classes of the themeroller UI styles are applied to tooltip.
				'width' => false, // Options: "string", integer, false.  with this you can override all applied CSS width styles for tooltip.  Can be any valid width CSS value. (does not override min/max width styles)
				'height' => false, //same as above except applies to height.
				'tip' => array(
					'corner' => true, //where in relation to the tooltip the speech bubble tip is applied. Options: true, "corner string" (see position), false.  true inherits
					'mimic' => false, //see documentation @link http://qtip2.com/plugins#tips
					'border' => true, //Options: true, integer. determines the width of the border that surrounds the tip element.  True inherits from tooltip.
					'width' => 6, //width of rendered tip in pixels in relation to the side of the tooltip the tip is on.
					'height' => 6, //works the same as tip.width
					'offset' => 0, //use to set the offset of the tip in relation to its corner position.
					)
				),

			);
	}



	/**
	 * This takes the set $_qtipsa array property and loops through it to set the EE_Qtip objects and assign them to the $_qtips property
	 *
	 * @access protected
	 * @return void
	 */
	protected function _construct_tips() {
		foreach ( $this->_qtipsa as $qt ) {
			//make sure we have what we need.
			if ( !isset( $qt['content_id'] ) || !isset( $qt['target'] ) || !isset( $qt['content'] ) )
				throw new EE_Error( sprintf( __('There is something wrong with the _qtipsa property setup for the %s qtip config class.  The dump of the current array index is: %s.<br /><br />Please check that it is setup correctly.', 'event_espresso'), get_class($this), var_export($qt, true) ) );

			//make sure the options include defaults and just override via set config.
			$options_override = isset( $qt['options'] ) ? (array) $qt['options'] : array();
			$options = array_merge( $this->_default_options, $options_override );
			$setup = array(
				'content_id' => $qt['content_id'],
				'options' => $options,
				'target' => $qt['target'],
				'content' => $qt['content']
				);
			$this->_qtips[] = new EE_Qtip( $setup );
		}
	}




	/**
	 * return the _qtips property contents
	 *
	 * @access public
	 * @return EE_Qtip[]
	 */
	public function get_tips() {
		return $this->_qtips;
	}


} //end EE_Qtip_Config

//class names you can use for tooltip styles
/**
 * qtip //default applied class
 * qtip-plain
 * qtip-light
 * qtip-dark
 * qtip-red
 * qtip-green
 * qtip-blue
 *
 * CSS3+ styles
 * qtip-shadow
 * qtip-rounded
 * qtip-bootstrap
 * qtip-tipsy
 * qtip-youtube
 * qtip-jtools
 * qtip-cluetip
 * qtip-tipped
 */




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
 * EE_Qtip
 *
 * All Qtips should be derivatives of this object.
 *
 * @package		Event Espresso
 * @abstract
 * @subpackage	/core/libraries/qtips/EE_Qtip_Config.helper.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Qtip extends EE_Base {
	public $content_id;
	public $options;
	public $target;
	public $content;

	public function __construct( $setup_array ) {
		foreach ( $setup_array as $prop => $value ) {
			if ( EEH_Class_Tools::has_property( $this, $prop ) )
				$this->{$prop} = $value;
		}
	}
}