import { axiosInstance} from '../../config'
import { useEffect, useState} from 'react'
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  useEffect(()=> {
      const fetchedPosts = async () => {
          const res = await axiosInstance.get("/post")
          setPosts(res.data)
      
      }
      fetchedPosts()
  },[])
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
