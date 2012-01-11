<?php

function event_espresso_manage_maps() {
	global $wpdb, $org_options, $notices;
	if (!empty($org_options['full_logging']) && $org_options['full_logging'] == 'Y') {
		espresso_log::singleton()->log(array('file' => __FILE__, 'function' => __FUNCTION__, 'status' => ''));
	}
	if (isset($_POST['update_org']) && check_admin_referer('espresso_form_check', 'ee_maps_update')) {
		$org_options['map_settings']['ee_display_map_no_shortcodes'] = $_POST['ee_display_map_no_shortcodes'];
		// org_options Gmaps reg page
		$org_options['map_settings']['ee_map_width_single'] = $_POST['ee_map_width_single'];
		$org_options['map_settings']['ee_map_height_single'] = $_POST['ee_map_height_single'];
		$org_options['map_settings']['ee_map_zoom_single'] = $_POST['ee_map_zoom_single'];
		$org_options['map_settings']['ee_map_nav_display_single'] = $_POST['ee_map_nav_display_single'];
		$org_options['map_settings']['ee_map_nav_size_single'] = $_POST['ee_map_nav_size_single'];
		$org_options['map_settings']['ee_map_type_control_single'] = $_POST['ee_map_type_control_single'];
		$org_options['map_settings']['ee_map_align_single'] = $_POST['ee_map_align_single'];
		//org_options Gmaps list pages
		$org_options['map_settings']['ee_map_width'] = $_POST['ee_map_width'];
		$org_options['map_settings']['ee_map_height'] = $_POST['ee_map_height'];
		$org_options['map_settings']['ee_map_zoom'] = $_POST['ee_map_zoom'];
		$org_options['map_settings']['ee_map_nav_display'] = $_POST['ee_map_nav_display'];
		$org_options['map_settings']['ee_map_nav_size'] = $_POST['ee_map_nav_size'];
		$org_options['map_settings']['ee_map_type_control'] = $_POST['ee_map_type_control'];
		$org_options['map_settings']['ee_map_align'] = $_POST['ee_map_align'];

		update_option('events_organization_settings', $org_options);

		$notices['updates'][] = __('Events Map Settings Updated', 'event_espresso');
	}

	//Debug
	//echo "<pre>".print_r($org_options,true)."</pre>";

	$values = array(
			array('id' => 'Y', 'text' => __('Yes', 'event_espresso')),
			array('id' => 'N', 'text' => __('No', 'event_espresso'))
	);

	// checks value of calendar thumb size to set radio inputs
	// two seperate functions to handle list opts or reg page(single) opts
	// to prevent opt values clashing due to same values.
	function espresso_is_selected_list($input_val) {
		global $org_options;
		if (!empty($org_options['full_logging']) && $org_options['full_logging'] == 'Y') {
			espresso_log::singleton()->log(array('file' => __FILE__, 'function' => __FUNCTION__, 'status' => ''));
		}
		$the_opt_val = array('ee_map_type_control' => $org_options['map_settings']['ee_map_type_control'],
				'ee_map_align' => $org_options['map_settings']['ee_map_align']);
		if (!in_array($input_val, $the_opt_val))
			return false;
		else
			echo 'checked="checked"';
		return;
	}

	function espresso_is_selected_reg($input_val) {
		global $org_options;
		if (!empty($org_options['full_logging']) && $org_options['full_logging'] == 'Y') {
			espresso_log::singleton()->log(array('file' => __FILE__, 'function' => __FUNCTION__, 'status' => ''));
		}
		$the_opt_val = array('ee_map_align_single' => $org_options['map_settings']['ee_map_align_single'],
				'ee_map_type_control_single' => $org_options['map_settings']['ee_map_type_control_single']);
		if (!in_array($input_val, $the_opt_val)) {
			return false;
		} else {
			echo 'checked="checked"';
			return true;
		}
	}
	?>

	<div id="configure_event_maps_form" class="wrap meta-box-sortables ui-sortable clearfix">

		<div id="icon-options-event" class="icon32"> </div>
		<h2>
			<?php _e('Event Espresso - Event Map Settings', 'event_espresso'); ?>
		</h2>

		<?php do_action( 'action_hook_espresso_admin_notices'); ?>

		<!-- include right sidebar  -->
		<div id="poststuff" class="metabox-holder has-right-sidebar">
			<?php event_espresso_display_right_column(); ?>

			<div id="post-body">
				<div id="post-body-content">

					<!-- begin left column - metaboxes  -->
					<div class="meta-box-sortables ui-sortables">
						<form id="template-settings-form" class="espresso_form" method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>">

							<!-- #### Start Gmap settings  #### -->
							<div class="metabox-holder">
								<div class="postbox template-gen-settings">
									<div title="Click to toggle" class="handlediv"><br /></div>
									<h3 class="hndle">
										<?php _e('Events Maps Settings ', 'event_espresso'); ?>
									</h3>
									<div class="inside">
										<div class="padding">




											<?php
											if (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/templates/event_gmaps_settings.php')) {

												require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/templates/event_gmaps_settings.php');
											}
											?>

											<p class="submit-buttons">
												<input class="button-primary" type="submit" name="Submit" value="<?php _e('Save Options', 'event_espresso'); ?>" id="save_organization_setting_1" />
											</p>

										</div><!-- / .padding -->
									</div><!-- / .inside -->
								</div><!-- / .postbox -->
							</div><!-- / .metabox-holder -->
							<!-- #### end general map config settings #### -->

							<!-- #### Map Shortcode examples #### -->
							<?php /* ?><div class="metabox-holder">
							  <div class="postbox">
							  <div title="Click to toggle" class="handlediv"><br /></div>
							  <h3 class="hndle">
							  <?php _e('Map Shortcodes ', 'event_espresso'); ?>
							  </h3>
							  <div class="inside">
							  <div class="padding">
							  <p class="section-heading"><?php _e('Example map shortcodes ', 'event_espresso') ?><a class="thickbox"  href="#TB_inline?height=400&amp;width=500&amp;inlineId=map_shortcode_info" target="_blank"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/question-frame.png" width="16" height="16" alt="" /></a></p>


							  <ul id="event_espresso-map-shortcodes">

							  <li>Map shortcode examples - or display in thickbox?</li>

							  </ul>


							  </div><!-- / .padding -->
							  </div><!-- / .inside -->
							  </div><!-- / .postbox -->
							  </div><!-- / .metabox-holder -->
							  <!-- #### end map shortcodes examples #### -->





							  <?php */ ?>
							<?php include_once('map_confg_help.php'); ?>
							<?php // create our nonces and do our form submit   ?>
							<?php wp_nonce_field('espresso_form_check', 'ee_maps_update'); ?>
							<input type="hidden" name="update_org" value="update" />
						</form>

					</div><!-- / .meta-box-sortables -->
				</div><!-- / #post-body-content -->
			</div><!-- / #post-body -->
		</div><!-- / #poststuff -->
	</div><!-- / #wrap -->

	<script type="text/javascript" charset="utf-8">
		//<![CDATA[
		jQuery(document).ready(function() {
			postboxes.add_postbox_toggles('template_map_confg');

		});
		//]]>
	</script>
	<?php
	return;
}

// close function 'event_espresso_manage_maps'
