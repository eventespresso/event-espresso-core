<?php

use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * EE_Question class
 *
 * @package     Event Espresso
 * @subpackage  includes/classes/EE_Answer.class.php
 * @author      Mike Nelson
 * @method EEM_Question get_model()
 * @method EE_Answer[]|EE_Question_Group[]|EE_Question_Option[] get_many_related($relation, $query_params = [])
 */
class EE_Question extends EE_Soft_Delete_Base_Class implements EEI_Duplicatable
{
    private ?string $type = null;


    /**
     * @param array  $props_n_values          incoming values
     * @param string $timezone                incoming timezone (if not set the timezone set for the website will be
     *                                        used.)
     * @param array  $date_formats            incoming date_formats in an array where the first value is the
     *                                        date_format and the second value is the time format
     * @return EE_Question
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance($props_n_values = [], $timezone = '', $date_formats = []): EE_Question
    {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__, $timezone, $date_formats);
        return $has_object ?: new self($props_n_values, false, $timezone, $date_formats);
    }


    /**
     * @param array  $props_n_values  incoming values from the database
     * @param string $timezone        incoming timezone as set by the model.  If not set the timezone for
     *                                the website will be used.
     * @return EE_Question
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance_from_db($props_n_values = [], $timezone = ''): EE_Question
    {
        return new self($props_n_values, true, $timezone);
    }


    /**
     * @return EEM_Question
     * @throws EE_Error
     * @throws ReflectionException
     * @since 5.0.30.p
     */
    private function getModel(): EEM_Question
    {
        return $this->get_model();
    }


