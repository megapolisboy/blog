export interface AuthorType {
  bio: string;
  name: string;
  id: string;
  photo: {
    url: string;
  };
}

interface PostInfo {
  author: AuthorType;
  createdAt: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: {
    url: string;
  };
  categories: [
    {
      name: string;
      slug: string;
    }
  ];
}

export interface Post {
  node: PostInfo;
}

export interface WidgetPost {
  title: string;
  featuredImage: {
    url: string;
  };
  createdAt: string;
  slug: string;
}

export interface Category {
  name: string;
  slug: string;
}

export interface PostDetails extends PostInfo {
  content: {
    raw: {
      children: [
        {
          children: any[];
          type: any;
        }
      ];
    };
  };
}

export interface CommentType {
  name: string;
  email: string;
  comment: string;
  slug: string;
}

export interface CommentSimplified {
  name: string;
  createdAt: string;
  comment: string;
}
