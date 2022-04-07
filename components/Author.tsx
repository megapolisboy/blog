import { Avatar } from "@mui/material";
import Image from "next/image";
import { AuthorType } from "../types";

interface AuthorProps {
  author: AuthorType;
}

const Author: React.FC<AuthorProps> = ({ author }) => {
  return (
    <div
      className="relative mt-20 mb-8 rounded-lg bg-black bg-opacity-20 p-12 
    text-center"
    >
      <div className="absolute left-0 right-0 -top-14">
        {author.photo?.url ? (
          <Image
            alt={author.name}
            unoptimized
            height="100px"
            width="100px"
            className="rounded-full align-middle"
            src={author.photo.url}
          />
        ) : (
          <Avatar className="mx-auto h-[100px] w-[100px] rounded-full" />
        )}
      </div>
      <h3 className="my-4 text-xl font-bold text-white">{author.name}</h3>
      <p className="text-lg text-white">{author.bio}</p>
    </div>
  );
};

export default Author;
