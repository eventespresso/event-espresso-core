<?php
namespace EventEspresso\core\admin;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
    exit( 'No direct script access allowed' );
}



/**
 * Class PostShortcodeTracking
 * Description
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         $VID:$
 */
class PostShortcodeTracking
{

    /**
     * set_hooks_admin
     *
     * @access    public
     */
    public static function set_hooks_admin()
    {
        add_action(
            'save_post',
            array( 'EventEspresso\core\admin\PostShortcodeTracking', 'parse_post_content_on_save' ),
            100,
            2
        );
        add_action(
            'delete_post',
            array( 'EventEspresso\core\admin\PostShortcodeTracking', 'unset_post_shortcodes_on_delete' ),
            100,
            1
        );
        add_action(
            'add_option_page_for_posts',
            array( 'EventEspresso\core\admin\PostShortcodeTracking', 'reset_page_for_posts_on_initial_set' ),
            100,
            2
        );
        add_action(
            'update_option',
            array( 'EventEspresso\core\admin\PostShortcodeTracking', 'reset_page_for_posts_on_change' ),
            100,
            3
        );
        add_action(
            'delete_option',
            array( 'EventEspresso\core\admin\PostShortcodeTracking', 'reset_page_for_posts_on_delete' ),
            100,
            1
        );
    }



    /**
     *    parse_post_content_on_save
     *    any time a post is saved, we need to check for any EE shortcodes that may be embedded in the content,
     *    and then track what posts those shortcodes are on, so that we can initialize shortcodes well before
     *    the_content() runs. this allows us to do things like enqueue scripts for shortcodes ONLY on the pages the
     *    shortcodes are actually used on
     *
     * @access    public
     * @param int      $post_ID
     * @param \WP_Post $post
     * @return    void
     */
    public static function parse_post_content_on_save( $post_ID, $post )
    {
        // if the post is trashed, then let's remove our post shortcode tracking
        if ( $post instanceof \WP_Post && $post->post_status === 'trash' ) {
            PostShortcodeTracking::unset_post_shortcodes_on_delete( $post_ID );
            return;
        }
        // default post types
        $post_types = array( 'post' => 0, 'page' => 1 );
        // add CPTs
        $CPTs = \EE_Register_CPTs::get_CPTs();
        $post_types = array_merge( $post_types, $CPTs );
        // for default or CPT posts...
        if ( isset( $post_types[ $post->post_type ] ) ) {
            // post on frontpage ?
            $page_for_posts = \EE_Config::get_page_for_posts();
            if ( $post->post_name === $page_for_posts ) {
                PostShortcodeTracking::set_post_shortcodes_for_posts_page( $page_for_posts );
                return;
            }
            // array of shortcodes indexed by post name
            \EE_Registry::CFG()->core->post_shortcodes = isset( \EE_Registry::CFG()->core->post_shortcodes )
                ? \EE_Registry::CFG()->core->post_shortcodes
                : array();
            // whether to proceed with update
            $update_post_shortcodes = false;
            // empty both arrays
            \EE_Registry::CFG()->core->post_shortcodes[ $post->post_name ] = array();
            // check that posts page is already being tracked
            if ( ! isset( \EE_Registry::CFG()->core->post_shortcodes[ $page_for_posts ] ) ) {
                // if not, then ensure that it is properly added
                \EE_Registry::CFG()->core->post_shortcodes[ $page_for_posts ] = array();
            }
            // loop thru shortcodes
            foreach ( \EE_Registry::instance()->shortcodes as $EES_Shortcode => $shortcode_dir ) {
                // convert to UPPERCASE to get actual shortcode
                $EES_Shortcode = strtoupper( $EES_Shortcode );
                // is the shortcode in the post_content ?
                if ( strpos( $post->post_content, $EES_Shortcode ) !== false ) {
                    // map shortcode to post names and post IDs
                    \EE_Registry::CFG()->core->post_shortcodes[ $post->post_name ][ $EES_Shortcode ] = $post_ID;
                    // and add this shortcode to the tracking for the blog page
                    PostShortcodeTracking::set_post_shortcode_for_posts_page( $page_for_posts, $EES_Shortcode,
                        $post_ID );
                    $update_post_shortcodes = true;
                } else {
                    // shortcode is not present in post content, so check if we were tracking it previously
                    // stop tracking if shortcode is not used in this specific post
                    if ( isset( \EE_Registry::CFG()->core->post_shortcodes[ $post->post_name ][ $EES_Shortcode ] ) ) {
                        unset( \EE_Registry::CFG()->core->post_shortcodes[ $post->post_name ][ $EES_Shortcode ] );
                        $update_post_shortcodes = true;
                    }
                    // make sure that something is set for the shortcode posts (even though we may remove this)
                    $shortcode_posts = isset(
                        \EE_Registry::CFG()->core->post_shortcodes[ $page_for_posts ][ $EES_Shortcode ]
                    )
                        ? \EE_Registry::CFG()->core->post_shortcodes[ $page_for_posts ][ $EES_Shortcode ]
                        : array();
                    // and stop tracking for this shortcode on the blog page if it is not used
                    $update_post_shortcodes = PostShortcodeTracking::unset_posts_page_shortcode_for_post(
                        $post_ID,
                        $EES_Shortcode,
                        $shortcode_posts,
                        $page_for_posts,
                        $update_post_shortcodes
                    )
                        ? true
                        : $update_post_shortcodes;
                }
            }
            if ( $update_post_shortcodes ) {
                PostShortcodeTracking::update_post_shortcodes( $page_for_posts );
            }
        }
    }



