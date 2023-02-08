<?php

namespace EventEspresso\core\domain\services\admin\events\editor\ui;

/**
 * Class TicketSelectorShortcodeButton
 * Adds ticket selector shortcode button to the event editor
 *
 * @package EventEspresso\core\domain\services\admin\events\editor
 * @author  Hossein Rafiei
 * @since   $VID:$
 */
class TicketSelectorShortcodeButton
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
        $onclick   = 'prompt("Ticket Selector Shortcode:", jQuery("#espresso-ticket-selector-shortlink").val()); return false;';
        $shortcode = esc_attr("[ESPRESSO_TICKET_SELECTOR event_id='$id']");
        $title     = esc_html__('Ticket Selector Shortcode', 'event_espresso');
        $return    .= "
            <a class='button button--tiny button--secondary'
               onclick='$onclick'
               href='#'
               tabindex='-1'
            >
                <span class='dashicons dashicons-shortcode'></span>
                $title
            </a>";
        $return    .= "<input id='espresso-ticket-selector-shortlink' type='hidden' value='$shortcode'>";
        return $return;
    }
}
