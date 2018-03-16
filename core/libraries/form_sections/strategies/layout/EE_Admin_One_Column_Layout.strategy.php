<?php
defined('EVENT_ESPRESSO_VERSION') || exit;

class EE_Admin_One_Column_Layout extends EE_Form_Section_Layout_Base
{

    /**
     * Starts the form section
     *
     * @param array $additional_args
     * @return string
     */
    public function layout_form_begin($additional_args = array())
    {
        return EEH_HTML::table(
            '',
            $this->_form_section->html_id(),
            $this->_form_section->html_class() . ' form-table',
            $this->_form_section->html_style()
        ) . EEH_HTML::tbody();
    }


    /**
     * Ends the form section
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
     * @throws EE_Error
     */
    public function layout_input($input)
    {
        if ($input->get_display_strategy() instanceof EE_Text_Area_Display_Strategy
            || $input->get_display_strategy() instanceof EE_Text_Input_Display_Strategy
            || $input->get_display_strategy() instanceof EE_Admin_File_Uploader_Display_Strategy
        ) {
            $input->set_html_class($input->html_class() . ' large-text');
        }
        $input_html = $input->get_html_for_input();
        // maybe add errors and help text ?
        $input_html .= $input->get_html_for_errors() !== ''
            ? EEH_HTML::nl() . $input->get_html_for_errors()
            : '';
        $input_html .= $input->get_html_for_help() !== ''
            ? EEH_HTML::nl() . $input->get_html_for_help()
            : '';
        //overriding parent to add wp admin specific things.
        $html = '';
        if ($input instanceof EE_Hidden_Input) {
            $html .= EEH_HTML::no_row($input->get_html_for_input());
        } else {
            $html .= EEH_HTML::tr(
                EEH_HTML::td(
                    $input->get_html_for_label()
                    . EEH_HTML::nl()
                    . $input_html
                )
            );
        }
        return $html;
    }


    /**
     * Lays out a row for the subsection
     *
     * @param EE_Form_Section_Proper $form_section
     * @return string
     */
    public function layout_subsection($form_section)
    {
        if ($form_section instanceof EE_Form_Section_Proper
            || $form_section instanceof EE_Form_Section_HTML
        ) {
            return EEH_HTML::no_row($form_section->get_html());
        }
        return '';
    }
}
