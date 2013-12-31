<?php
function site_license_key_info_help_tab_html() {
?>
	<h2>
		<?php _e('Site License Key', 'event_espresso'); ?>
	</h2>
	<p>
		<?php _e("Insert your license key here to benefit from one click updates.", 'event_espresso'); ?>
	</p>
	<p>
		<?php _e('Please visit your account page on the <a href="http://eventespresso.com/">Event Espresso website</a> to manage your site license key.', 'event_espresso'); ?>
	</p>
	<p class="ee-attention">
		<?php _e('If this is a Development or Test site, <strong>DO NOT</strong> enter your Support License Key. Save it for the Live Production Site, otherwise you will unnecessarily run into issues with needing to have your Key reset.', 'event_espresso'); ?>
	</p>		
<?php
}

function contact_info_info_help_tab_html() {
?>
	<h2>
		<?php _e('Contact Information', 'event_espresso'); ?>
	</h2>
	<p>
		<?php _e("It is important that you fill out this section and make sure the details are correct. These settings tell Event Espresso about yoru organization and will be used throughout the system.", 'event_espresso'); ?>
	</p>
<?php
}

function organization_logo_info_help_tab_html() {
?>
	<h2>
		<?php _e('Company Logo', 'event_espresso'); ?>
	</h2>
	<p>
		<?php _e("Add your logo here to enable branding of your invoices, tickets, certificates and payment templates.", 'event_espresso'); ?> 
	</p>
	<p>
		<?php _e("We recommend that the image be 400px or less.", 'event_espresso'); ?>
	</p>
<?php
}

function social_links_info_help_tab_html() {
?>
	<h2>
		<?php _e('Social Links', 'event_espresso'); ?>
	</h2>
	<p>
		<?php _e("These URLs can be displayed automagically within your emails (using shortcodes) and front-end templates (using template tags).", 'event_espresso'); ?> 
	</p>
<?php
}