import Image from "next/image";
import Link from "next/link";
import Sidebar from "../modules/sidebar/sidebar";

export default function Home() {
  return (
    <>
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div>

        </div>
      </div>
    </>
  );
}
