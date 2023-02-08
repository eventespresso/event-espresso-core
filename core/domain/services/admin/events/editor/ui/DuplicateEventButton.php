<?php

namespace EventEspresso\core\domain\services\admin\events\editor\ui;

use EEH_URL;

/**
 * Class DuplicateEventButton
 * Adds duplicate event button to the event editor
 *
 * @package EventEspresso\core\domain\services\admin\events\editor
 * @author  Hossein Rafiei
 * @since   $VID:$
 */
class DuplicateEventButton
{
    /**
     * @param string $return
     * @param int $id
     * @param string|null $new_title
     * @param string|null $new_slug
     * @return string
     */
    public static function addButton(
        $return,
        $id,
        $new_title,
        $new_slug
    ) {
        // make sure this is only when editing
        if (empty($id)) {
            return $return;
        }
        $post = get_post($id);
        // make sure this is EE event
        if (! $post || $post->post_type !== 'espresso_events') {
            return $return;
        }
        $href   = EEH_URL::add_query_args_and_nonce(
            ['action' => 'duplicate_event', 'EVT_ID' => $id],
            admin_url('admin.php?page=espresso_events')
        );
        $title  = esc_attr__('Duplicate', 'event_espresso');
        $return .= "
            <a aria-label='$title' 
               class='button button--tiny button--secondary'  
               href='$href'
               id='ee-duplicate-event-button' 
               value='duplicate_event'
            >
                <span class='dashicons dashicons-admin-page'></span>
                $title
            </a>";
        return $return;
    }
}
