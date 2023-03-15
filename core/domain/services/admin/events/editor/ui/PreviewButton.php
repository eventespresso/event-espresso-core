<?php

namespace EventEspresso\core\domain\services\admin\events\editor\ui;

/**
 * Class PreviewButton
 * Adds Preview button to the event editor
 *
 * @package EventEspresso\core\domain\services\admin\events\editor
 * @author  Hossein Rafiei
 * @since   5.0.0.p
 */
class PreviewButton
{
    public static function addButton(
        string $return,
        int $id
    ): string {
        $post = get_post($id);
        if ('publish' !== get_post_status($post)) {
            $title  = esc_html__('Preview', 'event_espresso');
            $href   = get_preview_post_link($id);
            $return .= "
                <span id='view-post-btn'>
                    <a target='_blank'
                       href='$href'
                       class='button button--tiny button--secondary'
                    >
                        <span class='dashicons dashicons-welcome-view-site'></span>
                        $title
                    </a>
                </span>";
        }
        return $return;
    }
}
