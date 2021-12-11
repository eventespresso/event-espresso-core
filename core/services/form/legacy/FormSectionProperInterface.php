<?php

namespace EventEspresso\core\services\form\legacy;

use EE_Error;
use EE_Form_Input_Base;
use EE_Form_Section_Base;
use EE_Form_Section_Layout_Base;
use EE_Form_Section_Proper;
use EE_Form_Section_Validatable;
use EE_Validation_Error;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;

/**
 * For containing info about a non-field form section, which contains other form sections/fields.
 * Relies heavily on the script form_section_validation.js for client-side validation, mostly
 * the php code just provides form_section_validation.js with teh variables to use.
 * Important: in order for the JS to be loaded properly, you must construct a form section
 * before the hook wp_enqueue_scripts is called (so that the form section can enqueue its needed scripts).
 * However, you may output the form (usually by calling get_html) anywhere you like.
 */
interface FormSectionProperInterface
{
    /**
     * Finishes construction given the parent form section and this form section's name
     *
     * @param EE_Form_Section_Proper $parent_form_section
     * @param string                 $name
     * @throws EE_Error
     */
    public function _construct_finalize($parent_form_section, $name);


    /**
     * Gets the layout strategy for this form section
     *
     * @return EE_Form_Section_Layout_Base
     */
    public function get_layout_strategy();


    /**
     * Gets the HTML for a single input for this form section according
     * to the layout strategy
     *
     * @param EE_Form_Input_Base $input
     * @return string
     */
    public function get_html_for_input($input);


    /**
     * was_submitted - checks if form inputs are present in request data
     * Basically an alias for form_data_present_in() (which is used by both
     * proper form sections and form inputs)
     *
     * @param null $form_data
     * @return boolean
     * @throws EE_Error
     */
    public function was_submitted($form_data = null);


    /**
     * After the form section is initially created, call this to sanitize the data in the submission
     * which relates to this form section, validate it, and set it as properties on the form.
     *
     * @param array|null $req_data should usually be $_POST (the default).
     *                             However, you CAN supply a different array.
     *                             Consider using set_defaults() instead however.
     *                             (If you rendered the form in the page using echo $form_x->get_html()
     *                             the inputs will have the correct name in the request data for this function
     *                             to find them and populate the form with them.
     *                             If you have a flat form (with only input subsections),
     *                             you can supply a flat array where keys
     *                             are the form input names and values are their values)
     * @param boolean    $validate whether or not to perform validation on this data. Default is,
     *                             of course, to validate that data, and set errors on the invalid values.
     *                             But if the data has already been validated
     *                             (eg you validated the data then stored it in the DB)
     *                             you may want to skip this step.
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function receive_form_submission($req_data = null, $validate = true);


    /**
     * Populates this form and its subsections with data from the session.
     * (Wrapper for EE_Form_Section_Proper::receive_form_submission, so it shows
     * validation errors when displaying too)
     * Returns true if the form was populated from the session, false otherwise
     *
     * @return boolean
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function populate_from_session();


    /**
     * Populates the default data for the form, given an array where keys are
     * the input names, and values are their values (preferably normalized to be their
     * proper PHP types, not all strings... although that should be ok too).
     * Proper subsections are sub-arrays, the key being the subsection's name, and
     * the value being an array formatted in teh same way
     *
     * @param array $default_data
     * @throws EE_Error
     */
    public function populate_defaults($default_data);


    /**
     * returns true if subsection exists
     *
     * @param string $name
     * @return boolean
     */
    public function subsection_exists($name);


    /**
     * Gets the subsection specified by its name
     *
     * @param string  $name
     * @param boolean $require_construction_to_be_finalized most client code should leave this as TRUE
     *                                                      so that the inputs will be properly configured.
     *                                                      However, some client code may be ok
     *                                                      with construction finalize being called later
     *                                                      (realizing that the subsections' html names
     *                                                      might not be set yet, etc.)
     * @return EE_Form_Section_Base
     * @throws EE_Error
     */
    public function get_subsection($name, $require_construction_to_be_finalized = true);


    /**
     * Gets all the validatable subsections of this form section
     *
     * @return EE_Form_Section_Validatable[]
     * @throws EE_Error
     */
    public function get_validatable_subsections();


    /**
     * Gets an input by the given name. If not found, or if its not an EE_FOrm_Input_Base child,
     * throw an EE_Error.
     *
     * @param string  $name
     * @param boolean $require_construction_to_be_finalized most client code should
     *                                                      leave this as TRUE so that the inputs will be properly
     *                                                      configured. However, some client code may be ok with
     *                                                      construction finalize being called later
     *                                                      (realizing that the subsections' html names might not be
     *                                                      set yet, etc.)
     * @return EE_Form_Input_Base
     * @throws EE_Error
     */
    public function get_input($name, $require_construction_to_be_finalized = true);


