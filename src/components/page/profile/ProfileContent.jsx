import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ProfileContent = ({user}) => {

    const navigate = useNavigate()
    const active = 'show active'

    const handleSubmit = (e) => {
        e.preventDefault()
        toast.info('Profile Updated Successfully')
        setTimeout(() => {
            navigate('/')
        }, 1200)
    }

    return (
        <>
            <div
                className={`tab-pane fade`}
                id="v-pills-profile"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
            >
                <div className="dashboard-profile">
                    <div className="owner">
                        <div className="image">
                            <img alt="images" src={'/images/bg/pro-pic.png'}/>
                        </div>
                        <div className="content">
                            <h3>{user.name}</h3>
                            <p className="para">{user.roleUser === 'staff' ? 'Staff' : 'User'}</p>
                        </div>
                    </div>
                    <div className="form-wrapper">
                        <form action="#" onSubmit={(e) => handleSubmit(e)}>
                            <div className="row">
                                <div className="col-xl-12 col-lg-12 col-md-6">
                                    <div className="form-inner">
                                        <label>User Name</label>
                                        <input type="text" placeholder={'Name'} value={user.name} disabled={true}/>
                                    </div>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-6">
                                    <div className="form-inner">
                                        <label>Contact Number</label>
                                        <input type="text" placeholder={'+977'} value={user.phoneNumber} disabled={true}/>
                                    </div>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-6">
                                    <div className="form-inner">
                                        <label>Email</label>
                                        <input type="text" placeholder="Your Email" value={user.email} disabled={true}/>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="button-group">
                                        <button type="submit" className="eg-btn profile-btn">
                                            Update Profile
                                        </button>
                                        <button className="eg-btn cancel-btn" type={"button"}>Cancel</button>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileContent
