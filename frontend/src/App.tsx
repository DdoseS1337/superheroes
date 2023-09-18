import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SuperheroPage from './pages/SuperheroPage';
import AddSuperheroForm from './pages/AddSuperhero';
import EditSuperheroPage from './pages/EditSuperheroPage';

const App: React.FC = () => {
  return (
    <Router>
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<HomePage />}  />
            <Route path="/superhero/edit/:id" element={<EditSuperheroPage />}  />
            <Route path="/superhero/:id" element={<SuperheroPage />}  />
            <Route path="/addhero" element={<AddSuperheroForm />}  />
          </Routes>
        </Main>
        <Footer />
    </Router>
  );
}

export default App;
