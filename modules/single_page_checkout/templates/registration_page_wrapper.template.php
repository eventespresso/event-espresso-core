<div id="single-page-checkout" class="ui-widget">

<?php if ( ! $empty_cart ) { ?>

	<h2 id="spco-steps-big-hdr" class="spco-steps-big-hdr"><?php _e(' Steps', 'event_espresso'); ?></h2>
	
	<div id="spco-steps-display-dv">
		<?php 
		$step_nmbr = 1;
		foreach ( $reg_steps as $reg_step => $reg_step_details ) {
			$step_display_dv_class = $step == $reg_step ? 'active-step' : 'inactive-step';
		?>
		<div id="spco-step-<?php echo $step_nmbr; ?>-display-dv" class="spco-step-display-dv <?php echo $step_display_dv_class; ?> steps-<?php echo count( $reg_steps ); ?>">
			<a class="spco-step-big-nmbr"><?php echo $step_nmbr; ?></a>
			<h2 id="spco-step-<?php echo $step_nmbr; ?>-display-hdr" class="spco-steps-display-hdr">
				&nbsp;<?php echo str_replace( '&nbsp;', '<br/>&nbsp;', $reg_step_details['name'] ); ?>				
			</h2>
		</div>
			
			<?php if ( $step_nmbr < count( $reg_steps )) { ?>
		<div class="spco-step-arrow-dv">&raquo;</div>
			<?php } ?>
			<?php $step_nmbr++; ?>
		<?php } ?>
		<div class="clear-float"></div>
	</div>
	
	<?php do_action('before_reg-page-steps'); ?>
	<?php echo $registration_steps; ?>

<?php } else { ?>
	<h2 id="spco-empty-cart-hdr" class="spco-step-title-hdr"><?php _e('There is currently nothing in the Event Queue', 'event_espresso'); ?></h2>
	<p><?php _e('You need to select at least one event before you can proceed with the registration process', 'event_espresso'); ?></p>
<?php } // $! empty_cart ?>
	
</div>

