import './style.css';
import Navbar from './common/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Home from './home/Home'
import MarketStatus from './market-status/MarketStatus'
import CalCounter from './cal-counter/CalCounter'
import ContactMe from './contact-me/ContactMe'
import NotFoundPage from './common/NotFoundPage'


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='/cal-count' element={<CalCounter/>} />
      <Route path='/market-status' element={<MarketStatus/>} />
      <Route path='/contact' element={<ContactMe/>} />
      <Route path="/404" element={<NotFoundPage/>} />
      <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </Router>
  );
}

export default App;
