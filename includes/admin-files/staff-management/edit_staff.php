<?php
function edit_event_staff(){
	global $wpdb;
	
	$id=$_REQUEST['id'];
	$results = $wpdb->get_results("SELECT * FROM ". EVENTS_PERSONNEL_TABLE ." WHERE id =".$id);
	foreach ($results as $result){
		$staff_id= $result->id;
		$name=stripslashes_deep($result->name);
		$role=stripslashes_deep($result->role);
		$email=stripslashes_deep($result->email);
		$meta = unserialize($result->meta);
	}
	?>
<!--Add event display-->

<div id="add-edit-staff" class="metabox-holder">
  <div class="postbox">
    <h3>
      <?php _e('Edit Staff Member:','event_espresso'); ?>
      <?php echo stripslashes($name) ?></h3>
    <div class="inside">
      <form method="post" action="<?php echo $_SERVER['REQUEST_URI'];?>">
        <input type="hidden" name="staff_id" value="<?php echo $staff_id; ?>">
        <input type="hidden" name="action" value="update">
       <table width="100%" border="0">
          <tr>
            <td align="left" valign="top">
								<ul>
                <li>
                  <label for="name">
                    <?php _e('Name','event_espresso'); ?>
                  </label>
                  <input type="text" id="name" name="name" size="25" value="<?php echo $name;?>" />
                </li>
                <li>
                  <label for="email">
                    <?php _e('Email Address','event_espresso'); ?>
                  </label>
                  <input type="text" id="email" name="email" size="25" value="<?php echo $email;?>" />
                </li>
                <li>
                  <label for="phone">
                    <?php _e('Phone','event_espresso'); ?>
                  </label>
                  <input type="text" id="phone" name="phone" size="25" value="<?php echo stripslashes_deep($meta['phone']);?>" />
                </li>
                <li>
                  <label for="twitter">
                    <?php _e('Twitter','event_espresso'); ?>
                  </label>
                  <input type="text" id="twitter" name="twitter" size="25" value="<?php echo stripslashes_deep($meta['twitter']);?>" />
                </li>
                <li>
                  <label for="website">
                    <?php _e('Website','event_espresso'); ?>
                  </label>
                  <input type="text" id="website" name="website" size="25" value="<?php echo stripslashes_deep($meta['website']);?>" />
                </li>
                <li>
                  <label for="image">
                    <?php _e('Image/Logo URL','event_espresso'); ?>
                  </label>
                  <input type="text" id="image" name="image" size="25" value="<?php echo stripslashes_deep($meta['image']);?>" />
                </li>
               </ul>
								</td>
								<td>
								 <ul>
                <li>
                  <label for="role">
                    <?php _e('Role','event_espresso'); ?>
                  </label>
                  <input type="text" id="role" name="role" size="25" value="<?php echo $role;?>" />
                </li>
                <li>
                  <label for="organization">
                    <?php _e('Organization','event_espresso'); ?>
                  </label>
                  <input type="text" id="organization" name="organization" size="25" value="<?php echo stripslashes_deep($meta['organization']);?>" />
                </li>
                <li>
                  <label for="title">
                    <?php _e('Title','event_espresso'); ?>
                  </label>
                  <input type="text" id="title" name="title" size="25" value="<?php echo stripslashes_deep($meta['title']);?>" />
                </li>
                <li>
                  <label for="industry">
                    <?php _e('Industry','event_espresso'); ?>
                  </label>
                  <input type="text" id="industry" name="industry" size="25" value="<?php echo stripslashes_deep($meta['industry']);?>" />
                </li>
                <li>
                  <label for="city">
                    <?php _e('City','event_espresso'); ?>
                  </label>
                  <input type="text" id="city" name="city" size="25" value="<?php echo stripslashes_deep($meta['city']);?>" />
                </li>
                <li>
                  <label for="country">
                    <?php _e('Country','event_espresso'); ?>
                  </label>
                  <input type="text" id="country" name="country" size="25" value="<?php echo stripslashes_deep($meta['country']);?>" />
                </li>
                </ul>
								</td>
							</tr>
						</table>
            
					<div id="descriptiondivrich" class="postarea">	       
          
						 <label for="description" class="section-heading">
            <?php _e('Description','event_espresso'); ?>
          </label>
 					
						<div class="postbox">        
         		<?php the_editor(wpautop(utf8_encode(html_entity_decode(stripslashes_deep($meta['description'])))), $id = 'description', $prev_id = 'title', $media_buttons = true, $tab_index = 3);?>
   					<table id="staff-descr-edit-form"  cellspacing="0">
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
            <input class="button-primary" type="submit" name="Submit" value="<?php _e('Update Staff Member'); ?>" id="update_staff" />
          </p>
					</div><!-- /#descriptiondivrich -->
      </form>
    </div>
  </div>
</div>
<?php 
espresso_tiny_mce();
}
