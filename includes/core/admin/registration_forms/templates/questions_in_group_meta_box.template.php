<?php
//required variables for tempalte:
assert($question_group instanceof EE_Question_Group);
assert(isset($all_questions) && (empty($all_questions) || is_array($all_questions)));//list of unused questions
foreach($all_questions as $unused_question){
	assert($unused_question);
	assert($unused_question instanceof EE_Question);
}
?>

<ul>
	<?php foreach($all_questions as $question_ID=>$question){/*@var $question EE_Question*/?>
	<li>
		<label for='question-<?php echo $question_ID?>'>
			<input type='checkbox' name='questions[<?php echo $question_ID?>]' id='question-<?php echo $question_ID?>' value='<?php echo $question_ID?>' <?php echo array_key_exists($question_ID,$question_group->questions())?'checked':''?>/> <?php echo $question->display_text()?></label>
	</li>
	<?php }?>
</ul>