<?php

/**
 * For containing info about a non-field form section, which contains other form sections/fields.
 * Relies heavily on the script form_section_validation.js for client-side validation, mostly
 * the php code just provides form_section_validation.js with teh variables to use.
 * Important: in order for the JS to be loaded properly, you must construct a form section
 * before the hook wp_enqueue_scripts is called (so that the form section can enqueue its needed scripts).
 * However, you may output the form (usually by calling get_html) anywhere you like.
 */
class EE_Form_Section_Proper extends EE_Form_Section_Validatable
{

    const SUBMITTED_FORM_DATA_SSN_KEY = 'submitted_form_data';

    /**
     * Subsections
     *
     * @var EE_Form_Section_Validatable[]
     */
    protected $_subsections = array();

    /**
     * Strategy for laying out the form
     *
     * @var EE_Form_Section_Layout_Base
     */
    protected $_layout_strategy;

    /**
     * Whether or not this form has received and validated a form submission yet
     *
     * @var boolean
     */
    protected $_received_submission = false;

    /**
     * message displayed to users upon successful form submission
     *
     * @var string
     */
    protected $_form_submission_success_message = '';

    /**
     * message displayed to users upon unsuccessful form submission
     *
     * @var string
     */
    protected $_form_submission_error_message = '';

    /**
     * Stores all the data that will localized for form validation
     *
     * @var array
     */
    static protected $_js_localization = array();

    /**
     * whether or not the form's localized validation JS vars have been set
     *
     * @type boolean
     */
    static protected $_scripts_localized = false;



    /**
     * when constructing a proper form section, calls _construct_finalize on children
     * so that they know who their parent is, and what name they've been given.
     *
     * @param array $options_array   {
     * @type        $subsections     EE_Form_Section_Validatable[] where keys are the section's name
     * @type        $include         string[] numerically-indexed where values are section names to be included,
     *                               and in that order. This is handy if you want
     *                               the subsections to be ordered differently than the default, and if you override
     *                               which fields are shown
     * @type        $exclude         string[] values are subsections to be excluded. This is handy if you want
     *                               to remove certain default subsections (note: if you specify BOTH 'include' AND
     *                               'exclude', the inclusions will be applied first, and the exclusions will exclude
     *                               items from that list of inclusions)
     * @type        $layout_strategy EE_Form_Section_Layout_Base strategy for laying out the form
     *                               } @see EE_Form_Section_Validatable::__construct()
     * @throws \EE_Error
     */
    public function __construct($options_array = array())
    {
        $options_array = (array)apply_filters('FHEE__EE_Form_Section_Proper___construct__options_array', $options_array,
            $this);
        //call parent first, as it may be setting the name
        parent::__construct($options_array);
        //if they've included subsections in the constructor, add them now
        if (isset($options_array['include'])) {
            //we are going to make sure we ONLY have those subsections to include
            //AND we are going to make sure they're in that specified order
            $reordered_subsections = array();
            foreach ($options_array['include'] as $input_name) {
                if (isset($this->_subsections[$input_name])) {
                    $reordered_subsections[$input_name] = $this->_subsections[$input_name];
                }
            }
            $this->_subsections = $reordered_subsections;
        }
        if (isset($options_array['exclude'])) {
            $exclude = $options_array['exclude'];
            $this->_subsections = array_diff_key($this->_subsections, array_flip($exclude));
        }
        if (isset($options_array['layout_strategy'])) {
            $this->_layout_strategy = $options_array['layout_strategy'];
        }
        if (! $this->_layout_strategy) {
            $this->_layout_strategy = is_admin() ? new EE_Admin_Two_Column_Layout() : new EE_Two_Column_Layout();
        }
        $this->_layout_strategy->_construct_finalize($this);
        //ok so we are definitely going to want the forms JS,
        //so enqueue it or remember to enqueue it during wp_enqueue_scripts
        if (did_action('wp_enqueue_scripts') || did_action('admin_enqueue_scripts')) {
            //ok so they've constructed this object after when they should have.
            //just enqueue the generic form scripts and initialize the form immediately in the JS
            \EE_Form_Section_Proper::wp_enqueue_scripts(true);
        } else {
            add_action('wp_enqueue_scripts', array('EE_Form_Section_Proper', 'wp_enqueue_scripts'));
            add_action('admin_enqueue_scripts', array('EE_Form_Section_Proper', 'wp_enqueue_scripts'));
        }
        add_action('wp_footer', array($this, 'ensure_scripts_localized'), 1);

        /**
         * Gives other plugins a chance to hook in before construct finalize is called. The form probably doesn't
         * yet have a parent form section. Since 4.9.32, when this action was introduced, this is the best place to
         * add a subsection onto a form, assuming you don't care what the form section's name, HTML ID, or HTML name etc are.
         * Also see AHEE__EE_Form_Section_Proper___construct_finalize__end
         * @since 4.9.32
         * @param EE_Form_Section_Proper $this before __construct is done, but all of its logic, except maybe calling
         *                                      _construct_finalize has been done
         * @param array $options_array options passed into the constructor
         */
        do_action('AHEE__EE_Form_Input_Base___construct__before_construct_finalize_called', $this, $options_array);

        if (isset($options_array['name'])) {
            $this->_construct_finalize(null, $options_array['name']);
        }
    }



