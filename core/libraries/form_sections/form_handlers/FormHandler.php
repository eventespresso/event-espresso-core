<?php
namespace EventEspresso\core\libraries\form_sections\form_handlers;

use EE_Submit_Input;
use EEH_HTML;
use InvalidArgumentException;
use LogicException;
use DomainException;
use EE_Form_Section_Proper;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidFormSubmissionException;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class FormHandler
 * abstract parent class for handling the last mile of boilerplate client code required
 * for displaying and processing a typical form.
 * allow your form to integrate with other systems that utilize the
 * \EventEspresso\core\libraries\form_sections\form_handlers\FormHandlerInterface interface
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
abstract class FormHandler implements FormHandlerInterface{

	/**
	 * will add opening and closing HTML form tags as well as a submit button
	 */
	const ADD_FORM_TAGS_AND_SUBMIT = 'add_form_tags_and_submit';

	/**
	 * will add opening and closing HTML form tags but NOT a submit button
	 */
	const ADD_FORM_TAGS_ONLY = 'add_form_tags_only';

	/**
	 * will NOT add opening and closing HTML form tags but will add a submit button
	 */
	const ADD_FORM_SUBMIT_ONLY = 'add_form_submit_only';

	/**
	 * will NOT add opening and closing HTML form tags NOR a submit button
	 */
	const DO_NOT_SETUP_FORM = 'do_not_setup_form';

	/**
	 * if set to false, then this form has no displayable content,
	 * and will only be used for processing data sent passed via GET or POST
	 * defaults to true ( ie: form has displayable content )
	 *
	 * @var boolean $displayable
	 */
	private $displayable = true;

	/**
	 * @var string $form_name
	 */
	private $form_name;

	/**
	 * @var string $admin_name
	 */
	private $admin_name;

	/**
	 * @var string $slug
	 */
	private $slug;

	/**
	 * @var string $submit_btn_text
	 */
	private $submit_btn_text;

	/**
	 * @var string $form_action
	 */
	private $form_action;

	/**
	 * form params in key value pairs
	 * can be added to form action URL or as hidden inputs
	 *
	 * @var array $form_args
	 */
	private $form_args = array();

	/**
	 * value of one of the string constant above
	 *
	 * @var string $form_config
	 */
	private $form_config;

	/**
	 * whether or not the form was determined to be invalid
	 *
	 * @var boolean $form_has_errors
	 */
	private $form_has_errors;

	/**
	 * the absolute top level form section being used on the page
	 *
	 * @var \EE_Form_Section_Proper $form
	 */
	private $form;

	/**
	 * @var \EE_Registry $registry
	 */
	protected $registry;



    /**
     * Form constructor.
     *
     * @param string       $form_name
     * @param string       $admin_name
     * @param string       $slug
     * @param string       $form_action
     * @param string       $form_config
     * @param \EE_Registry $registry
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \DomainException
     * @throws \InvalidArgumentException
     */
	public function __construct(
		$form_name,
		$admin_name,
		$slug,
		$form_action = '',
		$form_config = FormHandler::ADD_FORM_TAGS_AND_SUBMIT,
		\EE_Registry $registry
	) {
		$this->setFormName( $form_name );
		$this->setAdminName( $admin_name );
		$this->setSlug( $slug );
		$this->setFormAction( $form_action );
		$this->setFormConfig( $form_config );
		$this->setSubmitBtnText( __( 'Submit', 'event_espresso' ) );
		$this->registry = $registry;
	}



	/**
	 * @return array
	 */
	public static function getFormConfigConstants() {
		return array(
			FormHandler::ADD_FORM_TAGS_AND_SUBMIT,
			FormHandler::ADD_FORM_TAGS_ONLY,
			FormHandler::ADD_FORM_SUBMIT_ONLY,
			FormHandler::DO_NOT_SETUP_FORM,
		);
	}



	/**
	 * @param bool $for_display
	 * @return \EE_Form_Section_Proper
	 * @throws \EE_Error
	 * @throws \LogicException
	 */
	public function form( $for_display = false ) {
        if ( ! $this->formIsValid() ) {
			return null;
		}
		if ( $for_display ) {
			$form_config = $this->formConfig();
			if (
				$form_config === FormHandler::ADD_FORM_TAGS_AND_SUBMIT
				|| $form_config === FormHandler::ADD_FORM_SUBMIT_ONLY
			) {
				$this->appendSubmitButton();
				$this->clearFormButtonFloats();
			}
		}
		return $this->form;
	}



	/**
	 * @return boolean
	 * @throws LogicException
	 */
	public function formIsValid() {
        if ( ! $this->form instanceof \EE_Form_Section_Proper ) {
			static $generated = false;
			if ( ! $generated ) {
				$generated = true;
				$form = $this->generate();
                if ( $form instanceof \EE_Form_Section_Proper) {
                    $this->setForm($form);
                }
			}
			return $this->verifyForm();
		}
		return true;
	}



