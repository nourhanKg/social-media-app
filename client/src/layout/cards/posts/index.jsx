import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "store";
import PostCard from "./postCard";

const Posts = function({userId, isProfile = false}) {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const [myPosts, setMyPosts] = useState([]);
    const token = useSelector((state) => state.token);
    const getPosts = async function() {
        const response = await fetch("http://localhost:9001/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setMyPosts(data.data);
        // dispatch(setPosts({ posts: data.data }));
    }
    const getUserPosts = async function() {
        const response = await fetch(`http://localhost:9001/posts/${userId}/posts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setMyPosts(data.data);
        // dispatch(setPosts({ posts: data.data }));
    }
    useEffect(() => {
        if(isProfile) {
            getUserPosts();
        }
        else {
            getPosts();
        }
    }, [posts])
    return (
        <>
            {myPosts.map(post => {
                return <PostCard key={post._id} postInfo={post}></PostCard>
            })}
        </>
    )
}
export default Posts