import MenuItem from "./MenuItem.tsx";

export default function Index() {
    return <>
        <ul>
            <li>
                <MenuItem label={"Home"} route={"/"}/>
            </li>
            <li>
                <MenuItem label={"Login"} route={"/login"}/>
            </li>
            <li>
                <MenuItem label={"Create User"} route={"/create/user"}/>
            </li>
        </ul>
    </>
}
