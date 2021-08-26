<?php

use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\RequestInterface;

/**
 * EEH_Form_Fields
 *
 * This is a helper utility class for taking in an array of form field arguments and spitting out the relevant html
 * formatted form fields.
 *
 * usage of this helper is discouraged since 4.8.30.rc.009, instead
 * consider using the form system classes in core/libraries/form_sections. See
 * http://developer.eventespresso.com/docs/ee4-forms-system/.
 * The reason this is discouraged is because the forms system partially duplicates the
 * same behaviour (displaying HTML inputs), but also simplifies form validation
 * server-side and client-side and normalization (putting form data into the expected
 * datatypes in PHP). Also there have been a few bugs noticed (see
 * https://events.codebasehq.com/projects/event-espresso/tickets/9165) and maintaining this class AND the forms system
 * is extra work. Once we have removed all usage of this from EE core, it's expected that we will start issuing
 * deprecation notices
 *
 * @since       3.2.P
 * @package     Event Espresso
 * @subpackage  /helper/EEH_Form_Fields.helper.php
 * @author      Darren Ethier, Brent Christensen
 */
class EEH_Form_Fields
{


    /**
     *  Generates HTML for the forms used on admin pages
     *
     *
     * @static
     * @access public
     * @param array $input_vars - array of input field details
     *                          format:
     *                          $template_form_fields['field-id'] = array(
     *                          'name' => 'name_attribute',
     *                          'label' => esc_html__('Field Label', 'event_espresso'), //or false
     *                          'input' => 'hidden', //field input type can be 'text', 'select', 'textarea', 'hidden',
     *                          'checkbox', 'wp_editor'
     *                          'type' => 'int', //what "type" the value is (i.e. string, int etc)
     *                          'required' => false, //boolean for whether the field is required
     *                          'validation' => true, //boolean, whether to validate the field (todo)
     *                          'value' => 'some_value_for_field', //what value is used for field
     *                          'format' => '%d', //what format the value is (%d, %f, or %s)
     *                          'db-col' => 'column_in_db' //used to indicate which column the field corresponds with
     *                          in the db
     *                          'options' => optiona, optionb || array('value' => 'label', '') //if the input type is
     *                          "select", this allows you to set the args for the different <option> tags.
     *                          'tabindex' => 1 //this allows you to set the tabindex for the field.
     *                          'append_content' => '' //this allows you to send in html content to append to the
     *                          field.
     *                          )
     * @param array $id         - used for defining unique identifiers for the form.
     * @return string
     * @todo   : at some point we can break this down into other static methods to abstract it a bit better.
     */
    public static function get_form_fields($input_vars = [], $id = false)
    {

        if (empty($input_vars)) {
            EE_Error::add_error(
                esc_html__('missing required variables for the form field generator', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }

        $output        = "";
        $inputs        = [];
        $hidden_inputs = [];

        // cycle thru inputs
        foreach ($input_vars as $input_key => $input_value) {
            $defaults = [
                'append_content' => '',
                'css_class'      => '',
                'cols'           => 80,
                'db-col'         => 'column_in_db',
                'format'         => '%d',
                'input'          => 'hidden',
                'label'          => esc_html__('No label', 'event_espresso'),
                'name'           => $input_key,
                'options'        => [],
                'required'       => false,
                'tabindex'       => 0,
                'rows'           => 10,
                'type'           => 'int',
                'validation'     => true,
                'value'          => 'some_value_for_field',
            ];

            $input_value = wp_parse_args($input_value, $defaults);

            $append_content = $input_value['append_content'];
            $css_class      = $input_value['css_class'];
            $cols           = $input_value['cols'];
            $label          = $input_value['label'];
            $name           = $input_value['name'];
            $options        = $input_value['options'];
            $required       = $input_value['required'];
            $tab_index      = $input_value['tabindex'];
            $rows           = $input_value['rows'];
            $type           = $input_value['input'];
            $value          = $input_value['value'];

            $id    = $id ? $id . '-' . $input_key : $input_key;
            $class = $required ? 'required ' . $css_class : $css_class;

            // what type of input are we dealing with ?
            switch ($type) {

                case 'checkbox':
                case 'radio':
                    $field = self::adminMulti($value, $class, $id, $name, $required, $tab_index, $type, 1, $label);
                    $field .= $append_content ?: '';
                    break;

                case 'hidden':
                    $field           = null;
                    $hidden_inputs[] = self::adminHidden($css_class, $id, $name, $value);
                    break;

                case 'select':
                    $options = is_array($options) ? $options : explode(',', $options);
                    $field   = self::adminLabel($id, $label, $required);
                    $field   .= self::adminSelect($value, $class, $id, $name, $required, $tab_index, $options);
                    $field   .= $append_content ?: '';
                    break;

                case 'textarea':
                    $field = self::adminLabel($id, $label, $required);
                    $field .= self::adminTextarea($class, $cols, $id, $name, $required, $rows, $tab_index, $value);
                    $field .= $append_content ?: '';
                    break;

                case 'wp_editor':
                    $label = esc_html($label);
                    $field = "<h4>{$label}</h4>";
                    $field .= $append_content ?: '';
                    $field .= self::adminWpEditor(
                        $class,
                        $id,
                        $name,
                        $rows,
                        $tab_index,
                        $value
                    );
                    break;

                default:
                    $field = self::adminLabel($id, $label, $required);
                    $field .= self::adminText($class, $id, $name, $required, $tab_index, $value);
                    $field .= $append_content ?: '';
            }
            if ($field) {
                $inputs[] = $field;
            }

        } // end foreach( $input_vars as $input_key => $input_value )

        if (! empty($inputs)) {
            $glue   = "
                </li>
                <li>
                    ";
            $inputs = implode($glue, $inputs);
            $output = "
            <ul>
                <li>
                {$inputs} 
                </li>
            </ul>
            ";
        }
        return $output . implode("\n", $hidden_inputs);
    }


    /**
     * form_fields_array
     * This utility function assembles form fields from a given structured array with field information.
     * //TODO: This is an alternate generator that we may want to use instead.
     *
     * @param array $fields structured array of fields to assemble in the following format:
     *                      [field_name] => array(
     *                      ['label'] => 'label for field',
     *                      ['labels'] => array('label_1', 'label_2'); //optional - if the field type is a multi select
     *                      type of field you can indicated the labels for each option via this index
     *                      ['extra_desc'] => 'extra description for the field', //optional
     *                      ['type'] => 'textarea'|'text'|'wp_editor'|'checkbox'|'radio'|'hidden'|'select', //defaults
     *                      to text
     *                      ['value'] => 'value that goes in the field', //(if multi then this is an array of values
     *                      and the 'default' paramater will be used for what is selected)
     *                      ['default'] => 'default if the field type is multi (i.e. select or radios or checkboxes)',
     *                      ['class'] => 'name-of-class(es)-for-input',
     *                      ['classes'] => array('class_1', 'class_2'); //optional - if the field type is a multi
     *                      select type of field you can indicate the css class for each option via this index.
     *                      ['id'] => 'css-id-for-input') //defaults to 'field_name'
     *                      ['unique_id'] => 1 //defaults to empty string.  This is useful for when the fields
     *                      generated are going to be used in a loop and you want to make sure that the field
     *                      identifiers are unique from each other.
     *                      ['dimensions'] => array(100,300), //defaults to empty array.  This is used by field types
     *                      such as textarea to indicate cols/rows.
     *                      ['tabindex'] => '' //this allows you to set the tabindex for the field.
     *                      ['wpeditor_args'] => array() //if the type of field is wpeditor then this can optionally
     *                      contain an array of arguments for the editor setup.
     *
     * @return array         an array of inputs for form indexed by field name, and in the following structure:
     *     [field_name] => array( 'label' => '{label_html}', 'field' => '{input_html}'
     */
    public static function get_form_fields_array($fields)
    {

        $form_fields = [];
        $fields      = (array) $fields;

        foreach ($fields as $field_name => $field_atts) {
            // defaults:
            $defaults = [
                'class'         => '',
                'classes'       => '',
                'default'       => '',
                'dimensions'    => ['10', '5'],
                'extra_desc'    => '',
                'id'            => $field_name,
                'label'         => '',
                'labels'        => '',
                'required'      => false,
                'tabindex'      => 0,
                'type'          => 'text',
                'unique_id'     => '',
                'value'         => '',
                'wpeditor_args' => [],
            ];
            // merge defaults with passed arguments
            $_fields = wp_parse_args($field_atts, $defaults);

            $class          = $_fields['class'];
            $classes        = $_fields['classes'];
            $default        = $_fields['default'];
            $dims           = $_fields['dimensions'];
            $extra_desc     = $_fields['extra_desc'];
            $id             = $_fields['id'];
            $label          = $_fields['label'];
            $labels         = $_fields['labels'];
            $required       = $_fields['required'];
            $tab_index      = $_fields['tabindex'];
            $type           = $_fields['type'];
            $unique_id      = $_fields['unique_id'];
            $value          = $_fields['value'];
            $wp_editor_args = $_fields['wpeditor_args'];

            // generate label
            $label = ! empty($label) ? self::adminLabel($id, $label, $required) : '';
            // generate field name
            $name = ! empty($unique_id) ? $field_name . '[' . $unique_id . ']' : $field_name;

            // we determine what we're building based on the type
            switch ($type) {

                case 'checkbox':
                case 'radio':
                    if (is_array($value)) {
                        $c_input = '';
                        foreach ($value as $key => $val) {
                            $c_input .= self::adminMulti(
                                $default,
                                isset($classes[ $key ]) ? $classes[ $key ] : '',
                                $field_name . '_' . $value,
                                $name,
                                $required,
                                $tab_index,
                                $type,
                                $val,
                                isset($labels[ $key ]) ? $labels[ $key ] : ''
                            );
                        }
                        $field = $c_input;
                    } else {
                        $field = self::adminMulti(
                            $default,
                            $class,
                            $id,
                            $name,
                            $required,
                            $tab_index,
                            $type,
                            $value,
                            $_fields['label']
                        );
                    }
                    break;

                case 'hidden':
                    $field = self::adminHidden($class, $id, $name, $value);
                    break;

                case 'select':
                    $options = [];
                    foreach ($value as $key => $val) {
                        $options[ $val ] = isset($labels[ $key ]) ? $labels[ $key ] : '';
                    }
                    $field = self::adminSelect($default, $class, $id, $name, $required, $tab_index, $options);
                    break;

                case 'textarea':
                    $field =
                        self::adminTextarea($class, $dims[0], $id, $name, $required, $dims[1], $tab_index, $value);
                    break;

                case 'wp_editor':
                    $field = self::adminWpEditor(
                        $class,
                        $_fields['id'],
                        $name,
                        $dims[1],
                        $tab_index,
                        $value,
                        $wp_editor_args
                    );
                    break;

                default:
                    $field = self::adminText($class, $id, $name, $required, $tab_index, $value);
            }

            $form_fields[ $field_name ] = ['label' => $label, 'field' => $field . $extra_desc];
        }

        return $form_fields;
    }


    /**
     * @param string $class
     * @param string $id
     * @param string $name
     * @param string $value
     * @return string
     * @since   $VID:$
     */
    private static function adminHidden($class, $id, $name, $value)
    {
        $id    = esc_attr($id);
        $name  = esc_attr($name);
        $class = esc_attr($class);
        return "
        <input name='{$name}' type='hidden' id='{$id}' class='{$class}' value='{$value}' />";
    }


    /**
     * @param string $id
     * @param string $label
     * @param string $required
     * @return string
     * @since   $VID:$
     */
    private static function adminLabel($id, $label, $required)
    {
        $id       = esc_attr($id);
        $label    = esc_html($label);
        $required = filter_var($required, FILTER_VALIDATE_BOOLEAN) ? " <span>*</span>" : '';
        return "<label for='{$id}'>{$label}{$required}</label>";
    }


    /**
     * @param string $default
     * @param string $class
     * @param string $id
     * @param string $name
     * @param string $required
     * @param int    $tab_index
     * @param string $type
     * @param string $value
     * @param string $label
     * @return string
     * @since   $VID:$
     */
    private static function adminMulti($default, $class, $id, $name, $required, $tab_index, $type, $value, $label = '')
    {
        $id        = esc_attr($id);
        $name      = esc_attr($name);
        $class     = esc_attr($class);
        $tab_index = absint($tab_index);
        $checked   = ! empty($default) && $default == $value ? 'checked="checked" ' : '';
        $required  = filter_var($required, FILTER_VALIDATE_BOOLEAN) ? 'required' : '';
        $input     = "
        <input name='{$name}[]' type='{$type}' id='{$id}' class='{$class}' value='{$value}' {$checked} {$required} tabindex='{$tab_index}'/>";
        if ($label === '') {
            return $input;
        }
        $label = esc_html($label);
        return "
        <label for='$id'>
            {$input}
            {$label}
        </label>";
    }


    /**
     * @param string $default
     * @param string $class
     * @param string $id
     * @param string $name
     * @param string $required
     * @param int    $tab_index
     * @param array  $options
     * @return string
     * @since   $VID:$
     */
    private static function adminSelect($default, $class, $id, $name, $required, $tab_index, $options = [])
    {
        $options_array = [];
        foreach ($options as $value => $label) {
            $selected        = ! empty($default) && $default == $value ? 'selected="selected"' : '';
            $value           = esc_attr($value);
            $label           = wp_strip_all_tags($label);
            $options_array[] = "<option value='{$value}' {$selected}>{$label}</option>";
        }
        $options_html = implode($options_array, "\n");
        $id           = esc_attr($id);
        $name         = esc_attr($name);
        $class        = esc_attr($class);
        $tab_index    = absint($tab_index);
        $required     = filter_var($required, FILTER_VALIDATE_BOOLEAN) ? 'required' : '';
        return "
        <select name='{$name}' id='{$id}' class='{$class}' {$required} tabindex='{$tab_index}'>
            {$options_html}
        </select>";
    }


    /**
     * @param string $class
     * @param string $id
     * @param string $name
     * @param string $required
     * @param int    $tab_index
     * @param string $value
     * @return string
     * @since   $VID:$
     */
    private static function adminText($class, $id, $name, $required, $tab_index, $value)
    {
        $id        = esc_attr($id);
        $name      = esc_attr($name);
        $class     = esc_attr($class);
        $tab_index = absint($tab_index);
        $required  = filter_var($required, FILTER_VALIDATE_BOOLEAN) ? 'required' : '';
        return "
        <input name='{$name}' type='text' id='{$id}' class='{$class}' value='{$value}' {$required} tabindex='{$tab_index}'/>";
    }


    /**
     * @param string $class
     * @param int    $cols
     * @param string $id
     * @param string $name
     * @param string $required
     * @param int    $rows
     * @param int    $tab_index
     * @param string $value
     * @return string
     * @since   $VID:$
     */
    private static function adminTextarea($class, $cols, $id, $name, $required, $rows, $tab_index, $value)
    {
        $id        = esc_attr($id);
        $name      = esc_attr($name);
        $class     = esc_attr($class);
        $cols      = absint($cols);
        $rows      = absint($rows);
        $value     = esc_textarea($value);
        $tab_index = absint($tab_index);
        $required  = filter_var($required, FILTER_VALIDATE_BOOLEAN) ? 'required' : '';
        return "
        <textarea name='{$name}' id='{$id}' class='{$class}' rows='{$rows}' cols='{$cols}' {$required} tabindex='{$tab_index}'>
            {$value}
        </textarea>";
    }


    /**
     * @param string $class
     * @param string $id
     * @param string $name
     * @param int    $rows
     * @param int    $tab_index
     * @param string $value
     * @param array  $wp_editor_args
     * @return false|string
     * @since   $VID:$
     */
    private static function adminWpEditor($class, $id, $name, $rows, $tab_index, $value, $wp_editor_args = [])
    {
        $editor_settings = $wp_editor_args + [
                'textarea_name' => esc_attr($name),
                'textarea_rows' => absint($rows),
                'editor_class'  => esc_attr($class),
                'tabindex'      => absint($tab_index),
            ];
        ob_start();
        wp_editor($value, esc_attr($id), $editor_settings);
        return ob_get_clean();
    }


    /**
     * espresso admin page select_input
     * Turns an array into a select fields
     *
     * @static
     * @access public
     * @param string  $name       field name
     * @param array   $values     option values, numbered array starting at 0, where each value is an array with a key
     *                            'text' (meaning text to display' and 'id' (meaning the internal value) eg:
     *                            array(1=>array('text'=>'Monday','id'=>1),2=>array('text'=>'Tuesday','id'=>2)...). or
     *                            as an array of key-value pairs, where the key is to be used for the select input's
     *                            name, and the value will be the text shown to the user.  Optionally you can also
     *                            include an additional key of "class" which will add a specific class to the option
     *                            for that value.
     * @param string  $default    default value
     * @param string  $parameters extra parameters
     * @param string  $class      css class
     * @param boolean $autosize   whether to autosize the select or not
     * @return string              html string for the select input
     */
    public static function select_input($name, $values, $default = '', $parameters = '', $class = '', $autosize = true)
    {
        // if $values was submitted in the wrong format, convert it over
        if (! empty($values) && (! array_key_exists(0, $values) || ! is_array($values[0]))) {
            $converted_values = [];
            foreach ($values as $id => $text) {
                $converted_values[] = ['id' => $id, 'text' => $text];
            }
            $values = $converted_values;
        }

        $field =
            '<select id="' . EEH_Formatter::ee_tep_output_string($name)
            . '" name="' . EEH_Formatter::ee_tep_output_string($name)
            . '"';

        if (EEH_Formatter::ee_tep_not_null($parameters)) {
            $field .= ' ' . $parameters;
        }
        if ($autosize) {
            $size = 'med';
            for ($ii = 0, $ni = sizeof($values); $ii < $ni; $ii++) {
                if ($values[ $ii ]['text']) {
                    if (strlen($values[ $ii ]['text']) > 5) {
                        $size = 'wide';
                    }
                }
            }
        } else {
            $size = '';
        }

        $field .= ' class="' . $class . ' ' . $size . '">';

        if (empty($default) && isset($GLOBALS[ $name ])) {
            $default = stripslashes($GLOBALS[ $name ]);
        }


        for ($i = 0, $n = sizeof($values); $i < $n; $i++) {
            $field .= '<option value="' . $values[ $i ]['id'] . '"';
            if ($default == $values[ $i ]['id']) {
                $field .= ' selected = "selected"';
            }
            if (isset($values[ $i ]['class'])) {
                $field .= ' class="' . $values[ $i ]['class'] . '"';
            }
            $field .= '>' . $values[ $i ]['text'] . '</option>';
        }
        $field .= '</select>';

        return $field;
    }


    /**
     * generate_question_groups_html
     *
     * @param array  $question_groups
     * @param string $group_wrapper
     * @return string HTML
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function generate_question_groups_html($question_groups = [], $group_wrapper = 'fieldset')
    {

        $html                            = '';
        $before_question_group_questions =
            apply_filters('FHEE__EEH_Form_Fields__generate_question_groups_html__before_question_group_questions', '');
        $after_question_group_questions  =
            apply_filters('FHEE__EEH_Form_Fields__generate_question_groups_html__after_question_group_questions', '');

        if (! empty($question_groups)) {
            // loop thru question groups
            foreach ($question_groups as $QSG) {
                // check that questions exist
                if (! empty($QSG['QSG_questions'])) {
                    // use fieldsets
                    $html .= "\n\t"
                             . '<'
                             . $group_wrapper
                             . ' class="espresso-question-group-wrap" id="'
                             . $QSG['QSG_identifier']
                             . '">';
                    // group_name
                    $html .= $QSG['QSG_show_group_name']
                        ? "\n\t\t"
                          . '<h5 class="espresso-question-group-title-h5 section-title">'
                          . self::prep_answer($QSG['QSG_name'])
                          . '</h5>'
                        : '';
                    // group_desc
                    $html .= $QSG['QSG_show_group_desc'] && ! empty($QSG['QSG_desc'])
                        ? '<div class="espresso-question-group-desc-pg">'
                          . self::prep_answer($QSG['QSG_desc'])
                          . '</div>'
                        : '';

                    $html .= $before_question_group_questions;
                    // loop thru questions
                    foreach ($QSG['QSG_questions'] as $question) {
                        $QFI  = new EE_Question_Form_Input(
                            $question['qst_obj'],
                            $question['ans_obj'],
                            $question
                        );
                        $html .= self::generate_form_input($QFI);
                    }
                    $html .= $after_question_group_questions;
                    $html .= "\n\t" . '</' . $group_wrapper . '>';
                }
            }
        }

        return $html;
    }


    /**
     * generate_question_groups_html
     *
     * @param array  $question_groups
     * @param array  $q_meta
     * @param bool   $from_admin
     * @param string $group_wrapper
     * @return string HTML
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function generate_question_groups_html2(
        $question_groups = [],
        $q_meta = [],
        $from_admin = false,
        $group_wrapper = 'fieldset'
    ) {

        $html                            = '';
        $before_question_group_questions =
            apply_filters('FHEE__EEH_Form_Fields__generate_question_groups_html__before_question_group_questions', '');
        $after_question_group_questions  =
            apply_filters('FHEE__EEH_Form_Fields__generate_question_groups_html__after_question_group_questions', '');

        $default_q_meta = [
            'att_nmbr'    => 1,
            'ticket_id'   => '',
            'input_name'  => '',
            'input_id'    => '',
            'input_class' => '',
        ];
        $q_meta         = array_merge($default_q_meta, $q_meta);

        if (! empty($question_groups)) {
            // loop thru question groups
            foreach ($question_groups as $QSG) {
                if ($QSG instanceof EE_Question_Group) {
                    // check that questions exist

                    $where = ['QST_deleted' => 0];
                    if (! $from_admin) {
                        $where['QST_admin_only'] = 0;
                    }
                    $questions =
                        $QSG->questions([$where, 'order_by' => ['Question_Group_Question.QGQ_order' => 'ASC']]);
                    if (! empty($questions)) {
                        // use fieldsets
                        $html .= "\n\t"
                                 . '<' . $group_wrapper . ' class="espresso-question-group-wrap" '
                                 . 'id="' . $QSG->get('QSG_identifier') . '">';
                        // group_name
                        if ($QSG->show_group_name()) {
                            $html .= "\n\t\t"
                                     . '<h5 class="espresso-question-group-title-h5 section-title">'
                                     . $QSG->get_pretty('QSG_name')
                                     . '</h5>';
                        }
                        // group_desc
                        if ($QSG->show_group_desc()) {
                            $html .= '<div class="espresso-question-group-desc-pg">'
                                     . $QSG->get_pretty('QSG_desc')
                                     . '</div>';
                        }

                        $html .= $before_question_group_questions;
                        // loop thru questions
                        foreach ($questions as $QST) {
                            $qstn_id = $QST->is_system_question() ? $QST->system_ID() : $QST->ID();

                            $answer = null;

                            /** @var RequestInterface $request */
                            $request      = LoaderFactory::getLoader()->getShared(RequestInterface::class);
                            $request_qstn = $request->getRequestParam('qstn', [], 'arrayOf|string');
                            if (! empty($request_qstn) && isset($q_meta['input_id']) && isset($q_meta['att_nmbr'])) {
                                // check for answer in $request_qstn in case we are reprocessing a form after an error
                                if (isset($request_qstn[ $q_meta['input_id'] ][ $qstn_id ])) {
                                    $answer = is_array($request_qstn[ $q_meta['input_id'] ][ $qstn_id ])
                                        ? $request_qstn[ $q_meta['input_id'] ][ $qstn_id ]
                                        : sanitize_text_field($request_qstn[ $q_meta['input_id'] ][ $qstn_id ]);
                                }
                            } elseif (isset($q_meta['attendee']) && $q_meta['attendee']) {
                                // attendee data from the session
                                $answer =
                                    isset($q_meta['attendee'][ $qstn_id ]) ? $q_meta['attendee'][ $qstn_id ] : null;
                            }


                            $QFI  = new EE_Question_Form_Input(
                                $QST,
                                EE_Answer::new_instance(
                                    [
                                        'ANS_ID'    => 0,
                                        'QST_ID'    => 0,
                                        'REG_ID'    => 0,
                                        'ANS_value' => $answer,
                                    ]
                                ),
                                $q_meta
                            );
                            $html .= self::generate_form_input($QFI);
                        }
                        $html .= $after_question_group_questions;
                        $html .= "\n\t" . '</' . $group_wrapper . '>';
                    }
                }
            }
        }
        return $html;
    }


    /**
     * generate_form_input
     *
     * @param EE_Question_Form_Input $QFI
     * @return string HTML
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function generate_form_input(EE_Question_Form_Input $QFI)
    {
        if (isset($QFI->QST_admin_only) && $QFI->QST_admin_only && ! is_admin()) {
            return '';
        }
        /** @var RequestInterface $request */
        $request = LoaderFactory::getLoader()->getShared(RequestInterface::class);

        $QFI = self::_load_system_dropdowns($QFI);
        $QFI = self::_load_specialized_dropdowns($QFI);

        // we also need to verify

        $display_text = $QFI->get('QST_display_text');
        $input_name   = $QFI->get('QST_input_name');
        $answer       = $request->getRequestParam($input_name, $QFI->get('ANS_value'));
        $input_id     = $QFI->get('QST_input_id');
        $input_class  = $QFI->get('QST_input_class');
        //      $disabled = $QFI->get('QST_disabled') ? ' disabled="disabled"' : '';
        $disabled          = $QFI->get('QST_disabled');
        $required_label    = apply_filters(' FHEE__EEH_Form_Fields__generate_form_input__required_label', '<em>*</em>');
        $QST_required      = $QFI->get('QST_required');
        $required          =
            $QST_required
                ? ['label' => $required_label, 'class' => 'required needs-value', 'title' => $QST_required]
                : [];
        $use_html_entities = $QFI->get_meta('htmlentities');
        $required_text     =
            $QFI->get('QST_required_text') != ''
                ? $QFI->get('QST_required_text')
                : esc_html__('This field is required', 'event_espresso');
        $required_text     = $QST_required
            ? "\n\t\t\t"
              . '<div class="required-text hidden">'
              . self::prep_answer($required_text, $use_html_entities)
              . '</div>'
            : '';
        $label_class       = 'espresso-form-input-lbl';
        $QST_options       = $QFI->options(true, $answer);
        $options           = is_array($QST_options) ? self::prep_answer_options($QST_options) : [];
        $system_ID         = $QFI->get('QST_system');
        $label_b4          = $QFI->get_meta('label_b4');
        $use_desc_4_label  = $QFI->get_meta('use_desc_4_label');


        switch ($QFI->get('QST_type')) {
            case 'TEXTAREA':
                return EEH_Form_Fields::textarea(
                    $display_text,
                    $answer,
                    $input_name,
                    $input_id,
                    $input_class,
                    [],
                    $required,
                    $required_text,
                    $label_class,
                    $disabled,
                    $system_ID,
                    $use_html_entities
                );

            case 'DROPDOWN':
                return EEH_Form_Fields::select(
                    $display_text,
                    $answer,
                    $options,
                    $input_name,
                    $input_id,
                    $input_class,
                    $required,
                    $required_text,
                    $label_class,
                    $disabled,
                    $system_ID,
                    $use_html_entities,
                    true
                );


            case 'RADIO_BTN':
                return EEH_Form_Fields::radio(
                    $display_text,
                    $answer,
                    $options,
                    $input_name,
                    $input_id,
                    $input_class,
                    $required,
                    $required_text,
                    $label_class,
                    $disabled,
                    $system_ID,
                    $use_html_entities,
                    $label_b4,
                    $use_desc_4_label
                );

            case 'CHECKBOX':
                return EEH_Form_Fields::checkbox(
                    $display_text,
                    $answer,
                    $options,
                    $input_name,
                    $input_id,
                    $input_class,
                    $required,
                    $required_text,
                    $label_class,
                    $disabled,
                    $label_b4,
                    $system_ID,
                    $use_html_entities
                );

            case 'DATE':
                return EEH_Form_Fields::datepicker(
                    $display_text,
                    $answer,
                    $input_name,
                    $input_id,
                    $input_class,
                    $required,
                    $required_text,
                    $label_class,
                    $disabled,
                    $system_ID,
                    $use_html_entities
                );

            case 'TEXT':
            default:
                return EEH_Form_Fields::text(
                    $display_text,
                    $answer,
                    $input_name,
                    $input_id,
                    $input_class,
                    $required,
                    $required_text,
                    $label_class,
                    $disabled,
                    $system_ID,
                    $use_html_entities
                );
        }
    }


    /**
     * generates HTML for a form text input
     *
     * @param string $question    label content
     * @param string $answer      form input value attribute
     * @param string $name        form input name attribute
     * @param string $id          form input css id attribute
     * @param string $class       form input css class attribute
     * @param array  $required    'label', 'class', and 'msg' - array of values for required "label" content, css
     *                            required 'class', and required 'msg' attribute
     * @param string $label_class css class attribute for the label
     * @param string $disabled    disabled="disabled" or null
     * @return string HTML
     */
    public static function text(
        $question = false,
        $answer = null,
        $name = false,
        $id = '',
        $class = '',
        $required = false,
        $required_text = '',
        $label_class = '',
        $disabled = false,
        $system_ID = false,
        $use_html_entities = true
    ) {
        // need these
        if (! $question || ! $name) {
            return null;
        }
        // prep the answer
        $answer = is_array($answer) ? '' : self::prep_answer($answer, $use_html_entities);
        // prep the required array
        $required = self::prep_required($required);
        // set disabled tag
        $disabled = $answer === null || ! $disabled ? '' : ' disabled="disabled"';
        // ya gots ta have style man!!!
        $txt_class = is_admin() ? 'regular-text' : 'espresso-text-inp';
        $class     = empty($class) ? $txt_class : $class;
        $class     .= ! empty($system_ID) ? ' ' . $system_ID : '';
        $extra     = apply_filters('FHEE__EEH_Form_Fields__additional_form_field_attributes', '');

        $label_html =
            $required_text
            . "\n\t\t\t"
            . '<label for="' . $name . '" class="' . $label_class . '">'
            . self::prep_question($question)
            . $required['label']
            . '</label><br/>';
        // filter label but ensure required text comes before it
        $label_html = apply_filters('FHEE__EEH_Form_Fields__label_html', $label_html, $required_text);

        $input_html =
            "\n\t\t\t"
            . '<input type="text" name="' . $name . '" id="' . $id . '" '
            . 'class="' . $class . ' ' . $required['class'] . '" value="' . esc_attr($answer) . '"  '
            . 'title="' . esc_attr($required['msg']) . '" ' . $disabled . ' ' . $extra . '/>';

        $input_html = apply_filters('FHEE__EEH_Form_Fields__input_html', $input_html, $label_html, $id);
        return $label_html . $input_html;
    }


    /**
     * generates HTML for a form textarea
     *
     * @param string $question    label content
     * @param string $answer      form input value attribute
     * @param string $name        form input name attribute
     * @param string $id          form input css id attribute
     * @param string $class       form input css class attribute
     * @param array  $dimensions  array of form input rows and cols attributes : array( 'rows' => 3, 'cols' => 40 )
     * @param array  $required    'label', 'class', and 'msg' - array of values for required "label" content, css
     *                            required 'class', and required 'msg' attribute
     * @param string $label_class css class attribute for the label
     * @param string $disabled    disabled="disabled" or null
     * @return string HTML
     */
    public static function textarea(
        $question = false,
        $answer = null,
        $name = false,
        $id = '',
        $class = '',
        $dimensions = false,
        $required = false,
        $required_text = '',
        $label_class = '',
        $disabled = false,
        $system_ID = false,
        $use_html_entities = true
    ) {
        // need these
        if (! $question || ! $name) {
            return null;
        }
        // prep the answer
        $answer = is_array($answer) ? '' : self::prep_answer($answer, $use_html_entities);
        // prep the required array
        $required = self::prep_required($required);
        // make sure $dimensions is an array
        $dimensions = is_array($dimensions) ? $dimensions : [];
        // and set some defaults
        $dimensions = array_merge(['rows' => 3, 'cols' => 40], $dimensions);
        // set disabled tag
        $disabled = $answer === null || ! $disabled ? '' : ' disabled="disabled"';
        // ya gots ta have style man!!!
        $txt_class = is_admin() ? 'regular-text' : 'espresso-textarea-inp';
        $class     = empty($class) ? $txt_class : $class;
        $class     .= ! empty($system_ID) ? ' ' . $system_ID : '';
        $extra     = apply_filters('FHEE__EEH_Form_Fields__additional_form_field_attributes', '');

        $label_html =
            $required_text
            . "\n\t\t\t"
            . '<label for="' . $name . '" class="' . $label_class . '">'
            . self::prep_question($question)
            . $required['label']
            . '</label><br/>';
        // filter label but ensure required text comes before it
        $label_html = apply_filters('FHEE__EEH_Form_Fields__label_html', $label_html, $required_text);

        $input_html =
            "\n\t\t\t"
            . '<textarea name="' . $name . '" id="' . $id . '" class="' . $class . ' ' . $required['class'] . '" '
            . 'rows="' . $dimensions['rows'] . '" cols="' . $dimensions['cols'] . '"  '
            . 'title="' . $required['msg'] . '" ' . $disabled . ' ' . $extra . '>'
            . $answer
            . '</textarea>';

        $input_html = apply_filters('FHEE__EEH_Form_Fields__input_html', $input_html, $label_html, $id);
        return $label_html . $input_html;
    }


    /**
     * generates HTML for a form select input
     *
     * @param string $question    label content
     * @param string $answer      form input value attribute
     * @param array  $options     array of answer options where array key = option value and array value = option
     *                            display text
     * @param string $name        form input name attribute
     * @param string $id          form input css id attribute
     * @param string $class       form input css class attribute
     * @param array  $required    'label', 'class', and 'msg' - array of values for required "label" content, css
     *                            required 'class', and required 'msg' attribute
     * @param string $label_class css class attribute for the label
     * @param string $disabled    disabled="disabled" or null
     * @return string HTML
     */
    public static function select(
        $question = false,
        $answer = null,
        $options = false,
        $name = false,
        $id = '',
        $class = '',
        $required = false,
        $required_text = '',
        $label_class = '',
        $disabled = false,
        $system_ID = false,
        $use_html_entities = true,
        $add_please_select_option = false
    ) {

        // need these
        if (! $question || ! $name || ! $options || empty($options) || ! is_array($options)) {
            return null;
        }
        // prep the answer
        $answer =
            is_array($answer)
                ? self::prep_answer(array_shift($answer), $use_html_entities)
                : self::prep_answer(
                $answer,
                $use_html_entities
            );
        // prep the required array
        $required = self::prep_required($required);
        // set disabled tag
        $disabled = $answer === null || ! $disabled ? '' : ' disabled="disabled"';
        // ya gots ta have style man!!!
        $txt_class = is_admin() ? 'wide' : 'espresso-select-inp';
        $class     = empty($class) ? $txt_class : $class;
        $class     .= ! empty($system_ID) ? ' ' . $system_ID : '';
        $extra     = apply_filters('FHEE__EEH_Form_Fields__additional_form_field_attributes', '');

        $label_html =
            $required_text
            . "\n\t\t\t"
            . '<label for="' . $name . '" class="' . $label_class . '">'
            . self::prep_question($question)
            . $required['label']
            . '</label><br/>';
        // filter label but ensure required text comes before it
        $label_html = apply_filters('FHEE__EEH_Form_Fields__label_html', $label_html, $required_text);

        $input_html =
            "\n\t\t\t"
            . '<select name="' . $name . '" id="' . $id . '" class="' . $class . ' ' . $required['class'] . '" '
            . 'title="' . esc_attr($required['msg']) . '"' . $disabled . ' ' . $extra . '>';
        // recursively count array elements, to determine total number of options
        $only_option = count($options, 1) == 1;
        if (! $only_option) {
            // if there is NO answer set and there are multiple options to choose from, then set the "please select" message as selected
            $selected   = $answer === null ? ' selected="selected"' : '';
            $input_html .= $add_please_select_option
                ? "\n\t\t\t\t"
                  . '<option value=""' . $selected . '>'
                  . esc_html__(' - please select - ', 'event_espresso')
                  . '</option>'
                : '';
        }
        foreach ($options as $key => $value) {
            // if value is an array, then create option groups, else create regular ol' options
            $input_html .= is_array($value)
                ? self::_generate_select_option_group(
                    $key,
                    $value,
                    $answer,
                    $use_html_entities
                )
                : self::_generate_select_option(
                    $value->value(),
                    $value->desc(),
                    $answer,
                    $only_option,
                    $use_html_entities
                );
        }

        $input_html .= "\n\t\t\t" . '</select>';

        $input_html =
            apply_filters(
                'FHEE__EEH_Form_Fields__select__before_end_wrapper',
                $input_html,
                $question,
                $answer,
                $name,
                $id,
                $class,
                $system_ID
            );

        $input_html = apply_filters('FHEE__EEH_Form_Fields__input_html', $input_html, $label_html, $id);
        return $label_html . $input_html;
    }


    /**
     *  _generate_select_option_group
     *
     *  if  $value for a select box is an array, then the key will be used as the optgroup label
     *  and the value array will be looped thru and the elements sent to _generate_select_option
     *
     * @param mixed   $opt_group
     * @param mixed   $QSOs
     * @param mixed   $answer
     * @param boolean $use_html_entities
     * @return string
     */
    private static function _generate_select_option_group($opt_group, $QSOs, $answer, $use_html_entities = true)
    {
        $html = "\n\t\t\t\t" . '<optgroup label="' . self::prep_option_value($opt_group) . '">';
        foreach ($QSOs as $QSO) {
            $html .= self::_generate_select_option($QSO->value(), $QSO->desc(), $answer, false, $use_html_entities);
        }
        $html .= "\n\t\t\t\t" . '</optgroup>';
        return $html;
    }


    /**
     *  _generate_select_option
     *
     * @param mixed   $key
     * @param mixed   $value
     * @param mixed   $answer
     * @param int     $only_option
     * @param boolean $use_html_entities
     * @return string
     */
    private static function _generate_select_option(
        $key,
        $value,
        $answer,
        $only_option = false,
        $use_html_entities = true
    ) {
        $key      = self::prep_answer($key, $use_html_entities);
        $value    = self::prep_answer($value, $use_html_entities);
        $value    = ! empty($value) ? $value : $key;
        $selected = ($answer == $key || $only_option) ? 'selected="selected"' : '';
        return "\n\t\t\t\t"
               . '<option value="' . self::prep_option_value($key) . '" ' . $selected . '> '
               . $value
               . '&nbsp;&nbsp;&nbsp;</option>';
    }


    /**
     * generates HTML for form radio button inputs
     *
     * @param bool|string $question    label content
     * @param string      $answer      form input value attribute
     * @param array|bool  $options     array of answer options where array key = option value and array value = option
     *                                 display text
     * @param bool|string $name        form input name attribute
     * @param string      $id          form input css id attribute
     * @param string      $class       form input css class attribute
     * @param array|bool  $required    'label', 'class', and 'msg' - array of values for required "label" content, css
     *                                 required 'class', and required 'msg' attribute
     * @param string      $required_text
     * @param string      $label_class css class attribute for the label
     * @param bool|string $disabled    disabled="disabled" or null
     * @param bool        $system_ID
     * @param bool        $use_html_entities
     * @param bool        $label_b4
     * @param bool        $use_desc_4_label
     * @return string HTML
     */
    public static function radio(
        $question = false,
        $answer = null,
        $options = false,
        $name = false,
        $id = '',
        $class = '',
        $required = false,
        $required_text = '',
        $label_class = '',
        $disabled = false,
        $system_ID = false,
        $use_html_entities = true,
        $label_b4 = false,
        $use_desc_4_label = false
    ) {
        // need these
        if (! $question || ! $name || ! $options || empty($options) || ! is_array($options)) {
            return null;
        }
        // prep the answer
        $answer = is_array($answer) ? '' : self::prep_answer($answer, $use_html_entities);
        // prep the required array
        $required = self::prep_required($required);
        // set disabled tag
        $disabled = $answer === null || ! $disabled ? '' : ' disabled="disabled"';
        // ya gots ta have style man!!!
        $radio_class = is_admin() ? 'ee-admin-radio-lbl' : $label_class;
        $class       = ! empty($class) ? $class : 'espresso-radio-btn-inp';
        $extra       = apply_filters('FHEE__EEH_Form_Fields__additional_form_field_attributes', '');

        $label_html =
            $required_text
            . "\n\t\t\t"
            . '<label class="' . $label_class . '">'
            . self::prep_question($question)
            . $required['label']
            . '</label> ';
        // filter label but ensure required text comes before it
        $label_html = apply_filters('FHEE__EEH_Form_Fields__label_html', $label_html, $required_text);

        $input_html =
            "\n\t\t\t"
            . '<ul id="' . $id . '-ul" class="espresso-radio-btn-options-ul ' . $label_class . ' ' . $class . '-ul">';

        $class .= ! empty($system_ID) ? ' ' . $system_ID : '';
        $class .= ! empty($required['class']) ? ' ' . $required['class'] : '';

        foreach ($options as $OPT) {
            if ($OPT instanceof EE_Question_Option) {
                $value   = self::prep_option_value($OPT->value());
                $label   = $use_desc_4_label ? $OPT->desc() : $OPT->value();
                $size    = $use_desc_4_label
                    ? self::get_label_size_class($OPT->value() . ' ' . $OPT->desc())
                    : self::get_label_size_class($OPT->value());
                $desc    = $OPT->desc();// no self::prep_answer
                $answer  = is_numeric($value) && empty($answer) ? 0 : $answer;
                $checked = (string) $value == (string) $answer ? ' checked="checked"' : '';
                $opt     = '-' . sanitize_key($value);

                $input_html .= "\n\t\t\t\t" . '<li' . $size . '>';
                $input_html .= "\n\t\t\t\t\t" . '<label class="' . $radio_class . ' espresso-radio-btn-lbl">';
                $input_html .= $label_b4 ? "\n\t\t\t\t\t\t" . '<span>' . $label . '</span>' : '';
                $input_html .= "\n\t\t\t\t\t\t"
                               . '<input type="radio" name="' . $name . '" id="' . $id . $opt . '" '
                               . 'class="' . $class . '" value="' . $value . '" '
                               . 'title="' . esc_attr($required['msg']) . '" ' . $disabled
                               . $checked . ' ' . $extra . '/>';
                $input_html .= ! $label_b4
                    ? "\n\t\t\t\t\t\t"
                      . '<span class="espresso-radio-btn-desc">'
                      . $label
                      . '</span>'
                    : '';
                $input_html .= "\n\t\t\t\t\t" . '</label>';
                $input_html .= $use_desc_4_label
                    ? ''
                    : '<span class="espresso-radio-btn-option-desc small-text grey-text">' . $desc . '</span>';
                $input_html .= "\n\t\t\t\t" . '</li>';
            }
        }

        $input_html .= "\n\t\t\t" . '</ul>';

        $input_html = apply_filters('FHEE__EEH_Form_Fields__input_html', $input_html, $label_html, $id);
        return $label_html . $input_html;
    }


    /**
     * generates HTML for form checkbox inputs
     *
     * @param string $question    label content
     * @param string $answer      form input value attribute
     * @param array  $options     array of options where array key = option value and array value = option display text
     * @param string $name        form input name attribute
     * @param string $id          form input css id attribute
     * @param string $class       form input css class attribute
     * @param array  $required    'label', 'class', and 'msg' - array of values for required "label" content, css
     *                            required 'class', and required 'msg' attribute
     * @param string $label_class css class attribute for the label
     * @param string $disabled    disabled="disabled" or null
     * @return string HTML
     */
    public static function checkbox(
        $question = false,
        $answer = null,
        $options = false,
        $name = false,
        $id = '',
        $class = '',
        $required = false,
        $required_text = '',
        $label_class = '',
        $disabled = false,
        $label_b4 = false,
        $system_ID = false,
        $use_html_entities = true
    ) {
        // need these
        if (! $question || ! $name || ! $options || empty($options) || ! is_array($options)) {
            return null;
        }
        $answer = maybe_unserialize($answer);

        // prep the answer(s)
        $answer = is_array($answer) ? $answer : [sanitize_key($answer) => $answer];

        foreach ($answer as $key => $value) {
            $key            = self::prep_option_value($key);
            $answer[ $key ] = self::prep_answer($value, $use_html_entities);
        }

        // prep the required array
        $required = self::prep_required($required);
        // set disabled tag
        $disabled = $answer === null || ! $disabled ? '' : ' disabled="disabled"';
        // ya gots ta have style man!!!
        $radio_class = is_admin() ? 'ee-admin-radio-lbl' : $label_class;
        $class       = empty($class) ? 'espresso-radio-btn-inp' : $class;
        $extra       = apply_filters('FHEE__EEH_Form_Fields__additional_form_field_attributes', '');

        $label_html =
            $required_text
            . "\n\t\t\t"
            . '<label class="' . $label_class . '">'
            . self::prep_question($question)
            . $required['label']
            . '</label> ';
        // filter label but ensure required text comes before it
        $label_html = apply_filters('FHEE__EEH_Form_Fields__label_html', $label_html, $required_text);

        $input_html =
            "\n\t\t\t"
            . '<ul id="' . $id . '-ul" class="espresso-checkbox-options-ul ' . $label_class . ' ' . $class . '-ul">';

        $class .= ! empty($system_ID) ? ' ' . $system_ID : '';
        $class .= ! empty($required['class']) ? ' ' . $required['class'] : '';

        foreach ($options as $OPT) {
            $value = $OPT->value();// self::prep_option_value( $OPT->value() );
            $size  = self::get_label_size_class($OPT->value() . ' ' . $OPT->desc());
            $text  = self::prep_answer($OPT->value());
            $desc  = $OPT->desc();
            $opt   = '-' . sanitize_key($value);

            $checked = is_array($answer) && in_array($text, $answer) ? ' checked="checked"' : '';

            $input_html .= "\n\t\t\t\t" . '<li' . $size . '>';
            $input_html .= "\n\t\t\t\t\t" . '<label class="' . $radio_class . ' espresso-checkbox-lbl">';
            $input_html .= $label_b4 ? "\n\t\t\t\t\t\t" . '<span>' . $text . '</span>' : '';
            $input_html .= "\n\t\t\t\t\t\t"
                           . '<input type="checkbox" name="' . $name . '[' . $OPT->ID() . ']" '
                           . 'id="' . $id . $opt . '" class="' . $class . '" value="' . $value . '" '
                           . 'title="' . esc_attr($required['msg']) . '" ' . $disabled . $checked . ' ' . $extra . '/>';
            $input_html .= ! $label_b4 ? "\n\t\t\t\t\t\t" . '<span>' . $text . '</span>' : '';
            $input_html .= "\n\t\t\t\t\t" . '</label>';
            if (! empty($desc) && $desc != $text) {
                $input_html .= "\n\t\t\t\t\t"
                               . ' &nbsp; <br/><div class="espresso-checkbox-option-desc small-text grey-text">'
                               . $desc
                               . '</div>';
            }
            $input_html .= "\n\t\t\t\t" . '</li>';
        }

        $input_html .= "\n\t\t\t" . '</ul>';

        $input_html = apply_filters('FHEE__EEH_Form_Fields__input_html', $input_html, $label_html, $id);
        return $label_html . $input_html;
    }


    /**
     * generates HTML for a form datepicker input
     *
     * @param string $question    label content
     * @param string $answer      form input value attribute
     * @param string $name        form input name attribute
     * @param string $id          form input css id attribute
     * @param string $class       form input css class attribute
     * @param array  $required    'label', 'class', and 'msg' - array of values for required "label" content, css
     *                            required 'class', and required 'msg' attribute
     * @param string $label_class css class attribute for the label
     * @param string $disabled    disabled="disabled" or null
     * @return string HTML
     */
    public static function datepicker(
        $question = false,
        $answer = null,
        $name = false,
        $id = '',
        $class = '',
        $required = false,
        $required_text = '',
        $label_class = '',
        $disabled = false,
        $system_ID = false,
        $use_html_entities = true
    ) {
        // need these
        if (! $question || ! $name) {
            return null;
        }
        // prep the answer
        $answer = is_array($answer) ? '' : self::prep_answer($answer, $use_html_entities);
        // prep the required array
        $required = self::prep_required($required);
        // set disabled tag
        $disabled = $answer === null || ! $disabled ? '' : ' disabled="disabled"';
        // ya gots ta have style man!!!
        $txt_class = is_admin() ? 'regular-text' : 'espresso-datepicker-inp';
        $class     = empty($class) ? $txt_class : $class;
        $class     .= ! empty($system_ID) ? ' ' . $system_ID : '';
        $extra     = apply_filters('FHEE__EEH_Form_Fields__additional_form_field_attributes', '');

        $label_html =
            $required_text
            . "\n\t\t\t"
            . '<label for="' . $name . '" class="' . $label_class . '">'
            . self::prep_question($question)
            . $required['label']
            . '</label><br/>';
        // filter label but ensure required text comes before it
        $label_html = apply_filters('FHEE__EEH_Form_Fields__label_html', $label_html, $required_text);

        $input_html =
            "\n\t\t\t"
            . '<input type="text" name="' . $name . '" id="' . $id . '" '
            . 'class="' . $class . ' ' . $required['class'] . ' datepicker" value="' . $answer . '"  '
            . 'title="' . esc_attr($required['msg']) . '" ' . $disabled . ' ' . $extra . '/>';

        // enqueue scripts
        wp_register_style(
            'espresso-ui-theme',
            EE_GLOBAL_ASSETS_URL . 'css/espresso-ui-theme/jquery-ui-1.10.3.custom.min.css',
            [],
            EVENT_ESPRESSO_VERSION
        );
        wp_enqueue_style('espresso-ui-theme');
        wp_enqueue_script('jquery-ui-datepicker');

        $input_html = apply_filters('FHEE__EEH_Form_Fields__input_html', $input_html, $label_html, $id);
        return $label_html . $input_html;
    }


    /**
     *  remove_label_keep_required_msg
     *  this will strip out a form input's label HTML while keeping the required text HTML that MUST be before the label
     *
     * @access public
     * @return     string
     */
    public static function remove_label_keep_required_msg($label_html, $required_text)
    {
        return $required_text;
    }


    /**
     * Simply returns the HTML for a hidden input of the given name and value.
     *
     * @param string $name
     * @param string $value
     * @return string HTML
     */
    public static function hidden_input($name, $value, $id = '')
    {
        $id = ! empty($id) ? $id : $name;
        return '<input id="' . $id . '" type="hidden" name="' . $name . '" value="' . $value . '"/>';
    }


    /**
     * prep_question
     *
     * @param string $question
     * @return string
     */
    public static function prep_question($question)
    {
        return $question;
    }


    /**
     *  prep_answer
     *
     * @param mixed $answer
     * @return string
     */
    public static function prep_answer($answer, $use_html_entities = true)
    {
        // make sure we convert bools first.  Otherwise (bool) false becomes an empty string which is NOT desired,
        // we want "0".
        if (is_bool($answer)) {
            $answer = $answer ? 1 : 0;
        }
        $answer = trim(stripslashes(str_replace('&#039;', "'", $answer)));
        return $use_html_entities ? htmlentities($answer, ENT_QUOTES, 'UTF-8') : $answer;
    }


    /**
     *  prep_answer_options
     *
     * @param array $QSOs array of EE_Question_Option objects
     * @return array
     */
    public static function prep_answer_options($QSOs = [])
    {
        $prepped_answer_options = [];
        if (is_array($QSOs) && ! empty($QSOs)) {
            foreach ($QSOs as $key => $QSO) {
                if (! $QSO instanceof EE_Question_Option) {
                    $QSO = EE_Question_Option::new_instance(
                        [
                            'QSO_value' => is_array($QSO) && isset($QSO['id'])
                                ? (string) $QSO['id']
                                : (string) $key,
                            'QSO_desc'  => is_array($QSO) && isset($QSO['text'])
                                ? (string) $QSO['text']
                                : (string) $QSO,
                        ]
                    );
                }
                if ($QSO->opt_group()) {
                    $prepped_answer_options[ $QSO->opt_group() ][] = $QSO;
                } else {
                    $prepped_answer_options[] = $QSO;
                }
            }
        }
        //      d( $prepped_answer_options );
        return $prepped_answer_options;
    }


    /**
     *  prep_option_value
     *
     * @param string $option_value
     * @return string
     */
    public static function prep_option_value($option_value)
    {
        return esc_attr(trim(stripslashes($option_value)));
    }


    /**
     *  prep_required
     *
     * @param string|array $required
     * @return array
     */
    public static function prep_required($required = [])
    {
        // make sure required is an array
        $required = is_array($required) ? $required : [];
        // and set some defaults
        return array_merge(['label' => '', 'class' => '', 'msg' => ''], $required);
    }


    /**
     *  get_label_size_class
     *
     * @param string $value
     * @return string
     */
    public static function get_label_size_class($value = false)
    {
        if ($value === false || $value === '') {
            return ' class="medium-lbl"';
        }
        // determine length of option value
        $val_size = strlen($value);
        switch ($val_size) {
            case $val_size < 3:
                $size = ' class="nano-lbl"';
                break;
            case $val_size < 6:
                $size = ' class="micro-lbl"';
                break;
            case $val_size < 12:
                $size = ' class="tiny-lbl"';
                break;
            case $val_size < 25:
                $size = ' class="small-lbl"';
                break;
            case $val_size > 100:
                $size = ' class="big-lbl"';
                break;
            default:
                $size = ' class="medium-lbl"';
                break;
        }
        return $size;
    }


    /**
     *  _load_system_dropdowns
     *
     * @param EE_Question_Form_Input $QFI
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    private static function _load_system_dropdowns($QFI)
    {
        $QST_system = $QFI->get('QST_system');
        switch ($QST_system) {
            case 'state':
                $QFI = self::generate_state_dropdown($QFI);
                break;
            case 'country':
                $QFI = self::generate_country_dropdown($QFI);
                break;
            case 'admin-state':
                $QFI = self::generate_state_dropdown($QFI, true);
                break;
            case 'admin-country':
                $QFI = self::generate_country_dropdown($QFI, true);
                break;
        }
        return $QFI;
    }


    /**
     * This preps dropdowns that are specialized.
     *
     * @param EE_Question_Form_Input $QFI
     *
     * @return EE_Question_Form_Input
     * @throws EE_Error
     * @throws ReflectionException
     * @since  4.6.0
     */
    protected static function _load_specialized_dropdowns($QFI)
    {
        switch ($QFI->get('QST_type')) {
            case 'STATE':
                $QFI = self::generate_state_dropdown($QFI);
                break;
            case 'COUNTRY':
                $QFI = self::generate_country_dropdown($QFI);
                break;
        }
        return $QFI;
    }


    /**
     *    generate_state_dropdown
     *
     * @param EE_Question_Form_Input $QST
     * @param bool                   $get_all
     * @return EE_Question_Form_Input
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function generate_state_dropdown($QST, $get_all = false)
    {
        $states = $get_all
            ? EEM_State::instance()->get_all_states()
            : EEM_State::instance()->get_all_states_of_active_countries();
        if ($states && count($states) != count($QST->options())) {
            $QST->set('QST_type', 'DROPDOWN');
            // if multiple countries, we'll create option groups within the dropdown
            foreach ($states as $state) {
                if ($state instanceof EE_State) {
                    $QSO = EE_Question_Option::new_instance(
                        [
                            'QSO_value'   => $state->ID(),
                            'QSO_desc'    => $state->name(),
                            'QST_ID'      => $QST->get('QST_ID'),
                            'QSO_deleted' => false,
                        ]
                    );
                    // set option group
                    $QSO->set_opt_group($state->country()->name());
                    // add option to question
                    $QST->add_temp_option($QSO);
                }
            }
        }
        return $QST;
    }


    /**
     *    generate_country_dropdown
     *
     * @param      $QST
     * @param bool $get_all
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     * @internal param array $question
     */
    public static function generate_country_dropdown($QST, $get_all = false)
    {
        $countries = $get_all
            ? EEM_Country::instance()->get_all_countries()
            : EEM_Country::instance()->get_all_active_countries();
        if ($countries && count($countries) != count($QST->options())) {
            $QST->set('QST_type', 'DROPDOWN');
            // now add countries
            foreach ($countries as $country) {
                if ($country instanceof EE_Country) {
                    $QSO = EE_Question_Option::new_instance(
                        [
                            'QSO_value'   => $country->ID(),
                            'QSO_desc'    => $country->name(),
                            'QST_ID'      => $QST->get('QST_ID'),
                            'QSO_deleted' => false,
                        ]
                    );
                    $QST->add_temp_option($QSO);
                }
            }
        }
        return $QST;
    }


    /**
     *  generates options for a month dropdown selector with numbers from 01 to 12
     *
     * @return array()
     */
    public static function two_digit_months_dropdown_options()
    {
        $options = [];
        for ($x = 1; $x <= 12; $x++) {
            $mm             = str_pad($x, 2, '0', STR_PAD_LEFT);
            $options[ $mm ] = $mm;
        }
        return EEH_Form_Fields::prep_answer_options($options);
    }


    /**
     *  generates a year dropdown selector with numbers for the next ten years
     *
     * @return array
     */
    public static function next_decade_two_digit_year_dropdown_options()
    {
        $options      = [];
        $current_year = date('y');
        $next_decade  = $current_year + 10;
        for ($x = $current_year; $x <= $next_decade; $x++) {
            $yy             = str_pad($x, 2, '0', STR_PAD_LEFT);
            $options[ $yy ] = $yy;
        }
        return EEH_Form_Fields::prep_answer_options($options);
    }


    /**
     * generates a month/year dropdown selector for all registrations matching the given criteria.  Typically used for
     * list table filter.
     *
     * @param string  $cur_date     any currently selected date can be entered here.
     * @param string  $status       Registration status
     * @param integer $evt_category Event Category ID if the Event Category filter is selected
     * @return string                html
     * @throws EE_Error
     */
    public static function generate_registration_months_dropdown($cur_date = '', $status = '', $evt_category = 0)
    {
        $_where = [];
        if (! empty($status)) {
            $_where['STS_ID'] = $status;
        }

        if ($evt_category > 0) {
            $_where['Event.Term_Taxonomy.term_id'] = $evt_category;
        }

        $regdtts = EEM_Registration::instance()->get_reg_months_and_years($_where);

        // setup vals for select input helper
        $options = [
            0 => [
                'text' => esc_html__('Select a Month/Year', 'event_espresso'),
                'id'   => '',
            ],
        ];

        foreach ($regdtts as $regdtt) {
            $date      = $regdtt->reg_month . ' ' . $regdtt->reg_year;
            $options[] = [
                'text' => $date,
                'id'   => $date,
            ];
        }

        return self::select_input('month_range', $options, $cur_date, '', 'wide');
    }


    /**
     * generates a month/year dropdown selector for all events matching the given criteria
     * Typically used for list table filter
     *
     * @param string $cur_date          any currently selected date can be entered here.
     * @param string $status            "view" (i.e. all, today, month, draft)
     * @param int    $evt_category      category event belongs to
     * @param string $evt_active_status "upcoming", "expired", "active", or "inactive"
     * @return string                    html
     * @throws EE_Error
     */
    public static function generate_event_months_dropdown(
        $cur_date = '',
        $status = null,
        $evt_category = null,
        $evt_active_status = null
    ) {
        // determine what post_status our condition will have for the query.
        // phpcs:disable PSR2.ControlStructures.SwitchDeclaration.TerminatingComment
        switch ($status) {
            case 'month':
            case 'today':
            case null:
            case 'all':
                $where['Event.status'] = ['NOT IN', ['trash']];
                break;
            case 'draft':
                $where['Event.status'] = ['IN', ['draft', 'auto-draft']];
                break;
            default:
                $where['Event.status'] = $status;
        }

        // phpcs:enable

        // categories?


        if (! empty($evt_category)) {
            $where['Event.Term_Taxonomy.taxonomy'] = 'espresso_event_categories';
            $where['Event.Term_Taxonomy.term_id']  = $evt_category;
        }


        //      $where['DTT_is_primary'] = 1;

        $DTTS = EEM_Datetime::instance()->get_dtt_months_and_years($where, $evt_active_status);

        // let's setup vals for select input helper
        $options = [
            0 => [
                'text' => esc_html__('Select a Month/Year', 'event_espresso'),
                'id'   => "",
            ],
        ];


        // translate month and date
        global $wp_locale;

        foreach ($DTTS as $DTT) {
            $localized_date = $wp_locale->get_month($DTT->dtt_month_num) . ' ' . $DTT->dtt_year;
            $id             = $DTT->dtt_month . ' ' . $DTT->dtt_year;
            $options[]      = [
                'text' => $localized_date,
                'id'   => $id,
            ];
        }


        return self::select_input('month_range', $options, $cur_date, '', 'wide');
    }


    /**
     * generates the dropdown selector for event categories
     * typically used as a filter on list tables.
     *
     * @param integer $current_cat currently selected category
     * @return string               html for dropdown
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function generate_event_category_dropdown($current_cat = -1)
    {
        $categories = EEM_Term::instance()->get_all_ee_categories(true);
        $options    = [
            '0' => [
                'text' => esc_html__('All Categories', 'event_espresso'),
                'id'   => -1,
            ],
        ];

        // setup categories for dropdown
        foreach ($categories as $category) {
            $options[] = [
                'text' => $category->get('name'),
                'id'   => $category->ID(),
            ];
        }

        return self::select_input('EVT_CAT', $options, $current_cat);
    }


    /**
     *    generate a submit button with or without it's own microform
     *    this is the only way to create buttons that are compatible across all themes
     *
     * @access    public
     * @param string      $url              - the form action
     * @param string      $ID               - some kind of unique ID, appended with "-sbmt" for the input and "-frm"
     *                                      for the form
     * @param string      $class            - css classes (separated by spaces if more than one)
     * @param string      $text             - what appears on the button
     * @param string      $nonce_action     - if using nonces
     * @param bool|string $input_only       - whether to print form header and footer. TRUE returns the input without
     *                                      the form
     * @param string      $extra_attributes - any extra attributes that need to be attached to the form input
     * @return    string
     */
    public static function submit_button(
        $url = '',
        $ID = '',
        $class = '',
        $text = '',
        $nonce_action = '',
        $input_only = false,
        $extra_attributes = ''
    ) {
        $btn = '';
        if (empty($url) || empty($ID)) {
            return $btn;
        }
        $text = ! empty($text) ? $text : esc_html__('Submit', 'event_espresso');
        $btn  .= '<input id="' . $ID . '-btn" class="' . $class . '" '
                 . 'type="submit" value="' . $text . '" ' . $extra_attributes . '/>';
        if (! $input_only) {
            $btn_frm = '<form id="' . $ID . '-frm" method="POST" action="' . $url . '">';
            $btn_frm .= ! empty($nonce_action)
                ? wp_nonce_field($nonce_action, $nonce_action . '_nonce', true, false)
                : '';
            $btn_frm .= $btn;
            $btn_frm .= '</form>';
            $btn     = $btn_frm;
            unset($btn_frm);
        }
        return $btn;
    }
}
