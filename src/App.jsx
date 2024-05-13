
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { useCookies } from 'react-cookie'
import MyContext from './utils/MyContext';
import ExpenseRequestForm from './components/ExpenseRequestForm';
import HomePage from './pages/HomePage';
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [cookies, setCookies] = useCookies();
  return (
    <>
      <MyContext.Provider value={{ cookies, setCookies }}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/logged-in" element={<HomePage />} />
            <Route path="/request" element ={<ExpenseRequestForm />} />
          </Routes>
        </Router>
      </MyContext.Provider>
    </>
  )
}

export default App
