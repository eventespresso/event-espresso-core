<?php

/**
 * EEH_Tabbed_Content
 *
 * This is a helper class for displaying tabbed content
 *
 * requires that the ee-admin-page.js and jquery-ui-tabs be loaded.
 *
 * @package     EEH_Tabbed_Content
 * @subpackage  helpers/
 * @author      Darren Ethier
 */
class EEH_Tabbed_Content
{

    /**
     * assembles and returns the html structure for tabs
     *
     * @static
     * @param array $tabs_contents an array of the content for each tab [required]
     * @param array $tabs_names    a numerically indexed array of names for each tab [optional]
     *                             - if this isn't included then we use the indexes for $tabs_content as the tab names)
     * @param bool  $small_tabs
     * @param bool  $tabs_content
     * @return string the assembled html string containing the tabbed content for display.
     * @throws EE_Error
     */
    public static function display($tabs_contents, $tabs_names = [], $small_tabs = true, $tabs_content = true)
    {

        // first check if $tabs_names is not empty then the count must match the count of $tabs_content otherwise we've got a problem houston
        if (! empty($tabs_names) && (count((array) $tabs_names) != count((array) $tabs_content))) {
            throw new EE_Error(
                esc_html__('The count for $tabs_names and $tabs_content does not match.', 'event_espresso')
            );
        }

        // make sure we've got incoming data setup properly
        $tabs         = ! empty($tabs_names)
            ? (array) $tabs_names
            : array_keys((array) $tabs_contents);
        $tabs_content = ! empty($tabs_names)
            ? array_combine((array) $tabs_names, (array) $tabs_content)
            : $tabs_contents;

        $tabs_html         = '';
        $tabs_content_html = '';

        $index = 0;
        foreach ($tabs as $tab) {
            $active            = $index === 0;
            $tabs_html         .= self::tab($tab, $active);
            $tabs_content_html .= self::tab_content($tab, $tabs_content[ $tab ], $active);
            $index++;
        }

        $tabs_class = $small_tabs ? ' ee-nav-tabs-small' : '';

        return "
    <div class='ee-nav-tabs{$tabs_class}'>
        <h2 class='nav-tab-wrapper'>{$tabs_html}</h2>
        {$tabs_content_html}
    </div>
    ";
    }


    /**
     * display_admin_nav_tabs
     * this returns the properly formatted tab html for EE_Admin_Pages.
     * We are expecting an array of tabs in the following format
     * array(
     *    'nav_tab_name' => array(
     *        'url' => 'url for tab',
     *        'link_text' => 'tab text',
     *        'css_class' => 'tab class' //including the nav-tab-active class if its active
     *    )
     * )
     *
     * @access public
     * @static
     * @param string[][] $nav_tabs tab array for nav tabs
     * @return string
     * @throws EE_Error
     */
    public static function display_admin_nav_tabs($nav_tabs = [])
    {
        if (empty($nav_tabs)) {
            throw new EE_Error(
                esc_html__('Nav Tabs cannot be generated because the tab array is missing', 'event_espresso')
            );
        }
        $tab_content = '';
        foreach ($nav_tabs as $slug => $tab) {
            $tab_content .= self::tab($slug, false, $tab['link_text'], $tab['url'], $tab['css_class']);
        }
        $aria_label = esc_attr__('Secondary menu', 'event_espresso');
        return "
        <nav class='nav-tab-wrapper wp-clearfix' aria-label='{$aria_label}'>
            {$tab_content}
        </nav>
        ";
    }


    /**
     * this simply returns a single tab given a tab name & content
     *
     * @param string      $name      name of tab
     * @param bool        $active    true=tab active, false=tab not active
     * @param bool|string $nice_name if string given then this value will be used for the tab link text.
     * @param bool|string $url       If url given then tabs will be generated linking to the url.
     * @param bool|string $css       If string given then the generated tab will include that as the class.
     * @return string          html for tab
     */
    private static function tab($name, $active = false, $nice_name = false, $url = false, $css = false)
    {
        $nice_name = $nice_name ?: esc_html(ucwords(str_replace(['_', '-'], ' ', $name)));
        $name      = self::generateTadID($name);
        $class     = $css ? ' ' . esc_attr($css) : '';
        $class     .= $active ? ' nav-tab-active' : '';
        $url       = $url ?: '#' . esc_attr($name);
        return "
        <a class='nav-tab{$class}' rel='{$name}' href='{$url}'>
            $nice_name
        </a>
        ";
    }


