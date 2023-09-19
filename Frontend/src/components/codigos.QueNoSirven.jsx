const go = useNavigate();
const logout = async() => {
        console.log('logout');
        storage.remove('authToken');
        storage.remove('authUser');
        await axios.get('/api/logout', storage.get('authToken'));
        go('/')      

    }

    {/* <Route exact path='/' element ={<Home/>}></Route>
    <Route exact path='/login' element = {<Login/>}></Route>
    <Route exact path='/register' element = {<Registro/>}></Route>
    <Route element={<ProtectedRoutes/>}>
      <Route exact path='/home' element = {<HomeLogueada/>}></Route>
      <Route exact path='/personalizacion' element = {<Personalizacion/>}></Route> */}




      const SessionOpen = () => {
        respond = axios.get('http://localhost:8000/user')
        console.log(respond)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
      }