<?php

//Function to update question groups in the database
function event_espresso_form_group_update($group_id) {
    global $wpdb;

    //$group_id = $_POST['group_id'];
    $group_order = $_POST['group_order'];
    $group_name = $_POST['group_name'];
    $group_description = $_POST['group_description'];
    $show_group_name = isset($_POST['show_group_name']) && $_POST['show_group_name'] != '' ? 1 : 0;
    $show_group_description = isset($_POST['show_group_description']) && $_POST['show_group_description'] != '' ? 1 : 0;

    $group_identifier = empty($_REQUEST['group_identifier']) ? $group_identifier = sanitize_title_with_dashes($group_name . '-' . time()) : $group_identifier = sanitize_title_with_dashes($_REQUEST['group_identifier']);

    $sql = "UPDATE " . EVENTS_QST_GROUP_TABLE .
            " SET group_name = '" . $group_name . "', group_order = '" . $group_order . "', group_identifier = '" . $group_identifier . "', group_description = '" . $group_description . "',
                   show_group_name = " . $show_group_name . ",
                   show_group_description = " . $show_group_description . "
                 WHERE id = '" . $group_id . "'";
    $wpdb->query($sql);

    $del_group_rels = "DELETE FROM " . EVENTS_QST_GROUP_REL_TABLE . " WHERE group_id = '" . $group_id . "'";
    $wpdb->query($del_group_rels);

    if (!empty($_REQUEST['question_id'])) {
        foreach ($_REQUEST['question_id'] as $k => $v) {
            if ($v != '') {
                $sql_group_rel = "INSERT INTO " . EVENTS_QST_GROUP_REL_TABLE . " (group_id, question_id) VALUES ('" . $group_id . "', '" . $v . "')";
                //echo "$sql_discount <br>";
                $wpdb->query($sql_group_rel);
            }
        }
    }
}