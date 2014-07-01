<div id="single-page-checkout" class="">
<?php
if ( ! $empty_cart ) {
	if ( ! $revisit && apply_filters( 'FHEE__registration_page_wrapper_template__steps_display', TRUE )) {
?>
	<h2 id="spco-steps-big-hdr" class="spco-steps-big-hdr"><?php _e(' Steps', 'event_espresso'); ?></h2>

	<div id="spco-steps-display-dv">
	<?php
		$step_nmbr = 1;
		$total_steps = count( $reg_steps );
		foreach ( $reg_steps as $reg_step ) {
			if ( $reg_step instanceof EE_SPCO_Reg_Step ) {
				$slug = $reg_step->slug();
				$step_display_dv_class = $reg_step->is_current_step() ? 'active-step' : 'inactive-step';
		?>
		<div id="spco-step-<?php echo $slug; ?>-display-dv" class="spco-step-display-dv <?php echo $step_display_dv_class; ?> steps-<?php echo $total_steps; ?>">
			<span class="spco-step-big-nmbr"><?php echo $step_nmbr; ?></span>
			<h2 id="spco-step-<?php echo $slug; ?>-display-hdr" class="spco-steps-display-hdr">
				&nbsp;<?php echo str_replace( '&nbsp;', '<br/>&nbsp;', $reg_step->name() ); ?>
			</h2>
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
		if ( $reg_step instanceof EE_SPCO_Reg_Step ) {
			$slug = $reg_step->slug();
			echo '<!--***************  ' . strtoupper( $reg_step->name() ) . ' STEP 	***************-->';
			echo do_action( 'AHEE__' . $slug . '__reg_step_start', $reg_step );
			// todo: deprecate hook AHEE__registration_page_attendee_information__start
	?>
		<h2 id="spco-<?php echo $slug; ?>-hdr" class="spco-step-title-hdr">
			<?php echo $reg_step->name(); ?>
			<a id="spco-edit-<?php echo $slug; ?>-lnk" class="spco-edit-step-lnk <?php echo $reg_step->edit_link_class(); ?>"  href="<?php echo $reg_step->edit_lnk_url(); ?>" rel="<?php echo $slug; ?>"><?php apply_filters( 'FHEE__registration_page_' . $slug . '__edit_link_text', __( 'edit', 'event_espresso' )); ?></a>
		</h2>
			<?php do_action( 'AHEE__registration_page_registration_questions__template__after_spco_' . $slug . '_header' )?>
		<div id="spco-<?php echo $slug; ?>-dv" class="spco-step-dv <?php echo $reg_step->div_class(); ?>">
			<?php echo $reg_step->display_reg_form(); ?>
			<?php do_action( 'AHEE__SPCO_after_reg_step_form', $slug, $reg_step->checkout->next_step->slug() ); ?>
		</div>
			<?php $step_nmbr++;
		}
	}
	do_action( 'AHEE__SPCO__after_registration_steps' );

} else {
?>
	<h3 id="spco-empty-cart-hdr" class="spco-step-title-hdr"><?php _e('Nothing in your Event Queue', 'event_espresso'); ?></h3>
	<p><?php echo $empty_msg; ?></p>
<?php
}
do_action( 'AHEE__SPCO__reg_form_footer' );
?>

</div>

