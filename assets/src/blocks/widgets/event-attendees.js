import { __ } from '@wordpress/i18n';
const {registerBlockType} = wp.blocks; // Import registerBlockType() from wp.blocks

registerBlockType(
    'event-espresso/widgets-event-attendees',
    {
        title: __('Event Attendees', 'event_espresso'),
        description: __('Displays a list of people that have registered for the specified event', 'event_espresso'),
        icon:       'groups',
        category:   'widgets',
        keywords:   [__('event', 'event_espresso'), __('attendees', 'event_espresso'), __('list', 'event_espresso')],
        useOnce:    false,
        supports:   {
            anchor: true,
        },
        attributes: {
            content: {
                source:   'children',
                selector: 'p',
                type:     'string',
            },
        },
        // The "edit" property must be a valid function.
        edit: function(props) {
            return (
                <div className={props.className}>
                  <p>Event Editor</p>
                </div>
            );
        },
        // The "save" property must be specified and must be a valid function.
        // <p>props.attributes.id</p>
        save: function(props) {
            return (
                <div className={props.className}>
                    <p>Next Upcoming Event Datetime</p>
                </div>
            );
        },
    },
);