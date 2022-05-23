import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import { Footer, Header } from './components';
import AllRoutes from './routes/AllRoutes'

function App() {
  return (
    <div>
      <Router>
        <Header/>
        <AllRoutes/>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
