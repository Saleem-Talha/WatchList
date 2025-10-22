"use client";
import RequireAuth from "@/app/components/RequireAuth";
import ShowMediaItem from "@/app/components/showMediaItem";
import LayoutCard from "@/app/components/Layout";

export default function MediaListPage() {
  return (
    <RequireAuth>
      <LayoutCard
        title="Media Library"
        subtitle="Browse and manage your entire media collection"
      >
        <ShowMediaItem />
      </LayoutCard>
    </RequireAuth>
  );
}