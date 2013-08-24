<div id="espresso-events-list-filters-wrapper-dv" class="column columns">
	
	<div id="espresso-events-list-filters-dv">
		<form id="espresso-events-list-filters-frm" action="<?php echo $form_url;?>" method="POST">
		
			<span>
				<label>
					<?php echo __( 'For:' ) /*. $elf_month*/;?>&nbsp;
					<select name="elf_month_dd" class="events-list-filter-date-slct">
					<?php $selected = empty( $elf_month ) ? ' selected="selected"' : '';?>			
						<option value=""<?php echo $selected;?>><?php echo __( 'anytime:' );?></option>
					<?php for( $x=0; $x<12; $x++ ) { 
						$selected = date('Y-m-1', strtotime( $x . " months")) == $elf_month ? ' selected="selected"' : '';
					?>			
						<option value="<?php echo date('Y-m-1', strtotime( $x . " months"));?>"<?php echo $selected;?>><?php echo date('F Y', strtotime( $x . " months"));?></option>
					<?php } ?>
					</select>
				</label>	
			</span>
			
			<span>
				<?php echo __( 'Category:' )/* . $elf_category*/;?>&nbsp;
				<?php $event_categories = espresso_event_categories(); ?>
				<select name="elf_category_dd" class="events-list-filter-category-slct">								
					<?php
						foreach ( $event_categories as $event_category ) { 
							$category_slug = $event_category->get( 'slug' );
							$selected = $category_slug == $elf_category ? ' selected="selected"' : '';
					?>			
					<option value="<?php echo $category_slug;?>"<?php echo $selected;?>><?php echo $event_category->get( 'name' );?></option>
					<?php 
						} 
						$selected = empty( $elf_category ) ? ' selected="selected"' : ''; 
					?>
					<option value=""<?php echo $selected;?>><?php _e( 'all' );?></option>
				</select>
			</span>
			
			<span>
				<label class="ee-checkbox-lbl">
					<?php $checked = $elf_show_expired ? ' checked="checked"' : '';?>			
					<input type="checkbox" name="elf_expired_chk" class="events-list-filter-expired-chk ee-checkbox" value="1"<?php echo $checked;?>/><?php _e( 'Display Expired Events' );?>
				</label>
			</span>
			
			<span>
				<a class="submit-this ee-button-lnk" href="#" ><?php _e( 'Filter Events' );?></a>
			</span>
			
			<span>
				<a class="ee-button-lnk" href="<?php echo $form_url;?>" ><?php _e( 'Reset' );?></a>
			</span>

			<div id="espresso-events-list-filters-view-dv">
			<?php _e( 'View:' );?>&nbsp;
					<a id="events-list-filter-grid-view-lnk" class="events-list-filter-view-lnk submit-this" rel="grid" href="<?php echo $form_url;?>"  title="<?php _e( 'click to view the events in a grid' );?>"><img src="<?php echo EE_IMAGES_URL;?>event-list-grid-view.png" width="16" height="16" alt="<?php _e( 'Grid View' );?>" /></a>&nbsp;
					<a id="events-list-filter-list-view-lnk" class="events-list-filter-view-lnk submit-this" rel="list" href="<?php echo $form_url;?>"   title="<?php _e( 'click to view the events as a list' );?>"><img src="<?php echo EE_IMAGES_URL;?>event-list-list-view.png" width="16" height="16" alt="<?php _e( 'List View' );?>" /></a><!--&nbsp;
					<a id="events-list-filter-cal-view-lnk" class="events-list-filter-view-lnk submit-this" rel="list" href="<?php echo $form_url;?>"   title="<?php _e( 'click to view the events as a calendar' );?>"><img src="<?php echo EE_IMAGES_URL;?>calendar_year-16x16.png" width="16" height="16" alt="<?php _e( 'Calendar View' );?>" /></a>-->
			</div>

			<input type="hidden" id="elf_default_view" name="elf_default_view" value="<?php echo $elf_default_view;?>"/>						

		</form>
	</div>
	
</div>
