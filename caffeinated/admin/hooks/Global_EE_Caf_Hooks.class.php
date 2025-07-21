<?php

/**
 * Global_EE_Caf_Hooks
 *
 * This class is just a wrapper for some global hooks that are run on EE_Admin pages.
 *
 *
 * @package         Global_EE_Caf_Hooks
 * @subpackage      caffeinated/admin/hooks/Global_EE_Caf_Hooks.core.php
 * @author          Darren Ethier
 */
class Global_EE_Caf_Hooks
{
    private const RSS_FEED_URL = 'https://eventespresso.com/api/feed/';


    public function __construct()
    {
        $this->_do_hooks();
    }


    private function _do_hooks()
    {
        add_filter('FHEE_show_sponsors_meta_box', '__return_false');
        add_filter('FHEE_show_ratings_request_meta_box', '__return_false');
        add_filter(
            'FHEE__EE_Admin_Page_Core__load_global_scripts_styles__loader_containers',
            [$this, 'forums_lazy_loading']
        );
        // commenting out for now because it's a duplicate of EE_Admin_Page::espresso_news_post_box()
        // add_action(
        //     'AHEE__EE_Admin_Page__espresso_news_post_box__after_content',
        //     [$this, 'extra_news_box_content']
        // );
    }


    public function extra_news_box_content()
    {
        echo '<h3 style="margin:0">' . esc_html__('From the Forums', 'event_espresso') . '</h3>';
        echo '<div id="ee_forum_posts_content">';
        EE_Admin_Page::cached_rss_display('ee_forum_posts_content', self::RSS_FEED_URL);
        echo '</div>';
    }


    public function forums_lazy_loading($ids)
    {
        $ids[] = 'ee_forum_posts_content';
        return $ids;
    }
}
