"use client";
import React from "react";
import RequireAuth from "@/app/components/RequireAuth";
import LayoutCard from "@/app/components/Layout";
import ShowPlannedItem from "@/app/components/ShowPlannedItems";
import CreateReminder from "../components/createReminder";

export default function PlannedPage() {
  return (
    <RequireAuth>
      <LayoutCard title="Watch Later" subtitle="Items you marked as planned" className="my-20">
        <CreateReminder />
        <ShowPlannedItem />
      </LayoutCard>
    </RequireAuth>
  );
}