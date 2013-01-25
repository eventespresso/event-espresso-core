<?php
function edit_event_category(){
	global $wpdb;
	$values=array(
		array('id'=>true,'text'=> __('Yes','event_espresso')),
		array('id'=>false,'text'=> __('No','event_espresso'))
	);
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
			<?php _e('Edit Category','event_espresso'); ?>
			 </span> </h3>
		<div class="inside">
		<h4><?php echo stripslashes($category_name) ?></h4>
		<form id="edit-cat" method="post" action="<?php echo $_SERVER['REQUEST_URI']; ?>">
				<table class="form-table">
					<tbody>
						<tr>
							<th><label for="category_name">
									<?php _e('Category Name', 'event_espresso'); ?>
									<em title="<?php _e('This field is required', 'event_espresso') ?>"> *</em></label></th>
							<td><input id="category_name" type="text" name="category_name" value="<?php echo stripslashes($category_name);?>" /></td>
						</tr>
						<tr>
							<th><label for="cat_id">
									<?php _e('Unique ID', 'event_espresso'); ?>
									<?php do_action('action_hook_espresso_help', 'unique_id_info'); ?>
								</label></th>
							<td><input id="cat_id"  type="text" name="category_identifier" value="<?php echo $category_identifier;?>" /></td>
						</tr>
						<tr>
							<th><?php _e('Display Category Description in Event Listing?', 'event_espresso'); ?></th>
							<td><?php echo select_input('display_desc', $values, $display_category_desc);?></td>
						</tr>
						<tr>
							<td colspan="2"><h4>
									<?php _e('Category Description', 'event_espresso'); ?>
								</h4></td>
						</tr>
						<tr>
							<td colspan="2"><div class="postbox">
									<?php 
										$args = array("textarea_rows" => 5, "textarea_name" => "category_desc", "editor_class" => "my_editor_custom");
										wp_editor( espresso_admin_format_content($category_desc), "category_desc", $args);
									?>
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
								<!-- /.postbox --></td>
						</tr>
					</tbody>
				</table>
				<?php
					// create our nonces and do our form submit
					wp_nonce_field( 'espresso_form_check', 'ee_update_cat' );
				?>
				<input type="hidden" name="category_id" value="<?php echo $category_id; ?>">
				<input type="hidden" name="action" value="update">
				<p>
					<input class="button-secondary" type="submit" name="Submit" value="<?php _e('Update'); ?>" id="update_category" />
				</p>
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
