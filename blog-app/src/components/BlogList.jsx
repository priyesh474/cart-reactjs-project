import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const BlogList = () => {

    const [getData, setGetData] = useState({ posts: [] });

    useEffect(() => {

        const fetchData = async () => {

            try{
                const API_KEY = "https://dummyjson.com/posts"
                const res = await axios.get(API_KEY);
                setGetData(res.data)
                console.log(res.data);
            }catch(err){
                console.log("error :", err);
            }

        }

        fetchData();

    }, [])

  return (
    <div>
        {
            <div className="blog-wrap">
                {
                    getData.posts.map((d,i) => 
                        <Link to={`/bloglist/${d.id}`} className="blog-box" key={i}>
                            <h2>{d.title}</h2>
                            <span>{d.tags[0]}</span>
                            <p>{d.body}</p>
                            <span>Views: {d.views}</span>
                        </Link> 
                    )
                }
            </div>   
        }
    </div>
  )
}

export default BlogList
