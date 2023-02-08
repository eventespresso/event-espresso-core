<?php

namespace EventEspresso\core\domain\services\admin\events\editor\ui;

/**
 * Class EventShortlinkButton
 * Adds shortlink button to the event editor
 *
 * @package EventEspresso\core\domain\services\admin\events\editor
 * @author  Hossein Rafiei
 * @since   $VID:$
 */
class EventShortlinkButton
{
    /**
     * @param int $id
     * @return string
     */
    public static function getShortlink($id)
    {
        if (! empty($id) && get_option('permalink_structure') !== '') {
            $post = get_post($id);
            if (isset($post->post_type) && $post->post_type === 'espresso_events') {
                return home_url('?p=' . $post->ID);
            }
        }
        return '';
    }

    /**
     * @param string $html
     * @param int $id
     * @return string
     */
    public static function addButton($html, $id)
    {
        $permalink = get_permalink($id);
        $shortlink = esc_attr(EventShortlinkButton::getShortlink($id));
        if (! empty($shortlink) && $shortlink !== $permalink && home_url('?page_id=' . $id) !== $permalink) {
            $onclick = 'prompt("URL:", jQuery("#espresso-event-shortlink").val()); return false;';
            $html .= "
                <input id='espresso-event-shortlink' type='hidden' value='$shortlink' />
                <button type='button' class='button button--tiny button--secondary' onclick='$onclick'>
                    <span class='dashicons dashicons-admin-links'></span>
                    " . __('Shortlink') . "
                </button>";
        }
        return $html;
    }
}
