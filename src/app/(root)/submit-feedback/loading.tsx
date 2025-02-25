import { LoaderCircle } from "lucide-react";
import React from "react";

const SubmitFeedbackLoadingPage = () => {
  return (
    <div className="h-96 flex items-center justify-center">
      <LoaderCircle className="animate-spin" />
    </div>
  );
};

export default SubmitFeedbackLoadingPage;
