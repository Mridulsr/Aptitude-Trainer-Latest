import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Mail, Lock, User, Briefcase, Award, ArrowRight, 
  ShieldCheck, Cpu, Code2, Database, Phone, KeyRound, 
  MessageSquareCode, CheckCircle2, AlertTriangle, Play,
  Search, Users, Zap, RefreshCw, Globe, Calendar
} from 'lucide-react';
import { 
  registerUser, 
  loginUser, 
  registerOrLoginWithGoogle, 
  registerOrLoginWithPhone,
  getAllRegisteredUsers
} from '../lib/firebase';
import { AppUser, Theme } from '../types';

interface AuthPageProps {
  theme: Theme;
  onAuthSuccess: (user: AppUser) => void;
}

type AuthMethod = 'email' | 'phone' | 'google';

export const AuthPage: React.FC<AuthPageProps> = ({ theme, onAuthSuccess }) => {
  const [authMethod, setAuthMethod] = useState<AuthMethod>('email');
  const [isRegister, setIsRegister] = useState<boolean>(true);
  
  // Input fields
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  
  // Dynamic Preferences
  const [targetCompany, setTargetCompany] = useState<string>('All');
  const [levelPreference, setLevelPreference] = useState<string>('Easy');

  // Verification & OTP state
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [userOtpInput, setUserOtpInput] = useState<string>('');
  const [otpVerified, setOtpVerified] = useState<boolean>(false);

  // Loading, Errors, Success
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  // Google Account Chooser Simulation State
  const [showGoogleModal, setShowGoogleModal] = useState<boolean>(false);
  const [googleEmail, setGoogleEmail] = useState<string>('');
  const [googleName, setGoogleName] = useState<string>('');

  // Live Registration Directory State
  const [registeredUsers, setRegisteredUsers] = useState<AppUser[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRefreshingUsers, setIsRefreshingUsers] = useState<boolean>(false);
  const [activeToast, setActiveToast] = useState<{ type: 'email' | 'sms', code: string, recipient: string } | null>(null);

  const fetchUsers = async () => {
    setIsRefreshingUsers(true);
    try {
      const list = await getAllRegisteredUsers();
      setRegisteredUsers(list);
    } catch (err) {
      console.error('Error fetching registered users:', err);
    } finally {
      setIsRefreshingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const companies = [
    { value: 'All', label: 'All Companies' },
    { value: 'Google', label: 'Google' },
    { value: 'Amazon', label: 'Amazon' },
    { value: 'Meta', label: 'Meta' },
    { value: 'Microsoft', label: 'Microsoft' },
    { value: 'Netflix', label: 'Netflix' },
    { value: 'TCS', label: 'TCS / Tata Consultancy' },
    { value: 'Infosys', label: 'Infosys' },
    { value: 'Wipro', label: 'Wipro' },
    { value: 'Cognizant', label: 'Cognizant' }
  ];

  const levels = [
    { value: 'Easy', label: 'Easy (Freshers)' },
    { value: 'Medium', label: 'Medium (Intermediate)' },
    { value: 'Hard', label: 'Hard (Product Companies)' },
    { value: 'Advanced', label: 'Advanced (FAANG/MAANG)' }
  ];

  // Helper: Trigger Simulated OTP code
  const triggerOtpSend = (type: 'email' | 'sms') => {
    setErrorMsg('');
    setSuccessMsg('');

    if (type === 'email' && !email.trim()) {
      setErrorMsg('Please enter an email address first.');
      return;
    }
    if (type === 'sms' && !phone.trim()) {
      setErrorMsg('Please enter your phone number first.');
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpSent(true);
    setUserOtpInput('');
    setOtpVerified(false);

    const recipient = type === 'email' ? email.trim() : phone.trim();
    setActiveToast({ type, code, recipient });

    setSuccessMsg(`💬 Dynamic OTP Code generated and dispatched to ${recipient}!`);
  };

  // Submit standard Email registration or normal login
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please provide both your email and password.');
      return;
    }

    if (isRegister && !name.trim()) {
      setErrorMsg('Please enter your full name to register.');
      return;
    }

    setIsLoading(true);

    try {
      if (isRegister) {
        // Since we also support OTP, let's verify if they used it
        const user = await registerUser(name, email, password, targetCompany, levelPreference, '', 'email');
        setSuccessMsg(`🎉 Account registered successfully! Welcome, ${user.name}!`);
        await fetchUsers();
        setTimeout(() => {
          onAuthSuccess(user);
        }, 1500);
      } else {
        const user = await loginUser(email, password);
        setSuccessMsg(`Welcome back, ${user.name}!`);
        await fetchUsers();
        setTimeout(() => {
          onAuthSuccess(user);
        }, 1200);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An authentication error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Email OTP Registration
  const handleEmailOtpVerifyAndAuth = async () => {
    setErrorMsg('');
    setSuccessMsg('');

    if (userOtpInput !== generatedOtp) {
      setErrorMsg('Incorrect 6-digit OTP code. Please check your simulated inbox below.');
      return;
    }

    setOtpVerified(true);
    setIsLoading(true);

    try {
      // Register or login user on Firestore
      const customName = name.trim() || `Alumni ${email.split('@')[0]}`;
      const user = await registerUser(
        customName, 
        email, 
        'otp_verified_user_pass_' + generatedOtp, 
        targetCompany, 
        levelPreference, 
        '', 
        'email'
      );
      setSuccessMsg(`🎉 Email OTP verified! Welcome, ${user.name}! Saving database record...`);
      await fetchUsers();
      setTimeout(() => {
        onAuthSuccess(user);
      }, 1500);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error creating profile after OTP verification.');
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Phone Number OTP login
  const handlePhoneOtpVerifyAndAuth = async () => {
    setErrorMsg('');
    setSuccessMsg('');

    if (userOtpInput !== generatedOtp) {
      setErrorMsg('Incorrect 6-digit OTP code. Please copy the code from the simulated SMS screen below.');
      return;
    }

    setOtpVerified(true);
    setIsLoading(true);

    try {
      const customName = name.trim() || `Alumni ${phone.slice(-4)}`;
      const user = await registerOrLoginWithPhone(phone, customName);
      setSuccessMsg(`🎉 Mobile OTP verified! Welcome, ${user.name}! Dynamic profile synced to Firestore.`);
      await fetchUsers();
      setTimeout(() => {
        onAuthSuccess(user);
      }, 1500);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to authenticate phone OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle simulated Google Sign-in action
  const handleGoogleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!googleEmail.trim() || !googleName.trim()) {
      setErrorMsg('Please select or write your Google username & email.');
      return;
    }

    setIsLoading(true);
    setShowGoogleModal(false);

    try {
      const user = await registerOrLoginWithGoogle(googleName, googleEmail);
      setSuccessMsg(`🎉 Successfully authenticated with Google Account: ${user.email}`);
      await fetchUsers();
      setTimeout(() => {
        onAuthSuccess(user);
      }, 1200);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Google account registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickGoogleChoose = (selectedName: string, selectedEmail: string) => {
    setGoogleName(selectedName);
    setGoogleEmail(selectedEmail);
  };

  const filteredUsers = registeredUsers.filter(usr => {
    const q = searchQuery.toLowerCase();
    return (
      usr.name.toLowerCase().includes(q) ||
      (usr.email && usr.email.toLowerCase().includes(q)) ||
      (usr.phone && usr.phone.toLowerCase().includes(q)) ||
      (usr.targetCompany && usr.targetCompany.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-start py-12 px-4 md:px-8 gap-8 selection:bg-indigo-500/30 selection:text-indigo-200 relative overflow-x-hidden">
      {/* Decorative dynamic ambient blobs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div id="auth-container" className="w-full max-w-6xl bg-slate-950/40 border border-slate-900 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl grid grid-cols-1 md:grid-cols-12 min-h-[660px] relative z-10">
        
        {/* Left Side: Product Showcase & Database telemetry */}
        <div className="md:col-span-5 bg-gradient-to-br from-indigo-950/40 via-slate-950 to-slate-950 p-8 md:p-12 flex flex-col justify-between border-r border-slate-900">
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-indigo-600/20 border border-indigo-500/30 rounded-2xl text-indigo-400">
                <Code2 className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="font-black text-xl tracking-wider text-white">DSA.<span className="text-indigo-400">viz</span></span>
                <span className="text-[10px] text-slate-400 block font-semibold leading-none">Smart Placement Prep</span>
              </div>
            </div>

            <div className="pt-6 space-y-4">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
                Master Data Structures & Algorithms.
              </h1>
              <p className="text-xs text-slate-400 leading-relaxed">
                Unlock high-fidelity visualizers, practice interactive company MCQs, analyze your speed & performance, and ask the AI Tutor for real-time code summaries.
              </p>
            </div>
          </div>

          {/* Real-time Registration Database stats info */}
          <div className="my-6 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Database className="w-3.5 h-3.5 text-indigo-400" /> Database Live Sync
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Every registration triggers real-time state structures inside your secure <strong>Firestore Cloud Database</strong>. Verify your study streak and speed logs across devices seamlessly!
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[9px] text-slate-500">
              <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-900">
                <span className="block text-slate-400 font-bold">PROJECT ID</span>
                <span className="truncate block">gen-lang-client-03...</span>
              </div>
              <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-900">
                <span className="block text-slate-400 font-bold">COLLECTIONS</span>
                <span>/users, /speedLogs</span>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-600 flex items-center gap-1.5 font-mono pt-4 border-t border-slate-900">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Secure SSL Cloud Encryption Active</span>
          </div>
        </div>

        {/* Right Side: Multi-Option Authentication Panel */}
        <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto space-y-6">
            
            {/* Header / Primary Mode Switchers */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-1 bg-slate-900 p-1 rounded-2xl border border-slate-850">
                <button
                  type="button"
                  id="tab-auth-method-email"
                  onClick={() => {
                    setAuthMethod('email');
                    setErrorMsg('');
                    setSuccessMsg('');
                    setOtpSent(false);
                  }}
                  className={`flex-1 py-2 px-3 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    authMethod === 'email'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  Email Channel
                </button>

                <button
                  type="button"
                  id="tab-auth-method-phone"
                  onClick={() => {
                    setAuthMethod('phone');
                    setErrorMsg('');
                    setSuccessMsg('');
                    setOtpSent(false);
                  }}
                  className={`flex-1 py-2 px-3 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    authMethod === 'phone'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  Phone OTP
                </button>

                <button
                  type="button"
                  id="tab-auth-method-google"
                  onClick={() => {
                    setAuthMethod('google');
                    setErrorMsg('');
                    setSuccessMsg('');
                    setOtpSent(false);
                    // Open Google selection modal
                    setShowGoogleModal(true);
                  }}
                  className={`flex-1 py-2 px-3 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    authMethod === 'google'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  Google Auth
                </button>
              </div>

              {/* Title & Help Text */}
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">
                  {authMethod === 'email' && (isRegister ? 'Register your self first' : 'Access your dashboard')}
                  {authMethod === 'phone' && 'Phone OTP Authentication'}
                  {authMethod === 'google' && 'Google Account Authorization'}
                </h2>
                <p className="text-xs text-slate-500 leading-normal">
                  {authMethod === 'email' && (
                    isRegister 
                      ? 'Choose traditional password or request a dynamic 6-digit email verification OTP.'
                      : 'Sign in using your pre-existing email and password combination.'
                  )}
                  {authMethod === 'phone' && 'Verify your mobile number instantly to dynamically bootstrap/retrieve your database profile.'}
                  {authMethod === 'google' && 'Utilize secure Single Sign-On (SSO) simulated parameters to connect through Google.'}
                </p>
              </div>
            </div>

            {/* Error / Success Notifications */}
            {errorMsg && (
              <div className="p-3.5 bg-rose-950/20 border border-rose-900/40 rounded-xl text-[11px] text-rose-400 leading-relaxed flex items-start gap-2 animate-fade-in">
                <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3.5 bg-emerald-950/20 border border-emerald-900/40 rounded-xl text-[11px] text-emerald-400 leading-relaxed flex items-start gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* CHANNEL 1: EMAIL & PASSWORD / EMAIL OTP */}
            {authMethod === 'email' && (
              <div className="space-y-4 animate-fade-in">
                
                {/* Traditional Register / Login toggle */}
                <div className="flex items-center gap-3 bg-slate-900/40 p-1.5 rounded-xl border border-slate-900 w-fit">
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegister(true);
                      setOtpSent(false);
                      setErrorMsg('');
                    }}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold ${
                      isRegister ? 'bg-indigo-950 text-indigo-300 border border-indigo-900/50' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Register Mode
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegister(false);
                      setOtpSent(false);
                      setErrorMsg('');
                    }}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold ${
                      !isRegister ? 'bg-indigo-950 text-indigo-300 border border-indigo-900/50' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Password Sign In
                  </button>
                </div>

                {/* Email Fields Form */}
                <form onSubmit={handleEmailAuth} className="space-y-4">
                  {isRegister && (
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Your Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Alex Mercer"
                          className="w-full pl-9.5 pr-4 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-medium"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@university.edu"
                        className="w-full pl-9.5 pr-4 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-medium"
                      />
                    </div>
                  </div>

                  {!otpSent && (
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Password</label>
                        {isRegister && (
                          <button
                            type="button"
                            onClick={() => triggerOtpSend('email')}
                            className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 cursor-pointer"
                          >
                            Or Register with Email OTP Instead
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-9.5 pr-4 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-medium"
                        />
                      </div>
                    </div>
                  )}

                  {/* Register specific Target preferences */}
                  {isRegister && !otpSent && (
                    <div className="grid grid-cols-2 gap-4 pt-1">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block flex items-center gap-1">
                          <Briefcase className="w-3 h-3 text-indigo-400" /> Target Company
                        </label>
                        <select
                          value={targetCompany}
                          onChange={(e) => setTargetCompany(e.target.value)}
                          className="w-full p-2.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-slate-300 focus:outline-none"
                        >
                          {companies.map((co) => (
                            <option key={co.value} value={co.value}>{co.label}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block flex items-center gap-1">
                          <Award className="w-3 h-3 text-indigo-400" /> Prep Level
                        </label>
                        <select
                          value={levelPreference}
                          onChange={(e) => setLevelPreference(e.target.value)}
                          className="w-full p-2.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-slate-300 focus:outline-none"
                        >
                          {levels.map((lvl) => (
                            <option key={lvl.value} value={lvl.value}>{lvl.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {!otpSent && (
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-lg shadow-indigo-600/20"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin" />
                          <span>Processing Cloud Record...</span>
                        </>
                      ) : (
                        <>
                          <span>{isRegister ? 'Register New Student Profile' : 'Sign In securely'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </form>

                {/* EMAIL OTP CODE VERIFICATION MODE */}
                {otpSent && !otpVerified && (
                  <div className="space-y-4 p-4 rounded-2xl bg-slate-900 border border-slate-800/80 animate-fade-in">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block flex items-center gap-1">
                          <KeyRound className="w-3.5 h-3.5" /> 6-Digit Email OTP Code Required
                        </label>
                        <button 
                          onClick={() => setOtpSent(false)} 
                          className="text-[9px] text-slate-400 hover:text-white"
                        >
                          Change Email
                        </button>
                      </div>
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="Enter the 6-Digit Code"
                        value={userOtpInput}
                        onChange={(e) => setUserOtpInput(e.target.value.replace(/\D/g, ''))}
                        className="w-full p-3 text-center text-lg font-bold tracking-widest rounded-xl bg-slate-950 border border-slate-800 text-indigo-400 focus:outline-none focus:border-emerald-500 placeholder:text-slate-800"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleEmailOtpVerifyAndAuth}
                      disabled={isLoading || userOtpInput.length < 6}
                      className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      Verify Code & Complete Registration
                    </button>

                    {/* Email Inbox simulator device */}
                    <div className="pt-2 border-t border-slate-850">
                      <span className="text-[9px] text-slate-500 block uppercase tracking-wide font-bold mb-1">Simulated Student Email Dispatcher</span>
                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-[10px] text-slate-400 space-y-1">
                        <div className="flex justify-between border-b border-slate-900 pb-1 text-slate-500">
                          <span>From: placement-noreply@dsa.viz</span>
                          <span>Now</span>
                        </div>
                        <p className="text-white pt-1">
                          Subject: <span className="text-indigo-300 font-bold">[DSA.viz] OTP Verification Code</span>
                        </p>
                        <p className="text-slate-400 text-[10px] leading-normal pt-1">
                          Your study verification OTP is: <strong className="text-emerald-400 text-xs px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-900/50">{generatedOtp}</strong>. 
                          Please copy this code to complete registering.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* CHANNEL 2: PHONE NUMBER OTP VERIFICATION */}
            {authMethod === 'phone' && (
              <div className="space-y-4 animate-fade-in">
                
                {/* Full Name field to attach if registering for the first time */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Your Full Name (Optional)</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Mercer"
                      className="w-full pl-9.5 pr-4 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-medium"
                    />
                  </div>
                </div>

                {/* Phone input */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210 or +1 (555) 123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9.5 pr-4 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-medium"
                    />
                  </div>
                </div>

                {!otpSent ? (
                  <button
                    type="button"
                    onClick={() => triggerOtpSend('sms')}
                    className="w-full py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquareCode className="w-4 h-4 text-indigo-300" />
                    <span>Send SMS Verification OTP</span>
                  </button>
                ) : (
                  <div className="space-y-4 p-4 rounded-2xl bg-slate-900 border border-slate-800/80 animate-fade-in">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block flex items-center gap-1">
                          <KeyRound className="w-3.5 h-3.5" /> Enter 6-Digit SMS OTP
                        </label>
                        <button 
                          onClick={() => setOtpSent(false)} 
                          className="text-[9px] text-slate-400 hover:text-white"
                        >
                          Change Number
                        </button>
                      </div>
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="Enter the 6-Digit Code"
                        value={userOtpInput}
                        onChange={(e) => setUserOtpInput(e.target.value.replace(/\D/g, ''))}
                        className="w-full p-3 text-center text-lg font-bold tracking-widest rounded-xl bg-slate-950 border border-slate-800 text-indigo-400 focus:outline-none focus:border-emerald-500 placeholder:text-slate-800"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handlePhoneOtpVerifyAndAuth}
                      disabled={isLoading || userOtpInput.length < 6}
                      className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      Verify SMS Code & Login
                    </button>

                    {/* Simulated mobile phone device screen */}
                    <div className="pt-2 border-t border-slate-850">
                      <span className="text-[9px] text-slate-500 block uppercase tracking-wide font-bold mb-1">Simulated SMS Message Broadcast</span>
                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-[10px] text-slate-400 space-y-1">
                        <div className="flex justify-between border-b border-slate-900 pb-1 text-slate-500">
                          <span>From: 1900-PLACEMENT</span>
                          <span>Just Now</span>
                        </div>
                        <p className="text-slate-200 leading-normal pt-1">
                          &quot;Use verification code <strong className="text-emerald-400 text-xs px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-900/50">{generatedOtp}</strong> to authorize your DSA.viz account. Do not share.&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* CHANNEL 3: GOOGLE AUTH */}
            {authMethod === 'google' && (
              <div className="space-y-4 animate-fade-in text-center py-4 bg-slate-900/20 border border-slate-900 rounded-3xl p-6">
                <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-2 text-indigo-400">
                  <Sparkles className="w-6 h-6 animate-spin" />
                </div>
                <h3 className="text-sm font-bold text-white">Google Identity Authorization</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Click below to open the secure account selector overlay and authorize with your Gmail details instantly.
                </p>

                <button
                  type="button"
                  onClick={() => setShowGoogleModal(true)}
                  className="w-full mt-4 py-3 bg-white text-slate-950 hover:bg-slate-100 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-md"
                >
                  {/* Google SVG G-logo */}
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Select Google Account to login</span>
                </button>
              </div>
            )}

            {/* Bottom Info Support */}
            <div className="text-center pt-2">
              <span className="text-[10px] text-slate-500 font-medium">
                {isRegister
                  ? 'Your profile is securely hosted inside the dedicated Firestore cluster.'
                  : 'Welcome back! Register or change login method anytime.'}
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* SECURE GOOGLE IDENTITY SELECTOR DIALOG */}
      {showGoogleModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in">
            {/* Modal Header */}
            <div className="p-6 pb-4 border-b border-slate-800 text-center relative">
              {/* Google Brand G */}
              <div className="w-10 h-10 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <h3 className="text-sm font-bold text-white">Sign in with Google</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">to continue to dsa-viz.web.app</p>
              
              <button 
                onClick={() => setShowGoogleModal(false)}
                className="absolute top-4 right-4 text-xs font-bold text-slate-500 hover:text-white px-2 py-1 rounded bg-slate-950/40"
              >
                Cancel
              </button>
            </div>

            {/* Quick pre-existing mock accounts list */}
            <div className="p-4 space-y-2.5">
              <span className="text-[10px] text-slate-500 uppercase tracking-wide font-bold block px-2">Choose an account</span>
              
              {/* Account Item 1 */}
              <button
                type="button"
                onClick={() => handleQuickGoogleChoose('Mridul Raj', 'mridul.raj.2222@gmail.com')}
                className="w-full p-3 rounded-2xl bg-slate-950/40 hover:bg-slate-950 border border-slate-800 text-left flex items-center justify-between transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-400 font-extrabold flex items-center justify-center text-xs">
                    MR
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-200 block group-hover:text-white">Mridul Raj</span>
                    <span className="text-[10px] text-slate-500 font-mono block">mridul.raj.2222@gmail.com</span>
                  </div>
                </div>
                <Play className="w-3.5 h-3.5 text-slate-700 group-hover:text-indigo-400 transition-colors" />
              </button>

              {/* Account Item 2 */}
              <button
                type="button"
                onClick={() => handleQuickGoogleChoose('Guest Student', 'guest.student@gmail.com')}
                className="w-full p-3 rounded-2xl bg-slate-950/40 hover:bg-slate-950 border border-slate-800 text-left flex items-center justify-between transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-600/20 text-emerald-400 font-extrabold flex items-center justify-center text-xs">
                    GS
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-200 block group-hover:text-white">Guest Student</span>
                    <span className="text-[10px] text-slate-500 font-mono block">guest.student@gmail.com</span>
                  </div>
                </div>
                <Play className="w-3.5 h-3.5 text-slate-700 group-hover:text-indigo-400 transition-colors" />
              </button>

              {/* Input custom account manually */}
              <div className="pt-3 border-t border-slate-850 space-y-3">
                <span className="text-[10px] text-slate-500 uppercase tracking-wide font-bold block px-2">Or Use another account</span>
                
                <form onSubmit={handleGoogleAuthSubmit} className="space-y-2.5">
                  <input
                    type="text"
                    required
                    placeholder="Enter Google Full Name"
                    value={googleName}
                    onChange={(e) => setGoogleName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Enter Gmail Address"
                    value={googleEmail}
                    onChange={(e) => setGoogleEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none font-mono"
                  />
                  
                  <button
                    type="submit"
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Confirm & Authorize Account
                  </button>
                </form>
              </div>
            </div>

            {/* Modal Footer info */}
            <div className="p-4 bg-slate-950 border-t border-slate-850 text-center text-[10px] text-slate-500 leading-normal">
              By authorizing, Google shares your email and profile name with DSA.viz. Review the terms of service.
            </div>
          </div>
        </div>
      )}

      {/* GLOBAL DISPATCH TOAST NOTIFICATION DEVICE */}
      {activeToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 animate-slide-down">
          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border-2 border-emerald-500/80 rounded-2xl p-4 shadow-[0_0_30px_rgba(16,185,129,0.25)] text-white relative">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-emerald-400 shrink-0">
                <ShieldCheck className="w-5 h-5 animate-bounce" />
              </div>
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                    ⚡ Real-Time OTP Outbox Simulator
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">Just Now</span>
                </div>
                <p className="text-xs text-slate-200 leading-normal">
                  A real {activeToast.type === 'email' ? 'email verification' : 'cellular SMS text'} was simulated for: <strong className="text-indigo-300 font-mono">{activeToast.recipient}</strong>.
                </p>
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[9px] text-slate-500 block uppercase font-bold">Copy OTP Code</span>
                    <span className="text-lg font-black tracking-widest text-emerald-400 font-mono">
                      {activeToast.code}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(activeToast.code);
                    }}
                    className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-lg transition-all cursor-pointer"
                  >
                    Copy Code
                  </button>
                </div>
              </div>
            </div>
            {/* Close button */}
            <button
              onClick={() => setActiveToast(null)}
              className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs font-bold shadow-md cursor-pointer"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* REAL-TIME CLOUD DATABASE DIRECTORY SECTION */}
      <div id="live-users-directory" className="w-full max-w-6xl bg-slate-950/40 border border-slate-900 rounded-3xl p-6 md:p-8 backdrop-blur-xl space-y-6 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              Live Student Registration Directory
            </h3>
            <p className="text-[11px] text-slate-400 leading-normal">
              Real-time Firestore query synchronized with active cloud/local backup clusters. Select any profile for developer quick-login.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={fetchUsers}
              disabled={isRefreshingUsers}
              className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 disabled:opacity-50 border border-slate-850 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-[10px] font-bold"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${isRefreshingUsers ? 'animate-spin' : ''}`} />
              Sync DB
            </button>
            <span className="text-[10px] font-mono bg-indigo-950/50 border border-indigo-900/50 text-indigo-300 py-1.5 px-3 rounded-xl flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              {registeredUsers.length} Students Synced
            </span>
          </div>
        </div>

        {/* Filters and search bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search synced records by student name, phone, email, company preference..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-medium"
          />
        </div>

        {/* Student list grid */}
        {filteredUsers.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/20 border border-slate-900 rounded-2xl text-slate-500 text-xs font-medium space-y-1">
            <Globe className="w-6 h-6 mx-auto text-slate-600 animate-pulse" />
            <p>No student profile found matching &quot;{searchQuery}&quot;</p>
            <p className="text-[10px] text-slate-600">Complete the registration form above to see your record update in real-time!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredUsers.map((usr) => (
              <div 
                key={usr.uid} 
                className="p-4 bg-slate-900/40 hover:bg-slate-900/80 border border-slate-900 hover:border-slate-800/80 rounded-2xl transition-all flex flex-col justify-between gap-4 group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center font-black text-xs text-indigo-400">
                        {usr.name ? usr.name.charAt(0).toUpperCase() : 'A'}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-200 truncate group-hover:text-white">{usr.name || 'Anonymous'}</h4>
                        <span className="text-[9px] text-slate-500 font-mono block">ID: {usr.uid}</span>
                      </div>
                    </div>
                    <span className="text-[8px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider bg-slate-800 border border-slate-700 text-slate-400">
                      {usr.authMethod || 'email'}
                    </span>
                  </div>

                  <div className="space-y-1 font-mono text-[10px] text-slate-400 border-t border-slate-950 pt-2">
                    {usr.email && (
                      <div className="flex items-center gap-1.5 text-slate-400 truncate">
                        <Mail className="w-3 h-3 text-slate-500" />
                        <span>{usr.email}</span>
                      </div>
                    )}
                    {usr.phone && (
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Phone className="w-3 h-3 text-slate-500" />
                        <span>{usr.phone}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[9px] text-slate-500 pt-1">
                      <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {usr.targetCompany || 'All'}</span>
                      <span className="flex items-center gap-1"><Award className="w-3 h-3" /> {usr.levelPreference || 'Easy'}</span>
                    </div>
                  </div>
                </div>

                {/* Developer quick login actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-950 text-[10px]">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(usr.createdAt || Date.now()).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setSuccessMsg(`🚀 Quick Dev-Login Success! Welcome back, ${usr.name}!`);
                      // Update session cache manually in localStorage just like loginUser
                      localStorage.setItem('dsa_auth_user', JSON.stringify(usr));
                      setTimeout(() => {
                        onAuthSuccess(usr);
                      }, 1200);
                    }}
                    className="py-1 px-2.5 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/20 hover:border-indigo-500 rounded-lg transition-all font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Zap className="w-3 h-3" />
                    Quick Login
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
