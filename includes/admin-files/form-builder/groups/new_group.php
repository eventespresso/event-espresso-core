<?php
//Function to add a new group of questions
function event_espresso_form_group_new(){
	global $wpdb;
?>
<div id="add-edit-new-group" class="metabox-holder">
 <div class="postbox">
	<div title="Click to toggle" class="handlediv"><br /></div>
   <h3 class="hndle"><?php _e('Add New Group','event_espresso'); ?></h3>
    <div class="inside">
    <form id="add-new-group" name="newgroup" method="post" action="<?php echo $_SERVER["REQUEST_URI"]?>">
 		<p class="intro"><?php _e('Add new group using the form below.','event_espresso'); ?></p>   
			<table id="table-add-group" class="ee-tables" border="0">
      <tr>
       <td class="a" valign="top">
        <fieldset id="general-group-info">
         <legend><?php _e('Group Information', 'event_espresso') ?></legend>				 
          <ul>
           <li>
             <label for="group_name"><?php _e('Group Name:','event_espresso'); ?><em>*</em></label>
             <input class="required group-name" name="group_name" id="group_name" size="50" value="" type="text" />
           </li>
				
           <li>
             <label for="group_order"><?php _e('Group Order:','event_espresso'); ?></label>
             <input name="group_order" id="group_order" size="6" value="" type="text" />
           </li>
    
           <li>
             <label for="group_description"><?php _e('Description:','event_espresso'); ?></label>
             <textarea name="group_description" cols="40" rows="5"></textarea>
           </li>
				
           <li>
             <label for="show_group_name"><?php _e('Show group name on registration page?','event_espresso'); ?></label>
             <input type="checkbox" name="show_group_name" id="show_group_name" value="1" checked="checked" />
           </li>
				
          <li>
            <label for="show_group_description"><?php _e('Show group description on registration page?','event_espresso'); ?></label>
            <input type="checkbox" name="show_group_description" id="show_group_description" value="1" checked="checked" />
          </li>
        </ul>
       </fieldset>
      </td>
  
      <td class="b"  valign="top">
				 <fieldset id="questions-for-group">
				  <legend><?php _e('Add questions', 'event_espresso') ?></legend>
        <ul id="add-quest">	
          <li><p><?php _e('Select questions to add to group:','event_espresso'); ?></p></li>
  
            <?php
        	$sql = "SELECT * FROM " . EVENTS_QUESTION_TABLE;
        	$sql .= " WHERE ";
        	if (function_exists('espresso_member_data')) {
        		if (espresso_member_data('id') == 0 || espresso_member_data('id') == 1){
        			$sql .= " (wp_user = '0' OR wp_user = '1') ";
        		}else{
        			$sql .= " wp_user = '" . espresso_member_data('id') ."' ";
        		}
        	}else{
        		$sql .= " (wp_user = '0' OR wp_user = '1') ";
        	}
        	$sql .= " ORDER BY sequence, id ASC ";
        	$questions = $wpdb->get_results($sql);
        	if ($wpdb->num_rows > 0) {
        		foreach ($questions as $question) {
        			echo '<li><label><input type="checkbox" name="question_id[]" value="' . $question->id . '" id="question_id_' . $question->id . '" />' . stripslashes($question->question) . '</label></li>';
        		}
        	}
        ?>
          </ul>
						</fieldset>
        </td>
      </tr>
    </table>
    <p class="submit-footer">
      <input name="action" value="insert_group" type="hidden">
      <input name="Submit" value="Add Group" type="submit">
    </p>
   </form>
  </div>
 </div>
</div>
<?php		
}
