import {
  SET_CATEGORY_LIST,
  SET_PAGE_EDIT_DATA,
  SET_CHANNEL_LIST
} from "./actions/action-types";
let middlewareConfig = {
  category: {
    methods: [{ name: SET_CATEGORY_LIST }]
  },
  channels: {
    methods: [{ name: SET_CHANNEL_LIST }]
  },
  pageEdit: { methods: [{ name: SET_PAGE_EDIT_DATA }] }
};
export default middlewareConfig;
