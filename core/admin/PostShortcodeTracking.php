<?php
namespace EventEspresso\core\admin;

defined( 'EVENT_ESPRESSO_VERSION' ) || exit();



/**
 * Class PostShortcodeTracking.
 *
 * @deprecated 4.9.26
 */
class PostShortcodeTracking
{

    /**
     * @deprecated 4.9.26
     * @return    void
     */
    public static function set_hooks_admin()
    {
        \EE_Error::doing_it_wrong(__METHOD__, __('Usage is deprecated.', 'event_espresso'), '4.9.26');
    }



    /**
     * @deprecated 4.9.26
     * @param $post_ID
     * @param $post
     * @return void
     */
    public static function parse_post_content_on_save( $post_ID, $post )
    {
        \EE_Error::doing_it_wrong(__METHOD__, __('Usage is deprecated.', 'event_espresso'), '4.9.26');
    }



    /**
     * @deprecated 4.9.26
     * @param $page_for_posts
     * @return void
     */
    protected static function set_post_shortcodes_for_posts_page( $page_for_posts )
    {
        \EE_Error::doing_it_wrong(__METHOD__, __('Usage is deprecated.', 'event_espresso'), '4.9.26');
    }



    /**
     * @deprecated 4.9.26
     * @param $page_for_posts
     * @param $EES_Shortcode
     * @param $post_ID
     * @return void
     */
    protected static function set_post_shortcode_for_posts_page( $page_for_posts, $EES_Shortcode, $post_ID )
    {
        \EE_Error::doing_it_wrong(__METHOD__, __('Usage is deprecated.', 'event_espresso'), '4.9.26');
    }



    /**
     * @deprecated 4.9.26
     * @param $ID
     * @return void
     */
    public static function unset_post_shortcodes_on_delete( $ID )
    {
        \EE_Error::doing_it_wrong(__METHOD__, __('Usage is deprecated.', 'event_espresso'), '4.9.26');
    }



    /**
     * @deprecated 4.9.26
     * @param      $ID
     * @param      $shortcode_class
     * @param      $shortcode_posts
     * @param      $page_for_posts
     * @param bool $update_post_shortcodes
     * @return void
     */
    protected static function unset_posts_page_shortcode_for_post(
        $ID,
        $shortcode_class,
        $shortcode_posts,
        $page_for_posts,
        $update_post_shortcodes = false
    ) {
        \EE_Error::doing_it_wrong(__METHOD__, __('Usage is deprecated.', 'event_espresso'), '4.9.26');
    }



    /**
     * @deprecated 4.9.26
     * @param string $page_for_posts
     * @return void
     */
    public static function update_post_shortcodes( $page_for_posts = '' )
    {
        \EE_Error::doing_it_wrong(__METHOD__, __('Usage is deprecated.', 'event_espresso'), '4.9.26');
    }



    /**
     * @deprecated 4.9.26
     * @param $option
     * @param $value
     * @return void
     */
    public static function reset_page_for_posts_on_initial_set( $option, $value )
    {
        \EE_Error::doing_it_wrong(__METHOD__, __('Usage is deprecated.', 'event_espresso'), '4.9.26');
    }



    /**
     * @deprecated 4.9.26
     * @param        $option
     * @param string $old_value
     * @param string $value
     * @return void
     */
    public static function reset_page_for_posts_on_change( $option, $old_value = '', $value = '' )
    {
        \EE_Error::doing_it_wrong(__METHOD__, __('Usage is deprecated.', 'event_espresso'), '4.9.26');
    }



    /**
     * @deprecated 4.9.26
     * @param $option
     * @return void
     */
    public static function reset_page_for_posts_on_delete( $option )
    {
        \EE_Error::doing_it_wrong(__METHOD__, __('Usage is deprecated.', 'event_espresso'), '4.9.26');
    }



    /**
     * @deprecated 4.9.26
     * @param      $shortcodes
     * @param bool $index_results
     * @return void
     */
    public static function get_post_ids_for_shortcode( $shortcodes, $index_results = true )
    {
        \EE_Error::doing_it_wrong(__METHOD__, __('Usage is deprecated.', 'event_espresso'), '4.9.26');
    }



}
// End of file PostShortcodeTracking.php
// Location: /PostShortcodeTracking.php