    /**
     * Finishes construction given the parent form section and this form section's name
     *
     * @param EE_Form_Section_Proper $parent_form_section
     * @param string                 $name
     * @throws \EE_Error
     */
    public function _construct_finalize($parent_form_section, $name)
    {
        parent::_construct_finalize($parent_form_section, $name);
        $this->_set_default_name_if_empty();
        $this->_set_default_html_id_if_empty();
        foreach ($this->_subsections as $subsection_name => $subsection) {
            if ($subsection instanceof EE_Form_Section_Base) {
                $subsection->_construct_finalize($this, $subsection_name);
            } else {
                throw new EE_Error(
                    sprintf(
                        __('Subsection "%s" is not an instanceof EE_Form_Section_Base on form "%s". It is a "%s"',
                            'event_espresso'),
                        $subsection_name,
                        get_class($this),
                        $subsection ? get_class($subsection) : __('NULL', 'event_espresso')
                    )
                );
            }
        }
        /**
         * Action performed just after form has been given a name (and HTML ID etc) and is fully constructed.
         * If you have code that should modify the form and needs it and its subsections to have a name, HTML ID (or other attributes derived
         * from the name like the HTML label id, etc), this is where it should be done.
         * This might only happen just before displaying the form, or just before it receives form submission data.
         * If you need to modify the form or its subsections before _construct_finalize is called on it (and we've
         * ensured it has a name, HTML IDs, etc
         * @param EE_Form_Section_Proper $this
         * @param EE_Form_Section_Proper|null $parent_form_section
         * @param string $name
         */
        do_action('AHEE__EE_Form_Section_Proper___construct_finalize__end', $this, $parent_form_section, $name);
    }



    /**
     * Gets the layout strategy for this form section
     *
     * @return EE_Form_Section_Layout_Base
     */
    public function get_layout_strategy()
    {
        return $this->_layout_strategy;
    }



    /**
     * Gets the HTML for a single input for this form section according
     * to the layout strategy
     *
     * @param EE_Form_Input_Base $input
     * @return string
     */
    public function get_html_for_input($input)
    {
        return $this->_layout_strategy->layout_input($input);
    }



    /**
     * was_submitted - checks if form inputs are present in request data
     * Basically an alias for form_data_present_in() (which is used by both
     * proper form sections and form inputs)
     *
     * @param null $form_data
     * @return boolean
     */
    public function was_submitted($form_data = null)
    {
        return $this->form_data_present_in($form_data);
    }



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
     */
    public function receive_form_submission($req_data = null, $validate = true)
    {
        $req_data = apply_filters('FHEE__EE_Form_Section_Proper__receive_form_submission__req_data', $req_data, $this,
            $validate);
        if ($req_data === null) {
            $req_data = array_merge($_GET, $_POST);
        }
        $req_data = apply_filters('FHEE__EE_Form_Section_Proper__receive_form_submission__request_data', $req_data,
            $this);
        $this->_normalize($req_data);
        if ($validate) {
            $this->_validate();
            //if it's invalid, we're going to want to re-display so remember what they submitted
            if (! $this->is_valid()) {
                $this->store_submitted_form_data_in_session();
            }
        }
        do_action('AHEE__EE_Form_Section_Proper__receive_form_submission__end', $req_data, $this, $validate);
    }



