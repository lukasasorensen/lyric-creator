import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db("lyrical");
    const lyrics = await db
      .collection("songs")
      .findOne({ _id: new ObjectId(params.id) });

    if (!lyrics) {
      // todo
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    return Response.json(lyrics);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const updateObject = await request.json();
    delete updateObject._id;
    const client = await clientPromise;
    const db = client.db("lyrical");
    const results = await db
      .collection("songs")
      .updateOne({ _id: new ObjectId(params.id) }, { $set: updateObject });

    if (!results.matchedCount) {
      // todo
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    return Response.json(results);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
