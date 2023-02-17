<?php

/**
 * Class EEH_HTML
 * Sometimes when writing PHP you need to generate some standard HTML,
 * but either not enough to warrant creating a template file,
 * or the amount of PHP conditionals and/or loops peppered throughout the HTML
 * just make it really ugly and difficult to read.
 * This class simply adds a bunch of methods for generating basic HTML tags.
 * Most of the methods have the same name as the HTML tag they generate, and most have the same set of parameters.
 *
 * @package             Event Espresso
 * @subpackage          core
 * @author              Brent Christensen
 */
class EEH_HTML
{
    /**
     *  instance of the EEH_Autoloader object
     *
     * @var    $_instance
     */
    private static $_instance;

    /**
     * @var array $_indent
     */
    private static $_indent = [];


    /**
     * @singleton method used to instantiate class object
     * @return EEH_HTML
     */
    public static function instance(): EEH_HTML
    {
        // check if class object is instantiated, and instantiated properly
        if (! self::$_instance instanceof EEH_HTML) {
            self::$_instance = new EEH_HTML();
        }
        return self::$_instance;
    }


    /**
     * @return void
     */
    private function __construct()
    {
        // set some initial formatting for table indentation
        EEH_HTML::$_indent = [
            'table' => 0,
            'thead' => 1,
            'tbody' => 1,
            'tr'    => 2,
            'th'    => 3,
            'td'    => 3,
            'div'   => 0,
            'h1'    => 0,
            'h2'    => 0,
            'h3'    => 0,
            'h4'    => 0,
            'h5'    => 0,
            'h6'    => 0,
            'p'     => 0,
            'ul'    => 0,
            'li'    => 1,
        ];
    }


    /**
     * Generates an opening HTML <XX> tag and adds any passed attributes
     * if passed content, it will also add that, as well as the closing </XX> tag
     *
     * @param string $tag
     * @param string $content          - inserted after opening tag, and appends closing tag, otherwise tag is left open
     * @param string $id               - html id attribute
     * @param string $class            - html class attribute
     * @param string $style            - html style attribute for applying inline styles
     * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
     * @param bool   $force_close
     * @return string
     */
    protected static function _open_tag(
        string $tag = 'div',
        string $content = '',
        string $id = '',
        string $class = '',
        string $style = '',
        string $other_attributes = '',
        bool $force_close = false
    ): string {
        $attributes = ! empty($id) ? ' id="' . EEH_HTML::sanitize_id($id) . '"' : '';
        $attributes .= ! empty($class) ? ' class="' . $class . '"' : '';
        $attributes .= ! empty($style) ? ' style="' . $style . '"' : '';
        $attributes .= ! empty($other_attributes) ? ' ' . $other_attributes : '';
        $html       = EEH_HTML::nl(0, $tag) . '<' . $tag . $attributes . '>';
        $html       .= trim($content) !== '' ? EEH_HTML::nl(1, $tag) . $content : '';
        $indent     = ! empty($content) || $force_close;
        $html       .= ! empty($content) || $force_close ? EEH_HTML::_close_tag($tag, $id, $class, $indent) : '';
        return $html;
    }


    /**
     * Generates HTML closing </XX> tag - if passed the id or class attribute
     * used for the opening tag, will append a comment
     *
     * @access protected
     * @param string $tag
     * @param string $id    - html id attribute
     * @param string $class - html class attribute
     * @param bool   $indent
     * @return string
     */
    protected static function _close_tag(
        string $tag = 'div',
        string $id = '',
        string $class = '',
        bool $indent = true
    ): string {
        $comment = '';
        if ($id) {
            $comment = EEH_HTML::comment('close ' . $id) . EEH_HTML::nl(0, $tag);
        } elseif ($class) {
            $comment = EEH_HTML::comment('close ' . $class) . EEH_HTML::nl(0, $tag);
        }
        $html = $indent ? EEH_HTML::nl(-1, $tag) : '';
        $html .= '</' . $tag . '>' . $comment;
        return $html;
    }


