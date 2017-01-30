<?php
namespace EventEspresso\core\libraries\iframe_display;

defined( 'ABSPATH' ) || exit;



/**
 * Class IframeEmbedButton
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9
 */
abstract class IframeEmbedButton
{


    /**
     * @var string $iframe_name
     */
    private $iframe_name;

    /**
     * @var string $route_name
     */
    private $route_name;

    /**
     * @var string $slug
     */
    private $slug;

    /**
     * @var boolean $append_filterable_content
     */
    private $append_filterable_content;



    /**
     * IframeEmbedButton constructor.
     *
     * @param string $iframe_name i18n name for the iframe. This will be used in HTML
     * @param string $route_name  the name of the registered route
     * @param string $slug        URL slug used for the thing the iframe button is being embedded in.
     *                            will most likely be "event" since that's the only usage atm
     */
    public function __construct( $iframe_name, $route_name, $slug = 'event' )
    {
        $this->iframe_name = $iframe_name;
        $this->route_name = $route_name;
        $this->slug = $slug;
    }



    /**
     * Adds an iframe embed code button to the Event editor.
     */
    public function addEventEditorIframeEmbedButtonFilter()
    {
        // add button for iframe code to event editor.
        add_filter(
            'get_sample_permalink_html',
            array( $this, 'appendIframeEmbedButtonToSamplePermalinkHtml' ),
            10,
            2
        );
        add_action(
            'admin_enqueue_scripts',
            array( $this, 'embedButtonAssets' ),
            10
        );
    }



    /**
     * @param $permalink_string
     * @param $id
     * @return string
     */
    public function appendIframeEmbedButtonToSamplePermalinkHtml( $permalink_string, $id )
    {
        return $this->eventEditorIframeEmbedButton(
            $permalink_string,
            $id
        );
    }



    /**
     * iframe embed code button to the Event editor.
     *
     * @param string $permalink_string
     * @param int    $id
     * @return string
     */
    public function eventEditorIframeEmbedButton(
        $permalink_string,
        $id
    ) {
        //make sure this is ONLY when editing and the event id has been set.
        if ( ! empty( $id ) ) {
            $post = get_post( $id );
            //if NOT event then let's get out.
            if ( $post->post_type !== 'espresso_events' ) {
                return $permalink_string;
            }
            $permalink_string .= $this->embedButtonHtml(
                array( $this->slug => $id ),
                'button-small'
            );
        }
        return $permalink_string;
    }



    /**
     * Adds an iframe embed code button via a WP do_action() as determined by the first parameter
     *
     * @param string $action name of the WP do_action() to hook into
     */
    public function addActionIframeEmbedButton( $action )
    {
        // add button for iframe code to event editor.
        add_action(
            $action,
            array( $this, 'addActionIframeEmbedButtonCallback' ),
            10, 2
        );
    }



    /**
     * @return void
     */
    public function addActionIframeEmbedButtonCallback()
    {
        echo $this->embedButtonHtml();
    }



    /**
     * Adds an iframe embed code button via a WP apply_filters() as determined by the first parameter
     *
     * @param string $filter     name of the WP apply_filters() to hook into
     * @param bool   $append     if true, will add iframe embed button to end of content,
     *                           else if false, will add to the beginning of the content
     */
    public function addFilterIframeEmbedButton( $filter, $append = true )
    {
        $this->append_filterable_content = $append;
        // add button for iframe code to event editor.
        add_filter(
            $filter,
            array( $this, 'addFilterIframeEmbedButtonCallback' ),
            10
        );
    }



    /**
     * @param array|string $filterable_content
     * @return array|string
     */
    public function addFilterIframeEmbedButtonCallback( $filterable_content )
    {
        $embedButtonHtml = $this->embedButtonHtml();
        if ( is_array( $filterable_content ) ) {
            $filterable_content = $this->append_filterable_content
                ? $filterable_content + array( $this->route_name => $embedButtonHtml )
                : array( $this->route_name => $embedButtonHtml ) + $filterable_content;
        } else {
            $filterable_content = $this->append_filterable_content
                ? $filterable_content . $embedButtonHtml
                : $embedButtonHtml . $filterable_content;
        }
        return $filterable_content;
    }



