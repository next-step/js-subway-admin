import router from "@/router";
import { closest } from "@/utils/dom";

const handleLink = (e: Event) => {
  e.preventDefault();
  const target = e.target as HTMLElement;
  const anchor = closest(target, "a") as HTMLAnchorElement;
  if (!anchor) return;

  const link = anchor.href.replace("http://localhost:8080", "");
  router.push(link);
};

export default handleLink;
