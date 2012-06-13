<div class="wrap">

	<div id="icon-options-event" class="icon32"></div>
	
	<h2><?php esc_attr_e( 'Event Espresso - Registrations', 'event_espresso' ); ?>&nbsp;&nbsp;<?php echo $add_new_btn; ?></h2>

	<?php echo $notices; ?>

    <div id="poststuff" class="metabox-holder has-right-sidebar">
	
        <div id="side-info-column" class="inner-sidebar">
		<?php do_meta_boxes('reg_admin_edit_seating_chart', 'side', '' ); ?>
        </div>
		
        <div id="post-body" class="">
            <div id="post-body-content" class="">			
				<?php echo $reg_content; ?>
           </div>
        </div>
        <br class="clear"/>
 
    </div>
</div>
