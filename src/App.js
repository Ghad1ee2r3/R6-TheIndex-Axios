import React, { useState , useEffect  } from "react";

import authorsl from "./data.js";
import axios from "axios";
// Components
import Sidebar from "./Sidebar";
import AuthorList from "./AuthorList";
import AuthorDetail from "./AuthorDetail";

const App = () => {
  const[authors,setAuthors]=useState([]);
  const[loading,setLoading]=useState(true);
  const [currentAuthor, setCurrentAuthor] = useState(null);

  const selectAuthor = (author)  => {
    setLoading(true);
     getItem(author)}

  const unselectAuthor = () => setCurrentAuthor(null);


  const getContentView = () => {
    if (currentAuthor) {
      return <AuthorDetail author={currentAuthor} />;
    } else {
      return setView();
    }
  };
  

useEffect(()=>{
  console.log("Rendering");
  getItems();
 
},[]);


const getItem = async (author) => {
  try {
    let response = await axios.get(`https://the-index-api.herokuapp.com/api/authors/${author.id}`);
    let data = response.data;
    console.log(data);
    setCurrentAuthor(data);
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};


const setView = () => {
  if (loading) return <h1>Laoding</h1>;
  return <AuthorList authors={authors} selectAuthor={selectAuthor} />;
};


 const getItems = async () => {
 
    try {
     
      let response = await axios.get("https://the-index-api.herokuapp.com/api/authors/");
      let data = response.data;
      console.log(data);
      setAuthors(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  

  getItems();
  return (
    <div id="app" className="container-fluid">
      <div className="row">
        <div className="col-2">
          <Sidebar unselectAuthor={unselectAuthor} />
        </div>
        
        <div className="content col-10">{getContentView()}</div>
       
      </div>
    </div>
  );
};

export default App;
