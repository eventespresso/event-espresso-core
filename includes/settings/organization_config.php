<?php

//Event Registration Subpage 1 - Configure Organization
function organization_config_mnu() {
	global $wpdb, $notices, $org_options, $espresso_premium;
	
	//Create the default pages
	if (empty($org_options['event_page_id'])
		|| empty($org_options['return_url'])
		|| empty($org_options['notify_url']))
	{
		espresso_create_default_pages();
	}


	//print_r($timezoneTable);
	if (isset($_POST['update_org'])) {
		$org_options['organization'] = stripslashes_deep($_POST['org_name']);
		$org_options['organization_street1'] = $_POST['org_street1'];
		$org_options['organization_street2'] = $_POST['org_street2'];
		$org_options['organization_city'] = $_POST['org_city'];
		$org_options['organization_state'] = $_POST['org_state'];
		$org_options['organization_zip'] = $_POST['org_zip'];
		$org_options['organization_country'] = $_POST['org_country'];
		$org_options['organization_timezone'] = isset($_POST['organization_timezone']) ? $_POST['organization_timezone'] : 'America/New_York';
		$org_options['contact_email'] = $_POST['email'];
		$org_options['currency_format'] = isset($_POST['currency_format']) ? $_POST['currency_format'] : 'USD';
		$org_options['currency_symbol'] = isset($_POST['currency_format']) ? $_POST['currency_format'] : 'USD';
		$org_options['events_listing_type'] = isset($_POST['events_listing_type']) ? $_POST['events_listing_type'] : '';
		$org_options['expire_on_registration_end'] = $_POST['expire_on_registration_end'];
		$org_options['event_page_id'] = $_POST['event_page_id'];
		$org_options['return_url'] = $_POST['return_url'];
		$org_options['cancel_return'] = $_POST['cancel_return'];
		$org_options['notify_url'] = $_POST['notify_url'];
		$org_options['use_sandbox'] = isset($_POST['use_sandbox']) ? $_POST['use_sandbox'] : '';
		$org_options['events_in_dasboard'] = $_POST['events_in_dasboard'];
		$org_options['default_mail'] = $_POST['default_mail'];
		$org_options['payment_subject'] = $_POST['payment_subject'];
		$org_options['payment_message'] = esc_html($_POST['payment_message']);
		$org_options['message'] = esc_html($_POST['success_message']);
		$org_options['email_before_payment'] = $_POST['email_before_payment'];
		$org_options['use_captcha'] = $_POST['use_captcha'];
		$org_options['recaptcha_publickey'] = $_POST['recaptcha_publickey'];
		$org_options['recaptcha_privatekey'] = $_POST['recaptcha_privatekey'];
		$org_options['recaptcha_theme'] = $_POST['recaptcha_theme'];
		$org_options['recaptcha_width'] = $_POST['recaptcha_width'];
		$org_options['recaptcha_language'] = $_POST['recaptcha_language'];
		$org_options['espresso_dashboard_widget'] = $_POST['espresso_dashboard_widget'];
		$org_options['time_reg_limit'] = $_POST['time_reg_limit'];
		$org_options['use_attendee_pre_approval'] = $_POST['use_attendee_pre_approval'];
		$org_options['show_pending_payment_options'] = $_POST['show_pending_payment_options'];
		$org_options['use_venue_manager'] = $_POST['use_venue_manager'];
		$org_options['use_personnel_manager'] = $_POST['use_personnel_manager'];
		$org_options['use_event_timezones'] = $_POST['use_event_timezones'];
		$org_options['full_logging'] = $_POST['full_logging'];
		$org_options['surcharge'] = $_POST['surcharge'];
		$org_options['surcharge_type'] = $_POST['surcharge_type'];
		$org_options['surcharge_text'] = $_POST['surcharge_text'];
		$org_options['show_reg_footer'] = $_POST['show_reg_footer'];
		$org_options['affiliate_id'] = $_POST['affiliate_id'];
		$org_options['site_license_key'] = $_POST['site_license_key'];
		$org_options['default_logo_url'] = $_REQUEST['upload_image'];
		$org_options['default_payment_status'] = $_POST['default_payment_status'];
		$currency_format = getCountryFullData($org_options['organization_country']);
		switch ($currency_format['iso_code_3']) {
			case 'USA':
				$org_options['currency_symbol'] = '$';
				break;

			case 'CHE':
				$org_options['currency_symbol'] = 'Fr.';
				break;

			case 'AUS':
				$org_options['currency_symbol'] = 'A $';
				break;

			case 'GBR':
				$org_options['currency_symbol'] = '&pound;';
				break;

			case 'NOR':
				$org_options['currency_symbol'] = 'NOK ';
				break;

			case 'BRA':
				$org_options['currency_symbol'] = 'R$';
				break;

			case 'CAN':
				$org_options['currency_symbol'] = 'C $';
				break;

			case 'JPN':
				$org_options['currency_symbol'] = '&yen;';
				break;

			case 'SWE':
				$org_options['currency_symbol'] = 'Kr. ';
				break;

			case 'DNK':
				$org_options['currency_symbol'] = 'DKK ';
				break;

			case 'ZAF':
				$org_options['currency_symbol'] = 'R ';
				break;


			default:
				$org_options['currency_symbol'] = '$';
				break;
		}
		if (getCountryZoneId($org_options['organization_country']) == '2') {
			$org_options['currency_symbol'] = '&euro;'; //Creates the symbol for the Euro
		}
		
		if (update_option('events_organization_settings', $org_options) == true){
			$notices['updates'][] = __('Organization details saved', 'event_espresso');
		}else{
			$notices['errors'][] = __('Unable to save Organization details.', 'event_espresso');
		}
	}
	
	//Options updated message
	//This line keeps the notices from displaying twice
	if ( did_action( 'espresso_admin_notices' ) == false )
		do_action('espresso_admin_notices');

	$org_options = get_option('events_organization_settings');
	$values = array(
			array('id' => 'Y', 'text' => __('Yes', 'event_espresso')),
			array('id' => 'N', 'text' => __('No', 'event_espresso'))
	);
	?>

<div class="wrap">
	<div id="icon-options-event" class="icon32"> </div>
	<h2>
		<?php _e('General Settings', 'event_espresso'); ?>
	</h2>
	<div id="poststuff" class="metabox-holder has-right-sidebar">
		<?php event_espresso_display_right_column(); ?>
		<div id="post-body">
			<div id="post-body-content">
				<div class="meta-box-sortables ui-sortable">
					<form class="espresso_form" method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>">
						<ul id="event_espresso-sortables">
							<li>
								<div class="metabox-holder">
									<div class="postbox">
										<div title="Click to toggle" class="handlediv"><br />
										</div>
										<h3 class="hndle">
											<?php _e('Organization Settings', 'event_espresso'); ?>
										</h3>
										<div class="inside">
											<div class="padding">
												<h4>
													<?php _e('Contact Information', 'event_espresso'); ?>
													<?php apply_filters( 'espresso_help', 'contact_info'); ?>
												</h4>
												<table class="form-table">
													<tbody>
														<tr>
															<th><label for="org_name">
																	<?php _e('Organization Name:', 'event_espresso'); ?>
																</label></th>
															<td><input class="regular-text" type="text" name="org_name" value="<?php echo stripslashes_deep($org_options['organization']); ?>" /></td>
														</tr>
														<tr>
															<th><label for="org_street1">
																	<?php _e('Organization Street 1:', 'event_espresso'); ?>
																</label></th>
															<td><input class="regular-text" type="text" name="org_street1" value="<?php echo $org_options['organization_street1']; ?>" /></td>
														</tr>
														<tr>
															<th><label for="org_street2">
																	<?php _e('Organization Street 2:', 'event_espresso'); ?>
																</label></th>
															<td><input class="regular-text" type="text" name="org_street2" value="<?php echo $org_options['organization_street2']; ?>" /></td>
														</tr>
														<tr>
															<th><label for="org_city">
																	<?php _e('Organization City:', 'event_espresso'); ?>
																</label></th>
															<td><input class="regular-text" type="text" name="org_city" value="<?php echo $org_options['organization_city']; ?>" /></td>
														</tr>
														<tr>
															<th><label for="org_state">
																	<?php _e('Organization State:', 'event_espresso'); ?>
																</label></th>
															<td><input class="regular-text" type="text" name="org_state" value="<?php echo $org_options['organization_state']; ?>" /></td>
														</tr>
														<tr>
															<th><label for="org_zip">
																	<?php _e('Organization Zip/Postal Code:', 'event_espresso'); ?>
																</label></th>
															<td><input class="regular-text" type="text" name="org_zip" size="10" value="<?php echo $org_options['organization_zip']; ?>" /></td>
														</tr>
														<tr>
															<th><label for="org_country">
																	<?php _e('Organization Country:', 'event_espresso'); ?>
																</label></th>
															<td><?php printCountriesSelector("org_country", isset($org_options['organization_country']) ? $org_options['organization_country'] : ''); ?> (<?php echo $org_options['currency_symbol']; ?>)</td>
														</tr>
														<tr>
															<th><label for="email">
																	<?php _e('Primary contact email:', 'event_espresso'); ?>
																</label></th>
															<td><input class="regular-text" type="text" name="email" value="<?php echo $org_options['contact_email']; ?>" /></td>
														</tr>
													</tbody>
												</table>
												<h4>
													<?php _e('Time and Date Settings', 'event_espresso'); ?>
												</h4>
												<table class="form-table">
													<tbody>
														<tr>
															<th><?php _e('Current Time: ', 'event_espresso'); ?></th>
															<td><span class="current-date"> <?php echo date(get_option('date_format') . ' ' . get_option('time_format')); ?> </span><br />
																<span class="description"><a class="change-date-time" href="options-general.php" target="_blank">
																<?php _e('Change timezone and date format settings?', 'event_espresso'); ?>
																</a><br />
																<span class="important">
																<?php _e('Note:', 'event_espresso'); ?>
																</span>
																<?php _e('You must set the time zone for your city, or the city closest to you. UTC time will not work.', 'event_espresso'); ?>
																<a href="http://ee-updates.s3.amazonaws.com/images/time-zone-settings-example.jpg?TB_iframe=true&height=200&width=630" class="thickbox">
																<?php _e('View an example?', 'event_espresso'); ?>
																</a></span></td>
														</tr>
														<tr>
															<th><label for="expire_on_registration_end">
																	<?php _e('Events expire on registration end date?', 'event_espresso'); ?>
																</label></th>
															<td><?php echo select_input('expire_on_registration_end', $values, $org_options['expire_on_registration_end']); ?></td>
														</tr>
													</tbody>
												</table>
												<h4>
													<?php _e('Images', 'event_espresso'); ?>
												</h4>
												<table class="form-table">
													<tbody>
														<tr>
															<th><label for="upload_image">
																	<?php _e('Add a Default Logo', 'event_espresso'); ?>
																	<?php apply_filters( 'espresso_help', 'espresso_default_logo_info'); ?>
																</label></th>
															<td><div id="default-logo-image">
																	<input id="upload_image" type="hidden" size="36" name="upload_image" value="<?php echo $org_options['default_logo_url'] ?>" />
																	<input id="upload_image_button" type="button" value="Upload Image" />
																	<?php if ($org_options['default_logo_url'] != '') { ?>
																	<p class="default-logo-thumb"><img src="<?php echo $org_options['default_logo_url'] ?>" alt="" /></p>
																	<?php } ?>
																</div>
																<div id="espresso_default_logo_info" class="pop-help" style="display:none">
																	<h2>
																		<?php _e('Default Logo', 'event_espresso'); ?>
																	</h2>
																	<p><?php echo __('The default logo will be used in your custom invoice, ticketing, certificates, and payment templates.', 'event_espresso'); ?></p>
																</div></td>
														</tr>
													</tbody>
												</table>
												<p>
													<input class="button-primary" type="submit" name="Submit" value="<?php _e('Save Options', 'event_espresso'); ?>" id="save_organization_saetting_1" />
												</p>
											</div>
										</div>
									</div>
								</div>
							</li>
							<li>
								<div class="metabox-holder">
									<div class="postbox">
										<div title="Click to toggle" class="handlediv"><br />
										</div>
										<h3 class="hndle">
											<?php _e('Page Settings', 'event_espresso'); ?>
										</h3>
										<div class="inside">
											<div class="padding"> <a name="page_settings" id="page_settings"></a>
												<p>
													<?php _e('The following shortcodes and page settings are required for Event Espresso to function properly. These shortcodes should not be replaced with any other shortcodes. Please view <a href="admin.php?page=support#shortcodes">this page</a> for a list of optional shortcodes.', 'event_espresso'); ?>
												</p>
												<table class="form-table">
													<tbody>
														<?php
															//Check to see if we are using the deprecated SSL option. If we are, recommend updating to WordPress HTTPS (SSL).
															if ($espresso_premium == true && $org_options['event_ssl_active'] == 'Y') {
																echo '<tr><td colspan="2"><div id="ssl-reg" style="background-color: #ffffe0; border: #e6db55 1px solid; padding:4px;">';
																echo '<p><strong>' . __('Attention!', 'event_espresso') . '</strong><br />' . __('The Secure Payment System has been removed.', 'event_espresso') . '</p>';
																echo '<p>' . __('If your site uses SSL to handle secure transactions. Please install the <a href="http://ee-updates.s3.amazonaws.com/espresso-https.1.0.zip" title="Install Now">Event Espresso SSL/HTTPS</a> plugin now.', 'event_espresso') . ' ' . __('<a href="http://eventespresso.com/forums/2011/09/use-wordpress-https-for-ssl-encryption-on-your-event-espresso-site/" target="_blank">More information here</a>.', 'event_espresso') . '</p>';
																$ssl_values = array(
																		array('id' => 'N', 'text' => __('Yes', 'event_espresso')), //This turns the message off by changing the option to 'N'
																		array('id' => 'Y', 'text' => __('No', 'event_espresso'))//This leaves the message on incase they are not ready to proceed
																);
																?>
													<label for="event_ssl_active">
														<?php _e('Turn off this message?', 'event_espresso'); ?>
													</label>
													<br />
													<?php
																echo select_input('event_ssl_active', $ssl_values, empty($org_options['event_ssl_active']) ? 'N' : $org_options['event_ssl_active']);
																echo '</div></td></tr>';
															}
														?>
													<tr>
														<th><label for="event_page_id">
																<?php _e('Main registration page', 'event_espresso'); ?>
																<?php apply_filters( 'espresso_help', 'registration_page_info'); ?>
															</label></th>
														<td><select name="event_page_id" data-placeholder="Choose a page..." class="chzn-select wide">
																<option value="0">
																<?php _e('Main page', 'event_espresso'); ?>
																</option>
																<?php parent_dropdown($default = $org_options['event_page_id']); ?>
															</select>
															<br />
															<span class="description"><?php echo sprintf(__("This page can be hidden from navigation if desired, <br />but should always contain the %s shortcode.", 'event_espresso'), '<span class="highlight">[ESPRESSO_EVENTS]</span>'); ?></span></td>
													</tr>
													<tr>
														<th><label for="return_url">
																<?php _e('Auto Return URL', 'event_espresso'); ?>
																<?php apply_filters( 'espresso_help', 'return_url_info'); ?>
															</label></th>
														<td><select name="return_url" data-placeholder="Choose a page..." class="chzn-select wide">
																<option value="0">
																<?php _e('Main page', 'event_espresso'); ?>
																</option>
																<?php parent_dropdown($default = $org_options['return_url']); ?>
															</select>
															<br />
															<span class="description"><?php echo sprintf(__("This page should hidden from your navigation,<br />but still viewable to the public (not password protected),<br />
and should always contain the %s shortcode.", 'event_espresso'), '<span class="highlight">[ESPRESSO_PAYMENTS]</span>'); ?> </span></td>
													</tr>
													<tr>
														<th><label for="notify_url">
																<?php _e('Payment Notification URL', 'event_espresso'); ?>
																<?php apply_filters( 'espresso_help', 'notify_url_info'); ?>
															</label></th>
														<td><select name="notify_url" data-placeholder="Choose a page..." class="chzn-select wide">
																<option value="0">
																<?php _e('Main page', 'event_espresso'); ?>
																</option>
																<?php parent_dropdown($default = $org_options['notify_url']); ?>
															</select>
															<br />
															<span class="description"><?php echo sprintf(__("This page should hidden from your navigation, <br />but still viewable to the public (not password protected),<br /> and should always contain the %s shortcode.", 'event_espresso'), '<span class="highlight">[ESPRESSO_TXN_PAGE]</span>'); ?></span></td>
													</tr>
													<tr>
														<th><label for="cancel_return">
																<?php _e('Cancel Return URL', 'event_espresso'); ?>
															</label></th>
														<td><select name="cancel_return" data-placeholder="Choose a page..." class="chzn-select wide">
																<?php apply_filters( 'espresso_help', 'cancel_return_info'); ?>
																<option value="0">
																<?php _e('Main page', 'event_espresso'); ?>
																</option>
																<?php parent_dropdown($default = $org_options['cancel_return']); ?>
															</select>
															<br />
															<span class="description">
															<?php _e('This should be a page on your website that contains a payment cancelled message. <br />No short tags are needed and should hidden from your navigation, <br />but still viewable to the public (not password protected.)', 'event_espresso'); ?>
															</span></td>
													</tr>
														</tbody>
													
												</table>
												<p>
													<input class="button-primary" type="submit" name="Submit" value="<?php _e('Save Options', 'event_espresso'); ?>" id="save_organization_saetting_2" />
												</p>
											</div>
										</div>
									</div>
								</div>
							</li>
							<li>
								<div class="metabox-holder">
									<div class="postbox">
										<div title="Click to toggle" class="handlediv"><br />
										</div>
										<h3 class="hndle">
											<?php _e('Email Settings', 'event_espresso'); ?>
										</h3>
										<div class="inside">
											<div class="padding"><a name="email-settings" id="email-settings"></a>
												<h4>
													<?php _e('Payment Confirmation Email:', 'event_espresso'); ?>
												</h4>
												<table class="form-table">
													<tbody>
														<tr>
															<th><label for="default_mail">
																	<?php _e('Send payment confirmation emails?', 'event_espresso'); ?>
																</label></th>
															<td><?php echo select_input('default_mail', $values, $org_options['default_mail']);?></td>
														</tr>
														<tr>
															<th><label for="payment_subject">
																	<?php _e('Email Subject:', 'event_espresso'); ?>
																</label></th>
															<td><input id="payment_subject" name="payment_subject" size="50" class="regular-text" type="text" value="<?php echo stripslashes_deep($org_options['payment_subject']); ?>" /></td>
														</tr>
														<tr>
															<td colspan="2"><div class="visual-toggle">
																	<p><a class="toggleVisual">
																		<?php _e('Visual', 'event_espresso'); ?>
																		</a> <a class="toggleHTML">
																		<?php _e('HTML', 'event_espresso'); ?>
																		</a></p>
																</div>
																<div id="payment-conf-email" class="postbox">
																	<textarea class="theEditor std-textarea" id="payment_message" name="payment_message"><?php echo espresso_admin_format_content($org_options['payment_message']); ?></textarea>
																	<table id="payment-confirmation-form" cellspacing="0">
																		<tbody>
																			<tr>
																				<td class="aer-word-count"></td>
																				<td class="autosave-info"><span>
																					<p></p>
																					</span></td>
																			</tr>
																		</tbody>
																	</table>
																	<p><span><a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=custom_email_info">
																		<?php _e('View Custom Email Tags', 'event_espresso'); ?>
																		</a></span></p>
																</div></td>
														</tr>
													</tbody>
												</table>
												<h4>
													<?php _e('Default Registration Confirmation Email:', 'event_espresso'); ?>
												</h4>
												<table class="form-table">
													<tbody>
														<tr>
															<th><label for="email_before_payment">
																	<?php _e('Send registration confirmation emails before payment is received?', 'event_espresso');?>
																</label></th>
															<td><?php echo select_input('email_before_payment', $values, $org_options['email_before_payment']); ?></td>
														</tr>
														<tr>
															<td colspan="2"><div class="visual-toggle">
																	<p><a class="toggleVisual">
																		<?php _e('Visual', 'event_espresso'); ?>
																		</a> <a  class="toggleHTML">
																		<?php _e('HTML', 'event_espresso'); ?>
																		</a></p>
																</div>
																<div id="reg-conf-email" class="postbox">
																	<textarea class="theEditor std-textarea"  id="reg-conf-email-mce" name="success_message"><?php echo espresso_admin_format_content($org_options['message']); ?></textarea>
																	<table id="email-confirmation-form" cellspacing="0">
																		<tbody>
																			<tr>
																				<td class="aer-word-count"></td>
																				<td class="autosave-info"><span>
																					<p></p>
																					</span></td>
																			</tr>
																		</tbody>
																	</table>
																	<p><span><a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=custom_email_info">
																		<?php _e('View Custom Email Tags', 'event_espresso'); ?>
																		</a> | <a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=custom_email_example">
																		<?php _e('Example', 'event_espresso'); ?>
																		</a> </span></p>
																</div></td>
														</tr>
													</tbody>
												</table>
												<p>
													<input class="button-primary" type="submit" name="Submit" value="<?php _e('Save Options', 'event_espresso'); ?>" id="save_organization_saetting_5" />
												</p>
											</div>
										</div>
									</div>
								</div>
								<div style="clear:both;"></div>
							</li>
							<li> </li>
							<?php
								if (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/recaptcha_form.php') || file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/optional_event_settings.php')) {

									if (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/optional_event_settings.php')) {
										echo '<li>';
										require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/optional_event_settings.php');
										echo '</li>';
									}
									
								} else {
									?>
							<li>
								<div class="metabox-holder">
									<div class="postbox">
										<div title="Click to toggle" class="handlediv"><br />
										</div>
										<h3 class="hndle">
											<?php _e('Optional Event Settings', 'event_espresso'); ?>
										</h3>
										<div class="inside">
											<div class="padding">
												<p><?php echo __('Please purchase a', 'event_espresso') ?> <a href="http://eventespresso.com/download/" target="_blank"><?php echo __('support license', 'event_espresso') ?></a> <?php echo __('to gain access to these features.', 'event_espresso') ?></p>
												<p>
													<?php _e('Additional features include:', 'event_espresso'); ?>
												</p>
												<ol>
													<li>
														<?php _e('Upcoming events widget in the admin dashboard', 'event_espresso'); ?>
													</li>
													<li>
														<?php _e('Registration limits on time slots', 'event_espresso'); ?>
													</li>
													<li>
														<?php _e('Ability to display short descriptions in the event listings', 'event_espresso'); ?>
													</li>
													<li>
														<?php _e('Custom post types for events', 'event_espresso'); ?>
													</li>
													<li>
														<?php _e('Attendee pre-approval feature', 'event_espresso'); ?>
													</li>
													<li>
														<?php _e('Event Venue/Staff Manager', 'event_espresso'); ?>
													</li>
													<li>
														<?php _e('Graphical Reports', 'event_espresso'); ?>
													</li>
												</ol>
											</div>
										</div>
									</div>
								</div>
							</li>
							<li>
								<div class="metabox-holder">
									<div class="postbox">
										<div title="Click to toggle" class="handlediv"><br />
										</div>
										<h3 class="hndle">
											<?php _e('reCAPTCHA Settings', 'event_espresso'); ?>
										</h3>
										<div class="inside">
											<div class="padding">
												<p><?php echo sprintf(__('Please purchase a %s to gain access to this feature.', 'event_espresso'), '<a href="http://eventespresso.com/download/" target="_blank">'. __('support license', 'event_espresso').'</a>'); ?> </p>
												<p> <?php echo sprintf(__('reCAPTCHA helps prevent automated abuse of your site (such as comment spam or bogus registrations) by using a %s to ensure that only humans perform certain actions.', 'event_espresso'), '<a href="http://recaptcha.net/captcha.html">CAPTCHA</a>'); ?> </p>
											</div>
										</div>
									</div>
								</div>
							</li>
							<?php
								}
								?>
						</ul>
						<input type="hidden" name="update_org" value="update" />
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- Help Pop-up Boxes -->
<?php 
include('help.php'); 
echo event_espresso_custom_email_info();?>
<script type="text/javascript" charset="utf-8">
		//<![CDATA[
		jQuery(document).ready(function() {
			postboxes.add_postbox_toggles('event_espresso');

			//Logo uploader
			var header_clicked = false;
			jQuery('#upload_image_button').click(function() {
				formfield = jQuery('#upload_image').attr('name');
				tb_show('', 'media-upload.php?type=image&amp;TB_iframe=1');
				jQuery('p.default-logo-thumb').addClass('old');
				header_clicked = true;
				return false;
			});
			window.original_send_to_editor = window.send_to_editor;

			window.send_to_editor = function(html) {
				if(header_clicked) {
					imgurl = jQuery('img',html).attr('src');
					jQuery('#' + formfield).val(imgurl);
					jQuery('#default-logo-image').append("<p><img src='"+imgurl+"' alt='' /></p>");
					header_clicked = false;
					tb_remove();
				} else {
					window.original_send_to_editor(html);
				}
			}

		});
		//]]>
	</script>
<?php
	espresso_tiny_mce();
}


