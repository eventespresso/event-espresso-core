<?php
//requiresd variables
assert(isset($QSG_ID));//question gruop's ID
assert($question_group);//the main question group
assert($question_group instanceof EE_Question_Group);

?>

<div class='edit-group'>
	<table class='form-table'>
		<tbody>
			<tr>
				<th><label for='QSG_name'><?php _e('Group Name','event_espresso');?></label></th>
				<td>
					<input name='QSG_name' value='<?php echo $question_group->name()?>'>
				</td>
			</tr>
			<tr>
				<th><label for='QSG_order'><?php _e('Group Order','event_espresso');?></label></th>
				<td>
					<input name='QSG_order' value='<?php echo $question_group->order()?>'>
				</td>
			</tr>
			<tr>
				<th><label for='QSG_identifier'><?php _e('Group Identifier','event_espresso');?></label></th>
				<td>
					<input disabled name='QSG_identifier' value='<?php echo $question_group->identifier()?>'>
				</td>
			</tr>
			<tr>
				<th><label for='QSG_desc'><?php _e('Description','event_espresso');?></label></th>
				<td>
					<textarea name='QSG_desc'><?php echo $question_group->desc()?></textarea>
				</td>
			</tr>
			<tr>
				<th><label for='QSG_show_group_name'><?php _e('Show Group Name on Registration Page?','event_espresso');?></label></th>
				<td>
					<input type='checkbox' name='QSG_show_group_name' value='<?php echo $question_group->show_group_name()?>'>
				</td>
			</tr>
			<tr>
				<th><label for='QSG_show_group_order'><?php _e('Show Group Description on Registration Page?','event_espresso');?></label></th>
				<td>
					<input type='checkbox' name='QSG_show_group_order' value='<?php echo $question_group->show_group_desc()?>'>
				</td>
			</tr>
		</tbody>
	</table>
</div>