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

//does question have any answers? cause if it does then we have to disable type
$has_answers = $question->has_answers();
?>

<div class="padding">
	<table class="form-table">
		<tbody>
			<tr>
				<th>
					<label for="QST_display_text"><?php echo $fields['QST_display_text']->get_nicename();?></label> <?php echo EEH_Template::get_help_tab_link('question_text_info');?>
				</th>
				<td>
					<input type="text" class="regular-text" id="QST_display_text" name="QST_display_text" value="<?php $question->f('QST_display_text')?>"/>

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
					<input type="text" class="regular-text" id="QST_admin_label<?php echo $id?>" name="QST_admin_label<?php echo $id?>" value="<?php $question->f('QST_admin_label')?>"<?php echo $disabled?>/>
					<input class="QST_order" type="hidden" id="QST_order<?php echo $id; ?>" name = "QST_order<?php echo $id; ?>" value="<?php echo $question->get('QST_order'); ?>" />
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
						$disabled = $has_answers ? ' disabled="disabled"' : $disabled;
						$id = $has_answers ? ' _disabled' : $id;
						echo EEH_Form_Fields::select_input( 'QST_type' . $id, $question_types, $question->type(), 'id="QST_type' . $id . '"' . $disabled );
						if ( ! empty( $QST_system ) || $has_answers ) { ?>
							<input type="hidden"  id="QST_type" name="QST_type" value="<?php echo $question->type()?>"/>
							<p><span class="description" style="color:#D54E21;">
								<?php if ( $has_answers ) : ?>
									<?php _e('This field cannot be changed because there are currently answers for this question in the database.','event_espresso')?>
								<?php else : ?>
									<?php _e('System question! This field cannot be changed.','event_espresso')?>
								<?php endif; ?>
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
									<input type="hidden" class="QSO_order" name="question_options[xxcountxx][QSO_order]" value="0"/>
									<input type="text" name="question_options[xxcountxx][QSO_value]" class="option-value regular-text">
								</td>
								<td class="option-desc-cell">
									<input type="text" name="question_options[xxcountxx][QSO_desc]" class="option-desc regular-text">
								</td>
								<td>
									<span class="dashicons clickable dashicons-post-trash ee-icon-size-18 remove-option remove-item"></span>
									<span class="dashicons dashicons-image-flip-vertical sortable-drag-handle ee-icon-size-18"></span>
								</td>
							</tr>

							<?php
							$count=0;
							$question_options = $question->options();
							if ( ! empty( $question_options )) {
								foreach( $question_options as $option_id => $option ) {
									$disabled =  $has_answers ? ' disabled="disabled"' : '';
									$id = $has_answers ? '_disabled' : '';
							?>
								<tr class="question-option ee-options-sortable">
									<td class="option-value-cell">
										<input type="hidden" class="QSO_order" name="question_options<?php echo $id;?>[<?php echo $count; ?>][QSO_order]" value="<?php $count; ?>">
										<input type="text" class="option-value regular-text" name="question_options<?php echo $id; ?>[<?php echo $count?>][QSO_value]" value="<?php  $option->f('QSO_value')?>"<?php echo $disabled; ?>>
										<?php if ( $has_answers ) : ?>
											<input type="hidden" name="question_options[<?php echo $count; ?>][QSO_value]" value="<?php echo $option->f('QSO_value'); ?>" >
										<?php endif; ?>
									</td>
									<td class="option-desc-cell">
										<input type="text" class="option-desc regular-text" name="question_options[<?php echo $count?>][QSO_desc]" value="<?php $option->f('QSO_desc')?>">
									</td>
									<td>
										<span class="dashicons clickable dashicons-post-trash ee-icon-size-18 remove-option remove-item"></span>
										<span class="dashicons dashicons-image-flip-vertical sortable-drag-handle ee-icon-size-18"></span>
									</td>
									<?php
									echo EEH_Form_Fields::hidden_input("question_options[{$count}][QST_ID])", $option->question_ID());
									echo EEH_Form_Fields::hidden_input("question_options[{$count}][QSO_ID])", $option->ID());
									$count++;
									?>
								</tr>
								<?php
								}
							} else {
							?>
							<tr class="question-option ee-options-sortable">
								<td class="option-value-cell">
									<input type="hidden" class="QSO_order" name="question_options[0][QSO_order]" value="0"/>
									<input type="text" name="question_options[0][QSO_value]" class="option-value regular-text">
								</td>
								<td class="option-desc-cell">
									<input type="text" name="question_options[0][QSO_desc]" class="option-desc regular-text">
								</td>
								<td>
									<?php
										echo EEH_Form_Fields::hidden_input("question_options_count", $count);
									?>
								</td>
							</tr>
							<?php
							}
							?>
							<tr style="display:none">
								<td colspan="3"><?php echo EEH_Form_Fields::hidden_input("question_options_count", $count); ?></td>
							</tr>
						</tbody>
					</table>

					<a id="new-question-option" class="button" style="margin:0 0 1em 3px;">
						<?php _e('Add Another Answer Option','event_espresso')?>
					</a><br/>

					<p class="description">
						<?php _e('Answer Options are the choices that you give people to select from for SINGLE, MULTIPLE or DROPDOWN questions. The Value is a simple key that will be saved to the database and the description is optional. Note that values CANNOT contain any HTML, but descriptions can.','event_espresso')?>
					</p>
					<?php if ( $has_answers ) : ?>
					<p class="description" style="color:#D54E21;">
							<?php _e('Answer values that are uneditable are this way because there are registrations in the database that have answers for this question.  If you need to correct a mistake, or edit an existing option value, then trash the existing one and create a new option with the changes.  This will ensure that the existing registrations that chose the original answer will preserve that answer.', 'event_espresso'); ?>
					</p>

					<?php endif; ?>
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
					$disabled = $required_on || ! empty( $disabled ) ? ' disabled="disabled"' : '';
					$id =  ! empty( $disabled ) && in_array( $QST_system, $system_required) ? '_disabled' : '';
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
					<?php if ( ! empty( $disabled ) && in_array( $QST_system, $system_required ) ) { ?>
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
					<input type="text" class="regular-text" id="QST_required_text" name="QST_required_text" value="<?php  $question->f('QST_required_text')?>"/>

				</td>
			</tr>

		</tbody>
	</table>

	<div class="clear"></div>
</div>
