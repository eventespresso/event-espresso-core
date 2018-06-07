<?php

/**
 * Class EE_Full_HTML_Validation_Strategy
 *
 * Makes sure there are only 'simple' html tags in the normalized value. Eg, line breaks, lists, links. No js etc though
 *
 * @package             Event Espresso
 * @subpackage          core
 * @author              Mike Nelson
 * @since               4.6
 *
 */
class EE_Full_HTML_Validation_Strategy extends EE_Validation_Strategy_Base
{

    /**
     * @param null $validation_error_message
     */
    public function __construct($validation_error_message = null)
    {
        if (! $validation_error_message) {
            $validation_error_message = sprintf(
                __('Only the following HTML tags are allowed:%1$s%2$s', "event_espresso"),
                '<br />',
                $this->get_list_of_allowed_tags()
            );
        }
        parent::__construct($validation_error_message);
    }


    /**
     * get_list_of_allowed_tags
     *
     * generates and returns a string that lists the top-level HTML tags that are allowable for this input
     *
     * @return string
     */
    public function get_list_of_allowed_tags()
    {
        $tags_we_allow = $this->getAllowedTags();
        ksort($tags_we_allow);
        return implode(', ', array_keys($tags_we_allow));
    }


    /**
     * Returns an array whose keys are allowed tags and values are an array of allowed attributes
     *
     * @return array
     */
    protected function getAllowedTags()
    {
        global $allowedposttags;
        return array_merge_recursive(
            $allowedposttags,
            EEH_HTML::get_simple_tags()
        );
    }


    /**
     * @param $normalized_value
     * @throws \EE_Validation_Error
     */
    public function validate($normalized_value)
    {
        parent::validate($normalized_value);
        $normalized_value_sans_tags = wp_kses("$normalized_value", $this->getAllowedTags());
        if (strlen($normalized_value) > strlen($normalized_value_sans_tags)) {
            throw new EE_Validation_Error($this->get_validation_error_message(), 'complex_html_tags');
        }
    }
}
