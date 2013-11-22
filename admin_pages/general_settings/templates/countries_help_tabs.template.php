<?php
function country_select_info_help_tab_html() {
?>
	<h2>
		<?php _e('Select Your Country', 'event_espresso'); ?>
	</h2>
	<p>
		<?php echo __('Add the country where your business is located.', 'event_espresso'); ?>
	</p>
	
<?php
}

function country_details_info_help_tab_html() {
?>
	<h2>
		<?php _e('Country Details', 'event_espresso'); ?>
	</h2>
	<p>
		<?php echo __('Here you can fine tune currency and contact data for your own country.', 'event_espresso'); ?>
	</p>
	
<?php
}


function country_states_info_help_tab_html() {
?>
	<h2>
		<?php _e('States / Provinces', 'event_espresso'); ?>
	</h2>
	<p>
		<?php echo __('Used in certain areas of the plugin, here you can define what states/provinces will be displayed in case you do not do business in certain areas.', 'event_espresso'); ?>
	</p>
	
<?php
}
