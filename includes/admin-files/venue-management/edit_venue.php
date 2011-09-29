<?php
function edit_event_venue(){
	global $wpdb;
	

	$id=$_REQUEST['id'];
	$sql = "SELECT * FROM ". EVENTS_VENUE_TABLE ." v WHERE v.id ='" . $id . "' ";
	if (function_exists('espresso_member_data') && espresso_member_data('role') == 'espresso_event_manager') {
		 $sql .= " AND v.wp_user = '" . espresso_member_data('id') . "' ";
	}
	//echo $sql;
	$results = $wpdb->get_results($sql);
	if (!$wpdb->num_rows >0)	return;
	foreach ($results as $result){
		$venue_id= $result->id;
		$name=stripslashes_deep($result->name);
		$address=stripslashes_deep($result->address);
		$address2=stripslashes_deep($result->address2);
		$city=stripslashes_deep($result->city);
		$state=stripslashes_deep($result->state);
		$zip=stripslashes_deep($result->zip);
		$country=stripslashes_deep($result->country);
		$meta = unserialize($result->meta);
		
		$last_locale_id = $wpdb->get_var("SELECT locale_id FROM ".EVENTS_LOCALE_REL_TABLE." WHERE venue_id='".$id."'");
	}
	?>
<!--Add event display-->

<div id="add-edit-venue" class="metabox-holder">
  <div class="postbox">
    <h3>
      <?php _e('Edit Venue:','event_espresso'); ?>
      <?php echo stripslashes($name) ?></h3>
    <div class="inside">
      <form method="post" action="<?php echo $_SERVER['REQUEST_URI'];?>">
        <input type="hidden" name="venue_id" value="<?php echo $venue_id; ?>">
        <input type="hidden" name="action" value="update">
        <table width="100%" border="0">
          <tr>
            <td align="left" valign="top">
								<ul>
                <li>
                  <label for="name">
                    <?php _e('Name','event_espresso'); ?>
                  </label>
                  <input type="text" id="name" name="name" size="25" value="<?php echo $name;?>">
                </li>
                <li>
                  <label for="address">
                    <?php _e('Address','event_espresso'); ?>
                  </label>
                  <input type="text" id="address" name="address" size="25" value="<?php echo $address;?>">
                </li>
                <li>
                  <label for="address2">
                    <?php _e('Address 2','event_espresso'); ?>
                  </label>
                  <input type="text" id="address2" name="address2" size="25" value="<?php echo $address2;?>">
                </li>
                <li>
                  <label for="city">
                    <?php _e('City','event_espresso'); ?>
                  </label>
                  <input type="text" id="city" name="city" size="25" value="<?php echo $city;?>">
                </li>
                <li>
                  <label for="state">
                    <?php _e('State','event_espresso'); ?>
                  </label>
                  <input type="text" id="state" name="state" size="25" value="<?php echo $state;?>">
                </li>
                <li>
                  <label for="zip">
                    <?php _e('Zip','event_espresso'); ?>
                  </label>
                  <input type="text" id="zip" name="zip" size="25" value="<?php echo $zip;?>">
                </li>
                <li>
                  <label for="country">
                    <?php _e('Country','event_espresso'); ?>
                  </label>
                  <input type="text" id="country" name="country" size="25" value="<?php echo $country;?>">
                </li>
				<?php if( function_exists('espresso_member_data')){ ?>
                    <li>
											
                      <label for="locale">
                        <?php _e('Locale/Region ','event_espresso'); ?><a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=venue_locale"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL?>images/question-frame.png" width="16" height="16" /></a>
                      </label>
				<?php  
					$sql = "SELECT * FROM ". EVENTS_LOCALE_TABLE ." ORDER BY name ASC";
					$results = $wpdb->get_results($sql);
					if ($wpdb->num_rows > 0) { 
				?>
                      <select name="locale" id="locale">
                        <?php
                                foreach ($results as $result){
                                    $locale_id= $result->id;
                                    $name=stripslashes($result->name);
                                    $sel = "";
                                    if( $last_locale_id == $locale_id ) $sel = " SELECTED ";
                        ?>
                                    <option value="<?php echo $locale_id;?>" <?php echo $sel; ?>><?php echo $name;?></option>
                        <?php
                                }
                        ?>
                      </select>
                      <?php }?>
										
					<?php if(empty($locale_id)){ ?>
            				<p><?php _e('You have not created any locales yet. To create Locales please visit', 'event_espresso'); ?> <a href="admin.php?page=event_locales"> <?php _e('Manage Locales/Regions', 'event_espresso'); ?></a> <?php _e('page', 'event_espresso'); ?>.</p>
					<?php } ?>												
										
               </li>
                <?php }// end if function_exists('espresso_member_data' ?>
              </ul>
			</td>
            <td align="left" valign="top" class="b"><ul>
                <li>
                  <label for="contact">
                    <?php _e('Contact','event_espresso'); ?>
                  </label>
                  <input type="text" id="contact" name="contact" size="25" value="<?php echo stripslashes_deep($meta['contact']);?>">
                </li>
                <li>
                  <label for="phone">
                    <?php _e('Phone','event_espresso'); ?>
                  </label>
                  <input type="text" id="phone" name="phone" size="25" value="<?php echo stripslashes_deep($meta['phone']);?>">
                </li>
                <li>
                  <label for="twitter">
                    <?php _e('Twitter','event_espresso'); ?>
                  </label>
                  <input type="text" id="twitter" name="twitter" size="25" value="<?php echo stripslashes_deep($meta['twitter']);?>">
                </li>
                <li>
                  <label for="website">
                    <?php _e('Website','event_espresso'); ?>
                  </label>
                  <input type="text" id="website" name="website" size="25" value="<?php echo stripslashes_deep($meta['website']);?>">
                </li>
                <li>
                  <label for="image">
                    <?php _e('Image/Logo URL','event_espresso'); ?>
                  </label>
                  <input type="text" id="image" name="image" size="25" value="<?php echo stripslashes_deep($meta['image']);?>">
                </li>
              </ul></td>
          </tr>
        </table>
					<div id="descriptiondivrich" class="postarea">
           
						 <label for="description" class="section-heading">
             <?php _e('Description','event_espresso'); ?>
           </label>
           <div class="postbox">
            <?php the_editor(espresso_admin_format_content($meta['description']), $id = 'description', $prev_id = 'title', $media_buttons = true, $tab_index = 3);?>
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
            <input class="button-primary" type="submit" name="Submit" value="<?php _e('Update Venue'); ?>" id="update_venue" />
          </p>
					</div><!-- /#descriptiondivrich -->
      </form>
    </div><!-- /.inside -->
  </div><!-- /.postbox -->
</div><!-- /.metabox-holder -->

<?php 
//espresso_tiny_mce();
}
