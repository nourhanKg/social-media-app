import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import Flexbox from "components/FlexBox";
  import Friend from "components/Friend";
  import CardWrapper from "components/CardWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { updatePost } from "store";
  const PostCard = function({postInfo}) {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(postInfo.likes[loggedInUserId]);
    const likeCount = Object.keys(postInfo.likes).length;
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const patchLike = async () => {
        const res = await fetch(`http://localhost:9001/posts/${postInfo._id}/like`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId }),
        });
        const data = await res.json();
        dispatch(updatePost({ post: data.data }));
      };
    return (
        <CardWrapper>
            <Friend
                friendId={postInfo.userId}
                name={`${postInfo.firstName} ${postInfo.lastName}`}
                subtitle={postInfo.location}
                userPicturePath={postInfo.userPicturePath}
            />
            <Typography color={main} sx={{ mt: "1rem" }}>
                {postInfo.description}
            </Typography>
            {postInfo.picturePath && (
                <img
                width="100%"
                height="auto"
                alt="post"
                style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                src={`http://localhost:9001/assets/${postInfo.picturePath}`}
                />
            )}
            <Flexbox mt="0.25rem">
                <Flexbox gap="1rem">
                <Flexbox gap="0.3rem">
                    <IconButton onClick={patchLike}>
                    {isLiked ? (
                        <FavoriteOutlined sx={{ color: primary }} />
                    ) : (
                        <FavoriteBorderOutlined />
                    )}
                    </IconButton>
                    <Typography>{likeCount}</Typography>
                </Flexbox>

                <Flexbox gap="0.3rem">
                    <IconButton onClick={() => setIsComments(!isComments)}>
                    <ChatBubbleOutlineOutlined />
                    </IconButton>
                    <Typography>{postInfo.comments.length}</Typography>
                </Flexbox>
                </Flexbox>

                <IconButton>
                <ShareOutlined />
                </IconButton>
            </Flexbox>
            {isComments && (
                <Box mt="0.5rem">
                {postInfo.comments.map((comment, i) => (
                    <Box key={`${postInfo.userId}-${i}`}>
                    <Divider />
                    <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                        {comment}
                    </Typography>
                    </Box>
                ))}
                <Divider />
                </Box>
            )}
        </CardWrapper>
    )
  }
export default PostCard;