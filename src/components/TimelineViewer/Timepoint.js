import React from 'react';
import './Timepoint.css';

export default function Timepoint(props) {
  const { store, timepoints, enable } = props;
  const { selectCurrentTimepoint, state } = store;
  const { selectedTimePoint } = state;

  const selectTimepoint = () => {
    if (enable) return selectCurrentTimepoint(snapshot);

    alert('timepoint disable');
  };

  return (
    <div className="timepoint-container">
      <div className={`timepoint ${!enable && 'disable-timepoint'}`}>
        <span className="material-icons">room</span>
      </div>

      <section className="group-timepoint-details-container">
        {timepoints.map((timepoint, index) => {
          const { timePointId, timePointLoc, timePointTimestamp } = timepoint;

          return (
            <div key={index} className="timepoint-details-container">
              <h3 className="timepoint-title">{timePointId}</h3>
              <p className="timepoint-loc">Line: {timePointLoc}</p>
              <div className="timepoint-footer">
                <p className="timepoint-enable">
                  <b>{enable ? 'Enable' : 'Disable'}</b>
                </p>
                <p className="timepoint-timestamp">{timePointTimestamp} ms</p>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
