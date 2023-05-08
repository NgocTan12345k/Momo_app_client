import { APIClient } from "./axiosClient";
const DonationAPI = {
  getAllDonation: () => {
    const url = "/donation/";
    return APIClient.get(url);
  },
  addDonation: (data) => {
    const url = "/donation/add";
    return APIClient.post(url, data);
  },
  getHistoryDonation: (user_id) => {
    const url = `/donation/history/${user_id}`;
    return APIClient.get(url);
  },
};
export default DonationAPI;
