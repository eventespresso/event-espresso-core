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
     */
    public function prepare_for_pretty_echoing($value_on_field_to_be_outputted, $schema = null)
    {
        if ($schema == 'form_input') {
            return parent::prepare_for_pretty_echoing($value_on_field_to_be_outputted, $schema);
        } else {
            return apply_filters(
                'the_content',
                parent::prepare_for_pretty_echoing(
                    $value_on_field_to_be_outputted,
                    $schema
                )
            );
        }
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