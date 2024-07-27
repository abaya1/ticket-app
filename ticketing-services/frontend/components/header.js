import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default ({currentUser}) => {
    const pathname = usePathname().toString()
    console.log(pathname)

    const links = [
        !currentUser && !pathname.includes('signin') && {label:'Sign in', href: '/auth/signin'},
        !currentUser && !pathname.includes('signup') &&  {label:'Sign Up', href: '/auth/signup'},
        currentUser && {label:'Sign Out', href: '/auth/signout'},
    ].filter((link) => link).map((linkObject) => {
        return (<li>
                    <a href={linkObject.href}>{linkObject.label}</a>
                </li>)
    })

    console.log(links)
    return <nav className='navbar navbar-light bg-light'>
        <Link className='navbar-brand' href={'/'}>devTix</Link>
        <div className='d-flex justify-contend-end'>
            <ul className='nav d-flex align-items-center'>
                {links.map((link) => link)}
            </ul>
        </div>
    </nav>

}