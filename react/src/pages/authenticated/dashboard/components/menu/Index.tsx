import MenuItem from "./MenuItem";

export default function Index() {
  return (
    <>
      <ul>
        <li>
          <MenuItem label={"Dasboard"} route={"/dashboard"} />
        </li>
        <li>
          <MenuItem label={"Agenda"} route={"/dashboard/agenda"} />
        </li>

      </ul>
    </>
  );
}
