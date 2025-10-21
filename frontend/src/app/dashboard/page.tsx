"use client";
import React from "react";
import CreateMediaItem from "@/app/components/createMediaItem";
import ShowMediaItem from "@/app/components/showMediaItem";
import LayoutCard from "@/app/components/Layout";
import Logout from "@/app/components/Logout";
import RequireAuth from "@/app/components/RequireAuth";

export default function Dashboard() {
  return (
    <RequireAuth>
      <LayoutCard
        title="Dashboard"
        subtitle="Manage your watchlist — add, update, and remove items."
      >
        <div className="flex items-center justify-end mb-4">
          <Logout />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5">
            <CreateMediaItem />
          </div>

          <div className="md:col-span-7">
            <ShowMediaItem />
          </div>
        </div>
      </LayoutCard>
    </RequireAuth>
  );
}