    /**
     * set_post_shortcodes_for_posts_page (plz note: shortcodes is plural)
     * called when updating the WordPress Posts Page,
     * and adds shortcode tracking for the Posts Page, for all shortcodes currently tracked on individual posts
     *
     * @access protected
     * @param  string $page_for_posts
     * @return void
     */
    protected static function set_post_shortcodes_for_posts_page( $page_for_posts )
    {
        \EE_Registry::CFG()->core->post_shortcodes[ $page_for_posts ] = array();
        // loop thru shortcodes
        foreach ( \EE_Registry::CFG()->core->post_shortcodes as $post_name => $post_shortcodes ) {
            foreach ( $post_shortcodes as $EES_Shortcode => $post_ID ) {
                PostShortcodeTracking::set_post_shortcode_for_posts_page( $page_for_posts, $EES_Shortcode, $post_ID );
            }
        }
        PostShortcodeTracking::update_post_shortcodes( $page_for_posts );
    }



    /**
     * set_post_shortcode_for_posts_page (plz note: shortcode is singular)
     * adds Posts Page shortcode tracking for the supplied shortcode for an individual post
     *
     * @access protected
     * @param  string $page_for_posts
     * @param         $EES_Shortcode
     * @param         $post_ID
     */
    protected static function set_post_shortcode_for_posts_page( $page_for_posts, $EES_Shortcode, $post_ID )
    {
        // critical page shortcodes that we do NOT want added to the Posts page (blog)
        $critical_shortcodes = \EE_Registry::CFG()->core->get_critical_pages_shortcodes_array();
        // if the shortcode is NOT one of the critical page shortcodes like ESPRESSO_TXN_PAGE
        if ( in_array( $EES_Shortcode, $critical_shortcodes ) ) {
            return;
        }
        // add shortcode to "Posts page" tracking
        if ( isset( \EE_Registry::CFG()->core->post_shortcodes[ $page_for_posts ][ $EES_Shortcode ] ) ) {
            // make sure tracking is in form of an array
            if ( ! is_array( \EE_Registry::CFG()->core->post_shortcodes[ $page_for_posts ][ $EES_Shortcode ] ) ) {
                \EE_Registry::CFG()->core->post_shortcodes[ $page_for_posts ][ $EES_Shortcode ] = array(
                    \EE_Registry::CFG()->core->post_shortcodes[ $page_for_posts ][ $EES_Shortcode ] => true,
                );
            }
            \EE_Registry::CFG()->core->post_shortcodes[ $page_for_posts ][ $EES_Shortcode ] += array( $post_ID => true );
        } else {
            \EE_Registry::CFG()->core->post_shortcodes[ $page_for_posts ][ $EES_Shortcode ] = array( $post_ID => true );
        }
    }



