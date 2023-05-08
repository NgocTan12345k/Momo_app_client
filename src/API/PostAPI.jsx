import { APIClient } from "./axiosClient";

const PostAPI = {
  getAllPost: () => {
    const url = "/post";
    return APIClient.get(url);
  },
  getPostDetail: (id) => {
    const url = `/post/${id}`;
    return APIClient.get(url);
  },
};

export default PostAPI;
