<?php

namespace EventEspresso\core\domain\services\messages;

use DomainException;
use EE_Error;
use EE_Message_Template_Group;
use EEH_MSG_Template;
use EEM_Message_Template;
use EEM_Message_Template_Group;
use EventEspresso\core\services\request\RequestInterface;
use ReflectionException;
use RuntimeException;

/**
 * @since 5.0.8.p
 */
class MessageTemplateManager
{
    private EEM_Message_Template $message_template_model;

    private EEM_Message_Template_Group $message_template_group_model;

    protected MessageTemplateRequestData $form_data;

    protected MessageTemplateValidator $validator;

    protected RequestInterface $request;


    /**
     * @param EEM_Message_Template       $message_template_model
     * @param EEM_Message_Template_Group $message_template_group_model
     * @param MessageTemplateRequestData $form_data
     * @param MessageTemplateValidator   $validator
     * @param RequestInterface           $request
     */
    public function __construct(
        EEM_Message_Template $message_template_model,
        EEM_Message_Template_Group $message_template_group_model,
        MessageTemplateRequestData $form_data,
        MessageTemplateValidator $validator,
        RequestInterface $request
    ) {
        $this->message_template_model       = $message_template_model;
        $this->message_template_group_model = $message_template_group_model;
        $this->form_data                    = $form_data;
        $this->validator                    = $validator;
        $this->request                      = $request;
    }


    /**
     * @param string|null $messenger
     * @param string|null $message_type
     * @param int         $GRP_ID
     * @param bool        $global
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function generateNewTemplates(
        ?string $messenger = '',
        ?string $message_type = '',
        int $GRP_ID = 0,
        bool $global = false
    ): array {
        $this->form_data->setMessageTemplateRequestData();

        $messenger    = $messenger ?: $this->form_data->messenger();
        $message_type = $message_type ?: $this->form_data->messageType();
        $GRP_ID       = $GRP_ID ?: $this->form_data->groupID();

        // if no $message_types are given then that's okay...
        // this may be a messenger that just adds shortcodes,
        // so we just don't generate any templates.
        if (empty($message_type)) {
            return [];
        }
        $new_templates = EEH_MSG_Template::generate_new_templates($messenger, [$message_type], $GRP_ID, $global);
        return $new_templates[0];
    }


    /**
     * @throws DomainException
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function updateExistingTemplates(): void
    {
        $this->form_data->setMessageTemplateRequestData();
        $template_fields = $this->form_data->templateFields();

        if ($template_fields) {
            if (
                $this->validator->validateTemplateFields(
                    $this->form_data->messenger(),
                    $this->form_data->messageType(),
                    $this->form_data->context(),
                    $template_fields
                )
            ) {
                foreach ($template_fields as $template_field => $data) {
                    $this->validateTemplateFieldData($template_field, $data);
                    $this->updateMessageTemplate(
                        $template_field,
                        [
                            'GRP_ID'             => $this->form_data->groupID(),
                            'MTP_ID'             => $data['MTP_ID'],
                            'MTP_template_field' => $data['name'],
                            'MTP_context'        => $this->form_data->context(),
                            // if they aren't allowed to use all JS, restrict them to standard allowed post tags
                            'MTP_content'        => ! current_user_can('unfiltered_html')
                                ? $this->sanitizeMessageTemplateContent($data['content'])
                                : $data['content'],
                        ]
                    );
                }
                // we can use the last set_column_values for the Message Template Group update
                // (because its the same for all of these specific MTPs)
                $this->updateMessageTemplateGroup(
                    [
                        'GRP_ID'           => $this->form_data->groupID(),
                        'MTP_user_id'      => $this->form_data->userID(),
                        'MTP_messenger'    => $this->form_data->messenger(),
                        'MTP_message_type' => $this->form_data->messageType(),
                        'MTP_is_global'    => $this->form_data->isGlobal(),
                        'MTP_is_override'  => $this->form_data->isOverride(),
                        'MTP_deleted'      => $this->form_data->isDeleted(),
                        'MTP_is_active'    => $this->form_data->isActive(),
                        'MTP_name'         => $this->form_data->name(),
                        'MTP_description'  => $this->form_data->description(),
                    ]
                );
            }
        }
    }


    /**
     * @param string $template_field
     * @param array  $message_template_fields
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function updateMessageTemplate(string $template_field, array $message_template_fields): void
    {
        $MTP_ID = $message_template_fields['MTP_ID'] ?? 0;
        // if we have a MTP_ID for this field then update it, otherwise insert.
        // this has already been through the template field validator and sanitized, so it will be
        // safe to insert this field.  Why insert?  This typically happens when we introduce a new
        // message template field in a messenger/message type and existing users don't have the
        // default setup for it.
        // @link https://events.codebasehq.com/projects/event-espresso/tickets/9465
        $updated = $MTP_ID
            ? $this->message_template_model->update($message_template_fields, [['MTP_ID' => $MTP_ID]])
            : $this->message_template_model->insert($message_template_fields);

        // updates will return 0 if the field was not changed (ie: no changes = nothing actually updated)
        // but we won't consider that a problem, but if it returns false, then something went BOOM!
        if ($updated === false) {
            EE_Error::add_error(
                sprintf(
                    esc_html__('%s field was NOT updated for some reason', 'event_espresso'),
                    $template_field
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
    }


    /**
     * @param array $form_data
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function updateMessageTemplateGroup(array $form_data): void
    {
        try {
            $GRP_ID = $form_data['id'] ?? 0;
            $GRP_ID = $form_data['GRP_ID'] ?? $GRP_ID;
            if (! $GRP_ID) {
                throw new RuntimeException(
                    esc_html__(
                        'Can not update message template group because no GRP_ID was provided',
                        'event_espresso'
                    )
                );
            }

            $updated       = $this->message_template_group_model->update($form_data, [['GRP_ID' => $GRP_ID]]);
            $error_message = esc_html__(
                'unknown error occurred while updating message template group',
                'event_espresso'
            );

            if ($updated !== false) {
                $message_template_group = $this->message_template_group_model->get_one_by_ID($GRP_ID);
                if ($message_template_group instanceof EE_Message_Template_Group) {
                    // k now we need to ensure the template_pack and template_variation fields are set.
                    $template_pack      = $this->request->getRequestParam('MTP_template_pack', 'default');
                    $template_variation = $this->request->getRequestParam('MTP_template_variation', 'default');
                    $message_template_group->set_template_pack_name($template_pack);
                    $message_template_group->set_template_pack_variation($template_variation);
                }
                return;
            }
        } catch (RuntimeException $exception) {
            $error_message = $exception->getMessage();
        }

        EE_Error::add_error(
            sprintf(
                esc_html__(
                    'The Message Template Group (%1$d) was NOT updated for the following reason: %2$s',
                    'event_espresso'
                ),
                $form_data['GRP_ID'],
                $error_message
            ),
            __FILE__,
            __FUNCTION__,
            __LINE__
        );
    }


    /**
     * recursively runs wp_kses() on message template content in a model safe manner
     *
     * @param array|string $content
     * @return array|string
     * @since   4.10.29.p
     */
    private function sanitizeMessageTemplateContent($content)
    {
        if (is_array($content)) {
            foreach ($content as $key => $value) {
                $content[ $key ] = $this->sanitizeMessageTemplateContent($value);
            }
            return $content;
        }
        // remove slashes so wp_kses() works properly
        // wp_kses_stripslashes() only removes slashes from double-quotes,
        // so attributes using single quotes always appear invalid.
        $content = stripslashes($content);
        $content = wp_kses($content, wp_kses_allowed_html('post'));
        // But currently the models expect slashed data, so after wp_kses()
        // runs we need to re-slash the data. Sheesh.
        // See https://events.codebasehq.com/projects/event-espresso/tickets/11211#update-47321587
        return addslashes($content);
    }