    /**
     * caches the originally submitted input values in the session
     * so that they can be used to repopulate the form if it failed validation
     *
     * @return boolean whether or not the data was successfully stored in the session
     */
    protected function store_submitted_form_data_in_session()
    {
        return EE_Registry::instance()->SSN->set_session_data(
            array(
                \EE_Form_Section_Proper::SUBMITTED_FORM_DATA_SSN_KEY => $this->submitted_values(true),
            )
        );
    }



    /**
     * retrieves the originally submitted input values in the session
     * so that they can be used to repopulate the form if it failed validation
     *
     * @return array
     */
    protected function get_submitted_form_data_from_session()
    {
        $session = EE_Registry::instance()->SSN;
        if ($session instanceof EE_Session) {
            return $session->get_session_data(
                \EE_Form_Section_Proper::SUBMITTED_FORM_DATA_SSN_KEY
            );
        } else {
            return array();
        }
    }



    /**
     * flushed the originally submitted input values from the session
     *
     * @return boolean whether or not the data was successfully removed from the session
     */
    protected function flush_submitted_form_data_from_session()
    {
        return EE_Registry::instance()->SSN->reset_data(
            array(\EE_Form_Section_Proper::SUBMITTED_FORM_DATA_SSN_KEY)
        );
    }



    /**
     * Populates this form and its subsections with data from the session.
     * (Wrapper for EE_Form_Section_Proper::receive_form_submission, so it shows
     * validation errors when displaying too)
     * Returns true if the form was populated from the session, false otherwise
     *
     * @return boolean
     */
    public function populate_from_session()
    {
        $form_data_in_session = $this->get_submitted_form_data_from_session();
        if (empty($form_data_in_session)) {
            return false;
        }
        $this->receive_form_submission($form_data_in_session);
        $this->flush_submitted_form_data_from_session();
        if ($this->form_data_present_in($form_data_in_session)) {
            return true;
        } else {
            return false;
        }
    }



    /**
     * Populates the default data for the form, given an array where keys are
     * the input names, and values are their values (preferably normalized to be their
     * proper PHP types, not all strings... although that should be ok too).
     * Proper subsections are sub-arrays, the key being the subsection's name, and
     * the value being an array formatted in teh same way
     *
     * @param array $default_data
     */
    public function populate_defaults($default_data)
    {
        foreach ($this->subsections(false) as $subsection_name => $subsection) {
            if (isset($default_data[$subsection_name])) {
                if ($subsection instanceof EE_Form_Input_Base) {
                    $subsection->set_default($default_data[$subsection_name]);
                } elseif ($subsection instanceof EE_Form_Section_Proper) {
                    $subsection->populate_defaults($default_data[$subsection_name]);
                }
            }
        }
    }



    /**
     * returns true if subsection exists
     *
     * @param string $name
     * @return boolean
     */
    public function subsection_exists($name)
    {
        return isset($this->_subsections[$name]) ? true : false;
    }



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
     * @throws \EE_Error
     */
    public function get_subsection($name, $require_construction_to_be_finalized = true)
    {
        if ($require_construction_to_be_finalized) {
            $this->ensure_construct_finalized_called();
        }
        return $this->subsection_exists($name) ? $this->_subsections[$name] : null;
    }



    /**
     * Gets all the validatable subsections of this form section
     *
     * @return EE_Form_Section_Validatable[]
     */
    public function get_validatable_subsections()
    {
        $validatable_subsections = array();
        foreach ($this->subsections() as $name => $obj) {
            if ($obj instanceof EE_Form_Section_Validatable) {
                $validatable_subsections[$name] = $obj;
            }
        }
        return $validatable_subsections;
    }



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
    public function get_input($name, $require_construction_to_be_finalized = true)
    {
        $subsection = $this->get_subsection($name, $require_construction_to_be_finalized);
        if (! $subsection instanceof EE_Form_Input_Base) {
            throw new EE_Error(
                sprintf(
                    __(
                        "Subsection '%s' is not an instanceof EE_Form_Input_Base on form '%s'. It is a '%s'",
                        'event_espresso'
                    ),
                    $name,
                    get_class($this),
                    $subsection ? get_class($subsection) : __("NULL", 'event_espresso')
                )
            );
        }
        return $subsection;
    }



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
    public function get_proper_subsection($name, $require_construction_to_be_finalized = true)
    {
        $subsection = $this->get_subsection($name, $require_construction_to_be_finalized);
        if (! $subsection instanceof EE_Form_Section_Proper) {
            throw new EE_Error(
                sprintf(
                    __("Subsection '%'s is not an instanceof EE_Form_Section_Proper on form '%s'", 'event_espresso'),
                    $name,
                    get_class($this)
                )
            );
        }
        return $subsection;
    }