	/**
	 * @return boolean
	 * @throws LogicException
	 */
	public function verifyForm() {
		if ( $this->form instanceof \EE_Form_Section_Proper ) {
			return true;
		}
		throw new LogicException(
			sprintf(
				__( 'The "%1$s" form is invalid or missing', 'event_espresso' ),
				$this->form_name
			)
		);
	}



	/**
	 * @param \EE_Form_Section_Proper $form
	 */
	public function setForm( \EE_Form_Section_Proper $form ) {
		$this->form = $form;
	}



	/**
	 * @return boolean
	 */
	public function displayable() {
		return $this->displayable;
	}



	/**
	 * @param boolean $displayable
	 */
	public function setDisplayable( $displayable = false ) {
		$this->displayable = filter_var( $displayable, FILTER_VALIDATE_BOOLEAN );
	}



	/**
	 * a public name for the form that can be displayed on the frontend of a site
	 *
	 * @return string
	 */
	public function formName() {
		return $this->form_name;
	}



	/**
	 * @param string $form_name
	 * @throws InvalidDataTypeException
	 */
	public function setFormName( $form_name ) {
		if ( ! is_string( $form_name ) ) {
			throw new InvalidDataTypeException( '$form_name', $form_name, 'string' );
		}
		$this->form_name = $form_name;
	}



	/**
	 * a public name for the form that can be displayed, but only in the admin
	 *
	 * @return string
	 */
	public function adminName() {
		return $this->admin_name;
	}



	/**
	 * @param string $admin_name
	 * @throws InvalidDataTypeException
	 */
	public function setAdminName( $admin_name ) {
		if ( ! is_string( $admin_name ) ) {
			throw new InvalidDataTypeException( '$admin_name', $admin_name, 'string' );
		}
		$this->admin_name = $admin_name;
	}



	/**
	 * a URL friendly string that can be used for identifying the form
	 *
	 * @return string
	 */
	public function slug() {
		return $this->slug;
	}



	/**
	 * @param string $slug
	 * @throws InvalidDataTypeException
	 */
	public function setSlug( $slug ) {
		if ( ! is_string( $slug ) ) {
			throw new InvalidDataTypeException( '$slug', $slug, 'string' );
		}
		$this->slug = $slug;
	}



	/**
	 * @return string
	 */
	public function submitBtnText() {
		return $this->submit_btn_text;
	}



    /**
     * @param string $submit_btn_text
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \InvalidArgumentException
     */
	public function setSubmitBtnText( $submit_btn_text ) {
		if ( ! is_string( $submit_btn_text ) ) {
			throw new InvalidDataTypeException( '$submit_btn_text', $submit_btn_text, 'string' );
		}
		if ( empty( $submit_btn_text ) ) {
			throw new InvalidArgumentException(
				__( 'Can not set Submit button text because an empty string was provided.', 'event_espresso' )
			);
		}
		$this->submit_btn_text = $submit_btn_text;
	}



	/**
	 * @return string
	 */
	public function formAction() {
		return ! empty( $this->form_args )
			? add_query_arg( $this->form_args, $this->form_action )
			: $this->form_action;
	}



	/**
	 * @param string $form_action
	 * @throws InvalidDataTypeException
	 */
	public function setFormAction( $form_action ) {
		if ( ! is_string( $form_action ) ) {
			throw new InvalidDataTypeException( '$form_action', $form_action, 'string' );
		}
		$this->form_action = $form_action;
	}



	/**
	 * @param array $form_args
	 * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
	 * @throws \InvalidArgumentException
	 */
	public function addFormActionArgs( $form_args = array() ) {
		if ( is_object( $form_args ) ) {
			throw new InvalidDataTypeException(
				'$form_args',
				$form_args,
				'anything other than an object was expected.'
			);
		}
		if ( empty( $form_args ) ) {
			throw new InvalidArgumentException(
				__( 'The redirect arguments can not be an empty array.', 'event_espresso' )
			);
		}
		$this->form_args = array_merge( $this->form_args, $form_args );
	}



	/**
	 * @return string
	 */
	public function formConfig() {
		return $this->form_config;
	}



	/**
	 * @param string $form_config
	 * @throws DomainException
	 */
	public function setFormConfig( $form_config ) {
		if (
			! in_array(
				$form_config,
				array(
					FormHandler::ADD_FORM_TAGS_AND_SUBMIT,
					FormHandler::ADD_FORM_TAGS_ONLY,
					FormHandler::ADD_FORM_SUBMIT_ONLY,
					FormHandler::DO_NOT_SETUP_FORM
				)
			)
		) {
			throw new DomainException(
				sprintf(
					__( '"%1$s" is not a valid value for the form config. Please use one of the class constants on \EventEspresso\core\libraries\form_sections\form_handlers\Form', 'event_espresso' ),
					$form_config
				)
			);
		}
		$this->form_config = $form_config;
	}



	/**
	 * called after the form is instantiated
	 * and used for performing any logic that needs to occur early
	 * before any of the other methods are called.
	 * returns true if everything is ok to proceed,
	 * and false if no further form logic should be implemented
	 *
	 * @return boolean
	 */
	public function initialize() {
		$this->form_has_errors = \EE_Error::has_error( true );
		return true;
	}



