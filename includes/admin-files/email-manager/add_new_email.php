<?php
function add_new_event_email(){
	
	?>
<!--Add event display-->
<div class="metabox-holder">
  <div class="postbox">
 
		<h3><?php _e('Add an Email','event_espresso'); ?></h3>
 	<div class="inside">
  <form id="add-edit-new-event-email" method="post" action="<?php echo $_SERVER['REQUEST_URI'];?>">
  <input type="hidden" name="action" value="add">
   <ul>
    <li><label for="email_name"><?php _e('Email Name','event_espresso'); ?></label> <input type="text" name="email_name" size="25" /></li>
    <li><label for="email_subject"><?php _e('Email Subject Line','event_espresso'); ?></label> <input type="text" name="email_subject" size="25" /></li>
			<li>

			<div id="descriptiondivrich" class="postarea">   
		 		<label for="email_text"><?php _e('Email Text','event_espresso'); ?></label>
				
                
				<div class="postbox">
				
					<?php the_editor('', $id = 'email_text', $prev_id = 'title', $media_buttons = true, $tab_index = 3);?>
				
						<table id="manage-event-email-form" cellspacing="0">
							<tbody>
								<tr>
									<td class="aer-word-count"></td>
									<td class="autosave-info">
										<span>
											<a class="ev_reg-fancylink" href="#custom_email_info"><?php _e('View Custom Email Tags', 'event_espresso'); ?></a> | <a class="ev_reg-fancylink" href="#custom_email_example"> <?php _e('Email Example','event_espresso'); ?></a>
										</span>
									</td>
								</tr>
							</tbody>
						</table>				
				</div>
			
			</div>
				
   	</li>
   	<li>
    	<p>
					<input class="button-primary" type="submit" name="Submit" value="<?php _e('Add Email'); ?>" id="add_new_email" />
    	</p>
    </li>
   </ul>
	</form>
 </div>
</div>
</div>
<?php 
espresso_tiny_mce();
} 