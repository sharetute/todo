import {ParamMap} from "@angular/router";

export class RouterUtil {

  public static fromParamMapToObject(paramMap: ParamMap): { [k: string]: any } {

    let params: { [k: string]: any } = {};

    paramMap.keys.forEach((key) => params[key] = paramMap.getAll(key));

    return params;
  }

  public static urlContains(url: string, ...routes: Array<string>) {

    if (!url) {
      return;
    }

    for (let route of routes) {
      if (url?.indexOf(route) !== -1) {
        return true;
      }
    }
    return false;
  }

}
