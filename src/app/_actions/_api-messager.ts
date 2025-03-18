import { AxiosError } from "axios";

enum ApiErrorType {
  USER_NOT_FOUND = "USER_NOT_FOUND",
  USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS",
  USER_UNAUTHORIZED = "USER_UNAUTHORIZED",
  COMMUNITY_NOT_FOUND = "COMMUNITY_NOT_FOUND",
  COMMUNITY_ALREADY_EXISTS = "COMMUNITY_ALREADY_EXISTS",
  COMMUNITY_UNAUTHORIZED = "COMMUNITY_UNAUTHORIZED",
  OWNER_CANNOT_JOIN = "OWNER_CANNOT_JOIN",
  USER_ALREADY_JOINED = "USER_ALREADY_JOINED",
  NOT_MEMBER = "NOT_MEMBER",
}

interface ExpectedResponse {
  type: ApiErrorType;
  message: string;
}

export const ERROR_MESSAGES: Record<ApiErrorType, string> = {
  [ApiErrorType.USER_NOT_FOUND]: "Usuário não encontrado.",
  [ApiErrorType.COMMUNITY_NOT_FOUND]: "Comunidade não encontrada.",
  [ApiErrorType.USER_ALREADY_EXISTS]: "Usuário já existe.",
  [ApiErrorType.COMMUNITY_ALREADY_EXISTS]: "Comunidade já existe.",
  [ApiErrorType.COMMUNITY_UNAUTHORIZED]:
    "Você não possui permissão necessária para essa comunidade.",
  [ApiErrorType.USER_UNAUTHORIZED]: "Usuário não autorizado.",
  [ApiErrorType.OWNER_CANNOT_JOIN]:
    "Dono da comunidade não pode entrar na própria comunidade",
  [ApiErrorType.USER_ALREADY_JOINED]: "Usuário já é membro da comunidade",
  [ApiErrorType.NOT_MEMBER]: "Usuário não é membro da comunidade",
};

export type CustomMessage = {
  [apiErroType: string]: string;
};

export function handleApiError(error: unknown, customMessage?: CustomMessage) {
  if (!(error instanceof AxiosError) || !error.response) {
    throw new Error(
      "Não foi possível realizar a operação. Tente novamente mais tarde.",
    );
  }

  const { type } = error.response.data as ExpectedResponse;

  return {
    message: (customMessage && customMessage[type]) || ERROR_MESSAGES[type],
    type,
  };
}
