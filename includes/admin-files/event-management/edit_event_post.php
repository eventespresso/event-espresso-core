<?php
if (function_exists('espresso_member_data')) {
	global $espresso_manager;
	$is_admin = (espresso_member_data('role') == "administrator" || espresso_member_data('role') =='espresso_event_admin')? true:false;
	if ($espresso_manager['event_manager_create_post'] == 'N' && $is_admin == false){
		return;	
	}
}
?>

<div style="display: block;" id="event-post" class="postbox">
    <div class="handlediv" title="Click to toggle"><br>
    </div>
    <h3 class="hndle"><span>
            <?php _e('Create a Post', 'event_espresso'); ?>
        </span></h3>
    <div class="inside">
        <?php
        if (strlen($post_id) > 1) {
            $create_post = 'Y'; //If a post was created previously, default to yes on the update post.
        } else {
            $create_post = 'N'; //If a post was NOT created previously, default to no so we do not create a post on accident.
        }
        global $current_user;
        get_currentuserinfo();
        ?>
        <p>
            <?php echo __('Add/Update post for this event?', 'event_espresso') . ' ' . select_input('create_post', $values, $create_post); ?> <?php if (strlen($post_id) > 1) {
                _e('If no, delete current post?', 'event_espresso'); ?> <input name="delete_post" type="checkbox" value="Y" /><?php } ?></p>
        <input type="hidden" name="post_id" value="<?php if(isset($post_id)) echo $post_id; ?>">
        <?php /* ?><p><?php _e('Category:', 'event_espresso'); ?> <?php wp_dropdown_categories(array('orderby'=> 'name','order' => 'ASC', 'selected' => $category, 'hide_empty' => 0 )); ?></p><?php */ ?>

        <?php
        if (isset($post_id)) {
            $post_data = get_post($post_id);
            $tags = get_the_tags($post_id);
            if ($tags) {
                foreach ($tags as $k => $v) {
                    $tag[$k] = $v->name;
                }
                $tags = join(', ', $tag);
            }
        } else {
            $post_data = new stdClass();
            $post_data->ID = 0;
            $tags = '';
        }
        $box = array();	

        $custom_post_array = array(array('id' => 'espresso_event', 'text' => __('Espresso Event', 'event_espresso')));
        $post_page_array = array(array('id' => 'post', 'text' => __('Post', 'event_espresso')), array('id' => 'page', 'text' => __('Page', 'event_espresso')));
        $post_page_array = $org_options['template_settings']['use_custom_post_types'] == 'Y' ? array_merge($custom_post_array, $post_page_array) : $post_page_array;
        //print_r($post_page_array);

        $post_types = $post_page_array;
        ?>
        <p><?php _e('Author:', 'event_espresso'); ?> <?php wp_dropdown_users(array('who' => 'authors', 'selected' => $current_user->ID, 'show' => 'display_name')); ?></p>
        <p><?php _e('Post Type', 'event_espresso'); ?>: <?php echo select_input('post_type', $post_types, $post_type) ?><br />
        <?php _e('Post templates are stored in the "templates" directory of the plugin.', 'event_espresso'); ?></p>
        <p><?php _e('Tags:', 'event_espresso'); ?> <input  type="text" id="post_tags" name="post_tags" size="20" value="<?php echo $tags ?>"></p>
        <p><?php _e('Post Categories:', 'event_espresso'); ?> </p>
        <?php
        require_once( 'includes/meta-boxes.php');
        post_categories_meta_box($post_data, $box);
        ?>

        <!-- if post templates installed, post template -->

    </div>
</div>
<!-- /event-post -->