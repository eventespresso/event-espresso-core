<?php
defined('EVENT_ESPRESSO_VERSION') || exit;

/**
 * Field to only allow tags that are normally allowed on post_content:
 * address,a,abbr,acronym,area,article,aside,b,big,blockquote,br,button,caption,cite,code,col,del,dd,dfn,details,div,dl,dt,em,fieldset,figure,figcaption,font,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,hr,i,img,ins,kbd,label,legend,li,map,mark,menu,nav,p,pre,q,s,samp,span,section,small,strike,strong,sub,summary,sup,table,tbody,td,textarea,tfoot,th,thead,title,tr,tt,u,ul,ol,var
 */
class EE_Post_Content_Field extends EE_Text_Field_Base
{

    /**
     * @param string $table_column
     * @param string $nicename
     * @param bool   $nullable
     * @param null   $default_value
     */
    public function __construct($table_column, $nicename, $nullable, $default_value = null)
    {
        parent::__construct($table_column, $nicename, $nullable, $default_value);
        $this->setSchemaType('object');
    }


    /**
     * removes all tags which a WP Post wouldn't allow in its content normally
     *
     * @param string $value
     * @return string
     */
    function prepare_for_set($value)
    {
        if (! current_user_can('unfiltered_html')) {
            $value = wp_kses("$value", wp_kses_allowed_html('post'));
        }
        return parent::prepare_for_set($value);
    }

    function prepare_for_set_from_db($value_found_in_db_for_model_object)
    {
        return $value_found_in_db_for_model_object;
    }



    /**
     * Runs the content through `the_content`, or if prepares the content for placing in a form input
     * @param string $value_on_field_to_be_outputted
     * @param string   $schema possible values: 'form_input' or null (if null, will run through 'the_content')
     * @return string
     * @throws EE_Error when WP_DEBUG is on and recursive calling is detected
     */
    public function prepare_for_pretty_echoing($value_on_field_to_be_outputted, $schema = null)
    {
        switch($schema){
            case 'form_input':
                return parent::prepare_for_pretty_echoing($value_on_field_to_be_outputted, $schema);
            case 'the_content':

                if(doing_filter( 'the_content')){
                    if( defined('WP_DEBUG') && WP_DEBUG){
                        throw new EE_Error(
                            sprintf(
                                esc_html__('You have recursively called "%1$s" with %2$s set to %3$s which uses "%2$s" filter. You should use it with %2$s "%3$s" instead here.', 'event_espresso'),
                                'EE_Post_Content_Field::prepare_for_pretty_echoing',
                                '$schema',
                                'the_content',
                                'the_content_wp_core_only'
                            )
                        );
                    } else {
                        return $this->prepare_for_pretty_echoing($value_on_field_to_be_outputted, 'the_content_wp_core_only');
                    }
                }
                return apply_filters(
                    'the_content',
                    parent::prepare_for_pretty_echoing(
                        $value_on_field_to_be_outputted,
                        $schema
                    )
                );
            case 'the_content_wp_core_only':
            default:
                self::_setup_the_content_wp_core_only_filters();
                $return_value = apply_filters(
                    'the_content_wp_core_only',
                    parent::prepare_for_pretty_echoing(
                        $value_on_field_to_be_outputted,
                        $schema
                    )
                );
                //ya know what? adding these filters is super fast. Let's just
                //avoid needing to maintain global state and set this up as-needed
                remove_all_filters('the_content_wp_core_only');
                do_action( 'AHEE__EE_Post_Content_Field__prepare_for_pretty_echoing__the_content_wp_core_only__done');
                return $return_value;
        }
    }



    /**
     * Verifies we've setup the standard WP core filters on  'the_content_wp_core_only' filter
     */
    protected static function _setup_the_content_wp_core_only_filters()
    {
        add_filter('the_content_wp_core_only', array( $GLOBALS['wp_embed'], 'run_shortcode'), 8);
        add_filter('the_content_wp_core_only', array( $GLOBALS['wp_embed'], 'autoembed'), 8);
        add_filter('the_content_wp_core_only', 'wptexturize', 10);
        add_filter('the_content_wp_core_only', 'wpautop', 10);
        add_filter('the_content_wp_core_only', 'shortcode_unautop', 10);
        add_filter('the_content_wp_core_only', 'prepend_attachment', 10);
        if(function_exists('wp_make_content_images_responsive')) {
            add_filter('the_content_wp_core_only', 'wp_make_content_images_responsive', 10);
        }
        add_filter('the_content_wp_core_only', 'do_shortcode', 11);
        add_filter('the_content_wp_core_only', 'convert_smilies', 20);
    }



    public function getSchemaProperties()
    {
        return array(
            'raw' => array(
                'description' =>  sprintf(
                    __('%s - the content as it exists in the database.', 'event_espresso'),
                    $this->get_nicename()
                ),
                'type' => 'string'
            ),
            'rendered' => array(
                'description' =>  sprintf(
                    __('%s - the content rendered for display.', 'event_espresso'),
                    $this->get_nicename()
                ),
                'type' => 'string'
            )
        );
    }
}