<?php
/** @var EE_Question_Form_Input $countries */
/** @var string $country_details_settings */
/** @var string $country_states_settings */
?>
<div class="padding">

	<h2 class="ee-admin-settings-hdr"><?php _e('Countries and States/Provinces', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('country_select_info');?></h2>
	<table class="form-table">
		<tbody>
        <?php echo EEH_Form_Fields::generate_form_input( $countries ); ?>
		</tbody>
	</table>
	<br/>
	<p>
        <?php _e('The country that is selected above will populate the Country Details settings and the options for States/Provinces. This information will be used throughout Event Espresso including for registration purposes and how currency is displayed. If you make a change to the country on this page, it is important that you also update your Contact Information on the Your Organization tab.', 'event_espresso'); ?>
	</p>
	<div id="country-details-settings-dv">
		<h2 class="ee-admin-settings-hdr"><?php _e('Country Details', 'event_espresso'); ?> <?php echo EEH_Template::get_help_tab_link('country_details_info');?></h2>
		<div id="country-details-dv"><?php  echo $country_details_settings; ?></div>
	</div>

	<div id="country-states-settings-dv">
		<h2 class="ee-admin-settings-hdr"><?php _e( 'States/Provinces', 'event_espresso' );?> <?php echo EEH_Template::get_help_tab_link('country_states_info');?></h2>
		<div id="country-states-dv"><?php  echo $country_states_settings; ?></div>
	</div>

	<div class="clear"></div>

</div>

