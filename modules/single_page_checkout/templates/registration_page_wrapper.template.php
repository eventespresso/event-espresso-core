<div id="ee-single-page-checkout-dv" class="">
<?php
if ( ! $empty_cart ) {
	if ( apply_filters( 'FHEE__registration_page_wrapper_template__display_time_limit', false ) ) { ?>
	<p id="spco-registration-time-limit-pg" class="spco-steps-pg ee-attention important-notice" style="display: none;">
		<?php echo sprintf(
			apply_filters(
				'FHEE__registration_page_wrapper_template___time_limit',
				__( 'You have %1$s to complete your registration.', 'event_espresso' )
			),
			'<span id="spco-registration-time-limit-spn" class="spco-registration-time-limit-spn">' . $registration_time_limit . '</span>'
		);
		?>
		<span id="spco-registration-expiration-spn" class="" style="display:none;"></span>
	</p>
<?php }
	if ( ! $revisit && apply_filters( 'FHEE__registration_page_wrapper_template__steps_display', TRUE )) {
?>
	<h2 id="spco-steps-big-hdr" class="spco-steps-big-hdr"><?php _e(' Steps', 'event_espresso'); ?></h2>

	<div id="spco-steps-display-dv">
	<?php
		$step_nmbr = 1;
		$total_steps = count( $reg_steps ) - 1;
		foreach ( $reg_steps as $reg_step ) {
			if ( $reg_step instanceof EE_SPCO_Reg_Step && $reg_step->slug() != 'finalize_registration' ) {
				$slug = $reg_step->slug();
				$step_display_dv_class = $reg_step->is_current_step() ? 'active-step' : 'inactive-step';
		?>
		<div id="spco-step-<?php echo $slug; ?>-display-dv" class="spco-step-display-dv <?php echo $step_display_dv_class; ?> steps-<?php echo $total_steps; ?>">
			<h4 id="spco-step-<?php echo $slug; ?>-display-hdr" class="spco-steps-display-hdr">
				<span class="spco-step-big-nmbr"><?php echo $step_nmbr; ?></span>&nbsp;<span class="spco-step-name"><?php echo str_replace( '&nbsp;', '<br/>&nbsp;', $reg_step->name() ); ?></span>
			</h4>
		</div>

		<?php if ( $step_nmbr < $total_steps ) { ?>
		<div class="spco-step-arrow-dv">&raquo;</div>
		<?php
				}
				$step_nmbr++;
			}
		}
		?>
		<div class="clear-float"></div>
	</div>

	<?php
	}

	do_action( 'AHEE__SPCO__before_registration_steps' );
	$step_nmbr = 1;
	foreach ( $reg_steps as $reg_step ) {
		if ( $reg_step instanceof EE_SPCO_Reg_Step && $reg_step->slug() != 'finalize_registration' ) {
			$slug = $reg_step->slug();
			do_action( 'AHEE__' . $slug . '__reg_step_start', $reg_step );
			// todo: deprecate hook AHEE__registration_page_attendee_information__start
	?>
		<div id="spco-<?php echo $slug; ?>-dv" class="spco-step-dv <?php echo $reg_step->div_class(); ?>">
			<?php echo $reg_step->display_reg_form(); ?>
			<?php do_action( 'AHEE__SPCO_after_reg_step_form', $slug, $next_step ); ?>
		</div>
			<?php $step_nmbr++;
		}
	}
	do_action( 'AHEE__SPCO__after_registration_steps' );
    printf(
        esc_html__('%1$scancel registration%2$s', 'event_espresso'),
        '<a class="small-text float-right" href="' . $cancel_page_url . '">',
        '</a><br class="clear"/><br />'
    );

} else {
?>
	<h3 id="spco-empty-cart-hdr" class="spco-step-title-hdr"><?php esc_html_e('Nothing in your Event Queue', 'event_espresso'); ?></h3>
	<p><?php echo $empty_msg; ?></p>
	<?php echo $cookies_not_set_msg; ?>
<?php
}
do_action( 'AHEE__SPCO__reg_form_footer' );
?>

</div>

