import { CreateServiceDTO, HistoryDTO } from "@/utils/interfaces";
import { api } from "./api";

export const createService = async (data: CreateServiceDTO) => {
  const token = localStorage.getItem("token");
  const response = await api.post("/services", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getServices = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get("/services/my-services", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data;
}

export const getAllServices = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get("/services", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const updateService = async (serviceId: number, data: CreateServiceDTO) => {
  const token = localStorage.getItem("token");

  const response = await api.put(`/services/${serviceId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteService = async (serviceId: number) => {
  const token = localStorage.getItem("token");

  try {
    const response = await api.delete(`/services/${serviceId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // Aqui você pode tratar erros específicos ou repassar
    console.error("Erro ao deletar serviço:", error);
    throw error;
  }
};


export const getHistory = async (consumerId: number) => {
  const token = localStorage.getItem("token");
  const response = await api.get(`/history/${consumerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export const saveHistory = async (data: HistoryDTO) => {
  const token = localStorage.getItem("token");

  const response = await api.post("/history", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
