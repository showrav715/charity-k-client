import { baseUrl } from "@/BaseUrl";
import {  useState } from "react";
import './installer.css';
export default function Welcome() {
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [requirements, setRequirements] = useState({
        curl: false,
        fileinfo: false,
        json: false,
        mbstring: false,
        openssl: false,
        pdo: false,
        php_version: false,
        tokenizer: false
    });


    const checkServerReq = () => {
        setLoading(true);
        fetch(`${baseUrl}/api/install/app`)
            .then(response => response.json())
            .then(data => {
                console.log('check data', data);
                setRequirements(data?.object);
                setStatus(data?.status);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }

    const CheckMark = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM14.3 7.6L9.7 13.6C9.5 13.8 9.2 14 8.9 14C8.6 14 8.3 13.9 8.1 13.6L5.7 10.5C5.4 10.1 5.4 9.4 5.9 9.1C6.4 8.8 7 8.8 7.3 9.3L8.9 11.4L12.7 6.4C13 6 13.7 5.9 14.1 6.2C14.6 6.5 14.6 7.1 14.3 7.6Z" fill="#02BC7D" />
    </svg>;

    const CrossMark = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <g clipPath="url(#clip0_3910_14433)">
            <path d="M10.0007 19.6673C15.3394 19.6673 19.6673 15.3394 19.6673 10.0007C19.6673 4.6619 15.3394 0.333984 10.0007 0.333984C4.6619 0.333984 0.333984 4.6619 0.333984 10.0007C0.333984 15.3394 4.6619 19.6673 10.0007 19.6673Z" fill="#F74850" />
            <path d="M11.4057 9.9997L13.8634 12.4574C13.9505 12.5448 13.9994 12.6633 13.9994 12.7867C13.9994 12.9102 13.9505 13.0286 13.8634 13.116L13.116 13.8634C13.0286 13.9505 12.9102 13.9994 12.7867 13.9994C12.6633 13.9994 12.5448 13.9505 12.4574 13.8634L9.9997 11.4057L7.54204 13.8634C7.45457 13.9505 7.33615 13.9994 7.2127 13.9994C7.08925 13.9994 6.97083 13.9505 6.88337 13.8634L6.13604 13.116C6.04892 13.0286 6 12.9102 6 12.7867C6 12.6633 6.04892 12.5448 6.13604 12.4574L8.5937 9.9997L6.13604 7.54204C6.04892 7.45457 6 7.33615 6 7.2127C6 7.08925 6.04892 6.97083 6.13604 6.88337L6.88337 6.13604C6.97083 6.04892 7.08925 6 7.2127 6C7.33615 6 7.45457 6.04892 7.54204 6.13604L9.9997 8.5937L12.4574 6.13604C12.5448 6.04892 12.6633 6 12.7867 6C12.9102 6 13.0286 6.04892 13.116 6.13604L13.8634 6.88337C13.9505 6.97083 13.9994 7.08925 13.9994 7.2127C13.9994 7.33615 13.9505 7.45457 13.8634 7.54204L11.4057 9.9997Z" fill="white" />
        </g>
        <defs>
            <clipPath id="clip0_3910_14433">
                <rect width="20" height="20" fill="white" />
            </clipPath>
        </defs>
    </svg>;

    return (
        <div className="container d-flex justify-content-center align-items-center h-full p-4">
            <div className="welcome-box">
                <h4 className="installer-heading">Welcome</h4>
                <h5 className="installer-req-txt">Please check if these requirements are fulfilled.</h5>

                <table className="table table-bordered my-4">
                    <tbody>
                        {requirements && Object.entries(requirements).map(([key, value]) => (
                            <tr key={key}>
                                <td><span className="installer-list-txt">
                                    {key == 'php_version' ? <b>PHP Version <code>(must use the 8.2) </code>  </b> : 
                                    key.replace('_', ' ')
                                    }
                                    {/* {} */}
                                    </span></td>
                                <td><span className="installer-check-icon">{value ? <CheckMark /> : <CrossMark />}</span> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                <p className="installer-des">Please contact your server provider if you encounter any errors during the installation process.</p>
                <div className="d-flex gap-4 align-items-center justify-center">

                    {!status ?
                        <button disabled={loading} className="installer-btn" type="button" onClick={checkServerReq}>
                            check requirements
                            {loading &&
                                <div className="spinner-border text-light" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>}
                        </button> :
                        <button className="installer-btn" type="button" onClick={()=>{
                            window?.location?.reload();
                        }}>
                            Go to homepage
                        </button>
                    }
                </div>
            </div>

        </div>
    );
}
