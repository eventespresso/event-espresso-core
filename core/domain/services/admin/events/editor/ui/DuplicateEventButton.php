<?php

namespace EventEspresso\core\domain\services\admin\events\editor\ui;

use EEH_URL;
use EventEspresso\core\domain\entities\custom_post_types\EspressoPostType;

/**
 * Class DuplicateEventButton
 * Adds duplicate event button to the event editor
 *
 * @package EventEspresso\core\domain\services\admin\events\editor
 * @author  Hossein Rafiei
 * @since   5.0.0.p
 */
class DuplicateEventButton extends PermalinkHtmlHook
{
    public static function addButton(string $html, int $post_id): string
    {
        // make sure this is only when editing
        if (empty($post_id)) {
            return $html;
        }
        $post = get_post($post_id);
        // make sure this is EE event
        if (! $post || $post->post_type !== EspressoPostType::EVENTS) {
            return $html;
        }
        $href  = EEH_URL::add_query_args_and_nonce(
            ['action' => 'duplicate_event', 'EVT_ID' => $post_id],
            admin_url('admin.php?page=espresso_events')
        );
        $title = esc_attr__('Duplicate', 'event_espresso');
        $html  .= "
            <a aria-label='$title'
               class='button button--tiny button--secondary'
               href='$href'
               id='ee-duplicate-event-button'
               value='duplicate_event'
            >
                <span class='dashicons dashicons-admin-page'></span>
                $title
            </a>";
        return $html;
    }
}
