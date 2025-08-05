// src/services/goalService.ts

import { api } from "@/context/AuthContext";
import { ContributeToGoalPayload, CreateGoalPayload, Goal, UpdateGoalPayload } from "@/types/goals";



/**
 * Busca a lista de metas de uma carteira.
 * @param walletId - O ID da carteira.
 * @returns Uma promessa com a lista de metas.
 */
export const listGoals = async (walletId: string): Promise<Goal[]> => {
  // O token já está nos headers da instância 'api'
  const response = await api.get<Goal[]>(`/goals?walletId=${walletId}`);
  return response.data; // O axios já retorna os dados no campo 'data'
};

/**
 * Cria uma nova meta.
 * @param payload - Os dados da nova meta.
 * @returns Uma promessa com a meta criada.
 */
export const createGoal = async (payload: CreateGoalPayload): Promise<Goal> => {
  const response = await api.post<Goal>("/goals", payload);
  return response.data;
};

/**
 * Adiciona uma contribuição a uma meta.
 * @param goalId - O ID da meta.
 * @param payload - O objeto com o valor da contribuição.
 */
export const contributeToGoal = async (
  goalId: string,
  payload: ContributeToGoalPayload
): Promise<void> => {
  // Para requisições sem retorno de conteúdo, podemos não precisar tipar a resposta.
  await api.post(`/goals/${goalId}/contribute`, payload);
};

/**
 * Atualiza os dados de uma meta.
 * @param goalId - O ID da meta.
 * @param payload - Os dados a serem atualizados.
 * @returns Uma promessa com a meta atualizada.
 */
export const updateGoal = async (
  goalId: string,
  payload: UpdateGoalPayload
): Promise<Goal> => {
  const response = await api.patch<Goal>(`/goals/${goalId}`, payload);
  return response.data;
};

/**
 * Remove uma meta.
 * @param goalId - O ID da meta a ser removida.
 */
export const deleteGoal = async (goalId: string): Promise<void> => {
  await api.delete(`/goals/${goalId}`);
};