import Table from "react-bootstrap/Table";
import ReviewApproveTable from "../components/ReviewApproveTable.jsx"; // !!!FOR ADMIN USE
import PurchaseTracker from "../components/PurchaseTracker.jsx"; // !!!FOR USER USE
import ExpenseRequestForm from "../components/ExpenseRequestForm.jsx";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import SettingsModal from "../components/Modals/SettingsModal.jsx";
import * as userService from "../services/UserService.jsx";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../utils/MyContext";

const HomePage = () => {
  let data = []
  const { cookies, setCookies } = useContext(MyContext);
  const navigate = useNavigate();
  useEffect(() => {
      console.log(cookies);
      if (!cookies.name) {
          navigate('/');
      }
  }, [cookies.name])

  const [requests, setRequests] = useState([]);

  const [showSett, setShowSett] = useState(false);
  function showSettings() {
    setShowSett(true);
  }

  const [admin, setAdmin] = useState(false);

  const [users, setUsers] = useState();

  // get users to see if admin -> Probably a better way to do this
  useEffect(() => {
    requestUserDataFromApi();
  }, []);

  function requestUserDataFromApi() {
    //All users ?????? big flaw should only get the current users info
    userService.getUserByUsername(cookies.name).then((res) => {
      console.log(res.data.userExpenses);
      setUsers(res.data);
      setRequests(res.data.userExpenses);
    });
  }
  console.log(requests)

  return (
    <>
      <Navbar expand="lg" fixed="top">
        <Container>
          <Navbar.Brand>
            <img width={30} src="/src/assets/cdLogo.webp" /> Code Differently
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/request">Request Form</Nav.Link>
              <NavDropdown title="Filters" id="basic-nav-dropdown">
                <NavDropdown title="TEST">
                  <NavDropdown.Item>TEST</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              <Button variant="transparent" size="md" onClick={showSettings}> Settings </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {showSett ? (
        <SettingsModal
          show={showSett}
          hide={() => setShowSett(false)}
          admin={admin}
          isAdmin={() => {
            admin ? setAdmin(false) : setAdmin(true);
          }}
        />
      ) : (
        ""
      )}

      {admin && requests ? (
        <ReviewApproveTable requestsObj={requests} />
      ) : (
        // <PurchaseTracker requestObj={users.userExpenses}/>
        <PurchaseTracker />
      )}
    </>
  );
};

export default HomePage;
