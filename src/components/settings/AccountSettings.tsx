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
        <div className="w-full max-w-2xl bg-white/90 border border-black/10 backdrop-blur-xl shadow-lg rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-purple-50 p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div>
                        <h2 className="text-2xl font-bold text-purple-700">Account Settings</h2>
                        <p className="text-gray-600">Manage your profile information and preferences</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
                {/* Profile Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Profile Information</h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input 
                                readOnly={!editMode}
                                className={`w-full p-3 rounded-xl border transition-all duration-200 ${
                                    editMode 
                                        ? 'bg-white border-purple-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200' 
                                        : 'bg-gray-50 border-gray-200 text-gray-600'
                                }`}
                                type="email"
                                placeholder="Your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <input 
                                readOnly={!editMode}
                                className={`w-full p-3 rounded-xl border transition-all duration-200 ${
                                    editMode 
                                        ? 'bg-white border-purple-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200' 
                                        : 'bg-gray-50 border-gray-200 text-gray-600'
                                }`}
                                type="text"
                                placeholder="Your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                    {!editMode ? (
                        <>
                            <button
                                onClick={editProfile}
                                className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 font-medium"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit Profile
                            </button>
                            
                            <button
                                onClick={logOutUser}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={saveProfileChanges}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 font-medium"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Save Changes
                            </button>
                            
                            <button
                                onClick={cancelProfileChanges}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Cancel
                            </button>
                        </>
                    )}
                </div>

                {/* Danger Zone */}
                <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <h4 className="text-lg font-semibold text-red-800 mb-2">Danger Zone</h4>
                    <p className="text-red-600 text-sm mb-4">
                        Deleting your account will permanently remove all your data. This action cannot be undone.
                    </p>
                    <button
                        onClick={deleteProfile}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 hover:shadow-lg transition-all duration-200 font-medium"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    )
}