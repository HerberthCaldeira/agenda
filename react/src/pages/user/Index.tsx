import Form from "./form/Form.tsx";
import Menu from "../authenticated/dashboard/components/menu/Index.tsx";
import MenuItem from "../authenticated/dashboard/components/menu/MenuItem.tsx";

export default function Index() {

    return (
        <div>
            <div>
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
            </div>
            <Form/>
        </div>
    )

}



