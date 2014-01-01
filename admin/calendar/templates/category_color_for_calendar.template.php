<label for="use-color-picker"><?php _e("Use Color Picker?", "event_espresso");?></label>
<select name="use-color-picker-for-calendar" id="use-color-picker">
	<option value="1" <?php echo $use_color_picker ? 'selected' : ''?>><?php _e("Yes", "event_espresso");?></option>
	<option value="0" <?php echo ! $use_color_picker ? 'selected' : ''?>><?php _e("No", "event_espresso");?></option>
</select><br/>
<div id="color-picker-options">
	<label for="category-background-color-for-calendar"><?php _e("Background Color",'event_espresso')?></label><br/>
	<input type="text" class="category-color-picker" id="category-background-color-for-calendar" name="category-background-color-for-calendar" style="display:none" data-default-color="#289b97" value="<?php echo $background_color?>"><br/>
	<label for="category-text-color-for-calendar"><?php _e("Text Color", "event_espresso");?></label><br/>
	<input type="text" class="category-color-picker" id="category-text-color-for-calendar" name='category-text-color-for-calendar' style="display:none" data-default-color="#883b97" value="<?php echo $text_color?>">
</div>