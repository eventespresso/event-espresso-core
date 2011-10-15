<?php 
function event_espresso_manage_templates() {
	global $wpdb, $org_options;
	//print_r($org_options);
    if (isset($_POST['update_org'])) {			
        $org_options['display_description_on_multi_reg_page'] = empty($_POST['display_description_on_multi_reg_page']) ? '' : $_POST['display_description_on_multi_reg_page'];
        $org_options['display_short_description_in_event_list'] = $_POST['display_short_description_in_event_list'];
        $org_options['display_address_in_event_list'] = $_POST['display_address_in_event_list'];
        $org_options['display_address_in_regform'] = $_POST['display_address_in_regform'];
								$org_options['thunbnail_popup_lists'] = $_POST['thunbnail_popup_lists'];
					   $org_options['use_custom_post_types'] = $_POST['use_custom_post_types'];
					   $org_options['enable_default_style'] = $_POST['enable_default_style'];
					   $org_options['selected_style'] = $_POST['selected_style'];					
					   $org_options['style_color'] = $_POST['style_color'];
					   // org_options Gmaps reg page
					   $org_options['ee_map_width_single'] = $_POST['ee_map_width_single'];
								$org_options['ee_map_height_single'] = $_POST['ee_map_height_single'];
								$org_options['ee_map_zoom_single'] = $_POST['ee_map_zoom_single'];
								$org_options['ee_map_nav_display_single'] = $_POST['ee_map_nav_display_single'];
								$org_options['ee_map_nav_size_single'] = $_POST['ee_map_nav_size_single'];
								$org_options['ee_map_type_control_single'] = $_POST['ee_map_type_control_single'];
								$org_options['ee_map_align_single'] = $_POST['ee_map_align_single'];
								//org_options Gmaps list pages
								$org_options['ee_map_width'] = $_POST['ee_map_width'];
								$org_options['ee_map_height'] = $_POST['ee_map_height'];
								$org_options['ee_map_zoom'] = $_POST['ee_map_zoom'];
								$org_options['ee_map_nav_display'] = $_POST['ee_map_nav_display'];
								$org_options['ee_map_nav_size'] = $_POST['ee_map_nav_size'];
								$org_options['ee_map_type_control'] = $_POST['ee_map_type_control'];
								$org_options['ee_map_align'] = $_POST['ee_map_align'];
									
					
					update_option('events_organization_settings', $org_options);
        echo '<div id="message" class="updated fade"><p><strong>' . __('Template details saved.', 'event_espresso') . '</strong></p></div>';
    }
    $org_options = get_option('events_organization_settings');
			
			$values = array(
				array('id' => 'Y', 'text' => __('Yes', 'event_espresso')),
				array('id' => 'N', 'text' => __('No', 'event_espresso'))
			);	
	 //echo $org_options['ee_map_type_control'];
		// checks value of calendar thumb size to set radio inputs
/*		function espresso_is_selected($name) {
   global $org_options;
   $input_val = $name;
   if ($org_options['ee_map_type_control'] !== $input_val || $org_options['ee_map_type_control_single'] !== $input_val)
   return false;
   else
   echo  'checked="checked"';
   return; 
  }		  */
	
	?>
    <div class="wrap">
        <div id="icon-options-event" class="icon32"> </div>
        <h2>
    <?php _e('Event Template Settings', 'event_espresso'); ?>
        </h2>
        <div id="poststuff" class="metabox-holder has-right-sidebar">
    <?php event_espresso_display_right_column(); ?>
            <div id="post-body">
                <div id="post-body-content">
									<form id="template-settings-form" class="espresso_form" method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>">
										<div class="meta-box-sortables ui-sortables">
										<?php #### metaboxes #### ?>
										
										<div class="metabox-holder">
											<div class="postbox template-gen-settings">
											<div title="Click to toggle" class="handlediv"><br /></div>
												<h3 class="hndle">
													<?php _e('Template Options', 'event_espresso'); ?>
												</h3>
												<div class="inside">
													<div class="padding">
														<?php
															if (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/templates/event_template_settings.php')) {
																echo '<ul id="event-layout-settings">';
																	require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/templates/event_template_settings.php');
																echo '</ul>';
															}
														?>	
														<p class="submit-buttons">
															<input class="button-primary" type="submit" name="Submit" value="<?php _e('Save Options', 'event_espresso'); ?>" id="save_organization_setting_1" />
														</p>			
													</div><!-- / .padding -->
												</div><!-- / .inside -->
											</div><!-- / .postbox -->
										</div><!-- / .metabox-holder -->
										
										<div class="metabox-holder">
											<div class="postbox template-gen-settings">
											<div title="Click to toggle" class="handlediv"><br /></div>
												<h3 class="hndle">
													<?php _e('Templates Google Map Options', 'event_espresso'); ?>
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
														<p class="submit-buttons">
															<input class="button-primary" type="submit" name="Submit" value="<?php _e('Save Options', 'event_espresso'); ?>" id="save_organization_setting_1" />
														</p>			
													</div><!-- / .padding -->
												</div><!-- / .inside -->
											</div><!-- / .postbox -->
										</div><!-- / .metabox-holder -->										
										
										<div class="metabox-holder">
											<div class="postbox">
											<div title="Click to toggle" class="handlediv"><br /></div>
												<h3 class="hndle">
													<?php _e('Template Stylesheet Options', 'event_espresso'); ?>
												</h3>
												<div class="inside">
													<div class="padding">
														<ul id="ee-styles">
															<li>
																<label>
																	<?php _e('Enable built in style sheets?','event_espresso'); ?>
																</label>
																	<?php echo select_input('enable_default_style', $values, isset($org_options['enable_default_style']) ? $org_options['enable_default_style'] : ''); ?> 
																<a class="thickbox"  href="#TB_inline?height=400&width=500&inlineId=enable_styles_info" target="_blank"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/question-frame.png" width="16" height="16" /></a>
															</li>
															
															<li>
																<?php include(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/templates/event_styles_settings.php');  ?>
															</li>															
														</ul>
														<p>
															<input class="button-primary" type="submit" name="Submit" value="<?php _e('Save Options', 'event_espresso'); ?>" id="save_organization_setting_2" />
														</p>			
													</div><!-- / .padding -->
												</div><!-- / .inside -->
											</div><!-- / .postbox -->
										</div><!-- / .metabox-holder -->
	
								<?php	if (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/templates/template_files.php')) { ?>
                    <h2><?php  _e('Developers Only', 'event_espresso') ?> </h2><hr />
                                    
                                   
										<div class="metabox-holder">
											<div class="postbox">
											<div title="Click to toggle" class="handlediv"><br /></div>
												<h3 class="hndle">
													<?php _e('Developer templates', 'event_espresso'); ?>
												</h3>
												<div class="inside">
													<div class="padding">
														<?php	 require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/templates/template_files.php');	?>	
													</div><!-- / .padding -->
												</div><!-- / .inside -->
											</div><!-- / .postbox -->
										</div><!-- / .metabox-holder -->																				
								
								<?php } ?>	
										
										<?php #### finish metaboxes #### ?>
										
										</div><!-- / .meta-box-sortables -->
										
										<input type="hidden" name="update_org" value="update" />
										</form>
										<?php include_once('admin-files/templates/templates_help.php'); ?>
									</div><!-- / #post-body-content -->
								</div><!-- / #post-body -->
							</div><!-- / #poststuff -->
						</div><!-- / #wrap -->
							<script type="text/javascript" charset="utf-8">
							//<![CDATA[
							jQuery(document).ready(function() {
								postboxes.add_postbox_toggles('template_conf');

							}); 
							//]]>
							</script>
<?php
return;
}
