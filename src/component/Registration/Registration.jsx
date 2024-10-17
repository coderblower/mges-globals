import { useForm } from "react-hook-form";
import right_arow from "../../../public/images/right_arow.svg";
const Registration = ({
  // setFullName,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  setPage,
  setEmail,
  setPhone,
  setPassword,
  setPhoneNumber,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    const { frist_name, last_name, email, phone, pass } = data;

    setFirstName(frist_name);
    setLastName(last_name);
    // setFullName(frist_name + "" + last_name);
    setPhone(phone);
    setEmail(email);
    setPassword(pass);
    setPhoneNumber(phone);
    setPage("Personal Information");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full lg:flex lg:min-h-screen items-center justify-center ">
          <div className="lg:flex items-center lg:pt-16 mb-4">
            <div className=" lg:w-[512px]">
              <h3 className="text-2xl font-semibold mb-5">
                Create Candidate’s account
              </h3>

              <div className="mb-6">
                <p className="font-semibold mb-2">
                  Frist Name (as in Passport)
                </p>
                <input
                  placeholder="Enter your Frist name"
                  className="border-[#C5BFBF] border-2 px-2 p-[8px] w-full   rounded-md outline-none"
                  type="text"
                  {...register("frist_name", {
                    required: "Frist name is required !",
                  })}
                />
                <p className="text-red-500 pl-2 mt-1">
                  {errors?.frist_name?.message}
                </p>
              </div>

              <div className="mb-6">
                <p className="font-semibold mb-2">Last Name (as in Passport)</p>
                <input
                  placeholder="Enter your Last name"
                  className="border-[#C5BFBF] border-2 px-2 p-[8px] w-full   rounded-md outline-none"
                  type="text"
                  {...register("last_name")}
                />
              </div>

              <div className="mb-6">
                <p className="font-semibold mb-2">Email</p>
                <input
                  placeholder="Enter your email"
                  className="border-[#C5BFBF] border-2 px-2 p-[8px] w-full  rounded-md outline-none"
                  type="Email"
                  {...register("email", {
                    required: "Email field is required ! ",
                  })}
                />
                <p className="text-red-500 pl-2 mt-1">
                  {errors?.email?.message}
                </p>
              </div>

              <div className="mb-6">
                <p className="font-semibold mb-2">Phone number </p>
                <input
                  placeholder="Enter your number"
                  className="border-[#C5BFBF] border-2 px-2 p-[8px] w-full rounded-md outline-none"
                  type="number"
                  {...register("phone", {
                    required: "Phone field is required !",
                    minLength: { value: 11, message: "Min length 11" },
                  })}
                />
                <p className="text-red-500 pl-2 mt-1">
                  {errors?.phone?.message}
                </p>
              </div>

              <div className="mb-6">
                <p className="font-semibold mb-2">Password </p>
                <input
                  placeholder="Enter your password"
                  className="border-[#C5BFBF] border-2 px-2 p-[8px] w-full   rounded-md outline-none"
                  type="password"
                  {...register("pass", {
                    required: "Password field is required !",
                    minLength: {
                      value: 8,
                      message: "Must be at least 8 characters",
                    },
                  })}
                />
                <p className="text-red-500 pl-2 mt-1">
                  {errors?.pass?.message}
                </p>
              </div>

              <div>
                <p className="font-semibold ">Confirm Password </p>
                <input
                  placeholder="Enter your password"
                  className="border-[#C5BFBF] border-2 px-2 p-[8px] w-full  rounded-md outline-none"
                  type="password"
                  {...register("cPass", {
                    required: "Confirm password field is required !",
                  })}
                />
                <p className="text-red-500 pl-2 mt-1">
                  {errors?.cPass?.message}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-end lg:mb-10 ">
          <button className="flex gap-4 items-center bg-[#1E3767] font-bold rounded-md py-[12px] px-[40px]">
            <input className="  text-white   " value="Next" type="submit" />
            <img src={right_arow} alt="" />
          </button>
        </div>
      </form>
    </>
  );
};

export default Registration;
