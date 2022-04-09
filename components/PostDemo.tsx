import { Avatar } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import { Post } from "../types";

interface PostDemoProps {
  post: Post;
}

const PostDemo: React.FC<PostDemoProps> = ({ post }) => {
  return (
    <Link href={`/post/${post.node.slug}`}>
      <div className="relative h-64 flex-grow cursor-pointer text-white">
        <img
          src={post.node.featuredImage.url}
          alt={post.node.title}
          className="absolute h-64 w-full rounded-lg object-cover"
        />
        <div className="absolute top-10 w-full text-center">
          {moment(post.node.createdAt).format("MMM DD, YYYY")}
        </div>
        <div className="absolute top-24 w-full text-center text-2xl font-bold">
          {post.node.title}
        </div>
        <div className="absolute bottom-3 flex w-full items-center justify-center gap-3">
          {post.node.author.photo?.url ? (
            <img
              src={post.node.author.photo.url}
              alt={post.node.author.name}
              width="30px"
              height="30px"
              className="rounded-full"
            />
          ) : (
            <Avatar className="h-[30px] w-[30px] rounded-full align-middle" />
          )}
          <div className="text-center">{post.node.author.name}</div>
        </div>
      </div>
    </Link>
  );
};

export default PostDemo;
