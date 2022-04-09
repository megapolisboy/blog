import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import {
  Categories,
  Header,
  PostCard,
  PostDemo,
  PostWidget,
} from "../components";
import FeaturedPosts from "../components/FeaturedPosts";
import { getPosts } from "../services";
import { Post } from "../types";

interface HomeProps {
  posts: Post[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <div className="container mx-auto mb-8 px-10">
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts posts={posts} />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 mb-10 lg:col-span-8">
          {posts.map((post, i) => (
            <PostCard key={post.node.title} post={post} />
          ))}
        </div>

        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const posts = ((await getPosts()) as any[]) || [];
  return {
    props: { posts },
    revalidate: 60,
  };
};
