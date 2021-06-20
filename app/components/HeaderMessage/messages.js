/*
 * HeaderMessage Messages
 *
 * This contains all the text for the HeaderMessage component.
 */
import React from 'react';
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.HeaderMessage.header',
    defaultMessage: '{note}',
    values: {
      note: <strong>Welcome to the new omniexplorer.aryacoin.io</strong>,
    },
  },
});

// (props) => <h1 {...props} className="class" />,
