"use client";

import { logout } from "../login/actions";

export default function Dashboard() {
  return (
    <div className="flex p-4">
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300" onClick={() => logout()}>Logout</button>
    </div>
  );
}