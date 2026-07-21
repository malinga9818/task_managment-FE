import LoginSection from "./components/loginSection";
import LoginSideDescription from "./components/userLoginSideDescrip";

export default function Page(){
    return(
        <div className="flex h-screen">
            <div className="w-1/2 flex items-center justify-center bg-slate-100">
                <LoginSideDescription/>
            </div>

            <div className="w-1/2 flex items-center justify-center bg-slate-100">
                <LoginSection/>
            </div>
        </div>
    )
}