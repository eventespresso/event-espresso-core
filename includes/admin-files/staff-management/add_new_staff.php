<?php
function add_new_event_staff(){
?>
<div id="add-edit-staff" class="metabox-holder">
  <div class="postbox">
    <h3>
      <?php _e('Add a Staff Member','event_espresso'); ?>
    </h3>
    <div class="inside">
      <form id="add-staff" method="post" action="<?php echo $_SERVER['REQUEST_URI'];?>">
        <input type="hidden" name="action" value="add">
      <table width="100%" border="0">
          <tr>
            <td align="left" valign="top">
								<ul>
                <li>
                  <label for="staff-name">
                    <?php _e('Name','event_espresso'); ?><em title="<?php _e('This field is required', 'event_espresso') ?>"> *</em>
                  </label>
                  <input class="required staff-name" type="text" id="staff-name" name="name" size="25" />
                </li>
                <li>
                  <label for="email">
                    <?php _e('Email Address','event_espresso'); ?>
                  </label>
                  <input type="text" id="email" name="email" size="25" />
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
                  <input type="text" id="image" name="image" size="25" />
                </li>
               </ul>
							</td>
							<td>
								 <ul>
                <li>
                  <label for="role">
                    <?php _e('Role','event_espresso'); ?>
                  </label>
                  <input type="text" id="role" name="role" size="25" />
                </li>
                <li>
                  <label for="organization">
                    <?php _e('Organization','event_espresso'); ?>
                  </label>
                  <input type="text" id="organization" name="organization" size="25" />
                </li>
                <li>
                  <label for="title">
                    <?php _e('Title','event_espresso'); ?>
                  </label>
                  <input type="text" id="title" name="title" size="25" />
                </li>
                <li>
                  <label for="industry">
                    <?php _e('Industry','event_espresso'); ?>
                  </label>
                  <input type="text" id="industry" name="industry" size="25" />
                </li>
                <li>
                  <label for="city">
                    <?php _e('City','event_espresso'); ?>
                  </label>
                  <input type="text" id="city" name="city" size="25" />
                </li>
                <li>
                  <label for="country">
                    <?php _e('Country','event_espresso'); ?>
                  </label>
                  <input type="text" id="country" name="country" size="25" />
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
            <?php the_editor('', $id = 'description', $prev_id = 'title', $media_buttons = true, $tab_index = 3);?>
   					<table id="staff-descr-add-form"  cellspacing="0">
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
            <input class="button-primary" type="submit" name="Submit" value="<?php _e('Save Staff Member'); ?>" id="add_new_staff" />
          </p>
 				</div><!-- /#descriptiondivrich -->
      </form>
    </div>
  </div>
</div>
<?php 
/* removed as reported to cause issues by Imon    
espresso_tiny_mce();
*/
} 
