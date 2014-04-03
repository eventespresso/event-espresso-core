<div class="espresso-thank-you-page-overview-dv width-100" >

	<div class="ee-attention">
		<div class="extra-padding jst-left">
			<a class="huge-text lt-blue-text" href="<?php echo $TXN_receipt_url;?>">
				<span class="ee-icon ee-icon-PDF-file-type"></span><?php _e( 'View Full Order Confirmation Receipt', 'event_espresso' );?>				
			</a>
			<br/>
			<span class="small-text"><?php echo apply_filters( 'FHEE__payment_overview_template__order_conf_desc', __( 'click to view/download/print a full description of your purchases and registration information.' ))?></span>
		</div>
	</div>
	<br/>

	<?php  do_action( 'AHEE__thank_you_page_overview_template__content' ); ?>

</div>
<!-- end of espresso-thank-you-page-overview-dv -->
