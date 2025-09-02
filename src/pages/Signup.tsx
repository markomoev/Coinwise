import { useState } from "react"
import TopBar from "../components/global/TopBar"
import { Link, useNavigate } from "react-router-dom"
import {supabase} from '../client'

export default function SignUpPage(){

    const navigate = useNavigate();

    // Variables
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    // Handling user data
    const handleSignUp = async (e:any) => {
        e.preventDefault();

        //Requirements for the password
        if(password.length > 6 && /[A-Z]/.test(password) && /\d/.test(password) ){
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { username }
                }
            })

            const {error: insertError} = await supabase
            .from("users")
            .insert({
                username: username,
            })

            if(insertError){
                alert('Error in inserting the data!')
            }

            if(error){
                alert('Error in fetching data!');
            }
            if(data){
                navigate('/home');
            }
        }else{
            alert('Password must contain at least one upper case and number!')
        }

            setUsername('');
            setEmail('');
            setPassword('');
    }

    return(
        <div className = 'w-full h-full flex flex-col'>
            <div className = 'w-full flex items-center justify-center'>
                <TopBar/>
            </div>


            <div className ='w-full flex justify-center sm:flex-row flex-col'>
                <form 
                    onSubmit = {handleSignUp}
                    className = 'lg:w-1/2 lg:pl-[15%] w-full h-full flex items-center justify-center mt-[10%]'>
                    <div className = 'bg-white/10 shadow-xl border border-black/10 w-fit pt-4 pb-6 p-20 rounded-3xl flex flex-col gap-13 items-center justify-center'>
                        
                        <p className="text-3xl font-bold text-gray-600">Signup</p>

                        <input required
                            name = 'username'
                            type="text" 
                            placeholder = 'Username'
                            value = {username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-gray-600/30 text-white p-1 pl-2 pr-2 rounded-md"
                        />
                        
                        
                        <input required
                            name = 'email'
                            type="email" 
                            placeholder = 'Email'
                            value = {email}
                            onChange={(e) => setEmail(e.target.value)} 
                            className="bg-gray-600/30 text-white p-1 pl-2 pr-2 rounded-md"
                        />
                        
                        
                        <input required
                            name = 'password'
                            type="password" 
                            placeholder = 'Password'
                            value = {password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-600/30 text-white p-1 pl-2 pr-2 rounded-md"
                        />

                        <button className = 'bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-2 pl-4 pr-4 cursor-pointer text-xl text-white font-semibold'>
                            Signup
                        </button>
                    </div>
                </form>

                <div className="lg:w-1/2 lg:pr-[15%] w-full h-full flex flex-col mt-[10%] items-center justify-center">
                    <div className="w-full text-center mt-20">
                        <p className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                            Log into you account!
                        </p>
                        <p>
                            Motivational speech in order to lie people <br/>
                            so they can join <br/> our stupid comuity
                            just for money
                        </p>
                        
                        <div className="mt-10">
                            <p>Have an account? Don't waste your time:</p>
                            <Link to = {'/login'} className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent underline font-semibold">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}