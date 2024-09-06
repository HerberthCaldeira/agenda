import { Link, useSearchParams } from "react-router-dom";
import Paginate from "../../components/form/paginate/Paginate";
import useGetAgenda from "../../../actions/agenda/useGetAgenda.ts";

export default function Index() {
    console.log("render agenda index");

    const [searchParams, setSearchParams] = useSearchParams();

    const page = searchParams.get("page")
        ? parseInt(searchParams.get("page"))
        : 1;

    const { data, isError, error } = useGetAgenda({ page });

    if (isError) {
        return <div>{JSON.stringify(error)}</div>;
    }
    // <pre>{JSON.stringify(data, null, 2)}</pre>
    return (
        <div>
            <div>
                agenda page {page}
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
                                <td>{i.name} </td>
                                <td>| <Link to={`/dashboard/agenda/${i.id}/share`}>share</Link> | </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <Paginate data={data}/>
        </div>
    );
}

