// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes
import CreateAccount from './createaccount';
import HomePage from './homepage';
import Dashboard from './dashborad';
import Login from './login';
import { Navbar, RequestsComponent, CreateRequest, RequestStatus, RequestsToUs, RemainderComponent, ThisPage, Requests } from './requestpage';

// {/* doubt    ...  Yes, it's possible to use the Navbar component in other components without explicitly exporting it. If the Navbar component is defined within the same file or within a file that's already imported into the file where you want to use it, you can directly use it without exportin*/}
function App() {
  return (
    <Routes> {/* Use Routes here */}
    <Route exact path="/" element={<HomePage />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/login" element={<Login />} />
     <Route path="/navbar" element={<Navbar />} />
    <Route path="/requestcomponent" element={<RequestsComponent/>}/>
    <Route path="/create-request" element={<CreateRequest/>}/>
    <Route path="/requeststatus" element={<RequestStatus/>}/>
    <Route path="/requesttous" element={<RequestsToUs/>}/>
    <Route path="/thispage" element={<ThisPage/>}/>
    <Route path="/requesttous" element={<RemainderComponent/>}/> 

    <Route path="/createaccount" element={<CreateAccount/>}/>
    <Route path="/requests" element={<Requests />} />
<Route path="/remainder" element={<RemainderComponent />} /> 

  </Routes>
  );
}

export default App;