    /**
     *  div - generates HTML opening <div> tag and adds any passed attributes
     *  to add an id use:       echo EEH_HTML::div( 'this is some content', 'footer' );
     *  to add a class use:     echo EEH_HTML::div( 'this is some content', '', 'float_left' );
     *  to add a both an id and a class use:    echo EEH_HTML::div( 'this is some content', 'footer', 'float_left' );
     *
     * @param string $content          - inserted after opening tag, and appends closing tag, otherwise tag is left open
     * @param string $id               - html id attribute
     * @param string $class            - html class attribute
     * @param string $style            - html style attribute for applying inline styles
     * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
     * @return string
     */
    public static function div(
        string $content = '',
        string $id = '',
        string $class = '',
        string $style = '',
        string $other_attributes = ''
    ): string {
        return EEH_HTML::_open_tag('div', $content, $id, $class, $style, $other_attributes);
    }


    /**
     * Generates HTML closing </div> tag - if passed the id or class attribute used for the opening div tag, will
     * append a comment usage: echo EEH_HTML::divx();
     *
     * @param string $id    - html id attribute
     * @param string $class - html class attribute
     * @return string
     */
    public static function divx(string $id = '', string $class = ''): string
    {
        return EEH_HTML::_close_tag('div', $id, $class);
    }


    /**
     * Generates HTML <h1></h1> tags, inserts content, and adds any passed attributes
     * usage: echo EEH_HTML::h1( 'This is a Heading' );
     *
     * @param string $content          - inserted after opening tag, and appends closing tag, otherwise tag is left open
     * @param string $id               - html id attribute
     * @param string $class            - html class attribute
     * @param string $style            - html style attribute for applying inline styles
     * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
     * @return string
     */
    public static function h1(
        string $content = '',
        string $id = '',
        string $class = '',
        string $style = '',
        string $other_attributes = ''
    ): string {
        return EEH_HTML::_open_tag('h1', $content, $id, $class, $style, $other_attributes, true);
    }


    /**
     * Generates HTML <h2></h2> tags, inserts content, and adds any passed attributes
     * usage: echo EEH_HTML::h2( 'This is a Heading' );
     *
     * @param string $content          - inserted after opening tag, and appends closing tag, otherwise tag is left open
     * @param string $id               - html id attribute
     * @param string $class            - html class attribute
     * @param string $style            - html style attribute for applying inline styles
     * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
     * @return string
     */
    public static function h2(
        string $content = '',
        string $id = '',
        string $class = '',
        string $style = '',
        string $other_attributes = ''
    ): string {
        return EEH_HTML::_open_tag('h2', $content, $id, $class, $style, $other_attributes, true);
    }


    /**
     * Generates HTML <h3></h3> tags, inserts content, and adds any passed attributes
     * usage: echo EEH_HTML::h3( 'This is a Heading' );
     *
     * @param string $content          - inserted after opening tag, and appends closing tag, otherwise tag is left open
     * @param string $id               - html id attribute
     * @param string $class            - html class attribute
     * @param string $style            - html style attribute for applying inline styles
     * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
     * @return string
     */
    public static function h3(
        string $content = '',
        string $id = '',
        string $class = '',
        string $style = '',
        string $other_attributes = ''
    ): string {
        return EEH_HTML::_open_tag('h3', $content, $id, $class, $style, $other_attributes, true);
    }


    /**
     * Generates HTML <h4></h4> tags, inserts content, and adds any passed attributes
     * usage: echo EEH_HTML::h4( 'This is a Heading' );
     *
     * @param string $content          - inserted after opening tag, and appends closing tag, otherwise tag is left open
     * @param string $id               - html id attribute
     * @param string $class            - html class attribute
     * @param string $style            - html style attribute for applying inline styles
     * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
     * @return string
     */
    public static function h4(
        string $content = '',
        string $id = '',
        string $class = '',
        string $style = '',
        string $other_attributes = ''
    ): string {
        return EEH_HTML::_open_tag('h4', $content, $id, $class, $style, $other_attributes, true);
    }


    /**
     * Generates HTML <h5></h5> tags, inserts content, and adds any passed attributes
     * usage: echo EEH_HTML::h5( 'This is a Heading' );
     *
     * @param string $content          - inserted after opening tag, and appends closing tag, otherwise tag is left open
     * @param string $id               - html id attribute
     * @param string $class            - html class attribute
     * @param string $style            - html style attribute for applying inline styles
     * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
     * @return string
     */
    public static function h5(
        string $content = '',
        string $id = '',
        string $class = '',
        string $style = '',
        string $other_attributes = ''
    ): string {
        return EEH_HTML::_open_tag('h5', $content, $id, $class, $style, $other_attributes, true);
    }


