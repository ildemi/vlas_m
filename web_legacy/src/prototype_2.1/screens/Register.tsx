import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register: React.FC = () => {
    const navigate = useNavigate();
    
    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white transition-colors duration-200">
            <div className="relative flex min-h-screen w-full overflow-hidden">
                <div className="hidden lg:flex w-1/2 relative bg-surface-dark flex-col justify-between p-12 border-r border-border-dark">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#112117]/80 via-[#112117]/60 to-[#112117]/90 z-10"></div>
                        <div className="h-full w-full bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDZwvEIMNxFeyXCmkPQE_tn9-oWwk0ummihLMSdJEymYe8z78DNL2Itd3W9iQAwMiFRuogXAKIx_5gSe3-nKCDumyVfD1nE8T04P-YG42Z6R0d1i2eyzirYvpT57PNi305ucvh7co-F2DBT2UG5uqFlf11HFKQrMr7jcFl0oWs3GJEpemC50vMcH16Boo8HHGQionBnTvtumzVuObVrTnUHCYjh-eiTXMB-cCG-hu2RBhtoaXXTf561tNbCVlWW_SeTk8bgTW1_TMyb')"}}>
                        </div>
                    </div>
                    <div className="relative z-20 flex items-center gap-3">
                        <div className="size-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary backdrop-blur-sm border border-primary/30">
                            <span className="material-symbols-outlined text-2xl">radar</span>
                        </div>
                        <div>
                            <h1 className="text-white text-xl font-bold tracking-tight">VLAS 2.1</h1>
                            <p className="text-gray-400 text-xs font-medium tracking-wide uppercase">Safety Assurance Platform</p>
                        </div>
                    </div>
                    <div className="relative z-20 max-w-lg">
                        <blockquote className="text-2xl font-medium text-white leading-relaxed mb-6">
                            "Standardizing safety protocols for the next generation of Air Navigation Service Providers."
                        </blockquote>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-lg">verified_user</span>
                                <span>Secure ANSP Network</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-lg">public</span>
                                <span>Global Compliance</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col h-screen overflow-y-auto">
                    <div className="lg:hidden flex items-center justify-between p-6 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary text-3xl">radar</span>
                            <h2 className="text-lg font-bold">VLAS 2.1</h2>
                        </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-16">
                        <div className="w-full max-w-[480px] space-y-8">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Create Account</h2>
                                <p className="text-slate-500 dark:text-gray-400">Enter your credentials to access the safety platform.</p>
                            </div>
                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex items-start gap-3">
                                <span className="material-symbols-outlined text-blue-400 shrink-0 mt-0.5">info</span>
                                <div>
                                    <h4 className="text-sm font-semibold text-blue-100 mb-0.5">Administrator Approval Required</h4>
                                    <p className="text-sm text-blue-200/70 leading-relaxed">
                                        Access will be granted pending verification by the Senior Air Traffic Manager. You will be notified via email.
                                    </p>
                                </div>
                            </div>
                            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/atco-dashboard'); }}>
                                <div className="space-y-3">
                                    <label className="block text-sm font-medium leading-6 text-slate-900 dark:text-gray-200">
                                        Select Operational Role <span className="text-red-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <label className="relative cursor-pointer group">
                                            <input className="peer sr-only" name="role" type="radio" value="controller" defaultChecked />
                                            <div className="p-4 rounded-lg border border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:ring-1 peer-checked:ring-primary transition-all flex flex-col items-center gap-2 text-center h-full">
                                                <span className="material-symbols-outlined text-gray-400 peer-checked:text-primary group-hover:text-primary/70">flight_takeoff</span>
                                                <span className="text-sm font-semibold text-slate-700 dark:text-gray-200 peer-checked:text-primary">Controller</span>
                                            </div>
                                        </label>
                                        <label className="relative cursor-pointer group">
                                            <input className="peer sr-only" name="role" type="radio" value="supervisor"/>
                                            <div className="p-4 rounded-lg border border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:ring-1 peer-checked:ring-primary transition-all flex flex-col items-center gap-2 text-center h-full">
                                                <span className="material-symbols-outlined text-gray-400 peer-checked:text-primary group-hover:text-primary/70">admin_panel_settings</span>
                                                <span className="text-sm font-semibold text-slate-700 dark:text-gray-200 peer-checked:text-primary">Supervisor</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium leading-6 text-slate-900 dark:text-gray-200 mb-2" htmlFor="fullname">Full Name</label>
                                        <div className="relative">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span className="material-symbols-outlined text-gray-500 text-[20px]">person</span>
                                            </div>
                                            <input className="block w-full rounded-lg border-0 py-3 pl-10 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-border-dark placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary bg-white dark:bg-surface-dark sm:text-sm sm:leading-6" id="fullname" name="fullname" placeholder="Jane Doe" type="text"/>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium leading-6 text-slate-900 dark:text-gray-200 mb-2" htmlFor="email">Official Email Address</label>
                                        <div className="relative">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span className="material-symbols-outlined text-gray-500 text-[20px]">mail</span>
                                            </div>
                                            <input className="block w-full rounded-lg border-0 py-3 pl-10 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-border-dark placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary bg-white dark:bg-surface-dark sm:text-sm sm:leading-6" id="email" name="email" placeholder="name@ansp.org" type="email"/>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="block text-sm font-medium leading-6 text-slate-900 dark:text-gray-200" htmlFor="license">ATC License Number</label>
                                            <span className="text-xs text-gray-500 dark:text-gray-400 italic">Optional</span>
                                        </div>
                                        <div className="relative">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span className="material-symbols-outlined text-gray-500 text-[20px]">badge</span>
                                            </div>
                                            <input className="block w-full rounded-lg border-0 py-3 pl-10 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-border-dark placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary bg-white dark:bg-surface-dark sm:text-sm sm:leading-6" id="license" name="license" placeholder="LIC-2024-XXXX" type="text"/>
                                        </div>
                                        <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">Used to expedite verification process.</p>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium leading-6 text-slate-900 dark:text-gray-200 mb-2" htmlFor="password">Password</label>
                                            <div className="relative">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <span className="material-symbols-outlined text-gray-500 text-[20px]">lock</span>
                                                </div>
                                                <input className="block w-full rounded-lg border-0 py-3 pl-10 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-border-dark placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary bg-white dark:bg-surface-dark sm:text-sm sm:leading-6" id="password" name="password" placeholder="••••••••" type="password"/>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium leading-6 text-slate-900 dark:text-gray-200 mb-2" htmlFor="confirm-password">Confirm Password</label>
                                            <div className="relative">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <span className="material-symbols-outlined text-gray-500 text-[20px]">lock_reset</span>
                                                </div>
                                                <input className="block w-full rounded-lg border-0 py-3 pl-10 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-border-dark placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary bg-white dark:bg-surface-dark sm:text-sm sm:leading-6" id="confirm-password" name="confirm-password" placeholder="••••••••" type="password"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <button className="flex w-full justify-center items-center gap-2 rounded-lg bg-primary px-3 py-3 text-sm font-bold leading-6 text-background-dark shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors" type="submit">
                                        <span>Complete Registration</span>
                                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                    </button>
                                </div>
                            </form>
                            <div className="mt-10 text-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Already have an account?
                                    <Link className="font-semibold text-primary hover:text-primary-dark ml-1" to="/">Log In</Link>
                                </p>
                                <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-600 dark:text-gray-500">
                                    <a className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors" href="#">Privacy Policy</a>
                                    <span>•</span>
                                    <a className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors" href="#">Terms of Service</a>
                                    <span>•</span>
                                    <a className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors" href="#">Support</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;