import Form from "./Components/Form/Form";
import UserList from "./Components/UserList/UserList";
import Banner from "./Components/Banner/Banner";
import Header from "./Components/Header/Header";
import { useState } from "react";
import { createContext } from "react";
import { useRef } from "react";

export const UserListContext = createContext()
function App() {
  // const ref = useRef([])
  const [userList, setUserList] = useState([])
  return (
    <div>
      <UserListContext.Provider value={{userList, setUserList}}>
        <Header />
        <Banner />
        <UserList />
        <Form />
      </UserListContext.Provider>
    </div>
  );
}

export default App;
