<?php

namespace EventEspresso\core\domain\services\admin\events\editor\ui;

/**
 * Class EventShortlinkButton
 * Adds shortlink button to the event editor
 *
 * @package EventEspresso\core\domain\services\admin\events\editor
 * @author  Hossein Rafiei
 * @since   5.0.0.p
 */
class EventShortlinkButton extends PermalinkHtmlHook
{
    public static function getShortlink(int $id): string
    {
        if (! empty($id) && get_option('permalink_structure') !== '') {
            $post = get_post($id);
            if (isset($post->post_type) && $post->post_type === 'espresso_events') {
                return home_url('?p=' . $post->ID);
            }
        }
        return '';
    }


    public static function addButton(string $html, int $post_id): string
    {
        $permalink = get_permalink($post_id);
        $shortlink = esc_attr(EventShortlinkButton::getShortlink($post_id));
        if (! empty($shortlink) && $shortlink !== $permalink && home_url('?page_id=' . $post_id) !== $permalink) {
            $onclick = 'prompt("URL:", jQuery("#espresso-event-shortlink").val()); return false;';
            $html    .= "
                <input id='espresso-event-shortlink' type='hidden' value='$shortlink' />
                <button type='button' class='button button--tiny button--secondary' onclick='$onclick'>
                    <span class='dashicons dashicons-admin-links'></span>
                    " . esc_html__('Shortlink') . "
                </button>";
        }
        return $html;
    }
}