    /**
     * Generates HTML <h6></h6> tags, inserts content, and adds any passed attributes
     * usage: echo EEH_HTML::h6( 'This is a Heading' );
     *
     * @param string $content          - inserted after opening tag, and appends closing tag, otherwise tag is left open
     * @param string $id               - html id attribute
     * @param string $class            - html class attribute
     * @param string $style            - html style attribute for applying inline styles
     * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
     * @return string
     */
    public static function h6(
        string $content = '',
        string $id = '',
        string $class = '',
        string $style = '',
        string $other_attributes = ''
    ): string {
        return EEH_HTML::_open_tag('h6', $content, $id, $class, $style, $other_attributes, true);
    }


    /**
     * Generates HTML <p></p> tags, inserts content, and adds any passed attributes
     * usage: echo EEH_HTML::p( 'this is a paragraph' );
     *
     * @param string $content          - inserted after opening tag, and appends closing tag, otherwise tag is left open
     * @param string $id               - html id attribute
     * @param string $class            - html class attribute
     * @param string $style            - html style attribute for applying inline styles
     * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
     * @return string
     */
    public static function p(
        string $content = '',
        string $id = '',
        string $class = '',
        string $style = '',
        string $other_attributes = ''
    ): string {
        return EEH_HTML::_open_tag('p', $content, $id, $class, $style, $other_attributes, true);
    }


    /**
     *  ul - generates HTML opening <ul> tag and adds any passed attributes
     *  usage:      echo EEH_HTML::ul( 'my-list-id', 'my-list-class' );
     *
     * @param string $id               - html id attribute
     * @param string $class            - html class attribute
     * @param string $style            - html style attribute for applying inline styles
     * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
     * @return string
     */
    public static function ul(
        string $id = '',
        string $class = '',
        string $style = '',
        string $other_attributes = ''
    ): string {
        return EEH_HTML::_open_tag('ul', '', $id, $class, $style, $other_attributes);
    }


    /**
     * Generates HTML closing </ul> tag - if passed the id or class attribute used for the opening ul tag, will append
     * a comment usage: echo EEH_HTML::ulx();
     *
     * @param string $id    - html id attribute
     * @param string $class - html class attribute
     * @return string
     */
    public static function ulx(string $id = '', string $class = ''): string
    {
        return EEH_HTML::_close_tag('ul', $id, $class);
    }


    /**
     * Generates HTML <li> tag, inserts content, and adds any passed attributes
     * if passed content, it will also add that, as well as the closing </li> tag
     * usage: echo EEH_HTML::li( 'this is a line item' );
     *
     * @param string $id               - html id attribute
     * @param string $class            - html class attribute
     * @param string $style            - html style attribute for applying inline styles
     * @param string $content          - inserted after opening tag, and appends closing tag, otherwise tag is left open
     * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
     * @return string
     */
    public static function li(
        string $content = '',
        string $id = '',
        string $class = '',
        string $style = '',
        string $other_attributes = ''
    ): string {
        return EEH_HTML::_open_tag('li', $content, $id, $class, $style, $other_attributes);
    }


    /**
     * Generates HTML closing </li> tag - if passed the id or class attribute used for the opening ul tag, will append
     * a comment usage: echo EEH_HTML::lix();
     *
     * @param string $id    - html id attribute
     * @param string $class - html class attribute
     * @return string
     */
    public static function lix(string $id = '', string $class = ''): string
    {
        return EEH_HTML::_close_tag('li', $id, $class);
    }


    /**
     *    table - generates an HTML <table> tag and adds any passed attributes
     *    usage: echo EEH_HTML::table();
     *
     * @param string $content          - inserted after opening tag, and appends closing tag, otherwise tag is left open
     * @param string $id               - html id attribute
     * @param string $class            - html class attribute
     * @param string $style            - html style attribute for applying inline styles
     * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
     * @return string
     */
    public static function table(
        string $content = '',
        string $id = '',
        string $class = '',
        string $style = '',
        string $other_attributes = ''
    ): string {
        return EEH_HTML::_open_tag('table', $content, $id, $class, $style, $other_attributes);
    }


