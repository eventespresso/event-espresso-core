<?php
function add_new_event_venue(){
	global $wpdb, $current_user;

	$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso'))
	);
?>

<div id="add-edit-venue" class="metabox-holder">
	<div class="postbox">
		<h3>
			<?php _e('Add a Venue','event_espresso'); ?>
		</h3>
		<div class="inside">
			<form id="venues-form" method="post" action="<?php echo $_SERVER['REQUEST_URI'];?>">
				<table width="100%" border="0">
					<tr>
						<td align="left" valign="top" class="a"><table class="form-table">
								<tbody>
									<tr>
										<th><label for="name">
												<?php _e('Name','event_espresso'); ?>
												<em title="<?php _e('This field is required', 'event_espresso') ?>">*</em> </label></th>
										<td><input class="required venue-man-name regular-text" type="text" id="name" name="name" /></td>
									</tr>
									<tr>
										<th><label for="website">
												<?php _e('Website','event_espresso'); ?>
											</label></th>
										<td><input class="regular-text" type="text" id="website" name="website" /></td>
									</tr>
									<tr>
										<th><label for="image">
												<?php _e('Image/Logo URL','event_espresso'); ?>
											</label></th>
										<td><input class="regular-text" type="text" id="image" name="image"></td>
									</tr>
									<tr>
										<td colspan="2"><strong>
											<?php _e('Location', 'event_espresso'); ?>
											</strong></td>
									</tr>
									<tr>
										<th><label for="address">
												<?php _e('Address','event_espresso'); ?>
											</label></th>
										<td><input class="regular-text" type="text" id="address" name="address" /></td>
									</tr>
									<tr>
										<th><label for="address2">
												<?php _e('Address 2','event_espresso'); ?>
											</label></th>
										<td><input class="regular-text" type="text" id="address2" name="address2" /></td>
									</tr>
									<tr>
										<th><label for="city">
												<?php _e('City','event_espresso'); ?>
											</label></th>
										<td><input class="regular-text" type="text" id="city" name="city" /></td>
									</tr>
									<tr>
										<th><label for="state">
												<?php _e('State','event_espresso'); ?>
											</label></th>
										<td><input class="regular-text" type="text" id="state" name="state" /></td>
									</tr>
									<tr>
										<th><label for="zip">
												<?php _e('Zip','event_espresso'); ?>
											</label></th>
										<td><input class="regular-text" type="text" id="zip" name="zip" /></td>
									</tr>
									<tr>
										<th><label for="country">
												<?php _e('Country','event_espresso');  ?>
											</label></th>
										<td><input class="regular-text" type="text" id="country" name="country" /></td>
									</tr>
									<?php
							if ( defined('ESPRESSO_MANAGER_PRO_VERSION') ){
						?>
									<tr>
										<th><label for="locale">
												<?php _e('Locale/Region ','event_espresso'); ?>
												<?php apply_filters( 'filter_hook_espresso_help', 'venue_locale'); ?>
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
												<?php _e('Contact Person','event_espresso'); ?>
											</label></th>
										<td><input class="regular-text" type="text" id="contact" name="contact" /></td>
									</tr>
									<tr>
										<th><label for="phone">
												<?php _e('Phone','event_espresso'); ?>
											</label></th>
										<td><input class="regular-text" type="text" id="phone" name="phone" /></td>
									</tr>
									<tr>
										<th><label for="twitter">
												<?php _e('Twitter','event_espresso'); ?>
											</label></th>
										<td><input class="regular-text" type="text" id="twitter" name="twitter" /></td>
									</tr>
								</tbody>
							</table></td>
						<td align="left" valign="top" class="b"><table class="form-table">
								<tbody>
									<tr>
										<th><label for="enable-ven-gmaps">
												<?php _e('Enable Venue for Google Maps', 'event_espresso')  ?>
												<?php apply_filters( 'filter_hook_espresso_help', 'venue_gmap'); ?>
											</label></th>
										<td><?php echo select_input('enable_for_maps', $values, isset($meta['enable_for_maps']) ? $meta['enable_for_maps'] : '', 'id="enable-ven-gmaps"'); ?></td>
									</tr>
									<tr>
										<th><label for="gmap-static">
												<?php _e('Static Map URL', 'event_espresso'); ?>
											</label></th>
										<td><input class="regular-text" type="text" id="gmap-static" name="gmap_static" <?php echo (!empty($meta['gmap_static']) )? 'value="' . $meta['gmap_static'] .'"' : 'value=""'; ?> />
											<br />
											<span class="description">
											<?php _e('Will be used in place of the venue address.', 'event_espresso'); ?>
											</span></td>
									</tr>
									<tr>
										<td colspan="2" class="ee-gmap-display"><div align="center" class="map-frame"><?php echo '<img align="middle" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/sample-map.jpg" alt="Sample Map" title="Sample Map" />' ?> </div></td>
									</tr>
								</tbody>
							</table></td>
					</tr>
				</table>
				<div id="descriptiondivrich" class="postarea">
					<label for="description" class="section-heading">
						<?php _e('Description','event_espresso'); ?>
					</label>
					<div class="postbox">
						<?php 
							$args = array("textarea_rows" => 5, "textarea_name" => "venue_desc", "editor_class" => "my_editor_custom");
							wp_editor('', "venue_desc", $args);
						?>						<table id="venue-descr-add-form"  cellspacing="0">
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
					<input type="hidden" name="action" value="add">
					<p>
						<input class="button-primary" type="submit" name="Submit" value="<?php _e('Save'); ?>" id="add_new_venue" />
						<?php wp_nonce_field( 'espresso_form_check', 'add_new_venue' ) ?>
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