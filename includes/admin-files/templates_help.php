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



</div>