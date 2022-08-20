import './App.css';
import React, { useState } from 'react';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentLogin from './components/Student/Student-Login';
import TutorLogin from './components/Tutor/Tutor-Login';
import StudentSignup from './components/Student/Student-Signup';
import TutorSignup from './components/Tutor/Tutor-Signup';
import StudentProfile from './components/Student/Student-Profile';
import TutorProfile from './components/Tutor/Tutor-Profile';
import Nav from './components/Navbar';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})


function App() {
  const [checked, setChecked] = useState(false);

  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
            <Nav />
            <Routes>
              <Route
                path='/studentLogin'
                element={<StudentLogin />}
              />
              <Route
                path='/studentSignup'
                element={<StudentSignup />}
              />
              <Route
                path='/tutorLogin'
                element={<TutorLogin />}
              />
              <Route
                path='/tutorSignup'
                element={<TutorSignup />}
              />
            </Routes>
        </div>
      </Router>

    </ApolloProvider>
  );
}

export default App;
