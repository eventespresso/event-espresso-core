<?php
//PARAMS THAT MUST BE PASSED ARE:
assert(isset($QST_ID));
assert($question);
assert($question instanceof EE_Question);
assert($question_types);

//start output
echo EE_Form_Fields::hidden_input('QST_system', $question->system_ID());
echo EE_Form_Fields::hidden_input('QST_wp_user', $question->wp_user());
echo EE_Form_Fields::hidden_input('QST_deleted', $question->deleted());
$QST_system = $question->system_ID();

?>

<div class="padding">
	<table class="form-table">
		<tbody>
			<?php 
			foreach($question->get_fields_settings() as $fieldName=>$settings){
				if( in_array( $fieldName, array( 'QST_ID', 'QST_system','QST_wp_user','QST_deleted', 'QST_order' ))) {
					continue;
				}
			?>
			<tr>
				<th>
					<label for="<?php echo $fieldName?>"><?php echo $settings->nicename();?></label>
				</th>
				<td>
					<?php 
					switch($fieldName){
						case 'QST_display_text':
					?>
					<input type="text" class="regular-text" id="<?php echo $fieldName?>" name="<?php echo $fieldName?>" value="<?php echo $question->display_text()?>"/>
					<br/>
					<p class="description">
						<?php _e("The actual question to display to registrants who are signing up for events",'event_espresso')?>
					</p>					
					<?php break;
					
						case 'QST_admin_label': 
					?>
					<?php $disabled = ! empty( $QST_system ) ? ' disabled="disabled"' : ''; ?>
					<input type="text" class="regular-text" id="<?php echo $fieldName?>" name="<?php echo $fieldName?>" value="<?php echo $question->admin_label()?>"<?php echo $disabled?>/>
					<br/>
					<p class="description">
					<?php if ( ! empty( $QST_system )) { ?>
					<span class="description" style="color:#D54E21;">
						<?php _e('System questions will always be used internally for their intended purpose and any attempts to change them to something else may result in errors. For example, changing the sytem question for "Email" to ask for anything other than an email address will cause registration form validation errors, because the system will still be expecting that field to contain an email address. Admin Labels for System questions can not be edited','event_espresso')?>
					</span><br/>
					<?php } ?>
						<?php _e('An administrative label for this question to help you differentiate between two questions that may appear the same to registrants (but are for different events). For example: You could have two questions that simply ask the registrant to choose a "Size", then use this field to label one "T-shirt Size" and the other "Shoe Size".','event_espresso')?>
					</p>					
					<?php break;
					
						case 'QST_type':
								$disabled = ! empty( $QST_system ) ? ' disabled="disabled"' : ''; 
								echo EE_Form_fields::select_input( 'QST_type', $question_types, $question->type(), 'id="QST_type"' . $disabled );
					?>
					<br/>
					<p class="description">
						<?php 
						echo sprintf( 
							__("
								'TEXT' is best for small text based answers (fewer than 100 characters).%s
								'TEXTAREA' is best for large text based answers (paragraphs).%s
								'SINGLE' (radio buttons) is for a multiple-choice question where registrants can only choose one predetermined answer option.%s
								'MULTIPLE' (checkboxes) allow users to select multiple answer options. Best when there are only a few predetermined answer options.%s
								'DROPDOWN' (select boxes) allow users to select one or more answer options. Best when there are many predetermined answer options%s
								'DATE' uses a javascript calendar to allow users to select a date."  ,'event_espresso'),
							'<br />',
							'<br />',
							'<br />',
							'<br />',
							'<br />'
						);?>
					</p>

				</td>
			</tr>
			
			<tr id="question_options">
				<th>
					<label>
						<?php _e('Answer Options','event_espresso')?>
					</label>
				</th>
				<td>
				
					<table >
						<thead>
							<tr>
								<th style="padding:1em 10px 0 3px; line-height: 1em;">
									<?php _e('Option Value (key)','event_espresso')?>
								</th>
								<th style="padding:1em 10px 0 3px; line-height: 1em;">
									<?php _e('Answer Option Display Text','event_espresso')?>
								</th>
								<th style="padding:1em 10px 0 3px; line-height: 1em;">
								</th>
							</tr>
						</thead>
						
						<tbody>
							<tr class="question-option sample">
								<td style="padding: 0 10px 10px 0; line-height: 1em;">
									<input type="text" name="question_options[xxcountxx][QSO_value]" class="option-name medium-text">
								</td>
								<td style="padding: 0 10px 10px 0; line-height: 1em;">
									<input type="text" name="question_options[xxcountxx][QSO_text]" class="option-value regular-text">
								</td>
								<td style="padding: 0 10px 10px 0; line-height: 1em;">
									<a class="remove-option remove-item">
										<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/trash-16x16.png"/>
									</a>
								</td>
							</tr>
							
							<?php 
							$count=0;
							if ( $question_options = $question->options() ) {									
								foreach( $question_options as $option_id => $option ) { 
							?>
								<tr class="question-option">
									<td style="padding: 0 10px 10px 0; line-height: 1em;">
										<input type="text" class="regular-text" name="question_options[<?php echo $count?>][QSO_value]" value="<?php echo $option->value()?>">
									</td>
									<td style="padding: 0 10px 10px 0; line-height: 1em;">
										<input type="text" class="regular-text" name="question_options[<?php echo $count?>][QSO_text]" value="<?php echo $option->text()?>">
									</td>
									<?php if( $count > 0 ){ ?>
									<td style="padding: 0 10px 10px 0; line-height: 1em;">
										<a class="remove-option remove-item">
											<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/trash-16x16.png"/>
										</a>
									</td>
									<?php } ?>
									<?php
									echo EE_Form_Fields::hidden_input("question_options[{$count}][QST_ID])", $option->question_ID());
									echo EE_Form_Fields::hidden_input("question_options[{$count}][QSO_ID])", $option->ID());
									?>
								</tr>
								
								<?php 
									$count++;
								}
							} else {
							?>
							<tr class="question-option">
								<td style="padding: 0 10px 10px 0; line-height: 1em;">
									<input type="text" name="question_options[0][QSO_value]" class="option-name regular-text">
								</td>
								<td style="padding: 0 10px 10px 0; line-height: 1em;">
									<input type="text" name="question_options[0][QSO_text]" class="option-value regular-text">
								</td>
								<td style="padding: 0 10px 10px 0; line-height: 1em;">
								</td>
							</tr>							
							<?php	
							}
							?>
							
						</tbody>
					</table>
					
					<a id="new-question-option" class="button" style="margin:0 0 1em 3px;">
						<?php _e('Add Another Answer Option','event_espresso')?>
					</a><br/>
					
					<p class="description">
						<?php _e('Answer Options are the choices that you give people to select from for SINGLE, MULTIPLE or DROPDOWN questions. The Option Value is a simple key that will be saved to the database and the Answer Option Display Text is what the user will actually see in the form. For example, you may have a question for  "T-shirt Size" that has the Option Values of "S", "M", "L", and "XL" with the corresponding display text "Small", "Medium", "Large", and "Extra Large".','event_espresso')?>
					</p>
							
					<?php break;
					
					case 'QST_required':
					$system_required = array( 'fname', 'lname', 'email' );
					$disabled = in_array( $QST_system, $system_required ) ? ' disabled="disabled"' : ''; 
					$requiredOptions=array( 
						array('text'=>'Optional','id'=>0), 
						array('text'=>'Required','id'=>1)
					);
					echo EE_Form_Fields::select_input('QST_required', $requiredOptions, $question->required(), $disabled );?>
					<br/>
					<p class="description">
						<?php _e("Whether registrants are required to answer this question.",'event_espress');?>
					</p>					
					<?php break;
					
					case 'QST_required_text':?>
					<input type="text" class="regular-text" id="<?php echo $fieldName?>" name="<?php echo $fieldName?>" value="<?php echo $question->required_text()?>"/>
					<br/>
					<p class="description">
						<?php _e("Text to display when the registrant does not answer the question but is required to",'event_espresso');?>
					</p>					
					<?php break;
					
					case 'QST_admin_only':
					$adminOnlyOptions=array(
						array('text'=>'All Can See','id'=>0),
						array('text'=>'Only Admins can See','id'=>1)
					);
					echo EE_Form_Fields::select_input('QST_admin_only',$adminOnlyOptions,$question->admin_only());?>
					<br/>
					<p class="description">
						<?php _e("Only the administrator can see this field.",'event_espresso')?>
					</p>					
					<?php break;
					
					}?>
				</td>
			</tr>
			
			<?php }?>
		</tbody>
	</table>
	
	<div class="clear"></div>
</div>
