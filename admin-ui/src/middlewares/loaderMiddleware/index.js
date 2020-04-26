import list from "../../loader-middleware-config";
let temp = {};
const PendingControl = obj => {
  let status = false;
  Object.keys(temp).forEach(function(item) {
    Object.keys(temp[item]).forEach(function(prop) {
      status = temp[item].pending;
    });
  });
  return status;
};

const loaderMiddleware = store => next => action => {
  try {
    const activeLoaderGroup =
      action.meta && action.meta.loaderGroup ? action.meta.loaderGroup : "";
    let isPending = PendingControl(temp);
    if (typeof activeLoaderGroup !== "undefined" && activeLoaderGroup !== "") {
      if (typeof temp[activeLoaderGroup] == "undefined") {
        temp[activeLoaderGroup] = {
          counter: 0,
          loaderGroup: activeLoaderGroup,
          pending: true
        };
        if (!isPending) {
          store.dispatch({
            type: "SHOW_LOADER"
          });
        }
      }
      list[activeLoaderGroup].methods.forEach(element => {
        if (
          element.name === action.type.replace("_FULLFILLED", "") ||
          element.name === action.type.replace("_REJECTED", "")
        ) {
          temp[activeLoaderGroup].counter = temp[activeLoaderGroup].counter + 1;

          if (
            temp[activeLoaderGroup].counter ===
            list[activeLoaderGroup].methods.length
          ) {
            delete temp[activeLoaderGroup];
            isPending = PendingControl(temp);
            if (!isPending) {
              //console.log("HIDE LOADER");
              setTimeout(() => {
                store.dispatch({
                  type: "HIDE_LOADER"
                });
              }, 300);
            }
          }
        }
      });
    }
  } catch (error) {
    console.log("LOADER BEKLENMEYEN BİR DURUM YAŞIYORUZ.", error);
    // throw error;
  }
  return next(action);
};

export default loaderMiddleware;
