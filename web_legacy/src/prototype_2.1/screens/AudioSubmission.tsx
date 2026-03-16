import React from 'react';
import { useNavigate } from 'react-router-dom';

const AudioSubmission: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="relative flex h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display overflow-hidden text-slate-900 dark:text-white">
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{backgroundImage: "radial-gradient(#2a4034 1px, transparent 1px)", backgroundSize: "24px 24px"}}></div>
            <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="relative w-full max-w-3xl flex flex-col bg-surface-dark border border-surface-border rounded-xl shadow-2xl overflow-hidden animate-fade-in-up">
                    <div className="flex items-center justify-between px-6 py-5 border-b border-surface-border bg-[#15251d]">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-bold leading-tight text-white">Audio Submission</h2>
                                <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">VLAS 2.1</span>
                            </div>
                            <p className="text-sm text-text-secondary">Upload cockpit and tower voice communication logs for compliance review.</p>
                        </div>
                        <button onClick={() => navigate(-1)} className="text-text-secondary hover:text-white transition-colors rounded-lg p-2 hover:bg-white/5">
                            <span className="material-symbols-outlined text-2xl">close</span>
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <label className="flex flex-col gap-2 group">
                                <span className="text-sm font-medium text-text-secondary flex items-center gap-2">
                                    Operator ID
                                    <span className="material-symbols-outlined text-[16px]" title="Auto-assigned by system">info</span>
                                </span>
                                <div className="relative flex items-center">
                                    <span className="absolute left-4 material-symbols-outlined text-text-secondary text-[20px]">badge</span>
                                    <input className="w-full bg-[#111814]/50 border border-surface-border text-white/50 text-sm rounded-lg pl-11 pr-4 py-3 cursor-not-allowed select-none focus:ring-0" disabled type="text" value="OP-8821 (Auto-Assigned)"/>
                                    <span className="absolute right-4 material-symbols-outlined text-primary text-[18px]">lock</span>
                                </div>
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-white flex items-center gap-1">
                                    Airport <span className="text-red-400">*</span>
                                </span>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-secondary text-[20px]">radar</span>
                                    <select className="w-full bg-[#111814] border border-surface-border text-white text-sm rounded-lg pl-11 pr-10 py-3 focus:ring-1 focus:ring-primary focus:border-primary appearance-none cursor-pointer hover:border-text-secondary transition-colors" defaultValue="">
                                        <option disabled value="">Select Airport (ej. LECU)...</option>
                                        <option value="LHR">LHR - London Heathrow (Tower)</option>
                                        <option value="JFK">JFK - New York (Ground)</option>
                                        <option value="DXB">DXB - Dubai International (Approach)</option>
                                    </select>
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-secondary text-[24px] pointer-events-none">arrow_drop_down</span>
                                </div>
                            </label>
                        </div>
                        <div className="group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-surface-border bg-white/[0.02] px-6 py-10 transition-all hover:border-primary/50 hover:bg-white/[0.04]">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-border group-hover:bg-primary/20 transition-colors">
                                <span className="material-symbols-outlined text-3xl text-white group-hover:text-primary transition-colors">cloud_upload</span>
                            </div>
                            <div className="text-center space-y-2">
                                <p className="text-lg font-semibold text-white">Drag & drop audio files here</p>
                                <p className="text-sm text-text-secondary max-w-sm mx-auto">
                                    Support for multi-channel audio: <span className="text-white">.wav, .mp3, .flac</span>. Max file size <span className="text-white">500MB</span>.
                                </p>
                            </div>
                            <div className="mt-6 flex items-center gap-3">
                                <span className="h-px w-12 bg-surface-border"></span>
                                <span className="text-xs uppercase tracking-wider text-text-secondary font-medium">or</span>
                                <span className="h-px w-12 bg-surface-border"></span>
                            </div>
                            <button className="mt-6 flex items-center justify-center rounded-lg bg-surface-border px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#3c5345] focus:ring-2 focus:ring-primary/50">
                                Browse Files
                            </button>
                            <input accept=".wav,.mp3,.flac,.aac" className="absolute inset-0 cursor-pointer opacity-0" multiple type="file"/>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-white">Upload Queue (2)</h3>
                                <span className="text-xs text-text-secondary">45% Complete</span>
                            </div>
                            <div className="flex items-center gap-4 rounded-lg bg-[#111814] border border-surface-border p-3 transition-colors hover:border-primary/30">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#29382f] text-primary">
                                    <span className="material-symbols-outlined text-xl">audio_file</span>
                                </div>
                                <div className="flex flex-1 flex-col justify-center min-w-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <p className="truncate text-sm font-medium text-white">LHR_TWR_RX_20231024.wav</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-medium text-primary">Ready</span>
                                            <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-1 w-full overflow-hidden rounded-full bg-surface-border">
                                            <div className="h-full w-full bg-primary rounded-full"></div>
                                        </div>
                                        <span className="text-xs text-text-secondary shrink-0">15.4 MB</span>
                                    </div>
                                </div>
                                <button className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-text-secondary hover:bg-white/10 hover:text-red-400 transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                </button>
                            </div>
                            <div className="flex items-center gap-4 rounded-lg bg-[#111814] border border-surface-border p-3 transition-colors hover:border-primary/30">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#29382f] text-white">
                                    <span className="material-symbols-outlined text-xl">graphic_eq</span>
                                </div>
                                <div className="flex flex-1 flex-col justify-center min-w-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <p className="truncate text-sm font-medium text-white">JFK_APP_TX_Oct24.mp3</p>
                                        <span className="text-xs font-medium text-text-secondary">45%</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-1 w-full overflow-hidden rounded-full bg-surface-border">
                                            <div className="h-full w-[45%] bg-primary animate-pulse rounded-full"></div>
                                        </div>
                                        <span className="text-xs text-text-secondary shrink-0">Uploading...</span>
                                    </div>
                                </div>
                                <button className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-text-secondary hover:bg-white/10 hover:text-red-400 transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">close</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-3 px-6 py-5 border-t border-surface-border bg-[#15251d]">
                        <button onClick={() => navigate(-1)} className="rounded-lg px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors">
                            Cancel
                        </button>
                        <button onClick={() => navigate('/atco-dashboard')} className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-[#052e16] shadow-lg shadow-primary/20 hover:bg-[#15d160] hover:shadow-primary/30 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                            <span className="material-symbols-outlined text-[18px] font-bold">upload_file</span>
                            Submit Audio
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AudioSubmission;