<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

/**
 * espresso_events_Registration_Form_Hooks_Extend
 * Hooks various messages logic so that it runs on indicated Events Admin Pages.
 * Commenting/docs common to all children classes is found in the EE_Admin_Hooks parent.
 *
 * @package         espresso_events_Registration_Form_Hooks_Extend
 * @subpackage      includes/core/admin/messages/espresso_events_Registration_Form_Hooks_Extend.class.php
 * @author          Darren Ethier
 * ------------------------------------------------------------------------
 */
class espresso_events_Registration_Form_Hooks_Extend extends espresso_events_Registration_Form_Hooks
{

    /**
     * extending the properties set in espresso_events_Registration_From_Hooks
     *
     * @access protected
     * @return void
     */
    protected function _extend_properties()
    {
        $this->_metaboxes = array_merge(
            $this->_metaboxes,
            array(
                1 => array(
                    'page_route' => array('create_new', 'edit'),
                    'func'       => 'additional_questions',
                    'label'      => esc_html__('Questions for Additional Registrants', 'event_espresso'),
                    'priority'   => 'default',
                    'context'    => 'side',
                ),
            )
        );
        $this->_scripts_styles = array(
            'registers' => array(
                'extended-event-editor' => array(
                    'url'     => EE_CORE_CAF_ADMIN_EXTEND_URL
                                 . 'registration_form/assets/event-editor-question-groups.js',
                    'depends' => array('jquery'),
                ),
            ),
            'enqueues'  => array(
                'extended-event-editor' => array('edit', 'create_new'),
            ),
        );
    }


    /**
     * @param Callable[] $callbacks
     * @return array
     */
    public function modify_callbacks($callbacks)
    {
        $callbacks = parent::modify_callbacks($callbacks);
        $callbacks[] = array($this, 'additional_question_group_update');
        return $callbacks;
    }


    /**
     * Call back hooked into revision restores.
     *
     * @param $post_id
     * @param $revision_id
     * @return EE_Base_Class|void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function restore_revision($post_id, $revision_id)
    {
        $post_evt = parent::restore_revision($post_id, $revision_id);

        // restore revision for additional questions
        $post_evt->restore_revision(
            $revision_id,
            array('Question_Group'),
            array(
                'Question_Group' => array('Event_Question_Group.EQG_primary' => 0),
            )
        );
    }


    /**
     * @param $post_id
     * @param $post
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function additional_questions($post_id, $post)
    {
        $this->_event = $this->_adminpage_obj->get_event_object();
        $event_id = $this->_event->ID();
        ?>
        <div class="inside">
            <p><strong>
                    <?php _e('Question Groups', 'event_espresso'); ?>
                </strong><br/>
                <?php
                printf(
                    esc_html__(
                        'Add a pre-populated %1$sgroup of questions%2$s to your event.',
                        'event_espresso'
                    ),
                    '<a href="admin.php?page=espresso_registration_form" target="_blank">',
                    '</a>'
                );
                ?>
            </p>
            <?php

            $qsg_where['QSG_deleted'] = false;
            $query_params = apply_filters(
                'FHEE__espresso_events_Registration_Form_Hooks_Extend__additional_questions__question_group_query_parameters',
                array($qsg_where, 'order_by' => array('QSG_order' => 'ASC'))
            );
            $QSGs = EEM_Question_Group::instance()->get_all($query_params);
            $EQGs = ! empty($event_id)
                ? $this->_event->get_many_related(
                    'Question_Group',
                    array(array('Event_Question_Group.EQG_primary' => 0))
                )
                : array();
            $EQGids = array_keys($EQGs);

            if (! empty($QSGs)) {
                $html = count($QSGs) > 10 ? '<div style="height:250px;overflow:auto;">' : '';
                foreach ($QSGs as $QSG) {
                    $checked = in_array($QSG->ID(), $EQGids, true) ? ' checked="checked" ' : '';
                    $edit_link = EE_Admin_Page::add_query_args_and_nonce(
                        array(
                            'action' => 'edit_question_group',
                            'QSG_ID' => $QSG->ID(),
                        ),
                        EE_FORMS_ADMIN_URL
                    );

                    $html .= '
					<p id="event-question-group-' . $QSG->ID() . '">
						<input value="' . $QSG->ID() . '"'
                             . ' type="checkbox" name="add_attendee_question_groups[' . $QSG->ID() . ']"' . $checked . ' />
						<a href="' . $edit_link . '" title="'
                             . sprintf(
                                 esc_attr__('Edit %s Group', 'event_espresso'),
                                 $QSG->get('QSG_name')
                             )
                             . '" target="_blank">' . $QSG->get('QSG_name') . '</a>
					</p>';
                    if ($QSG->ID() === 2) {
                        $html .= '
					<p id="question-group-requirements-notice-pg" class="important-notice small-text" style="display: none;">'
                                 . esc_html__(
                                     'The Personal Information question group is required whenever the Address Information question group is activated.',
                                     'event_espresso'
                                 )
                                 . '</p>';
                    }
                }
                $html .= count($QSGs) > 10 ? '</div>' : '';

                echo $html;
            } else {
                esc_html_e(
                    'There seems to be a problem with your questions. Please contact support@eventespresso.com',
                    'event_espresso'
                );
            }
            do_action('AHEE__espresso_events_Registration_Form_Hooks__additional_questions__after_content');
            ?>
        </div>
        <?php
    }


    public function additional_question_group_update($evtobj, $data)
    {
        $question_groups = ! empty($data['add_attendee_question_groups'])
            ? (array) $data['add_attendee_question_groups']
            : array();
        $added_qgs = array_keys($question_groups);
        $success = array();

        // let's get all current question groups associated with this event.
        $current_qgs = $evtobj->get_many_related(
            'Question_Group',
            array(array('Event_Question_Group.EQG_primary' => 0))
        );
        $current_qgs = array_keys($current_qgs); // we just want the ids

        // now let's get the groups selected in the editor and update (IF we have data)
        if (! empty($question_groups)) {
            foreach ($question_groups as $id => $val) {
                // add to event
                if ($val) {
                    $qg = $evtobj->_add_relation_to($id, 'Question_Group', array('EQG_primary' => 0));
                }
                $success[] = ! empty($qg) ? 1 : 0;
            }
        }

        // wait a minute... are there question groups missing in the saved groups that ARE with the current event?
        $removed_qgs = array_diff($current_qgs, $added_qgs);

        foreach ($removed_qgs as $qgid) {
            $qg = $evtobj->_remove_relation_to($qgid, 'Question_Group', array('EQG_primary' => 0));
            $success[] = ! empty($qg) ? 1 : 0;
        }


        return in_array(0, $success, true) ? false : true;
    }
}
