"use client";
import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-12 h-12 border-4 border-primary border-t-primary_light rounded-full animate-spin"></div>
    </div>
  );
};