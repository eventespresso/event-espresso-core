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


	public function __construct() {
		parent::__construct();
		define( 'EVENTS_CAF_TEMPLATE_PATH', EE_CORE_CAF_ADMIN_EXTEND . 'events/templates/');
		define( 'EVENTS_CAF_ASSETS', EE_CORE_CAF_ADMIN_EXTEND . 'events/assets/');
		define( 'EVENTS_CAF_ASSETS_URL', EE_CORE_CAF_ADMIN_EXTEND_URL . 'events/assets/');
	}


	protected function _extend_page_config() {

		//new routes and new configs (or complete route overrides)
		$new_page_routes = array(
//			'export_payments' => array(
//				'func' => '_payment_export',
//				'noheader' => true
//				),
//			'view_report' => '_view_report',
			);

		$this->_page_routes = array_merge( $this->_page_routes, $new_page_routes );

		$new_page_config = array(
//			'view_report' => array(
//				'nav' => array(
//					'label' => __('Report', 'event_espresso'),
//					'order' => 20
//					)
//				),
			//)
		);

		$this->_page_config = array_merge( $this->_page_config, $new_page_config );

		//partial route/config override
		$this->_page_config['import_events']['metaboxes'] = $this->_default_espresso_metaboxes;
		$this->_page_config['add_event']['metaboxes'][] = '_premium_event_editor_meta_boxes';
		$this->_page_config['edit_event']['metaboxes'][] = '_premium_event_editor_meta_boxes';
		$this->_page_config['default_event_settings']['metaboxes'] = array_merge( $this->_default_espresso_metaboxes, array('_publish_post_box') );

		//add filters and actions
		//modifying _views
		add_filter('filter_hook_espresso_list_table_views_espresso_events', array( $this, 'list_table_views'), 10 );
		add_filter('filter_hook_espresso_event_legend_items', array( $this, 'event_legend_items'), 10 );
		add_filter('filter_hook_espresso_list_table_events_actions_column_action_links', array( $this, 'overview_table_action_links' ), 10, 2 );
		add_filter('filter_hook_espresso_event_datetime_metabox_add_additional_date_time_template', array( $this, 'add_additional_datetime_button' ), 10, 2 );
		add_filter('filter_hook_espresso_event_datetime_metabox_clone_button_template', array( $this, 'add_datetime_clone_button' ), 10, 2 );
		add_filter('filter_hook_espresso_event_datetime_metabox_timezones_template', array( $this, 'datetime_timezones_template'), 10, 2 );
		add_filter('filter_hook_espresso_additional_registration_options_event_edit_page', array( $this, 'additional_registration_options'), 10, 6);

		//event settings
		add_action('action_hook_espresso_event_settings_template_extra_content', array( $this, 'enable_attendee_pre_approval'), 10 );

	}





	public function load_scripts_styles_edit_event() {
		//styles
		wp_enqueue_style('jquery-ui-style');
		wp_enqueue_style('jquery-ui-style-datepicker-css');

		
		wp_enqueue_script('event_editor_js');
		global $eei18n_js_strings;
		$new_strings = array(
			'image_confirm' => __('Do you really want to delete this image? Please remember to update your event to complete the removal.', 'event_espresso'),
			'event_starts_on' => __('Event Starts on', 'event_espresso'),
			'event_ends_on' => __('Event Ends on', 'event_espresso'),
			'registration_starts_on' => __('Registration Starts on', 'event_espresso'),
			'registration_ends_on' => __('Registration Ends on', 'event_espresso'),
			'event_datetime_actions' => __('Actions', 'event_espresso'),
			'event_clone_dt_msg' => __('Clone this Event Date and Time', 'event_espresso'),
			'remove_event_dt_msg' => __('Remove this Event Time', 'event_espresso'),
			'clone_trooper_img_src' => EVENT_ESPRESSO_PLUGINFULLURL . 'images/clone-trooper-16x16.png',
			'clone_trooper_img_alt' => __('clone', 'event_espresso'),
			'trash_img_src' => EVENT_ESPRESSO_PLUGINFULLURL .'images/trash-16x16.png',
			'trash_img_alt' => __('trash', 'event_espresso')
			);

		$eei18n_js_strings = array_merge( $eei18n_js_strings, $new_strings);

		wp_register_script('event_datetime_js', EVENTS_CAF_ASSETS_URL . 'js/ee_events_datetime.js', array('event_editor_js'), EVENT_ESPRESSO_VERSION, TRUE );
		wp_localize_script( 'event_datetime_js', 'eei18n', $eei18n_js_strings );
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


	public function additional_registration_options( $html, $template_args, $yes_no_values, $additional_attendee_reg_info_values, $event_status_values, $default_reg_status_values ) {
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




	public function event_legend_items( $items ) {
		/*$items['event_reports'] =  array(
				'icon' => EVENT_ESPRESSO_PLUGINFULLURL .'images/chart_bar.png',
				'desc' => __('View Event Reports.', 'event_espresso')
				);*/
		return $items;
	}


	public function overview_table_action_links( $actions, $item ) {
		/*$reports_query_args = array(
				'action' => 'view_report',
				'event_id' => $item->event_id
			);
		$reports_link = EE_Admin_Page::add_query_args_and_nonce( $reports_query_args, EVENTS_ADMIN_URL );
		$actions[] = '<a href="' . $reports_link . '" title="' .  __('View Report', 'event_espresso') . '"><div class="reports_btn"></div></a>';*/
		return $actions;
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
		$this->_set_event_object();

	
		//todo taking this out because events are becoming cpts
		//add_meta_box('espresso_event_editor_event_post', __('Create a Post', 'event_espresso'), array( $this, 'event_post_metabox'), $this->_current_screen->id, 'advanced', 'core');

		add_meta_box('espresso_event_editor_event_options', __('Event Registration Options', 'event_espresso'), array( $this, 'registration_options_meta_box' ), $this->_current_screen->id, 'side', 'high');

		//todo feature in progress
		//add_meta_box('espresso_event_editor_promo_box', __('Event Promotions', 'event_espresso'), array( $this, 'promotions_meta_box' ), $this->_current_screen->id, 'side', 'core');

		//todo, this will morph into the "Person" metabox once events are converted to cpts and we have the persons cpt in place.
		if ($org_options['use_personnel_manager']) {
			add_meta_box('espresso_event_editor_personnel_box', __('Event Staff / Speakers', 'event_espresso'), array( $this, 'personnel_metabox' ), $this->_current_screen->id, 'side', 'default');
		}
	}





	/**
	 * event meta metabox
	 * @todo: eventually this will be replaced by the default custom field metabox provided to custom post types.	
	 * @return string  	metabox content
	 */
	public function event_meta_metabox() {
		global $wpdb, $org_options;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		$event_meta = $this->_event->event_meta;
		
		$good_meta = array();
		$hiddenmeta = array("", "venue_id", "additional_attendee_reg_info", /*"add_attendee_question_groups",*/ "date_submitted", "event_host_terms", "default_reg_status", "display_thumb_in_lists", "display_thumb_in_regpage", "display_thumb_in_calendar", "event_thumbnail_url", "originally_submitted_by", "enable_for_gmap", "orig_event_staff");
		$meta_counter = 1;

		$default_event_meta = array();
		$default_event_meta = apply_filters('filter_hook_espresso_filter_default_event_meta', $default_event_meta);

		$default_meta = $event_meta == '' ? $default_event_meta : array();
		$event_meta = $event_meta == '' ? array() : $event_meta;
		$event_meta = array_merge($event_meta, $default_meta);
		//print_r( $event_meta );
		$good_meta = $event_meta;
		//print_r( $good_meta );
		?>
		<p>
			<?php _e('Using Event Meta boxes', 'event_espresso'); ?>
			<?php echo $this->_get_help_tab_link('event-meta-boxes'); ?>
		<ul id="dynamicMetaInput">
			<?php
			if ($event_meta != '') {
				foreach ($event_meta as $k => $v) {
					?>
					<?php
					if (in_array($k, $hiddenmeta)) {
						//echo "<input type='hidden' name='emeta[]' value='{$v}' />";
						unset($good_meta[$k]);
					} else {
						?>
						<li>
							<label>
					<?php _e('Key', 'event_espresso'); ?>
							</label>
							<select id="emeta[]" name="emeta[]">
								<?php foreach ($good_meta as $k2 => $v2) { ?>
									<option value="<?php echo $k2; ?>" <?php echo ($k2 == $k ? "SELECTED" : null); ?>><?php echo $k2; ?></option>
					<?php } ?>
							</select>
							<label for="meta-value">
					<?php _e('Value', 'event_espresso'); ?>
							</label>
							<input  size="20" type="text" value="<?php echo $v; ?>" name="emetad[]" id="emetad[]" />
							<?php
							echo '<img class="remove-item" title="' . __('Remove this meta box', 'event_espresso') . '" onclick="this.parentNode.parentNode.removeChild(this.parentNode);" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/remove.gif" alt="' . __('Remove Meta', 'event_espresso') . '" />';
							?>
						</li>
						<?php
						$meta_counter++;
					}
					?>
			<li>
				<label for="emeta-box">
					<?php
				}
				echo  __('Key', 'event_espresso');
				?>
			</label>
			<input id="emeta-box" size="20" type="text" value="" name="emeta[]" >
			<label for="emetaad[]">
			<?php _e('Value', 'event_espresso'); ?>
			</label>
			<input size="20" type="text" value="" name="emetad[]" id="emetad[]">
			<?php
			echo '<img class="remove-item" title="' . __('Remove this meta box', 'event_espresso') . '" onclick="this.parentNode.parentNode.removeChild(this.parentNode);" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/remove.gif" alt="' . __('Remove Meta', 'event_espresso') . '" /></li>';
		} else {
			echo '<li><label for="emeta[]">' . __('Key', 'event_espresso');
			?>
			</label>
			<input size="20" type="text" value="" name="emeta[]" id="emeta[]">
			<?php _e('Value', 'event_espresso'); ?>
			<input size="20" type="text" value="" name="emetad[]" id="emetad[]">
			<?php
			echo '<img class="remove-item" title="' . __('Remove this meta box', 'event_espresso') . '" onclick="this.parentNode.parentNode.removeChild(this.parentNode);" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/remove.gif" alt="' . __('Remove Meta', 'event_espresso') . '" />' . '</li>';
			// $meta_counter++;
		}
		?>
		</ul>
		<p>
			<input type="button" class="button" value="<?php _e('Add A Meta Box', 'event_espresso'); ?>" onClick="addMetaInput('dynamicMetaInput');">
		</p>
		<script type="text/javascript">
			//Dynamic form fields
			var meta_counter = <?php echo $meta_counter > 1 ? $meta_counter - 1 : $meta_counter++; ?>;
			function addMetaInput(divName){
				var next_counter = counter_staticm(meta_counter);
				var newdiv = document.createElement('li');
				newdiv.innerHTML = "<label><?php _e('Key', 'event_espresso'); ?></label> <input size='20' type='text' value='' name='emeta[]' id='emeta[]'> <label><?php _e('Value', 'event_espresso'); ?></label> <input size='20' type='text' value='' name='emetad[]' id='emetad[]'><?php echo ' <img class=\"remove-item\" title=\"' . __('Remove this meta box', 'event_espresso') . '\" onclick=\"this.parentNode.parentNode.removeChild(this.parentNode);\" src=\"' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/remove.gif\" alt=\"' . __('Remove Meta', 'event_espresso') . '\" />'; ?>";
				document.getElementById(divName).appendChild(newdiv);
				counter++;
			}

			function counter_staticm(meta_counter) {
				if ( typeof counter_static.counter == 'undefined' ) {

					counter_static.counter = meta_counter;
				}
				return ++counter_static.counter;
			}
		</script>
	<?php
	}






	/**
	 * @todo: This is going to be replaced when Events are CPT's
	 * @return [type] [description]
	 */
	public function event_post_metabox() {
		$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso')));
		if (function_exists('espresso_member_data')) {
			global $espresso_manager;
			$is_admin = (espresso_member_data('role') == "administrator" || espresso_member_data('role') == 'espresso_event_admin') ? true : false;
			if (!$espresso_manager['event_manager_create_post'] && !$is_admin) {
				return;
			}
		}
		?>
		<div class="inside">
			<?php
			if (strlen($this->_event->post_id) > 1) {
				$create_post = true; //If a post was created previously, default to yes on the update post.
			} else {
				$create_post = false; //If a post was NOT created previously, default to no so we do not create a post on accident.
			}
			global $current_user;
			get_currentuserinfo();
			?>
			<table class="form-table">
				<tbody>
					<tr>
						<th class="middle">
							<label>
								<?php echo __('Add/Update post for this event?', 'event_espresso') ?>
							</label>
						</th>
						<td class="med">
							<?php
							echo EE_Form_Fields::select_input('create_post', $values, $create_post);
							if (strlen($this->_event->post_id) > 1) {
								echo '<p>' . __('If no, delete current post?', 'event_espresso');
								?>
								<input name="delete_post" type="checkbox" value="true" />
							<?php } ?>
							</p>
							<input type="hidden" name="post_id" value="<?php if (isset($this->_event->post_id)) echo $this->_event->post_id; ?>">
							<?php /* ?><p><?php _e('Category:', 'event_espresso'); ?> <?php wp_dropdown_categories(array('orderby'=> 'name','order' => 'ASC', 'selected' => $category, 'hide_empty' => 0 )); ?></p><?php */ ?>
						<td>
					</tr>
					<tr>
						<th class="middle">

							<?php
							if (!empty($this->_event->post_id)) {
								$post_data = get_post($this->_event->post_id);
								$tags = get_the_tags($this->_event->post_id);
								if ($tags) {
									foreach ($tags as $k => $v) {
										$tag[$k] = $v->name;
									}
									$tags = join(', ', $tag);
								}
							} else {
								$post_data = new stdClass();
								$post_data->ID = 0;
								$tags = '';
							}
							$box = array();

							$custom_post_array = array(array('id' => 'espresso_event', 'text' => __('Espresso Event', 'event_espresso')));
							$post_page_array = array(array('id' => 'post', 'text' => __('Post', 'event_espresso')), array('id' => 'page', 'text' => __('Page', 'event_espresso')));
							$post_page_array = !empty($org_options['template_settings']['use_custom_post_types']) ? array_merge($custom_post_array, $post_page_array) : $post_page_array;
							//print_r($post_page_array);

							$post_types = $post_page_array;
							?>

							<label>
								<?php _e('Author', 'event_espresso: '); ?>
							</label>
						</th>
						<td class="med">
							<?php wp_dropdown_users(array('who' => 'authors', 'selected' => $current_user->ID)); ?>
						</td>
					</tr>
					<tr>
						<th class="middle">
							<label>
								<?php _e('Post Type', 'event_espresso: '); ?>
							</label>
						</th>
						<td class="med">
							<?php echo EE_Form_Fields::select_input('post_type', $post_types, 'espresso_event') ?>
						</td>
					</tr>
					<tr>
						<th class="middle">
							<label>
								<?php _e('Tags', 'event_espresso: '); ?>
							</label>
						</th>
						<td class="med">
							<input id="post_tags" name="post_tags" size="20" type="text" value="<?php echo $tags; ?>" />
						</td>
					</tr>
				</tbody>
			</table>



			<p class="section-heading"><?php _e('Post Categories:', 'event_espresso'); ?> </p>
			<?php
			require_once( 'includes/meta-boxes.php');
			post_categories_meta_box($post_data, $box);
			?>

			<!-- if post templates installed, post template -->

		</div>
		<?php
	}





	/**
	 * _view_report
	 * Shows the report page for events
	 * @return string html for the report page
	 */
	protected function _view_report() {
		$this->_admin_page_title .= $this->_get_action_link_or_button('add_event', 'add', array(), 'button add-new-h2');
		$this->_template_args['admin_page_content'] = 'in here';
		$this->display_admin_page_with_sidebar();
	}



} //end class Events_Admin_Page