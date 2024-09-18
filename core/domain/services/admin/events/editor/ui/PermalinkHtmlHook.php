<?php

namespace EventEspresso\core\domain\services\admin\events\editor\ui;

abstract class PermalinkHtmlHook
{
    public static function addEventEditorPermalinkButton(int $priority = 10, int $accepted_args = 2)
    {
        add_filter('get_sample_permalink_html', [get_called_class(), 'addButton'], $priority, $accepted_args);
    }


    abstract public static function addButton(string $html, int $post_id): string;
}
