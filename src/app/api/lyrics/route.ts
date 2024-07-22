import clientPromise from "../../../../lib/mongodb";
export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("lukasasorensen");
    const lyrics = await db.collection("lyrics").find({}).sort({}).limit(100).toArray();
    return Response.json(lyrics);
  } catch (e) {
    console.error(e);
  }
}

// import { NextApiRequest, NextApiResponse } from 'next';
//
// export default async (req: NextApiRequest, res: NextApiResponse) => {
//     try {
//         const client = await clientPromise;
//         const db = client.db("sample_mflix");
//         const movies = await db
//             .collection("movies")
//             .find({})
//             .sort({ metacritic: -1 })
//             .limit(10)
//             .toArray();
//         res.json(movies);
//     } catch (e) {
//         console.error(e);
//     }
// }
