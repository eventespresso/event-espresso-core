<?php

class EE_Two_Column_Layout extends EE_Form_Section_Layout_Base
{
    /**
     * Should be used to start teh form section (Eg a table tag, or a div tag, etc.)
     *
     * @param array $additional_args
     * @return string
     */
    public function layout_form_begin($additional_args = array())
    {
        return $this->display_form_wide_errors()
        . EEH_HTML::table(
            '',
            $this->_form_section->html_id(),
            $this->_form_section->html_class(),
            $this->_form_section->html_style()
        ) . EEH_HTML::tbody();
    }



    /**
     * Should be used to end the form section (eg a /table tag, or a /div tag, etc)
     *
     * @param array $additional_args
     * @return string
     */
    public function layout_form_end($additional_args = array())
    {
        return EEH_HTML::tbodyx() . EEH_HTML::tablex($this->_form_section->html_id());
    }



    /**
     * Lays out the row for the input, including label and errors
     *
     * @param EE_Form_Input_Base $input
     * @return string
     */
    public function layout_input($input)
    {
        $html = '';
        if ($input instanceof EE_Hidden_Input) {
            $html .= $input->get_html_for_input();
        } else {
            $html_for_input = $input->get_html_for_input();
            $html_for_input .= $input->get_html_for_errors() != ''
                ? EEH_HTML::nl() . $input->get_html_for_errors()
                : '';
            $html_for_input .= $input->get_html_for_help() != '' ? EEH_HTML::nl() . $input->get_html_for_help() : '';
            $html .= EEH_HTML::tr(
                EEH_HTML::th($input->get_html_for_label()) .
                EEH_HTML::td($html_for_input)
            );
        }
        return $html;
    }



    /**
     * Lays out a row for the subsection. Please note that if you have a subsection which you don't want wrapped in
     * a tr and td with a colspan=2, you should use a different layout strategy, like EE_No_Layout, EE_Template_Layout,
     * or EE_Div_Per_Section_Layout, and create subsections using EE_Two_Column_Layout for everywhere you want the
     * two-column layout, and then other sub-sections can be outside the EE_Two_Column_Layout table.
     *
     * @param EE_Form_Section_Proper $form_section
     * @return string
    */
    public function layout_subsection($form_section)
    {
        if (
            $form_section instanceof EE_Form_Section_Proper
            || $form_section instanceof EE_Form_Section_HTML
        ) {
            return EEH_HTML::no_row($form_section->get_html());
        }
        return '';
    }
}
