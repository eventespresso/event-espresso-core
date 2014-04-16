<div id="single-page-checkout" class="ui-widget">

<?php if ( ! $empty_cart ) { ?>
	<?php if ( ! $revisit ) { ?>

	<h2 id="spco-steps-big-hdr" class="spco-steps-big-hdr"><?php _e(' Steps', 'event_espresso'); ?></h2>
	
	<div id="spco-steps-display-dv">
		<?php 
		$step_nmbr = 1;
		foreach ( $reg_steps as $reg_step => $reg_step_details ) {
			$step_display_dv_class = $step == $reg_step ? 'active-step' : 'inactive-step';
		?>
		<div id="spco-step-<?php echo $reg_step; ?>-display-dv" class="spco-step-display-dv <?php echo $step_display_dv_class; ?> steps-<?php echo count( $reg_steps ); ?>">
			<span class="spco-step-big-nmbr"><?php echo $step_nmbr; ?></span>
			<h2 id="spco-step-<?php echo $reg_step; ?>-display-hdr" class="spco-steps-display-hdr">
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
	<?php } ?>	
<?php 
	do_action( 'AHEE__SPCO__before_registration_steps' );
	echo $registration_steps; 
	do_action( 'AHEE__SPCO__after_registration_steps' );
?>
	

<?php } else { ?>
	<h3 id="spco-empty-cart-hdr" class="spco-step-title-hdr"><?php _e('Nothing in your Event Queue', 'event_espresso'); ?></h3>
	<p><?php echo $empty_msg; ?></p>
<?php } // $! empty_cart ?>

	<?php do_action( 'AHEE__SPCO__reg_form_footer' ); ?>
	
</div>

