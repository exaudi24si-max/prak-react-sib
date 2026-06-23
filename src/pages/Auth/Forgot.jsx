import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../services/supabaseService";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Forgot() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setError("Silakan masukkan email Anda.");
            return;
        }

        setLoading(true);
        setError("");
        setMessage("");

        const { data, error } = await forgotPassword({ email });

        setLoading(false);

        if (error) {
            const msg = error?.message || "Gagal mengirim email reset password.";
            setError(msg);
            return;
        }

        if (data) {
            setMessage("Link reset password telah dikirim ke email Anda. Silakan cek inbox/spam.");
            setEmail("");
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2 text-center">
                Forgot Your Password?
            </h2>
            
            <p className="text-sm text-gray-500 mb-6 text-center">
                Enter your email address and we'll send you a link to reset your
                password.
            </p>

            {error && (
                <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
                    <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
                    {error}
                </div>
            )}

            {message && (
                <div className="bg-green-100 mb-5 p-5 text-sm font-light text-gray-700 rounded">
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400"
                        placeholder="you@example.com"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4
                        rounded-lg transition duration-300 disabled:opacity-50"
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <ImSpinner2 className="me-2 animate-spin" />
                            Mengirim...
                        </span>
                    ) : (
                        "Send Reset Link"
                    )}
                </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
                <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
                    Kembali ke Login
                </Link>
            </p>
        </div>
    )
}
