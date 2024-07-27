import axios from "axios";
import { useState } from "react";

export default (url, method, body) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async (onSuccess) => {
        try {
            const response = await axios[method](url, body)
            setErrors(null)
            onSuccess(response.data)
            return response.data
        }catch(error) {
            console.log(error)
            setErrors(
                <div className="alert alert-danger">
                  <h4>Ooops....</h4>
                  <ul className="my-0">
                    {error.response.data.errors.map(err => (
                      <li key={err.message}>{err.message}</li>
                    ))}
                  </ul>
                </div>
            );
        }
    }

    return {doRequest, errors}

}