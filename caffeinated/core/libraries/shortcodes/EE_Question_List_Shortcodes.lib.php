<?php

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('NO direct script access allowed');
}

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package            Event Espresso
 * @ author                Seth Shoultes
 * @ copyright        (c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license            http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link                http://www.eventespresso.com
 * @ version            4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Question_List_Shortcodes
 *
 * this is a child class for the EE_Shortcodes library.  The EE_Question_List_Shortcodes handles all shortcodes for
 * custom questions and answers.
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes
 * parent class.
 *
 * @package        Event Espresso
 * @subpackage     libraries/shortcodes/EE_Question_List_Shortcodes.lib.php
 * @author         Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Question_List_Shortcodes extends EE_Shortcodes
{
    
    
    public function __construct()
    {
        parent::__construct();
    }
    
    
    protected function _init_props()
    {
        $this->label       = __('Questions and Answers Shortcodes', 'event_espresso');
        $this->description = __('All shortcodes related to custom questions and answers', 'event_espresso');
        $this->_shortcodes = array(
            '[QUESTION_LIST]' => __('This is used to indicate where you want the list of questions and answers to show for the registrant.  You place this within the "[attendee_list]" field.',
                'event_espresso')
        );
    }
    
    
    protected function _parser($shortcode)
    {
        
        
        switch ($shortcode) {
            case '[QUESTION_LIST]' :
                return $this->_get_question_list();
                break;
        }
        
        return '';
    }
    
    
    protected function _get_question_list()
    {
        $this->_validate_list_requirements();
        
        //for when [QUESTION_LIST] is used in the [attendee_list] field.
        if ($this->_data['data'] instanceof EE_Registration) {
            return $this->_get_question_answer_list_for_attendee();
        } //for when [QUESTION_LIST] is used in the main content field.
        else if ($this->_data['data'] instanceof EE_Messages_Addressee && $this->_data['data']->reg_obj instanceof EE_Registration) {
            return $this->_get_question_answer_list_for_attendee($this->_data['data']->reg_obj);
        } else {
            return '';
        }
    }
    
    
    /**
     * Note when we parse the "[question_list]" shortcode for attendees we're actually going to retrieve the list of
     * answers for that attendee since that is what we really need (we can derive the questions from the answers);
     * @return string parsed template.
     */
    private function _get_question_answer_list_for_attendee($reg_obj = null)
    {
        $valid_shortcodes = array('question');
        $reg_obj          = $reg_obj instanceof EE_Registration ? $reg_obj : $this->_data['data'];
        $template         = is_array($this->_data['template']) && isset($this->_data['template']['question_list']) ? $this->_data['template']['question_list'] : '';
        $template         = empty($template) && isset($this->_extra_data['template']['question_list']) ? $this->_extra_data['template']['question_list'] : $template;
        $ans_result       = '';
        $answers          = ! empty($this->_extra_data['data']->registrations[$reg_obj->ID()]['ans_objs']) ? $this->_extra_data['data']->registrations[$reg_obj->ID()]['ans_objs'] : array();
        $questions        = ! empty($this->_extra_data['data']->questions) ? $this->_extra_data['data']->questions : array();
        foreach ($answers as $answer) {
            //first see if the question is in our $questions array.  If not then try to get from answer object
            $question = isset($questions[ $answer->ID() ]) ? $questions[ $answer->ID() ] : null;
            $question = ! $question instanceof EE_Question ? $answer->question() : $question;
            if ($question instanceof EE_Question and $question->admin_only()) {
                continue;
            }
            $ans_result .= $this->_shortcode_helper->parse_question_list_template($template, $answer, $valid_shortcodes,
                $this->_extra_data);
        }
        
        return $ans_result;
    }
    
    
} //end EE_Question_List_Shortcodes class
