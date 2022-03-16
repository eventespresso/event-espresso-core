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
        'data-*'            => 1,
        'aria-*'            => 1,
        'type'              => 1,
        'value'             => 1,
        'class'             => 1,
        'id'                => 1,
        'for'               => 1,
        'style'             => 1,
        'src'               => 1,
        'alt'               => 1,
        'title'             => 1,
        'placeholder'       => 1,
        'href'              => 1,
        'rel'               => 1,
        'target'            => 1,
        'novalidate'        => 1,
        'name'              => 1,
        'tabindex'          => 1,
        'action'            => 1,
        'method'            => 1,
        'width'             => 1,
        'height'            => 1,
        'selected'          => 1,
        'checked'           => 1,
        'readonly'          => 1,
        'disabled'          => 1,
        'required'          => 1,
        'autocomplete'      => 1,
        'min'               => 1,
        'max'               => 1,
        'step'              => 1,
        'cols'              => 1,
        'rows'              => 1,
        'lang'              => 1,
        'dir'               => 1,
        'enctype'           => 1,
        'multiple'          => 1,
        'frameborder'       => 1,
        'allow'             => 1,
        'allowfullscreen'   => 1,
        'label'             => 1,
        'align'             => 1,
        'itemtype'          => 1,
        'itemscope'         => 1,
        'itemprop'          => 1,
        'content'           => 1,
        'accept-charset'    => 1,
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
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'hr',
        'i',
        'img',
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
        'tr',
        'ul',
    ];


    /**
     * @var array
     */
    private static $allowed_tags;


    /**
     * @var array
     */
    private static $allowed_with_embed_tags;


    /**
     * @var array
     */
    private static $allowed_with_form_tags;


    /**
     * merges additional tags and attributes into the WP global $allowedposttags
     */
    private static function initializeAllowedTags()
    {
        $allowed_post_tags = wp_kses_allowed_html('post');
        $allowed_tags = [];
        foreach (AllowedTags::$tags as $tag) {
            $allowed_tags[ $tag ] = AllowedTags::$attributes;
        }
        AllowedTags::$allowed_tags = array_merge_recursive($allowed_post_tags, $allowed_tags);
    }


    /**
     * merges additional tags and attributes into the WP global $allowedposttags
     */
    private static function initializeWithEmbedTags()
    {
        $all_tags = AllowedTags::getAllowedTags();
        $embed_tags = [
            'iframe' => AllowedTags::$attributes
        ];
        AllowedTags::$allowed_with_embed_tags = array_merge_recursive($all_tags, $embed_tags);
    }


    /**
     * merges additional tags and attributes into the WP global $allowedposttags
     */
    private static function initializeWithFormTags()
    {
        $all_tags = AllowedTags::getAllowedTags();
        $form_tags = [
            'form' => AllowedTags::$attributes,
            'label' => AllowedTags::$attributes,
            'input' => AllowedTags::$attributes,
            'select' => AllowedTags::$attributes,
            'option' => AllowedTags::$attributes,
            'optgroup' => AllowedTags::$attributes,
            'textarea' => AllowedTags::$attributes,
            'button' => AllowedTags::$attributes,
            'fieldset' => AllowedTags::$attributes,
            'output' => AllowedTags::$attributes,
        ];
        AllowedTags::$allowed_with_form_tags = array_merge_recursive($all_tags, $form_tags);
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


    /**
     * @return array[]
     */
    public static function getWithEmbedTags()
    {
        if (empty(AllowedTags::$allowed_with_embed_tags)) {
            AllowedTags::initializeWithEmbedTags();
        }
        return AllowedTags::$allowed_with_embed_tags;
    }


    /**
     * @return array[]
     */
    public static function getWithFormTags()
    {
        if (empty(AllowedTags::$allowed_with_form_tags)) {
            AllowedTags::initializeWithFormTags();
        }
        return AllowedTags::$allowed_with_form_tags;
    }
}
