<?php

use EventEspresso\core\services\request\sanitizers\AllowedTags;

/**
 * Abstract parent class for all form layouts. Mostly just contains a reference to the form
 * we are to lay out.
 * Form layouts should add HTML content for each form section (eg a header and footer)
 * for the form section, and dictate how to layout all the inputs and proper subsections
 * (laying out where to put the input's label, the actual input widget, and its errors;
 * and stating where the proper subsections should be placed,
 * but usually leaving them to lay out their own headers and footers etc.)
 */
abstract class EE_Form_Section_Layout_Base
{
    /**
     * Form section to lay out
     *
     * @var EE_Form_Section_Proper
     */
    protected $_form_section;



    /**
     *  __construct
     */
    public function __construct()
    {
    }



    /**
     * The form section on which this strategy is to perform
     *
     * @param EE_Form_Section_Proper $form
     */
    public function _construct_finalize(EE_Form_Section_Proper $form)
    {
        $this->_form_section = $form;
    }



    /**
     * @return EE_Form_Section_Proper
     */
    public function form_section()
    {
        return $this->_form_section;
    }



    /**
     * Also has teh side effect of enqueuing any needed JS and CSS for
     * this form.
     * Creates all the HTML necessary for displaying this form, its inputs, and
     * proper subsections.
     * Returns the HTML
     *
     * @return string HTML for displaying
     * @throws EE_Error
     */
    public function layout_form()
    {
        $html = '';
        // layout_form_begin
        $html .= apply_filters(
            'FHEE__EE_Form_Section_Layout_Base__layout_form__start__for_' . $this->_form_section->name(),
            $this->layout_form_begin(),
            $this->_form_section
        );
        // layout_form_loop
        $html .= apply_filters(
            'FHEE__EE_Form_Section_Layout_Base__layout_form__loop__for_' . $this->_form_section->name(),
            $this->layout_form_loop(),
            $this->_form_section
        );
        // layout_form_end
        $html .= apply_filters(
            'FHEE__EE_Form_Section_Layout_Base__layout_form__end__for_' . $this->_form_section->name(),
            $this->layout_form_end(),
            $this->_form_section
        );
        return $this->add_form_section_hooks_and_filters($html);
    }



    /**
     * @return string
     * @throws EE_Error
     */
    public function layout_form_loop()
    {
        $html = '';
        foreach ($this->_form_section->subsections() as $name => $subsection) {
            if ($subsection instanceof EE_Form_Input_Base) {
                $html .= apply_filters(
                    'FHEE__EE_Form_Section_Layout_Base__layout_form__loop_for_input_'
                    . $name . '__in_' . $this->_form_section->name(),
                    $this->layout_input($subsection),
                    $this->_form_section,
                    $subsection
                );
            } elseif ($subsection instanceof EE_Form_Section_Base) {
                $html .= apply_filters(
                    'FHEE__EE_Form_Section_Layout_Base__layout_form__loop_for_non_input_'
                    . $name . '__in_' . $this->_form_section->name(),
                    $this->layout_subsection($subsection),
                    $this->_form_section,
                    $subsection
                );
            }
        }
        return $html;
    }



    /**
     * Should be used to start teh form section (Eg a table tag, or a div tag, etc.)
     *
     * @return string
     */
    abstract public function layout_form_begin();



    /**
     * Should be used to end the form section (eg a /table tag, or a /div tag, etc.)
     *
     * @return string
     */
    abstract public function layout_form_end();



    /**
     * Should be used internally by layout_form() to lay out each input (eg, if this layout
     * is putting each input in a row of its own, this should probably be called by a
     *  foreach loop in layout_form() (WITHOUT adding any content directly within layout_form()'s foreach loop.
     * Eg, this method should add the tr and td tags). This method is exposed in case you want to completely
     * customize the form's layout, but would like to make use of it for laying out
     * 'easy-to-layout' inputs
     *
     * @param EE_Form_Input_Base $input
     * @return string html
     */
    abstract public function layout_input($input);



