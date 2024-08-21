import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupForm from './Components/Signup/SignupForm';
import Layout from './Components/Layout/Layout';
import LoginForm from './Components/Login/LoginForm';
import Userdata from './Components/Userdata/Userdata';
import AdminValidation from './Components/Admin/AdminValidation';
import Adminpage from './Components/Admin/Adminpage';
import BarGraph from './Components/BarGraph/Bargraph';

function App() {
  return (
    <Router>
        <Layout>
            <Routes>
                <Route path="/" element={<SignupForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/userdata" element={<Userdata />} />
                <Route path="/admin-validation" element={<AdminValidation />} />
                <Route path="/adminpage" element={<Adminpage />} />
                <Route path="/barchart" element={<BarGraph />} />
            </Routes>
        </Layout>
    </Router>
);
}

export default App;
