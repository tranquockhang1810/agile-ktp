import { AuthenRepo } from "@/api/features/authenticate/AuthenRepo";
import { RegisterRequestModel } from "@/api/features/authenticate/model/RegisterModel";
import { log } from "console";
import { useState } from "react";

const SignUpViewModel = (repo: AuthenRepo) => {

    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const handleSignUp = async (data: RegisterRequestModel) => {
       try {
        console.log("Sign up data:", data);
        
            setIsLoading(true);
            const response = await repo.register({
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address,
                password: data.password,
                
            });
            console.log("Đăng ký thành công:", response); // check có bị lỗi ở đây không
            if (!response.error) {
                console.log("Sign up successful:", response.data);
                
            } else {
                console.error("Sign up failed:", response.data);
                console.log("Error message:", response.error.message);
                
                // Handle sign up failure (e.g., show error message)
            }
        }
        catch (error) {
            console.error("Error during sign up:", error);
        }
        finally {
            setIsLoading(false);
        }
    };
    
    return {
        isLoading,
        handleSignUp,
    };
    }
export default SignUpViewModel;