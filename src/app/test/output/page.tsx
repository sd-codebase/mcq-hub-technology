"use client";
import { Suspense } from "react";
import TestContent from "./TestContent";

export default function OutputTestPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TestContent />
    </Suspense>
  );
}
