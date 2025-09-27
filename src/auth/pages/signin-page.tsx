import { useEffect, useState } from 'react';
import { useAuth } from '@/auth/context/auth-context';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AlertCircle,
  Check,
  Eye,
  EyeOff,
  LoaderCircleIcon,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { getSigninSchema, SigninSchemaType } from '../forms/signin-schema';

export function SignInPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSSOLoading, setIsSSOLoading] = useState(false);

  // Check for success message from password reset or error messages
  useEffect(() => {
    const pwdReset = searchParams.get('pwd_reset');
    const errorParam = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    if (pwdReset === 'success') {
      setSuccessMessage(
        'Your password has been successfully reset. You can now sign in with your new password.',
      );
    }

    if (errorParam) {
      switch (errorParam) {
        case 'auth_callback_failed':
          setError(
            errorDescription || 'Authentication failed. Please try again.',
          );
          break;
        case 'auth_callback_error':
          setError(
            errorDescription ||
              'An error occurred during authentication. Please try again.',
          );
          break;
        case 'auth_token_error':
          setError(
            errorDescription ||
              'Failed to set authentication session. Please try again.',
          );
          break;
        default:
          setError(
            errorDescription || 'Authentication error. Please try again.',
          );
          break;
      }
    }
  }, [searchParams]);

  const form = useForm<SigninSchemaType>({
    resolver: zodResolver(getSigninSchema()),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: true,
    },
  });

  async function onSubmit(values: SigninSchemaType) {
    try {
      setIsProcessing(true);
      setError(null);

      // Simple validation
      if (!values.username.trim() || !values.password) {
        setError('Vui lòng nhập tài khoản và mật khẩu');
        return;
      }

      // Sign in using the auth context
      await login(values.username, values.password);

      // Get the 'next' parameter from URL if it exists
      const nextPath = searchParams.get('next') || '/';

      // Use navigate for navigation
      navigate(nextPath);
    } catch (err: any) {
      console.log('ERROR', err);
      const message =
        err?.status === 403 ? 'Sai tài khoản hoặc mật khẩu!' : 'Lỗi Server!';
      setError(message);
    } finally {
      setIsProcessing(false);
    }
  }

  // Handle Sign In With SSO
  const handleSSOSignIn = async () => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="block w-full space-y-5"
      >
        <div className="text-center space-y-1 pb-3">
          <h1 className="text-2xl font-semibold tracking-tight">Đăng Nhập</h1>
        </div>

        <div className="flex flex-col gap-3.5">
          <Button
            variant="outline"
            type="button"
            onClick={handleSSOSignIn}
            disabled={isSSOLoading}
          >
            {isSSOLoading ? (
              <span className="flex items-center gap-2">
                Đang đăng nhập bằng SSO...
              </span>
            ) : (
              <>EPS SSO</>
            )}
          </Button>
        </div>

        <div className="relative py-1.5">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              HOẶC
            </span>
          </div>
        </div>

        {error && (
          <Alert
            variant="destructive"
            appearance="light"
            onClose={() => setError(null)}
          >
            <AlertIcon>
              <AlertCircle />
            </AlertIcon>
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}

        {successMessage && (
          <Alert appearance="light" onClose={() => setSuccessMessage(null)}>
            <AlertIcon>
              <Check />
            </AlertIcon>
            <AlertTitle>{successMessage}</AlertTitle>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên Đăng Nhập</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên đăng nhập" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center gap-2.5">
                <FormLabel>Mật Khẩu</FormLabel>
              </div>
              <div className="relative">
                <Input
                  placeholder="Nhập mật khẩu"
                  type={passwordVisible ? 'text' : 'password'} // Toggle input type
                  {...field}
                />
                <Button
                  type="button"
                  variant="ghost"
                  mode="icon"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                >
                  {passwordVisible ? (
                    <EyeOff className="text-muted-foreground" />
                  ) : (
                    <Eye className="text-muted-foreground" />
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal cursor-pointer">
                    Ghi nhớ tôi
                  </FormLabel>
                </div>
                <Link
                  to="/auth/reset-password"
                  className="text-sm font-semibold text-foreground hover:text-primary"
                >
                  Quên Mật Khẩu?
                </Link>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isProcessing}>
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <LoaderCircleIcon className="h-4 w-4 animate-spin" /> Đang đăng
              nhập
            </span>
          ) : (
            'Đăng nhập'
          )}
        </Button>
      </form>
    </Form>
  );
}
