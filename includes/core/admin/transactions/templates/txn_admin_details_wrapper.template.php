
		<h3><?php echo __( 'Transaction # ', 'event_espresso' ) . $txn_nmbr['value'];?></h3>
		
		<h2><?php echo $txn_datetime['value'];?></h2>
		
		<h2 id="txn-status-h2">
			<?php echo __( 'Transaction Status : ', 'event_espresso' );?><span id="txn-status" class="<?php echo $txn_status['class'];?>"><?php echo $txn_status['value'];?></span>
		</h2>
		
	<?php if ( $amount_due ) : ?>
		<h2 id="txn-amount-due-h2">
			<?php echo __( 'Total Amount Due : ', 'event_espresso' );?><span class="<?php echo $amount_due_class;?>"><?php echo $amount_due;?></span>
		</h2>
	<?php else : ?>
		<h2 id="txn-amount-due-h2" class="hidden">
			<?php echo __( 'Total Amount Due : ', 'event_espresso' );?><span class="<?php echo $amount_due_class;?>"><?php echo $amount_due;?></span>
		</h2>
	<?php endif; ?>
				
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
