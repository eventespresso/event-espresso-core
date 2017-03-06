<?php
defined('EVENT_ESPRESSO_VERSION') || exit('No direct access allowed.');

class EE_Shortcodes_Mock extends EE_Shortcodes
{

    /**
     * Child classes use this method to set the $name, $description, and $_shortcodes properties.
     *
     * @access protected
     * @return void
     */
    protected function _init_props()
    {
        $this->label = 'Shortcodes Mock Parser';
        $this->description = 'Shortcodes Mock Description';
        $this->_shortcodes = array(
            '[MOCK_A]' => 'MOCK A shortcode',
            '[MOCK_B]' => 'MOCK B shortcode'
        );
    }


    /**
     * This method will give parsing instructions for each shortcode defined in the _shortcodes array.  Child methods
     * will have to take care of handling.
     *
     * @access protected
     * @param string               $shortcode the shortcode to be parsed.
     * @param mixed (object|array) $data      incoming data for the parser.  The data could be either an object or
     *                                        array because there are some shortcodes that might be replaced by
     *                                        prepared data that has multiple items in a list (i.e. list of attendees
     *                                        in an event and we're showing fname/lname for each attendee).  In this
     *                                        case data will be in an array.  Otherwise the data shoudl be in a
     *                                        properly formatted object.  The EEH_Parse_Shortcodes.helper.php describes
     *                                        the data object we're expecting.
     * @return string parsed shortcode
     */
    protected function _parser($shortcode)
    {
        switch($shortcode) {
            case '[MOCK_A]':
                return 'parsed MOCK_A';
                break;
            case '[MOCK_B]':
                return 'parsed MOCK_B';
                break;
            default:
                return '';
        }
    }


    /**
     * Note this is overriding the parent parser class so don't use this mock to test
     * Any actual parser setup/verification.  It's only used to directly test the _parser method in here.
     *
     * @param string $shortcode
     * @param array  $data       Make sure you send in `template` and `data` as keys on this if you want them tested.
     * @param array  $extra_data Make sure you send in `messenger`, `message_type`, and `message` as keys on this if you
     *                           want them tested.
     * @return string
     */
    public function parser($shortcode, $data = array(), $extra_data = array())
    {
        $this->_data = $data; //make sure you send in template on this if you want to test template parsing
        $this->_extra_data = $extra_data;
        $this->_set_messages_properties();
        return $this->_parser($shortcode);
    }


    /**
     * Use to test parent protected method.
     * @param string     $shortcode
     * @param string     $closing_tag
     * @param bool $show
     * @return string
     */
    public function mutate_conditional_block_in_template($shortcode, $closing_tag, $show = true)
    {
        return parent::_mutate_conditional_block_in_template(
            $shortcode,
            $closing_tag,
            $show
        );
    }
}