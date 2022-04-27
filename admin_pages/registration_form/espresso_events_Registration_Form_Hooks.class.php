<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\request\sanitizers\AllowedTags;

/**
 * espresso_events_Registration_Form_Hooks
 * Hooks various messages logic so that it runs on indicated Events Admin Pages.
 * Commenting/docs common to all children classes is found in the EE_Admin_Hooks parent.
 *
 * @package         espresso_events_Registration_Form_Hooks
 * @subpackage      includes/core/admin/messages/espresso_events_Registration_Form_Hooks.class.php
 * @author          Darren Ethier
 */
class espresso_events_Registration_Form_Hooks extends EE_Admin_Hooks
{
    /**
     * @var EE_Event|null
     */
    protected $_event;


    protected function _set_hooks_properties()
    {
        $this->_name = 'registration_form';
        if (
            $this->_adminpage_obj->adminConfig()->useAdvancedEditor()
            && $this->_adminpage_obj->feature()->allowed('use_reg_form_builder')
        ) {
            $this->_metaboxes      = [];
            $this->_scripts_styles = [];
            return;
        }
        $this->_metaboxes = [
            0 => [
                'page_route' => ['edit', 'create_new'],
                'func'       => 'primary_questions',
                'label'      => esc_html__('Questions for Primary Registrant', 'event_espresso'),
                'priority'   => 'default',
                'context'    => 'side',
            ],
        ];

        // hook into the handler for saving question groups
        add_filter(
            'FHEE__Events_Admin_Page___insert_update_cpt_item__event_update_callbacks',
            [$this, 'modify_callbacks'],
            10
        );

        // hook into revision restores (we're hooking into the global action because EE_Admin_Hooks classes are already
        // restricted by page)
        add_action('AHEE_EE_Admin_Page_CPT__restore_revision', [$this, 'restore_revision'], 10, 2);
    }


    /**
     * Callback for FHEE__Events_Admin_Page___insert_update_cpt_item__event_update_callbacks hook
     *
     * @param $callbacks
     * @return array
     */
    public function modify_callbacks($callbacks)
    {
        // now let's add the question group callback
        $callbacks['primary_question_group_update'] = [$this, 'primary_question_group_update'];
        return $callbacks;
    }


    /**
     * Hooked into revision restores.
     *
     * @param $post_id
     * @param $revision_id
     * @return EE_Base_Class
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function restore_revision($post_id, $revision_id)
    {
        $post_evt = EEM_Event::instance()->get_one_by_ID($post_id);
        // restore revision for primary questions
        if ($post_evt instanceof EE_Event) {
            $post_evt->restore_revision(
                $revision_id,
                ['Question_Group'],
                ['Question_Group' => ['Event_Question_Group.EQG_primary' => true]]
            );
        }
        return $post_evt;
    }


    /**
     * Content of metabox.
     *
     * @param $post_id
     * @param $post
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function primary_questions($post_id, $post)
    {
        $this->_event = $this->_adminpage_obj->get_event_object();
        $event_id     = $this->_event->ID();
        ?>
        <div class="inside">
            <p>
                <strong>
                    <?php esc_html_e('Question Groups', 'event_espresso'); ?>
                </strong>
                <br />
                <?php
                printf(
                    esc_html__(
                        'Add a pre-populated %1$sgroup of questions%2$s to your event. The personal information group is required for all events',
                        'event_espresso'
                    ),
                    '<a href="admin.php?page=espresso_registration_form" target="_blank">',
                    '</a>'
                )
                ?>
            </p>
            <?php

            $qsg_where['QSG_deleted'] = false;
            $query_params             = apply_filters(
                'FHEE__espresso_events_Registration_Form_Hooks__primary_questions__question_group_query_parameters',
                [$qsg_where, 'order_by' => ['QSG_order' => 'ASC']]
            );
            $QSGs                     = EEM_Question_Group::instance()->get_all($query_params);
            $EQGs                     = ! empty($event_id)
                ? $this->_event->get_many_related(
                    'Question_Group',
                    [['Event_Question_Group.EQG_primary' => true]]
                )
                : [];
            $EQGids                   = array_keys($EQGs);

            if (! empty($QSGs)) {
                $html = count($QSGs) > 10 ? '<div style="height:250px;overflow:auto;">' : '';
                foreach ($QSGs as $QSG) {
                    $QSG_ID          = absint($QSG->ID());
                    $checked         = in_array($QSG_ID, $EQGids, true) || $QSG->get('QSG_system') === 1
                        ? ' checked'
                        : '';
                    $visibility      = $QSG->get('QSG_system') === 1
                        ? ' style="visibility:hidden"'
                        : '';
                    $edit_query_args = $this->_adminpage_obj->is_caf()
                        ? [
                            'action' => 'edit_question_group',
                            'QSG_ID' => $QSG_ID,
                        ]
                        : ['action' => 'question_groups'];
                    $edit_link       = EE_Admin_Page::add_query_args_and_nonce(
                        $edit_query_args,
                        EE_FORMS_ADMIN_URL
                    );
                    $edit_link_title = sprintf(
                        esc_attr__('Edit %s Group', 'event_espresso'),
                        $QSG->get('QSG_name')
                    );

                    $html .= '
					<p id="event-question-group-' . $QSG_ID . '">
						<input value="' . $QSG_ID . '"
						    type="checkbox"
						    name="question_groups[' . $QSG_ID . ']" '
                            . $visibility
                            . $checked . '
                        />
						<a href="' . esc_url_raw($edit_link) . '"
						    title="' . esc_attr($edit_link_title) . '"
						    target="_blank"
						    >
						    ' . $QSG->get('QSG_name') . '
                        </a>
					</p>';
                }
                $html .= count($QSGs) > 10 ? '</div>' : '';
                echo wp_kses($html, AllowedTags::getWithFormTags());
            } else {
                esc_html_e(
                    'There seems to be a problem with your questions. Please contact support@eventespresso.com',
                    'event_espresso'
                );
            }
            do_action('AHEE_event_editor_questions_notice');
            ?>
        </div>
        <?php
    }


    /**
     * @param EE_Event $event
     * @param array    $data
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function primary_question_group_update($event, $data)
    {
        $question_groups = ! empty($data['question_groups']) ? (array) $data['question_groups'] : [];
        $added_qgs       = array_keys($question_groups);
        $success         = true;

        // let's get all current question groups associated with this event.
        $current_qgs = $event->get_many_related(
            'Question_Group',
            [['Event_Question_Group.EQG_primary' => true]]
        );
        $current_qgs = array_keys($current_qgs); // we just want the ids

        // now let's get the groups selected in the editor and update (IF we have data)
        if (! empty($question_groups)) {
            foreach ($question_groups as $QSG_ID => $val) {
                // add to event
                if ($val) {
                    $qg = $event->_add_relation_to($QSG_ID, 'Question_Group', ['EQG_primary' => true]);
                }
                // trip success to false if result is empty
                $success = ! empty($qg) ? $success : false;
            }
        }

        // wait a minute... are there question groups missing in the saved groups that ARE with the current event?
        $removed_qgs = array_diff($current_qgs, $added_qgs);

        foreach ($removed_qgs as $QSG_ID) {
            $qg = $event->_remove_relation_to($QSG_ID, 'Question_Group', ['EQG_primary' => true]);
            // trip success to false if result is empty
            $success = ! empty($qg) ? $success : false;
        }
        return $success;
    }
}
