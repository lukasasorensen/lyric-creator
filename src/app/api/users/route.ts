import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const collection = client.db("lyrical").collection("users");
    const newUser = await request.json();

    const userFound = await collection.findOne({ email: newUser.email });

    if (userFound) {
      return Response.json({ error: "Email already exists" }, { status: 400 });
    }

    const createdSong = await collection.insertOne(newUser);
    return Response.json(createdSong);
  } catch (e) {
    console.error(e);
  }
}
