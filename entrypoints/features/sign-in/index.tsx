import type React from 'react';
import { type ChangeEvent, type FormEvent, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import * as z from 'zod';

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const Signin: React.FC = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    try {
      if (name === 'email') {
        signInSchema.pick({ email: true }).parse({ email: value });
        setErrors((prev) => ({ ...prev, email: false }));
      } else if (name === 'password') {
        signInSchema.pick({ password: true }).parse({ password: value });
        setErrors((prev) => ({ ...prev, password: false }));
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [name]: true }));
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      signInSchema.parse(form);
      console.log('Sign-in successful:', form);
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert('Please fill out all fields correctly.');
        return;
      }
    }
  };

  const isFormValid =
    Object.values(errors).every((error) => !error) && Object.values(form).every((value) => value);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Existing user? Sign in</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? 'border-red-500' : ''}
            required
          />

          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? 'border-red-500' : ''}
              required
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
              role="button"
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>

          <Button type="submit" className="w-full" disabled={!isFormValid}>
            Sign in
          </Button>

          <p className="text-center text-sm">
            Don't have an account?{' '}
            <a href="#signup" className="text-primary hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};
Signin.displayName = 'Signin';
export default Signin;