    /**
     * Like get_input(), gets the proper subsection of the form given the name,
     * otherwise throws an EE_Error
     *
     * @param string  $name
     * @param boolean $require_construction_to_be_finalized most client code should
     *                                                      leave this as TRUE so that the inputs will be properly
     *                                                      configured. However, some client code may be ok with
     *                                                      construction finalize being called later
     *                                                      (realizing that the subsections' html names might not be
     *                                                      set yet, etc.)
     * @return EE_Form_Section_Proper
     * @throws EE_Error
     */
    public function get_proper_subsection($name, $require_construction_to_be_finalized = true);


    /**
     * Gets the value of the specified input. Should be called after receive_form_submission()
     * or populate_defaults() on the form, where the normalized value on the input is set.
     *
     * @param string $name
     * @return mixed depending on the input's type and its normalization strategy
     * @throws EE_Error
     */
    public function get_input_value($name);


    /**
     * Checks if this form section itself is valid, and then checks its subsections
     *
     * @return boolean
     * @throws EE_Error
     */
    public function is_valid();


    /**
     * Returns the HTML for the form, except for the form opening and closing tags
     * (as the form section doesn't know where you necessarily want to send the information to),
     * and except for a submit button. Enqueues JS and CSS; if called early enough we will
     * try to enqueue them in the header, otherwise they'll be enqueued in the footer.
     * Not doing_it_wrong because theoretically this CAN be used properly,
     * provided its used during "wp_enqueue_scripts", or it doesn't need to enqueue
     * any CSS.
     *
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function get_html_and_js();


    /**
     * returns HTML for displaying this form section. recursively calls display_section() on all subsections
     *
     * @param bool $display_previously_submitted_data
     * @return string
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     * @throws EE_Error
     * @throws EE_Error
     */
    public function get_html($display_previously_submitted_data = true);


    /**
     * enqueues JS and CSS for the form.
     * It is preferred to call this before wp_enqueue_scripts so the
     * scripts and styles can be put in the header, but if called later
     * they will be put in the footer (which is OK for JS, but in HTML4 CSS should
     * only be in the header; but in HTML5 its ok in the body.
     * See http://stackoverflow.com/questions/4957446/load-external-css-file-in-body-tag.
     * So if your form enqueues CSS, it's preferred to call this before wp_enqueue_scripts.)
     *
     * @return void
     * @throws EE_Error
     */
    public function enqueue_js();


    /**
     * gets the variables used by form_section_validation.js.
     * This needs to be called AFTER we've called $this->_enqueue_jquery_validate_script,
     * but before the wordpress hook wp_loaded
     *
     * @throws EE_Error
     */
    public function _enqueue_and_localize_form_js();


    /**
     * add our form section data to a static variable accessible by all form sections
     *
     * @param bool $return_for_subsection
     * @return void
     * @throws EE_Error
     */
    public function localize_validation_rules($return_for_subsection = false);


    /**
     * Gets an array of extra data that will be useful for client-side javascript.
     * This is primarily data added by inputs and forms in addition to any
     * scripts they might enqueue
     *
     * @param array $form_other_js_data
     * @return array
     * @throws EE_Error
     */
    public function get_other_js_data($form_other_js_data = []);


    /**
     * Gets a flat array of inputs for this form section and its subsections.
     * Keys are their form names, and values are the inputs themselves
     *
     * @return EE_Form_Input_Base
     * @throws EE_Error
     */
    public function inputs_in_subsections();


    /**
     * Gets a flat array of all the validation errors.
     * Keys are html names (because those should be unique)
     * and values are a string of all their validation errors
     *
     * @return string[]
     * @throws EE_Error
     */
    public function subsection_validation_errors_by_html_name();


    /**
     * ensure_scripts_localized
     *
     * @throws EE_Error
     */
    public function ensure_scripts_localized();


    /**
     * Gets the JS to put inside the jquery validation rules for subsection of this form section.
     * See parent function for more...
     *
     * @return array
     * @throws EE_Error
     */
    public function get_jquery_validation_rules();


    /**
     * Gets all the validated inputs for the form section
     *
     * @return array
     * @throws EE_Error
     */
    public function valid_data();


    /**
     * Gets all the inputs on this form section
     *
     * @return EE_Form_Input_Base[]
     * @throws EE_Error
     */
    public function inputs();


