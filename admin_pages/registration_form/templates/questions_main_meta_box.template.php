<?php
//PARAMS THAT MUST BE PASSED ARE:
assert(isset($QST_ID));
assert($question);
assert($question instanceof EE_Question);
assert($question_types);

//start output
echo EEH_Form_Fields::hidden_input('QST_system', $question->system_ID());
echo EEH_Form_Fields::hidden_input('QST_wp_user', $question->wp_user());
echo EEH_Form_Fields::hidden_input('QST_deleted', $question->deleted());
$QST_system = $question->system_ID();
$fields = $question->get_model()->field_settings();
?>

<div class="padding">
	<table class="form-table">
		<tbody>
			<tr>
				<th>
					<label for="QST_display_text"><?php echo $fields['QST_display_text']->get_nicename();?></label> <?php echo EEH_Template::get_help_tab_link('question_text_info');?>
				</th>
				<td>
					<input type="text" class="regular-text" id="QST_display_text" name="QST_display_text" value="<?php echo $question->display_text()?>"/>
					
				</td>
			</tr>
			
			<tr>
				<th>
					<label for="QST_admin_label"><?php echo $fields['QST_admin_label']->get_nicename();?></label> <?php echo EEH_Template::get_help_tab_link('question_label_info');?>
				</th>
				<td>
					<?php 
						$disabled = ! empty( $QST_system ) ? ' disabled="disabled"' : '';
						$id =  ! empty( $QST_system ) ? '_disabled' : '';
					?>
					<input type="text" class="regular-text" id="QST_admin_label<?php echo $id?>" name="QST_admin_label<?php echo $id?>" value="<?php echo $question->admin_label()?>"<?php echo $disabled?>/>
					<?php if ( ! empty( $QST_system )) { ?>
						<input type="hidden"  id="QST_admin_label" name="QST_admin_label" value="<?php echo $question->admin_label()?>"/>
					<?php } ?>
					<br/>
					<p class="description">
					<?php if ( ! empty( $QST_system )) { ?>
					<span class="description" style="color:#D54E21;">
						<?php _e('System question! This field cannot be changed.','event_espresso')?>
					</span>
					<?php } ?>
						
					</p>					
				</td>
			</tr>
			<tr>
				<th>
					<label for="QST_order"><?php echo $fields['QST_order']->get_nicename();?></label> <?php echo EEH_Template::get_help_tab_link('question_order');?>
				</th>
				<td>
					<input class="QST_order" type="text" id="QST_order<?php echo $id; ?>" name = "QST_order<?php echo $id; ?>" value="<?php echo $question->get('QST_order'); ?>" />
					<br/>					
				</td>
			</tr>

			<tr>
				<th>
					<label for="QST_admin_only"><?php echo $fields['QST_admin_only']->get_nicename();?></label> <?php echo EEH_Template::get_help_tab_link('question_admin_only_info');?>
				</th>
				<td>
					<?php 
						$disabled = ! empty( $QST_system ) ? ' disabled="disabled"' : '';
						$id =  ! empty( $QST_system ) ? '_disabled' : '';
						$admin_only = $question->get('QST_admin_only');
						$checked = !empty( $admin_only ) ? ' checked="checked"' : '';
					?>
					<input class="QST_admin_only" type="checkbox" id="QST_admin_only<?php echo $id; ?>" name = "QST_admin_only<?php echo $id; ?>" value="1"<?php echo $disabled; echo $checked; ?>/>
					<br/>
					<p class="description">
					<?php if ( ! empty( $QST_system )) { ?>
					<span class="description" style="color:#D54E21;">
						<?php _e('System question! This field cannot be changed.','event_espresso')?>
					</span>
					<?php } ?>
						
					</p>					
				</td>
			</tr>
			
			<tr>
				<th>
					<label for="QST_type"><?php echo $fields['QST_type']->get_nicename();?></label> <?php echo EEH_Template::get_help_tab_link('question_type_info');?>
				</th>
				<td>
					<?php 
						$disabled = ! empty( $QST_system ) ? ' disabled="disabled"' : '';
						$id =  ! empty( $QST_system ) ? '_disabled' : '';
						echo EEH_Form_Fields::select_input( 'QST_type' . $id, $question_types, $question->type(), 'id="QST_type' . $id . '"' . $disabled );
						if ( ! empty( $QST_system )) { ?>
						<input type="hidden"  id="QST_type" name="QST_type" value="<?php echo $question->type()?>"/>
						<p><span class="description" style="color:#D54E21;">
						<?php _e('System question! This field cannot be changed.','event_espresso')?>
					</span></p>
					<?php } ?>
					
					

				</td>
			</tr>
			
			<tr id="question_options">
				<th>
					<label>
						<?php _e('Answer Options','event_espresso')?>
					</label>
				</th>
				<td>
				
					<table class="question-options-table">
						<thead>
							<tr>
								<th class="option-value-header">
									<?php _e('Value','event_espresso')?>
								</th>
								<th class="option-desc-header">
									<?php _e('Description (optional, only shown on registration form)','event_espresso')?>
								</th>
								<th>
								</th>
							</tr>
						</thead>
						
						<tbody>
							<tr class="question-option sample">
								<td class="option-value-cell">
									<input type="text" name="question_options[xxcountxx][QSO_value]" class="option-value regular-text">
								</td>
								<td class="option-desc-cell">
									<input type="text" name="question_options[xxcountxx][QSO_desc]" class="option-desc regular-text">
								</td>
								<td>
									<a class="remove-option remove-item">
										<img src="<?php echo EE_GLOBAL_ASSETS_URL ?>images/trash-16x16.png"/>
									</a>
								</td>
							</tr>
							
							<?php 
							$count=0;
							if ( $question_options = $question->options() ) {									
								foreach( $question_options as $option_id => $option ) { 
							?>
								<tr class="question-option">
									<td class="option-value-cell">
										<input type="text" class="option-value regular-text" name="question_options[<?php echo $count?>][QSO_value]" value="<?php echo $option->value()?>">
									</td>
									<td class="option-desc-cell">
										<input type="text" class="option-desc regular-text" name="question_options[<?php echo $count?>][QSO_desc]" value="<?php echo $option->desc()?>">
									</td>
									<?php if( $count > 0 ){ ?>
									<td>
										<a class="remove-option remove-item">
											<img src="<?php echo EE_GLOBAL_ASSETS_URL ?>images/trash-16x16.png"/>
										</a>
									</td>
									<?php } ?>
									<?php
									echo EEH_Form_Fields::hidden_input("question_options[{$count}][QST_ID])", $option->question_ID());
									echo EEH_Form_Fields::hidden_input("question_options[{$count}][QSO_ID])", $option->ID());
									?>
								</tr>
								
								<?php 
									$count++;
								}
							} else {
							?>
							<tr class="question-option">
								<td class="option-value-cell">
									<input type="text" name="question_options[0][QSO_value]" class="option-value regular-text">
								</td>
								<td class="option-desc-cell">
									<input type="text" name="question_options[0][QSO_desc]" class="option-desc regular-text">
								</td>
								<td>
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
				</td>
			</tr>
			
			<tr>
				<th>
					<label for="QST_required"><?php echo $fields['QST_required']->get_nicename();?></label> <?php echo EEH_Template::get_help_tab_link('required_question_info');?>
				</th>
				<td>
					<?php 
					$system_required = array( 'fname', 'lname', 'email' );
					$disabled = in_array( $QST_system, $system_required ) ? ' disabled="disabled"' : ''; 
					$required_on = $question->get('QST_admin_only');
					$show_required_msg = $required_on ? '' : ' display:none;';
					$disabled = $required_on ? ' disabled="disabled"' : '';
					$id =  ! empty( $disabled ) ? '_disabled' : '';
					$requiredOptions=array( 
						array('text'=>'Optional','id'=>0), 
						array('text'=>'Required','id'=>1)
					);
					echo EEH_Form_Fields::select_input('QST_required' . $id, $requiredOptions, $question->required(), 'id="QST_required' . $id . '"' . $disabled );
					?>
						<p><span id="required_toggled_on" class="description" style="color:#D54E21;<?php echo $show_required_msg; ?>">
						<?php _e('Required is set to optional, and this field is disabled, because the question is Admin-Only.','event_espresso')?>
					</span></p>
					<p><span id="required_toggled_off" class="description" style="color:#D54E21; display: none;">
						<?php _e('Required option field is no longer disabled because the question is not Admin-Only','event_espresso')?>
					</span></p>
					<?php if ( ! empty( $disabled )) { ?>
						<input type="hidden"  id="QST_required" name="QST_required" value="1"/>
						<p><span class="description" style="color:#D54E21;">
						<?php _e('System question! This field cannot be changed.','event_espresso')?>
					</span></p>
					<?php } ?>					
					
				</td>
			</tr>
			
			<tr>
				<th>
					<label for="QST_required_text"><?php _e('Required Text', 'event_espresso'); ?></label> <?php echo EEH_Template::get_help_tab_link('required_text_info');?>
				</th>
				<td>
					<input type="text" class="regular-text" id="QST_required_text" name="QST_required_text" value="<?php echo $question->required_text()?>"/>
									
				</td>
			</tr>
					
		</tbody>
	</table>
	
	<div class="clear"></div>
</div>