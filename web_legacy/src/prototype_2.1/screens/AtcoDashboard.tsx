import React from 'react';
import { Link } from 'react-router-dom';
import ChatWidget from '../components/ChatWidget';

const AtcoDashboard: React.FC = () => {
    return (
        <div className="flex h-screen w-full relative group/design-root bg-background-light dark:bg-background-dark text-[#111814] dark:text-white">
            <aside className="hidden lg:flex flex-col w-72 h-full border-r border-border-dark bg-[#111814] flex-shrink-0">
                <div className="flex flex-col h-full justify-between p-4">
                    <div className="flex flex-col gap-8">
                        <div className="flex gap-3 items-center px-2 pt-2">
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 shadow-inner border border-primary/20" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA111dr9xyq4QaQgen38pJiVorCzg48kgA9_5Ej2PcCE4Q-6VxsH3f3INYIaJHEEAzjOmXWU45TuKF_EjRvYCIBJsauWpZb4lct9Ac2KQkBb5iGoE1plb2YRrf0ImeF9PteKY244QLpKB5s8wzN1vF2_s0-yaW6_0cpg5Y7aYOO3qD_0KBAcuCeG1mbmmKdXJmFObj03fxrSLuQFuoGi8yppVfnw56RxrA7sJ8O3V4DCOTSmdcan0qJc3NuURlfDNrSc2Q4U2JZm-wi")'}}></div>
                            <div className="flex flex-col">
                                <h1 className="text-white text-base font-bold leading-normal">Officer Doe</h1>
                                <p className="text-text-muted text-xs font-normal leading-normal">Senior ATCO • ID: 8492</p>
                            </div>
                        </div>
                        <nav className="flex flex-col gap-2">
                            <Link to="/atco-dashboard" className="flex items-center gap-3 px-3 py-3 rounded-lg bg-border-dark shadow-sm border border-transparent hover:border-primary/30 transition-all group">
                                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">dashboard</span>
                                <p className="text-white text-sm font-medium leading-normal">Dashboard</p>
                            </Link>
                            <a href="#" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 transition-colors group">
                                <span className="material-symbols-outlined text-text-muted group-hover:text-white transition-colors">bar_chart</span>
                                <p className="text-text-muted group-hover:text-white text-sm font-medium leading-normal transition-colors">My Stats</p>
                            </a>
                            <a href="#" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 transition-colors group">
                                <span className="material-symbols-outlined text-text-muted group-hover:text-white transition-colors">menu_book</span>
                                <p className="text-text-muted group-hover:text-white text-sm font-medium leading-normal transition-colors">Training Resources</p>
                            </a>
                            <Link to="/supervisor-dashboard" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 transition-colors group">
                                <span className="material-symbols-outlined text-text-muted group-hover:text-white transition-colors">admin_panel_settings</span>
                                <p className="text-text-muted group-hover:text-white text-sm font-medium leading-normal transition-colors">Supervisor View</p>
                            </Link>
                        </nav>
                    </div>
                    <div className="flex flex-col gap-2 pb-4 border-t border-border-dark pt-4">
                        <a href="#" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 transition-colors group">
                            <span className="material-symbols-outlined text-text-muted group-hover:text-white transition-colors">settings</span>
                            <p className="text-text-muted group-hover:text-white text-sm font-medium leading-normal transition-colors">Settings</p>
                        </a>
                        <Link to="/" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-red-500/10 transition-colors group">
                            <span className="material-symbols-outlined text-text-muted group-hover:text-red-400 transition-colors">logout</span>
                            <p className="text-text-muted group-hover:text-red-400 text-sm font-medium leading-normal transition-colors">Sign Out</p>
                        </Link>
                    </div>
                </div>
            </aside>
            <main className="flex-1 flex flex-col h-full overflow-y-auto bg-background-dark scroll-smooth">
                <header className="sticky top-0 z-30 w-full bg-[#111814]/90 backdrop-blur-md border-b border-border-dark">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-4 max-w-[1400px] mx-auto w-full">
                        <div className="flex-1 max-w-xl">
                            <label className="flex w-full items-center">
                                <div className="relative w-full flex items-center">
                                    <span className="absolute left-3 text-text-muted material-symbols-outlined">search</span>
                                    <input className="w-full bg-border-dark hover:bg-[#324239] transition-colors text-white placeholder:text-text-muted rounded-lg border-none focus:ring-1 focus:ring-primary py-2.5 pl-10 pr-4 text-sm" placeholder="Search logs by Date, Sector, or Tag..." type="text"/>
                                </div>
                            </label>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-2 mr-2">
                                <button className="size-10 rounded-full bg-border-dark flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-all relative">
                                    <span className="material-symbols-outlined">notifications</span>
                                    <span className="absolute top-2 right-2 size-2 bg-primary rounded-full animate-pulse"></span>
                                </button>
                            </div>
                            <Link to="/submission" className="flex items-center justify-center rounded-lg h-10 px-5 bg-primary hover:bg-primary/90 text-[#111814] gap-2 text-sm font-bold tracking-wide transition-all shadow-[0_0_15px_rgba(25,230,107,0.3)] hover:shadow-[0_0_20px_rgba(25,230,107,0.5)] whitespace-nowrap">
                                <span className="material-symbols-outlined text-[20px]">add_circle</span>
                                <span>Start a new Transcription</span>
                            </Link>
                        </div>
                    </div>
                </header>
                <div className="flex-1 px-6 py-8 max-w-[1400px] mx-auto w-full flex flex-col gap-8">
                    <div className="flex flex-col gap-2 animate-fade-in-up">
                        <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Welcome back, Officer Doe</h1>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-sm">trending_up</span>
                            <p className="text-text-muted text-base font-normal">You are trending up this week. Keep up the great work.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-2 rounded-xl p-6 bg-surface-dark border border-border-dark shadow-sm hover:border-primary/20 transition-all">
                            <div className="flex items-center justify-between">
                                <p className="text-text-muted text-sm font-medium uppercase tracking-wider">Avg Safety Score</p>
                                <span className="bg-primary/10 p-2 rounded-lg text-primary material-symbols-outlined">verified_user</span>
                            </div>
                            <div className="flex items-end gap-3 mt-2">
                                <p className="text-white text-4xl font-bold leading-none tracking-tight">94<span className="text-xl text-text-muted font-medium">/100</span></p>
                                <div className="flex items-center text-primary text-sm font-bold bg-primary/10 px-1.5 py-0.5 rounded mb-1">
                                    <span className="material-symbols-outlined text-sm">arrow_upward</span>
                                    2.4%
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 rounded-xl p-6 bg-surface-dark border border-border-dark shadow-sm hover:border-primary/20 transition-all">
                            <div className="flex items-center justify-between">
                                <p className="text-text-muted text-sm font-medium uppercase tracking-wider">Total Logged Hours</p>
                                <span className="bg-blue-500/10 p-2 rounded-lg text-blue-400 material-symbols-outlined">schedule</span>
                            </div>
                            <div className="flex items-end gap-3 mt-2">
                                <p className="text-white text-4xl font-bold leading-none tracking-tight">1,240</p>
                                <span className="text-text-muted text-base font-medium mb-1">hrs</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 rounded-xl p-6 bg-surface-dark border border-border-dark shadow-sm hover:border-primary/20 transition-all">
                            <div className="flex items-center justify-between">
                                <p className="text-text-muted text-sm font-medium uppercase tracking-wider">Weekly Trend</p>
                                <span className="bg-purple-500/10 p-2 rounded-lg text-purple-400 material-symbols-outlined">insights</span>
                            </div>
                            <div className="flex items-end gap-3 mt-2">
                                <p className="text-white text-4xl font-bold leading-none tracking-tight">+5%</p>
                                <span className="text-text-muted text-base font-medium mb-1">efficiency</span>
                            </div>
                            <div className="w-full bg-border-dark h-1.5 rounded-full mt-2 overflow-hidden">
                                <div className="bg-purple-400 h-full rounded-full" style={{width: '75%'}}></div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border-dark/50">
                            <h2 className="text-white text-xl font-bold flex items-center gap-2">
                                Recent Sessions
                                <span className="text-xs bg-border-dark text-text-muted px-2 py-1 rounded-full">12 New</span>
                            </h2>
                            <div className="flex items-center gap-2">
                                <select className="bg-surface-dark text-sm text-white border border-border-dark rounded-lg py-2 pl-3 pr-8 focus:ring-primary focus:border-primary">
                                    <option>Sort by: Newest</option>
                                    <option>Sort by: Score</option>
                                    <option>Sort by: Duration</option>
                                </select>
                                <button className="p-2 text-text-muted hover:text-white bg-surface-dark border border-border-dark rounded-lg transition-colors">
                                    <span className="material-symbols-outlined">filter_list</span>
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Card 1 */}
                            <article className="flex flex-col gap-4 rounded-xl p-6 bg-surface-dark hover:bg-surface-dark-hover border border-border-dark hover:border-primary/30 transition-all group cursor-pointer relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col">
                                        <span className="text-text-muted text-xs font-bold uppercase tracking-wider mb-1">Today, 14:00</span>
                                        <h3 className="text-white text-lg font-bold">EGLL Sector 4</h3>
                                        <p className="text-text-muted text-xs mt-0.5">Heathrow Approach</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-[#111814] px-2.5 py-1.5 rounded-md text-xs text-text-muted border border-border-dark">
                                        <span className="material-symbols-outlined text-[16px]">timer</span>
                                        <span className="font-medium">2h 15m</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 my-2">
                                    <div className="relative size-16 flex items-center justify-center rounded-full border-4 border-primary/20">
                                        <span className="text-2xl font-black text-white">98</span>
                                        <svg className="absolute inset-0 size-full -rotate-90 stroke-primary" style={{fill:'none', strokeWidth:3, strokeDasharray: '100 100', strokeDashoffset: 2}} viewBox="0 0 36 36"></svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-primary text-sm font-bold uppercase tracking-wide">Excellent</span>
                                        <span className="text-text-muted text-xs">No Safety Violations</span>
                                    </div>
                                </div>
                                <div className="h-px w-full bg-border-dark"></div>
                                <div className="flex justify-between items-center mt-auto">
                                    <div className="flex items-center gap-2">
                                        <div className="flex -space-x-2">
                                            <div className="size-6 rounded-full bg-blue-500 border border-[#1c2a23]" title="Weather Event"></div>
                                            <div className="size-6 rounded-full bg-orange-500 border border-[#1c2a23]" title="High Traffic"></div>
                                        </div>
                                        <span className="text-text-muted text-xs pl-1">High Complexity</span>
                                    </div>
                                    <span className="text-white group-hover:text-primary font-medium text-xs flex items-center gap-1 transition-colors uppercase tracking-wider">
                                        Details
                                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                    </span>
                                </div>
                            </article>
                            
                            {/* Card 2 */}
                            <article className="flex flex-col gap-4 rounded-xl p-6 bg-surface-dark hover:bg-surface-dark-hover border border-border-dark hover:border-yellow-400/30 transition-all group cursor-pointer relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400"></div>
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col">
                                        <span className="text-text-muted text-xs font-bold uppercase tracking-wider mb-1">Oct 23, 09:30</span>
                                        <h3 className="text-white text-lg font-bold">EGKK Tower</h3>
                                        <p className="text-text-muted text-xs mt-0.5">Gatwick Tower</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-[#111814] px-2.5 py-1.5 rounded-md text-xs text-text-muted border border-border-dark">
                                        <span className="material-symbols-outlined text-[16px]">timer</span>
                                        <span className="font-medium">1h 45m</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 my-2">
                                    <div className="relative size-16 flex items-center justify-center rounded-full border-4 border-yellow-400/20">
                                        <span className="text-2xl font-black text-white">84</span>
                                        <svg className="absolute inset-0 size-full -rotate-90 stroke-yellow-400" style={{fill:'none', strokeWidth:3, strokeDasharray: '100 100', strokeDashoffset: 16}} viewBox="0 0 36 36"></svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-yellow-400 text-sm font-bold uppercase tracking-wide">Good</span>
                                        <span className="text-text-muted text-xs">2 Minor Conflicts</span>
                                    </div>
                                </div>
                                <div className="h-px w-full bg-border-dark"></div>
                                <div className="flex justify-between items-center mt-auto">
                                    <div className="flex items-center gap-2">
                                        <div className="flex -space-x-2">
                                            <div className="size-6 rounded-full bg-gray-500 border border-[#1c2a23]" title="Routine"></div>
                                        </div>
                                        <span className="text-text-muted text-xs pl-1">Routine Ops</span>
                                    </div>
                                    <span className="text-white group-hover:text-yellow-400 font-medium text-xs flex items-center gap-1 transition-colors uppercase tracking-wider">
                                        Details
                                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                    </span>
                                </div>
                            </article>

                            {/* Card 3 */}
                            <article className="flex flex-col gap-0 rounded-xl bg-surface-dark hover:bg-surface-dark-hover border border-border-dark hover:border-primary/30 transition-all group cursor-pointer relative overflow-hidden">
                                <div className="relative h-24 w-full bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA1cWj9Btukh7AgOezrjUTLpzdvLcbIYmxEfq2r4Xohn2-2P-1xLU3q6TwTYsrGALSrehsP7bEZN1xwuiT0_uWCioF-Gyjzga27YDMVy3aWrBlUC1aUqwSJ2UCuhaa5PrINm6zPh1hCK8tBQNkXRib9sSu9KRoplHDOwpddtk6X7aM8Nnn11R2J4T_mfHYynFIsW1ezjeCx2qOSDdSHbgaGXPlFAPUFHv2n4fmPbVmaeHqL12VKsEDVwrnIWUrQHL7Ewc5_UUTezlBx")'}}>
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1c2a23]"></div>
                                </div>
                                <div className="p-6 pt-2 flex flex-col gap-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-col">
                                            <span className="text-text-muted text-xs font-bold uppercase tracking-wider mb-1">Oct 20, 15:00</span>
                                            <h3 className="text-white text-lg font-bold">Sim Training</h3>
                                            <p className="text-text-muted text-xs mt-0.5">Emergency Scenarios</p>
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-[#111814] px-2.5 py-1.5 rounded-md text-xs text-text-muted border border-border-dark">
                                            <span className="material-symbols-outlined text-[16px]">school</span>
                                            <span className="font-medium">4h 00m</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl font-black text-white">100</span>
                                        <div className="px-2 py-0.5 rounded bg-primary text-[#111814] text-xs font-bold uppercase">Perfect</div>
                                    </div>
                                    <div className="h-px w-full bg-border-dark"></div>
                                    <div className="flex justify-between items-center mt-auto">
                                        <span className="text-text-muted text-xs">Certification Renewed</span>
                                        <span className="text-white group-hover:text-primary font-medium text-xs flex items-center gap-1 transition-colors uppercase tracking-wider">
                                            View Report
                                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                        </span>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </main>
            <ChatWidget />
        </div>
    );
};

export default AtcoDashboard;