    /**
     * tablex - generates an HTML </table> tag - if passed the id or class attribute used for the opening ul tag, will
     * append a comment
     *
     * @param string $id    - html id attribute
     * @param string $class - html class attribute
     * @return string
     */
    public static function tablex(string $id = '', string $class = ''): string
    {
        return EEH_HTML::_close_tag('table', $id, $class);
    }


    /**
     *    thead - generates an HTML <thead> tag and adds any passed attributes
     *    usage: echo EEH_HTML::thead();
     *
     * @param string $content          - inserted after opening tag, and appends closing tag, otherwise tag is left open
     * @param string $id               - html id attribute
     * @param string $class            - html class attribute
     * @param string $style            - html style attribute for applying inline styles
     * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
     * @return string
     */
    public static function thead(
        string $content = '',
        string $id = '',
        string $class = '',
        string $style = '',
        string $other_attributes = ''
    ): string {
        return EEH_HTML::_open_tag('thead', $content, $id, $class, $style, $other_attributes);
    }


    /**
     * theadx - generates an HTML </thead> tag - if passed the id or class attribute used for the opening ul tag, will
     * append a comment
     *
     * @param string $id    - html id attribute
     * @param string $class - html class attribute
     * @return string
     */
    public static function theadx(string $id = '', string $class = ''): string
    {
        return EEH_HTML::_close_tag('thead', $id, $class);
    }


    /**
     *    tbody - generates an HTML <tbody> tag and adds any passed attributes
     *    usage: echo EEH_HTML::tbody();
     *
     * @param string $content          - inserted after opening tag, and appends closing tag, otherwise tag is left open
     * @param string $id               - html id attribute
     * @param string $class            - html class attribute
     * @param string $style            - html style attribute for applying inline styles
     * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
     * @return string
     */
    public static function tbody(
        string $content = '',
        string $id = '',
        string $class = '',
        string $style = '',
        string $other_attributes = ''
    ): string {
        return EEH_HTML::_open_tag('tbody', $content, $id, $class, $style, $other_attributes);
    }


    /**
     * tbodyx - generates an HTML </tbody> tag - if passed the id or class attribute used for the opening ul tag, will
     * append a comment
     *
     * @param string $id    - html id attribute
     * @param string $class - html class attribute
     * @return string
     */
    public static function tbodyx(string $id = '', string $class = ''): string
    {
        return EEH_HTML::_close_tag('tbody', $id, $class);
    }


    /**
     *    tr - generates an HTML <tr> tag and adds any passed attributes
     *    usage: echo EEH_HTML::tr();
     *
     * @param string $content          - inserted after opening tag, and appends closing tag, otherwise tag is left open
     * @param string $id               - html id attribute
     * @param string $class            - html class attribute
     * @param string $style            - html style attribute for applying inline styles
     * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
     * @return string
     */
    public static function tr(
        string $content = '',
        string $id = '',
        string $class = '',
        string $style = '',
        string $other_attributes = ''
    ): string {
        return EEH_HTML::_open_tag('tr', $content, $id, $class, $style, $other_attributes);
    }


    /**
     * trx - generates an HTML </tr> tag - if passed the id or class attribute used for the opening ul tag, will append
     * a comment
     *
     * @param string $id    - html id attribute
     * @param string $class - html class attribute
     * @return string
     */
    public static function trx(string $id = '', string $class = ''): string
    {
        return EEH_HTML::_close_tag('tr', $id, $class);
    }


    /**
     *    th - generates an HTML <th> tag and adds any passed attributes
     *    usage: echo EEH_HTML::th();
     *
     * @param string $content          - inserted after opening tag, and appends closing tag, otherwise tag is left open
     * @param string $id               - html id attribute
     * @param string $class            - html class attribute
     * @param string $style            - html style attribute for applying inline styles
     * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
     * @return string
     */
    public static function th(
        string $content = '',
        string $id = '',
        string $class = '',
        string $style = '',
        string $other_attributes = ''
    ): string {
        return EEH_HTML::_open_tag('th', $content, $id, $class, $style, $other_attributes);
    }


