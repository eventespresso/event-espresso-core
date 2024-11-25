<?php

/**
 * EE_Table_Layout
 *
 * IMPORTANT!!! Use in conjunction with EE_Table_Row_Layout
 *
 * @package     Event Espresso
 * @subpackage  core/libraries/form_sections
 * @author      Brent Christensen
 * @since       5.0.30.p
 */
class EE_Table_Layout extends EE_Form_Section_Layout_Base
{
    private int $column_count;

    private array $column_headers;


    /**
     * @param array $column_headers
     */
    public function __construct(array $column_headers)
    {
        $this->column_count   = count($column_headers);
        $this->column_headers = $column_headers;
        parent::__construct();
    }


    public function _construct_finalize(EE_Form_Section_Proper $form)
    {
        parent::_construct_finalize($form);
        $this->_form_section->set_html_class('ee-table-layout');
    }


    /**
     * Should be used to start the form section (Eg a table tag, or a div tag, etc.)
     *
     * @param array $additional_args
     * @return string
     * @throws EE_Error
     */
    public function layout_form_begin($additional_args = [])
    {
        $table = EEH_HTML::table(
            '',
            $this->_form_section->html_id(),
            $this->_form_section->html_class(),
            $this->_form_section->html_style()
        );
        $table .= EEH_HTML::thead();
        foreach ($this->column_headers as $column_header) {
            $table .= EEH_HTML::th(
                $column_header['content'] ?? '',
                $column_header['id'] ?? '',
                $column_header['class'] ?? '',
                $column_header['style'] ?? '',
                $column_header['other'] ?? ''
            );
        }
        $table .= EEH_HTML::theadx();
        $table .= EEH_HTML::tbody();
        return $this->display_form_wide_errors() . $table;
    }


    /**
     * Should be used to end the form section (eg a /table tag, or a /div tag, etc)
     *
     * @param array $additional_args
     * @return string
     * @throws EE_Error
     */
    public function layout_form_end($additional_args = [])
    {
        return EEH_HTML::tbodyx() . EEH_HTML::tablex($this->_form_section->html_id());
    }


    /**
     * Lays out the row for an input, including label and errors
     *
     * @param EE_Form_Input_Base $input
     * @return string
     * @throws EE_Error
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
            $html_for_input .= $input->get_html_for_help() != ''
                ? EEH_HTML::nl() . $input->get_html_for_help()
                : '';
            $html           .= EEH_HTML::tr(
                EEH_HTML::th($input->get_html_for_label()) .
                EEH_HTML::td($html_for_input, '', '', '', 'colspan="' . ($this->column_count - 1) . '"')
            );
        }
        return $html;
    }


    /**
     * Lays out a row for the subsection.
     * Please note that subsections should implement the EE_Table_Row_Layout layout strategy.
     *
     * @param EE_Form_Section_Proper $form_section
     * @return string
     * @throws EE_Error
     */
    public function layout_subsection($form_section)
    {
        return $form_section instanceof EE_Form_Section_Proper
            ? $form_section->get_html()
            : EEH_HTML::no_row($form_section->get_html(), $this->column_count);
    }
}
