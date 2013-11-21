
<div class="padding">

	<h2 class="ee-admin-settings-hdr"><?php _e('Countries and States / Provinces', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('country_select');?></h2>
	<table class="form-table">
		<tbody>
			<?php echo EEH_Form_Fields::generate_form_input( $countries ); ?>
		</tbody>
	</table>
	<br/>
	<!--<p class="description">
		<?php echo "\t" . __('Select a country from the dropdown to view and/or edit it\'s settings. These will be used for populating country and state/province dropdown select boxes on forms during the registration process.<br/> To change the currency symbol displayed on the site, please use the country selector in the <b>Contact Information</b> secton on the <b>Your Organization</b> tab.', 'event_espresso'); ?>
	</p>
	<br/>
			-->
	<div id="country-details-settings-dv">
		<h2 class="ee-admin-settings-hdr"><?php _e('Country Details', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('country_details');?></h2>
		<div id="country-details-dv"><?php  echo $country_details_settings; ?></div>
	</div>
	
	<div id="country-states-settings-dv">
		<h2 class="ee-admin-settings-hdr"><?php _e( 'States / Provinces', 'event_espresso' );?> <?php echo EEH_Template::get_help_tab_link('country_states');?></h2>
		<div id="country-states-dv"><?php  echo $country_states_settings; ?></div>
	</div>
	
	<div class="clear"></div>
	
</div>