    /**
     * thx - generates an HTML </th> tag - if passed the id or class attribute used for the opening ul tag, will append
     * a comment
     *
     * @param string $id    - html id attribute
     * @param string $class - html class attribute
     * @return string
     */
    public static function thx(string $id = '', string $class = ''): string
    {
        return EEH_HTML::_close_tag('th', $id, $class);
    }


    /**
     *    td - generates an HTML <td> tag and adds any passed attributes
     *    usage: echo EEH_HTML::td();
     *
     * @param string $content          - inserted after opening tag, and appends closing tag, otherwise tag is left open
     * @param string $id               - html id attribute
     * @param string $class            - html class attribute
     * @param string $style            - html style attribute for applying inline styles
     * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
     * @return string
     */
    public static function td(
        string $content = '',
        string $id = '',
        string $class = '',
        string $style = '',
        string $other_attributes = ''
    ): string {
        return EEH_HTML::_open_tag('td', $content, $id, $class, $style, $other_attributes);
    }


    /**
     * tdx - generates an HTML </td> tag - if passed the id or class attribute used for the opening ul tag, will append
     * a comment
     *
     * @param string $id    - html id attribute
     * @param string $class - html class attribute
     * @return string
     */
    public static function tdx(string $id = '', string $class = ''): string
    {
        return EEH_HTML::_close_tag('td', $id, $class);
    }


    /**
     * no_row - for generating a "hidden" table row, good for embedding tables within tables
     * generates a new table row with one td cell that spans however many columns you set
     * removes all styles from the tr and td
     *
     * @param string $content
     * @param int    $colspan
     * @return string
     */
    public static function no_row(string $content = '', int $colspan = 2): string
    {
        return EEH_HTML::tr(
            EEH_HTML::td($content, '', '', '', 'colspan="' . $colspan . '"'),
            '',
            'ee-no-row'
        );
    }


    /**
     * Generates HTML <a href="url">text</a> tags, inserts content, and adds any passed attributes
     * usage: echo EEH_HTML::link( 'domain.com', 'this is a link' );
     *
     * @param string $href             URL to link to
     * @param string $link_text        - the text that will become "hyperlinked"
     * @param string $title            - html title attribute
     * @param string $id               - html id attribute
     * @param string $class            - html class attribute
     * @param string $style            - html style attribute for applying inline styles
     * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
     * @return string
     */
    public static function link(
        string $href = '',
        string $link_text = '',
        string $title = '',
        string $id = '',
        string $class = '',
        string $style = '',
        string $other_attributes = ''
    ): string {
        $link_text  = ! empty($link_text) ? $link_text : $href;
        $attributes = ! empty($href) ? ' href="' . $href . '"' : '';
        $attributes .= ! empty($id) ? ' id="' . EEH_HTML::sanitize_id($id) . '"' : '';
        $attributes .= ! empty($class) ? ' class="' . $class . '"' : '';
        $attributes .= ! empty($style) ? ' style="' . $style . '"' : '';
        $attributes .= ! empty($title) ? ' title="' . esc_attr($title) . '"' : '';
        $attributes .= ! empty($other_attributes) ? ' ' . $other_attributes : '';
        return "<a$attributes>$link_text</a>";
    }


    /**
     * Generates HTML <button>text</button> tags, inserts content, and adds any passed attributes
     * usage: echo EEH_HTML::button( 'this is a button' );
     *
     * @param string $btn_text         - the text that will become "hyperlinked"
     * @param string $class            - html class attribute
     * @param string $aria_label       - aria-label attribute
     * @param string $id               - html id attribute
     * @param string $style            - html style attribute for applying inline styles
     * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
     * @return string
     */
    public static function button(
        string $btn_text = '',
        string $class = '',
        string $aria_label = '',
        string $id = '',
        string $style = '',
        string $other_attributes = ''
    ): string {
        $attributes = ! empty($aria_label) ? ' aria-label="' . $aria_label . '"' : '';
        $attributes .= ! empty($id) ? ' id="' . EEH_HTML::sanitize_id($id) . '"' : '';
        $attributes .= ! empty($class) ? ' class="' . $class . '"' : '';
        $attributes .= ! empty($style) ? ' style="' . $style . '"' : '';
        $attributes .= ! empty($other_attributes) ? ' ' . $other_attributes : '';
        return "<button type='button' $attributes>$btn_text</button>";
    }


