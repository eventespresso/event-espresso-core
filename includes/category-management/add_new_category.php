<?php

function add_new_event_category() {
   
    ?>
    <!--Add event display-->
    <div id="add-edit-categories" class="metabox-holder">
        <div class="postbox">
        <h3>
						<span>
							<?php _e('Add a Category', 'event_espresso'); ?>
						</span>
					</h3>
          <div class="inside">
								
            <form method="post" action="<?php echo $_SERVER['REQUEST_URI']; ?>">
               <input type="hidden" name="action" value="add">
                    
                 <p class="add-cat-name inputunder"><label><?php _e('Category Name', 'event_espresso'); ?></label> <input type="text" name="category_name" size="25" /></p></li>
                 <p class="add-cat-id inputunder"><label><?php _e('Unique ID For Category', 'event_espresso'); ?></label> <input type="text" name="category_identifier" /> <a class="ev_reg-fancylink" href="#unique_id_info"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>/images/question-frame.png" width="16" height="16" /></a></p>
                 <p class="section-quest"><?php _e('Do you want to display the category description on the events page?', 'event_espresso'); ?></p>
                 <?php 
										$values=array(					
											array('id'=>'Y','text'=> __('Yes','event_espresso')),
											array('id'=>'N','text'=> __('No','event_espresso'))
											);				
										echo select_input('display_desc', $values, $display_category_desc);
										?>
                       
                   <div id="categorydescriptiondivrich" class="postarea"> 
												<p id="add-category-desc" class="section-heading"><?php _e('Category Description', 'event_espresso'); ?></p>
												
												
												<div class="postbox">		
												<?php the_editor('', $id = 'category_desc', $prev_id = 'title', $media_buttons = true, $tab_index = 3);?>
												
												
												<table id="cat-descr-add-form" cellspacing="0">
													<tbody>
														<tr>
															<td class="aer-word-count"></td>
															<td class="autosave-info">
																<span>
																	<p></p>
																</span>
															</td>
														</tr>
													</tbody>
												</table>
											</div>  <!-- /.postbox -->														
										<p><input class="button-secondary" type="submit" name="Submit" value="<?php _e('Submit'); ?>" id="add_new_category" /></p>
										
									</div><!-- /.postarea -->
								</form>
            
        </div><!-- /.inside -->
    	</div><!-- /.postbox -->
		</div><!-- metabox-holder -->
<?php wp_nonce_field('closedpostboxes', 'closedpostboxesnonce', false ); ?>
<?php wp_nonce_field('meta-box-order', 'meta-box-order-nonce', false ); ?>

<?php
espresso_tiny_mce();
}


