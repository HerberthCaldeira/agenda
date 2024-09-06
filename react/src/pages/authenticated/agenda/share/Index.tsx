import { useParams } from 'react-router-dom';
export default function Index(){
    let { agendaId } = useParams();
    console.log('agendaId', agendaId);
    return (
        <div></div>
    )
}