    /**
     * iframe_embed_html
     *
     * @param array  $query_args
     * @param string $button_class
     * @return string
     */
    public function embedButtonHtml( $query_args = array(), $button_class = '' )
    {
        // incoming args will replace the defaults listed here in the second array (union preserves first array)
        $query_args = (array)$query_args + array( $this->route_name => 'iframe' );
        $query_args = (array)apply_filters(
            'FHEE__EventEspresso_core_libraries_iframe_display_IframeEmbedButton__embedButtonHtml__query_args',
            $query_args
        );
        // add this route to our localized vars
        $iframe_module_routes = isset( \EE_Registry::$i18n_js_strings[ 'iframe_module_routes' ] )
            ? \EE_Registry::$i18n_js_strings[ 'iframe_module_routes' ]
            : array();
        $iframe_module_routes[ $this->route_name ] = $this->route_name;
        \EE_Registry::$i18n_js_strings[ 'iframe_module_routes' ] = $iframe_module_routes;
        $iframe_embed_html = \EEH_HTML::link(
            '#',
            sprintf( esc_html__( 'Embed %1$s', 'event_espresso' ), $this->iframe_name ),
            sprintf(
                esc_html__(
                    'click here to generate code for embedding %1$s iframe into another site.',
                    'event_espresso'
                ),
                \EEH_Inflector::add_indefinite_article( $this->iframe_name )
            ),
            "{$this->route_name}-iframe-embed-trigger-js",
            'iframe-embed-trigger-js button ' . $button_class,
            '',
            ' data-iframe_embed_button="#' . $this->route_name . '-iframe-js" tabindex="-1"'
        );
        $iframe_embed_html .= \EEH_HTML::div( '', "{$this->route_name}-iframe-js", 'iframe-embed-wrapper-js',
                                              'display:none;' );
        $iframe_embed_html .= esc_html(
            \EEH_HTML::div(
                '<iframe src="' . add_query_arg( $query_args, site_url() ) . '" width="100%" height="100%"></iframe>',
                '',
                '',
                'width:100%; height: 500px;'
            )
        );
        $iframe_embed_html .= \EEH_HTML::divx();
        return $iframe_embed_html;
    }



    /**
     * enqueue iframe button js
     */
    public function embedButtonAssets()
    {
        \EE_Registry::$i18n_js_strings[ 'iframe_embed_title' ] = esc_html__(
            'copy and paste the following into any other site\'s content to display this event:',
            'event_espresso'
        );
        \EE_Registry::$i18n_js_strings[ 'iframe_embed_close_msg' ] = esc_html__(
            'click anywhere outside of this window to close it.',
            'event_espresso'
        );
        wp_register_script(
            'iframe_embed_button',
            plugin_dir_url( __FILE__ ) . 'iframe-embed-button.js',
            array( 'ee-dialog' ),
            EVENT_ESPRESSO_VERSION,
            true
        );
        wp_enqueue_script( 'iframe_embed_button' );
    }



    /**
     * generates embed button sections for admin pages
     *
     * @param array $embed_buttons
     * @return string
     */
    public function addIframeEmbedButtonsSection( array $embed_buttons )
    {
        $embed_buttons = (array)apply_filters(
            'FHEE__EventEspresso_core_libraries_iframe_display_IframeEmbedButton__addIframeEmbedButtonsSection__embed_buttons',
            $embed_buttons
        );
        if ( empty($embed_buttons)) {
            return '';
        }
        // add button for iframe code to event editor.
        $html = \EEH_HTML::br( 2 );
        $html .= \EEH_HTML::h3( esc_html__( 'iFrame Embed Code', 'event_espresso' ) );
        $html .= \EEH_HTML::p(
            esc_html__(
                'Click the following button(s) to generate iframe HTML that will allow you to embed your event content within the content of other websites.',
                'event_espresso'
            )
        );
        $html .= ' &nbsp; ' . implode( ' &nbsp; ', $embed_buttons ) . ' ';
        $html .= \EEH_HTML::br( 2 );
        return $html;
    }


}
// End of file IframeEmbedButton.php
// Location: EventEspresso\core\libraries\iframe_display/IframeEmbedButton.php