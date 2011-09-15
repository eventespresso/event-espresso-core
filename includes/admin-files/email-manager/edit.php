<?php
function edit_event_ticket(){
	global $wpdb;
	
	$id=$_REQUEST['id'];
	$results = $wpdb->get_results("SELECT * FROM ". EVENTS_TICKET_TABLE ." WHERE id =".$id);
	foreach ($results as $result){
		$ticket_id= $result->id;
		$ticket_name=stripslashes_deep($result->ticket_name);
		$ticket_subject=stripslashes_deep($result->ticket_subject);
		$ticket_text=stripslashes_deep($result->ticket_text);
	}
	?>
<!--Add event display-->
<div class="metabox-holder">
  <div class="postbox">
<h3><?php _e('Edit Ticket:','event_espresso'); ?> <?php echo stripslashes($ticket_name) ?></h3>
<div class="inside">
  <form id="add-edit-new-event-ticket" method="post" action="<?php echo $_SERVER['REQUEST_URI'];?>">
  <input type="hidden" name="ticket_id" value="<?php echo $ticket_id; ?>">
  <input type="hidden" name="action" value="update">
   <ul>
    <li>
				<label><?php _e('Ticket Name:','event_espresso'); ?></label> 
				<input type="text" name="ticket_name" size="25" value="<?php echo stripslashes($ticket_name);?>" />
			</li> 
			
			<li>
				<label><?php _e('Ticket Subject Line:','event_espresso'); ?></label> 
				<input type="text" name="ticket_subject" size="25" value="<?php echo stripslashes($ticket_subject);?>">
			</li>
   	
			<li>
				
				<div id="descriptiondivrich" class="postarea">   
		 		
				<label for="ticket_text"><?php _e('Ticket Text','event_espresso'); ?></label>
					
				<div class="postbox">   
					<?php the_editor(espresso_format_content($ticket_text), $id = 'ticket_text', $prev_id = 'title', $media_buttons = true, $tab_index = 3);?>
				<table id="manage-event-ticket-form" cellspacing="0">
					<tbody>
						<tr>
							<td class="aer-word-count"></td>
							<td class="autosave-info">
								<span>
									<a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=custom_ticket_info"><?php _e('View Custom Ticket Tags', 'event_espresso'); ?></a> | <a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=custom_ticket_example"> <?php _e('Ticket Example','event_espresso'); ?></a>
								</span>
							</td>
						</tr>
					</tbody>
				</table>				
				
				</div>
			
			</div>	
   
		 </li>
   
		 <li>
    <p><input class="button-primary" type="submit" name="Submit" value="<?php _e('Update Ticket'); ?>" id="update_ticket" /></p>
   </li>
  </ul>
 </form>
</div>
</div>
</div>
<?php 
espresso_tiny_mce();
}