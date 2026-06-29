import axios from "axios";
import { useEffect, useState } from "react";

const AddBlog = () => {

    const [getData, setGetData] = useState({ posts: [] });

    useEffect(() => {

        const fetchData = async () => {

            try{
                const API_KEY = "https://dummyjson.com/posts"
                const res = await axios.post(API_KEY);
                setGetData.post(res.data)
            }catch(err){
                console.log("error :", err);
            }

        }

        fetchData();
        
    }, [])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("data updated");
    }

  return (
    <div className="add-blog">
        <h2>Add Blog Details</h2>
        <form action="" onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" />
            <input type="text" placeholder="Body" />
            <input type="text" placeholder="Tags" />
            <button type="submit">Add Blog</button>
        </form>
        
    </div>
  )
}

export default AddBlog
