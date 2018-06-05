/**
 *
 * FormattedDateTime
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate, FormattedMessage, FormattedTime } from 'react-intl';

import messages from './messages';

const FormattedDateTime = ({ datetime, key = (Date.now()) }) => {
  const id = `id_${key}`;
  
  return (
    <span>
      <FormattedMessage
        {...messages.datetime}
        values={{
          date: <FormattedDate value={datetime}/>,
          hour: <FormattedTime value={datetime} hour="numeric" minute="numeric" second="numeric"/>,
        }}
      />
  </span>
  );
};

FormattedDateTime.propTypes = {
  datetime: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]),
};

export default FormattedDateTime;
