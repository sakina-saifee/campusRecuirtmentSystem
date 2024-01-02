import './App.css';
import Home from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import StudentLogin from './Students/StudentLogin';
import StudentRegister from './Students/StudentRegister';
import StudentMain from './Students/StudentMain';
import CVBuilder from './Students/CVBuilder';
import CompanyLogin from './Company/CompanyLogin'
import CompanyRegister from './Company/CompanyRegister';
import CompanyMain from './Company/CompanyMain';
import ViewStudentDetails from './Company/ViewStudentDetails';
import PostAJob from './Company/PostAJob';


function App() {
  return (
    <>
  
      <BrowserRouter>
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/" element={<Home />} />
    
            <Route exact path="/studentlogin" element={<StudentLogin/>}/> 
 <Route exact path="/studentregister" element={<StudentRegister/>}/> 
 <Route exact path="/stdmain" element={<StudentMain/>}/> 
 <Route exact path="/buildcv" element={<CVBuilder/>}/> 

 <Route exact path="/companyregister" element={<CompanyRegister/>}/> 
 <Route exact path="/companylogin" element={<CompanyLogin/>}/> 
 <Route exact path="/companymain" element={<CompanyMain/>}/> 
 <Route exact path="/viewstdDetails" element={<ViewStudentDetails/>}/> 
 <Route exact path="/postajob" element={<PostAJob/>}/> 

          {/* <Route exact path="/login" element={<Login/>}/>
 <Route exact path="/cart" element={<Cart/>}/>
<Route exact path="/profile" element={<Profile/>}/>
 <Route exact path="/addproduct" element={<AddProduct/>}/>
 <Route exact path="/product-type/mobiles" element={<AllProducts type={"mobile"}/>}/>
 <Route exact path="/product-type/laptops" element={<AllProducts type={"laptop"}/>}/>
 <Route exact path="/product-type/cameras" element={<AllProducts type={"camera"}/>}/>
 <Route exact path="/product-type/shoes" element={<AllProducts type={"shoes"}/>}/>
 <Route exact path="/product/:id/:productType" element={<SpecificProductPage/>}/> */}

          {/* <Route  path="*" element={<PgFOF/>}/> */}


        </Routes>


      </BrowserRouter>
    </>
  );
}

export default App;