    /**
     *    img - generates an HTML <img> tag and adds any passed attributes
     *    usage: echo EEH_HTML::img();
     *
     * @param string $src              - html src attribute ie: the path or URL to the image
     * @param string $alt              - html alt attribute
     * @param string $id               - html id attribute
     * @param string $class            - html class attribute
     * @param string $style            - html style attribute for applying inline styles
     * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
     * @return string
     */
    public static function img(
        string $src = '',
        string $alt = '',
        string $id = '',
        string $class = '',
        string $style = '',
        string $other_attributes = ''
    ): string {
        $attributes = ! empty($src) ? ' src="' . esc_url_raw($src) . '"' : '';
        $attributes .= ! empty($alt) ? ' alt="' . esc_attr($alt) . '"' : '';
        $attributes .= ! empty($id) ? ' id="' . EEH_HTML::sanitize_id($id) . '"' : '';
        $attributes .= ! empty($class) ? ' class="' . $class . '"' : '';
        $attributes .= ! empty($style) ? ' style="' . $style . '"' : '';
        $attributes .= ! empty($other_attributes) ? ' ' . $other_attributes : '';
        return '<img' . $attributes . '/>';
    }


    /**
     * Generates HTML <label></label> tags, inserts content, and adds any passed attributes
     * usage: echo EEH_HTML::span( 'this is some inline text' );
     *
     * @param string $tag
     * @param string $content          - inserted after opening tag, and appends closing tag, otherwise tag is left open
     * @param string $id               - html id attribute
     * @param string $class            - html class attribute
     * @param string $style            - html style attribute for applying inline styles
     * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
     * @return string
     */
    protected static function _inline_tag(
        string $tag = 'span',
        string $content = '',
        string $id = '',
        string $class = '',
        string $style = '',
        string $other_attributes = ''
    ): string {
        $attributes = ! empty($id) ? ' id="' . EEH_HTML::sanitize_id($id) . '"' : '';
        $attributes .= ! empty($class) ? ' class="' . $class . '"' : '';
        $attributes .= ! empty($style) ? ' style="' . $style . '"' : '';
        $attributes .= ! empty($other_attributes) ? ' ' . $other_attributes : '';
        return '<' . $tag . ' ' . $attributes . '>' . $content . '</' . $tag . '>';
    }


    /**
     * Generates HTML <label></label> tags, inserts content, and adds any passed attributes
     * usage: echo EEH_HTML::span( 'this is some inline text' );
     *
     * @param string $content          - inserted after opening tag, and appends closing tag, otherwise tag is left open
     * @param string $id               - html id attribute
     * @param string $class            - html class attribute
     * @param string $style            - html style attribute for applying inline styles
     * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
     * @return string
     */
    public static function label(
        string $content = '',
        string $id = '',
        string $class = '',
        string $style = '',
        string $other_attributes = ''
    ): string {
        return EEH_HTML::_inline_tag('label', $content, $id, $class, $style, $other_attributes);
    }


    /**
     * Generates HTML <span></span> tags, inserts content, and adds any passed attributes
     * usage: echo EEH_HTML::span( 'this is some inline text' );
     *
     * @param string $content          - inserted after opening tag, and appends closing tag, otherwise tag is left open
     * @param string $id               - html id attribute
     * @param string $class            - html class attribute
     * @param string $style            - html style attribute for applying inline styles
     * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
     * @return string
     */
    public static function span(
        string $content = '',
        string $id = '',
        string $class = '',
        string $style = '',
        string $other_attributes = ''
    ): string {
        return EEH_HTML::_inline_tag('span', $content, $id, $class, $style, $other_attributes);
    }


    /**
     * Generates HTML <span></span> tags, inserts content, and adds any passed attributes
     * usage: echo EEH_HTML::span( 'this is some inline text' );
     *
     * @param string $content          - inserted after opening tag, and appends closing tag, otherwise tag is left open
     * @param string $id               - html id attribute
     * @param string $class            - html class attribute
     * @param string $style            - html style attribute for applying inline styles
     * @param string $other_attributes - additional attributes like "colspan", inline JS, "rel" tags, etc
     * @return string
     */
    public static function strong(
        string $content = '',
        string $id = '',
        string $class = '',
        string $style = '',
        string $other_attributes = ''
    ): string {
        return EEH_HTML::_inline_tag('strong', $content, $id, $class, $style, $other_attributes);
    }


