<div class="padding">

	<h4 class="ee-admin-settings-hdr">
		<?php _e('reCAPTCHA Anti-spam Settings', 'event_espresso'); ?><?php do_action('action_hook_espresso_help', 'recaptcha_info'); ?>
	</h4>

	<table class="form-table">
		<tbody>

			<tr>
				<th>
					<label for="use_captcha">
						<?php _e('Use reCAPTCHA', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input( 'use_captcha', $values, $use_captcha, 'id="admin-recaptcha-settings-slct"' ); ?>
					<p class="description">
						<?php 
							echo sprintf( 
								__( 'Used to block spam registrations. Sign up %shere%s to receive your Public and Private keys.', 'event_espresso' ),
								'<a href="http://www.google.com/recaptcha/whyrecaptcha">',
								'</a>'
							); 
						?>
					</p>
				</td>
			</tr>
			
			<tr class="admin-recaptcha-settings-tr" <?php echo $show_captcha_settings; ?>>
				<th>
					<label for="recaptcha_publickey">
						<?php _e('Public Key', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<div class="validation-notice-dv">
						<?php _e( 'The following is  a required field', 'event_espresso' );?>
					</div>
					<input type="text" name="recaptcha_publickey" class="maybe-required widefat" value="<?php echo $recaptcha_publickey; ?>" />
				</td>
			</tr>
			
			<tr class="admin-recaptcha-settings-tr" <?php echo $show_captcha_settings; ?>>
				<th>
					<label for="recaptcha_privatekey">
						<?php _e('Private Key', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<div class="validation-notice-dv">
						<?php _e( 'The following is  a required field', 'event_espresso' );?>
					</div>
					<input type="text" name="recaptcha_privatekey" class="maybe-required widefat" value="<?php echo $recaptcha_privatekey; ?>" />
				</td>
			</tr>
		</tbody>
	</table>

	<h4 class="ee-admin-settings-hdr">
		<?php _e('reCAPTCHA Appearance', 'event_espresso'); ?>
	</h4>
				
	<table class="form-table">
		<tbody>

			<tr class="admin-recaptcha-settings-tr" <?php echo $show_captcha_settings; ?>>
				<th>
					<label for="recaptcha_theme">
						<?php _e('Theme', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input( 'recaptcha_theme', $recaptcha_theme_options, $recaptcha_theme ); ?>
				</td>
			</tr>
			
			<tr class="admin-recaptcha-settings-tr" <?php echo $show_captcha_settings; ?>>
				<th>
					<label for="recaptcha_language">
						<?php _e('Language', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input( 'recaptcha_language', $recaptcha_language_options, $recaptcha_language ); ?>
				</td>
			</tr>
			
			<tr class="admin-recaptcha-settings-tr" <?php echo $show_captcha_settings; ?>>
				<th>
					<label for="recaptcha_width">
						<?php _e('Width', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input name="recaptcha_width" type="text" class="small-text" value="<?php echo $recaptcha_width; ?>" size="5" maxlength="6" />
				</td>
			</tr>
			
		</tbody>
	</table>
</div>
