		
	<div id="evt-prc-overview-filters-dv">
		<ul class="subsubsub">
			<?php foreach ( $view_RLs as $view ) : ?>
			<li class="">
				<a class="<?php echo $view['class']; ?>" href="<?php echo $view['url'];?>">
					<?php _e( $view['label'], 'event_espresso' ); ?> <span class="count">(<?php echo $view['count']; ?>)</span>
				</a>
			</li>
			<?php endforeach; ?>
		</ul>
		<!--<div class="clear"></div>-->
	</div>

    <form id="event-price-overview-frm" action="<?php echo $evt_prc_overview_url;?>" method="post">
 		<?php //$list_table->search_box( $search['btn_label'], $search['callback'] ); ?>
		<input type="hidden" id="status" name="status" value="<?php echo $status;?>" />
		<input type="hidden" id="per_page" name="per_page" value="" />
		<?php echo $list_table->display(); ?>
    </form>

