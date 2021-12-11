<?php

namespace EventEspresso\core\domain\services\registration\form\v2;

use EE_Error;
use EE_Form_Submission;
use EE_Registration;
use EE_Registration_Config;
use EE_SPCO_Reg_Step_Attendee_Information;
use EventEspresso\core\domain\services\registration\form\RegistrantFormInterface;
use EventEspresso\core\domain\services\registration\form\base\RegForm as RegFormBase;
use EventEspresso\core\services\json\JsonDataAPI;
use EventEspresso\core\services\loaders\LoaderFactory;
use ReflectionException;

/**
 * Class RegForm
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\services\registration\form
 * @since   $VID:$
 */
class RegForm extends RegFormBase
{
    /**
     * @var JsonDataAPI
     */
    public $form_data_api;

    /**
     * @var RegistrantFormInput
     */
    public $reg_form_input_factory;


    /**
     * RegForm constructor.
     *
     * @param EE_SPCO_Reg_Step_Attendee_Information $reg_step
     * @param JsonDataAPI                           $form_data_api
     * @param EE_Registration_Config                $reg_config
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct(
        EE_SPCO_Reg_Step_Attendee_Information $reg_step,
        JsonDataAPI $form_data_api,
        EE_Registration_Config $reg_config
    ) {
        \EEH_Debug_Tools::printr(__FUNCTION__, __CLASS__, __FILE__, __LINE__, 2);
        $this->form_data_api = $form_data_api;
        $this->reg_form_input_factory = LoaderFactory::getNew(
            RegistrantFormInput::class,
            [
                [$this, 'addRequiredQuestion'],
                $this->form_data_api
            ]
        );
        parent::__construct($reg_step, $reg_config);
    }


    /**
     * @param EE_Registration $registration
     * @param bool            $admin_request
     * @param bool            $copy_attendee_info
     * @param callable        $enablePrintCopyInfo
     * @return RegistrantFormInterface
     */
    protected function getRegistrantForm(
        EE_Registration $registration,
        bool $admin_request,
        bool $copy_attendee_info,
        callable $enablePrintCopyInfo
    ): RegistrantFormInterface {
        return LoaderFactory::getNew(
            RegistrantForm::class,
            [
                $registration,
                $admin_request,
                $copy_attendee_info,
                $enablePrintCopyInfo,
                $this->reg_form_input_factory,
            ]
        );
    }
}
