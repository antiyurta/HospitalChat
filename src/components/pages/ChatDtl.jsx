import React from "react";
import { useNavigate } from "react-router-dom";

function ChatDtl() {
  const navigate = useNavigate();
  return (
    <div>
      <div onClick={() => navigate(-1)}>Буцах</div>
    </div>
  );
}

export default ChatDtl;
