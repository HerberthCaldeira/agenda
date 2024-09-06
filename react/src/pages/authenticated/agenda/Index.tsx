import { Link, useSearchParams } from "react-router-dom";
import Paginate from "../../components/form/paginate/Paginate";
import useGetAgenda from "../../../actions/agenda/useGetAgenda.ts";
import { useQueryClient } from "@tanstack/react-query"

export default function Index() {

    const queryClient = useQueryClient();

    const [searchParams, setSearchParams] = useSearchParams();

    const page = searchParams.get("page")
        ? parseInt(searchParams.get("page"))
        : 1;

    const { data, isError, error } = useGetAgenda({ page });

    if (isError) {
        return <div>{JSON.stringify(error)}</div>;
    }

    return (
        <div>
            <div>
                Agenda list
            </div>
            <div>
                <Link to={"/dashboard/agenda/new"}>New</Link>
            </div>

            <table>
                <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>actions</th>
                </tr>
                </thead>
                <tbody>
                {data &&
                    data?.data.map((i) => {
                        return (
                            <tr key={i.id}>
                                <td>{i.id} </td>
                                <td>{i.name}</td>
                                <td><Link to={`/dashboard/agenda/${i.id}/contact`}>see</Link></td>
                                <td>{i?.permissions?.length == 0 && (<Link to={`/dashboard/agenda/${i.id}/share`}>share</Link>)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <Paginate data={data}/>
        </div>
    );
}

