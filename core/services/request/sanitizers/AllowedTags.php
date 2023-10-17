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
        'accept-charset'    => true,
        'action'            => true,
        'alt'               => true,
        'allow'             => true,
        'allowfullscreen'   => true,
        'align'             => true,
        'aria-controls'     => true,
        'aria-current'      => true,
        'aria-describedby'  => true,
        'aria-details'      => true,
        'aria-expanded'     => true,
        'aria-hidden'       => true,
        'aria-label'        => true,
        'aria-labelledby'   => true,
        'aria-live'         => true,
        'autocomplete'      => true,
        'bgcolor'           => true,
        'border'            => true,
        'cellpadding'       => true,
        'cellspacing'       => true,
        'checked'           => true,
        'class'             => true,
        'cols'              => true,
        'content'           => true,
        'data-*'            => true,
        'dir'               => true,
        'disabled'          => true,
        'enctype'           => true,
        'extension'         => true,
        'for'               => true,
        'frameborder'       => true,
        'height'            => true,
        'href'              => true,
        'id'                => true,
        'itemprop'          => true,
        'itemscope'         => true,
        'itemtype'          => true,
        'label'             => true,
        'lang'              => true,
        'leftmargin'        => true,
        'marginheight'      => true,
        'marginwidth'       => true,
        'max'               => true,
        'maxlength'         => true,
        'media'             => true,
        'method'            => true,
        'min'               => true,
        'multiple'          => true,
        'name'              => true,
        'novalidate'        => true,
        'onclick'           => true,
        'placeholder'       => true,
        'property'          => true,
        'readonly'          => true,
        'rel'               => true,
        'required'          => true,
        'rows'              => true,
        'selected'          => true,
        'src'               => true,
        'size'              => true,
        'style'             => true,
        'step'              => true,
        'tabindex'          => true,
        'target'            => true,
        'title'             => true,
        'topmargin'         => true,
        'type'              => true,
        'value'             => true,
        'width'             => true,
        'http-equiv'        => true,
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
        'small',
        'span',
        'strong',
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
     * @var array
     */
    private static $allowed_with_script_and_style_tags;

    /**
     * @var array
     */
    private static $allowed_with_full_tags;


    /**
     * merges additional tags and attributes into the WP post tags
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
     * merges embed tags and attributes into the EE all tags
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
     * merges form tags and attributes into the EE all tags
     */
    private static function initializeWithFormTags()
    {
        $all_tags = AllowedTags::getAllowedTags();
        $form_tags = [
            'form'     => AllowedTags::$attributes,
            'label'    => AllowedTags::$attributes,
            'input'    => AllowedTags::$attributes,
            'select'   => AllowedTags::$attributes,
            'option'   => AllowedTags::$attributes,
            'optgroup' => AllowedTags::$attributes,
            'textarea' => AllowedTags::$attributes,
            'button'   => AllowedTags::$attributes,
            'fieldset' => AllowedTags::$attributes,
            'output'   => AllowedTags::$attributes,
        ];
        AllowedTags::$allowed_with_form_tags = array_merge_recursive($all_tags, $form_tags);
    }


    /**
     * merges form script and style tags and attributes into the EE all tags
     */
    private static function initializeWithScriptAndStyleTags()
    {
        $all_tags = AllowedTags::getAllowedTags();
        $script_and_style_tags = [
            'script'   => AllowedTags::$attributes,
            'style'    => AllowedTags::$attributes,
            'link'     => AllowedTags::$attributes,
            'noscript' => AllowedTags::$attributes,
        ];
        AllowedTags::$allowed_with_script_and_style_tags = array_merge_recursive($all_tags, $script_and_style_tags);
    }

    /**
     * merges all head and body tags and attributes into the EE all tags
     */
    private static function initializeWithFullTags()
    {
        $all_tags = AllowedTags::getAllowedTags();
        $full_tags = [
            'script'    => AllowedTags::$attributes,
            'style'     => AllowedTags::$attributes,
            'link'      => AllowedTags::$attributes,
            'title'     => AllowedTags::$attributes,
            'meta'      => AllowedTags::$attributes,
            'iframe'    => AllowedTags::$attributes,
            'form'      => AllowedTags::$attributes,
            'label'     => AllowedTags::$attributes,
            'input'     => AllowedTags::$attributes,
            'select'    => AllowedTags::$attributes,
            'option'    => AllowedTags::$attributes,
            'optgroup'  => AllowedTags::$attributes,
            'textarea'  => AllowedTags::$attributes,
            'button'    => AllowedTags::$attributes,
            'fieldset'  => AllowedTags::$attributes,
            'output'    => AllowedTags::$attributes,
            'noscript'  => AllowedTags::$attributes,
            'html'      => AllowedTags::$attributes,
            'body'      => AllowedTags::$attributes,
            'head'      => AllowedTags::$attributes,
        ];
        AllowedTags::$allowed_with_full_tags = array_merge_recursive($all_tags, $full_tags);
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


    /**
     * @return array[]
     */
    public static function getWithScriptAndStyleTags()
    {
        if (empty(AllowedTags::$allowed_with_script_and_style_tags)) {
            AllowedTags::initializeWithScriptAndStyleTags();
        }
        return AllowedTags::$allowed_with_script_and_style_tags;
    }


    /**
     * @return array[]
     */
    public static function getWithFullTags()
    {
        if (empty(AllowedTags::$allowed_with_full_tags)) {
            AllowedTags::initializeWithFullTags();
        }
        return AllowedTags::$allowed_with_full_tags;
    }
}
