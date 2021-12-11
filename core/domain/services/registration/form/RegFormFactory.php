<?php

namespace EventEspresso\core\domain\services\registration\form;

use DomainException;
use EE_Checkout;
use EE_Error;
use EE_SPCO_Reg_Step;
use EventEspresso\core\domain\services\registration\form\v1\RegForm as RegFormV1;
use EventEspresso\core\domain\services\registration\form\v1\RegFormDependencyHandler as RegFormDepHandlerV1;
use EventEspresso\core\domain\services\registration\form\v1\RegFormHandler as RegFormHandlerV1;
use EventEspresso\core\domain\services\registration\form\v2\FormSubmissionHandler;
use EventEspresso\core\domain\services\registration\form\v2\RegForm as RegFormV2;
use EventEspresso\core\domain\services\registration\form\v2\RegFormDependencyHandler as RegFormDepHandlerV2;
use EventEspresso\core\domain\services\registration\form\v2\RegFormHandler as RegFormHandlerV2;
use EventEspresso\core\services\dependencies\DependencyHandler;
use EventEspresso\core\services\form\legacy\FormSectionProperInterface;
use EventEspresso\core\services\loaders\LoaderFactory;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class RegFormFactory
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\services\registration\form
 * @since   $VID:$
 */
class RegFormFactory
{

    /**
     * legacy SPCO reg form
     */
    const VERSION_1 = 'v1';

    /**
     * Form Sections and Form Elements generated using Barista Form Builder
     */
    const VERSION_2 = 'v2';

    /**
     * @var string
     */
    private $reg_form_version;


    /**
     * RegFormFactory constructor.
     *
     * @param string $reg_form_version
     */
    public function __construct(string $reg_form_version = RegFormFactory::VERSION_1)
    {
        $this->reg_form_version = $reg_form_version;
        \EEH_Debug_Tools::printr(__FUNCTION__, __CLASS__, __FILE__, __LINE__, 1);
        \EEH_Debug_Tools::printr($this->reg_form_version, '$this->reg_form_version', __FILE__, __LINE__);
    }


    /**
     * @param array $dependencies
     * @return FormSectionProperInterface
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getRegForm(array $dependencies): FormSectionProperInterface
    {
        \EEH_Debug_Tools::printr(__FUNCTION__, __CLASS__, __FILE__, __LINE__, 2);
        $this->registerDependencies();
        switch ($this->reg_form_version) {
            case RegFormFactory::VERSION_2:
                $reg_step = $dependencies[0];
                if (! $reg_step instanceof EE_SPCO_Reg_Step) {
                    throw new DomainException(
                        esc_html__('Invalid or missing SPCO Registration Step', 'event_espresso')
                    );
                }
                /** @var FormSubmissionHandler $form_submission_handler */
                $form_submission_handler = LoaderFactory::getNew(
                    FormSubmissionHandler::class,
                    [$reg_step->checkout->transaction]
                );
                $form_data_api           = $form_submission_handler->getFormDataAPI();
                return LoaderFactory::getShared(RegFormV2::class, [$reg_step, $form_data_api]);
            case RegFormFactory::VERSION_1:
            default:
                return LoaderFactory::getShared(RegFormV1::class, $dependencies);
        }
    }


    /**
     * @return void
     * @throws InvalidArgumentException
     */
    private function registerDependencies()
    {
        switch ($this->reg_form_version) {
            case RegFormFactory::VERSION_1:
                /** @var RegFormDepHandlerV1 $dependency_handler */
                $dependency_handler = LoaderFactory::getShared(RegFormDepHandlerV1::class);
                break;
            case RegFormFactory::VERSION_2:
                /** @var RegFormDepHandlerV2 $dependency_handler */
                $dependency_handler = LoaderFactory::getShared(RegFormDepHandlerV2::class);
                break;
            default:
                throw new InvalidArgumentException(
                    esc_html__(
                        'Invalid registration form version requested. Version number must match one of the RegFormFactory::VERSION_* constants.',
                        'event_espresso'
                    )
                );
        }
        if (! $dependency_handler instanceof DependencyHandler) {
            throw new DomainException(
                esc_html__('Invalid Registration Form DependencyHandler.', 'event_espresso')
            );
        }
        $dependency_handler->registerDependencies();
    }


    /**
     * @param EE_Checkout $checkout
     * @return RegFormHandlerInterface
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getRegFormHandler(EE_Checkout $checkout): RegFormHandlerInterface
    {
        \EEH_Debug_Tools::printr(__FUNCTION__, __CLASS__, __FILE__, __LINE__, 2);
        switch ($this->reg_form_version) {
            case RegFormFactory::VERSION_2:
                /** @var RegFormHandlerV2 $handler */
                $handler = LoaderFactory::getNew(RegFormHandlerV2::class, [$checkout]);
                $handler->getFormSubmission();
                $handler->initializeInputHandler();
                return $handler;
            case RegFormFactory::VERSION_1:
            default:
                /** @var RegFormHandlerV1 $handler */
                $handler = LoaderFactory::getNew(RegFormHandlerV1::class, [$checkout]);
                $handler->initializeInputHandler();
                return $handler;
        }
    }
}
