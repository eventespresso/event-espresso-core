<?php

function edit_event_venue() {
	global $wpdb;


	$id = $_REQUEST['id'];
	$sql = "SELECT * FROM " . EVENTS_VENUE_TABLE . " v WHERE v.id ='" . $id . "' ";
	if (function_exists('espresso_member_data') && espresso_member_data('role') == 'espresso_event_manager') {
		$sql .= " AND v.wp_user = '" . espresso_member_data('id') . "' ";
	}
	//echo $sql;
	$venue = $wpdb->get_row($sql, ARRAY_A);
	//echo "<pre>".print_r($venue ,true)."</pre>";
	if (!$wpdb->num_rows > 0)
		return;
	$venue_id = $venue['id'];
	$name = stripslashes_deep($venue['name']);
	$address = stripslashes_deep($venue['address']);
	$address2 = stripslashes_deep($venue['address2']);
	$city = stripslashes_deep($venue['city']);
	$state = stripslashes_deep($venue['state']);
	$zip = stripslashes_deep($venue['zip']);
	$country = stripslashes_deep($venue['country']);
	$meta = unserialize($venue['meta']);

	$cur_locale_id = $wpdb->get_var("SELECT locale_id FROM " . EVENTS_LOCALE_REL_TABLE . " WHERE venue_id='" . $id . "'");

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
	?>
	<!--Add event display-->

	<div id="add-edit-venue" class="metabox-holder">
		<div class="postbox">
			<h3>
	<?php _e('Edit Venue', 'event_espresso'); ?>
			</h3>
			<div class="inside">
				<form method="post" action="<?php echo $_SERVER['REQUEST_URI']; ?>">
					<h4><?php echo stripslashes($name) ?></h4>
					<input type="hidden" name="venue_id" value="<?php echo $venue_id; ?>">
					<input type="hidden" name="action" value="update">
					<table width="100%" border="0">
						<tr>
							<td align="left" valign="top" class="a"><table class="form-table">
									<tbody>
										<tr>
											<th><label for="name">
	<?php _e('Name', 'event_espresso'); ?>
												</label></th>
											<td><input class="regular-text" type="text" id="name" name="name" value="<?php echo $name; ?>"></td>
										</tr>
										<tr>
											<th><label for="website">
	<?php _e('Website', 'event_espresso'); ?>
												</label></th>
											<td><input class="regular-text" type="text" id="website" name="website" value="<?php echo stripslashes_deep($meta['website']); ?>"></td>
										</tr>
										<tr>
											<th><label for="image">
	<?php _e('Image/Logo URL', 'event_espresso'); ?>
												</label></th>
											<td><input class="regular-text" type="text" id="image" name="image" value="<?php echo stripslashes_deep($meta['image']); ?>"></td>
										</tr>
										<tr>
											<td colspan="2"><strong>
	<?php _e('Location', 'event_espresso'); ?>
												</strong></td>
										</tr>
										<tr>
											<th><label for="address">
	<?php _e('Address', 'event_espresso'); ?>
												</label></th>
											<td><input class="regular-text" type="text" id="address" name="address" value="<?php echo $address; ?>"></td>
										</tr>
										<tr>
											<th><label for="address2">
	<?php _e('Address 2', 'event_espresso'); ?>
												</label></th>
											<td><input class="regular-text" type="text" id="address2" name="address2" value="<?php echo $address2; ?>"></td>
										</tr>
										<tr>
											<th><label for="city">
	<?php _e('City', 'event_espresso'); ?>
												</label></th>
											<td><input class="regular-text" type="text" id="city" name="city" value="<?php echo $city; ?>"></td>
										</tr>
										<tr>
											<th><label for="state">
	<?php _e('State', 'event_espresso'); ?>
												</label></th>
											<td><input class="regular-text" type="text" id="state" name="state" value="<?php echo $state; ?>"></td>
										</tr>
										<tr>
											<th><label for="zip">
	<?php _e('Zip', 'event_espresso'); ?>
												</label></th>
											<td><input class="regular-text" type="text" id="zip" name="zip" value="<?php echo $zip; ?>"></td>
										</tr>
										<tr>
											<th><label for="country">
	<?php _e('Country', 'event_espresso'); ?>
												</label></th>
											<td><input class="regular-text" type="text" id="country" name="country" value="<?php echo $country; ?>"></td>
										</tr>
										<?php
										if (defined('ESPRESSO_MANAGER_PRO_VERSION')) {
											?>
											<tr>
												<th><label for="locale">
		<?php _e('Locale/Region ', 'event_espresso'); ?>
		<?php apply_filters('filter_hook_espresso_help', 'venue_locale'); ?>
													</label>
												</th>
												<td><?php echo espresso_locale_select($cur_locale_id); ?></td>
											</tr>
											<?php
										}// end if function_exists('espresso_member_data'
										?>
										<tr>
											<td colspan="2"><strong>
	<?php _e('Contact Information', 'event_espresso'); ?>
												</strong></td>
										</tr>
										<tr>
											<th><label for="contact">
	<?php _e('Contact Person', 'event_espresso'); ?>
												</label></th>
											<td><input class="regular-text" type="text" id="contact" name="contact" value="<?php echo stripslashes_deep($meta['contact']); ?>"></td>
										</tr>
										<tr>
											<th><label for="phone">
	<?php _e('Phone', 'event_espresso'); ?>
												</label></th>
											<td><input class="regular-text" type="text" id="phone" name="phone" value="<?php echo stripslashes_deep($meta['phone']); ?>"></td>
										</tr>
										<tr>
											<th><label for="twitter">
	<?php _e('Twitter Handle', 'event_espresso'); ?>
												</label></th>
											<td><input class="regular-text" type="text" id="twitter" name="twitter" value="<?php echo stripslashes_deep($meta['twitter']); ?>"></td>
										</tr>
									</tbody>
								</table></td>
							<td align="left" valign="top" class="b"><table class="form-table">
									<tbody>
										<tr>
											<th><label for="enable-ven-gmaps">
	<?php _e('Enable Venue for Google Maps', 'event_espresso') ?>
	<?php apply_filters('espresso_help', 'venue_gmap'); ?>
												</label></th>
											<td><?php echo select_input('enable_for_maps', $values, isset($meta['enable_for_maps']) ? $meta['enable_for_maps'] : '', 'id="enable-ven-gmaps"'); ?></td>
										</tr>
										<tr>
											<th><label for="gmap-static">
	<?php _e('Static Map URL', 'event_espresso'); ?>
												</label></th>
											<td><input class="regular-text" type="text" id="gmap-static" name="gmap_static" <?php echo (!empty($meta['gmap_static']) ) ? 'value="' . $meta['gmap_static'] . '"' : 'value=""'; ?> />
												<br />
												<span class="description">
	<?php _e('Will be used in place of the venue address.', 'event_espresso'); ?>
												</span></td>
										</tr>
										<tr>
											<td colspan="2" class="ee-gmap-display"><div class="map-frame">
													<?php
													if (!empty($venue_address_elements)) {
														if (!empty($meta['enable_for_maps']) && empty($meta['gmap_static'])) {
															if (function_exists('ee_gmap_display')) {
																$event_id = $venue_id;
																echo ee_gmap_display($ee_gmap_location, $event_id);
															} else {
																echo '<p class="inform">';
																_e('Sorry the Gmap function is not available, please try the url method instead.', 'event_espresso');
																echo '</p>';
															}
														} else {
															?>
															<iframe src="<?php echo $meta['gmap_static'] ?>&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="300" height="300"> </iframe>
															<br />
															<a href="<?php echo $meta['gmap_static'] ?>">
															<?php _e('View Large Map', 'event_espresso'); ?>
															</a>
															<?php
														}
													} else {
														echo '<p class="inform">';
														_e('Address was not entered.', 'event_espresso');
														echo '</p>';
													}
													?>
												</div></td>
										</tr>
									</tbody>
								</table></td>
						</tr>
					</table>
					<div id="descriptiondivrich" class="postarea">
						<label for="description" class="section-heading">
							<?php _e('Description', 'event_espresso'); ?>
						</label>
						<div class="postbox">
						<?php 
							$args = array("textarea_rows" => 5, "textarea_name" => "venue_desc", "editor_class" => "my_editor_custom");
							wp_editor( espresso_admin_format_content($meta['description']), "venue_desc", $args);
						?>	
							<table id="venue-descr-add-form"  cellspacing="0">
								<tbody>
									<tr>
										<td class="aer-word-count"></td>
										<td class="autosave-info"><span>
												<p></p>
											</span></td>
									</tr>
								</tbody>
							</table>
						</div>
						<!-- /.postbox -->
						<p>
							<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update'); ?>" id="update_venue" />
	<?php wp_nonce_field('espresso_form_check', 'update_venue') ?>
						</p>
					</div>
					<!-- /#descriptiondivrich -->
				</form>
			</div>
			<!-- /.inside -->
		</div>
		<!-- /.postbox -->
	</div>
	<!-- /.metabox-holder -->

	<?php
//espresso_tiny_mce();
}

