"use client";
import React from "react";
import RequireAuth from "@/app/components/RequireAuth";
import CreateMediaItem from "@/app/components/createMediaItem";
import ShowMediaItem from "@/app/components/showMediaItem";
import LayoutCard from "@/app/components/Layout";

export default function DashboardPage() {
  return (
    <RequireAuth>
      <LayoutCard className="my-20" title="Dashboard" subtitle="Manage your watchlist — add, update, and remove items.">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <CreateMediaItem />
          </div>
          <div className="lg:col-span-7">
            <ShowMediaItem />
          </div>
        </div>
      </LayoutCard>
    </RequireAuth>
  );
}
