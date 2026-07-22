import RegisterUser from "./components/registerSection";
import RegisterSideDescription from "./components/userRegisterSideDescrip.tsx";

export default function Page(){
    return(
        <div className="flex h-screen">
            <div className="w-1/2 flex items-center justify-center bg-slate-100">
                <RegisterSideDescription/>
            </div>
            <div className="w-1/2 flex items-center justify-center bg-slate-100">
                <RegisterUser/>
            </div>
        </div>
    );
}