import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
export default function Blogs() {
  let [blog, setBlog] = useState({ title: "", body: "" });
  let [blogData, setBlogData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [update, setUpdate] = useState({});
  async function handleSubmit(event) {
    event.preventDefault();
    let res = await fetch(
      
      // "http://localhost:3000/blog/add",
      "https://healthcareserver-production.up.railway.app/blog/add",
     {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify(blog),
    });
    let data = await res.json();
    alert(data.msg);
    console.log(data.msg);
    setBlog({ title: "", body: "" });
  }

  function handleChange(event) {
    setBlog({
      ...blog,
      [event.target.name]: event.target.value,
    });
  }
  async function getBlogs() {
    let res = await fetch(
     
      // "http://localhost:3000/blog",
      "https://healthcareserver-production.up.railway.app/blog",
       {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    let data = await res.json();
    setBlogData(data.data);
  }

  useEffect(() => {
    getBlogs();
  }, []);

  async function handleDelete(id) {
    try {
      let res = await fetch(
       
        // `http://localhost:3000/blog/delete/${id}`,
        `https://healthcareserver-production.up.railway.app/blog/delete/${id}`,
        {
          method: "DELETE",
          mode: "cors",
          credentials: "include",
        }
      );
      let data = await res.json();
      alert(data.msg);
    } catch (error) {
      console.log(error);
    }
  }

  function handleToggle(id) {
    setSelectedId(id);
    setEdit(!edit);
    let selectedBlog = blogData.find((item) => item._id === id);
    setUpdate((prevValue) => ({
      ...prevValue,
      title: selectedBlog.title,
      body: selectedBlog.body,
    }));
  }

  const handleTextArea = (name, value) => {
    setUpdate((prevUpdate) => ({
      ...prevUpdate,
      [name]: value,
    }));
  };
  async function handleUpdate(id) {
    try {
      console.log(update);
      let res = await fetch(
       
        // `http://localhost:3000/blog/update/${id}`,
          `https://healthcareserver-production.up.railway.app/blog/update/${id}`,

        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          credentials: "include",
          body: JSON.stringify(update),
        }
      );
      let data = await res.json();
      alert(data.msg);
      setEdit(!edit);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <h2 style={{ textAlign: "center", marginTop: "7vh", fontSize:"25px", fontWeight:"bold"}}>Patient Record</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{ width: "35vw", height: "auto", border: "1px solid black" }}
        >
          <form onSubmit={handleSubmit}>
            <input
              style={{
                margin: "10px",
                height: "5vh",
                width: "30vw",
                textAlign: "center",
              }}
              placeholder="Enter Your Blog Title"
              type="text"
              name="title"
              onChange={handleChange}
            />
            <br />
            <input
              style={{
                margin: "10px",
                height: "30vh",
                width: "30vw",
                textAlign: "center",
              }}
              placeholder="Enter Blog Content"
              type="text"
              name="body"
              onChange={handleChange}
            />
            <br />
            <input
              style={{
                margin: "10px",
                padding: "10px",
                width: "30vw",
                cursor: "pointer",
              }}
              type="submit"
            />
          </form>
        </div>
        <div
          style={{
            width: "50vw",
            padding: "10px",
          }}
        >
          {blogData?.map((item) => (
            <div
              style={{
                marginTop: "10px",
                border: "2px solid black",
                padding: "5px",
              }}
              key={item._id}
            >
              {edit && selectedId === item._id ? (
                <div>
                  <textarea
                    style={{ height: "2vh" }}
                    value={update.title}
                    name="title"
                    onChange={(e) => handleTextArea("title", e.target.value)}
                  ></textarea>
                  <br />
                  <textarea
                    value={update.body}
                    name="body"
                    onChange={(e) => handleTextArea("body", e.target.value)}
                  ></textarea>
                  <br />
                  <button onClick={() => handleUpdate(item._id)}>SAVE</button>
                </div>
              ) : (
                <div>
                  <li>
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                      Title of Blog:{" "}
                    </span>
                    {item.title}
                  </li>
                  <li>
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                      Description of Blog:{" "}
                    </span>
                    {item.body}
                  </li>
                </div>
              )}
              <li>
                <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                  Created By:{" "}
                </span>{" "}
                {item.username}
              </li>

              <button
                onClick={() => {
                  handleToggle(item._id);
                }}
                style={{ cursor: "pointer" }}
              >
                {edit && selectedId === item._id ? "BACK" : "EDIT"}
              </button>

              <button
                onClick={() => {
                  handleDelete(item._id);
                }}
                style={{ marginLeft: "10px", cursor: "pointer" }}
              >
                DELETE
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
