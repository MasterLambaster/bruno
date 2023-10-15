import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { savePreferences } from 'providers/ReduxStore/slices/app';
import StyledWrapper from './StyledWrapper';

const General = ({ close }) => {
  const preferences = useSelector((state) => state.app.preferences);
  const dispatch = useDispatch();

  const [sslVerification, setSslVerification] = useState(preferences.request.sslVerification);
  const [timeout, setTimeout] = useState(preferences.request.timeout);

  const handleSave = () => {
    dispatch(
      savePreferences({
        ...preferences,
        request: {
          sslVerification
        }
      })
    ).then(() => {
      close();
    });
  };

  const handleTimeoutChange = (value) => {
    const timeout = value === '' ? 0 : value;
    const updatedPreferences = {
      ...preferences,
      request: {
        ...preferences.request,
        timeout
      }
    };

    setPreferences(updatedPreferences)
      .then(() => {
        setTimeout(timeout);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <StyledWrapper>
      <div className="flex items-center mt-2">
        <input
          id="ssl-verification"
          type="checkbox"
          checked={sslVerification}
          onChange={() => setSslVerification(!sslVerification)}
          className="mr-3 mousetrap"
        />
        <label htmlFor="ssl-verification" className="select-none">
          SSL Certificate Verification
        </label>
      </div>

      <div className="mt-10">
        <button type="submit" className="submit btn btn-sm btn-secondary" onClick={handleSave}>
          Save
        </button>
      </div>
    </StyledWrapper>
  );
};

export default General;
