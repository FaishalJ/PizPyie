import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Error from "./Error";

export default function EmptyCart({message} : {message: string}) {
  const navigate = useNavigate();
  return (
    <Error>
      <p>{message}</p>
      <Button btnType="cancel" onClick={() => navigate("/menu")}>⬅️ Back</Button>
    </Error>
  )
}