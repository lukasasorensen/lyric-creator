import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const newUser = await request.json();
    const client = await clientPromise;
    const collection = client.db("lyrical").collection("users");

    const userFound = await collection.findOne({ email: newUser.email });

    if (userFound) {
      return Response.json({ error: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    newUser.password = hashedPassword;

    delete newUser.confirmPassword;

    const createdSong = await collection.insertOne({
      ...newUser,
      createdAt: new Date(),
    });

    return Response.json(createdSong);
  } catch (e) {
    console.error(e);
    return Response.json({ error: e }, { status: 500 });
  }
}
