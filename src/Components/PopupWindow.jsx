import React, { useState } from 'react';
import '../CSS/PopupWindow.css';

const AddWidgetPopup = ({ onClose, onConfirm }) => {
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');

  const handleConfirm = () => {
    onConfirm(widgetName, widgetText);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Add Widget</h2>
        <label>
          Widget Name:
          <input
            type="text"
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
          />
        </label>
        <label>
          Widget Text:
          <input
            type="text"
            value={widgetText}
            onChange={(e) => setWidgetText(e.target.value)}
          />
        </label>
        <div className="popup-buttons">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetPopup;