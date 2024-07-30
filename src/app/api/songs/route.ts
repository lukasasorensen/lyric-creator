import clientPromise from "@/lib/mongodb";

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("lyrical");
    const songs = await db.collection("songs").find({}).sort({}).limit(100).toArray();
    return Response.json(songs);
  } catch (e) {
    console.error(e);
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("lyrical");
    const newSong = await request.json();
    const createdSong = await db.collection("songs").insertOne(newSong);
    return Response.json(createdSong);
  } catch (e) {
    console.error(e);
  }
}
