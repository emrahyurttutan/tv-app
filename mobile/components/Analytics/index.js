import { Analytics, PageHit } from "expo-analytics";
import { analycticsKey } from "../../constants/Const";
const analytics = new Analytics(analycticsKey);

export default function AnalyticsPageHit(screenName) {
  analytics.hit(new PageHit(screenName));
}
