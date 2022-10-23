import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage/LandingPage";
import UserType from "./components/Authentication/Register/UserType";
import Login from "./components/Authentication/Login/Login";
import CreateAccountVet from "./components/Authentication/Register/Vet/CreateAccount/CreateAccount";
import VerifyEmail from "./components/Authentication/Register/Vet/Verify/VerifyEmail";
import VetPersonalDetails from "./components/Authentication/Register/Vet/VetPersonalDetails/VetPersonalDetails";
import VetContacts from "./components/Authentication/Register/Vet/VetContacts/VetContacts";
import Profile from "./components/Profile/Profile";
import EditFarmer from "./components/Profile/EditFarmer";
import EditVet from "./components/Profile/EditVet";
import Index from "./components/Schedule/Index";
import CreateSchedule from "./components/Schedule/CreateSchedule";
import Edit from "./components/Schedule/Edit";
import Review from "./components/Review/Review";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import Admin from "./components/Admin/ManageUsers/Admin";
import User from "./components/Admin/ManageUsers/User";
import Reports from "./components/Admin/Reports/Reports";
import Suspended from "./components/Admin/Suspended/Suspended";
import Investigate from "./components/Admin/Reports/Investigate";
import Inbox from "./components/Inbox/Inbox";
import AdminInbox from "./components/Admin/Inbox/AdminInbox";
import Generate from "./components/Admin/Reports/Generate";
import AddAdmin from "./components/Admin/ManageUsers/Add/AddAdmin";
import Verify from "./components/Authentication/Register/Farmer/Verify/Verify";
import ConfirmEmail from "./components/Authentication/Register/Vet/Verify/ConfirmEmail";
import CreateAccount from "./components/Authentication/Register/Farmer/CreateAccount/CreateAccount";
import PersonalDetails from "./components/Authentication/Register/Farmer/PersonalDetails/PersonalDetails";
import "./App.css";

// Categories
import Categories from "./components/Categories/Categories";

// Table
import VetsTable from "./components/Admin/Reports/Tables/VetsTable";
import FarmersTable from "./components/Admin/Reports/Tables/FarmersTable";
import UsersTable from "./components/Admin/Reports/Tables/FarmersTable";
import AppointmentsTable from "./components/Admin/Reports/Tables/AppointmentsTable";
import CompleteTable from "./components/Admin/Reports/Tables/Complete";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='/choose-user' element={<UserType />} />
        <Route exact path='/register-vet' element={<CreateAccountVet />} />
        <Route exact path='/verify-email' element={<VerifyEmail />} />
        <Route
          exact
          path='/vet/confirm/:email/:code'
          element={<ConfirmEmail />}
        />
        <Route
          exact
          path='/create-profile/personal-details/vet'
          element={<VetPersonalDetails />}
        />
        <Route exact path='/profile/vet-contacts' element={<VetContacts />} />
        <Route exact path='/register-farmer' element={<CreateAccount />} />
        <Route exact path='/verify-farmer' element={<Verify />} />
        <Route
          exact
          path='/create-profile/personal-details/farmer'
          element={<PersonalDetails />}
        />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/profile/:id' element={<Profile />} />
        <Route exact path='/profile/farmer/edit/:id' element={<EditFarmer />} />
        <Route exact path='/profile/vet/edit/:id' element={<EditVet />} />
        <Route exact path='/schedule' element={<Index />} />
        <Route exact path='/create/schedule' element={<CreateSchedule />} />
        <Route exact path='/edit/schedule/:id' element={<Edit />} />
        <Route
          exact
          path='/rate/experience-with/:id/:notification'
          element={<Review />}
        />

        {/* Categories */}
        <Route exact path='/category/:name/:service' element={<Categories />} />

        <Route exact path='/admin/dashboard' element={<Dashboard />} />
        <Route exact path='/admin/manage/admins' element={<Admin />} />
        <Route exact path='/admin/manage/vets' element={<User />} />
        <Route exact path='/admin/add' element={<AddAdmin />} />
        <Route exact path='/admin/reports' element={<Reports />} />

        {/* Tables */}
        <Route
          exact
          path='/admin/reports/appointments'
          element={<AppointmentsTable />}
        />
        <Route exact path='/admin/reports/vets' element={<VetsTable />} />
        <Route exact path='/admin/reports/users' element={<UsersTable />} />
        <Route exact path='/admin/reports/farmers' element={<FarmersTable />} />
        <Route
          exact
          path='/admin/reports/complete'
          element={<CompleteTable />}
        />
        {/* Tables */}

        <Route exact path='/admin/generate-reports' element={<Generate />} />
        <Route exact path='/admin/reports/:id' element={<Investigate />} />
        <Route exact path='/admin/suspended' element={<Suspended />} />
        <Route exact path='/inbox/:id' element={<Inbox />} />
        <Route exact path='/admin/inbox' element={<AdminInbox />} />
      </Routes>
    </Router>
  );
};

export default App;
