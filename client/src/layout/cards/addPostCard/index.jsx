import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
  } from "@mui/icons-material";
  import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
  } from "@mui/material";
import Flexbox from "components/FlexBox";
  import Dropzone from "react-dropzone";
  import UserImage from "components/UserImage";
import CardWrapper from "components/CardWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPosts } from "store";

const AddPostCard = function({picturePath}) {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isMobileScreen = useMediaQuery("(max-width: 992px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
    const handlePost = async function() {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post)
        if(image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }
        const res = await fetch(`http://localhost:9001/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
            });
        const data = await res.json();
        dispatch(setPosts({posts: data.data}));
        setImage(null);
        setPost("");        
    }
    return (
        <CardWrapper>
            <Flexbox gap="1.5rem">
                <UserImage image={picturePath}/>
                <InputBase placeholder="What's on your mind..."
                onChange={(e) => setPost(e.target.value)}
                value={post}
                sx={{
                    width: "100%",
                    backgroundColor: palette.neutral.light,
                    borderRadius: "2rem",
                    padding: "1rem 2rem",
                }}/>
            </Flexbox>
            {isImage && (
                <Box border={`1px solid ${medium}`}
 borderRadius="5px" mt="1rem" p="1rem">
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    >
                        {({ getRootProps, getInputProps }) => (
                        <Flexbox>
                            <Box
                            {...getRootProps()}
                            border={`2px dashed ${palette.primary.main}`}
                            p="1rem"
                            width="100%"
                            sx={{ "&:hover": { cursor: "pointer" } }}
                            >
                            <input {...getInputProps()} />
                            {!image ? (
                                <p>Add Image Here</p>
                            ) : (
                                <Flexbox>
                                <Typography>{image.name}</Typography>
                                <EditOutlined />
                                </Flexbox>
                            )}
                            </Box>
                            {image && (
                            <IconButton
                                onClick={() => setImage(null)}
                                sx={{ width: "15%" }}
                            >
                                <DeleteOutlined />
                            </IconButton>
                            )}
                        </Flexbox>
                        )}
                    </Dropzone>
                </Box>
            )}
            <Divider sx={{margin: "1.25rem 0"}}/>
            <Flexbox>
                <Flexbox gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography
                        color={mediumMain}
                        sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                    >
                        Image
                    </Typography>
                </Flexbox>
                {!isMobileScreen ? (
                    <>
                        <Flexbox gap="0.25rem">
                        <GifBoxOutlined sx={{ color: mediumMain }} />
                        <Typography color={mediumMain}>Clip</Typography>
                        </Flexbox>

                        <Flexbox gap="0.25rem">
                        <AttachFileOutlined sx={{ color: mediumMain }} />
                        <Typography color={mediumMain}>Attachment</Typography>
                        </Flexbox>

                        <Flexbox gap="0.25rem">
                        <MicOutlined sx={{ color: mediumMain }} />
                        <Typography color={mediumMain}>Audio</Typography>
                        </Flexbox>
                    </>
                    ) : (
                    <Flexbox gap="0.25rem">
                        <MoreHorizOutlined sx={{ color: mediumMain }} />
                    </Flexbox>
                    )}
                    <Button
                    disabled={!post}
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                    }}
                    >
                    POST
                    </Button>
            </Flexbox>
        </CardWrapper>
    )
  }
  export default  AddPostCard;