    /**
     * Gets all the subsections which are a proper form
     *
     * @return EE_Form_Section_Proper[]
     * @throws EE_Error
     */
    public function subforms();


    /**
     * Gets all the subsections (inputs, proper subsections, or html-only sections).
     * Consider using inputs() or subforms()
     * if you only want form inputs or proper form sections.
     *
     * @param boolean $require_construction_to_be_finalized most client code should
     *                                                      leave this as TRUE so that the inputs will be properly
     *                                                      configured. However, some client code may be ok with
     *                                                      construction finalize being called later
     *                                                      (realizing that the subsections' html names might not be
     *                                                      set yet, etc.)
     * @return EE_Form_Section_Proper[]
     * @throws EE_Error
     */
    public function subsections($require_construction_to_be_finalized = true);


    /**
     * Returns whether this form has any subforms or inputs
     *
     * @return bool
     */
    public function hasSubsections();


    /**
     * Returns a simple array where keys are input names, and values are their normalized
     * values. (Similar to calling get_input_value on inputs)
     *
     * @param boolean $include_subform_inputs Whether to include inputs from subforms,
     *                                        or just this forms' direct children inputs
     * @param boolean $flatten                Whether to force the results into 1-dimensional array,
     *                                        or allow multidimensional array
     * @return array if $flatten is TRUE it will always be a 1-dimensional array
     *                                        with array keys being input names
     *                                        (regardless of whether they are from a subsection or not),
     *                                        and if $flatten is FALSE it can be a multidimensional array
     *                                        where keys are always subsection names and values are either
     *                                        the input's normalized value, or an array like the top-level array
     * @throws EE_Error
     */
    public function input_values($include_subform_inputs = false, $flatten = false);


    /**
     * Similar to EE_Form_Section_Proper::input_values(), except this returns the 'display_value'
     * of each input. On some inputs (especially radio boxes or checkboxes), the value stored
     * is not necessarily the value we want to display to users. This creates an array
     * where keys are the input names, and values are their display values
     *
     * @param boolean $include_subform_inputs Whether to include inputs from subforms,
     *                                        or just this forms' direct children inputs
     * @param boolean $flatten                Whether to force the results into 1-dimensional array,
     *                                        or allow multidimensional array
     * @return array if $flatten is TRUE it will always be a 1-dimensional array
     *                                        with array keys being input names
     *                                        (regardless of whether they are from a subsection or not),
     *                                        and if $flatten is FALSE it can be a multidimensional array
     *                                        where keys are always subsection names and values are either
     *                                        the input's normalized value, or an array like the top-level array
     * @throws EE_Error
     */
    public function input_pretty_values($include_subform_inputs = false, $flatten = false);


    /**
     * Gets the input values from the form
     *
     * @param boolean $pretty                 Whether to retrieve the pretty value,
     *                                        or just the normalized value
     * @param boolean $include_subform_inputs Whether to include inputs from subforms,
     *                                        or just this forms' direct children inputs
     * @param boolean $flatten                Whether to force the results into 1-dimensional array,
     *                                        or allow multidimensional array
     * @return array if $flatten is TRUE it will always be a 1-dimensional array with array keys being
     *                                        input names (regardless of whether they are from a subsection or not),
     *                                        and if $flatten is FALSE it can be a multidimensional array
     *                                        where keys are always subsection names and values are either
     *                                        the input's normalized value, or an array like the top-level array
     * @throws EE_Error
     */
    public function _input_values($pretty = false, $include_subform_inputs = false, $flatten = false);


    /**
     * Gets the originally submitted input values from the form
     *
     * @param boolean $include_subforms  Whether to include inputs from subforms,
     *                                   or just this forms' direct children inputs
     * @return array                     if $flatten is TRUE it will always be a 1-dimensional array
     *                                   with array keys being input names
     *                                   (regardless of whether they are from a subsection or not),
     *                                   and if $flatten is FALSE it can be a multidimensional array
     *                                   where keys are always subsection names and values are either
     *                                   the input's normalized value, or an array like the top-level array
     * @throws EE_Error
     */
    public function submitted_values($include_subforms = false);


    /**
     * Indicates whether or not this form has received a submission yet
     * (ie, had receive_form_submission called on it yet)
     *
     * @return boolean
     * @throws EE_Error
     */
    public function has_received_submission();


    /**
     * Equivalent to passing 'exclude' in the constructor's options array.
     * Removes the listed inputs from the form
     *
     * @param array $inputs_to_exclude values are the input names
     * @return void
     */
    public function exclude(array $inputs_to_exclude = []);


