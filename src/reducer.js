export const initialState = {
    user: false,
    basket: [],
  };
 
  
  const reducer = (state, action) => {
    switch (action.type) {
      case "USER_YES":
        return {
            user: true
        };
     case "USER_NO" :
         return {
             user: false
         }
      default:
        return state;
    }
  };
  export default reducer;