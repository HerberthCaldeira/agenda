export const QUERY_KEYS_CONTACT = {
    useGetContact: (page: number, agendaId: number) => ["useGetContact", page, agendaId],
    useGetContactById: (agendaId: number, contactId: number) => ["useGetContact", agendaId, contactId]
};
