import useGetAgenda from "../useGetAgenda.ts";

export const QUERY_KEYS_AGENDA = {
    useGetAgenda:() => ["useGetAgenda"],
    useGetUsersForShare: (page: number, agendaId: number) => ["useGetUsersForShare", page, agendaId],
};
