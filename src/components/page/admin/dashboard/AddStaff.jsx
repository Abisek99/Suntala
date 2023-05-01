import React, {useState} from 'react'


import url from '../../../common/url'
import axios from 'axios'
import useLocalState from '../../../utils/LocalState'
import {toast} from 'react-toastify'


const AddStaff = () => {
    const {alert, showAlert, loading, setLoading, hideAlert} = useLocalState()

    const [staffName, setStaffName] = useState('')
    const [staffEmail, setStaffEmail] = useState('')
    const [username, setUsername] = useState('')
    const [staffPassword, setStaffPassword] = useState('')
    const [staffPhone, setStaffPhone] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (staffName === '' || username === '' || staffEmail === '' || staffPassword === '' || staffPhone === '') {
                toast.error("Fill In All Fields")
                return
            }
            const staff = {
                name: staffName,
                username: username,
                email: staffEmail,
                password: staffPassword,
                phoneNumber: staffPhone,
                roleUser: "staff",
                isStaff:true
            }
            await axios.post(`${url.proxy_api}auth/register`, staff).then((res) => {
                console.log(res.data)
                hideAlert()
                toast.success('Staff Added Successfully')
                showAlert({
                    text: `Staff Added Successfully`,
                    type: 'success',
                })
                setStaffName('')
                setStaffEmail('')
                setStaffPhone('')
                setStaffPassword('')
                setTimeout(() => {
                    hideAlert()
                    window.location.reload()
                }, 1200)
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div
                className="tab-pane fade"
                id="v-pills-add-staff"
                role="tabpanel"
                aria-labelledby="v-pills-add-staff-tabs"
            >
                <div className="dashboard-profile">
                    <div className="owner">
                        <div className="content">
                            <h3>Add Staff: {staffName}</h3>
                        </div>
                    </div>
                    {alert.show && (
                        <div
                            className={`alert alert-${alert.type} text-center`}
                            style={{
                                margin: '0 2.6rem',
                                fontFamily: 'Saira',
                                textTransform: 'capitalize',
                            }}
                        >
                            {alert.text}
                        </div>
                    )}
                    <div className="form-wrapper">
                        <form
                            style={{fontFamily: 'Saira'}}
                            onSubmit={(e) => handleSubmit(e)}
                        >
                            <div className="row">
                                <div className="col-xl-12 col-lg-12 col-md-6">
                                    <div className="form-inner">
                                        <label>Staff Name *</label>
                                        <input
                                            type="text"
                                            placeholder="Staff name"
                                            value={staffName}
                                            onChange={(e) => setStaffName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-6">
                                    <div className="form-inner">
                                        <label>Staff Username *</label>
                                        <input
                                            type="text"
                                            placeholder="Staff Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-6">
                                    <div className="form-inner">
                                        <label>Staff Email *</label>
                                        <input
                                            type="text"
                                            placeholder='Staff Email'
                                            value={staffEmail}
                                            onChange={(e) => setStaffEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-6">
                                    <div className="form-inner">
                                        <label>Staff Password *</label>
                                        <input
                                            placeholder="Staff Password"
                                            value={staffPassword}
                                            onChange={(e) => setStaffPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-6">
                                    <div className="form-inner">
                                        <label>Staff Phone *</label>
                                        <input
                                            placeholder="Staff Phone"
                                            value={staffPhone}
                                            onChange={(e) => setStaffPhone(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="button-group">
                                        <button type="submit" className="eg-btn profile-btn">
                                            Add Staff
                                        </button>
                                        <button
                                            className="eg-btn cancel-btn"
                                            type="button"
                                            onClick={(e) => handleCancel(e)}
                                        >
                                            Cancel
                                        </button>
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

export default AddStaff
