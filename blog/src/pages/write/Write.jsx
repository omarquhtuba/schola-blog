import React, { useState } from 'react'
import { useSelector} from 'react-redux'
import './write.css'
import axios from 'axios'
import { axiosInstance } from '../../config'

const Write = () => {
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [desc, setDesc] = useState("");
  const [desc1, setDesc1] = useState("");
  const [desc2, setDesc2] = useState("");
  const [desc3, setDesc3] = useState("");
  const [file, setFile] = useState(null);
  const user = useSelector(state=> state.user.currentUser)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      intro,
      desc,
      desc1,
      desc2,
      desc3,
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axiosInstance.post("/post", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };
  
    return (
      <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
            <input
              className="writeInput"
              placeholder="Title"
              type="text"
              autoFocus={true}
              onChange={e=>setTitle(e.target.value)}
            />
          </div>
          <div className="writeFormGroup">
            <textarea
              className="writeInput writeText"
              placeholder="intro"
              type="text"
              autoFocus={true}
              onChange={e=>setIntro(e.target.value)}
            />
          </div>
          <div className="writeFormGroup">
            <textarea
              className="writeInput writeText"
              placeholder="desc "
              type="text"
              autoFocus={true}
              onChange={e=>setDesc(e.target.value)}
            />
          </div>
          <div className="writeFormGroup">
            <textarea
              className="writeInput writeText"
              placeholder="desc 1"
              type="text"
              autoFocus={true}
              onChange={e=>setDesc1(e.target.value)}
            />
          </div>
          <div className="writeFormGroup">
            <textarea
              className="writeInput writeText"
              placeholder="desc 2"
              type="text"
              autoFocus={true}
              onChange={e=>setDesc2(e.target.value)}
            />
          </div>
          <div className="writeFormGroup">
            <textarea
              className="writeInput writeText"
              placeholder="desc 3"
              type="text"
              autoFocus={true}
              onChange={e=>setDesc3(e.target.value)}
            />
          </div>
          <button className="writeSubmit" type="submit">
            Publish
          </button>
        </form>
      </div>
    )
}

export default Write
