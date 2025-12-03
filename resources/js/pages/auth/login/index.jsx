import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Head, Link } from '@inertiajs/react';
import InputField from '@/components/shared/form/input-field';
import AuthLayout from '@/components/layouts/auth-layout';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    });

    const { login, loading } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && formData.email && formData.password) {
            handleSubmit(e);
        }
    };

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <AuthLayout title="Welcome to Laboo" subtitle="Your gateway to sustainable innovation">
            <Head title="Login" />
            <div className="w-full max-w-md">
                <div className="mb-8">
                    <h1 className="text-4xl text-primary-hijauTua font-extrabold mb-2">
                        Login
                    </h1>
                    <p className="text-gray-600">
                        Welcome back! Please enter your details.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <InputField
                        id="email"
                        label="Email or Username"
                        icon={Mail}
                        placeholder="Enter your email or username"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        onKeyPress={handleKeyDown}
                    />

                    <InputField
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        icon={Lock}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => updateFormData('password', e.target.value)}
                        onKeyPress={handleKeyDown}
                        showRightIconButton
                        onRightIconClick={() => setShowPassword(!showPassword)}
                        rightIcon={showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    />

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remember"
                                checked={formData.remember}
                                onCheckedChange={(checked) => updateFormData('remember', checked)}
                                className="border-gray-300 data-[state=checked]:!bg-primary-hijauMuda data-[state=checked]:!border-primary-hijauMuda"
                            />
                            <Label
                                htmlFor="remember"
                                className="text-sm font-normal text-gray-700 cursor-pointer"
                            >
                                Remember me
                            </Label>
                        </div>
                        <Link
                            href="/forgot-password"
                            className="text-sm text-primary-hijauTua font-bold hover:underline transition-colors"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 bg-primary-hijauMuda hover:bg-primary-hijauMuda/90 text-white font-semibold rounded-lg transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] shadow-md"
                        disabled={loading || !formData.email || !formData.password}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <Spinner />
                                Logging in...
                            </span>
                        ) : (
                            'Login'
                        )}
                    </Button>
                </form>
            </div>
        </AuthLayout>
    );
}