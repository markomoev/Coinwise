import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import {supabase} from '../../client'

export default function accSettings(){
    const navigate = useNavigate();

    // displaying email and username
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')

    // edit states
    const [editMode, setEditMode] = useState(false);

        useEffect(() => {

            const detailsFetcher = async () => {

                // getting email from auth
                const { data: userData, error: getUserError } = await supabase.auth.getUser();  
                
                supabase.auth.onAuthStateChange((event) => {
                    if (event === 'SIGNED_IN' && getUserError)
                        {console.error('Error fetching email:', getUserError)};
                    })
                
                const user: any = userData?.user;
                if(!user){
                    return;
                }

                setEmail(user.email)

                // getting username from table
                const { data: profile, error: detailsFetchingError} = await supabase
                .from('users')
                .select('username')
                .eq('id', user.id)
                .maybeSingle()

                if(detailsFetchingError){
                    alert('Error in fetching username for input')
                    return;
                }

                if(profile){
                    setUsername(profile.username);
                    return;
                }
            }
            detailsFetcher(); 
        }, [])

    // edit user profile details
    const editProfile = () => {
        setEditMode(true);
    }

    // save edited changes
    const saveProfileChanges = async () => {
        setEditMode(false);
        
        const { data, error: getUserError } = await supabase.auth.getUser()

        if(getUserError) {
            console.error(getUserError);
            alert('Error in getting user data');
            return;
        }

        const user: any = data.user;

        const { error: updateUserError } = await supabase
        .from('users')
        .update({ username })
        .eq('id', user.id)

        if(updateUserError){
            console.error(updateUserError);
            alert('Erorr in updating user data');
            return;
        }
    }
    
    // cancel user changes

    const cancelProfileChanges = () => {
        setEditMode(false);
    }

    // log out user
    const logOutUser = async () => {
        const { error: signOutError } = await supabase.auth.signOut()

            if(signOutError){
                alert('Error in signing out')
                return;
            }

            navigate('/login')
    }


    // deleting users profile
    const deleteProfile = async () => {
        const { data, error: getUserError } = await supabase.auth.getUser()

        if(getUserError){
            alert(getUserError)
            return;
        }

        if(data){
            const user: any = data.user;    
            
            const { error: updateError } = await supabase
            .from('users')
            .update({ is_deleted: true, deleted_at: new Date()})
            .eq('id', user.id)

            if(updateError){
                alert('Erorr in updating the profile status')
                return;
            }

            const { error: signOutError } = await supabase.auth.signOut()

            if(signOutError){
                alert('Error in signing out')
                return;
            }

            navigate('/login')
        }

    }


    return(
        <div className ='md:w-auto w-[95%] bg-white/20 pl-[2%] pr-[2%] pb-5 rounded-2xl border border-black/10 shadow-lg'>
            <div className = 'w-full flex flex-col gap-5'>
                {/* Username */}
                <div className ='mb-3'>
                    <div className = 'mt-3'>
                        <p
                            className ='font-semibold text-lg bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>
                            Profile info   
                        </p>
                    </div>
                </div> 

                <form className ='w-1/2 flex md:gap-5 gap-4'>
                    <input readOnly = {!editMode}
                        className = 'bg-black/18 text-white p-1 pl-2 pr-2 rounded-md border border-black/10 shadow-sm'
                        type ='email'
                        placeholder ='Email here'
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                    />

                    <input readOnly = {!editMode}
                        className = 'bg-black/18 text-white p-1 pl-2 pr-2 rounded-md border border-black/10 shadow-sm'
                        type="text"
                        placeholder ='Username here'
                        value = {username}
                        onChange = {(e) => setUsername(e.target.value)}
                    />
                </form>

                <div className = 'flex flex-row justify-between'>
                    <div>
                        <button
                            onClick={editProfile} 
                            className ='pt-1 pb-1 pl-3 pr-3 cursor-pointer border border-black/10 hover:border-black/20 hover:shadow-sm bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent rounded-2xl font-bold text-md shadow-lg'>
                            Edit
                        </button>
                    </div>

                    <div className = 'flex flex-row gap-5'>
                        <button 
                            onClick = {saveProfileChanges}
                            className={` ${editMode ? '' : 'hidden'}
                                pt-1 pb-1 pl-3 pr-3 font-bold cursor-pointer border animate-pulse border-green-600 rounded-2xl text-green-700 shadow-lg`}>
                            Save
                        </button>

                        <button 
                            onClick = {cancelProfileChanges}
                            className={` ${editMode ? '' : 'hidden'}
                                pt-1 pb-1 pl-3 pr-3 font-bold cursor-pointer border animate-pulse border-black/20 hover:border-black/30 rounded-2xl text-black/50 shadow-lg`}>
                            Cancel
                        </button>

                        <button 
                            onClick={logOutUser}
                            className = 'pt-1 pb-1 pl-3 pr-3 cursor-pointer border border-black/10 hover:border-black/20 hover:shadow-sm bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent rounded-2xl font-bold text-md shadow-lg'>
                            Log out
                        </button>

                    </div>
                </div>
                
                <div className = 'flex flex-row items-center justify-center mt-7'>
                    <button 
                        onClick={deleteProfile}
                        className="pt-1 pb-1 pl-3 pr-3 font-bold cursor-pointer border border-red-600 rounded-2xl text-red-700 shadow-lg">
                        Delete profile
                    </button>
                </div>
            </div>
        </div>
    )
}