<?php

/**
 * EE_Table_Row_Layout
 *
 * IMPORTANT!!! Use in conjunction with EE_Table_Layout
 *
 * @package     Event Espresso
 * @subpackage  core/libraries/form_sections
 * @author      Brent Christensen
 * @since       5.0.30.p
 */
class EE_Table_Row_Layout extends EE_Form_Section_Layout_Base
{

    private bool $add_ids_and_classes;

    public function __construct(bool $add_ids_and_classes = true)
    {
        $this->add_ids_and_classes = $add_ids_and_classes;
        parent::__construct();
    }


    /**
     * @param array $additional_args
     * @return string
     */
    public function layout_form_begin($additional_args = [])
    {
        return $this->add_ids_and_classes
            ? EEH_HTML::tr(
                '',
                $additional_args['id'] ?? '',
                $additional_args['class'] ?? '',
                $additional_args['style'] ?? '',
                $additional_args['other'] ?? ''
            )
            : EEH_HTML::tr();
    }


    /**
     * @param array $additional_args
     * @return string
     */
    public function layout_form_end($additional_args = [])
    {
        return $this->add_ids_and_classes
            ? EEH_HTML::trx(
                $additional_args['id'] ?? '',
                $additional_args['class'] ?? ''
            )
            : EEH_HTML::trx();
    }


    /**
     * Lays out the input, including label and errors
     *
     * @param EE_Form_Input_Base $input
     * @return string
     * @throws EE_Error
     */
    public function layout_input($input)
    {
        if ($input instanceof EE_Hidden_Input) {
            return $input->get_html_for_input();
        }

        $html = $input->get_html_for_input();
        $html .= $input->get_html_for_errors() != ''
            ? EEH_HTML::nl() . $input->get_html_for_errors()
            : '';
        $html .= $input->get_html_for_help() != ''
            ? EEH_HTML::nl() . $input->get_html_for_help()
            : '';

        return $this->add_ids_and_classes
            ? EEH_HTML::td(
                $html,
                $input->html_id(),
                $input->html_class(),
                $input->html_style(),
                $input->other_html_attributes()
            )
            : EEH_HTML::td($html);
    }


    /**
     * Lays out a table cell for the subsection.
     *
     * @param EE_Form_Section_Proper $form_section
     * @return string
     * @throws EE_Error
     */
    public function layout_subsection($form_section)
    {
        return $this->add_ids_and_classes
            ? EEH_HTML::td(
                $form_section->get_html(),
                $form_section->html_id(),
                $form_section->html_class(),
                $form_section->html_style(),
                $form_section->other_html_attributes()
            )
            : EEH_HTML::td($form_section->get_html());
    }
}