    /**
     * Gets the value of the specified input. Should be called after receive_form_submission()
     * or populate_defaults() on the form, where the normalized value on the input is set.
     *
     * @param string $name
     * @return mixed depending on the input's type and its normalization strategy
     * @throws \EE_Error
     */
    public function get_input_value($name)
    {
        $input = $this->get_input($name);
        return $input->normalized_value();
    }



    /**
     * Checks if this form section itself is valid, and then checks its subsections
     *
     * @throws EE_Error
     * @return boolean
     */
    public function is_valid()
    {
        if (! $this->has_received_submission()) {
            throw new EE_Error(
                sprintf(
                    __(
                        "You cannot check if a form is valid before receiving the form submission using receive_form_submission",
                        "event_espresso"
                    )
                )
            );
        }
        if (! parent::is_valid()) {
            return false;
        }
        // ok so no general errors to this entire form section.
        // so let's check the subsections, but only set errors if that hasn't been done yet
        $set_submission_errors = $this->submission_error_message() === '' ? true : false;
        foreach ($this->get_validatable_subsections() as $subsection) {
            if (! $subsection->is_valid() || $subsection->get_validation_error_string() !== '') {
                if ($set_submission_errors) {
                    $this->set_submission_error_message($subsection->get_validation_error_string());
                }
                return false;
            }
        }
        return true;
    }



    /**
     * gets teh default name of this form section if none is specified
     *
     * @return string
     */
    protected function _set_default_name_if_empty()
    {
        if (! $this->_name) {
            $classname = get_class($this);
            $default_name = str_replace("EE_", "", $classname);
            $this->_name = $default_name;
        }
    }



    /**
     * Returns the HTML for the form, except for the form opening and closing tags
     * (as the form section doesn't know where you necessarily want to send the information to),
     * and except for a submit button. Enqueus JS and CSS; if called early enough we will
     * try to enqueue them in the header, otherwise they'll be enqueued in the footer.
     * Not doing_it_wrong because theoretically this CAN be used properly,
     * provided its used during "wp_enqueue_scripts", or it doesn't need to enqueue
     * any CSS.
     *
     * @throws \EE_Error
     */
    public function get_html_and_js()
    {
        $this->enqueue_js();
        return $this->get_html();
    }



    /**
     * returns HTML for displaying this form section. recursively calls display_section() on all subsections
     *
     * @param bool $display_previously_submitted_data
     * @return string
     */
    public function get_html($display_previously_submitted_data = true)
    {
        $this->ensure_construct_finalized_called();
        if ($display_previously_submitted_data) {
            $this->populate_from_session();
        }
        return $this->_form_html_filter
            ? $this->_form_html_filter->filterHtml($this->_layout_strategy->layout_form(), $this)
            : $this->_layout_strategy->layout_form();
    }



    /**
     * enqueues JS and CSS for the form.
     * It is preferred to call this before wp_enqueue_scripts so the
     * scripts and styles can be put in the header, but if called later
     * they will be put in the footer (which is OK for JS, but in HTML4 CSS should
     * only be in the header; but in HTML5 its ok in the body.
     * See http://stackoverflow.com/questions/4957446/load-external-css-file-in-body-tag.
     * So if your form enqueues CSS, it's preferred to call this before wp_enqueue_scripts.)
     *
     * @return string
     * @throws \EE_Error
     */
    public function enqueue_js()
    {
        $this->_enqueue_and_localize_form_js();
        foreach ($this->subsections() as $subsection) {
            $subsection->enqueue_js();
        }
    }



    /**
     * adds a filter so that jquery validate gets enqueued in EE_System::wp_enqueue_scripts().
     * This must be done BEFORE wp_enqueue_scripts() gets called, which is on
     * the wp_enqueue_scripts hook.
     * However, registering the form js and localizing it can happen when we
     * actually output the form (which is preferred, seeing how teh form's fields
     * could change until it's actually outputted)
     *
     * @param boolean $init_form_validation_automatically whether or not we want the form validation
     *                                                    to be triggered automatically or not
     * @return void
     */
    public static function wp_enqueue_scripts($init_form_validation_automatically = true)
    {
        add_filter('FHEE_load_jquery_validate', '__return_true');
        wp_register_script(
            'ee_form_section_validation',
            EE_GLOBAL_ASSETS_URL . 'scripts' . DS . 'form_section_validation.js',
            array('jquery-validate', 'jquery-ui-datepicker', 'jquery-validate-extra-methods'),
            EVENT_ESPRESSO_VERSION,
            true
        );
        wp_localize_script(
            'ee_form_section_validation',
            'ee_form_section_validation_init',
            array('init' => $init_form_validation_automatically ? true : false)
        );
    }



