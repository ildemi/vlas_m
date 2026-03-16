import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import Register from './screens/Register';
import AtcoDashboard from './screens/AtcoDashboard';
import SupervisorDashboard from './screens/SupervisorDashboard';
import AudioSubmission from './screens/AudioSubmission';

const App: React.FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/atco-dashboard" element={<AtcoDashboard />} />
                <Route path="/supervisor-dashboard" element={<SupervisorDashboard />} />
                <Route path="/submission" element={<AudioSubmission />} />
            </Routes>
        </HashRouter>
    );
};

export default App;