    /**
     * @param int $GRP_ID
     * @return false|int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function trashMessageTemplate(int $GRP_ID)
    {
        return $this->message_template_group_model->delete_by_ID($GRP_ID);
    }


    /**
     * @param int $GRP_ID
     * @return bool
     * @throws EE_Error
     */
    public function restoreMessageTemplate(int $GRP_ID): bool
    {
        return $this->message_template_group_model->restore_by_ID($GRP_ID);
    }


    /**
     * @param int $GRP_ID
     * @return EE_Message_Template_Group
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function getMessageTemplateGroup(int $GRP_ID): EE_Message_Template_Group
    {
        $message_template_group = $this->message_template_group_model->get_one_by_ID($GRP_ID);
        if ($message_template_group instanceof EE_Message_Template_Group) {
            return $message_template_group;
        }
        throw new RuntimeException(
            esc_html__(
                'Can not permanently delete message template group because an invalid GRP_ID was provided',
                'event_espresso'
            )
        );
    }


    /**
     * @param int $GRP_ID
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function permanentlyDeleteMessageTemplates(int $GRP_ID): bool
    {
        $message_template_group = $this->getMessageTemplateGroup($GRP_ID);
        // permanently delete all the related Message Templates
        $deleted = $message_template_group->delete_related_permanently('Message_Template');
        return $deleted > 0;
    }


    /**
     * @param int $GRP_ID
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function permanentlyDeleteMessageTemplateGroup(int $GRP_ID): bool
    {
        if ($this->permanentlyDeleteMessageTemplates($GRP_ID)) {
            return $this->message_template_group_model->delete_permanently([['GRP_ID' => $GRP_ID]]);
        }
        return false;
    }


    private function validateTemplateFieldData(string $template_field, array $data)
    {
        if (
            ! (
                array_key_exists('MTP_ID', $data)
                && array_key_exists('name', $data)
                && array_key_exists('content', $data)
            )
        ) {
            throw new RuntimeException(
                sprintf(
                    esc_html__(
                        'Can not update message template field %1$s because of a missing MTP_ID, name, or content.',
                        'event_espresso'
                    ),
                    $template_field
                )
            );
        }
    }
}
