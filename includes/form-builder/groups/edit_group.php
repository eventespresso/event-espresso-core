<?php

//Function to edit a group of questions
function event_espresso_form_group_edit() {
	global $wpdb;
	$g_sql = "SELECT qg.id, qg.group_name, qg.group_order, qg.group_identifier, qg.group_description, qg.show_group_name, qg.show_group_description, qg.wp_user, qg.system_group ";
	$g_sql .= " FROM  " . EVENTS_QST_GROUP_TABLE . " qg ";
	$g_sql .= " WHERE ";
	$g_sql .= " qg.id = '" . $_REQUEST['group_id'] . "' ";
	$g_sql .= " ORDER BY id ASC ";
	//echo $g_sql;

	$groups = $wpdb->get_results($g_sql);
	if ($wpdb->num_rows > 0) {
		foreach ($groups as $group) {
			$group_id = $group->id;
			$group_order = $group->group_order;
			$group_name = stripslashes($group->group_name);
			$group_identifier = stripslashes($group->group_identifier);
			$group_description = stripslashes($group->group_description);
			$question = stripslashes(empty($group->question) ? '' : $group->question);
			$show_group_name = $group->show_group_name;
			$show_group_description = $group->show_group_description;
			$system_group = $group->system_group;
			$wp_user = $group->wp_user;
		}
	}
	?>
	<div id="add-edit-new-group" class="metabox-holder">
		<div class="postbox">
					 	<div title="Click to toggle" class="handlediv"><br /></div>
			<h3 class="hndle"><?php _e('Edit Group - ', 'event_espresso'); ?><span><?php echo $group_name ?></span></h3>
			 <div class="inside">
				<form name="newgroup" method="post" action="<?php echo $_SERVER["REQUEST_URI"] ?>">
					<table id="table-edit-group" class="ee-tables" border="0">
						<tr>
							<td class="a"  valign="top">
								<fieldset id="general-group-info">
								<legend><?php _e('Group Information', 'event_espresso') ?></legend>
								<ul>

									<li>
										<label for="group_name"><?php _e('Group Name:', 'event_espresso'); ?></label>
										<input name="group_name" id="group_name" size="50" value="<?php echo $group_name ?>" type="text" />
									</li>

									<li>
										<label for="group_order"><?php _e('Group Order:', 'event_espresso'); ?></label>
										<input name="group_order" id="group_order" size="6" value="<?php echo $group_order ?>" type="text" />
									</li>

									<li>
										<label for="group_identifier"><?php _e('Group Identifier:', 'event_espresso'); ?></label>
										<input disabled="disabled" name="group_identifier" id="group_identifier" size="50" value="<?php echo $group_identifier ?>" type="text" />
									</li>

									<li>
										<label for="group_description"><?php _e('Description:', 'event_espresso'); ?></label>
										<textarea name="group_description" cols="40" rows="5"><?php echo $group_description ?></textarea>
									</li>

									<li class="checkbox-group-name">
										<label for="show_group_name">
											<input type="checkbox" name="show_group_name" id="show_group_name" value="1" <?php if ($show_group_name != 0): ?> checked="checked"<?php endif; ?> />
											<?php _e('Show group name on registration page?', 'event_espresso'); ?>
										</label>
									</li>

									<li class="checkbox-group-desc">
										<label for="show_group_description">
											<input type="checkbox" name="show_group_description" id="show_group_description" value="1" <?php if ($show_group_description != 0): ?> checked="checked"<?php endif; ?> />
											<?php _e('Show group description on registration page?', 'event_espresso'); ?>
										</label>
									</li>

								</ul>
								</fieldset>
							</td>
							<td class="b"  valign="top">
							  <fieldset id="questions-for-group">
								<legend><?php _e('Questions', 'event_espresso') ?></legend>															

									<ul>
									 <li><p><?php _e('Selected Questions for group<span class="info"> Uncheck box to remove question from group</span>', 'event_espresso') ?></p></li>
									<?php
//Questions that are already associated with this group
									$q_sql = "SELECT q.id, q.question, qgr.id as rel_id, q.system_name, qg.system_group ";
									$q_sql .= " FROM " . EVENTS_QUESTION_TABLE . " q ";
									$q_sql .= " JOIN " . EVENTS_QST_GROUP_REL_TABLE . " qgr ";
									$q_sql .= " on q.id = qgr.question_id ";
									$q_sql .= " JOIN " . EVENTS_QST_GROUP_TABLE . " qg ";
									$q_sql .= " on qg.id = qgr.group_id ";
									$q_sql .= " WHERE qg.id = " . $_REQUEST['group_id'];
									if (function_exists('espresso_member_data')) {
										$q_sql .= " AND ";
										if ($wp_user == 0 || $wp_user == 1) {
											$q_sql .= " (qg.wp_user = '0' OR qg.wp_user = '1') ";
										} else {
											$q_sql .= " qg.wp_user = '" . $wp_user . "' ";
										}
									}
									$q_sql .= " ORDER BY q.sequence, q.id ASC ";
									//echo $q_sql;
									$questions = $wpdb->get_results($q_sql);
									$questions_in_group = '';
									if ($wpdb->num_rows > 0) {

										foreach ($questions as $question) {
											$questions_in_group .= $question->id . ',';
											$checked = (!is_null($question->rel_id)) ? 'checked="checked"' : '';

											$disabled_system_required = (preg_match("/fname|lname|email/", $question->system_name) == 1 && $question->system_group == 1 ) ? 'disabled="disabled"' : '';

											if ( $question->system_group && !$system_group ) continue;
											echo '<li><label><input ' . $checked . ' type="checkbox" ' . $disabled_system_required . ' name="question_id[' . $question->id . ']" value="' . $question->id . '" id="question_id_' . $question->id . '" />' . stripslashes($question->question) . '</label></li>';
										}
										$questions_in_group = substr($questions_in_group, 0, -1);
									}
									?>
									
									</ul>
									<ul id="add-more-questions">
									<li><p><?php _e('Add further questions to group', 'event_espresso') ?></p></li>
									<?php
									//Questions that are NOT part of this group.
									// @todo Make this happen with one query above 
									$q_sql2 = "SELECT q.id, q.question, qg.system_group FROM " . EVENTS_QUESTION_TABLE . " q LEFT JOIN " . EVENTS_QST_GROUP_REL_TABLE . " qr ON q.id = qr.question_id LEFT JOIN " . EVENTS_QST_GROUP_TABLE . " qg ON qg.id = qr.group_id WHERE";
									if ($questions_in_group != '') {
										$q_sql2 .= " q.id not in($questions_in_group) AND ";
									}
									if (function_exists('espresso_member_data')) {
										if ($wp_user == 0 || $wp_user == 1) {
											$q_sql2 .= " q.wp_user = '0' OR q.wp_user = '1' ";
										} else {
											$q_sql2 .= " q.wp_user = '" . $wp_user . "' ";
										}
									} else {
										$q_sql2 .= " (q.wp_user = '0' OR q.wp_user = '1') ";
									}
									$q_sql2 .= " GROUP BY id ORDER BY id ASC ";
									$questions = $wpdb->get_results($q_sql2);

									if ($wpdb->num_rows > 0) {

										foreach ($questions as $question) {
											$checked = '';
											if ( $question->system_group && !$system_group ) continue;
											echo '<li><label><input ' . $checked . ' type="checkbox" name="question_id[' . $question->id . ']" value="' . $question->id . '" id="question_id_' . $question->id . '" />' . stripslashes($question->question) . '</label></li>';
										}
									}
									?>
								</ul>
								</fieldset>
							</td>
						</tr>
					</table>

					<p class="submit-footer">
						<?php if ( $system_group ) : ?>
							<input type="hidden" name="question_id[1]" value="1" />
							<input type="hidden" name="question_id[2]" value="2" />
							<input type="hidden" name="question_id[3]" value="3" />
						<?php endif; ?>
						<input type="hidden" name="edit_action" value="update_group" />
						<input type="hidden" name="action" value="update_group" />
						<input type="hidden" name="group_id" value="<?php echo $group_id ?>" />
						<input name="Submit" value="Update Group" type="submit" />
													<?php wp_nonce_field( 'espresso_form_check', 'edit_group' ); ?>
					</p>
				</form>
			</div>
		</div>
	</div>
	<?php
}