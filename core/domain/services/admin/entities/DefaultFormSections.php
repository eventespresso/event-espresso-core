<?php

namespace EventEspresso\core\domain\services\admin\entities;

use EE_Base_Class;
use EE_Error;
use EE_Event;
use EE_Form_Element;
use EE_Form_Section;
use EEM_Form_Element;
use EEM_Form_Section;
use EndyJasmi\Cuid;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\form\meta\FormStatus;
use ReflectionException;

/**
 * Class DefaultDatetime
 * clones and resets default form sections and elements for an event
 *
 * @package EventEspresso\core\domain\services\admin\entities
 * @author  Brent Christensen
 * @since   $VID:$
 */
class DefaultFormSections implements DefaultEntityGeneratorInterface
{

    /**
     * @var EEM_Form_Element $form_element_model
     */
    protected $form_element_model;

    /**
     * @var EEM_Form_Section $form_section_model
     */
    protected $form_section_model;

    /**
     * @param EEM_Form_Element $form_element_model
     * @param EEM_Form_Section $form_section_model
     */
    public function __construct(EEM_Form_Element $form_element_model, EEM_Form_Section $form_section_model)
    {
        $this->form_element_model = $form_element_model;
        $this->form_section_model = $form_section_model;
    }


    /**
     * @param EE_Event|EE_Base_Class $entity
     * @return EE_Form_Section[]
     * @throws EE_Error
     * @throws InvalidEntityException
     * @throws ReflectionException
     */
    public function create(EE_Base_Class $entity): array
    {
        if (! $entity instanceof EE_Event) {
            throw new InvalidEntityException($entity, 'EE_Event');
        }
        /** @var EE_Form_Section[] $new_form_sections */
        $new_form_sections     = [];
        $default_form_sections = $this->form_section_model->getDefaultFormSections();
        if (is_array($default_form_sections)) {
            foreach ($default_form_sections as $default_form_section) {
                if (! $default_form_section instanceof EE_Form_Section) {
                    throw new InvalidEntityException($default_form_section, 'EE_Form_Section');
                }
                // we're calling this inside the loop, because this might get set the first time around
                // and it would always be blank for a new event if we were to call it before the loop,
                // and then we couldn't set the "BelongsTo" for any child form sections
                $top_level_form_section = $entity->registrationFormUuid();
                $default_form_elements = $default_form_section->formElements();
                // clone form_section, generate a new UUID, reset the status, then save it
                $new_form_section = clone $default_form_section;
                $UUID = Cuid::cuid();
                $new_form_section->setUUID($UUID);
                $new_form_section->setStatus(FormStatus::ACTIVE);
                if ($top_level_form_section) {
                    $new_form_section->setBelongsTo($top_level_form_section);
                }
                $new_form_section->save();
                $new_form_sections[ $UUID ] = $new_form_section;
                // now retrieve, clone, and save all of the form elements
                $this->createDefaultFormElements($new_form_section, $default_form_elements);
                // save form section UUID on event if it is the top-level form section
                if ($new_form_section->isTopLevelFormSection()) {
                    $entity->setRegistrationFormUuid($UUID);
                    $entity->save();
                }
            }
        }
        return $new_form_sections;
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function createDefaultFormElements(EE_Form_Section $new_form_section, array $default_form_elements)
    {
        /** @var EE_Form_Element[] $new_form_sections */
        $new_form_elements = [];
        foreach ($default_form_elements as $default_form_element) {
            if (! $default_form_element instanceof EE_Form_Element) {
                throw new InvalidEntityException($default_form_element, 'EE_Form_Element');
            }
            // clone form_element, generate a new UUID, reset the status, then save it
            $new_form_element = clone $default_form_element;
            // generate a new UUID for this form section then save it
            $UUID = Cuid::cuid();
            $new_form_element->setUUID($UUID);
            $new_form_element->setBelongsTo($new_form_section->UUID());
            $new_form_element->setStatus(FormStatus::ACTIVE);
            $new_form_element->save();
            $new_form_elements[ $UUID ] = $new_form_element;
        }
        $new_form_section->setFormElements($new_form_elements);
    }
}
