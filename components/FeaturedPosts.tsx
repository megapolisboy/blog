import { useEffect, useState } from "react";
import { Post } from "../types";
import PostDemo from "./PostDemo";

interface FeaturedPostsProps {
  posts: Post[];
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts }) => {
  const getNumberOfPostsByWindowSize = (width: number) => {
    if (width < 640) {
      return 1;
    } else if (width >= 640 && width < 768) {
      return 2;
    } else if (width >= 768 && width < 1024) {
      return 3;
    } else {
      return 5;
    }
  };

  const [numberOfPosts, setNumberOfPosts] = useState(0);

  useEffect(() => {
    setNumberOfPosts(window.innerWidth);
    window.addEventListener("resize", () => {
      setNumberOfPosts(getNumberOfPostsByWindowSize(window.innerWidth));
    });

    return () => {
      window.removeEventListener("resize", () => {
        setNumberOfPosts(getNumberOfPostsByWindowSize(window.innerWidth));
      });
    };
  }, []);

  return (
    <div className="mb-10 flex gap-5 lg:mb-5">
      {posts.slice(0, numberOfPosts).map((post, i) => (
        <PostDemo key={post.node.title} post={post} />
      ))}
    </div>
  );
};
export default FeaturedPosts;
