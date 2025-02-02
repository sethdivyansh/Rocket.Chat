import { Meteor } from 'meteor/meteor';

import { settings } from '../../../app/settings/client';
import { MessageAction } from '../../../app/ui-utils/client';
import { setMessageJumpQueryStringParameter } from '../../lib/utils/setMessageJumpQueryStringParameter';

Meteor.startup(() => {
	MessageAction.addButton({
		id: 'jump-to-star-message',
		icon: 'jump',
		label: 'Jump_to_message',
		context: ['starred', 'threads', 'message-mobile', 'videoconf-threads'],
		action(_, { message }) {
			setMessageJumpQueryStringParameter(message._id);
		},
		condition({ message, subscription, user }) {
			if (subscription == null || !settings.get('Message_AllowStarring')) {
				return false;
			}

			return Boolean(message.starred?.find((star) => star._id === user?._id));
		},
		order: 100,
		group: 'message',
	});
});
