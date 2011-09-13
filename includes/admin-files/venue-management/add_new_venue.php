<?php
function add_new_event_venue(){
	global $wpdb,$current_user;
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
            <td align="left">
								<ul>
                <li>
                  <label for="name">
                    <?php _e('Name','event_espresso'); ?>
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
                <li>
                  <label for="locale">
                   <?php _e('Locale/Region','event_espresso'); ?> 
                  </label>
                    <select name="locale" id="local">
                        <?php
                            
                            //if (espresso_member_data('role') == "administrator") {
													$sql = "SELECT * FROM ". EVENTS_LOCALE_TABLE;
													$results = $wpdb->get_results($sql);
                            /*} else {
                                $group = get_user_meta($current_user->ID, "espresso_group", true);
                                $group = unserialize($group); // group array holds 1 or more values, ex: Array ( [2] => 2 [3] => 3 )
                                if (is_array($group) && sizeof($group) > 0) {
                                    $group_string = implode(",",$group);
                                    $sql = "SELECT * FROM " . EVENTS_LOCALE_TABLE . " l WHERE l.id IN (".$group_string.") GROUP BY l.id ";
                                } else {
                                    // backup option, this means the user hasn't been assigned a region
                                    $sql = "SELECT * FROM ". EVENTS_LOCALE_TABLE . " WHERE wp_user = ".$current_user->ID;
                                    
                                }
                                $wpdb->query($sql);
                            }*/
                            
                         if ($wpdb->num_rows > 0) {
                             foreach ($results as $result){
                               $locale_id= $result->id;
                               $name=stripslashes($result->name);
                        ?>
                          <option value="<?php echo $locale_id;?>"><?php echo $name;?></option>
                        <?php
                         }
                        ?>
                     </select>
                    <a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=venue_locale"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL?>/images/question-frame.png" width="16" height="16" /></a>
                 </li>
                <?php }?>
              </ul>
							</td>
            <td align="left" valign="top">
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
espresso_tiny_mce();
} 
