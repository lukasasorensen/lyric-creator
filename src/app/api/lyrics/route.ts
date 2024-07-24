import clientPromise from "@/lib/mongodb";
export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("lyrical");
    const lyrics = await db.collection("songs").find({}).sort({}).limit(100).toArray();
    return Response.json(lyrics);
  } catch (e) {
    console.error(e);
  }
}
