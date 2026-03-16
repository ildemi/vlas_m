import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate();
    
    return (
        <div className="flex flex-1 min-h-screen relative overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display">
            <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC4y4_h2efTdRFtz-4Sv9Np5f39Kli-GGwjOhlSjUNXkf6lLCyb3UFnUgUxnaQcssmONVG53eFhJ2JU3lxVGuXURplvEqF8ePBrlhFzUZBro_jXlRhmeEZAU0N7mW9qJfJzTXfswBqhMa7wome8av2g60TN5kGguKhBo4XDhLDUdswCZNbeJZ-RFLDawAXbtLpAMwEb2m-H2HpppM3CEOrMNSxatpnbA44Yt5wRHVEcmmMzEDVzKN4v7oFVnkBx4_ZmiqK-k24qr0R2')"}}></div>
                <div className="absolute inset-0 bg-background-dark/80 dark:bg-background-dark/90 backdrop-blur-sm"></div>
            </div>
            <div className="relative z-10 w-full flex items-center justify-center p-4 sm:p-8">
                <div className="w-full max-w-[1000px] grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 items-center">
                    <div className="hidden lg:flex flex-col gap-6 text-white pr-8">
                        <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center mb-2">
                            <span className="material-symbols-outlined text-primary text-4xl">flight_takeoff</span>
                        </div>
                        <h1 className="text-5xl font-bold tracking-tight text-white leading-[1.1]">
                            Aviation Safety & <br/>
                            <span className="text-primary">Quality Assurance</span>
                        </h1>
                        <p className="text-slate-300 text-lg max-w-md leading-relaxed">
                            Secure, real-time access for Air Navigation Service Providers. Monitor compliance, analyze risks, and ensure sky safety with VLAS 2.1.
                        </p>
                        <div className="flex items-center gap-4 mt-8">
                            <div className="flex -space-x-3">
                                <img alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-background-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAefmmffNXFk_WEdRaStjIWHxc3vZqcSQYan7WL1q75F5jnYuHiCmA4Kspwe9qIX2qFR6QZVMj7ZqkzpJAXbSFM7BtConGNK-BGrwU-d29YYz4iVlcfaGWDSkDaSwZH3GU7mRJ3JcYQERNeiD3UFjvtGoEf9ehRdrwEXBdnvGJdP-iLV9JEsjbLub-FjwkmwXWzom5RjhhDah0aYHbQR8F_u-9pTlyx914XJ17NGpE2HobJ_W_SS1gyXtzBppG9CeXgsJuq2XAAi3cC"/>
                                <img alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-background-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlKv9E94jH2JI93umLvIzA0mqW61Rs60z7ndygq1YnjyVch3wmiB54QZKA00g5b6ooYwWJyH_dWw2W63IpDn5Bi-YzZfDzU7ySGOlUU_RJofDcbexKTJkUZzuq2p5sQ7XyZHFV9iHy4kRKeGq6uB8-qGmoaP5Z5z9b-wag3Xy-VumEYAlV8smKnzcED-OXxHgbqYWjf11ekn4kSIrtxbUybwqTHSRunah_kuo_aZh03e6xt5v7bSY5-KdDZnYNyjMj_JtKMf67g016"/>
                                <img alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-background-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuABUSN-4eEl7JPB4gaxshP_M_2tNYe9fXRLsLPOnHkCPzO1faQC77JfrQTg-Jmy5Hce1BJ6tEQwB41XYiA8H8rCPvWaYvXVqwabvaBQXtEZxWx6G3keq-jaBEw_Q_8FAdvC1Ub2hyQ3l21TG896TakfigiGpGT_VWdA-_g0vE7O0QnLOPIAJu5aO-hMjJ3alj0Wrtezu9fN_OI3oTDodiAVhpAh4WUbC3Q1uuSuM6rBJnLUu7rZeNuuOCccKk-Q_F5Y-RaX_wIgGgq4"/>
                            </div>
                            <p className="text-sm text-slate-400">Trusted by 200+ ANSPs worldwide</p>
                        </div>
                    </div>
                    <div className="w-full max-w-md mx-auto">
                        <div className="bg-white/5 dark:bg-surface-dark/60 backdrop-blur-xl border border-white/10 dark:border-white/5 shadow-2xl rounded-2xl p-8 sm:p-10 flex flex-col gap-6">
                            <div className="flex flex-col gap-2 mb-2">
                                <div className="lg:hidden w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 self-start">
                                    <span className="material-symbols-outlined text-primary text-2xl">flight_takeoff</span>
                                </div>
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">VLAS 2.1</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Secure Access for ANSPs</p>
                            </div>
                            <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); navigate('/atco-dashboard'); }}>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="email">Corporate Email</label>
                                    <div className="relative flex items-center">
                                        <span className="absolute left-4 text-slate-500 material-symbols-outlined" style={{fontSize: '20px'}}>mail</span>
                                        <input className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-[#111814] border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm" id="email" name="email" placeholder="name@ansp.com" type="email"/>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="password">Password</label>
                                        <a className="text-xs font-medium text-primary hover:text-primary/80 transition-colors" href="#">Forgot password?</a>
                                    </div>
                                    <div className="relative flex items-center group">
                                        <span className="absolute left-4 text-slate-500 material-symbols-outlined" style={{fontSize: '20px'}}>lock</span>
                                        <input className="w-full pl-11 pr-11 py-3.5 bg-slate-50 dark:bg-[#111814] border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm" id="password" name="password" placeholder="Enter your password" type="password"/>
                                        <button className="absolute right-4 text-slate-500 hover:text-slate-300 focus:outline-none flex items-center justify-center" type="button">
                                            <span className="material-symbols-outlined" style={{fontSize: '20px'}}>visibility_off</span>
                                        </button>
                                    </div>
                                </div>
                                <button className="mt-2 w-full bg-primary hover:bg-[#15cf5f] text-background-dark font-bold py-3.5 px-4 rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(25,230,107,0.3)] hover:shadow-[0_0_25px_rgba(25,230,107,0.5)] flex items-center justify-center gap-2" type="submit">
                                    <span>Log In</span>
                                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                </button>
                            </form>
                            <div className="pt-4 border-t border-slate-200 dark:border-white/10 text-center">
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Don't have an account? 
                                    <Link className="font-medium text-primary hover:underline ml-1" to="/register">Request Access</Link>
                                </p>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-center gap-6 text-xs text-slate-400 font-medium">
                            <a className="hover:text-white transition-colors" href="#">Privacy Policy</a>
                            <span>•</span>
                            <a className="hover:text-white transition-colors" href="#">Terms of Service</a>
                            <span>•</span>
                            <span className="opacity-70">© 2024 VLAS Systems</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;