    /**
     * gets the variables used by form_section_validation.js.
     * This needs to be called AFTER we've called $this->_enqueue_jquery_validate_script,
     * but before the wordpress hook wp_loaded
     *
     * @throws \EE_Error
     */
    public function _enqueue_and_localize_form_js()
    {
        $this->ensure_construct_finalized_called();
        //actually, we don't want to localize just yet. There may be other forms on the page.
        //so we need to add our form section data to a static variable accessible by all form sections
        //and localize it just before the footer
        $this->localize_validation_rules();
        add_action('wp_footer', array('EE_Form_Section_Proper', 'localize_script_for_all_forms'), 2);
        add_action('admin_footer', array('EE_Form_Section_Proper', 'localize_script_for_all_forms'));
    }



    /**
     * add our form section data to a static variable accessible by all form sections
     *
     * @param bool $return_for_subsection
     * @return void
     * @throws \EE_Error
     */
    public function localize_validation_rules($return_for_subsection = false)
    {
        // we only want to localize vars ONCE for the entire form,
        // so if the form section doesn't have a parent, then it must be the top dog
        if ($return_for_subsection || ! $this->parent_section()) {
            EE_Form_Section_Proper::$_js_localization['form_data'][$this->html_id()] = array(
                'form_section_id'  => $this->html_id(true),
                'validation_rules' => $this->get_jquery_validation_rules(),
                'other_data'       => $this->get_other_js_data(),
                'errors'           => $this->subsection_validation_errors_by_html_name(),
            );
            EE_Form_Section_Proper::$_scripts_localized = true;
        }
    }



    /**
     * Gets an array of extra data that will be useful for client-side javascript.
     * This is primarily data added by inputs and forms in addition to any
     * scripts they might enqueue
     *
     * @param array $form_other_js_data
     * @return array
     */
    public function get_other_js_data($form_other_js_data = array())
    {
        foreach ($this->subsections() as $subsection) {
            $form_other_js_data = $subsection->get_other_js_data($form_other_js_data);
        }
        return $form_other_js_data;
    }



    /**
     * Gets a flat array of inputs for this form section and its subsections.
     * Keys are their form names, and values are the inputs themselves
     *
     * @return EE_Form_Input_Base
     */
    public function inputs_in_subsections()
    {
        $inputs = array();
        foreach ($this->subsections() as $subsection) {
            if ($subsection instanceof EE_Form_Input_Base) {
                $inputs[$subsection->html_name()] = $subsection;
            } elseif ($subsection instanceof EE_Form_Section_Proper) {
                $inputs += $subsection->inputs_in_subsections();
            }
        }
        return $inputs;
    }



    /**
     * Gets a flat array of all the validation errors.
     * Keys are html names (because those should be unique)
     * and values are a string of all their validation errors
     *
     * @return string[]
     */
    public function subsection_validation_errors_by_html_name()
    {
        $inputs = $this->inputs();
        $errors = array();
        foreach ($inputs as $form_input) {
            if ($form_input instanceof EE_Form_Input_Base && $form_input->get_validation_errors()) {
                $errors[$form_input->html_name()] = $form_input->get_validation_error_string();
            }
        }
        return $errors;
    }



    /**
     * passes all the form data required by the JS to the JS, and enqueues the few required JS files.
     * Should be setup by each form during the _enqueues_and_localize_form_js
     */
    public static function localize_script_for_all_forms()
    {
        //allow inputs and stuff to hook in their JS and stuff here
        do_action('AHEE__EE_Form_Section_Proper__localize_script_for_all_forms__begin');
        EE_Form_Section_Proper::$_js_localization['localized_error_messages'] = EE_Form_Section_Proper::_get_localized_error_messages();
        $email_validation_level = isset(EE_Registry::instance()->CFG->registration->email_validation_level)
            ? EE_Registry::instance()->CFG->registration->email_validation_level
            : 'wp_default';
        EE_Form_Section_Proper::$_js_localization['email_validation_level'] = $email_validation_level;
        wp_enqueue_script('ee_form_section_validation');
        wp_localize_script(
            'ee_form_section_validation',
            'ee_form_section_vars',
            EE_Form_Section_Proper::$_js_localization
        );
    }



