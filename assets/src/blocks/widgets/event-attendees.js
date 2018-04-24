const {__}                = wp.i18n; // Import __() from wp.i18n
const {registerBlockType} = wp.blocks; // Import registerBlockType() from wp.blocks

registerBlockType(
    'event-espresso/widgets-event-attendees',
    {
      title:       __('Event Attendees'),
      description: 'Displays a list of people that have registered for the specified event',
      icon:        'groups',
      category:    'widgets',
      keywords:    [__('event'), __('attendees'), __('list')],
      useOnce:     false,
      supports:    {
        anchor: true,
      },
      attributes:  {
        content: {
          source: 'children',
          selector:
                  'p',
          type:
                  'string',
        },
      },
      // The "edit" property must be a valid function.
      edit:        function(props) {
        console.log(props);
        return (
            <div className={props.className}>
              <p>Event Editor</p>
            </div>
        );
      },

      // The "save" property must be specified and must be a valid function.
      //   <p>props.attributes.id</p>
      save: function(props) {
        return (
            <div className={props.className}>
              <p>Next Upcoming Event Datetime:</p>
            </div>
        );
      },
    },
);