    /**
     * @param string $QST_display_text
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_display_text(string $QST_display_text = '')
    {
        $this->set('QST_display_text', $QST_display_text);
    }


    /**
     * @param string $QST_admin_label
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_admin_label(string $QST_admin_label = '')
    {
        $this->set('QST_admin_label', $QST_admin_label);
    }


    /**
     * @param mixed $QST_system
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_system_ID(string $QST_system = '')
    {
        $this->set('QST_system', $QST_system);
    }


    /**
     * @param string $QST_type
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_question_type(string $QST_type = '')
    {
        $this->set('QST_type', $QST_type);
    }


    /**
     * Sets whether this question must be answered when presented in a form
     *
     * @param bool $QST_required
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_required(bool $QST_required = false)
    {
        $this->set('QST_required', $QST_required);
    }


    /**
     * @param string $QST_required_text
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_required_text(string $QST_required_text = '')
    {
        $this->set('QST_required_text', $QST_required_text);
    }


    /**
     * Sets the order of this question when placed in a sequence of questions
     *
     * @param int $QST_order
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_order(int $QST_order = 0)
    {
        $this->set('QST_order', $QST_order);
    }


    /**
     * @param bool $QST_admin_only
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_admin_only(bool $QST_admin_only = false)
    {
        $this->set('QST_admin_only', $QST_admin_only);
    }


    /**
     * Sets the WordPress user ID on the question
     *
     * @param int $QST_wp_user
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_wp_user(int $QST_wp_user = 1)
    {
        $this->set('QST_wp_user', $QST_wp_user);
    }


    /**
     * Sets whether the question has been deleted
     * we use this boolean instead of actually deleting it
     * because when users delete this question they really want to remove the question from future forms,
     * BUT keep their old answers which depend on this record actually existing.
     *
     * @param bool $QST_deleted
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_deleted(bool $QST_deleted = false)
    {
        $this->set('QST_deleted', $QST_deleted);
    }


    /**
     *  used for the input label text displayed to users on the frontend
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function display_text(): string
    {
        return (string) $this->get('QST_display_text');
    }


    /**
     * input label used in the admin
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function admin_label(): string
    {
        return (string) $this->get('QST_admin_label');
    }


    /**
     * returns the attendee column name for this question
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function system_ID(): string
    {
        return (string) $this->get('QST_system');
    }


    /**
     * if question is required or not (boolean)
     *
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function required(): bool
    {
        return (bool) $this->get('QST_required');
    }


    /**
     * returns the text which should be displayed when a user
     * doesn't answer this question in a form
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function required_text(): string
    {
        return (string) $this->get('QST_required_text');
    }


    /**
     * returns the type of this question: one of the QST_type_* constants on the EEM_Question model
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function type(): string
    {
        if ($this->type === null) {
            $this->type = (string) $this->get('QST_type');
        }
        return $this->type;
    }


    /**
     * returns an integer showing where this question should be placed in a sequence of questions
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function order(): int
    {
        return (int) $this->get('QST_order');
    }


    /**
     * returns whether this question should only appear to admins, or to everyone
     *
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function admin_only(): bool
    {
        return (bool) $this->get('QST_admin_only');
    }


    /**
     * returns the id the WordPress user who created this question
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function wp_user(): int
    {
        return (int) $this->get('QST_wp_user');
    }


    /**
     * returns whether this question has been marked as 'deleted'
     *
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function deleted(): bool
    {
        return (bool) $this->get('QST_deleted');
    }


    /**
     * Gets an array of related EE_Answer  to this EE_Question
     *
     * @return EE_Answer[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function answers(): array
    {
        return $this->get_many_related('Answer');
    }


    /**
     * Boolean check for if there are answers on this question in th db
     *
     * @return bool true = has answers, false = no answers.
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function has_answers(): bool
    {
        return (bool) $this->count_related('Answer') > 0;
    }


    /**
     * gets an array of EE_Question_Group which relate to this question
     *
     * @return EE_Question_Group[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function question_groups(): array
    {
        return $this->get_many_related('Question_Group');
    }


    /**
     * Returns all the options for this question. By default, it returns only the not-yet-deleted ones.
     *
     * @param bool $notDeletedOptionsOnly                         whether to return ALL options,
     *                                                            or only the ones which have not yet been deleted
     * @param string|array|null $selected_value_to_always_include when retrieving options to an ANSWERED question,
     *                                                            we want to usually only show non-deleted options
     *                                                            AND the value that was selected for the answer,
     *                                                            whether it was trashed or not.
     * @return EE_Question_Option[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function options(bool $notDeletedOptionsOnly = true, $selected_value_to_always_include = null): array
    {
        if (! $this->ID()) {
            return [];
        }
        $query_params = [];
        if ($selected_value_to_always_include) {
            if (is_array($selected_value_to_always_include)) {
                $query_params[0]['OR*options-query']['QSO_value'] = ['IN', $selected_value_to_always_include];
            } else {
                $query_params[0]['OR*options-query']['QSO_value'] = $selected_value_to_always_include;
            }
        }
        if ($notDeletedOptionsOnly) {
            $query_params[0]['OR*options-query']['QSO_deleted'] = false;
        }
        // order by QSO_order
        $query_params['order_by'] = ['QSO_order' => 'ASC'];
        return $this->get_many_related('Question_Option', $query_params);
    }


    /**
     * returns an array of EE_Question_Options which relate to this question
     *
     * @return EE_Question_Option[]
     */
    public function temp_options(): array
    {
        return $this->_model_relations['Question_Option'];
    }


    /**
     * Adds an option for this question. Note: if the option were previously associated with a different
     * Question, that relationship will be overwritten.
     *
     * @param EE_Question_Option $option
     * @return EE_Base_Class
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function add_option(EE_Question_Option $option): EE_Base_Class
    {
        return $this->_add_relation_to($option, 'Question_Option');
    }


    /**
     * Adds an option directly to this question without saving to the db
     *
     * @param EE_Question_Option $option
     * @return bool success
     */
    public function add_temp_option(EE_Question_Option $option): bool
    {
        $this->_model_relations['Question_Option'][] = $option;
        return true;
    }


