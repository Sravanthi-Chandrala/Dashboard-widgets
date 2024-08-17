import React, { useState } from 'react';
import '../CSS/WidgetSelector.css';

const WidgetSelector = ({
  commonWidgets = {},
  dynamicWidgets = {},
  selectedWidgets,
  onSelectWidget,
  onConfirm,
  onCancel
}) => {
  const [activeTab, setActiveTab] = useState('CSPM');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCheckboxChange = (type, widget) => {
    onSelectWidget(type, widget);
  };

  const handleConfirm = () => {
    onConfirm(selectedWidgets);
  };

  return (
    <div className="widget-selector-overlay">
      <div className="widget-selector">
        <h2>Select Widgets to Remove</h2>
        <div className="tabs">
          {Object.keys(dynamicWidgets).map((tab) => (
            <button 
              key={tab} 
              className={activeTab === tab ? 'active' : ''} 
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="widget-list">
          <h3>Common Widgets</h3>
          {(commonWidgets[activeTab] || []).map((widget) => (
            <div key={widget.id} className="widget-item">
              <label>
                <input 
                  type="checkbox" 
                  checked={selectedWidgets[activeTab]?.includes(widget)} 
                  onChange={() => handleCheckboxChange(activeTab, widget)} 
                />
                {widget.title}
              </label>
            </div>
          ))}

          <h3>Dynamically Added Widgets</h3>
          {(dynamicWidgets[activeTab] || []).map((widget) => (
            <div key={widget.id} className="widget-item">
              <label>
                <input 
                  type="checkbox" 
                  checked={selectedWidgets[activeTab]?.includes(widget)} 
                  onChange={() => handleCheckboxChange(activeTab, widget)} 
                />
                {widget.title}
              </label>
            </div>
          ))}
        </div>
        <div className="widget-selector-buttons">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default WidgetSelector;






