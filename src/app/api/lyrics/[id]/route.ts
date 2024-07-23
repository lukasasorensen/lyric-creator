import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db("lukasasorensen");
    console.log("id ===" + params.id);
    const lyrics = await db
      .collection("lyrics")
      .findOne({ _id: new ObjectId(params.id) });

    if (!lyrics) {
      // todo
      return NextResponse.json({ error: "Not Found" }, { status: 500 });
    }

    return Response.json(lyrics);
  } catch (e) {
    console.error(e);
  }
}
