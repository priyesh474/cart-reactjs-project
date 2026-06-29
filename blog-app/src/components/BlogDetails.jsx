import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const BlogDetails = () => {

    const { id } = useParams();
    const [blogData, setBlogData] = useState({ posts: []});


    useEffect(() => {

        const API_KEY = `https://dummyjson.com/posts/${id}`
        const fetchData = async () => {
            try{
                const res = await axios.get(API_KEY)
                setBlogData(res.data);
                console.log(res.data);
            }catch(err){
                console.log(err);
            }
        }

        fetchData();
    }, [id])

  return (
    <div className="blog-details">
        <div className="blog-box">
            {console.log(blogData.tags)}
            <h2>{blogData.title}</h2>
            {blogData.tags && blogData.tags.length > 0 ? (
                    <span>{blogData.tags[0]}</span>
                ) : (
                    <span>No tags available</span>
                )}
                <p>{blogData.body}</p>
                <span>Views: {blogData.views}</span>
        </div> 
    </div>
  )
}

export default BlogDetails
