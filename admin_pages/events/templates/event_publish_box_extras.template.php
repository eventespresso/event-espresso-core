
<div class="misc-pub-section">
	<span class="dashicons dashicons-groups ee-icon-color-grey ee-icon-size-20"></span>
	<a href="<?php echo $view_attendees_url;?>">
		<?php _e('Registrations', 'event_espresso'); ?>
	</a>:
	<?php echo $attendees_reg_limit; ?>
</div>
<?php /*
//todo .. hook in newsletter message type trigger in later versions.
<div class="misc-pub-section <?php echo $misc_pub_section_class; ?>" id="visibility2">
	<a href="<?php echo $email_attendees_url;?>" title="<?php _e('Email Event Attendees', 'event_espresso'); ?>">
		<img src="<?php echo EE_GLOBAL_ASSETS_URL ?>images/email_go.png" width="16" height="16" alt="<?php _e('Newsletter', 'event_espresso'); ?>" />
		<?php _e('Email Event Attendees', 'event_espresso'); ?>
	</a>
</div> /**/ ?>

<?php echo $event_editor_overview_add;?>