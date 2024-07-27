const LandingPage = (props) => {
   console.log(props)

   return  props.currentUser ? <h1>signed in</h1>:<h1>signed out</h1>
}

export default LandingPage