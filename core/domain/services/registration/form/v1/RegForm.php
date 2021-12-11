<?php

namespace EventEspresso\core\domain\services\registration\form\v1;

use EE_Error;
use EE_Registration;
use EE_Registration_Config;
use EE_SPCO_Reg_Step_Attendee_Information;
use EventEspresso\core\domain\services\registration\form\base\RegForm as RegFormBase;
use EventEspresso\core\domain\services\registration\form\RegistrantFormInterface;
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
     * RegForm constructor.
     *
     * @param EE_SPCO_Reg_Step_Attendee_Information $reg_step
     * @param EE_Registration_Config                $reg_config
     * @throws ReflectionException
     * @throws EE_Error
     */
    public function __construct(
        EE_SPCO_Reg_Step_Attendee_Information $reg_step,
        EE_Registration_Config $reg_config
    ) {
        LoaderFactory::getShared(RegFormQuestionFactory::class, [[$this, 'addRequiredQuestion']]);
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
            ]
        );
    }
}
