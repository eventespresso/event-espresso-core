<?php

function event_espresso_manage_maps()	{
global $wpdb, $org_options;
	
		

?>

<div id="configure_event_maps_form" class="wrap meta-box-sortables ui-sortable clearfix">
  
 <div id="icon-options-event" class="icon32"> </div>
 <h2>
    <?php _e('Event Espresso - Event Map Settings','event_espresso'); ?>
 </h2>
	<?php do_action('admin_notices')?>
 <!-- include right sidebar  -->
		
 <div id="poststuff" class="metabox-holder has-right-sidebar">
	<?php event_espresso_display_right_column(); ?>
		<div id="post-body">
			<div id="post-body-content">  
 
 <!-- begin left column metaboxes  -->
 			<div class="meta-box-sortables ui-sortables">
					<form class="espresso_form" method="post" action="<?php echo $_SERVER['REQUEST_URI']?>">
					
  <!-- #### Start Gmap settings  #### -->
						<div class="metabox-holder">
								<div class="postbox">
									<div title="Click to toggle" class="handlediv"><br /></div>
									<h3 class="hndle">
											<?php _e('Events Maps Settings ', 'event_espresso'); ?>
									</h3>
									<div class="inside">
										<div class="padding">  
             

            
            
											<?php
											if (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/templates/event_gmaps_settings.php')) {
												echo '<ul id="event-gmap-settings">';
												require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/templates/event_gmaps_settings.php');
												echo '</ul>';
											}
											?>

             </form>
        
											 </div><!-- / .padding -->
										 </div><!-- / .inside -->
									 </div><!-- / .postbox -->
								 </div><!-- / .metabox-holder -->        
    <!-- #### end general map config settings #### -->
    
    <!-- #### Map Shortcode examples #### -->   
								<div class="metabox-holder">
									<div class="postbox">
										<div title="Click to toggle" class="handlediv"><br /></div>
										<h3 class="hndle">
												<?php _e('Map Shortcodes ', 'event_espresso'); ?>
										</h3>
										<div class="inside">
											<div class="padding">    
           <p class="section-heading"><?php _e('Example map shortcodes ', 'event_espresso') ?><a class="thickbox"  href="#TB_inline?height=400&amp;width=500&amp;inlineId=map_shortcode_info" target="_blank"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/question-frame.png" width="16" height="16" alt="" /></a></p>  
            
            
              <ul id="event_espresso-map-shortcodes">

														<li>Map shortcode examples - or display in thickbox?</li>

              </ul>

            </form>
											</div><!-- / .padding -->
										</div><!-- / .inside -->
									</div><!-- / .postbox -->
								</div><!-- / .metabox-holder -->    
    <!-- #### end map shortcodes examples #### -->


					
					
																			    
	<?php  include_once('admin-files/templates/template_help.php'); ?>
     	</form>
					</div><!-- / .meta-box-sortables -->
    </div><!-- / #post-body-content -->
			</div><!-- / #post-body -->
		</div><!-- / #poststuff -->
	</div><!-- / #wrap -->
	
	<script type="text/javascript" charset="utf-8">
		//<![CDATA[
		jQuery(document).ready(function() {
			postboxes.add_postbox_toggles('template_map_confg');

		});
		//]]>
	</script> 
<?php
return;
} // close function 'event_espresso_manage_maps'








	