import {useNavigate} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import React, {useState} from "react";
import axios from "axios";
import url from "../../common/url";
import {toast} from "react-toastify";
import {VscVerified} from "react-icons/vsc";

const ProfileContent = ({user}) => {
    const [openEye, setOpenEye] = useState(true)
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const navigate = useNavigate()
    const active = 'show active'

    const handleEyeIcon = () => {
        setOpenEye(!openEye)
    }

    const handleEmailVerification = () => {
        console.log("sf")
        console.log(user.isEmailConfirmed)
    }

    user.isEmailConfirmed = false;

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (currentPassword === '') {
                toast.error("Current Password is Required")
                return
            }
            if (newPassword === '') {
                toast.error("New Password is Required")
                return
            }
            if (currentPassword === newPassword) {
                toast.warn("New Password cannot be the current Password")
                return
            }
            const updatedUser = {
                username: user.userName, currentPassword: currentPassword, newPassword: newPassword
            }
            await axios.patch(`${url.proxy_api}auth/changePassword`, updatedUser).then((res) => {
                const response = res.data
                if (response.statusCode !== 200) {
                    toast.error(response.message)
                    return
                }
                toast.success(response.message)
                setNewPassword('')
                setCurrentPassword('')
            }).catch((e) => {
                console.error(e)
                toast.error("An Error occurred")
            })
        } catch (e) {
            console.error(e)
        }
    }

    return (<>
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
                        <h3 className={" d-inline"}>{user.name}</h3>
                        {user.isEmailConfirmed && (
                            <span className={'d-inline px-3 text-success'}><VscVerified size={24}/></span>
                        )}
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
                                    {user && user.isEmailConfirmed ? (
                                        <b>
                                            <i className="text-success user-select-none"
                                               style={{fontFamily: 'Saira'}}>
                                                <VscVerified size={20}/> Verified</i>
                                        </b>
                                    ) : (
                                        <b>
                                            <i className="text-danger user-select-none" style={{fontFamily: 'Saira'}}>
                                                Not Verified</i>
                                        </b>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-inner">
                                    <label>Current Password *</label>
                                    <input
                                        type={openEye ? 'password' : 'text'}
                                        id="password"
                                        placeholder="Current Password"
                                        value={currentPassword}
                                        onChange={(e) => {
                                            setCurrentPassword(e.target.value)
                                        }}
                                    />
                                    <i
                                        className={openEye ? 'bi bi-eye-slash' : 'bi bi-eye-slash bi-eye'}
                                        onClick={handleEyeIcon}
                                        id="togglePassword"
                                    />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-inner">
                                    <label>New Password *</label>
                                    <input
                                        type={openEye ? 'password' : 'text'}
                                        id="newpassword"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => {
                                            setNewPassword(e.target.value)
                                        }}
                                    />
                                    <i
                                        className={openEye ? 'bi bi-eye-slash' : 'bi bi-eye-slash bi-eye'}
                                        onClick={handleEyeIcon}
                                        id="togglePassword"
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="button-group">
                                    <button type="submit" className="eg-btn profile-btn">
                                        Update Profile
                                    </button>
                                    <button className="eg-btn cancel-btn" type={"button"}>Cancel</button>
                                    {!user.isEmailConfirmed && (
                                    <button className="eg-btn cancel-btn2 mx-3" type={"button"}>Verify Email</button>
                                    )}

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>)
}

export default ProfileContent