    /**
     * ensure_scripts_localized
     */
    public function ensure_scripts_localized()
    {
        if (! EE_Form_Section_Proper::$_scripts_localized) {
            $this->_enqueue_and_localize_form_js();
        }
    }



    /**
     * Gets the hard-coded validation error messages to be used in the JS. The convention
     * is that the key here should be the same as the custom validation rule put in the JS file
     *
     * @return array keys are custom validation rules, and values are internationalized strings
     */
    private static function _get_localized_error_messages()
    {
        return array(
            'validUrl' => __("This is not a valid absolute URL. Eg, http://domain.com/monkey.jpg", "event_espresso"),
            'regex'    => __('Please check your input', 'event_espresso'),
        );
    }



    /**
     * @return array
     */
    public static function js_localization()
    {
        return self::$_js_localization;
    }



    /**
     * @return array
     */
    public static function reset_js_localization()
    {
        self::$_js_localization = array();
    }



    /**
     * Gets the JS to put inside the jquery validation rules for subsection of this form section.
     * See parent function for more...
     *
     * @return array
     */
    public function get_jquery_validation_rules()
    {
        $jquery_validation_rules = array();
        foreach ($this->get_validatable_subsections() as $subsection) {
            $jquery_validation_rules = array_merge(
                $jquery_validation_rules,
                $subsection->get_jquery_validation_rules()
            );
        }
        return $jquery_validation_rules;
    }



    /**
     * Sanitizes all the data and sets the sanitized value of each field
     *
     * @param array $req_data like $_POST
     * @return void
     */
    protected function _normalize($req_data)
    {
        $this->_received_submission = true;
        $this->_validation_errors = array();
        foreach ($this->get_validatable_subsections() as $subsection) {
            try {
                $subsection->_normalize($req_data);
            } catch (EE_Validation_Error $e) {
                $subsection->add_validation_error($e);
            }
        }
    }



    /**
     * Performs validation on this form section and its subsections.
     * For each subsection,
     * calls _validate_{subsection_name} on THIS form (if the function exists)
     * and passes it the subsection, then calls _validate on that subsection.
     * If you need to perform validation on the form as a whole (considering multiple)
     * you would be best to override this _validate method,
     * calling parent::_validate() first.
     */
    protected function _validate()
    {
        foreach ($this->get_validatable_subsections() as $subsection_name => $subsection) {
            if (method_exists($this, '_validate_' . $subsection_name)) {
                call_user_func_array(array($this, '_validate_' . $subsection_name), array($subsection));
            }
            $subsection->_validate();
        }
    }



    /**
     * Gets all the validated inputs for the form section
     *
     * @return array
     */
    public function valid_data()
    {
        $inputs = array();
        foreach ($this->subsections() as $subsection_name => $subsection) {
            if ($subsection instanceof EE_Form_Section_Proper) {
                $inputs[$subsection_name] = $subsection->valid_data();
            } else if ($subsection instanceof EE_Form_Input_Base) {
                $inputs[$subsection_name] = $subsection->normalized_value();
            }
        }
        return $inputs;
    }



    /**
     * Gets all the inputs on this form section
     *
     * @return EE_Form_Input_Base[]
     */
    public function inputs()
    {
        $inputs = array();
        foreach ($this->subsections() as $subsection_name => $subsection) {
            if ($subsection instanceof EE_Form_Input_Base) {
                $inputs[$subsection_name] = $subsection;
            }
        }
        return $inputs;
    }



