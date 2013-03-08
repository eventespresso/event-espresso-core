		
	<div class="wrap">
	
		<h3><?php echo __( 'Registration # ', 'event_espresso' ) . $reg_nmbr['value'];?></h3>
		<h2><?php echo $reg_datetime['value'];?></h2>
		<h2><?php echo __( 'Registration Status : ', 'event_espresso' );?><span class="<?php echo $reg_status['class'];?>"><?php echo $reg_status['value'];?></span></h2>
		
		<?php echo $notices; ?>
				
	    <div id="poststuff" class="metabox-holder has-right-sidebar">
				
	        <div id="side-info-column" class="inner-sidebar">
				<?php do_meta_boxes( $registrations_page, 'side', '' ); ?>
	        </div>
			
	        <div id="post-body" class="">					
	            <div id="post-body-content" class="">		
					<?php do_meta_boxes( $registrations_page, 'normal', '' ); ?>
	           </div>
	        </div>
	        <br class="clear"/>
				 
	    </div>
	
		
	</div>
