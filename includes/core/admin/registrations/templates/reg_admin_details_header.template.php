	
		<h3 id="reg-admin-reg-details-reg-nmbr-hdr"><?php echo __( 'Registration # ', 'event_espresso' ) . $reg_nmbr['value'];?></h3>
		<h2 id="reg-admin-reg-details-reg-date-hdr"><?php echo $reg_datetime['value'];?></h2>
		<h2 id="reg-admin-reg-details-reg-status-hdr">
			<?php echo __( 'Registration Status : ', 'event_espresso' );?>
			<span class="<?php echo $reg_status['class'];?>"><?php echo $reg_status['value'];?></span>
			<span id="reg-admin-approve-decline-reg-status-spn">
				<?php echo $approve_decline_reg_status_buttons;?>
			</span>
		</h2>
		<a id="scroll-to-other-attendees" class="scroll-to" href="#other-attendees"><?php echo __( 'scroll to Other Attendees Registered in the Same Transaction', 'event_espresso' );?></a>
		

