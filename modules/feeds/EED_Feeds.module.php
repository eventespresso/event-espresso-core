<?php

use EventEspresso\core\domain\entities\custom_post_types\EspressoPostType;

/**
 * Event List
 *
 * @package        Event Espresso
 * @subpackage     /modules/feeds/
 * @author         Brent Christensen
 */
class EED_Feeds extends EED_Module
{
    /**
     * @return EED_Feeds
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function instance()
    {
        return parent::get_instance(__CLASS__);
    }


    /**
     *    set_hooks - for hooking into EE Core, other modules, etc
     *
     * @return    void
     */
    public static function set_hooks()
    {
        add_action('parse_request', ['EED_Feeds', 'parse_request']);
        add_filter('default_feed', ['EED_Feeds', 'default_feed']);
        add_filter('comment_feed_join', ['EED_Feeds', 'comment_feed_join'], 10, 2);
        add_filter('comment_feed_where', ['EED_Feeds', 'comment_feed_where'], 10, 2);
    }


    /**
     *    set_hooks_admin - for hooking into EE Admin Core, other modules, etc
     *
     * @return    void
     */
    public static function set_hooks_admin()
    {
    }


    /**
     *    run - initial module setup
     *
     * @return    void
     */
    public function run($WP)
    {
    }


    /**
     *    default_feed
     *
     * @param type    rss2, atom, rss, rdf, rssjs
     * @return    string
     */
    public static function default_feed($type = 'rss2')
    {
        // rss2, atom, rss, rdf, rssjs
        $type = 'rss2';
        return $type;
    }


    /**
     *    parse_request
     *
     * @return    void
     */
    public static function parse_request()
    {
        $request = self::getRequest();
        if (! $request->requestParamIsSet('post_type')) {
            return;
        }
        // define path to templates
        define('RSS_FEEDS_TEMPLATES_PATH', str_replace('\\', '/', plugin_dir_path(__FILE__)) . 'templates/');
        // what kinda post_type are we dealing with ?
        switch ($request->getRequestParam('post_type')) {
            case EspressoPostType::EVENTS:
                // for rss2, atom, rss, rdf
                add_filter('the_excerpt_rss', ['EED_Feeds', 'the_event_feed']);
                add_filter('the_content_feed', ['EED_Feeds', 'the_event_feed']);
                // for json ( also uses the above filter )
                add_filter('rssjs_feed_item', ['EED_Feeds', 'the_event_rssjs_feed']);
                break;
            case EspressoPostType::VENUES:
                // for rss2, atom, rss, rdf
                add_filter('the_excerpt_rss', ['EED_Feeds', 'the_venue_feed']);
                add_filter('the_content_feed', ['EED_Feeds', 'the_venue_feed']);
                // for json ( also uses the above filter )
                add_filter('rssjs_feed_item', ['EED_Feeds', 'the_venue_rssjs_feed']);
                break;
        }
    }


    /**
     *    comment_feed_join - EVEN THOUGH... our espresso_attendees custom post type is set to NOT PUBLIC
     *    WordPress thought it would be a good idea to display the comments for them in the RSS feeds... we think NOT
     *    so this little snippet of SQL taps into the comment feed query and removes comments for the
     *    espresso_attendees post_type
     *
     * @param string $SQL the JOIN clause for the comment feed query
     * @return string
     */
    public static function comment_feed_join($SQL)
    {
        global $wpdb;
        // check for wp_posts table in JOIN clause
        if (strpos($SQL, $wpdb->posts) !== false) {
            add_filter('EED_Feeds__comment_feed_where__espresso_attendees', '__return_true');
        }
        return $SQL;
    }


    /**
     *    comment_feed_where - EVEN THOUGH... our espresso_attendees custom post type is set to NOT PUBLIC
     *    WordPress thought it would be a good idea to display the comments for them in the RSS feeds... we think NOT
     *    so this little snippet of SQL taps into the comment feed query and removes comments for the
     *    espresso_attendees post_type
     *
     * @param string $SQL the WHERE clause for the comment feed query
     * @return string
     */
    public static function comment_feed_where($SQL)
    {
        global $wp_query, $wpdb;
        if ($wp_query->is_comment_feed && apply_filters('EED_Feeds__comment_feed_where__espresso_attendees', false)) {
            $SQL .= " AND $wpdb->posts.post_type != '" . EspressoPostType::ATTENDEES . "'";
        }
        return $SQL;
    }


    /**
     *    the_event_feed
     *
     * @param string $content
     * @return string
     */
    public static function the_event_feed($content)
    {
        if (is_feed() && is_readable(RSS_FEEDS_TEMPLATES_PATH . 'espresso_events_feed.template.php')) {
            global $post;
            $template_args = [
                'EVT_ID'            => $post->ID,
                'event_description' => get_option('rss_use_excerpt') ? $post->post_excerpt : $post->post_content,
            ];
            $content       = EEH_Template::display_template(
                RSS_FEEDS_TEMPLATES_PATH . 'espresso_events_feed.template.php',
                $template_args,
                true
            );
        }
        return $content;
    }


    /**
     *    the_event_rssjs_feed
     *
     * @param object $item
     * @return object
     */
    public static function the_event_rssjs_feed($item)
    {
        if (is_feed() && isset($item->description)) {
            $item->description = EED_Feeds::the_event_feed($item->description);
        }
        return $item;
    }


    /**
     *    the_venue_feed
     *
     * @param string $content
     * @return string
     */
    public static function the_venue_feed($content)
    {
        if (is_feed() && is_readable(RSS_FEEDS_TEMPLATES_PATH . 'espresso_venues_feed.template.php')) {
            global $post;
            $template_args = [
                'VNU_ID'            => $post->ID,
                'venue_description' => get_option('rss_use_excerpt') ? $post->post_excerpt : $post->post_content,
            ];
            $content       = EEH_Template::display_template(
                RSS_FEEDS_TEMPLATES_PATH . 'espresso_venues_feed.template.php',
                $template_args,
                true
            );
        }
        return $content;
    }


    /**
     *    the_venue_rssjs_feed
     *
     * @param object $item
     * @return object
     */
    public static function the_venue_rssjs_feed($item)
    {
        if (is_feed() && isset($item->description)) {
            $item->description = EED_Feeds::the_venue_feed($item->description);
        }
        return $item;
    }
}
