<?php
function edit_event_category(){
	global $wpdb;
	
	$id=$_REQUEST['id'];
	$results = $wpdb->get_results("SELECT * FROM ". get_option('events_category_detail_tbl') ." WHERE id =".$id);
	foreach ($results as $result){
		$category_id= $result->id;
		$category_name=stripslashes($result->category_name);
		$category_identifier=stripslashes($result->category_identifier);
		$category_desc=stripslashes($result->category_desc);
		$display_category_desc=$result->display_desc;
	}
	?>
<!--Add event display-->

<div class="metabox-holder" id="add-edit-categories">
	<div class="postbox">
		<h3> <span>
			<?php _e('Edit Category:','event_espresso'); ?>
			<?php echo stripslashes($category_name) ?> </span> </h3>
		<div class="inside">
			<form method="post" action="<?php echo $_SERVER['REQUEST_URI'];?>">
				<input type="hidden" name="category_id" value="<?php echo $category_id; ?>">
				<input type="hidden" name="action" value="update">
				<p class="add-cat-name inputunder">
					<label for="category-name">
						<?php _e('Category Name:','event_espresso'); ?>
					</label>
					<input type="text" id="category-name" name="category_name" size="25" value="<?php echo stripslashes($category_name);?>">
				</p>
				<p class="add-cat-id inputunder">
					<label for="category-id">
						<?php _e('Unique Category Identifier: ','event_espresso'); ?><?php apply_filters('espresso_help', 'unique_id_info'); ?>
					</label>
					<input type="text" id="category-id" name="category_identifier" value="<?php echo $category_identifier;?>">
				</p>
				<p class="section-quest">
					<label>
						<?php _e('Do you want to display the category description on the events page?','event_espresso'); ?>
					</label>
					<?php 
						$values=array(					
				array('id'=>'Y','text'=> __('Yes','event_espresso')),
				array('id'=>'N','text'=> __('No','event_espresso'))
						);				
						echo select_input('display_desc', $values, $display_category_desc);
   				?>
				</p>
				<div id="categorydescriptiondivrich" class="postarea">
					<p class="section-heading">
						<?php _e('Category Description:','event_espresso'); ?>
					</p>
					<div class="postbox">
						<?php the_editor(espresso_admin_format_content($category_desc), $id = 'category_desc', $prev_id = 'title', $media_buttons = true, $tab_index = 3);?>
						<table id="cat-descr-add-form" cellspacing="0">
							<tbody>
								<tr>
									<td class="aer-word-count"></td>
									<td class="autosave-info"><span>
										<p></p>
										</span></td>
								</tr>
							</tbody>
						</table>
					</div>
					<!-- /.postbox -->
					<?php  // create our nonces and do our form submit ?>
					<?php wp_nonce_field( 'espresso_form_check', 'ee_update_cat' ); ?>
					<p>
						<input class="button-secondary" type="submit" name="Submit" value="<?php _e('Update'); ?>" id="update_category" />
					</p>
				</div>
				<!-- /.postarea -->
				
			</form>
		</div>
		<!-- /.inside --> 
	</div>
	<!-- /.postbox --> 
</div>
<!-- /.metabox-holder -->

<?php 
//espresso_tiny_mce();
}
