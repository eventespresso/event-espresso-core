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
 * Extend_Events_Admin_Page
 *
 * This is the Events Caffeinated admin page.
 *
 *
 * @package		Extend_Events_Admin_Page
 * @subpackage	includes/core/admin/Extend_Events_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Extend_Events_Admin_Page extends Events_Admin_Page {


	public function __construct( $routing = TRUE ) {
		parent::__construct( $routing );
		define( 'EVENTS_CAF_TEMPLATE_PATH', EE_CORE_CAF_ADMIN_EXTEND . 'events/templates/');
		define( 'EVENTS_CAF_ASSETS', EE_CORE_CAF_ADMIN_EXTEND . 'events/assets/');
		define( 'EVENTS_CAF_ASSETS_URL', EE_CORE_CAF_ADMIN_EXTEND_URL . 'events/assets/');
	}


	protected function _extend_page_config() {

		//partial route/config override
		$this->_page_config['import_events']['metaboxes'] = $this->_default_espresso_metaboxes;
		$this->_page_config['create_event']['metaboxes'][] = '_premium_event_editor_meta_boxes';
		$this->_page_config['edit']['metaboxes'][] = '_premium_event_editor_meta_boxes';

		//add filters and actions
		//modifying _views
		add_filter('FHEE_list_table_views_espresso_events', array( $this, 'list_table_views'), 10 );
		add_filter('FHEE_event_datetime_metabox_add_additional_date_time_template', array( $this, 'add_additional_datetime_button' ), 10, 2 );
		add_filter('FHEE_event_datetime_metabox_clone_button_template', array( $this, 'add_datetime_clone_button' ), 10, 2 );
		add_filter('FHEE_event_datetime_metabox_timezones_template', array( $this, 'datetime_timezones_template'), 10, 2 );
		add_filter('FHEE_additional_registration_options_event_edit_page', array( $this, 'additional_registration_options'), 10, 6);

		//event settings
		add_action('AHEE_event_settings_template_extra_content', array( $this, 'enable_attendee_pre_approval'), 10 );

	}





	public function load_scripts_styles_edit() {
		//styles
		wp_enqueue_style('jquery-ui-style');
		wp_enqueue_style('jquery-ui-style-datepicker-css');

		
		wp_enqueue_script('event_editor_js');
		$new_strings = array(
			'image_confirm' => __('Do you really want to delete this image? Please remember to update your event to complete the removal.', 'event_espresso'),
			'event_starts_on' => __('Event Starts on', 'event_espresso'),
			'event_ends_on' => __('Event Ends on', 'event_espresso'),
			'event_datetime_actions' => __('Actions', 'event_espresso'),
			'event_clone_dt_msg' => __('Clone this Event Date and Time', 'event_espresso'),
			'remove_event_dt_msg' => __('Remove this Event Time', 'event_espresso'),
			'clone_trooper_img_src' => EVENT_ESPRESSO_PLUGINFULLURL . 'images/clone-trooper-16x16.png',
			'clone_trooper_img_alt' => __('clone', 'event_espresso'),
			'trash_img_src' => EVENT_ESPRESSO_PLUGINFULLURL .'images/trash-16x16.png',
			'trash_img_alt' => __('trash', 'event_espresso')
			);

		EE_Registry::$i18n_js_strings = array_merge( EE_Registry::$i18n_js_strings, $new_strings);

		wp_register_script('event_datetime_js', EVENTS_CAF_ASSETS_URL . 'js/ee_events_datetime.js', array('event_editor_js'), EVENT_ESPRESSO_VERSION, TRUE );
		wp_localize_script( 'event_datetime_js', 'eei18n', EE_Registry::$i18n_js_strings );
		wp_enqueue_script('event_datetime_js');
	}






	public function add_additional_datetime_button( $template, $template_args ) {
		return espresso_display_template( EVENTS_CAF_TEMPLATE_PATH . 'event_datetime_add_additional_time.template.php', $template_args, TRUE);
	}



	public function add_datetime_clone_button( $template, $template_args ) {
		return espresso_display_template( EVENTS_CAF_TEMPLATE_PATH . 'event_datetime_metabox_clone_button.template.php', $template_args, TRUE );
	}



	public function datetime_timezones_template( $template, $template_args ) {
		return espresso_display_template( EVENTS_CAF_TEMPLATE_PATH . 'event_datetime_timezones.template.php', $template_args, TRUE );
	}


	public function additional_registration_options( $html, $template_args, $yes_no_values, $additional_attendee_reg_info_values, $default_reg_status_values ) {
		global $org_options;
		$template_args['use_attendee_pre_approval'] = $org_options['use_attendee_pre_approval'];
		$template_args['attendee_pre_approval_required'] = $org_options['use_attendee_pre_approval'] ? EE_Form_Fields::select_input("require_pre_approval", $yes_no_values, $this->_event->require_pre_approval) : '';
		return espresso_display_template( EVENTS_CAF_TEMPLATE_PATH . 'event_additional_registration_options.template.php', $template_args, TRUE);
	}



	public function enable_attendee_pre_approval( $template_args ) {
		$_args['attendee_pre_approval_select'] = EE_Form_Fields::select_input('use_attendee_pre_approval', $template_args['values'], $template_args['use_attendee_pre_approval'] );
		$template = EVENTS_CAF_TEMPLATE_PATH . 'event_settings_enable_attendee_pre_approval.template.php';
		espresso_display_template( $template, $_args );
	}




	public function list_table_views( $views ) {
		/*$views['all']['bulk_action']['export_payments'] =  __('Export Payments', 'event_espresso');
		$views['today']['bulk_action']['export_payments'] =  __('Export Payments', 'event_espresso');
		$views['month']['bulk_action']['export_payments'] =  __('Export Payments', 'event_espresso');*/
		return $views;
	}



	/**
	 * _premium_event_editor_meta_boxes
	 * add all metaboxes related to the event_editor
	 *
	 * @access protected
	 * @return void 
	 */
	protected function _premium_event_editor_meta_boxes() {
		global $org_options;


		add_meta_box('espresso_event_editor_event_options', __('Event Registration Options', 'event_espresso'), array( $this, 'registration_options_meta_box' ), $this->page_slug, 'side', 'default');

		add_meta_box('espresso_event_types', __('Event Type', 'event_espresso'), array( $this, 'event_type_meta_box' ), $this->page_slug, 'side', 'core' );

		//todo feature in progress
		//add_meta_box('espresso_event_editor_promo_box', __('Event Promotions', 'event_espresso'), array( $this, 'promotions_meta_box' ), $this->_current_screen->id, 'side', 'core');

		//todo, this will morph into the "Person" metabox once events are converted to cpts and we have the persons cpt in place.
		if ($org_options['use_personnel_manager']) {
			add_meta_box('espresso_event_editor_personnel_box', __('Event Staff / Speakers', 'event_espresso'), array( $this, 'personnel_metabox' ), $this->page_slug, 'side', 'default');
		}
	}



	/**
	 * override caf metabox
	 * @return string html contents
	 */
	public function registration_options_meta_box() {

		global $org_options;
		$yes_no_values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso'))
		);
		$additional_attendee_reg_info_values = EEM_Event::additional_attendee_reg_info_array();
		$default_reg_status_values = EEM_Registration::reg_status_array();
		$template_args['active_status'] = $this->_cpt_model_obj->pretty_active_status(FALSE);
		$template_args['_event'] = $this->_cpt_model_obj;
		$template_args['allow_group_reg_select'] = EE_Form_Fields::select_input('allow_multiple', $yes_no_values, $this->_cpt_model_obj->allow_multiple(), 'id="group-reg"', '', false);
		$template_args['additional_limit'] = $this->_cpt_model_obj->additional_limit();
		$template_args['additional_attendee_select'] = EE_Form_Fields::select_input('additional_attendee_reg_info', $additional_attendee_reg_info_values, $this->_cpt_model_obj->additional_attendee_reg_info());
		$template_args['default_registration_status'] = EE_Form_Fields::select_input('default_reg_status', $default_reg_status_values, $this->_cpt_model_obj->default_registration_status());
		$template_args['display_description'] = EE_Form_Fields::select_input('display_desc', $yes_no_values, $this->_cpt_model_obj->display_description());
		$template_args['display_registration_form'] = EE_Form_Fields::select_input('display_reg_form', $yes_no_values, $this->_cpt_model_obj->display_reg_form(), '', '', false);
		$template_args['allow_overflow'] = EE_Form_Fields::select_input('allow_overflow', $yes_no_values, $this->_cpt_model_obj->allow_overflow() );
		$template_args['require_pre_approval'] = EE_Form_Fields::select_input('require_pre_approval', $yes_no_values, $this->_cpt_model_obj->require_pre_approval() );
		$template_args['additional_registration_options'] = apply_filters('FHEE_additional_registration_options_event_edit_page', '', $template_args, $yes_no_values, $additional_attendee_reg_info_values, $default_reg_status_values);
		$templatepath = EVENTS_CAF_TEMPLATE_PATH . 'event_registration_options.template.php';
		espresso_display_template($templatepath, $template_args);
	}




	/**
	 * event type metabox for events
	 * @param  object $post current post object
	 * @param  array  $box  metabox args
	 * @return string       metabox contents
	 */
	public function event_type_meta_box( $post, $box ) {
		$template_args['radio_list'] = $this->wp_terms_radio($post->ID, array( 'taxonomy' => 'espresso_event_type' ) );
		$template = EVENTS_CAF_TEMPLATE_PATH . 'event_type_metabox_contents.template.php';
		espresso_display_template($template, $template_args);
	}







	public function wp_terms_radio( $post_id = 0, $args = array() ) {
		$defaults = array(
			'descendants_and_self' => 0,
			'selected_cats' => false,
			'popular_cats' => false,
			'walker' => null,
			'taxonomy' => 'category',
			'checked_ontop' => true
		);
		$args = apply_filters( 'wp_terms_checklist_args', $args, $post_id );

		extract( wp_parse_args($args, $defaults), EXTR_SKIP );

		if ( empty($walker) || !is_a($walker, 'Walker') )
			$walker = new Walker_Radio_Checklist;

		$descendants_and_self = (int) $descendants_and_self;

		$args = array('taxonomy' => $taxonomy);

		$tax = get_taxonomy($taxonomy);
		$args['disabled'] = !current_user_can($tax->cap->assign_terms);

		if ( is_array( $selected_cats ) )
			$args['selected_cats'] = $selected_cats;
		elseif ( $post_id )
			$args['selected_cats'] = wp_get_object_terms($post_id, $taxonomy, array_merge($args, array('fields' => 'ids')));
		else
			$args['selected_cats'] = array();

		if ( is_array( $popular_cats ) )
			$args['popular_cats'] = $popular_cats;
		else
			$args['popular_cats'] = get_terms( $taxonomy, array( 'fields' => 'ids', 'orderby' => 'count', 'order' => 'DESC', 'number' => 10, 'hierarchical' => false ) );

		if ( $descendants_and_self ) {
			$categories = (array) get_terms($taxonomy, array( 'child_of' => $descendants_and_self, 'hierarchical' => 0, 'hide_empty' => 0 ) );
			$self = get_term( $descendants_and_self, $taxonomy );
			array_unshift( $categories, $self );
		} else {
			$categories = (array) get_terms($taxonomy, array('get' => 'all'));
		}

		if ( $checked_ontop ) {
			// Post process $categories rather than adding an exclude to the get_terms() query to keep the query the same across all posts (for any query cache)
			$checked_categories = array();
			$keys = array_keys( $categories );

			foreach( $keys as $k ) {
				if ( in_array( $categories[$k]->term_id, $args['selected_cats'] ) ) {
					$checked_categories[] = $categories[$k];
					unset( $categories[$k] );
				}
			}

			// Put checked cats on top
			$list = call_user_func_array(array(&$walker, 'walk'), array($checked_categories, 0, $args));
		}
		// Then the rest of them
		$list .= call_user_func_array(array(&$walker, 'walk'), array($categories, 0, $args));
		return $list;
	}



} //end class Events_Admin_Page

require_once ABSPATH . 'wp-admin/includes/template.php';
class Walker_Radio_Checklist extends Walker_Category_Checklist {
	
	function start_el( &$output, $category, $depth = 0, $args = array(), $id = 0 ) {
		extract($args);
		if ( empty($taxonomy) )
			$taxonomy = 'category';

		if ( $taxonomy == 'category' )
			$name = 'post_category';
		else
			$name = 'tax_input['.$taxonomy.']';

		$class = '';
		$output .= "\n<li id='{$taxonomy}-{$category->term_id}'$class>" . '<label class="selectit"><input value="' . $category->term_id . '" type="radio" name="'.$name.'[]" id="in-'.$taxonomy.'-' . $category->term_id . '"' . checked( in_array( $category->term_id, $selected_cats ), true, false ) . disabled( empty( $args['disabled'] ), false, false ) . ' /> ' . esc_html( apply_filters('the_category', $category->name )) . '</label>';
	}
}