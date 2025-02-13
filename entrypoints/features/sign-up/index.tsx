import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type React from 'react';
import { type ChangeEvent, type FormEvent, useState } from 'react';
import { z } from 'zod';

const signupSchema = z
  .object({
    email: z.string().email(),
    phoneNumber: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/),
    password: z
      .string()
      .min(8)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    retypePassword: z.string(),
  })
  .refine((data) => data.password === data.retypePassword, {
    message: "Passwords don't match",
    path: ['retypePassword'],
  });

type SignupSchema = z.infer<typeof signupSchema>;

export const Signup: React.FC = () => {
  const [form, setForm] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    retypePassword: '',
  });

  const [errors, setErrors] = useState({
    email: false,
    phoneNumber: false,
    password: false,
    retypePassword: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    try {
      if (name === 'phoneNumber') {
        const formatted = formatPhoneNumber(value);
        updatedForm.phoneNumber = formatted;
        setForm(updatedForm);
      }

      const validatedField = signupSchema.pick({ [name]: true });
      validatedField.parse({ [name]: name === 'phoneNumber' ? updatedForm.phoneNumber : value });

      setErrors((prev) => ({ ...prev, [name]: false }));

      if (name === 'password' || name === 'retypePassword') {
        try {
          signupSchema
            .refine((data) => data.password === data.retypePassword, {
              message: "Passwords don't match",
              path: ['retypePassword'],
            })
            .parse(updatedForm);
          setErrors((prev) => ({ ...prev, retypePassword: false }));
        } catch {
          setErrors((prev) => ({ ...prev, retypePassword: true }));
        }
      }
    } catch {
      setErrors((prev) => ({ ...prev, [name]: true }));
    }
  };

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const match = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      return !match[2] ? match[1] : `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ''}`;
    }
    return value;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const validatedData = signupSchema.parse(form);
      console.log('Form submitted:', validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert('Please fill out all fields correctly.');
      }
    }
  };

  const isFormValid =
    Object.values(errors).every((error) => !error) && Object.values(form).every((value) => value);

  return (
    <Card className="w-[350px] mx-auto">
      <CardHeader>
        <CardTitle>genie is installed!</CardTitle>
        <CardDescription>let's get you started and create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="example@domain.com"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? 'border-red-500' : ''}
            required
          />

          <Input
            type="tel"
            name="phoneNumber"
            placeholder="(xxx) xxx-xxxx"
            value={form.phoneNumber}
            onChange={handleChange}
            className={errors.phoneNumber ? 'border-red-500' : ''}
            required
          />

          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="password"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? 'border-red-500' : ''}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </div>

          <div className="relative">
            <Input
              type={showRetypePassword ? 'text' : 'password'}
              name="retypePassword"
              placeholder="retype password"
              value={form.retypePassword}
              onChange={handleChange}
              className={errors.retypePassword ? 'border-red-500' : ''}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowRetypePassword((prev) => !prev)}
            >
              {showRetypePassword ? 'Hide' : 'Show'}
            </Button>
          </div>

          <Button type="submit" className="w-full" disabled={!isFormValid}>
            sign up
          </Button>

          <p className="text-center text-sm">
            <a href="#" className="text-blue-500 hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

Signup.displayName = 'Signup';
export default Signup;