    /**
     * Changes these inputs' display strategy to be EE_Hidden_Display_Strategy.
     *
     * @param array $inputs_to_hide
     * @throws EE_Error
     */
    public function hide(array $inputs_to_hide = []);


    /**
     * add_subsections
     * Adds the listed subsections to the form section.
     * If $subsection_name_to_target is provided,
     * then new subsections are added before or after that subsection,
     * otherwise to the start or end of the entire subsections array.
     *
     * @param EE_Form_Section_Base[] $new_subsections           array of new form subsections
     *                                                          where keys are their names
     * @param string                 $subsection_name_to_target an existing for section that $new_subsections
     *                                                          should be added before or after
     *                                                          IF $subsection_name_to_target is null,
     *                                                          then $new_subsections will be added to
     *                                                          the beginning or end of the entire subsections array
     * @param boolean                $add_before                whether to add $new_subsections, before or after
     *                                                          $subsection_name_to_target,
     *                                                          or if $subsection_name_to_target is null,
     *                                                          before or after entire subsections array
     * @return void
     * @throws EE_Error
     */
    public function add_subsections($new_subsections, $subsection_name_to_target = null, $add_before = true);


    /**
     * @param string $subsection_name
     * @param bool   $recursive
     * @return bool
     */
    public function has_subsection($subsection_name, $recursive = false);


    /**
     * Just gets all validatable subsections to clean their sensitive data
     *
     * @throws EE_Error
     */
    public function clean_sensitive_data();


    /**
     * Sets the submission error message (aka validation error message for this form section and all sub-sections)
     *
     * @param string                      $form_submission_error_message
     * @param EE_Form_Section_Validatable $form_section unused
     * @throws EE_Error
     */
    public function set_submission_error_message($form_submission_error_message = '');


    /**
     * Returns the cached error message. A default value is set for this during _validate(),
     * (called during receive_form_submission) but it can be explicitly set using
     * set_submission_error_message
     *
     * @return string
     */
    public function submission_error_message();


    /**
     * Sets a message to display if the data submitted to the form was valid.
     *
     * @param string $form_submission_success_message
     */
    public function set_submission_success_message($form_submission_success_message = '');


    /**
     * Gets a message appropriate for display when the form is correctly submitted
     *
     * @return string
     */
    public function submission_success_message();


    /**
     * Returns the prefix that should be used on child of this form section for
     * their html names. If this form section itself has a parent, prepends ITS
     * prefix onto this form section's prefix. Used primarily by
     * EE_Form_Input_Base::_set_default_html_name_if_empty
     *
     * @return string
     * @throws EE_Error
     */
    public function html_name_prefix();


    /**
     * Gets the name, but first checks _construct_finalize has been called. If not,
     * calls it (assumes there is no parent and that we want the name to be whatever
     * was set, which is probably nothing, or the classname)
     *
     * @return string
     * @throws EE_Error
     */
    public function name();


    /**
     * @return EE_Form_Section_Proper
     * @throws EE_Error
     */
    public function parent_section();


    /**
     * make sure construction finalized was called, otherwise children might not be ready
     *
     * @return void
     * @throws EE_Error
     */
    public function ensure_construct_finalized_called();


    /**
     * Checks if any of this form section's inputs, or any of its children's inputs,
     * are in teh form data. If any are found, returns true. Else false
     *
     * @param array $req_data
     * @return boolean
     * @throws EE_Error
     */
    public function form_data_present_in($req_data = null);


    /**
     * Gets validation errors for this form section and subsections
     * Similar to EE_Form_Section_Validatable::get_validation_errors() except this
     * gets the validation errors for ALL subsection
     *
     * @return EE_Validation_Error[]
     * @throws EE_Error
     */
    public function get_validation_errors_accumulated();


    /**
     * This isn't just the name of an input, it's a path pointing to an input. The
     * path is similar to a folder path: slash (/) means to descend into a subsection,
     * dot-dot-slash (../) means to ascend into the parent section.
     * After a series of slashes and dot-dot-slashes, there should be the name of an input,
     * which will be returned.
     * Eg, if you want the related input to be conditional on a sibling input name 'foobar'
     * just use 'foobar'. If you want it to be conditional on an aunt/uncle input name
     * 'baz', use '../baz'. If you want it to be conditional on a cousin input,
     * the child of 'baz_section' named 'baz_child', use '../baz_section/baz_child'.
     * Etc
     *
     * @param string|false $form_section_path we accept false also because substr( '../', '../' ) = false
     * @return EE_Form_Section_Base
     * @throws EE_Error
     */
    public function find_section_from_path($form_section_path);
}
