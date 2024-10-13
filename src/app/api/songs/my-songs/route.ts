import { authOptions } from "@/lib/nextauth";
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("lyrical");
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Session Not Found");
    const songsForUserId = await db
      .collection("songs")
      .find({ createdBy: session.user._id })
      .sort({})
      .limit(100)
      .toArray();

    return Response.json(songsForUserId);
  } catch (e) {
    console.error(e);
    return Response.json({ error: e }, { status: 500 });
  }
}
