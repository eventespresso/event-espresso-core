<?php

//Displays reCAPTCHA form
function espresso_recaptcha_options_display() {
	global $org_options;
	$values = array(
			array('id' => false, 'text' => __('No', 'event_espresso')),
			array('id' => true, 'text' => __('Yes', 'event_espresso'))
	);
	$show = !empty($org_options['use_captcha']) ? 'style="display:block"': '';
	?>

	<h4 class="hndle"><?php _e('Anti-spam Settings', 'event_espresso'); ?></h4>
	<table class="form-table">
		<tbody>
			<tr>
				<td colspan="2">
					<strong><?php _e('reCAPTCHA Settings', 'event_espresso'); ?> <?php apply_filters('filter_hook_espresso_help', 'recaptcha_info'); ?></strong>
				</td>
			</tr>
			<tr>
				<th>
					<label for="use_captcha"><?php _e('Use reCAPTCHA', 'event_espresso'); ?></label>
				</th>
				<td>
					<?php echo select_input( 'use_captcha', $values, !empty($org_options['use_captcha']) ? $org_options['use_captcha'] : false, 'id="admin-recaptcha-settings-slct"' ); ?>
					<span class="description"><?php _e('Used to block spam registrations. Sign up', 'event_espresso'); ?> <a href="http://www.google.com/recaptcha/whyrecaptcha"><?php _e('here', 'event_espresso'); ?></a> <?php _e('to receive your Public and Private keys.', 'event_espresso'); ?></span>
				</td>
			</tr>
			<tr class="admin-recaptcha-settings-tr" <?php echo $show; ?>>
				<th>
					<label for="recaptcha_publickey">
					<?php _e('Public Key', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<div class="validation-notice-dv"><?php _e( 'The following is  a required field', 'event_espresso' );?></div>
					<input type="text" name="recaptcha_publickey" class="maybe-required regular-text" value="<?php if (isset($org_options['recaptcha_publickey'])) echo $org_options['recaptcha_publickey']; ?>" />
				</td>
			</tr>
			<tr class="admin-recaptcha-settings-tr" <?php echo $show; ?>>
				<th>
					<label for="recaptcha_privatekey"><?php _e('Private Key', 'event_espresso'); ?></label>
				</th>
				<td>
					<div class="validation-notice-dv"><?php _e( 'The following is  a required field', 'event_espresso' );?></div>
					<input type="text" name="recaptcha_privatekey" class="maybe-required regular-text" value="<?php if (isset($org_options['recaptcha_privatekey'])) echo $org_options['recaptcha_privatekey']; ?>" />
				</td>
			</tr>
			<tr class="admin-recaptcha-settings-tr" <?php echo $show; ?>>
				<td colspan="2">
					<strong><?php _e('reCAPTCHA Look &amp; Feel', 'event_espresso'); ?></strong>
				</td>
			</tr>
			<tr class="admin-recaptcha-settings-tr" <?php echo $show; ?>>
				<th>
					<label for="recaptcha_width"><?php _e('Width', 'event_espresso'); ?></label>
				</th>
				<td>
					<input name="recaptcha_width" type="text" class="regular-text" value="<?php echo!isset($org_options['recaptcha_width']) || $org_options['recaptcha_width'] == '' ? '500' : $org_options['recaptcha_width']; ?>" size="5" maxlength="6" />
				</td>
			</tr>
			<tr class="admin-recaptcha-settings-tr" <?php echo $show; ?>>
				<th>
					<label for="recaptcha_theme"><?php _e('Theme', 'event_espresso'); ?></label>
				</th>
				<td>
					<?php
					$theme_values = array(
							array('id' => 'red', 'text' => __('Red', 'event_espresso')),
							array('id' => 'white', 'text' => __('White', 'event_espresso')),
							array('id' => 'blackglass', 'text' => __('Blackglass', 'event_espresso')),
							array('id' => 'clean', 'text' => __('Clean', 'event_espresso'))
					);
					echo select_input('recaptcha_theme', $theme_values, isset($org_options['recaptcha_theme']) ? $org_options['recaptcha_theme'] : '');
					?>
				</td>
			</tr>
			<tr class="admin-recaptcha-settings-tr" <?php echo $show; ?>>
				<th>
					<label for="recaptcha_language"><?php _e('Language', 'event_espresso'); ?></label>
				</th>
				<td>
					<?php
					$language_values = array(
							array('id' => 'en', 'text' => __('English', 'event_espresso')),
							array('id' => 'es', 'text' => __('Spanish', 'event_espresso')),
							array('id' => 'nl', 'text' => __('Dutch', 'event_espresso')),
							array('id' => 'fr', 'text' => __('French', 'event_espresso')),
							array('id' => 'de', 'text' => __('German', 'event_espresso')),
							array('id' => 'pt', 'text' => __('Portuguese', 'event_espresso')),
							array('id' => 'ru', 'text' => __('Russian', 'event_espresso')),
							array('id' => 'tr', 'text' => __('Turkish', 'event_espresso'))
					);
					echo select_input('recaptcha_language', $language_values, isset($org_options['recaptcha_language']) ? $org_options['recaptcha_language'] : '');
					?>
				</td>
			</tr>
			<tr>
				<th></th>
				<td></td>
			</tr>
		</tbody>
	</table>
	<?php
}

add_action('action_hook_espresso_recaptcha_options_display', 'espresso_recaptcha_options_display');