    /**
     * Generates an html <--  comment --> tag
     *  usage: echo comment( 'this is a comment' );
     *
     * @param string $comment
     * @return string
     */
    public static function comment(string $comment = ''): string
    {
        return ! empty($comment) ? EEH_HTML::nl() . '<!-- ' . $comment . ' -->' : '';
    }


    /**
     * br - generates a line break
     *
     * @param int $number - the number of line breaks to return
     * @return string
     */
    public static function br(int $number = 1): string
    {
        return str_repeat('<br />', $number);
    }


    /**
     * nbsp - generates non-breaking space entities based on number supplied
     *
     * @param int $number - the number of non-breaking spaces to return
     * @return string
     */
    public static function nbsp(int $number = 1): string
    {
        return str_repeat('&nbsp;', $number);
    }


    /**
     * sanitize_id
     * functionally does the same as the wp_core function sanitize_key except it does NOT use
     * strtolower and allows capitals.
     *
     * @param string $id
     * @return string
     */
    public static function sanitize_id(string $id = ''): string
    {
        $key = str_replace(' ', '-', trim($id));
        return preg_replace('/[^a-zA-Z0-9_\-]/', '', $key);
    }


    /**
     * return a newline and tabs ("nl" stands for "new line")
     *
     * @param int    $indent the number of tabs to ADD to the current indent (can be negative or zero)
     * @param string $tag
     * @return string - newline character plus # of indents passed (can be + or -)
     */
    public static function nl(int $indent = 0, string $tag = 'none'): string
    {
        $html = "\n";
        EEH_HTML::indent($indent, $tag);
        $html .= str_repeat("\t", EEH_HTML::$_indent[ $tag ]);
        return $html;
    }


    /**
     * Changes the indents used in EEH_HTML::nl. Often its convenient to change
     * the indentation level without actually creating a new line
     *
     * @param int    $indent can be negative to decrease the indentation level
     * @param string $tag
     */
    public static function indent(int $indent, string $tag = 'none')
    {
        static $default_indentation = false;
        if (! $default_indentation) {
            EEH_HTML::_set_default_indentation();
            $default_indentation = true;
        }
        if (! isset(EEH_HTML::$_indent[ $tag ])) {
            EEH_HTML::$_indent[ $tag ] = 0;
        }
        EEH_HTML::$_indent[ $tag ] += $indent;
        EEH_HTML::$_indent[ $tag ] = max(EEH_HTML::$_indent[ $tag ], 0);
    }


    /**
     *  class _set_default_indentation
     */
    private static function _set_default_indentation()
    {
        // set some initial formatting for table indentation
        EEH_HTML::$_indent = [
            'none'     => 0,
            'form'     => 0,
            'radio'    => 0,
            'checkbox' => 0,
            'select'   => 0,
            'option'   => 0,
            'optgroup' => 0,
            'table'    => 1,
            'thead'    => 2,
            'tbody'    => 2,
            'tr'       => 3,
            'th'       => 4,
            'td'       => 4,
            'div'      => 0,
            'h1'       => 0,
            'h2'       => 0,
            'h3'       => 0,
            'h4'       => 0,
            'h5'       => 0,
            'h6'       => 0,
            'p'        => 0,
            'ul'       => 0,
            'li'       => 1,
        ];
    }


    /**
     * Retrieves the list of tags considered "simple", that are probably safe for
     * use in inputs
     *
     * @return array
     * @global array $allowedtags
     */
    public static function get_simple_tags(): array
    {
        global $allowedtags;
        $tags_we_allow = array_merge_recursive(
            $allowedtags,
            [
                'ol' => [],
                'ul' => [],
                'li' => [],
                'br' => [],
                'p'  => [],
                'a'  => ['target'],
            ]
        );
        return apply_filters('FHEE__EEH_HTML__get_simple_tags', $tags_we_allow);
    }
}
