import connectDB from "@/lib/mongodb";
import Lodge from "@/models/Lodge";
import LodgeDetailsClient from "./LodgeDetailsClient";
import { notFound } from "next/navigation";

import { SerializedLodge } from "@/lib/types";

export const dynamic = "force-dynamic";

interface LodgePageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: LodgePageProps) {
  await connectDB();

  const { id } = await params;
  const lodge = await Lodge.findById(id).lean();

  if (!lodge) {
    notFound();
  }

  // Convert MongoDB IDs to strings for the client
  const serializedLodge = JSON.parse(JSON.stringify(lodge)) as SerializedLodge;

  return <LodgeDetailsClient lodge={serializedLodge} />;
}
