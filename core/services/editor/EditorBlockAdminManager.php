<?php

namespace EventEspresso\core\services\editor;

use EE_Register_CPTs;
use WP_Post_Type;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class EditorBlockAdminManager
 * Description
 *
 * @package EventEspresso\core\services\editor
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EditorBlockAdminManager extends EditorBlockManager
{

    /**
     *  Returns the name of a hookpoint to be used to call initialize()
     *
     * @return string
     */
    public function init_hook()
    {
        return 'AHEE__EE_System__load_CPTs_and_session__complete';
    }


    /**
     * Perform any early setup required for block editors to functions
     *
     * @return void
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     * @throws \InvalidArgumentException
     */
    public function initialize()
    {
        $custom_post_types     = EE_Register_CPTs::get_CPTs();
        $espresso_post_types   = array_keys($custom_post_types);
        $espresso_post_types[] = 'espresso_registrations';
        if (
            ($this->action === 'edit' || $this->action === 'create_new' || $this->action === 'edit_attendee')
            && in_array($this->page, $espresso_post_types, true)
        ) {
            $this->loadCustomPostTypeBlockEditor(array_keys($custom_post_types));
        }
        add_action('admin_url', array($this, 'coerceEeCptEditorUrlForGutenberg'), 10, 3);/**/
    }


    public function loadCustomPostTypeBlockEditor(array $custom_post_types)
    {
        $this->modifyWpPostTypes($custom_post_types);
        // add_action('admin_enqueue_scripts', array($this, 'registerAdminScripts'), 20);
        add_filter('FHEE__EE_Admin_Page_CPT___create_new_cpt_item__replace_editor', 'gutenberg_init', 10, 2);
    }

    /**
     * Manipulate globals related to EE Post Type so gutenberg loads.
     */
    private function modifyWpPostTypes(array $custom_post_types)
    {
        global $wp_post_types, $_wp_post_type_features;
        foreach ($custom_post_types as $post_type) {
            $_wp_post_type_features[ $post_type ]['editor'] = true;
            if(isset($wp_post_types[ $post_type ]) && $wp_post_types[ $post_type ] instanceof WP_Post_Type){
                $post_type_object = $wp_post_types[ $post_type ];
                $post_type_object->show_in_rest = true;
                $post_type_object->template = array();
                foreach ($this->blocks as $block) {
                    if($block->appliesToPostType($post_type)){
                        $post_type_object->template[] = $block->getEditorContainer();
                    }
                }
            }
        }
    }


    public function coerceEeCptEditorUrlForGutenberg($url, $path, $blog_id)
    {
        if (
            $this->page === 'espresso_events'
            && ($this->action === 'edit' || $this->action === 'create_new')
            && strpos($path, 'post.php') !== false
        ) {
            return add_query_arg(
                array(
                    'page'   => $this->page,
                    'action' => $this->action
                ),
                get_site_url($blog_id)
            );
        }
        return $url;
    }



    public function registerAdminScripts()
    {
    }
}
