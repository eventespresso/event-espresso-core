<div id="multi-event-registration" class="ui-widget">

	<div id="mer-ajax-loading" class="" style="display:none;">
		<img src="<?php echo $images_dir_url;?>ajax-loader-grey.gif" /><span><?php _e('loading...', 'event_espresso'); ?></span>
	</div>

	<div id="mer-success-msg" class="event-queue-msg ui-widget-content ui-state-highlight ui-corner-all<?php echo $success_msg_class;?>" style="display:none;">
		<span class="ui-icon ui-icon-circle-check"></span>&nbsp;<span class="msg"><?php echo $success_msg;?></span>
	</div>

	<div id="mer-error-msg" class="event-queue-msg ui-widget-content ui-state-error ui-corner-all<?php echo $error_msg_class;?>" style="display:none;">
		<span class="ui-icon ui-icon-notice"></span>&nbsp;<span class="msg"><?php echo $error_msg;?></span>
	</div>

<?php if ( ! $empty_cart ) : ?>

	<h2 id="mer-reg-page-steps-big-hdr" class="mer-reg-page-steps-big-hdr"><?php _e(' Steps', 'event_espresso'); ?></h2>
	<div id="mer-reg-page-steps-display-dv">
		<div id="mer-reg-page-step-1-display-dv" class="mer-reg-page-step-display-dv <?php echo $step_display_dv_1_class; ?>">
			<a class="mer-reg-page-step-big-nmbr">1</a> <h2 id="mer-reg-page-step-1-display-hdr" class="mer-reg-page-steps-display-hdr">&nbsp;<?php _e('Attendee<br/>&nbsp;Information', 'event_espresso'); ?></h2>
		</div>
		<div class="mer-reg-page-step-arrow-dv">&raquo;</div>
		<div id="mer-reg-page-step-2-display-dv" class="mer-reg-page-step-display-dv <?php echo $step_display_dv_2_class; ?>">
			<a class="mer-reg-page-step-big-nmbr">2</a> 
			<h2 id="mer-reg-page-step-2-display-hdr" class="mer-reg-page-steps-display-hdr">&nbsp;<?php _e('Payment<br/>&nbsp;Options', 'event_espresso'); ?></h2>
		</div>
		<div class="mer-reg-page-step-arrow-dv">&raquo;</div>
		<div id="mer-reg-page-step-3-display-dv" class="mer-reg-page-step-display-dv <?php echo $step_display_dv_3_class; ?>">
			<a class="mer-reg-page-step-big-nmbr">3</a> <h2 id="mer-reg-page-step-3-display-hdr" class="mer-reg-page-steps-display-hdr">&nbsp;<?php _e('Registration<br/>&nbsp;Confirmation', 'event_espresso'); ?></h2>
		</div>
		<div class="clear-float"></div>
	</div>
	
	<?php echo $registration_steps; ?>

<?php	 else :  ?>
	<h2 id="mer-reg-page-empty-cart-hdr" class="mer-reg-page-step-title-hdr"><?php _e('There is currently nothing in the Event Queue', 'event_espresso'); ?></h2>
	<p><?php _e('You need to select at least one event before you can proceed with the registration process', 'event_espresso'); ?></p>
<?php	 endif; // $! empty_cart ?>
	
</div>
<script>
	jQuery(document).ready(function() {
		jQuery('html, body').scrollTop(jQuery("#mer-reg-page-steps-big-hdr").offset().top);
	});
</script>
