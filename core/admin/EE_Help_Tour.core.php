<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
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
 * EE_Help_Tour
 *
 * This is the parent class for all the EE_Help_Tour objects that setup the steps for a help_tour on a page.
 *
 *
 * @package		EE_Help_Tour
 * @subpackage	includes/core/admin/EE_Help_Tour.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
abstract class EE_Help_Tour extends EE_Base {

	/**
	 * This is the label for the tour. It is used when regenerating restart buttons for the tour. Set this in the constructor of the child class.
	 *
	 * @access protected
	 * @var string
	 */
	protected $_label = '';



	/**
	 * This is the slug for the tour.  It should be unique from all tours and is used for starting a tour and setting cookies for the tour.
	 * Set this in the constructor of the child class.
	 *
	 * @access protected
	 * @var string
	 */
	protected $_slug = '';


	/**
	 * This will contain the formatted array for the stops that gets used by EE_Admin_Page->_add_help_tour() for setting up a tour on a given page.
	 * format for array is:
	 * array(
	 *		0 => array(
	 *			'id' => 'id_element', //if attached to an css id for an element then use this param. id's will take precendence even if you also set class.
	 *			'class' => 'class_element', //if attached to a css class for an element anchoring the stop then use this param. The first element for that class is the anchor. If the class or the id are empty then the stop will be a modal on the page anchored to the main body.
	 *			'custom_class' => 'some_custom_class', //optional custom class to add for this stop.
	 *			'button_text' => 'custom text for button', //optional
	 *			'content' => 'The content for the stop', //required
	 *			'pause_after' => false, //indicate if you want the tour to pause after this stop and it will get added to the pauseAfter global option array setup for the joyride instance. This is only applicable when this tour has been set to run on timer.
	 *			'options' => array(
	 *				//override any of the global options set via the help_tour "option_callback" for the joyride instance on this specific stop.
	 *				)
	 *			)
	 *		);
	 *
	 * @access protected
	 * @var array
	 */
	protected $_stops = array();



	/**
	 * This contains any stop specific options for the tour.
	 * defaults are set but child classes can override.
	 *
	 * @access protected
	 * @var array
	 */
	protected $_options = array();



	/**
	 * holds anything found in the $_REQUEST object (however we override any _gets with _post data).
	 *
	 * @access protected
	 * @var array
	 */
	protected $_req_data = array();



	/**
	 * a flag that is set on init for whether this help_tour is happening on a caf install or not.
	 * @var boolean
	 */
	protected $_is_caf = false;






	/**
	 * _constructor
	 * initialized the tour object and sets up important properties required to setup the tour.
	 *
	 * @access public
	 * @param boolean $caf used to indicate if this tour is happening on caf install or not.
	 * @return void
	 */
	public function __construct($caf = FALSE) {
		$this->_is_caf = $caf;
		$this->_req_data = array_merge( $_GET, $_POST );
		$this->_set_tour_properties();
		$this->_set_tour_stops();
		$this->_set_tour_options();

		//make sure the last tour stop has "end tour" for its button
		$end = array_pop($this->_stops);
		$end['button_text'] = __('End Tour', 'event_espresso');
		//add back to stops
		$this->_stops[] = $end;
	}



