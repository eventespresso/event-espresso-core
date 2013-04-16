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
 * Venues_Admin_Page
 *
 * This contains the logic for setting up the Event Venue related admin pages.  Any methods without phpdoc comments have inline docs with parent class. 
 *
 * NOTE:  TODO: This is a straight conversion from the legacy 3.1 event venue related pages.  It is NOT optimized and will need modification to fully use the new system (and also will need adjusted when Event Venues model is setup)
 *
 * @package		Venues_Admin_Page
 * @subpackage	includes/core/admin/Venues_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Venues_Admin_Page extends EE_Admin_Page {


	/**
	 * _venue
	 * This will hold the venue object for venue_details screen.
	 *
	 * @access protected
	 * @var object
	 */
	protected $_venue;





	public function __construct( $routing = TRUE ) {
		parent::__construct( $routing );
	}




	protected function _init_page_props() {
		$this->page_slug = EE_VENUES_PG_SLUG;
		$this->page_label = __('Event Venues', 'event_espresso');
	}




	protected function _ajax_hooks() {
		//todo: all hooks for ee_venues ajax goes in here.
	}






	protected function _define_page_props() {
		$this->_admin_base_url = EE_VENUES_ADMIN_URL;
		$this->_admin_page_title = $this->page_label;
		$this->_labels = array(
			'buttons' => array(
				'add' => __('Add New Venue', 'event_espresso'),
				'edit' => __('Edit Venue', 'event_espresso'),
				'delete' => __('Delete Venue', 'event_espresso')
			)
		);
	}





	protected function _set_page_routes() {
		$this->_page_routes = array(
			'default' => '_overview_list_table',
			'edit_venue' => array(
				'func' => '_venue_details',
				'args' => array('edit')
				),
			'add_venue' => array(
				'func' => '_venue_details',
				'args' => array('add')
				),
			'delete_venues' => array(
				'func' => '_delete_venues', 
				'noheader' => TRUE 
				),
			'delete_venue' => array(
				'func' => '_delete_venues', 
				'noheader' => TRUE
				),
			'insert_venue' => array(
				'func' => '_insert_or_update_venue',
				'args' => array('new_venue' => TRUE),
				'noheader' => TRUE
				),
			'update_venue' => array(
				'func' => '_insert_or_update_venue',
				'args' => array('new_venue' => FALSE),
				'noheader' => TRUE
				)
		);
	}




	protected function _set_page_config() {
		$this->_page_config = array(
			'default' => array(
				'nav' => array(
					'label' => __('Overview', 'event_espresso'),
					'order' => 10
				),
				'list_table' => 'Venues_Admin_List_Table',
				'metaboxes' => array('_espresso_news_post_box', '_espresso_links_post_box'),
			),
			'add_venue' => array(
				'nav' => array(
					'label' => __('Add Venue', 'event_espresso'),
					'order' => 5,
					'persistent' => FALSE
				),
				'metaboxes' => array('_publish_post_box')
			),
			'edit_venue' => array(
				'nav' => array(
					'label' => __('Edit Venue', 'event_espresso'),
					'order' => 5,
					'persistent' => FALSE,
					'url' => isset($this->_req_data['id']) ? add_query_arg(array('id' => $this->_req_data['id'] ), $this->_current_page_view_url )  : $this->_admin_base_url
				),
				'metaboxes' => array('_publish_post_box')
			)
		);
	}





	protected function _add_screen_options() {
		//todo
	}





	protected function _add_screen_options_default() {
		$this->_per_page_screen_option();
	}






	//none of the below group are currently used for Event Venues
	protected function _add_help_tabs() {}
	protected function _add_feature_pointers() {}
	public function load_scripts_styles() {}
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}






	public function load_scripts_styles_add_venue() {
		$this->load_scripts_styles_edit_venue();
	}





	public function load_scripts_styles_edit_venue() {
		//styles
		wp_enqueue_style('jquery-ui-style');
		wp_register_style( 'espresso_venues', EE_VENUES_ASSETS_URL . 'ee-venues-admin.css', array(), EVENT_ESPRESSO_VERSION );
		wp_enqueue_style('espresso_venues');

		//scripts
		wp_register_script('espresso_venue_admin', EE_VENUES_ASSETS_URL . 'ee-venues-admin.js', array('jquery-validate'), EVENT_ESPRESSO_VERSION, TRUE );
		wp_enqueue_script('espresso_venue_admin');

		global $eei18n_js_strings;
		$eei18n_js_strings['required'] = __( 'This is a required filed. Please add a value in order to continue.', 'event_espresso' );
		wp_localize_script( 'espresso_venue_admin', 'eei18n', $eei18n_js_strings );

	}






	protected function _set_list_table_views_default() {
		$this->_views = array(
			'all' => array(
				'slug' => 'all',
				'label' => __('All', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'delete_venues' => __('Delete Permanently', 'event_espresso')
					)
				)
		);
	}



	protected function _overview_list_table() {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		$this->_admin_page_title .= $this->_get_action_link_or_button('add_venue', 'add', array(), 'button add-new-h2');
		$this->display_admin_list_table_page_with_sidebar();
	}




	protected function _venue_details($view) {
		//load formatter helper
		require_once EVENT_ESPRESSO_PLUGINFULLPATH . '/helpers/EE_Formatter.helper.php';
		//load field generator helper
		require_once EVENT_ESPRESSO_PLUGINFULLPATH . '/helpers/EE_Form_Fields.helper.php';

		$route = $view == 'edit' ? 'update_venue' : 'insert_venue';
		$this->_set_add_edit_form_tags($route);

		if ( $view == 'edit' ) $this->_set_venue_object();
		$id = isset($this->_venue->id) ? $this->_venue->id : '';

		$this->_set_publish_post_box_vars( 'venue_id', $id, 'delete_venue' );


		//take care of contents
		$this->_template_args['admin_page_content'] = $view == 'edit' ? $this->_edit_venue_content() : $this->_add_venue_content();
		$this->display_admin_page_with_sidebar();
	}





	protected function _add_venue_content() {
		global $wpdb, $current_user;
		$values = array(
				array('id' => true, 'text' => __('Yes', 'event_espresso')),
				array('id' => false, 'text' => __('No', 'event_espresso'))
		);
		ob_start();
?>
	<table width="100%" border="0">
		<tr>
			<td align="left" valign="top" class="a">

				<h4 class="ee-admin-settings-hdr">
					<?php _e('Venue', 'event_espresso'); ?>
				</h4>			
	
				<table class="form-table">
					<tbody>
						<tr>
							<th>
								<label for="name">
									<?php _e('Name','event_espresso'); ?> 
									<em title="<?php _e('This field is required', 'event_espresso') ?>">*</em>
								</label>
							</th>
							<td>
								<input class="required venue-man-name regular-text" type="text" id="name" name="name" />
							</td>
						</tr>
	 					<tr>
	 						<th>
		 						<label for="vnu_capacity">
	 								<?php _e('Capacity', 'event_espresso'); ?> 
									<em title="<?php _e('This field is required', 'event_espresso') ?>">*</em>
	 							</label>
	 						</th>
	 						<td>
		 						<input class="required small-text" type="text" id="vnu_capacity" name="vnu_capacity" value="">
								<p class="description"><?php _e('leave blank for no limit', 'event_espresso') ?></p>
	 						</td>
	 					</tr>
						<tr>
							<th>
								<label for="website">
									<?php _e('Website','event_espresso'); ?>
								</label>
							</th>
							<td>
								<input class="regular-text" type="text" id="website" name="website" />
							</td>
						</tr>
						<tr>
							<th>
								<label for="image">
									<?php _e('Image/Logo URL','event_espresso'); ?>
								</label>
							</th>
							<td>
								<input class="regular-text" type="text" id="image" name="image">
							</td>
						</tr>
					</tbody>
				</table>
			
				<h4 class="ee-admin-settings-hdr">
					<?php _e('Location', 'event_espresso'); ?>
				</h4>

				<table class="form-table">
					<tbody>
						<tr>
							<th>
								<label for="address">
									<?php _e('Address','event_espresso'); ?>
								</label>
							</th>
							<td>
								<input class="regular-text" type="text" id="address" name="address" />
							</td>
						</tr>
						<tr>
							<th>
								<label for="address2">
									<?php _e('Address 2','event_espresso'); ?>
								</label>
							</th>
							<td>
								<input class="regular-text" type="text" id="address2" name="address2" />
							</td>
						</tr>
						<tr>
							<th>
								<label for="city">
									<?php _e('City','event_espresso'); ?>
								</label>
							</th>
							<td>
								<input class="regular-text" type="text" id="city" name="city" />
							</td>
						</tr>
						<tr>
							<th>
								<label for="state">
									<?php _e('State','event_espresso'); ?>
								</label>
							</th>
							<td>
								<input class="regular-text" type="text" id="state" name="state" />
							</td>
						</tr>
						<tr>
							<th>
								<label for="zip">
									<?php _e('Zip','event_espresso'); ?>
								</label>
							</th>
							<td>
								<input class="regular-text" type="text" id="zip" name="zip" />
							</td>
						</tr>
						<tr>
							<th>
								<label for="country">
									<?php _e('Country','event_espresso');  ?>
								</label>
							</th>
							<td>
								<input class="regular-text" type="text" id="country" name="country" />
							</td>
						</tr>
						<?php
						if ( defined('ESPRESSO_MANAGER_PRO_VERSION') ) {
							?>
							<tr>
								<th>
									<label for="locale">
										<?php _e('Locale/Region ','event_espresso'); ?>
										<?php apply_filters( 'filter_hook_espresso_help', 'venue_locale'); ?>
									</label>
								</th>
								<td>
									<?php echo espresso_locale_select($cur_locale_id); ?>
								</td>
							</tr>
							<?php
						}// end if function_exists('espresso_member_data'
						?>				
					</tbody>
				</table>

			</td>
			<td align="left" valign="top" class="b">

				<h4 class="ee-admin-settings-hdr">
					<?php _e('Contact Information', 'event_espresso'); ?>
				</h4>

				<table class="form-table">
					<tbody>						
						<tr>
							<th>
								<label for="contact">
									<?php _e('Contact Person','event_espresso'); ?>
								</label>
							</th>
							<td>
								<input class="regular-text" type="text" id="contact" name="contact" />
							</td>
						</tr>
						<tr>
							<th>
								<label for="phone">
									<?php _e('Phone','event_espresso'); ?>
								</label>
							</th>
							<td>
								<input class="regular-text" type="text" id="phone" name="phone" />
							</td>
						</tr>
						<tr>
							<th>
								<label for="twitter">
									<?php _e('Twitter','event_espresso'); ?>
								</label>
							</th>
							<td>
								<input class="regular-text" type="text" id="twitter" name="twitter" />
							</td>
						</tr>
					</tbody>
				</table>
				
				<h4 class="ee-admin-settings-hdr">
					<?php _e('Google Map', 'event_espresso'); ?>
				</h4>

				<table class="form-table">
					<tbody>		
						<tr>
							<th>
								<label for="enable-ven-gmaps">
									<?php _e('Enable Venue for Google Maps', 'event_espresso')  ?>
									<?php apply_filters( 'filter_hook_espresso_help', 'venue_gmap'); ?>
								</label>
							</th>
							<td>
								<?php echo EE_Form_Fields::select_input('enable_for_maps', $values, isset($meta['enable_for_maps']) ? $meta['enable_for_maps'] : '' . 'id="enable-ven-gmaps"'); ?>
							</td>
						</tr>
						<tr>
							<th>
								<label for="gmap-static">
									<?php _e('Static Map URL', 'event_espresso'); ?>
								</label>
							</th>
							<td>
								<input class="regular-text" type="text" id="gmap-static" name="gmap_static" <?php echo (!empty($meta['gmap_static']) ) ? 'value="' . $meta['gmap_static'] .'"' : 'value=""'; ?> />
								<br />
								<p class="description">
									<?php _e('Will be used in place of the venue address.', 'event_espresso'); ?>
								</p>
							</td>
						</tr>

					</tbody>
				</table>
			</td>
		</tr>
	</table>
	<br/>
	<div id="descriptiondivrich" class="postarea">
		<label for="description" class="section-heading">
			<?php _e('Description','event_espresso'); ?>
		</label>
		<div class="postbox">
			<?php
			$args = array("textarea_rows"=> 5,"textarea_name"=> "venue_desc","editor_class" => "my_editor_custom");
			wp_editor('', "venue_desc", $args);
			?>
			<table id="venue-descr-add-form"  cellspacing="0">
				<tbody>
					<tr>
						<td class="aer-word-count">
						</td>
						<td class="autosave-info">
							<span>
								<p>
								</p>
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
			<!-- /#descriptiondivrich -->
		<?php
		$content = ob_get_contents();
		ob_end_clean();
		return $content;
	}





	protected function _edit_venue_content() {
		global $wpdb;

		require_once( EVENT_ESPRESSO_PLUGINFULLPATH . 'helpers/gmap_display.helper.php');

		$this->_set_venue_object();
		$venue_id = $this->_venue->id;
		$name = stripslashes_deep($this->_venue->name);
		$address = stripslashes_deep($this->_venue->address);
		$address2 = stripslashes_deep($this->_venue->address2);
		$city = stripslashes_deep($this->_venue->city);
		$state = stripslashes_deep($this->_venue->state);
		$zip = stripslashes_deep($this->_venue->zip);
		$country = stripslashes_deep($this->_venue->country);
		$vnu_capacity = !empty( $this->_venue->vnu_capacity ) ? absint($this->_venue->vnu_capacity) : '';
		$meta = unserialize($this->_venue->meta);

		$cur_locale_id = $wpdb->get_var("SELECT locale_id FROM " . EVENTS_LOCALE_REL_TABLE . " WHERE venue_id='" . $venue_id . "'");

		$values = array(
				array('id' => true, 'text' => __('Yes', 'event_espresso')),
				array('id' => false, 'text' => __('No', 'event_espresso'))
		);

		// build some data to feed to the map display
		$venue_address_elements = ($address != '' ? $address . ',' : '') . ($address2 != '' ? $address2 . ',' : '') . ($city != '' ? $city . ',' : '') . ($state != '' ? $state . ',' : '') . ($zip != '' ? $zip . ',' : '') . ($country != '' ? $country : '');
		$ee_gmap_location = $venue_address_elements;

		// Create dummy ee_gmaps_opts to control map display
		global $ee_gmaps_opts;
		$ee_gmaps_opts['ee_map_width'] = '300';
		$ee_gmaps_opts['ee_map_height'] = '300';
		$ee_gmaps_opts['ee_map_zoom'] = '15';
		$ee_gmaps_opts['ee_map_align'] = 'center';

		ob_start();
?>
	 <!--Add event display-->
	 <table width="100%" border="0">
	 	<tr>
	 		<td align="left" valign="top" class="a">

				<h4 class="ee-admin-settings-hdr">
					<?php _e('Venue', 'event_espresso'); ?>
				</h4>

		 		<table class="form-table">
	 				<tbody>
	 					<tr>
	 						<th>
		 						<label for="name">
	 								<?php _e('Name', 'event_espresso'); ?> *
	 							</label>
	 						</th>
	 						<td>
		 						<input class="required regular-text" type="text" id="name" name="name" value="<?php echo $name; ?>">
	 						</td>
	 					</tr>
	 					<tr>
	 						<th>
		 						<label for="vnu_capacity">
	 								<?php _e('Capacity', 'event_espresso'); ?> *
	 							</label>
	 						</th>
	 						<td>
		 						<input class="required small-text" type="text" id="vnu_capacity" name="vnu_capacity" value="<?php echo $vnu_capacity; ?>">
								<p class="description"><?php _e('leave blank for no limit', 'event_espresso') ?></p>
	 						</td>
	 					</tr>
	 					<tr>
	 						<th>
		 						<label for="website">
	 								<?php _e('Website', 'event_espresso'); ?>
	 							</label>
	 						</th>
	 						<td>
		 						<input class="regular-text" type="text" id="website" name="website" value="<?php echo stripslashes_deep($meta['website']); ?>">
	 						</td>
	 					</tr>
	 					<tr>
	 						<th>
		 						<label for="image">
	 								<?php _e('Image/Logo URL', 'event_espresso'); ?>
	 							</label>
	 						</th>
	 						<td>
		 						<input class="regular-text" type="text" id="image" name="image" value="<?php echo stripslashes_deep($meta['image']); ?>">
	 						</td>
	 					</tr>
					</tbody>
				</table>

				<h4 class="ee-admin-settings-hdr">
					<?php _e('Location', 'event_espresso'); ?>
				</h4>

				<table class="form-table">
					<tbody>
	 					<tr>
	 						<th>
		 						<label for="address">
	 								<?php _e('Address', 'event_espresso'); ?>
	 							</label>
	 						</th>
	 						<td>
		 						<input class="regular-text" type="text" id="address" name="address" value="<?php echo $address; ?>">
	 						</td>
	 					</tr>
	 					<tr>
	 						<th>
		 						<label for="address2">
	 								<?php _e('Address 2', 'event_espresso'); ?>
	 							</label>
	 						</th>
	 						<td>
		 						<input class="regular-text" type="text" id="address2" name="address2" value="<?php echo $address2; ?>">
	 						</td>
	 					</tr>
	 					<tr>
	 						<th>
		 						<label for="city">
	 								<?php _e('City', 'event_espresso'); ?>
	 							</label>
	 						</th>
	 						<td>
		 						<input class="regular-text" type="text" id="city" name="city" value="<?php echo $city; ?>">
	 						</td>
	 					</tr>
	 					<tr>
	 						<th>
		 						<label for="state">
	 								<?php _e('State', 'event_espresso'); ?>
	 							</label>
	 						</th>
	 						<td>
		 						<input class="regular-text" type="text" id="state" name="state" value="<?php echo $state; ?>">
	 						</td>
	 					</tr>
	 					<tr>
	 						<th>
		 						<label for="zip">
	 								<?php _e('Zip', 'event_espresso'); ?>
	 							</label>
	 						</th>
	 						<td>
		 						<input class="regular-text" type="text" id="zip" name="zip" value="<?php echo $zip; ?>">
	 						</td>
	 					</tr>
	 					<tr>
	 						<th>
		 						<label for="country">
	 								<?php _e('Country', 'event_espresso'); ?>
	 							</label>
	 						</th>
	 						<td>
		 						<input class="regular-text" type="text" id="country" name="country" value="<?php echo $country; ?>">
	 						</td>
	 					</tr>
	 					<?php
	 					if (defined('ESPRESSO_MANAGER_PRO_VERSION')) {
	 						?>
	 						<tr>
	 							<th>
		 							<label for="locale">
	 									<?php _e('Locale/Region ', 'event_espresso'); ?>
	 									<?php apply_filters('filter_hook_espresso_help', 'venue_locale'); ?>
	 								</label>
	 							</th>
	 							<td>
		 							<?php echo espresso_locale_select($cur_locale_id); ?>
	 							</td>
	 						</tr>
	 						<?php
	 					}// end if function_exists('espresso_member_data'
	 					?>
	 				</tbody>
	 			</table>

	 		</td>
	 		<td align="left" valign="top" class="b">

				<h4 class="ee-admin-settings-hdr">
					<?php _e('Contact Information', 'event_espresso'); ?>
				</h4>

	 			<table class="form-table">
	 				<tbody>
	 					<tr>
	 						<th>
		 						<label for="contact">
	 								<?php _e('Contact Person', 'event_espresso'); ?>
	 							</label>
	 						</th>
	 						<td>
		 						<input class="regular-text" type="text" id="contact" name="contact" value="<?php echo stripslashes_deep($meta['contact']); ?>">
	 						</td>
	 					</tr>
	 					<tr>
	 						<th>
		 						<label for="phone">
	 								<?php _e('Phone', 'event_espresso'); ?>
	 							</label>
	 						</th>
	 						<td>
		 						<input class="regular-text" type="text" id="phone" name="phone" value="<?php echo stripslashes_deep($meta['phone']); ?>">
	 						</td>
	 					</tr>
	 					<tr>
	 						<th>
		 						<label for="twitter">
	 								<?php _e('Twitter Handle', 'event_espresso'); ?>
	 							</label>
	 						</th>
	 						<td>
		 						<input class="regular-text" type="text" id="twitter" name="twitter" value="<?php echo stripslashes_deep($meta['twitter']); ?>">
	 						</td>
	 					</tr>
					</tbody>
				</table>

				<h4 class="ee-admin-settings-hdr">
					<?php _e('Google Map', 'event_espresso'); ?>
				</h4>

				<table class="form-table">
					<tbody
	 					<tr>
	 						<th>
		 						<label for="enable-ven-gmaps">
	 								<?php _e('Enable Venue for Google Maps', 'event_espresso') ?>
	 								<?php apply_filters('espresso_help', 'venue_gmap'); ?>
	 							</label>
	 						</th>
	 						<td>
		 						<?php echo EE_Form_Fields::select_input('enable_for_maps', $values, isset($meta['enable_for_maps']) ? $meta['enable_for_maps'] : '', 'id="enable-ven-gmaps"'); ?>
	 						</td>
	 					</tr>
	 					<tr>
	 						<th>
		 						<label for="gmap-static">
	 								<?php _e('Static Map URL', 'event_espresso'); ?>
	 							</label>
	 						</th>
	 						<td>
		 						<input class="regular-text" type="text" id="gmap-static" name="gmap_static" <?php echo (!empty($meta['gmap_static']) ) ? 'value="' . $meta['gmap_static'] . '"' : 'value=""'; ?> />
	 							<br />
	 							<p class="description">
	 								<?php _e('Will be used in place of the venue address.', 'event_espresso'); ?>
	 							</p>
	 						</td>
	 					</tr>
	 					<tr>
	 						<td colspan="2" class="ee-gmap-display">
		 						<div class="map-frame">
	 								<?php
	 								if (!empty($venue_address_elements)) {
	 									if (!empty($meta['enable_for_maps']) && empty($meta['gmap_static'])) {
	 										if (function_exists('ee_gmap_display')) {
	 											$event_id = $venue_id;
	 											echo ee_gmap_display($ee_gmap_location, $event_id);
	 										}else {
	 											echo '<p class="inform">';
	 											_e('Sorry the Gmap function is not available, please try the url method instead.', 'event_espresso');
	 											echo '</p>';
	 										}
	 									}else {
	 										?>
	 										<iframe src="<?php echo $meta['gmap_static'] ?>&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="300" height="300">
	 										</iframe>
	 										<br />
	 										<a href="<?php echo $meta['gmap_static'] ?>">
	 											<?php _e('View Large Map', 'event_espresso'); ?>
	 										</a>
	 										<?php
	 									}
	 								}else {
	 									echo '<p class="inform">';
	 									_e('Address was not entered.', 'event_espresso');
	 									echo '</p>';
	 								}
	 								?>
	 							</div>
	 						</td>
	 					</tr>
	 				</tbody>
	 			</table>
	 		</td>
	 	</tr>
	 </table>
	<br/>
	 <div id="descriptiondivrich" class="postarea">
	 	<label for="description" class="section-heading">
			<h4 class="ee-admin-settings-hdr">
				<?php _e('Description', 'event_espresso'); ?>
			</h4>
 		</label>
	 	<div class="postbox">
	 		<?php
	 		$args = array("textarea_rows"=> 5,"textarea_name"=> "venue_desc","editor_class" => "my_editor_custom");
	 		wp_editor( EE_Formatter::admin_format_content($meta['description']), "venue_desc", $args);
	 		?>
	 		<table id="venue-descr-add-form"  cellspacing="0">
	 			<tbody>
	 				<tr>
	 					<td class="aer-word-count">
	 					</td>
	 					<td class="autosave-info">
		 					<span>
	 							<p>
	 							</p>
	 						</span>
	 					</td>
	 				</tr>
	 			</tbody>
	 		</table>
	 	</div>
	 	<!-- /.postbox -->
	 </div>
	 <!-- /#descriptiondivrich -->

		<?php
		$content = ob_get_contents();
		ob_end_clean();
		return $content;
	}



	private function _set_venue_object() {
		global $wpdb;

		$id = $this->_req_data['venue_id'];
		$sql = "SELECT * FROM " . EVENTS_VENUE_TABLE . " v WHERE v.id ='%d' ";
		if (function_exists('espresso_member_data') && espresso_member_data('role') == 'espresso_event_manager') {
			$sql .= " AND v.wp_user = '%d'";
		}
		
		$venue = (function_exists('espresso_member_data') && espresso_member_data('role') == 'espresso_event_manager') ? $wpdb->get_row( $wpdb->prepare($sql, $id, espresso_member_data('id') ) ) : $wpdb->get_row( $wpdb->prepare($sql, $id) );
		
		if (!$wpdb->num_rows > 0) {
			$msg = sprintf( __('Something went wrong and we couldn\'t retrieve any data for the given venue id (%s)', 'event_espresso'), $id );
			throw new EE_Error( $msg );
		} else {
			$this->_venue = $venue;
		}
	}




	protected function _delete_venues() {
		$venue_ids = isset( $this->_req_data['venue_id'] ) ? (array) $this->_req_data['venue_id'] : (array) $this->_req_data['venue_id'];

		foreach ( $venue_ids as $venue_id ) {
			$this->_delete_venue($venue_id);
		}

		//doesn't matter what page we're coming from... we're going to the same place after delete.
		$query_args = array(
			'action' => 'default'
			);
		$this->_redirect_after_action(0,'','',$query_args);

	}





	protected function _delete_venue($venue_id) {
		global $wpdb;
		$del_id = absint( $venue_id );
		$sql = "DELETE FROM " . EVENTS_VENUE_TABLE . " WHERE id='%d'";
		$wpdb->query( $wpdb->prepare( $sql, $del_id ) );

		$sql = "DELETE FROM " . EVENTS_VENUE_REL_TABLE . " WHERE venue_id='%d'";
		$wpdb->query( $wpdb->prepare( $sql, $del_id ) );

		$sql = "DELETE FROM " . EVENTS_LOCALE_REL_TABLE . " WHERE venue_id='%d'";
		$wpdb->query( $wpdb->prepare( $sql, $del_id ) );
	}






	protected function _insert_or_update_venue($new_venue) {

		if ( $new_venue ) {
			$venue_id = $this->_insert_venue();
			$success = 0; //we already have a success message so lets not send another.
			$query_args = array(
				'action' => 'edit_venue', 
				'venue_id' => $venue_id
			);
		} else {
			$venue_id = $this->_update_venue();
			$success = 0;
			$query_args = array(
				'action' => 'edit_venue',
				'venue_id' => $venue_id
			);
		}

		$this->_redirect_after_action( $success, '','', $query_args );

	}





	private function _insert_venue() {
		global $wpdb, $espresso_wp_user;
		$wpdb->show_errors();
		
		//print_r($this->_req_data);
		$venue_meta['contact'] = isset($this->_req_data['contact']) ? $this->_req_data['contact'] : '';
		$venue_meta['phone'] = isset($this->_req_data['phone']) ? $this->_req_data['phone'] : '';
		$venue_meta['twitter'] = isset($this->_req_data['twitter']) ? $this->_req_data['twitter'] : '';
		$venue_meta['image'] = isset($this->_req_data['image']) ? $this->_req_data['image'] : '';
		$venue_meta['website'] = isset($this->_req_data['website']) ? $this->_req_data['website'] : '';
		$venue_meta['description'] = isset($this->_req_data['description']) ? esc_html($this->_req_data['description']) : '';
		$venue_meta['enable_for_maps'] = isset($this->_req_data['enable_for_maps']) ? esc_html($this->_req_data['enable_for_maps']) : '';
		$venue_meta['gmap_static'] = isset($this->_req_data['gmap_static']) ? esc_url($this->_req_data['gmap_static']) : '';
		$locale = isset($this->_req_data['locale']) ? $this->_req_data['locale'] : '';
		$meta = serialize($venue_meta);	
		
		$identifier=uniqid($espresso_wp_user.'-');
	
		$sql=array(
			'identifier'=>$identifier, 
			'name'=>$this->_req_data['name'],
			'address'=>$this->_req_data['address'], 
			'address2'=>$this->_req_data['address2'], 
			'city'=>$this->_req_data['city'], 
			'state'=>$this->_req_data['state'], 
			'zip'=>$this->_req_data['zip'], 
			'country'=>$this->_req_data['country'],
			'vnu_capacity'=>$this->_req_data['vnu_capacity'],
			'wp_user'=>$espresso_wp_user, 
			'meta'=>$meta,
		); 
		
		$sql_data = array('%s','%s','%s','%s','%s','%s','%s','%s','%d','%s');
		  
		if ($wpdb->insert( EVENTS_VENUE_TABLE, $sql, $sql_data )){
			$id = $wpdb->insert_id;
			$succes = true;
		}else{ 
			$succes = false;
		}
		if( defined('ESPRESSO_MANAGER_PRO_VERSION' )){		
			if( !empty($locale) ){
					$last_venue_id = $wpdb->insert_id;
					$sql_locale="INSERT INTO ".EVENTS_LOCALE_REL_TABLE." (venue_id, locale_id) VALUES ('".$last_venue_id."', '".$locale."')";
					if ($wpdb->query($sql_locale)){
						$succes = true;
					}
			}else{ 
				$succes = false;
			}
		}
		
		if ($succes == true){
			$msg = sprintf( __('The venue %s has been saved', 'event_espresso'), $this->_req_data['name'] );
			EE_Error::add_success( $msg );
		}else{ 
			$msg = sprintf( __('The venue %s was not saved!', 'event_espresso' ), $this->_req_data['name'] );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
		}

		return $id;
		
	}




	protected function _update_venue() {
		global $wpdb;
		$wpdb->show_errors();
		$venue_meta['contact'] = isset($this->_req_data['contact']) ? $this->_req_data['contact'] : '';
		$venue_meta['phone'] = isset($this->_req_data['phone']) ? $this->_req_data['phone'] : '';
		$venue_meta['twitter'] = isset($this->_req_data['twitter']) ? $this->_req_data['twitter'] : '';
		$venue_meta['image'] = isset($this->_req_data['image']) ? $this->_req_data['image'] : '';
		$venue_meta['website'] = isset($this->_req_data['website']) ? $this->_req_data['website'] : '';
		$venue_meta['description'] = isset($this->_req_data['description']) ? esc_html($this->_req_data['description']) : '';
		$venue_meta['enable_for_maps'] = isset($this->_req_data['enable_for_maps']) ? esc_html($this->_req_data['enable_for_maps']) : '';
		$venue_meta['gmap_static'] = isset($this->_req_data['gmap_static']) ? esc_url($this->_req_data['gmap_static']) : '';
		$locale = isset($this->_req_data['locale']) ? $this->_req_data['locale'] : '';
		$meta = serialize($venue_meta);
		//echo '<p>$locale = '.$locale.'</p>';

		$sql = array(
				'name' => $this->_req_data['name'],
				'address' => $this->_req_data['address'],
				'address2' => $this->_req_data['address2'],
				'city' => $this->_req_data['city'],
				'state' => $this->_req_data['state'],
				'zip' => $this->_req_data['zip'],
				'country' => $this->_req_data['country'],
				'vnu_capacity' => $this->_req_data['vnu_capacity'],
				'meta' => $meta);

		$update_id = array('id' => $this->_req_data['venue_id']);
		$sql_data = array('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s');
		$succes = false;

		if ($wpdb->update(EVENTS_VENUE_TABLE, $sql, $update_id, $sql_data, array('%d'))) {
			/* echo 'Debug: <br />';
			  print_r($sql);
			  print 'Number of vars: ' . count ($sql);
			  echo '<br />';
			  print 'Number of cols: ' . count($sql_data); */
			$succes = true;
		} else {
			$succes = false;
		}
		if (defined('ESPRESSO_MANAGER_PRO_VERSION')) {
			if (!empty($locale)) {
				$last_venue_id = $this->_req_data['venue_id'];
				$wpdb->query("DELETE FROM " . EVENTS_LOCALE_REL_TABLE . " WHERE venue_id='" . $last_venue_id . "'");
				$sql_locale = "INSERT INTO " . EVENTS_LOCALE_REL_TABLE . " (venue_id, locale_id) VALUES ('" . $last_venue_id . "', '" . $locale . "')";
				if ($wpdb->query($sql_locale)) {
					$succes = true;
				}
			} else {
				$succes = false;
			}
		}
		if ($succes == true) {
			$msg = sprintf( __('The venue %s has been updated', 'event_espresso'), $this->_req_data['name'] );
			EE_Error::add_success( $msg );
		} else {
			$msg = sprintf( __('The venue %s was not updated!', 'event_espresso'), $this->_req_data['name'] );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
		}

		return $this->_req_data['venue_id'];
	}


	/***********/
	/* QUERIES */


	public function get_venues( $per_page = 10, $count = FALSE ) {
		global $wpdb;

		$_orderby = !empty( $this->_req_data['orderby'] ) ? $this->_req_data['orderby'] : '';

		switch ( $_orderby ) {
			case 'id':
				$orderby = 'v.id';
				break;

			case 'capacity':
				$orderby = 'v.vnu_capacity';
				break;

			case 'city':
				$orderby = 'v.city';
				break;

			default:
				$orderby = 'v.name';
		}


		$sort = ( isset( $this->_req_data['order'] ) && ! empty( $this->_req_data['order'] )) ? $this->_req_data['order'] : 'ASC';

		$current_page = isset( $this->_req_data['paged'] ) && !empty( $this->_req_data['paged'] ) ? $this->_req_data['paged'] : 1;
		$per_page = isset( $per_page ) && !empty( $per_page ) ? $per_page : 10;
		$per_page = isset( $this->_req_data['perpage'] ) && !empty( $this->_req_data['perpage'] ) ? $this->_req_data['perpage'] : $per_page;


		$offset = ($current_page-1)*$per_page;
		$limit = "LIMIT $offset, $per_page";

		//todo: this friggen query needs optimized and $wpdb->prepared
		$sql = $count ? "( SELECT COUNT(v.id) " : "( SELECT v.* ";
		$sql .=  "FROM " . EVENTS_VENUE_TABLE . " v ";
		if (function_exists('espresso_member_data') && ( espresso_member_data('role') == 'espresso_group_admin' )) {
			if ($espresso_manager['event_manager_venue']) {
				//	show only venues inside their assigned locales.
				$group = get_user_meta(espresso_member_data('id'), "espresso_group", true);
				$group = unserialize($group);
				if (!empty($group)) {
					$sql .= " LEFT JOIN " . EVENTS_LOCALE_REL_TABLE . " l ON  l.venue_id = v.id ";
					$sql .= " LEFT JOIN " . EVENTS_LOCALE_TABLE . " lc ON lc.id = l.locale_id ";
					$sql .= " WHERE l.locale_id IN (" . implode(",", $group) . ")";
					$sql .= ") UNION ( ";
					$sql .= $count ? "SELECT COUNT(v.id) " : "SELECT v.* ";
					$sql .= "FROM " . EVENTS_VENUE_TABLE . " v ";
				}
			}
		}
		if (function_exists('espresso_member_data') && ( espresso_member_data('role') == 'espresso_event_manager' || espresso_member_data('role') == 'espresso_group_admin' )) {
			$sql .= " JOIN $wpdb->users u on u.ID = v.wp_user WHERE v.wp_user = " . $espresso_wp_user;
		}
		$sql .= ")";
		$sql .= $count ? '' : " ORDER BY $orderby $sort $limit";
		
		$results = $count ? $wpdb->get_var($sql) : $wpdb->get_results( $sql );

		return $results;
	}
	
} //end Venues_Admin_Page class