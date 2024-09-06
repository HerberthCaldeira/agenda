import { useSearchParams } from "react-router-dom";

export default function Paginate({ data }) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    data?.meta?.links?.length > 0 && (
      <div className="">
        <div className="" style={{ display: "flex" }}>
          {data?.meta?.links.map((link, key) =>
            link.url === null || !parseInt(link.label) ? (
              <div key={key}>{link.label} </div>
            ) : (
              <span
                style={{
                  cursor: "pointer",
                  color: searchParams.get("page") == link.label ? "red" : "",
                }}
                key={key}
                onClick={() => {
                  searchParams.set("page", parseInt(link.label));
                  setSearchParams(searchParams);
                  return;
                }}
              >
                {link.label}
              </span>
            ),
          )}
        </div>
      </div>
    )
  );
}
