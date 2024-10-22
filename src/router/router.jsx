import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Register from "../Page/Register/Register";
import Login from "../Page/Login/Login";
import Account_Details from "../Page/Account_Details/Account_Details";
import Admin_Dashboard from "../Layout/Admin_Dashboard";
import AdminDashboard from "../Page/Admin_panel/Dashboard";
import Partner from "../Page/Admin_panel/Partner";
import Medical from "../Page/Admin_panel/Medical";
import Training from "../Page/Admin_panel/Training";
import Candidates from "../Page/Admin_panel/Candidates";
import Payment from "../Page/Admin_panel/Payment";
import Reports from "../Page/Admin_panel/Reports";
import MedicalReports from "../Page/Medical_Registration/Reports";
import User_Registration from "../Layout/User_Registration";
import Registration from "../Page/User_Registration/Registration";
import Medical_Registration from "../Layout/Medical_Registration";
import Medical_Dashboard from "../Page/Medical_Registration/Medical_Dashboard";
import User_Panel from "../Layout/User_Panel";
import User_dashboard from "../Page/User_Panel/User_dashboard";
import User_Medical_Report from "../Page/User_Panel/User_Medical_Report";
import User_Training_Report from "../Page/User_Panel/User_Training_Report";
import Training_Layout from "../Layout/Training";
import Training_Dashboard from "../Page/Training_Center/Training_Dashboard";
import Training_Candidates from "../Page/Training_Center/Training_Candidates_List";
import Training_Candidates_1 from "../Page/Training_Center/Training_Center_1";
import Training_Candidates_2 from "../Page/Training_Center/Training_Center_2";
import Training_Report from "../Page/Training_Center/Training_Report";
import Training_Reports from "../Page/Training_Center/Training_Reports";
import Agent_panel from "../Layout/Agent_panel";
import Overview from "../Page/Recruiting_Agent_panel/Overview";
import Users_List from "../Page/Recruiting_Agent_panel/Users_List";
import Agent_panel_Users_List from "../Page/Recruiting_Agent_panel/User_Details";
import AgentRoute from "../ProtecteRoute/AgentRoute";
import AdminRoute from "../ProtecteRoute/AdminRoute";
import UserRoute from "../ProtecteRoute/UserRoute";
import MedicalRoute from "../ProtecteRoute/MedicalRoute";
import TrainingRoute from "../ProtecteRoute/TrainingRoute";
import Forgot_Password from "../Page/Login/Forgot_Password";
import Registration_7 from "../component/Registration/Success";
import Medical_Candidate_Registration from "../Page/Medical_Registration/Medical_Candidate_Registration";
import Admin_Candidate_Registration from "../Page/Admin_panel/Admin_Candidate_Registration";
import Admin_Candidate_List from "../Page/Admin_panel/Admin_Candidate_List";
import Medical_Candidate_list from "../Page/Medical_Registration/Medical_Candidate_List";
import Training_Candidates_Registration from "../Page/Training_Center/Training_Candidates_Registration";
import Training_Candidates_List from "../Page/Training_Center/Training_Candidates_List";
import Agent_Dashboard from "../Page/Recruiting_Agent_panel/Agent_Dashboard";
import Agent_Candidate_Registration from "../Page/Recruiting_Agent_panel/Agent_Candidate_Registration";
import Agent_Candidate_List from "../Page/Recruiting_Agent_panel/Agent_Candidate_List";
import UserDetails from "../Page/User_Panel/UserDetails";

import Profile_Details from "../component/ProfileMenu/Profile_Details";
import Training_List from "../Page/Admin_panel/Training_List";
import Country_List from "../Page/Admin_panel/Country_List";
import Medical_Test from "../Page/Admin_panel/Medical_Test";
import Test_By_Country from "../Page/Admin_panel/Test_By_Country";
import Enrolled_List from "../Page/Medical_Registration/Enrolled_List";
import Test_By_Country_List from "../Page/Admin_panel/Test_By_Country_List";
import Pre_Skill_Test from "../Page/Training_Center/Pre_Skill_Test";
import Skill_Test from "../Page/Training_Center/Skill_Test";
import Crash_Training from "../Page/Training_Center/Crash_Training";
import Final_Test from "../Page/Training_Center/Final_Test";
import Reports_Submit from "../Page/Medical_Registration/Reports_Submit";
import ProfileUpdate from "../component/ProfileMenu/ProfileUpdate";
import SubCandidate from "../Page/Admin_panel/SubCandidate";
import Designation from "../Page/Admin_panel/Designation";
import UpdateCadidate from "../component/UpdateCandidate/UpdateCadidate";
import QualifiedCandidates from "../Page/Training_Center/QualifiedCandidates";
import MedicalReports_admin from "../Page/Admin_panel/MedicalReports";
import TrainingReports_admin from "../Page/Admin_panel/TrainingReports";
import FinalReports from "../Page/Admin_panel/FinalReports";
import Admin_Demand_letter from "../Page/Admin_panel/Admin_Demand_Letter";


