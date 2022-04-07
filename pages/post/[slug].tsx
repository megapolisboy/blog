import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import {
  Author,
  Categories,
  Comments,
  CommentsForm,
  PostDetail,
  PostWidget,
} from "../../components";
import { getPostDetails, getPosts } from "../../services";
import { PostDetails } from "../../types";

interface PostDetailsProps {
  post: PostDetails;
}

const PostDetails: NextPage<PostDetailsProps> = ({ post }) => {
  return (
    <>
      <Head>
        <title>Post Details</title>
      </Head>
      <div className="container mx-auto mb-8 px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            <Author author={post.author} />
            <CommentsForm slug={post.slug} />
            <Comments slug={post.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative top-8 lg:sticky">
              <PostWidget
                slug={post.slug}
                categories={post.categories.map((category) => category.slug)}
              />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetails;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // TODO: add incremental static regeneration
  const postDetails = await getPostDetails(String(params?.slug));
  console.log(postDetails);
  return {
    props: {
      post: postDetails,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
};
