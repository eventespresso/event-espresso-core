<?php

printf(esc_html__('Message from %s', 'event_espresso'), EE_Registry::instance()->CFG->organization->get_pretty('name'));
