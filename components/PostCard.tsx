import { Post } from "../types";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import { Avatar } from "@mui/material";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const postContent = post.node;
  return (
    <div className="mb-8 rounded-lg bg-white p-0 shadow-lg lg:pb-12 ">
      <div className="relative mb-6 overflow-hidden pb-80 shadow-md">
        <img
          src={postContent.featuredImage.url}
          alt={postContent.title}
          className="absolute h-80 w-full rounded-t-lg object-cover object-top
           shadow-lg lg:rounded-lg"
        />
      </div>
      <h1
        className="mb-8 cursor-pointer text-center text-3xl font-semibold
      transition duration-700 hover:text-pink-600 "
      >
        <Link href={`post/${postContent.slug}`}>{postContent.title}</Link>
      </h1>
      <div className="mb-8 block w-full items-center justify-center text-center lg:flex">
        <div className="mb-4 mr-8 flex w-full items-center justify-center lg:mb-0 lg:w-auto">
          {postContent.author.photo?.url ? (
            <img
              src={postContent.author.photo?.url}
              alt={postContent.author.name}
              className="rounded-full align-middle"
              height="30px"
              width="30px"
            />
          ) : (
            <Avatar className="h-[30px] w-[30px] rounded-full align-middle" />
          )}
          <p className="ml-2 inline align-middle text-lg text-gray-700">
            {postContent.author.name}
          </p>
        </div>
        <div className="font-medium text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 inline h-6 w-6 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{moment(postContent.createdAt).format("MMM DD, YYYY")}</span>
        </div>
      </div>
      <p className="mb-8 px-4 text-center text-lg font-normal text-gray-700">
        {postContent.excerpt}
      </p>
      <div className="text-center">
        <Link href={`/post/${postContent.slug}`}>
          <span
            className="mb-6 inline-block transform cursor-pointer 
          rounded-full bg-pink-600 px-8 py-3 text-lg font-medium
          text-white transition duration-500 hover:-translate-y-1 lg:mb-0"
          >
            Continue Reading
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
