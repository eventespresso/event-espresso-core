<div id="multi-event-registration" class="ui-widget">

	<div id="mer-ajax-loading" class="" style="display:none;">
		<img src="<?php echo $images_dir_url;?>ajax-loader-grey.gif" /><span><?php _e('loading...', 'espresso'); ?></span>
	</div>

	<div id="mer-success-msg" class="event-queue-msg ui-widget-content ui-state-highlight ui-corner-all<?php echo $success_msg_class;?>" style="display:none;">
		<span class="ui-icon ui-icon-circle-check"></span>&nbsp;<span class="msg"><?php echo $success_msg;?></span>
	</div>

	<div id="mer-error-msg" class="event-queue-msg ui-widget-content ui-state-error ui-corner-all<?php echo $error_msg_class;?>" style="display:none;">
		<span class="ui-icon ui-icon-notice"></span>&nbsp;<span class="msg"><?php echo $error_msg;?></span>
	</div>



	<h2 id="mer-reg-page-steps-big-hdr" class="mer-reg-page-steps-big-hdr"><?php _e(' Steps', 'espresso'); ?></h2>
	<div id="mer-reg-page-steps-display-dv">
		<div id="mer-reg-page-step-1-display-dv" class="mer-reg-page-step-display-dv <?php echo $step_display_dv_1_class; ?>">
			<a class="mer-reg-page-step-big-nmbr">1</a> <h2 id="mer-reg-page-step-1-display-hdr" class="mer-reg-page-steps-display-hdr">&nbsp;<?php _e('Attendee<br/>&nbsp;Information', 'espresso'); ?></h2>
		</div>
		<div class="mer-reg-page-step-arrow-dv">&raquo;</div>
		<div id="mer-reg-page-step-2-display-dv" class="mer-reg-page-step-display-dv <?php echo $step_display_dv_2_class; ?>">
			<a class="mer-reg-page-step-big-nmbr">2</a> 
			<h2 id="mer-reg-page-step-2-display-hdr" class="mer-reg-page-steps-display-hdr">&nbsp;<?php _e('Payment<br/>&nbsp;Options', 'espresso'); ?></h2>
		</div>
		<div class="mer-reg-page-step-arrow-dv">&raquo;</div>
		<div id="mer-reg-page-step-3-display-dv" class="mer-reg-page-step-display-dv <?php echo $step_display_dv_3_class; ?>">
			<a class="mer-reg-page-step-big-nmbr">3</a> <h2 id="mer-reg-page-step-3-display-hdr" class="mer-reg-page-steps-display-hdr">&nbsp;<?php _e('Registration<br/>&nbsp;Confirmation', 'espresso'); ?></h2>
		</div>
		<div class="clear-float"></div>
	</div>
	
	<?php echo $registration_steps; ?>
	
</div>

