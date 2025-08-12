
import { CreateServiceDTO } from "@/utils/types";
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
  const response = await api.get("/services", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data;
}


export const updateService = async (id: string, data: CreateServiceDTO) => {
  const token = localStorage.getItem("token");

  const response = await api.put(`/services/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteService = async (id: string) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Usuário não autenticado.");
  }

  try {
    const response = await api.delete(`/services/${id}`, {
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