    /**
     * unset_post_shortcodes_on_delete
     *
     * @access protected
     * @param  int $ID
     * @return void
     */
    public static function unset_post_shortcodes_on_delete( $ID )
    {
        $update_post_shortcodes = false;
        // post on frontpage ?
        $page_for_posts = \EE_Config::get_page_for_posts();
        // looking for any references to this post
        foreach ( \EE_Registry::CFG()->core->post_shortcodes as $post_name => $post_shortcodes ) {
            // is this the "Posts Page" (blog) ?
            if ( $post_name === $page_for_posts ) {
                // loop thru shortcodes registered for the posts page
                foreach ( $post_shortcodes as $shortcode_class => $shortcode_posts ) {
                    $update_post_shortcodes = PostShortcodeTracking::unset_posts_page_shortcode_for_post(
                        $ID,
                        $shortcode_class,
                        $shortcode_posts,
                        $page_for_posts,
                        $update_post_shortcodes
                    )
                        ? true
                        : $update_post_shortcodes;
                }
            } else {
                // loop thru shortcodes registered for each page
                foreach ( $post_shortcodes as $shortcode_class => $post_ID ) {
                    // if this is page is being deleted, then don't track any post shortcodes for it
                    if ( $post_ID === $ID ) {
                        unset( \EE_Registry::CFG()->core->post_shortcodes[ $post_name ] );
                        $update_post_shortcodes = true;
                    }
                }
            }
        }
        if ( $update_post_shortcodes ) {
            PostShortcodeTracking::update_post_shortcodes( $page_for_posts );
        }
    }



    /**
     * unset_post_shortcodes_on_delete
     *
     * @access protected
     * @param  int $ID
     * @param      $shortcode_class
     * @param      $shortcode_posts
     * @param      $page_for_posts
     * @param bool $update_post_shortcodes
     * @return bool
     */
    protected static function unset_posts_page_shortcode_for_post(
        $ID,
        $shortcode_class,
        $shortcode_posts,
        $page_for_posts,
        $update_post_shortcodes = false
    ) {
        // make sure that an array of post IDs is being tracked for each  shortcode
        if ( ! is_array( $shortcode_posts ) ) {
            \EE_Registry::CFG()->core->post_shortcodes[ $page_for_posts ][ $shortcode_class ] = array(
                $shortcode_posts => true,
            );
            $update_post_shortcodes = true;
        }
        // now if the ID of the post being deleted is in the $shortcode_posts array
        if ( is_array( $shortcode_posts ) && isset( $shortcode_posts[ $ID ] ) ) {
            unset( \EE_Registry::CFG()->core->post_shortcodes[ $page_for_posts ][ $shortcode_class ][ $ID ] );
            $update_post_shortcodes = true;
        }
        // if nothing is registered for that shortcode anymore, then delete the shortcode altogether
        if ( empty( \EE_Registry::CFG()->core->post_shortcodes[ $page_for_posts ][ $shortcode_class ] ) ) {
            unset( \EE_Registry::CFG()->core->post_shortcodes[ $page_for_posts ][ $shortcode_class ] );
            $update_post_shortcodes = true;
        }
        return $update_post_shortcodes;
    }



    /**
     *    update_post_shortcodes
     *
     * @access    public
     * @param $page_for_posts
     * @return    void
     */
    public static function update_post_shortcodes( $page_for_posts = '' )
    {
        // make sure page_for_posts is set
        $page_for_posts = ! empty( $page_for_posts )
            ? $page_for_posts
            : \EE_Config::get_page_for_posts();
        // allow others to mess stuff up :D
        do_action(
            'AHEE__\EventEspresso\core\admin\PostShortcodeTracking__update_post_shortcodes',
            \EE_Config::instance()->core->post_shortcodes,
            $page_for_posts
        );
        // keep old hookpoint for now, will deprecate later
        do_action(
            'AHEE__EE_Config__update_post_shortcodes',
            \EE_Config::instance()->core->post_shortcodes,
            $page_for_posts
        );
        // verify that post_shortcodes is set
        \EE_Config::instance()->core->post_shortcodes = isset( \EE_Config::instance()->core->post_shortcodes )
                                                        && is_array( \EE_Config::instance()->core->post_shortcodes )
            ? \EE_Config::instance()->core->post_shortcodes
            : array();
        // cycle thru post_shortcodes
        foreach ( \EE_Config::instance()->core->post_shortcodes as $post_name => $shortcodes ) {
            // are there any shortcodes to track ?
            if ( ! empty( $shortcodes ) ) {
                // skip the posts page, because we want all shortcodes registered for it
                if ( $post_name === $page_for_posts ) {
                    continue;
                }
                // loop thru list of tracked shortcodes
                foreach ( $shortcodes as $shortcode => $post_id ) {
                    // make sure post still exists
                    $post = get_post( $post_id );
                    // check that the post name matches what we have saved
                    if ( $post && $post->post_name === $post_name ) {
                        // if so, then break before hitting the unset below
                        continue;
                    }
                    // we don't like missing posts around here >:(
                    unset( \EE_Config::instance()->core->post_shortcodes[ $post_name ] );
                }
            } else {
                // you got no shortcodes to keep track of !
                unset( \EE_Config::instance()->core->post_shortcodes[ $post_name ] );
            }
        }
        // critical page shortcodes that we do NOT want added to the Posts page (blog)
        $critical_shortcodes = \EE_Config::instance()->core->get_critical_pages_shortcodes_array();
        $critical_shortcodes = array_flip( $critical_shortcodes );
        foreach ( $critical_shortcodes as $critical_shortcode ) {
            unset( \EE_Config::instance()->core->post_shortcodes[ $page_for_posts ][ $critical_shortcode ] );
        }
        //only show errors
        \EE_Config::instance()->update_espresso_config();
    }



