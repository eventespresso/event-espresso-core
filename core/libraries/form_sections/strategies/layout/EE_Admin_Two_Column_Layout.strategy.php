<?php

/**
 * Like the standard two-column form section layout, but this one adds css classes
 * specific to the WP Admin
 */
class EE_Admin_Two_Column_Layout extends EE_Two_Column_Layout
{
    /**
     * @param EE_Form_Section_Proper $form
     */
    public function _construct_finalize(EE_Form_Section_Proper $form)
    {
        parent::_construct_finalize($form);
        $this->_form_section->set_html_class('ee-admin-two-column-layout form-table');
    }


    /**
     * Overriding the parent table layout to include <tbody> tags
     *
     * @param array $additional_args
     * @return string
     * @throws EE_Error
     */
    public function layout_form_begin($additional_args = array())
    {
        return parent::layout_form_begin($additional_args);
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
        if (
            $input->get_display_strategy() instanceof EE_Select_Display_Strategy
            || $input->get_display_strategy() instanceof EE_Text_Area_Display_Strategy
            || $input->get_display_strategy() instanceof EE_Text_Input_Display_Strategy
            || $input->get_display_strategy() instanceof EE_Admin_File_Uploader_Display_Strategy
        ) {
            $html_class = $input->html_class();
            $html_class = strpos($html_class, 'ee-input-width') === false
                ? "$html_class ee-input-width--big"
                : $html_class;
            $input->set_html_class($html_class);
        }
        if ($input instanceof EE_Text_Area_Input) {
            $input->set_rows(4);
            $input->set_cols(60);
        }
        $input_html = $input->get_html_for_input();
        // maybe add errors and help text ?
        $input_html .= $input->get_html_for_errors() !== ''
            ? EEH_HTML::nl() . $input->get_html_for_errors()
            : '';
        $input_html .= $input->get_html_for_help() !== ''
            ? EEH_HTML::nl() . $input->get_html_for_help()
            : '';
        $input_html .= $input->extraContainerHtml() !== ''
            ? EEH_HTML::nl() . $input->extraContainerHtml()
            : '';
        // overriding parent to add wp admin specific things.
        $html = '';
        if ($input instanceof EE_Hidden_Input) {
            $html .= EEH_HTML::no_row($input->get_html_for_input());
            // $html .= $input->get_html_for_input();
        } else {
            $html .= EEH_HTML::tr(
                EEH_HTML::th(
                    $input->get_html_for_label(),
                    '',
                    '',
                    '',
                    'scope="row"'
                )
                . EEH_HTML::td($input_html),
                sanitize_key($input->html_id()) . '-tr',
                $input->layoutContainerClass()
            );
        }
        return $html;
    }
}
