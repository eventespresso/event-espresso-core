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

if ( $QST_system === 'country' ) {
	echo EEH_HTML::div(
		EEH_HTML::h4( '<span class="dashicons dashicons-info"></span>' . esc_html__( 'Did you know...', 'event_espresso' ) ) .
		EEH_HTML::p(
			esc_html__(
				'If you add a State/Province Select input immediately after this Country Select input when building your registration form, then the State/Province Select input options will change to correspond with the choice made in this input. So for example, choosing "United States" in this Country Select input will populate the State/Province Select input with just the state options for the United States.',
				'event_espresso'
			)
		),
		'', 'ee-info-box'
	);
}
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
						$disabled_attr = ! empty( $QST_system ) ? ' disabled="disabled"' : '';
						$id =  ! empty( $QST_system ) ? '_disabled' : '';
					?>
					<input type="text" class="regular-text" id="QST_admin_label<?php echo $id?>" name="QST_admin_label<?php echo $id?>" value="<?php $question->f('QST_admin_label')?>"<?php echo $disabled_attr?>/>
					<input class="QST_order" type="hidden" id="QST_order<?php echo $id; ?>" name = "QST_order<?php echo $id; ?>" value="<?php echo $question->get('QST_order'); ?>" />
					<?php if ( ! empty( $QST_system )) { ?>
						<input type="hidden"  id="QST_admin_label" name="QST_admin_label" value="<?php echo $question->admin_label()?>"/>
					<?php } ?>
					<br/>
					<p class="description">
					<?php if ( ! empty( $QST_system )) { ?>
					<span class="description" style="color:#D54E21;">
						<?php esc_html_e('System question! This field cannot be changed.','event_espresso')?>
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
						$disabled_attr = ! empty( $QST_system ) ? ' disabled="disabled"' : '';
						$id =  ! empty( $QST_system ) ? '_disabled' : '';
						$admin_only = $question->get('QST_admin_only');
						$checked = !empty( $admin_only ) ? ' checked="checked"' : '';
					?>
					<input class="QST_admin_only" type="checkbox" id="QST_admin_only<?php echo $id; ?>" name = "QST_admin_only<?php echo $id; ?>" value="1"<?php echo $disabled_attr; echo $checked; ?>/>
					<br/>
					<p class="description">
					<?php if ( ! empty( $QST_system )) { ?>
					<span class="description" style="color:#D54E21;">
						<?php esc_html_e('System question! This field cannot be changed.','event_espresso')?>
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
                        $disabled = ! empty( $QST_system ) && $QST_system !== EEM_Attendee::system_question_phone;
                        if( $disabled ){
                            $disabled_attr =  'disabled="disabled"';
						    $id =  '_disabled';
                        } else {
                            $disabled_attr = '';
                            $id = '';
                        }

						echo EEH_Form_Fields::select_input( 'QST_type' . $id, $question_types, $question->type(), 'id="QST_type' . $id . '"' . $disabled_attr );
						if( $disabled ) { ?>
							<input type="hidden"  id="QST_type" name="QST_type" value="<?php echo $question->type()?>"/>
						<?php
							$explanatory_text = esc_html__('System question! This field cannot be changed.','event_espresso');
						}else{
							$explanatory_text = esc_html__('Because there are currently answers for this question in the database, your options to change the question type have been limited to similar question-types.','event_espresso');
						}
						if ( $disabled || $has_answers ) { ?>
							<p><span class="description" style="color:#D54E21;">
								<?php echo $explanatory_text; ?>
							</span></p>
					<?php } ?>

					<?php echo $question_type_descriptions; ?>

				</td>
			</tr>
			<tr id="text_input_question_options">
				<th>
					<label>
						<?php esc_html_e( 'Maximum Allowed Response Size', 'event_espresso' );?>
					</label>
				</th>
				<td>
					<input id="QST_max" name="QST_max" type="number" <?php echo $max_max === EE_INF ? '' : "max='$max_max'";?> value="<?php $question->f( 'QST_max' );?>" min="1">
					<p>
						<span class="description">
							<?php esc_html_e( 'Maximum number of characters allowed when answering this question', 'event_espresso' );?>
						</span>
					</p>
					<?php if ( $QST_system ) { ?>
					<p>
						<span class="description" style="color:#D54E21;">
							<?php printf(
									esc_html__( 'System question! The maximum number of characters that can be used for this question is %1$s', 'event_espresso' ),
									$max_max );?>
						</span>
					</p>
					<?php } ?>
				</td>
			</tr>
			<tr id="question_options">
				<th>
					<label>
						<?php esc_html_e('Answer Options','event_espresso')?>
					</label>
				</th>
				<td>

					<table class="question-options-table">
						<thead>
							<tr>
								<th class="option-value-header">
									<?php esc_html_e('Value','event_espresso')?>
								</th>
								<th class="option-desc-header">
									<?php esc_html_e('Description (optional, only shown on registration form)','event_espresso')?>
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
									$disabled_attr = $has_answers || $option->get('QSO_system') ? ' disabled="disabled"'  : '';
							?>
								<tr class="question-option ee-options-sortable">
									<td class="option-value-cell">
										<input type="hidden" class="QSO_order" name="question_options[<?php echo $count; ?>][QSO_order]" value="<?php echo $count; ?>">
										<input type="text" class="option-value regular-text" name="question_options[<?php echo $count?>][QSO_value]" value="<?php  $option->f('QSO_value')?>"<?php echo $disabled_attr; ?>>
										<?php if ( $has_answers ) : ?>
											<input type="hidden" name="question_options[<?php echo $count; ?>][QSO_value]" value="<?php echo $option->f('QSO_value'); ?>" >
										<?php endif; ?>
									</td>
									<td class="option-desc-cell">
										<input type="text" class="option-desc regular-text" name="question_options[<?php echo $count?>][QSO_desc]" value="<?php $option->f('QSO_desc')?>">
									</td>
									<td>
										<?php if ( ! $option->system() ) { ?>
											<span class="dashicons clickable dashicons-post-trash ee-icon-size-18 remove-option remove-item"></span>
										<?php } ?>
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
						<?php esc_html_e('Add Another Answer Option','event_espresso')?>
					</a><br/>

					<p class="description">
						<?php esc_html_e('Answer Options are the choices that you give people to select from for RADIO_BTN, CHECKBOX or DROPDOWN questions. The Value is a simple key that will be saved to the database and the description is optional. Note that values CANNOT contain any HTML, but descriptions can.','event_espresso')?>
					</p>
					<?php if ( $has_answers ) : ?>
					<p class="description" style="color:#D54E21;">
							<?php esc_html_e('Answer values that are uneditable are this way because there are registrations in the database that have answers for this question.  If you need to correct a mistake, or edit an existing option value, then trash the existing one and create a new option with the changes.  This will ensure that the existing registrations that chose the original answer will preserve that answer.', 'event_espresso'); ?>
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
					$system_required = array( 'fname', 'email' );
					$disabled_attr = in_array( $QST_system, $system_required ) ? ' disabled="disabled"' : '';
					$required_on = $question->get('QST_admin_only');
					$show_required_msg = $required_on ? '' : ' display:none;';
					$disabled_attr = $required_on || ! empty( $disabled_attr ) ? ' disabled="disabled"' : '';
					$id = ! empty( $disabled_attr ) && in_array( $QST_system, $system_required) ? '_disabled' : '';
					$requiredOptions=array(
						array( 'text'=> esc_html__( 'Optional', 'event_espresso' ), 'id'=>0 ),
						array( 'text'=> esc_html__( 'Required', 'event_espresso' ), 'id'=>1 )
					);
					echo EEH_Form_Fields::select_input('QST_required' . $id, $requiredOptions, $question->required(), 'id="QST_required' . $id . '"' . $disabled_attr );
					?>
						<p><span id="required_toggled_on" class="description" style="color:#D54E21;<?php echo $show_required_msg; ?>">
						<?php esc_html_e('Required is set to optional, and this field is disabled, because the question is Admin-Only.','event_espresso')?>
						</span></p>
						<p><span id="required_toggled_off" class="description" style="color:#D54E21; display: none;">
							<?php esc_html_e('Required option field is no longer disabled because the question is not Admin-Only','event_espresso')?>
						</span></p>
					<?php if (! empty( $disabled_attr ) && in_array( $QST_system, $system_required ) ) { ?>
						<input type="hidden"  id="QST_required" name="QST_required" value="1"/>
						<p><span class="description" style="color:#D54E21;">
						<?php esc_html_e('System question! This field cannot be changed.','event_espresso')?>
					</span></p>
					<?php } ?>

				</td>
			</tr>

			<tr>
				<th>
					<label for="QST_required_text"><?php esc_html_e('Required Text', 'event_espresso'); ?></label> <?php echo EEH_Template::get_help_tab_link('required_text_info');?>
				</th>
				<td>
					<input type="text" maxlength="100" class="regular-text" id="QST_required_text" name="QST_required_text" value="<?php  $question->f('QST_required_text')?>"/>

				</td>
			</tr>

		</tbody>
	</table>

	<div class="clear"></div>
</div>
