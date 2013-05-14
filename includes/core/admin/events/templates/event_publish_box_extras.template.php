		<div id="minor-publishing">

	<div id="minor-publishing-actions" class="clearfix">
		<div id="preview-action">
			<a class="preview button" href="<?php echo $reg_url; ?>" target="_blank" id="event-preview" >
				<?php _e('View Event', 'event_espresso'); ?>
			</a>
			<input type="hidden" name="event-preview" id="event-preview" value="" />
		</div>
		<!--<div id="copy-action">
			<a class="preview button" href="<?php echo $event_preview_url; ?>" id="post-copy" onclick="return confirm('<?php _e('Are you sure you want to copy ' . $event_name . '?', 'event_espresso'); ?>')">
				<?php _e('Duplicate Event', 'event_espresso'); ?>
			</a>
			<input  type="hidden" name="event-copy" id="event-copy" value="" />
		</div>-->
	</div>
	<!-- /minor-publishing-actions -->

	<div id="misc-publishing-actions">
		<div class="misc-pub-section curtime" id="visibility">
			<span id="timestamp">
				<?php _e('Start Date', 'event_espresso'); ?>
				<b><?php echo $event_start_date; ?></b>
			</span>
		</div>
		<div class="misc-pub-section">
			<label for="post_status">
				<?php _e('Current Status:', 'event_espresso'); ?>
			</label>
			<span id="post-status-display">
				<?php echo $event_status_display; ?>
			</span>
		</div>

		<div class="misc-pub-section" id="visibility">
			<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/group.png" width="16" height="16" alt="<?php _e('View Attendees', 'event_espresso'); ?>" />
			<a href="<?php echo $view_attendees_url;?>">
				<?php _e('Attendees', 'event_espresso'); ?>
			</a>:
			<?php echo $attendees_reg_limit; ?>
		</div>
		<?php /*
		//todo .. hook in newsletter message type trigger in later versions.
		<div class="misc-pub-section <?php echo $misc_pub_section_class; ?>" id="visibility2">
			<a href="<?php echo $email_attendees_url;?>" title="<?php _e('Email Event Attendees', 'event_espresso'); ?>">
				<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/email_go.png" width="16" height="16" alt="<?php _e('Newsletter', 'event_espresso'); ?>" />
				<?php _e('Email Event Attendees', 'event_espresso'); ?>
			</a>
		</div> /**/ ?>
		
		<?php echo $event_editor_overview_add;?>
		
	</div>
	<!-- /misc-publishing-actions -->
</div>
<!-- /minor-publishing -->
