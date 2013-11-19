<?php
/**
 * Template: includes/core/admin/registration_form/templates/question_groups_main_meta_box.template.php
 * For displaying a question group for editing/creating within the EE Admin page
 */
/* @var int $QSG_ID the main question group's ID */
assert($QSG_ID);
/* @var EE_Question_Group $question_group the main question group we're displaying*/
assert($question_group);
assert($question_group instanceof EE_Question_Group);
/* @var EE_Question[] $all_questions */
assert(isset($all_questions) && (empty($all_questions) || is_array($all_questions)));//list of unused questions
foreach($all_questions as $unused_question){
	assert($unused_question);
	assert($unused_question instanceof EE_Question);
}
/* @var array $values. Array of arrays, where each sub-array contains 2 keys: 'id' (internal value) and 'name' (label for displaying) */
assert(is_array($values));

$QSG_system = $question_group->system_group();
 
$disabled = ! empty( $QSG_system ) ? ' disabled="disabled"' : '';
$id =  ! empty( $QST_system ) ? '_disabled' : '';


echo EEH_Form_Fields::hidden_input('QSG_order', $question_group->get('QSG_order') );
?>

<div class="edit-group padding" style="float:left; width:60%; padding-right: 5%;">
	<table class="form-table">
		<tbody>
		
			<tr>
				<th>
					<label for="QSG_name">
						<?php _e('Group Name','event_espresso');?>
					</label>
				</th>
				<td>
					<input name="QSG_name" value="<?php echo $question_group->name()?>" type="text" class="regular-text"><br/>
					<p class="description">
						<?php _e('A name or heading for this group of questions that can be used to organize your Registration Form. For example: Address Information.','event_espresso')?>
					</p>
					<?php if ( ! empty( $QSG_system )) { ?>
					<span class="description" style="color:#D54E21;">
						<?php if ( $QSG_system === 1 ) : ?>
							<?php _e('This is a system question group so you are able to modify everything with this group except the identifier and the system questions attached to the group.','event_espresso')?>
						<?php else : ?>
							<?php _e('This is a system question group so you are able to modify everything with this group except the identifier.','event_espresso')?>
						<?php endif; ?>
					</span><br/>
					<?php } ?>
				</td>
			</tr>
			
			<tr>
				<th>
					<label for="QSG_identifier">
						<?php _e('Group Identifier','event_espresso');?>
					</label>
				</th>
				<td>
					<input name="QSG_identifier<?php echo $id; ?>" value="<?php echo $question_group->identifier()?>" type="text" class="regular-text"<?php echo $disabled; ?>><br/>
					<p class="description">
						<?php _e('The "Group Identifier" is a unique name for this group that can be used to distinguish it from all other groups in the system. A Group Identifier therefore can not be the same as any other. It will NOT be displayed to site visitors. If left blank, one will be automagically generated for you, ie: address-info-12345.','event_espresso')?>
					</p>
				</td>
			</tr>		
			<tr>
				<th>
					<label for="QSG_desc">
						<?php _e('Description','event_espresso');?>
					</label>
				</th>
				<td>
					<textarea name="QSG_desc"  class="regular-text" rows="1" cols="50"><?php echo $question_group->desc()?></textarea>
				</td>
			</tr>

			<tr>
				<th>
					<label>
						<?php _e('Show Group Name','event_espresso');?>
					</label>
				</th>
				<td>
					<label for="QSG_show_group_name">
						<!--<input type="checkbox" name="QSG_show_group_name" value="<?php echo $question_group->show_group_name()?>"> &nbsp;-->
						<?php _e('Show Group Name on Registration Page?','event_espresso');?>
						<?php echo EEH_Form_Fields::select_input( 'QSG_show_group_name', $values, $question_group->show_group_name() ); ?>						
					</label>
				</td>
			</tr>
			
			<tr>
				<th>
					<label>
						<?php _e(' Show Group Description','event_espresso');?>
					</label>
				</th>
				<td>
					<label for="QSG_show_group_order">
						<!--<input type="checkbox" name="QSG_show_group_desc" value="<?php echo $question_group->show_group_desc()?>"> &nbsp;-->
						<?php _e(' Show Group Description on Registration Page?','event_espresso');?>
						<?php echo EEH_Form_Fields::select_input( 'QSG_show_group_desc', $values, $question_group->show_group_desc() ); ?>						
					</label>
					<input type="hidden" name="QSG_system" value="<?php echo $question_group->get('QSG_system'); ?>">
				</td>
			</tr>
			
		</tbody>
	</table>
</div>

<div class="edit-group padding" style="display: inline-block;">
	<table class="form-table">
		<tbody>
			<tr>				
				<td>
					<div class="padding">
						<h3 class="title" style="padding-left: 0;"><?php _e('Questions that appear in this group.','event_espresso');?></h3>
						<ul>
							<?php 
							foreach( $all_questions as $question_ID=>$question ){
								/*@var $question EE_Question*/
								$checked = array_key_exists( $question_ID, $question_group->questions() ) ? ' checked="checked"' : '';
								$disabled = $question->get('QST_system') && $QSG_system !== 2 ? ' disabled="disabled"' : '';
								if ( ($QSG_system === 1 && $question->get('QST_system' ) && empty( $checked ) ) || ( $QSG_system == 2 && in_array( $question_ID, array(1,2,3) ) ) )
									continue; //skip over system question not assigned to this group except for the address system group cause we want the address questions to display even if they aren't selected (but still not show the personal system questions)
							?>
							<li>
								<label for="question-<?php echo $question_ID?>">
									<input type="checkbox" name="questions[<?php echo $question_ID;?>]" id="question-<?php echo $question_ID; ?>" value="<?php echo $question_ID;?>"<?php echo $disabled; ?><?php echo $checked; ?>/>
									 &nbsp; <?php echo $question->display_text()?>				
								</label>
							</li>
							<?php }?>
						</ul>
					</div>
				</td>				
			</tr>
		</tbody>
	</table>
</div>