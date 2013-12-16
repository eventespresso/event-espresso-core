<?php
function question_groups_tab_overview_info_help_tab_html() {
?>
	<h2>
		<?php _e('Question Groups Overview', 'event_espresso'); ?>
	</h2>
	<p>
		<?php _e("Question Groups allow you to create modular registration forms. Each registration form consists of one or more question groups, and these are allocated on a per event basis.", 'event_espresso'); ?>
	</p>
	<p>
		<?php _e("Dragging and dropping the question groups will change their order, and thus the order they are seen in on the registration form.", 'event_espresso'); ?>
	</p>
<?php
}

function group_name_info_help_tab_html() {
?>
	<h2>
		<?php _e('Group Name', 'event_espresso'); ?>
	</h2>
	<p>
		<?php _e("A name or heading for this group of questions that can be used to organize your Registration Form. For example: Address Information.", 'event_espresso'); ?>
	</p>
<?php
}

function group_identifier_info_help_tab_html() {
?>
	<h2>
		<?php _e('Group Identifier', 'event_espresso'); ?>
	</h2>
	<p>
		<?php _e('The "Group Identifier" is a unique name for this group that can be used to distinguish it from all other groups in the system. A Group Identifier therefore can not be the same as any other. It will NOT be displayed to site visitors. If left blank, one will be automagically generated for you, ie: address-info-12345.','event_espresso')?>
	</p>
<?php
}

function group_description_info_help_tab_html() {
?>
	<h2>
		<?php _e('Group Description', 'event_espresso'); ?>
	</h2>
	<p>
		<?php _e('A description of this question group.','event_espresso')?>
	</p>
<?php
}

function show_group_name_info_help_tab_html() {
?>
	<h2>
		<?php _e('Show Group Name', 'event_espresso'); ?>
	</h2>
	<p>
		<?php _e('Whether or not to show the group name on the registration page.','event_espresso')?>
	</p>
<?php
}

function show_group_description_info_help_tab_html() {
?>
	<h2>
		<?php _e('Show Group Description', 'event_espresso'); ?>
	</h2>
	<p>
		<?php _e('Whether or not to show the group description on the registration page.','event_espresso')?>
	</p>
<?php
}
