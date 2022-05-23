import { useContext } from 'react';

import authContext from '../context/auth-context.jsx';

const useAuth = () => useContext(authContext);

export default useAuth;
