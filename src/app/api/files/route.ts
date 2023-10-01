import { NextResponse } from "next/server";
import pdf from "@cyber2024/pdf-parse-fixed";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const fileContents = await file.arrayBuffer();
  const parsedPdf = await pdf(Buffer.from(fileContents));

  
}