<?php
//PARAMS THAT MUST BE PASSED ARE:
assert($QST_ID);
assert($question);
assert($question instanceof EE_Question);
assert($question_types);
?>
<?php
//start output
echo EE_Form_Fields::hidden_input('QST_system_name', $question->system_name());
echo EE_Form_Fields::hidden_input('QST_wp_user', $question->wp_user());
echo EE_Form_Fields::hidden_input('QST_deleted', $question->deleted());
?>


<div style='padding:1em;'>
	<table class='form-table'>
		<tbody>
			<?php foreach($question->get_fields_settings() as $fieldName=>$settings){
				if(in_array($fieldName,array('QST_system_name','QST_wp_user','QST_deleted'))){continue;}?>
			<tr>
				<th><label for='<?php echo $fieldName?>'><?php _e($settings->nicename(),'event_espresso');?></label></th>
				<td>
					<?php switch($fieldName){
						case 'QST_display_text':?>
							<input class='regular-text' id='<?php echo $fieldName?>' name='<?php echo $fieldName?>' value='<?php echo $question->display_text()?>'/>
							<br/><span class='description'><?php _e("Text to display to registrants who are signing up for events",'event_espresso')?></span>
							<?php break;
						case 'QST_type':
							echo EE_Form_fields::select_input('QST_type', $question_types, $question->type(),"id='QST_type'");?>
							<br/><span class='description'><?php _e("'Text' is best for small text (fewer than 100 characters). 'Text area' is best for large text (paragraphs). 
								'Radio Button' and 'Dropdown' are best for a multiple-choice-questions where the registrant can only select 1 option.
								'Checkbox' is best for multiple-choice-questions where the registrant can select multiple options.",'event_espresso');?>
							</span>
			
				</td>
			</tr>
			<tr id='question_options'>
				<th><label>Options</label></th>
				<td>
							<table >
								<thead>
									<tr>
										<th>Name</th><th>Value</th><th></th>
									</tr>
								</thead>
								<tbody>
									<tr class='question-option sample'>
										<td>
											<input name='question_options[xxcountxx][QSO_name]' class='option-name'>
										</td>
										<td>
											<input name='question_options[xxcountxx][QSO_value]' class='option-value'>
										</td>
										<td><a class='remove-option remove-item'><img src='<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/trash-16x16.png'/></a></td>
									</tr>
								<?php $count=0;foreach($question->options() as $option_id=>$option){?>
								<tr class='question-option'>
									<td><input name='question_options[<?php echo $count?>][QSO_name]' value='<?php echo $option->name()?>'></td>
									<td><input name='question_options[<?php echo $count?>][QSO_value]' value='<?php echo $option->value()?>'></td>
									<?php if($count>0){?><td><a class='remove-option remove-item'><img src='<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/trash-16x16.png'/></a></td><?php }?>
									<?php	
										echo EE_Form_Fields::hidden_input("question_options[{$count}][QST_ID])", $option->question_ID());
										echo EE_Form_Fields::hidden_input("question_options[{$count}][QSO_ID])", $option->ID());
									?>
								</tr>
								<?php $count++;}?>
							
								</tbody>
							</table>
					<a id='new-question-option' class='button'>Add Option</a>
							<?php break;
						case 'QST_required':
							$requiredOptions=array(0=>array('text'=>'Required','id'=>'1'),1=>array('text'=>'Optional','id'=>0));
							echo EE_Form_Fields::select_input('QST_required', $requiredOptions,$question->required());?>
							<br/><span class='description'>
								<?php _e("Whether registrants are required to answer this question.",'event_espress');?>
							</span>
							<?php break;
						case 'QST_required_text':?>
							<input class='regular-text' id='<?php echo $fieldName?>' name='<?php echo $fieldName?>' value='<?php echo $question->required_text()?>'/>
							<br/><span class='description'>
								<?php _e("Text to display when the registrant does not answer the question but is required to",'event_espresso');?>
							</span>
							<?php break;
						case 'QST_order':?>
							<input class='regular-text' id='<?php echo $fieldName?>' name='<?php echo $fieldName?>' value='<?php echo $question->order()?>'/>
							<br/><span class='description'>
								<?php _e("Order in which question ought to appear. To make this question appear first in forms, give it a low number, like 1. To make it appear later, give it a higher number like 20",'event_espresso');?>
							</span>
							<?php break;
						case 'QST_admin_only':
							$adminOnlyOptions=array(array('text'=>'Only Admins can See','id'=>1),array('text'=>'All Can See','id'=>0));
							echo EE_Form_Fields::select_input('QST_admin_only',$adminOnlyOptions,$question->admin_only());?>
							<br/><span class='description'>
								<?php _e("Only the administrator can see this field.",'event_espresso')?>
							</span>
							<?php break;
					}?>
				</td>
			</tr>
		<?php }?>
	</table>
	<div class='clear'></div>
</div>