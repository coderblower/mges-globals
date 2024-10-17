import user_img from "../../../public/images/user.jpg";
import bottom_arow from "../../../public/images/bottom_arrow.svg";
import menu_img from "../../../public/images/menu_1.svg";
import search from "../../../public/images/search.svg";

const Users_List = () => {
  const datas = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="lg:mt-10 mt-2">
      {/* Partner Registration filter */}
      <div className="flex ite justify-between mt-12">
        <h2 className="font-bold text-2xl ">Users List</h2>
        <select className="py-1 px-3  border-2  rounded-md outline-none">
          <option value="grapefruit">Filter by </option>
          <option value="lime">Filter by </option>
          <option value="mango">Filter by </option>
        </select>
      </div>

      {/* Table */}
      <div className="lg:flex items-center gap-2 justify-between mt-8">
        <div className="lg:flex uppercase items-center lg:w-1/3 py-2 px-7 bg-[#dfdfdf]">
          <h2 className="lg:w-[100px] ">ID</h2>
          <h2 className="w-full text-center">Name</h2>
        </div>
        <div className="lg:flex uppercase items-center lg:w-1/3 py-2 px-7 bg-[#dfdfdf]">
          <h2 className="lg:w-[100px] ">ID</h2>
          <h2 className="w-full text-center">Name</h2>
        </div>
        <div className="lg:flex uppercase items-center lg:w-1/3 py-2 px-7 bg-[#dfdfdf]">
          <h2 className="lg:w-[100px] ">ID</h2>
          <h2 className="w-full text-center">Name</h2>
        </div>
      </div>
      <div className="lg:flex items-center gap-2 justify-between ">
        <div className="lg:flex uppercase items-center lg:w-1/3 py-2 px-7 bg-[#EEE]">
          <h2 className="lg:w-[100px] ">122</h2>
          <h2 className="w-full text-center">Sadiq</h2>
        </div>
        <div className="lg:flex uppercase items-center lg:w-1/3 py-2 px-7 bg-[#EEE]">
          <h2 className="lg:w-[100px] ">123</h2>
          <h2 className="w-full text-center">Sadiq</h2>
        </div>
        <div className="lg:flex uppercase items-center lg:w-1/3 py-2 px-7 bg-[#EEE]">
          <h2 className="lg:w-[100px] ">123</h2>
          <h2 className="w-full text-center">Sadiq</h2>
        </div>
      </div>
      <div className="lg:flex items-center gap-2 justify-between ">
        <div className="lg:flex uppercase items-center lg:w-1/3 py-2 px-7 bg-white">
          <h2 className="lg:w-[100px] ">122</h2>
          <h2 className="w-full text-center">Sadiq</h2>
        </div>
        <div className="lg:flex uppercase items-center lg:w-1/3 py-2 px-7 bg-white">
          <h2 className="lg:w-[100px] ">123</h2>
          <h2 className="w-full text-center">Sadiq</h2>
        </div>
        <div className="lg:flex uppercase items-center lg:w-1/3 py-2 px-7 bg-white">
          <h2 className="lg:w-[100px] ">123</h2>
          <h2 className="w-full text-center">Sadiq</h2>
        </div>
      </div>
      <div className="lg:flex items-center gap-2 justify-between ">
        <div className="lg:flex uppercase items-center lg:w-1/3 py-2 px-7 bg-[#EEE]">
          <h2 className="lg:w-[100px] ">122</h2>
          <h2 className="w-full text-center">Sadiq</h2>
        </div>
        <div className="lg:flex uppercase items-center lg:w-1/3 py-2 px-7 bg-[#EEE]">
          <h2 className="lg:w-[100px] ">123</h2>
          <h2 className="w-full text-center">Sadiq</h2>
        </div>
        <div className="lg:flex uppercase items-center lg:w-1/3 py-2 px-7 bg-[#EEE]">
          <h2 className="lg:w-[100px] ">123</h2>
          <h2 className="w-full text-center">Sadiq</h2>
        </div>
      </div>
      <div className="lg:flex items-center gap-2 justify-between ">
        <div className="lg:flex uppercase items-center lg:w-1/3 py-2 px-7 bg-white">
          <h2 className="lg:w-[100px] ">122</h2>
          <h2 className="w-full text-center">Sadiq</h2>
        </div>
        <div className="lg:flex uppercase items-center lg:w-1/3 py-2 px-7 bg-white">
          <h2 className="lg:w-[100px] ">123</h2>
          <h2 className="w-full text-center">Sadiq</h2>
        </div>
        <div className="lg:flex uppercase items-center lg:w-1/3 py-2 px-7 bg-white">
          <h2 className="lg:w-[100px] ">123</h2>
          <h2 className="w-full text-center">Sadiq</h2>
        </div>
      </div>
      <div className="lg:flex items-center gap-2 justify-between ">
        <div className="lg:flex uppercase items-center lg:w-1/3 py-2 px-7 bg-[#EEE]">
          <h2 className="lg:w-[100px] ">122</h2>
          <h2 className="w-full text-center">Sadiq</h2>
        </div>
        <div className="lg:flex uppercase items-center lg:w-1/3 py-2 px-7 bg-[#EEE]">
          <h2 className="lg:w-[100px] ">123</h2>
          <h2 className="w-full text-center">Sadiq</h2>
        </div>
        <div className="lg:flex uppercase items-center lg:w-1/3 py-2 px-7 bg-[#EEE]">
          <h2 className="lg:w-[100px] ">123</h2>
          <h2 className="w-full text-center">Sadiq</h2>
        </div>
      </div>
      <div className="lg:flex items-center gap-2 justify-between ">
        <div className="lg:flex uppercase items-center lg:w-1/3 py-2 px-7 bg-white">
          <h2 className="lg:w-[100px] ">122</h2>
          <h2 className="w-full text-center">Sadiq</h2>
        </div>
        <div className="lg:flex uppercase items-center lg:w-1/3 py-2 px-7 bg-white">
          <h2 className="lg:w-[100px] ">123</h2>
          <h2 className="w-full text-center">Sadiq</h2>
        </div>
        <div className="lg:flex uppercase items-center lg:w-1/3 py-2 px-7 bg-white">
          <h2 className="lg:w-[100px] ">123</h2>
          <h2 className="w-full text-center">Sadiq</h2>
        </div>
      </div>
      <div className="lg:flex items-center gap-2 justify-between ">
        <div className="lg:flex uppercase items-center lg:w-1/3 py-2 px-7 bg-[#EEE]">
          <h2 className="lg:w-[100px] ">122</h2>
          <h2 className="w-full text-center">Sadiq</h2>
        </div>
        <div className="lg:flex uppercase items-center lg:w-1/3 py-2 px-7 bg-[#EEE]">
          <h2 className="lg:w-[100px] ">123</h2>
          <h2 className="w-full text-center">Sadiq</h2>
        </div>
        <div className="lg:flex uppercase items-center lg:w-1/3 py-2 px-7 bg-[#EEE]">
          <h2 className="lg:w-[100px] ">123</h2>
          <h2 className="w-full text-center">Sadiq</h2>
        </div>
      </div>
      <div className="lg:flex items-center gap-2 justify-between ">
        <div className="lg:flex uppercase items-center lg:w-1/3 py-2 px-7 bg-white">
          <h2 className="lg:w-[100px] ">122</h2>
          <h2 className="w-full text-center">Sadiq</h2>
        </div>
        <div className="lg:flex uppercase items-center lg:w-1/3 py-2 px-7 bg-white">
          <h2 className="lg:w-[100px] ">123</h2>
          <h2 className="w-full text-center">Sadiq</h2>
        </div>
        <div className="lg:flex uppercase items-center lg:w-1/3 py-2 px-7 bg-white">
          <h2 className="lg:w-[100px] ">123</h2>
          <h2 className="w-full text-center">Sadiq</h2>
        </div>
      </div>

      {/* pagition  */}
      <div className="flex mt-10 items-center justify-center mb-10">
        <div className="flex">
          <div className="px-4 py-3 border-2 bg-[#EEE] rounded-tl-md rounded-bl-md">
            1
          </div>
          <div className="px-4 py-3 border-2">2</div>
          <div className="px-4 py-3 border-2">3</div>
          <div className="px-4 py-3 border-2">...</div>
          <div className="px-4 py-3 border-2">6</div>
          <div className="px-4 py-3 border-2 rounded-tr-md rounded-br-md">
            7
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users_List;
