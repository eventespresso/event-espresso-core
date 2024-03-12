<?php

namespace EventEspresso\core\domain\services\admin\events\editor\ui;

use EventEspresso\core\domain\entities\custom_post_types\EspressoPostType;

/**
 * Class TicketSelectorShortcodeButton
 * Adds ticket selector shortcode button to the event editor
 *
 * @package EventEspresso\core\domain\services\admin\events\editor
 * @author  Hossein Rafiei
 * @since   5.0.0.p
 */
class TicketSelectorShortcodeButton extends PermalinkHtmlHook
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
        $onclick   =
            'prompt("Ticket Selector Shortcode:", jQuery("#espresso-ticket-selector-shortlink").val()); return false;';
        $shortcode = esc_attr("[ESPRESSO_TICKET_SELECTOR event_id='$post_id']");
        $title     = esc_html__('Ticket Selector Shortcode', 'event_espresso');
        $html      .= "
            <a class='button button--tiny button--secondary'
               onclick='$onclick'
               href='#'
               tabindex='-1'
            >
                <span class='dashicons dashicons-shortcode'></span>
                $title
            </a>
            <input id='espresso-ticket-selector-shortlink' type='hidden' value='$shortcode'>";
        return $html;
    }
}
