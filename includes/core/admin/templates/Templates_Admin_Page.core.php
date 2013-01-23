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
 * Templates_Admin_Page
 *
 * This contains the logic for setting up the Template Settings related admin pages.  Any methods without phpdoc comments have inline docs with parent class. 
 *
 * NOTE:  TODO: This is a straight conversion from the legacy 3.1 Template Settings related pages.
 *
 * @package		Templates_Admin_Page
 * @subpackage	includes/core/admin/Templates_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Templates_Admin_Page extends EE_Admin_Page {




	public function __construct() {
		parent::__construct();
	}




	protected function _init_page_props() {
		$this->page_slug = 'template_confg';
		$this->page_label = __('Template Settings', 'event_espresso');
	}




	protected function _ajax_hooks() {
		//todo: all hooks for event_categories ajax goes in here.
	}






	protected function _define_page_props() {
		$this->_admin_base_url = EE_TEMPLATES_ADMIN_URL;
		$this->_admin_page_title = $this->page_label
		$this->_labels = array();
	}




	protected function _set_page_routes() {
		$this->_page_routes = array(
			'default' => '_template_settings',
			'save_template_settings' => array(
				'func' => '_save_template_settings',
				'noheader' => TRUE
				),
			'maps' => '_map_settings',
			'save_map_settings' => array(
				'func' => '_save_map_settings',
				'noheader' => TRUE
				)
			);
	}




	protected function _set_page_config() {
		$this->_page_config = array(
			'default' => array(
				'nav' => array(
					'label' => __('Templates', 'event_espresso'),
					'order' => 10
					),
				'metaboxes' => array('_espresso_news_post_box', '_custom_templates_info')
				),
			'maps' => array(
				'nav' => array(
					'label' => __('Maps', 'event_espresso'),
					'order' => 20
					),
				'metaboxes' => array('_espresso_news_post_box')
				)
			);
	}




	protected function _add_screen_options() {}
	protected function _add_help_tabs() {}
	protected function _add_feature_pointers() {}
	public function load_scripts_styles() {}
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}
	protected function _set_list_table_views_default() {}




	protected function _template_settings() {
		//require necessary Form_Fields helper
		require_once EVENT_ESPRESSO_PLUGINFULLPATH . '/helpers/EE_Form_Fields.helper.php';

		$this->_set_add_edit_form_tags( '_save_template_settings' );
		$this->_template_args['admin_page_content'] = $this->_template_settings_output();
		$this->display_admin_page_with_sidebar();
	}


	/**
	 * todo: this eventually needs to be moved to a template file but for now its here.
	 * @return [type] [description]
	 */
	protected function _template_settings_output() {
		$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso'))
		);
		//Stylesheet functions
		// read our style dir and build an array of files
		// themeroller style directory
		if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "/themeroller/index.php")) {
			$dhandle = opendir(EVENT_ESPRESSO_UPLOAD_DIR . '/themeroller/');
		} else {
			$dhandle = opendir(EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/css/themeroller/');
		}

		$files_themeroller = array();

		$exclude = array('.', '..', 'index.htm', 'index.html', 'index.php', '.svn', 'themeroller-.css', '.DS_Store', basename($_SERVER['PHP_SELF']));

		if ($dhandle) { //if we managed to open the directory
			// loop through all of the files
			while (false !== ($fname_themeroller = readdir($dhandle))) {

				if (!in_array($fname_themeroller, $exclude) && !is_dir($fname_themeroller)) {
					// store the filename
					$files_themeroller[] = $fname_themeroller;
				}
			}
			// close the directory
			closedir($dhandle);
		}
		global $org_options;
		ob_start();
		include_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/templates/templates_help.php');
		?>
		<div class="padding">
			<table class="form-table">
				<tbody>
					<tr>
						<td colspan="2"><strong>
								<?php _e('Event Listings', 'event_espresso'); ?>
							</strong></td>
					<tr>
					<tr>
						<th> <label for="display_description_in_event_list">
								<?php _e('Display Descriptions', 'event_espresso'); ?>
							</label>
						</th>
						<td><?php echo EE_Form_Fields::select_input('display_description_in_event_list', $values, $org_options['template_settings']['display_description_in_event_list'], 'id="display_description_in_event_list"'); ?></td>
					</tr>
					<tr>
						<th> <label for="display_short_description_in_event_list">
								<?php _e('Use SHORT Descriptions', 'event_espresso'); ?>
							</label>
						</th>
						<td><?php echo EE_Form_Fields::select_input('display_short_description_in_event_list', $values, $org_options['template_settings']['display_short_description_in_event_list'], 'id="display_short_description_in_event_list"'); ?> <br />
							<span class="description">
								<?php _e('Be sure to use the more... tag in your event description', 'event_espresso'); ?>
							</span></td>
					</tr>
					<tr>
						<th> <label for="display_address_in_event_list">
								<?php _e('Display Addresses', 'event_espresso'); ?>
							</label>
						</th>
						<td><?php echo EE_Form_Fields::select_input('display_address_in_event_list', $values, $org_options['template_settings']['display_address_in_event_list'], 'id="display_address_in_event_list"'); ?></td>
					</tr>

					<tr>
						<td colspan="2"><strong>
								<?php _e('Registration Pages', 'event_espresso'); ?>
							</strong></td>
					</tr>
					<tr>
						<th> <label for="display_address_in_regform">
								<?php _e('Display Addresses', 'event_espresso'); ?>
							</label>
						</th>
						<td><?php echo EE_Form_Fields::select_input('display_address_in_regform', $values, $org_options['template_settings']['display_address_in_regform'], 'id="display_address_in_regform"'); ?><br />
							<span class="description">
								<?php _e('Do not use this if you are using the venue<br />
	shortcodes in your event description.', 'event_espresso'); ?>
							</span></td>
					</tr>
					<tr>
						<td colspan="2"><strong>
								<?php _e('Stylesheets', 'event_espresso'); ?>
							</strong></td>
					</tr>
					<tr>
						<th> <label>
								<?php _e('Use Built-in Style Sheets', 'event_espresso'); ?>
								<?php echo apply_filters('filter_hook_espresso_help', 'enable_styles_info'); ?>
							</label>
						</th>
						<td><?php echo EE_Form_Fields::select_input('enable_default_style', $values, $org_options['style_settings']['enable_default_style'], 'id="use_built_in_style_sheets"'); ?><br />
							<span class="description">
								<?php _e('This option enables the style settings below.', 'event_espresso'); ?>
							</span></td>
					</tr>
					<tr>
						<th> <label>
								<?php _e('Use Grid Layout', 'event_espresso'); ?>
								<?php echo apply_filters('filter_hook_espresso_help', 'use_grid_info'); ?>
							</label>
						</th>
						<td><?php echo EE_Form_Fields::select_input('use_grid_layout', $values, $org_options['style_settings']['use_grid_layout'], 'id="use_grid_layout"'); ?><br />
							<span class="description">
								<?php _e('Displays event list in a grid layout.', 'event_espresso'); ?>
							</span>
						</td>
					</tr>

					<tr>
						<th> <?php _e('ThemeRoller Style ', 'event_espresso'); ?>
							<?php echo apply_filters('filter_hook_espresso_help', 'themeroller_info'); ?>
						</th>
						<td><select id="style-themeroller" class="chzn-select wide" name="themeroller_style">
								<option <?php EE_Form_Fields::style_is_selected($fname_themeroller) ?> value=""> - <?php _e('Default', 'event_espresso'); ?>
								</option>
								<?php foreach ($files_themeroller as $fname_themeroller) { ?>
									<option <?php EE_Form_Fields::style_is_selected($fname_themeroller) ?> value="<?php echo $fname_themeroller ?>"><?php echo $fname_themeroller; ?></option>
								<?php } ?>
							</select><br />
							<span class="description">
								<?php _e('Default style sheet is Smoothness.', 'event_espresso'); ?>
							</span></td>
					</tr>
					<?php if (!empty($org_options['style_settings']['css_name'])) { ?>
						<tr>
							<th> <label>
									<?php _e('Current Custom Style Sheet', 'event_espresso'); ?>
								</label>
							</th>
							<td><a href="<?php echo EVENT_ESPRESSO_UPLOAD_URL . 'css/' . $org_options['style_settings']['css_name']; ?>" target="_blank"><?php echo $org_options['style_settings']['css_name']; ?></a>
								<input style="width:20px; margin-left:20px" name="remove_css" type="checkbox" value="true" />
								<?php _e('Remove style sheet?', 'event_espresso'); ?></td>
						</tr>
					<?php } ?>
					<tr>
						<th> <label>
								<?php _e('Add a custom style sheet?', 'event_espresso'); ?>
							</label>
						</th>
						<td><input type="file" name="css" id="css" /></td>
					</tr>
					<?php echo apply_filters('filter_hook_espresso_template_config_template_settings_form_table', ''); ?>
				</tbody>
			</table>

			<p class="submit-buttons">
				<input class="button-primary" type="submit" name="Submit" value="<?php _e('Save Options', 'event_espresso'); ?>" id="save_organization_setting_1" />
			</p>
		</div>
		<?php
		$contents = ob_get_contents();
		ob_end_clean();
		return $contents;
	}






	protected function _save_template_settings() {
		global $wpdb, $org_options, $notices, $espresso_wp_user;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		//print_r($org_options);
		if (isset($this->_req_data['update_org']) ) {

			$org_options['template_settings']['display_description_in_event_list'] = $this->_req_data['display_description_in_event_list'];
			$org_options['template_settings']['display_short_description_in_event_list'] = $this->_req_data['display_short_description_in_event_list'];
			$org_options['template_settings']['display_address_in_event_list'] = $this->_req_data['display_address_in_event_list'];
			$org_options['template_settings']['display_address_in_regform'] = $this->_req_data['display_address_in_regform'];
			$org_options['style_settings']['enable_default_style'] = $this->_req_data['enable_default_style'];
			$org_options['style_settings']['use_grid_layout'] = $this->_req_data['use_grid_layout'];
			$org_options['themeroller']['themeroller_style'] = empty($this->_req_data['themeroller_style']) ? '' : $this->_req_data['themeroller_style'];

			if (isset($this->_req_data['remove_css']) && $this->_req_data['remove_css'] == 'true') {
				$org_options['style_settings']['css_name'] = '';
			}

			if (isset($_FILES['css']) && is_uploaded_file($_FILES['css']['tmp_name'])) {
				if (copy($_FILES['css']['tmp_name'], EVENT_ESPRESSO_UPLOAD_DIR . 'css/' . $_FILES['css']['name'])) {
					$org_options['style_settings']['css_name'] = $_FILES['css']['name'];
				}
			}
			$org_options['template_settings']['use_custom_templates'] = $this->_req_data['use_custom_templates'];
			$org_options = apply_filters('filter_hook_espresso_template_confg_save', $org_options);
			update_user_meta($espresso_wp_user, 'events_organization_settings', $org_options);


			$msg = __('Template Settings Updated', 'event_espresso');
			EE_Error::add_success($msg);
		} else {
			$msg = __('Template Settings not Updated', 'event_espresso');
			EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
		}

		$query_args = array(
			'action' => '_template_settings'
			);
		$this->_redirect_after_action(0,'','',$query_args);
	}





	protected function _custom_templates_info() {
		//content for metabox
		function info_text() {
			$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso'))
			);
			global $org_options;
			?>
			<div class="padding">
				<?php
				if (isset($_REQUEST['event_espresso_admin_action']) && $_REQUEST['event_espresso_admin_action'] == 'copy_templates') {
					add_action('admin_init', 'event_espresso_smartCopy');
				}

				if (!empty($_SESSION['event_espresso_themes_copied'])) {
					$org_options['template_settings']['use_custom_templates'] = true;
					update_user_meta($espresso_wp_user, 'events_organization_settings', $org_options);
					?>

					<div class="updated fade below-h2" id="message" style="background-color: rgb(255, 251, 204); border:#999 solid 1px; padding:2px;">
						<p>
							<?php _e("Your templates have been copied."); ?>
						</p>
					</div>
					<?php
					$_SESSION['event_espresso_themes_copied'] = false;
				}

				$files = array('attendee_list.php', 'event_list.php', 'event_list_display.php', 'event_post.php', 'payment_page.php', 'registration_page.php', 'registration_page_display.php', 'confirmation_display.php', 'return_payment.php', 'widget.php');
		//echo EVENT_ESPRESSO_TEMPLATE_DIR . $files[3];
				if (file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $files[0])
								|| file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $files[1])
								|| file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $files[2])
								|| file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $files[3])
								|| file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $files[4])
								|| file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $files[5])
								|| file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $files[6])
								|| file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $files[7])
								|| file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $files[8])
								|| file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $files[9])) {
					?>
					<fieldset class="template-settings a">
						<legend>
							<?php _e('Custom Templates', 'event_espresso'); ?>
						</legend>
						<p> <strong>
								<?php _e('IMPORTANT:', 'event_espresso'); ?>
							</strong>
							<?php _e('Are you sure you want to enable this feature?', 'event_espresso'); ?>
							<?php echo select_input('use_custom_templates', $values, $org_options['template_settings']['use_custom_templates']); ?>
							<?php apply_filters('filter_hook_espresso_help', 'custom_templates_info'); ?>
						</p>
					</fieldset>
					<?php
					if (!$org_options['template_settings']['use_custom_templates']) {
						echo '<p>' . __('It appears that you have moved your files to the "wp-content/uploads/espresso/templates/ directory". However, these files may be outdated and are not being used at this time. If you wish to use these files, please make sure you have updated them files to match the files located in the "' . EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/' . ' directory." ', 'event_espresso') . '</p>';
					} else {
						?>
						<hr />
						<p> <strong>
								<?php _e('Instructions:', 'event_espresso'); ?>
							</strong><br />
							<?php _e("To modify your event listings and registration pages. You need to edit the appropriate files in the following location.", 'event_espresso'); ?>
						</p>
						<p> <span class="green_alert">
								<?php _e("Path:", 'event_espresso'); ?>
								wp-content/uploads/espresso/templates/</span> </p>
						<div style="border: 1px solid #999; background:#F0F0F0; padding:5px; width:90%;">
							<p><strong>
									<?php _e('Current Template Files:', 'event_espresso'); ?>
								</strong> </p>
							<ul>
								<?php
								foreach ($files as $file) {
									switch ($file) {
										case 'attendee_list.php':
											$info = __('(displays a list of attendees)', 'event_espresso');
											break;
										case 'event_list.php':
											$info = __('(logic for displaying the list of events)', 'event_espresso');
											break;
										case 'event_list_display.php':
											$info = __('(displays a list of events)', 'event_espresso');
											break;
										case 'event_post.php':
											$info = __('(create-a-post template)', 'event_espresso');
											break;
										case 'payment_page.php':
											$info = __('(displays your payment page text)', 'event_espresso');
											break;
										case 'registration_page.php':
											$info = __('(logic for displaying the registration form)', 'event_espresso');
											break;
										case 'registration_page_display.php':
											$info = __('(displays your registration form)', 'event_espresso');
											break;
										case 'confirmation_display.php':
											$info = __('(displays a confimration page for free events)', 'event_espresso');
											break;
										case 'return_payment.php':
											$info = __('(page that is displayed when returning to pay)', 'event_espresso');
											break;
										case 'widget.php':
											$info = __('(creates a widget for use in your theme)', 'event_espresso');
											break;
										default:
											$info = '';
											break;
									}
									if (file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . $file)) {
										?>
										<li><strong style="color:#090">
												<?php _e($file . ' - Moved', 'event_espresso'); ?>
											</strong> - <?php echo $info; ?></li>
									<?php } else { ?>
										<li><strong style="color:#F00">
												<?php _e($file . ' - Not Moved', 'event_espresso'); ?>
											</strong> - <?php echo $info; ?></li>
										<?php
									}
								}
								?>
							</ul>
							<p class="red_alert">
								<?php _e('Remember, if updates are made or features are added to these templates in the future. You will need to make the updates to your customized templates.', 'event_espresso'); ?>
							</p>
						</div>
						<?php
					}
				} else if (!is_writable(EVENT_ESPRESSO_TEMPLATE_DIR)) {
					?>
					<p>
						<?php _e('In order to use this this feature, you will need to move the files located in the', 'event_espresso'); ?>
						<span class="display-path"><strong><?php echo EVENT_ESPRESSO_PLUGINFULLPATH ?>templates/</strong></span>
						<?php _e('directory into the', 'event_espresso'); ?>
						<span class="display-path"><strong><?php echo EVENT_ESPRESSO_TEMPLATE_DIR ?></strong></span>
						<?php _e('directory', 'event_espresso'); ?>
						. </p>
					<p class="fugue f-error">
						<?php _e("The permissions on your templates directory are incorrect.", 'event_espresso'); ?>
					</p>
					<p class="fugue f-error">
						<?php _e("To move your files automatically, please set the permissions to 775 on the following directory.", 'event_espresso'); ?>
						<br />
						<br />
						<span class='display-path'><strong>
								<?php _e("Path:", 'event_espresso'); ?>
							</strong> wp-content/uploads/espresso/templates/ </span></p>
					<?php
				} else {
					?>
					<p>
						<?php echo sprintf(__('If you plan on modifying the look of your event listings, registration page, or attendee list. You can move the templates located in the templates directory to your "wp-content/uploads/espresso/templates/" directory (%smore information here%s). Please keep in mind, if updates are made or features are added to these templates in the future. You will need to make the updates to your customized templates.', 'event_espresso'), '<a href="http://eventespresso.com/forums/?p=2906" target="_blank">', '</a>'); ?>
					</p>
					<?php
				}
				?>
			</div> <!-- end div class=padding -->
			<?php
		}

		add_meta_box( 'espresso_custom_templates', __('Customization Instructions', 'event_espresso'), 'info_text', $this->_current_screen->id, 'side' );
	}





	protected function _map_settings() {

	}





	protected function _save_map_settings() {}

} //end Templates_Admin_Page class