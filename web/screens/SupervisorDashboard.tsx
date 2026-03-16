import React from 'react';
import { Link } from 'react-router-dom';
import ChatWidget from '../components/ChatWidget';

const SupervisorDashboard: React.FC = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white overflow-hidden h-screen flex font-display">
            <aside className="w-64 h-full bg-surface-dark border-r border-border-dark flex flex-col flex-shrink-0 transition-all duration-300">
                <div className="h-16 flex items-center px-6 border-b border-border-dark">
                    <div className="flex items-center gap-3 text-primary">
                        <span className="material-symbols-outlined text-3xl icon-filled">radar</span>
                        <h1 className="text-xl font-bold tracking-tight text-white">VLAS 2.1</h1>
                    </div>
                </div>
                <nav className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1">
                    <Link to="/supervisor-dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
                        <span className="material-symbols-outlined icon-filled">dashboard</span>
                        <span className="font-medium text-sm">Dashboard</span>
                    </Link>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-dim hover:text-white hover:bg-surface-highlight transition-colors" href="#">
                        <span className="material-symbols-outlined">folder_open</span>
                        <span className="font-medium text-sm">Records</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-dim hover:text-white hover:bg-surface-highlight transition-colors" href="#">
                        <span className="material-symbols-outlined">analytics</span>
                        <span className="font-medium text-sm">Analytics</span>
                    </a>
                    <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-dim hover:text-white hover:bg-surface-highlight transition-colors" href="#">
                        <span className="material-symbols-outlined">group</span>
                        <span className="font-medium text-sm">Team</span>
                    </a>
                    <Link to="/submission" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-dim hover:text-white hover:bg-surface-highlight transition-colors">
                        <span className="material-symbols-outlined">upload_file</span>
                        <span className="font-medium text-sm">Audio Submission</span>
                    </Link>
                    <div className="my-4 border-t border-border-dark"></div>
                    <Link to="/atco-dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-dim hover:text-white hover:bg-surface-highlight transition-colors">
                        <span className="material-symbols-outlined">flight_takeoff</span>
                        <span className="font-medium text-sm">Controller View</span>
                    </Link>
                    <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-dim hover:text-white hover:bg-surface-highlight transition-colors">
                        <span className="material-symbols-outlined">logout</span>
                        <span className="font-medium text-sm">Sign Out</span>
                    </Link>
                </nav>
                <div className="p-4 border-t border-border-dark">
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-surface-highlight/50">
                        <div className="size-8 rounded-full bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDKAa9Mnpoq0hsypgHgUz3VVAQtbxgta76ojcNNZGY7mPYUSlg1JsEIyVopbGSrc-C86UWKaHk_xIO5U6mN1E5xyr3vA28RWHH0AU2mQyxim27q3SAfEgulyWg0wsK9FtoZqIOq2JnxTQyRA1iPmmKCKhgkW74FC82hkhJmW3Lznw7OsBz7oA87r_2MiIADgCA6sgq0F-8gawN-BxvWOiX2eVV1Y189uQ5aDyKmcS1JY_LwxYoaeBgTt9DR6QTuSbqC_3K1QMbWRgy4")'}}></div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-medium text-white truncate">Marcus Chen</span>
                            <span className="text-xs text-text-dim truncate">Sr. Auditor</span>
                        </div>
                    </div>
                </div>
            </aside>
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                <header className="h-16 border-b border-border-dark bg-background-dark flex items-center justify-between px-6 shrink-0 z-10">
                    <nav className="flex items-center text-sm font-medium text-text-dim">
                        <a className="hover:text-primary transition-colors" href="#">Home</a>
                        <span className="mx-2 text-border-dark">/</span>
                        <a className="hover:text-primary transition-colors" href="#">Dashboard</a>
                        <span className="mx-2 text-border-dark">/</span>
                        <span className="text-white">Audit Queue</span>
                    </nav>
                    <div className="flex-1 max-w-md mx-8">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-text-dim group-focus-within:text-primary">search</span>
                            </div>
                            <input className="block w-full pl-10 pr-3 py-2 border border-border-dark rounded-lg leading-5 bg-surface-dark text-white placeholder-text-dim focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm transition-colors" placeholder="Search by ATCO ID, Flight No, or Record ID..." type="text"/>
                            <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                                <span className="text-xs text-text-dim border border-border-dark rounded px-1.5 py-0.5">⌘K</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="text-text-dim hover:text-white transition-colors relative mr-1">
                            <span className="material-symbols-outlined">help</span>
                        </button>
                        <div className="h-6 w-px bg-border-dark"></div>
                        <button className="flex items-center justify-center h-9 px-4 bg-surface-dark border border-border-dark hover:bg-surface-highlight text-text-dim hover:text-white font-medium text-sm rounded-lg transition-colors gap-2">
                            <span className="material-symbols-outlined text-[18px]">download</span>
                            <span>Export Report</span>
                        </button>
                        <Link to="/submission" className="flex items-center justify-center h-9 px-4 bg-primary hover:bg-primary-hover text-background-dark font-bold text-sm rounded-lg transition-colors gap-2 shadow-lg shadow-primary/10">
                            <span className="material-symbols-outlined text-[20px] icon-filled">mic</span>
                            <span>Start a new Transcription</span>
                        </Link>
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                    <div className="max-w-[1600px] mx-auto flex flex-col gap-6 mb-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-white tracking-tight">Supervisor Dashboard</h2>
                                <p className="text-text-dim mt-1">Review and validate safety reports from regional control centers.</p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-text-dim">
                                <span className="material-symbols-outlined text-[18px] text-primary">update</span>
                                Last updated: Just now
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-surface-dark border border-border-dark rounded-xl p-5 relative overflow-hidden group hover:border-primary/50 transition-colors">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-6xl text-primary">pending_actions</span>
                                </div>
                                <p className="text-text-dim text-sm font-medium">Pending Reviews</p>
                                <div className="flex items-baseline gap-2 mt-2">
                                    <h3 className="text-3xl font-bold text-white">14</h3>
                                    <span className="text-primary text-xs font-medium bg-primary/10 px-1.5 py-0.5 rounded">+2 new</span>
                                </div>
                                <div className="mt-4 w-full bg-border-dark h-1 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full" style={{width: '65%'}}></div>
                                </div>
                            </div>
                            <div className="bg-surface-dark border border-border-dark rounded-xl p-5 relative overflow-hidden group hover:border-primary/50 transition-colors">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-6xl text-blue-400">shield</span>
                                </div>
                                <p className="text-text-dim text-sm font-medium">Avg Safety Score</p>
                                <div className="flex items-baseline gap-2 mt-2">
                                    <h3 className="text-3xl font-bold text-white">94%</h3>
                                    <span className="text-primary text-xs font-medium flex items-center">
                                        <span className="material-symbols-outlined text-[14px]">trending_up</span> 1.5%
                                    </span>
                                </div>
                                <div className="mt-4 w-full bg-border-dark h-1 rounded-full overflow-hidden">
                                    <div className="bg-blue-400 h-full" style={{width: '94%'}}></div>
                                </div>
                            </div>
                            <div className="bg-surface-dark border border-border-dark rounded-xl p-5 relative overflow-hidden group hover:border-red-500/50 transition-colors">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-6xl text-red-500">warning</span>
                                </div>
                                <p className="text-text-dim text-sm font-medium">Critical Alerts</p>
                                <div className="flex items-baseline gap-2 mt-2">
                                    <h3 className="text-3xl font-bold text-white">2</h3>
                                    <span className="text-emerald-400 text-xs font-medium flex items-center">
                                        <span className="material-symbols-outlined text-[14px]">trending_down</span> -1
                                    </span>
                                </div>
                                <div className="mt-4 w-full bg-border-dark h-1 rounded-full overflow-hidden">
                                    <div className="bg-red-500 h-full" style={{width: '15%'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-[1600px] mx-auto flex flex-col bg-surface-dark border border-border-dark rounded-xl overflow-hidden shadow-xl shadow-black/20">
                        <div className="p-4 border-b border-border-dark bg-surface-highlight/30 flex flex-wrap gap-4 items-center justify-between">
                            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                                <div className="flex items-center gap-2 text-text-dim text-sm mr-2">
                                    <span className="material-symbols-outlined text-[20px]">filter_list</span>
                                    <span className="font-medium">Filter by:</span>
                                </div>
                                <div className="relative">
                                    <select className="appearance-none bg-background-dark border border-border-dark text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-40 pl-3 pr-8 py-2 cursor-pointer hover:border-text-dim transition-colors" defaultValue="">
                                        <option value="">All Airports</option>
                                        <option value="EGLL">EGLL (Heathrow)</option>
                                        <option value="KJFK">KJFK (JFK)</option>
                                        <option value="OMDB">OMDB (Dubai)</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-dim">
                                        <span className="material-symbols-outlined text-[18px]">expand_more</span>
                                    </div>
                                </div>
                                <div className="relative">
                                    <select className="appearance-none bg-background-dark border border-border-dark text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-40 pl-3 pr-8 py-2 cursor-pointer hover:border-text-dim transition-colors" defaultValue="">
                                        <option value="">All Statuses</option>
                                        <option value="pending">In Process</option>
                                        <option value="transcribed">Transcribed</option>
                                        <option value="validated">Validated</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-dim">
                                        <span className="material-symbols-outlined text-[18px]">expand_more</span>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 bg-background-dark border border-border-dark text-white text-sm rounded-lg px-3 py-2 hover:border-text-dim transition-colors">
                                    <span className="material-symbols-outlined text-[18px] text-text-dim">calendar_today</span>
                                    <span>Oct 24 - Oct 31, 2023</span>
                                </button>
                                <button className="text-text-dim text-sm font-medium hover:text-white px-2">
                                    Reset
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-text-dim">Showing 1-10 of 48 records</span>
                                <div className="flex gap-1">
                                    <button className="p-1 rounded hover:bg-surface-highlight text-text-dim hover:text-white disabled:opacity-50">
                                        <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                                    </button>
                                    <button className="p-1 rounded hover:bg-surface-highlight text-text-dim hover:text-white">
                                        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-surface-highlight/50 border-b border-border-dark text-text-dim text-xs uppercase tracking-wider font-semibold">
                                        <th className="px-6 py-4 w-12">
                                            <input className="rounded bg-background-dark border-border-dark text-primary focus:ring-0 focus:ring-offset-0 cursor-pointer" type="checkbox"/>
                                        </th>
                                        <th className="px-6 py-4 cursor-pointer hover:text-white group">
                                            <div className="flex items-center gap-1">
                                                ID
                                                <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 transition-opacity">arrow_downward</span>
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 cursor-pointer hover:text-white group">
                                            <div className="flex items-center gap-1">
                                                Status
                                                <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 transition-opacity">unfold_more</span>
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 cursor-pointer hover:text-white group">
                                            <div className="flex items-center gap-1">
                                                Date/Time (UTC)
                                                <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 transition-opacity">unfold_more</span>
                                            </div>
                                        </th>
                                        <th className="px-6 py-4">Airport</th>
                                        <th className="px-6 py-4">ATCO ID</th>
                                        <th className="px-6 py-4 cursor-pointer hover:text-white group">
                                            <div className="flex items-center gap-1">
                                                Safety Score
                                                <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 transition-opacity">unfold_more</span>
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-dark text-sm">
                                    <tr className="hover:bg-surface-highlight/40 transition-colors group">
                                        <td className="px-6 py-4">
                                            <input className="rounded bg-background-dark border-border-dark text-primary focus:ring-0 focus:ring-offset-0 cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity" type="checkbox"/>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-white">REC-23-849</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                                                Validated
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-text-dim">Oct 24, 14:30</td>
                                        <td className="px-6 py-4 text-white font-medium">EGLL</td>
                                        <td className="px-6 py-4 font-mono text-text-dim">ATC-4492</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 bg-border-dark h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-primary h-full" style={{width: '98%'}}></div>
                                                </div>
                                                <span className="text-white font-medium">98%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-text-dim hover:text-primary transition-colors p-1">
                                                <span className="material-symbols-outlined">visibility</span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-surface-highlight/40 transition-colors group">
                                        <td className="px-6 py-4">
                                            <input className="rounded bg-background-dark border-border-dark text-primary focus:ring-0 focus:ring-offset-0 cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity" type="checkbox"/>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-white">REC-23-848</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                                                In Process
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-text-dim">Oct 24, 14:15</td>
                                        <td className="px-6 py-4 text-white font-medium">KJFK</td>
                                        <td className="px-6 py-4 font-mono text-text-dim">ATC-1029</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 bg-border-dark h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-yellow-500 h-full" style={{width: '76%'}}></div>
                                                </div>
                                                <span className="text-white font-medium">76%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold px-3 py-1.5 rounded transition-colors">
                                                Review
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-surface-highlight/40 transition-colors group">
                                        <td className="px-6 py-4">
                                            <input className="rounded bg-background-dark border-border-dark text-primary focus:ring-0 focus:ring-offset-0 cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity" type="checkbox"/>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-white">REC-23-847</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                Transcribed
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-text-dim">Oct 24, 13:45</td>
                                        <td className="px-6 py-4 text-white font-medium">OMDB</td>
                                        <td className="px-6 py-4 font-mono text-text-dim">ATC-3321</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 bg-border-dark h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-primary h-full" style={{width: '92%'}}></div>
                                                </div>
                                                <span className="text-white font-medium">92%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-text-dim hover:text-primary transition-colors p-1">
                                                <span className="material-symbols-outlined">visibility</span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-surface-highlight/40 transition-colors group bg-red-500/5 border-l-2 border-l-red-500">
                                        <td className="px-6 py-4">
                                            <input className="rounded bg-background-dark border-border-dark text-primary focus:ring-0 focus:ring-offset-0 cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity" type="checkbox"/>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-white">REC-23-846</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20">
                                                Flagged
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-text-dim">Oct 24, 12:10</td>
                                        <td className="px-6 py-4 text-white font-medium">EGLL</td>
                                        <td className="px-6 py-4 font-mono text-text-dim">ATC-4492</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 bg-border-dark h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-red-500 h-full" style={{width: '45%'}}></div>
                                                </div>
                                                <span className="text-white font-medium">45%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-bold px-3 py-1.5 rounded transition-colors flex items-center gap-1 ml-auto">
                                                <span className="material-symbols-outlined text-[14px]">warning</span> Priority
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-surface-highlight/40 transition-colors group">
                                        <td className="px-6 py-4">
                                            <input className="rounded bg-background-dark border-border-dark text-primary focus:ring-0 focus:ring-offset-0 cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity" type="checkbox"/>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-white">REC-23-845</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                                                Validated
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-text-dim">Oct 24, 11:00</td>
                                        <td className="px-6 py-4 text-white font-medium">KJFK</td>
                                        <td className="px-6 py-4 font-mono text-text-dim">ATC-0089</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 bg-border-dark h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-primary h-full" style={{width: '100%'}}></div>
                                                </div>
                                                <span className="text-white font-medium">100%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-text-dim hover:text-primary transition-colors p-1">
                                                <span className="material-symbols-outlined">visibility</span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-surface-highlight/40 transition-colors group">
                                        <td className="px-6 py-4">
                                            <input className="rounded bg-background-dark border-border-dark text-primary focus:ring-0 focus:ring-offset-0 cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity" type="checkbox"/>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-white">REC-23-844</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                Transcribed
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-text-dim">Oct 23, 19:22</td>
                                        <td className="px-6 py-4 text-white font-medium">EDDF</td>
                                        <td className="px-6 py-4 font-mono text-text-dim">ATC-8192</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 bg-border-dark h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-primary h-full" style={{width: '88%'}}></div>
                                                </div>
                                                <span className="text-white font-medium">88%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-text-dim hover:text-primary transition-colors p-1">
                                                <span className="material-symbols-outlined">visibility</span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-surface-highlight/40 transition-colors group">
                                        <td className="px-6 py-4">
                                            <input className="rounded bg-background-dark border-border-dark text-primary focus:ring-0 focus:ring-offset-0 cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity" type="checkbox"/>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-white">REC-23-843</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                                                Validated
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-text-dim">Oct 23, 18:05</td>
                                        <td className="px-6 py-4 text-white font-medium">EGLL</td>
                                        <td className="px-6 py-4 font-mono text-text-dim">ATC-4492</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 bg-border-dark h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-primary h-full" style={{width: '95%'}}></div>
                                                </div>
                                                <span className="text-white font-medium">95%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-text-dim hover:text-primary transition-colors p-1">
                                                <span className="material-symbols-outlined">visibility</span>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 border-t border-border-dark bg-surface-highlight/30 flex items-center justify-between">
                            <div className="text-sm text-text-dim">
                                Showing <span className="text-white font-medium">1</span> to <span className="text-white font-medium">7</span> of <span className="text-white font-medium">48</span> results
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-text-dim mr-2">Rows per page:</span>
                                <select className="appearance-none bg-background-dark border border-border-dark text-white text-xs rounded focus:ring-primary focus:border-primary px-2 py-1 cursor-pointer hover:border-text-dim">
                                    <option>10</option>
                                    <option>25</option>
                                    <option>50</option>
                                </select>
                                <div className="h-4 w-px bg-border-dark mx-2"></div>
                                <nav className="flex gap-1">
                                    <a className="px-3 py-1 text-sm text-text-dim rounded hover:bg-surface-highlight hover:text-white transition-colors" href="#">Previous</a>
                                    <a className="px-3 py-1 text-sm bg-primary/10 text-primary rounded font-medium border border-primary/20" href="#">1</a>
                                    <a className="px-3 py-1 text-sm text-text-dim rounded hover:bg-surface-highlight hover:text-white transition-colors" href="#">2</a>
                                    <a className="px-3 py-1 text-sm text-text-dim rounded hover:bg-surface-highlight hover:text-white transition-colors" href="#">3</a>
                                    <a className="px-3 py-1 text-sm text-text-dim rounded hover:bg-surface-highlight hover:text-white transition-colors" href="#">...</a>
                                    <a className="px-3 py-1 text-sm text-text-dim rounded hover:bg-surface-highlight hover:text-white transition-colors" href="#">Next</a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <ChatWidget />
        </div>
    );
};

export default SupervisorDashboard;