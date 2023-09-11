import React from 'react';

import {useLocation, Route, Navigate} from 'react-router';

const FallbackRoute = () => <Route path="*" element={<Navigate to="/" />} />;

export {useParams, Router, MemoryRouter} from 'react-router';
export {useLocation, Route, FallbackRoute};
