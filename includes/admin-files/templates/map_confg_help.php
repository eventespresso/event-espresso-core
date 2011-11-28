	<?php
		/**
		 * Configuring the Google maps options Help Box
		 */
	?>
<div style="display:none;">
	<div id="gmaps_info" class="pop-help" >
		<div class="TB-ee-frame" style="height:500px; overflow-y: scroll;">
			<h2>
				<?php _e('Configuring the Google maps options', 'event_espresso'); ?>
			</h2>
			<p>
				<?php _e('The map options allow you to configure how your event map is displayed. You may configure your events lists and event registration pages independently, so, for example, on a registration page you could set a much larger overall size.', 'event_espresso'); ?>
			</p>
			<p>
				<?php _e('For an event to display a Gmap you must have enabled it to on the event edit or create event pages in the venue box. This allows you to select which events you would like to display with a map.', 'event_espresso'); ?>
			</p>
			<p>
				<?php _e('Below is a brief explanation of the options available.', 'events_espreso') ?>
			</p>
			<ul>
				<li> <strong>
					<?php _e('Set Map Width', 'event_espresso') ?>
					</strong><br />
					<?php _e('You may set a pixel width for your map, this is set as a simple numeric value and should not contain any other charecters - if a value is not set default ones are used, for list events the maps are set to 200px, for registration page single maps 500px. ', 'event_espresso'); ?>
				</li>
				<li> <strong>
					<?php _e('Set Map Height', 'event_espresso') ?>
					</strong><br />
					<?php _e('The same as setting the width above but for the map height - maps work best set to equal values i.e square dimensions.', 'event_espresso'); ?>
				</li>
				<li> <strong>
					<?php _e('Set Map Zoom level: Range: 1 - 19', 'event_espresso') ?>
					</strong><br />
					<?php _e('Zoom level is the level of detail that is shown when the map first renders a low value means you zoom out and see a wider area, a higher value means that you zoom in and see the actual address in finer detail, a default value of 12 is set as a good base value.', 'event_espresso'); ?>
				</li>
				<li> <strong>
					<?php _e('Set Map Navigation Overlay', 'event_espresso') ?>
					</strong><br />
					<?php _e('The navigation overlay are the controls for panning and zooming the map.', 'event_espresso'); ?>
				</li>
				<li> <strong>
					<?php _e('Keep Map Navigation Small', 'event_espresso') ?>
					</strong><br />
					<?php _e('Keep map navigation small tells google to only load the smaller map overlay regardless of map size - Google changes various options according to the size of a map, if you want to stop this happening you can set this option to yes.', 'event_espresso'); ?>
				</li>
				<li> <strong>
					<?php _e('Set Map Type Control', 'event_espresso') ?>
					</strong><br />
					<?php _e('The map type control is the options bar google sets in the top right corner this can take the form of a dropdown or horizontal bar.', 'event_espresso'); ?>
				</li>
				<li> <strong>
					<?php _e('Set Map Alignment', 'event_espresso') ?>
					</strong><br />
					<?php _e('Alignment alows you to move the map left, center, or right within whatever parent event structure you have, please note though this option is dependent on your themes layout as to whether it will work as expected. The default alignment is to the left.', 'event_espresso'); ?>
				</li>
				<li> <strong>
					<?php _e('Use map in template files ( No Shortcodes)', 'event_espresso') ?>
					</strong><br />
					<?php _e('Select this option to enable your event map in the template file - this option is used if you are not using venue shortcodes and want map display activated in either event list pages or registration pages.', 'event_espresso') ?>
				</li>
			</ul>
		</div>
	</div>
</div>