	/**
	 * used for setting up css and js
	 *
	 * @return void
	 * @throws LogicException
	 * @throws \EE_Error
	 */
	public function enqueueStylesAndScripts() {
		$this->form( false )->enqueue_js();

	}



	/**
	 * creates and returns the actual form
	 *
	 * @return EE_Form_Section_Proper
	 */
	abstract public function generate() ;



	/**
	 * creates and returns an EE_Submit_Input labeled "Submit"
	 *
	 * @param string $text
	 * @return \EE_Submit_Input
	 */
	public function generateSubmitButton( $text = '' ) {
		$text = ! empty( $text ) ? $text : $this->submitBtnText();
		return new EE_Submit_Input(
			array(
				'html_name'             => 'ee-form-submit-' . $this->slug(),
				'html_id'               => 'ee-form-submit-' . $this->slug(),
				'html_class'            => 'ee-form-submit',
				'html_label'            => '&nbsp;',
				'other_html_attributes' => ' rel="' . $this->slug() . '"',
				'default'               => $text
			)
		);
	}



	/**
	 * calls generateSubmitButton() and appends it onto the form along with a float clearing div
	 *
	 * @param string $text
	 * @return void
	 * @throws \LogicException
	 * @throws \EE_Error
	 */
	public function appendSubmitButton( $text = '' ) {
		if ( $this->form->subsection_exists( $this->slug() . '-submit-btn' ) ) {
			return;
		}
		$this->form->add_subsections(
			array( $this->slug() . '-submit-btn' => $this->generateSubmitButton( $text ) ),
			null,
			false
		);
	}



	/**
	 * creates and returns an EE_Submit_Input labeled "Cancel"
	 *
	 * @param string $text
	 * @return \EE_Submit_Input
	 */
	public function generateCancelButton( $text = '' ) {
		$cancel_button = new EE_Submit_Input(
			array(
				'html_name'             => 'ee-form-submit-' . $this->slug(), // YES! Same name as submit !!!
				'html_id'               => 'ee-cancel-form-' . $this->slug(),
				'html_class'            => 'ee-cancel-form',
				'html_label'            => '&nbsp;',
				'other_html_attributes' => ' rel="' . $this->slug() . '"',
				'default'               => ! empty( $text ) ? $text : __( 'Cancel', 'event_espresso' )
			)
		);
		$cancel_button->set_button_css_attributes( false );
		return $cancel_button;
	}



	/**
	 * appends a float clearing div onto end of form
	 *
	 * @return void
	 * @throws \EE_Error
	 */
	public function clearFormButtonFloats() {
		$this->form->add_subsections(
			array(
				'clear-submit-btn-float' => new \EE_Form_Section_HTML(
					EEH_HTML::div( '', '', 'clear-float' ) . EEH_HTML::divx()
				)
			),
			null,
			false
		);
	}



	/**
	 * takes the generated form and displays it along with ony other non-form HTML that may be required
	 * returns a string of HTML that can be directly echoed in a template
	 *
	 * @return string
	 * @throws LogicException
	 * @throws \EE_Error
	 */
	public function display() {
        $form_html = apply_filters(
			'FHEE__EventEspresso_core_libraries_form_sections_form_handlers_FormHandler__display__before_form',
			''
		);
		$form_config = $this->formConfig();
		if (
			$form_config === FormHandler::ADD_FORM_TAGS_AND_SUBMIT
			|| $form_config === FormHandler::ADD_FORM_TAGS_ONLY
		) {
			$form_html .= $this->form()->form_open( $this->formAction() );
		}
		$form_html .= $this->form( true )->get_html( $this->form_has_errors );
		if (
			$form_config === FormHandler::ADD_FORM_TAGS_AND_SUBMIT
			|| $form_config === FormHandler::ADD_FORM_TAGS_ONLY
		) {
			$form_html .= $this->form()->form_close();
		}
		$form_html .= apply_filters(
			'FHEE__EventEspresso_core_libraries_form_sections_form_handlers_FormHandler__display__after_form',
			''
		);
		return $form_html;
	}



	/**
	 * handles processing the form submission
	 * returns true or false depending on whether the form was processed successfully or not
	 *
	 * @param array $submitted_form_data
	 * @return array
	 * @throws \EE_Error
	 * @throws \LogicException
	 * @throws InvalidFormSubmissionException
	 */
	public function process( $submitted_form_data = array() ) {
		if ( ! $this->form()->was_submitted( $submitted_form_data ) ) {
            throw new InvalidFormSubmissionException( $this->form_name );
		}
        $this->form( true )->receive_form_submission( $submitted_form_data );
		if ( ! $this->form()->is_valid() ) {
            throw new InvalidFormSubmissionException(
				$this->form_name,
				sprintf(
					__(
						'The "%1$s" form is invalid. Please correct the following errors and resubmit: %2$s %3$s',
						'event_espresso'
					),
					$this->form_name,
					'<br />',
					$this->form()->submission_error_message()
				)
			);
		}
		return $this->form()->valid_data();
	}



}
// End of file FormHandler.php
// Location: /FormHandler.php