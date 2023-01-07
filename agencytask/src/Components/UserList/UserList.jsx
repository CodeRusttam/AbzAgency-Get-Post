import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { UserListContext } from "../../App";

const UserList = () => {
  const ctx = useContext(UserListContext);
  let page = useRef(1);
  const [totalpage, setTotalPage] = useState([]);
  const getUsers = async () => {
    const { data } = await axios.get(
      `https://frontend-test-assignment-api.abz.agency/api/v1/users?&count=6`
    );
    ctx.setUserList(data.users);
    setTotalPage(data.total_pages);
  };
  const getOtherUsers = async () => {
    page.current++;
    const { data } = await axios.get(
      `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page.current}&count=6`
    );
    ctx.setUserList([...ctx.userList, ...data.users]);
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="w-full py-24 text-center">
      <h1 className="headers-style">Working with GET request</h1>
      <div className="w-full grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 p-6">
        {ctx.userList.map((user, index) => {
          return (
            <div
              className="w-full m-auto flex flex-col items-center text-center rounded-lg bg-[#ffffff] p-4"
              key={index}
            >
              <img className="rounded-full" src={user.photo} alt="" />
              <ul className="w-full">
                <li className="text-style">{user.name}</li>
                <li className="text-style">
                  {user.position ?? user.position_id}
                </li>
                <li className="text-style">{user.email}</li>
                <li className="text-style">{user.phone}</li>
              </ul>
            </div>
          );
        })}
      </div>
      <button
        onClick={getOtherUsers}
        className={page.current === totalpage ? "hidden" : "btn"}
      >
        Show more
      </button>
    </div>
  );
};

export default UserList;