import MedicalReports_agent from "../Page/Recruiting_Agent_panel/MedicalReports";
import TrainingReports_agent from "../Page/Recruiting_Agent_panel/TrainingReports";
import FinalReports_agent from "../Page/Recruiting_Agent_panel/FinalReports";
import Medical_list from "../Page/Admin_panel/Medical_List";
import Agent_list from "../Page/Admin_panel/Agent_List";
import Partner_Profile from "../component/ProfileMenu/Partner_Profile";
import DocumentSummary from "../component/DocumentSummary";
import QuotaSet from "../Page/Admin_panel/QuotaSet";
import RequestedCandidate from "../Page/Admin_panel/RequestedCandidate";
import DocumentView from "../component/ProfileMenu/DocumentView";
import HiringCountryRoute from "../ProtecteRoute/HiringCountryRoute";


import Hiring_dashboard from "../Page/HiringCountryAgency/Hiring_dashboard";
import Hiring_country_panel from "../Layout/HiringCountryAgency";
import Demand_Letter from "../Page/HiringCountryAgency/Demand_Letter";
import Pre_Demand_Letter from "../Page/HiringCountryAgency/Pre_Demand_Letter";
import Create_Demand_Letter from "../Page/HiringCountryAgency/Create_Demand_Letter";
import Hiring_Agency from "../Page/Admin_panel/Hiring_Agency";
import Hiring_Agency_Res from "../Page/Admin_panel/Hiring_Agency Res";
import Create_Pre_Demand_Letter from "../Page/HiringCountryAgency/Create_Pre_Demand_Letter";
import Pre_Demand_Letter_View from "../Page/HiringCountryAgency/Pre_Demand_Letter_View";
import DemandLetterView from "../Page/HiringCountryAgency/Demand_Letter_View";
import Demand_Letter_View from "../Page/HiringCountryAgency/Demand_Letter_View";
import Admin_Pre_Demand_Letter from "../Page/Admin_panel/Admin_Pre_Demand_Letter";
import Admin_Pre_Demand_Letter_View from "../Page/Admin_panel/Admin_Pre_Demand_Letter_View";
import Admin_Demand_Letter_View from "../Page/Admin_panel/Admin_Demand_Letter_View";
import Agent_Pre_Demand_Letter from "../Page/Recruiting_Agent_panel/Agent_Pre_Demand_Letter";
import Agent_Pre_Demand_Letter_LetterView from "../Page/Recruiting_Agent_panel/Agent_Pre_Demand_Letter_LetterView";
import PrepareDemandSingle from "../Page/HiringCountryAgency/PrepareDemandSingle";
import Agent_Demand_Letter from "../Page/Recruiting_Agent_panel/Demand_Letter";
import Agent_Demand_Letter_View from "../Page/Recruiting_Agent_panel/Demand_Letter_View";
import Assign_letter from "../Page/Admin_panel/assign_letter";
import AgentChecklist from "../Page/Admin_panel/assign_letter";
import AssignCandidate from "../Page/Recruiting_Agent_panel/AssignCandidate";
import View_selected_candidate from "../Page/Recruiting_Agent_panel/View_selected_candidate";
import Agreed_Pre_Demand_Letter from "../Page/Admin_panel/Agreed_Pre_Demand_Letter";
import Agreed_Pre_Demand_Letter_Single from "../Page/Admin_panel/Agreed_Pre_Demand_Letter_Single";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/user_details/:id",
        element: <UserDetails />,
      },
      {
        path: "/forgot_Password",
        element: <Forgot_Password />,
      },
      {
        path: "/account_details",
        element: <Account_Details />,
      },
      // {
      //   path: "/user_details/:id",
      //   element: (
      //     <div>
      //       <h2>hallo</h2>
      //     </div>
      //   ),
      // },
    ],
  },
  {
    path: "user_registration",
    element: <User_Registration />,
    children: [
      {
        path: "",
        element: <Registration />,
      },

      {
        path: "registration_6",
        element: <Registration_7 />,
      },
    ],
  },
