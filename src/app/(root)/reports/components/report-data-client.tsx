"use client";

import { useDataStore } from "@/stores/data.store";
import { FeedbackType } from "@/types";
import { useLayoutEffect } from "react";

export const ReportDataClient = ({
  feedbacks = [],
}: {
  feedbacks?: FeedbackType[];
}) => {
  const setFeedback = useDataStore((state) => state.setFeedback);
  useLayoutEffect(() => {
    setFeedback(feedbacks);
  }, [setFeedback, feedbacks]);
  return <></>;
};
