import { NextResponse } from "next/server";

import prisma from "@/utils/getPrismaClient";
import getRandomUserImageUrl from "@/utils/getRandomUserImageUrl";

export async function POST(request) {

  const user = await request.json();

  const checkEmail = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (checkEmail)
    return NextResponse.json(
      "This email is already associated with an account.",
      { status: 409 }
    );

  await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      hashedPassword: user.password,
      image: getRandomUserImageUrl(),
    },
  });

  return NextResponse.json("User registration successful!");
}
