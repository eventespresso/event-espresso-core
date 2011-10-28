<div style="display: none;">

    <?php ########## help box ########## ?>
    <div id="display-on-pages" class="pop-help" >
     <div class="TB-ee-frame">
    			
							<h2><?php _e('Display Calendar styles on specific pages', 'event_espresso'); ?></h2>
        <p>
       		 <?php _e('This tells the plugin to load the calendar CSS file on these pages. This should be a comma seperated list of page ids. The default value is "0", meaning the CSS will load on all pages of your website. The list of page ids will need to be updated if you add/delete/move your calendar page(s).', 'event_espresso'); ?>
        </p>
    				<p><?php _e('Only loading styles on specific pages avoids unnecessary requests for files from the server that are not required for that pages style and layout.', 'event_espresso'); ?></p>
								<p><?php _e('<em class="important">If you are uncertain on what this setting does, please do not modify the default value.</em>', 'event_espresso'); ?></p>

					</div>
    </div>
			<?php ########## help box ########## ?>
			
    <?php ########## help box ########## ?>
    <div id="display-where" class="pop-help" >
     <div class="TB-ee-frame">
    			
							<h2><?php _e('Display calendar on which type of page?', 'event_espresso'); ?></h2>
        <p>
       		 <?php _e('<b>Registration Page (default)</b> -- Calendar links go to the Event Espresso registration page for the event. Use this if you are not using Custom Post Types.', 'event_espresso'); ?>
        </p>
    				<p><?php _e('<b>Post</b> -- Calendar links go to the Event Post for the event. Use this option <em><b>only</b></em> if you have enabled Custom Post Types.', 'event_espresso'); ?></p>

					</div>
    </div>
			<?php ########## help box ########## ?>			
			
    <?php ########## help box ########## ?>
    <div id="calendar-thumb-sizes" class="pop-help" >
     <div class="TB-ee-frame">
    			
							<h2><?php _e('Calendar thumbnail sizing', 'event_espresso'); ?></h2>
        <p>
       		 <?php _e('Using these options allow you to set a general size that your thumbnails will be displayed at on your calendar.', 'event_espresso'); ?>
        </p>
    				<p><?php _e('<em>For best results try to select an image that has a greater size (dimensions) than your selected display size.</em>', 'event_espresso'); ?></p>
    				<p><?php _e('<em>N.B. On certain displays, such as a Day view these thumbnail sizes might be overridden to reduce the size for best display of events falling on the same day.</em>', 'event_espresso'); ?></p>

					</div>
    </div>
			<?php ########## help box ########## ?>
   
   <?php ########## help box ########## ?>
    <div id="show-event-times" class="pop-help" >
     <div class="TB-ee-frame">
    			
							<h2><?php _e('Display event times', 'event_espresso'); ?></h2>
        <p>
       		 <?php _e('This option allows you to show the event start and finish times.', 'event_espresso'); ?>
        </p>
    				<p><?php _e('The times are displayed below the event title.', 'event_espresso'); ?></p>
    				<p><?php _e('You may select the format of the time display using the radio button options, or you may set your own custom format explained in the link below the input field.', 'event_espresso'); ?></p>

					</div>
    </div>   

    <?php ########## help box ########## ?>
    <div id="enable-categories" class="pop-help" >
     <div class="TB-ee-frame">
    			
							<h2><?php _e('Enable CSS classes for Categories', 'event_espresso'); ?></h2>
        <p>
       		 <?php _e('Enabling this option will set the events category name as a CSS class on the event element', 'event_espresso'); ?>
        </p>
    				<p><?php _e('You may use these classes to apply individual styles based on the events category e.g a separate background color for each event category.', 'event_espresso'); ?></p>
    				<p><?php _e('', 'event_espresso'); ?></p>

					</div>
    </div>			
</div><!-- / div display:none; -->
