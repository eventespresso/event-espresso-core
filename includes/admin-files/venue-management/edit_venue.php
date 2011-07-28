<?php
function edit_event_venue(){
	global $wpdb;
	wp_tiny_mce( false , // true makes the editor "teeny"
		array(
			"editor_selector" => "theEditor"//This is the class name of your text field
		)
	);

        if (  function_exists( 'wp_tiny_mce_preload_dialogs' )){
             add_action( 'admin_print_footer_scripts', 'wp_tiny_mce_preload_dialogs', 30 );
        }

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
                    <li>
                      <label for="locale">
                        <?php _e('Locale/Region','event_espresso'); ?>
                      </label>
                      <select name="locale" id="local">
                        <?php
                            $wpdb->query("SELECT * FROM ". EVENTS_LOCALE_TABLE);
                            if ($wpdb->num_rows > 0) {
                                $results = $wpdb->get_results("SELECT * FROM ". EVENTS_LOCALE_TABLE ." ORDER BY name ASC");
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
                      <a class="ev_reg-fancylink" href="#venue_locale"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL?>/images/question-frame.png" width="16" height="16" /></a>
                    </li>
                <?php }?>
              </ul>
							</td>
            <td align="left" valign="top"><ul>
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
						
						<div class="visual-toggle">
							<p><a class="toggleVisual"><?php _e('Visual', 'event_espresso'); ?></a> <a class="toggleHTML"><?php _e('HTML', 'event_espresso'); ?></a></p>
						</div>												
												
						<div class="postbox">           
            <textarea class="theEditor std-textarea" id="description" name="description"><?php echo wpautop(html_entity_decode(stripslashes_deep($meta['description']))); ?></textarea>
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
<?php }
