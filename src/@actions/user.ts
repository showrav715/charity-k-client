import { User } from "@/@types/user";
import { baseUrl } from "../BaseUrl";

const api = baseUrl;

const getUserDetails = async (token: string) => {
  const res = await fetch(`${api}/api/user/get-details`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

const GetWithdrawHistory = async (token: string, searchParams = null) => {
  let url = `${api}/api/user/withdraws`;

  if (searchParams) {
    const queryString = new URLSearchParams(searchParams).toString();
    url += `?${queryString}`;
  }

  const res = await fetch(`${url}`, {
    cache: "no-store",
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
      ContentType: "application/json",
    },
  });
  const data = await res.json();
  return data.response;
};

const UserUpdate = async (request: User, token: string) => {
  const formData = new FormData();

  Object.keys(request).forEach((key) => {
    const value = request[key];
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  const res = await fetch(`${api}/api/user/profile-settings`, {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();
  return data;
};

const SubmitWithdrawRequest = async (values, token: string) => {
  const formData = new FormData();

  Object.keys(values).forEach((key) => {
    const value = values[key];
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  const res = await fetch(`${api}/api/user/withdraw/request`, {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();
  return data;
};

const ResetPassword = async (
  old_pass: string,
  password: string,
  password_confirmation: string,
  token: string
) => {
  const res = await fetch(`${api}/api/user/change-password`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ old_pass, password, password_confirmation }),
  });

  const data = await res.json();
  return data;
};

const CreateAuction = async (request: any, token: string) => {
  const formData = new FormData();
  Object.keys(request).forEach((key) => {
    const value = request[key];
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
    if (key == "gallery") {
      value.map((file: any) => {
        formData.append("gallery[]", file);
      });
    }
  });

  const res = await fetch(`${api}/api/user/campaign/store`, {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();
  return data;
};

const UpdateCampaign = async (request: any, id: string, token: string) => {
  const formData = new FormData();
  Object.keys(request).forEach((key) => {
    const value = request[key];
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
    if (key == "gallery") {
      value.map((file: any) => {
        formData.append("gallery[]", file);
      });
    }
  });

  const res = await fetch(`${api}/api/user/campaign/update/${id}`, {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();
  return data;
};

const RemoveCampaign = async (id: number, token: string) => {
  const res = await fetch(`${api}/api/user/campaign/delete/${id}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      contentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data;
};

const RemoveGalleryPhoto = async (id: number, token: string) => {
  const res = await fetch(`${api}/api/user/campaign/gallery/remove/${id}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      contentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data;
};

const getUserCampaigns = async (token: string, searchParams = null) => {
  let url = `${api}/api/user/campaigns`;
  if (searchParams) {
    const queryString = new URLSearchParams(searchParams).toString();
    url += `?${queryString}`;
  }


  const res = await fetch(`${url}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      contentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.data;
};

const getSingleCampaign = async (id: number, token: string) => {
  const res = await fetch(`${api}/api/user/campaign/${id}`, {
    method: "GET",
    headers: {
      contentType: "application/json",
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data;
};

const getAllTickets = async (token: string, searchParams = null) => {
  let url = `${api}/api/user/support/tickets`;
  if (searchParams) {
    const queryString = new URLSearchParams(searchParams).toString();
    url += `?${queryString}`;
  }

  const res = await fetch(`${url}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      contentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.response;
};

const UserTicketSubmit = async (
  subject: string,
  message: string,
  token: string
) => {
  const formData = new FormData();
  formData.append("subject", subject);
  formData.append("message", message);

  const res = await fetch(`${api}/api/user/open/support/ticket`, {
    cache: "no-store",
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: "application/json",
      accept: "application/json",
    },
    body: formData,
  });

  const data = await res.json();
  return data;
};

const UserTicketReply = async (
  message: string,
  ticket_number: string,
  token: string
) => {
  const formData = new FormData();
  formData.append("message", message);
  formData.append("ticket_number", ticket_number);

  const res = await fetch(`${api}/api/user/reply/ticket/${ticket_number}`, {
    cache: "no-store",
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: "application/json",
      accept: "application/json",
    },
    body: formData,
  });

  const data = await res.json();
  return data;
};

const CloseTicket = async (ticket_number: string, token: string) => {
  const res = await fetch(`${api}/api/user/close/ticket/${ticket_number}`, {
    cache: "no-store",
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: "application/json",
      accept: "application/json",
    },
  });

  const data = await res.json();
  return data;
};

const getFundRaised = async (token: string, searchParams = null) => {
  let url = `${api}/api/user/funds-raised`;
  if (searchParams) {
    const queryString = new URLSearchParams(searchParams).toString();
    url += `?${queryString}`;
  }

  const res = await fetch(`${url}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      contentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.response;
};

const getUserDonations = async (token: string, searchParams = null) => {
  let url = `${api}/api/user/donations`;
  if (searchParams) {
    const queryString = new URLSearchParams(searchParams).toString();
    url += `?${queryString}`;
  }

  const res = await fetch(`${url}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      contentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.response;
};

const getTranactions = async (token: string, searchParams = null) => {
  let url = `${api}/api/user/transactions`;
  if (searchParams) {
    const queryString = new URLSearchParams(searchParams).toString();
    url += `?${queryString}`;
  }
  const res = await fetch(`${url}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      contentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.response;
};

const GetUserReplies = async (ticketNumber: string, token: string) => {
  let url = `${api}/api/user/support/ticket/messages/${ticketNumber}`;
  const res = await fetch(`${url}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      contentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.response;
};

const getDashboardData = async (token: string) => {
  let url = `${api}/api/user/dashboard`;

  const res = await fetch(`${url}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      contentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.data;
};

export {
  getUserDetails,
  UserUpdate,
  ResetPassword,
  CreateAuction,
  UpdateCampaign,
  RemoveGalleryPhoto,
  getUserCampaigns,
  getSingleCampaign,
  getAllTickets,
  UserTicketReply,
  UserTicketSubmit,
  CloseTicket,
  getUserDonations,
  getFundRaised,
  getTranactions,
  getDashboardData,
  GetUserReplies,
  GetWithdrawHistory,
  SubmitWithdrawRequest,
  RemoveCampaign,
};