	/**
	 * required method that has the sole purpose of setting up the tour $_label and $_slug properties
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _set_tour_properties();



	/**
	 * required method that's sole purpose is to setup the $_stops property
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _set_tour_stops();




	/**
	 * The method can optionally be overridden by child classes to set the _options array if there are any default options the child wishes to override for a this tour. See property definition for more info
	 *
	 * @access protected
	 * @return void
	 */
	protected function _set_tour_options( $options = array() ) {
		$defaults = array(
			'tipLocation' => 'bottom',         // 'top', 'bottom', 'right', 'left' in relation to parent
		  	'nubPosition' => 'auto',           // override on a per tooltip bases. can be "auto", "right", "top", "bottom", "left"
		  	'tipAdjustmentY' => 0, 			//allow for adjustment of tip
		  	'tipAdjustmentX' => 0,			//allow for adjustment of tip
		  	'scroll' => true, //whether to scrollTo the next step or not
		  	'scrollSpeed' => 300,              // Page scrolling speed in ms
		  	'timer' => 0,	                // 0 = off, all other numbers = time(ms)
		  	'autoStart' => true,			// true or false - false tour starts when restart called
		  	'startTimerOnClick' => true,       // true/false to start timer on first click
		  	'nextButton' => true,              // true/false for next button visibility
		  	'button_text' => __('Next', 'event_espresso'),
		  	'tipAnimation' => 'fade',           // 'pop' or 'fade' in each tip
		  	'pauseAfter' => array(),                // array of indexes where to pause the tour after
		  	'tipAnimationFadeSpeed' => 300,    // if 'fade'- speed in ms of transition
		  	'cookieMonster' => true,           // true/false for whether cookies are used
		  	'cookieName' => $this->get_slug(),         // choose your own cookie name (setup will add the prefix for the specific page joyride)
	  		'cookieDomain' => false,           // set to false or yoursite.com
		  	//'tipContainer' => 'body',            // Where the tip be attached if not inline
		  	'modal' => false, 					// Whether to cover page with modal during the tour
		  	'expose' => false,					// Whether to expose the elements at each step in the tour (requires modal:true),
		  	'postExposeCallback' => 'EEHelpTour.postExposeCallback',    // A method to call after an element has been exposed
		  	'preRideCallback' => 'EEHelpTour_preRideCallback',    // A method to call before the tour starts (passed index, tip, and cloned exposed element)
		  	'postRideCallback' => 'EEHelpTour_postRideCallback',       // a method to call once the tour closes.  This will correspond to the name of a js method that will have to be defined in loaded js.
		  	'preStepCallback' => 'EEHelpTour_preStepCallback',    // A method to call before each step
		  	'postStepCallback' => 'EEHelpTour_postStepCallback',        // A method to call after each step (remember this will correspond with a js method that you will have to define in a js file BEFORE ee-help-tour.js loads, if the default methods do not exist, then ee-help-tour.js just substitues empty functions $.noop)/**/
			);

		$options = !empty( $options ) && is_array($options)  ? array_merge( $defaults, $options ) : $defaults;
		$this->_options = $options;
	}


	/**
	 * getter functions to return all the properties for the tour.
	 */


	/**
	 * get_slug
	 * @return string slug for the tour
	 */
	public function get_slug() {
		if ( empty( $this->_slug ) )
			throw new EE_Error( sprintf(__('There is no slug set for the help tour class (%s). Make sure that the $_slug property is set in the class constructor', 'event_espresso'), get_class($this) ) );
		return $this->_slug;
	}




	/**
	 * get_label
	 * @return string
	 */
	public function get_label() {
		if ( empty( $this->_label ) )
			throw new EE_Error( sprintf( __('There is no label set for the help tour class (%s). Make sure that the $_label property is set in the class constructor', 'event_espresso'), get_class($this) ) );
		return $this->_label;
	}



	/**
	 * get_stops
	 * @return array
	 */
	public function get_stops() {
		foreach( $this->_stops as $ind => $stop ) {
			if ( ! isset( $stop['button_text'] ) ) {
				$this->_stops[$ind]['button_text'] = $this->_options['button_text'];
			}
		}
		return $this->_stops;
	}



	/**
	 * get options
	 * @return array
	 */
	public function get_options() {
		//let's make sure there are not pauses set
		foreach ( $this->_stops as $ind => $stop ) {
			if ( isset( $stop['pause_after'] ) && $stop['pause_after'] ) {
				$this->_options['pauseAfter'][] = $ind;
			}
		}
		return apply_filters( 'FHEE__' . get_class($this) . '__get_options', $this->_options, $this );
	}

}
