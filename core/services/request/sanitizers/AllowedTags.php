<?php

namespace EventEspresso\core\services\request\sanitizers;

/**
 * Class AllowedTags
 * expanded list of tags and attributes for use with wp_kses()
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\request\sanitizers
 * @since   4.10.29.p
 */
class AllowedTags
{

    /**
     * @var array[]
     */
    private static $attributes = [
        'action'     => [],
        'align'      => [],
        'alt'        => [],
        'class'      => [],
        'data'       => [],
        'for'        => [],
        'height'     => [],
        'href'       => [],
        'id'         => [],
        'method'     => [],
        'name'       => [],
        'novalidate' => [],
        'rel'        => [],
        'src'        => [],
        'style'      => [],
        'tabindex'   => [],
        'target'     => [],
        'title'      => [],
        'type'       => [],
        'value'      => [],
        'width'      => [],
    ];


    /**
     * @var array
     */
    private static $tags = [
        'a',
        'abbr',
        'b',
        'br',
        'code',
        'div',
        'em',
        'form',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'hr',
        'i',
        'iframe',
        'img',
        'input',
        'label',
        'li',
        'ol',
        'p',
        'pre',
        'script',
        'small',
        'span',
        'strong',
        'style',
        'table',
        'td',
        'textarea',
        'tr',
        'ul',
    ];

    /**
     * @var array
     */
    private static $allowed_tags;


    /**
     * merges additional tags and attributes into the WP global $allowedposttags
     */
    private static function initializeAllowedTags()
    {
        global $allowedposttags;
        $allowed_tags = [];
        foreach (AllowedTags::$tags as $tag) {
            $allowed_tags[ $tag ] = AllowedTags::$attributes;
        }
        AllowedTags::$allowed_tags = array_merge_recursive($allowedposttags, $allowed_tags);
    }


    /**
     * @return array[]
     */
    public static function getAllowedTags()
    {
        if (empty(AllowedTags::$allowed_tags)) {
            AllowedTags::initializeAllowedTags();
        }
        return AllowedTags::$allowed_tags;
    }
}
