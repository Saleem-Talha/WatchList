"use client";
import React from "react";
import RequireAuth from "@/app/components/RequireAuth";
import CreateMediaItem from "@/app/components/createMediaItem";
import LayoutCard from "@/app/components/Layout";

export default function AddMediaPage() {
  return (
    <RequireAuth>
      <LayoutCard
        title="Add Media"
        subtitle="Add a new movie, series or anime"
        className="my-20"
      >
        <CreateMediaItem />
      </LayoutCard>
    </RequireAuth>
  );
}
