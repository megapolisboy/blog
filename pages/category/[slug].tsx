import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Categories, PostCard } from "../../components";
import { getCategories, getPostsByCategory } from "../../services";
import { Post, PostInfo } from "../../types";

interface CategoryPostsProps {
  posts: PostInfo[];
  categorySlug: string;
}

const CategoryPosts: NextPage<CategoryPostsProps> = ({
  posts,
  categorySlug,
}) => {
  return (
    <div className="container mx-auto mb-8 px-10">
      <Head>
        <title>
          {
            posts[0].categories.filter(
              (category) => category.slug === categorySlug
            )[0].name
          }
        </title>
      </Head>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 mb-10 lg:col-span-8">
          {posts.map((post, i) => (
            <PostCard key={post.title} post={{ node: post }} />
          ))}
        </div>

        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPosts;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(params?.slug);
  const posts = await getPostsByCategory(String(params?.slug));

  return {
    props: {
      posts,
      categorySlug: params?.slug,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking",
  };
};
