		
	<div class="wrap">
	
		<div id="icon-options-event" class="icon32"></div>
		<h2><?php echo __( 'Transaction ', 'event_espresso' );?></h2>
			
		<a class="current" href="<?php echo $txn_overview_url;?>">&laquo;&nbsp;<?php _e( 'Transactions Overview', 'event_espresso' ); ?></a>

		<h3><?php echo __( 'Transaction # ', 'event_espresso' ) . $txn_nmbr['value'];?></h3>
		<h2><?php echo $txn_datetime['value'];?></h2>
		<h2><?php echo __( 'Transaction Status : ', 'event_espresso' );?><span class="<?php echo $txn_status['class'];?>"><?php echo $txn_status['value'];?></span></h2>
		<?php if ( $amount_due ) : ?>
		<h2><?php echo __( 'Total Amount Due : ', 'event_espresso' );?><?php echo $amount_due;?></h2>
		<?php endif; ?>
		<?php echo $notices; ?>
				
	    <div id="poststuff" class="metabox-holder has-right-sidebar">
				
	        <div id="side-info-column" class="inner-sidebar">
				<?php do_meta_boxes( $transactions_page, 'side', '' ); ?>
	        </div>
			
	        <div id="post-body" class="">					
	            <div id="post-body-content" class="">		
					<?php do_meta_boxes( $transactions_page, 'normal', '' ); ?>
	           </div>
	        </div>
	        <br class="clear"/>
				 
	    </div>
	
		
	</div>
