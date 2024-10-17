import user_img from "../../../public/images/Avater.png";
import bottom_arow from "../../../public/images/bottom_arrow.svg";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../../api/axios";

const ProfileMenu = () => {
  const [loading, setLoading] = useState();
  useEffect(() => {
    const json_data = window.localStorage.getItem("user");
    const user_data = JSON.parse(json_data);
    setData(user_data);
  }, []);
  const [data, setData] = useState(null);

  const navigate = useNavigate();
  const logout = () => {
    post("api/logout");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    navigate("/login");
  };

  const [candidate, setCandate] = useState(null);
  const [address, setAddress] = useState(null);

  // useEffect(() => {
  //   setLoading(true);
  //   post(`/api/candidate/get_candidate`)
  //     .then((res) => {
  //       setCandate(res.data?.candidate);
  //       window.localStorage.setItem(
  //         "candidate",
  //         JSON.stringify(res.data?.candidate)
  //       );
  //       const candidate = window.localStorage.getItem("candidate");
  //       const newCandidate = JSON.parse(candidate);
  //       // console.log(newCandidate);
  //       setCandate(newCandidate);
  //       const address = JSON.parse(newCandidate?.address);
  //       setAddress(address);
  //       setLoading(false);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  //   console.log(candidate);

  return (
    <div className="flex gap-3 items-center">
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="m-1 flex items-center gap-2">
          <img
            className="h-[48px] w-[48px] rounded-full"
            src={candidate?.photo ? `${API_URL}/${candidate?.photo}` : user_img}
            alt=""
          />
          <h1 className="font-[600]">{data?.name}</h1>
          <img src={bottom_arow} alt="" />
        </div>
        <ul className="dropdown-content z-[1] menu shadow bg-white rounded-md  w-52">
          <li className="hover:bg-[#1E3767] hover:text-[#fff] font-[600]">
            <Link to="update_porfile">Update Profile</Link>
          </li>
          <li className="hover:bg-[#1E3767] hover:text-[#fff] font-[600]">
            <button onClick={logout} type="button">
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileMenu;
