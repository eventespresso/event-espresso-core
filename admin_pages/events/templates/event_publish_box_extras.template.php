
<div class="misc-pub-section">
	<span class="dashicons dashicons-groups ee-icon-color-ee-green ee-icon-size-20"></span>
	<a href="<?php echo $view_approved_reg_url;?>">
		<?php printf( __('%s Registrations', 'event_espresso'), EEH_Template::pretty_status(EEM_Registration::status_id_approved, FALSE, 'sentence') ); ?>
	</a>:
	<?php echo $approved_regs; ?>
</div>
<div class="misc-pub-section">
	<span class="dashicons dashicons-groups ee-icon-color-ee-blue ee-icon-size-20"></span>
	<a href="<?php echo $view_pending_payment_reg_url;?>">
		<?php printf( __('%s Registrations', 'event_espresso'), EEH_Template::pretty_status(EEM_Registration::status_id_pending_payment, FALSE, 'sentence') ); ?>
	</a>:
	<?php echo $pending_payment_regs; ?>
</div>
<div class="misc-pub-section">
	<span class="dashicons dashicons-groups ee-icon-color-ee-orange ee-icon-size-20"></span>
	<a href="<?php echo $view_not_approved_reg_url;?>">
		<?php printf( __('%s Registrations', 'event_espresso'), EEH_Template::pretty_status(EEM_Registration::status_id_not_approved, FALSE, 'sentence') ); ?>
	</a>:
	<?php echo $not_approved_regs; ?>
</div>
<?php /*
//todo .. hook in newsletter message type trigger in later versions.
<div class="misc-pub-section <?php echo $misc_pub_section_class; ?>" id="visibility2">
	<a href="<?php echo $email_attendees_url;?>" title="<?php _e('Email Event Attendees', 'event_espresso'); ?>">
		<div class="ee-icon ee-icon-email-send"></div>
		<?php _e('Email Event Attendees', 'event_espresso'); ?>
	</a>
</div> /**/ ?>

<?php echo $event_editor_overview_add;?>