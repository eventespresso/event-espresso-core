<?php
/**
 * @var stdClass $category
 * @var string   $unique_id_info_help_link
 * @var string   $disable
 * @var string   $disabled_message
 * @var string   $category_select
 * @var string   $category_desc_editor
 */
?>
<div class="padding">
    <h3><?php echo esc_html($category->category_name); ?></h3>
    <table class="form-table">
        <tbody>
            <tr>
                <th>
                    <label for="category_name">
                        <?php esc_html_e('Category Name', 'event_espresso'); ?>
                        <em title="<?php esc_attr_e('This field is required', 'event_espresso') ?>"> *</em>
                    </label>
                </th>
                <td>
                    <input id="category_name"
                           name="category_name"
                           type="text"
                           value="<?php echo esc_attr($category->category_name); ?>"
                    />
                </td>
            </tr>
            <tr>
                <th>
                    <label for="cat_id">
                        <?php esc_html_e('Unique ID', 'event_espresso'); ?>
                        <?php echo $unique_id_info_help_link; // already escaped ?>
                    </label>
                </th>
                <td>
                    <input <?php echo esc_attr($disable); ?>
                        id="cat_id"
                        name="category_identifier"
                        type="text"
                        value="<?php echo esc_attr($category->category_identifier); ?>"
                    />
                    <?php if ($disabled_message) : ?>
                        <br/>
                        <p class="small-text">
                            <?php esc_html_e(
                                'This is a default category so you can edit the label and the description but not the slug',
                                'event_espresso'
                            ); ?>
                        </p>
                    <?php endif; ?>
                </td>
            </tr>
            <tr>
                <th>
                    <label for="category_parent">
                        <?php esc_html_e('Category Parent', 'event_espresso'); ?>
                    </label>
                </th>
                <td>
                    <?php echo $category_select; // already escaped ?>
                    <br/>
                    <p class="description">
                        <?php esc_html_e(
                            'Categories are hierarchical.  You can change the parent for this category here.',
                            'event_espresso'
                        ); ?>
                    </p>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <h4 class="category_description_label">
                        <?php esc_html_e('Category Description', 'event_espresso'); ?>
                    </h4>
                    <?php echo $category_desc_editor; // already escaped ?>
                </td>
            </tr>
        </tbody>
    </table>
</div>