    /**
     * @param string $tab_name
     * @return string
     * @since   4.10.14.p
     */
    private static function generateTadID($tab_name)
    {
        return 'ee-tab-' . esc_attr(str_replace(' ', '-', $tab_name));
    }


    /**
     * this just returns the properly formatted tab content for our tab box.
     *
     * @param string $name        name of tab (used for selector)
     * @param string $tab_content content of tab
     * @param bool   $active
     * @return string html for content area
     */
    private static function tab_content($name, $tab_content, $active = false)
    {
        $class = $active ? '' : ' hidden';
        $name  = self::generateTadID($name);
        return "
    <div class='nav-tab-content{$class}' id='{$name}'>
        {$tab_content}
        <div style='clear:both'></div>
    </div>";
    }



    /** HORIZONTAL TEXT LINKS **/

    /**
     * This will take in an array of link items and spit out a formatted list of links that can be used to navigate to
     * items. There is a corresponding js file that can be loaded to dynamically display containers with the same id as
     * the href -ref.
     *
     * @param string[] $item_array      formatted array of items.  Format:
     *                                  array(
     *                                  'label' => esc_html__('localized label displayed'),
     *                                  'class' => 'class_for_item',
     *                                  'href' => '#some_item_id', //url/bookmark for item.  If you include a bookmark
     *                                  the js will used this to show the container div.
     *                                  'title' => esc_html__('localized text for the title attribute of the link'),
     *                                  'slug' => 'slug_used_for_reference'
     *                                  )
     * @param string   $container_class class used for main container
     * @param string   $sep             you can add in what is used as a separator between each link (or leave blank for
     *                                  none)
     * @param string   $default         You can include a string for the item that will receive the "item_display" class
     *                                  for the js.
     * @return string                  a html snippet of of all the formatted link elements.
     */
    public static function tab_text_links(array $item_array, $container_class = '', $sep = '|', $default = '')
    {
        $item_array = apply_filters('FHEE__EEH_Tabbed_Content__tab_text_links', $item_array, $container_class);
        if (! is_array($item_array) || empty($item_array)) {
            return false; // get out we don't have even the basic thing we need!
        }

        $defaults        = [
            'label' => esc_html__('Item', 'event_espresso'),
            'class' => '',
            'href'  => '',
            'title' => esc_attr__('Link for Item', 'event_espresso'),
            'slug'  => 'item_slug',
        ];
        $container_class = ! empty($container_class) ? ' ' . esc_attr($container_class) : '';
        $list            = '';
        $list_length     = count($item_array);
        // if we're' adding separators, set $current to 1, otherwise set it to list length + 1
        // then we'll increment $current while looping and only add separators if $current is < list length
        // (if we aren't adding separators $current will always be > list length cuz it started at list length + 1)
        $current = empty($sep) ? $list_length + 1 : 1;
        foreach ($item_array as $item) {
            $item          = wp_parse_args($item, $defaults);
            $item['class'] .= $default === $item['slug'] ? ' item_display' : '';
            $list          .= self::textLinkItem($item);
            $list          .= $current < $list_length ? self::textLinkSeparator($sep) : '';
            $current++;
        }

        return "
        <ul class='ee-text-links{$container_class}'>{$list}</ul>
        ";
    }


    /**
     * @param string[] $item
     * @return string
     */
    private static function textLinkItem(array $item)
    {
        $class = $item['class'] ? esc_attr($item['class']) : '';
        $label = esc_html($item['label']);
        $href  = $item['href'] ? esc_attr($item['href']) : '';
        $title = esc_attr($item['title']);


        $link = ! empty($href)
            ? "
            <a class='ee-text-link' href='#{$href}' title='{$title}'>
                {$label}
            </a>
            "
            : $label;
        return "
        <li class='ee-text-link-li {$class}'>{$link}</li>
        ";
    }


    /**
     * @param string $separator
     * @return string
     * @since   4.10.14.p
     */
    private static function textLinkSeparator($separator)
    {
        $separator = esc_html($separator);
        return "
        <li class='ee-text-link-sep'>{$separator}</li>
        ";
    }
}
