import React, { useState } from 'react';
import '../CSS/Dashboard.css';
import { Circle } from 'rc-progress';
import RiskAssessmentChart from './Chart';
import WidgetSelector from './WidgetSelector';
import AddWidgetPopup from './PopupWindow';
import barChart from '../Images/bar-chart.png';

const widgetsData = {
  CSPM: [
    { id: 1, title: "Cloud Accounts" },
    { id: 2, title: "Cloud Account Risk Assessment" },
  ],
  CWPP: [
    { id: 3, title: "Top 5 Namespace Specific Alerts" },
    { id: 4, title: "Workload Alerts" }
  ],
  Image: [
    { id: 5, title: "Image Widget 1" },
    { id: 6, title: "Image Widget 2" },
  ],
  Ticket: [
    { id: 7, title: "Ticket Widget 1" },
    { id: 8, title: "Ticket Widget 2" },
  ]
};

const commonWidgets = [
  { id: 1, title: "Cloud Accounts", content: "Cloud Accounts content..." },
  { id: 2, title: "Cloud Account Risk Assessment", content: "Risk Assessment content..." }
];

const Dashboard = () => {
  const [dashboardWidgets, setDashboardWidgets] = useState([]);
  const [cwppWidgets, setCwppWidgets] = useState([
    { id: 3, title: "Top 5 Namespace Specific Alerts", content: "No data available" },
    { id: 4, title: "Workload Alerts", content: "No data available" }
  ]);
  const [registryScanWidgets, setRegistryScanWidgets] = useState([
    { id: 5, title: "Image Risk Assessment", content: "No data available" },
    { id: 6, title: "Image Security Issues", content: "No data available" }
  ]);
  const [isWidgetSelectorOpen, setIsWidgetSelectorOpen] = useState(false);
  const [isAddWidgetPopupOpen, setIsAddWidgetPopupOpen] = useState(false);
  const [currentDashboard, setCurrentDashboard] = useState('');
  const [selectedWidgets, setSelectedWidgets] = useState({
    CSPM: [],
    CWPP: [],
    Image: [],
    Ticket: []
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleWidgetSelection = (type, widget) => {
    setSelectedWidgets(prev => {
      const selected = prev[type];
      return {
        ...prev,
        [type]: selected.includes(widget)
          ? selected.filter(w => w.id !== widget.id)
          : [...selected, widget]
      };
    });
  };

  const handleConfirmWidgets = (selectedWidgets) => {
    const allSelected = Object.values(selectedWidgets).flat();

    setDashboardWidgets(prevWidgets => prevWidgets.filter(widget => !allSelected.some(selected => selected.id === widget.id)));
    setCwppWidgets(prevWidgets => prevWidgets.filter(widget => !allSelected.some(selected => selected.id === widget.id)));

    setSelectedWidgets({
      CSPM: [],
      CWPP: [],
      Image: [],
      Ticket: []
    });
    setIsWidgetSelectorOpen(false);
  };

  const handleRemoveWidget = (id, dashboard) => {
    if (dashboard === 'CSPM') {
      setDashboardWidgets(dashboardWidgets.filter(widget => widget.id !== id));
    } else if (dashboard === 'CWPP') {
      setCwppWidgets(cwppWidgets.filter(widget => widget.id !== id));
    } else if (dashboard === 'RegistryScan') {
      setRegistryScanWidgets(registryScanWidgets.filter(widget => widget.id !== id));
    }
  };

  const handleAddWidget = (widgetName, widgetText) => {
    const newWidget = {
      id: Date.now(),
      title: widgetName,
      content: widgetText
    };
    if (currentDashboard === 'CSPM') {
      setDashboardWidgets([...dashboardWidgets, newWidget]);
    } else if (currentDashboard === 'CWPP') {
      setCwppWidgets([...cwppWidgets, newWidget]);
    } else if (currentDashboard === 'RegistryScan') {
      setRegistryScanWidgets([...registryScanWidgets, newWidget]);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterWidgets = (widgets) => {
    return widgets.filter(widget => widget.title.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="breadcrumb">Home &gt; Dashboard v1</div>
        <div className="header-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <button className="down-arrow"><i className="fa-solid fa-angle-down"></i></button>
          <button className="notification-icon">🔔</button>
          <div className="user-info">
            <span className="user-name">John Doe</span>
            <i className="fa-solid fa-circle-user"></i>
          </div>
        </div>
      </header>

      <div className='main-container'>
        <div className='Cnapp-dashboard'>
          <h2>CNAPP Dashboard</h2>
          <div className='buttons'>
            <button onClick={() => setIsWidgetSelectorOpen(true)}> Add Widget + </button>
            <button><i className="fa-solid fa-circle-notch"></i></button>
            <button><i className="fa-solid fa-ellipsis-vertical"></i></button>
            <button><i className="fa-solid fa-clock"></i> | Last 2 days  <i className="fa-solid fa-angle-down"></i></button>
          </div>
        </div>

        {/* CSPM Executive Dashboard */}
        <h3>CSPM Executive Dashboard</h3>
        <div className="grid-container">
          {commonWidgets.map(widget => (
            <div key={widget.id} className="widget">
              <h3>{widget.title}</h3>
              <div className="widget-content">
                {widget.id === 1 ? (
                  <div className="round-progress">
                    <Circle percent={50} strokeWidth={10} trailWidth={10} strokeColor="#D3D3D3" trailColor='#1877F2' className='circle-progress' />
                    <div className='circle-content1'>2 <br />Total</div>
                  </div>
                ) : (
                  <RiskAssessmentChart />
                )}
                <div className="legend">
                  {widget.id === 1 ? (
                    <>
                      <p className='para1'><span className="status-dot connected"></span>Connected (2)</p>
                      <p className='para2'><span className="status-dot not-connected"></span>Not Connected (2)</p>
                    </>
                  ) : (
                    <>
                      <p className="failed"><span className="status-dot"></span>Failed (1589)</p>
                      <p className="warning"><span className="status-dot"></span>Warning (680)</p>
                      <p className="passed"><span className="status-dot"></span>Passed (7523)</p>
                      <p className="not-available"><span className="status-dot"></span>Not Available (32)</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filterWidgets(dashboardWidgets).map(widget => (
            <div key={widget.id} className="widget">
              <div className="widget-header">
                <h3>{widget.title}</h3>
                <button className="remove-widget" onClick={() => handleRemoveWidget(widget.id, 'CSPM')}>✖</button>
              </div>
              <div className="widget-content">
                {widget.content}
              </div>
            </div>
          ))}

          <div className="widget add-widget" onClick={() => {
            setCurrentDashboard('CSPM');
            setIsAddWidgetPopupOpen(true);
          }}>
            <button>+ Add Widget</button>
          </div>
        </div>

        {/* CWPP Dashboard */}
        <h3>CWPP Dashboard</h3>
        <div className="grid-container">
          {filterWidgets(cwppWidgets).map(widget => (
            <div key={widget.id} className="widget">
              <div className="widget-header">
                <h3>{widget.title}</h3>
                <button className="remove-widget" onClick={() => handleRemoveWidget(widget.id, 'CWPP')}>✖</button>
              </div>
              <div className="widget-content">
                <div className="no-data">
                  <img src={barChart} alt="No data available" className='cwppimage' />
                  <p className='cwpp-nograph'>No Graph data available!</p>
                </div>
              </div>
            </div>
          ))}

          <div className="widget add-widget" onClick={() => {
            setCurrentDashboard('CWPP');
            setIsAddWidgetPopupOpen(true);
          }}>
            <button>+ Add Widget</button>
          </div>
        </div>

        {/* Registry Scan Dashboard */}
        <h3>Registry Scan Dashboard</h3>
        <div className="grid-container">
          {filterWidgets(registryScanWidgets).map(widget => (
            <div key={widget.id} className="widget">
              <div className="widget-header">
                <h3>{widget.title}</h3>
                <button className="remove-widget" onClick={() => handleRemoveWidget(widget.id, 'RegistryScan')}>✖</button>
              </div>
              <div className="widget-content">
                {widget.id === 5 ? (
                  <div className="registry-scan-content">
                    <h4>1470 Total Vulnerabilities</h4>
                    <div className="risk-bar">
                      <div className="critical" style={{ width: '20%' }}></div>
                      <div className="high" style={{ width: '30%' }}></div>
                      <div className="medium" style={{ width: '25%' }}></div>
                      <div className="low" style={{ width: '25%' }}></div>
                    </div>
                    <div className="legend-box">
                      <div className="legend-left">
                        <p><span className="dot critical"></span>Critical (2)</p>
                        <p><span className="dot high"></span>High (2)</p>
                      </div>
                      <div className="legend-right">
                        <p className='p-medium'><span className="dot medium"></span>Medium (0)</p>
                        <p><span className="dot low"></span>Low (0)</p>
                      </div>
                    </div>
                  </div>
                ) : widget.id === 6 ? (
                  <div className="registry-scan-content">
                    <h4>2 Total Images</h4>
                    <div className="risk-bar">
                      <div className="critical" style={{ width: '40%' }}></div>
                      <div className="high" style={{ width: '40%' }}></div>
                      <div className="medium" style={{ width: '10%' }}></div>
                      <div className="low" style={{ width: '10%' }}></div>
                    </div>
                    <div className="legend-box">
                      <div className="legend-left">
                        <p><span className="dot critical"></span>Critical (2)</p>
                        <p><span className="dot high"></span>High (2)</p>
                      </div>
                      <div className="legend-right">
                        <p className='p-medium'><span className="dot medium"></span>Medium (0)</p>
                        <p><span className="dot low"></span>Low (0)</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="no-data">
            
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="widget add-widget" onClick={() => {
            setCurrentDashboard('RegistryScan');
            setIsAddWidgetPopupOpen(true);
          }}>
            <button>+ Add Widget</button>
          </div>
        </div>
      </div>

      {isWidgetSelectorOpen && (
        <WidgetSelector
          commonWidgets={widgetsData}
          dynamicWidgets={{
            CSPM: dashboardWidgets,
            CWPP: cwppWidgets,
            Image: registryScanWidgets,
            Ticket: []
          }}
          selectedWidgets={selectedWidgets}
          onSelectWidget={handleWidgetSelection}
          onConfirm={handleConfirmWidgets}
          onCancel={() => setIsWidgetSelectorOpen(false)}
        />
      )}

      {isAddWidgetPopupOpen && (
        <AddWidgetPopup
          onClose={() => setIsAddWidgetPopupOpen(false)}
          onConfirm={handleAddWidget}
        />
      )}
    </div>
  );
};

export default Dashboard;




