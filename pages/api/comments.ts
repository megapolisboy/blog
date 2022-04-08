// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { gql, GraphQLClient } from "graphql-request";
import type { NextApiRequest, NextApiResponse } from "next";
import { CommentType } from "../../types";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!;

export default async function comments(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN!}`,
    },
  });

  const query = gql`
    mutation CreateComment(
      $name: string!
      $email: string!
      $comment: string!
      $slug: string!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      )
    }
  `;

  const result = await graphQLClient.request(query, req.body as CommentType);

  return res.status(200).send(result);
}
