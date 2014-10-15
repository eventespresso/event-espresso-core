	<div id="admin-side-mbox-billing-info-dv" class="admin-side-mbox-dv">
<?php if ( empty($billing_form) ) : ?>
		<div class="clearfix">
			<?php _e( 'There is no billing info for this transaction.', 'event_espresso' );?><br/>
		</div>
<?php else :
		foreach ( $billing_form->inputs() as $form_input ) :
		/* @var $form_input EE_Form_Input_Base */
	?>
		<div class="clearfix">
			<span class="admin-side-mbox-label-spn lt-grey-txt float-left"><?php echo $form_input->get_html_for_label();?></span><?php echo $form_input->pretty_value();?>
		</div>

		<?php endforeach; ?>

<?php endif; ?>

	</div>

