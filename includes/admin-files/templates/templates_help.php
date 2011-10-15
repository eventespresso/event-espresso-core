<div style="display: none;">

    <?php ########## help box ########## ?>
    <div id="enable_styles_info" class="pop-help" >
        <div class="TB-ee-frame">
    			<h2><?php _e('Enable Built In Styles', 'event_espresso'); ?></h2>
        	<p>
       		 <?php _e('Enabling Styles tells Event Espresso to use it\'s built in stylesheets for styling the template files.', 'event_espresso'); ?>
          </p>
    				<p><?php _e('If this option is enabled Event Espresso first looks in the /wp-content/uploads/espresso/templates folder for a copy of the stylesheet, if not found it then uses the copy found in the main templates folder.', 'event_espresso'); ?></p>
    				<p><?php _e('If event espresso uses the original copy of the stylesheet you will have the option to select from a range of alternative sheets, these additional stylesheets however are not available if you have copied the default stylesheet to the uploads folder to customize yourself.', 'event_espresso'); ?></p>
          <p>
    					<em class="important">
             <b><?php _e('ATTENTION:', 'event_espresso'); ?></b><br />
                                                                
    					<?php _e('If you want to modify and customize the styles of your template pages you must move a copy of the 
    									event_espresso_styles.css to the /wp-content/uploads/espresso/templates folder (if /espresso/templates does 
    									not exist you may need to create it manually. Keeping your modification in this folder ensures that your styles are not overwritten when upgrading EE.) ', 'event_espresso'); ?>
    					</em>
    				</p>
					</div>
    </div>
			<?php ########## help box ########## ?>
			<div id="alternative_styles_info" class="pop-help" >
       <div class="TB-ee-frame">
    		<h2><?php _e('Select Alternative stylesheets', 'event_espresso'); ?></h2>
						<?php if($disabled) : ?>
    			<em class="important">
							<?php _e('You currently either have <i>Enable Built in style sheets</i> disabled or have a copy of the default espresso stylesheet copied to your uploads folder, and the alternative stylesheets selections are therefore disabled.', 'event_espresso'); ?>
    			</em>	
						<?php endif; ?>					
        	<p><?php _e('These two drop down options provide a choice of stylesheets with various stylings.', 'event_espresso'); ?></p>
    			<p><?php _e('These options are available as long as you have not copied the main stylesheet <i>event_espresso_styles.css</i> to the uploads folder to customize yourself.', 'event_espresso'); ?></p>
    			<p><?php _e('By default the general espresso stylesheet will be loaded if you have selected <i>Yes</i> in the <i>Enable built in style sheets</i> option, You may then choose to select from one of the alternative base stylesheets along with an optional sheet to select a color scheme.', 'event_espresso'); ?></p>
						<p><?php _e('These selections replace the deafault espresso stylesheet and offer enhanced styling for your event pages details', 'events_espreso') ?></p>
          
					</div>
    </div>
				
			<?php ########## help box ########## ?>
			<div id="gmaps_info" class="pop-help" >
       <div class="TB-ee-frame" style="height:500px; overflow-y: scroll;">
    		<h2><?php _e('Configuring the Google maps options', 'event_espresso'); ?></h2>			
       
							<p><?php _e('The map options allow you to configure how your event map is displayed. You may configure your events lists and event registration pages independently, so, for example, on a registration page you could set a much larger overall size.', 'event_espresso'); ?></p>
    			<p><?php _e('For an event to display a Gmap you must have enabled it to on the event edit or create event pages in the venue box. This allows you to select which events you would like to display with a map.', 'event_espresso'); ?></p>
						 <p><?php _e('Below is a brief explanation of the options available.', 'events_espreso') ?></p>
							<ul>
							  <li><b><?php _e('Set Map Width', 'event_espresso') ?></b><br />
									<?php _e('You may set a pixel width for your map, this is set as a simple numeric value and should not contain any other charecters - if a value is not set default ones are used, for list events the maps are set to 200px, for registration page single maps 500px. ', 'event_espresso'); ?></li>
									<li><b><?php _e('Set Map Height', 'event_espresso') ?></b><br />
									<?php _e('The same as setting the width above but for the map height - maps work best set to equal values i.e square dimensions.', 'event_espresso'); ?>
									</li>
									<li><b><?php _e('Set Map Zoom level: Range: 1 - 19', 'event_espresso') ?></b><br />
									<?php _e('Zoom level is the level of detail that is shown when the map first renders a low value means you zoom out and see a wider area, a higher value means that you zoom in and see the actual address in finer detail, a default value of 12 is set as a good base value.', 'event_espresso'); ?>
									</li>
									<li><b><?php _e('Set Map Navigation Overlay', 'event_espresso') ?></b><br />
									<?php _e('The navigation overlay are the controls for panning and zooming the map.', 'event_espresso'); ?>
									</li>
									<li><b><?php _e('Force Map Navigation Small', 'event_espresso') ?></b><br />
									<?php _e('Force map navigation tells google to only load the smaller map overlay regardless of map size - normally if you have map navigation enabled on a map Google sets various options according to the size of the map, if you want to stop this happening you set this option to yes.', 'event_espresso'); ?>
									</li>
									<li><b><?php _e('Set Map Type Control', 'event_espresso') ?></b><br />
									<?php _e('The map type control is the options bar google sets in the top right corner this can take the form of a dropdown or horizontal bar.', 'event_espresso'); ?>
									</li>
									<li><b><?php _e('Set Map Alignment', 'event_espresso') ?></b><br />
									<?php _e('Alignment alows you to move the map left, center, or right within whatever parent event structure you have, please note though this option is dependent on your themes layout as to whether it will work as expected. The default alignment is to the left.', 'event_espresso'); ?>
									</li>
							
							</ul>
          
					</div>
    </div>				

</div>