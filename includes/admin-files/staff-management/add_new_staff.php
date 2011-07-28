<?php
function add_new_event_staff(){
	wp_tiny_mce( false , // true makes the editor "teeny"
		array(
			"editor_selector" => "theEditor"//This is the class name of your text field
		)
	);

        if (  function_exists( 'wp_tiny_mce_preload_dialogs' )){
             add_action( 'admin_print_footer_scripts', 'wp_tiny_mce_preload_dialogs', 30 );
        }
	?>
<!--Add event display-->

<div id="add-edit-staff" class="metabox-holder">
  <div class="postbox">
    <h3>
      <?php _e('Add a Staff Member','event_espresso'); ?>
    </h3>
    <div class="inside">
      <form method="post" action="<?php echo $_SERVER['REQUEST_URI'];?>">
        <input type="hidden" name="action" value="add">
      <table width="100%" border="0">
          <tr>
            <td align="left" valign="top">
								<ul>
                <li>
                  <label for="name">
                    <?php _e('Name','event_espresso'); ?>
                  </label>
                  <input type="text" id="name" name="name" size="25" />
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
          
						<label for="description">
            <?php _e('Description','event_espresso'); ?>
          </label>
 					
						<div class="visual-toggle">
							<p><a class="toggleVisual"><?php _e('Visual', 'event_espresso'); ?></a> <a class="toggleHTML"><?php _e('HTML', 'event_espresso'); ?></a></p>
						</div>												
												
						<div class="postbox">        
         		<textarea class="theEditor std-textarea" id="description" name="description"></textarea>
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
<script type="text/javascript" charset="utf-8">

function toggleEditor(id) {
	if (!tinyMCE.get(id))
		tinyMCE.execCommand('mceAddControl', false, id);
	else
		tinyMCE.execCommand('mceRemoveControl', false, id);
	}
	jQuery(document).ready(function($) {
		
                

		var id = 'staff_desc_new';
		$('a.toggleVisual').click(
			function() {
				tinyMCE.execCommand('mceAddControl', false, id);
			}
		);

		$('a.toggleHTML').click(
			function() {
				tinyMCE.execCommand('mceRemoveControl', false, id);
			}
		);
});
</script>
<?php } 
