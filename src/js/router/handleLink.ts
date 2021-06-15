import router from "@/router";
import { BASE } from "@/constants";
import { closest } from "@/utils/dom";

const handleLink = (e: Event) => {
  e.preventDefault();
  const target = e.target as HTMLElement;
  const anchor = closest(target, "a") as HTMLAnchorElement;
  if (!anchor) return;

  const link = anchor.href.replace(BASE.URL, "");
  router.push(link);
};

export default handleLink;
