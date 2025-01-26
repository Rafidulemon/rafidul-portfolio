"use client";
import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 border-4 border-primary_light border-t-transparent rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}
