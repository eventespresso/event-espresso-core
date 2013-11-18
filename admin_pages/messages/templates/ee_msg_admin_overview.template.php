
		<ul class="subsubsub">
			<?php foreach ( $view_RLs as $vw ) : ?>
				<li class="<?php echo $vw['slug']; ?>"><a class="<?php echo $vw['class']; ?>" href="<?php echo $vw['url'];?>"><?php echo $vw['label']; ?><span class="count">(<?php echo $vw['count']; ?>)</span></a></li>
		 	<?php endforeach; ?>
		 		<li>
		 		</li>
		</ul>
		<div class="clear"></div>
		<div id="ee-messenger-filters-dv">
			<form id="ee-messenger-filters-frm" action="<?php echo $ee_msg_overview_url;?>" method="post" name="ee-messenger-filters-frm">
				<select name="ee_messenger_filter_by" id="ee_messenger_filter_by">
					<?php foreach ( $active_messengers as $messenger => $args ) : ?>
					<option value="<?php echo $messenger; ?>"><?php echo ucwords(str_replace('_', ' ', $messenger) ); ?></option>
					<?php endforeach; ?>
				</select>
				<input id="submit-ee-messenger-filters-sbmt" class="button-secondary" type="submit" value="Filter Messenger">

				<select name="ee_message_type_filter_by" id="ee_message_type_filter_by">
					<?php foreach ( $active_message_types as $message_type => $args ) : ?>
					<option value="<?php echo $message_type; ?>"><?php echo ucwords(str_replace('_', ' ', $message_type) ); ?></option>
					<?php endforeach; ?>
				</select>
				<input id="submit-ee-message-type-filters-sbmt" class="button-secondary" type="submit" value="Filter Message Type">
			</form>
		</div>

        <form id="ee-messages-overview-frm" action="<?php echo $ee_msg_overview_url;?>" method="get">
            <input type="hidden" name="page" value="<?php echo $_REQUEST['page'] ?>" />
            <input type="hidden" id="per_page" name="per_page" value="" />
            <?php echo $list_table->display(); ?>
        </form>