    /**
     * Similar to layout_input(), should be used internally by layout_form() within a
     * loop to lay out each proper subsection. Unlike layout_input(), however, it is assumed
     * that the proper subsection will lay out its container, label, etc on its own.
     *
     * @param EE_Form_Section_Base $subsection
     * @return string html
     */
    abstract public function layout_subsection($subsection);


    /**
     * Gets the HTML for the label tag and its contents for the input
     *
     * @param EE_Form_Input_Base $input
     * @return string
     * @throws EE_Error
     */
    public function display_label($input)
    {
        if ($input->get_display_strategy() instanceof EE_Hidden_Display_Strategy) {
            return '';
        }
        $class = $input->required()
            ? 'ee-required-label ' . $input->html_label_class()
            : $input->html_label_class();
        $label_text = $input->required()
            ? $input->html_label_text() . '<span class="ee-asterisk">*</span>'
            : $input->html_label_text();
        return '<label id="'
               . $input->html_label_id()
               . '" class="'
               . $class
               . '" style="'
               . $input->html_label_style()
               . '" for="' . $input->html_id()
               . '">'
               . $label_text
               . '</label>';
    }



    /**
     * Gets the HTML for all the form's form-wide errors (ie, errors which
     * are not for specific inputs. E.g., if two inputs somehow disagree,
     * those errors would probably be on the form section, not one of its inputs)
     * @return string
     */
    public function display_form_wide_errors()
    {
        $html = '';
        if ($this->_form_section->get_validation_errors()) {
            $html .= "<div class='ee-form-wide-errors'>";
            // get all the errors on THIS form section (errors which aren't
            // for specific inputs, but instead for the entire form section)
            foreach ($this->_form_section->get_validation_errors() as $error) {
                $html .= $error->getMessage() . '<br>';
            }
            $html .= '</div>';
        }
        return apply_filters(
            'FHEE__EE_Form_Section_Layout_Base__display_form_wide_errors',
            $html,
            $this
        );
    }


    /**
     * returns the HTML for the server-side validation errors for the specified input
     * Note that if JS is enabled, it should remove these and instead
     * populate the form's errors in the jquery validate fashion
     * using the localized data provided to the JS
     *
     * @param EE_Form_Input_Base $input
     * @return string
     * @throws EE_Error
     */
    public function display_errors($input)
    {
        if ($input->get_validation_errors()) {
            return "<label id='"
                   . esc_attr($input->html_id())
                   . "-error' class='error' for='" . esc_attr($input->html_name()) . "'>"
                   . wp_kses($input->get_validation_error_string(), AllowedTags::getAllowedTags())
                   . '</label>';
        }
        return '';
    }


    /**
     * Displays the help span for the specified input
     *
     * @param EE_Form_Input_Base $input
     * @return string
     * @throws EE_Error
     */
    public function display_help_text($input)
    {
        $help_text  = $input->html_help_text();
        if ($help_text !== '' && $help_text !== null) {
            $tag = is_admin() ? 'p' : 'span';
            return '<'
                   . $tag
                   . ' id="'
                   . $input->html_id()
                   . '-help" class="'
                   . $input->html_help_class()
                   . '" style="'
                   . $input->html_help_style()
                   . '">'
                   . $help_text
                   . '</'
                   . $tag
                   . '>';
        }
        return '';
    }


    /**
     * Does an action and hook onto the end of teh form
     *
     * @param string $html
     * @return string
     * @throws EE_Error
     */
    public function add_form_section_hooks_and_filters($html)
    {
        // replace dashes and spaces with underscores
        $hook_name = str_replace(array('-', ' '), '_', $this->_form_section->html_id());
        do_action('AHEE__Form_Section_Layout__' . $hook_name, $this->_form_section);
        $html = (string) apply_filters(
            'AFEE__Form_Section_Layout__' . $hook_name . '__html',
            $html,
            $this->_form_section
        );
        $html .= EEH_HTML::nl() . '<!-- AHEE__Form_Section_Layout__' . $hook_name . '__html -->';
        $html .= EEH_HTML::nl() . '<!-- AFEE__Form_Section_Layout__' . $hook_name . ' -->';
        return $html;
    }
}
