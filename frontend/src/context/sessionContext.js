import { createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restoreUser } from "../store/session";

export const SessionContext = createContext();

export const SessionProvider = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setLoading(false));
  }, [dispatch]);

  return (
    <SessionContext.Provider value={user}>
      {!loading && props.children}
    </SessionContext.Provider>
  );
};
