import axios from 'axios';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import classnames from 'classnames';
import { useRouter} from 'next/router';
import React, { ChangeEvent, useState, useEffect } from 'react';

import styles from '@/styles/pages/auth.module.scss';
import stylesForm from '@/styles/components/form.module.scss';

import HeaderImage1 from '@/../public/images/backgrounds/background_2-cataclysm.jpg';
import HeaderImage2 from '@/../public/images/backgrounds/background_2-wotlk.webp';

const Input = dynamic(() => import('@/components/input'));
const Button = dynamic(() => import('@/components/button'));

import { useUser } from '@/hooks/use-user';

const defaultForm =
    {
        register:
            {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
        login:
            {
                username: '',
                password: ''
            }
    };

const Register = () =>
{
    const [user] = useUser();
    const { push } = useRouter();

    const [errors] = useState([]);
    const [active, setActive] = useState<boolean>(true);
    const [formValues, setFormValues] = useState(defaultForm);

    const handleChange = (event: ChangeEvent<HTMLInputElement>, type: 'register' | 'login') =>
    {
        setFormValues({ ...formValues, [type]: { [event.target.name]: event.target.value }});
    };

    const handleRegister = async(event: any) =>
    {
        event.preventDefault();

        const data: any = await axios.post('/auth/register', formValues);

        if (data?.response?.data?.message)
        {
            console.log('Error: ');
            console.log(data?.response?.data?.message);
        }
        else
            await push('/login');
    };

    useEffect(() =>
    {
        (
            async() =>
            {
                if (user)
                    await push('/account');
            }
        )();
    }, [user]);

    return (
        <div className={styles.auth}>
            <span className={styles.authVideo}>
                <video autoPlay loop>
                    <source src={ `/videos/video_1-${ process.env.NEXT_PUBLIC_THEME }.mp4` } />
                </video>
                <span className={styles.authFilter} />
                <span className={styles.authFilter} />
                <span className={styles.authFilter2} />
            </span>

            <div data-register className={stylesForm.formFrame}>
                <i data-top_right>
                    <span/>
                    <span/>
                </i>
                <i data-top_left>
                    <span/>
                    <span/>
                </i>
                <i data-bottom_left>
                    <span/>
                    <span/>
                </i>
                <i data-bottom_right>
                    <span/>
                    <span/>
                </i>

                <div className={stylesForm.form}>
                    <div className={classnames(stylesForm.formContainer, stylesForm.formContainerSignUp)}>
                        <form onSubmit={handleRegister}>
                            <h2>
                                Hello, Friend!
                            </h2>

                            <p>
                                Enter your personal details to sign up
                            </p>

                            <Input
                                required
                                style='register'
                                name='firstName'
                                label='First Name'
                                placeholder='Your first name'
                                onChange={(event) => handleChange(event, 'register')}
                                errors={errors.filter((item: string) => item.startsWith('first_name'))}
                            />

                            <Input
                                required
                                name='lastName'
                                label='Last Name'
                                placeholder='Your last name'
                                onChange={(event) => handleChange(event, 'register')}
                                errors={errors.filter((item: string) => item.startsWith('last_name'))}
                            />

                            <Input
                                required
                                name='username'
                                label='Username'
                                placeholder='Your username'
                                onChange={(event) => handleChange(event, 'register')}
                                errors={errors.filter((item: string) => item.startsWith('username'))}
                            />

                            <Input
                                required
                                name='email'
                                label='Email Address'
                                placeholder='Your email address'
                                onChange={(event) => handleChange(event, 'register')}
                                errors={errors.filter((item: string) => item.startsWith('email'))}
                            />

                            <Input
                                required
                                type='password'
                                name='password'
                                label='Password'
                                placeholder='Your password'
                                onChange={(event) => handleChange(event, 'register')}
                                errors={errors.filter((item: string) => item.startsWith('password'))}
                            />


                            <Input
                                required
                                type='password'
                                name='confirmPassword'
                                label='Confirm Password'
                                placeholder='Confirm your password'
                                onChange={(event) => handleChange(event, 'register')}
                                errors={errors.filter((item: string) => item.startsWith('confirm_password'))}
                            />

                            <Button onClick={handleRegister}>
                                Sign Up
                            </Button>
                        </form>
                    </div>

                    <div data-deactive className={classnames(stylesForm.formContainer, stylesForm.formContainerSignIn)}>
                        <form>
                            <h2>
                                Welcome Back!
                            </h2>

                            <p>
                                Enter your personal info to sign in
                            </p>

                            <Input
                                required
                                style='login'
                                name='username'
                                label='Username'
                                placeholder='Your Username'
                                onChange={(event) => handleChange(event, 'login')}
                                errors={errors.filter((item: string) => item.startsWith('username'))}
                            />

                            <Input
                                required
                                type='password'
                                name='password'
                                label='Password'
                                placeholder='Your Password'
                                onChange={(event) => handleChange(event, 'login')}
                                errors={errors.filter((item: string) => item.startsWith('password'))}
                            />

                            <Link href='/password-forgot'>
                                Forgot your password?
                            </Link>

                            <Button>
                                Sign In
                            </Button>
                        </form>
                    </div>

                    <div className={classnames(stylesForm.formOverlayContainer, { [stylesForm.formOverlayContainerActive]: active })}>
                        <div className={classnames(stylesForm.formOverlay, { [stylesForm.formOverlayActive]: active })} style={{ backgroundImage: `url(${
                            process.env.NEXT_PUBLIC_THEME === 'cataclysm'
                                ? HeaderImage1.src
                                : process.env.NEXT_PUBLIC_THEME === 'wotlk'
                                    ? HeaderImage2.src
                                    : HeaderImage1.src
                        })` }}>
                            <div className={classnames(stylesForm.formOverlayPanel, stylesForm.formOverlayPanelLeft, { [stylesForm.formOverlayPanelLeftActive]: active })}>
                                <h3>Welcome Back!</h3>

                                <p>To keep connected with us please login with your personal info</p>

                                <Button type='text' onClick={() =>
                                {
                                    setActive(false);
                                    window.history.pushState({ urlPath:'/login' },'', '/login');
                                }}>
                                    Sign In
                                </Button>
                            </div>
                            <div className={classnames(stylesForm.formOverlayPanel, stylesForm.formOverlayPanelRight, { [stylesForm.formOverlayPanelRightActive]: active })}>
                                <h3>Hello, Friend!</h3>

                                <p>Enter your personal details and start journey with us</p>

                                <Button type='text' onClick={() =>
                                {
                                    setActive(true);
                                    window.history.pushState({ urlPath:'/register' },'', '/register');
                                }}>
                                    Sign Up
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
