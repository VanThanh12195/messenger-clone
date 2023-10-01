import { NextResponse } from "next/server";
import getUserCollection from "@/utils/getUserCollection";

export async function POST(request) {
  const [client, collection] = await getUserCollection();

  try {
    const user = await request.json();

    const checkEmail = await collection.findOne({ email: user.email });

    if (checkEmail)
      return NextResponse.json(
        "This email is already associated with an account.",
        { status: 409 }
      );

    const response = await collection.insertOne(user);

    return NextResponse.json("User registration successful!");
  } catch (error) {
    return NextResponse.json(error);
  } finally {
    client.close();
  }
}
