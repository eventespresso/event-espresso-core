<div style="display:none">
<?php #### help dialogue box #### ?>
<div id="venue_locale" >
<div class="TB-ee-frame">
<h2><?php _e('Venue Locale/Region', 'event_espresso'); ?></h2>
	  <p><?php _e('This can be used to group venues together by locales/regions.', 'event_espresso'); ?></p>
				<p><?php _e('Once you have created a locale in the <a href="admin.php?page=event_locales"> Manage Locales/Regions</a> page it will be available to select on the \'Add a Venue\' page', 'event_espresso')?></p>
</div>			
</div>
<?php #### end help #### ?>

<?php #### help dialogue box #### ?>
<div id="venue_gmap">
<div class="TB-ee-frame">
<h2><?php _e('Venue Manager Google Maps', 'event_espresso'); ?></h2>
	<p><?php _e('Two options are provided for displaying Google maps from your venue addresses.', 'event_espresso'); ?></p>
				<p><?php _e('The first option will attempt to generate a map from the address you enter for your venue, if Google is able to locate your address it will be displayed after you save and  view the venue edit page for the venue, having selected the Yes checkbox option.', 'event_espresso')?></p>
				<p><?php _e('The second option might be useful if you need to get a more precise address or need to try and locate an address that might be different from the venue address and allows you to enter a static Google map url that you can obtain from a google map lookup.', 'event_espresso') ?></p>
	<p><?php _e('To obtain your map url you need to visit', 'event_espresso') ?> <a href="http://maps.google.com/"> Google Maps Page </a><?php _e('Using the search box you can enter an address and refine it until you get the correct address displayed', 'event_espresso') ?></p>
	<p><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/gmap-url.jpg" width="472" height="300" alt="Google copy link box" /></p>
	<p><?php _e('Onceyou have the map you want you can click on the map link top right to open a drop down box that provides a copy &amp; paste link, copy this url link into the static map url input field.', 'event_espresso') ?></p>
</div>			
</div>
<?php #### end help #### ?>

</div>