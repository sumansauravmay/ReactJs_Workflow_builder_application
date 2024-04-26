import { useState,useEffect } from "react";
import { parse } from "papaparse";
import Navbar from "./Navbar";
import { MdCloudUpload } from "react-icons/md";





let allid=JSON.parse(localStorage.getItem("id"));

const Upload = () => {
  const [contacts, setContacts] = useState([]);
  const [arr,setArr]=useState(allid);

  function populateSelect() {
    return arr.map((item, index) => (
      <option key={index} value={item}>{item}</option>
    ));
  }


  useEffect(() => {
    populateSelect();
  }, []);





  const handledropfile = (e) => {
    e.preventDefault();

    console.log(e.dataTransfer.files);
    Array.from(e.dataTransfer.files)
      .filter((file) => file.type === "text/csv")
      .forEach(async (file) => {
        const text = await file.text();
        const result = parse(text, { headers: true });

        setContacts((existing) => [...existing, ...result.data]);
      });
  };


const uploadcsv=()=>{
  
  let data=document.querySelector("#selectid").value;
  console.log(data);


}




  return (
    <div className="drop">
      <Navbar />
      <div 
        style={{
          border: "2px dashed grey",
          fontSize: "25px",
          width: "20%",
          marginLeft: "370px",
          marginTop: "100px",
          height: "300px",
          width: "700px",
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={handledropfile}
      >
        <MdCloudUpload
          style={{ fontSize: "150px", marginLeft: "270px", color: "blue" }}
        />
        <p style={{ textAlign: "center", fontSize: "20px" }}>
          Drop and drop Files Here to Upload
        </p>
      </div>

      <p style={{textAlign:"center"}}>Select Workflow ID 
      
      <select style={{padding:"5px",marginLeft:"10px",fontWeight:"bold"}} id="selectid">
      {/* <option value="">Select an option</option> */}
      {populateSelect()}
    </select>
      </p>
      <button style={{marginLeft:"800px",padding:"7px",fontWeight:"bold",border:"0px",background:"#D9EAD3"}}
      onClick={uploadcsv}
      >Run Workflow</button>


      <ul>
        {contacts.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Upload;
