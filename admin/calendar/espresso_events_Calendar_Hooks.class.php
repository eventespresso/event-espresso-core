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
 * espresso_events_Registration_Form_Hooks
 * Hooks various messages logic so that it runs on indicated Events Admin Pages.
 * Commenting/docs common to all children classes is found in the EE_Admin_Hooks parent.
 * 
 *
 * @package		espresso_events_Registration_Form_Hooks
 * @subpackage	includes/core/admin/messages/espresso_events_Registration_Form_Hooks.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class espresso_events_Calendar_Hooks extends EE_Admin_Hooks {



	protected function _set_hooks_properties() {
		$this->_name = 'registration_form';
		$this->_metaboxes = array(
			0 => array(
				'page_route' => array( 'edit_category', 'add_category' ),
				'func' => 'category_color',
				'label' => __('Category Color', 'event_espresso'),
				'priority' => 'default',
				'context' => 'side'
				)
		);
		
		//hook in the iris color picker
		$this->_scripts_styles = array(
			'registers'=>array(
				'category-color-for-calendar'=>array(
					'type'=>'js',
					'url'=>CALENDAR_ADMIN_ASSETS_URL.'category-color-for-calendar.js',
					'depends'=>array('wp-color-picker')
				)
				//note: right now we don't have a custom css style, but we DO want the iris styles,
				//so for that we just override the parent enqueue_scripts_styles to add the style
			),
			'enqueues'=>array(
				'category-color-for-calendar'=>array('edit_category','add_category')
			)
		);
		

		//hook into the handler for saving question groups
//		add_filter( 'FHEE_event_editor_update', array( $this, 'modify_callbacks'), 10 );
//
//		//hook into revision restores (we're hooking into the global action because EE_Admin_Hooks classes are already restricted by page)
//		add_action( 'AHEE_EE_Admin_Page_CPT__restore_revision', array($this, 'restore_revision' ), 10, 2 );
	}
	
	/**
	 * Overrides parent so we can first enqueue the iris color picker styles.
	 * This could also be done by registering and enqueueing a custom style
	 * in the _script_styles array and adding wp-color-picker as a dependency,
	 *  but we currently don't have a custom style to register
	 */
	function enqueue_scripts_styles(){
		wp_enqueue_style( 'wp-color-picker' );
		parent::enqueue_scripts_styles();
	}
	
	function category_color(){
		 EEH_Template::display_template(CALENDAR_ADMIN_TEMPLATE_PATH."category_color_for_calendar.template.php");
	}





	
} //end espresso_events_Registration_Form_Hooks