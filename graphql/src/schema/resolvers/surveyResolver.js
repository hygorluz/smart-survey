const api = require("../../config/http");

const getSurveys = async () => {
  try {
    const response = await api.get("survey");
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Erro ao buscar pesquisa:", error);
  }
};

const getSurveyById = async (_, args) => {
  try {
    const response = await api.get(`survey/${args.id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pesquisa:", error);
  }
};

const createSurvey = async (_, args) => {
  try {
    const response = await api.post("survey", {
      title: args.title,
      expiresAt: args.expiresAt,
      description: args.description,
      options: args.options,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar pesquisa:", error);
  }
};

const updateSurveyById = async (_, args) => {
  try {
    const response = await api.put(`survey/${args.id}`, {
      title: args.title,
      expiresAt: args.expiresAt,
      description: args.description,
      options: args.options,
    });
    return response.data; // Retorna a pesquisa atualizada
  } catch (error) {
    console.error("Erro ao atualizar pesquisa:", error);
  }
};

const deleteSurveyById = async (_, args) => {
  try {
    await api.delete(`survey/${args.id}`);
    return "Pesquisa deletada com sucesso."; // Retorna uma mensagem de sucesso
  } catch (error) {
    console.error("Erro ao deletar pesquisa:", error);
  }
};

const voteSurveyById = async (_, args) => {
  try {
    console.log(args);
    const response = await api.put(`survey/${args.id}/vote`, {
      optionId: args.optionId
    });
    return response.data; // Retorna a pesquisa atualizada
  } catch (error) {
    console.error("Erro ao votar na opção da pesquisa:", error);
  }
};

module.exports = {
  getSurveys,
  getSurveyById,
  createSurvey,
  updateSurveyById,
  deleteSurveyById,
  voteSurveyById
};
