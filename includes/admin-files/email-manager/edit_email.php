<?php
function edit_event_email(){
	global $wpdb;
	
	$id=$_REQUEST['id'];
	$results = $wpdb->get_results("SELECT * FROM ". EVENTS_EMAIL_TABLE ." WHERE id =".$id);
	foreach ($results as $result){
		$email_id= $result->id;
		$email_name=stripslashes_deep($result->email_name);
		$email_subject=stripslashes_deep($result->email_subject);
		$email_text=stripslashes_deep($result->email_text);
	}
	?>
<!--Add event display-->
<div class="metabox-holder">
  <div class="postbox">
<h3><?php _e('Edit Email:','event_espresso'); ?> <?php echo stripslashes($email_name) ?></h3>
<div class="inside">
  <form id="add-edit-new-event-email" method="post" action="<?php echo $_SERVER['REQUEST_URI'];?>">
  <input type="hidden" name="email_id" value="<?php echo $email_id; ?>">
  <input type="hidden" name="action" value="update">
   <ul>
    <li>
				<label><?php _e('Email Name:','event_espresso'); ?></label> 
				<input type="text" name="email_name" size="25" value="<?php echo stripslashes($email_name);?>" />
			</li> 
			
			<li>
				<label><?php _e('Email Subject Line:','event_espresso'); ?></label> 
				<input type="text" name="email_subject" size="25" value="<?php echo stripslashes($email_subject);?>">
			</li>
   	
			<li>
				
				<div id="descriptiondivrich" class="postarea">   
		 		
				<label for="email_text"><?php _e('Email Text','event_espresso'); ?></label>
					
				<div class="postbox">   
					<?php the_editor(espresso_format_content($email_text), $id = 'email_text', $prev_id = 'title', $media_buttons = true, $tab_index = 3);?>
				<table id="manage-event-email-form" cellspacing="0">
					<tbody>
						<tr>
							<td class="aer-word-count"></td>
							<td class="autosave-info">
								<span>
									<a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=custom_email_info"><?php _e('View Custom Email Tags', 'event_espresso'); ?></a> | <a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=custom_email_example"> <?php _e('Email Example','event_espresso'); ?></a>
								</span>
							</td>
						</tr>
					</tbody>
				</table>				
				
				</div>
			
			</div>	
   
		 </li>
   
		 <li>
    <p><input class="button-primary" type="submit" name="Submit" value="<?php _e('Update Email'); ?>" id="update_email" /></p>
   </li>
  </ul>
 </form>
</div>
</div>
</div>
<?php 
espresso_tiny_mce();
}