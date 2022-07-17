// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";

import { GraphQLClient, gql } from "graphql-request";

// type Data = {
//   name: string;
// };

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: "John Doe" });
// }

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const commentToken = process.env.GRAPHCMS_TOKEN;

export default async function helloAPI(req, res) {
  console.log({ commentToken });
  // const { name, email, slug, comment } = req.body;
  const qraphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${commentToken}`
    }
  })

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!){
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) {id}
    }
  `
  try {
    const result = await qraphQLClient.request(query, req.body)
    return res.status(200).send(result);

  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }

}