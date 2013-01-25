<?php

//Template customization
function espresso_template_customization_instructions() {
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
					<?php do_action('action_hook_espresso_help', 'custom_templates_info'); ?>
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

