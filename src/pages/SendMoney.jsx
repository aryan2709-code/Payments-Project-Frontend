import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const inputref = useRef(null);
    const pinref = useRef(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const transfer = async () => {
        try {
            // Clear previous messages
            setError("");
            setMessage("");

            const amount = inputref.current.value;
            const pin = pinref.current.value;
            const to = id;

            if (!amount) {
                setError("Enter The Amount Please");
                return;
            }
            if(!pin)
            {
                setError("Enter the payment pin");
                return;
            }

            const response = await axios.post(
                "http://localhost:3000/api/v1/account/transfer",
                {
                    amount: amount,
                    to: to,
                    pin : pin
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );

            setMessage(response.data.message);

            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError("Something went wrong. Please try again later.");
            }
            setMessage(""); // clear success msg if any
        }
    };

    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{name[0]}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name}</h3>
                        </div>
                        <div className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none"
                                    htmlFor="amount"
                                >
                                    Amount (in Rs)
                                </label>
                                <input
                                    ref={inputref}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                />
                                 <label
                                    className="text-sm font-medium leading-none"
                                    htmlFor="amount"
                                >
                                    Payment Pin
                                </label>
                                <input
                                    ref={pinref}
                                    type="text"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter pin"
                                />
                            </div>

                            {error && (
                                <div className="text-red-600 text-sm font-medium">
                                    {error}
                                </div>
                            )}
                            {message && (
                                <div className="text-green-600 text-sm font-medium">
                                    {message}
                                </div>
                            )}

                            <button
                                onClick={transfer}
                                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                            >
                                Initiate Transfer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