    /**
     * reset_page_for_posts_on_initial_set
     * if an admin is on the WP Reading Settings page and sets the option for "Posts page",
     * when it had previously been unset,
     * then we need to attribute any actively used shortcodes to the new blog page
     *
     * @access public
     * @param  string $option
     * @param  string $value
     * @return void
     */
    public static function reset_page_for_posts_on_initial_set( $option, $value )
    {
        PostShortcodeTracking::reset_page_for_posts_on_change( $option, '', $value );
    }



    /**
     *    reset_page_for_posts_on_change
     *    if an admin is on the WP Reading Settings page and changes the option for "Posts page",
     * then we need to attribute any actively used shortcodes for the previous blog page to the new blog page
     *
     * @access public
     * @param  string $option
     * @param  string $old_value
     * @param  string $value
     * @return void
     */
    public static function reset_page_for_posts_on_change( $option, $old_value = '', $value = '' )
    {
        if ( $option === 'page_for_posts' ) {
            global $wpdb;
            $table = $wpdb->posts;
            $SQL = "SELECT post_name from $table WHERE post_type='posts' OR post_type='page' AND post_status='publish' AND ID=%d";
            $new_page_for_posts = $value ? $wpdb->get_var( $wpdb->prepare( $SQL, $value ) ) : 'posts';
            PostShortcodeTracking::set_post_shortcodes_for_posts_page( $new_page_for_posts );
        }
    }



    /**
     * reset_page_for_posts_on_delete
     * if an admin deletes a page designated as the WP "Posts page",
     * then we need to attribute any actively used shortcodes for that blog page to a generic 'posts' page
     *
     * @access public
     * @param  string $option
     * @return void
     */
    public static function reset_page_for_posts_on_delete( $option )
    {
        if ( $option === 'page_for_posts' ) {
            PostShortcodeTracking::set_post_shortcodes_for_posts_page( 'posts' );
        }
    }



    /**
     * @param array|string $shortcodes
     * @param bool         $index_results if passing more than one shortcode for the $shortcodes parameter above,
     *                                    then setting this to true, will return as associative array indexed by
     *                                    the shortcodes. If false, then the returned array will be unindexed
     * @return array
     */
    public static function get_post_ids_for_shortcode( $shortcodes, $index_results = true )
    {
        $post_ids = array();
        if ( is_array( $shortcodes ) ) {
            foreach ( $shortcodes as $shortcode ) {
                $new_post_ids = PostShortcodeTracking::get_post_ids_for_shortcode(
                    $shortcode,
                    $index_results
                );
                foreach ( $new_post_ids as $new_post_id ) {
                    if ( $index_results ) {
                        $post_ids[ $shortcode ][ $new_post_id ] = $new_post_id;
                    } else {
                        $post_ids[ $new_post_id ] = $new_post_id;
                    }
                }
            }
        } else {
            $shortcode = strtoupper( $shortcodes );
            $shortcode = strpos( $shortcode, 'ESPRESSO_' ) !== 0 ? "ESPRESSO_{$shortcode}" : $shortcode;
            $page_for_posts = \EE_Config::get_page_for_posts();
            // looking for any references to this post
            foreach ( \EE_Registry::CFG()->core->post_shortcodes as $post_name => $post_shortcodes ) {
                // if this is the "Posts Page" (blog), then skip it
                if ( $post_name === $page_for_posts ) {
                    continue;
                }
                // loop thru shortcodes registered for each page, and grab post id for matches
                foreach ( (array) $post_shortcodes as $post_shortcode => $post_ID ) {
                    if ( $post_shortcode === $shortcode ) {
                        $post_ids[ $post_ID ] = $post_ID;
                    }
                }
            }
        }
        return $post_ids;
    }



}
// End of file PostShortcodeTracking.php
// Location: /PostShortcodeTracking.php