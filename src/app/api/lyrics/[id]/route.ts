import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db("lukasasorensen");
    const lyrics = await db
      .collection("lyrics")
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
    const updateObject = request.json();
    const client = await clientPromise;
    const db = client.db("lukasasorensen");
    const lyrics = await db
      .collection("lyrics")
      .findOneAndUpdate({ _id: new ObjectId(params.id) }, updateObject);

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
