import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/lib/nextauth";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("lyrical");
    const songs = await db.collection("songs").find({}).sort({}).limit(100).toArray();
    return Response.json(songs);
  } catch (e) {
    console.error(e);
    return Response.json({ error: e }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("lyrical");
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Session Not Found");
    const newSong = await request.json();
    newSong.createdBy = session.user._id;
    const createdSong = await db.collection("songs").insertOne(newSong);
    return Response.json(createdSong);
  } catch (e) {
    console.error(e);
    return Response.json({ error: e }, { status: 500 });
  }
}
