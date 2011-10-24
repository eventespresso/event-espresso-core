<?php
function add_new_event_venue(){
	global $wpdb,$current_user;
			
	$values = array(
			array('id' => 'Y', 'text' => __('Yes', 'event_espresso')),
			array('id' => 'N', 'text' => __('No', 'event_espresso'))
	);
?>
<div id="add-edit-venue" class="metabox-holder">
  <div class="postbox">
    <h3>
      <?php _e('Add a Venue','event_espresso'); ?>
    </h3>
    <div class="inside">
      <form id="venues-form" method="post" action="<?php echo $_SERVER['REQUEST_URI'];?>">
        <input type="hidden" name="action" value="add">
        <table width="100%" border="0">
          <tr>
            <td align="left" class="a">
								<ul>
                <li>
                  <label for="name">
                    <?php _e('Name','event_espresso'); ?><em title="<?php _e('This field is required', 'event_espresso') ?>"> *</em>
                  </label>
                  <input class="required venue-man-name" type="text" id="name" name="name" size="25" />
                </li>
                <li>
                  <label for="address">
                    <?php _e('Address','event_espresso'); ?>
                  </label>
                  <input type="text" id="address" name="address" size="25" />
                </li>
                <li>
                  <label for="address2">
                    <?php _e('Address 2','event_espresso'); ?>
                  </label>
                  <input type="text" id="address2" name="address2" size="25" />
                </li>
                <li>
                  <label for="city">
                    <?php _e('City','event_espresso'); ?>
                  </label>
                  <input type="text" id="city" name="city" size="25" />
                </li>
                <li>
                  <label for="state">
                    <?php _e('State','event_espresso'); ?>
                  </label>
                  <input type="text" id="state" name="state" size="25" />
                </li>
                <li>
                  <label for="zip">
                    <?php _e('Zip','event_espresso'); ?>
                  </label>
                  <input type="text" id="zip" name="zip" size="25" />
                </li>
                <li>
                  <label for="country">
                    <?php _e('Country','event_espresso');  ?>
                  </label>
                  <input type="text" id="country" name="country" size="25" />
                </li>
                <?php if( function_exists('espresso_member_data')){ 
									 ?>
                <li>
                
										<label for="locale">
                   <?php _e('Locale/Region ','event_espresso'); ?><a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=venue_locale"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL?>images/question-frame.png" width="16" height="16" /></a> 
                  </label>
								
          				<?php 
          				$sql = "SELECT * FROM ". EVENTS_LOCALE_TABLE ." ORDER BY name ASC";
          				$results = $wpdb->get_results($sql);
          				if ($wpdb->num_rows > 0) { ?>
                 
          				 <select name="locale" id="locale">
          					<?php
          					
          						foreach ($results as $result){
          							$locale_id= $result->id;
          							$name=stripslashes($result->name);
                        ?>
          						<option value="<?php echo $locale_id;?>"><?php echo $name;?></option>
                  <?php  } ?>
                  
										</select>	
										<?php }  ?>	
            			 <?php if (empty($locale_id)) { ?>
            				<p><?php _e('You have not created any locales yet. To create Locales please visit', 'event_espresso'); ?> <a href="admin.php?page=event_locales"> <?php _e('Manage Locales/Regions', 'event_espresso'); ?></a> <?php _e('page', 'event_espresso'); ?>.</p>
            			<?php } ?>
										 
										
										
 	
										
									</li>
	<?php }// end if function_exists('espresso_member_data' ?>
              </ul>
							</td>
            <td align="left" valign="top" class="b">
							<ul>
            	<li>
                  <label for="contact">
                    <?php _e('Contact','event_espresso'); ?>
                  </label>
                  <input type="text" id="contact" name="contact" size="25" />
              </li>
              <li>
                  <label for="phone">
                    <?php _e('Phone','event_espresso'); ?>
                  </label>
                  <input type="text" id="phone" name="phone" size="25" />
              </li>
              <li>
                  <label for="twitter">
                    <?php _e('Twitter','event_espresso'); ?>
                  </label>
                  <input type="text" id="twitter" name="twitter" size="25" />
              </li>
              <li>
                  <label for="website">
                    <?php _e('Website','event_espresso'); ?>
                  </label>
                  <input type="text" id="website" name="website" size="25" />
              </li>
              <li>
                  <label for="image">
                    <?php _e('Image/Logo URL','event_espresso'); ?>
                  </label>
                  <input type="text" id="image" name="image" size="25">
              </li>
              <li>
														<p class="section-heading">Select venue address to display in an interactive map or add a static map url</p>
														  <label for="enable-ven-gmaps"><?php _e('Enable Venue for Google Maps', 'event_espresso')  ?></label><?php echo select_input('enable_for_maps', $values, isset($org_options['enable_for_maps']) ? $org_options['enable_for_maps'] : '', 'id="enable-ven-gmaps"'); ?>
																<label for="gmap-static">Add static map url</label>
																<input type="text" id="gmap-static" name="gmap_static" size="25" />
              </li>														
            </ul>
							</td>
          </tr>
        </table>
					<div id="descriptiondivrich" class="postarea">
						<label for="description" class="section-heading">
							<?php _e('Venue Description','event_espresso'); ?>
						</label>
													
												
						<div class="postbox">		            

  					<?php the_editor('', $id = 'description', $prev_id = 'title', $media_buttons = true, $tab_index = 3);?>
  					<table id="venue-descr-add-form"  cellspacing="0">
  						<tbody>
  							<tr>
  								<td class="aer-word-count"></td>
  								<td class="autosave-info">
  									<span>
  										<p></p>
  									</span>
  								</td>
  							</tr>
  						</tbody>
  					</table>
						</div><!-- /.postbox -->						
						<p>
							<input class="button-primary" type="submit" name="Submit" value="<?php _e('Save Venue'); ?>" id="add_new_venue" />
						</p>
				</div><!-- /#descriptiondivrich -->
     </form>
    </div><!-- /.inside -->
  </div><!-- /.postbox -->
</div><!-- /.metabox-holder -->

<?php 
//espresso_tiny_mce();
} 
