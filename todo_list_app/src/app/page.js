import Image from "next/image";
import Link from "next/link";
import Sidebar from "../modules/sidebar/sidebar";
import Topbar from "../modules/topbar/topbar";
import Operations from "../modules/operations/operations";
import { BASE_URL } from "../config/constants";

export default async function Home() {
  return (
    <div className="">
      <Topbar />
      <div className="fixed top-[80px] w-full">
        <div className="flex w-full ">
          <div className="sticky top-0 bottom-0 left-0 z-20">
            <Sidebar />

          </div>

          <div className=" h-[100%] w-full overflow-y-scroll bg-gray-200 pb-[80px]">
            <Operations  />
          </div>


        </div>
      </div>
    </div>
  );
}
