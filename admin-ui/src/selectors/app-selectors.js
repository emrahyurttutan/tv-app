import menuLists from "../config/menu.json";
// import fileRoles from "../config/yetki.json";
import { groupBy, findObjectByKey } from "../utils";

export const groupMenuRoles = roles => {
  let yetkiroles = groupBy("SN");
  const objs = yetkiroles(roles);
  let resultObj = [];
  Object.keys(objs).forEach(element => {
    let elementRoles = groupBy("MN");
    resultObj.push({ name: element, children: elementRoles(objs[element]) });
  });
  // console.log("groupMenuRoles", resultObj);
  return resultObj;
};
export function authGetMenu(menus) {
  let response = [];
  if (menus) {
    let roles = groupMenuRoles(menus);
    menuLists.forEach((element, i) => {
      const roleSN = findObjectByKey(roles, "name", element.serviceName);
      if (roleSN && roleSN.name) {
        let children = [];
        if (element.children) {
          element.children.forEach(x => {
            if (roleSN && roleSN.children && roleSN.children[x.methodName]) {
              children.push(x);
            }
          });
        }

        element.children = children;
        response.push(element);
      }
    });
  }
  return response;
}
export const isRoutePath = (SN, menus) => {
  return findObjectByKey(menus, "serviceName", SN) ? true : false;
};
export const urlIsAuth = (url, SN, menus, currentUrl) => {
  if (url === currentUrl) {
    let result = 2;
    if (isRoutePath(SN, menus)) {
      result = 1;
      const currentMenus = findObjectByKey(menus, "serviceName", SN);
      if (
        currentMenus &&
        currentMenus.children &&
        currentMenus.children.length > 0
      ) {
        const menuChildren = findObjectByKey(currentMenus.children, "url", url);
        if (menuChildren) {
          result = 1;
        } else {
          result = 2;
        }
      }
    }
    return result;
  }
  return 0;
};

export const isAuthMethodName = (MN, SN, menus) => {
  let result = false;
  const currentSN = findObjectByKey(menus, "SN", SN);
  if (currentSN) {
    const currentMN = findObjectByKey(menus, "MN", MN);
    if (currentMN) {
      result = true;
    }
  }
  return result;
};
