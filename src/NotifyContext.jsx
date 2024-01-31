import { useReducer, createContext, useContext } from "react";

const notiReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTI":
        console.log('action', action)
      return action.payload;
    case "REMOVE_NOTI":
      return state = null;
    default:
      return state;
  }
};



const NotifyContext = createContext();

export const useNotifyValue = () => {
  const notifyAndDispatch = useContext(NotifyContext);
  return notifyAndDispatch.noti;
};

export const useNotifyDispatch = () => {
  const notifyAndDispatch = useContext(NotifyContext);
  return notifyAndDispatch.notiDispatch;
}

export const NotifyContextProvider = (props) => {
  const [noti, notiDispatch] = useReducer(notiReducer, null);

  return (
    <NotifyContext.Provider value={{ noti, notiDispatch }}>
      {props.children}
    </NotifyContext.Provider>
  );
};

export default NotifyContext;
