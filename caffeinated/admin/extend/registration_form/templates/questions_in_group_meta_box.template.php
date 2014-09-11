<?php
//required variables for template:
assert($question_group instanceof EE_Question_Group);
assert(isset($all_questions) && (empty($all_questions) || is_array($all_questions)));//list of unused questions
foreach($all_questions as $question_option){
	assert($question_option);
	assert($question_option instanceof EE_Question);
}
?>
<h4><?php _e('Check off all questions that you wish to appear in this group.','event_espresso');?></h4>
<ul>
	<?php 
	foreach( $all_questions as $question_ID=>$question ){
		/*@var $question EE_Question*/
		$checked = array_key_exists( $question_ID, $question_group->questions() ) ? ' checked="checked"' : '';
	?>
	<li>
		<label for="question-<?php echo $question_ID?>">
			<input type="checkbox" name="questions[<?php echo $question_ID;?>]" id="question-<?php echo $question_ID;?>" value="<?php echo $question_ID;?>"<?php echo $checked;?>/>
			<?php echo $question->display_text()?>				
		</label>
	</li>
	<?php }?>
</ul>