    /**
     * Marks the option as deleted.
     *
     * @param EE_Question_Option $option
     * @return bool success
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function remove_option(EE_Question_Option $option): bool
    {
        return (bool) $this->_remove_relation_to($option, 'Question_Option');
    }


    /**
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function is_system_question(): bool
    {
        $system_ID = $this->get('QST_system');
        return ! empty($system_ID);
    }


    /**
     * The purpose of this method is set the question order this question order to be the max out of all questions
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_order_to_latest()
    {
        $latest_order = $this->getModel()->get_latest_question_order();
        $latest_order++;
        $this->set('QST_order', $latest_order);
    }


    /**
     * Retrieves the list of allowed question types from the model.
     *
     * @return string[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _allowed_question_types(): array
    {
        return $this->getModel()->allowed_question_types();
    }


    /**
     * Duplicates this question and its question options
     *
     * @param array $options
     * @return EE_Question|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function duplicate($options = []): ?EE_Question
    {
        $new_question = clone $this;
        $new_question->set('QST_ID', 0);
        $new_question->set_display_text(
            sprintf(esc_html__('%s **Duplicate**', 'event_espresso'), $this->display_text())
        );
        $new_question->set_admin_label(sprintf(esc_html__('%s **Duplicate**', 'event_espresso'), $this->admin_label()));
        $new_question->set_system_ID('');
        $new_question->set_wp_user(get_current_user_id());
        // if we're duplicating a trashed question, assume we don't want the new one to be trashed
        $new_question->set_deleted();
        $success = $new_question->save();
        if ($success) {
            // we don't totally want to duplicate the question options, because we want them to be for the NEW question
            foreach ($this->options() as $question_option) {
                $question_option->duplicate(['QST_ID' => $new_question->ID()]);
            }
            return $new_question;
        }
        return null;
    }


    /**
     * Returns the question's maximum allowed response size
     *
     * @return int|float
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function max()
    {
        return $this->get('QST_max');
    }


    /**
     * Sets the question's maximum allowed response size
     *
     * @param int|float $new_max
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_max($new_max)
    {
        $this->set('QST_max', $new_max);
    }


    /**
     * Creates a form input from this question which can be used in HTML forms
     *
     * @param EE_Registration|null $registration
     * @param EE_Answer|null       $answer
     * @param array                $input_constructor_args
     * @return EE_Form_Input_Base
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function generate_form_input(
        ?EE_Registration $registration = null,
        ?EE_Answer $answer = null,
        array $input_constructor_args = []
    ): EE_Form_Input_Base {
        $input_constructor_args = array_merge(
            [
                'required'                          => $this->required(),
                'html_label_text'                   => $this->display_text(),
                'required_validation_error_message' => $this->required_text(),
            ],
            $input_constructor_args
        );
        if (! $answer instanceof EE_Answer && $registration instanceof EE_Registration) {
            $answer = EEM_Answer::instance()->get_registration_question_answer_object($registration, $this->ID());
        }
        $enum_options = $this->isEnumType() ? $this->options() : [];
        // has this question been answered ?
        if (
            $answer instanceof EE_Answer
            && $answer->value() !== ''
        ) {
            // answer gets htmlspecialchars called on it, undo that please
            // because the form input's display strategy may call esc_attr too
            // which also does html special characters
            $values_with_html_special_chars = $answer->value();
            if (is_array($values_with_html_special_chars)) {
                $default_value = array_map('htmlspecialchars_decode', $values_with_html_special_chars);
            } else {
                $default_value = htmlspecialchars_decode($values_with_html_special_chars);
            }
            $input_constructor_args['default'] = $default_value;
        } else {
            foreach ($enum_options as $enum_option) {
                if (! $enum_option instanceof EE_Question_Option) {
                    continue;
                }
                if ($enum_option->isDefault()) {
                    $input_constructor_args['default'] = $enum_option->value();
                    break;
                }
            }
        }
        $max_max_for_question = EEM_Question::instance()->absolute_max_for_system_question($this->system_ID());
        if (
            in_array(
                $this->type(),
                EEM_Question::instance()->questionTypesWithMaxLength(),
                true
            )
        ) {
            $input_constructor_args['validation_strategies'][] = new EE_Max_Length_Validation_Strategy(
                null,
                min($max_max_for_question, $this->max())
            );
        }
        $input_constructor_args = apply_filters(
            'FHEE__EE_SPCO_Reg_Step_Attendee_Information___generate_question_input__input_constructor_args',
            $input_constructor_args,
            $registration,
            $this,
            $answer
        );

        switch ($this->type()) {
            // Text
            case EEM_Question::QST_type_text:
                $result = new EE_Text_Input($input_constructor_args);
                break;
            // Textarea
            case EEM_Question::QST_type_textarea:
                $result = new EE_Text_Area_Input($input_constructor_args);
                break;
            // Radio Buttons
            case EEM_Question::QST_type_radio:
                $result = new EE_Radio_Button_Input($enum_options, $input_constructor_args);
                break;
            // Dropdown
            case EEM_Question::QST_type_dropdown:
                $result = new EE_Select_Input($enum_options, $input_constructor_args);
                break;
            // State Dropdown
            case EEM_Question::QST_type_state:
                $state_options = apply_filters(
                    'FHEE__EE_Question__generate_form_input__state_options',
                    null,
                    $this,
                    $registration,
                    $answer
                );
                $result        = new EE_State_Select_Input($state_options, $input_constructor_args);
                break;
            // Country Dropdown
            case EEM_Question::QST_type_country:
                $country_options = apply_filters(
                    'FHEE__EE_Question__generate_form_input__country_options',
                    null,
                    $this,
                    $registration,
                    $answer
                );
                $result          = new EE_Country_Select_Input($country_options, $input_constructor_args);
                break;
            // Checkboxes
            case EEM_Question::QST_type_checkbox:
                $result = new EE_Checkbox_Multi_Input($enum_options, $input_constructor_args);
                break;
            // Date
            case EEM_Question::QST_type_date:
                $result = new EE_Datepicker_Input($input_constructor_args);
                break;
            case EEM_Question::QST_type_html_textarea:
                $input_constructor_args['validation_strategies'][] = new EE_Simple_HTML_Validation_Strategy();
                $result                                            = new EE_Text_Area_Input($input_constructor_args);
                $result->remove_validation_strategy('EE_Plaintext_Validation_Strategy');
                break;
            case EEM_Question::QST_type_email:
                $result = new EE_Email_Input($input_constructor_args);
                break;
            // Email confirm
            case EEM_Question::QST_type_email_confirm:
                $result = new EE_Email_Confirm_Input($input_constructor_args);
                break;
            case EEM_Question::QST_type_us_phone:
                $result = new EE_Phone_Input($input_constructor_args);
                break;
            case EEM_Question::QST_type_int:
                $result = new EE_Integer_Input($input_constructor_args);
                break;
            case EEM_Question::QST_type_decimal:
                $result = new EE_Float_Input($input_constructor_args);
                break;
            case EEM_Question::QST_type_url:
                $result = new EE_URL_Input($input_constructor_args);
                break;
            case EEM_Question::QST_type_year:
                $result = new EE_Year_Input(
                    $input_constructor_args,
                    apply_filters(
                        'FHEE__EE_SPCO_Reg_Step_Attendee_Information___generate_question_input__year_question__four_digit',
                        true,
                        $this
                    ),
                    apply_filters(
                        'FHEE__EE_SPCO_Reg_Step_Attendee_Information___generate_question_input__year_question__early_range',
                        100,
                        $this
                    ),
                    apply_filters(
                        'FHEE__EE_SPCO_Reg_Step_Attendee_Information___generate_question_input__year_question__end_range',
                        100,
                        $this
                    )
                );
                break;
            case EEM_Question::QST_type_multi_select:
                $result = new EE_Select_Multiple_Input($enum_options, $input_constructor_args);
                break;
            // fallback
            default:
                $default_input = apply_filters(
                    'FHEE__EE_SPCO_Reg_Step_Attendee_Information___generate_question_input__default',
                    null,
                    $this->type(),
                    $this,
                    $input_constructor_args
                );
                if (! $default_input) {
                    $default_input = new EE_Text_Input($input_constructor_args);
                }
                $result = $default_input;
        }
        return apply_filters('FHEE__EE_Question__generate_form_input__return', $result, $registration, $this, $answer);
    }


    /**
     * Returns whether this question type should have question option entries
     *
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function should_have_question_options(): bool
    {
        return in_array(
            $this->type(),
            $this->getModel()->question_types_with_options(),
            true
        );
    }


    /**
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     * @since 5.0.30.p
     */
    public function isEnumType(): bool
    {
        return $this->type() === EEM_Question::QST_type_checkbox
            || $this->type() === EEM_Question::QST_type_dropdown
            || $this->type() === EEM_Question::QST_type_multi_select
            || $this->type() === EEM_Question::QST_type_radio
            || $this->type() === EEM_Question::QST_type_country
            || $this->type() === EEM_Question::QST_type_state
            || $this->type() === EEM_Question::QST_type_year;
    }
}