    /**
     * Gets all the subsections which are a proper form
     *
     * @return EE_Form_Section_Proper[]
     */
    public function subforms()
    {
        $form_sections = array();
        foreach ($this->subsections() as $name => $obj) {
            if ($obj instanceof EE_Form_Section_Proper) {
                $form_sections[$name] = $obj;
            }
        }
        return $form_sections;
    }



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
     */
    public function subsections($require_construction_to_be_finalized = true)
    {
        if ($require_construction_to_be_finalized) {
            $this->ensure_construct_finalized_called();
        }
        return $this->_subsections;
    }



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
     */
    public function input_values($include_subform_inputs = false, $flatten = false)
    {
        return $this->_input_values(false, $include_subform_inputs, $flatten);
    }



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
     */
    public function input_pretty_values($include_subform_inputs = false, $flatten = false)
    {
        return $this->_input_values(true, $include_subform_inputs, $flatten);
    }



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
     */
    public function _input_values($pretty = false, $include_subform_inputs = false, $flatten = false)
    {
        $input_values = array();
        foreach ($this->subsections() as $subsection_name => $subsection) {
            if ($subsection instanceof EE_Form_Input_Base) {
                $input_values[$subsection_name] = $pretty
                    ? $subsection->pretty_value()
                    : $subsection->normalized_value();
            } else if ($subsection instanceof EE_Form_Section_Proper && $include_subform_inputs) {
                $subform_input_values = $subsection->_input_values($pretty, $include_subform_inputs, $flatten);
                if ($flatten) {
                    $input_values = array_merge($input_values, $subform_input_values);
                } else {
                    $input_values[$subsection_name] = $subform_input_values;
                }
            }
        }
        return $input_values;
    }



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
     */
    public function submitted_values($include_subforms = false)
    {
        $submitted_values = array();
        foreach ($this->subsections() as $subsection) {
            if ($subsection instanceof EE_Form_Input_Base) {
                // is this input part of an array of inputs?
                if (strpos($subsection->html_name(), '[') !== false) {
                    $full_input_name = \EEH_Array::convert_array_values_to_keys(
                        explode('[', str_replace(']', '', $subsection->html_name())),
                        $subsection->raw_value()
                    );
                    $submitted_values = array_replace_recursive($submitted_values, $full_input_name);
                } else {
                    $submitted_values[$subsection->html_name()] = $subsection->raw_value();
                }
            } else if ($subsection instanceof EE_Form_Section_Proper && $include_subforms) {
                $subform_input_values = $subsection->submitted_values($include_subforms);
                $submitted_values = array_replace_recursive($submitted_values, $subform_input_values);
            }
        }
        return $submitted_values;
    }



    /**
     * Indicates whether or not this form has received a submission yet
     * (ie, had receive_form_submission called on it yet)
     *
     * @return boolean
     * @throws \EE_Error
     */
    public function has_received_submission()
    {
        $this->ensure_construct_finalized_called();
        return $this->_received_submission;
    }



    /**
     * Equivalent to passing 'exclude' in the constructor's options array.
     * Removes the listed inputs from the form
     *
     * @param array $inputs_to_exclude values are the input names
     * @return void
     */
    public function exclude(array $inputs_to_exclude = array())
    {
        foreach ($inputs_to_exclude as $input_to_exclude_name) {
            unset($this->_subsections[$input_to_exclude_name]);
        }
    }



    /**
     * @param array $inputs_to_hide
     * @throws \EE_Error
     */
    public function hide(array $inputs_to_hide = array())
    {
        foreach ($inputs_to_hide as $input_to_hide) {
            $input = $this->get_input($input_to_hide);
            $input->set_display_strategy(new EE_Hidden_Display_Strategy());
        }
    }



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
     * @throws \EE_Error
     */
    public function add_subsections($new_subsections, $subsection_name_to_target = null, $add_before = true)
    {
        foreach ($new_subsections as $subsection_name => $subsection) {
            if (! $subsection instanceof EE_Form_Section_Base) {
                EE_Error::add_error(
                    sprintf(
                        __(
                            "Trying to add a %s as a subsection (it was named '%s') to the form section '%s'. It was removed.",
                            "event_espresso"
                        ),
                        get_class($subsection),
                        $subsection_name,
                        $this->name()
                    )
                );
                unset($new_subsections[$subsection_name]);
            }
        }
        $this->_subsections = EEH_Array::insert_into_array(
            $this->_subsections,
            $new_subsections,
            $subsection_name_to_target,
            $add_before
        );
        if ($this->_construction_finalized) {
            foreach ($this->_subsections as $name => $subsection) {
                $subsection->_construct_finalize($this, $name);
            }
        }
    }



    /**
     * Just gets all validatable subsections to clean their sensitive data
     */
    public function clean_sensitive_data()
    {
        foreach ($this->get_validatable_subsections() as $subsection) {
            $subsection->clean_sensitive_data();
        }
    }



    /**
     * @param string $form_submission_error_message
     */
    public function set_submission_error_message($form_submission_error_message = '')
    {
        $this->_form_submission_error_message .= ! empty($form_submission_error_message)
            ? $form_submission_error_message
            : __('Form submission failed due to errors', 'event_espresso');
    }



