<div id="espresso-events-list-filters-wrapper-dv" class="column columns">
	
	<!--<h3 id="espresso-events-list-filters-h3"><?php _e( 'View Events' );?></h3>-->
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
				<?php //printr( $elf_category, '$elf_category  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );?>
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
					<?php $checked = $show_expired ? ' checked="checked"' : '';?>			
					<input type="checkbox" name="elf_expired_chk" class="events-list-filter-expired-chk ee-checkbox" value="1"<?php echo $checked;?>/><?php _e( 'Display Expired Events' );?>
				</label>
			</span>
			
			<span>
				<a class="submit-this ee-button-lnk" href="#" ><?php _e( 'Filter Events' );?></a>
			</span>
			
			<span>
				<a class="ee-button-lnk" href="<?php echo $form_url;?>" ><?php _e( 'Reset' );?></a>
			</span>
						
		</form>
	</div>
	
</div>
