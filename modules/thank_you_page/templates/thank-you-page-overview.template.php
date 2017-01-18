<?php
/** @var EE_Transaction $transaction */
/** @var boolean $revisit */
/** @var string $order_conf_desc */

do_action( 'AHEE__thank_you_page_overview_template__top', $transaction );

?>

<div id="espresso-thank-you-page-overview-dv" class="width-100" >

	<?php if ( ! $revisit ) : ?>
	<div class="ee-attention">
		<div class="extra-padding-sides">
			<?php echo apply_filters(
				'FHEE__thank_you_page_overview_template__order_conf_desc',
				sprintf(
					$order_conf_desc,
					'<h3 class="">',
					'</h3>',
					'<br />'
				)
			);
			if ( ! empty( $TXN_receipt_url )) : ?>
			<br/>
			<div class="jst-rght">
				<a class="ee-button ee-roundish indented-text big-text" href="<?php echo $TXN_receipt_url;?>"><span class="ee-icon ee-icon-PDF-file-type"></span><?php echo apply_filters( 'FHEE__thank_you_page_overview_template__order_conf_button_text', __( 'View Full Order Confirmation Receipt', 'event_espresso' )); ?></a>
			</div>
			<?php endif; ?>
		</div>
	</div>
	<br/>
	<?php endif; ?>
	<br/>

	<?php  do_action( 'AHEE__thank_you_page_overview_template__content', $transaction ); ?>

</div>
<!-- end of espresso-thank-you-page-overview-dv -->

<?php  do_action( 'AHEE__thank_you_page_overview_template__bottom', $transaction ); ?>
