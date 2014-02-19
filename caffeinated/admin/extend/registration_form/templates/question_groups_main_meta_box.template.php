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
?>

<div class="edit-group padding" style="float:left; width:60%; padding-right: 5%;">
	<table class="form-table">
		<tbody>
		
			<tr>
				<th>
					<label for="QSG_name">
						<?php _e('Group Name','event_espresso');?> <?php echo EEH_Template::get_help_tab_link('group_name_info');?>
					</label>
				</th>
				<td>
					<input name="QSG_name" value="<?php  $question_group->f('QSG_name')?>" type="text" class="regular-text"><br/>
					
				</td>
			</tr>
			
			<tr>
				<th>
					<label for="QSG_identifier">
						<?php _e('Group Identifier','event_espresso');?> <?php echo EEH_Template::get_help_tab_link('group_identifier_info');?>
					</label>
				</th>
				<td>
					<input name="QSG_identifier<?php echo $id; ?>" value="<?php echo $question_group->identifier()?>" type="text" class="regular-text"<?php echo $disabled; ?>>
					<?php if ( ! empty( $QSG_system )) { ?>
					<p><span class="description" style="color:#D54E21;">
							<?php _e('System question group! This field cannot be changed.','event_espresso')?>
					</span><br/></p>
					<?php } ?>
					
				</td>
			</tr>		
			<tr>
				<th>
					<label for="QSG_desc">
						<?php _e('Description','event_espresso');?> <?php echo EEH_Template::get_help_tab_link('group_description_info');?>
					</label>
				</th>
				<td>
					<textarea name="QSG_desc"  class="regular-text" rows="1" cols="50"><?php echo $question_group->desc()?></textarea>
				</td>
			</tr>

			<tr>
				<th>
					<label for="QSG_order">
						<?php _e('Question Group Order','event_espresso');?> <?php echo EEH_Template::get_help_tab_link('group_order_info');?>
					</label>
				</th>
				<td>
					<input name="QSG_order"  class="regular-text" value="<?php echo $question_group->get('QSG_order'); ?>" />
				</td>
			</tr>

			<tr>
				<th>
					<label>
						<?php _e('Show Name','event_espresso');?> <?php echo EEH_Template::get_help_tab_link('show_group_name_info');?>
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
						<?php _e(' Show Description','event_espresso');?> <?php echo EEH_Template::get_help_tab_link('show_group_description_info');?>
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

<div class="edit-group padding question-group-questions-container">
	<table class="form-table question-group-questions">
		<tbody>
			<tr>				
				<td>
					<div class="padding">
						<h3 class="title" style="padding-left: 0;"><?php _e('Questions that appear in this group.','event_espresso');?></h3>
						<p><span class="description"><?php _e('You can reorder the questions for this group via drag and drop. And it will be updated on save.', 'event_espresso'); ?></span></p>
						<ul>
							<?php 
							$qcnt = 0;
							foreach( $all_questions as $question_ID=>$question ){
								/*@var $question EE_Question*/
								$checked = array_key_exists( $question_ID, $question_group->questions() ) ? ' checked="checked"' : '';
								$disabled = $question->get('QST_system') && $QSG_system !== 2 ? ' disabled="disabled"' : '';
								$question_order = $qcnt;
								if ( ($QSG_system === 1 && $question->get('QST_system' ) && empty( $checked ) ) || ( $QSG_system == 2 && in_array( $question_ID, array(1,2,3) ) ) || ( $QSG_system === 0 && $question->get('QST_system' ) !== "" ) )
									continue; //skip over system question not assigned to this group except for the address system group cause we want the address questions to display even if they aren't selected (but still not show the personal system questions).  The third condition checks if we're displaying a non system question group and the question is a system question, then we skip because for non-system question groups we only want to show non-system questions.
							?>
							<li class="ee-question-sortable">
								<label for="question-<?php echo $question_ID?>">
									<input type="checkbox" name="questions[<?php echo $question_ID;?>]" id="question-<?php echo $question_ID; ?>" value="<?php echo $question_ID;?>"<?php echo $disabled; ?><?php echo $checked; ?>/>
									 &nbsp; <?php echo $question->display_text()?>
									 <input class="question-group-QST_order" type="hidden" name="question_orders[<?php echo $question_ID; ?>]" value="<?php echo $question_order; ?>">
								</label>
							</li>
							<?php $qcnt++; }?>
						</ul>
					</div>
				</td>				
			</tr>
		</tbody>
	</table>
</div>