<!-- content -->
<div class="content">
<table>
<tbody>
<tr>
<td><!-- Callout Panel -->
<p class="callout"><strong><?php _e('Event:', 'event_espresso'); ?> [EVENT_LINK]
<?php _e('Venue:', 'event_espresso'); ?> <a href="[VENUE_URL]" target="_blank">[VENUE_TITLE]</a> ([VENUE_CITY], [VENUE_STATE])</strong></p>
<!-- /Callout Panel --></td>
</tr>
</tbody>
</table>
</div>
<!-- COLUMN WRAP -->
<div class="column-wrap">
<div class="column">
<table align="left">
<tbody>
<tr>
<td>
<h3><?php _e('Registration:', 'event_espresso'); ?></h3>
<h4>[RECIPIENT_FNAME] [RECIPIENT_LNAME]</h4>
<ul>
	<li><strong><?php _e('Registration Code:', 'event_espresso'); ?></strong> [RECIPIENT_REGISTRATION_CODE]</li>
	<li><strong><?php _e('Tickets:', 'event_espresso'); ?></strong></li>
	<li><ul>[RECIPIENT_TICKET_LIST]</ul></li>
</ul>
<strong><?php _e('Questions &amp; Answers', 'event_espresso'); ?></strong>
<ul>[RECIPIENT_QUESTION_LIST]</ul>

<hr />

</td>
</tr>
</tbody>
</table>
</div>
<div class="column">
	<table align="left">
		<tbody>
			<tr>
				<td>
					<ul class="sidebar">
						<li><h5><?php _e('Venue »', 'event_espresso'); ?></h5></li>
						<li>[VENUE_IMAGE]</li>
						<li>[VENUE_TITLE]</li>
						<li>[VENUE_ADDRESS]</li>
						<li>[VENUE_CITY]</li>
						<li>[VENUE_STATE], [VENUE_ZIP]</li>
						<li>[GOOGLE_MAP_IMAGE]</li>
					</ul>
					<!-- social &#038; contact -->
					<table class="social" width="100%" bgcolor="">
						<tbody>
							<tr>
								<td>
									<table width="100%" align="left">
										<tbody>
											<tr>
												<td>
													<h6><?php _e('Connect with this Event:', 'event_espresso'); ?></h6>
													<a class="soc-btn fb" href="[EVENT_FACEBOOK_URL]"><?php _e('Facebook', 'event_espresso'); ?></a> <a class="soc-btn tw" href="[EVENT_TWITTER_URL]">Twitter</a>
													<h6><?php _e('Contact Info:', 'event_espresso'); ?></h6>
													<?php _e('Phone:', 'event_espresso'); ?> <strong>[EVENT_PHONE]</strong>

													<?php _e('Email:', 'event_espresso'); ?> <strong><a href="mailto:[EVENT_AUTHOR_EMAIL]">[EVENT_AUTHOR_EMAIL]</a></strong>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<!-- /social &#038; contact -->
				</td>
			</tr>
		</tbody>
	</table>
	</div>
	<div class="clear"></div>
</div>
<!-- /COLUMN WRAP -->
