<?php
/**
 * @var string $nav_menu_selected_id
 * @var string $nav_tab_link
 * @var string $select_all_link
 */
?>

<div id='posttype-extra-nav-menu-pages' class='posttypediv'>

    <ul id='posttype-extra-nav-menu-pages-tabs' class='posttype-tabs add-menu-item-tabs'>
        <li class='tabs'>
            <a class="nav-tab-link"
               data-type="tabs-panel-posttype-extra-nav-menu-pages-event-archives"
               href="<?php echo esc_url_raw($nav_tab_link); ?>#tabs-panel-posttype-extra-nav-menu-pages-event-archives"
            >
                <?php esc_html_e('Event Archive Pages', 'event_espresso'); ?>
            </a>
        </li>
    </ul><!-- .posttype-tabs -->

    <div id="tabs-panel-posttype-extra-nav-menu-pages-event-archives"
         class="tabs-panel tabs-panel-active"
    >
        <ul id="extra-nav-menu-pageschecklist-event-archives" class="categorychecklist form-no-clear">
        </ul>
    </div><!-- /.tabs-panel -->

    <p class="button-controls">
        <span class="list-controls">
            <a href="<?php echo esc_url_raw($select_all_link) ?>#posttype-extra-nav-menu-pages" class="select-all">
            <?php esc_html_e('Select All', 'event_espresso'); ?>
            </a>
        </span>
        <span class="add-to-menu">
            <input class='button-secondary submit-add-to-menu right'
                   id="<?php echo esc_attr('submit-posttype-extra-nav-menu-pages'); ?>"
                   name="add-post-type-menu-item"
                   type="submit"
                   value="<?php esc_attr_e('Add to Menu', 'event_espresso'); ?>"
                   <?php wp_nav_menu_disabled_check($nav_menu_selected_id); ?>
            />
            <span class="spinner"></span>
        </span>
    </p>

</div><!-- /.posttypediv -->
