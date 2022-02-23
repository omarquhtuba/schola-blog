import {axiosInstance} from '../../config';
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./singlePost.css";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "https://scholarships-blog.herokuapp.com/images/";
  const user = useSelector(state => state.user.currentUser)
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [desc, setDesc] = useState("");
  const [desc1, setDesc1] = useState("");
  const [desc2, setDesc2] = useState("");
  const [desc3, setDesc3] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axiosInstance.get("/post/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setDesc1(res.data.desc1);
      setDesc2(res.data.desc2);
      setDesc3(res.data.desc3);
      setIntro(res.data.intro);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/post/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/post/${post._id}`, {
      data : {username: user.username,
        title,
        desc,}  
      });
      setUpdateMode(false)
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
          
          <span className="link" >
            <Link to={`/?cat=${post.categories}`} className="link">
          <b> {post.categories}</b>
          </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        <div className="singlePostDesc">
          introduction
        </div>
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
         post.desc && <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc1}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          post.desc1 &&  <p className="singlePostDesc">{desc1}</p>
        )}
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc2}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          post.desc2 && <p className="singlePostDesc">{desc2}</p>
        )}
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc3}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          post.desc3 &&  <p className="singlePostDesc">{desc3}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}