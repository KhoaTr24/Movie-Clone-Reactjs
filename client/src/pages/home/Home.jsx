import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import Footer from "../footer/Footer";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Search from "../../components/search/Search";

const Home = ({type}) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(()=> {
    const getRandomLists = async ()=>{
      try{
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`,
          {
            headers:{
              token:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setLists(res.data);
      }catch(err){
        console.log(err)
      }
    };
    getRandomLists();
  },[type, genre]);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre}/>
      <Search/>
      {lists.map((list) => <List list = {list} />
      )}
      <Footer/>
    </div>
  );
};

export default Home;