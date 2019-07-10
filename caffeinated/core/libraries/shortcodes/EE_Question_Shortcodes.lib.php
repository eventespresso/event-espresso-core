<?php

/**
 * EE_Question_Shortcodes
 *
 * this is a child class for the EE_Shortcodes library.  The EE_Question_Shortcodes lists all shortcodes related to
 * Questions and Answers for an attendee.
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes
 * parent class.
 *
 * @package        Event Espresso
 * @subpackage     libraries/shortcodes/EE_Question_Shortcodes.lib.php
 * @author         Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Question_Shortcodes extends EE_Shortcodes
{


    /**
     * _init_props
     *
     * @access protected
     * @return void
     */
    protected function _init_props()
    {
        $this->label = esc_html__('Attendee Shortcodes', 'event_espresso');
        $this->description = esc_html__('All shortcodes specific to attendee related data', 'event_espresso');
        $this->_shortcodes = array(
            '[QUESTION]' => esc_html__('Will parse to a question.', 'event_espresso'),
            '[ANSWER]'   => esc_html__('Will parse to the answer for a question', 'event_espresso'),
        );
    }


    /**
     * This method will give parsing instructions for each shortcode defined in the _shortcodes array.  Child methods
     * will have to take care of handling.
     *
     * @access protected
     *
     * @param string $shortcode the shortcode to be parsed.
     *
     * @return string parsed shortcode
     */
    protected function _parser($shortcode)
    {

        if (! $this->_data instanceof EE_Answer || ! isset($this->_extra_data['data']) || ! $this->_extra_data['data'] instanceof EE_Messages_Addressee) {
            return '';
        }

        switch ($shortcode) {
            case '[QUESTION]':
                $question = isset($this->_extra_data['data']->questions[ $this->_data->ID() ])
                    ? $this->_extra_data['data']->questions[ $this->_data->ID() ] : $this->_data->question();
                if (! $question instanceof EE_Question) {
                    return ''; // get out because we can't figure out what the question is.
                }

                return $question->get('QST_display_text');
                break;

            case '[ANSWER]':
                // need to get the question to determine the type of question (some questions require translation of the answer).
                $question = isset($this->_extra_data['data']->questions[ $this->_data->ID() ])
                    ? $this->_extra_data['data']->questions[ $this->_data->ID() ] : $this->_data->question();
                if (! $question instanceof EE_Question) {
                    return ''; // get out cause we can't figure out what the question type is!
                }

                // what we show for the answer depends on the question type!
                switch ($question->get('QST_type')) {
                    case 'STATE':
                        $state = EEM_State::instance()->get_one_by_ID($this->_data->get('ANS_value'));
                        $answer = $state instanceof EE_State ? $state->name() : '';
                        break;

                    case 'COUNTRY':
                        $country = EEM_Country::instance()->get_one_by_ID($this->_data->get('ANS_value'));
                        $answer = $country instanceof EE_Country ? $country->name() : '';
                        break;

                    default:
                        $answer = $this->_data->get_pretty('ANS_value', 'no_wpautop');
                        break;
                }

                return apply_filters(
                    'FHEE__EE_Question_Shortcodes___parser__answer',
                    $answer,
                    $question,
                    $this->_data
                );
                break;
        }

        return '';
    }
}
