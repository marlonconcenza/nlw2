import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import LandingPage from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route path="/" component={LandingPage} exact />
            <Route path="/study" component={TeacherList} />
            <Route path="/give-classes" component={TeacherForm} />
        </BrowserRouter>
    );
}

export default Routes;