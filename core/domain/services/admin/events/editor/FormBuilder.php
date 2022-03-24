<?php

namespace EventEspresso\core\domain\services\admin\events\editor;

use EE_Error;
use EEM_Event;
use EE_Event;
use EEM_Form_Section;
use EE_Form_Section;
use EEM_Form_Element;
use EE_Form_Element;
use EventEspresso\core\services\graphql\Utils as GQLUtils;
use EventEspresso\core\services\form\meta\FormStatus;
use ReflectionException;

/**
 * Class FormBuilder
 * retrieves the related form builder data for an event
 *
 * @package EventEspresso\core\domain\services\admin\events\editor
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class FormBuilder implements EventEditorDataInterface
{
    /**
     * @param int $eventId
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getData(int $eventId): array
    {
        /** @var EE_Event $event */
        $event = EEM_Event::instance()->get_one_by_ID($eventId);
        $topLevelSectionId = $event->registrationFormUuid();

        /** @var EE_Form_Section[] $form_sections */
        $form_sections = EEM_Form_Section::instance()->get_all([
            [
                'OR' => [
                    'FSC_UUID'      => $topLevelSectionId, // top level form
                    'FSC_belongsTo' => $topLevelSectionId, // child form sections
                    'FSC_status'    => FormStatus::SHARED, // shared form sections
                ]
                ],
            'order_by' => ['FSC_order' => 'ASC'],
        ]);

        $sections = [];
        foreach ($form_sections as $section) {
            if ($section instanceof EE_Form_Section) {
                $UUID = $section->UUID();

                // Avoid duplicates, if any
                $sections[ $UUID ] = [
                    'id'         => $UUID,
                    'appliesTo'  => GQLUtils::formatEnumKey($section->appliesTo()),
                    'attributes' => $section->attributes()->toJson(),
                    'belongsTo'  => $section->belongsTo(),
                    'isActive'   => $section->isActive(),
                    'isArchived' => $section->isArchived(),
                    'isDefault'  => $section->isDefault(),
                    'isShared'   => $section->isShared(),
                    'isTrashed'  => $section->isTrashed(),
                    'label'      => $section->label()->toJson(),
                    'order'      => $section->order(),
                    'status'     => GQLUtils::formatEnumKey($section->status()),
                ];
            }
        }

        /** @var EE_Form_Element[] $form_elements */
        $form_elements = EEM_Form_Element::instance()->get_all([
            [
                'FSC_UUID' => ['IN', array_keys($sections)]
            ]
        ]);

        $elements = [];
        foreach ($form_elements as $element) {
            if ($element instanceof EE_Form_Element) {
                $UUID = $element->UUID();

            // Avoid duplicates
                $elements[ $UUID ] = [
                'id'         => $UUID,
                'adminOnly'  => $element->adminOnly(),
                'attributes' => $element->attributes()->toJson(),
                'belongsTo'  => $element->belongsTo(),
                'helpText'   => $element->helpText()->toJson(),
                'label'      => $element->label()->toJson(),
                'mapsTo'     => $element->mapsTo(),
                'options'    => $element->options()->toJson(),
                'order'      => $element->order(),
                'required'   => $element->required()->toJson(),
                'status'     => GQLUtils::formatEnumKey($element->status()),
                'type'       => GQLUtils::formatEnumKey($element->type()),
                ];
            }
        }

        return [
            'elements'          => array_values($elements),
            'sections'          => array_values($sections),
            'topLevelSectionId' => $event->registrationFormUuid()
        ];
    }
}
