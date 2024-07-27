import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios"
import Header from '../components/header';

const AppComponent = ({Component, pageProps}) => {
    console.log(pageProps)
    return <div>
        <Header {...pageProps}/>
        <Component {...pageProps}/>   
        </div>             
}

AppComponent.getInitialProps = async (appContext) => {

    let initialProps

    if(typeof window === "undefined") {
       const { data } = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {headers: appContext.ctx.req.headers})
       initialProps = data
    }
    else {
       const { data } = await axios.get('/api/users/currentuser')
       initialProps = data
    }
    if(appContext.Component.getInitialProps) {
        const pageProps = await appContext.Component.getInitialProps(appContext.ctx)
        initialProps = {...pageProps, ...initialProps}
    }

    return {pageProps: initialProps}
 }

export default AppComponent