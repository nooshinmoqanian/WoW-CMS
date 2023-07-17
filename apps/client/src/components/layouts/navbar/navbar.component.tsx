import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { v4 as uuidV4 } from 'uuid';
import { useRouter } from 'next/router';
import { BsPerson, BsList } from 'react-icons/bs';

const Button = dynamic(() => import('@/components/button'));

import styles from '@/components/layouts/navbar/navbar.module.scss';

import navbarItems from '@/data/navbar.data.json';

import Logo1 from '@/../public/images/logos/wow_cms-cataclysm.png';
import Logo2 from '@/../public/images/logos/wow_cms-wotlk.png';

const Navbar = () =>
{
    const router = useRouter();

    return (
        <nav className={styles.navbar} data-secondery={ router.pathname.includes('blogs/') }>
            <div className={styles.navbarContainer}>
                <span>
                    <Image
                        src={
                            process.env.NEXT_PUBLIC_THEME === 'cataclysm'
                                ? Logo1
                                :
                                process.env.NEXT_PUBLIC_THEME === 'wotlk'
                                    ? Logo2
                                    : Logo1
                        }
                        alt='WoW CMS'
                        fill
                        style={{ objectFit: 'contain' }}
                    />
                </span>

                <ul>
                    {
                        navbarItems.map((item) => (
                            <li key={ uuidV4() } data-active={ item.href === router.pathname }>
                                <Link href= { item.href }>
                                    { item.name }
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                <Button href='/login'>
                    Login/Register
                </Button>
            </div>

            <div className={styles.navbarContainerMobile}>
                <button>
                    <BsList />
                </button>

                <span>
                    <Image
                        src={
                            process.env.NEXT_PUBLIC_THEME === 'cataclysm'
                                ? Logo1
                                :
                                process.env.NEXT_PUBLIC_THEME === 'wotlk'
                                    ? Logo2
                                    : Logo1
                        }
                        alt='WoW CMS'
                        fill
                        style={{ objectFit: 'contain' }}
                    />
                </span>

                <Link href='/login'>
                    <BsPerson />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
