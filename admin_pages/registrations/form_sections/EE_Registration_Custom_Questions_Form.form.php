<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\RequestInterface;

/**
 *
 * Class EE_Registration_Form
 *
 * For generating a basic form based on a registration and its question groups
 * and questions
 *
 * @package         Event Espresso
 * @subpackage
 * @author              Mike Nelson
 * @since              4.8.30.rc.009
 *
 */
class EE_Registration_Custom_Questions_Form extends EE_Form_Section_Proper
{
    /**
     *
     * @var EE_Registration
     */
    protected $_registration = null;


    /**
     *
     * @param EE_Registration $reg
     * @param array           $options
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct(EE_Registration $reg, $options = array())
    {
        $this->_registration = $reg;
        if (! isset($options['layout_strategy'])) {
            $options['layout_strategy'] = new EE_Admin_Two_Column_Layout();
        }
        if (! isset($options['html_id'])) {
            $options['html_id'] = 'reg-admin-attendee-questions-frm';
        }
        $this->build_form_from_registration();
        parent::__construct($options);
    }


    /**
     * Gets the registration object this form is about
     * @return EE_Registration
     */
    public function get_registration()
    {
        return $this->_registration;
    }

    /**
     * @since 4.10.0.p
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function build_form_from_registration()
    {
        $reg = $this->get_registration();
        if (! $reg instanceof EE_Registration) {
            throw new EE_Error(esc_html__('We cannot build the registration custom questions form because there is no registration set on it yet', 'event_espresso'));
        }
        // we want to get all their question groups
        $question_groups = EEM_Question_Group::instance()->get_all(
            [
                [
                    'Event_Question_Group.EVT_ID' => $reg->event_ID(),
                    'OR' => [
                        'Question.QST_system*blank' =>  '',
                        'Question.QST_system*null' => ['IS_NULL']
                    ],
                    'Event_Question_Group.'
                    . EEM_Event_Question_Group::instance()->fieldNameForContext(
                        $reg->is_primary_registrant()
                    ) => true
                ],
                'order_by' => ['QSG_order' => 'ASC']
            ]
        );
        // get each question groups questions
        foreach ($question_groups as $question_group) {
            if ($question_group instanceof EE_Question_Group) {
                $this->_subsections[ $question_group->ID() ] = $this->build_subform_from_question_group(
                    $question_group,
                    $reg
                );
            }
        }
    }


    /**
     *
     * @param EE_Question_Group $question_group
     * @param EE_Registration   $registration
     * @return EE_Form_Section_Proper
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function build_subform_from_question_group($question_group, $registration)
    {
        if (
            ! $question_group instanceof EE_Question_Group ||
            ! $registration instanceof EE_Registration
        ) {
            throw new EE_Error(esc_html__('A valid question group and registration must be passed to EE_Registration_Custom_Question_Form', 'event_espresso'));
        }
        $parts_of_subsection = array(
            'title' => new EE_Form_Section_HTML(
                EEH_HTML::h5(
                    $question_group->name(),
                    $question_group->identifier(),
                    'espresso-question-group-title-h5 section-title'
                )
            )
        );
        $questions = $question_group->questions(
            array(
                array(
                    'OR' => array(
                        'QST_system*blank' => '',
                        'QST_system*null' => array( 'IS_NULL' )
                    )
                )
            )
        );
        foreach ($questions as $question) {
            $parts_of_subsection[ $question->ID() ] = $question->generate_form_input($registration);
        }
        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_edit_registration',
                'edit-reg-questions-mbox',
                $this->_registration->ID()
            )
        ) {
            $parts_of_subsection['edit_link'] = new EE_Form_Section_HTML(
                EEH_HTML::table(
                    EEH_HTML::tr(
                        '<th/><td class="reg-admin-edit-attendee-question-td"><a class="reg-admin-edit-attendee-question-lnk" href="#" aria-label="' . esc_attr__('click to edit question', 'event_espresso') . '">
		  			<span class="reg-admin-edit-question-group-spn">' . esc_html__('edit the above question group', 'event_espresso') . '</span>
		  			<div class="dashicons dashicons-edit"></div>
		  		</a></td>'
                    ) .
                    EEH_HTML::no_row()
                )
            );
        }
        return new EE_Form_Section_Proper(
            array(
                'subsections' => $parts_of_subsection,
                'html_class' => 'question-group-questions',
            )
        );
    }


    /**
     * Overrides parent so if inputs were disabled, we leave those with their defaults
     * from the answers in the DB
     *
     * @param array $req_data like $_POST
     * @return void
     * @throws EE_Error
     */
    protected function _normalize($req_data)
    {
        $this->_received_submission = true;
        $this->_validation_errors = array();
        foreach ($this->get_validatable_subsections() as $subsection) {
            if ($subsection->form_data_present_in($req_data)) {
                try {
                    $subsection->_normalize($req_data);
                } catch (EE_Validation_Error $e) {
                    $subsection->add_validation_error($e);
                }
            }
        }
    }


    /**
     * Performs validation on this form section and its subsections. For each subsection,
     * calls _validate_{subsection_name} on THIS form (if the function exists) and passes it the subsection, then calls
     * _validate on that subsection. If you need to perform validation on the form as a whole (considering multiple)
     * you would be best to override this _validate method, calling parent::_validate() first.
     *
     * @throws EE_Error
     */
    protected function _validate()
    {
        /** @var RequestInterface $request */
        $request = LoaderFactory::getLoader()->getShared(RequestInterface::class);
        $form_data = $request->requestParams();
        foreach ($this->get_validatable_subsections() as $subsection_name => $subsection) {
            if ($subsection->form_data_present_in($form_data)) {
                if (method_exists($this, '_validate_' . $subsection_name)) {
                    call_user_func_array(array($this,'_validate_' . $subsection_name), array($subsection));
                }
                $subsection->_validate();
            } elseif ($subsection instanceof EE_Form_Section_Proper) {
                $subsection->_received_submission = true;
            }
        }
    }
}