// hiringing country 
  {
    path: "hiring_country_recruting_agency",
    element: (
      <HiringCountryRoute>
        <Hiring_country_panel />
      </HiringCountryRoute>
    ),
    children: [
      {
        path: "",
        element: <Hiring_dashboard />,
      },
      {
        path: "pre_demand_letter",
        element: <Pre_Demand_Letter />,
      },
     
      {
        path: "create_pre_demand_letter",
        element: <Create_Pre_Demand_Letter />,
      },
      {
        path: "pre_demand_letters/:id",
        element: <Pre_Demand_Letter_View />,
      },
      {
        path: "demand_letter",
        element: <Demand_Letter />,
      },
     
      {
        path: "create_demand_letter",
        element: <Create_Demand_Letter />,
      },
      {
        path: "demand_letters/:id",
        element: <Demand_Letter_View />,
      },
      {
        path: "demand_letter/prepare/:id",
        element: <PrepareDemandSingle />,
      }
    ],
  },


// user_panel

  {
    path: "user_panel",
    element: (
      <UserRoute>
        <User_Panel />
      </UserRoute>
    ),
    children: [
      {
        path: "",
        element: <User_dashboard />,
      },
      {
        path: "user_profile/:id",
        element: <Profile_Details />,
      },
      {
        path: "user_medicel_report",
        element: <User_Medical_Report />,
      },
      {
        path: "user_training_report",
        element: <User_Training_Report />,
      },
      {
        path: "update_porfile",
        element: <ProfileUpdate />,
      },
    ],
  },
  //admin
  {
    path: "admin",
    element: (
      <AdminRoute>
        <Admin_Dashboard />
      </AdminRoute>
    ),
    children: [
      {
        path: "",
        element: <AdminDashboard />,
      },
      {
        path: "partner",
        element: <Partner />,
      },
      {
        path: "Candidate_Registration_from",
        element: <Admin_Candidate_Registration />,
      },
      {
        path: "Candidate_List",
        element: <Admin_Candidate_List />,
      },
      {
        path: "requested_Candidate",
        element: <RequestedCandidate />,
      },
      {
        path: "Candidate_List",
        element: <Admin_Candidate_List />,
      },
      {
        path: "document_view/:id",
        element: <DocumentView />,
      },
      
      {
        path: "user_profile/:id",
        element: <Profile_Details />,
      },
      {
        path: "user_update/:id",
        element: <UpdateCadidate />,
      },
      {
        path: "agent_list",
        element: <Agent_list />,
      },
      {
        path: "hiring_agency_res",
        element: <Hiring_Agency />,
      },
      {
        path: "register-agency",
        element: <Hiring_Agency_Res />,
      },
      {
        path: "pre_demand_letter/assign/:id",
        element: <AgentChecklist />,
      },
      {
        path: "pre_demand_letter",
        element: <Admin_Pre_Demand_Letter />,
      },
      {
        path: "agreed_pre_demand_letter",
        element: <Agreed_Pre_Demand_Letter />,
      },
      {
        path: "agreed_pre_demand_letter/:id",
        element: <Agreed_Pre_Demand_Letter_Single />,
      },
      {
        path: "pre_demand_letter/:id",
        element: <Admin_Pre_Demand_Letter_View />,
      },
      {
        path: "demand_letter",
        element: <Admin_Demand_letter />,
      },
      {
        path: "demand_letter/:id",
        element: <Admin_Demand_Letter_View />,
      },
      {
        path: "partner_profile/:id",
        element: <Demand_Letter />,
      },
      {
        path: "medical_list",
        element: <Medical_list />,
      },
      {
        path: "country_list",
        element: <Country_List />,
      },
      {
        path: "designation",
        element: <Designation />,
      },
      {
        path: "quota_set",
        element: <QuotaSet />,
      },
      {
        path: "medical_test",
        element: <Medical_Test />,
      },
      {
        path: "test_by_country",
        element: <Test_By_Country />,
      },
      {
        path: "test_by_country_list",
        element: <Test_By_Country_List />,
      },
      {
        path: "training_list",
        element: <Training_List />,
      },
      {
        path: "medical",
        element: <Medical />,
      },
      {
        path: "training",
        element: <Training />,
      },
      {
        path: "candidates",
        element: <Candidates />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "update_porfile",
        element: <ProfileUpdate />,
      },
      {
        path: "/admin/medical_list/sub-candidate-list/:id",
        element: <SubCandidate />,
      },
      {
        path: "/admin/training_list/sub-candidate-list/:id",
        element: <SubCandidate />,
      },
      {
        path: "/admin/agent_list/sub-candidate-list/:id",
        element: <SubCandidate />,
      },
      {
        path: "medical-reports",
        element: <MedicalReports_admin />,
      },
      {
        path: "training-reports",
        element: <TrainingReports_admin />,
      },
      {
        path: "final-reports",
        element: <FinalReports />,
      },
      {
        path: "document_Summary",
        element: <DocumentSummary />,
      },
    ],
  },

  // medical
  {
    path: "medical",
    element: (
      <MedicalRoute>
        <Medical_Registration />
      </MedicalRoute>
    ),
    children: [
      {
        path: "",
        element: <Medical_Dashboard />,
      },
      {
        path: "registration_1",
        element: <Medical_Candidate_Registration />,
      },
      {
        path: "candidate_list",
        element: <Medical_Candidate_list />,
      },
      {
        path: "document_view/:id",
        element: <DocumentView />,
      },
      {
        path: "enrolled_list",
        element: <Enrolled_List />,
      },
      {
        path: "user_profile/:id",
        element: <Profile_Details />,
      },
      {
        path: "success",
        element: <Medical_Candidate_list />,
      },
      {
        path: "/medical/enrolled_list/:id/:country_id",
        element: <Reports_Submit />,
      },
      {
        path: "reports",
        element: <MedicalReports />,
      },
      {
        path: "update_porfile",
        element: <ProfileUpdate />,
      },
    ],
  },
  {
    path: "training",
    element: (
      <TrainingRoute>
        <Training_Layout />
      </TrainingRoute>
    ),
    children: [
      {
        path: "",
        element: <Training_Dashboard />,
      },
      {
        path: "registration",
        element: <Training_Candidates_Registration />,
      },
      {
        path: "candidates_list",
        element: <Training_Candidates_List />,
      },
      {
        path: "document_view/:id",
        element: <DocumentView />,
      },
      {
        path: "final_test",
        element: <Final_Test />,
      },
      {
        path: "user_profile/:id",
        element: <Profile_Details />,
      },
      {
        path: "pre_skill_test",
        element: <Pre_Skill_Test />,
      },
      {
        path: "skill_test",
        element: <Skill_Test />,
      },
      {
        path: "crash_training",
        element: <Crash_Training />,
      },
      {
        path: "update_porfile",
        element: <ProfileUpdate />,
      },
      {
        path: "qualified-candidates",
        element: <QualifiedCandidates />,
      },

      // {
      //   path: "candidates_1",
      //   element: <Training_Candidates_1 />,
      // },
      // {
      //   path: "candidates_2",
      //   element: <Training_Candidates_2 />,
      // },
      // {
      //   path: "training_report",
      //   element: <Training_Report />,
      // },
      // {
      //   path: "training_reports",
      //   element: <Training_Reports />,
      // },
    ],
  },
  {
    path: "agent_panel",
    element: (
      <AgentRoute>
        <Agent_panel />
      </AgentRoute>
    ),
    children: [
      {
        path: "",
        element: <Agent_Dashboard />,
      },
      {
        path: "registration",
        element: <Agent_Candidate_Registration />,
      },
      {
        path: "list",
        element: <Agent_Candidate_List />,
      },
      
      {
        path: "demand_letter/:id",
        element: <Agent_Demand_Letter_View />,
      },  
      {
        path: "demand_letter",
        element: <Agent_Demand_Letter />,
      },
      {
        path: "demand_letter/assign_candidate/:id",
        element: <AssignCandidate />,
      },
      {
        path: "demand_letter/selected_candidate/:id",
        element: <View_selected_candidate />,
      },

      


      {
        path: "pre_demand",
        element: <Agent_Pre_Demand_Letter />,
      },
      {
        path: "document_view/:id",
        element: <Agent_Pre_Demand_Letter_LetterView/>,
      },
      
      {
        path: "user_profile/:id",
        element: <Profile_Details />,
      },
      {
        path: "user_update/:id",
        element: <UpdateCadidate />,
      },
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "users_list",
        element: <Users_List />,
      },
      {
        path: "users_details",
        element: <Agent_panel_Users_List />,
      },
      {
        path: "update_porfile",
        element: <ProfileUpdate />,
      },

      {
        path: "medical-reports",
        element: <MedicalReports_agent />,
      },
      {
        path: "training-reports",
        element: <TrainingReports_agent />,
      },
      {
        path: "final-reports",
        element: <FinalReports_agent />,
      },
      {
        path: "document_Summary",
        element: <DocumentSummary />,
      },
    ],
  },
]);

export default router;