    /**
     * @return string
     */
    public function submission_error_message()
    {
        return $this->_form_submission_error_message;
    }



    /**
     * @param string $form_submission_success_message
     */
    public function set_submission_success_message($form_submission_success_message)
    {
        $this->_form_submission_success_message .= ! empty($form_submission_success_message)
            ? $form_submission_success_message
            : __('Form submitted successfully', 'event_espresso');
    }



    /**
     * @return string
     */
    public function submission_success_message()
    {
        return $this->_form_submission_success_message;
    }



    /**
     * Returns the prefix that should be used on child of this form section for
     * their html names. If this form section itself has a parent, prepends ITS
     * prefix onto this form section's prefix. Used primarily by
     * EE_Form_Input_Base::_set_default_html_name_if_empty
     *
     * @return string
     * @throws \EE_Error
     */
    public function html_name_prefix()
    {
        if ($this->parent_section() instanceof EE_Form_Section_Proper) {
            return $this->parent_section()->html_name_prefix() . '[' . $this->name() . ']';
        } else {
            return $this->name();
        }
    }



    /**
     * Gets the name, but first checks _construct_finalize has been called. If not,
     * calls it (assumes there is no parent and that we want the name to be whatever
     * was set, which is probably nothing, or the classname)
     *
     * @return string
     * @throws \EE_Error
     */
    public function name()
    {
        $this->ensure_construct_finalized_called();
        return parent::name();
    }



    /**
     * @return EE_Form_Section_Proper
     * @throws \EE_Error
     */
    public function parent_section()
    {
        $this->ensure_construct_finalized_called();
        return parent::parent_section();
    }



    /**
     * make sure construction finalized was called, otherwise children might not be ready
     *
     * @return void
     * @throws \EE_Error
     */
    public function ensure_construct_finalized_called()
    {
        if (! $this->_construction_finalized) {
            $this->_construct_finalize($this->_parent_section, $this->_name);
        }
    }



    /**
     * Checks if any of this form section's inputs, or any of its children's inputs,
     * are in teh form data. If any are found, returns true. Else false
     *
     * @param array $req_data
     * @return boolean
     */
    public function form_data_present_in($req_data = null)
    {
        if ($req_data === null) {
            $req_data = $_POST;
        }
        foreach ($this->subsections() as $subsection) {
            if ($subsection instanceof EE_Form_Input_Base) {
                if ($subsection->form_data_present_in($req_data)) {
                    return true;
                }
            } elseif ($subsection instanceof EE_Form_Section_Proper) {
                if ($subsection->form_data_present_in($req_data)) {
                    return true;
                }
            }
        }
        return false;
    }



    /**
     * Gets validation errors for this form section and subsections
     * Similar to EE_Form_Section_Validatable::get_validation_errors() except this
     * gets the validation errors for ALL subsection
     *
     * @return EE_Validation_Error[]
     */
    public function get_validation_errors_accumulated()
    {
        $validation_errors = $this->get_validation_errors();
        foreach ($this->get_validatable_subsections() as $subsection) {
            if ($subsection instanceof EE_Form_Section_Proper) {
                $validation_errors_on_this_subsection = $subsection->get_validation_errors_accumulated();
            } else {
                $validation_errors_on_this_subsection = $subsection->get_validation_errors();
            }
            if ($validation_errors_on_this_subsection) {
                $validation_errors = array_merge($validation_errors, $validation_errors_on_this_subsection);
            }
        }
        return $validation_errors;
    }



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
     */
    public function find_section_from_path($form_section_path)
    {
        //check if we can find the input from purely going straight up the tree
        $input = parent::find_section_from_path($form_section_path);
        if ($input instanceof EE_Form_Section_Base) {
            return $input;
        }
        $next_slash_pos = strpos($form_section_path, '/');
        if ($next_slash_pos !== false) {
            $child_section_name = substr($form_section_path, 0, $next_slash_pos);
            $subpath = substr($form_section_path, $next_slash_pos + 1);
        } else {
            $child_section_name = $form_section_path;
            $subpath = '';
        }
        $child_section = $this->get_subsection($child_section_name);
        if ($child_section instanceof EE_Form_Section_Base) {
            return $child_section->find_section_from_path($subpath);
        } else {
            return null;
        }
    }

}

